/**
 * /suivi-inscriptions — tableau de bord interne des inscriptions.
 *
 * Une page pour l'équipe, pas pour le public : les prochaines sessions, le
 * remplissage de chacune et la liste des participants, lus en direct chez Wix
 * à chaque visite. Rien n'est stocké ni mis en cache.
 *
 * DISCRÉTION
 * - Aucun lien du site n'y mène et elle n'est pas dans le plan du site.
 * - Elle répond « noindex » (en-tête et balise) : un moteur qui tomberait
 *   dessus ne l'indexerait pas.
 * - Elle est protégée par un mot de passe, rangé en secret du Worker
 *   (SUIVI_MDP) et jamais dans ce dépôt, qui est public. Pour le changer :
 *   `npx wrangler secret put SUIVI_MDP`. Tous les appareils déjà connectés
 *   sont alors déconnectés, puisque le jeton dérive du mot de passe.
 *
 * Elle réutilise la clé WIX_API_KEY du formulaire de contact.
 */

const WIX = 'https://www.wixapis.com';
const CHEMIN = '/suivi-inscriptions';
const COOKIE = 'suivi';
const TRENTE_JOURS = 60 * 60 * 24 * 30;

/** Commandes qui occupent une place. Annulées, refusées et abandonnées n'en prennent pas. */
const OCCUPE = new Set(['PAID', 'FREE', 'OFFLINE_PENDING', 'PENDING']);
const A_REGLER = new Set(['OFFLINE_PENDING', 'PENDING']);

const ENTETES_PRIVES = {
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Cache-Control': 'no-store',
  'Referrer-Policy': 'no-referrer',
};

/* ---------- mot de passe ---------- */

