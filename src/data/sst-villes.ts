/**
 * Le SST dans les communes du département.
 *
 * ⚠️ CE QUI REND CES PAGES HONNÊTES. Nos sessions au calendrier ont lieu à
 * Nice. Ce qui est vraiment local, c'est que nous venons former un groupe dans
 * les locaux de l'entreprise, partout dans les Alpes-Maritimes. Chaque page dit
 * donc les deux, sans laisser croire à un centre de formation sur place.
 *
 * ⚠️ UNE COMMUNE = UN ANGLE. Une page n'a de raison d'être que si le tissu
 * d'entreprises y pose une question différente : bureaux, industrie, hôtellerie.
 * Dix pages qui ne changeraient que le nom de la ville seraient des pages
 * satellites, que Google déclasse (voir villes.ts et acces-communes.ts).
 *
 * Aucune référence client n'est citée : SPT ne nous en a pas fourni. Pour
 * ajouter une commune ou une référence, demander à l'association des
 * entreprises réellement formées sur place, avec leur accord.
 */

export interface SstVille {
  slug: string;
  nom: string;
  /** « à Sophia Antipolis », « à Carros ». */
  article: string;
  /** Nom tel qu'il figure dans acces-communes.ts, pour le trajet vers Nice. */
  communeAcces: string;
  /** Communes et zones couvertes, pour situer. */
  secteur: string;
  /** Ce qui caractérise les entreprises du lieu. */
  contexte: string;
  /** Les situations de travail propres à ce tissu d'entreprises. */
  risques: { titre: string; texte: string; geste?: string }[];
  /** Ce que le Code du travail implique ici, concrètement. */
  loi: string;
  faq: { question: string; reponse: string }[];
  seo: { title: string; description: string };
}

const GROUPE =
  'Pour un groupe constitué de 4 à 10 salariés, nous venons dans vos locaux. La formation initiale dure 14 heures sur deux journées, le MAC SST 7 heures sur une journée.';

