"""
Télécharge les polices depuis Google et engendre src/styles/polices.css.

POURQUOI CE FICHIER EXISTE. Les polices étaient chargées depuis Google avec
« display: swap » : la page s'affichait dans une police système puis se
réagençait quand Archivo arrivait. Cloudflare Web Analytics le mesurait comme
un CLS mauvais à 42 %, en désignant la navigation et le tracé du hero.

Servies depuis notre domaine et préchargées, elles arrivent avant le premier
affichage. Et plus aucune adresse IP de visiteur ne part chez Google.

    python3 outils/polices.py

Archivo et Public Sans sont sous licence SIL Open Font 1.1 : l'hébergement
sur son propre serveur est expressément permis.
"""

import os
import pathlib
import re
import urllib.request

RACINE = pathlib.Path(__file__).resolve().parent.parent
SORTIE = RACINE / 'public' / 'fonts'
FEUILLE = RACINE / 'src' / 'styles' / 'polices.css'

# Doit refléter les graisses réellement employées dans global.css.
DEMANDE = ('https://fonts.googleapis.com/css2'
           '?family=Archivo:wght@500;600;700;800'
           '&family=Public+Sans:wght@400;500;600&display=swap')

# Le vietnamien ne sert à rien ici : deux fichiers de moins, et sa plage
# Unicode ne sera jamais demandée. latin-ext reste — il porte les caractères
# d'Europe centrale qu'on trouve dans les noms de famille.
JEUX = {'latin', 'latin-ext'}

# Sans un en-tête de navigateur récent, Google renvoie du woff, pas du woff2.
NAVIGATEUR = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
              'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36')


def main():
    req = urllib.request.Request(DEMANDE, headers={'User-Agent': NAVIGATEUR})
    with urllib.request.urlopen(req, timeout=30) as r:
        css = r.read().decode('utf-8')

    blocs = re.findall(r'/\*\s*([\w-]+)\s*\*/\s*@font-face\s*\{(.*?)\}', css, re.S)
    SORTIE.mkdir(parents=True, exist_ok=True)
    faces = []

    for jeu, corps in blocs:
        if jeu not in JEUX:
            continue
        fam = re.search(r"font-family:\s*'([^']+)'", corps).group(1)
        poids = re.search(r'font-weight:\s*(\d+)', corps).group(1)
        plage = re.search(r'unicode-range:\s*([^;]+);', corps).group(1).strip()
        url = re.search(r'url\((https://[^)]+\.woff2)\)', corps).group(1)
        nom = f"{fam.lower().replace(' ', '-')}-{poids}-{jeu}.woff2"
        with urllib.request.urlopen(url, timeout=30) as r, open(SORTIE / nom, 'wb') as f:
            f.write(r.read())
        faces.append((fam, poids, jeu, nom, plage))
        print(f"  {(SORTIE / nom).stat().st_size // 1024:>3} ko  {nom}")

    entete = ('/*\n * Polices servies depuis notre domaine.\n *\n'
              ' * ⚠️ FICHIER ENGENDRÉ par outils/polices.py — ne pas éditer à la main.\n'
              ' * Archivo et Public Sans : licence SIL Open Font 1.1.\n */\n')
    corps = '\n'.join(
        f"@font-face {{\n  font-family: '{fam}';\n  font-style: normal;\n"
        f"  font-weight: {poids};\n  font-display: swap;\n"
        f"  src: url('/fonts/{nom}') format('woff2');\n  unicode-range: {plage};\n}}"
        for fam, poids, jeu, nom, plage in sorted(faces, key=lambda x: (x[0], int(x[1]), x[2]))
    )
    FEUILLE.write_text(entete + corps + '\n', encoding='utf-8')
    print(f"\n  {len(faces)} déclarations écrites dans {FEUILLE.relative_to(RACINE)}")


if __name__ == '__main__':
    main()
