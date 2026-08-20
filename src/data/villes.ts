/**
 * Communes où l'association intervient réellement, avec les dispositifs qu'elle
 * y a tenus.
 *
 * ⚠️ RÈGLE ABSOLUE : une commune n'entre dans cette liste que si SPT y est
 * effectivement intervenue, et chaque référence citée doit être vraie. Des
 * pages qui déclineraient « poste de secours à [ville] » sans rien derrière
 * sont des pages satellites : Google les déclasse, et un organisateur qui
 * appelle en citant un événement imaginaire découvre le pot aux roses en une
 * phrase. Mieux vaut quatre pages solides que quinze creuses.
 *
 * Pour ajouter une commune : demander à SPT deux ou trois dispositifs réels,
 * puis renseigner l'entrée ci-dessous.
 */

export interface Reference {
  nom: string;
  texte: string;
  /** Famille de dispositif, pour l'icône et le regroupement. */
  genre: 'sportif' | 'culturel' | 'festif' | 'populaire';
}

export interface Ville {
  slug: string;
  nom: string;
  /** Forme utilisée dans une phrase : « à Nice », « à Antibes ». */
  article: string;
  codePostal: string;
  /** Une phrase qui situe la commune et son enjeu en matière de secours. */
  contexte: string;
  references: Reference[];
  /** Communes limitrophes couvertes depuis celle-ci. */
  alentours: string[];
  /** Minutes de route depuis le siège, à titre indicatif. */
  distanceMinutes: number;
}