export const sstVilles: SstVille[] = [
  {
    slug: 'sophia-antipolis',
    nom: 'Sophia Antipolis',
    article: 'à Sophia Antipolis',
    communeAcces: 'Sophia Antipolis',
    secteur: 'Valbonne, Biot, Antibes, Mougins et Vallauris',
    contexte:
      'Sophia Antipolis réunit surtout des bureaux, des centres de recherche et des sièges d’entreprise. On y pense peu aux accidents, et c’est justement là que personne ne sait quoi faire quand un collègue s’effondre en réunion.',
    risques: [
      {
        titre: 'Le malaise au bureau',
        texte: 'Un collègue pâle, confus, qui a mal dans la poitrine ou du mal à parler. Dans un open space, le premier réflexe est souvent d’attendre que ça passe.',
        geste: 'malaise',
      },
      {
        titre: 'L’arrêt cardiaque',
        texte: 'Beaucoup d’immeubles de bureaux ont un défibrillateur. Encore faut-il que quelqu’un sache où il est, et ose s’en servir.',
        geste: 'arret-cardiaque',
      },
      {
        titre: 'Le restaurant d’entreprise',
        texte: 'Un étouffement pendant le déjeuner se joue avant l’arrivée de tout secours. C’est un collègue de table qui agit, ou personne.',
        geste: 'etouffement',
      },
    ],
    loi:
      'Dans des bureaux, le Code du travail n’impose pas de secouriste par atelier. Mais son article R4224-16 demande à tout employeur d’organiser les premiers secours après avis du médecin du travail, et de consigner ces mesures par écrit. Former des SST à chaque étage ou dans chaque équipe est la manière la plus simple d’y répondre.',
    faq: [
      {
        question: 'Y a-t-il des formations SST à Sophia Antipolis ?',
        reponse:
          `Oui, dans votre entreprise. ${GROUPE} Les salariés qui viennent seuls rejoignent une session dans nos locaux de Nice.`,
      },
      {
        question: 'Une entreprise de bureaux doit-elle avoir des SST ?',
        reponse:
          'Le Code du travail n’impose un secouriste formé que dans les ateliers et sur certains chantiers où sont réalisés des travaux dangereux. Mais l’article R4224-16 demande à tout employeur d’organiser les premiers secours après avis du médecin du travail. Le SST est la formation que l’INRS recommande pour cela.',
      },
      {
        question: 'Combien de salariés faut-il former dans des bureaux ?',
        reponse:
          'Aucun texte ne fixe de nombre. D’après l’INRS, il s’évalue selon l’effectif, les risques et l’organisation : étages, bâtiments séparés, télétravail, horaires décalés. L’objectif est qu’un secouriste soit présent là où l’on travaille, quand on y travaille.',
      },
    ],
    seo: {
      title: 'Formation SST à Sophia Antipolis | Dans votre entreprise',
      description:
        'Formation SST et MAC SST à Sophia Antipolis : nous formons vos salariés dans vos locaux, à Valbonne, Biot, Antibes ou Mougins. Organisme certifié Qualiopi.',
    },
  },
  {
    slug: 'carros',
    nom: 'Carros',
    article: 'à Carros',
    communeAcces: 'Carros',
    secteur: 'la zone industrielle de Carros – Le Broc et la plaine du Var',
    contexte:
      'Carros, c’est d’abord une zone industrielle : ateliers, production, logistique, maintenance. Les machines, les charges et les produits y rendent l’accident plus probable, et plus grave.',
    risques: [
      {
        titre: 'La coupure qui saigne beaucoup',
        texte: 'Une machine, une lame, une tôle. Face à une hémorragie, les premières minutes appartiennent au collègue le plus proche.',
        geste: 'saignement-abondant',
      },
      {
        titre: 'La brûlure',
        texte: 'Une pièce chaude, de la vapeur, un produit. Ce qu’on fait dans les premières minutes change la suite.',
        geste: 'brulure',
      },
      {
        titre: 'Le collègue inconscient',
        texte: 'Après une chute ou un choc, parfois seul dans un entrepôt. Il faut savoir le protéger et alerter sans perdre de temps.',
        geste: 'perte-de-connaissance',
      },
    ],
    loi:
      'Ici, l’obligation est directe. L’article R4224-15 du Code du travail exige un membre du personnel formé aux premiers secours dans chaque atelier où sont accomplis des travaux dangereux. Avec des équipes en horaires décalés, il faut un secouriste présent dans chaque équipe, pas seulement en journée.',
    faq: [
      {
        question: 'Y a-t-il des formations SST à Carros ?',
        reponse:
          `Oui, dans votre entreprise. ${GROUPE} Les mises en situation partent de vos postes de travail et de vos risques.`,
      },
      {
        question: 'Le SST est-il obligatoire dans un atelier ?',
        reponse:
          'L’article R4224-15 du Code du travail exige un membre du personnel formé aux premiers secours dans chaque atelier où sont accomplis des travaux dangereux. Le texte ne nomme pas le SST, mais c’est la formation que l’INRS recommande pour répondre à cette obligation.',
      },
      {
        question: 'Comment couvrir des équipes en 2×8 ou 3×8 ?',
        reponse:
          'Le secouriste doit être présent quand on travaille : il faut donc des SST dans chaque équipe. D’après l’INRS, leur nombre s’évalue selon l’effectif, les risques et l’organisation du travail, sans pourcentage imposé.',
      },
    ],
    seo: {
      title: 'Formation SST à Carros | Zone industrielle, dans vos locaux',
      description:
        'Formation SST et MAC SST à Carros : nous formons vos équipes dans votre atelier ou votre entrepôt, sur vos risques. Organisme certifié Qualiopi.',
    },
  },
  {
    slug: 'cannes',
    nom: 'Cannes',
    article: 'à Cannes',
    communeAcces: 'Cannes',
    secteur: 'Cannes, Le Cannet, Mandelieu-la-Napoule et Mougins',
    contexte:
      'À Cannes, on travaille beaucoup au contact du public : hôtels, restaurants, commerces, congrès. Le sauveteur secouriste du travail y porte secours à ses collègues, et se retrouve souvent le premier auprès d’un client.',
    risques: [
      {
        titre: 'En cuisine',
        texte: 'Couteaux, friteuses, fours, sols glissants. La coupure et la brûlure sont le quotidien d’une brigade.',
        geste: 'brulure',
      },
      {
        titre: 'En salle et à l’accueil',
        texte: 'Un client ou un collègue qui s’étouffe pendant un repas : tout se joue avant l’arrivée des secours.',
        geste: 'etouffement',
      },
      {
        titre: 'Pendant le coup de feu',
        texte: 'Chaleur, fatigue, station debout prolongée : le malaise arrive quand personne n’a le temps de s’en occuper.',
        geste: 'malaise',
      },
    ],
    loi:
      'Un hôtel ou un restaurant n’est pas un atelier au sens de l’article R4224-15. Mais l’article R4224-16 demande à l’employeur d’organiser les premiers secours après avis du médecin du travail, avec des mesures adaptées à ses risques. Avec des équipes du matin, du soir et de nuit, il faut des SST sur chaque service.',
    faq: [
      {
        question: 'Y a-t-il des formations SST à Cannes ?',
        reponse:
          `Oui, dans votre établissement. ${GROUPE} Les salariés qui viennent seuls rejoignent une session dans nos locaux de Nice, accessibles en TER.`,
      },
      {
        question: 'Un hôtel ou un restaurant doit-il avoir des SST ?',
        reponse:
          'L’article R4224-16 du Code du travail demande à tout employeur d’organiser les premiers secours après avis du médecin du travail, avec des mesures adaptées à la nature des risques. En cuisine, où coupures et brûlures sont fréquentes, le SST est la formation que l’INRS recommande.',
      },
      {
        question: 'Peut-on former une équipe hors saison ?',
        reponse:
          'Oui. Pour un groupe constitué, la date se fixe avec vous : beaucoup d’établissements choisissent une période creuse. Contactez-nous pour convenir d’une date.',
      },
    ],
    seo: {
      title: 'Formation SST à Cannes | Hôtels, restaurants, commerces',
      description:
        'Formation SST et MAC SST à Cannes : nous formons vos équipes dans votre établissement, à la date qui vous convient. Organisme certifié Qualiopi.',
    },
  },
];
