# Continuous map rebuild — c. 1300

Branch: `codex/continuous-atlas-1300`

## Saved
- Replaced scanline/grid subdivisions with hand-generalized geographic region outlines.
- Added a Natural Earth coastline and a shared border mesh without overlapping strokes.
- Preserved progressive labels, panning, zoom, city markers and the existing inspector.
- Corrected Mallorca/Menorca, early Ottoman territory, Venetian mainland expansion and Sardinia.
- Runtime now requests a new atlas filename to avoid loading the old raster geometry from cache.
- First browser inspection and all 20 existing tests passed.

## Still to complete before publishing
- Final border smoothing and colour/label inspection.
- Geographic regression checks and mobile interaction smoke test.
- Update map source notes and publish to GitHub Pages.
- Verify the deployed asset and renderer.

## Future improvements (outside this practical first version)
- Research fine German enclaves, Polish duchies and temporary wartime occupations in more detail.
- Replace generalized local borders with licensed historical GIS when available.
- Terrain, rivers and richer artwork may be added later.

Credit balance is not exposed to the assistant. This file and the source are saved to GitHub as a resumable checkpoint.
