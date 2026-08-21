/**
 * Questions fréquentes, par contexte.
 *
 * Elles ne sont pas décoratives : balisées en FAQPage, elles peuvent devenir la
 * réponse directe affichée par Google. Deux conséquences pratiques.
 *
 * D'abord, chaque réponse doit être exacte : elle sera lue hors de son contexte,
 * sans la page autour pour la nuancer. Ensuite, elle doit être courte et se
 * suffire à elle-même — pas de « voir ci-dessus », pas de « comme indiqué ».
 *
 * ⚠️ À FAIRE VÉRIFIER PAR SPT, les réponses marquées d'un commentaire À VÉRIFIER
 * reposent sur une pratique courante du secteur et non sur une information
 * confirmée par l'association.
 */

export interface QR {
  question: string;
  reponse: string;
}

/** Catalogue des formations : ce qu'on se demande avant de choisir. */
export const faqFormations: QR[] = [
  {
    question: 'Quelle formation choisir quand on n’a jamais rien fait ?',
    reponse:
      'Le PSC (anciennement PSC1) est la porte d’entrée : 7 heures sur une journée, dès 10 ans, sans aucun prérequis, pour 50 €. Il apprend les gestes qui sauvent au quotidien. Le PSE1 vient ensuite, pour qui veut intervenir en équipe sur des postes de secours.',
  },
  {
    question: 'Le PSC est-il éligible au CPF ?',
    reponse:
      'Non, le PSC n’est pas éligible au compte personnel de formation. Pour les autres formations, l’éligibilité dépend du certificateur et de votre situation : contactez-nous, nous vérifions votre cas avant que vous n’engagiez quoi que ce soit.',
  },
  {
    question: 'Faut-il savoir nager pour se former au secourisme ?',
    reponse:
      'Non pour le PSC, le PSE1, le PSE2 et le SST, qui ne comportent aucune épreuve aquatique. Oui pour le BNSSA et le BSB, qui sont des diplômes de sauvetage aquatique et exigent un niveau de nage attesté.',
  },
  {
    question: 'Combien de temps mon diplôme reste-t-il valide ?',
    reponse:
      'Le PSE1 et le PSE2 imposent une formation continue annuelle pour rester opérationnel en poste de secours. Le SST se maintient par un MAC tous les 24 mois. Le PSC n’expire pas, mais une remise à niveau est vivement conseillée : les gestes s’oublient.',
  },
  {
    question: 'Mon employeur peut-il financer ma formation ?',
    reponse:
      'Oui. Selon votre situation, la prise en charge peut venir de l’OPCO de votre branche, du plan de développement des compétences de votre employeur, ou de France Travail. Notre formulaire de financement recueille d’emblée les éléments nécessaires à la convention.',
  },
  {
    question: 'Je suis en situation de handicap, puis-je me former ?',
    reponse:
      'Oui. Chaque besoin est étudié en amont et un dispositif adapté est mis en place. Exposez-nous votre situation avant l’inscription : notre référente handicap vous rappelle pour préparer votre accueil.',
  },
  {
    question: 'Que se passe-t-il si je ne peux pas venir le jour J ?',
    reponse:
      'Prévenez-nous dès que possible : nous cherchons à vous reporter sur une session ultérieure. Les conditions d’annulation et de report figurent dans nos conditions générales de vente, disponibles sur ce site.',
  },
  {
    question: 'Où se déroulent les formations ?',
    reponse:
      'Dans nos locaux, au 31 boulevard Impératrice Eugénie à Nice, sauf mention contraire sur votre convocation. Pour un groupe constitué, nous pouvons intervenir dans vos propres locaux dans les Alpes-Maritimes.',
  },
];

