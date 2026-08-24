"""
Découpe les visages de l'organigramme et du trombinoscope des formateurs.

POURQUOI. La page affichait deux exports de diapositive en JPEG : du texte
dans une image, illisible pour un lecteur d'écran, flou en zoom, invisible
pour un moteur de recherche, et impossible à mettre à jour sans rouvrir la
présentation. Les visages, eux, valent la peine d'être gardés : on les
découpe une fois, et la page se reconstruit en HTML autour.

Les boîtes ont été repérées automatiquement — zones non blanches assez
grandes — puis figées ici, pour que le découpage ne dépende plus d'une
détection qui pourrait changer d'avis.

    python3 outils/organigramme.py
"""

import hashlib
import json
import pathlib

from PIL import Image

RACINE = pathlib.Path(__file__).resolve().parent.parent
# Les diapositives d'origine ne sont plus publiées : elles ne servent plus
# qu'à découper les visages, et pesaient 530 ko servis pour rien.
SOURCES = pathlib.Path(__file__).resolve().parent / 'sources'
SORTIE = RACINE / 'public' / 'img' / 'equipe' / 'orga'
EMPREINTES = RACINE / 'src' / 'data' / 'empreintes-organigramme.json'

COTE = 200          # vignette carrée, affichée en rond par la page
MARGE = 0.06        # un peu d'air autour du visage détecté

BUREAU = [
    ('raphael-radier',   (708, 176, 892, 360)),
    ('aurelia-tardivat', (1368, 204, 1536, 364)),
    ('jean-michel-maillier', (708, 396, 908, 596)),
    ('alexandra-boudon', (708, 632, 908, 832)),
    ('arthur-mollo',     (308, 928, 508, 1128)),
    ('matteo-chenu',     (716, 924, 916, 1124)),
    ('annabell-perez-bjorkman', (1132, 924, 1328, 1128)),
]

FORMATEURS = [
    # Rangée 1
    ('annabell-perez-bjorkman-f', (96, 324, 272, 488)),
    ('guillaume-rizo',       (352, 300, 548, 484)),
    ('raphael-radier-f',     (636, 308, 808, 488)),
    ('matteo-chenu-f',       (892, 312, 1072, 484)),
    ('alexia-pires',         (1196, 336, 1376, 488)),
    ('alexandra-boudon-f',   (1472, 288, 1676, 488)),
    # Rangée 2
    ('gilles-plasse',        (68, 636, 256, 816)),
    ('thibaut-patell',       (360, 644, 504, 808)),
    ('jean-michel-maillier-f', (572, 608, 776, 804)),
    ('elliesse-maroudin',    (828, 620, 1024, 800)),
    ('louis-rinaudo',        (1092, 644, 1268, 800)),
    ('arthur-mollo-f',       (1344, 612, 1532, 800)),
    ('salvatore-frigieri',   (1576, 624, 1764, 800)),
    # Rangée 3
    ('mathis-abreu',         (68, 960, 256, 1128)),
    ('anthony-del-aguila',   (316, 948, 516, 1128)),
    ('olivier-graglia',      (576, 964, 752, 1128)),
    ('nicolas-verdot',       (860, 944, 1056, 1128)),
    ('floriano-pintus',      (1096, 948, 1284, 1128)),
    ('thibaut-lorenzetti',   (1352, 940, 1528, 1128)),
    ('gabrielle-brunet-vasseur', (1580, 928, 1768, 1128)),
]


def carre(im, boite):
    """Ramène la boîte détectée à un carré, sans sortir de l'image."""
    x0, y0, x1, y1 = boite
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    cote = max(x1 - x0, y1 - y0) * (1 + MARGE)
    d = cote / 2
    g, h = max(0, cx - d), max(0, cy - d)
    dr, b = min(im.width, cx + d), min(im.height, cy + d)
    return im.crop((round(g), round(h), round(dr), round(b)))


def main():
    SORTIE.mkdir(parents=True, exist_ok=True)
    empreintes = {}
    for source, lot in [('organigramme-bureau-2026.jpg', BUREAU),
                        ('formateurs-2026.jpg', FORMATEURS)]:
        im = Image.open(SOURCES / source).convert('RGB')
        for slug, boite in lot:
            v = carre(im, boite).resize((COTE, COTE), Image.LANCZOS)
            f = SORTIE / f'{slug}.jpg'
            v.save(f, 'JPEG', quality=84, optimize=True, progressive=True)
            empreintes[f'/img/equipe/orga/{f.name}'] = \
                hashlib.sha256(f.read_bytes()).hexdigest()[:8]
            print(f'  {slug:<28} {f.stat().st_size // 1024:>3} ko')
    EMPREINTES.write_text(json.dumps(dict(sorted(empreintes.items())), indent=2) + '\n')
    print(f'\n  {len(empreintes)} vignettes, empreintes dans {EMPREINTES.relative_to(RACINE)}')


if __name__ == '__main__':
    main()
