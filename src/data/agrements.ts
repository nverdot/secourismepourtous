/**
 * Ce que valent les trois étiquettes affichées sur toutes les pages.
 *
 * POURQUOI CETTE PAGE EXISTE. « Affiliée FFSS · Agréée sécurité civile ·
 * Certifiée Qualiopi » apparaît en haut des cinquante-cinq pages du site, et
 * n'était expliqué nulle part. Un visiteur qui ne connaît pas voyait trois
 * badges sans signification — alors que deux d'entre eux conditionnent
 * légalement ce qu'il vient chercher : tenir un poste de secours, financer une
 * formation.
 *
 * ELLE NE RÉPOND PAS À « C'EST QUOI LA FFSS ». Une page sur la fédération
 * perdrait contre ffss.fr et attirerait des gens qui cherchent la fédération,
 * pas nous. La question trouve sa réponse ici, mais dans le contexte où elle
 * sert : ce que l'affiliation autorise.
 *
 * TOUT EST SOURCÉ, ET LES TEXTES MORTS SONT ÉCARTÉS. L'article 36 de la loi du
 * 13 août 2004, qu'on lit partout à propos des DPS, est abrogé depuis 2012 :
 * la règle vit désormais à l'article L. 725-3 du code de la sécurité
 * intérieure. De même, l'arrêté de 1979 sur la formation au BNSSA, encore cité
 * par beaucoup, est abrogé depuis le 1er octobre 2026.
 */

export interface Agrement {
  nom: string;
  /**
   * L'emblème, quand nous en avons le fichier et le droit de l'afficher.
   *
   * Il manque celui de la sécurité civile — l'emblème est réglementé, et on ne
   * le reconstitue pas depuis une photo d'écusson. La section s'affiche très
   * bien sans, et l'ajouter tiendra en une ligne le jour où le fichier arrive.
   */
  logo?: { src: string; alt: string; largeur: number; hauteur: number };
  /** Ce que c'est, en une ligne. */
  quoi: string;
  /** Ce que le texte autorise — la partie réglementaire. */
  autorise: string[];
  /** Ce que ça change pour la personne qui lit. */
  pourVous: string;
  sources: { texte: string; url: string }[];
}

export const agrements: Agrement[] = [
  {
    nom: 'Agréée sécurité civile',
    quoi: 'L’agrément qui autorise à tenir un poste de secours',
    autorise: [
      'Le code de la sécurité intérieure réserve les dispositifs prévisionnels de secours aux associations agréées. Un organisateur qui confie son poste de secours à une structure sans agrément n’est pas en règle — et son dispositif n’en est pas un.',
      'L’agrément dit « D » est précisément celui des rassemblements de personnes : concerts, compétitions, manifestations sportives et culturelles.',
      'Le même code prévoit qu’une convention avec le SAMU permet aux équipes d’intervenir en appui des secours publics, et d’évacuer une victime depuis le dispositif. C’est le fondement de notre convention tripartite.',
    ],
    pourVous:
      'Si vous organisez un événement, c’est la première chose à vérifier chez un prestataire, avant le prix et avant le nombre de secouristes. C’est aussi la seule que la mairie ou la préfecture vous demandera.',
    sources: [
      {
        texte: 'Article L. 725-3 du code de la sécurité intérieure',
        url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042083962/',
      },
      {
        texte: 'Arrêté du 7 novembre 2006 fixant le référentiel national des dispositifs prévisionnels de secours',
        url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000640977/',
      },
    ],
  },
  {
    nom: 'Affiliée FFSS',
    logo: {
      src: '/img/logo-ffss.png',
      alt: 'Emblème de la Fédération Française de Sauvetage et de Secourisme',
      largeur: 500, hauteur: 500,
    },
    quoi: 'La fédération sous l’habilitation de laquelle nous formons',
    autorise: [
      'La Fédération Française de Sauvetage et de Secourisme est une association loi 1901 née en 1899 et reconnue d’utilité publique depuis 1927. Son agrément national de sécurité civile, renouvelé par arrêté du 31 octobre 2024 pour trois ans, couvre les quatre types de missions : opérations de secours, soutien aux populations, encadrement des bénévoles et dispositifs prévisionnels.',
      'C’est sous son habilitation que nous délivrons les diplômes d’État : PSC, PSE1, PSE2, et les pédagogies appliquées à l’emploi de formateur.',
      'Elle porte aussi la délégation du ministère des Sports pour le sauvetage sportif, en eau plate et en côtier. C’est ce qui relie notre école de natation aux compétitions nationales.',
    ],
    pourVous:
      'Un diplôme délivré sous habilitation fédérale est un diplôme d’État, reconnu partout en France et par tout employeur. Il ne vaut ni plus ni moins que celui d’une autre association agréée — c’est le même référentiel national.',
    sources: [
      {
        texte: 'Arrêté du 31 octobre 2024 renouvelant l’agrément national de sécurité civile de la FFSS',
        url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050429669',
      },
    ],
  },
  {
    nom: 'Certifiée Qualiopi',
    logo: {
      src: '/img/qualiopi.png',
      alt: 'Marque Qualiopi — processus certifié, actions de formation',
      largeur: 600, hauteur: 362,
    },
    quoi: 'La certification qui ouvre les financements publics',
    autorise: [
      'Depuis le 1er janvier 2022, un organisme de formation doit être certifié Qualiopi pour que ses formations soient prises en charge par des fonds publics ou mutualisés.',
      'Sans elle, pas de compte personnel de formation, pas d’OPCO, pas de financement France Travail.',
      'La certification est auditée : elle porte sur l’information du public, l’adaptation aux besoins, la qualification des formateurs et le recueil des appréciations.',
    ],
    pourVous:
      'C’est ce qui vous permet de ne pas payer votre formation de votre poche, ou de la faire financer par votre employeur. C’est aussi ce qui vous garantit qu’un audit extérieur est passé derrière ce que nous affichons.',
    sources: [
      {
        texte: 'Loi du 5 septembre 2018 pour la liberté de choisir son avenir professionnel',
        url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000037367660/',
      },
    ],
  },
];

