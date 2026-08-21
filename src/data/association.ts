/**
 * Identité et chiffres de l'association.
 * Source : page « Qui sommes-nous » du site actuel, août 2026.
 *
 * ⚠️ Le site actuel affiche deux numéros de téléphone, dont un 01 (Île-de-France)
 * qui est une erreur. Seul le 06 est repris ici.
 */

export const asso = {
  nom: 'Secourisme Pour Tous',
  sigle: 'SPT',
  baseline: 'Association de secourisme et de sauvetage sportif à Nice',
  fondation: 2008,
  fondateur: 'Martial Rinaudo',

  /**
   * Identifiants officiels.
   *
   * Le RNA (Répertoire National des Associations) identifie l'association
   * elle-même. Il ne se confond pas avec le numéro de déclaration d'activité
   * de l'organisme de formation, délivré par la DREETS au format 11 chiffres :
   * si SPT en possède un, il a sa place ici aussi.
   */
  identifiants: {
    rna: 'W061000773',
  },

  contact: {
    telephone: '06 65 23 12 72',
    telephoneLien: '+33665231272',
    email: 'secourismepourtous@gmail.com',
    adresse: '31 Boulevard Impératrice Eugénie',
    codePostal: '06200',
    ville: 'Nice',
    departement: 'Alpes-Maritimes',
    /** Coordonnées du siège, relevées sur la fiche Google du 20 août 2026. */
    latitude: 43.6936024,
    longitude: 7.231182,
  },

  /**
   * Desserte en transports en commun.
   *
   * ⚠️ À COMPLÉTER PAR SPT : lignes et arrêts exacts desservant le 31 boulevard
   * Impératrice Eugénie. Rien n'est inventé ici — un numéro de ligne faux
   * envoie un stagiaire au mauvais endroit le matin de sa formation. Tant que
   * la liste est vide, la page n'affiche que le calculateur d'itinéraire
   * Lignes d'Azur, qui est toujours juste.
   *
   * Format attendu : { mode: 'Bus' | 'Tram', ligne: '12', arret: 'Nom', minutes: 3 }
   */
  acces: [] as { mode: string; ligne: string; arret: string; minutes?: number }[],

  agrements: [
    { nom: 'Affiliée FFSS', detail: 'Fédération Française de Sauvetage et de Secourisme' },
    { nom: 'Agréée sécurité civile', detail: 'Agrément de sécurité civile pour les dispositifs prévisionnels de secours' },
    { nom: 'Certifiée Qualiopi', detail: 'Actions de formation — certificat QUA009665, valide jusqu’au 29/11/2027' },
  ],

  /** Ce qu'AMS n'a pas : des chiffres réels. Leurs compteurs affichent zéro. */
  chiffres: [
    { valeur: '800', suffixe: '+', label: 'personnes formées', detail: 'chaque année' },
    { valeur: '270', suffixe: '+', label: 'dispositifs de secours', detail: 'par an dans le 06' },
    { valeur: '70', suffixe: '+', label: 'secouristes diplômés', detail: 'et nageurs-sauveteurs' },
    { valeur: '20', suffixe: '', label: 'athlètes de haut niveau', detail: 'titrés France et Monde' },
  ],

  valeurs: ['Entraide', 'Sécurité', 'Rigueur', 'Performance'],

  /**
   * Partenaires institutionnels. Le logo vaut mieux qu'une simple mention :
   * c'est une preuve de confiance qu'un concurrent ne peut pas revendiquer.
   * `logo` absent = affichage du nom seul.
   */
  partenaires: [
    { nom: 'Ville de Nice', logo: '/img/partenaires/ville-de-nice.png' },
    { nom: 'Azur Arena Antibes', logo: '/img/partenaires/azur-arena.png' },
    { nom: 'Antibes Juan-les-Pins', logo: '/img/partenaires/antibes.png' },
    { nom: 'Mermonts Organisation', logo: '/img/partenaires/mermonts.png' },
    { nom: 'No Finish Line Nice', logo: '/img/partenaires/no-finish-line.png' },
    { nom: 'Saint-Laurent-du-Var', logo: '/img/partenaires/saint-laurent-du-var.png' },
  ] as { nom: string; logo?: string }[],

  /**
   * Informations exigées par Qualiopi, indicateur 1 : l'organisme diffuse une
   * information accessible au public, détaillée pour chaque prestation.
   *
   * Ces valeurs s'appliquent par défaut à toutes les formations ; une formation
   * peut les remplacer au cas par cas dans formations.ts.
   *
   * ⚠️ À FAIRE VALIDER PAR SPT — ce sont des engagements opposables :
   *   — le délai d'accès (48 h) reflète-t-il votre pratique réelle ?
   *   — les effectifs minimum et maximum sont-ils les bons ?
   * Un délai annoncé qui n'est pas tenu est un écart en audit.
   */
  modalites: {
    pedagogie:
      'Formation en présentiel. Apports théoriques courts, démonstrations par le formateur, puis mise en situation sur mannequin et entre stagiaires. La pratique occupe la majeure partie du temps.',
    evaluation:
      'Évaluation continue tout au long de la formation, à partir de mises en situation. Il n’y a pas d’examen final : la certification s’obtient par la validation de chaque compétence du référentiel.',
    delaiAcces:
      'Inscription possible jusqu’à 48 heures avant le début de la session, dans la limite des places disponibles.',
    effectif: 'De 4 à 10 participants par session.',
    lieu: 'Dans nos locaux à Nice, ou dans vos propres locaux pour un groupe constitué.',
  },

  poles: [
    {
      titre: 'Formation en secourisme',
      texte:
        'Du PSC grand public aux qualifications de secouriste et de formateur, dispensées par une équipe pédagogique de formateurs diplômés.',
      lien: '/formations',
    },
    {
      titre: 'Postes de secours',
      texte:
        'Dispositifs prévisionnels de secours sur toute la Côte d’Azur : manifestations sportives, concerts, fêtes locales, événements culturels.',
      lien: '/postes-de-secours',
    },
    {
      titre: 'Sauvetage sportif',
      texte:
        'Un club reconnu en région Provence-Alpes-Côte d’Azur, alliant natation, techniques de sauvetage et endurance, jusqu’au haut niveau.',
      lien: '/sauvetage-sportif',
    },
    {
      titre: 'École de sauvetage jeunesse',
      texte:
        'Les Pitchouns Nissart initient les enfants et adolescents au sauvetage en mer, entre compétences physiques et esprit citoyen.',
      lien: '/ecole-de-natation',
    },
  ],

  accessibilite:
    'Formations accessibles aux personnes en situation de handicap. Chaque besoin est étudié en amont et un dispositif adapté est mis en place. Une section sport adapté complète notre engagement pour l’inclusion.',
};

export type Asso = typeof asso;
