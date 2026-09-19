# Map c. 1300: practical first pass

`atlas-source.json` preserves the previously authored atlas from commit
`2ebedba0bc8065a42f41efb86b1f86ea8fed697e`, under the same GPL-3.0 terms
as the existing historical map assets.

Rebuild with Python and Shapely 2.1+: `python scripts/build-map.py`.
The script merges the old scanline rectangles, clips to the bundled physical
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
ducal title. The Holy Roman Empire keeps an umbrella label, not a second border overlay.
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

## Topology repair

The atlas now uses one shared physical land mask (`physical-land.geojson`),
from [Natural Earth 1:10m land](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_10m_land.geojson)
([public domain](https://www.naturalearthdata.com/about/terms-of-use/)).
It is simplified to 0.008 degrees before projection. This is a modern physical
coastline for orientation, not a claim about medieval shoreline reclamation.
No modern political borders are used. The old historical land union had gaps
and stepped edges, so it is no longer used as a coastline mask.

Missing land between the historical source and the physical coast is partitioned
by the nearest existing boundary. Existing assigned interiors are preserved.
This repairs cartographic coverage; ownership in repaired coastal slivers remains
approximate. State components are merged by realm into a single path and label.
The old Waldstätte footprint is replaced by its Swiss core, not left underneath.
The imperial umbrella label remains, but its outdated dashed boundary overlay is
removed. All political borders are simplified as a shared coverage, never as
independent overlapping paths.

`python tests/map-topology.py` checks the rendered SVG paths against
`assets/map-land.json`: land coverage, overlaps, matching shared edges,
duplicate realms and the screenshot's central-European gap locations.