async function jeton(mdp) {
  const cle = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(mdp), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', cle, new TextEncoder().encode('suivi-inscriptions-v1'));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function cookieDe(request) {
  const brut = request.headers.get('Cookie') ?? '';
  const m = brut.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([a-f0-9]+)`));
  return m ? m[1] : null;
}

/** Comparaison à durée constante, pour ne rien laisser deviner au chronomètre. */
function egaux(a, b) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

function page(corps, statut = 200, extra = {}) {
  return new Response(corps, {
    status: statut,
    headers: { 'Content-Type': 'text/html; charset=utf-8', ...ENTETES_PRIVES, ...extra },
  });
}

/* ---------- lecture Wix ---------- */

async function wix(env, chemin, corps) {
  const r = await fetch(WIX + chemin, {
    method: corps ? 'POST' : 'GET',
    headers: {
      Authorization: env.WIX_API_KEY,
      'wix-site-id': env.WIX_SITE_ID,
      'Content-Type': 'application/json',
    },
    body: corps ? JSON.stringify(corps) : undefined,
  });
  if (!r.ok) throw new Error(`Wix ${chemin} : ${r.status}`);
  return r.json();
}

/**
 * Trois appels en tout, quel que soit le nombre de sessions : les événements,
 * leurs billets (pour la capacité), puis les commandes de toutes les sessions
 * d'un coup, par pages de 100. Un appel par session dépasserait la limite de
 * requêtes d'un Worker dès une trentaine de dates.
 */
async function donnees(env) {
  let { events = [] } = await wix(env, '/events/v3/events/query', {
    query: {
      filter: { status: { $in: ['UPCOMING', 'STARTED'] } },
      sort: [{ fieldName: 'dateAndTimeSettings.startDate', order: 'ASC' }],
      paging: { limit: 100 },
    },
  });
  // Une date « à définir » n'a pas de début : rien à suivre tant qu'elle n'est pas fixée.
  events = events.filter((e) => e.dateAndTimeSettings?.startDate);
  if (!events.length) return [];
  const ids = events.map((e) => e.id);

  const { ticketDefinitions = [] } = await wix(env, '/events/v3/ticket-definitions/query', {
    query: { filter: { eventId: { $in: ids } }, paging: { limit: 100 } },
    fields: ['SALES_DETAILS'],
  });

  const filtre = ids.map((id) => `eventId=${id}`).join('&');
  const commandes = [];
  for (let offset = 0; offset < 2000; offset += 100) {
    const p = await wix(env,
      `/events/v1/orders?limit=100&offset=${offset}&${filtre}&fieldset=TICKETS&fieldset=DETAILS&fieldset=FORM`);
    commandes.push(...(p.orders ?? []));
    if (offset + 100 >= (p.total ?? 0)) break;
  }

  return events.map((e) => {
    const billets = ticketDefinitions.filter((t) => t.eventId === e.id);
    // Wix limite chaque type de billet séparément ; la capacité de la session
    // est leur somme, comme le voit la billetterie. Un type illimité la rend inconnue.
    const capacite = billets.length && billets.every((t) => t.limited)
      ? billets.reduce((n, t) => n + Number(t.actualLimit ?? t.initialLimit ?? 0), 0)
      : null;
    const siennes = commandes.filter((o) => o.eventId === e.id);
    const participants = [];
    let annulations = 0;
    for (const o of siennes) {
      if (!OCCUPE.has(o.status)) {
        if (o.status === 'CANCELED') annulations++;
        continue;
      }
      const reponses = (o.checkoutForm?.inputValues ?? [])
        .filter((v) => v.inputName?.startsWith('custom-'))
        .map((v) => v.value || (v.values ?? []).join(', '))
        .filter(Boolean);
      const tickets = (o.tickets ?? []).filter((t) => !t.canceled && !t.archived);
      for (const t of tickets.length ? tickets : [{}]) {
        const g = t.guestDetails ?? {};
        participants.push({
          prenom: g.firstName || o.firstName || '',
          nom: g.lastName || o.lastName || '',
          email: g.email || o.email || '',
          tel: g.phone || champ(o, 'phone') || '',
          inscrit: o.created,
          aRegler: A_REGLER.has(o.status),
          commande: o.orderNumber,
          groupe: tickets.length > 1 ? tickets.length : 0,
          reponses,
          // La seule question propre aux sessions est « Êtes-vous en situation
          // de handicap ? » ; toute réponse autre que « Non… » compte.
          handicap: reponses.some((r) => !/^non\b/i.test(r)),
          billet: t.ticketDefinitionId,
        });
      }
    }
    participants.sort((a, b) => (a.nom + a.prenom).localeCompare(b.nom + b.prenom, 'fr'));
    const r = e.registration ?? {};
    // Le détail par type de billet n'aide que s'il y en a plusieurs.
    const types = billets.length > 1
      ? billets.map((t) => ({
        nom: (t.name ?? '').trim(),
        limite: t.limited ? Number(t.actualLimit ?? 0) : null,
        vendus: participants.filter((p) => p.billet === t.id).length,
      }))
      : [];
    return {
      types,
      id: e.id,
      titre: e.title ?? '',
      debut: e.dateAndTimeSettings?.startDate,
      fin: e.dateAndTimeSettings?.endDate,
      lieu: e.location?.name ?? '',
      capacite,
      participants,
      annulations,
      enCours: e.status === 'STARTED',
      fermee: String(r.status ?? '').startsWith('CLOSED') || Boolean(r.registrationPaused),
    };
  });
}

function champ(o, nom) {
  const v = (o.checkoutForm?.inputValues ?? []).find((x) => x.inputName === nom);
  return v?.value ?? '';
}

/* ---------- rendu ---------- */

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

const fmt = (opts) => new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', ...opts });
const JOUR = fmt({ weekday: 'short' });
const NUM = fmt({ day: 'numeric' });
const MOIS_COURT = fmt({ month: 'short' });
const MOIS = fmt({ month: 'long', year: 'numeric' });
const HEURE = fmt({ hour: '2-digit', minute: '2-digit' });
const DATE_COURTE = fmt({ day: 'numeric', month: 'short' });

/** « PSE1 - Formation » → « PSE1 », pour les filtres. */
const famille = (titre) => titre.split(/\s[-–]\s/)[0].trim() || titre;

function niveau(s) {
  const n = s.participants.length;
  if (s.capacite && n >= s.capacite) return { cle: 'complet', texte: 'Complet' };
  if (s.enCours) return { cle: 'ferme', texte: 'Formation commencée' };
  const jours = (new Date(s.debut) - Date.now()) / 864e5;
  const taux = s.capacite ? n / s.capacite : null;
  if (taux !== null && taux >= 0.75) return { cle: 'presque', texte: 'Presque complet' };
  if (s.fermee) return { cle: 'ferme', texte: 'Billetterie fermée' };
  if (jours <= 14 && (taux === null ? n < 4 : taux < 0.34)) return { cle: 'faible', texte: 'Peu d’inscrits' };
  return null;
}

/** Nom court pour les cases du calendrier : « Formations Recyclage BSB » → « FC BSB ». */
/**
 * Pictogramme fauteuil roulant : blanc sur carré rouge, pour sauter aux yeux.
 * Dessiné en SVG plutôt qu'avec l'emoji ♿, que chaque système colore à sa
 * façon (en bleu le plus souvent) sans qu'on puisse le passer en rouge.
 */
const FAUTEUIL = `<span class="fauteuil" role="img" aria-label="situation de handicap"><svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
<circle cx="10" cy="3.6" r="2.2"/>
<path d="M9 6.8h2.3v4.8H16l3.3 6.6-2 1-2.6-5.4H9.7A1.7 1.7 0 0 1 8 12.1V7.8a1 1 0 0 1 1-1z"/>
<path d="M7 10v2.3a4.4 4.4 0 1 0 6.6 4.8h2.3A6.6 6.6 0 1 1 7 10z"/></svg></span>`;
const nbHandicap = (s) => s.participants.filter((p) => p.handicap).length;

const court = (titre) => famille(titre).replace(/^Formations Recyclage /i, 'FC ').replace(/^Formations /i, '');

/** Jour civil à Paris, « 2026-11-07 » : la clé des cases du calendrier. */
const JOUR_ISO = fmt({ year: 'numeric', month: '2-digit', day: '2-digit' });
const cleJour = (d) => {
  const p = Object.fromEntries(JOUR_ISO.formatToParts(d).map((x) => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day}`;
};