/**
 * Comment vérifier, y compris chez nos concurrents.
 *
 * Le réflexe serait de garder cette information pour soi. C'est l'inverse qui
 * sert : quelqu'un qui sait vérifier découvre que nous tenons nos annonces, et
 * qu'une partie du marché ne les tient pas. On ne craint pas le contrôle qu'on
 * apprend soi-même à faire.
 */
export const verifier = {
  titre: 'Comment vérifier, chez nous comme ailleurs',
  intro:
    'Ces trois mentions se contrôlent en quelques minutes, et personne ne devrait avoir à nous croire sur parole. Voici où regarder — les liens mènent aux sources officielles, pas à nos propres pages.',
  pistes: [
    {
      quoi: 'L’agrément de sécurité civile',
      comment:
        'La préfecture des Alpes-Maritimes publie la liste des associations agréées du département. Nous y figurons en première page, sous le nom du comité départemental de la FFSS, à notre adresse — agréés pour les quatre missions, A à D.',
      lien: {
        texte: 'Liste préfectorale des associations agréées (PDF)',
        url: 'https://www.alpes-maritimes.gouv.fr/contenu/telechargement/50548/393101/file/Liste_AASC06.pdf',
      },
    },
    {
      quoi: 'L’agrément national de la fédération',
      comment:
        'Celui de la FFSS est un arrêté publié au Journal officiel. Le dernier renouvellement date du 31 octobre 2024 et vaut trois ans, pour les quatre types de missions.',
      lien: {
        texte: 'Arrêté du 31 octobre 2024 sur Légifrance',
        url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050429669',
      },
    },
    {
      quoi: 'La certification Qualiopi',
      comment:
        'L’annuaire des entreprises de l’État affiche notre statut d’organisme de formation et notre certification, mis à jour quotidiennement par le ministère du Travail. Notre certificat porte le numéro QUA009665 et court jusqu’au 29 novembre 2027.',
      lien: {
        texte: 'Notre fiche sur l’annuaire des entreprises',
        url: 'https://annuaire-entreprises.data.gouv.fr/entreprise/secourisme-pour-tous-509334033',
      },
      telechargement: {
        texte: 'Télécharger notre certificat',
        url: '/documents/certificat-qualiopi.pdf',
      },
    },
  ],
};
