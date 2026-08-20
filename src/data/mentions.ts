/**
 * Contenu des pages légales : mentions et politique de confidentialité.
 *
 * Le texte vit ici plutôt que dans les pages pour deux raisons : il change
 * rarement mais doit changer d'un bloc quand il change (un sous-traitant qui
 * part, une durée qui bouge), et le mettre à plat rend visible ce qui manque.
 *
 * ⚠️ À FAIRE VÉRIFIER PAR SPT avant de considérer ces pages comme définitives :
 *   — le numéro de déclaration d'activité d'organisme de formation (DREETS),
 *     absent ici faute d'information ;
 *   — l'existence ou non d'un délégué à la protection des données ;
 *   — les durées de conservation, alignées sur la pratique réelle.
 * Ce sont des mentions engageantes : mieux vaut une ligne absente qu'une ligne
 * fausse.
 */

export interface Bloc {
  titre: string;
  paragraphes?: string[];
  liste?: string[];
  tableau?: { entete: string[]; lignes: string[][] };
}

export const mentionsLegales: Bloc[] = [
  {
    titre: 'Éditeur du site',
    paragraphes: [
      'Le présent site est édité par l’association Secourisme Pour Tous, association régie par la loi du 1er juillet 1901, déclarée sous le numéro RNA W061000773.',
      'Siège social : 31 Boulevard Impératrice Eugénie, 06200 Nice, France.',
      'Téléphone : 06 65 23 12 72 — Courriel : secourismepourtous@gmail.com',
    ],
  },
  {
    titre: 'Direction de la publication',
    paragraphes: [
      'Directeur de la publication : Raphaël Radier, en qualité de président de l’association.',
      'Direction de l’association : Aurélia Tardivat.',
    ],
  },
  {
    titre: 'Organisme de formation',
    paragraphes: [
      'Secourisme Pour Tous est certifiée Qualiopi au titre de la catégorie « actions de formation », sous le certificat n° QUA009665, valide jusqu’au 29 novembre 2027. Le certificat est consultable et téléchargeable depuis ce site.',
      'L’association est affiliée à la Fédération Française de Sauvetage et de Secourisme (FFSS) et titulaire d’un agrément de sécurité civile pour les dispositifs prévisionnels de secours.',
    ],
  },
  {
    titre: 'Hébergement',
    paragraphes: [
      'Le site est hébergé par Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis — netlify.com.',
      'La billetterie, le paiement en ligne et la gestion des contacts s’appuient sur Wix.com Ltd., 40 Namal Tel Aviv St., Tel Aviv 6350671, Israël — wix.com.',
    ],
  },
  {
    titre: 'Propriété intellectuelle',
    paragraphes: [
      'L’ensemble des contenus de ce site — textes, photographies, vidéos, mise en page — est la propriété de Secourisme Pour Tous, sauf mention contraire. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite.',
      'Les logos de la Fédération Française de Sauvetage et de Secourisme, de Qualiopi et des collectivités partenaires demeurent la propriété de leurs titulaires respectifs et sont reproduits avec leur accord.',
      'Les photographies publiées représentent des bénévoles et des stagiaires de l’association. Toute personne figurant sur une image et souhaitant son retrait peut en faire la demande à secourismepourtous@gmail.com : elle sera retirée sans délai.',
    ],
  },
  {
    titre: 'Responsabilité',
    paragraphes: [
      'Les informations publiées sur ce site sont données à titre indicatif. Les dates, tarifs et modalités de formation peuvent évoluer ; seuls les documents contractuels remis lors de l’inscription font foi.',
      'L’association ne saurait être tenue responsable du contenu des sites tiers vers lesquels ce site renvoie par un lien hypertexte.',
    ],
  },
  {
    titre: 'Signaler un problème',
    paragraphes: [
      'Une information erronée, un lien mort, un contenu à retirer : écrivez à secourismepourtous@gmail.com. Nous répondons sous 48 heures ouvrées.',
    ],
  },
];

