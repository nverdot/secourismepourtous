/**
 * Questionnaires de formation continue — FC PSC, FC PSE1, FC PSE2.
 *
 * SOURCES : « Recommandations relatives à l'unité d'enseignement Prévention et
 * Secours Civiques de niveau 1 » et « … Premiers Secours en Équipe de niveau 1
 * et de niveau 2 », éditions 2024, direction générale de la Sécurité civile.
 *
 * CE QUI DIFFÈRE DU QUIZ PSC. Le public n'est pas le même : ces personnes sont
 * déjà diplômées et interviennent. Le questionnaire ne cherche donc pas à leur
 * faire découvrir le secourisme, mais à leur montrer l'écart entre ce qu'elles
 * croient savoir et les recommandations en vigueur. D'où trois partis pris :
 *
 *   1. Les questions portent sur les points qui SE PERDENT — enchaînements,
 *      chiffres, ordres de priorité — pas sur les évidences.
 *   2. Les mauvaises réponses sont les pratiques anciennes ou approximatives,
 *      celles qu'on garde de bonne foi faute d'avoir suivi les mises à jour.
 *   3. Le barème est exigeant : voir `severe` dans le composant Quiz.
 *
 * ⚠️ À FAIRE RELIRE PAR L'ÉQUIPE PÉDAGOGIQUE. Ces questions sont tirées des
 * référentiels, mais SPT voit chaque année ce que ses stagiaires oublient
 * réellement. Ce retour terrain vaut mieux que ma sélection.
 */

import type { Question } from './quiz';

export const quizFcPsc: Question[] = [
  {
    theme: 'Arrêt cardiaque',
    question: 'Chez un adulte, quel est le cycle de réanimation cardio-pulmonaire ?',
    reponses: [
      { texte: '30 compressions puis 2 insufflations', juste: true },
      { texte: '15 compressions puis 2 insufflations' },
      { texte: '5 insufflations puis 30 compressions' },
      { texte: 'Des compressions en continu, sans insufflation' },
    ],
    explication:
      'Chez l’adulte, la réanimation répète des cycles de trente compressions suivies de deux insufflations. Les compressions seules ne s’imposent que si les insufflations sont impossibles ou refusées.',
    situation: 'arret-cardiaque',
    fiche: '02PR04 — Arrêt cardiaque',
  },
  {
    theme: 'Réanimation de l’enfant',
    question: 'Et chez un enfant ou un nourrisson ?',
    reponses: [
      { texte: '5 insufflations, puis des cycles de 15 pour 2', juste: true },
      { texte: 'Le même cycle que l’adulte : 30 pour 2' },
      { texte: '2 insufflations, puis 30 pour 2' },
      { texte: 'On attend les secours : la réanimation est réservée aux professionnels' },
    ],
    explication:
      'L’arrêt cardiaque de l’enfant est presque toujours d’origine respiratoire : la réanimation débute par cinq insufflations, puis enchaîne 15 compressions pour 2 insufflations.',
    situation: 'arret-cardiaque-enfant',
    fiche: '02PR04 — Arrêt cardiaque',
  },
  {
    theme: 'Compressions',
    question: 'À quel rythme réalise-t-on les compressions thoraciques ?',
    reponses: [
      { texte: 'Entre 100 et 120 par minute', juste: true },
      { texte: 'Entre 60 et 80 par minute' },
      { texte: 'Entre 140 et 160 par minute' },
      { texte: 'Le plus vite possible' },
    ],
    explication:
      'Le rythme recommandé est de 100 à 120 compressions par minute. Trop lent, la circulation est insuffisante ; trop rapide, le thorax n’a pas le temps de se relever entre deux compressions.',
    situation: 'arret-cardiaque',
    fiche: '02FT09 — Compressions thoraciques',
  },
  {
    theme: 'Étouffement',
    question: 'Chez un adulte obèse ou une femme enceinte, où réalise-t-on les compressions de désobstruction ?',
    reponses: [
      { texte: 'Au niveau thoracique', juste: true },
      { texte: 'Au niveau abdominal, comme pour tout adulte' },
      { texte: 'On ne comprime pas : on se limite aux claques dans le dos' },
      { texte: 'Au niveau du dos, entre les omoplates' },
    ],
    explication:
      'Les compressions sont thoraciques chez le nourrisson, mais aussi chez l’adulte obèse ou la femme enceinte lorsqu’il est impossible d’encercler l’abdomen.',
    situation: 'etouffement',
    fiche: '02PR01 — Obstruction des voies aériennes',
  },
  {
    theme: 'Hémorragie',
    question: 'La compression directe n’arrête pas le saignement d’un membre. Que faites-vous ?',
    reponses: [
      { texte: 'Je pose un garrot au-dessus de la plaie', juste: true },
      { texte: 'J’ajoute un second pansement par-dessus le premier' },
      { texte: 'Je surélève le membre et j’attends' },
      { texte: 'Je comprime le pli de l’aine ou du coude' },
    ],
    explication:
      'Le garrot se pose sur un membre, entre le cœur et la plaie, quand la compression directe est inefficace ou impossible. Un garrot industriel est préférable s’il est disponible.',
    situation: 'saignement-abondant',
    fiche: '02PR02 — Hémorragies externes',
  },
  {
    theme: 'Brûlure',
    question: 'Passé quel délai l’arrosage d’une brûlure n’a-t-il plus d’intérêt ?',
    reponses: [
      { texte: 'Trente minutes après la brûlure', juste: true },
      { texte: 'Cinq minutes après la brûlure' },
      { texte: 'Deux heures après la brûlure' },
      { texte: 'L’arrosage garde toujours un intérêt' },
    ],
    explication:
      'L’arrosage doit durer au moins 10 minutes, idéalement 20, à l’eau tempérée. Débuter l’arrosage plus de trente minutes après la brûlure n’a en revanche plus d’intérêt.',
    situation: 'brulure',
    fiche: '02PR07 — Brûlures',
  },
  {
    theme: 'Défibrillation',
    question: 'Le défibrillateur vient de délivrer un choc. Que faites-vous ?',
    reponses: [
      { texte: 'Je reprends immédiatement les compressions', juste: true },
      { texte: 'J’attends les instructions vocales avant de reprendre' },
      { texte: 'Je vérifie le pouls avant de reprendre' },
      { texte: 'Je retire les électrodes' },
    ],
    explication:
      'On reprend la réanimation immédiatement après la délivrance — ou la non-délivrance — d’un choc, sans attendre les instructions vocales de l’appareil.',
    situation: 'arret-cardiaque',
    fiche: '02FT11 — Défibrillation',
  },
  {
    theme: 'Malaise',
    question: 'Lequel de ces signes n’évoque pas un accident vasculaire cérébral ?',
    reponses: [
      { texte: 'Une douleur qui serre la poitrine', juste: true },
      { texte: 'Une faiblesse ou une paralysie d’un bras' },
      { texte: 'Une déformation du visage' },
      { texte: 'Une difficulté soudaine à parler ou à comprendre' },
    ],
    explication:
      'La douleur thoracique oriente vers un accident cardiaque. Les autres signes évoquent un AVC, et l’apparition d’un seul d’entre eux impose une alerte immédiate.',
    situation: 'malaise',
    fiche: '02PR05 — Malaises',
  },
];

