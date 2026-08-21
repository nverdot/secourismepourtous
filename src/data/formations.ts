/**
 * Catalogue des formations.
 *
 * Une seule source pour les 10 pages : la page /formations/[slug] est générée
 * à partir de ce fichier. Modifier un tarif ici le met à jour partout.
 *
 * `wixEvent` fait le lien avec Wix Events : c'est le titre exact de l'événement
 * côté Wix, utilisé pour rattacher les sessions réelles à la bonne formation.
 * Voir src/lib/wix.ts.
 *
 * ⚠️ À FAIRE VALIDER PAR SPT : tarifs, durées et prérequis marqués « aValider ».
 * Seul le PSC a été confirmé depuis le site actuel (50 €, 7 h, dès 10 ans).
 */

export type Filiere = 'citoyenne' | 'operationnelle' | 'aquatique' | 'pedagogique' | 'entreprise';

export interface Module {
  titre: string;
  texte: string;
}

export interface Objectif {
  titre: string;
  texte: string;
  icone: 'bouclier' | 'urgence' | 'coeur' | 'equipe' | 'eau' | 'pedagogie';
}

export interface Formation {
  slug: string;
  sigle: string;
  intitule: string;
  filiere: Filiere;
  certifiante: boolean;
  accroche: string;
  resume: string;

  duree: string;
  dureeNote?: string;
  prerequis: string;
  prerequisNote?: string;
  certification: string;
  certificationNote?: string;
  tarif: string;
  tarifNote?: string;
  /**
   * Billets Wix à ne pas proposer sur cette page, par fragment de nom.
   * L'événement PSE1 vend aussi le forfait « PSE1 + PSE2 » : le montrer sur la
   * page du PSE1 seul brouille le tarif annoncé juste au-dessus.
   */
  billetsMasques?: string[];
  /** Tarif applicable en financement CPF, quand il diffère du tarif direct. */
  tarifCpf?: string;
  aValider?: boolean;

  objectifs: Objectif[];
  modules: Module[];
  suites: string[];
  /** Remplace les modalités par défaut de l'association, au cas par cas. */
  modalites?: Partial<{
    pedagogie: string;
    evaluation: string;
    delaiAcces: string;
    effectif: string;
    lieu: string;
  }>;

  /** Photo de fond du hero. Sans elle, le hero retombe sur son dégradé. */
  image?: string;
  /**
   * Offre groupée proposée à la réservation.
   *
   * Ce n'est pas un affichage décoratif : le billet existe réellement dans
   * Wix, et c'est lui que le visiteur choisira au moment de payer. Les
   * montants doivent donc rester alignés sur la billetterie.
   */
  pack?: {
    libelle: string;
    tarif: string;
    separement: string;
    economie: string;
    detail: string;
  };

  /** Titre exact de l'événement dans Wix Events, pour rattacher les sessions. */
  wixEvent: string;

  /**
   * Formation continue associée (slug). Le visiteur qui arrive sur la filière
   * doit choisir entre « je me forme » et « je me recycle » : c'est la première
   * question qu'il se pose, avant même le choix du niveau.
   */
  recyclage?: string;

  /** true pour les formations continues elles-mêmes, exclues des cartes filière. */
  estRecyclage?: boolean;

  /**
   * Formation temporairement suspendue. La page reste en ligne — retirer une
   * URL référencée coûte plus cher que de l'annoter — mais les sessions et
   * l'inscription sont masquées, et un bandeau l'annonce.
   */
  suspendue?: { raison: string };

  seo: { title: string; description: string };
}

export interface InfoFiliere {
  nom: string;
  texte: string;
  /** Titre de la carte sur l'accueil : les sigles, pas le nom de la filière. */
  titre: string;
  /**
   * Formulée à la première personne, du point de vue du visiteur.
   * On ne présente pas un catalogue : on l'aide à se reconnaître.
   */
  jeSuis: string;
  /** Ce que la filière contient, en clair. */
  contenu: string;
  couleur: 'azur' | 'secours' | 'ocean' | 'ocre' | 'navy';
  icone: 'coeur' | 'ambulance' | 'nage' | 'pedagogie' | 'mallette';
  /** URL d'une image du gestionnaire de médias Wix. Vide = dégradé de repli. */
  image?: string;
}

export const filieres: Record<Filiere, InfoFiliere> = {
  citoyenne: {
    nom: 'Filière citoyenne',
    titre: 'PSC & recyclage',
    texte: 'Apprendre les gestes qui sauvent, sans prérequis, dès 10 ans.',
    jeSuis: 'Je veux apprendre les gestes de base',
    contenu: 'PSC — Citoyen Sauveteur, et sa formation continue FC PSC.',
    couleur: 'azur',
    icone: 'coeur',
    image: '/img/filiere-citoyenne.jpg',
  },
  operationnelle: {
    nom: 'Filière opérationnelle',
    titre: 'PSE1, PSE2 & recyclages',
    texte: 'Devenir secouriste et intervenir en équipe sur les postes de secours.',
    jeSuis: 'Je veux devenir secouriste',
    contenu: 'PSE1, PSE2 et leurs formations continues annuelles.',
    couleur: 'secours',
    icone: 'ambulance',
    image: '/img/equipe.jpg',
  },
  aquatique: {
    nom: 'Filière sauvetage aquatique',
    titre: 'BNSSA, BSB & recyclages',
    texte: 'Surveiller les baignades et les plages, du BSB au BNSSA.',
    jeSuis: 'Je travaille en milieu aquatique',
    contenu: 'BNSSA et son recyclage, BSB et FC BSB pour les accueils de loisirs.',
    couleur: 'ocean',
    icone: 'nage',
    image: '/img/filiere-aquatique.jpg',
  },
  pedagogique: {
    nom: 'Filière pédagogique',
    titre: 'PAE FPSC & PAE FPS',
    texte: 'Devenir formateur et transmettre à votre tour.',
    jeSuis: 'Je veux devenir formateur',
    contenu: 'Monitorats permettant d’enseigner le PSC, le PSE1 et le PSE2.',
    couleur: 'ocre',
    icone: 'pedagogie',
    image: '/img/pse-immobilisation.jpg',
  },
  entreprise: {
    nom: 'Filière entreprise',
    titre: 'SST & MAC SST',
    texte: 'Former vos salariés à la prévention et aux secours au travail.',
    jeSuis: 'Je suis salarié ou employeur',
    contenu: 'SST, maintien des compétences MAC SST, intervention dans vos locaux.',
    couleur: 'navy',
    icone: 'mallette',
    image: '/img/sst.jpg',
  },
};

