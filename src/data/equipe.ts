/**
 * Portraits des membres actifs.
 *
 * D'OÙ VIENT CE CONTENU. D'un questionnaire rempli par les intéressés
 * eux-mêmes, en août 2026. Chacun a coché deux cases : l'autorisation de
 * publier son nom, son témoignage et sa photo, et la possibilité d'en demander
 * le retrait à tout moment.
 *
 * CE QU'ON S'AUTORISE À FAIRE DE LEURS RÉPONSES.
 *
 * Corriger l'orthographe, la ponctuation et les accords. Découper un pavé en
 * paragraphes. Retirer une répétition de la question dans la réponse — « Ce
 * qui m'a amené au secourisme, c'est… » devient « C'est… » quand le titre pose
 * déjà la question.
 *
 * CE QU'ON NE S'AUTORISE PAS. Reformuler une idée, lisser une maladresse,
 * ajouter un mot qu'ils n'ont pas écrit, ou couper ce qui dérange. Un portrait
 * réécrit sonne faux, et ils le reliront avant publication.
 *
 * ⚠️ RELECTURE. Chacun doit valider son texte avant mise en ligne. C'est ce
 * qu'on leur a promis dans le formulaire, en toutes lettres.
 */

export interface Reponse {
  question: string;
  /** Un élément par paragraphe. */
  texte: string[];
}

export interface Membre {
  slug: string;
  prenom: string;
  nom: string;
  /** Ce qu'il fait en dehors de l'association : le détail qui crée la proximité. */
  metier: string;
  /** Année d'arrivée à Secourisme Pour Tous. */
  depuis: string;
  /** Rôles tenus, dans l'ordre d'importance. Sert d'étiquettes sur la vignette. */
  roles: string[];
  diplomes: string[];
  photo: string;
  alt: string;
  /** Phrase mise en avant sur la vignette, tirée mot pour mot de ses réponses. */
  citation: string;
  reponses: Reponse[];
}

