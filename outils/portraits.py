"""
Fabrique les images des portraits d'équipe à partir des envois Tally.

POURQUOI CE FICHIER EXISTE. Les recadrages étaient faits à la main, une fois,
sans trace. À la première régénération depuis les sources, quatre ont été
silencieusement perdus — dont celui qui écartait la fille mineure d'Aurelia,
qui s'est ainsi retrouvée publiée. Un recadrage qui n'est écrit nulle part est
un recadrage qu'on refera de travers.

Chaque portrait produit deux fichiers : la grande image du portrait ouvert et
la vignette du mur. Le rapport est toujours 3/4.

    python3 outils/portraits.py "/chemin/vers/le/dossier/Tally"
"""

import pathlib
import sys

from PIL import Image, ImageOps

RATIO = 3 / 4
SORTIE = pathlib.Path(__file__).resolve().parent.parent / 'public' / 'img' / 'equipe'

# Deux façons de cadrer.
#
# « boite » : une boîte explicite en pixels source (gauche, haut, droite, bas),
# obligatoire dès qu'il faut exclure quelqu'un du champ ou serrer sur une
# personne dans un groupe. Elle doit déjà être au rapport 3/4.
#
# « ancre » : le sujet est seul et bien placé, on se contente de ramener la
# photo au rapport 3/4 en s'ancrant sur lui — 0 à gauche ou en haut, 1 à droite
# ou en bas, 0.5 au centre.
PORTRAITS = {
    'aurelia': {
        'fichier': '6A864967-7748-4D99-AFB3-4DD12035330E_1_105_c.jpeg',
        # Sa fille est mineure et parfaitement reconnaissable à l'arrière.
        # L'accord d'Aurelia ne vaut pas pour l'enfant : la boîte s'arrête
        # avant elle. NE PAS ÉLARGIR sans l'accord explicite d'Aurelia.
        'boite': (307, 30, 768, 645),
    },
    'anthony': {
        'fichier': '5C10EB09-EDF5-47EC-9191-0BB8FFA79CEF.png',
        # Photo de groupe : on serre sur lui, sans le visage du voisin.
        'boite': (112, 320, 548, 901),
    },
    'salah': {
        'fichier': '20241225_123728.jpg',
        # Sans boîte, il n'est qu'une silhouette au milieu du village de Noël.
        'boite': (881, 1750, 1781, 2950),
    },
    'annabell': {'fichier': 'IMG_6948.jpeg', 'ancre': (.5, .5)},
    'raphael-lebreuilly': {'fichier': 'IMG_8405.jpeg', 'ancre': (.5, .5)},
    'raphael-radier': {'fichier': '88b9cc59-e0ab-4041-b506-fa19ca715a24.jpeg', 'ancre': (.53, .5)},
    'thibaut': {'fichier': '02A1D0DE-BFE7-46D3-A529-FF0E2AC94392.png', 'ancre': (.5, .18)},
    'angele': {'fichier': 'e82bf838-ac33-41ed-8640-1ef98f543f75.jpeg', 'ancre': (.5, .5)},
    'anne-sophie': {'fichier': '20260813_161437.jpg', 'ancre': (.55, .5)},
    'guillaume': {'fichier': '01ba0ead-3a4d-42a6-9290-a09f35535d69.JPG', 'ancre': (.0, .5)},
    'julien': {'fichier': 'IMG-20260510-WA0006.jpg', 'ancre': (.5, .5)},
    'yaad': {'fichier': 'IMG_6770.jpeg', 'ancre': (.5, .03)},
}

# On n'agrandit jamais une photo au-delà de ce facteur : mieux vaut une image
# un peu plus petite qu'une image floue. Les recadrages serrés en profitent.
AGRANDISSEMENT_MAX = 1.6


def cadre(im, fiche):
    if 'boite' in fiche:
        return im.crop(fiche['boite'])
    ax, ay = fiche['ancre']
    w, h = im.size
    if w / h > RATIO:
        nw, nh = int(h * RATIO), h
        return im.crop((round((w - nw) * ax), 0, round((w - nw) * ax) + nw, nh))
    nw, nh = w, int(w / RATIO)
    y = round((h - nh) * ay)
    return im.crop((0, y, nw, y + nh))


def main(source):
    src = pathlib.Path(source)
    for slug, fiche in PORTRAITS.items():
        im = ImageOps.exif_transpose(Image.open(src / fiche['fichier'])).convert('RGB')
        v = cadre(im, fiche)
        if abs(v.width / v.height - RATIO) > 0.01:
            raise SystemExit(f'{slug} : la boîte n’est pas au rapport 3/4 ({v.width}×{v.height})')
        plafond = round(v.width * AGRANDISSEMENT_MAX)
        for suffixe, largeur, qualite in [('', min(900, plafond), 82), ('-min', 360, 78)]:
            v.resize((largeur, round(largeur / RATIO)), Image.LANCZOS).save(
                SORTIE / f'{slug}{suffixe}.jpg', 'JPEG',
                quality=qualite, optimize=True, progressive=True)
        g = (SORTIE / f'{slug}.jpg').stat().st_size // 1024
        m = (SORTIE / f'{slug}-min.jpg').stat().st_size // 1024
        cadrage = 'boîte' if 'boite' in fiche else 'ancre'
        print(f'  {slug:<20} {cadrage:<6} {v.width}×{v.height} → {g} ko + {m} ko')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    main(sys.argv[1])
