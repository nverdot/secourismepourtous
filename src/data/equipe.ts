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
 * À ANTICIPER. Les photos sont stockées en pleine définition (jusqu'à
 * 1000 × 1400). Tant qu'il y a trois portraits, c'est sans conséquence. Passé
 * une dizaine, il faudra produire des vignettes réduites — 400 px de large
 * suffisent pour la grille — et ne charger la grande image qu'à l'ouverture
 * du portrait. Sinon la page d'équipe pèsera plusieurs mégaoctets.
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
    slug: 'aurelia',
    prenom: 'Aurelia',
    nom: 'Tardivat',
    metier: 'Directrice de l’association et vice-présidente du comité FFSS 06',
    depuis: '2018',
    roles: ['Membre du bureau'],
    diplomes: ['PSC'],
    photo: '/img/equipe/aurelia.jpg',
    alt: 'Aurelia en tenue de l’association, au volant du véhicule de premiers secours.',
    citation:
      'N’attends pas le moment parfait : le moment de l’engagement, c’est toi qui le provoques.',
    reponses: [
      {
        question: 'Dans la vraie vie',
        texte: [
          'Je vis au rythme de l’urgence, du terrain et de l’engagement.',
          'Au quotidien, j’assure la direction de l’association Secourisme Pour Tous, où je pilote le développement, la structuration et la gestion des équipes pour faire grandir notre impact. En parallèle, je m’investis à une échelle plus stratégique, en tant que vice-présidente du comité départemental de la FFSS 06.',
          'Autant dire que mes semaines sont intenses, et que l’action ne s’arrête jamais.',
        ],
      },
      {
        question: 'Ce qui m’a amené au secourisme',
        texte: [
          'Au détour d’une discussion, on m’a parlé de l’association Secourisme Pour Tous. Le diagnostic était clair : le club avait besoin d’une nouvelle direction pour tout reconstruire, structurer les équipes et relever de nombreux défis.',
          'C’était avant tout un enjeu humain. L’ampleur de la tâche, la diversité des missions à orchestrer et, surtout, l’impact vital du secourisme m’ont immédiatement interpellée. Relever ce défi et redonner un souffle à ce club, c’est ce qui m’a poussée à m’engager pleinement.',
        ],
      },
      {
        question: 'Ce qui m’a surpris au début',
        texte: [
          'En arrivant, je pensais intégrer un secteur humain, solidaire. Une autre réalité m’a frappée de plein fouet : j’ai découvert un milieu où la compétition est parfois importante, où chaque association essaie de faire reconnaître sa valeur. Alors qu’en vrai, on a tous le même rôle — aider les autres, sauver, protéger, prendre soin.',
          'Surtout, j’ai découvert le rythme impitoyable du terrain : du sept jours sur sept, sans le moindre répit. Je n’imaginais pas que la gestion d’un club de secourisme exigeait une telle présence, un engagement de chaque instant où l’on ne déconnecte jamais vraiment. C’est un monde éprouvant, mais d’une adrénaline brute.',
        ],
      },
      {
        question: 'Ce qui me fait revenir',
        texte: [
          'C’est d’abord l’engagement sans faille de mes équipes, et notre présence désormais incontournable sur le terrain. Voir nos projets se concrétiser et dépasser nos objectifs est une immense satisfaction, tout comme d’obtenir la reconnaissance légitime des autorités et de nos partenaires, qui saluent enfin la rigueur de notre travail.',
          'Mais le vrai moteur, ce sont les retours humains. Quand nous recevons ces messages — « Merci pour votre réactivité, vous avez tout changé », « Une équipe formidable, humaine et pro », ou encore « Grâce à vous, ce projet a pu voir le jour » — cela donne un sens profond à nos efforts.',
          'Et par-dessus tout, la plus belle des victoires réside dans un détail bien plus personnel : cette étincelle de fierté dans les yeux de ma fille lorsqu’elle raconte autour d’elle ce que nous accomplissons. C’est pour tout cela que je ne lâcherai rien.',
        ],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: [
          'N’attends pas le moment parfait : le moment de l’engagement, c’est toi qui le provoques.',
          'Se former aux premiers secours ou s’engager comme bénévole, ce n’est pas ajouter une ligne sur un CV ni remplir un après-midi libre. C’est décider, très concrètement, de faire la différence quand tout semble basculer et s’écrouler. Un jour, face à une détresse, un arrêt cardiaque ou un accident, il n’y aura pas de spectateurs : il y aura ceux qui doutent, et ceux qui savent quoi faire.',
          'On s’imagine souvent qu’il faut avoir une vocation hors du commun ou un sang-froid à toute épreuve. C’est faux. L’engagement s’apprend, la technique s’acquiert, et la force vient sur le terrain, aux côtés d’une équipe soudée qui devient une deuxième famille. Tu découvriras une intensité, le sentiment de te sentir utile, et une fierté que peu d’expériences peuvent offrir.',
          'Tu hésites encore ? Viens simplement tester une journée. Au pire, tu auras appris à sauver une vie.',
        ],
      },
    ],
  },

  {
    slug: 'annabell',
    prenom: 'Annabell',
    nom: 'Perez',
    metier: 'Formatrice — gestion de formation et communication',
    depuis: '2018',
    roles: ['Formateur', 'Chef de poste', 'Chef d’équipe', 'Équipier secouriste', 'Nageur sauveteur', 'Secouriste'],
    diplomes: ['PSC', 'PSE1', 'PSE2', 'BNSSA', 'PAE FPSC', 'PAE FPS', 'SST'],
    photo: '/img/equipe/annabell.jpg',
    alt: 'Annabell en gilet de sauveteur aquatique, face à la mer, au coucher du soleil.',
    citation:
      'Il ne faut pas attendre que ça arrive pour se former. Ça sera peut-être déjà trop tard.',
    reponses: [
      {
        question: 'Dans la vraie vie',
        texte: ['Formatrice le week-end, gestion de formation et communication la semaine.'],
      },
      {
        question: 'Ce qui m’a amené au secourisme',
        texte: [
          'J’ai redoublé une année à la fac et j’avais envie de travailler, de passer des diplômes. J’aimais la natation, et une amie faisait partie de l’association : je lui ai demandé les coordonnées pour passer le BNSSA.',
          'Je n’ai finalement fait qu’une saison de surveillance et quelques postes aquatiques — j’ai passé tout le reste du temps sur les dispositifs de secours, et à évoluer dans la formation.',
        ],
      },
      {
        question: 'Ce qui m’a surpris au début',
        texte: [
          'Tout. Je rentrais dans un domaine que je ne connaissais pas, je ne savais pas à quoi m’attendre. J’ai suivi le mouvement, et AUCUN REGRET.',
        ],
      },
      {
        question: 'Ce que le terrain change dans ma façon d’enseigner',
        texte: [
          'Le terrain apporte du vécu, des anecdotes. Il permet de faire vivre plus facilement une formation, et de capter l’attention des apprenants secouristes.',
        ],
      },
      {
        question: 'Ce qui me fait revenir',
        texte: [
          'L’ambiance, la famille, les amis, les valeurs de l’association, le fait qu’on veuille tous évoluer et aller de l’avant.',
        ],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: [
          'GO GO GO.',
          'Se former n’oblige pas à devenir secouriste bénévole. Mais un accident arrive si vite, et n’importe où. Très régulièrement j’entends : « Oh, j’ai été face à un accident, je n’ai pas su réagir. Si j’avais su, je me serais formé avant. » Il ne faut pas attendre que ça arrive pour se former. Ça sera peut-être déjà trop tard.',
          'Connaître le minimum des gestes de secours devrait être obligatoire pour tout le monde. En fin de formation, j’entends très régulièrement : « Je ne savais pas qu’on abordait autant de sujets, je suis agréablement surpris — on se rend compte qu’on ne sait rien faire avant d’avoir fait la formation. » Il n’est jamais trop tard pour se former, et il vaut mieux maintenant que plus tard.',
          'Pour celui qui hésite à devenir bénévole : ça ne coûte rien d’essayer une fois. L’ambiance est très sympa, nous savons rigoler comme être sérieux quand il le faut, on peut se retrouver dans des cadres et des situations qu’on n’aurait jamais imaginés. Et sûrement que l’essayer, c’est l’adopter.',
        ],
      },
    ],
  },

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
        question: 'Dans la vraie vie',
        texte: [
          'Je suis responsable dans une entreprise de sécurité privée, tout en étant moi-même sur le terrain. Mes qualifications : SSIAP 1 et 2, agent de sécurité renforcé armé en catégorie D.',
          'Dans la vie de tous les jours, je suis quelqu’un d’assez simple. En dehors du secourisme et du bénévolat, j’ai ma vie professionnelle et personnelle comme tout le monde. Mais je garde toujours ce côté humain et cette envie d’aider les autres.',
          'Le secourisme prend une place importante dans ma vie, mais ce n’est pas toute ma personnalité. J’aime aussi profiter de mes proches, avoir des moments pour moi et découvrir de nouvelles choses. Finalement, je dirais que le secourisme fait partie de moi sans me définir entièrement.',
        ],
      },
    ],
  },

  {
    slug: 'salah',
    prenom: 'Salah',
    nom: 'Boukhari',
    metier: 'Agent de sécurité incendie (SSIAP)',
    depuis: '2021',
    roles: ['Équipier secouriste', 'Secouriste'],
    diplomes: ['PSE1', 'PSE2'],
    photo: '/img/equipe/salah.jpg',
    alt: 'Salah en veste Secours FFSS marquée « équipier », devant le poste de secours du village de Noël d’Antibes.',
    citation:
      'Être formé aux premiers secours permet d’avoir plus confiance en soi. C’était mon cas.',
    reponses: [
      {
        question: 'Dans la vraie vie',
        texte: [
          'Je suis agent de sécurité incendie, SSIAP. Je travaille dans la sécurité privée, et je m’occupe de ma vie familiale.',
        ],
      },
      {
        question: 'Ce qui m’a amené au secourisme',
        texte: ['C’était justement pour effectuer des dispositifs de secours.'],
      },
      {
        question: 'Ce qui m’a surpris au début',
        texte: [
          'Ce qui m’a surpris — positivement, bien sûr — c’est la différence entre le PSE1 et le SST. Ça n’a vraiment rien à voir.',
        ],
      },
      {
        question: 'Ce qui me fait revenir',
        texte: [
          'La qualité, le professionnalisme, la convivialité, la bonne humeur. J’en passe, et des meilleures.',
        ],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: [
          'Qu’être formé aux premiers secours est primordial dans notre vie de tous les jours, et que cela permet d’avoir plus confiance en soi. C’était mon cas.',
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
    roles: ['Formateur', 'Chef de dispositif', 'Chef de poste', 'Chef d’équipe', 'Équipier secouriste'],
    diplomes: ['PSE1', 'PSE2', 'PAE FPSC', 'PAE FPS'],
    photo: '/img/equipe/thibaut.jpg',
    alt: 'Thibaut en gilet « chef de dispositif », devant le véhicule de premiers secours, la grande roue de Nice éclairée en arrière-plan.',
    citation: 'Deviens acteur pour faire bouger les choses, et lance-toi !',
    reponses: [
      {
        question: 'Dans la vraie vie',
        texte: [
          'Je suis surveillant dans un lycée, et aussi sapeur-pompier volontaire, tout en préparant mon concours pour rentrer à la brigade des sapeurs-pompiers de Paris.',
        ],
      },
      {
        question: 'Ce qui m’a amené au secourisme',
        texte: [
          'Depuis tout petit je n’ai qu’un seul rêve : faire partie de la brigade des sapeurs-pompiers de Paris, être utile aux autres et pouvoir aider les gens qui sont dans le besoin.',
          'Le secourisme m’a permis de mettre un pied dans cet environnement dès le plus jeune âge, et de découvrir que c’était vraiment ce que je voulais. Bien plus qu’une envie, c’était déjà devenu une passion.',
        ],
      },
      {
        question: 'Ce qui m’a surpris au début',
        texte: [
          'Ce qui m’a le plus surpris au début, c’est notre importance sur beaucoup d’événements, et le travail qu’il y a derrière. En venant en civil à une fête ou à un concert, on ne remarque pas forcément les bénévoles et tout ce qu’il y a derrière.',
        ],
      },
      {
        question: 'Ce que le terrain change dans ma façon d’enseigner',
        texte: [
          'L’expérience du terrain me permet d’enseigner que les situations auxquelles nous pouvons être confrontés ne seront jamais idéales comme en formation. Elle me permet d’appuyer sur le fait qu’il faut certes être bon sur ses gestes et ses connaissances, mais aussi travailler sa communication en intervention, sa gestion du stress et de l’adrénaline : l’adaptation et la polyvalence sont une des clés pour réussir.',
          'Cette expérience me permet donc de rendre au maximum mes formations réalistes, pour les rapprocher de la réalité.',
        ],
      },
      {
        question: 'Ce qui me fait revenir',
        texte: [
          'Je reviens pour cette ambiance familiale. Sur un poste, nous ne sommes pas simplement des secouristes qui tiennent un poste de secours ensemble, mais une véritable famille avec qui nous partageons de nombreux moments.',
          'Ce qui me fait aussi revenir, c’est de ne pas savoir sur quoi l’on peut tomber. Chaque poste est unique, chaque poste est une nouvelle expérience qui nous rend meilleurs : voir des choses, des événements, des paysages que je n’aurais jamais vus si je n’étais pas là.',
        ],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: ['Deviens acteur pour faire bouger les choses, et lance-toi !'],
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
        question: 'Dans la vraie vie',
        texte: [
          'Je suis en licence CPES, une formation hybride entre faculté et prépa qui prépare aux concours de la fonction publique — direction d’hôpitaux, protection sociale — et aux écoles de commerce.',
          'En parallèle, le secourisme me permet de sortir des cours, de changer d’air et de développer d’autres compétences.',
        ],
      },
    ],
  },
];

/**
 * Ordre d'affichage des questions, quel que soit celui du questionnaire.
 *
 * On commence par « dans la vraie vie » : savoir que la personne est
 * surveillante de lycée ou étudiante change la lecture de tout ce qui suit.
 * On finit par le conseil à celui qui hésite — c'est la phrase qu'on veut
 * garder en tête en refermant.
 */
export const ORDRE_QUESTIONS = [
  'Dans la vraie vie',
  'Ce qui m’a amené au secourisme',
  'Ce qui m’a surpris au début',
  'Ce que le terrain change dans ma façon d’enseigner',
  'Ce qui me fait revenir',
  'Ce que je dirais à quelqu’un qui hésite',
];

export const ordonner = (r: Reponse[]) =>
  [...r].sort((a, b) => {
    const i = ORDRE_QUESTIONS.indexOf(a.question);
    const j = ORDRE_QUESTIONS.indexOf(b.question);
    return (i < 0 ? 99 : i) - (j < 0 ? 99 : j);
  });

/**
 * Diplôme → fiche de formation.
 *
 * Un visiteur qui lit « PSE2 » sur le portrait de son futur formateur doit
 * pouvoir cliquer pour savoir de quoi il s'agit. C'est le chemin le plus
 * court entre l'émotion et l'inscription.
 */
export const FICHE_DIPLOME: Record<string, string> = {
  'PSC': 'psc',
  'PSE1': 'pse-1',
  'PSE2': 'pse-2',
  'BNSSA': 'bnssa',
  'BSB': 'bsb',
  'SST': 'sst',
  'PAE FPSC': 'pae-f-psc',
  'PAE FPS': 'pae-f-ps',
};

/** Portraits recueillis à cette date, par questionnaire. */
export const recueilliLe = '21 août 2026';

/**
 * Les appels glissés entre les visages, sur la page d'accueil.
 *
 * Ils tournent : voir passer quatre fois la même phrase donnerait une bannière
 * publicitaire, alors qu'on veut une invitation. Les deux rangées ne partent
 * pas du même endroit dans la liste, pour qu'on ne lise jamais deux fois la
 * même chose à la verticale.
 *
 * Le registre : on promet ce qu'on tient. Pas de « devenez un héros » — ce que
 * les bénévoles décrivent eux-mêmes dans leurs portraits, c'est une équipe, des
 * week-ends de terrain et le sentiment d'être utile. C'est ça qu'on met.
 */
export const APPELS: { titre: string; sous: string }[] = [
  { titre: 'Envie de rejoindre une famille\u00a0?', sous: 'On recrute toute l\u2019année' },
  { titre: 'Envie de sauver des vies\u00a0?', sous: 'Ça commence par une formation' },
  { titre: 'Il manque un visage sur ce mur.', sous: 'Ce serait le vôtre\u00a0?' },
  { titre: 'Un jour, quelqu\u2019un aura besoin de vous.', sous: 'Autant être prêt' },
  { titre: 'Nos week-ends ont un sens.', sous: 'Venez voir par vous-même' },
];
