/**
 * Questionnaire de connaissance — niveau PSC.
 *
 * SOURCE : « Recommandations relatives à l'unité d'enseignement Prévention et
 * Secours Civiques de niveau 1 », édition 2024. Chaque question renvoie à la
 * fiche dont elle est tirée, et l'explication reprend ce qu'elle dit.
 *
 * ⚠️ CE QUE CE QUIZ N'EST PAS.
 *
 * Ce n'est pas une évaluation : le PSC ne s'obtient pas par un questionnaire,
 * mais par la validation de gestes en situation. Quelqu'un qui répond juste
 * partout ne sait pas pour autant masser, et il doit le lire noir sur blanc à
 * la fin — sinon le quiz produit exactement l'inverse de ce qu'on veut : la
 * confiance sans la compétence.
 *
 * Les questions portent donc sur des DÉCISIONS (que fait-on, dans quel ordre),
 * jamais sur des gestes techniques qu'un texte ne peut pas enseigner.
 *
 * Les mauvaises réponses ne sont pas absurdes : ce sont les erreurs réellement
 * commises. Une distracteur ridicule ne fait rien apprendre.
 */

export interface Question {
  /** Ce que la question évalue, affiché comme thème. */
  theme: string;
  question: string;
  /** L'ordre est fixe : il est mélangé à l'affichage. */
  reponses: { texte: string; juste?: boolean }[];
  /** Pourquoi cette réponse, en une ou deux phrases. */
  explication: string;
  /** Situation vers laquelle renvoyer pour aller plus loin. */
  situation?: string;
  fiche: string;
}