/** Postes de secours : ce que demande un organisateur d'événement. */
export const faqDps: QR[] = [
  {
    question: 'Combien de secouristes faut-il pour mon événement ?',
    reponse:
      'Le nombre est fixé par le référentiel national des dispositifs prévisionnels de secours, à partir d’un calcul qui croise l’affluence attendue, la nature de la manifestation, l’environnement et les délais d’accès des secours publics. Nous réalisons cette évaluation gratuitement à partir de la description de votre événement.',
  },
  {
    question: 'Combien de temps à l’avance faut-il réserver ?',
    reponse:
      'Le plus tôt possible : le dossier de déclaration en préfecture ou en mairie réclame la convention du dispositif, et les équipes se constituent à l’avance. Pour un grand rassemblement, comptez plusieurs semaines. Pour un événement modeste, un délai plus court reste souvent possible — appelez-nous.',
  },
  {
    question: 'Combien coûte un poste de secours ?',
    reponse:
      'Il n’y a pas de tarif unique : le coût dépend du nombre de secouristes, de la durée, du matériel engagé et des moyens de transport nécessaires. Décrivez-nous votre événement, nous établissons un devis gratuit.',
  },
  {
    question: 'Quand un poste de secours est-il obligatoire ?',
    reponse:
      'Cela dépend de la nature et de l’ampleur de votre manifestation. L’autorité administrative — mairie ou préfecture — peut l’exiger au titre de la sécurité du public. En cas de doute, notre évaluation vous dit ce que le référentiel impose dans votre cas.',
  },
  {
    question: 'Intervenez-vous en dehors de Nice ?',
    reponse:
      'Oui, sur tout le département des Alpes-Maritimes. Nous intervenons régulièrement à Antibes et Juan-les-Pins, à Cagnes-sur-Mer, à Saint-Laurent-du-Var, et jusqu’en moyenne montagne.',
  },
  {
    question: 'Vos secouristes sont-ils diplômés ?',
    reponse:
      'Oui. Tous nos équipiers sont titulaires au minimum du PSE1, les chefs d’équipe du PSE2, et leurs formations continues annuelles sont à jour. L’association est affiliée à la Fédération Française de Sauvetage et de Secourisme et titulaire d’un agrément de sécurité civile.',
  },
  {
    question: 'Que se passe-t-il en cas d’urgence vitale sur place ?',
    reponse:
      'Nos équipes prennent en charge la victime immédiatement et alertent le SAMU. Le dispositif prévisionnel n’a pas vocation à remplacer les secours publics : il les précède, stabilise la situation, et prépare le relais.',
  },
];

/** Financement : les questions qui bloquent une inscription. */
export const faqFinancement: QR[] = [
  {
    question: 'Puis-je payer en ligne avec une prise en charge OPCO ?',
    reponse:
      'Non. Le paiement en ligne concerne les inscriptions individuelles réglées directement. Pour une prise en charge par un OPCO, un employeur ou Chorus Pro, passez par notre formulaire de financement : nous établissons la convention et la facturation suit le circuit du financeur.',
  },
  {
    question: 'Quels documents devez-vous me fournir pour mon financeur ?',
    reponse:
      'Une convention de formation, un programme détaillé, notre certificat Qualiopi et, à l’issue, une attestation de présence et un certificat de réalisation. Ces pièces sont établies dès que votre dossier est complet.',
  },
  {
    question: 'Pourquoi me demandez-vous ma date et mon lieu de naissance ?',
    reponse:
      'Parce que les certificateurs les exigent pour enregistrer votre diplôme : deux personnes peuvent porter le même nom. Ces informations ne servent qu’à cela et ne sont transmises à personne d’autre.',
  },
  {
    question: 'Le tarif CPF est-il plus élevé que le tarif direct. Pourquoi ?',
    reponse:
      'Le passage par le compte personnel de formation impose des obligations administratives et des frais de plateforme qui ne s’appliquent pas à une inscription directe. Les deux tarifs sont affichés côte à côte sur chaque page de formation, sans surprise.',
  },
];

/** Bénévolat : les questions d'un futur secouriste actif. */
export const faqBenevolat: QR[] = [
  {
    question: 'Faut-il un diplôme pour devenir secouriste actif ?',
    reponse:
      'Oui, le PSE1 est le seul prérequis obligatoire. Il est accessible dès 16 ans. Si vous ne l’avez pas encore, nous vous formons et cherchons avec vous une solution de financement ou de conventionnement.',
  },
  {
    question: 'Combien de temps faut-il donner ?',
    reponse:
      'Aucun quota. Vous vous positionnez sur les postes qui vous conviennent, quand vous le pouvez, via l’agenda partagé de l’association. Certains bénévoles font un dispositif par mois, d’autres bien davantage.',
  },
  {
    question: 'Faut-il acheter une tenue ?',
    reponse:
      'Non, une tenue FFSS complète vous est prêtée par l’association.',
  },
  {
    question: 'Mes formations continues sont-elles à ma charge ?',
    reponse:
      'Non. Vos recyclages annuels sont réalisés au sein de l’association, ce qui maintient votre diplôme valide sans démarche ni frais de votre côté.',
  },
];
