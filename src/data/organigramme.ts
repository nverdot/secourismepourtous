/**
 * Le bureau et les formateurs, tels que les porte le document interne 2026.
 *
 * D'OÙ VIENNENT CES DONNÉES. Des deux diapositives de l'association —
 * « Organigramme bureau SPT » et « Nos formateurs » — qui étaient jusqu'ici
 * affichées telles quelles, en JPEG. Du texte dans une image : muet pour un
 * lecteur d'écran, flou en zoom, absent des moteurs de recherche, et
 * impossible à corriger sans rouvrir la présentation. Seuls les visages
 * valaient d'être gardés ; ils sont découpés par outils/organigramme.py.
 *
 * ⚠️ CE QUE LA PAGE ANNONÇAIT ET QUI ÉTAIT FAUX. Le texte de la page disait
 * « dix-sept formateurs, dont six formateurs de formateurs » et en listait
 * dix-huit. Le document en porte vingt, dont cinq formateurs de formateurs.
 * Manquaient Salvatore Frigieri et Gabrielle Brunet-Vasseur ; Gilles Plasse y
 * figurait comme formateur de formateurs alors que le document le donne
 * formateur PSC/PSE. Les listes ci-dessous suivent le document, et les
 * effectifs sont comptés, plus écrits à la main.
 *
 * ⚠️ ORTHOGRAPHE DES NOMS. Le document et les questionnaires ne s'accordent
 * pas toujours — « Perez-Biorkman » ici, « Perez Björkman » là ; « Aurélia »
 * sur la diapositive, « Aurelia » dans sa propre réponse. On retient la forme
 * que la personne a elle-même écrite quand elle a répondu au questionnaire,
 * et celle du document sinon.
 */

export interface Poste {
  /** La fonction, telle qu'elle figure sur l'organigramme. */
  fonction: string;
  nom: string;
  photo: string;
  /** Slug du portrait, quand la personne a répondu au questionnaire. */
  portrait?: string;
}

/**
 * Trois niveaux, comme sur la diapositive : la direction, l'administration,
 * puis les pôles. Ce n'est pas une hiérarchie de pouvoir mais un partage des
 * responsabilités — d'où trois rangées et pas un arbre.
 */
export const bureau: { titre: string; postes: Poste[] }[] = [
  {
    titre: 'Direction',
    postes: [
      { fonction: 'Président', nom: 'Raphael Radier', photo: '/img/equipe/orga/raphael-radier.jpg', portrait: 'raphael-radier' },
      { fonction: 'Directrice', nom: 'Aurelia Tardivat', photo: '/img/equipe/orga/aurelia-tardivat.jpg', portrait: 'aurelia' },
    ],
  },
  {
    titre: 'Administration',
    postes: [
      { fonction: 'Secrétaire', nom: 'Jean-Michel Maillier', photo: '/img/equipe/orga/jean-michel-maillier.jpg' },
      { fonction: 'Trésorière', nom: 'Alexandra Boudon', photo: '/img/equipe/orga/alexandra-boudon.jpg' },
    ],
  },
  {
    titre: 'Les pôles',
    postes: [
      { fonction: 'Pôle dispositifs de secours', nom: 'Arthur Mollo', photo: '/img/equipe/orga/arthur-mollo.jpg' },
      { fonction: 'Pôle piscine', nom: 'Matteo Chenu', photo: '/img/equipe/orga/matteo-chenu.jpg' },
      { fonction: 'Pôle formation', nom: 'Annabell Perez Björkman', photo: '/img/equipe/orga/annabell-perez-bjorkman.jpg', portrait: 'annabell' },
    ],
  },
];

export interface Formateur {
  nom: string;
  photo: string;
  /** Qualification portée par le document, quand elle dépasse le PSC/PSE. */
  mention?: string;
  portrait?: string;
}

/** Ceux qui forment les formateurs. Le responsable ouvre la liste. */
export const formateursDeFormateurs: Formateur[] = [
  { nom: 'Annabell Perez Björkman', photo: '/img/equipe/orga/annabell-perez-bjorkman-f.jpg', mention: 'Responsable', portrait: 'annabell' },
  { nom: 'Guillaume Rizo', photo: '/img/equipe/orga/guillaume-rizo.jpg', portrait: 'guillaume' },
  { nom: 'Raphael Radier', photo: '/img/equipe/orga/raphael-radier-f.jpg', portrait: 'raphael-radier' },
  { nom: 'Matteo Chenu', photo: '/img/equipe/orga/matteo-chenu-f.jpg' },
  { nom: 'Alexia Pires', photo: '/img/equipe/orga/alexia-pires.jpg' },
];

/** Ceux qui enseignent le PSC et le PSE. */
export const formateursPscPse: Formateur[] = [
  { nom: 'Alexandra Boudon', photo: '/img/equipe/orga/alexandra-boudon-f.jpg' },
  { nom: 'Gilles Plasse', photo: '/img/equipe/orga/gilles-plasse.jpg' },
  { nom: 'Thibaut Patell', photo: '/img/equipe/orga/thibaut-patell.jpg' },
  { nom: 'Jean-Michel Maillier', photo: '/img/equipe/orga/jean-michel-maillier-f.jpg', mention: 'BNSSA' },
  { nom: 'Elliesse Maroudin', photo: '/img/equipe/orga/elliesse-maroudin.jpg' },
  { nom: 'Louis Rinaudo', photo: '/img/equipe/orga/louis-rinaudo.jpg' },
  { nom: 'Arthur Mollo', photo: '/img/equipe/orga/arthur-mollo-f.jpg' },
  { nom: 'Salvatore Frigieri', photo: '/img/equipe/orga/salvatore-frigieri.jpg' },
  { nom: 'Mathis Abreu', photo: '/img/equipe/orga/mathis-abreu.jpg' },
  { nom: 'Anthony Del Aguila', photo: '/img/equipe/orga/anthony-del-aguila.jpg', portrait: 'anthony' },
  { nom: 'Olivier Graglia', photo: '/img/equipe/orga/olivier-graglia.jpg' },
  { nom: 'Nicolas Verdot', photo: '/img/equipe/orga/nicolas-verdot.jpg' },
  { nom: 'Floriano Pintus', photo: '/img/equipe/orga/floriano-pintus.jpg' },
  { nom: 'Thibaut Lorenzetti', photo: '/img/equipe/orga/thibaut-lorenzetti.jpg', portrait: 'thibaut' },
  { nom: 'Gabrielle Brunet-Vasseur', photo: '/img/equipe/orga/gabrielle-brunet-vasseur.jpg' },
];

/** Comptés, jamais écrits à la main : c'est ainsi que l'écart s'était creusé. */
export const nombreFormateurs = formateursDeFormateurs.length + formateursPscPse.length;

import empreintes from './empreintes-organigramme.json';

/** Même mécanisme que pour les portraits : l'empreinte contourne le cache. */
export const versionnee = (chemin: string) => {
  const e = (empreintes as Record<string, string>)[chemin];
  return e ? `${chemin}?v=${e}` : chemin;
};