function puce(s) {
  const n = s.participants.length;
  const nv = niveau(s);
  const debut = new Date(s.debut);
  const fin = s.fin ? new Date(s.fin) : null;
  const jusque = fin && cleJour(fin) !== cleJour(debut) ? ` → ${DATE_COURTE.format(fin)}` : '';
  const h = nbHandicap(s);
  const titre = `${s.titre} · ${DATE_COURTE.format(debut)}${jusque} · ${n} inscrits / ${s.capacite ?? '?'}${nv ? ' · ' + nv.texte : ''}${h ? ` · ${h} en situation de handicap` : ''}`;
  return `<a class="puce ${nv ? 'n-' + nv.cle : ''}" href="#s-${esc(s.id)}" data-id="${esc(s.id)}" data-famille="${esc(famille(s.titre))}" title="${esc(titre)}"><b>${esc(court(s.titre))}</b> <span>${n}/${s.capacite ?? '?'}</span>${h ? FAUTEUIL : ''}</a>`;
}

/**
 * Une grille par mois, du mois en cours au dernier mois qui a une session.
 * Chaque session apparaît à son premier jour : une formation sur plusieurs
 * week-ends n'occupe pas toutes les cases jusqu'à sa fin (la bulle donne la fin).
 * Celles déjà commencées sont listées au-dessus, leur premier jour étant passé.
 */
function calendrier(sessions) {
  const parJour = {};
  for (const s of sessions.filter((x) => !x.enCours)) (parJour[cleJour(new Date(s.debut))] ??= []).push(s);
  const jours = Object.keys(parJour).sort();
  const enCours = sessions.filter((x) => x.enCours);
  const aujourdhui = cleJour(new Date());
  const [ay, am] = aujourdhui.split('-').map(Number);
  const dernier = jours.length ? jours[jours.length - 1] : aujourdhui;
  const [zy, zm] = dernier.split('-').map(Number);

  const grilles = [];
  for (let y = ay, m = am; y < zy || (y === zy && m <= zm); m === 12 ? (y++, m = 1) : m++) {
    const premier = new Date(Date.UTC(y, m - 1, 1));
    const nbJours = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const decalage = (premier.getUTCDay() + 6) % 7; // lundi en premier
    const cases = [];
    const fins = []; // clé du jour de chaque case, pour écarter les semaines passées
    for (let i = 0; i < decalage; i++) { cases.push('<div class="case vide-case"></div>'); fins.push(''); }
    for (let j = 1; j <= nbJours; j++) {
      const cle = `${y}-${String(m).padStart(2, '0')}-${String(j).padStart(2, '0')}`;
      const we = (decalage + j - 1) % 7 >= 5;
      cases.push(`<div class="case${we ? ' we' : ''}${cle === aujourdhui ? ' auj' : ''}${cle < aujourdhui ? ' passe' : ''}">
        <span class="nj">${j}</span>${(parJour[cle] ?? []).map(puce).join('')}</div>`);
      fins.push(cle);
    }
    // Une semaine entièrement passée n'apprend plus rien : on ne la dessine pas.
    const semaines = [];
    for (let i = 0; i < cases.length; i += 7) {
      const derniere = fins.slice(i, i + 7).filter(Boolean).pop();
      if (derniere >= aujourdhui) semaines.push(cases.slice(i, i + 7).join(''));
    }
    grilles.push(`
    <section class="mois-cal">
      <h3>${esc(MOIS.format(new Date(Date.UTC(y, m - 1, 15))))}</h3>
      <div class="grille">
        ${['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'].map((d) => `<div class="jsem">${d}</div>`).join('')}
        ${semaines.join('')}
      </div>
    </section>`);
  }
  return `
    ${enCours.length ? `<p class="encours-cal"><span>En cours :</span> ${enCours.map(puce).join(' ')}</p>` : ''}
    ${grilles.join('')}`;
}

