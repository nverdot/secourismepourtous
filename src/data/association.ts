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

  contact: {
    telephone: '06 65 23 12 72',
    telephoneLien: '+33665231272',
    email: 'secourismepourtous@gmail.com',
    adresse: '31 Boulevard Impératrice Eugénie',
    codePostal: '06200',
    ville: 'Nice',
    departement: 'Alpes-Maritimes',
  },

  agrements: [
    { nom: 'Affiliée FFSS', detail: 'Fédération Française de Sauvetage et de Secourisme' },
    { nom: 'Agréée sécurité civile', detail: 'Agrément de sécurité civile pour les dispositifs prévisionnels de secours' },
    { nom: 'Certifiée Qualiopi', detail: 'Actions de formation' },
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
    { nom: 'Saint-Laurent-du-Var' },
  ] as { nom: string; logo?: string }[],

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
      lien: '/ecole-de-sauvetage',
    },
  ],

  accessibilite:
    'Formations accessibles aux personnes en situation de handicap. Chaque besoin est étudié en amont et un dispositif adapté est mis en place. Une section sport adapté complète notre engagement pour l’inclusion.',
};

export type Asso = typeof asso;
