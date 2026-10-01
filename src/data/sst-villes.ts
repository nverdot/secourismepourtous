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
 * Antibes, Cagnes-sur-Mer et Saint-Laurent-du-Var ont en plus une présence
 * réelle à montrer : nous y tenons des postes de secours (villes.ts).
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
  /**
   * Slug de la commune dans villes.ts, quand nous y tenons des postes de
   * secours. C'est une présence réelle : la page la montre.
   */
  postes?: string;
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
  {
    slug: 'antibes-juan-les-pins',
    nom: 'Antibes Juan-les-Pins',
    article: 'à Antibes et Juan-les-Pins',
    communeAcces: 'Antibes',
    postes: 'antibes-juan-les-pins',
    secteur: 'Antibes, Juan-les-Pins, Golfe-Juan et Vallauris',
    contexte:
      'À Antibes et Juan-les-Pins, l’activité suit la mer et la saison : le port, les plages, les restaurants, les hôtels. Les équipes grossissent en été, avec des saisonniers qui ne connaissent ni les lieux ni les consignes.',
    risques: [
      {
        titre: 'Sur le port et dans les ateliers',
        texte: 'Outils, câbles, pièces lourdes : une coupure profonde arrive vite, parfois loin d’un accès pour les secours.',
        geste: 'saignement-abondant',
      },
      {
        titre: 'En plein service d’été',
        texte: 'Chaleur, rythme, heures debout : le malaise d’un collègue survient quand l’équipe est débordée.',
        geste: 'malaise',
      },
      {
        titre: 'En salle ou en terrasse',
        texte: 'Un étouffement pendant un repas se joue avant l’arrivée de tout secours. C’est le serveur le plus proche qui agit.',
        geste: 'etouffement',
      },
    ],
    loi:
      'L’article R4224-16 du Code du travail demande à l’employeur d’organiser les premiers secours avec des mesures adaptées à ses risques. Quand l’effectif double en été, l’organisation doit suivre. Le certificat SST étant valable 24 mois, un saisonnier formé au printemps l’est encore la saison suivante.',
    faq: [
      {
        question: 'Y a-t-il des formations SST à Antibes ou Juan-les-Pins ?',
        reponse:
          `Oui, dans votre établissement. ${GROUPE} Les salariés qui viennent seuls rejoignent une session dans nos locaux de Nice, à environ 25 minutes en TER.`,
      },
      {
        question: 'Faut-il former les saisonniers au SST ?',
        reponse:
          'Aucun texte ne distingue les saisonniers. L’employeur doit organiser les premiers secours pour tous ceux qui travaillent, quand ils travaillent (article R4224-16 du Code du travail). Si vos équipes d’été tournent sans les permanents, il faut des secouristes parmi elles. Le certificat SST reste valable 24 mois.',
      },
      {
        question: 'Quand former une équipe avant la saison ?',
        reponse:
          'Pour un groupe constitué, la date se fixe avec vous. Beaucoup d’établissements choisissent les semaines qui précèdent l’ouverture, quand l’équipe est réunie et que l’activité n’a pas commencé.',
      },
    ],
    seo: {
      title: 'Formation SST à Antibes Juan-les-Pins | Dans vos locaux',
      description:
        'Formation SST et MAC SST à Antibes et Juan-les-Pins : nous formons vos équipes dans votre établissement, avant la saison. Organisme certifié Qualiopi.',
    },
  },
  {
    slug: 'cagnes-sur-mer',
    nom: 'Cagnes-sur-Mer',
    article: 'à Cagnes-sur-Mer',
    communeAcces: 'Cagnes-sur-Mer',
    postes: 'cagnes-sur-mer',
    secteur: 'Cagnes-sur-Mer, Villeneuve-Loubet et La Gaude',
    contexte:
      'Cagnes-sur-Mer vit de ses commerces, de ses artisans et de ses petites entreprises. Dans une équipe de cinq ou dix personnes, il n’y a ni infirmier ni service de sécurité : le secouriste, c’est l’un de vous.',
    risques: [
      {
        titre: 'Un client s’effondre en magasin',
        texte: 'Le sauveteur secouriste du travail est formé pour ses collègues. Devant un client en arrêt cardiaque, il est aussi le seul à savoir quoi faire.',
        geste: 'arret-cardiaque',
      },
      {
        titre: 'La coupure à l’atelier',
        texte: 'Chez un artisan, on travaille souvent à deux ou trois. Si l’un se blesse, l’autre doit savoir arrêter un saignement.',
        geste: 'saignement-abondant',
      },
      {
        titre: 'La brûlure',
        texte: 'Boulangerie, restauration, garage : une source de chaleur n’est jamais loin, et les premières minutes comptent.',
        geste: 'brulure',
      },
    ],
    loi:
      'La taille de l’entreprise ne change rien : l’article R4224-16 du Code du travail s’applique dès le premier salarié, et l’article R4224-14 demande un matériel de premiers secours adapté et accessible. Dans une petite équipe, former une ou deux personnes suffit souvent à couvrir les horaires.',
    faq: [
      {
        question: 'Y a-t-il des formations SST à Cagnes-sur-Mer ?',
        reponse:
          `Oui, dans votre entreprise. ${GROUPE} Les salariés qui viennent seuls rejoignent une session dans nos locaux de Nice, à environ 15 minutes en TER.`,
      },
      {
        question: 'Une petite entreprise doit-elle former un SST ?',
        reponse:
          'Le Code du travail n’impose pas le SST par son nom, quelle que soit la taille. Mais son article R4224-16 demande à tout employeur, dès le premier salarié, d’organiser les premiers secours après avis du médecin du travail. Le SST est la formation que l’INRS recommande pour cela.',
      },
      {
        question: 'Comment faire si je n’ai qu’un ou deux salariés à former ?',
        reponse:
          'Ils rejoignent une session au calendrier dans nos locaux de Nice, avec des salariés d’autres entreprises. La formation en entreprise demande un groupe de 4 à 10 personnes.',
      },
    ],
    seo: {
      title: 'Formation SST à Cagnes-sur-Mer | Commerces et artisans',
      description:
        'Formation SST et MAC SST à Cagnes-sur-Mer : dans votre entreprise pour un groupe, ou à Nice à 15 minutes en TER. Organisme certifié Qualiopi.',
    },
  },
  {
    slug: 'saint-laurent-du-var',
    nom: 'Saint-Laurent-du-Var',
    article: 'à Saint-Laurent-du-Var',
    communeAcces: 'Saint-Laurent-du-Var',
    postes: 'saint-laurent-du-var',
    secteur: 'Saint-Laurent-du-Var, La Gaude et Saint-Jeannet',
    contexte:
      'Saint-Laurent-du-Var réunit un grand centre commercial, une zone d’activités avec ses entrepôts, ses garages et ses ateliers, et un port. Des métiers très différents, à dix minutes de nos locaux.',
    risques: [
      {
        titre: 'En entrepôt ou en réserve',
        texte: 'Une chute, un choc, une charge qui tombe. On retrouve parfois un collègue inconscient, seul entre deux rayonnages.',
        geste: 'perte-de-connaissance',
      },
      {
        titre: 'Au garage ou à l’atelier',
        texte: 'Outils coupants, pièces chaudes, machines : la coupure et la brûlure sont les accidents les plus courants.',
        geste: 'saignement-abondant',
      },
      {
        titre: 'En boutique',
        texte: 'Un collègue ou un client fait un malaise au milieu de l’affluence. Reconnaître les signes d’un AVC change tout.',
        geste: 'malaise',
      },
    ],
    loi:
      'Dans un atelier où sont accomplis des travaux dangereux, l’article R4224-15 du Code du travail exige un membre du personnel formé aux premiers secours. Dans un commerce ou un entrepôt, l’article R4224-16 demande d’organiser les secours selon les risques. Avec des amplitudes horaires larges, il faut des SST à l’ouverture comme à la fermeture.',
    faq: [
      {
        question: 'Y a-t-il des formations SST à Saint-Laurent-du-Var ?',
        reponse:
          `Oui, dans votre entreprise. ${GROUPE} Nos locaux de Nice sont aussi à environ 10 minutes en TER, pour les salariés qui viennent seuls.`,
      },
      {
        question: 'Un garage ou un atelier doit-il avoir un secouriste ?',
        reponse:
          'Oui s’il s’y accomplit des travaux dangereux : l’article R4224-15 du Code du travail exige alors un membre du personnel formé aux premiers secours dans chaque atelier. Le texte ne nomme pas le SST, mais c’est la formation que l’INRS recommande.',
      },
      {
        question: 'Comment couvrir un magasin ouvert du matin au soir ?',
        reponse:
          'Le secouriste doit être présent quand on travaille. Avec des équipes d’ouverture et de fermeture, il faut des SST dans chacune. D’après l’INRS, leur nombre s’évalue selon l’effectif, les risques et l’organisation, sans pourcentage imposé.',
      },
    ],
    seo: {
      title: 'Formation SST à Saint-Laurent-du-Var | Dans vos locaux',
      description:
        'Formation SST et MAC SST à Saint-Laurent-du-Var : commerces, entrepôts, ateliers. Dans votre entreprise, ou à Nice à 10 minutes. Certifié Qualiopi.',
    },
  },
];
