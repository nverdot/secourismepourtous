/**
 * Combien de temps un diplôme de secourisme reste-t-il valable.
 *
 * POURQUOI CES DONNÉES EXISTENT. L'association vend sept formations continues
 * et ne répondait nulle part à la question qui précède l'achat. Mesuré sur les
 * pages produites avant cette page : « valable » n'apparaissait sur aucune,
 * « recycler » non plus, « validité » sur trois.
 *
 * CE QUI EST SOURCÉ ET CE QUI NE L'EST PAS. Les obligations réglementaires
 * portent un lien vers le texte. La périodicité conseillée pour le PSC est une
 * position de l'association, pas une règle : elle est présentée comme telle.
 * Des sites annoncent une recommandation officielle « tous les 24 à 36 mois » ;
 * faute de l'avoir trouvée dans un texte, elle ne figure pas ici.
 *
 * LA DISTINCTION QUI COMPTE. On ne perd pas un diplôme : on perd le droit de
 * s'en servir. C'est la confusion la plus fréquente, et la page la traite en
 * premier.
 */

export interface Regle {
  sigle: string;
  nom: string;
  /** Ce qu'il faut répondre en une ligne. */
  periodicite: string;
  /** Vrai quand un texte l'impose, faux quand c'est une recommandation. */
  obligatoire: boolean;
  /** Ce qui se passe concrètement si on laisse passer. */
  consequence: string;
  /** Slug de la formation continue correspondante. */
  fc?: string;
  source?: { texte: string; url: string };
}

export const regles: Regle[] = [
  {
    sigle: 'PSC',
    nom: 'Premiers Secours Citoyen — ex-PSC1',
    periodicite: 'Aucune durée réglementaire',
    obligatoire: false,
    consequence:
      'Votre attestation reste valable indéfiniment : aucun texte ne la fait expirer, et personne ne peut vous la refuser au motif qu’elle est ancienne. Ce qui se périme, ce sont les gestes — les recommandations changent, et ce qu’on ne refait jamais ne revient pas au moment voulu.',
    fc: 'fc-psc',
  },
  {
    sigle: 'PSE1',
    nom: 'Premiers Secours en Équipe niveau 1',
    periodicite: 'Tous les ans',
    obligatoire: true,
    consequence:
      'Sans formation continue annuelle, vous ne pouvez plus être engagé sur un dispositif de secours. Le certificat ne disparaît pas : c’est le droit d’intervenir qui s’arrête, et il revient dès la formation continue suivie.',
    fc: 'fc-pse-1',
    source: {
      texte: 'Arrêté du 15 juin 2024 relatif à la filière opérationnelle de sécurité civile',
      url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049891761',
    },
  },
  {
    sigle: 'PSE2',
    nom: 'Premiers Secours en Équipe niveau 2',
    periodicite: 'Tous les ans',
    obligatoire: true,
    consequence:
      'Même règle que le PSE1, et elle pèse plus lourd depuis la réforme du sauvetage aquatique : c’est la formation continue de PSE2 qui conditionne désormais l’employabilité d’un surveillant sauveteur.',
    fc: 'fc-pse-2',
    source: {
      texte: 'Arrêté du 15 juin 2024 relatif à la filière opérationnelle de sécurité civile',
      url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049891761',
    },
  },
  {
    sigle: 'SST',
    nom: 'Sauveteur Secouriste du Travail',
    periodicite: 'Tous les 24 mois',
    obligatoire: true,
    consequence:
      'Le maintien et l’actualisation des compétences — le MAC SST — se repasse tous les deux ans. Passé ce délai, l’employeur ne peut plus vous compter parmi ses sauveteurs secouristes du travail.',
    fc: 'mac-sst',
  },
  {
    sigle: 'SSA',
    nom: 'Surveillant Sauveteur Aquatique — ex-BNSSA',
    periodicite: 'Formation continue annuelle de PSE2',
    obligatoire: true,
    consequence:
      'La règle vient de changer. Le BNSSA se révisait tous les cinq ans ; l’employabilité du SSA tient désormais à la formation continue annuelle d’équipier secouriste. Les titulaires du BNSSA ont jusqu’au 1er octobre 2029 pour obtenir l’équivalence.',
    fc: 'fc-bnssa',
    source: {
      texte: 'Arrêté du 29 juillet 2026 modifiant divers arrêtés relatifs aux filières de sécurité civile',
      url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054594151',
    },
  },
  {
    sigle: 'PAE',
    nom: 'Pédagogie Appliquée à l’Emploi de formateur',
    periodicite: 'Tous les ans',
    obligatoire: true,
    consequence:
      'Un formateur doit suivre sa formation continue annuelle pour continuer d’enseigner. C’est ce qui garantit que ce qu’il transmet correspond aux recommandations en vigueur.',
    fc: 'fc-pae-f-psc',
  },
];

/**
 * La confusion à lever avant tout le reste.
 *
 * Elle revient dans presque tous les appels : les gens croient que leur
 * diplôme « expire » et qu'il faudra tout repasser. C'est faux, et c'est ce
 * qui les fait attendre au lieu de venir une journée.
 */
export const malentendu = {
  titre: 'On ne perd pas son diplôme',
  texte: [
    'Un certificat de secourisme ne s’annule pas. Ce qui s’arrête, quand la formation continue n’est pas suivie, c’est le droit de s’en servir : intervenir sur un poste de secours, être compté comme sauveteur du travail, surveiller un bassin.',
    'La conséquence pratique est bonne : il n’y a jamais à tout repasser. Une journée de formation continue suffit à vous remettre à jour, même après plusieurs années d’interruption.',
  ],
};
