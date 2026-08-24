/**
 * La réforme du BNSSA, devenu SSA.
 *
 * SOURCE UNIQUE. L'arrêté du 29 juillet 2026, lu sur Légifrance. Tout ce qui
 * figure ici en vient, et rien d'autre : sur un sujet où une erreur ferait
 * croire à quelqu'un que son diplôme est caduc — ou qu'il ne l'est pas —, on
 * ne reprend pas ce que racontent les sites d'organismes de formation.
 *
 * CE QU'ON N'ÉCRIT PAS, FAUTE DE SOURCE SÛRE. Plusieurs organismes annoncent
 * une formation de 35 heures ouverte dès 17 ans. Ces chiffres ne sont pas
 * vérifiés dans le texte : ils ne figurent pas ici. La fiche de formation
 * portera les nôtres, quand ils seront arrêtés.
 *
 * ⚠️ À FAIRE VALIDER PAR SPT AVANT MISE EN LIGNE. L'association est un
 * organisme habilité : ce qu'elle publie sur une réglementation engage sa
 * crédibilité, et des lecteurs prendront des décisions là-dessus.
 */

export const arrete = {
  titre: 'Arrêté du 29 juillet 2026 modifiant divers arrêtés relatifs aux filières de sécurité civile',
  nor: 'INTE2619852A',
  publication: 'JORF n° 0178 du 1er août 2026',
  url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054594151',
  entreeEnVigueur: '1er octobre 2026',
  /** Fin du délai d'équivalence : trois ans après l'entrée en vigueur. */
  finEquivalence: '1er octobre 2029',
};

export interface Point {
  titre: string;
  texte: string[];
  /** Citation littérale de l'arrêté, quand elle vaut mieux qu'une reformulation. */
  citation?: string;
}

/** Ce que le texte change, dans l'ordre où ça intéresse un lecteur. */
export const changements: Point[] = [
  {
    titre: 'Le nom change, partout',
    texte: [
      'Le brevet national de sécurité et de sauvetage aquatique laisse la place au certificat de compétences de surveillant sauveteur aquatique. Le sigle SSA remplace le sigle BNSSA dans l’ensemble des textes réglementaires.',
      'Les deux arrêtés qui régissaient le BNSSA depuis 1979 sont abrogés.',
    ],
    citation:
      'Les mots : certificat de compétences de surveillant sauveteur aquatique (SSA) se substituent aux mots : brevet national de sécurité et sauvetage aquatique et BNSSA dans tous les textes réglementaires.',
  },
  {
    titre: 'Le PSE2 devient la référence',
    texte: [
      'C’est le vrai changement, et il ne tient pas au nom. Le BNSSA se présentait avec le PSE1. L’équivalence vers le SSA demande le PSE2 — le secours en équipe, à deux niveaux au-dessus du seul sauvetage.',
      'L’employabilité comme surveillant sauveteur est ensuite conditionnée à la formation continue annuelle d’équipier secouriste PSE2. Ce n’est plus une formalité de recyclage : c’est ce qui permet de travailler.',
    ],
  },
  {
    titre: 'Les organismes ont six mois',
    texte: [
      'Les organismes agréés pour le BNSSA disposent de six mois à compter de l’entrée en vigueur pour demander leur habilitation SSA. Passé ce délai, les agréments antérieurs sont réputés caducs.',
      'Ils peuvent mettre en œuvre le SSA dès le dépôt de leur demande, sans attendre la réponse.',
    ],
  },
];

/** Les deux situations dans lesquelles se trouve un lecteur. */
export const situations = [
  {
    titre: 'Vous avez déjà le BNSSA',
    accroche: 'Votre diplôme ne disparaît pas, mais l’équivalence se mérite.',
    etapes: [
      'Être titulaire du certificat de compétences d’équipier secouriste (PSE2). Si vous n’avez que le PSE1, c’est l’étape qui manque.',
      'Suivre une formation continue d’adaptation au SSA, dans les trois ans suivant l’entrée en vigueur — soit avant le 1er octobre 2029.',
      'Tenir ensuite à jour votre formation continue annuelle de PSE2, dont dépend votre employabilité.',
    ],
    lien: { texte: 'Voir la formation PSE2', url: '/formations/pse-2' },
  },
  {
    titre: 'Vous voulez passer le diplôme',
    accroche: 'Ce n’est plus le BNSSA que vous passerez, c’est le SSA.',
    etapes: [
      'Le contenu du sauvetage aquatique ne change pas : c’est le cadre réglementaire et le niveau de secourisme exigé qui évoluent.',
      'Les sessions ouvertes après le 1er octobre 2026 relèvent du SSA.',
      'Écrivez-nous pour connaître les dates, le tarif et les prérequis exacts de la prochaine session.',
    ],
    lien: { texte: 'Nous écrire', url: '/contact' },
  },
];
