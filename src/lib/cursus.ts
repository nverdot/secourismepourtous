/**
 * Le cursus complet d'une formation (voir `cursus` dans formations.ts),
 * proposé dans les dates d'une autre fiche — le cursus SSA sur le PSE1.
 * Rien tant que la formation n'a pas de session ouverte : on ne propose
 * jamais un billet qu'on ne peut pas acheter.
 */
import { sessionsAVenir, sessionsDe, type Session } from './wix';
import { formations, type Formation } from '../data/formations';

export interface Cursus {
  formation: Formation;
  session: Session;
  libelle: string;
  tarif: string;
  detail: string;
  billetsMasques: string[];
}

export async function cursusPour(slug: string | undefined): Promise<Cursus | null> {
  if (!slug) return null;
  const f = formations.find((x) => x.cursus?.pages.includes(slug));
  if (!f?.cursus) return null;
  const session = sessionsDe(await sessionsAVenir(), f.wixEvent)[0];
  if (!session) return null;
  return { formation: f, session, ...f.cursus };
}
