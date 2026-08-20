# Mettre le site en ligne

Le site est un site statique généré par Astro. Il peut être publié par Netlify
ou par Cloudflare Pages : les deux configurations sont présentes dans le dépôt
et ne se gênent pas.

## Où en est-on

- **Netlify** — configuration dans `netlify.toml`, fonction dans
  `netlify/functions/contact.mjs`. Les déploiements de production sont
  suspendus depuis le 20 août 2026, faute de crédits sur la formule gratuite.
  Le site reste en ligne, figé sur le dernier build réussi.
- **Cloudflare Pages** — configuration ci-dessous, fonction dans
  `functions/api/contact.js`, en-têtes dans `public/_headers`. Rien n'est
  encore branché : il suffit de connecter le dépôt.

## Basculer sur Cloudflare Pages

1. Créer un compte sur [dash.cloudflare.com](https://dash.cloudflare.com) —
   gratuit, pas de carte bancaire demandée.
2. **Workers & Pages → Create → Pages → Connect to Git**, choisir le dépôt
   `nverdot/secourismepourtous`.
3. Renseigner :

   | Champ | Valeur |
   |---|---|
   | Framework preset | Astro |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | `site` |

4. **Settings → Environment variables**, ajouter pour *Production* et *Preview* :

   | Nom | Où la trouver |
   |---|---|
   | `WIX_API_KEY` | Wix → Paramètres → Clés API. **Clé administrateur : ne jamais la publier ni l'envoyer par message.** |
   | `WIX_SITE_ID` | `c76f219b-29ee-4805-aae5-8f78da0f719f` |
   | `PUBLIC_WIX_CLIENT_ID` | `22902884-dd06-4ac4-92b3-33f9527fec21` — publique par nature |

5. Lancer le déploiement. L'adresse obtenue ressemble à
   `secourismepourtous.pages.dev`.
6. **Dans Wix → Headless → Domaines de redirection autorisés**, ajouter cette
   nouvelle adresse. Sans elle, le paiement en ligne échouera : Wix refuse de
   renvoyer le visiteur vers un domaine inconnu.
7. Vérifier, dans l'ordre : une page de formation affiche des dates, un clic sur
   une date ouvre la fenêtre d'inscription, le formulaire de contact aboutit sur
   `/merci` et crée bien un contact dans Wix.

## Rafraîchir les dates sans modifier le code

Les dates sont lues **au moment du build**. Modifier un événement dans Wix ne
change donc rien tant qu'un nouveau build n'a pas eu lieu.

- Sur Cloudflare : **Deployments → Retry deployment**, ou un *Deploy Hook*
  (Settings → Builds → Deploy hooks) appelé par le workflow
  `.github/workflows/rafraichir-dates.yml`.
- Sur Netlify : build hook déjà configuré dans ce même workflow.

Après un changement d'hébergeur, remplacer l'URL du hook dans ce workflow.

## Revenir à Netlify

Rien à défaire : `netlify.toml` et `netlify/functions/` sont toujours là. Il
suffit que les déploiements soient de nouveau autorisés côté Netlify.
