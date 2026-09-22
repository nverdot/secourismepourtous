/**
 * Point d'entrée du Worker Cloudflare.
 *
 * Le site est entièrement statique : Cloudflare sert `dist/` directement, sans
 * passer par ce code. Ce Worker n'est appelé que pour les chemins qui ne
 * correspondent à aucun fichier — c'est-à-dire /api/contact et les anciennes
 * pages de session Wix.
 *
 * Tout le reste retombe sur `env.ASSETS`, qui applique les règles déclarées
 * dans wrangler.toml (dont la page 404).
 */

import { contact } from './contact.js';

/**
 * Anciennes pages de session Wix (/event-details/…).
 *
 * Le site n'y renvoie plus : ses boutons d'inscription pointent directement sur
 * reservation.secourismepourtous.org. Ces adresses ne viennent donc que de
 * Google et de vieux liens, et désignent presque toujours une session
 * terminée — une page Wix « terminée », en noindex, que la Search Console
 * signalait en échec. On envoie plutôt vers la fiche de la formation, qui
 * affiche les prochaines dates.
 *
 * L'ordre compte : les recyclages (fc-…) avant les formations initiales.
 * Un nom inconnu part chez Wix, comme avant.
 */
const SESSIONS_WIX = [
  ['fc-pse1', 'fc-pse-1'],
  ['fc-pse2', 'fc-pse-2'],
  ['fc-psc', 'fc-psc'],
  ['fc-bnssa', 'fc-bnssa'],
  ['fc-ssa', 'fc-bnssa'],
  ['fc-bsb', 'fc-bsb'],
  ['formations-recyclage-bsb', 'fc-bsb'],
  ['mac-sst', 'mac-sst'],
  ['psc-', 'psc'],
  ['pse1', 'pse-1'],
  ['pse2', 'pse-2'],
  ['bnssa', 'ssa'],
  ['ssa-', 'ssa'],
  ['formations-bsb', 'bsb'],
  ['bsb', 'bsb'],
  ['sst', 'sst'],
];

function ancienneSession(url) {
  const nom = url.pathname.slice('/event-details/'.length);
  const trouve = SESSIONS_WIX.find(([debut]) => nom.startsWith(debut));
  const cible = trouve
    ? new URL(`/formations/${trouve[1]}`, url.origin)
    : new URL(url.pathname + url.search, 'https://reservation.secourismepourtous.org');
  return Response.redirect(cible.href, 301);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname === '/api/contact') return contact(request, env);
    if (pathname.startsWith('/event-details/')) return ancienneSession(url);

    return env.ASSETS.fetch(request);
  },
};
