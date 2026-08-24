# Secourisme Pour Tous — site Astro

Site statique en Astro, connecté aux API Wix pour les sessions de formation.
Wix reste le back-office (événements, billetterie, paiements) ; ce projet ne
remplace que la partie visible.

## Lancer le site

```bash
cd site
npm install
npm run dev
```

Le site est alors sur http://localhost:4321

Pour générer la version de production : `npm run build` (résultat dans `dist/`).

## Comment les dates de formation arrivent sur le site

Les formations de SPT ne sont **pas** dans Wix Bookings — qui ne contient que le
DPS — mais dans **Wix Events & Tickets**, sous forme d'événements en billetterie.
C'est donc l'API Events que `src/lib/wix.ts` interroge.

Le site étant statique, cet appel a lieu **au build**, pas chez le visiteur :
les dates sont figées dans le HTML livré. Il faut donc relancer un build quand le
planning change. C'est aussi ce qui rend le site rapide et parfaitement indexable.

### Brancher la vraie API

1. Tableau de bord Wix → **Paramètres** → **Clés API** → créer une clé avec les
   autorisations de lecture sur Wix Events.
2. Créer un fichier `.env` à la racine de `site/` :

```
WIX_API_KEY=la_cle_generee
WIX_SITE_ID=c76f219b-29ee-4805-aae5-8f78da0f719f
```

3. Relancer `npm run dev`. Le message « repli sur le cache local » doit disparaître.

Sans ces variables, le site se construit quand même en utilisant
`src/data/sessions-cache.json` — un instantané des sessions réelles pris le
20 août 2026. **Ces dates se périment** : le cache n'est là que pour faire
tourner la maquette avant la création de la clé.

### Rattacher une formation à ses sessions

Chaque formation porte un champ `wixEvent` dans `src/data/formations.ts`, qui
correspond au titre de l'événement côté Wix. Les titres n'étant pas normalisés
(« PSE1 - Formation », « FC BNSSA - Recyclage »…), le rapprochement se fait sur
une forme simplifiée, en distinguant explicitement les recyclages (`FC`) des
formations initiales — sans quoi les deux se mélangeraient.

Vérification faite au 20/08/2026 : PSC 8 sessions, PSE1 7, PSE2 3, BNSSA 3,
SST 0 (aucun événement SST côté Wix).

## Structure

```
src/
  data/
    association.ts       identité, chiffres, coordonnées
    formations.ts        catalogue — une seule source pour toutes les pages
    sessions-cache.json  instantané des sessions (temporaire)
  lib/wix.ts             lecture de l'API Wix Events
  components/            Header, Footer, HeroFormation, ObjectifsProgramme, Sessions
  layouts/Base.astro     head, SEO, données structurées
  pages/
    index.astro
    formations/index.astro
    formations/[slug].astro   une page par formation
```

Pour modifier un tarif, une durée ou un programme : tout est dans
`src/data/formations.ts`. Aucune page n'est à toucher.

## Ce qui reste à faire

**Contenu à valider par l'association**
- Durée, prérequis et tarif du SSA et de son recyclage : les champs affichent
  « Nous consulter » en attendant le référentiel FFSS, ce qui ne publie aucun
  chiffre non confirmé.
- Intitulés des modules de programme pour les formations autres que le PSC.

**Pages non encore créées**
`/qui-sommes-nous`, `/postes-de-secours`, `/sauvetage-sportif`, `/contact`,
`/mentions-legales`, `/politique-de-confidentialite`, `/cgv`.
Les liens existent déjà dans le menu et le pied de page.

**Formations manquantes**
5 sur 10 sont en place. Restent PAE FPSC, PAE FPS, FC PSE1/PSE2, FC BNSSA,
BSB et FC BSB.

**Inscription**
Les boutons « S'inscrire » pointent vers `/contact`. Pour une inscription
réelle, deux options : renvoyer vers la page événement Wix correspondante, ou
implémenter le checkout via l'API Orders de Wix Events.

**Images**
Aucune photo pour l'instant : les héros sont en dégradé. Les visuels sont dans
le gestionnaire de médias Wix et peuvent être servis depuis leur URL
`static.wixstatic.com`, ou copiés dans `public/`.

**Avant toute mise en ligne**
Ce site ne peut pas cohabiter avec le site Wix sur le même domaine. Le jour où
il le remplacerait, il faudrait des redirections 301 depuis chaque ancienne URL
— c'est la condition pour ne pas perdre le référencement acquis.
