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

Natural Earth data is public domain. Geometry is simplified, projected to the game's SVG coordinates and clipped by the map viewport. The playable atlas currently uses the historical c. 1300 CE layer instead.

## Historical geography

`assets/world-1300.geojson` comes from **Historical Basemaps**, André Ourednik and contributors:

- https://github.com/aourednik/historical-basemaps
- https://github.com/aourednik/historical-basemaps/blob/master/geojson/world_1300.geojson

The dataset and derived `assets/atlas.json` are distributed under **GPL-3.0**; the full licence is bundled as `assets/historical-basemaps-LICENSE.txt`. The source GeoJSON and transformation script are included. Boundaries are approximate. A small display-name normalization is applied for game readability (for example Raška → Kingdom of Serbia and Bulgar Khanate → Second Bulgarian Empire) without changing the source geometry. The card catalogue still uses its 600 CE political labels until that data is updated separately.

## Flags and fonts

Legacy modern flag SVG assets are still bundled from https://flagcdn.com/ via the country flag artwork service at https://flagpedia.net/download/api, but they are not displayed on the c. 600 CE cards.

Cormorant Garamond and DM Sans are self-hosted from Google Fonts under the SIL Open Font License. Licences are bundled in `assets/fonts/`. Interface icons are original inline SVG drawings.

## Detailed 1300 gameplay layer

The playable `assets/atlas.json` keeps the Historical Basemaps land geometry as its broad reference but adds a denser, authored political subdivision for Central Europe, Italy and Anatolia. The list of polities was cross-checked against the public Euratlas Periodis 1300 state/dependency index and, for target density and readability only, against Europa Universalis V's documented 1337 regional map approach. The 37-year difference is respected: later Anatolian powers such as Eretna are not inserted into the 1300 setup, while contemporary powers such as Germiyan, Karaman, Karesi, Menteşe and the still-small Ottoman beylik are represented.

The Holy Roman Empire is therefore rendered as a supranational outline rather than one playable country. Constituent duchies, counties, prince-bishoprics and selected free imperial cities are rendered separately. These fine internal borders are schematic gameplay approximations, not claims of survey-level historical precision; medieval jurisdictions were often overlapping, fragmented and disputed.

## Crown of Castile card research — c. 1300

The separate `src/data1300.js` catalogue now contains twelve researched Iberian cards: Seville, Córdoba, Toledo, Valladolid, Burgos, Salamanca, Segovia, León, Jaén, Santiago de Compostela, Plasencia, and Murcia. Murcia is deliberately classified under the Crown of Aragon in the exact 1300 snapshot because Jaume II occupied Murcia from 1296 until the 1304–1305 partition settlements. The four cities Toledo, Seville, Burgos and Valladolid are independently identified in modern scholarship as principal spaces of Castilian royal power in the period 1252–1350 (Fernando Arias Guillén, *Journal of Medieval History*, 2013, DOI 10.1080/03044181.2013.830981).

Population values are treated as estimates rather than census counts. For Seville, Córdoba, Toledo, Valladolid, Burgos and Murcia the catalogue uses published c. 1300 estimates compiled in historical-demography tables. León uses scholarly reconstruction around the end of the thirteenth century. Salamanca, Segovia and Jaén have lower-confidence ranges because evidence is less precise or reflects household, territorial, or conquest-era data rather than a direct c. 1300 headcount.

The card fields Army, Navy, Food, Technology and Satisfaction are **not presented as measured medieval statistics**. They are Cardwars gameplay estimates informed by population, fortifications, frontier exposure, institutions, economic role and maritime capacity. The detail view exposes this limitation and links the research sources used for each card. Size likewise represents an approximate urban/fortified footprint where a near-period figure is available; low-confidence cards are explicitly marked.

The 1300 card artwork slots are intentionally blank in this research phase. No modern photographs are assigned to these cards yet.

Santiago de Compostela is included to represent the otherwise empty north-west: UNESCO and university scholarship describe it as one of medieval Christianity's great pilgrimage destinations and a major Peninsular city of ecclesiastical lordship. Its resident population figure is therefore marked low confidence, while its high importance/rarity is driven by archiepiscopal and pilgrimage significance rather than sheer demographic size.

Plasencia is included for the western interior. Universidad de Extremadura scholarship describes it as a fortified royal city, centre of an extensive alfoz, and seat of a wealthy bishopric, with the surrounding Vera already substantially populated by the end of the thirteenth century and into the fourteenth. Its c. 1300 population is not directly censused, so that figure remains a low-confidence modeled estimate.
