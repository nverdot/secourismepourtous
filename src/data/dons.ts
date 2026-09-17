/**
 * La page de don, et ce qu'elle promet fiscalement.
 *
 * ⚠️ LE TAUX DE 66 % N'EST PAS UN ARGUMENT COMMERCIAL, C'EST UNE DÉCLARATION.
 *
 * Il vient de l'article 200 du code général des impôts, qui le réserve aux
 * organismes d'intérêt général. Une association qui délivre des reçus fiscaux
 * sans y avoir droit encourt l'amende de l'article 1740 A : 25 % des sommes
 * indûment mentionnées, et ses donateurs perdent leur réduction. Le rescrit
 * fiscal — demande écrite à la direction départementale des finances
 * publiques, réponse sous six mois, silence valant accord — est ce qui met
 * l'association à l'abri. Ne pas augmenter ce taux ni élargir ces mentions
 * sans cette réponse écrite.
 */

/**
 * Le formulaire HelloAsso.
 *
 * On y renvoie par un lien plutôt que d'intégrer leur cadre. L'intégration a
 * été essayée : leur pré-remplissage n'accepte que le montant et l'identité —
 * ni la fréquence, ni le jour de prélèvement. Un visiteur ayant simulé un don
 * mensuel arrivait donc sur un formulaire réglé sur « ponctuel », avec le bon
 * montant : il versait une fois ce qu'il croyait verser chaque mois.
 *
 * Vérifié aussi : aucun paramètre d'URL ne pré-remplit leur page. « ?amount=75 »
 * est ignoré. Inutile d'essayer de transporter la simulation dans le lien.
 */
export const helloasso = {
  page: 'https://www.helloasso.com/associations/secourisme-pour-tous/formulaires/2',
};

/** Ce que le don finance. Texte de l'association, corrigé, jamais reformulé. */
export const emplois = [
  {
    titre: 'Former gratuitement',
    texte:
      'Des jeunes, des familles et des personnes en situation de précarité aux gestes de premiers secours : PSC, initiation aux gestes qui sauvent.',
  },
  {
    titre: 'Équiper nos bénévoles',
    texte:
      'En matériel de secourisme : défibrillateurs et ECG, trousses de premiers secours, matériel de protection.',
  },
  {
    titre: 'Sensibiliser dans les écoles',
    texte:
      'Pour qu’une génération entière grandisse en sachant sauver une vie.',
  },
  {
    titre: 'Soutenir la population',
    texte:
      'Par nos équipes bénévoles en cas de crise majeure, comme la tempête Alex ou la crise sanitaire du Covid.',
  },
];

/**
 * Les paramètres du calcul, vérifiés le 27 août 2026 sur service-public.gouv.fr
 * et sur le BOFiP.
 *
 * ⚠️ Le taux dérogatoire de 75 % NE S'APPLIQUE PAS à l'association. Il vise
 * les organismes qui fournissent repas, soins ou logement aux personnes en
 * difficulté, et l'aide aux victimes de violences conjugales. L'inscrire ici
 * serait une fausse déclaration fiscale, pas une générosité de présentation.
 *
 * Ces valeurs sont modifiées par les lois de finances : les revérifier chaque
 * année, en janvier, avant la campagne de déclaration.
 */
export const fiscalite = {
  /** Article 200 du CGI — particuliers. */
  particulier: {
    taux: 0.66,
    /** Plafond : part du revenu imposable au-delà de laquelle on reporte. */
    plafondRevenu: 0.2,
    reportAns: 5,
    source: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F426',
    reference: 'Article 200 du code général des impôts',
  },
  /** Article 238 bis du CGI — mécénat d'entreprise. */
  entreprise: {
    taux: 0.6,
    /** Au-delà de 2 M€ de dons, la fraction supérieure tombe à 40 %. */
    seuilTauxReduit: 2_000_000,
    tauxReduit: 0.4,
    /** Plafond : le plus élevé des deux. */
    plafondFixe: 20_000,
    plafondChiffreAffaires: 0.005,
    reportAns: 5,
    source: 'https://www.economie.gouv.fr/entreprises/gerer-sa-fiscalite-et-ses-impots/limpot-sur-les-benefices-ir-et/mecenat-donnez-des-oeuvres-dinteret-general-et-obtenez-une-reduction',
    reference: 'Article 238 bis du code général des impôts',
  },
};

/**
 * Les paliers du curseur.
 *
 * ⚠️ LES MESSAGES NE CHIFFRENT AUCUNE ÉQUIVALENCE. Écrire « 20 € = une trousse
 * de premiers secours » engage l'association sur un prix qu'elle seule connaît,
 * et qu'un donateur peut vérifier. Tant que ces montants ne sont pas confirmés
 * par le bureau, les messages disent la portée du geste, pas son tarif.
 *
 * Le premier palier n'est pas un lot de consolation : il ouvre la série et il
 * est écrit pour être lu comme tel. Un don de 5 € qu'on fait sentir dérisoire
 * est un don qu'on ne refait pas.
 */
export interface Palier {
  montant: number;
  /** Ce que le curseur annonce à ce niveau. */
  message: string;
}

export const paliersPonctuel: Palier[] = [
  { montant: 20, message: 'Le premier euro compte autant que le dernier.' },
  { montant: 50, message: 'Vous équipez une équipe pour un dispositif.' },
  { montant: 100, message: 'Vous financez une place en formation offerte.' },
  { montant: 150, message: 'Vous formez toute une famille aux gestes qui sauvent.' },
  { montant: 200, message: 'Vous armez une équipe pour la saison.' },
  { montant: 250, message: 'Vous faites entrer le secourisme dans une classe.' },
];

export const paliersMensuel: Palier[] = [
  { montant: 5, message: 'Le premier euro compte autant que le dernier.' },
  { montant: 10, message: 'Chaque mois, du matériel qui repart en poste.' },
  { montant: 20, message: 'Chaque mois, une équipe qui reste équipée.' },
  { montant: 50, message: 'Chaque mois, une place en formation offerte.' },
  { montant: 100, message: 'Chaque mois, une classe sensibilisée.' },
  { montant: 150, message: 'Chaque mois, une part de nos actions gratuites assurée.' },
];
