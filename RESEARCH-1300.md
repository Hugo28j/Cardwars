# Cardwars 1300 research · Europe · first 125 cards

This file records the methodology behind the country-by-country c. 1300 Iberian card set. Political ownership is pinned to the exact 1300 snapshot, so temporary occupations are represented.

## Method

The goal is not to pretend medieval evidence is more precise than it is. Direct population censuses, exact garrison strengths, technology scores and public-opinion measurements do not exist for these cities in 1300.

- **People**: published historical population estimate or a clearly labelled range.
- **Size**: approximate fortified / urban footprint when a near-period figure is available; otherwise a low-confidence gameplay estimate.
- **Army**: modeled urban levy + garrison potential, not a recorded standing army.
- **Navy**: modeled immediate naval contribution; inland cities are zero. Seville receives a non-zero value because of its major river port and naval infrastructure.
- **Food / Technology / Satisfaction**: comparative 0–100 Cardwars indices based on agrarian access, trade, institutions, urban specialization, frontier danger and political stability. They are not historical measurements.
- **Rarity**: gameplay importance around c. 1300, not a factual historical category.

## Selected cities

| City | Political unit around 1300 | Population used | Confidence | Why it was selected |
| --- | --- | ---: | --- | --- |
| Seville | Kingdom of Seville | ≈90,000 | Medium | Major royal city, Guadalquivir port and one of the largest cities of the Crown |
| Córdoba | Kingdom of Córdoba | ≈60,000 | Medium | Large southern city and former caliphal capital |
| Toledo | Kingdom of Toledo | ≈42,000 | Medium | Royal, ecclesiastical and cultural centre |
| Valladolid | Kingdom of Castile | ≈25,000 | Medium | Principal space of itinerant royal power |
| Burgos | Kingdom of Castile | ≈21,000 | Medium | Royal, ecclesiastical and commercial centre |
| Murcia | Crown of Aragon · occupied Kingdom of Murcia | ≈15,000 | Medium | Irrigated southeastern capital held by Jaume II in 1300 |
| Salamanca | Kingdom of León | ≈10–14,000 | Low | University city and important Leonese urban centre |
| Segovia | Kingdom of Castile | ≈7–12,000 | Low | Powerful concejo, livestock/wool economy and strong militia tradition |
| León | Kingdom of León | ≈5,000 | Medium | Historic royal/episcopal centre with scholarly demographic reconstruction |
| Jaén | Kingdom of Jaén | ≈10–15,000 | Low | Militarised frontier city facing Nasrid Granada |
| Santiago de Compostela | Kingdom of Galicia · archiepiscopal lordship | ≈6–10,000 | Low | International pilgrimage centre and powerful ecclesiastical city |
| Plasencia | Kingdom of Castile · royal town / episcopal see | ≈4–7,000 | Low | Fortified royal centre of a very large Extremaduran alfoz |

## Core research references

- Fernando Arias Guillén, “A kingdom without a capital? Itineration and spaces of royal power in Castile, c.1252–1350”, *Journal of Medieval History* 39.4 (2013), DOI: https://doi.org/10.1080/03044181.2013.830981
- Historical Spanish city-population compilation (c.1300 values used for several cities): https://es.wikipedia.org/wiki/Evoluci%C3%B3n_de_la_poblaci%C3%B3n_espa%C3%B1ola_en_la_%C3%A9poca_precensal
- University of Salamanca official history: https://usal.es/pt/historia
- University of Jaén, Eva Mª Alcázar Hernández, “Formación y articulación de un concejo fronterizo: Jaén en el Siglo XIII”: https://revistaselectronicas.ujaen.es/index.php/ATM/article/view/1561
- Historic City of Toledo, UNESCO: https://whc.unesco.org/en/list/379
- Murcia in the late-medieval Mediterranean economy, CSIC: https://doi.org/10.3989/aem.1994.v24.973
- Medieval Burgos urban development, UCM research record: https://produccioncientifica.ucm.es/documentos/6393e025a88bbe44501da1a8
- León medieval population study: https://www.researchgate.net/publication/319629913_La_juderia_de_Puente_Castro_y_la_poblacion_altomedieval_de_la_ciudad_de_Leon_siglos_IX_al_XIII

Each card in `src/data1300.js` contains its own additional source links and evidence note.

## Murcia sovereignty note

For an exact **1300** snapshot, Murcia city is assigned to the **Crown of Aragon**. Jaume II occupied the Kingdom of Murcia from 1296; the settlement of Torrellas in 1304 and Elche in 1305 subsequently divided the old kingdom, returning Murcia city and the southern sector to Castile while the northern sector remained with Aragón/Valencia. This is why the map and the card now agree.

## Added western-city references

- Santiago de Compostela (Old Town), UNESCO: https://whc.unesco.org/en/list/347
- Xosé M. Sánchez Sánchez, medieval council of Santiago de Compostela: https://doi.org/10.5944/ETFIII.32.2019.22411
- Cathedral of Santiago, pilgrimage history: https://catedraldesantiago.es/en/pilgrimage/
- Salvador Andrés Ordax, *Arte y urbanismo de Plasencia en la Edad Media*: https://dehesa.unex.es/server/api/core/bitstreams/7b9270ad-2dca-4bee-9753-49894da51e9f/content
- Nicolás Ávila Seoane, lordships in the Plasencia concejo c.1300: https://dialnet.unirioja.es/servlet/articulo?codigo=1226648

## Expansion batch: 19 requested cities

Added: Porto, Braga, Guimarães, Coimbra, Lisbon, Évora, Santarém, Silves, Pamplona, Barcelona, Zaragoza, Girona, Valencia, Alicante, Badajoz, Cuenca, Guadalajara, Granada and Málaga.

