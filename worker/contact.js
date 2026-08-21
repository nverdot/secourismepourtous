/**
 * Réception des formulaires du site → contact dans le CRM Wix.
 *
 * ⚠️ Ce fichier vivait dans `functions/api/contact.js`, qui est la convention
 * Cloudflare *Pages*. Le site est déployé en *Worker* : ce dossier y était
 * purement ignoré, et les cinq formulaires postaient dans le vide (404 sur
 * /api/contact, pendant des semaines, sans la moindre trace d'erreur).
 * Le routage est désormais explicite, dans worker/index.js.
 *
 * Une copie Netlify subsiste dans netlify/functions/contact.mjs, inutilisée
 * depuis la migration. Toute correction faite ici doit y être reportée tant
 * qu'on la garde — ou bien il faut la supprimer.
 *
 * Pourquoi une fonction serveur : créer un contact exige une clé
 * administrateur, qui ne doit jamais partir dans le navigateur. Le formulaire
 * poste donc ici, et c'est le serveur qui appelle Wix.
 *
 * Le site reste statique : cette fonction est le seul morceau dynamique.
 *
 * Secrets attendus, en *runtime* et non en variables de build — c'est la
 * distinction qui se paie cher : `npx wrangler secret put WIX_API_KEY`
 * (idem WIX_SITE_ID), ou Cloudflare > Worker > Settings > Variables and
 * Secrets. Une variable posée côté build n'existe pas à l'exécution.
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
  // Quand le message est seul, l'intertitre et la ligne vide n'apportent rien.
  if (d.message) lignes.push(...(lignes.length ? ['', '— Message —'] : []), d.message);
  return lignes.join('\n').trim();
}

export async function contactPost(request, env) {
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
    // Rediriger vers /merci laisserait croire au visiteur que sa demande est
    // partie, alors qu'elle n'est enregistrée nulle part. On le lui dit, et on
    // lui donne le téléphone : mieux vaut un appel qu'une demande perdue.
    console.error('[contact] secrets Wix absents du Worker — demande non enregistrée');
    return Response.redirect(new URL('/merci?envoi=echec', req.url), 303);
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

  /**
   * Recopie dans la collection du formulaire Wix correspondant.
   *
   * Le site historique utilise des formulaires Wix « classiques », qui
   * déposent leurs soumissions dans des collections dédiées — c'est là que
   * l'association a l'habitude de les relire. Continuer à les alimenter évite
   * de changer une habitude de travail au moment même où le site change.
   *
   * Ces collections n'ont que six champs : tout le détail (financeur, état
   * civil du stagiaire, accessibilité) ne tiendrait pas. Il reste dans
   * DemandesSite, qui fait foi, et `resume()` en donne ici une version
   * lisible dans le champ message.
   */
  const miroirWix = async () => {
    const dps = d.dispositif || /poste de secours|DPS/i.test(d.motif || '');
    const actif = d['form-name'] === 'secouriste-actif'
      || /secouriste actif|bénévole|rejoindre/i.test(d.motif || '');

    const cible = dps ? 'Forms/contact11'
                : actif ? 'Forms/contact112'
                : 'Forms/contactForm';

    // « Contact 2 » ne porte pas les mêmes colonnes que les deux autres.
    const item = cible === 'Forms/contactForm'
      ? {
          submissionTime: new Date().toISOString(),
          nomPrenom: `${prenom} ${nom}`.trim(),
          email,
          telephone: tel,
          votreDemande: resume(d) || d.message || '',
        }
      : {
          submissionTime: new Date().toISOString(),
          firstName: prenom,
          lastName: nom,
          email,
          telephone: tel,
          writeAMessage: resume(d) || d.message || '',
        };

    const r = await fetch(DONNEES, {
      method: 'POST',
      headers: { Authorization: cle, 'wix-site-id': site, 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataCollectionId: cible, dataItem: { data: item } }),
    });
    if (!r.ok) console.error('[contact] miroir', cible, r.status, (await r.text()).slice(0, 200));
    else console.log('[contact] recopié dans', cible);
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
    await miroirWix();
  } catch (e) {
    // Une panne de l'API Wix ne doit pas faire perdre la demande : elle reste
    // dans les soumissions Netlify et dans les journaux de cette fonction.
    console.error('[contact] appel impossible :', e?.message || e);
  }

  return Response.redirect(new URL('/merci', req.url), 303);
}

/**
 * Aiguillage de la route.
 *
 * Une requête GET sur /api/contact n'a pas de sens : plutôt qu'une erreur, on
 * ramène le visiteur au formulaire — c'est ce qui arrive quand quelqu'un colle
 * l'URL dans sa barre d'adresse.
 */
/**
 * Contrôle de configuration : /api/contact?diag=1
 *
 * Ne renvoie que des booléens, une longueur et le code de réponse de Wix —
 * jamais la clé. Sert à distinguer « secret absent » de « secret présent mais
 * refusé par Wix », les deux se manifestant autrement par le même silence.
 */
async function diagnostic(env) {
  const cle = env.WIX_API_KEY;
  const site = env.WIX_SITE_ID;
  const etat = {
    clePresente: Boolean(cle),
    cleLongueur: cle ? cle.length : 0,
    cleEspacesParasites: cle ? cle !== cle.trim() : false,
    cleEntreGuillemets: cle ? /^["']|["']$/.test(cle) : false,
    sitePresent: Boolean(site),
    siteFormatValide: site ? /^[0-9a-f-]{36}$/.test(site.trim()) : false,
  };

  if (etat.clePresente && etat.sitePresent) {
    try {
      const r = await fetch('https://www.wixapis.com/wix-data/v2/collections/DemandesSite', {
        headers: { Authorization: cle, 'wix-site-id': site },
      });
      etat.wixStatut = r.status;
      etat.wixAccepte = r.ok;
      if (!r.ok) etat.wixMessage = (await r.text()).slice(0, 200);
    } catch (e) {
      etat.wixStatut = 'appel impossible';
      etat.wixMessage = String(e?.message ?? e).slice(0, 200);
    }
  }

  return new Response(JSON.stringify(etat, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export function contact(request, env) {
  if (new URL(request.url).searchParams.get('diag') === '1') return diagnostic(env);
  if (request.method === 'POST') return contactPost(request, env);
  if (request.method === 'GET') return Response.redirect(new URL('/contact', request.url), 303);
  return new Response('Méthode non autorisée', { status: 405, headers: { Allow: 'GET, POST' } });
}
