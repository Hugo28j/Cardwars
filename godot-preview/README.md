# Cardwars in Godot: 3D map preview

This is an **independent visual prototype**, next to the existing browser game.
It renders the real `../assets/atlas.json` political map as a flat board and
places seven small procedural 3D castles (plus ships for Lisbon and Venice)
using coordinates from `../src/data1300.js`. Click a castle to see its realm;
drag to rotate, scroll to zoom, press **R** to reset the camera.

## Open it

1. Install [Godot 4.7](https://godotengine.org/download/) (the standard version).
2. Clone or download this whole Cardwars repository.
3. In Godot Project Manager, choose **Import** and select
   `godot-preview/project.godot`.
4. Press **F6** or **F5** to run the main scene.

From a terminal in the repository root, you can also run:

```sh
godot --editor --path godot-preview
godot --headless --path godot-preview --script res://scripts/smoke_test.gd
```

`assets/atlas.png` is already included; no asset generation is needed to run.
If the underlying historical atlas changes, run `python godot-preview/build_assets.py`
with Python 3 and Inkscape installed to regenerate the map image.

This preview does not import the browser's account, cards, campaign mechanics,
network server, save games or live province selections. The browser game remains
the playable version while this experiment shows how the art can work in Godot.
