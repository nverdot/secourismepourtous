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

/** Où part l'alerte : l'adresse que l'association relève déjà pour Wix. */
const DESTINATAIRE = 'secourismepourtous@gmail.com';
const ENVOI = 'https://api.resend.com/emails';


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

  // Wix et l'alerte par e-mail sont deux chemins indépendants, et c'est
  // délibéré : une migration de compte Cloudflare a un jour emporté la clé
  // Wix, et l'ancien code s'arrêtait là — supprimant du même coup l'alerte,
  // pourtant parfaitement fonctionnelle. Deux chemins valent mieux qu'un,
  // à condition qu'aucun ne puisse faire tomber l'autre.
  const wixDisponible = Boolean(cle && site);
  if (!wixDisponible) console.error('[contact] clé Wix absente — enregistrement impossible, l’alerte prend le relais');

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

  // L'alerte d'abord : c'est elle qui fait qu'une demande est traitée. Elle ne
  // dépend pas de Wix, et rien de ce qui suit ne doit pouvoir l'empêcher.
  // On retient l'issue réelle de l'envoi, pas la simple présence d'une clé :
  // une clé invalide remercierait le visiteur sans que rien ne soit parti.
  let alerteOk = false;
  try {
    alerteOk = await alerte(d, env, origine, prenom, nom, email, tel);
  } catch (e) {
    console.error('[contact] alerte impossible :', e?.message || e);
  }

  if (!wixDisponible) {
    // Sans Wix, la demande n'existe que dans le mail. S'il n'est pas parti non
    // plus, il faut le dire au visiteur plutôt que de le remercier.
    return Response.redirect(new URL(alerteOk ? '/merci' : '/merci?envoi=echec', req.url), 303);
  }

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

/** Échappe ce qui part dans le corps HTML du message. */
function ech(v) {
  return String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

/**
 * Alerte par e-mail.
 *
 * Wix ne peut pas s'en charger : sa chaîne de notification n'est déclenchée
 * que par son propre composant de formulaire, jamais par une écriture dans la
 * collection. L'alerte part donc d'ici, vers la boîte que l'association relève
 * déjà — seul l'expéditeur change.
 *
 * Le champ Reply-To porte l'adresse du demandeur : répondre au mail répond à
 * la personne, sans avoir à recopier son adresse.
 *
 * Une panne d'envoi ne doit jamais faire perdre la demande : elle est déjà
 * enregistrée quand on arrive ici, et l'échec se contente d'un journal.
 */
async function alerte(d, env, origine, prenom, nom, email, tel) {
  const cle = env.RESEND_API_KEY;
  if (!cle) return false;

  const expediteur = env.RESEND_FROM || 'Site Secourisme Pour Tous <onboarding@resend.dev>';
  const a = env.NOTIF_EMAIL || DESTINATAIRE;

  const objet = origine === 'Demande de dispositif' ? 'Nouvelle demande de poste de secours'
              : origine === 'Candidature secouriste actif' ? 'Nouvelle candidature de bénévole'
              : origine === 'Demande de financement' ? 'Nouvelle demande de financement'
              : 'Nouvelle demande de contact';

  const lignes = [
    ['Nom', `${prenom} ${nom}`.trim()],
    ['E-mail', email],
    ['Téléphone', tel],
    ['Motif', d.motif],
    ['Formation', d.formation],
    ['Participants', d.participants],
    ['Session souhaitée', d.session],
    ['Dispositif', d.dispositif],
    ['Situation de handicap', d.handicap],
    ['Page d’origine', d['form-name']],
  ].filter(([, v]) => v);

  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;color:#1a1a1a">
  <h2 style="font-size:17px;margin:0 0 4px">${ech(objet)}</h2>
  <p style="margin:0 0 18px;color:#666;font-size:13px">Reçue depuis le site secourismepourtous.org</p>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:560px">
    ${lignes.map(([k, v]) => `<tr>
      <td style="padding:7px 14px 7px 0;color:#666;white-space:nowrap;vertical-align:top;border-bottom:1px solid #eee">${ech(k)}</td>
      <td style="padding:7px 0;border-bottom:1px solid #eee"><strong>${ech(v)}</strong></td>
    </tr>`).join('')}
  </table>
  ${d.message ? `<p style="margin:18px 0 6px;color:#666;font-size:13px">Message</p>
  <blockquote style="margin:0;padding:12px 16px;background:#f6f6f6;border-left:3px solid #d63031;white-space:pre-wrap">${ech(d.message)}</blockquote>` : ''}
  ${d.financeur_nom || d.stagiaire_naissance ? `<p style="margin:18px 0 6px;color:#666;font-size:13px">Détail complet</p>
  <pre style="margin:0;padding:12px 16px;background:#f6f6f6;font-family:ui-monospace,monospace;font-size:13px;white-space:pre-wrap">${ech(resume(d))}</pre>` : ''}
  <p style="margin:22px 0 0;color:#999;font-size:12px">La demande est aussi enregistrée dans Wix, collection « Demandes du site ».</p>
</div>`;

  try {
    const r = await fetch(ENVOI, {
      method: 'POST',
      headers: { Authorization: `Bearer ${cle}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: expediteur,
        to: [a],
        reply_to: email || undefined,
        subject: `${objet} — ${`${prenom} ${nom}`.trim() || email}`,
        html,
        text: `${objet}\n\n${lignes.map(([k, v]) => `${k} : ${v}`).join('\n')}\n\n${resume(d)}`,
      }),
    });
    if (!r.ok) {
      console.error('[contact] alerte non envoyée', r.status, (await r.text()).slice(0, 250));
      return false;
    }
    console.log('[contact] alerte envoyée à', a);
    return true;
  } catch (e) {
    console.error('[contact] envoi impossible :', e?.message || e);
    return false;
  }
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

  // Ce que le Worker voit réellement dans son environnement. Les noms seuls :
  // un nom mal orthographié ou posé sur l'écran de build plutôt que celui
  // d'exécution se repère d'un coup d'œil, sans exposer aucune valeur.
  etat.variablesVues = Object.keys(env)
    .filter((k) => typeof env[k] === 'string')
    .sort()
    .map((k) => `${k} (${env[k].length} caractères)`);
  etat.liaisonsVues = Object.keys(env).filter((k) => typeof env[k] !== 'string').sort();

  // Resend : présence de la clé et acceptation par le service.
  const resend = env.RESEND_API_KEY;
  etat.alerteConfiguree = Boolean(resend);
  etat.alerteDestinataire = env.NOTIF_EMAIL || DESTINATAIRE;
  etat.alerteExpediteur = env.RESEND_FROM || 'onboarding@resend.dev (domaine non vérifié)';
  if (resend) {
    try {
      const r = await fetch('https://api.resend.com/domains', { headers: { Authorization: `Bearer ${resend}` } });
      etat.resendStatut = r.status;
      const corps = await r.text();
      // Une clé bridée à l'envoi ne peut pas lister les domaines : c'est la
      // bonne pratique, et ce refus-là vaut confirmation qu'elle est valide.
      if (r.ok) {
        etat.resendAccepte = true;
        etat.resendDomaines = (JSON.parse(corps).data ?? []).map((d) => `${d.name} (${d.status})`);
      } else if (corps.includes('restricted_api_key')) {
        etat.resendAccepte = true;
        etat.resendNote = 'clé valide, restreinte à l’envoi seul (bonne pratique)';
      } else {
        etat.resendAccepte = false;
        etat.resendMessage = corps.slice(0, 160);
      }
    } catch (e) {
      etat.resendStatut = 'appel impossible';
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
