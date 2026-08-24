/**
 * Métiers et diplômes qui exigent une formation aux premiers secours.
 *
 * ⚠️ CES PAGES ENGAGENT. Dire à quelqu'un qu'un diplôme est obligatoire pour
 * son métier, c'est l'engager sur une dépense et un calendrier. Une erreur se
 * découvre devant un jury, trop tard. D'où trois règles :
 *
 *   1. Chaque entrée porte la NATURE exacte de l'obligation. « Exigé pour
 *      exercer » et « prérequis pour entrer en formation » ne sont pas la même
 *      chose, et confondre les deux fait perdre une année à quelqu'un.
 *   2. Chaque entrée porte sa SOURCE. Sans source vérifiable, pas de ligne.
 *   3. La page affiche la DATE de vérification. La réglementation bouge ; une
 *      page non datée devient fausse sans que personne s'en aperçoive.
 *
 * Vérifié le 20 août 2026. À revoir au moins une fois par an.
 */

export type Nature =
  /** Le diplôme est exigé pour exercer ou pour obtenir la qualification. */
  | 'exige'
  /** Le diplôme est exigé à l'entrée en formation, pas pour exercer ensuite. */
  | 'prerequis'
  /** Aucune obligation générale, mais les employeurs le demandent couramment. */
  | 'demande';

export interface Metier {
  nom: string;
  secteur: string;
  nature: Nature;
  /** Ce qu'exige précisément le texte, en une phrase. */
  exigence: string;
  /** Ce que la formation change dans ce métier au quotidien. */
  contexte: string;
  source: { texte: string; url: string };
}

export const LIBELLE_NATURE: Record<Nature, { court: string; long: string }> = {
  exige: {
    court: 'Exigé',
    long: 'Exigé pour exercer ou pour obtenir la qualification.',
  },
  prerequis: {
    court: 'Prérequis',
    long: 'Exigé pour entrer en formation, avant même de commencer le cursus.',
  },
  demande: {
    court: 'Très demandé',
    long: 'Pas d’obligation générale, mais réclamé couramment par les employeurs.',
  },
};

export const metiersPsc: Metier[] = [
  {
    nom: 'Professeur des écoles',
    secteur: 'Éducation nationale',
    nature: 'exige',
    exigence:
      'Une attestation de qualification en secourisme de niveau au moins égal au PSC1 est exigée des candidats au concours de recrutement de professeurs des écoles (CRPE), au même titre que l’attestation de natation de 50 mètres.',
    contexte:
      'Trente élèves sous votre responsabilité, une cour de récréation, une sortie scolaire : vous serez le premier sur place, et souvent le seul adulte formé.',
    source: {
      texte: 'Conditions d’inscription au CRPE — ministère de l’Éducation nationale',
      url: 'https://www.devenirenseignant.gouv.fr/',
    },
  },
  {
    nom: 'Éducateur sportif (BPJEPS, DEJEPS, DESJEPS)',
    secteur: 'Sport et animation',
    nature: 'prerequis',
    exigence:
      'Le PSC1 ou un diplôme équivalent est exigé à l’entrée en formation des diplômes professionnels de l’animation et du sport.',
    contexte:
      'Malaise sur un terrain, chute lors d’un entraînement : entre l’incident et l’arrivée des secours, l’encadrant est seul avec le groupe.',
    source: {
      texte: 'Textes relatifs aux BPJEPS — ministère des Sports',
      url: 'https://www.sports.gouv.fr/',
    },
  },
  {
    nom: 'Assistant maternel',
    secteur: 'Petite enfance',
    nature: 'exige',
    exigence:
      'La formation obligatoire des assistants maternels comprend un module de prévention et secours civiques de niveau 1.',
    contexte:
      'Fausse route, convulsion fébrile, chute : chez un tout-petit, les minutes qui suivent comptent double, et vous êtes seul chez vous.',
    source: {
      texte: 'Décret n° 2018-903 du 23 octobre 2018 — Légifrance',
      url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000037519404',
    },
  },
  {
    nom: 'Agent de prévention et de sécurité',
    secteur: 'Sécurité privée',
    nature: 'prerequis',
    exigence:
      'Le SST ou le PSC1 est exigé pour se présenter au CQP APS, la qualification qui ouvre la carte professionnelle.',
    contexte:
      'Vous êtes présent avant tout le monde et vous partez après : sur un malaise en galerie marchande ou en soirée, vous êtes le premier maillon.',
    source: {
      texte: 'Référentiel du CQP APS — branche prévention-sécurité',
      url: 'https://www.cnaps.interieur.gouv.fr/',
    },
  },
  {
    nom: 'Animateur en accueil collectif de mineurs (BAFA)',
    secteur: 'Animation',
    nature: 'demande',
    exigence:
      'Le PSC1 n’est pas imposé par les textes du BAFA, mais il est réclamé par une grande partie des organisateurs de séjours et de centres de loisirs.',
    contexte:
      'En colonie ou en centre aéré, l’animateur formé est celui à qui l’on confie les sorties, la baignade et les groupes les plus jeunes.',
    source: {
      texte: 'Arrêté du 15 juillet 2015 relatif au BAFA et au BAFD — Légifrance',
      url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000030902804/',
    },
  },
  {
    nom: 'Sapeur-pompier volontaire',
    secteur: 'Sécurité civile',
    nature: 'demande',
    exigence:
      'Le PSC1 est couramment demandé à l’engagement, avant la formation initiale dispensée par le service d’incendie et de secours.',
    contexte:
      'Arriver avec les gestes déjà acquis change la première année : vous suivez la formation initiale au lieu de la découvrir.',
    source: {
      texte: 'Sécurité civile — ministère de l’Intérieur',
      url: 'https://www.interieur.gouv.fr/Le-ministere/Securite-civile',
    },
  },
  {
    nom: 'Conducteur de taxi',
    secteur: 'Transport de personnes',
    nature: 'exige',
    exigence:
      'Une attestation de PSC de moins de deux ans est exigée par la préfecture pour obtenir la carte professionnelle de conducteur de taxi.',
    contexte:
      'Un malaise à bord, un accident sur la route : vous êtes seul avec la personne, souvent avant tout le monde. La condition d’ancienneté impose de refaire la formation régulièrement, ce n’est pas un passage unique.',
    source: {
      texte: 'Code des transports, article R3121-17 — service-public.fr',
      url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F21907',
    },
  },
  {
    nom: 'Chauffeur VTC',
    secteur: 'Transport de personnes',
    nature: 'demande',
    exigence:
      'Le secourisme n’est plus obligatoire pour la carte professionnelle VTC depuis le 12 août 2026, mais reste explicitement recommandé par l’administration.',
    contexte:
      'Les conditions d’exercice sont les mêmes que pour un taxi : seul à bord, premier sur place. Beaucoup de plateformes et de donneurs d’ordre continuent de le demander.',
    source: {
      texte: 'Devenir chauffeur VTC — service-public.fr',
      url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F31027',
    },
  },
];

