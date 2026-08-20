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
  aValider?: boolean;

  objectifs: Objectif[];
  modules: Module[];
  suites: string[];

  /** Photo de fond du hero. Sans elle, le hero retombe sur son dégradé. */
  image?: string;

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
    image: '/img/filiere-operationnelle.jpg',
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
    // TODO photo à fournir : formation SST en salle ou en entreprise.
  },
};

export const formations: Formation[] = [
  {
    slug: 'psc',
    sigle: 'PSC',
    intitule: 'Citoyen Sauveteur',
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
    image: '/img/filiere-operationnelle.jpg',
    wixEvent: 'PSC',
    recyclage: 'fc-psc',
    seo: {
      title: 'Formation PSC à Nice | Secourisme Pour Tous',
      description:
        'Apprenez les gestes qui sauvent avec le PSC à Nice : 7 h en 1 journée, dès 10 ans, sans prérequis, 50 €. Organisme certifié Qualiopi, agréé FFSS.',
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
    resume: "Devenez secouriste équipier et intervenez sur les dispositifs de secours.",
    duree: '35 heures',
    dureeNote: 'À confirmer',
    prerequis: 'Dès 16 ans',
    prerequisNote: 'À confirmer',
    certification: 'PSE1',
    certificationNote: 'Certificat de compétences',
    tarif: 'Nous consulter',
    aValider: true,
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
      { titre: 'La chaîne de secours', texte: "Organisation des secours en France et place du secouriste équipier." },
      { titre: 'Bilans et surveillance', texte: 'Réaliser un bilan circonstanciel, vital et complémentaire, puis surveiller la victime.' },
      { titre: 'Détresses vitales', texte: 'Reconnaître et prendre en charge les détresses respiratoires, circulatoires et neurologiques.' },
      { titre: 'Réanimation et oxygénothérapie', texte: 'RCP à plusieurs équipiers, insufflateur manuel et administration d’oxygène.' },
      { titre: 'Traumatismes', texte: 'Immobilisation, relevage et brancardage adaptés au traumatisme constaté.' },
      { titre: 'Situations particulières', texte: 'Accouchement inopiné, affections spécifiques et conduites à tenir associées.' },
    ],
    suites: ['Poursuivre vers le PSE2, chef d’équipe', 'Rejoindre nos équipes de postes de secours'],
    image: '/img/equipe.jpg',
    wixEvent: 'PSE1 - Formation',
    recyclage: 'fc-pse-1',
    seo: {
      title: 'Formation PSE1 à Nice | Secourisme Pour Tous',
      description:
        'Devenez secouriste équipier avec le PSE1 à Nice. Formation agréée FFSS pour intervenir en équipe sur les postes de secours. Organisme Qualiopi.',
    },
  },

  {
    slug: 'pse-2',
    sigle: 'PSE2',
    intitule: 'Premiers Secours en Équipe niveau 2',
    filiere: 'operationnelle',
    certifiante: true,
    accroche:
      "Prenez la responsabilité d'une équipe. Le PSE2 vous forme à conduire l'intervention et à coordonner les secouristes sur le terrain.",
    resume: 'Devenez chef d’équipe secouriste, accessible après le PSE1.',
    duree: '28 heures',
    dureeNote: 'À confirmer',
    prerequis: 'PSE1 à jour',
    certification: 'PSE2',
    certificationNote: 'Certificat de compétences',
    tarif: 'Nous consulter',
    aValider: true,
    objectifs: [
      { titre: 'Conduire une intervention', texte: "Organiser l'action de l'équipe et décider des gestes prioritaires.", icone: 'equipe' },
      { titre: 'Immobiliser et relever', texte: 'Mettre en œuvre les techniques d’immobilisation du rachis et des membres.', icone: 'urgence' },
      { titre: 'Assister les équipes médicales', texte: "Préparer le matériel et assister l'équipe médicale sur intervention.", icone: 'coeur' },
    ],
    modules: [
      { titre: 'Rôle du chef d’équipe', texte: "Coordination, sécurité de l'équipe et transmission des informations." },
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
        'Passez chef d’équipe avec le PSE2 à Nice, accessible après le PSE1. Formation agréée FFSS, organisme certifié Qualiopi. Dates et inscription en ligne.',
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
    wixEvent: 'BNSSA',
    recyclage: 'fc-bnssa',
    seo: {
      title: 'Formation BNSSA à Nice | Secourisme Pour Tous',
      description:
        'Préparez le BNSSA à Nice et devenez sauveteur aquatique : entraînement, épreuves et secourisme. Agréé FFSS, certifié Qualiopi. Dates et tarifs.',
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
    tarif: 'Devis sur mesure',
    tarifNote: 'Intervention en entreprise',
    aValider: true,
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
    image: '/img/secours-mer.jpg',
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
    intitule: 'Formation continue Citoyen Sauveteur',
    filiere: 'citoyenne',
    certifiante: false,
    estRecyclage: true,
    accroche:
      "Les gestes évoluent, les recommandations aussi. Une demi-journée pour remettre à jour vos réflexes et repartir confiant.",
    resume: 'Remise à niveau des gestes de premiers secours pour les titulaires du PSC.',
    duree: 'Nous consulter',
    prerequis: 'PSC obtenu',
    certification: 'Attestation FC',
    certificationNote: 'Recyclage conseillé tous les 3 ans',
    tarif: 'Nous consulter',
    aValider: true,
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
      title: 'Recyclage PSC à Nice | Formation continue',
      description:
        'Remettez à jour vos gestes de premiers secours avec la formation continue PSC à Nice. Organisme certifié Qualiopi, agréé FFSS. Dates et inscription.',
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
    resume: 'Le maintien annuel obligatoire des compétences de secouriste équipier.',
    duree: 'Nous consulter',
    prerequis: 'PSE1 obtenu',
    certification: 'Attestation FC',
    certificationNote: 'Annuelle et obligatoire',
    tarif: 'Nous consulter',
    aValider: true,
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
    suites: ['Poursuivre vers le PSE2, chef d’équipe'],
    image: '/img/pse-immobilisation.jpg',
    wixEvent: 'FC PSE1 - Formation',
    seo: {
      title: 'Recyclage PSE1 à Nice | Formation continue',
      description:
        'Maintenez vos compétences PSE1 à Nice avec la formation continue annuelle, obligatoire pour rester opérationnel en poste de secours. Agréé FFSS.',
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
    resume: 'Le maintien annuel obligatoire des compétences de chef d’équipe secouriste.',
    duree: 'Nous consulter',
    prerequis: 'PSE2 obtenu',
    certification: 'Attestation FC',
    certificationNote: 'Annuelle et obligatoire',
    tarif: 'Nous consulter',
    aValider: true,
    objectifs: [
      { titre: 'Conserver la qualification', texte: "Rester habilité à conduire une équipe sur les dispositifs de secours.", icone: 'equipe' },
      { titre: 'Réviser la conduite d’intervention', texte: 'Organisation de l’équipe, priorisation des gestes, transmission aux secours.', icone: 'bouclier' },
      { titre: 'Reprendre les techniques', texte: 'Immobilisation du rachis, relevages et brancardages en situation.', icone: 'urgence' },
    ],
    modules: [
      { titre: 'Retour d’expérience', texte: 'Analyse des interventions et de la coordination d’équipe.' },
      { titre: 'Conduite d’intervention', texte: 'Rôle du chef d’équipe, sécurité et prise de décision.' },
      { titre: 'Immobilisation et relevage', texte: 'Révision des techniques du rachis et des membres.' },
      { titre: 'Mises en situation complexes', texte: 'Plusieurs victimes, accès difficile, coordination inter-services.' },
    ],
    suites: ['Poursuivre vers la filière pédagogique (PAE FPS)'],
    image: '/img/equipe.jpg',
    wixEvent: 'FC PSE2 - Formation',
    seo: {
      title: 'Recyclage PSE2 à Nice | Formation continue',
      description:
        'Maintenez vos compétences de chef d’équipe PSE2 à Nice. Formation continue annuelle obligatoire, agréée FFSS et certifiée Qualiopi. Dates en ligne.',
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
    wixEvent: 'FC BNSSA - Recyclage',
    seo: {
      title: 'Recyclage BNSSA à Nice | Formation continue',
      description:
        'Recyclez votre BNSSA à Nice pour rester opérationnel. Formation continue obligatoire, agréée FFSS et certifiée Qualiopi. Consultez les dates.',
    },
  },
];

export const parSlug = (slug: string) => formations.find((f) => f.slug === slug);
export const parFiliere = (f: Filiere) => formations.filter((x) => x.filiere === f);