function carte(s) {
  const d = new Date(s.debut);
  const n = s.participants.length;
  const taux = s.capacite ? Math.min(1, n / s.capacite) : 0;
  const nv = niveau(s);
  const restantes = s.capacite ? Math.max(0, s.capacite - n) : null;
  const emails = [...new Set(s.participants.map((p) => p.email).filter(Boolean))].join(', ');
  const lignes = s.participants.map((p, i) => `
        <li>
          <span class="num">${i + 1}</span>
          <span class="qui"><strong>${esc(p.nom.toUpperCase())}</strong> ${esc(p.prenom)}
            ${p.aRegler ? '<em class="tag tag-regler">paiement en attente</em>' : ''}
            ${p.groupe ? `<em class="tag">commande de ${p.groupe}</em>` : ''}
            ${p.handicap ? `<em class="tag tag-info">${FAUTEUIL} situation de handicap</em>` : ''}
          </span>
          <span class="contact">
            ${p.tel ? `<a href="tel:${esc(p.tel.replace(/\s/g, ''))}">${esc(p.tel)}</a>` : ''}
            ${p.email ? `<a href="mailto:${esc(p.email)}">${esc(p.email)}</a>` : ''}
          </span>
          <span class="quand">inscrit le ${esc(DATE_COURTE.format(new Date(p.inscrit)))}</span>
        </li>`).join('');

  return `
    <article id="s-${esc(s.id)}" class="session ${nv ? 'n-' + nv.cle : ''}" data-famille="${esc(famille(s.titre))}">
      <div class="date">
        <span class="jour">${esc(JOUR.format(d))}</span>
        <span class="chiffre">${esc(NUM.format(d))}</span>
        <span class="mois">${esc(MOIS_COURT.format(d))}</span>
      </div>
      <div class="infos">
        <h2>${esc(s.titre)}</h2>
        <p class="meta">${esc(HEURE.format(d))}${s.fin ? '–' + esc(HEURE.format(new Date(s.fin))) : ''}${s.lieu ? ' · ' + esc(s.lieu) : ''}</p>
        <div class="jauge" role="img" aria-label="${n} inscrits sur ${s.capacite ?? '?'} places">
          <span style="width:${Math.round(taux * 100)}%"></span>
        </div>
        ${s.types.length ? `<p class="types">${s.types.map((t) => `<span>${esc(t.nom)} : <b>${t.vendus}</b>/${t.limite ?? '∞'}</span>`).join('')}</p>` : ''}
        <p class="etat">
          ${nbHandicap(s) ? `<span class="alerte-handicap">${FAUTEUIL} ${nbHandicap(s)} personne${nbHandicap(s) > 1 ? 's' : ''} en situation de handicap</span>` : ''}
          ${nv ? `<span class="badge">${nv.texte}</span>` : ''}
          ${restantes !== null && restantes > 0 ? `<span>${restantes} place${restantes > 1 ? 's' : ''} libre${restantes > 1 ? 's' : ''}</span>` : ''}
          ${s.annulations ? `<span class="discret">${s.annulations} annulation${s.annulations > 1 ? 's' : ''}</span>` : ''}
        </p>
      </div>
      <div class="compte"><strong>${n}</strong><span>/ ${s.capacite ?? '?'}</span></div>
      ${n ? `
      <details>
        <summary>${n > 1 ? `Voir les ${n} participants` : 'Voir le participant'}</summary>
        <ol class="liste">${lignes}</ol>
        ${emails ? `<button type="button" class="copier" data-emails="${esc(emails)}">Copier les e-mails</button>` : ''}
      </details>` : '<p class="vide">Aucun inscrit pour l’instant.</p>'}
    </article>`;
}