Political ownership in the exact 1300 snapshot:
- **Kingdom of Portugal:** Porto, Braga, Guimarães, Coimbra, Lisbon, Évora, Santarém, Silves.
- **Kingdom of Navarre:** Pamplona.
- **Crown of Aragon:** Barcelona, Zaragoza, Girona, Valencia, Alicante. Alicante had been conquered by Jaume II in 1296.
- **Crown of Castile:** Badajoz, Cuenca, Guadalajara.
- **Emirate of Granada:** Granada and Málaga.

Near-date population anchors used where available include Lisbon ≈35K, Porto ≈6K, Coimbra ≈6K, Évora ≈12K and Santarém ≈7K from published urban-population tables; Zaragoza ≥22K from the 1302 monedaje; Valencia ≈25K in the early fourteenth century; Barcelona ≈30–40K; and Girona ≈8K at the end of the thirteenth century. Other values are explicitly marked low confidence.


## France and neighbouring polities batch: 27 cities

Added: Nantes, Rennes, Vannes, Rouen, Caen, Amiens, Paris, Reims, Troyes, Provins, Dijon, Tours, Angers, Poitiers, La Rochelle, Orléans, Bourges, Limoges, Bordeaux, Bayonne, Toulouse, Carcassonne, Montpellier, Lyon, Vienne, Marseille and Aix-en-Provence.

Exact-1300 political handling:
- **Duchy of Brittany:** Nantes, Rennes, Vannes.
- **Kingdom of France / royal domain or royal provinces:** Rouen, Caen, Amiens, Paris, Reims, Tours, Poitiers, La Rochelle, Orléans, Bourges, Toulouse, Carcassonne.
- **County of Champagne:** Troyes and Provins, still treated as a distinct county in personal union with Philip IV and Joan I around 1300.
- **Duchy of Burgundy:** Dijon, under Robert II.
- **County of Anjou:** Angers, under Charles of Valois from 1290.
- **Viscounty of Limoges:** Limoges, with a deliberately nuanced note that the medieval city was split between the viscomital/communal Château and the episcopal Cité.
- **Duchy of Aquitaine under the English Crown:** Bordeaux and Bayonne.
- **Kingdom of Majorca:** Montpellier.
- **Holy Roman Empire ecclesiastical principalities:** Lyon and Vienne; neither is treated as French in 1300.
- **County of Provence:** Marseille and Aix-en-Provence under Charles II of Anjou-Naples.

Population values for this batch are intentionally marked low or medium confidence unless a near-date estimate is especially strong. They are not presented as census counts.


## Low Countries and western German batch: 36 cities

Added 36 cards across the County of Flanders, Duchy of Brabant, County of Hainaut, County of Holland, County of Guelders, Frisian Freedom, Oldenburg, Cleves, Jülich, Berg, Mark, Luxembourg, Nassau, Lorraine, the archbishoprics of Trier/Mainz/Cologne, independent Cologne, the Rhine Palatinate, Baden and Württemberg.

Special political handling:
- Flanders remains labelled **County of Flanders**, with card notes explaining the French occupation that began in 1300 rather than pretending the county ceased to exist.
- Holland and Hainaut remain distinct political labels despite their personal union under John II of Avesnes from 1299.
- Guelders is still a **county** in 1300; ducal rank came later.
- Cologne is a separate **Independent City of Cologne** card after the 1288 Battle of Worringen. It is described as de facto autonomous rather than prematurely calling it a formal Free Imperial City.
- Bonn represents the territorial **Archbishopric of Cologne** after the archbishops lost effective political control inside Cologne.
- Mainz remains under the Archbishopric label while its card explicitly notes the broad civic freedoms it enjoyed in the 13th–15th centuries.
- Nassau is treated as a practical umbrella for the divided Walramian and Ottonian branches represented by Idstein and Siegen.

Population figures are mostly low-confidence ranges. Relative urban weight is intentionally much higher for Ghent, Bruges and Cologne than for small comital centres such as Idstein, Jülich or Oldenburg.


## Central Europe batch A: 31 cities

Added Marburg, Kassel, Eisenach, Gotha, Meissen, Leipzig, Dresden, Brandenburg an der Havel, Berlin-Cölln, Frankfurt an der Oder, Wittenberg, Lauenburg, Brunswick, Lüneburg, Zerbst, Bernburg, Aschersleben, Kiel, Wismar, Güstrow, Stettin/Szczecin, Stargard, Wolgast, Greifswald, Stralsund, Munich, Ingolstadt, Landshut, Straubing, Salzburg and Hallein.

Exact-period corrections are built into the cards:
- Hesse is still the unified **Landgraviate of Hesse**; later Hesse-Kassel/Hesse-Marburg labels are not back-projected.
- Berlin and Cölln are treated as twin towns; their formal joint union came in 1307.
- Saxony-Wittenberg and Saxe-Lauenburg reflect the 1296 Ascanian division.
- Brunswick and Lüneburg are kept under the Welf Duchy of Brunswick-Lüneburg, with their constituent branches named in subrealm text.
- The three Anhalt cards identify the Zerbst, Bernburg and Aschersleben branches; Anhalt-Aschersleben still exists in 1300 and ends only in 1315.
- Wismar is labelled **Lordship of Mecklenburg**, not an anachronistic duchy. Güstrow is labelled **Lordship of Werle**, which had been reunited under Nicholas II by c.1292.
- Pomerania-Stettin and Pomerania-Wolgast reflect the 1295 partition.
- Upper and Lower Bavaria reflect the Wittelsbach division begun in 1255.
