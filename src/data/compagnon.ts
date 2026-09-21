/**
 * Le contenu du Compagnon : ses pictogrammes et ses écrans.
 *
 * Sorti du composant pour être partagé : sur téléphone, l'accueil du site
 * reprend le premier écran directement dans la page (AccueilCompagnon.astro)
 * au lieu d'ouvrir le Compagnon par-dessus. Une seule liste de choix, lue aux
 * deux endroits : la modifier ici les change partout.
 */

/*
 * Icônes au trait, dessinées sur la grille 24 et rendues par « currentColor » :
 * elles prennent donc le rouge secours sur l'écran d'urgence sans un octet de
 * CSS supplémentaire.
 */
export const ICONES: Record<string, string> = {
  croix: 'M12 6v12M6 12h12',
  bouclier: 'M12 3.2l7 2.8v5.4c0 4.2-2.9 7.3-7 9.4-4.1-2.1-7-5.2-7-9.4V6z',
  flamme: 'M12.6 2c.2 3-1.4 4.4-3 5.9-1.5 1.5-2.6 2.9-2.6 4.9a5 5 0 0 0 10 0c0-2.3-1.2-3.8-2.3-5.1-.3 1.1-.9 1.7-1.6 1.7-1 0-1.5-.9-1.2-2.2.4-1.6.7-3.4.7-5.2z',
  telephone: 'M6.8 3.5h2.9l1.4 3.8-2 1.5a12.6 12.6 0 0 0 6.1 6.1l1.5-2 3.8 1.4v2.9a1.9 1.9 0 0 1-2.1 1.9A16.6 16.6 0 0 1 4.9 5.6a1.9 1.9 0 0 1 1.9-2.1z',
  bulle: 'M4.5 5.5h15v10h-9l-6 4.5z',
  diplome: 'M3.2 9.2L12 5.3l8.8 3.9L12 13.1zM7.2 11.2v4.4c0 1.4 2.1 2.5 4.8 2.5s4.8-1.1 4.8-2.5v-4.4M20.8 9.2v5',
  equipe: 'M9 11.2a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2zM3.5 19.5c0-3 2.5-5.1 5.5-5.1s5.5 2.1 5.5 5.1M16.2 5.4a3.1 3.1 0 0 1 0 6M17.2 14.7c2 .5 3.3 2.2 3.3 4.4',
  trousse: 'M4 8.2h16v11.3H4zM8.8 8.2V5.4a1 1 0 0 1 1-1h4.4a1 1 0 0 1 1 1v2.8M12 11.6v4.6M9.7 13.9h4.6',
  coeur: 'M12 20.3S4.6 15.6 4.6 10.6a4.1 4.1 0 0 1 7.4-2.5 4.1 4.1 0 0 1 7.4 2.5c0 5-7.4 9.7-7.4 9.7z',
  alerte: 'M12 4.2l8.6 15.3H3.4zM12 10.2v4M12 17.4h.01',
  recyclage: 'M20.3 12a8.3 8.3 0 1 1-2.4-5.9M20.5 4v4.3h-4.3',
  liste: 'M5 7h14M5 12h14M5 17h9',
  comparer: 'M4.5 6.5h6M4.5 12h6M4.5 17.5h6M13.5 6.5h6M13.5 12h6M13.5 17.5h6',
  horloge: 'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM12 7.4V12l3 1.8',
  calendrier: 'M4.5 6.5h15v13h-15zM8.5 4v4M15.5 4v4M4.5 11h15',
  eau: 'M3 6c2-1.6 3.2-1.6 5.2 0s3.2 1.6 5.2 0 3.2-1.6 5.2 0M3 12c2-1.6 3.2-1.6 5.2 0s3.2 1.6 5.2 0 3.2-1.6 5.2 0M3 18c2-1.6 3.2-1.6 5.2 0s3.2 1.6 5.2 0 3.2-1.6 5.2 0',
  medaille: 'M12 13.6a4.6 4.6 0 1 0 0-9.2 4.6 4.6 0 0 0 0 9.2zM9.2 12.8L7.6 20.6l4.4-2.4 4.4 2.4-1.6-7.8',
  euro: 'M17.6 6.4a6.6 6.6 0 1 0 0 11.2M4.8 10h7.4M4.8 14h7.4',
  lieu: 'M12 21s6.5-6.2 6.5-10.6a6.5 6.5 0 1 0-13 0C5.5 14.8 12 21 12 21zM12 12.4a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6z',
  question: 'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM9.6 9.5a2.5 2.5 0 1 1 3.3 2.4c-.6.2-.9.8-.9 1.4v.4M12 16.8h.01',
};