export const confidentialite: Bloc[] = [
  {
    titre: 'Qui traite vos données',
    paragraphes: [
      'Le responsable du traitement est l’association Secourisme Pour Tous, 31 Boulevard Impératrice Eugénie, 06200 Nice, RNA W061000773.',
      'Pour toute question relative à vos données personnelles, écrivez à secourismepourtous@gmail.com ou appelez le 06 65 23 12 72.',
    ],
  },
  {
    titre: 'Ce que nous collectons, et pourquoi',
    paragraphes: [
      'Nous ne collectons que ce dont nous avons besoin pour répondre à votre demande ou organiser votre formation. Aucune donnée n’est collectée à votre insu, et aucune n’est vendue.',
    ],
    tableau: {
      entete: ['Situation', 'Données', 'Finalité', 'Base légale'],
      lignes: [
        [
          'Formulaire de contact',
          'Nom, prénom, courriel, téléphone, objet de la demande, message',
          'Répondre à votre demande',
          'Intérêt légitime de l’association à traiter les demandes qui lui sont adressées',
        ],
        [
          'Inscription à une formation',
          'Nom, prénom, courriel, téléphone, formation et session choisies',
          'Vous inscrire, émettre votre convocation et votre attestation',
          'Exécution du contrat de formation',
        ],
        [
          'Demande de prise en charge',
          'État civil, date et lieu de naissance, adresse, coordonnées du financeur, SIRET',
          'Établir la convention de formation et les pièces exigées par le financeur',
          'Exécution du contrat et obligation légale',
        ],
        [
          'Question sur le handicap',
          'Réponse facultative « oui / non » et précisions que vous choisissez de donner',
          'Adapter votre accueil et les moyens pédagogiques',
          'Votre consentement — la question est facultative et sans conséquence sur votre inscription',
        ],
        [
          'Candidature de bénévole',
          'Nom, prénom, coordonnées, niveau de diplôme, message',
          'Étudier votre candidature et vous recontacter',
          'Mesures précontractuelles prises à votre demande',
        ],
        [
          'Questionnaire de satisfaction',
          'Réponses au questionnaire de fin de formation',
          'Évaluer et améliorer nos formations, répondre aux exigences Qualiopi',
          'Obligation légale liée à la certification qualité',
        ],
      ],
    },
  },
  {
    titre: 'Combien de temps nous les gardons',
    liste: [
      'Demandes de contact restées sans suite : 12 mois à compter du dernier échange.',
      'Dossiers de stagiaires et documents de formation : 5 ans, durée pendant laquelle les organismes financeurs et les auditeurs Qualiopi peuvent les demander.',
      'Pièces comptables liées à un règlement : 10 ans, conformément au code de commerce.',
      'Réponse à la question sur le handicap : supprimée à l’issue de la formation, une fois l’accueil organisé.',
      'Candidatures de bénévoles non retenues : 12 mois, sauf accord pour les conserver plus longtemps.',
    ],
  },
  {
    titre: 'Qui d’autre y a accès',
    paragraphes: [
      'Vos données sont traitées par les responsables et formateurs de l’association concernés par votre demande. Elles sont également hébergées par des prestataires techniques, qui agissent sur nos instructions et n’ont pas le droit de les utiliser à leurs propres fins.',
    ],
    liste: [
      'Wix.com Ltd. (Israël) — billetterie, paiement en ligne et fichier des contacts. Israël bénéficie d’une décision d’adéquation de la Commission européenne.',
      'Netlify, Inc. (États-Unis) — hébergement du site et réception des formulaires. Les transferts s’appuient sur les clauses contractuelles types de la Commission européenne.',
      'Votre organisme financeur (OPCO, employeur, France Travail), lorsque vous demandez une prise en charge : seules les pièces nécessaires à la convention lui sont transmises.',
      'La FFSS, pour l’enregistrement de vos diplômes de secourisme sur la plateforme fédérale.',
    ],
  },
  {
    titre: 'Traceurs et mesure d’audience',
    paragraphes: [
      'Ce site ne dépose aucun cookie publicitaire et n’utilise aucun outil de profilage. Il n’y a pas de bandeau de consentement parce qu’il n’y a rien à consentir.',
      'Le plan d’accès est fourni par OpenStreetMap, qui ne dépose pas de traceur. Les liens vers Google Maps, Instagram ou Facebook ne transmettent rien tant que vous ne cliquez pas dessus.',
      'Les polices de caractères sont chargées depuis Google Fonts : votre adresse IP est alors transmise à Google. Nous étudions leur hébergement sur nos propres serveurs pour supprimer cet appel.',
      'Lorsque vous réglez une formation, vous êtes redirigé vers la page de paiement sécurisée de Wix, qui applique sa propre politique de confidentialité.',
    ],
  },
  {
    titre: 'Vos droits',
    paragraphes: [
      'Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition sur vos données, ainsi que d’un droit à la portabilité. Lorsque le traitement repose sur votre consentement, vous pouvez le retirer à tout moment.',
      'Pour les exercer, écrivez à secourismepourtous@gmail.com en précisant votre demande. Nous répondons sous un mois. Aucune pièce d’identité ne vous sera demandée si nous pouvons vous identifier autrement.',
      'Si notre réponse ne vous satisfait pas, vous pouvez saisir la CNIL : 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, ou sur cnil.fr.',
    ],
  },
  {
    titre: 'Sécurité',
    paragraphes: [
      'Le site est servi exclusivement en HTTPS. Les accès aux fichiers de contacts et d’inscriptions sont limités aux personnes qui en ont besoin, et protégés par des comptes nominatifs.',
      'Aucun numéro de carte bancaire ne transite par ce site ni n’est conservé par l’association : le paiement est traité par Wix.',
    ],
  },
];

export const majLegales = 'août 2026';
