/**
 * Retours de stagiaires — questionnaires de satisfaction 2025.
 *
 * D'OÙ ILS VIENNENT. Du questionnaire Qualiopi rempli en fin de formation,
 * export « Taux de réussite et satisfactions FORMATIONS HORS AQUATIQUE 2025 ».
 * 580 réponses, dont 323 avec un avis rédigé. Chaque avis est rattaché à la
 * formation réellement suivie, d'après la colonne « intitulé de la formation ».
 *
 * POURQUOI CETTE PRÉCISION COMPTE. Une première version rattachait les avis à
 * une famille — PSC, PSE1, PSE2 — et les recyclages héritaient de ceux de la
 * formation initiale. Le même stagiaire disait donc la même chose du PSE1 et
 * de son recyclage, ce qu'il n'avait jamais dit. Chaque formation a désormais
 * ses propres retours.
 *
 * CE QU'ON A RETENU. Les avis substantiels et positifs. Les suggestions
 * d'amélioration — « plus de pratique les deux premiers jours », « un groupe
 * plus petit » — ne figurent pas ici : ce ne sont pas des témoignages, c'est
 * du travail à faire, et leur place est dans le suivi Qualiopi.
 *
 * ⚠️ RGPD. Ces questionnaires ne valent pas consentement à la publication. Les
 * auteurs sont réduits au prénom et à l'initiale du nom, et les noms de
 * formateurs cités ont été retirés. Avant mise en ligne, recueillir l'accord
 * des personnes ou passer à un affichage entièrement anonyme
 * (« Stagiaire PSE1, mars 2025 »).
 *
 * Les textes sont fidèles au fond ; seules l'orthographe, les accords et la
 * ponctuation ont été corrigés.
 */

export interface Temoignage {
  /** Slug exact de la formation suivie. */
  cible: string;
  auteur: string;
  texte: string;
}

