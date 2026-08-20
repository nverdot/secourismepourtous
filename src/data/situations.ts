/**
 * Situations de premiers secours — « que faire si… ».
 *
 * SOURCE UNIQUE : « Recommandations relatives à l'unité d'enseignement
 * Prévention et Secours Civiques de niveau 1 », édition 2024, direction
 * générale de la Sécurité civile et de la gestion des crises. Chaque situation
 * cite la fiche dont elle est tirée et sa date d'actualisation.
 *
 * ⚠️ TROIS RÈGLES, non négociables.
 *
 *   1. Rien n'est écrit de mémoire. Les conduites à tenir reprennent le texte
 *      du référentiel, reformulé pour être lisible mais jamais complété. Un
 *      article de secourisme approximatif fait plus de mal qu'une page absente.
 *   2. Chaque page dit d'appeler les secours et rappelle que lire ne remplace
 *      pas d'avoir appris. Ces pages informent ; elles ne forment pas.
 *   3. Quand le référentiel change, ces textes changent. La date de la fiche
 *      est affichée pour que l'écart se voie.
 *
 * Les gestes détaillés — profondeur des compressions, technique du garrot,
 * position latérale de sécurité — ne sont volontairement PAS décrits pas à pas.
 * Ils s'apprennent en les faisant, sous l'œil d'un formateur ; les décrire par
 * écrit donnerait l'illusion de savoir.
 */

export interface Situation {
  slug: string;
  /** Titre de la page, formulé comme on le cherche. */
  titre: string;
  /** Titre court, pour les listes et le fil d'ariane. */
  court: string;
  accroche: string;
  /** À qui cette situation arrive le plus souvent. */
  pourQui: string;
  /** Ce qui permet de reconnaître la situation. */
  reconnaitre: string[];
  /** La conduite à tenir, dans l'ordre. */
  faire: { titre: string; texte: string }[];
  /** Les erreurs courantes, celles qui aggravent. */
  pieges: string[];
  /** Numéro à composer en priorité. */
  numero: string;
  /** Ce que la formation apporte en plus de cette page. */
  enFormation: string;
  fiche: { ref: string; nom: string; maj: string };
  /**
   * Illustration de la situation. Facultative : sans elle, la page s'affiche
   * sur un fond uni plutôt que sur une photo, sans rien perdre.
   *
   * Elle doit montrer la SITUATION, pas le geste : une photo de compression
   * thoracique mal cadrée enseignerait un geste faux à qui la regarde vite.
   */
  image?: { fichier: string; alt: string };
  seo: { title: string; description: string };
}