function tableau(sessions) {
  const total = sessions.reduce((n, s) => n + s.participants.length, 0);
  const familles = [...new Set(sessions.map((s) => famille(s.titre)))].sort((a, b) => a.localeCompare(b, 'fr'));
  let moisCourant = '';
  const corps = sessions.map((s) => {
    // Les formations longues (BNSSA, BSB) restent « commencées » des semaines :
    // on les regroupe en tête plutôt que de les classer au mois de leur début.
    const m = s.enCours ? 'En cours' : MOIS.format(new Date(s.debut));
    const titre = m !== moisCourant ? `<h3 class="mois-titre">${esc(m)}</h3>` : '';
    moisCourant = m;
    return titre + carte(s);
  }).join('');

  return gabarit('Suivi des inscriptions', `
  <header class="haut">
    <div>
      <h1>Suivi des inscriptions</h1>
      <p class="resume">${sessions.length} sessions à venir · <strong>${total}</strong> inscrits · mis à jour à ${esc(HEURE.format(new Date()))}</p>
    </div>
    <div class="actions">
      <a class="bouton" href="${CHEMIN}" id="actualiser">Actualiser</a>
      <a class="lien" href="${CHEMIN}?sortir">Se déconnecter</a>
    </div>
  </header>
  <div class="barre-vues"><nav class="vues" aria-label="Affichage">
    <button type="button" data-vue="liste" class="actif">Liste</button>
    <button type="button" data-vue="calendrier">Calendrier</button>
  </nav></div>
  <nav class="filtres" aria-label="Filtrer par formation">
    <button type="button" class="actif" data-f="">Toutes</button>
    ${familles.map((f) => `<button type="button" data-f="${esc(f)}">${esc(f)}</button>`).join('')}
  </nav>
  <p class="legende">
    <span class="pastille p-complet"></span>Complet
    <span class="pastille p-presque"></span>75 % et plus
    <span class="pastille p-faible"></span>Peu d’inscrits à moins de 15 jours
  </p>
  <main id="liste">${corps || '<p class="vide">Aucune session à venir dans Wix.</p>'}</main>
  <main id="calendrier" hidden>${calendrier(sessions)}</main>
  <script>
    function afficher(vue) {
      document.getElementById('liste').hidden = vue !== 'liste';
      document.getElementById('calendrier').hidden = vue !== 'calendrier';
      document.querySelectorAll('.vues button').forEach(function (x) { x.classList.toggle('actif', x.dataset.vue === vue); });
      history.replaceState(null, '', vue === 'calendrier' ? '#calendrier' : location.pathname);
    }
    document.querySelectorAll('.vues button').forEach(function (b) {
      b.addEventListener('click', function () { afficher(b.dataset.vue); });
    });
    if (location.hash === '#calendrier') afficher('calendrier');
    // Actualiser garde la vue choisie.
    document.getElementById('actualiser').addEventListener('click', function (e) { e.preventDefault(); location.reload(); });
    // Un clic sur une session du calendrier ouvre sa fiche dans la liste.
    document.querySelectorAll('.puce').forEach(function (p) {
      p.addEventListener('click', function (e) {
        e.preventDefault();
        afficher('liste');
        var a = document.getElementById('s-' + p.dataset.id);
        var d = a.querySelector('details');
        if (d) d.open = true;
        a.scrollIntoView({ block: 'start' });
      });
    });
    document.querySelectorAll('.filtres button').forEach(function (b) {
      b.addEventListener('click', function () {
        document.querySelectorAll('.filtres button').forEach(function (x) { x.classList.toggle('actif', x === b); });
        var f = b.dataset.f;
        document.querySelectorAll('.session, .puce').forEach(function (s) { s.hidden = f && s.dataset.famille !== f; });
        var ec = document.querySelector('.encours-cal');
        if (ec) ec.hidden = !ec.querySelector('.puce:not([hidden])');
        document.querySelectorAll('.mois-titre').forEach(function (h) {
          var n = h.nextElementSibling, vu = false;
          while (n && !n.matches('.mois-titre')) { if (!n.hidden) vu = true; n = n.nextElementSibling; }
          h.hidden = !vu;
        });
      });
    });
    document.querySelectorAll('.copier').forEach(function (b) {
      b.addEventListener('click', function () {
        navigator.clipboard.writeText(b.dataset.emails).then(function () {
          b.textContent = 'E-mails copiés';
          setTimeout(function () { b.textContent = 'Copier les e-mails'; }, 2000);
        });
      });
    });
  </script>`);
}