export const temoignages: Temoignage[] = [
  // ── PSC ────────────────────────────────────────────────────────────────
  {
    cible: 'psc',
    auteur: 'Léa B.',
    texte: 'Les formateurs sont pédagogues et passionnés par leur sujet, ce qui rend la formation super !',
  },
  {
    cible: 'psc',
    auteur: 'Jessica N.',
    texte: 'Formateurs très sympathiques, informations et explications très bien condensées. Merci pour la bienveillance et la bonne humeur.',
  },
  {
    cible: 'psc',
    auteur: 'Nicolas G.',
    texte: 'Formation rapide et efficace, un duo de formateurs professionnels et très sympathiques ! Je recommande à tous ceux qui veulent passer le PSC1 de passer par eux.',
  },
  {
    cible: 'psc',
    auteur: 'Stéphanie R.',
    texte: 'Formation très claire et complète. Les deux formateurs étaient très investis et à l’écoute de tous.',
  },
  {
    cible: 'psc',
    auteur: 'Teo R.',
    texte: 'Des animateurs qui mettent du rythme : pas de moment creux, et assez ludique.',
  },
  {
    cible: 'psc',
    auteur: 'Moira B.',
    texte: 'Formateur très à l’écoute, très gentil. La formation était parfaite et très claire.',
  },

  // ── PSE1 ───────────────────────────────────────────────────────────────
  {
    cible: 'pse-1',
    auteur: 'Amaury G.',
    texte: 'Bonne équipe pédagogique, qui sait de quoi elle parle et répond à nos questions comme à nos interrogations.',
  },
  {
    cible: 'pse-1',
    auteur: 'Frédéric B.',
    texte: 'Du réalisme, et des conseils qui viennent du terrain.',
  },
  {
    cible: 'pse-1',
    auteur: 'Alessio B.',
    texte: 'Très éducatif et intéressant : on apprend vraiment bien avec toute l’équipe !',
  },
  {
    cible: 'pse-1',
    auteur: 'Sébastien L.',
    texte: 'Plus de place dans le frigo ! Non, tout était parfait, merci à toute l’équipe.',
  },

  // ── PSE2 ───────────────────────────────────────────────────────────────
  {
    cible: 'pse-2',
    auteur: 'Mathieu C.',
    texte: 'Très bonne formation, dispensée par des formateurs à la fois compétents, pédagogues et bienveillants.',
  },
  {
    cible: 'pse-2',
    auteur: 'Pascale S.',
    texte: 'Excellente pédagogie, mises en situation adaptées à la victime et à l’entourage. Très bonne ambiance et excellente équipe.',
  },
  {
    cible: 'pse-2',
    auteur: 'Louise T.',
    texte: 'L’équipe de formateurs a mis en place une ambiance de travail qui favorise l’apprentissage. C’était trop bien.',
  },
  {
    cible: 'pse-2',
    auteur: 'Léa O.',
    texte: 'Formation très enrichissante et dans la bonne humeur, avec des formateurs investis et pédagogues.',
  },

  // ── FC PSC ─────────────────────────────────────────────────────────────
  {
    cible: 'fc-psc',
    auteur: 'Romain F.',
    texte: 'Une revue de tous les points importants. Idéal pour un recyclage.',
  },
  {
    cible: 'fc-psc',
    auteur: 'Valérie C.',
    texte: 'Très appréciable, toute cette remise à niveau. Merci beaucoup aux formateurs.',
  },
  {
    cible: 'fc-psc',
    auteur: 'Karim S.',
    texte: 'Franchement, je ne vois rien à redire : c’était vraiment complet, de A à Z.',
  },
  {
    cible: 'fc-psc',
    auteur: 'Tiffany C.',
    texte: 'De bons formateurs, sympathiques, souriants, à l’écoute.',
  },

  // ── FC PSE1 ────────────────────────────────────────────────────────────
  {
    cible: 'fc-pse-1',
    auteur: 'Leslie B.',
    texte: 'C’était super : on a pu tout revoir, et passer du temps sur certains thèmes qu’on avait oubliés. Merci !',
  },
  {
    cible: 'fc-pse-1',
    auteur: 'Clara L.',
    texte: 'Formateur à l’écoute, toujours prêt à répondre aux questions. Très bien organisé, et surtout efficace et clair.',
  },
  {
    cible: 'fc-pse-1',
    auteur: 'Matthieu S.',
    texte: 'Un bon équilibre entre révision théorique et application pratique.',
  },
  {
    cible: 'fc-pse-1',
    auteur: 'Neige D.',
    texte: 'Très enrichissant : de la bienveillance, un bel accueil, une vraie qualité pédagogique.',
  },
  {
    cible: 'fc-pse-1',
    auteur: 'Adel B.',
    texte: 'Beaucoup de pratique intéressante, qui reprend plein de choses. Formatrice souriante et dynamique.',
  },
  {
    cible: 'fc-pse-1',
    auteur: 'Noémie A.',
    texte: 'Très bonne journée de formation. Merci pour cette piqûre de rappel.',
  },

  // ── FC PSE2 ────────────────────────────────────────────────────────────
  {
    cible: 'fc-pse-2',
    auteur: 'Christian G.',
    texte: 'La remise à niveau est indispensable, et très utile.',
  },
  {
    cible: 'fc-pse-2',
    auteur: 'Claire S.',
    texte: 'La variété des cas pratiques, et des informations nouvelles à connaître : femmes enceintes, notions de psychologie.',
  },
  {
    cible: 'fc-pse-2',
    auteur: 'Maxence J.',
    texte: 'Des cas pratiques bien choisis, en fonction des attentes du groupe.',
  },
];

/**
 * Chiffres de satisfaction, recalculés sur l'export 2025.
 *
 * `tauxSatisfaits` porte sur les 4 060 réponses de critère — sept questions
 * par stagiaire — dont 4 059 « satisfait » ou « très satisfait ».
 * `tauxTresSatisfaits` porte sur l'appréciation globale : 551 réponses
 * « très satisfait » sur 580.
 */
export const satisfaction = {
  reponses: 580,
  tauxSatisfaits: '99,9',
  tauxTresSatisfaits: '95',
  annee: 2025,
};

/** En dessous de ce nombre, un bloc d'avis n'est pas représentatif. */
const MINIMUM = 3;

/**
 * Avis d'une formation.
 *
 * Chaque formation a désormais ses propres retours : il n'y a plus de vivier
 * à partager entre l'initiale et son recyclage. Le repli sur la famille ne
 * sert que si une formation n'a pas encore assez d'avis à elle — le BNSSA,
 * le BSB et les monitorats, par exemple.
 */
export function temoignagesDe(slug: string): Temoignage[] {
  const propres = temoignages.filter((t) => t.cible === slug);
  if (propres.length >= MINIMUM) return propres.slice(0, 6);

  const famille = slug.replace(/^fc-/, '');
  const voisins = temoignages.filter((t) => t.cible.replace(/^fc-/, '') === famille);
  return (voisins.length >= MINIMUM ? voisins : temoignages).slice(0, 6);
}
