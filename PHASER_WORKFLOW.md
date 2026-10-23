# Cardwars 2D assets

Cardwars now runs a local, pinned Phaser 3.90.0 canvas above its SVG map. Phaser is an optional visual layer: province geometry, selection, movement orders and saves remain in the existing game. The layer is used by the atlas, campaign and map editor. It respects map coordinates, viewport size, fog of war and reduced-motion preferences.

## Use Phaser Editor

Clone/open this repository locally and open the project folder in Phaser Editor with Phaser 3 compatibility. Open `assets/phaser/asset-pack.json` using its Asset Pack Editor. The pack contains a working banner image. Add images, sprite sheets, atlases and animation JSON exports here. All asset URLs are relative to the repository web root, e.g. `assets/phaser/my-soldier.png`. Keep assets in the repository. Phaser 4-only effects are not supported by this pinned runtime.

Start an HTTP server with `npm start`. Visit `/phaser-preview.html` to inspect the same assets and runtime layer independently of login, or open the game/map editor. The preview's visibility button exercises the fog-of-war gate.

## Add map objects

Edit `assets/phaser/map-objects.json`. Each object has a unique `id`, a `city` (city ID or `selected`), a `texture` matching an asset-pack key, optional `frame`, `width`/`height` in screen pixels and `offsetX`/`offsetY`. `motion: "banner"` adds the built-in gentle sway. `animation` plays a named Phaser animation loaded by an `animation` entry in the pack. Anchor points come from the existing province centers. Missing cities or textures are skipped. Objects in unseen campaign provinces are hidden.

The starter object places a gently animated realm banner at the selected province. This establishes a working visual path, not a replacement for every military model. For future soldiers, ships and buildings, add assets and pack entries, then placements or explicit game-state bindings in `src/phaser/map-layer.js`. Never expose enemy positions through fog. Pure decorations must not intercept pointer events.

Phaser Editor's generated `.scene` code is not automatically imported by this adapter. For complex Editor scenes/prefabs, explicitly import their generated JavaScript and bind the objects to campaign state. A full tilemap is also a separate renderer change; the historical SVG boundaries remain authoritative.

## GitHub workflow

ChatGPT can modify these repository files through the connected GitHub integration. Editor changes reach the deployed game after committing/pushing to GitHub and completing the normal Pages deployment. There is no authenticated live connection to an open desktop Editor session, and no Editor account or paid subscription has been configured. Work on the same Git checkout and pull before editing to avoid conflicts.

Validate the preview, map pan/zoom, mobile viewport, visibility and cleanup before publishing changes. The bundled runtime and its MIT license live in `vendor/phaser/` so game loading does not depend on a third-party CDN.
