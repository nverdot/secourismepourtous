/**
 * Réception des formulaires du site → contact dans le CRM Wix.
 *
 * Version Cloudflare Pages, jumelle de netlify/functions/contact.mjs. Les deux
 * partagent la même logique ; seule l'enveloppe change — Cloudflare passe les
 * variables d'environnement en argument (`env`) là où Netlify les expose par
 * `process.env`, et route par l'emplacement du fichier plutôt que par une
 * déclaration `config.path`.
 *
 * ⚠️ Toute correction faite ici doit l'être aussi dans la version Netlify,
 * tant que les deux hébergeurs sont possibles.
 *
 * Pourquoi une fonction serveur : créer un contact exige une clé
 * administrateur, qui ne doit jamais partir dans le navigateur. Le formulaire
 * poste donc ici, et c'est le serveur qui appelle Wix.
 *
 * Le site reste statique : cette fonction est le seul morceau dynamique.
 *
 * Variables attendues (Cloudflare > Settings > Environment variables) :
 *   WIX_API_KEY, WIX_SITE_ID
 */

const API = 'https://www.wixapis.com/contacts/v5/contacts';
const DONNEES = 'https://www.wixapis.com/wix-data/v2/items';
const COLLECTION = 'DemandesSite';

/** Regroupe les champs du formulaire en un message lisible pour la notification. */
function resume(d) {
  const lignes = [];
  const ajoute = (libelle, valeur) => { if (valeur) lignes.push(`${libelle} : ${valeur}`); };

  ajoute('Formation', d.formation);
  ajoute('Participants', d.participants);
  ajoute('Session souhaitée', d.session);
  ajoute('Dispositif', d.dispositif);
  ajoute('Motif', d.motif);

  if (d.financeur_nom) {
    lignes.push('', '— Financeur —');
    ajoute('Organisme', d.financeur_nom);
    ajoute('Représentant', d.financeur_representant);
    ajoute('Adresse', [d.financeur_adresse, d.financeur_cp, d.financeur_ville].filter(Boolean).join(' '));
    ajoute('E-mail convention', d.financeur_email);
    ajoute('SIRET', d.financeur_siret);
  }

  if (d.stagiaire_naissance) {
    lignes.push('', '— Stagiaire —');
    ajoute('Né(e) le', d.stagiaire_naissance);
    ajoute('à', [d.stagiaire_lieu, d.stagiaire_departement].filter(Boolean).join(', '));
    ajoute('Adresse', [d.stagiaire_adresse, d.stagiaire_cp, d.stagiaire_ville].filter(Boolean).join(' '));
  }

  ajoute('Situation de handicap', d.handicap);
  if (d.message) lignes.push('', '— Message —', d.message);
  return lignes.join('\n');
}

