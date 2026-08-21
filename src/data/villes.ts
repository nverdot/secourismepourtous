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
      {
        nom: 'Bull Padel Show',
        texte: 'Tournoi de padel : public compact autour des courts, rotations rapides entre les matchs.',
        genre: 'sportif',
      },
      {
        nom: 'Fête de la musique',
        texte: 'Scènes dispersées dans la ville, public mobile toute la soirée : plusieurs équipes en itinérance.',
        genre: 'festif',
      },
      {
        nom: 'Nouvel An',
        texte: 'Rassemblement du 1er janvier : forte affluence nocturne et prises en charge liées aux excès de la nuit.',
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
      'Aux portes de Nice, une commune dont la saison se concentre sur le front de mer, autour du Beach Sport Festival et de ses publics familiaux.',
    references: [
      {
        nom: 'Tournoi de beach-volley',
        texte: 'Compétition sur sable : chaleur, déshydratation et traumatismes d’appui, avec un public installé tout autour des terrains.',
        genre: 'sportif',
      },
      {
        nom: 'Tournoi de basket 3×3',
        texte: 'Rencontres enchaînées sur plusieurs terrains : blessures de contact fréquentes et rotations serrées.',
        genre: 'sportif',
      },
      {
        nom: 'Concerts du Beach Sport Festival',
        texte: 'Soirées en plein air : public dense devant la scène, dispositif renforcé en fin de programmation.',
        genre: 'culturel',
      },
      {
        nom: 'Kid’s Day',
        texte: 'Journée familiale : beaucoup d’enfants, donc des prises en charge pédiatriques et des rapprochements de familles.',
        genre: 'populaire',
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
      'Une commune où la saison culturelle et les épreuves sportives se succèdent, du centre-ville aux installations scolaires.',
    references: [
      {
        nom: 'Soirées Renoir',
        texte: 'Rendez-vous culturels en plein air : public assis mais nombreux, accès à préserver pour les secours.',
        genre: 'culturel',
      },
      {
        nom: 'Soirées place Charles-de-Gaulle',
        texte: 'Animations en centre-ville : affluence dense sur un espace contraint, circulation à contourner.',
        genre: 'festif',
      },
      {
        nom: 'Épreuves du baccalauréat',
        texte: 'Épreuves sportives scolaires : effort maximal chez des jeunes, malaises et traumatismes d’effort.',
        genre: 'sportif',
      },
      {
        nom: 'Courses sur route',
        texte: 'Parcours étendu : postes échelonnés et équipes mobiles pour couvrir toute la distance.',
        genre: 'sportif',
      },
    ],
    alentours: ['Villeneuve-Loubet', 'Saint-Laurent-du-Var', 'La Gaude'],
    distanceMinutes: 20,
  },
];

/** Trois références au plus, le reste compté : Google coupe vers 160 signes. */
export const resumeReferences = (v: Ville, max = 3) => {
  const noms = v.references.map((r) => r.nom);
  if (noms.length <= max) return noms.join(' · ');
  return `${noms.slice(0, max).join(' · ')} et ${noms.length - max} autres`;
};

export const parVille = (slug: string) => villes.find((v) => v.slug === slug);