function connexion(erreur) {
  return gabarit('Accès réservé', `
  <main class="connexion">
    <h1>Accès réservé</h1>
    <p>Cette page est réservée à l’équipe de Secourisme pour tous.</p>
    <form method="post" action="${CHEMIN}">
      <label for="mdp">Mot de passe</label>
      <input id="mdp" name="mdp" type="password" autocomplete="current-password" required autofocus>
      ${erreur ? '<p class="erreur">Mot de passe incorrect.</p>' : ''}
      <button type="submit" class="bouton">Entrer</button>
    </form>
  </main>`);
}

function gabarit(titre, contenu) {
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>${esc(titre)} · Secourisme pour tous</title>
<link rel="icon" href="/favicon.png">
<style>
@font-face { font-family: Archivo; font-weight: 700; font-display: swap; src: url(/fonts/archivo-700-latin.woff2) format('woff2'); }
@font-face { font-family: Archivo; font-weight: 800; font-display: swap; src: url(/fonts/archivo-800-latin.woff2) format('woff2'); }
@font-face { font-family: 'Public Sans'; font-weight: 400; font-display: swap; src: url(/fonts/public-sans-400-latin.woff2) format('woff2'); }
:root {
  --navy: #0b2540; --navy-lift: #17436e; --secours: #d8382a; --secours-wash: #fdecea;
  --azur: #1b6fa8; --gold: #8a6510; --gold-wash: #fbf1dc; --ocre-vif: #f8c000;
  --fond: #f4f6f9; --carte: #fff; --texte: #142233; --doux: #5a6878; --trait: #dde3ea;
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--fond); color: var(--texte); font: 16px/1.5 'Public Sans', system-ui, sans-serif; }
h1, h2, h3, .chiffre, .compte strong { font-family: Archivo, system-ui, sans-serif; }
a { color: var(--azur); }
body > * { max-width: 960px; margin-left: auto; margin-right: auto; padding-left: 16px; padding-right: 16px; }
.haut { display: flex; flex-wrap: wrap; gap: 12px 24px; align-items: end; justify-content: space-between; padding-top: 28px; }
h1 { margin: 0; font-size: 1.75rem; font-weight: 800; color: var(--navy); }
.resume { margin: 4px 0 0; color: var(--doux); }
.actions { display: flex; gap: 16px; align-items: center; }
.bouton { display: inline-block; border: 0; border-radius: 8px; background: var(--navy); color: #fff; font: 700 1rem Archivo, system-ui, sans-serif; padding: 10px 18px; text-decoration: none; cursor: pointer; }
.lien { color: var(--doux); font-size: .9rem; }
.filtres { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
.filtres button { border: 1px solid var(--trait); background: var(--carte); color: var(--texte); border-radius: 999px; padding: 6px 14px; font: inherit; font-size: .9rem; cursor: pointer; }
.filtres button.actif { background: var(--navy); border-color: var(--navy); color: #fff; }
.legende { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 14px; color: var(--doux); font-size: .85rem; margin: 14px auto 0; }
.pastille { display: inline-block; width: 12px; height: 12px; border-radius: 3px; margin-right: -8px; vertical-align: -1px; }
.p-complet { background: var(--navy); } .p-presque { background: var(--ocre-vif); } .p-faible { background: var(--secours); }
main { padding-bottom: 48px; }
.mois-titre { margin: 28px 0 10px; font-size: .95rem; text-transform: uppercase; letter-spacing: .06em; color: var(--doux); }
.session { display: grid; grid-template-columns: 64px 1fr auto; gap: 4px 16px; align-items: center; background: var(--carte); border: 1px solid var(--trait); border-left: 5px solid var(--trait); border-radius: 10px; padding: 14px 16px; margin-bottom: 10px; }
.session[hidden], .mois-titre[hidden] { display: none; }
.date { display: flex; flex-direction: column; align-items: center; line-height: 1.1; color: var(--navy); }
.jour, .mois { font-size: .85rem; color: var(--doux); }
.chiffre { font-size: 1.6rem; font-weight: 800; }
.infos { min-width: 0; }
h2 { margin: 0; font-size: 1.1rem; font-weight: 700; color: var(--navy); }
.meta { margin: 0; color: var(--doux); font-size: .9rem; }
.jauge { height: 8px; border-radius: 4px; background: #e8edf2; overflow: hidden; margin: 8px 0 4px; }
.jauge span { display: block; height: 100%; background: var(--azur); border-radius: 4px; }
.etat { display: flex; flex-wrap: wrap; gap: 4px 12px; margin: 0; font-size: .9rem; }
.discret { color: var(--doux); }
.types { display: flex; flex-wrap: wrap; gap: 2px 14px; margin: 0 0 2px; font-size: .85rem; color: var(--doux); }
.types b { color: var(--texte); }
.badge { font-weight: 700; }
.compte { text-align: right; white-space: nowrap; color: var(--doux); }
.compte strong { font-size: 1.9rem; font-weight: 800; color: var(--navy); }
.n-complet { border-left-color: var(--navy); } .n-complet .jauge span { background: var(--navy); }
.n-presque { border-left-color: var(--ocre-vif); } .n-presque .jauge span { background: var(--ocre-vif); } .n-presque .badge { color: var(--gold); }
.n-faible { border-left-color: var(--secours); } .n-faible .jauge span { background: var(--secours); } .n-faible .badge { color: var(--secours); }
.n-ferme .badge { color: var(--doux); }
details, .vide { grid-column: 1 / -1; }
.vide { margin: 4px 0 0; color: var(--doux); font-size: .9rem; }
summary { cursor: pointer; color: var(--azur); font-weight: 700; padding: 6px 0 2px; }
.liste { list-style: none; margin: 8px 0 0; padding: 0; border-top: 1px solid var(--trait); }
.liste li { display: grid; grid-template-columns: 28px 1fr auto; gap: 2px 12px; padding: 8px 0; border-bottom: 1px solid var(--trait); }
.num { color: var(--doux); font-size: .85rem; padding-top: 2px; }
.qui { min-width: 0; }
.contact { display: flex; flex-direction: column; align-items: flex-end; font-size: .9rem; min-width: 0; }
.contact a { overflow-wrap: anywhere; }
.quand { grid-column: 2 / -1; color: var(--doux); font-size: .8rem; }
.tag { display: inline-block; font-style: normal; font-size: .75rem; background: #eef2f6; color: var(--doux); border-radius: 4px; padding: 1px 6px; margin-left: 4px; }
.tag-regler { background: var(--gold-wash); color: var(--gold); }
.fauteuil { display: inline-flex; align-items: center; justify-content: center; vertical-align: middle; width: 28px; height: 28px; border-radius: 5px; background: var(--secours); color: #fff; flex: none; }
.fauteuil svg { width: 80%; height: 80%; }
.puce .fauteuil { display: flex; width: 26px; height: 26px; margin-top: 3px; box-shadow: 0 0 0 2px #fff; }
.tag .fauteuil { width: 18px; height: 18px; border-radius: 3px; margin-right: 2px; }
.alerte-handicap { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; color: var(--secours); }
.alerte-handicap .fauteuil { width: 34px; height: 34px; }
.tag-info { background: var(--secours-wash); color: var(--secours); }
.copier { margin-top: 10px; border: 1px solid var(--trait); background: var(--carte); border-radius: 8px; padding: 8px 14px; font: inherit; font-size: .9rem; cursor: pointer; }
.connexion { max-width: 380px; padding-top: 12vh; }
.connexion form { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
.connexion input { font: inherit; padding: 10px 12px; border: 1px solid var(--trait); border-radius: 8px; }
.erreur { color: var(--secours); margin: 0; }
.barre-vues { margin-top: 20px; }
.vues { display: inline-flex; border: 1px solid var(--trait); border-radius: 8px; overflow: hidden; background: var(--carte); }
.vues button { border: 0; background: none; font: inherit; font-weight: 700; padding: 8px 16px; cursor: pointer; color: var(--doux); }
.vues button.actif { background: var(--navy); color: #fff; }
main[hidden], .puce[hidden] { display: none !important; }
.mois-cal h3 { margin: 28px 0 10px; font-size: .95rem; text-transform: uppercase; letter-spacing: .06em; color: var(--doux); }
.grille { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 4px; }
.jsem { font-size: .75rem; color: var(--doux); text-align: center; text-transform: uppercase; }
.case { min-height: 92px; background: var(--carte); border: 1px solid var(--trait); border-radius: 6px; padding: 4px; display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.case.we { background: #f9fafc; }
.case.passe { opacity: .5; }
.case.auj { border-color: var(--azur); box-shadow: inset 0 0 0 1px var(--azur); }
.vide-case { background: none; border: 0; }
.nj { font-size: .8rem; color: var(--doux); }
.auj .nj { color: var(--azur); font-weight: 700; }
.puce { display: block; border-radius: 4px; padding: 3px 5px; font-size: .78rem; line-height: 1.25; text-decoration: none; background: var(--azur-wash, #e7f1f8); color: var(--azur); overflow-wrap: anywhere; }
.puce b { font-family: Archivo, system-ui, sans-serif; }
.puce.n-complet { background: var(--navy); color: #fff; }
.puce.n-presque { background: var(--ocre-vif); color: #221900; }
.puce.n-faible { background: var(--secours-wash); color: var(--secours); box-shadow: inset 3px 0 0 var(--secours); }
.puce.n-ferme { background: #eef2f6; color: var(--doux); }
.encours-cal[hidden] { display: none; }
.encours-cal { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin: 20px 0 0; }
.encours-cal > span { color: var(--doux); font-size: .9rem; }
.encours-cal .puce { display: inline-block; }
@media (max-width: 600px) {
  .grille { gap: 2px; }
  .case { min-height: 64px; padding: 2px; }
  .puce { font-size: .68rem; padding: 2px 3px; }
  .puce span { display: block; }
  .session { grid-template-columns: 48px 1fr auto; gap: 4px 12px; padding: 12px; }
  .chiffre { font-size: 1.35rem; }
  .compte strong { font-size: 1.5rem; }
  .liste li { grid-template-columns: 24px 1fr; }
  .contact { grid-column: 2; align-items: flex-start; }
}
</style>
</head>
<body>${contenu}
</body>
</html>`;
}

/* ---------- point d'entrée ---------- */

export async function suivi(request, env) {
  const url = new URL(request.url);
  const mdp = env.SUIVI_MDP;
  if (!mdp) return page(gabarit('Indisponible', '<main class="connexion"><h1>Page non configurée</h1></main>'), 503);
  const attendu = await jeton(mdp);
  const base = `Path=${CHEMIN}; HttpOnly; Secure; SameSite=Lax`;

  if (request.method === 'POST') {
    const form = await request.formData().catch(() => null);
    const saisi = String(form?.get('mdp') ?? '');
    if (!egaux(await jeton(saisi), attendu)) {
      // Un temps d'attente rend l'essai de mots de passe à la chaîne très lent.
      await new Promise((r) => setTimeout(r, 1000));
      return page(connexion(true), 401);
    }
    return new Response(null, {
      status: 303,
      headers: { Location: CHEMIN, 'Set-Cookie': `${COOKIE}=${attendu}; Max-Age=${TRENTE_JOURS}; ${base}`, ...ENTETES_PRIVES },
    });
  }

  if (url.searchParams.has('sortir')) {
    return new Response(null, {
      status: 303,
      headers: { Location: CHEMIN, 'Set-Cookie': `${COOKIE}=; Max-Age=0; ${base}`, ...ENTETES_PRIVES },
    });
  }

  const recu = cookieDe(request);
  if (!recu || !egaux(recu, attendu)) return page(connexion(false), 401);

  try {
    return page(tableau(await donnees(env)));
  } catch (e) {
    console.error('suivi-inscriptions', e);
    return page(gabarit('Erreur', `<main class="connexion"><h1>Wix ne répond pas</h1>
      <p>Les inscriptions n’ont pas pu être lues. Réessayez dans un instant.</p>
      <p><a class="bouton" href="${CHEMIN}">Réessayer</a></p></main>`), 502);
  }
}
