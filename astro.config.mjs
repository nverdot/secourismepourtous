// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.secourismepourtous.org',
  // Site statique : chaque page est du HTML servi tel quel, ce qui règle le
  // problème de fond du site Wix actuel — le contenu est lisible par les
  // moteurs de recherche sans dépendre de JavaScript.
  output: 'static',
  build: {
    // /formations/psc plutôt que /formations/psc/ : conserve les URL actuelles
    format: 'file',
  },
  // Génère sitemap.xml : Google découvre les 13 pages sans attendre de les croiser.
  // Le sitemap ne propose que des pages destinées aux moteurs. « /merci » est
  // une confirmation d'envoi : elle porte « noindex », l'annoncer ici aurait
  // valu un avertissement dans Search Console.
  integrations: [sitemap({ filter: (page) => !/\/merci\/?$/.test(page) })],
  devToolbar: { enabled: false },
});