export const quizFcPse1: Question[] = [
  {
    theme: 'Bilans',
    question: 'Quelle est la finalité du premier regard sur une victime ?',
    reponses: [
      { texte: 'Repérer une détresse vitale immédiate', juste: true },
      { texte: 'Mesurer la pression artérielle et la saturation' },
      { texte: 'Recueillir les antécédents médicaux' },
      { texte: 'Rédiger la fiche de transmission' },
    ],
    explication:
      'Le bilan suit une chronologie en quatre regards. Le premier cherche ce qui tue dans les minutes qui viennent ; les mesures et les antécédents viennent après.',
    fiche: '02AC01 — Généralités sur les bilans',
  },
  {
    theme: 'Arrêt cardiaque',
    question: 'Sur un arrêt cardiaque en équipe, dans quel ordre agissez-vous ?',
    reponses: [
      { texte: 'RCP immédiate, puis DAE dès que possible', juste: true },
      { texte: 'DAE d’abord, RCP seulement s’il n’y a pas de choc' },
      { texte: 'Bilan complet, puis RCP' },
      { texte: 'Oxygène d’abord, puis compressions' },
    ],
    explication:
      'On débute immédiatement la réanimation en cycles de 30 pour 2, et l’on met en œuvre le défibrillateur le plus tôt possible, sans que sa recherche n’interrompe le massage.',
    fiche: '05PR01 — Arrêt cardiaque chez l’adulte',
  },
  {
    theme: 'Section de membre',
    question: 'Face à une section de membre, que faites-vous du moignon ?',
    reponses: [
      { texte: 'Un pansement compressif, même en l’absence de saignement', juste: true },
      { texte: 'Rien tant qu’il ne saigne pas' },
      { texte: 'Un garrot systématique' },
      { texte: 'Une simple protection stérile non compressive' },
    ],
    explication:
      'Le référentiel impose un pansement compressif sur le moignon même s’il ne saigne pas, l’hémorragie pouvant reprendre. Le membre sectionné est conditionné à part.',
    fiche: '05PR14 — Section de membre',
  },
  {
    theme: 'Oxygène',
    question: 'Quand administre-t-on de l’oxygène par insufflation ?',
    reponses: [
      { texte: 'Lors d’une ventilation artificielle à l’insufflateur manuel', juste: true },
      { texte: 'Dès qu’une victime se plaint d’essoufflement' },
      { texte: 'Systématiquement, sur toute victime inconsciente' },
      { texte: 'Uniquement sur prescription du médecin régulateur' },
    ],
    explication:
      'L’administration par insufflation intervient quand le secouriste ventile à l’insufflateur manuel et dispose d’une source d’oxygène. Elle accroît l’efficacité de la réanimation.',
    fiche: '05FT01 — Administration d’oxygène par insufflation',
  },
  {
    theme: 'Protection',
    question: 'Sur intervention, quelle est la règle qui prime sur toutes les autres ?',
    reponses: [
      { texte: 'La sécurité de l’intervenant avant celle de la victime', juste: true },
      { texte: 'La rapidité de la prise en charge' },
      { texte: 'La transmission d’un bilan complet' },
      { texte: 'Le respect du secret médical' },
    ],
    explication:
      'Un secouriste blessé devient une victime de plus et cesse de porter secours. La protection précède l’examen, l’alerte et le geste.',
    fiche: '03PR01 — Sécurité sur intervention',
  },
  {
    theme: 'Étouffement',
    question: 'Nourrisson en obstruction complète : après cinq claques inefficaces, quelle est la position ?',
    reponses: [
      { texte: 'Retourné face au ciel, tête plus basse que le corps', juste: true },
      { texte: 'Assis sur les genoux du sauveteur' },
      { texte: 'Debout, adossé au sauveteur' },
      { texte: 'À plat dos sur une surface dure' },
    ],
    explication:
      'Le nourrisson repose sur l’avant-bras posé sur la cuisse du sauveteur, tête maintenue plus basse que le reste du corps, pour que la gravité aide à l’expulsion.',
    situation: 'etouffement-nourrisson',
    fiche: '02FT04 — Désobstruction chez le nourrisson',
  },
  {
    theme: 'Hygiène',
    question: 'Après un contact avec du sang sur peau lésée, de quoi s’agit-il ?',
    reponses: [
      { texte: 'D’un accident d’exposition à un risque viral', juste: true },
      { texte: 'D’un incident sans suite, si la plaie est petite' },
      { texte: 'D’un simple manquement aux précautions standards' },
      { texte: 'D’un événement à signaler seulement en fin d’intervention' },
    ],
    explication:
      'C’est un accident d’exposition à un risque viral, qui appelle une conduite à tenir immédiate et un avis médical urgent — pas un signalement différé.',
    fiche: '04AC01 — Accident d’exposition à un risque viral',
  },
  {
    theme: 'Transmission',
    question: 'À qui s’adresse en priorité le bilan que vous transmettez ?',
    reponses: [
      { texte: 'Au médecin régulateur, qui décide des moyens', juste: true },
      { texte: 'À la victime, pour la rassurer' },
      { texte: 'À l’organisateur de la manifestation' },
      { texte: 'À l’équipage qui viendra relever' },
    ],
    explication:
      'La transmission vise le médecin régulateur : c’est lui qui oriente et engage les moyens. Le langage du bilan est normalisé pour rendre cette compréhension immédiate.',
    fiche: '02AC — Transmission du bilan',
  },
];

