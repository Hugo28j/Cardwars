# Sources and attribution

## Setting and authored game data

The collection uses late-antique settlements around 600 CE, following the fall of the Western Roman Empire. It does not imply the Eastern Roman Empire had fallen. Settlement continuity, names and local control can be uncertain; descriptions identify particularly transitional sites. Cards use historical political identities for the c. 600 CE setting; present-day country names remain geographic reference metadata only.

Every city entry in `src/data.js` provides a Wikipedia article link for further reading. Rarity, army, navy, population, hinterland size and the three 0–100 scores are **authored game values**, not historical measurements. Constantinople represents its European historic centre. Islands have no collectible city cards in this initial mainland edition.

## Photography

Photographs and full image-by-image attribution are bundled in `assets/cities/` and `assets/photo-credits.json`; the in-game Historical notes & image credits dialog displays these credits. Source pages, creators and licence links accompany each photograph. Wikipedia's API provides metadata for Wikimedia-hosted images. Photographs have been resized / JPEG-compressed, are cropped by the interface and receive colour treatment. They show modern sites and may include architecture built after 600.

Each image remains under its stated licence (including the applicable Creative Commons attribution/share-alike terms); image reuse must preserve the respective attribution and licence. Source links identify the original files.

## Modern geography reference

`assets/modern-atlas.json` is retained as a geographic reference asset but is not used by the current in-game atlas. It derives from Natural Earth's 1:50m Admin 0 countries dataset:

- https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson
- https://www.naturalearthdata.com/about/terms-of-use/

Natural Earth data is public domain. Geometry is simplified, projected to the game's SVG coordinates and clipped by the map viewport. The playable atlas uses the historical c. 600 CE layer instead.

## Historical geography

`assets/world-600.geojson` comes from **Historical Basemaps**, André Ourednik and contributors:

- https://github.com/aourednik/historical-basemaps
- https://github.com/aourednik/historical-basemaps/blob/master/geojson/world_600.geojson

The dataset and derived `assets/atlas.json` are distributed under **GPL-3.0**; the full licence is bundled as `assets/historical-basemaps-LICENSE.txt`. The source GeoJSON and transformation script are included. Boundaries are approximate. Four residual upstream Ostrogoth labels are suppressed because the Ostrogothic kingdom fell before this setting; geometry is retained as unassigned land rather than inventing exact successor borders. Card-level regional descriptions may be more specific than the simplified atlas.

## Flags and fonts

Legacy modern flag SVG assets are still bundled from https://flagcdn.com/ via the country flag artwork service at https://flagpedia.net/download/api, but they are not displayed on the c. 600 CE cards.

Cormorant Garamond and DM Sans are self-hosted from Google Fonts under the SIL Open Font License. Licences are bundled in `assets/fonts/`. Interface icons are original inline SVG drawings.
