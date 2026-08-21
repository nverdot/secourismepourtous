/**
 * Comment rejoindre nos formations depuis le département.
 *
 * POURQUOI CETTE PAGE EXISTE.
 *
 * Les gens cherchent « formation secourisme Cannes », « PSC1 Antibes ». On
 * pourrait fabriquer une page par commune — c'est ce que font beaucoup
 * d'organismes. Ce serait mentir : nos sessions ont lieu à Nice, et Google
 * appelle ça une page-passerelle. Il les déclasse, et il a raison.
 *
 * On répond donc à la vraie question — « comment j'y vais depuis chez moi ? » —
 * et on annonce ce qui est authentiquement local : pour un groupe, c'est nous
 * qui nous déplaçons.
 *
 * ⚠️ RÈGLE SUR LES DURÉES. La ligne de transport est un fait vérifiable et
 * stable. La durée ne l'est pas : elle dépend de l'heure, du jour et des
 * travaux. Elle est donc donnée comme un ordre de grandeur, annoncée comme
 * tel, et chaque fiche renvoie au calculateur d'itinéraire officiel. Mieux
 * vaut un « environ 35 minutes » assumé qu'un horaire faux qui fait rater
 * une formation.
 */

export interface Acces {
  commune: string;
  /** Code postal principal, tapé tel quel dans les recherches. */
  codePostal: string;
  moyen: 'train' | 'bus' | 'voiture';
  /** Ligne ou axe emprunté — l'information stable. */
  ligne: string;
  /** Ordre de grandeur, jamais un horaire. */
  duree: string;
  /** Ce qu'il faut savoir en plus, quand ça change la décision. */
  note?: string;
}

export const acces: Acces[] = [
  {
    commune: 'Saint-Laurent-du-Var',
    codePostal: '06700',
    moyen: 'train',
    ligne: 'TER ligne Cannes – Vintimille',
    duree: 'environ 10 minutes',
    note: 'La gare la plus proche de Nice sur la ligne : plusieurs trains par heure aux heures ouvrées.',
  },
  {
    commune: 'Cagnes-sur-Mer',
    codePostal: '06800',
    moyen: 'train',
    ligne: 'TER ligne Cannes – Vintimille',
    duree: 'environ 15 minutes',
  },
  {
    commune: 'Villeneuve-Loubet',
    codePostal: '06270',
    moyen: 'train',
    ligne: 'TER ligne Cannes – Vintimille',
    duree: 'environ 20 minutes',
    note: 'Depuis la gare de Villeneuve-Loubet-Plage.',
  },
  {
    commune: 'Antibes',
    codePostal: '06600',
    moyen: 'train',
    ligne: 'TER ligne Cannes – Vintimille',
    duree: 'environ 25 minutes',
    note: 'Desserte dense toute la journée, y compris le samedi.',
  },
  {
    commune: 'Juan-les-Pins',
    codePostal: '06160',
    moyen: 'train',
    ligne: 'TER ligne Cannes – Vintimille',
    duree: 'environ 30 minutes',
  },
  {
    commune: 'Cannes',
    codePostal: '06400',
    moyen: 'train',
    ligne: 'TER ligne Cannes – Vintimille',
    duree: 'environ 35 minutes',
    note: 'Le trajet le plus simple depuis l’ouest du département : direct, sans changement.',
  },
  {
    commune: 'Menton',
    codePostal: '06500',
    moyen: 'train',
    ligne: 'TER ligne Vintimille – Cannes',
    duree: 'environ 35 minutes',
    note: 'Direct depuis Menton, en passant par Monaco.',
  },
  {
    commune: 'Monaco',
    codePostal: '98000',
    moyen: 'train',
    ligne: 'TER ligne Vintimille – Cannes',
    duree: 'environ 20 minutes',
  },
  {
    commune: 'Grasse',
    codePostal: '06130',
    moyen: 'train',
    ligne: 'TER Grasse – Cannes puis Cannes – Nice',
    duree: 'environ 1 h 10',
    note: 'Un changement à Cannes. Pour un groupe, la formation sur place est souvent plus simple.',
  },
  {
    commune: 'Sophia Antipolis',
    codePostal: '06560',
    moyen: 'bus',
    ligne: 'Lignes d’Azur, correspondance à Antibes',
    duree: 'environ 50 minutes',
    note: 'Beaucoup d’entreprises de la technopole préfèrent une session organisée dans leurs locaux.',
  },
  {
    commune: 'Carros',
    codePostal: '06510',
    moyen: 'bus',
    ligne: 'Lignes d’Azur depuis Nice',
    duree: 'environ 45 minutes',
  },
  {
    commune: 'Vence',
    codePostal: '06140',
    moyen: 'bus',
    ligne: 'Lignes d’Azur depuis Nice',
    duree: 'environ 50 minutes',
  },
];

/** Calculateur d'itinéraire officiel, pour que chacun vérifie ses horaires. */
export const itineraire = {
  train: 'https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur',
  bus: 'https://www.lignesdazur.com/fr/itineraires',
};

/** Les durées ont été estimées à cette date, à partir des horaires courants. */
export const estimeLe = '21 août 2026';
