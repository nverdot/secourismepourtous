/**
 * Retours de stagiaires — questionnaires de satisfaction 2025.
 *
 * ⚠️ RGPD : ces avis proviennent des questionnaires Qualiopi, qui ne valent pas
 * consentement à la publication. Les auteurs sont réduits au prénom et à
 * l'initiale du nom, et les noms de formateurs cités ont été retirés. Avant
 * mise en ligne, recueillir l'accord des personnes ou passer à un affichage
 * entièrement anonyme (« Stagiaire PSE1, mars 2025 »).
 *
 * Les textes sont fidèles au fond ; seules ponctuation et majuscules ont été
 * normalisées pour la lisibilité.
 */

export interface Temoignage {
  /** Rattachement à une famille de formation, pour n'afficher que le pertinent. */
  cible: 'psc' | 'pse-1' | 'pse-2';
  auteur: string;
  texte: string;
}

export const temoignages: Temoignage[] = [
  {
    "cible": "psc",
    "auteur": "Ilona M.",
    "texte": "La qualité et la pédagogie des formateurs."
  },
  {
    "cible": "psc",
    "auteur": "Tiffany C.",
    "texte": "Bons formateurs, sympathiques, souriants, à l'écoute."
  },
  {
    "cible": "psc",
    "auteur": "Valérie C.",
    "texte": "Très appréciable, toute cette remise à niveau. Merci beaucoup aux formateurs."
  },
  {
    "cible": "psc",
    "auteur": "Teo R.",
    "texte": "Animateurs qui mettent du rythme, donc pas de moment creux, et assez ludique."
  },
  {
    "cible": "psc",
    "auteur": "Karim S.",
    "texte": "Franchement, je ne vois rien à redire : c'était vraiment complet, de A à Z."
  },
  {
    "cible": "pse-1",
    "auteur": "Clara L.",
    "texte": "Formateur à l'écoute, toujours prêt à répondre aux questions. Très bien organisé, efficace et clair."
  },
  {
    "cible": "pse-1",
    "auteur": "Matthieu S.",
    "texte": "Bon équilibre entre révision théorique et application pratique."
  },
  {
    "cible": "pse-1",
    "auteur": "Dimitri S.",
    "texte": "Beaucoup de mise en pratique : on est acteur de sa formation. Équipe très pédagogique et à l'écoute."
  },
  {
    "cible": "pse-1",
    "auteur": "Neige D.",
    "texte": "Très enrichissant. Bienveillance, bel accueil, bonne pédagogie et manière d'apprentissage."
  },
  {
    "cible": "pse-1",
    "auteur": "Elsa B.",
    "texte": "Pas de jugement, beaucoup de bienveillance."
  },
  {
    "cible": "pse-1",
    "auteur": "Anthony G.",
    "texte": "Énormément de cas concrets, clairement expliqués. Très satisfait des formateurs."
  },
  {
    "cible": "pse-1",
    "auteur": "Sarah N.",
    "texte": "La pratique qui ressort sur l'ensemble de la journée, avec tous les cas possibles. Très pertinent."
  },
  {
    "cible": "pse-1",
    "auteur": "Tom R.",
    "texte": "Nombreuses mises en situation et débriefings. Bonne ambiance, qualité de l'enseignement."
  },
  {
    "cible": "pse-2",
    "auteur": "Andréa P.",
    "texte": "Parfait, très bon accompagnement, à l'écoute sans être dans le jugement. Une très bonne journée."
  },
  {
    "cible": "pse-2",
    "auteur": "Claire S.",
    "texte": "Variété des cas pratiques et informations nouvelles à connaître."
  }
];

/** Chiffres calculés sur les 566 questionnaires 2025 (hors filière aquatique). */
export const satisfaction = {
  reponses: 566,
  tauxSatisfaits: '99,9',   // satisfaits ou très satisfaits : 3962 / 3963
  tauxTresSatisfaits: '95', // part de « très satisfait » seule
  annee: 2025,
};

/** Renvoie les avis liés à une formation, avec repli sur l'ensemble. */
export function temoignagesDe(slug: string): Temoignage[] {
  const base = slug.replace(/^fc-/, '');
  const cible = base === 'psc' ? 'psc' : base === 'pse-1' ? 'pse-1' : base === 'pse-2' ? 'pse-2' : null;
  const filtres = cible ? temoignages.filter((t) => t.cible === cible) : [];
  return (filtres.length >= 3 ? filtres : temoignages).slice(0, 6);
}
