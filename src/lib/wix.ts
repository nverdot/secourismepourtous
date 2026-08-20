/**
 * Sessions de formation.
 *
 * Les formations de SPT ne sont pas dans Wix Bookings (qui ne contient que le
 * DPS) : elles sont gérées comme des événements en billetterie.
 *
 * Ce module ne parle PAS à Wix. Il lit l'instantané versionné dans le dépôt,
 * régénéré par `node scripts/rafraichir-sessions.mjs` — depuis un poste de
 * travail, ou par l'action GitHub nocturne qui détient la clé en secret de
 * dépôt.
 *
 * Pourquoi : tant que la lecture se faisait pendant la construction du site,
 * l'hébergeur devait détenir la clé d'administration Wix. Un réglage manqué
 * chez l'hébergeur faisait alors retomber le site sur des données périmées,
 * silencieusement — les dates s'affichaient, mais sans les identifiants
 * nécessaires au paiement. Le build ne peut plus mentir : ce qui est dans le
 * dépôt est ce qui est publié.
 *
 * Conséquence à connaître : modifier le planning dans Wix ne change rien au
 * site tant que l'instantané n'a pas été régénéré.
 */

export interface Session {
  id: string;
  titre: string;
  debut: Date;
  /** Date de fin : une formation peut s'étaler sur plusieurs jours (PSE1, BNSSA). */
  fin: Date | null;
  lieu: string | null;
  /** Lien vers la page de l'événement sur le site Wix, pour l'inscription. */
  urlInscription: string | null;
  /** Titre de l'événement Wix, tel que renseigné dans le tableau de bord. */
  source: string;
  /** Identifiant d'URL de l'événement chez Wix, exigé pour ouvrir le paiement. */
  slug: string;
  /**
   * Vrai quand Wix n'accepte plus de réservation : session pleine ou fermée.
   * À vérifier explicitement — `registration.status` reste à « OPEN_TICKETS »
   * même lorsque toutes les places sont vendues, et la réservation échoue alors
   * au dernier moment, après que le visiteur a tout saisi.
   */
  complet: boolean;
  /**
   * Questions propres à l'événement, ajoutées dans Wix au-delà des champs
   * standards (nom, e-mail, téléphone, commentaire) : la question sur le
   * handicap, par exemple. Le module d'inscription les affiche telles quelles,
   * ce qui évite de figer dans le code une liste qui vit dans le tableau de bord.
   */
  champs: ChampFormulaire[];
}

export interface ChampFormulaire {
  /** Identifiant attendu par Wix, du type « custom-c7e7f3cf… ». */
  nom: string;
  libelle: string;
  /** LISTE pour un choix parmi des options, TEXTE sinon. */
  genre: 'LISTE' | 'TEXTE' | 'PARAGRAPHE';
  options: string[];
  obligatoire: boolean;
}

/** Champs présents sur tous les événements : le module les gère déjà. */
const CHAMPS_STANDARDS = new Set(['firstName', 'lastName', 'email', 'phone', 'comment']);

/** Clé de regroupement par mois, ex. « 2026-09 ». */
export const cleMois = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

const MOIS_LONGS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];
export const libelleMois = (d: Date) => `${MOIS_LONGS[d.getMonth()]} ${d.getFullYear()}`;

/** « du 19/09/2026 au 27/09/2026 » ou une date seule si la formation tient sur un jour. */
export function periode(s: Session): string {
  const jj = (d: Date) =>
    `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  if (!s.fin || jj(s.fin) === jj(s.debut)) return `le ${jj(s.debut)}`;
  return `du ${jj(s.debut)} au ${jj(s.fin)}`;
}

/** Signale les sessions qui tombent un samedi ou un dimanche. */
export const estWeekEnd = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

const API = 'https://www.wixapis.com/events/v3/events/query';

/**
 * Instantané des sessions, régénéré par scripts/rafraichir-sessions.mjs.
 * C'est la SEULE source de dates du site : il n'y a plus de chemin parallèle
 * qui pourrait diverger.
 */
import cache from '../data/sessions-cache.json';

/** Identifiant public du client Wix (visiteur anonyme) : il est prévu pour être exposé. */
const CLIENT_PUBLIC = '22902884-dd06-4ac4-92b3-33f9527fec21';

/**
 * Sessions à venir, lues dans l'instantané versionné du dépôt.
 *
 * Le site n'appelle plus Wix pendant sa construction. L'instantané
 * (src/data/sessions-cache.json) est régénéré par
 * `node scripts/rafraichir-sessions.mjs`, exécuté depuis un poste de travail ou
 * par l'action GitHub nocturne.
 *
 * Ce choix vient d'un incident : tant que la lecture se faisait au build,
 * l'hébergeur devait détenir la clé d'administration Wix, et un réglage manqué
 * faisait retomber le site sur des données périmées — sans le moindre signal.
 * Désormais le build ne peut plus mentir : ce qui est dans le dépôt est ce qui
 * est publié, et rafraîchir les dates est un geste explicite.
 */
export function sessionsAVenir(): Promise<Session[]> {
  const maintenant = new Date();
  const sessions = (cache as any[])
    .map((e): Session => ({
      id: e.id,
      titre: e.titre,
      debut: new Date(e.debut),
      fin: e.fin ? new Date(e.fin) : null,
      lieu: e.lieu ?? null,
      urlInscription: e.url ?? null,
      source: e.titre,
      slug: e.slug ?? '',
      complet: Boolean(e.complet),
      champs: e.champs ?? [],
    }))
    .filter((s) => s.debut > maintenant)
    .sort((a, b) => a.debut.getTime() - b.debut.getTime());
  return Promise.resolve(sessions);
}

export function sessionsDe(toutes: Session[], titreWix: string): Session[] {
  const norm = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

  const cible = norm(titreWix);
  const cibleEstRecyclage = /\bfc\b/.test(cible);

  return toutes.filter((s) => {
    const t = norm(s.titre);
    if (/\bfc\b/.test(t) !== cibleEstRecyclage) return false;
    const mots = cible.split(' ').filter(Boolean);
    return mots.every((m) => t.split(' ').includes(m));
  });
}

const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const MOIS = ['janv.', 'févr.', 'mars', 'avril', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

export const formatJour = (d: Date) => JOURS[d.getDay()];
export const formatNumero = (d: Date) => String(d.getDate()).padStart(2, '0');
export const formatMois = (d: Date) => MOIS[d.getMonth()];
export const formatAnnee = (d: Date) => d.getFullYear();
export const formatHeure = (d: Date) =>
  `${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}`;
