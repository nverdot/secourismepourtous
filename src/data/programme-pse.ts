/**
 * Programme détaillé du PSE1 et du PSE2.
 *
 * SOURCE : « Recommandations relatives aux unités d'enseignement Premiers
 * Secours en Équipe de niveau 1 et de niveau 2 », édition 2024, direction
 * générale de la Sécurité civile et de la gestion des crises.
 *
 * Le contenu reprend la structure officielle en douze chapitres et la
 * répartition des compétences entre les deux niveaux, telle que le référentiel
 * la fixe. Les intitulés sont ceux des fiches ; seule leur mise en forme change.
 *
 * Pourquoi ce niveau de détail : Qualiopi impose de publier un programme
 * précis, et c'est aussi ce que cherche quelqu'un qui hésite entre les deux
 * diplômes. Une liste vague de six puces ne répond ni à l'un ni à l'autre.
 *
 * Les techniques (fiches FT du référentiel) sont comptées mais pas listées :
 * ce sont des gestes, ils se décrivent mal par écrit et l'énumération
 * n'apprendrait rien à personne.
 */

export interface Chapitre {
  numero: string;
  nom: string;
  /** Ce que le chapitre apporte, en une phrase. */
  enjeu: string;
  /** Sujets traités au niveau PSE1. */
  pse1: string[];
  /** Sujets ajoutés au niveau PSE2. */
  pse2: string[];
  /** Nombre de techniques pratiques travaillées, par niveau. */
  techniques: { pse1: number; pse2: number };
}

