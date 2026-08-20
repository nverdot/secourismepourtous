/**
 * Lecture des sessions de formation depuis Wix Events & Tickets.
 *
 * Les formations de SPT ne sont PAS dans Wix Bookings (qui ne contient que le
 * DPS) : elles sont gérées comme des événements en billetterie. C'est donc
 * l'API Events qu'on interroge.
 *
 * Le site étant généré en statique, cet appel a lieu au BUILD, pas chez le
 * visiteur : les dates sont figées dans le HTML livré. Concrètement, il faut
 * relancer un build quand le planning change (voir README).
 * Aucune clé n'est exposée côté navigateur.
 *
 * CONFIGURATION
 *   WIX_API_KEY  clé API du compte Wix (Paramètres > Clés API)
 *   WIX_SITE_ID  c76f219b-29ee-4805-aae5-8f78da0f719f
 *
 * Sans ces variables, le module renvoie une liste vide et le site se construit
 * quand même : les pages affichent alors une invitation à nous contacter,
 * plutôt qu'un plantage du build.
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
 * Instantané des sessions réelles, pris le 20 août 2026 sur le site Wix.
 * Sert uniquement à faire tourner la maquette avant la création de la clé API :
 * ces dates se périment. Dès que WIX_API_KEY est renseignée, l'appel réel prend
 * le dessus et ce fichier n'est plus lu.
 */
import cache from '../data/sessions-cache.json';

function depuisCache(): Session[] {
  const maintenant = new Date();
  return (cache as any[])
    .map((e) => ({
      id: e.id,
      titre: e.titre,
      debut: new Date(e.debut),
      fin: e.fin ? new Date(e.fin) : null,
      lieu: e.lieu ?? null,
      urlInscription: e.url ?? null,
      source: e.titre,
      complet: false,
      champs: [],
    }))
    .filter((s) => s.debut > maintenant)
    .sort((a, b) => a.debut.getTime() - b.debut.getTime());
}

const FORM_API = (id: string) => `https://www.wixapis.com/events/v1/events/${id}/form`;
const BILLETS_API = 'https://www.wixapis.com/events/v1/events/ticketdefinitions/query';

/**
 * Complète chaque session par deux informations que la requête principale ne
 * donne pas : les places encore vendables et les questions propres à
 * l'événement. Un appel par session, au build uniquement.
 *
 * Toute défaillance est silencieuse et laisse la session dans son état par
 * défaut (ouverte, sans question supplémentaire) : mieux vaut un site complet
 * qu'un build interrompu parce qu'une session sur quarante n'a pas répondu.
 */
async function enrichir(sessions: Session[], cle: string, site: string) {
  const entetes = { Authorization: cle, 'wix-site-id': site, 'Content-Type': 'application/json' };

  // Par paquets, pour ne pas ouvrir quarante connexions d'un coup.
  const PAQUET = 6;
  for (let i = 0; i < sessions.length; i += PAQUET) {
    await Promise.all(sessions.slice(i, i + PAQUET).map(async (s) => {
      try {
        const r = await fetch(FORM_API(s.id), { headers: entetes });
        if (!r.ok) return;
        const d = await r.json();
        for (const c of d?.form?.controls ?? []) {
          for (const e of c?.inputs ?? []) {
            if (CHAMPS_STANDARDS.has(e?.name)) continue;
            s.champs.push({
              nom: e.name,
              libelle: e.label ?? c.label ?? '',
              genre: c.type === 'DROPDOWN' || (e.options ?? []).length ? 'LISTE'
                   : c.type === 'TEXTAREA' ? 'PARAGRAPHE' : 'TEXTE',
              options: e.options ?? [],
              obligatoire: Boolean(e.mandatory),
            });
          }
        }
      } catch { /* session laissée telle quelle */ }
    }));
  }
}

/** Récupère toutes les sessions à venir, tous types de formation confondus. */
export async function sessionsAVenir(): Promise<Session[]> {
  const cle = import.meta.env.WIX_API_KEY;
  const site = import.meta.env.WIX_SITE_ID;

  if (!cle || !site) {
    console.warn('[wix] pas de clé API — repli sur le cache local des sessions.');
    return depuisCache();
  }

  try {
    const reponse = await fetch(API, {
      method: 'POST',
      headers: {
        Authorization: cle,
        'wix-site-id': site,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: {
          filter: { status: { $eq: 'UPCOMING' } },
          sort: [{ fieldName: 'dateAndTimeSettings.startDate', order: 'ASC' }],
          paging: { limit: 100 },
        },
      }),
    });

    if (!reponse.ok) {
      console.warn(`[wix] réponse ${reponse.status} — site construit sans les dates.`);
      return [];
    }

    const data = await reponse.json();
    const sessions: Session[] = (data.events ?? [])
      .map((e: any): Session | null => {
        const brut = e?.dateAndTimeSettings?.startDate;
        if (!brut) return null;
        const debut = new Date(brut);
        if (Number.isNaN(debut.getTime())) return null;
        const brutFin = e?.dateAndTimeSettings?.endDate;
        const fin = brutFin ? new Date(brutFin) : null;
        return {
          id: e.id,
          titre: e.title ?? '',
          debut,
          fin: fin && !Number.isNaN(fin.getTime()) ? fin : null,
          lieu: e?.location?.name ?? null,
          // Wix renvoie l'URL en deux morceaux : `base` est la racine du site
          // et `path` la page de l'événement. Utiliser `base` seul renvoie le
          // visiteur sur l'accueil au lieu du formulaire d'inscription.
          urlInscription: e?.eventPageUrl?.base && e?.eventPageUrl?.path
            ? e.eventPageUrl.base + e.eventPageUrl.path
            : null,
          source: e.title ?? '',
          complet: false,
          champs: [],
        };
      })
      .filter((s: Session | null): s is Session => s !== null)
      .sort((a: Session, b: Session) => a.debut.getTime() - b.debut.getTime());

    await enrichir(sessions, cle, site);
    return sessions;
  } catch (err) {
    console.warn('[wix] appel impossible, site construit sans les dates :', err);
    return [];
  }
}

/**
 * Rattache les sessions à une formation.
 *
 * Les titres côté Wix ne sont pas normalisés (« PSE1 - Formation »,
 * « FC BNSSA - Recyclage »…), d'où une comparaison sur une forme simplifiée.
 * Le préfixe « FC » est significatif : sans cette distinction, les sessions de
 * recyclage se retrouveraient sur la page de la formation initiale.
 */
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