export const questions: Question[] = [
  {
    theme: 'Alerte',
    question: 'Vous êtes témoin d’un malaise dans la rue. Quel numéro composez-vous en priorité ?',
    reponses: [
      { texte: 'Le 15, le SAMU', juste: true },
      { texte: 'Le 17, la police' },
      { texte: 'Le numéro d’un proche de la victime' },
      { texte: 'Le standard de l’hôpital le plus proche' },
    ],
    explication:
      'Le 15 met en relation avec un médecin régulateur, qui décide des moyens à envoyer et vous guide au téléphone. Depuis un portable, le 112 aboutit au même endroit.',
    situation: 'malaise',
    fiche: '01AC04 — Alerte',
  },
  {
    theme: 'Étouffement',
    question: 'Une personne s’étouffe mais tousse fortement. Que faites-vous ?',
    reponses: [
      { texte: 'Vous l’encouragez à tousser et vous la surveillez', juste: true },
      { texte: 'Vous donnez cinq claques dans le dos' },
      { texte: 'Vous réalisez des compressions abdominales' },
      { texte: 'Vous lui faites boire un verre d’eau' },
    ],
    explication:
      'Tant que la personne tousse, l’obstruction est partielle et la toux est plus efficace que n’importe quel geste. Intervenir risquerait d’enfoncer le corps étranger.',
    situation: 'etouffement',
    fiche: '02PR01 — Obstruction des voies aériennes',
  },
  {
    theme: 'Étouffement du nourrisson',
    question: 'Un bébé de six mois s’étouffe et ne peut plus émettre de son. Après les claques dans le dos, où comprimez-vous ?',
    reponses: [
      { texte: 'Sur la poitrine', juste: true },
      { texte: 'Sur le ventre, comme pour un adulte' },
      { texte: 'Sur le dos, entre les omoplates' },
      { texte: 'On ne comprime jamais un nourrisson' },
    ],
    explication:
      'Chez le nourrisson, les compressions se font au niveau thoracique. Les compressions abdominales sont proscrites à cet âge : elles peuvent provoquer des lésions internes graves.',
    situation: 'etouffement-nourrisson',
    fiche: '02FT04 — Désobstruction chez le nourrisson',
  },
  {
    theme: 'Hémorragie',
    question: 'Une plaie à la jambe saigne abondamment. Quel est votre premier geste ?',
    reponses: [
      { texte: 'Comprimer directement l’endroit qui saigne', juste: true },
      { texte: 'Poser un garrot au-dessus de la plaie' },
      { texte: 'Nettoyer la plaie avant tout' },
      { texte: 'Surélever la jambe et attendre les secours' },
    ],
    explication:
      'C’est la compression qui arrête l’hémorragie, pas le pansement. Le garrot ne vient qu’en second, si la compression est inefficace ou impossible.',
    situation: 'saignement-abondant',
    fiche: '02PR02 — Hémorragies externes',
  },
  {
    theme: 'Perte de connaissance',
    question: 'Une personne ne répond pas mais respire normalement. Comment l’installez-vous ?',
    reponses: [
      { texte: 'Sur le côté, en position latérale de sécurité', juste: true },
      { texte: 'Sur le dos, à plat' },
      { texte: 'Assise, adossée à un mur' },
      { texte: 'Sur le ventre, tête tournée' },
    ],
    explication:
      'Sur le dos, une personne inconsciente risque d’étouffer avec sa langue ou ce qu’elle régurgite. La position latérale libère les voies aériennes en attendant les secours.',
    situation: 'perte-de-connaissance',
    fiche: '02PR03 — Perte de connaissance',
  },
  {
    theme: 'Arrêt cardiaque',
    question: 'Une personne est inconsciente et sa respiration est bruyante et irrégulière. Que concluez-vous ?',
    reponses: [
      { texte: 'C’est un arrêt cardiaque : je commence la réanimation', juste: true },
      { texte: 'Elle respire, je la mets sur le côté' },
      { texte: 'Elle dort profondément, je la surveille' },
      { texte: 'Elle fait une crise d’épilepsie' },
    ],
    explication:
      'Une respiration anormale, dite agonique, doit être considérée comme un arrêt cardiaque. C’est l’erreur la plus fréquente et la plus coûteuse : elle fait perdre les minutes qui comptent.',
    situation: 'arret-cardiaque',
    fiche: '02PR04 — Arrêt cardiaque',
  },
  {
    theme: 'Défibrillateur',
    question: 'Un défibrillateur vous est apporté. Que faites-vous ?',
    reponses: [
      { texte: 'Je l’allume et je suis ses instructions vocales', juste: true },
      { texte: 'J’attends les secours : c’est un appareil médical' },
      { texte: 'Je vérifie d’abord le pouls avant de l’utiliser' },
      { texte: 'Je ne l’utilise pas s’il s’agit d’un enfant' },
    ],
    explication:
      'L’appareil analyse seul le rythme cardiaque et ne délivre un choc que s’il est nécessaire. Il est impossible de se tromper en l’utilisant, y compris sur un enfant.',
    situation: 'arret-cardiaque',
    fiche: '02FT11 — Défibrillation',
  },
  {
    theme: 'Réanimation de l’enfant',
    question: 'Chez un enfant en arrêt cardiaque, par quoi commence la réanimation ?',
    reponses: [
      { texte: 'Cinq insufflations, avant toute compression', juste: true },
      { texte: 'Trente compressions, comme chez l’adulte' },
      { texte: 'Deux insufflations puis trente compressions' },
      { texte: 'Le défibrillateur, et rien d’autre' },
    ],
    explication:
      'Chez l’enfant, l’arrêt est presque toujours d’origine respiratoire : la réanimation débute par cinq insufflations, puis enchaîne 15 compressions pour 2 insufflations.',
    situation: 'arret-cardiaque-enfant',
    fiche: '02PR04 — Arrêt cardiaque',
  },
  {
    theme: 'AVC',
    question: 'Un proche a le visage déformé d’un côté et n’arrive plus à lever un bras. Cela dure depuis deux minutes.',
    reponses: [
      { texte: 'J’appelle le 15 immédiatement', juste: true },
      { texte: 'J’attends de voir si ça passe' },
      { texte: 'Je l’emmène moi-même aux urgences' },
      { texte: 'Je lui donne de l’aspirine' },
    ],
    explication:
      'Ce sont des signes d’accident vasculaire cérébral. L’apparition d’un seul d’entre eux impose une alerte immédiate, même s’il ne dure que quelques secondes.',
    situation: 'malaise',
    fiche: '02PR05 — Malaises',
  },
  {
    theme: 'Brûlure',
    question: 'Une personne se brûle l’avant-bras en cuisinant. Combien de temps arrosez-vous ?',
    reponses: [
      { texte: 'Au moins 10 minutes, idéalement 20', juste: true },
      { texte: 'Une trentaine de secondes suffisent' },
      { texte: 'Jusqu’à ce que la douleur disparaisse' },
      { texte: 'On n’arrose pas : on applique une pommade' },
    ],
    explication:
      'L’eau tempérée à faible pression limite la profondeur de la brûlure. Commencer l’arrosage plus de trente minutes après n’a en revanche plus d’intérêt.',
    situation: 'brulure',
    fiche: '02PR07 — Brûlures',
  },
  {
    theme: 'Brûlure',
    question: 'Un vêtement adhère à la peau brûlée. Que faites-vous ?',
    reponses: [
      { texte: 'Je le laisse en place et j’arrose par-dessus', juste: true },
      { texte: 'Je le retire délicatement' },
      { texte: 'Je le découpe autour de la zone collée' },
      { texte: 'Je l’humidifie pour le décoller plus facilement' },
    ],
    explication:
      'On retire les vêtements et les bijoux près de la brûlure, mais seulement s’ils n’adhèrent pas à la peau. Ce qui colle emporterait la peau avec lui.',
    situation: 'brulure',
    fiche: '02PR07 — Brûlures',
  },
  {
    theme: 'Protection',
    question: 'Avant de porter secours sur la voie publique, quelle est votre première action ?',
    reponses: [
      { texte: 'Supprimer le danger, ou m’en protéger', juste: true },
      { texte: 'Prendre le pouls de la victime' },
      { texte: 'Appeler les secours' },
      { texte: 'Déplacer la victime sur le trottoir' },
    ],
    explication:
      'Un sauveteur blessé devient une victime de plus, et personne ne porte plus secours. La protection précède toujours l’examen et l’alerte.',
    fiche: '01AC03 — Protection',
  },
];

export const referentielQuiz = {
  nom: 'Recommandations relatives à l’unité d’enseignement « Prévention et Secours Civiques de niveau 1 »',
  edition: 'édition 2024',
};
