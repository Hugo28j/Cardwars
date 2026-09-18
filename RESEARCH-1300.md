# Cardwars 1300 research · Iberia · first 12 cards

This file records the methodology behind the first country-by-country c. 1300 card set. Political ownership is pinned to the exact 1300 snapshot, so temporary occupations are represented.

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