export const formations: Formation[] = [
  {
    slug: 'psc',
    sigle: 'PSC',
    intitule: 'Premiers Secours Citoyen — ex-PSC1',
    filiere: 'citoyenne',
    certifiante: true,
    accroche:
      "Pas besoin d'être un expert pour sauver une vie. Une journée, des gestes simples, et vous devenez un maillon de la chaîne de survie — dès 10 ans, sans aucun prérequis.",
    resume:
      'La formation de référence aux premiers secours, ouverte à tous dès 10 ans.',
    duree: '7 heures',
    dureeNote: '1 journée — 9h à 17h',
    prerequis: 'Dès 10 ans',
    prerequisNote: 'Aucun prérequis',
    certification: 'PSC',
    certificationNote: 'Contrôle continu, sans examen final',
    tarif: '50 €',
    tarifNote: 'Non éligible au CPF',
    objectifs: [
      {
        titre: 'Protéger et alerter',
        texte:
          'Reconnaître un danger, protéger la victime et les témoins, puis transmettre une alerte efficace aux services de secours.',
        icone: 'bouclier',
      },
      {
        titre: "Traiter l'urgence vitale",
        texte:
          "Agir face à une hémorragie, un étouffement ou une perte de connaissance, et installer la victime en attendant les secours.",
        icone: 'urgence',
      },
      {
        titre: 'Réanimer et défibriller',
        texte:
          "Pratiquer le massage cardiaque et mettre en œuvre un défibrillateur pour augmenter les chances de survie.",
        icone: 'coeur',
      },
    ],
    modules: [
      {
        titre: 'Protection et alerte',
        texte:
          "Reconnaître et supprimer un danger persistant, protéger la victime et les témoins, puis transmettre une alerte claire et complète au SAMU ou aux sapeurs-pompiers.",
      },
      {
        titre: 'Hémorragies externes',
        texte:
          "Identifier une hémorragie, réaliser une compression directe et installer la victime en attendant l'arrivée des secours.",
      },
      {
        titre: 'Obstruction des voies aériennes',
        texte:
          "Désobstruer les voies aériennes d'un adulte, d'un enfant ou d'un nourrisson qui s'étouffe, par les claques dans le dos et les compressions.",
      },
      {
        titre: 'Malaises',
        texte:
          "Reconnaître les signes d'un malaise, mettre la victime au repos et transmettre aux secours les informations qui orienteront la prise en charge.",
      },
      {
        titre: 'Perte de connaissance',
        texte:
          'Libérer les voies aériennes, contrôler la respiration et placer en position latérale de sécurité une victime inconsciente qui respire.',
      },
      {
        titre: 'Arrêt cardiaque et défibrillation',
        texte:
          "Réaliser une réanimation cardio-pulmonaire et utiliser un défibrillateur automatisé externe, chez l'adulte comme chez l'enfant.",
      },
      {
        titre: 'Plaies, brûlures et traumatismes',
        texte:
          "Adapter sa conduite face à une plaie grave ou simple, une brûlure ou un traumatisme, et éviter les gestes qui aggravent l'état de la victime.",
      },
    ],
    suites: ['La formation continue FC PSC pour rester à jour', 'Poursuivre vers le PSE1, secouriste en équipe'],
    image: '/img/filiere-citoyenne.jpg',
    wixEvent: 'PSC',
    recyclage: 'fc-psc',
    seo: {
      title: 'Formation PSC1 à Nice | Prix, dates et inscription',
      description:
        'Le PSC, anciennement PSC1, à Nice : prix 50 €, 7 h en une journée, dès 10 ans, sans prérequis. Calendrier des sessions et inscription en ligne. Organisme certifié Qualiopi, affilié FFSS et agréé sécurité civile.',
    },
  },

  {
    slug: 'pse-1',
    sigle: 'PSE1',
    intitule: 'Premiers Secours en Équipe niveau 1',
    filiere: 'operationnelle',
    certifiante: true,
    accroche:
      "Passez du geste citoyen à l'intervention en équipe. Le PSE1 est la porte d'entrée du secourisme opérationnel et des postes de secours.",
    resume: "Devenez secouriste et intervenez en équipe sur les dispositifs de secours.",
    duree: '35 heures',
    dureeNote: '4 journées',
    prerequis: 'Dès 16 ans',
    certification: 'PSE1',
    certificationNote: 'Certificat de compétences',
    tarif: '280 €',
    tarifNote: '350 € en financement CPF',
    tarifCpf: '350 €',
    pack: {
      libelle: 'PSE1 + PSE2',
      tarif: '480 €',
      separement: '560 €',
      economie: '80 €',
      detail: 'Réservez les deux formations ensemble et enchaînez les deux niveaux sans repasser par la case inscription.',
    },
    objectifs: [
      {
        titre: 'Intervenir en équipe',
        texte: "Prendre sa place dans une équipe de secours et appliquer les procédures sous l'autorité d'un chef d'équipe.",
        icone: 'equipe',
      },
      {
        titre: 'Prendre en charge une victime',
        texte: "Réaliser un bilan, mettre en œuvre les gestes adaptés et transmettre aux services médicaux.",
        icone: 'urgence',
      },
      {
        titre: 'Utiliser le matériel de secours',
        texte: 'Employer oxygène, aspirateur de mucosités, matériel d’immobilisation et de relevage.',
        icone: 'coeur',
      },
    ],
    modules: [
      { titre: 'La chaîne de secours', texte: "Organisation des secours en France et place du secouriste au sein de l’équipe." },
      { titre: 'Bilans et surveillance', texte: 'Réaliser un bilan circonstanciel, vital et complémentaire, puis surveiller la victime.' },
      { titre: 'Détresses vitales', texte: 'Reconnaître et prendre en charge les détresses respiratoires, circulatoires et neurologiques.' },
      { titre: 'Réanimation et oxygénothérapie', texte: 'RCP à plusieurs équipiers, insufflateur manuel et administration d’oxygène.' },
      { titre: 'Traumatismes', texte: 'Immobilisation, relevage et brancardage adaptés au traumatisme constaté.' },
      { titre: 'Situations particulières', texte: 'Accouchement inopiné, affections spécifiques et conduites à tenir associées.' },
    ],
    suites: ['Poursuivre vers le PSE2, équipier secouriste', 'Rejoindre nos équipes de postes de secours'],
    image: '/img/equipe.jpg',
    wixEvent: 'PSE1 - Formation',
    recyclage: 'fc-pse-1',
    seo: {
      title: 'Formation PSE1 à Nice | Secourisme Pour Tous',
      description:
        'Devenez secouriste avec le PSE1 à Nice. Formation agréée sécurité civile pour intervenir en équipe sur les postes de secours. Organisme Qualiopi.',
    },
  },

  {
    slug: 'pse-2',
    sigle: 'PSE2',
    billetsMasques: ['PSE1 + PSE2'],
    intitule: 'Premiers Secours en Équipe niveau 2',
    filiere: 'operationnelle',
    certifiante: true,
    accroche:
      "Prenez la responsabilité d'une équipe. Le PSE2 vous forme à conduire l'intervention et à coordonner les secouristes sur le terrain.",
    resume: 'Devenez équipier secouriste et coordonnez l’action, accessible après le PSE1.',
    duree: '28 heures',
    dureeNote: '4 journées',
    prerequis: 'PSE1 à jour',
    certification: 'PSE2',
    certificationNote: 'Certificat de compétences',
    tarif: '280 €',
    tarifNote: '350 € en financement CPF',
    tarifCpf: '350 €',
    objectifs: [
      { titre: 'Conduire une intervention', texte: "Organiser l'action de l'équipe et décider des gestes prioritaires.", icone: 'equipe' },
      { titre: 'Immobiliser et relever', texte: 'Mettre en œuvre les techniques d’immobilisation du rachis et des membres.', icone: 'urgence' },
      { titre: 'Assister les équipes médicales', texte: "Préparer le matériel et assister l'équipe médicale sur intervention.", icone: 'coeur' },
    ],
    modules: [
      { titre: 'Rôle de l’équipier secouriste', texte: "Coordination de l'action, sécurité de l'équipe et transmission des informations." },
      { titre: 'Immobilisation du rachis', texte: 'Techniques de maintien de tête, collier cervical et plan dur.' },
      { titre: 'Relevages et brancardages', texte: 'Choisir et réaliser la technique adaptée à la victime et au terrain.' },
      { titre: 'Souffrance psychique', texte: 'Reconnaître et accompagner une victime en détresse psychologique.' },
      { titre: 'Situations complexes', texte: 'Nombreuses victimes, accès difficile, coordination avec les autres services.' },
    ],
    suites: ['Formation continue annuelle FC PSE2', 'Poursuivre vers la filière pédagogique (PAE FPS)'],
    image: '/img/pse-immobilisation.jpg',
    wixEvent: 'PSE2 - Formation',
    recyclage: 'fc-pse-2',
    seo: {
      title: 'Formation PSE2 à Nice | Secourisme Pour Tous',
      description:
        'Devenez équipier secouriste avec le PSE2 à Nice, accessible après le PSE1. Formation agréée sécurité civile, organisme certifié Qualiopi. Dates et inscription en ligne.',
    },
  },

  {
    slug: 'bnssa',
    sigle: 'BNSSA',
    intitule: 'Brevet National de Sécurité et de Sauvetage Aquatique',
    filiere: 'aquatique',
    certifiante: true,
    accroche:
      "Surveillez les piscines, les plages et les plans d'eau. Le BNSSA est le diplôme de référence du sauvetage aquatique, et le premier pas vers un métier.",
    resume: 'Le diplôme national pour devenir sauveteur aquatique.',
    duree: 'Nous consulter',
    prerequis: 'Dès 17 ans',
    prerequisNote: 'PSE1 à jour requis',
    certification: 'BNSSA',
    certificationNote: 'Diplôme d’État',
    tarif: 'Nous consulter',
    aValider: true,
    objectifs: [
      { titre: 'Surveiller un bassin', texte: 'Prévenir les risques, repérer les comportements à risque et intervenir vite.', icone: 'eau' },
      { titre: 'Sauver en milieu aquatique', texte: 'Techniques d’approche, de dégagement et de remorquage d’une victime.', icone: 'eau' },
      { titre: 'Secourir hors de l’eau', texte: 'Sortie de l’eau, bilan et gestes de secours jusqu’à l’arrivée des renforts.', icone: 'coeur' },
    ],
    modules: [
      { titre: 'Épreuves de nage', texte: 'Préparation physique et technique aux épreuves chronométrées du diplôme.' },
      { titre: 'Sauvetage avec matériel', texte: 'Utilisation du matériel de sauvetage et parcours de sauvetage aquatique.' },
      { titre: 'Réglementation', texte: 'Cadre légal de la surveillance des baignades et responsabilités du BNSSA.' },
      { titre: 'Secourisme appliqué', texte: 'Mise en pratique des gestes de secours en contexte aquatique.' },
    ],
    suites: ['Formation continue BNSSA tous les 5 ans', 'Le BSB pour les accueils collectifs de mineurs'],
    image: '/img/filiere-aquatique.jpg',
    suspendue: { raison: "Le BNSSA n'est pas proposé actuellement. Nous ouvrirons prochainement la formation SSA (Surveillant Sauveteur Aquatique) : contactez-nous pour être prévenu de l'ouverture des inscriptions." },
    wixEvent: 'BNSSA',
    recyclage: 'fc-bnssa',
    seo: {
      title: 'Formation BNSSA à Nice | Secourisme Pour Tous',
      description:
        'Préparez le BNSSA à Nice et devenez sauveteur aquatique : entraînement, épreuves et secourisme. Affilié FFSS, certifié Qualiopi. Dates et tarifs.',
    },
  },

  {
    slug: 'sst',
    sigle: 'SST',
    intitule: 'Sauveteur Secouriste du Travail',
    filiere: 'entreprise',
    certifiante: true,
    accroche:
      "Un salarié formé, c'est une intervention en moins de trois minutes. Le SST forme vos équipes à secourir et à prévenir les risques de votre entreprise.",
    resume: 'La formation secourisme de référence en entreprise, avec son maintien MAC SST.',
    duree: '14 heures',
    dureeNote: '2 journées',
    prerequis: 'Aucun',
    prerequisNote: 'Salariés et employeurs',
    certification: 'SST',
    certificationNote: 'MAC tous les 24 mois',
    tarif: '190 €',
    tarifNote: 'MAC SST : 90 € tous les 24 mois',
    objectifs: [
      { titre: 'Secourir en entreprise', texte: 'Intervenir efficacement sur un accident du travail avant l’arrivée des secours.', icone: 'urgence' },
      { titre: 'Prévenir les risques', texte: 'Repérer les situations dangereuses et participer à la prévention dans l’entreprise.', icone: 'bouclier' },
      { titre: 'Alerter et protéger', texte: 'Organiser l’alerte interne et protéger la victime comme les autres salariés.', icone: 'coeur' },
    ],
    modules: [
      { titre: 'Le SST dans l’entreprise', texte: 'Cadre réglementaire, rôle du sauveteur secouriste et organisation des secours.' },
      { titre: 'Protéger', texte: 'Analyser la situation, supprimer ou isoler le danger, protéger la victime et les témoins.' },
      { titre: 'Examiner et alerter', texte: 'Rechercher les détresses vitales et transmettre l’alerte aux secours adaptés.' },
      { titre: 'Secourir', texte: 'Gestes adaptés : saignements, étouffement, malaise, brûlure, traumatisme, arrêt cardiaque.' },
      { titre: 'Prévention des risques', texte: 'Contribuer à la démarche de prévention de son établissement.' },
    ],
    suites: ['Maintien et actualisation des compétences (MAC SST) tous les 24 mois'],
    recyclage: 'mac-sst',
    image: '/img/sst.jpg',
    wixEvent: 'SST',
    seo: {
      title: 'Formation SST à Nice | Sauveteur Secouriste du Travail',
      description:
        'Formez vos salariés au SST à Nice et dans le 06 : formation initiale et MAC SST. Organisme certifié Qualiopi, intervention en entreprise.',
    },
  },

  // ==========================================================================
  //  FORMATIONS CONTINUES (recyclages)
  //  Public différent : ces personnes ont déjà le diplôme et cherchent à le
  //  maintenir. L'argument n'est pas « apprenez », c'est « restez à jour ».
  // ==========================================================================

  {
    slug: 'fc-psc',
    sigle: 'FC PSC',
    intitule: 'Formation continue Premiers Secours Citoyen — ex-FC PSC1',
    filiere: 'citoyenne',
    certifiante: false,
    estRecyclage: true,
    accroche:
      "Les gestes évoluent, les recommandations aussi. Une demi-journée pour remettre à jour vos réflexes et repartir confiant.",
    resume: 'Remise à niveau des gestes de premiers secours pour les titulaires du PSC.',
    duree: '4 heures',
    prerequis: 'PSC obtenu',
    certification: 'Attestation FC',
    certificationNote: 'Recyclage conseillé tous les 3 ans',
    tarif: '30 €',
    objectifs: [
      { titre: 'Réactiver les gestes', texte: "Reprendre en pratique les gestes d'urgence vitale, sans repartir de zéro.", icone: 'coeur' },
      { titre: 'Intégrer les évolutions', texte: 'Prendre connaissance des dernières recommandations du référentiel national.', icone: 'bouclier' },
      { titre: 'Reprendre confiance', texte: "Se remettre en situation pour ne pas hésiter le jour où ça compte.", icone: 'urgence' },
    ],
    modules: [
      { titre: 'Rappel des conduites à tenir', texte: 'Protection, alerte et gestes prioritaires face aux situations les plus fréquentes.' },
      { titre: 'Réanimation et défibrillateur', texte: 'Reprise pratique du massage cardiaque et de la mise en œuvre du DAE.' },
      { titre: 'Évolutions du référentiel', texte: 'Ce qui a changé depuis votre formation initiale.' },
      { titre: 'Mises en situation', texte: 'Cas concrets pour réancrer les automatismes.' },
    ],
    suites: ['Poursuivre vers le PSE1, secouriste en équipe'],
    image: '/img/pse-equipe.jpg',
    wixEvent: 'FC PSC',
    seo: {
      title: 'Recyclage PSC1 à Nice | Prix, dates et inscription',
      description:
        'Remettez à jour vos gestes de premiers secours avec la formation continue PSC à Nice. Organisme certifié Qualiopi, affilié FFSS et agréé sécurité civile. Dates et inscription.',
    },
  },

  {
    slug: 'fc-pse-1',
    sigle: 'FC PSE1',
    intitule: 'Formation continue PSE1',
    filiere: 'operationnelle',
    certifiante: false,
    estRecyclage: true,
    accroche:
      "Obligatoire chaque année pour rester opérationnel. Sans elle, vous ne pouvez plus intervenir sur les postes de secours.",
    resume: 'Le maintien annuel obligatoire des compétences de secouriste.',
    duree: '7 heures',
    prerequis: 'PSE1 obtenu',
    certification: 'Attestation FC',
    certificationNote: 'Annuelle et obligatoire',
    tarif: '70 €',
    dureeNote: '1 journée',
    tarifNote: '90 € en financement CPF',
    tarifCpf: '90 €',
    objectifs: [
      { titre: 'Rester opérationnel', texte: "Conserver le droit d'intervenir en équipe sur les dispositifs de secours.", icone: 'equipe' },
      { titre: 'Réviser les gestes techniques', texte: 'Bilans, immobilisations, oxygénothérapie et matériel de relevage.', icone: 'urgence' },
      { titre: 'Intégrer les nouveautés', texte: 'Évolutions des recommandations et des protocoles depuis la dernière session.', icone: 'bouclier' },
    ],
    modules: [
      { titre: 'Retour d’expérience', texte: 'Analyse des interventions vécues et des difficultés rencontrées sur le terrain.' },
      { titre: 'Gestes d’urgence vitale', texte: 'Reprise pratique de la RCP, de l’oxygénothérapie et de la désobstruction.' },
      { titre: 'Immobilisation et relevage', texte: 'Révision des techniques et du matériel, en équipe constituée.' },
      { titre: 'Mises en situation', texte: 'Cas concrets évalués, proches des conditions réelles de poste de secours.' },
    ],
    suites: ['Poursuivre vers le PSE2, équipier secouriste'],
    image: '/img/pse-immobilisation.jpg',
    wixEvent: 'FC PSE1 - Formation',
    seo: {
      title: 'Recyclage PSE1 à Nice | Formation continue',
      description:
        'Maintenez vos compétences PSE1 à Nice avec la formation continue annuelle, obligatoire pour rester opérationnel en poste de secours. Affilié FFSS.',
    },
  },

  {
    slug: 'fc-pse-2',
    sigle: 'FC PSE2',
    intitule: 'Formation continue PSE2',
    filiere: 'operationnelle',
    certifiante: false,
    estRecyclage: true,
    accroche:
      "Chef d'équipe, votre maintien de compétences est annuel. Une journée pour réviser les gestes et la conduite d'intervention.",
    resume: 'Le maintien annuel obligatoire des compétences d’équipier secouriste.',
    duree: '8 heures',
    prerequis: 'PSE2 obtenu',
    certification: 'Attestation FC',
    certificationNote: 'Annuelle et obligatoire',
    tarif: '70 €',
    dureeNote: '1 journée',
    tarifNote: '90 € en financement CPF',
    tarifCpf: '90 €',
    objectifs: [
      { titre: 'Conserver la qualification', texte: "Rester habilité à conduire une équipe sur les dispositifs de secours.", icone: 'equipe' },
      { titre: 'Réviser la conduite d’intervention', texte: 'Organisation de l’équipe, priorisation des gestes, transmission aux secours.', icone: 'bouclier' },
      { titre: 'Reprendre les techniques', texte: 'Immobilisation du rachis, relevages et brancardages en situation.', icone: 'urgence' },
    ],
    modules: [
      { titre: 'Retour d’expérience', texte: 'Analyse des interventions et de la coordination d’équipe.' },
      { titre: 'Conduite d’intervention', texte: 'Rôle de l’équipier secouriste, sécurité et prise de décision.' },
      { titre: 'Immobilisation et relevage', texte: 'Révision des techniques du rachis et des membres.' },
      { titre: 'Mises en situation complexes', texte: 'Plusieurs victimes, accès difficile, coordination inter-services.' },
    ],
    suites: ['Poursuivre vers la filière pédagogique (PAE FPS)'],
    image: '/img/equipe.jpg',
    wixEvent: 'FC PSE2 - Formation',
    seo: {
      title: 'Recyclage PSE2 à Nice | Formation continue',
      description:
        'Maintenez vos compétences d’équipier secouriste PSE2 à Nice. Formation continue annuelle obligatoire, affiliée FFSS et agréée sécurité civile et certifiée Qualiopi. Dates en ligne.',
    },
  },

  {
    slug: 'fc-bnssa',
    sigle: 'FC BNSSA',
    intitule: 'Recyclage BNSSA',
    filiere: 'aquatique',
    certifiante: false,
    estRecyclage: true,
    accroche:
      "Votre BNSSA se recycle tous les cinq ans. Sans ce recyclage, vous ne pouvez plus surveiller une baignade.",
    resume: 'Le maintien de la qualification de sauveteur aquatique.',
    duree: 'Nous consulter',
    prerequis: 'BNSSA obtenu',
    prerequisNote: 'PSE1 à jour requis',
    certification: 'BNSSA prolongé',
    certificationNote: 'Tous les 5 ans',
    tarif: 'Nous consulter',
    aValider: true,
    objectifs: [
      { titre: 'Prolonger le diplôme', texte: 'Conserver le droit de surveiller les baignades et les plans d’eau.', icone: 'eau' },
      { titre: 'Réviser le sauvetage', texte: 'Approche, dégagement et remorquage d’une victime en milieu aquatique.', icone: 'eau' },
      { titre: 'Reprendre les secours', texte: 'Gestes de secours appliqués au contexte aquatique.', icone: 'coeur' },
    ],
    modules: [
      { titre: 'Épreuves de nage', texte: 'Vérification de l’aisance aquatique et de la condition physique.' },
      { titre: 'Sauvetage avec matériel', texte: 'Parcours de sauvetage et utilisation du matériel réglementaire.' },
      { titre: 'Secourisme appliqué', texte: 'Prise en charge d’une victime sortie de l’eau.' },
      { titre: 'Réglementation', texte: 'Évolutions du cadre légal de la surveillance des baignades.' },
    ],
    suites: ['Le BSB pour encadrer en accueil collectif de mineurs'],
    image: '/img/sauvetage-bassin.jpg',
    suspendue: { raison: "Le recyclage BNSSA n'est pas proposé actuellement. Contactez-nous pour connaître les prochaines sessions." },
    wixEvent: 'FC BNSSA - Recyclage',
    seo: {
      title: 'Recyclage BNSSA à Nice | Formation continue',
      description:
        'Recyclez votre BNSSA à Nice pour rester opérationnel. Formation continue obligatoire, affiliée FFSS et agréée sécurité civile et certifiée Qualiopi. Consultez les dates.',
    },
  },

  // ==========================================================================
  //  FILIÈRE AQUATIQUE — surveillance des baignades
  // ==========================================================================
  {
    slug: 'bsb',
    sigle: 'BSB',
    intitule: 'Brevet de Surveillant de Baignade',
    filiere: 'aquatique',
    certifiante: true,
    accroche:
      "Encadrer la baignade en accueil collectif de mineurs : colonies, centres de loisirs, camps. Le BSB est le diplôme qui vous en donne le droit.",
    resume: 'Le diplôme pour surveiller les baignades en accueil collectif de mineurs.',
    duree: '35 heures',
    dureeNote: '5 journées',
    prerequis: 'Dès 17 ans',
    certification: 'BSB',
    certificationNote: 'Recyclage FC BSB requis',
    tarif: '290 €',
    objectifs: [
      { titre: 'Surveiller un lieu de baignade', texte: "Organiser la baignade, positionner les surveillants et prévenir les accidents.", icone: 'eau' },
      { titre: 'Intervenir dans l’eau', texte: 'Aborder, dégager et remorquer une victime en milieu aquatique.', icone: 'eau' },
      { titre: 'Prendre en charge la victime', texte: "Sortie de l'eau, bilan et gestes de secours jusqu'à l'arrivée des renforts.", icone: 'coeur' },
    ],
    modules: [
      { titre: 'Cadre réglementaire', texte: 'Responsabilités du surveillant de baignade en accueil collectif de mineurs.' },
      { titre: 'Épreuves de nage', texte: 'Préparation physique et technique aux exigences du diplôme.' },
      { titre: 'Sauvetage aquatique', texte: 'Approche, dégagement de prises et remorquage.' },
      { titre: 'Secourisme appliqué', texte: "Gestes de secours adaptés au contexte de la baignade." },
      { titre: 'Organisation de la baignade', texte: 'Mise en place du dispositif, surveillance active et gestion du groupe.' },
    ],
    suites: ['Formation continue FC BSB pour maintenir le diplôme'],
    recyclage: 'fc-bsb',
    image: '/img/sauvetage-bassin.jpg',
    wixEvent: 'BSB',
    seo: {
      title: 'Formation BSB à Nice | Surveillant de baignade',
      description:
        'Obtenez le BSB à Nice pour surveiller les baignades en accueil de loisirs et colonies : 35 h, 290 €. Organisme certifié Qualiopi, affilié FFSS et agréé sécurité civile.',
    },
  },

  {
    slug: 'fc-bsb',
    sigle: 'FC BSB',
    intitule: 'Formation continue Surveillant de Baignade',
    filiere: 'aquatique',
    certifiante: false,
    estRecyclage: true,
    accroche:
      "Maintenez votre BSB pour continuer à encadrer les baignades. Une remise en condition, dans l'eau comme sur les gestes de secours.",
    resume: 'Le maintien du brevet de surveillant de baignade.',
    duree: '10 heures',
    prerequis: 'BSB obtenu',
    certification: 'BSB prolongé',
    tarif: '240 €',
    objectifs: [
      { titre: 'Conserver le diplôme', texte: 'Rester habilité à surveiller les baignades en accueil collectif de mineurs.', icone: 'eau' },
      { titre: 'Réviser le sauvetage', texte: 'Reprise des techniques d’approche, de dégagement et de remorquage.', icone: 'eau' },
      { titre: 'Actualiser les secours', texte: 'Évolutions des recommandations de premiers secours.', icone: 'coeur' },
    ],
    modules: [
      { titre: 'Remise en condition', texte: 'Vérification de l’aisance aquatique et de la condition physique.' },
      { titre: 'Sauvetage aquatique', texte: 'Reprise pratique des techniques de sauvetage.' },
      { titre: 'Secourisme', texte: 'Révision des gestes d’urgence appliqués à la baignade.' },
      { titre: 'Réglementation', texte: 'Ce qui a changé depuis votre dernière formation.' },
    ],
    suites: [],
    image: '/img/filiere-aquatique.jpg',
    wixEvent: 'FC BSB',
    seo: {
      title: 'Recyclage BSB à Nice | Formation continue',
      description:
        'Maintenez votre brevet de surveillant de baignade à Nice : 10 h, 240 €. Formation continue affiliée FFSS et agréée sécurité civile, organisme certifié Qualiopi.',
    },
  },

  // ==========================================================================
  //  FILIÈRE PÉDAGOGIQUE — devenir formateur
  // ==========================================================================
  {
    slug: 'pae-f-psc',
    sigle: 'PAE FPSC',
    intitule: 'Pédagogie Appliquée à l’Emploi de Formateur PSC',
    filiere: 'pedagogique',
    certifiante: true,
    accroche:
      "Transmettre à votre tour. Le PAE FPSC vous donne le droit d'enseigner le PSC — la formation qui touche le plus large public.",
    resume: 'Le monitorat pour enseigner le PSC, avec le tronc commun pédagogique.',
    duree: '50 heures',
    dureeNote: 'PIC F inclus',
    prerequis: 'PSC à jour',
    certification: 'PAE FPSC',
    certificationNote: 'Formation continue annuelle',
    tarif: '1 000 €',
    tarifNote: 'Tronc commun pédagogique (PIC F) inclus',
    objectifs: [
      { titre: 'Concevoir une séquence', texte: 'Bâtir une progression pédagogique adaptée au public et aux objectifs.', icone: 'pedagogie' },
      { titre: 'Animer une formation', texte: 'Conduire un groupe, gérer le temps et maintenir l’attention.', icone: 'equipe' },
      { titre: 'Évaluer les acquis', texte: 'Mettre en œuvre l’évaluation formative propre au référentiel PSC.', icone: 'bouclier' },
    ],
    modules: [
      { titre: 'PIC F — tronc commun', texte: 'Bases de la pédagogie appliquée à l’enseignement du secourisme.' },
      { titre: 'Techniques d’animation', texte: 'Exposé, démonstration, apprentissage du geste, cas concret.' },
      { titre: 'Le référentiel PSC', texte: 'Contenus, progression et exigences du référentiel national.' },
      { titre: 'Conduite de séquence', texte: 'Mises en situation d’animation, observées et débriefées.' },
      { titre: 'Évaluation', texte: 'Évaluation formative et certificative des stagiaires.' },
    ],
    suites: ['Formation continue FC PAE FPSC', 'Poursuivre vers le PAE FPS pour enseigner le PSE'],
    recyclage: 'fc-pae-f-psc',
    image: '/img/formateur-psc.jpg',
    wixEvent: 'PAE F PSC',
    seo: {
      title: 'PAE FPSC à Nice | Devenir formateur PSC',
      description:
        'Devenez formateur en premiers secours avec le PAE FPSC à Nice : 50 h, PIC F inclus, 1 000 €. Organisme certifié Qualiopi, affilié FFSS et agréé sécurité civile.',
    },
  },

  {
    slug: 'fc-pae-f-psc',
    sigle: 'FC PAE FPSC',
    intitule: 'Formation continue Formateur PSC',
    filiere: 'pedagogique',
    certifiante: false,
    estRecyclage: true,
    accroche:
      "Une demi-journée pour rester formateur : évolutions du référentiel, échanges de pratiques et retours d'expérience.",
    resume: 'Le maintien annuel des compétences de formateur PSC.',
    duree: '7,5 heures',
    prerequis: 'PAE FPSC obtenu',
    certification: 'Attestation FC',
    certificationNote: 'Annuelle',
    tarif: '90 €',
    tarifNote: '150 € en financement CPF',
    tarifCpf: '150 €',
    objectifs: [
      { titre: 'Rester habilité', texte: 'Conserver le droit d’enseigner le PSC.', icone: 'pedagogie' },
      { titre: 'Intégrer les évolutions', texte: 'Nouveautés du référentiel national et des recommandations.', icone: 'bouclier' },
      { titre: 'Échanger les pratiques', texte: 'Retours d’expérience entre formateurs.', icone: 'equipe' },
    ],
    modules: [
      { titre: 'Évolutions du référentiel', texte: 'Ce qui a changé depuis la dernière session.' },
      { titre: 'Retours d’expérience', texte: 'Difficultés rencontrées en animation et solutions partagées.' },
      { titre: 'Ateliers pédagogiques', texte: 'Reprise de séquences d’animation.' },
    ],
    suites: [],
    image: '/img/formateur-psc.jpg',
    wixEvent: 'FC PAE F PSC',
    seo: {
      title: 'Recyclage formateur PSC à Nice | FC PAE FPSC',
      description:
        'Maintenez vos compétences de formateur PSC à Nice : 7,5 h, 90 €. Formation continue annuelle, organisme certifié Qualiopi.',
    },
  },

  {
    slug: 'pae-f-ps',
    sigle: 'PAE FPS',
    intitule: 'Pédagogie Appliquée à l’Emploi de Formateur Premiers Secours',
    filiere: 'pedagogique',
    certifiante: true,
    accroche:
      "Le monitorat le plus complet : enseigner le PSE1 et le PSE2, former les secouristes qui interviendront sur le terrain.",
    resume: 'Le monitorat pour enseigner le PSE1 et le PSE2.',
    duree: '70 heures',
    dureeNote: 'PIC F inclus',
    prerequis: 'PSE2 à jour',
    certification: 'PAE FPS',
    certificationNote: 'Formation continue annuelle',
    tarif: '1 000 €',
    tarifNote: 'Tronc commun pédagogique (PIC F) inclus',
    objectifs: [
      { titre: 'Former des secouristes', texte: 'Enseigner le PSE1 et le PSE2 selon le référentiel national.', icone: 'pedagogie' },
      { titre: 'Concevoir une formation', texte: 'Bâtir une progression sur plusieurs journées, théorie et pratique.', icone: 'bouclier' },
      { titre: 'Conduire des cas concrets', texte: 'Scénariser, animer et débriefer des mises en situation réalistes.', icone: 'equipe' },
    ],
    modules: [
      { titre: 'PIC F — tronc commun', texte: 'Bases de la pédagogie appliquée à l’enseignement du secourisme.' },
      { titre: 'Référentiels PSE1 et PSE2', texte: 'Contenus, progression et exigences des deux référentiels.' },
      { titre: 'Techniques d’animation', texte: 'Apprentissage du geste, ateliers, travail en équipe.' },
      { titre: 'Cas concrets', texte: 'Conception, maquillage, animation et débriefing.' },
      { titre: 'Évaluation', texte: 'Évaluation formative et certificative des équipiers secouristes.' },
      { titre: 'Mises en situation', texte: 'Séquences d’animation observées et évaluées.' },
    ],
    suites: ['Formation continue FC PAE FPS'],
    recyclage: 'fc-pae-f-ps',
    image: '/img/formateur-pse.jpg',
    wixEvent: 'PAE F PS',
    seo: {
      title: 'PAE FPS à Nice | Devenir formateur PSE1 et PSE2',
      description:
        'Devenez formateur en premiers secours en équipe avec le PAE FPS à Nice : 70 h, PIC F inclus, 1 000 €. Certifié Qualiopi, affilié FFSS et agréé sécurité civile.',
    },
  },

  {
    slug: 'fc-pae-f-ps',
    sigle: 'FC PAE FPS',
    intitule: 'Formation continue Formateur Premiers Secours',
    filiere: 'pedagogique',
    certifiante: false,
    estRecyclage: true,
    accroche:
      "Le maintien annuel de votre monitorat PSE : évolutions des référentiels et reprise des techniques d'animation.",
    resume: 'Le maintien annuel des compétences de formateur PSE.',
    duree: '7,5 heures',
    prerequis: 'PAE FPS obtenu',
    certification: 'Attestation FC',
    certificationNote: 'Annuelle',
    tarif: '90 €',
    tarifNote: '150 € en financement CPF',
    tarifCpf: '150 €',
    objectifs: [
      { titre: 'Rester habilité', texte: 'Conserver le droit d’enseigner le PSE1 et le PSE2.', icone: 'pedagogie' },
      { titre: 'Intégrer les évolutions', texte: 'Nouveautés des référentiels et des recommandations.', icone: 'bouclier' },
      { titre: 'Échanger les pratiques', texte: 'Retours d’expérience entre formateurs.', icone: 'equipe' },
    ],
    modules: [
      { titre: 'Évolutions des référentiels', texte: 'Ce qui a changé depuis la dernière session.' },
      { titre: 'Retours d’expérience', texte: 'Difficultés d’animation et solutions partagées.' },
      { titre: 'Ateliers pédagogiques', texte: 'Reprise de séquences et de cas concrets.' },
    ],
    suites: [],
    image: '/img/formateur-pse.jpg',
    wixEvent: 'FC PAE F PS',
    seo: {
      title: 'Recyclage formateur PSE à Nice | FC PAE FPS',
      description:
        'Maintenez vos compétences de formateur PSE1 et PSE2 à Nice : 7,5 h, 90 €. Formation continue annuelle, organisme certifié Qualiopi.',
    },
  },

  {
    slug: 'mac-sst',
    sigle: 'MAC SST',
    intitule: 'Maintien et Actualisation des Compétences SST',
    filiere: 'entreprise',
    certifiante: false,
    estRecyclage: true,
    accroche:
      "Obligatoire tous les 24 mois. Sans lui, votre certificat SST perd sa validité et vous ne comptez plus dans l'effectif de secouristes de l'entreprise.",
    resume: 'Le maintien obligatoire du certificat de Sauveteur Secouriste du Travail.',
    duree: '7 heures',
    dureeNote: '1 journée, tous les 24 mois',
    prerequis: 'SST obtenu',
    certification: 'SST prolongé',
    certificationNote: 'Valable 24 mois',
    tarif: '90 €',
    tarifNote: 'Intervention possible dans vos locaux',
    objectifs: [
      { titre: 'Conserver le certificat', texte: 'Rester compté dans l’effectif de sauveteurs secouristes de l’entreprise.', icone: 'bouclier' },
      { titre: 'Réviser les gestes', texte: 'Reprise pratique des gestes d’urgence en situation de travail.', icone: 'urgence' },
      { titre: 'Actualiser les connaissances', texte: 'Évolutions des recommandations de l’INRS.', icone: 'coeur' },
    ],
    modules: [
      { titre: 'Retour d’expérience', texte: 'Accidents survenus et conduites tenues depuis la dernière session.' },
      { titre: 'Protéger et examiner', texte: 'Révision de l’analyse de situation et de la recherche des détresses.' },
      { titre: 'Secourir', texte: 'Reprise des gestes : saignement, étouffement, malaise, brûlure, arrêt cardiaque.' },
      { titre: 'Prévention', texte: 'Contribution à la démarche de prévention de l’établissement.' },
    ],
    suites: [],
    image: '/img/sst.jpg',
    wixEvent: 'MAC SST',
    seo: {
      title: 'MAC SST à Nice | Recyclage Sauveteur Secouriste du Travail',
      description:
        'Maintenez le certificat SST de vos salariés à Nice : 7 h, 90 €, tous les 24 mois. Organisme certifié Qualiopi, intervention en entreprise.',
    },
  },
];

export const parSlug = (slug: string) => formations.find((f) => f.slug === slug);
export const parFiliere = (f: Filiere) => formations.filter((x) => x.filiere === f);