export const situations: Situation[] = [
  {
    slug: 'etouffement',
    titre: 'Quelqu’un s’étouffe : que faire ?',
    court: 'Étouffement',
    accroche:
      'Un aliment, un jouet, un bonbon : l’étouffement survient en une seconde, le plus souvent à table. Savoir distinguer une gêne d’un étouffement complet change tout, parce que la conduite à tenir n’est pas la même.',
    pourQui:
      'Les enfants et les personnes âgées sont les plus exposés. Les repas, les jeux et tout ce qui passe par la bouche sont les circonstances les plus fréquentes.',
    reconnaitre: [
      'Posez la question : « est-ce que vous vous étouffez ? »',
      'Si la personne peut parler, crier, tousser et respirer — même avec un bruit anormal — l’obstruction est partielle.',
      'Si elle ne peut plus parler, crier ni tousser, garde la bouche ouverte, s’agite et devient rapidement bleue, l’obstruction est complète.',
    ],
    faire: [
      {
        titre: 'Obstruction partielle : ne touchez à rien',
        texte:
          'Installez la personne dans la position où elle se sent le mieux et encouragez-la à tousser. La toux est le geste le plus efficace : ne la gênez pas. Demandez un avis médical et surveillez-la attentivement.',
      },
      {
        titre: 'Si la toux devient inefficace',
        texte:
          'Dès que la toux faiblit et que la personne montre des signes de fatigue, passez à la conduite à tenir de l’obstruction complète.',
      },
      {
        titre: 'Obstruction complète : claques dans le dos',
        texte:
          'Donnez de une à cinq claques dans le dos. On s’arrête dès que le corps étranger est expulsé — pas besoin d’aller jusqu’à cinq.',
      },
      {
        titre: 'Puis les compressions',
        texte:
          'Si les claques sont inefficaces ou impossibles, réalisez de une à cinq compressions. La technique diffère selon l’âge et la corpulence : c’est précisément ce qui s’apprend en formation.',
      },
      {
        titre: 'Alertez',
        texte:
          'Faites alerter les secours, ou alertez-les vous-même dès que possible. Même après une désobstruction réussie, un avis médical s’impose : des complications peuvent survenir plusieurs jours après.',
      },
    ],
    pieges: [
      'Frapper dans le dos quelqu’un qui tousse encore : vous risquez d’enfoncer le corps étranger.',
      'Mettre les doigts dans la bouche à l’aveugle pour attraper l’objet.',
      'Faire boire un verre d’eau à quelqu’un qui s’étouffe.',
    ],
    numero: '15',
    enFormation:
      'La différence entre claques dans le dos et compressions, la position à adopter selon qu’il s’agit d’un adulte, d’un enfant ou d’un nourrisson, et la force à mettre : tout cela se travaille sur mannequin, jusqu’à ce que le geste vienne seul.',
    fiche: { ref: '02PR01', nom: 'Obstruction des voies aériennes', maj: 'décembre 2023' },
    image: {
      fichier: '/img/gestes/etouffement.jpg',
      alt: 'Un homme attablé porte la main à sa gorge, la bouche ouverte, tandis qu’un proche se penche vers lui pour l’aider.',
    },
    seo: {
      title: 'Quelqu’un s’étouffe : que faire ? | Gestes qui sauvent',
      description:
        'Étouffement : reconnaître une obstruction partielle ou complète, la conduite à tenir officielle, les erreurs à éviter. D’après le référentiel PSC 2024.',
    },
  },

  {
    slug: 'etouffement-nourrisson',
    titre: 'Un bébé s’étouffe : que faire ?',
    court: 'Étouffement du nourrisson',
    accroche:
      'Chez un nourrisson, les gestes ne sont pas ceux de l’adulte. Comprimer le ventre d’un bébé peut le blesser gravement : c’est la poitrine qu’on comprime, et jamais avant d’avoir essayé les claques dans le dos.',
    pourQui:
      'Un nourrisson, au sens du secourisme, est un enfant qui tient sur votre avant-bras. Purée, morceau de pain, petit jouet, pile bouton : les causes sont banales et l’étouffement est brutal.',
    reconnaitre: [
      'Le bébé ne peut plus tousser, crier ni émettre de son.',
      'Il garde la bouche ouverte, s’agite, puis devient rapidement bleu.',
      'S’il tousse ou pleure encore, l’obstruction est partielle : n’intervenez pas, laissez-le tousser et demandez un avis médical.',
    ],
    faire: [
      {
        titre: 'Installez-le sur votre avant-bras',
        texte:
          'Placez l’avant-bras contre son dos, la main soutenant sa tête, puis posez cet avant-bras sur votre cuisse. La tête doit être plus basse que le reste du corps.',
      },
      {
        titre: 'Une à cinq claques dans le dos',
        texte:
          'Entre les omoplates. On s’arrête dès que le corps étranger est expulsé — inutile d’aller jusqu’à cinq si le bébé respire de nouveau.',
      },
      {
        titre: 'Si c’est inefficace : compressions thoraciques',
        texte:
          'Retournez le bébé face vers le ciel, tête toujours plus basse que le corps, et réalisez une à cinq compressions sur la poitrine. Jamais sur le ventre : chez un nourrisson, les compressions abdominales sont proscrites.',
      },
      {
        titre: 'Alternez jusqu’à l’expulsion',
        texte:
          'Claques dans le dos, puis compressions thoraciques, tant que l’obstruction persiste et que le bébé reste conscient.',
      },
      {
        titre: 'Alertez',
        texte:
          'Faites alerter le 15 dès le début, ou appelez dès que le corps étranger est expulsé. Un avis médical s’impose même après une désobstruction réussie.',
      },
    ],
    pieges: [
      'Faire la manœuvre de l’adulte — compressions sur le ventre — sur un nourrisson.',
      'Mettre les doigts dans sa bouche pour tenter d’attraper l’objet.',
      'Le secouer, ou le tenir par les pieds la tête en bas.',
      'Intervenir alors qu’il tousse encore : la toux est plus efficace que vous.',
    ],
    numero: '15',
    enFormation:
      'La prise sur l’avant-bras, la force à mettre sur un corps de quelques kilos, l’enchaînement claques–compressions : cela se travaille sur mannequin nourrisson, et c’est très différent de ce qu’on imagine.',
    fiche: { ref: '02FT04', nom: 'Désobstruction par compressions thoraciques chez le nourrisson', maj: 'décembre 2022' },
    image: {
      fichier: '/img/gestes/etouffement-nourrisson.jpg',
      alt: 'Mannequin de formation nourrisson posé à plat ventre le long de l’avant-bras, tête plus basse que le corps, la main libre levée pour donner une claque entre les omoplates.',
    },
    seo: {
      title: 'Bébé qui s’étouffe : que faire ? | Gestes qui sauvent',
      description:
        'Étouffement du nourrisson : claques dans le dos, compressions thoraciques — jamais abdominales. La conduite à tenir officielle, d’après le référentiel PSC 2024.',
    },
  },

  {
    slug: 'arret-cardiaque-enfant',
    titre: 'Arrêt cardiaque chez un enfant ou un bébé : que faire ?',
    court: 'Arrêt cardiaque de l’enfant',
    accroche:
      'Chez l’enfant, l’arrêt cardiaque vient presque toujours d’un manque d’oxygène, pas du cœur. C’est pourquoi la réanimation commence par cinq insufflations, avant toute compression — l’inverse de l’adulte.',
    pourQui:
      'Noyade, étouffement, accident : les causes sont souvent respiratoires. Le témoin est presque toujours un parent, et l’enchaînement correct change tout.',
    reconnaitre: [
      'L’enfant ne répond pas et ne réagit pas quand on lui parle ou qu’on le stimule.',
      'Il ne respire pas, ou sa respiration est anormale — bruyante, par à-coups.',
      'Ne perdez pas de temps à chercher un pouls : l’absence de respiration normale suffit.',
    ],
    faire: [
      {
        titre: 'Faites alerter et chercher un défibrillateur',
        texte:
          'Le 15, ou le 112. Si vous êtes seul, criez pour attirer de l’aide avant de commencer.',
      },
      {
        titre: 'Cinq insufflations pour commencer',
        texte:
          'C’est la différence essentielle avec l’adulte : chez l’enfant et le nourrisson, la réanimation débute par cinq insufflations, avant toute compression.',
      },
      {
        titre: 'Puis 15 compressions pour 2 insufflations',
        texte:
          'Ce rythme remplace le 30 pour 2 de l’adulte. Les compressions se font au rythme de 100 à 120 par minute.',
      },
      {
        titre: 'Utilisez le défibrillateur dès qu’il arrive',
        texte:
          'Il s’emploie aussi sur un enfant. Allumez-le et suivez ses instructions vocales : il analyse seul et ne choque que si c’est nécessaire.',
      },
      {
        titre: 'Ne vous arrêtez pas',
        texte:
          'Continuez jusqu’au relais par les secours, ou jusqu’à ce que l’enfant retrouve une respiration normale.',
      },
    ],
    pieges: [
      'Appliquer le schéma de l’adulte : commencer par les compressions, et enchaîner 30 pour 2.',
      'Renoncer par peur de faire mal. Sans réanimation, l’issue est certaine.',
      'Attendre les secours sans rien faire.',
      'Croire qu’un défibrillateur est interdit sur un enfant.',
    ],
    numero: '15',
    enFormation:
      'Les insufflations chez un nourrisson, la profondeur des compressions sur un thorax d’enfant, l’enchaînement 15 pour 2 : tout se répète sur mannequins pédiatriques, jusqu’à ce que le rythme devienne automatique.',
    fiche: { ref: '02PR04', nom: 'Arrêt cardiaque', maj: 'décembre 2023' },
    image: {
      fichier: '/img/gestes/arret-cardiaque-enfant.jpg',
      alt: 'Formateur agenouillé réalisant des compressions thoraciques sur un mannequin de formation enfant allongé sur un tapis.',
    },
    seo: {
      title: 'Arrêt cardiaque d’un enfant ou d’un bébé : que faire ?',
      description:
        'Réanimation pédiatrique : 5 insufflations initiales puis 15 compressions pour 2 insufflations. Ce qui change par rapport à l’adulte. D’après le référentiel PSC 2024.',
    },
  },

  {
    slug: 'saignement-abondant',
    titre: 'Une plaie qui saigne beaucoup : que faire ?',
    court: 'Saignement abondant',
    accroche:
      'Une hémorragie externe peut tuer en quelques minutes. Le geste qui l’arrête est simple, ne demande aucun matériel, et n’importe qui peut le faire — encore faut-il l’avoir vu faire une fois.',
    pourQui:
      'Accidents domestiques, bricolage, accidents de la route, blessures sportives : personne n’est à l’abri, et c’est presque toujours un proche ou un passant qui intervient en premier.',
    reconnaitre: [
      'Le sang s’écoule de façon abondante et ne s’arrête pas seul.',
      'Il imbibe les vêtements ou forme rapidement une flaque.',
      'Écartez les vêtements si nécessaire pour voir d’où vient réellement le saignement.',
    ],
    faire: [
      {
        titre: 'Comprimez, tout de suite',
        texte:
          'Demandez à la personne de comprimer elle-même l’endroit qui saigne. Si elle ne le peut pas, faites-le à sa place. C’est la compression qui arrête l’hémorragie, pas le pansement.',
      },
      {
        titre: 'Maintenez la compression',
        texte:
          'Sans relâcher, sans vérifier toutes les dix secondes si ça a marché. Faites maintenir la compression si quelqu’un peut vous relayer.',
      },
      {
        titre: 'Allongez la personne',
        texte:
          'Sur un lit, un canapé, ou à défaut au sol. La position allongée retarde ou empêche l’installation d’une détresse liée à la perte de sang.',
      },
      {
        titre: 'Alertez les secours',
        texte:
          'Appelez le 15 ou faites appeler. Décrivez l’origine du saignement et ce que vous avez déjà fait.',
      },
      {
        titre: 'Le garrot, seulement si la compression échoue',
        texte:
          'Un garrot ne se pose que si la compression directe est inefficace ou impossible, et uniquement sur un membre, au-dessus de la plaie. C’est un geste lourd de conséquences : il s’apprend, il ne s’improvise pas.',
      },
    ],
    pieges: [
      'Poser un pansement compressif alors que le saignement n’est pas arrêté : il ne remplace pas la compression manuelle.',
      'Relâcher la compression pour regarder.',
      'Poser un garrot en premier réflexe, alors que la compression suffit dans l’immense majorité des cas.',
    ],
    numero: '15',
    enFormation:
      'On s’entraîne à comprimer efficacement — la plupart des gens appuient trop peu — et à reconnaître les rares situations qui justifient un garrot, puis à le poser correctement.',
    fiche: { ref: '02PR02', nom: 'Hémorragies externes', maj: 'décembre 2023' },
    image: {
      fichier: '/img/gestes/saignement-abondant.jpg',
      alt: 'Un homme ganté comprime une plaie qui saigne à la jambe d’une cycliste assise au sol, une trousse de secours ouverte à côté d’eux.',
    },
    seo: {
      title: 'Plaie qui saigne beaucoup : que faire ? | Gestes qui sauvent',
      description:
        'Hémorragie externe : comprimer, allonger, alerter. La conduite à tenir officielle et les erreurs qui aggravent. D’après le référentiel PSC 2024.',
    },
  },

  {
    slug: 'perte-de-connaissance',
    titre: 'Une personne est inconsciente mais respire : que faire ?',
    court: 'Perte de connaissance',
    accroche:
      'Une personne inconsciente qui respire encore risque d’étouffer avec sa propre langue ou ce qu’elle régurgite. La mettre sur le côté suffit à l’éviter — et c’est un geste que tout le monde peut apprendre.',
    pourQui:
      'Malaise, chute, alcool, épilepsie, hypoglycémie : les causes sont nombreuses et la conduite à tenir immédiate est la même dans tous les cas.',
    reconnaitre: [
      'Posez une question simple : « Comment ça va ? », « Vous m’entendez ? »',
      'Secouez doucement les épaules ou prenez la main en demandant : « serrez-moi la main ».',
      'Si la personne ne répond pas et ne réagit pas, elle a perdu connaissance.',
    ],
    faire: [
      {
        titre: 'Demandez de l’aide',
        texte: 'Si vous êtes seul, appelez à voix haute avant de commencer.',
      },
      {
        titre: 'Allongez la personne sur le dos',
        texte: 'Quelle que soit la position dans laquelle vous l’avez trouvée.',
      },
      {
        titre: 'Libérez les voies aériennes',
        texte:
          'C’est ce qui permet à l’air de passer. Le geste est précis : il se montre, il ne se lit pas.',
      },
      {
        titre: 'Vérifiez la respiration, dix secondes au plus',
        texte:
          'Penchez-vous, oreille et joue au-dessus de la bouche et du nez : regardez si la poitrine se soulève, écoutez, sentez le souffle.',
      },
      {
        titre: 'Si elle respire : position latérale de sécurité',
        texte:
          'Mettez-la sur le côté, puis alertez les secours et surveillez sa respiration jusqu’à leur arrivée.',
      },
      {
        titre: 'Si elle ne respire pas ou respire anormalement',
        texte:
          'Il s’agit d’un arrêt cardiaque : commencez immédiatement la réanimation et faites apporter un défibrillateur.',
      },
    ],
    pieges: [
      'Laisser la personne sur le dos : elle risque d’étouffer.',
      'Confondre une respiration agonique — bruyante, irrégulière, par à-coups — avec une respiration normale. C’est un arrêt cardiaque.',
      'Donner à boire ou tenter de faire asseoir.',
    ],
    numero: '15',
    enFormation:
      'La position latérale de sécurité est le geste le plus mal fait par ceux qui l’ont seulement vue en vidéo. On la répète jusqu’à ce qu’elle soit stable, y compris sur une personne plus lourde que soi.',
    fiche: { ref: '02PR03', nom: 'Perte de connaissance', maj: 'décembre 2023' },
    image: {
      fichier: '/img/gestes/perte-de-connaissance.jpg',
      alt: 'Dans un salon, une femme téléphone aux secours en gardant une main sur l’épaule d’un homme inconscient qu’elle a installé sur le côté.',
    },
    seo: {
      title: 'Personne inconsciente qui respire : que faire ? | Gestes qui sauvent',
      description:
        'Perte de connaissance : vérifier la réponse, libérer les voies aériennes, contrôler la respiration, position latérale de sécurité. D’après le référentiel PSC 2024.',
    },
  },

  {
    slug: 'arret-cardiaque',
    titre: 'Arrêt cardiaque : que faire avant l’arrivée des secours ?',
    court: 'Arrêt cardiaque',
    accroche:
      'Chaque minute sans massage fait chuter les chances de survie. En France, la plupart des arrêts cardiaques surviennent à domicile, devant un proche. Ce que fait ce proche dans les trois premières minutes décide de l’issue.',
    pourQui:
      'Cela arrive le plus souvent à la maison, devant la famille. Le témoin n’est presque jamais un professionnel.',
    reconnaitre: [
      'La personne ne répond pas et ne réagit pas.',
      'Elle ne respire pas, ou sa respiration est anormale : bruyante, par à-coups, irrégulière.',
      'Une brève période de mouvements saccadés, qui ressemble à des convulsions, peut survenir au moment de l’arrêt. Ce n’est pas une crise d’épilepsie.',
    ],
    faire: [
      {
        titre: 'Faites alerter et faites apporter un défibrillateur',
        texte:
          'Appelez le 15 ou désignez quelqu’un pour le faire, en même temps qu’une autre personne va chercher le défibrillateur le plus proche.',
      },
      {
        titre: 'Commencez les compressions thoraciques',
        texte:
          'Sans attendre. C’est le geste qui maintient un minimum de circulation vers le cerveau.',
      },
      {
        titre: 'Utilisez le défibrillateur dès qu’il arrive',
        texte:
          'Allumez-le et suivez ses instructions vocales. L’appareil analyse seul et n’envoie un choc que s’il est nécessaire : il est impossible de se tromper en l’utilisant.',
      },
      {
        titre: 'Ne vous arrêtez pas',
        texte:
          'Continuez jusqu’à ce que les secours prennent le relais, ou que la personne reprenne une respiration normale.',
      },
    ],
    pieges: [
      'Attendre les secours sans rien faire : sans massage, les chances de survie s’effondrent.',
      'Prendre une respiration agonique pour un signe de vie.',
      'Craindre d’utiliser un défibrillateur : il ne délivre un choc que s’il détecte un rythme qui le justifie.',
      'Avoir peur de casser une côte. C’est possible, et ce n’est pas ce qui met la vie en jeu.',
    ],
    numero: '15',
    enFormation:
      'On travaille la profondeur et le rythme des compressions sur mannequin avec retour visuel — presque personne n’appuie assez fort du premier coup — et on manipule un vrai défibrillateur de formation.',
    fiche: { ref: '02PR04', nom: 'Arrêt cardiaque', maj: 'décembre 2023' },
    image: {
      fichier: '/img/gestes/arret-cardiaque.jpg',
      alt: 'Dans un salon, une femme réalise des compressions thoraciques sur un homme inconscient allongé au sol, bras tendus et mains au centre de la poitrine.',
    },
    seo: {
      title: 'Arrêt cardiaque : que faire ? | Gestes qui sauvent à Nice',
      description:
        'Reconnaître un arrêt cardiaque, alerter, masser, utiliser un défibrillateur. La conduite à tenir officielle, d’après le référentiel PSC 2024.',
    },
  },

  {
    slug: 'malaise',
    titre: 'Malaise : reconnaître un AVC ou un problème cardiaque',
    court: 'Malaise',
    accroche:
      'Certains signes, même brefs, imposent d’appeler immédiatement. Les reconnaître fait gagner les minutes qui décident des séquelles — en particulier pour un accident vasculaire cérébral.',
    pourQui:
      'Un parent âgé, un collègue, un inconnu dans la rue. Les signes sont parfois discrets et disparaissent : ils n’en sont pas moins urgents.',
    reconnaitre: [
      'Douleur dans la poitrine : penser à un accident cardiaque.',
      'Faiblesse ou paralysie d’un bras.',
      'Déformation du visage.',
      'Perte de la vision d’un œil ou des deux.',
      'Difficulté à parler, parole incohérente, ou difficulté à comprendre.',
      'Mal de tête sévère et inhabituel.',
      'Perte d’équilibre, marche instable, chute inexpliquée.',
    ],
    faire: [
      {
        titre: 'Alertez immédiatement',
        texte:
          'L’apparition d’un seul de ces signes impose une alerte immédiate, même s’il a duré quelques secondes et qu’il a disparu.',
      },
      {
        titre: 'Installez la personne',
        texte:
          'Dans la position où elle se sent le mieux, le plus souvent allongée ou assise selon la gêne ressentie.',
      },
      {
        titre: 'Écoutez-la et notez',
        texte:
          'Demandez depuis quand cela dure, si c’est déjà arrivé, quels traitements elle prend. Ces informations seront précieuses pour le médecin régulateur.',
      },
      {
        titre: 'Surveillez sans la laisser seule',
        texte:
          'Restez auprès d’elle jusqu’à l’arrivée des secours, et rappelez si son état change.',
      },
    ],
    pieges: [
      'Attendre de voir si ça passe : pour un AVC, chaque minute perdue coûte des neurones.',
      'Conduire soi-même la personne à l’hôpital plutôt que d’appeler le 15.',
      'Donner à manger, à boire ou un médicament.',
    ],
    numero: '15',
    enFormation:
      'On apprend à poser les bonnes questions, à transmettre un bilan clair au médecin régulateur, et à reconnaître les signes qui font basculer d’un simple malaise à une urgence vitale.',
    fiche: { ref: '02PR05', nom: 'Malaises', maj: 'décembre 2022' },
    image: {
      fichier: '/img/gestes/malaise.jpg',
      alt: 'Une femme appelle les secours en soutenant un homme assis dont le visage est affaissé d’un côté et le bras retombe : deux signes d’accident vasculaire cérébral.',
    },
    seo: {
      title: 'Malaise, AVC, douleur dans la poitrine : que faire ?',
      description:
        'Les signes qui imposent d’appeler le 15 immédiatement : paralysie d’un bras, visage déformé, trouble de la parole, douleur thoracique. D’après le référentiel PSC 2024.',
    },
  },

  {
    slug: 'brulure',
    titre: 'Brûlure : les gestes des premières minutes',
    court: 'Brûlure',
    accroche:
      'Refroidir tout de suite, longtemps, à l’eau tempérée. Ce seul réflexe limite la profondeur de la brûlure — mais il perd tout intérêt passé une demi-heure.',
    pourQui:
      'La cuisine est le premier lieu de brûlure domestique, et les jeunes enfants en sont les premières victimes.',
    reconnaitre: [
      'Rougeur, cloques, peau blanche ou cartonnée selon la profondeur.',
      'L’étendue compte autant que l’aspect : une brûlure large est grave même si elle paraît superficielle.',
      'Les brûlures du visage, des mains, des articulations et des parties génitales sont toujours à faire évaluer.',
    ],
    faire: [
      {
        titre: 'Refroidissez immédiatement',
        texte:
          'À l’eau courante tempérée, à faible pression, pendant au moins 10 minutes, idéalement 20. Commencer l’arrosage après 30 minutes n’a plus d’intérêt.',
      },
      {
        titre: 'Retirez vêtements et bijoux',
        texte:
          'En même temps que l’arrosage, et seulement s’ils n’adhèrent pas à la peau. Ce qui colle reste en place.',
      },
      {
        titre: 'Évaluez la gravité',
        texte:
          'Étendue, profondeur, localisation, âge de la personne. En cas de doute, considérez la brûlure comme grave.',
      },
      {
        titre: 'Brûlure grave : alertez dès le début de l’arrosage',
        texte:
          'N’attendez pas la fin des 20 minutes pour appeler. Poursuivez le refroidissement selon les consignes qui vous seront données, puis installez la personne allongée, ou assise en cas de gêne respiratoire.',
      },
    ],
    pieges: [
      'Appliquer de la glace, du beurre, de l’huile, du dentifrice ou une pommade.',
      'Percer les cloques.',
      'Arrêter l’arrosage au bout de deux minutes parce que la douleur a diminué.',
      'Arracher un vêtement collé à la peau.',
    ],
    numero: '15',
    enFormation:
      'On apprend à évaluer l’étendue d’une brûlure, à distinguer ce qui relève du médecin traitant de ce qui relève du 15, et à gérer les cas particuliers : brûlure chimique, électrique, par inhalation.',
    fiche: { ref: '02PR07', nom: 'Brûlures', maj: 'décembre 2022' },
    image: {
      fichier: '/img/gestes/brulure.jpg',
      alt: 'Dans une cuisine, une femme maintient l’avant-bras brûlé d’un homme sous l’eau courante de l’évier.',
    },
    seo: {
      title: 'Brûlure : que faire ? Les bons gestes | Gestes qui sauvent',
      description:
        'Refroidir 20 minutes à l’eau tempérée, retirer bijoux et vêtements, évaluer la gravité. Les erreurs à ne pas commettre. D’après le référentiel PSC 2024.',
    },
  },
];

export const parSituation = (slug: string) => situations.find((s) => s.slug === slug);

/** Édition du référentiel dont ces contenus sont tirés. */
export const referentiel = {
  nom: 'Recommandations relatives à l’unité d’enseignement « Prévention et Secours Civiques de niveau 1 »',
  edition: 'édition 2024',
  auteur: 'Direction générale de la Sécurité civile et de la gestion des crises',
};
