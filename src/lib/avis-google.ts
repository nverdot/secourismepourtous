/**
 * Avis Google, lus au BUILD via l'API Places.
 *
 * Pourquoi au build et non chez le visiteur : la clé resterait visible dans le
 * navigateur, et le script de Google déposerait des traceurs sur chaque page.
 * Ici, rien ne part chez Google depuis le poste du visiteur — les avis sont
 * figés dans le HTML livré, et rafraîchis au prochain déploiement.
 *
 * CONFIGURATION
 *   GOOGLE_PLACES_API_KEY  clé d'API Google Cloud, API « Places API (New) »
 *                          activée, restreinte à cette API.
 *   GOOGLE_PLACE_ID        facultatif : identifiant du lieu. Sans lui, on le
 *                          retrouve par recherche textuelle au premier build.
 *
 * Sans clé, la fonction renvoie null et le bloc d'avis ne s'affiche pas : le
 * site se construit normalement, avec les témoignages Qualiopi déjà en place.
 *
 * ⚠️ L'API Places ne renvoie que les CINQ avis les plus pertinents, et ses
 * conditions interdisent de les stocker durablement ou de les modifier. On les
 * affiche donc tels quels, avec le lien vers la fiche.
 */

export interface AvisGoogle {
  auteur: string;
  note: number;
  texte: string;
  quand: string;
  photo: string | null;
}

export interface FicheGoogle {
  nom: string;
  note: number;
  total: number;
  lienFiche: string;
  lienEcrire: string;
  avis: AvisGoogle[];
}

const RECHERCHE = 'https://places.googleapis.com/v1/places:searchText';
const DETAIL = (id: string) => `https://places.googleapis.com/v1/places/${id}`;

/** Retrouve l'identifiant du lieu à partir de son nom et de son adresse. */
async function trouveLieu(cle: string): Promise<string | null> {
  const r = await fetch(RECHERCHE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': cle,
      'X-Goog-FieldMask': 'places.id,places.displayName',
    },
    body: JSON.stringify({
      textQuery: 'Secourisme pour tous, 31 boulevard Impératrice Eugénie, 06200 Nice',
      languageCode: 'fr',
    }),
  });
  if (!r.ok) {
    console.warn('[avis] recherche du lieu impossible :', r.status);
    return null;
  }
  const d = await r.json();
  return d?.places?.[0]?.id ?? null;
}

export async function avisGoogle(): Promise<FicheGoogle | null> {
  const cle = import.meta.env.GOOGLE_PLACES_API_KEY;
  if (!cle) return null;

  try {
    const id = import.meta.env.GOOGLE_PLACE_ID || (await trouveLieu(cle));
    if (!id) return null;

    const r = await fetch(DETAIL(id) + '?languageCode=fr', {
      headers: {
        'X-Goog-Api-Key': cle,
        'X-Goog-FieldMask':
          'displayName,rating,userRatingCount,googleMapsUri,reviews',
      },
    });
    if (!r.ok) {
      console.warn('[avis] détail du lieu :', r.status);
      return null;
    }
    const d = await r.json();

    const avis: AvisGoogle[] = (d.reviews ?? [])
      .filter((a: any) => (a?.rating ?? 0) >= 4 && a?.originalText?.text)
      .map((a: any) => ({
        auteur: a?.authorAttribution?.displayName ?? 'Un client',
        note: a.rating,
        texte: a.originalText.text.trim(),
        quand: a.relativePublishTimeDescription ?? '',
        photo: a?.authorAttribution?.photoUri ?? null,
      }));

    if (!avis.length) return null;

    return {
      nom: d?.displayName?.text ?? 'Secourisme Pour Tous',
      note: d.rating ?? 0,
      total: d.userRatingCount ?? 0,
      lienFiche: d.googleMapsUri ?? 'https://maps.app.goo.gl/yjoC7qbZCdGSKyXeA',
      lienEcrire: `https://search.google.com/local/writereview?placeid=${id}`,
      avis,
    };
  } catch (e) {
    console.warn('[avis] appel impossible :', e);
    return null;
  }
}
