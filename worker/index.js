/**
 * Point d'entrée du Worker Cloudflare.
 *
 * Le site est entièrement statique : Cloudflare sert `dist/` directement, sans
 * passer par ce code. Ce Worker n'est appelé que pour les chemins qui ne
 * correspondent à aucun fichier — c'est-à-dire, en pratique, /api/contact et
 * rien d'autre.
 *
 * Tout le reste retombe sur `env.ASSETS`, qui applique les règles déclarées
 * dans wrangler.toml (dont la page 404).
 */

import { contact } from './contact.js';

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/contact') return contact(request, env);

    return env.ASSETS.fetch(request);
  },
};