export const membres: Membre[] = [
  {
    slug: 'anthony',
    prenom: 'Anthony',
    nom: 'Del Aguila',
    metier: 'Responsable en sécurité privée',
    depuis: '2019',
    roles: ['Formateur', 'Chef de poste', 'Chef d’équipe', 'Équipier secouriste'],
    diplomes: ['PSC', 'PSE1', 'PSE2', 'PAE FPSC', 'PAE FPS', 'SST'],
    photo: '/img/equipe/anthony.jpg',
    alt: 'Anthony en tenue Secours FFSS, bras croisés, devant le véhicule de premiers secours sur la Promenade des Anglais.',
    citation:
      'Ne pas attendre d’être confronté à une situation d’urgence pour se demander si on aurait pu aider.',
    reponses: [
      {
        question: 'Ce qui m’a amené au secourisme',
        texte: [
          'C’est avant tout mon parcours personnel. Au collège, j’ai vécu pendant deux années une période de harcèlement physique et moral qui m’a profondément marqué.',
          'J’ai également été victime de l’attentat du 14 juillet 2016, un événement qui a lui aussi eu un impact important sur ma vie.',
          'Ces deux expériences m’ont énormément marqué et m’ont progressivement orienté vers les métiers de la protection, du secours et de l’assistance aux personnes. Aujourd’hui, le secourisme représente pour moi une manière d’être utile aux autres, de porter assistance aux personnes dans des moments difficiles et de transformer ces expériences personnelles en une motivation pour aider et protéger.',
        ],
      },
      {
        question: 'Ce qui m’a surpris au début',
        texte: [
          'Ce qui m’a le plus surpris, c’est que le secourisme ne se résume pas seulement aux gestes techniques et aux interventions. J’imaginais surtout qu’il fallait savoir réagir rapidement face à une situation d’urgence.',
          'Avec le temps, j’ai découvert que l’aspect humain était tout aussi important : savoir écouter, rassurer une personne, communiquer avec elle et garder son calme, même dans des situations parfois stressantes.',
          'J’ai également été surpris par l’importance du travail en équipe. On apprend à faire confiance aux autres, à communiquer efficacement et à chacun trouver sa place. C’est quelque chose que je n’avais pas forcément imaginé au départ et qui m’a beaucoup plu.',
        ],
      },
      {
        question: 'Ce que le terrain change dans ma façon d’enseigner',
        texte: [
          'Il me permet de transmettre des situations que j’ai réellement vécues et de montrer que le secourisme ne se limite pas à apprendre des gestes par cœur.',
          'Je peux davantage insister sur les réflexes, la communication, la gestion du stress et l’adaptation à chaque situation. Sur le terrain, on se rend compte que chaque victime et chaque intervention sont différentes, et qu’il faut savoir s’adapter tout en respectant les procédures.',
          'Mon expérience du terrain me permet donc de rendre mes formations plus concrètes et réalistes, mais surtout de transmettre l’importance de rester humain, calme et rassurant face à une personne en difficulté.',
        ],
      },
      {
        question: 'Ce qui me fait revenir',
        texte: [
          'C’est avant tout le sentiment d’être utile aux autres. J’aime pouvoir apporter mon aide à une personne qui en a besoin, parfois dans des moments qui peuvent être difficiles pour elle.',
          'C’est aussi l’esprit d’équipe, le fait de pouvoir compter les uns sur les autres et de vivre des expériences humaines fortes. Enfin, chaque intervention ou chaque formation me permet d’apprendre, de progresser et de me sentir davantage à ma place dans ce milieu.',
        ],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: [
          'À quelqu’un qui hésite à se former, je lui dirais de ne pas attendre d’être confronté à une situation d’urgence pour se demander s’il aurait pu aider. Une formation de premiers secours donne des connaissances et des réflexes qui peuvent réellement faire la différence. On peut tous être un jour témoin d’un malaise, d’un accident ou d’une situation où quelqu’un a besoin d’aide.',
          'À quelqu’un qui hésite à devenir bénévole, je lui dirais d’essayer. Le bénévolat demande du temps et de l’investissement, mais il apporte énormément sur le plan humain. On apprend à travailler en équipe, à prendre des responsabilités, à gérer des situations différentes et surtout à se sentir utile.',
          'Pour moi, il ne faut pas forcément se sentir prêt à 100 % avant de commencer. On apprend justement en se formant, en pratiquant et en vivant des expériences avec les autres. Si on a envie d’aider et de donner un peu de son temps, c’est déjà une très bonne raison de se lancer.',
        ],
      },
      {
        question: 'Et dans la vraie vie',
        texte: [
          'Je suis responsable dans une entreprise de sécurité privée, tout en étant moi-même sur le terrain. Mes qualifications : SSIAP 1 et 2, agent de sécurité renforcé armé en catégorie D.',
          'Dans la vie de tous les jours, je suis quelqu’un d’assez simple. En dehors du secourisme et du bénévolat, j’ai ma vie professionnelle et personnelle comme tout le monde. Mais je garde toujours ce côté humain et cette envie d’aider les autres.',
          'Le secourisme prend une place importante dans ma vie, mais ce n’est pas toute ma personnalité. J’aime aussi profiter de mes proches, avoir des moments pour moi et découvrir de nouvelles choses. Finalement, je dirais que le secourisme fait partie de moi sans me définir entièrement.',
        ],
      },
    ],
  },

  {
    slug: 'thibaut',
    prenom: 'Thibaut',
    nom: 'Lorenzetti',
    metier: 'Surveillant en lycée et sapeur-pompier volontaire',
    depuis: '2024',
    roles: ['Formateur', 'Chef de dispositif', 'Chef de poste', 'Chef d’équipe'],
    diplomes: ['PSE1', 'PSE2', 'PAE FPSC', 'PAE FPS'],
    photo: '/img/equipe/thibaut.jpg',
    alt: 'Thibaut en gilet « chef de dispositif », devant le véhicule de premiers secours, la grande roue de Nice éclairée en arrière-plan.',
    citation: 'De ne pas hésiter, et qu’il ne le regrettera pas.',
    reponses: [
      {
        question: 'Ce qui m’a amené au secourisme',
        texte: ['Une passion, et un projet professionnel.'],
      },
      {
        question: 'Ce qui m’a surpris au début',
        texte: ['Une ambiance familiale, et cette envie de revenir à chaque fois.'],
      },
      {
        question: 'Ce que le terrain change dans ma façon d’enseigner',
        texte: ['La réalité du terrain, et ses complications.'],
      },
      {
        question: 'Ce qui me fait revenir',
        texte: [
          'L’ambiance conviviale, la différence entre chaque poste, l’adrénaline des interventions.',
        ],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: ['De ne pas hésiter, et qu’il ne le regrettera pas.'],
      },
      {
        question: 'Et dans la vraie vie',
        texte: [
          'Je travaille comme surveillant dans un lycée. Je suis aussi sapeur-pompier volontaire, tout en préparant mon concours pour devenir sapeur-pompier professionnel.',
        ],
      },
    ],
  },

  {
    slug: 'raphael',
    prenom: 'Raphaël',
    nom: 'Lebreuilly',
    metier: 'Étudiant en licence CPES',
    depuis: '2025',
    roles: ['Secouriste', 'Nageur sauveteur'],
    diplomes: ['PSE1', 'BNSSA'],
    photo: '/img/equipe/raphael.jpg',
    alt: 'Raphaël en tenue de secouriste, dans l’arrière-pays niçois, les collines en arrière-plan.',
    citation:
      'Ce n’est pas si sorcier, quand on écoute en formation et qu’on est bien entouré sur le terrain.',
    reponses: [
      {
        question: 'Ce qui m’a amené au secourisme',
        texte: [
          'Après mon BAFA surveillant de baignade, un camarade de lycée m’a proposé de passer le BNSSA. Nous nous sommes motivés et avons décroché le diplôme ensemble.',
          'Pour valider le BNSSA, la formation PSE1 était requise. C’est à ce moment-là que l’on nous a proposé d’intégrer des postes de secours. Mon tout premier s’est déroulé à l’hôtel de ville de Tours, avec l’association FFSS Aqua Life Saving, lors d’une soirée de BDE. L’ambiance était excellente et m’a immédiatement donné envie de renouveler l’expérience.',
          'À mon arrivée à Nice pour mes études, j’ai rejoint Secourisme Pour Tous afin de m’occuper et surtout de poursuivre cet engagement, continuer à me former et me rendre utile.',
        ],
      },
      {
        question: 'Ce qui m’a surpris au début',
        texte: [
          'L’importance de notre présence sur les événements, et la manière dont elle rassure les gens qui sont dans le besoin.',
        ],
      },
      {
        question: 'Ce qui me fait revenir',
        texte: [
          'L’ambiance, mais aussi l’opportunité de découvrir de magnifiques endroits de la région et d’accéder à des événements auxquels je ne serais jamais allé sans le secourisme.',
        ],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: [
          'Que ce n’est pas si sorcier, quand on écoute en formation et qu’on est bien entouré sur le terrain.',
        ],
      },
      {
        question: 'Et dans la vraie vie',
        texte: [
          'Je suis en licence CPES, une formation hybride entre faculté et prépa qui prépare aux concours de la fonction publique — direction d’hôpitaux, protection sociale — et aux écoles de commerce.',
          'En parallèle, le secourisme me permet de sortir des cours, de changer d’air et de développer d’autres compétences.',
        ],
      },
    ],
  },
];

/** Portraits recueillis à cette date, par questionnaire. */
export const recueilliLe = '21 août 2026';
