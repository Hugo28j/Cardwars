"""Render the existing Cardwars SVG atlas as a texture for the Godot preview.

Requires Python 3 and Inkscape (`inkscape`). Run from anywhere in the repository.
"""
import hashlib
import json
from pathlib import Path
import subprocess
import tempfile
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent
ATLAS = ROOT.parent / "assets" / "atlas.json"
OUTPUT = ROOT / "assets"


def realm_color(realm):
    digest = hashlib.sha256(realm.encode("utf-8")).digest()
    return f"hsl({(digest[0] * 360) // 256}, 17%, {49 + digest[1] % 13}%)"


def main():
    atlas = json.loads(ATLAS.read_text(encoding="utf-8"))
    paths = []
    for feature in atlas:
        if not feature.get("d"):
            continue
        color = "#5b6556" if feature.get("underlay") else realm_color(feature.get("realm", ""))
        paths.append(
            f'<path d="{escape(feature["d"])}" fill="{color}" '
            'stroke="#293531" stroke-width="0.28" fill-rule="evenodd"/>'
        )
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" width="1420" height="880" '
        'viewBox="110 155 710 440">'
        '<rect x="110" y="155" width="710" height="440" fill="#324d59"/>'
        + "".join(paths)
        + '</svg>'
    )
    OUTPUT.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory() as directory:
        source = Path(directory) / "atlas.svg"
        source.write_text(svg, encoding="utf-8")
        subprocess.run(
            ["inkscape", str(source), "--export-filename=" + str(OUTPUT / "atlas.png")],
            check=True,
        )
    print(f"Rendered {len(paths)} Cardwars atlas shapes into {OUTPUT / 'atlas.png'}")


if __name__ == "__main__":
    main()
