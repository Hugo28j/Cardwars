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

## Iberian 1300 expansion batch — 19 cities

The 19-city expansion adds Portugal (Porto, Braga, Guimarães, Coimbra, Lisbon, Évora, Santarém, Silves), Navarre (Pamplona), additional Crown of Aragon cities (Barcelona, Zaragoza, Girona, Valencia, Alicante), additional Crown of Castile cities (Badajoz, Cuenca, Guadalajara), and Nasrid Granada (Granada, Málaga).

For Portugal, published urban-history research and municipal/UNESCO histories are combined with the c.1300 population table reproduced in *An Agrarian History of Portugal, 1000–2000* (Brill). Zaragoza uses near-contemporary 1302 fiscal evidence; Valencia uses the Museu d’Història de València’s early-fourteenth-century population estimate; Barcelona and Girona use Catalan historical-demographic studies. Alicante’s Aragonese ownership is anchored to the documented conquest of 1296. Granada’s population is especially uncertain, with published reconstructions varying widely, so the conservative 90K value is paired with a low-confidence range. Málaga is likewise kept conservative because later-fourteenth-century estimates are much higher than can safely be projected backward to 1300.


## France and neighbouring polities — c. 1300 batch

Political ownership for the 27-city expansion was checked separately from modern national borders. Normandy was in the French royal domain after the 1204 conquest; Toulouse entered the royal domain in 1271; Carcassonne was a royal fortress by the 13th century. Brittany remained a distinct duchy. Dijon belonged to Robert II's Duchy of Burgundy; Angers to Charles of Valois' County of Anjou; and Troyes/Provins are treated as the County of Champagne in personal union with the French crown rather than prematurely flattened into direct royal France.

Bordeaux and Bayonne are classified under the English-held Duchy of Aquitaine/Gascony. Montpellier belonged to the kings of Majorca and was not sold to France until 1349. Lyon still belonged to the Empire in 1300 and was incorporated into the French kingdom only in 1312; Vienne remained an imperial archiepiscopal city even longer. Marseille and Aix are classified under the Angevin County of Provence, ruled by Charles II in 1300; Provence was not united to France until the late 15th century.

As elsewhere in the research catalogue, the exact-looking gameplay fields Army, Navy, Food, Technology and Satisfaction are modeled comparative indices, not claimed medieval measurements.


## Low Countries and western German territories — c. 1300 batch

This 36-card expansion uses city histories together with polity-level references for Flanders, Brabant, Hainaut, Holland, Guelders, the Frisian Freedom and the fragmented western Holy Roman Empire. The catalogue deliberately distinguishes formal political status from effective urban autonomy.

Notable exact-period anchors include Antwerp archaeological evidence for a major city-wall/harbour expansion around 1300; Dordrecht's 1220 city rights and late-13th-century growth as a trading centre; Mainz's documented 13th–15th-century free-city phase and the archbishop's position as imperial archchancellor/elector; and Cologne's effective municipal independence after the 1288 Battle of Worringen.

As with the rest of the 1300 research collection, population estimates are ranges where possible. Army, Navy, Food, Technology and Satisfaction are comparative Cardwars indices, not claimed historical measurements.


## Central Europe batch A — c. 1300

This batch adds 31 researched city cards from Hesse, Thuringia, Meissen, Brandenburg, the Ascanian Saxon duchies, Brunswick-Lüneburg, Anhalt, Holstein, Mecklenburg/Werle, Pomerania, Bavaria and Salzburg.

Special chronology checks include Berlin-Cölln's still-separate municipal status in 1300 (their joint union dates to 1307); the 1269 partition of Brunswick-Lüneburg; the 1252 Anhalt branch divisions; the 1295 Pomeranian split into Stettin and Wolgast; and the fact that Mecklenburg was still a lordship rather than a duchy. Güstrow is assigned to the reunited Lordship of Werle around 1300.

As throughout the project, People is a historical estimate with explicit confidence, while Army, Navy, Food, Technology and Satisfaction are modeled Cardwars gameplay indices rather than claimed medieval measurements.


## Central Europe batch B1 — Austria to Freiburg

This 22-card batch adds the Austrian and Alpine duchies, Tyrol, the Bohemian and Moravian urban cores, the early Waldstätte and Freiburg im Breisgau.

Special dating checks include the Meinhardiner ownership of Carinthia and Tyrol around 1300, Wenceslaus II's Bohemian monarchy, the silver boom at Kutná Hora and its 1300 mining/monetary reforms, Plzeň's very recent 1295 foundation, and the 1291 Federal Charter context for Uri and Schwyz. Freiburg is deliberately kept under the Counts of Freiburg rather than back-projecting later constitutional status.

Population estimates remain explicitly uncertain. Army, Navy, Food, Technology and Satisfaction are comparative gameplay indices, not measured historical statistics.
