/**
 * Indicateurs de résultats publiés au titre de Qualiopi (indicateur 3 du
 * Référentiel National Qualité) : l'organisme doit rendre publics les résultats
 * qu'il obtient, formation par formation ou globalement.
 *
 * ⚠️ RÈGLE : on ne publie que des chiffres mesurés. Un indicateur laissé à
 * `null` n'est pas affiché — mieux vaut une ligne absente qu'un taux inventé,
 * qui se retournerait contre l'association lors d'un audit.
 *
 * À COMPLÉTER PAR SPT — chiffres à extraire du suivi 2025 :
 *   reussite   nombre de certifiés / nombre de présentés
 *   abandon    interruptions en cours de formation / inscrits
 *   stagiaires nombre total de personnes formées sur l'année
 * Dès qu'une valeur est renseignée ici, elle apparaît sur /formations.
 */

export interface Indicateur {
  cle: string;
  libelle: string;
  /** Valeur affichée, ou null tant qu'elle n'est pas mesurée. */
  valeur: string | null;
  unite: string;
  precision: string;
}

export const anneeIndicateurs = 2025;

export const indicateurs: Indicateur[] = [
  {
    cle: 'satisfaction',
    libelle: 'Stagiaires satisfaits ou très satisfaits',
    valeur: '99,9',
    unite: '%',
    precision: '566 réponses au questionnaire de fin de formation',
  },
  {
    cle: 'tres-satisfaits',
    libelle: 'Stagiaires très satisfaits',
    valeur: '95',
    unite: '%',
    precision: 'Part de la note maximale, hors « satisfait »',
  },
  {
    cle: 'reussite',
    libelle: 'Réussite à la certification',
    valeur: null,
    unite: '%',
    precision: 'Certifiés rapportés aux candidats présentés',
  },
  {
    cle: 'abandon',
    libelle: 'Interruptions en cours de formation',
    valeur: null,
    unite: '%',
    precision: 'Abandons rapportés aux inscrits',
  },
  {
    cle: 'stagiaires',
    libelle: 'Personnes formées',
    valeur: null,
    unite: '',
    precision: 'Toutes formations confondues sur l’année',
  },
];

/** Seuls les indicateurs réellement mesurés sont publiables. */
export const indicateursPublies = indicateurs.filter((i) => i.valeur !== null);
