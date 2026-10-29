/**
 * L'annonce du moment : le bandeau en haut du site et le Compagnon la lisent ici.
 *
 * Elle n'existe que si la formation annoncée a une session ouverte à
 * l'inscription : vente en pause dans Wix, session pleine ou passée, et elle
 * disparaît partout d'elle-même. On n'annonce jamais une date qu'on ne peut
 * pas réserver.
 *
 * Pour annoncer autre chose, changer `SLUG` et le tarif ; pour l'arrêter,
 * vider `SLUG`.
 */
import { sessionsAVenir, sessionsDe, paris } from './wix';
import { formations } from '../data/formations';

const SLUG = 'ssa';
// Les deux billets Wix de la session SSA. `court` sert sur téléphone, où le
// bandeau doit tenir en peu de lignes.
const TARIFS: Tarif[] = [
  { prix: '420 €', note: 'hors PSE1 et PSE2', court: 'sans PSE' },
  { prix: '900 €', note: 'avec PSE1 et PSE2', court: 'PSE inclus' },
];

const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

export interface Tarif {
  prix: string;
  note: string;
  court: string;
}

export interface Annonce {
  slug: string;
  /** « SSA — ex-BNSSA » */
  nom: string;
  /** « 1er décembre 2026 » */
  date: string;
  tarifs: Tarif[];
  url: string;
}

export async function annonce(): Promise<Annonce | null> {
  const f = formations.find((x) => x.slug === SLUG);
  if (!f) return null;
  const s = sessionsDe(await sessionsAVenir(), f.wixEvent)[0];
  if (!s) return null;
  const d = paris(s.debut);
  return {
    slug: f.slug,
    nom: `${f.sigle} — ex-BNSSA`,
    date: `${d.getDate() === 1 ? '1er' : d.getDate()} ${MOIS[d.getMonth()]} ${d.getFullYear()}`,
    tarifs: TARIFS,
    // Le haut de la fiche, fenêtre des dates ouverte (voir PopupDates.astro) :
    // arriver au milieu de la page, sur la liste des dates, désorientait.
    url: `/formations/${f.slug}#dates`,
  };
}