/*
 * Une flamme au trait redevient une goutte à 19 px : ni la pointe ni la langue
 * intérieure ne survivent. Celle-ci est donc pleine, et elle seule.
 */
export const PLEINES = new Set(['flamme']);

export interface Action {
  texte: string;
  /** Clé du jeu d'icônes ci-dessus. */
  icone: string;
  /** Destination finale. */
  vers?: string;
  /** Écran suivant, pour les questions intermédiaires. */
  ecran?: string;
  note?: string;
}

export interface Ecran {
  id: string;
  pose: string;
  oeil: string;
  titre: string;
  message: string;
  actions: Action[];
}

export const ECRANS: Ecran[] = [
  {
    id: 'accueil',
    pose: 'wave',
    oeil: 'Je suis là pour vous orienter',
    titre: 'Bonjour !',
    message: 'Bienvenue chez Secourisme Pour Tous, l’association de secourisme et de sauvetage de la Côte d’Azur. En quoi puis-je vous aider\u202f?',
    actions: [
      { texte: 'Je veux apprendre les premiers secours', icone: 'diplome', ecran: 'formation' },
      { texte: 'Je viens recycler mon diplôme', icone: 'recyclage', ecran: 'recyclage' },
      { texte: 'Je cherche des secouristes pour mon événement', icone: 'trousse', ecran: 'dispositif' },
      { texte: 'Je veux devenir bénévole', icone: 'equipe', ecran: 'benevolat' },
      { texte: 'Je nage, je fais du sauvetage sportif', icone: 'medaille', ecran: 'sport' },
      { texte: 'Je veux soutenir l’association', icone: 'coeur', vers: '/faire-un-don' },
      { texte: 'J’ai besoin des secours maintenant', icone: 'alerte', ecran: 'urgence' },
    ],
  },

  /*
   * Le catalogue est rangé par filière sur le site, parce que c'est ainsi que
   * l'État le range. Personne n'arrive en cherchant « la filière
   * opérationnelle » : on cherche à savoir quoi faire chez soi, à satisfaire
   * son employeur, ou à passer le diplôme d'un métier. L'arbre part donc de
   * l'usage, et c'est lui qui désigne la formation.
   */
  {
    id: 'formation',
    pose: 'search',
    oeil: 'Première question',
    titre: 'Se former, pour quoi faire ?',
    message: 'Le bon diplôme dépend de ce que vous voulez en faire. Dites-moi ce qui vous amène.',
    actions: [
      { texte: 'Pour savoir réagir dans ma vie de tous les jours', icone: 'coeur', ecran: 'perso' },
      { texte: 'Parce que mon travail le demande', icone: 'trousse', ecran: 'pro' },
      { texte: 'Pour intervenir en équipe sur le terrain', icone: 'equipe', ecran: 'terrain' },
      { texte: 'Pour surveiller une piscine ou une plage', icone: 'eau', ecran: 'aquatique' },
      { texte: 'Pour enseigner les premiers secours', icone: 'diplome', ecran: 'pedagogique' },
      { texte: 'Je préfère parcourir les 16 formations', icone: 'liste', vers: '/formations' },
    ],
  },
  {
    id: 'perso',
    pose: 'think',
    oeil: 'Pour soi, pour ses proches',
    titre: 'Savoir quoi faire, chez soi',
    message: 'Avant l’arrivée des secours, ce sont les gestes des personnes présentes qui comptent. Voici par où commencer.',
    actions: [
      { texte: 'Découvrir les gestes qui sauvent', icone: 'croix', vers: '/gestes-qui-sauvent', note: 'Sans diplôme, pour commencer' },
      { texte: 'Passer le PSC1', icone: 'diplome', vers: '/formations/psc', note: 'Le diplôme de base · 7 heures · 50 €' },
      { texte: 'Les gestes pour un bébé ou un enfant', icone: 'coeur', vers: '/premiers-secours-bebe-enfant' },
      { texte: 'PSC1 ou PSE1, lequel me faut-il ?', icone: 'comparer', vers: '/psc-ou-pse1' },
      { texte: 'Tester mes connaissances', icone: 'question', vers: '/gestes-qui-sauvent/quiz' },
    ],
  },
  {
    id: 'pro',
    pose: 'idle',
    oeil: 'Pour le travail',
    titre: 'Ce que votre employeur attend',
    /*
     * Formulation calée sur l'article R4224-15 du code du travail, qui vise
     * les ateliers où s'accomplissent des travaux dangereux et les chantiers
     * d'au moins vingt personnes — pas « les entreprises » en général.
     */
    message: 'Ateliers de travaux dangereux, chantiers de vingt personnes et plus : le code du travail y impose un secouriste formé. Ailleurs, c’est le métier qui décide — enseignement, petite enfance, sport, sécurité, transport.',
    actions: [
      { texte: 'Devenir sauveteur secouriste du travail', icone: 'trousse', vers: '/formations/sst', note: 'SST · 14 heures · 190 €' },
      { texte: 'Maintenir mon SST à jour', icone: 'recyclage', vers: '/formations/mac-sst', note: 'MAC SST · 7 heures · 90 €' },
      { texte: 'Mon métier exige-t-il le PSC1 ?', icone: 'question', vers: '/metiers/psc', note: 'Professeur des écoles, assistant maternel, BAFA, taxi, VTC, sécurité privée, sapeur-pompier volontaire, éducateur sportif' },
      { texte: 'Passer le PSC1', icone: 'diplome', vers: '/formations/psc', note: '7 heures · 50 €' },
      { texte: 'Je vais surveiller une piscine ou une plage', icone: 'eau', ecran: 'aquatique', note: 'Le SSA y est exigé' },
      { texte: 'Qui peut financer ma formation ?', icone: 'euro', vers: '/financement' },
      { texte: 'Former toute mon équipe', icone: 'equipe', vers: '/contact' },
    ],
  },
  {
    id: 'terrain',
    pose: 'success',
    oeil: 'Secouriste en équipe',
    titre: 'Tenir un poste de secours',
    message: 'Les PSE sont les diplômes qui autorisent à intervenir en équipe, sur un dispositif.',
    actions: [
      { texte: 'PSE1 — entrer dans l’équipe', icone: 'equipe', vers: '/formations/pse-1', note: '35 heures · 280 €' },
      { texte: 'PSE2 — conduire l’intervention', icone: 'equipe', vers: '/formations/pse-2', note: '28 heures · 280 €' },
      { texte: 'À quoi ressemble le métier', icone: 'question', vers: '/metiers/pse-1' },
      { texte: 'Intervenir avec nous comme bénévole', icone: 'coeur', vers: '/secouriste-actif' },
      { texte: 'Qui peut financer ma formation ?', icone: 'euro', vers: '/financement' },
    ],
  },
  {
    id: 'aquatique',
    pose: 'idle',
    oeil: 'Surveillance des baignades',
    titre: 'Piscines, plages et plans d’eau',
    message: 'Deux diplômes selon le lieu que vous surveillerez, et la saison où vous travaillerez.',
    actions: [
      { texte: 'SSA — surveiller une piscine ou une plage', icone: 'eau', vers: '/formations/ssa', note: 'Ex-BNSSA · 35 heures · 900 €' },
      { texte: 'BSB — surveiller une colonie, un centre aéré', icone: 'eau', vers: '/formations/bsb', note: '35 heures · 290 €' },
      { texte: 'J’ai déjà le BNSSA', icone: 'question', ecran: 'bnssa' },
      { texte: 'Recycler mon BSB', icone: 'recyclage', vers: '/formations/fc-bsb' },
    ],
  },
  {
    id: 'pedagogique',
    pose: 'think',
    oeil: 'Devenir formateur',
    titre: 'Transmettre à votre tour',
    message: 'Les PAE forment celles et ceux qui formeront les secouristes.',
    actions: [
      { texte: 'Enseigner le PSC1', icone: 'diplome', vers: '/formations/pae-f-psc', note: 'PAE F PSC · 50 heures · 1 000 €' },
      { texte: 'Enseigner le PSE1 et le PSE2', icone: 'diplome', vers: '/formations/pae-f-ps', note: 'PAE F PS · 70 heures · 1 000 €' },
      { texte: 'Le parcours complet, étape par étape', icone: 'question', vers: '/devenir-formateur' },
      { texte: 'Recycler mon PAE', icone: 'recyclage', ecran: 'recyclage' },
    ],
  },

  /*
   * Le recyclage est la moitié de nos inscriptions : on arrive en sachant
   * déjà quel diplôme on détient, jamais en sachant qu'il faut chercher
   * « FC PAE F PS ». L'écran demande donc le diplôme, pas le sigle.
   */
  {
    id: 'recyclage',
    pose: 'search',
    oeil: 'Formation continue',
    titre: 'Quel diplôme avez-vous ?',
    message: 'Je vous emmène directement sur la bonne session de recyclage.',
    actions: [
      { texte: 'Mon diplôme est-il encore valable ?', icone: 'horloge', vers: '/validite-recyclage' },
      { texte: 'J’ai un PSC1', icone: 'recyclage', vers: '/formations/fc-psc', note: '4 heures · 30 €' },
      { texte: 'J’ai un PSE1', icone: 'recyclage', vers: '/formations/fc-pse-1', note: '7 heures · 70 € · chaque année' },
      { texte: 'J’ai un PSE2', icone: 'recyclage', vers: '/formations/fc-pse-2', note: '8 heures · 70 € · chaque année' },
      { texte: 'J’ai un SST', icone: 'recyclage', vers: '/formations/mac-sst', note: 'MAC SST · 7 heures · 90 €' },
      { texte: 'J’ai un BSB', icone: 'recyclage', vers: '/formations/fc-bsb', note: '10 heures · 240 €' },
      { texte: 'J’ai un BNSSA', icone: 'question', ecran: 'bnssa', note: 'Le BNSSA devient le SSA' },
      { texte: 'J’ai un SSA', icone: 'recyclage', vers: '/formations/fc-bnssa', note: 'Programme à venir' },
      { texte: 'Je suis formateur PSC', icone: 'recyclage', vers: '/formations/fc-pae-f-psc', note: '7,5 heures · 90 €' },
      { texte: 'Je suis formateur PSE', icone: 'recyclage', vers: '/formations/fc-pae-f-ps', note: '7,5 heures · 90 €' },
      { texte: 'Nos carrefours des pratiques', icone: 'equipe', vers: '/secouriste-actif', note: 'Pour continuer à pratiquer entre deux recyclages' },
    ],
  },

  /*
   * Le passage du BNSSA au SSA. L'arrêté du 29 juillet 2026 fait dépendre
   * l'équivalence d'un seul critère — PSE1 ou PSE2 — et c'est la question que
   * personne ne pense à se poser. Les quatre entrées mènent donc à deux
   * réponses : le maître nageur avec un PSE1 est dans le même cas que le
   * nageur sauveteur avec un PSE1.
   */
  {
    id: 'bnssa',
    pose: 'think',
    oeil: 'Le BNSSA devient le SSA',
    titre: 'Où en êtes-vous en secourisme ?',
    message: 'L’équivalence se joue sur un seul point, le PSE2. Dites-moi ce que vous avez déjà.',
    actions: [
      { texte: 'J’ai le BNSSA et le PSE1', icone: 'diplome', ecran: 'bnssa-pse1' },
      { texte: 'J’ai le BNSSA et le PSE2', icone: 'diplome', ecran: 'bnssa-pse2' },
      { texte: 'Je suis MNS avec le PSE1', icone: 'eau', ecran: 'bnssa-pse1' },
      { texte: 'Je suis MNS avec le PSE2', icone: 'eau', ecran: 'bnssa-pse2' },
      { texte: 'Ce que dit l’arrêté', icone: 'question', vers: '/bnssa-devient-ssa' },
    ],
  },
  {
    id: 'bnssa-pse1',
    pose: 'search',
    oeil: 'Une marche à monter',
    titre: 'Le PSE2 d’abord',
    message: 'Le PSE1 ouvrait le BNSSA. Il ne suffit plus : l’équivalence demande le PSE2, puis une formation continue d’adaptation, à suivre avant le 1er octobre 2029.',
    actions: [
      { texte: 'Passer le PSE2', icone: 'equipe', vers: '/formations/pse-2', note: '28 heures · 280 €' },
      { texte: 'Ce que dit l’arrêté', icone: 'question', vers: '/bnssa-devient-ssa' },
      { texte: 'Nous écrire pour la FCA', icone: 'bulle', vers: '/contact', note: 'À valider avant le 1er octobre 2029' },
    ],
  },
  {
    id: 'bnssa-pse2',
    pose: 'success',
    oeil: 'Vous avez le niveau',
    titre: 'Une adaptation, et c’est tout',
    message: 'Le PSE2 est la condition de l’équivalence, et vous l’avez. Reste la formation continue d’adaptation, à suivre avant le 1er octobre 2029.',
    actions: [
      { texte: 'Nous écrire pour la FCA', icone: 'bulle', vers: '/contact', note: 'À valider avant le 1er octobre 2029' },
      { texte: 'Ce que dit l’arrêté', icone: 'question', vers: '/bnssa-devient-ssa' },
      { texte: 'Garder mon PSE2 à jour', icone: 'recyclage', vers: '/formations/fc-pse-2', note: 'Chaque année · 8 heures · 70 €' },
    ],
  },

  /* --- les autres portes d'entrée --- */
  {
    id: 'sport',
    pose: 'success',
    oeil: 'Sauvetage sportif',
    titre: 'Le secours devient un sport',
    message: 'Courir, nager, ramener une victime : la compétition entretient les gestes.',
    actions: [
      { texte: 'Découvrir le sauvetage sportif', icone: 'medaille', vers: '/sauvetage-sportif' },
      { texte: 'Inscrire mon enfant à l’école de natation', icone: 'eau', vers: '/ecole-de-natation' },
      { texte: 'Nous écrire', icone: 'bulle', vers: '/contact' },
    ],
  },
  {
    id: 'benevolat',
    pose: 'success',
    oeil: 'Rejoindre l’équipe',
    titre: 'Nous rejoindre comme bénévole',
    message: 'Deux façons de vous engager : tenir des postes de secours avec nos équipes, ou former à votre tour. Aucun diplôme ? On vous dit par où commencer.',
    actions: [
      { texte: 'Devenir secouriste actif', icone: 'trousse', vers: '/secouriste-actif' },
      { texte: 'Devenir formateur', icone: 'diplome', vers: '/devenir-formateur' },
      { texte: 'Je n’ai aucun diplôme, par où commencer ?', icone: 'question', ecran: 'terrain' },
      { texte: 'Qui sommes-nous', icone: 'equipe', vers: '/qui-sommes-nous' },
    ],
  },
  {
    id: 'dispositif',
    pose: 'idle',
    oeil: 'Sécuriser votre événement',
    titre: 'Un dispositif prévisionnel de secours',
    message: 'Le nombre de secouristes découle de votre affluence et de vos risques : nous le calculons avec vous.',
    actions: [
      { texte: 'Comment se prépare un poste de secours', icone: 'trousse', vers: '/postes-de-secours' },
      { texte: 'Nos agréments', icone: 'diplome', vers: '/nos-agrements' },
      { texte: 'Demander un devis', icone: 'bulle', vers: '/contact' },
    ],
  },
  {
    id: 'urgence',
    pose: 'idle',
    oeil: 'Appelez, ne cherchez pas',
    titre: 'Une personne est en danger ?',
    message: 'Ce compagnon ne donne aucun conseil médical et ne remplace pas les secours. Appelez immédiatement.',
    actions: [
      { texte: '15', icone: 'croix', vers: 'tel:15', note: 'SAMU — urgence médicale' },
      { texte: '17', icone: 'bouclier', vers: 'tel:17', note: 'Police secours' },
      { texte: '18', icone: 'flamme', vers: 'tel:18', note: 'Pompiers' },
      { texte: '112', icone: 'telephone', vers: 'tel:112', note: 'Numéro d’urgence européen' },
      { texte: '114', icone: 'bulle', vers: 'sms:114', note: 'Par SMS · sourds et malentendants' },
    ],
  },
];
