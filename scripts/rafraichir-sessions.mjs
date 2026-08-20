/**
 * Régénère src/data/sessions-cache.json depuis Wix.
 *
 * POURQUOI CE SCRIPT
 *
 * Le site lisait Wix pendant la construction, ce qui obligeait l'hébergeur à
 * détenir la clé API — une clé d'administration. Deux problèmes : elle se
 * retrouvait dans un tableau de bord de plus, et le moindre réglage manqué
 * faisait retomber le site sur un instantané périmé, sans que rien ne le
 * signale.
 *
 * Désormais l'instantané est versionné dans le dépôt et régénéré ici. La clé ne
 * quitte plus la machine qui exécute ce script — un poste de travail, ou une
 * action GitHub avec un secret de dépôt. L'hébergeur, lui, construit un site
 * sans aucun secret.
 *
 * USAGE
 *   cd site && node scripts/rafraichir-sessions.mjs
 *
 * Les variables WIX_API_KEY et WIX_SITE_ID sont lues dans site/.env, ou dans
 * l'environnement si elles y sont déjà.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = join(ICI, '..');
const SORTIE = join(RACINE, 'src/data/sessions-cache.json');

/** Charge site/.env sans dépendance externe. */
function chargeEnv() {
  const f = join(RACINE, '.env');
  if (!existsSync(f)) return;
  for (const ligne of readFileSync(f, 'utf-8').split('\n')) {
    const m = ligne.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    const valeur = m[2].trim().replace(/^["']|["']$/g, '');
    if (valeur && !process.env[m[1]]) process.env[m[1]] = valeur;
  }
}
chargeEnv();

const CLE = process.env.WIX_API_KEY;
const SITE = process.env.WIX_SITE_ID;
const CLIENT_PUBLIC = process.env.PUBLIC_WIX_CLIENT_ID ?? '22902884-dd06-4ac4-92b3-33f9527fec21';

if (!CLE || !SITE) {
  console.error('✗ WIX_API_KEY ou WIX_SITE_ID manquante. Rien n’a été écrit.');
  process.exit(1);
}

const entetes = {
  Authorization: CLE,
  'wix-site-id': SITE,
  'Content-Type': 'application/json',
};

/** Champs présents sur tous les événements : le module les gère déjà. */
const STANDARDS = new Set(['firstName', 'lastName', 'email', 'phone', 'comment']);

async function evenements() {
  const r = await fetch('https://www.wixapis.com/events/v3/events/query', {
    method: 'POST',
    headers: entetes,
    body: JSON.stringify({
      query: {
        filter: { status: { $eq: 'UPCOMING' } },
        sort: [{ fieldName: 'dateAndTimeSettings.startDate', order: 'ASC' }],
        paging: { limit: 100 },
      },
    }),
  });
  if (!r.ok) throw new Error(`requête événements : ${r.status}`);
  return (await r.json()).events ?? [];
}

/** Questions propres à un événement, au-delà des champs standards. */
async function champsDe(id) {
  try {
    const r = await fetch(`https://www.wixapis.com/events/v1/events/${id}/form`, { headers: entetes });
    if (!r.ok) return [];
    const d = await r.json();
    const sortie = [];
    for (const c of d?.form?.controls ?? []) {
      for (const e of c?.inputs ?? []) {
        if (STANDARDS.has(e?.name)) continue;
        sortie.push({
          nom: e.name,
          libelle: e.label ?? c.label ?? '',
          genre: c.type === 'DROPDOWN' || c.type === 'RADIO' || (e.options ?? []).length
            ? 'LISTE'
            : c.type === 'TEXTAREA' ? 'PARAGRAPHE' : 'TEXTE',
          options: e.options ?? [],
          obligatoire: Boolean(e.mandatory),
        });
      }
    }
    return sortie;
  } catch {
    return [];
  }
}

/** Places encore réservables, vues comme les voit un visiteur. */
async function placesDe(client, id) {
  try {
    const r = await client.orders.listAvailableTickets({ eventId: id, limit: 20 });
    const defs = r.definitions ?? [];
    if (!defs.length) return 0;
    return defs.reduce((n, d) => n + Number(d?.limitPerCheckout ?? 0), 0);
  } catch {
    return null;
  }
}

const { createClient, OAuthStrategy } = await import('@wix/sdk');
const ev = await import('@wix/events');
const visiteur = createClient({
  modules: { orders: ev.orders },
  auth: OAuthStrategy({ clientId: CLIENT_PUBLIC }),
});

const bruts = await evenements();
console.log(`${bruts.length} événements à venir lus depuis Wix.`);

const sessions = [];
const PAQUET = 6;
for (let i = 0; i < bruts.length; i += PAQUET) {
  await Promise.all(bruts.slice(i, i + PAQUET).map(async (e) => {
    const debut = e?.dateAndTimeSettings?.startDate;
    if (!debut) return;
    const dispo = await placesDe(visiteur, e.id);
    sessions.push({
      id: e.id,
      titre: e.title ?? '',
      slug: e.slug ?? '',
      debut,
      fin: e?.dateAndTimeSettings?.endDate ?? null,
      lieu: e?.location?.name ?? null,
      // Wix renvoie l'URL en deux morceaux : sans `path`, on retombe sur l'accueil.
      url: e?.eventPageUrl?.base && e?.eventPageUrl?.path
        ? e.eventPageUrl.base + e.eventPageUrl.path
        : null,
      complet: dispo === 0,
      champs: await champsDe(e.id),
    });
  }));
  process.stdout.write(`  ${Math.min(i + PAQUET, bruts.length)}/${bruts.length}\r`);
}

sessions.sort((a, b) => new Date(a.debut) - new Date(b.debut));
writeFileSync(SORTIE, JSON.stringify(sessions, null, 2) + '\n', 'utf-8');

const avecChamps = sessions.filter((s) => s.champs.length).length;
const complets = sessions.filter((s) => s.complet).length;
console.log(`\n✓ ${sessions.length} sessions écrites dans src/data/sessions-cache.json`);
console.log(`  ${avecChamps} avec question supplémentaire · ${complets} complètes`);
