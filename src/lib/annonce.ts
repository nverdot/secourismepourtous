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
// Prix du billet Wix de la session SSA, qui ne comprend pas le PSE1 ni le PSE2.
const TARIF = '420 €';
const TARIF_NOTE = 'hors PSE1 et PSE2';

const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

export interface Annonce {
  slug: string;
  /** « SSA — ex-BNSSA » */
  nom: string;
  /** « 1er décembre 2026 » */
  date: string;
  tarif: string;
  tarifNote: string;
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
    tarif: TARIF,
    tarifNote: TARIF_NOTE,
    // Le haut de la fiche, pas les dates : arriver au milieu de la page désoriente.
    url: `/formations/${f.slug}`,
  };
}