export const metiersPse1: Metier[] = [
  {
    nom: 'Nageur sauveteur (SSA, ex-BNSSA)',
    secteur: 'Sauvetage aquatique',
    nature: 'exige',
    // L'arrêté du 23 janvier 1979, cité ici jusqu'à présent, est abrogé depuis
    // le 1er octobre 2026. Le PSE1 ne suffit plus : l'équivalence vers le SSA
    // demande le PSE2, et l'employabilité tient à sa formation continue.
    exigence:
      'Le PSE2 est désormais la référence : depuis le 1er octobre 2026, le BNSSA est remplacé par le certificat de surveillant sauveteur aquatique (SSA), dont l’équivalence exige le PSE2 et dont l’employabilité dépend de sa formation continue annuelle.',
    contexte:
      'Une noyade ne laisse pas de marge : sortir la victime ne suffit pas, il faut savoir enchaîner bilan, oxygène et réanimation à plusieurs. C’est exactement ce que le PSE2 ajoute au PSE1, et ce que la réforme vient rendre obligatoire.',
    source: {
      texte: 'Arrêté du 29 juillet 2026 relatif aux filières de sécurité civile — Légifrance',
      url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054594151',
    },
  },
  {
    nom: 'Maître-nageur sauveteur (BPJEPS AAN)',
    secteur: 'Sauvetage aquatique',
    nature: 'prerequis',
    exigence:
      'Le PSE1 à jour de sa formation continue et le BNSSA valide sont exigés à l’entrée en formation du BPJEPS activités aquatiques et de la natation.',
    contexte:
      'Surveiller un bassin, c’est intervenir seul en quelques secondes, puis coordonner l’équipe qui arrive derrière vous.',
    source: {
      texte: 'BPJEPS AAN — CREPS, ministère des Sports',
      url: 'https://www.creps-vichy.sports.gouv.fr/formation.fiche-BPJEPS-AAN-appr',
    },
  },
  {
    nom: 'Moniteur de plongée (BPJEPS plongée subaquatique)',
    secteur: 'Plongée',
    nature: 'prerequis',
    exigence:
      'L’attestation PSE1 en cours de validité est exigée pour entrer en formation du BPJEPS mention plongée subaquatique.',
    contexte:
      'Accident de décompression, malaise à la remontée : la prise en charge se fait sur un bateau, loin de tout, avec de l’oxygène et une équipe réduite.',
    source: {
      texte: 'BPJEPS plongée subaquatique — ministère des Sports',
      url: 'https://www.sports.gouv.fr/',
    },
  },
  {
    nom: 'Équipier secouriste en poste de secours',
    secteur: 'Sécurité civile',
    nature: 'exige',
    exigence:
      'Le référentiel national des dispositifs prévisionnels de secours impose le PSE1 pour tenir un poste de secours en qualité de secouriste.',
    contexte:
      'C’est le diplôme qui ouvre nos propres équipes : festivals, épreuves sportives, feux d’artifice, marchés de Noël.',
    source: {
      texte: 'Arrêté du 7 novembre 2006 fixant le référentiel national des DPS — Légifrance',
      url: 'https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000000640977',
    },
  },
  {
    nom: 'Chef d’équipe en poste de secours',
    secteur: 'Sécurité civile',
    nature: 'exige',
    exigence:
      'Le même référentiel impose le PSE2 pour encadrer une équipe sur un dispositif prévisionnel de secours.',
    contexte:
      'Vous ne faites plus seulement les gestes : vous répartissez, vous décidez de l’évacuation et vous transmettez aux secours publics.',
    source: {
      texte: 'Arrêté du 7 novembre 2006 fixant le référentiel national des DPS — Légifrance',
      url: 'https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000000640977',
    },
  },
];

/** Date de la dernière vérification des textes cités. */
export const verifieLe = new Date('2026-08-20');

export const verifieLeTexte = '21 août 2026';
