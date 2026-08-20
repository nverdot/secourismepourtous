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
];

export const metiersPse1: Metier[] = [
  {
    nom: 'Nageur sauveteur (BNSSA)',
    secteur: 'Sauvetage aquatique',
    nature: 'exige',
    exigence:
      'Le PSE1 en cours de validité est exigé pour se présenter à l’examen du brevet national de sécurité et de sauvetage aquatique.',
    contexte:
      'Une noyade ne laisse pas de marge : sortir la victime ne suffit pas, il faut savoir enchaîner bilan, oxygène et réanimation à plusieurs.',
    source: {
      texte: 'Arrêté du 23 janvier 1979 modifié relatif au BNSSA — Légifrance',
      url: 'https://www.legifrance.gouv.fr/loda/id/LEGITEXT000024449977/',
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
      'Le référentiel national des dispositifs prévisionnels de secours impose le PSE1 pour tenir un poste de secours en qualité d’équipier secouriste.',
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

export const verifieLeTexte = '20 août 2026';
