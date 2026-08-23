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
 * LES IMAGES. Chaque portrait existe en deux tailles : 900 × 1200 pour le
 * portrait ouvert, 360 × 480 pour la vignette. C'était anticipé comme un
 * problème à venir ; c'en est devenu un à neuf portraits, le mur affichant
 * plus de soixante vignettes. En pleine définition la page pesait 2,3 Mo ;
 * elle en pèse 288 Ko. La grande image n'est demandée qu'à l'ouverture.
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
  /** Grande image, montrée dans le portrait ouvert. 900 × 1200. */
  photo: string;
  /**
   * Vignette, montrée sur le mur et dans la grille. 360 × 480.
   *
   * Le mur répète les visages pour boucler sans couture : il affiche plus de
   * soixante images. En pleine définition, cela ferait plusieurs mégaoctets
   * pour une bande de vignettes larges de 170 pixels.
   */
  vignette: string;
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
    vignette: '/img/equipe/aurelia-min.jpg',
    alt: 'Aurelia en tenue de l’association, au volant du véhicule de premiers secours.',
    citation:
      'N’attends pas le moment parfait : le moment de l’engagement, c’est toi qui le provoques.',
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
          'Au détour d’une discussion, on m’a parlé de l’association Secourisme Pour Tous. Le diagnostic était clair : le club avait besoin d’une nouvelle direction pour tout reconstruire, structurer les équipes et relever de nombreux défis.',
          'C’était avant tout un enjeu humain. L’ampleur de la tâche, la diversité des missions à orchestrer et, surtout, l’impact vital du secourisme m’ont immédiatement interpellée. Relever ce défi et redonner un souffle à ce club, c’est ce qui m’a poussée à m’engager pleinement.',
        ],
      },
      {
        question: 'Ce qui me fait revenir',
        texte: [
          'C’est d’abord l’engagement sans faille de mes équipes et notre présence désormais incontournable sur le terrain. Voir nos projets se concrétiser et dépasser nos objectifs est une immense satisfaction, tout comme d’obtenir la reconnaissance légitime des autorités et de nos partenaires, qui saluent enfin la rigueur de notre travail.',
          'Mais le vrai moteur, ce sont les retours humains. Quand nous recevons ces messages — « Merci pour votre réactivité, vous avez tout changé », « Une équipe formidable, humaine et pro », ou encore « Grâce à vous, ce projet a pu voir le jour » —, cela donne un sens profond à nos efforts.',
          'Et par-dessus tout, la plus belle des victoires réside dans un détail bien plus personnel : cette étincelle de fierté dans les yeux de ma fille lorsqu’elle raconte autour d’elle ce que nous accomplissons. C’est pour tout cela que je ne lâcherai rien.',
        ],
      },
      {
        question: 'Ce qui m’a surpris au début',
        texte: [
          'En arrivant, je pensais intégrer un secteur humain, solidaire, mais une autre réalité m’a frappée de plein fouet. J’ai découvert un milieu où parfois la compétition est importante et où chaque association essaye de faire reconnaître sa valeur. Alors qu’en vrai, on a tous le même rôle : aider les autres, sauver, protéger, prendre soin.',
          'Surtout, j’ai découvert le rythme impitoyable du terrain : du 7 jours sur 7, sans le moindre répit. Je n’imaginais pas que la gestion d’un club de secourisme exigeait une telle présence, un engagement de chaque instant où l’on ne déconnecte jamais vraiment. C’est un monde éprouvant, mais d’une adrénaline brute.',
        ],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: [
          'N’attends pas le moment parfait : le moment de l’engagement, c’est toi qui le provoques.',
          'Se former aux premiers secours ou s’engager comme bénévole, ce n’est pas ajouter une ligne sur un CV ni remplir un après-midi libre. C’est décider, très concrètement, de faire la différence quand tout semble basculer et s’écrouler. Un jour, face à une détresse, un arrêt cardiaque ou un accident, il n’y aura pas de spectateurs : il y aura ceux qui doutent, et ceux qui savent quoi faire.',
          'On s’imagine souvent qu’il faut avoir une vocation hors du commun ou un sang-froid à toute épreuve. C’est faux. L’engagement s’apprend, la technique s’acquiert, et la force vient sur le terrain, aux côtés d’une équipe soudée qui devient une deuxième famille. Tu découvriras une intensité, le sentiment de te sentir utile et une fierté que peu d’expériences peuvent offrir.',
          'Tu hésites encore ? Viens simplement tester une journée. Au pire, tu auras appris à sauver une vie.',
        ],
      },
    ],
  },
  {
    slug: 'annabell',
    prenom: 'Annabell',
    nom: 'Perez Björkman',
    metier: 'Administration en semaine, formatrice en secourisme le week-end',
    depuis: '2018',
    roles: ['Formateur', 'Chef de dispositif', 'Chef de poste', 'Chef d’équipe', 'Équipier secouriste', 'Nageur sauveteur'],
    diplomes: ['PSE1', 'PSE2', 'BNSSA', 'PAE FPSC', 'PAE FPS', 'SST'],
    photo: '/img/equipe/annabell.jpg',
    vignette: '/img/equipe/annabell-min.jpg',
    alt: 'Annabell en gilet de sauveteur aquatique, face à la mer, au coucher du soleil.',
    citation:
      'Il ne faut pas attendre d’être confronté à une situation pour apprendre à y faire face.',
    reponses: [
      {
        question: 'Dans la vraie vie',
        texte: [
          'Anciennement dans le management du sport, je travaille aujourd’hui dans l’administration en semaine et je suis formatrice en secourisme le week-end.',
        ],
      },
      {
        question: 'Ce qui m’a amené au secourisme',
        texte: [
          'J’ai redoublé une année à la fac et j’avais envie de travailler, de me former et de passer des diplômes. J’aimais la natation, et une amie faisait partie de l’association. Je lui ai donc demandé les coordonnées pour passer le BNSSA.',
          'Je n’ai finalement fait qu’une saison de surveillance et quelques postes aquatiques… J’ai surtout passé mon temps sur les dispositifs de secours, avant d’évoluer progressivement dans la formation.',
          'Comme quoi, parfois, il suffit d’un petit détour pour trouver sa voie !',
        ],
      },
      {
        question: 'Ce qui me fait revenir',
        texte: [
          'L’ambiance, les amis, les valeurs de l’association et cette envie commune d’évoluer et d’aller toujours de l’avant.',
          'Il y a aussi toutes ces rencontres, ces moments partagés et ces situations qu’on n’aurait probablement jamais vécues ailleurs.',
        ],
      },
      {
        question: 'Ce qui m’a surpris au début',
        texte: [
          'Tout. Je rentrais dans un domaine que je ne connaissais absolument pas. Je ne savais pas vraiment à quoi m’attendre, alors j’ai suivi le mouvement… et aucun regret !',
        ],
      },
      {
        question: 'Ce que le terrain change dans ma façon d’enseigner',
        texte: [
          'Le terrain apporte du vécu, des anecdotes et des situations concrètes. Il permet de donner vie aux formations, de rendre les apprentissages plus parlants et surtout de capter plus facilement l’attention des apprenants.',
          'On ne transmet pas seulement des gestes : on transmet aussi des expériences.',
        ],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: [
          'GO GO GO !',
          'Se former aux premiers secours ne signifie pas forcément devenir secouriste bénévole. Mais un accident peut arriver très vite, n’importe où et à n’importe qui.',
          'J’entends très régulièrement : « J’ai été face à un accident et je n’ai pas su réagir. Si j’avais su, je me serais formé avant. »',
          'Il ne faut pas attendre d’être confronté à une situation pour apprendre à y faire face. Il sera peut-être déjà trop tard.',
          'À mes yeux, connaître les gestes essentiels de premiers secours devrait être une évidence pour tout le monde.',
          'Et très souvent, à la fin d’une formation, j’entends aussi : « Je ne savais pas qu’on abordait autant de choses ! Je suis agréablement surpris. »',
          'C’est justement ça, le but : prendre conscience qu’on est parfois démuni face à une situation d’urgence… et repartir en sachant quoi faire.',
          'Il n’est jamais trop tard pour se former. Alors autant le faire maintenant que plus tard. ❤️',
          'Et pour celles et ceux qui hésitent à devenir bénévoles : ça ne coûte rien d’essayer une fois.',
          'L’ambiance est conviviale, on sait rigoler comme être sérieux quand il le faut, et on peut se retrouver dans des cadres et des situations qu’on n’aurait jamais imaginés.',
          'Et puis… souvent, l’essayer, c’est l’adopter. 😉',
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
    roles: ['Formateur', 'Chef de poste', 'Chef d’équipe', 'Équipier secouriste', 'Secouriste'],
    diplomes: ['PSC', 'PSE1', 'PSE2', 'PAE FPSC', 'PAE FPS', 'SST'],
    photo: '/img/equipe/anthony.jpg',
    vignette: '/img/equipe/anthony-min.jpg',
    alt: 'Anthony en tenue Secours FFSS, bras croisés, devant le véhicule de premiers secours sur la Promenade des Anglais.',
    citation:
      'Il ne faut pas forcément se sentir prêt à 100 % avant de commencer.',
    reponses: [
      {
        question: 'Dans la vraie vie',
        texte: [
          'Dans la vie de tous les jours, je suis quelqu’un d’assez simple. En dehors du secourisme et du bénévolat, j’ai ma vie professionnelle et personnelle comme tout le monde. Mais je garde toujours ce côté humain et cette envie d’aider les autres.',
          'Le secourisme prend une place importante dans ma vie, mais ce n’est pas toute ma personnalité. J’aime aussi profiter de mes proches, avoir des moments pour moi et découvrir de nouvelles choses.',
          'Finalement, je dirais que le secourisme fait partie de moi sans me définir entièrement. C’est un engagement qui m’apporte beaucoup et qui a forcément influencé la personne que je suis aujourd’hui.',
        ],
      },
      {
        question: 'Ce qui m’a amené au secourisme',
        texte: [
          'C’est avant tout mon parcours personnel. Au collège, j’ai vécu pendant deux années une période de harcèlement physique et moral qui m’a profondément marqué.',
          'J’ai également été victime de l’attentat du 14 juillet 2016, un événement qui a lui aussi eu un impact important sur ma vie.',
          'Ces deux expériences m’ont énormément marqué et m’ont progressivement orienté vers les métiers de la protection, du secours et de l’assistance aux personnes. Aujourd’hui, le secourisme représente pour moi une manière d’être utile aux autres, de porter assistance aux personnes dans des moments difficiles et de transformer ces expériences personnelles en une motivation pour aider et protéger.',
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
        question: 'Ce qui m’a surpris au début',
        texte: [
          'Au début, ce qui m’a le plus surpris, c’est que le secourisme ne se résume pas seulement aux gestes techniques et aux interventions. J’imaginais surtout qu’il fallait savoir réagir rapidement face à une situation d’urgence.',
          'Avec le temps, j’ai découvert que l’aspect humain était tout aussi important : savoir écouter, rassurer une personne, communiquer avec elle et garder son calme, même dans des situations parfois stressantes.',
          'J’ai également été surpris par l’importance du travail en équipe. On apprend à faire confiance aux autres, à communiquer efficacement et à chacun trouver sa place. C’est quelque chose que je n’avais pas forcément imaginé au départ et qui m’a beaucoup plu.',
        ],
      },
      {
        question: 'Ce que le terrain change dans ma façon d’enseigner',
        texte: [
          'Le terrain change beaucoup ma façon d’enseigner, parce qu’il me permet de transmettre des situations que j’ai réellement vécues et de montrer que le secourisme ne se limite pas à apprendre des gestes par cœur.',
          'Je peux davantage insister sur les réflexes, la communication, la gestion du stress et l’adaptation à chaque situation. Sur le terrain, on se rend compte que chaque victime et chaque intervention sont différentes, et qu’il faut savoir s’adapter tout en respectant les procédures.',
          'Mon expérience du terrain me permet donc de rendre mes formations plus concrètes et réalistes, mais surtout de transmettre l’importance de rester humain, calme et rassurant face à une personne en difficulté.',
        ],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: [
          'À quelqu’un qui hésite à se former, je lui dirais de ne pas attendre d’être confronté à une situation d’urgence pour se demander s’il aurait pu aider. Une formation de premiers secours donne des connaissances et des réflexes qui peuvent réellement faire la différence. On peut tous être un jour témoin d’un malaise, d’un accident ou d’une situation où quelqu’un a besoin d’aide.',
          'À quelqu’un qui hésite à devenir bénévole, je lui dirais d’essayer. Le bénévolat demande du temps et de l’investissement, mais il apporte énormément sur le plan humain. On apprend à travailler en équipe, à prendre des responsabilités, à gérer des situations différentes et surtout à se sentir utile.',
          'Pour moi, il ne faut pas forcément se sentir prêt à 100 % avant de commencer. On apprend justement en se formant, en pratiquant et en vivant des expériences avec les autres. Si on a envie d’aider et de donner un peu de son temps, c’est déjà une très bonne raison de se lancer.',
        ],
      },
    ],
  },
  {
    slug: 'raphael-radier',
    prenom: 'Raphael',
    nom: 'Radier',
    metier: 'Infirmier coordinateur au conseil départemental',
    depuis: '2019',
    roles: ['Formateur', 'Membre du bureau', 'Chef de poste', 'Chef d’équipe', 'Équipier secouriste', 'Secouriste'],
    diplomes: ['PSC', 'PSE1', 'PSE2', 'PAE FPSC', 'PAE FPS', 'SST'],
    photo: '/img/equipe/raphael-radier.jpg',
    vignette: '/img/equipe/raphael-radier-min.jpg',
    alt: 'Raphael en tenue Secours FFSS, en salle, face à deux chefs de dispositif pendant une formation.',
    citation:
      'Venez, n’ayez pas peur : on vous accueillera, accompagnera, et vous rencontrerez des gens formidables.',
    reponses: [
      {
        question: 'Dans la vraie vie',
        texte: [
          'Je suis infirmier coordinateur médico-social au conseil départemental, après avoir passé vingt ans aux urgences.',
        ],
      },
      { question: 'Ce qui m’a amené au secourisme', texte: ['L’armée.'] },
      { question: 'Ce qui me fait revenir', texte: ['La passion.'] },
      { question: 'Ce qui m’a surpris au début', texte: ['Le nombre de passionnés bienveillants.'] },
      {
        question: 'Ce que le terrain change dans ma façon d’enseigner',
        texte: [
          'Une expérience plus complète, qui est un avantage lors de l’enseignement du secourisme.',
        ],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: [
          'Venez, n’ayez pas peur : on vous accueillera, accompagnera, et vous rencontrerez des gens formidables.',
        ],
      },
    ],
  },
  {
    slug: 'thibaut',
    prenom: 'Thibaut',
    nom: 'Lorenzetti',
    metier: 'Surveillant dans un lycée, sapeur-pompier volontaire',
    depuis: '2024',
    roles: ['Formateur', 'Chef de dispositif', 'Chef de poste', 'Chef d’équipe', 'Équipier secouriste'],
    diplomes: ['PSE1', 'PSE2', 'PAE FPSC', 'PAE FPS'],
    photo: '/img/equipe/thibaut.jpg',
    vignette: '/img/equipe/thibaut-min.jpg',
    alt: 'Thibaut en gilet « chef de dispositif », devant le véhicule de premiers secours, la grande roue de Nice éclairée en arrière-plan.',
    citation:
      'Chaque poste est unique, chaque poste est une nouvelle expérience qui nous rend meilleurs.',
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
          'Depuis tout petit je n’ai qu’un seul rêve : faire partie de la brigade des sapeurs-pompiers de Paris, être utile aux autres et pouvoir aider les gens qui sont dans le besoin.',
          'Le secourisme m’a permis de mettre un pied dans cet environnement dès le plus jeune âge, et de découvrir que c’était vraiment ce que je voulais. Bien plus qu’une envie : c’était déjà devenu une passion.',
        ],
      },
      {
        question: 'Ce qui me fait revenir',
        texte: [
          'Je reviens pour cette ambiance familiale. Sur poste, nous ne sommes pas simplement des secouristes qui tenons un poste de secours ensemble, mais une véritable famille avec qui nous partageons de nombreux moments.',
          'Ce qui me fait aussi revenir, c’est de ne pas savoir sur quoi l’on peut tomber. Chaque poste est unique, chaque poste est une nouvelle expérience qui nous rend meilleurs : voir des choses, des événements, des paysages que je n’aurais jamais vus si je n’étais pas là.',
        ],
      },
      {
        question: 'Ce qui m’a surpris au début',
        texte: [
          'Ce qui m’a le plus surpris au début, c’est notre importance sur beaucoup d’événements, et le travail qu’il y a derrière. En venant en civil à une fête ou un concert, on ne remarque pas forcément les bénévoles et le travail qu’il y a derrière.',
        ],
      },
      {
        question: 'Ce que le terrain change dans ma façon d’enseigner',
        texte: [
          'L’expérience sur le terrain me permet d’enseigner que les situations auxquelles nous pouvons être confrontés ne seront jamais idéales comme en formation. Cette expérience me permet d’appuyer sur le fait qu’il faut certes être bon sur ses gestes et connaissances, mais aussi travailler sa communication sur intervention, sa gestion du stress et de l’adrénaline. L’adaptation et la polyvalence sont une des clés pour réussir.',
          'Cette expérience me permet donc de rendre au maximum mes formations réalistes, pour les rapprocher de la réalité.',
        ],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: ['Deviens acteur pour faire bouger les choses, et lance-toi\u00a0!!'],
      },
    ],
  },
  {
    slug: 'anne-sophie',
    prenom: 'Anne Sophie',
    nom: 'Côte',
    metier: 'Entraîneur de natation artistique',
    depuis: '2026',
    roles: ['Formateur', 'Équipier secouriste', 'Secouriste', 'Nageur sauveteur'],
    diplomes: ['PSE1', 'PSE2', 'BNSSA'],
    photo: '/img/equipe/anne-sophie.jpg',
    vignette: '/img/equipe/anne-sophie-min.jpg',
    alt: 'Anne Sophie en tenue, à bord du véhicule de premiers secours.',
    citation:
      'C’est une formation qui sera utile toute sa vie, dans de nombreux domaines.',
    reponses: [
      { question: 'Dans la vraie vie', texte: ['Maman, éducateur sportif.'] },
      {
        question: 'Ce qui m’a amené au secourisme',
        texte: [
          'Lors du passage de mon BNSSA à mes 18 ans, je me suis découvert une réelle passion pour le secourisme. J’ai décidé de participer à des postes de secours en parallèle de mes études.',
        ],
      },
      {
        question: 'Ce qui me fait revenir',
        texte: [
          'Je suis devenue formatrice BNSSA pour l’asso il y a peu. Cela m’a donné envie de m’investir au maximum dans l’asso, par envie d’être utile et pour les belles rencontres humaines aussi.',
          'Participer aux DPS me permet aussi de devenir meilleure secouriste, en gagnant expérience et automatisme que nous n’avons pas forcément l’occasion d’utiliser en milieu pro.',
        ],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: [
          'Se former au secourisme dépasse une utilisation dans le cadre de l’association. C’est une formation qui sera utile toute sa vie, dans de nombreux domaines.',
          'Donner de son temps, c’est surtout accéder à une expérience humaine, de belles rencontres, progresser et continuer à se former.',
        ],
      },
    ],
  },
  {
    slug: 'salah',
    prenom: 'Salah',
    nom: 'Boukhari',
    metier: 'Agent de sécurité incendie SSIAP',
    depuis: '2021',
    roles: ['Équipier secouriste', 'Secouriste'],
    diplomes: ['PSE1', 'PSE2'],
    photo: '/img/equipe/salah.jpg',
    vignette: '/img/equipe/salah-min.jpg',
    alt: 'Salah en veste Secours FFSS marquée « équipier », devant le poste de secours du village de Noël d’Antibes.',
    citation:
      'Être formé aux premiers secours permet d’avoir plus confiance en soi. C’était mon cas.',
    reponses: [
      {
        question: 'Dans la vraie vie',
        texte: ['Je travaille dans la sécurité privée et m’occupe de ma vie familiale.'],
      },
      {
        question: 'Ce qui m’a amené au secourisme',
        texte: ['C’était justement pour effectuer des dispositifs de secours.'],
      },
      {
        question: 'Ce qui me fait revenir',
        texte: [
          'La qualité, le professionnalisme, la convivialité, la bonne humeur — j’en passe, et des meilleurs.',
        ],
      },
      {
        question: 'Ce qui m’a surpris au début',
        texte: [
          'Ce qui m’a surpris — positivement, bien sûr —, c’est la différence entre le PSE1 et le SST. Ça n’a vraiment rien à voir.',
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
    slug: 'raphael-lebreuilly',
    prenom: 'Raphaël',
    nom: 'Lebreuilly',
    metier: 'Étudiant à l’université Côte d’Azur',
    depuis: '2025',
    roles: ['Secouriste', 'Nageur sauveteur'],
    diplomes: ['PSE1', 'BNSSA'],
    photo: '/img/equipe/raphael-lebreuilly.jpg',
    vignette: '/img/equipe/raphael-lebreuilly-min.jpg',
    alt: 'Raphaël en tenue de secouriste, dans l’arrière-pays niçois, les collines en arrière-plan.',
    citation:
      'Ce n’est pas si sorcier, quand on écoute en formation et qu’on est bien entouré sur le terrain.',
    reponses: [
      {
        question: 'Dans la vraie vie',
        texte: [
          'Je suis en licence CPES, une formation hybride entre fac et prépa qui prépare aux concours de la fonction publique (direction d’hôpitaux, protection sociale) et aux écoles de commerce.',
          'En parallèle, le secourisme me permet de sortir des cours, de changer d’air et de développer d’autres compétences.',
        ],
      },
      {
        question: 'Ce qui m’a amené au secourisme',
        texte: [
          'Après mon BAFA SB, un camarade de lycée m’a proposé de passer le BNSSA. Nous nous sommes motivés et avons décroché le diplôme ensemble.',
          'Pour valider le BNSSA, la formation PSE1 était requise. C’est à ce moment-là que l’on nous a proposé d’intégrer des postes de secours. Mon tout premier s’est déroulé à l’hôtel de ville de Tours avec l’association FFSS Aqua Life Saving, lors d’une soirée de BDE. L’ambiance était excellente et m’a immédiatement donné envie de renouveler l’expérience.',
          'À mon arrivée à Nice pour mes études, j’ai rejoint l’association Secourisme Pour Tous afin de m’occuper et surtout de poursuivre cet engagement, continuer à me former et me rendre utile.',
        ],
      },
      {
        question: 'Ce qui me fait revenir',
        texte: [
          'L’ambiance, mais aussi l’opportunité de découvrir de magnifiques endroits de la région et d’accéder à des événements auxquels je ne serais jamais allé sans le secourisme.',
        ],
      },
      {
        question: 'Ce qui m’a surpris au début',
        texte: [
          'L’importance de notre présence sur les événements, et la manière dont notre présence rassure les gens qui sont dans le besoin.',
        ],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: [
          'Le fait que ce ne soit pas si sorcier, quand on écoute en formation et que l’on est bien entouré sur le terrain.',
        ],
      },
    ],
  },
  {
    slug: 'angele',
    prenom: 'Angèle',
    nom: 'Biret',
    metier: 'Étudiante en commerce',
    depuis: '2026',
    roles: ['Secouriste'],
    diplomes: ['PSE1'],
    photo: '/img/equipe/angele.jpg',
    vignette: '/img/equipe/angele-min.jpg',
    alt: 'Cinq secouristes en tenue Secours FFSS, de dos, devant un feu d’artifice sur le front de mer.',
    citation:
      'Je lui dirais de foncer : la formation nous apprend énormément, ça ne sera jamais une perte de l’avoir faite.',
    reponses: [
      { question: 'Dans la vraie vie', texte: ['Dans la vraie vie, je suis étudiante en commerce.'] },
      { question: 'Ce qui m’a amené au secourisme', texte: ['C’est une amie qui m’en a parlé.'] },
      {
        question: 'Ce qui me fait revenir',
        texte: [
          'J’adore l’ambiance de l’équipe, être au contact des gens, et sur chaque poste j’espère pouvoir apprendre à mieux secourir les gens.',
        ],
      },
      {
        question: 'Ce qui m’a surpris au début',
        texte: [
          'Le fait d’arriver une à deux heures avant sur les lieux des événements et de devoir attendre. Mais aussi n’avoir pratiquement aucune intervention sur la journée.',
        ],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: [
          'Je lui dirais de foncer : la formation est vraiment géniale et elle nous apprend énormément, donc ça ne sera jamais une perte de l’avoir faite. Et quitte à ne pas faire de postes derrière — en ayant essayé —, au moins la personne saura les gestes de premiers secours, qui ne sont pas toujours innés chez les gens. Et qui sait, peut-être que ça sauvera des gens.',
        ],
      },
    ],
  },
  {
    slug: 'guillaume',
    prenom: 'Guillaume',
    nom: 'Rizo',
    metier: 'Kinésithérapeute en cabinet libéral à Antibes',
    depuis: '2021',
    roles: ['Formateur', 'Chef de poste', 'Chef d’équipe', 'Équipier secouriste', 'Secouriste'],
    diplomes: ['PSC', 'PSE1', 'PSE2', 'PAE FPSC', 'PAE FPS'],
    photo: '/img/equipe/guillaume.jpg',
    vignette: '/img/equipe/guillaume-min.jpg',
    alt: 'Guillaume en tenue d’équipier, avec trois autres secouristes, sur le front de mer.',
    citation: 'On ne sait jamais ce que la vie nous réserve.',
    reponses: [
      {
        question: 'Dans la vraie vie',
        texte: ['Je suis kinésithérapeute dans un cabinet libéral à Antibes.'],
      },
      {
        question: 'Ce qui m’a amené au secourisme',
        texte: [
          'Une connaissance, et l’envie de découvrir comment aider les gens dans des situations d’urgence.',
        ],
      },
      {
        question: 'Ce qui me fait revenir',
        texte: ['La diversité des dispositifs, la vie en communauté dans l’association.'],
      },
      {
        question: 'Ce qui m’a surpris au début',
        texte: [
          'Nous ne sommes pas tout le temps sollicités, mais quand une intervention arrive, d’autres s’en suivent rapidement.',
        ],
      },
      {
        question: 'Ce que le terrain change dans ma façon d’enseigner',
        texte: [
          'L’expérience ; le partage du terrain avec les apprenants ; insister sur des points qui sont cruciaux.',
        ],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: [
          'Une porte entrouverte ne demande qu’à révéler ce qu’elle cache, et surtout de ses connaissances.',
          'On ne sait jamais ce que la vie nous réserve : savoir porter secours et réagir dans des situations d’urgence devient primordial dans la société d’aujourd’hui.',
        ],
      },
    ],
  },
  {
    slug: 'yaad',
    prenom: 'Yaad',
    nom: 'Mosbahi',
    metier: 'Étudiant en médecine, arbitre de basket-ball',
    depuis: '2026',
    roles: ['Équipier secouriste'],
    diplomes: ['PSC', 'PSE1', 'PSE2'],
    photo: '/img/equipe/yaad.jpg',
    vignette: '/img/equipe/yaad-min.jpg',
    alt: 'Yaad en tenue de secouriste, sous la tente du poste de secours.',
    citation: 'Fonce, car tu vas passer des moments inoubliables.',
    reponses: [
      { question: 'Dans la vraie vie', texte: ['Toujours étudiant en médecine 😂'] },
      {
        question: 'Ce qui m’a amené au secourisme',
        texte: ['À la base, je me suis inscrit pour avoir un bon dossier Parcoursup.'],
      },
      {
        question: 'Ce qui me fait revenir',
        texte: [
          'L’aide à la personne, l’entente au sein des équipes, ma curiosité à toujours vouloir voir plus loin.',
        ],
      },
      {
        question: 'Ce qui m’a surpris au début',
        texte: [
          'Cette facilité, au sein de l’association, à mettre en confiance la personne pendant ses premiers dispositifs de secours.',
        ],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: ['Fonce, car tu vas passer des moments inoubliables.'],
      },
    ],
  },
  {
    slug: 'julien',
    prenom: 'Julien',
    nom: 'Grothé',
    metier: 'SSIAP 1, faisant fonction d’aide-soignant',
    depuis: '2026',
    roles: ['Secouriste'],
    diplomes: ['PSE1'],
    photo: '/img/equipe/julien.jpg',
    vignette: '/img/equipe/julien-min.jpg',
    alt: 'Deux secouristes en veste Secours FFSS, de dos, sur une piste de l’arrière-pays.',
    citation: 'Beaucoup de bienveillance. Bref, plus une famille.',
    reponses: [
      {
        question: 'Dans la vraie vie',
        texte: ['Je suis SSIAP 1 et faisant fonction d’aide-soignant.'],
      },
      {
        question: 'Ce qui m’a amené au secourisme',
        texte: [
          'Mon poste de SSIAP 1 au CADAM m’a amené à faire la formation PSE1, car obligatoire. Un organisme très impliqué, très familial.',
        ],
      },
      {
        question: 'Ce qui me fait revenir',
        texte: [
          'Je reviens sur ce que je disais avant, c’est-à-dire que c’est un organisme qui est très familial, très pédagogue. Un organisme également qui fait monter les gens. Beaucoup de bienveillance. Bref, plus une famille.',
        ],
      },
      {
        question: 'Ce qui m’a surpris au début',
        texte: ['L’intégration et la motivation de chacun.'],
      },
      {
        question: 'Ce que je dirais à quelqu’un qui hésite',
        texte: [
          'Pour le coup je peux en parler, car ça m’est arrivé. J’en ai parlé avec un collègue de travail à moi, pour qui le fait de travailler de manière bénévole est assez archaïque.',
          'Comme je lui ai expliqué, ce n’est pas tant le bénévolat, et surtout le côté humain : le côté être là au bon moment, au bon endroit, pour des personnes en difficulté, et être respectueux et bienveillant sur la santé physique et morale des personnes à qui on vient en aide lors de nos interventions.',
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
export const recueilliLe = '23 août 2026';

/**
 * Les appels glissés entre les visages, sur la page d'accueil.
 *
 * Ils tournent : voir passer quatre fois la même phrase donnerait une bannière
 * publicitaire, alors qu'on veut une invitation. Les deux rangées ne partent
 * pas du même endroit dans la liste, pour qu'on ne lise jamais deux fois la
 * même chose à la verticale.
 *
 * Les couleurs ne sont pas choisies au goût : ce sont les cinq teintes de
 * filière du site, deux appels chacune — opérationnelle, citoyenne, aquatique,
 * pédagogique, entreprise. Le visiteur voit ces couleurs partout ailleurs pour
 * dire « famille de formation » ; les reprendre ici garde la grammaire intacte
 * au lieu d'ouvrir une palette parallèle.
 *
 * Toutes les combinaisons fond/encre passent le seuil de lisibilité, le jaune
 * fédéral compris — d'où son encre sombre, la seule qui tienne sur lui.
 *
 * Ils ont un seul objet : faire venir des bénévoles dans les équipes de
 * secours. Pas vendre une formation, pas recruter des formateurs — ces
 * chemins-là ont leurs propres pages, et les mélanger ici brouillerait le seul
 * message que ce mur porte. Tous mènent donc à « devenir secouriste actif ».
 *
 * Le registre : on promet ce qu'on tient. Pas de « devenez un héros » — ce que
 * les bénévoles décrivent eux-mêmes dans leurs portraits, c'est une équipe, des
 * week-ends de terrain et le sentiment d'être utile. C'est ça qu'on met.
 */
export const APPELS: { ton: string; titre: string; sous: string }[] = [
  { ton: 'secours', titre: 'Envie de rejoindre une famille\u00a0?',
    sous: 'On recrute toute l\u2019année' },
  { ton: 'azur', titre: 'Nos week-ends ont un sens.',
    sous: 'Venez voir par vous-même' },
  { ton: 'ocre', titre: 'Il manque un visage sur ce mur.',
    sous: 'Ce serait le vôtre\u00a0?' },
  { ton: 'ocean', titre: 'Être là quand ça compte.',
    sous: 'C\u2019est tout ce qu\u2019on demande' },
  { ton: 'navy', titre: 'Plus de 270 postes de secours par an.',
    sous: 'Et jamais trop de bras' },
  { ton: 'secours', titre: 'On ne rejoint pas une association.',
    sous: 'On rejoint une équipe' },
  { ton: 'azur', titre: 'Un diplôme au tiroir ne sert personne.',
    sous: 'Venez le faire vivre' },
  { ton: 'ocre', titre: 'Ici, on compte les uns sur les autres.',
    sous: 'Il en manque toujours un' },
  { ton: 'ocean', titre: 'Diplômé, jamais sorti en poste\u00a0?',
    sous: 'On vous attend' },
  { ton: 'navy', titre: 'Le terrain vous manque\u00a0?',
    sous: 'Il y a de la place ce week-end' },
];
