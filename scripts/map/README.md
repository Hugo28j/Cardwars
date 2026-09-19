# Map c. 1300: practical first pass

`atlas-source.json` preserves the previously authored atlas from commit
`2ebedba0bc8065a42f41efb86b1f86ea8fed697e`, under the same GPL-3.0 terms
as the existing historical map assets.

Rebuild with Python and Shapely 2.1+: `python scripts/build-map.py`.
The script merges the old scanline rectangles, clips to the bundled historical
coastline and the Europe/Anatolia viewport, resolves overlapping paint layers,
nodes shared boundaries, and simplifies them together. Runtime uses only the
resulting SVG paths in `assets/atlas.json`; no Python dependency is needed.

This is a generalized game map, not a complete historical GIS. Existing small
German, Italian and Anatolian states are retained, not independently verified
in their entirety. Improved line rendering does not increase source accuracy.
New generalized French-region subdivisions include Burgundy, Champagne, Anjou,
Provence, Dauphine, the County of Burgundy, Limoges, Lyon and Vienne; Montpellier
and Roussillon are assigned to Majorca. Local boundaries and enclaves still need
more detailed research. Mecklenburg's label uses lordship rather than the later
ducal title. The Holy Roman Empire remains an overlay, not a unified country.
The original broad Poland and Aquitaine shapes are retained; temporary wartime
occupations and the fragmented Polish duchies are not fully reconstructed.

Reference checks:
- https://www.euratlas.net/history/europe/1300/index.html
- https://en.wikipedia.org/wiki/County_of_Provence
- https://en.wikipedia.org/wiki/Duchy_of_Mecklenburg
- Existing city research: ../../RESEARCH-1300.md

No Euratlas map image or proprietary vector geometry is copied.

Labels: primary realms remain visible at every zoom when in the viewport;
medium states appear below 0.48 SVG units per screen pixel, small states below
0.20. Secondary labels avoid occupied text space. City names follow below 0.30,
with the selected city always identified. Full polity names are available on
hover and in the existing click inspector. North Africa and eastern neighbours
at the rectangular viewport edge remain geographic context.
