/**
 * Dimensions réelles d'une image de `public/`, lues au moment du build.
 *
 * POURQUOI. Une balise `img` sans `width` ni `height` laisse le navigateur
 * ignorer la place à réserver : la page se réagence quand l'image arrive, le
 * texte saute sous le doigt du lecteur, et Google compte ce décalage dans ses
 * signaux d'expérience. Vingt-deux images du site étaient dans ce cas.
 *
 * On lit l'en-tête du fichier plutôt que de recopier les tailles à la main :
 * remplacer une image par une autre de format différent ne peut pas créer de
 * mensonge silencieux.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

const cache = new Map<string, { width: number; height: number } | null>();

/** PNG : la largeur et la hauteur sont deux entiers 32 bits juste après « IHDR ». */
function png(b: Buffer) {
  if (b.length < 24 || b.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
}

/** JPEG : il faut parcourir les segments jusqu'au marqueur de trame (SOFn). */
function jpeg(b: Buffer) {
  if (b.length < 4 || b.readUInt16BE(0) !== 0xffd8) return null;
  let i = 2;
  while (i < b.length - 9) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1];
    // SOF0 à SOF15, sauf DHT (C4), JPG (C8) et DAC (CC) qui n'en sont pas.
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
      return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}

/**
 * @param chemin chemin servi, ex. « /img/equipe.jpg »
 * @returns les dimensions, ou null si le fichier est absent ou illisible —
 *          auquel cas la balise sort sans attribut plutôt qu'avec un faux.
 */
export function dimensions(chemin: string) {
  if (cache.has(chemin)) return cache.get(chemin)!;
  let d: { width: number; height: number } | null = null;
  try {
    const b = readFileSync(path.join(process.cwd(), 'public', chemin.replace(/^\//, '')));
    d = chemin.toLowerCase().endsWith('.png') ? png(b) : jpeg(b);
  } catch {
    d = null;
  }
  cache.set(chemin, d);
  return d;
}
