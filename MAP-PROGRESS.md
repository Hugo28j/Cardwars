# Map rebuild progress — 2026-09-19

User wants real continuous borders, no scanline strips or rectangular cells, keep progressive labels, publish to existing GitHub Pages. Reference image is EU atlas 1337: use visual style only, political setup stays c.1300.

Current working checkout: Cardwars-map2, based on main 31398144c31e356df1cb1840435912a03390f5ea. Older Cardwars checkout contains the first pass. Do not overwrite newer card catalogue edits.

Plan in progress:
1. Use Natural Earth 1:10m coastline for geographic detail (public domain; modern shoreline approximation, not medieval reclamation reconstruction).
2. Replace the old scanline / nearest-region grid with explicit geographic region outlines; use c.1300 references, keep residual imperial lordships rather than invent ownership.
3. Correct obvious issues: real Balearic island outlines, Naples vs Sicily, small Ottoman territory (Bursa/Nicaea still Byzantine), no Eretna/Aydin/Saruhan in 1300.
4. Build shared boundary geometry, render each border once; remove dashed imperial perimeter and grid remnants.
5. Version the loaded atlas/module to avoid mixing a cached strip atlas with new border styling.
6. Test desktop/mobile and screenshot Iberia, Italy, Central Europe, Anatolia; verify representative historical city ownership.
7. Commit only map-related files against latest main, publish and check deployed assets.

Sources consulted: https://www.euratlas.net/history/europe/1300/index.html and Northwest/Southwest/Southeast region maps (reference only, no proprietary image copied into game); existing GPL Historical Basemaps GeoJSON; https://www.naturalearthdata.com/about/terms-of-use/.

Checkpoint status: reference investigation complete; new geometry not yet ready. This branch is a work checkpoint, not the published fix.