export const quizFcPse2: Question[] = [
  {
    theme: 'AVC',
    question: 'Victime consciente présentant des signes d’AVC : dans quelle position l’installez-vous ?',
    reponses: [
      { texte: 'Strictement horizontale, à plat', juste: true },
      { texte: 'Assise, buste redressé' },
      { texte: 'Demi-assise, jambes surélevées' },
      { texte: 'En position latérale de sécurité systématiquement' },
    ],
    explication:
      'La victime consciente présentant des signes d’AVC est installée strictement à plat — ou en PLS seulement si elle présente des nausées et des vomissements.',
    fiche: '06PR01 — Accident vasculaire cérébral',
  },
  {
    theme: 'Traumatisme du cou',
    question: 'Plaie du cou qui saigne abondamment : quelle précaution s’ajoute à la compression ?',
    reponses: [
      { texte: 'Ne pas comprimer la trachée', juste: true },
      { texte: 'Comprimer des deux côtés du cou simultanément' },
      { texte: 'Poser un garrot cervical' },
      { texte: 'Ne jamais comprimer une plaie du cou' },
    ],
    explication:
      'On arrête le saignement par compression manuelle en veillant à ne pas comprimer la trachée. Les pansements compressifs d’urgence s’utilisent avec un contre-appui sous le bras.',
    fiche: '08PR09 — Traumatisme de la face et de la face antérieure du cou',
  },
  {
    theme: 'Plaie de la face',
    question: 'Comment considère-t-on une plaie de la face ou du cou ?',
    reponses: [
      { texte: 'Comme une plaie grave, du fait de sa localisation', juste: true },
      { texte: 'Comme une plaie simple si elle est peu profonde' },
      { texte: 'Selon la seule longueur de la plaie' },
      { texte: 'Comme une plaie grave uniquement si elle saigne' },
    ],
    explication:
      'À l’exception des éraflures sans gravité, toute plaie de la face ou du cou est prise en charge comme une plaie grave, indépendamment de son aspect.',
    fiche: '08PR09 — Traumatisme de la face et de la face antérieure du cou',
  },
  {
    theme: 'Relevage',
    question: 'Le relevage et le brancardage relèvent de quel niveau ?',
    reponses: [
      { texte: 'Du PSE2, à l’exception de la préparation du dispositif de portage', juste: true },
      { texte: 'Entièrement du PSE1' },
      { texte: 'Entièrement du PSE2, sans exception' },
      { texte: 'Du PSE1 pour le brancardage, du PSE2 pour le relevage' },
    ],
    explication:
      'Le chapitre relève du PSE2, avec une seule technique de niveau PSE1 : la préparation d’un dispositif de portage. Tout le reste — relevage, arrimage, brancardage — s’apprend en PSE2.',
    fiche: '10AC01 — Relevage et brancardage',
  },
  {
    theme: 'Souffrance psychique',
    question: 'Quel chapitre du référentiel n’existe qu’au niveau PSE2 ?',
    reponses: [
      { texte: 'Souffrance psychique et comportements inhabituels', juste: true },
      { texte: 'Urgences vitales' },
      { texte: 'Hygiène et asepsie' },
      { texte: 'Bilans' },
    ],
    explication:
      'C’est le seul chapitre entièrement absent du PSE1. Une intervention sur deux comporte pourtant une dimension psychologique : le PSE2 apprend à ne pas la traiter comme un obstacle.',
    fiche: '09AC01 — Les personnes en situation de crise',
  },
  {
    theme: 'Atteintes circonstancielles',
    question: 'Parmi ces atteintes, laquelle relève déjà du PSE1 ?',
    reponses: [
      { texte: 'La noyade', juste: true },
      { texte: 'L’hypothermie' },
      { texte: 'L’accouchement inopiné' },
      { texte: 'L’accident électrique' },
    ],
    explication:
      'La noyade est la seule atteinte circonstancielle traitée dès le PSE1. Hypothermie, accident électrique, intoxications et accouchement inopiné relèvent du PSE2.',
    fiche: '07AC09 — Noyade',
  },
  {
    theme: 'Traumatismes',
    question: 'Lequel de ces traumatismes n’est PAS abordé en PSE1 ?',
    reponses: [
      { texte: 'Le traumatisme du bassin', juste: true },
      { texte: 'La plaie' },
      { texte: 'La brûlure' },
      { texte: 'Le traumatisme des membres' },
    ],
    explication:
      'Le PSE1 couvre plaies, brûlures et traumatismes des membres. Crâne, face, dos et cou, thorax, abdomen et bassin s’ajoutent en PSE2.',
    fiche: '08 — Traumatismes',
  },
  {
    theme: 'Sécurité',
    question: 'La « sécurité sur intervention particulière » relève de quel niveau ?',
    reponses: [
      { texte: 'Du PSE2, en complément de la sécurité générale vue en PSE1', juste: true },
      { texte: 'Du PSE1 uniquement' },
      { texte: 'Elle n’existe dans aucun des deux' },
      { texte: 'Du seul PAE, réservé aux formateurs' },
    ],
    explication:
      'Le PSE1 pose la sécurité sur intervention et les équipements de protection. Le PSE2 y ajoute les interventions particulières, aux risques spécifiques.',
    fiche: '03PR02 — Sécurité sur intervention particulière',
  },
];

/** Les trois questionnaires, indexés par slug de formation. */
export const quizParFormation: Record<string, Question[]> = {
  'fc-psc': quizFcPsc,
  'fc-pse-1': quizFcPse1,
  'fc-pse-2': quizFcPse2,
};