export const chapitres: Chapitre[] = [
  {
    numero: '01',
    nom: 'Attitude et comportement',
    enjeu:
      'Ce qui se joue avant le premier geste : la place du secouriste, la relation à la victime, et la protection de son propre équilibre.',
    pse1: [
      'Le citoyen de sécurité civile',
      'Enjeux et principes du secours',
      'Attitude et comportement du secouriste',
      'L’abord relationnel en pratique',
      'Intervenir auprès d’un enfant',
      'Préservation du potentiel mental',
    ],
    pse2: [],
    techniques: { pse1: 5, pse2: 0 },
  },
  {
    numero: '02',
    nom: 'Bilans',
    enjeu:
      'La colonne vertébrale du secourisme en équipe : observer dans un ordre imposé, puis transmettre au médecin régulateur ce qu’il attend, dans le langage qu’il attend.',
    pse1: [
      'Généralités sur les bilans',
      'Premier regard',
      'Deuxième regard',
      'Troisième regard',
      'Quatrième regard',
      'Surveillance de la victime',
      'Transmission du bilan',
    ],
    pse2: [],
    techniques: { pse1: 11, pse2: 0 },
  },
  {
    numero: '03',
    nom: 'Protection et sécurité',
    enjeu:
      'Un secouriste blessé devient une victime de plus. La sécurité de l’intervenant passe avant celle de la victime.',
    pse1: [
      'Sécurité sur intervention',
      'Équipement de protection individuelle',
    ],
    pse2: ['Sécurité sur intervention particulière'],
    techniques: { pse1: 1, pse2: 0 },
  },
  {
    numero: '04',
    nom: 'Hygiène et asepsie',
    enjeu:
      'Ne pas transmettre, ne pas contracter. Ce chapitre relève de la santé publique autant que du secours.',
    pse1: [
      'Risque infectieux',
      'Précautions standards',
      'Précautions particulières',
      'Accident d’exposition à un risque viral',
    ],
    pse2: [],
    techniques: { pse1: 9, pse2: 0 },
  },
  {
    numero: '05',
    nom: 'Urgences vitales',
    enjeu:
      'Le cœur du PSE1 : les situations où l’on perd la victime en quelques minutes si personne n’agit correctement.',
    pse1: [
      'Arrêt cardiaque chez l’adulte',
      'Arrêt cardiaque chez l’enfant',
      'Détresse respiratoire',
      'Détresse circulatoire',
      'Détresse neurologique',
      'Obstruction partielle des voies aériennes',
      'Obstruction complète des voies aériennes',
      'Hémorragie externe',
      'Hémorragies extériorisées',
      'Section de membre',
      'Perte de connaissance',
      'Perte de connaissance en sauveteur isolé',
    ],
    pse2: [],
    techniques: { pse1: 22, pse2: 0 },
  },
  {
    numero: '06',
    nom: 'Malaises et affections spécifiques',
    enjeu:
      'Reconnaître ce qui ne se voit pas. C’est ici que le PSE2 prend le relais, avec les pathologies qui exigent une orientation immédiate.',
    pse1: ['Malaise et aggravation de maladie'],
    pse2: [
      'Accident vasculaire cérébral',
      'Douleur thoracique non traumatique',
    ],
    techniques: { pse1: 2, pse2: 0 },
  },
  {
    numero: '07',
    nom: 'Atteintes circonstancielles',
    enjeu:
      'Les situations liées au milieu : eau, froid, chaleur, électricité, toxiques. L’essentiel relève du PSE2.',
    pse1: ['Noyade'],
    pse2: [
      'Accident électrique',
      'Affections liées à la chaleur',
      'Hypothermie',
      'Intoxications',
      'Intoxication en environnement toxique',
      'Piqûres et morsures',
      'Pendaison, strangulation',
      'Accouchement inopiné',
      'Prise en charge du nouveau-né à la naissance',
    ],
    techniques: { pse1: 0, pse2: 1 },
  },
  {
    numero: '08',
    nom: 'Traumatismes',
    enjeu:
      'Du membre fracturé au traumatisme du rachis. Le PSE1 pose les bases, le PSE2 ajoute les atteintes qui engagent le pronostic vital.',
    pse1: ['Plaie', 'Brûlures', 'Traumatisme des membres'],
    pse2: [
      'Traumatisme du crâne',
      'Traumatisme de la face',
      'Traumatisme du dos et du cou',
      'Traumatisme du thorax',
      'Traumatisme de l’abdomen',
      'Traumatisme du bassin',
    ],
    techniques: { pse1: 11, pse2: 6 },
  },
  {
    numero: '09',
    nom: 'Souffrance psychique et comportements inhabituels',
    enjeu:
      'Une intervention sur deux comporte une part psychologique. Ce chapitre, propre au PSE2, apprend à ne pas la traiter comme un obstacle.',
    pse1: [],
    pse2: [
      'Les personnes en situation de crise',
      'Prise en charge d’une personne présentant un comportement inhabituel',
    ],
    techniques: { pse1: 0, pse2: 0 },
  },
  {
    numero: '10',
    nom: 'Relevage et brancardage',
    enjeu:
      'Déplacer une victime sans l’aggraver ni se blesser. C’est le chapitre le plus physique du PSE2, et le plus collectif.',
    pse1: [],
    pse2: ['Relevage et brancardage'],
    techniques: { pse1: 1, pse2: 12 },
  },
  {
    numero: '11',
    nom: 'Situations particulières',
    enjeu:
      'Quand les victimes sont plus nombreuses que les secouristes, l’ordre des priorités change complètement.',
    pse1: ['Situation à nombreuses victimes'],
    pse2: [],
    techniques: { pse1: 1, pse2: 0 },
  },
];

export const referentielPse = {
  nom: 'Recommandations relatives aux unités d’enseignement « Premiers Secours en Équipe » de niveau 1 et de niveau 2',
  edition: 'édition 2024',
  auteur: 'Direction générale de la Sécurité civile et de la gestion des crises',
};

/** Chapitres où le niveau demandé apporte quelque chose. */
export function chapitresDe(niveau: 'pse1' | 'pse2'): Chapitre[] {
  return chapitres.filter(
    (c) => c[niveau].length > 0 || c.techniques[niveau] > 0
  );
}

/** Compte des sujets et des techniques, pour les chiffres affichés. */
export function volume(niveau: 'pse1' | 'pse2') {
  const c = chapitresDe(niveau);
  return {
    chapitres: c.length,
    sujets: c.reduce((n, x) => n + x[niveau].length, 0),
    techniques: c.reduce((n, x) => n + x.techniques[niveau], 0),
  };
}