export async function onRequestPost({ request, env }) {
  const req = request;

  if (req.method !== 'POST') {
    return new Response('Méthode non autorisée', { status: 405 });
  }

  const cle = env.WIX_API_KEY;
  const site = env.WIX_SITE_ID;

  let d;
  try {
    const type = req.headers.get('content-type') || '';
    d = type.includes('application/json')
      ? await req.json()
      : Object.fromEntries(new URLSearchParams(await req.text()));
  } catch {
    return new Response('Requête illisible', { status: 400 });
  }

  // Piège à robots : rempli = on accepte sans rien enregistrer, pour ne pas
  // renseigner l'émetteur sur la détection.
  if (d['bot-field']) return Response.redirect(new URL('/merci', req.url), 303);

  const prenom = d.prenom || d.stagiaire_prenom || '';
  const nom = d.nom || d.stagiaire_nom || '';
  const email = d.email || d.stagiaire_email || '';
  const tel = d.telephone || d.stagiaire_tel || '';

  if (!email && !tel) {
    return new Response('Coordonnées manquantes', { status: 400 });
  }

  if (!cle || !site) {
    console.error('[contact] clé Wix absente — demande non enregistrée');
    // On ne bloque pas le visiteur : la notification Netlify prend le relais.
    return Response.redirect(new URL('/merci', req.url), 303);
  }

  const origine = d.dispositif ? 'Demande de financement'
                : d['form-name'] === 'secouriste-actif' ? 'Candidature secouriste actif'
                : 'Demande de contact';

  /**
   * Enregistrement dans la collection « Demandes du site ».
   *
   * La fiche contact ne retient que l'identité : tout ce que le visiteur a
   * répondu (financeur, état civil du stagiaire, accessibilité, niveau) vivait
   * jusqu'ici seulement dans les journaux de cette fonction, donc nulle part de
   * consultable. La collection le conserve, dans le tableau de bord Wix.
   */
  const enregistre = async () => {
    const bloc = (titre, paires) => {
      const lignes = paires.filter(([, v]) => v).map(([k, v]) => `${k} : ${v}`);
      return lignes.length ? lignes.join(' · ') : '';
    };
    const item = {
      typeDemande: origine,
      prenom, nom, email, telephone: tel,
      motif: d.motif || '',
      formation: d.formation || '',
      niveau: d.niveau || '',
      participants: d.participants || '',
      dispositif: d.dispositif || '',
      handicap: d.handicap || '',
      financeur: bloc('Financeur', [
        ['Organisme', d.financeur_nom], ['Représentant', d.financeur_representant],
        ['Adresse', [d.financeur_adresse, d.financeur_cp, d.financeur_ville].filter(Boolean).join(' ')],
        ['E-mail', d.financeur_email], ['SIRET', d.financeur_siret],
      ]),
      stagiaire: bloc('Stagiaire', [
        ['Né(e) le', d.stagiaire_naissance],
        ['à', [d.stagiaire_lieu, d.stagiaire_departement].filter(Boolean).join(', ')],
        ['Adresse', [d.stagiaire_adresse, d.stagiaire_cp, d.stagiaire_ville].filter(Boolean).join(' ')],
      ]),
      message: d.message || '',
      pageOrigine: d['form-name'] || '',
      recuLe: new Date().toISOString(),
    };
    const r = await fetch(DONNEES, {
      method: 'POST',
      headers: { Authorization: cle, 'wix-site-id': site, 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataCollectionId: COLLECTION, dataItem: { data: item } }),
    });
    if (!r.ok) console.error('[contact] collection Wix', r.status, (await r.text()).slice(0, 250));
  };

  try {
    const r = await fetch(API, {
      method: 'POST',
      headers: { Authorization: cle, 'wix-site-id': site, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contact: {
          name: { first: prenom, last: nom },
          emails: email ? { items: [{ email, primary: true, tag: 'MAIN' }] } : undefined,
          phones: tel ? { items: [{ phone: tel, primary: true, tag: 'MOBILE' }] } : undefined,
          // La note porte le détail : elle est consultable depuis la fiche contact.
          extendedFields: { items: { 'custom.source': `${origine} — site web` } },
        },
        allowDuplicates: true,
      }),
    });

    if (!r.ok) {
      console.error('[contact] Wix a répondu', r.status, (await r.text()).slice(0, 300));
    } else {
      const { contact } = await r.json();
      console.log('[contact] créé', contact?.id, '|', origine, '|', resume(d).replace(/\n/g, ' · '));
    }
    await enregistre();
  } catch (e) {
    // Une panne de l'API Wix ne doit pas faire perdre la demande : elle reste
    // dans les soumissions Netlify et dans les journaux de cette fonction.
    console.error('[contact] appel impossible :', e?.message || e);
  }

  return Response.redirect(new URL('/merci', req.url), 303);
};

export const config = { path: '/api/contact' }

/** Une requête GET sur /api/contact n'a pas de sens : on renvoie le visiteur. */
export function onRequestGet({ request }) {
  return Response.redirect(new URL('/contact', request.url), 303);
}
