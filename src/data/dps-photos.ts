/**
 * Photos de dispositifs, affichées en carrousel sur /postes-de-secours.
 *
 * POUR AJOUTER UNE PHOTO : déposer le fichier dans public/img/dps/ et ajouter
 * une entrée ici. Le carrousel s'adapte tout seul au nombre d'images ; avec une
 * seule, il se comporte comme une photo simple.
 *
 * Le texte alternatif décrit la scène pour qui ne voit pas l'image : il sert
 * l'accessibilité et le référencement, ce n'est pas une redite de la légende.
 */

export interface PhotoDps {
  fichier: string;
  /** Description de la scène, pour les lecteurs d'écran. */
  alt: string;
  /** Légende visible : l'événement et le lieu. */
  legende: string;
  largeur: number;
  hauteur: number;
}

export const photosDps: PhotoDps[] = [
  {
    fichier: '/img/dps/feu-artifice.jpg',
    alt: "Une équipe de secouristes FFSS alignée face au public pendant un feu d'artifice, à côté du véhicule de premiers secours FFSS 06.",
    legende: 'Feu d’artifice — surveillance du public',
    largeur: 2000,
    hauteur: 1500,
  },
  {
    fichier: '/img/dps/vpsp-coucher-soleil.jpg',
    alt: "Deux secouristes de dos, sac d'intervention au dos, marchant le long du véhicule de premiers secours FFSS 06 sur le front de mer au coucher du soleil.",
    legende: 'Fin de dispositif sur le front de mer',
    largeur: 1013,
    hauteur: 1800,
  },
  {
    fichier: '/img/dps/tour-de-france-massena.jpg',
    alt: "Trois secouristes de Secourisme Pour Tous en tenue FFSS, de dos derrière les barrières, face au passage des coureuses place Masséna à Nice.",
    legende: 'Tour de France Femmes 2026 — place Masséna, Nice',
    largeur: 1800,
    hauteur: 3200,
  },
  {
    fichier: '/img/dps/chefs-de-poste.jpg',
    alt: "Un chef de poste et un chef de dispositif, de dos en chasuble jaune FFSS, observant le départ d'une épreuve cycliste place Masséna à Nice.",
    legende: 'Chef de poste et chef de dispositif — Tour de France Femmes 2026',
    largeur: 900,
    hauteur: 1600,
  },
  {
    fichier: '/img/dps/tour-de-france-poste.jpg',
    alt: "Quatre vues du poste de secours du Tour de France Femmes 2026 à Nice : chefs de poste, préparation du matériel, sacs d'intervention et tente du poste de secours.",
    legende: 'Montage du poste et prise de consignes — Tour de France Femmes 2026',
    largeur: 1152,
    hauteur: 2048,
  },
];
