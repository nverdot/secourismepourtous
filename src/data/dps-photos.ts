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
    fichier: '/img/dps/spectacle-de-drones.jpg',
    alt: "Deux secouristes de dos sur la Promenade des Anglais, face au spectacle de drones lumineux dessinant un cycliste dans le ciel de Nice.",
    legende: 'Spectacle de drones — Promenade des Anglais, Nice',
    largeur: 1500,
    hauteur: 2000,
  },
  {
    fichier: '/img/dps/tour-de-france-barrieres.jpg',
    alt: "Cinq secouristes en veste haute visibilité alignés derrière les barrières, dos au photographe, au départ d'une étape du Tour de France à Nice.",
    legende: 'Tour de France — départ d’étape, Nice',
    largeur: 2000,
    hauteur: 1500,
  },
  {
    fichier: '/img/dps/festival-de-jazz.jpg',
    alt: "Deux secouristes sac au dos au milieu du public, face à la scène éclairée d'un concert en plein air à Juan-les-Pins.",
    legende: 'Festival de jazz — Juan-les-Pins',
    largeur: 1200,
    hauteur: 1600,
  },
  {
    fichier: '/img/dps/marche-noel-nice.jpg',
    alt: "Trois secouristes de dos devant la grande roue et la pyramide de bois illuminée du marché de Noël, sous un ciel bleu.",
    legende: 'Marché de Noël — Nice',
    largeur: 1500,
    hauteur: 2000,
  },
  {
    fichier: '/img/dps/village-de-noel.jpg',
    alt: "Deux secouristes marchant sous les arches lumineuses d'un village de Noël, sac d'intervention et lot de brancardage à la main.",
    legende: 'Village de Noël — patrouille du soir',
    largeur: 1200,
    hauteur: 1600,
  },
  {
    fichier: '/img/dps/patrouille-promenade.jpg',
    alt: "Cinq secouristes en veste haute visibilité remontant la Promenade des Anglais au milieu des passants, la mer et les palmiers en arrière-plan.",
    legende: 'Patrouille sur la Promenade des Anglais, Nice',
    largeur: 2000,
    hauteur: 1500,
  },
  {
    fichier: '/img/dps/briefing-avant-poste.jpg',
    alt: "Une quinzaine de secouristes en cercle autour du chef de dispositif pour le briefing, devant la tente du poste de secours et le véhicule de premiers secours.",
    legende: 'Briefing d’équipe avant l’ouverture du poste',
    largeur: 1200,
    hauteur: 1600,
  },
  {
    fichier: '/img/dps/evacuation-brancard.jpg',
    alt: "Trois secouristes évacuant une victime sur un brancard le long d'une allée boisée, matériel d'intervention porté à la main.",
    legende: 'Évacuation d’une victime vers le point de rendez-vous',
    largeur: 1600,
    hauteur: 1066,
  },
  {
    fichier: '/img/dps/chef-de-dispositif.jpg',
    alt: "Un chef de dispositif de dos, gants aux mains, poussant un brancard vers l'ambulance des sapeurs-pompiers stationnée près du public.",
    legende: 'Passage de relais aux secours publics',
    largeur: 1280,
    hauteur: 995,
  },
  {
    fichier: '/img/dps/secours-nautique-nuit.jpg',
    alt: "Trois sauveteurs en combinaison de sauvetage debout dans un bateau semi-rigide amarré de nuit, sacs de secours et casques à bord.",
    legende: 'Dispositif nautique — surveillance de nuit',
    largeur: 1200,
    hauteur: 1600,
  },
  {
    fichier: '/img/dps/col-de-montagne.jpg',
    alt: "Trois secouristes de dos face à un col de montagne, à côté du véhicule de premiers secours à personnes de la FFSS 06.",
    legende: 'Course en montagne — dispositif en altitude',
    largeur: 1500,
    hauteur: 2000,
  },
  {
    fichier: '/img/dps/dispositif-en-station.jpg',
    alt: "Un chef d'équipe de dos, sac d'intervention au dos, sous la neige devant la terrasse bondée d'un restaurant d'altitude.",
    legende: 'Dispositif en station, sous la neige',
    largeur: 1500,
    hauteur: 2000,
  },
  {
    fichier: '/img/dps/feu-artifice-equipe.jpg',
    alt: "Une équipe de secouristes alignée dos au feu d'artifice, à côté du véhicule de premiers secours FFSS 06 sur le front de mer.",
    legende: 'Feu d’artifice — dispositif sur le front de mer',
    largeur: 2000,
    hauteur: 1500,
  },
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