export const villes: Ville[] = [
  {
    slug: 'nice',
    nom: 'Nice',
    article: 'à Nice',
    codePostal: '06200',
    contexte:
      'Notre ville. Des rassemblements de plusieurs dizaines de milliers de personnes sur la Promenade des Anglais aux concerts du Théâtre de Verdure, nous y couvrons toute la gamme des affluences.',
    references: [
      {
        nom: 'UTMB',
        texte: 'Course de trail : coureurs dispersés sur un long parcours, souvent hors des accès routiers, avec des points de contrôle à couvrir séparément.',
        genre: 'sportif',
      },
      {
        nom: 'Ironman',
        texte: 'Triathlon longue distance : natation en mer, vélo puis course à pied, soit trois environnements et trois dispositifs enchaînés dans la même journée.',
        genre: 'sportif',
      },
      {
        nom: 'Tour de France Hommes',
        texte: 'Épreuve cycliste sur circuit urbain : postes fixes le long du parcours et équipes mobiles derrière les barrières.',
        genre: 'sportif',
      },
      {
        nom: 'Tour de France Femmes',
        texte: 'Même exigence sur la ville, avec des zones de départ et d’arrivée très denses en public.',
        genre: 'sportif',
      },
      {
        nom: 'Spectacle de drones',
        texte: 'Rassemblement nocturne massif sur le front de mer : faible visibilité, flux serrés et évacuation contrainte par le littoral.',
        genre: 'festif',
      },
      {
        nom: 'Concerts au Théâtre de Verdure',
        texte: 'Public assis et debout, en plein air, avec les particularités d’un site en centre-ville.',
        genre: 'culturel',
      },
      {
        nom: 'Concerts aux Arènes de Cimiez',
        texte: 'Site en gradins à l’écart du centre : accès des secours et brancardage à anticiper dès la conception du dispositif.',
        genre: 'culturel',
      },
      {
        nom: 'Marché de Noël',
        texte: 'Plusieurs semaines de présence, par temps froid, avec un public familial et de nombreux enfants.',
        genre: 'populaire',
      },
      {
        nom: 'Commémorations',
        texte: 'Cérémonies officielles : public souvent âgé, station debout prolongée, coordination avec les services de l’État.',
        genre: 'populaire',
      },
    ],
    alentours: ['Villefranche-sur-Mer', 'Saint-Jean-Cap-Ferrat', 'Beaulieu-sur-Mer', 'La Trinité'],
    distanceMinutes: 0,
  },
  {
    slug: 'antibes-juan-les-pins',
    nom: 'Antibes Juan-les-Pins',
    article: 'à Antibes et Juan-les-Pins',
    codePostal: '06600',
    contexte:
      'Une commune à deux visages pour le secours : les salles couvertes de l’Azur Arena d’un côté, les scènes et les plages de la saison estivale de l’autre.',
    references: [
      {
        nom: 'Azur Arena',
        texte: 'Rencontres et spectacles en salle : public en gradins, gestion des flux à l’entrée comme à la sortie.',
        genre: 'sportif',
      },
      {
        nom: 'Mondial Foot Volley',
        texte: 'Compétition sur sable en plein air : chaleur, exposition prolongée et prise en charge des sportifs comme du public.',
        genre: 'sportif',
      },
      {
        nom: 'Festival de jazz',
        texte: 'Concerts en plein air à Juan-les-Pins, sur plusieurs soirées consécutives.',
        genre: 'culturel',
      },
      {
        nom: 'L’Humour à la Plage',
        texte: 'Spectacles en bord de mer : site ouvert, public nombreux et accès des secours à préserver.',
        genre: 'culturel',
      },
      {
        nom: 'Village de Noël',
        texte: 'Présence sur la durée, par temps froid, avec un public familial.',
        genre: 'populaire',
      },
      {
        nom: 'Feux d’artifice',
        texte: 'Rassemblements en bord de mer, avec les contraintes d’accès propres au littoral.',
        genre: 'festif',
      },
    ],
    alentours: ['Vallauris', 'Golfe-Juan', 'Biot'],
    distanceMinutes: 30,
  },
  {
    slug: 'saint-laurent-du-var',
    nom: 'Saint-Laurent-du-Var',
    article: 'à Saint-Laurent-du-Var',
    codePostal: '06700',
    contexte:
      'Aux portes de Nice, une commune où nous intervenons régulièrement sur les rencontres sportives en salle.',
    references: [
      {
        nom: 'Matchs de volley',
        texte: 'Compétitions en salle : poste fixe, prise en charge des joueurs comme du public.',
        genre: 'sportif',
      },
    ],
    alentours: ['Cagnes-sur-Mer', 'La Gaude', 'Saint-Jeannet'],
    distanceMinutes: 15,
  },
  {
    slug: 'cagnes-sur-mer',
    nom: 'Cagnes-sur-Mer',
    article: 'à Cagnes-sur-Mer',
    codePostal: '06800',
    contexte:
      'L’hippodrome de la Côte d’Azur y accueille des réunions qui rassemblent un large public sur un site étendu, où les distances comptent autant que les effectifs.',
    references: [
      {
        nom: 'Courses à l’hippodrome',
        texte: 'Réunions hippiques : site vaste, public dispersé, délais d’accès à anticiper.',
        genre: 'sportif',
      },
    ],
    alentours: ['Villeneuve-Loubet', 'Saint-Laurent-du-Var', 'La Gaude'],
    distanceMinutes: 20,
  },
  {
    slug: 'vence',
    nom: 'Vence',
    article: 'à Vence',
    codePostal: '06140',
    contexte:
      'Dans l’arrière-pays niçois, une ville où la saison culturelle rassemble un public nombreux sur des sites en plein air, loin des grands axes.',
    references: [
      {
        nom: 'Festival Les Nuits du Sud',
        texte: 'Concerts en plein air sur plusieurs soirées, avec un public dense en centre-ville et des accès contraints.',
        genre: 'culturel',
      },
    ],
    alentours: ['Saint-Paul-de-Vence', 'La Colle-sur-Loup', 'Tourrettes-sur-Loup'],
    distanceMinutes: 35,
  },
];

/** Trois références au plus, le reste compté : Google coupe vers 160 signes. */
export const resumeReferences = (v: Ville, max = 3) => {
  const noms = v.references.map((r) => r.nom);
  if (noms.length <= max) return noms.join(' · ');
  return `${noms.slice(0, max).join(' · ')} et ${noms.length - max} autres`;
};

export const parVille = (slug: string) => villes.find((v) => v.slug === slug);
