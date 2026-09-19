// Researched Cardwars city set for c. 1300 CE.
// Population figures use published estimates where available. Army/navy and the 0-100
// Food/Technology/Satisfaction scores are explicitly modelled gameplay estimates because
// no exact medieval measurements exist for those concepts.
export const RARITIES_1300=['Common','Uncommon','Rare','Epic','Legendary'];
export const RARITY_COLORS_1300=['#a5b7b1','#80bca7','#81b4e5','#bd99df','#e5b869'];

export const CITIES_1300=[
 {
  id:'1300-seville',name:'Seville',modern:'Seville',country:'Crown of Castile',subrealm:'Kingdom of Seville',
  lon:-5.9845,lat:37.3891,rarity:4,year:1300,people:90000,populationText:'≈90.0 K',populationConfidence:'medium',
  sizeText:'≈2.7 km²',sizeConfidence:'high',army:7000,armyText:'≈7.0 K',navy:12,navyText:'≈12',
  food:82,technology:78,satisfaction:66,
  historicalRole:'Major royal city, Guadalquivir port and Atlantic-facing commercial centre',
  economy:'River port, regional agriculture, crafts and long-distance trade',
  militaryRole:'Large fortified city with exceptional naval infrastructure for Castile',
  researchSummary:'One of the principal spaces of Castilian royal power. Its huge Almohad enclosure survived the Christian conquest, and the port remained central to the city economy.',
  evidenceNote:'Population is a published c.1300 estimate. The fortified enclosure is documented at about 273 hectares. Army/navy and 0-100 scores are gameplay estimates grounded in population, fortifications, port capacity and political importance.',
  sources:[
   ['Spanish historical-demography city table','https://es.wikipedia.org/wiki/Evoluci%C3%B3n_de_la_poblaci%C3%B3n_espa%C3%B1ola_en_la_%C3%A9poca_precensal'],
   ['Journal of Medieval History — royal power in Castile','https://doi.org/10.1080/03044181.2013.830981'],
   ['Royal Alcázar of Seville — official history','https://alcazarsevilla.org/historia/'],
   ['Medieval Seville walls — Journal of Building Engineering','https://doi.org/10.1016/j.jobe.2021.103381']
  ]
 },
 {
  id:'1300-cordoba',name:'Córdoba',modern:'Córdoba',country:'Crown of Castile',subrealm:'Kingdom of Córdoba',
  lon:-4.7794,lat:37.8882,rarity:3,year:1300,people:60000,populationText:'≈60.0 K',populationConfidence:'medium',
  sizeText:'≈2.0 km²',sizeConfidence:'low',army:4800,armyText:'≈4.8 K',navy:0,navyText:'0',
  food:80,technology:74,satisfaction:58,
  historicalRole:'Large Guadalquivir city and former caliphal capital integrated into Castile after 1236',
  economy:'Agriculture, crafts, regional exchange and river-valley commerce',
  militaryRole:'Important fortified southern city behind the Granada frontier',
  researchSummary:'Córdoba remained one of Iberia’s largest urban centres around 1300 despite its reduced scale from the caliphal period. Ferdinand III captured it for Castile in 1236.',
  evidenceNote:'Population is a published c.1300 estimate. Urban area is a cautious gameplay approximation; the surviving/inscribed historic core does not exactly equal the medieval built-up city.',
  sources:[
   ['Spanish historical-demography city table','https://es.wikipedia.org/wiki/Evoluci%C3%B3n_de_la_poblaci%C3%B3n_espa%C3%B1ola_en_la_%C3%A9poca_precensal'],
   ['Historic Centre of Córdoba — UNESCO','https://whc.unesco.org/en/list/313/'],
   ['Siege/conquest of Córdoba, 1236 — background','https://en.wikipedia.org/wiki/Siege_of_C%C3%B3rdoba_(1236)']
  ]
 },
 {
  id:'1300-toledo',name:'Toledo',modern:'Toledo',country:'Crown of Castile',subrealm:'Kingdom of Toledo',
  lon:-4.0273,lat:39.8628,rarity:3,year:1300,people:42000,populationText:'≈42.0 K',populationConfidence:'medium',
  sizeText:'≈1.15 km²',sizeConfidence:'high',army:4200,armyText:'≈4.2 K',navy:0,navyText:'0',
  food:70,technology:86,satisfaction:64,
  historicalRole:'Archiepiscopal, cultural and royal centre with major Christian, Jewish and Mudéjar communities',
  economy:'Crafts, regional trade, ecclesiastical wealth and court-related services',
  militaryRole:'Exceptionally strong natural and artificial defenses above the Tagus',
  researchSummary:'Toledo was one of the main spaces of royal power in Castile and retained exceptional cultural importance after the 1085 conquest.',
  evidenceNote:'Population is a published c.1300 estimate. A mid-14th-century study gives roughly 115 hectares inside the fortified city, used here as the best near-period size figure.',
  sources:[
   ['Spanish historical-demography city table','https://es.wikipedia.org/wiki/Evoluci%C3%B3n_de_la_poblaci%C3%B3n_espa%C3%B1ola_en_la_%C3%A9poca_precensal'],
   ['Journal of Medieval History — royal power in Castile','https://doi.org/10.1080/03044181.2013.830981'],
   ['Historic City of Toledo — UNESCO','https://whc.unesco.org/en/list/379'],
   ['Toledo defenses in the 14th century — CSIC Gladius','https://gladius.revistas.csic.es/index.php/gladius/article/download/390/397']
  ]
 },
 {
  id:'1300-valladolid',name:'Valladolid',modern:'Valladolid',country:'Crown of Castile',subrealm:'Kingdom of Castile',
  lon:-4.7245,lat:41.6523,rarity:2,year:1300,people:25000,populationText:'≈25.0 K',populationConfidence:'medium',
  sizeText:'≈1.0 km²',sizeConfidence:'low',army:2500,armyText:'≈2.5 K',navy:0,navyText:'0',
  food:74,technology:70,satisfaction:70,
  historicalRole:'Frequent royal residence and one of Castile’s principal centres of itinerant kingship',
  economy:'Market services, crafts, agriculture and court-related demand',
  militaryRole:'Central inland city with strong political rather than frontier-military importance',
  researchSummary:'Castilian kings had no single fixed capital; Valladolid was one of the four principal spaces of royal power identified for 1252–1350.',
  evidenceNote:'Population is a published c.1300 estimate. Army and urban size are modelled estimates.',
  sources:[
   ['Spanish historical-demography city table','https://es.wikipedia.org/wiki/Evoluci%C3%B3n_de_la_poblaci%C3%B3n_espa%C3%B1ola_en_la_%C3%A9poca_precensal'],
   ['Journal of Medieval History — royal power in Castile','https://doi.org/10.1080/03044181.2013.830981'],
   ['Kings and Universities in the Iberian Peninsula','https://doi.org/10.20318/cian.2018.4189']
  ]
 },
 {
  id:'1300-burgos',name:'Burgos',modern:'Burgos',country:'Crown of Castile',subrealm:'Kingdom of Castile',
  lon:-3.6969,lat:42.3439,rarity:3,year:1300,people:21000,populationText:'≈21.0 K',populationConfidence:'medium',
  sizeText:'≈1.0 km²',sizeConfidence:'low',army:2400,armyText:'≈2.4 K',navy:0,navyText:'0',
  food:68,technology:72,satisfaction:72,
  historicalRole:'Royal, ecclesiastical and commercial centre on the north-south routes of Castile',
  economy:'Trade, crafts, rents and growing connections to Castilian wool commerce',
  militaryRole:'Fortified northern centre; more valuable commercially and politically than as a frontier fortress',
  researchSummary:'Burgos was one of the principal spaces of Castilian royal power. Medieval growth was driven by political and ecclesiastical functions, commerce and crafts.',
  evidenceNote:'Population is a published c.1300 estimate. Army and urban area are modelled estimates.',
  sources:[
   ['Spanish historical-demography city table','https://es.wikipedia.org/wiki/Evoluci%C3%B3n_de_la_poblaci%C3%B3n_espa%C3%B1ola_en_la_%C3%A9poca_precensal'],
   ['Journal of Medieval History — royal power in Castile','https://doi.org/10.1080/03044181.2013.830981'],
   ['UCM — evolution of medieval Burgos','https://produccioncientifica.ucm.es/documentos/6393e025a88bbe44501da1a8']
  ]
 },
 {
  id:'1300-murcia',name:'Murcia',modern:'Murcia',country:'Crown of Aragon',subrealm:'Kingdom of Murcia · Aragonese occupation (1296–1304)',
  lon:-1.1307,lat:37.9922,rarity:2,year:1300,people:15000,populationText:'≈15.0 K',populationConfidence:'medium',
  sizeText:'≈1.1 km²',sizeConfidence:'low',army:2200,armyText:'≈2.2 K',navy:0,navyText:'0',
  food:88,technology:70,satisfaction:52,
  historicalRole:'Irrigated southeastern regional capital under the Crown of Aragon in the 1300 snapshot',
  economy:'Huerta irrigation, agriculture, crafts and Mediterranean-oriented trade through regional ports',
  militaryRole:'Strategically exposed eastern city held by Jaume II during the Aragonese occupation of Murcia',
  researchSummary:'Jaume II of Aragon occupied the Kingdom of Murcia from 1296. In the exact 1300 snapshot Murcia city was therefore under Aragonese sovereignty; the 1304–1305 settlements later returned Murcia city and the southern portion to Castile.',
  evidenceNote:'Population is a published c.1300 estimate. The city is inland, so Navy is zero even though the wider kingdom accessed Mediterranean trade through ports such as Cartagena.',
  sources:[
   ['Spanish historical-demography city table','https://es.wikipedia.org/wiki/Evoluci%C3%B3n_de_la_poblaci%C3%B3n_espa%C3%B1ola_en_la_%C3%A9poca_precensal'],
   ['CSIC — Kingdom of Murcia in the Mediterranean economy','https://doi.org/10.3989/aem.1994.v24.973'],
   ['Universidad de Murcia — Jaime II confirms Murcia privileges, 1296–1304','https://doi.org/10.6018/j5621'],
   ['Biblioteca Virtual Miguel de Cervantes — Aragonese occupation and 1304–1305 partition','https://www.cervantesvirtual.com/s3/BVMC_OBRAS/ff4/78b/368/2b1/11d/fac/c70/021/85c/e60/64/mimes/ff478b36-82b1-11df-acc7-002185ce6064_60.html']
  ]
 },
 {
  id:'1300-salamanca',name:'Salamanca',modern:'Salamanca',country:'Crown of Castile',subrealm:'Kingdom of León',
  lon:-5.6635,lat:40.9701,rarity:2,year:1300,people:12000,populationText:'≈12.0 K',populationRange:'≈10–14 K',populationConfidence:'low',
  sizeText:'≈0.9 km²',sizeConfidence:'low',army:1700,armyText:'≈1.7 K',navy:0,navyText:'0',
  food:66,technology:90,satisfaction:72,
  historicalRole:'University city, ecclesiastical centre and major urban community of the Leonese part of the Crown',
  economy:'University services, wool, crafts, agriculture and regional trade',
  militaryRole:'Walled inland city with less frontier pressure than the southern centres',
  researchSummary:'The university was founded in 1218; Alfonso X regulated and endowed it in 1254, and papal recognition followed in 1255.',
  evidenceNote:'No census exists for c.1300. The card uses a cautious estimate derived from late-13th-century household-scale evidence and is marked low confidence. Technology is deliberately high because Salamanca possessed the Crown’s standout university institution.',
  sources:[
   ['University of Salamanca — official history','https://usal.es/pt/historia'],
   ['University of Salamanca Alumni — history','https://alumni.usal.es/en/comunidad/historia-de-la-usal/'],
   ['Medieval morphology of Salamanca — UCM/USAL thesis record','https://produccioncientifica.ucm.es/documentos/5e4e72032999524eaa94bfd9']
  ]
 },
 {
  id:'1300-segovia',name:'Segovia',modern:'Segovia',country:'Crown of Castile',subrealm:'Kingdom of Castile',
  lon:-4.1192,lat:40.9429,rarity:1,year:1300,people:9000,populationText:'≈9.0 K',populationRange:'≈7–12 K',populationConfidence:'low',
  sizeText:'≈0.8 km²',sizeConfidence:'low',army:2000,armyText:'≈2.0 K',navy:0,navyText:'0',
  food:62,technology:66,satisfaction:70,
  historicalRole:'Powerful concejo controlling a very large territory, with livestock, wool and military traditions',
  economy:'Pastoral economy, wool, agriculture, crafts and control of an extensive municipal hinterland',
  militaryRole:'Strong municipal militia tradition and strategic position on the central plateau',
  researchSummary:'Segovia’s concejo controlled a territory exceeding 6,600 km². Thirteenth-century evidence emphasizes its livestock wealth and unusually strong mounted military tradition.',
  evidenceNote:'The urban population is not securely censused for 1300, so the card uses a deliberately broad low-confidence estimate. Army is a gameplay estimate informed by evidence for a large armed municipal community.',
  sources:[
   ['Madrid regional history — Segovia and its medieval concejo','https://www.madrid.org/bvirtual/BVCM001818.pdf'],
   ['Studia Historica — settlement around Segovia c.1300','https://revistas.usal.es/uno/index.php/Studia_H_Historia_Medieval/issue/download/340/90']
  ]
 },
 {
  id:'1300-leon',name:'León',modern:'León',country:'Crown of Castile',subrealm:'Kingdom of León',
  lon:-5.5671,lat:42.5987,rarity:1,year:1300,people:5000,populationText:'≈5.0 K',populationConfidence:'medium',
  sizeText:'≈0.33 km²',sizeConfidence:'medium',army:900,armyText:'≈900',navy:0,navyText:'0',
  food:64,technology:62,satisfaction:68,
  historicalRole:'Historic royal and episcopal centre whose demographic scale was modest by 1300',
  economy:'Regional market, church institutions, pilgrimage traffic and surrounding agriculture',
  militaryRole:'Fortified inland centre; symbolic and ecclesiastical importance exceeded its military scale',
  researchSummary:'Research on León estimates roughly 5,000 inhabitants at the end of the thirteenth century, after a period of medieval expansion.',
  evidenceNote:'Population and urban size are based on published reconstruction using the medieval enclosure and estimated density. Army is a gameplay estimate.',
  sources:[
   ['Research on León’s medieval population','https://www.researchgate.net/publication/319629913_La_juderia_de_Puente_Castro_y_la_poblacion_altomedieval_de_la_ciudad_de_Leon_siglos_IX_al_XIII'],
   ['University of León — medieval territory research record','https://portalcientifico.unileon.es/documentos/5e57ae1d2999527d991a418f']
  ]
 },
 {
  id:'1300-jaen',name:'Jaén',modern:'Jaén',country:'Crown of Castile',subrealm:'Kingdom of Jaén',
  lon:-3.7903,lat:37.7796,rarity:2,year:1300,people:12000,populationText:'≈12.0 K',populationRange:'≈10–15 K',populationConfidence:'low',
  sizeText:'≈0.45 km²',sizeConfidence:'medium',army:2500,armyText:'≈2.5 K',navy:0,navyText:'0',
  food:74,technology:58,satisfaction:48,
  historicalRole:'Frontier city and royal concejo facing the Nasrid Kingdom of Granada',
  economy:'Agriculture, livestock and a frontier economy tied to the surrounding concejo',
  militaryRole:'One of the most militarised positions in the Crown because of direct Granada-frontier pressure',
  researchSummary:'After Castile took Jaén in 1246, the city became the centre of a frontier concejo. The frontier shaped settlement, fortification and land use for centuries.',
  evidenceNote:'A study citing work on Islamic Jaén gives about 18,000 inhabitants for the 13th-century city before/around conquest-era conditions; post-conquest c.1300 numbers are uncertain, so this card deliberately uses a lower 10–15K range. Size uses the cited dense medieval urban footprint as an order-of-magnitude guide.',
  sources:[
   ['University of Jaén — frontier concejo in the 13th century','https://revistaselectronicas.ujaen.es/index.php/ATM/article/view/1561'],
   ['University of Jaén — urban structure/background','https://crea.ujaen.es/jspui/bitstream/10953.1/2265/1/Tapia_Sanchez_Felipe_TFG_GeografiaeHistoria.pdf']
  ]
 },
 {
  id:'1300-santiago',name:'Santiago de Compostela',modern:'Santiago de Compostela',country:'Crown of Castile',subrealm:'Kingdom of Galicia · lordship of the Archbishop of Santiago',
  lon:-8.5448,lat:42.8782,rarity:3,year:1300,people:8000,populationText:'≈8.0 K',populationRange:'≈6–10 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:900,armyText:'≈900',navy:0,navyText:'0',
  food:66,technology:82,satisfaction:71,
  historicalRole:'Archiepiscopal capital and one of medieval Europe’s foremost pilgrimage destinations',
  economy:'Pilgrimage services, ecclesiastical rents, crafts, markets and regional trade',
  militaryRole:'Walled ecclesiastical city whose power rested more on lordship, wealth and pilgrimage than on a large urban army',
  researchSummary:'Around 1300 Santiago was a major Peninsular city of ecclesiastical lordship and an internationally renowned pilgrimage centre. The archbishop exercised substantial temporal power over the Tierra de Santiago.',
  evidenceNote:'No reliable c.1300 census survives, so the resident population is a deliberately broad low-confidence estimate. The city’s importance is much greater than that population alone suggests because the 12th–13th centuries were the golden age of the pilgrimage and pilgrim traffic was transient. Army and the 0–100 scores are gameplay estimates.',
  sources:[
   ['UNESCO — Santiago de Compostela (Old Town)','https://whc.unesco.org/en/list/347'],
   ['Universidade de Santiago — medieval city council and ecclesiastical lordship','https://doi.org/10.5944/ETFIII.32.2019.22411'],
   ['Universidade de Santiago — archiepiscopal power, 1150–1400','https://investigacion.usc.gal/documentos/5d1df66129995204f766a4f4'],
   ['Cathedral of Santiago — pilgrimage history','https://catedraldesantiago.es/en/pilgrimage/']
  ]
 },
 {
  id:'1300-plasencia',name:'Plasencia',modern:'Plasencia',country:'Crown of Castile',subrealm:'Kingdom of Castile · royal town and episcopal see',
  lon:-6.0883,lat:40.0312,rarity:2,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–7 K',populationConfidence:'low',
  sizeText:'≈0.30 km²',sizeConfidence:'low',army:1200,armyText:'≈1.2 K',navy:0,navyText:'0',
  food:79,technology:64,satisfaction:67,
  historicalRole:'Fortified royal city, episcopal see and organising centre of a very large north-eastern Extremaduran territory',
  economy:'Agriculture, livestock, communal pasture, timber, market exchange and ecclesiastical activity',
  militaryRole:'Originally a military and colonising centre controlling routes between the Meseta, the Tajo and Extremadura',
  researchSummary:'Plasencia was a royal town with an extensive alfoz, a wealthy bishopric founded in 1188 and an important role in the repopulation and administration of north-eastern Extremadura. Around 1300 small lordships were forming within its territory, but the city itself remained royal.',
  evidenceNote:'There is no dependable c.1300 headcount for the city, so population and urban footprint are low-confidence gameplay estimates. The qualitative ratings are grounded in its large jurisdiction, fortified status, agricultural and pastoral resources, and episcopal institutions.',
  sources:[
   ['Universidad de Extremadura — Arte y urbanismo de Plasencia en la Edad Media','https://dehesa.unex.es/server/api/core/bitstreams/7b9270ad-2dca-4bee-9753-49894da51e9f/content'],
   ['En la España Medieval — lordships in the Plasencia concejo around 1300','https://dialnet.unirioja.es/servlet/articulo?codigo=1226648'],
   ['Universidad de Extremadura — feudal society and the major Extremaduran concejos','https://dehesa.unex.es/server/api/core/bitstreams/555acba5-f66e-4f20-9770-893aabf1699c/content']
  ]
 },
 {
  id:'1300-porto',name:'Porto',modern:'Porto',country:'Kingdom of Portugal',subrealm:'Kingdom of Portugal · episcopal city and Atlantic-Douro port',
  lon:-8.6291,lat:41.1579,rarity:2,year:1300,people:6000,populationText:'≈6.0 K',populationConfidence:'medium',
  sizeText:'≈0.45 km²',sizeConfidence:'low',army:900,armyText:'≈900',navy:6,navyText:'≈6',
  food:74,technology:70,satisfaction:72,
  historicalRole:'Northern Portuguese port and commercial centre on the Douro',
  economy:'River and maritime trade, crafts, wine and regional exchange',
  militaryRole:'Fortified port city with a modest but useful maritime contribution',
  researchSummary:'Porto was the leading urban and commercial centre of northern Portugal. Around 1300 its importance came from the Douro crossing, maritime access and a growing mercantile economy.',
  evidenceNote:'The population uses a published c.1300 estimate of about 6,000. Size, army and navy are comparative gameplay estimates based on the medieval enclosure, port activity and urban scale.',
  sources:[
   ['Brill — An Agrarian History of Portugal, 1000–2000','https://brill.com/display/book/edcoll/9789004311527/B9789004311527-s003.xml'],
   ['Câmara Municipal do Porto — História da Cidade','https://www.cm-porto.pt/historia-da-cidade']
  ]
 },
 {
  id:'1300-braga',name:'Braga',modern:'Braga',country:'Kingdom of Portugal',subrealm:'Kingdom of Portugal · archiepiscopal lordship of Braga',
  lon:-8.4265,lat:41.5454,rarity:2,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–6 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:700,armyText:'≈700',navy:0,navyText:'0',
  food:72,technology:76,satisfaction:69,
  historicalRole:'Seat of the Archbishop of Braga and a major ecclesiastical centre of Portugal',
  economy:'Church rents, markets, crafts and agriculture from the fertile Minho region',
  militaryRole:'Walled ecclesiastical city; political influence exceeded its purely military weight',
  researchSummary:'Braga developed around its cathedral under powerful bishops and archbishops, whose lordship shaped the medieval city and gave it exceptional ecclesiastical importance.',
  evidenceNote:'No secure c.1300 census is available. Population is a low-confidence gameplay range; Technology is raised by Braga’s metropolitan church and clerical institutions.',
  sources:[
   ['Câmara Municipal de Braga — medieval ecclesiastical lordship','https://www.cm-braga.pt/en/1201/conhecer/historia-e-patrimonio/patrimonio-cultural/patrimonio-edificado/item/item-1-652'],
   ['Philobiblon — scholarship on Braga population and urban space','https://philobiblon.upf.edu/xtf/servlet/org.cdlib.xtf.dynaXML.DynaXML?source=/unified/Display/21707BITAGAP.Reference.xml&style=Reference.xsl']
  ]
 },
 {
  id:'1300-guimaraes',name:'Guimarães',modern:'Guimarães',country:'Kingdom of Portugal',subrealm:'Kingdom of Portugal · royal town',
  lon:-8.2962,lat:41.4444,rarity:1,year:1300,people:4500,populationText:'≈4.5 K',populationRange:'≈3.5–5.5 K',populationConfidence:'low',
  sizeText:'≈0.30 km²',sizeConfidence:'low',army:750,armyText:'≈750',navy:0,navyText:'0',
  food:70,technology:65,satisfaction:74,
  historicalRole:'Historic royal town, pilgrimage centre and symbolically important birthplace of Portuguese kingship',
  economy:'Textiles, leather, metal crafts, markets and agriculture',
  militaryRole:'Walled inland town centred on castle and collegiate precincts',
  researchSummary:'Guimarães remained an important medieval town built around the castle and collegiate church, with pilgrimage, craft production and strong symbolic links to the origins of Portugal.',
  evidenceNote:'Population is a low-confidence estimate because no direct c.1300 census survives. Other stats are comparative gameplay estimates derived from urban role and documented crafts.',
  sources:[
   ['UNESCO — Historic Centre of Guimarães','https://whc.unesco.org/en/list/1031'],
   ['Câmara Municipal de Guimarães — medieval history','https://www.cm-guimaraes.pt/conhecer']
  ]
 },
 {
  id:'1300-coimbra',name:'Coimbra',modern:'Coimbra',country:'Kingdom of Portugal',subrealm:'Kingdom of Portugal · royal city',
  lon:-8.4292,lat:40.2033,rarity:2,year:1300,people:6000,populationText:'≈6.0 K',populationConfidence:'medium',
  sizeText:'≈0.55 km²',sizeConfidence:'low',army:950,armyText:'≈950',navy:0,navyText:'0',
  food:76,technology:76,satisfaction:72,
  historicalRole:'Former royal capital, fortified Mondego city and major ecclesiastical centre',
  economy:'River trade, agriculture, crafts, court and church services',
  militaryRole:'Strong hilltop fortifications controlling a strategic Mondego crossing',
  researchSummary:'By 1300 Coimbra was no longer Portugal’s principal court city but remained strategically and ecclesiastically important. The Studium Generale was still in Lisbon in 1300 and moved to Coimbra only in 1308.',
  evidenceNote:'Population uses a published c.1300 estimate near 6,000. Technology reflects strong clerical and administrative traditions, but does not credit Coimbra with the university before its 1308 move.',
  sources:[
   ['Brill — An Agrarian History of Portugal, 1000–2000','https://brill.com/display/book/edcoll/9789004311527/B9789004311527-s003.xml'],
   ['Câmara Municipal de Coimbra — História da Cidade','https://www.cm-coimbra.pt/areas/viver/a-cidade/historia/historia-da-cidade'],
   ['Universidade de Coimbra — chronology of the Studium Generale','https://www.uc.pt/sobrenos/historia/xiii-a-xvi/']
  ]
 },
 {
  id:'1300-lisbon',name:'Lisbon',modern:'Lisbon',country:'Kingdom of Portugal',subrealm:'Kingdom of Portugal · principal royal and port city',
  lon:-9.1393,lat:38.7223,mapLon:-9.0000,mapLat:38.7350,rarity:4,year:1300,people:35000,populationText:'≈35.0 K',populationConfidence:'medium',
  sizeText:'≈1.50 km²',sizeConfidence:'low',army:3600,armyText:'≈3.6 K',navy:20,navyText:'≈20',
  food:80,technology:84,satisfaction:71,
  historicalRole:'Largest Portuguese city, major Atlantic-Tagus port and frequent centre of royal government',
  economy:'International maritime trade, shipbuilding, fisheries, crafts and Tagus-region commerce',
  militaryRole:'Large fortified port with the strongest naval potential in Portugal',
  researchSummary:'Around 1300 Lisbon was Portugal’s largest city and dominant port. The kingdom’s Studium Generale was founded there in 1290, reinforcing its administrative and intellectual importance.',
  evidenceNote:'Population uses a published c.1300 estimate around 35,000. Army, navy and size remain comparative gameplay estimates rather than recorded medieval totals.',
  sources:[
   ['Brill — An Agrarian History of Portugal, 1000–2000','https://brill.com/display/book/edcoll/9789004311527/B9789004311527-s003.xml'],
   ['Universidade de Coimbra — Studium Generale founded in Lisbon in 1290','https://www.uc.pt/sobrenos/historia/xiii-a-xvi/'],
   ['Encyclopaedia of Portuguese Expansion — Lisbon','https://eve.fcsh.unl.pt/en/places/lisbon']
  ]
 },
 {
  id:'1300-evora',name:'Évora',modern:'Évora',country:'Kingdom of Portugal',subrealm:'Kingdom of Portugal · major southern royal city',
  lon:-7.9135,lat:38.5714,rarity:3,year:1300,people:12000,populationText:'≈12.0 K',populationConfidence:'medium',
  sizeText:'≈0.75 km²',sizeConfidence:'low',army:1700,armyText:'≈1.7 K',navy:0,navyText:'0',
  food:84,technology:70,satisfaction:72,
  historicalRole:'Principal urban, religious and military centre of southern Portugal',
  economy:'Agriculture, livestock, crafts, regional trade and ecclesiastical activity',
  militaryRole:'Important walled southern city with strong regional command value',
  researchSummary:'After its conquest in 1165 Évora grew into the leading urban centre of southern Portugal, with cathedral, churches, monasteries and expanding medieval suburbs.',
  evidenceNote:'Population uses a published c.1300 estimate around 12,000. The other statistics are gameplay estimates based on its role as the south’s main regional centre.',
  sources:[
   ['Brill — An Agrarian History of Portugal, 1000–2000','https://brill.com/display/book/edcoll/9789004311527/B9789004311527-s003.xml'],
   ['Câmara Municipal de Évora — Síntese Histórica','https://www.cm-evora.pt/municipe/evora/patrimonio-da-humanidade/sintese-historica/']
  ]
 },
 {
  id:'1300-santarem',name:'Santarém',modern:'Santarém',country:'Kingdom of Portugal',subrealm:'Kingdom of Portugal · royal town on the Tagus',
  lon:-8.6868,lat:39.2362,rarity:2,year:1300,people:7000,populationText:'≈7.0 K',populationConfidence:'medium',
  sizeText:'≈0.55 km²',sizeConfidence:'low',army:1200,armyText:'≈1.2 K',navy:0,navyText:'0',
  food:90,technology:68,satisfaction:75,
  historicalRole:'Strategic Tagus town, royal residence and major market centre',
  economy:'Fertile Tagus agriculture, markets, river commerce and court demand',
  militaryRole:'Strong plateau position dominating the middle Tagus corridor',
  researchSummary:'Santarém combined strategic military value with rich agricultural surroundings and became one of the favourite towns of Portugal’s first dynasty.',
  evidenceNote:'Population uses a published c.1300 estimate around 7,000. Food is high because the town commanded exceptionally fertile Tagus meadowlands.',
  sources:[
   ['Brill — An Agrarian History of Portugal, 1000–2000','https://brill.com/display/book/edcoll/9789004311527/B9789004311527-s003.xml'],
   ['Visit Santarém — História','https://www.visitesantarem.pt/historia/'],
   ['Visit Portugal — Santarém','https://www.visitportugal.com/en/NR/exeres/735B1D26-65D2-4A21-9E80-EC88C09D7626']
  ]
 },
 {
  id:'1300-silves',name:'Silves',modern:'Silves',country:'Kingdom of Portugal',subrealm:'Kingdom of the Algarve · episcopal capital',
  lon:-8.4382,lat:37.1890,rarity:2,year:1300,people:6000,populationText:'≈6.0 K',populationRange:'≈4–8 K',populationConfidence:'low',
  sizeText:'≈0.50 km²',sizeConfidence:'low',army:1200,armyText:'≈1.2 K',navy:6,navyText:'≈6',
  food:82,technology:67,satisfaction:65,
  historicalRole:'Capital of the Algarve, episcopal seat and important fortified river-port city',
  economy:'Agriculture, river-port commerce, crafts and regional administration',
  militaryRole:'Strong castle and walls guarding the western Algarve and access to the Arade',
  researchSummary:'Silves had been the leading Islamic city of the Algarve and, after final Portuguese conquest, became the episcopal and administrative capital of the region.',
  evidenceNote:'No dependable c.1300 population survives, so the figure is a broad low-confidence estimate. Its regional capital status and river-port infrastructure justify above-average military and trade scores.',
  sources:[
   ['Junta de Freguesia de Silves — História','https://jf-silves.pt/historia/'],
   ['Câmara Municipal / local historical tradition on Silves','https://www.cm-silves.pt/']
  ]
 },
 {
  id:'1300-pamplona',name:'Pamplona',modern:'Pamplona',country:'Kingdom of Navarre',subrealm:'Kingdom of Navarre · Navarrería, San Cernin and San Nicolás',
  lon:-1.6440,lat:42.8125,rarity:3,year:1300,people:10000,populationText:'≈10.0 K',populationConfidence:'low',
  sizeText:'≈0.70 km²',sizeConfidence:'low',army:1500,armyText:'≈1.5 K',navy:0,navyText:'0',
  food:64,technology:75,satisfaction:54,
  historicalRole:'Capital and administrative centre of the Kingdom of Navarre, divided among three rival fortified boroughs',
  economy:'Crafts, markets, pilgrimage traffic and royal-administrative services',
  militaryRole:'Heavily fortified capital on the route across the western Pyrenees',
  researchSummary:'Around 1300 Pamplona was not yet a unified municipality: Navarrería, San Cernin and San Nicolás remained separate communities with their own walls and recurrent rivalries.',
  evidenceNote:'Population around 10,000 is plausible but not securely censused, so confidence is low. Satisfaction is reduced to reflect the unusually divided and conflict-prone urban structure.',
  sources:[
   ['Ayuntamiento de Pamplona — History of Pamplona','https://www.pamplona.es/en/turismo/murallas/historiadepamplona'],
   ['Cambridge — Urban centres and Crown of Navarre, 1300–1500','https://doi.org/10.1017/9781641892599.021']
  ]
 },
 {
  id:'1300-barcelona',name:'Barcelona',modern:'Barcelona',country:'Crown of Aragon',subrealm:'Principality of Catalonia · County of Barcelona',
  lon:2.1734,lat:41.3851,mapLon:2.1000,mapLat:41.4050,rarity:4,year:1300,people:35000,populationText:'≈35.0 K',populationRange:'≈30–40 K',populationConfidence:'medium',
  sizeText:'≈1.20 km²',sizeConfidence:'medium',army:3600,armyText:'≈3.6 K',navy:26,navyText:'≈26',
  food:76,technology:90,satisfaction:73,
  historicalRole:'Leading Catalan city, royal-comital centre and major Mediterranean commercial power',
  economy:'Maritime trade, finance, textiles, crafts and Mediterranean shipping',
  militaryRole:'Large walled city and the Crown’s strongest urban maritime base in Catalonia',
  researchSummary:'By 1300 Barcelona had expanded far beyond its Roman core, enclosed its suburbs in new 13th-century walls and become a major Mediterranean economic and political centre.',
  evidenceNote:'Population is set at about 35,000 within the commonly cited 30–40K range. The 13th-century walled expansion is approximately 120 hectares, giving unusually solid support for the size figure.',
  sources:[
   ['Museu d’Història de Barcelona — Romanesque/medieval city guide','https://www.barcelona.cat/museuhistoria/sites/default/files/guia_romanesque_eng.pdf'],
   ['Enciclopèdia Catalana — demographic apogee around 1200–1300','https://www.enciclopedia.cat/catalunya-romanica/del-1200-al-1300.-cap-a-lapogeu-medieval'],
   ['Oxford — The Medieval Crown of Aragon','https://academic.oup.com/book/26955']
  ]
 },
 {
  id:'1300-zaragoza',name:'Zaragoza',modern:'Zaragoza',country:'Crown of Aragon',subrealm:'Kingdom of Aragon · royal and administrative capital',
  lon:-0.8891,lat:41.6488,rarity:3,year:1300,people:22000,populationText:'≥22.0 K',populationConfidence:'high',
  sizeText:'≈1.00 km²',sizeConfidence:'low',army:2800,armyText:'≈2.8 K',navy:0,navyText:'0',
  food:84,technology:79,satisfaction:69,
  historicalRole:'Principal city of the Kingdom of Aragon and major Ebro commercial centre',
  economy:'Ebro agriculture, crafts, markets, river trade and royal administration',
  militaryRole:'Large fortified inland city controlling the middle Ebro corridor',
  researchSummary:'Zaragoza was the chief city of the Kingdom of Aragon. A 1302 monedaje provides unusually valuable near-date fiscal evidence for a population of at least about 22,000.',
  evidenceNote:'People is based on a near-contemporary 1302 fiscal reconstruction, making it one of the stronger demographic figures in this set. Other stats remain gameplay estimates.',
  sources:[
   ['Study of Zaragoza inventories and 1302 fiscal population','https://www.researchgate.net/publication/374168306_Inventarios_de_bienes_de_la_ciudad_de_Zaragoza_y_de_su_entorno_1316-1360'],
   ['Oxford — The Medieval Crown of Aragon','https://academic.oup.com/book/26955']
  ]
 },
 {
  id:'1300-girona',name:'Girona',modern:'Girona',country:'Crown of Aragon',subrealm:'Principality of Catalonia · episcopal and royal city',
  lon:2.8214,lat:41.9794,rarity:2,year:1300,people:8000,populationText:'≈8.0 K',populationConfidence:'medium',
  sizeText:'≈0.55 km²',sizeConfidence:'low',army:1300,armyText:'≈1.3 K',navy:0,navyText:'0',
  food:68,technology:79,satisfaction:64,
  historicalRole:'Important Catalan episcopal city and strategic fortress on the route from France',
  economy:'Crafts, cloth, markets, church activity and regional trade',
  militaryRole:'Strong strategic fortress recently tested by the French siege of 1285',
  researchSummary:'Girona combined episcopal, commercial and defensive importance. It had an early municipal organisation and played a major role during the French invasion and siege of 1285.',
  evidenceNote:'A local historical chronology places Girona around 8,000 inhabitants at the end of the 13th century, giving a reasonable near-date estimate.',
  sources:[
   ['Ajuntament de Girona — Història de la ciutat','https://www.girona.cat/transparencia/cat/historia.php'],
   ['University of Girona — medieval construction and urbanism','https://recerca.udg.edu/en/publications/construcci%C3%B3n-urbanismo-y-su-regulaci%C3%B3n-en-la-girona-medieval/']
  ]
 },
 {
  id:'1300-valencia',name:'Valencia',modern:'Valencia',country:'Crown of Aragon',subrealm:'Kingdom of Valencia · royal capital',
  lon:-0.3763,lat:39.4699,mapLon:-0.4400,mapLat:39.4850,rarity:4,year:1300,people:25000,populationText:'≈25.0 K',populationConfidence:'medium',
  sizeText:'≈1.00 km²',sizeConfidence:'low',army:2800,armyText:'≈2.8 K',navy:12,navyText:'≈12',
  food:92,technology:81,satisfaction:66,
  historicalRole:'Capital of the Kingdom of Valencia and rapidly growing Mediterranean commercial city',
  economy:'Intensive irrigated agriculture, ceramics, crafts, regional trade and Mediterranean shipping',
  militaryRole:'Large walled capital with coastal access through the Grao and strong royal strategic importance',
  researchSummary:'Valencia was the capital of its kingdom and was still undergoing major demographic and social transformation after the 1238 conquest. Around 1300 Christians and Muslims were approaching numerical parity in the city.',
  evidenceNote:'A Valencia history museum estimate gives roughly 25,000 inhabitants at the beginning of the 14th century. Food is exceptionally high because of the huerta irrigation system.',
  sources:[
   ['Museu d’Història de València — city around 1316','https://mhv.valencia.es/es/historia-viva/claves/el-obrador-medieval/una-ciudad-de-acogida-ano-1316'],
   ['Ajuntament de València — Época feudal','https://www.valencia.es/es/cas/la-ciudad/epoca-feudal']
  ]
 },
 {
  id:'1300-alicante',name:'Alicante',modern:'Alicante',country:'Crown of Aragon',subrealm:'Kingdom of Murcia under Aragonese occupation · captured 1296',
  lon:-0.4810,lat:38.3452,mapLon:-0.5500,mapLat:38.3600,rarity:2,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–6 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:1100,armyText:'≈1.1 K',navy:7,navyText:'≈7',
  food:76,technology:66,satisfaction:57,
  historicalRole:'Recently conquered Aragonese fortified port on the contested Murcia-Valencia frontier',
  economy:'Port trade, fishing, agriculture and regional exchange',
  militaryRole:'Castle-port controlling a strategically important stretch of Mediterranean coast',
  researchSummary:'Jaume II captured Alicante from Castile on 22 April 1296. In the exact 1300 snapshot the town was therefore under the Crown of Aragon.',
  evidenceNote:'No secure c.1300 population is available, so population and size are low-confidence estimates. Political ownership is high confidence because the 1296 conquest is directly documented.',
  sources:[
   ['Port of Alicante — History','https://www.puertoalicante.com/en/puerto-ciudad/historia/'],
   ['Ayuntamiento de Alicante — Privilegio de Jaime II, 1296','https://www.alicante.es/es/documentos/privilegio-jaime-ii']
  ]
 },
 {
  id:'1300-badajoz',name:'Badajoz',modern:'Badajoz',country:'Crown of Castile',subrealm:'Kingdom of León · Extremaduran bishopric and frontier city',
  lon:-6.9707,lat:38.8794,rarity:2,year:1300,people:7000,populationText:'≈7.0 K',populationRange:'≈5–9 K',populationConfidence:'low',
  sizeText:'≈0.50 km²',sizeConfidence:'low',army:1500,armyText:'≈1.5 K',navy:0,navyText:'0',
  food:78,technology:60,satisfaction:61,
  historicalRole:'Fortified episcopal city guarding the western Castilian-Leonese frontier against Portugal',
  economy:'Agriculture, livestock, frontier markets and episcopal administration',
  militaryRole:'Strong frontier fortress on the Guadiana with high strategic value',
  researchSummary:'Badajoz had been conquered by Alfonso IX of León in 1230 and developed as a Christian episcopal frontier centre facing Portugal.',
  evidenceNote:'No reliable c.1300 census survives. Population is therefore a low-confidence range, while Army is elevated for frontier and fortification importance.',
  sources:[
   ['Badajoz historical background','https://en.wikipedia.org/wiki/Badajoz'],
   ['Universidad Complutense — medieval lordship in Badajoz region','https://produccioncientifica.ucm.es/documentos/6198996949d6133331f3eaa5']
  ]
 },
 {
  id:'1300-cuenca',name:'Cuenca',modern:'Cuenca',country:'Crown of Castile',subrealm:'Kingdom of Castile · royal concejo',
  lon:-2.1374,lat:40.0704,rarity:2,year:1300,people:8000,populationText:'≈8.0 K',populationRange:'≈6–10 K',populationConfidence:'low',
  sizeText:'≈0.45 km²',sizeConfidence:'low',army:1400,armyText:'≈1.4 K',navy:0,navyText:'0',
  food:66,technology:73,satisfaction:69,
  historicalRole:'Fortified royal city with an important textile economy and large municipal territory',
  economy:'Wool, textiles, crafts, livestock and regional markets',
  militaryRole:'Exceptionally defensible hill city overlooking the Júcar and Huécar gorges',
  researchSummary:'After its 1177 conquest by Alfonso VIII, Cuenca expanded as a Christian and Jewish city. Medieval sources emphasize both its formidable fortifications and important textile production.',
  evidenceNote:'No direct 1300 headcount is available; population and size are low-confidence estimates. Technology reflects specialised textile production rather than modern-style science.',
  sources:[
   ['Spanish Ministry of Culture — Historic Walled Town of Cuenca','https://www.cultura.gob.es/en/cultura/areas/patrimonio/mc/patrimoniomundial/bienes-declarados/por-ano-de-inscripcion/1996/cuenca.html'],
   ['Studia Historica — Cuenca and Huete from late 13th century','https://doi.org/10.14201/shhme201634187211']
  ]
 },
 {
  id:'1300-guadalajara',name:'Guadalajara',modern:'Guadalajara',country:'Crown of Castile',subrealm:'Kingdom of Castile · royal town',
  lon:-3.1669,lat:40.6330,rarity:1,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–6 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:900,armyText:'≈900',navy:0,navyText:'0',
  food:72,technology:64,satisfaction:70,
  historicalRole:'Privileged royal town and market centre on the route between central Castile and the northeast',
  economy:'Agriculture, fairs, crafts and regional commerce',
  militaryRole:'Fortified inland town with useful strategic access toward the Henares corridor',
  researchSummary:'Guadalajara had belonged to Castile since 1085 and accumulated royal privileges, including fueros and rights connected to Cortes and fairs.',
  evidenceNote:'Population is a low-confidence estimate. Its moderate rarity reflects political and commercial relevance without the demographic scale of Toledo or Seville.',
  sources:[
   ['Turismo Guadalajara — Historia de la ciudad','https://turismo.guadalajara.es/es/descubre-guadalajara/historia/'],
   ['Studia Historica — urban power in Castile','https://revistas.usal.es/uno/index.php/Studia_H_Historia_Medieval/article/view/shhme201634187211']
  ]
 },
 {
  id:'1300-granada',name:'Granada',modern:'Granada',country:'Emirate of Granada',subrealm:'Nasrid Emirate of Granada · capital',
  lon:-3.5986,lat:37.1773,rarity:4,year:1300,people:90000,populationText:'≈90.0 K',populationRange:'≈90–150 K',populationConfidence:'low',
  sizeText:'≈1.80 km²',sizeConfidence:'low',army:8000,armyText:'≈8.0 K',navy:0,navyText:'0',
  food:90,technology:93,satisfaction:72,
  historicalRole:'Capital of the Nasrid Emirate and one of the largest, richest cities in Iberia',
  economy:'Silk, crafts, irrigated agriculture, taxation and long-distance Mediterranean trade',
  militaryRole:'Heavily fortified mountain-basin capital protected by the Alhambra and surrounding defensive system',
  researchSummary:'Granada was the capital of the Nasrid state founded in 1238, the last Muslim polity in medieval Iberia. Around 1300 it was already a major political, cultural and economic centre.',
  evidenceNote:'Published reconstructions vary sharply, roughly from 90,000 to 150,000 for 1300. The card conservatively uses 90,000 and marks the range low confidence.',
  sources:[
   ['Oxford Bibliographies — Nasrids of Granada','https://doi.org/10.1093/obo/9780195390155-0308'],
   ['Historical city-population source compilation for Granada','https://www.worldcitypop.com/data_source.asp?disp_city=Granada&disp_time=1300'],
   ['Oxford — City of Illusions: A History of Granada','https://academic.oup.com/book/38932/chapter-abstract/338114492']
  ]
 },
 {
  id:'1300-malaga',name:'Málaga',modern:'Málaga',country:'Emirate of Granada',subrealm:'Nasrid Emirate of Granada · principal Mediterranean port',
  lon:-4.4214,lat:36.7213,mapLon:-4.4214,mapLat:36.7850,rarity:3,year:1300,people:25000,populationText:'≈25.0 K',populationRange:'≈20–35 K',populationConfidence:'low',
  sizeText:'≈1.00 km²',sizeConfidence:'low',army:2800,armyText:'≈2.8 K',navy:18,navyText:'≈18',
  food:82,technology:82,satisfaction:68,
  historicalRole:'Major Nasrid Mediterranean port, fortified city and commercial gateway',
  economy:'Maritime trade, ceramics, agriculture, crafts and Mediterranean commerce',
  militaryRole:'Strong walled port protected by the Alcazaba and a complex urban defensive system',
  researchSummary:'Málaga entered the Nasrid Kingdom in 1238 and remained one of its key ports. Its fortified medina, suburbs and commercial activity made it one of the emirate’s most important cities.',
  evidenceNote:'The exact c.1300 population is uncertain and later 14th-century estimates are much higher, so the card uses a conservative low-confidence range. Navy is modeled from port significance rather than a recorded permanent fleet.',
  sources:[
   ['Ayuntamiento de Málaga — Historia ampliada','https://www.malaga.eu/la-ciudad/historia-de-la-ciudad/historia-ampliada/'],
   ['Málaga archaeological routes — Muslim Málaga','https://rutasarqueologicas.malaga.eu/malaga-musulmana/'],
   ['Alcazaba de Málaga — official history','https://alcazabaygibralfaro.malaga.eu/en/alcazaba/history/']
  ]
 },
 {
  id:'1300-nantes',name:'Nantes',modern:'Nantes',country:'Duchy of Brittany',subrealm:'Duchy of Brittany · ducal city on the Loire',
  lon:-1.5536,lat:47.2184,rarity:2,year:1300,people:10000,populationText:'≈10.0 K',populationRange:'≈8–12 K',populationConfidence:'low',
  sizeText:'≈0.70 km²',sizeConfidence:'low',army:1500,armyText:'≈1.5 K',navy:10,navyText:'≈10',
  food:78,technology:72,satisfaction:70,
  historicalRole:'One of the principal economic and ducal centres of independent Brittany',
  economy:'Loire trade, maritime commerce, crafts and regional agriculture',
  militaryRole:'Fortified river-port with ducal residence and useful naval capacity',
  researchSummary:'Nantes was firmly within the Duchy of Brittany in 1300 and had become one of its leading economic poles, strengthened by 13th-century ducal fortifications and its position at the Loire estuary.',
  evidenceNote:'No direct c.1300 census survives; population and size are low-confidence estimates. Political ownership and the city’s ducal-commercial role are well documented.',
  sources:[
   ['Nantes Patrimonia — Duché de Bretagne','https://patrimonia.nantes.fr/fiches-encyclopediques/duche-de-bretagne/'],
   ['Nantes Patrimonia — Moyen Âge','https://patrimonia.nantes.fr/periodes/moyen-age/']
  ]
 },
 {
  id:'1300-rennes',name:'Rennes',modern:'Rennes',country:'Duchy of Brittany',subrealm:'Duchy of Brittany · major eastern ducal centre',
  lon:-1.6778,lat:48.1173,rarity:2,year:1300,people:10000,populationText:'≈10.0 K',populationRange:'≈8–12 K',populationConfidence:'low',
  sizeText:'≈0.65 km²',sizeConfidence:'low',army:1600,armyText:'≈1.6 K',navy:0,navyText:'0',
  food:76,technology:70,satisfaction:68,
  historicalRole:'One of Brittany’s foremost political and commercial cities',
  economy:'Markets, crafts, regional agriculture and ducal administration',
  militaryRole:'Important fortified eastern city near the frontier with the French kingdom',
  researchSummary:'Rennes was one of the major urban centres of the Duchy of Brittany and a regular place of ducal power, especially important because of its eastern position.',
  evidenceNote:'Population is a broad low-confidence reconstruction; political placement inside the Duchy of Brittany is secure.',
  sources:[
   ['Nantes Patrimonia — Duché de Bretagne','https://patrimonia.nantes.fr/fiches-encyclopediques/duche-de-bretagne/'],
   ['Encyclopaedia Britannica — Rennes','https://www.britannica.com/place/Rennes']
  ]
 },
 {
  id:'1300-vannes',name:'Vannes',modern:'Vannes',country:'Duchy of Brittany',subrealm:'Duchy of Brittany · episcopal and port city',
  lon:-2.7608,lat:47.6582,rarity:1,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–6 K',populationConfidence:'low',
  sizeText:'≈0.30 km²',sizeConfidence:'low',army:800,armyText:'≈800',navy:4,navyText:'≈4',
  food:75,technology:67,satisfaction:72,
  historicalRole:'Episcopal port city and established Breton urban centre',
  economy:'Port trade, agriculture, church activity and local crafts',
  militaryRole:'Compact fortified episcopal city with a useful gulf port',
  researchSummary:'Vannes had an active medieval port and bishopric and was one of the established cities of the Breton duchy, although its greatest ducal prominence came later in the 14th and 15th centuries.',
  evidenceNote:'Population is low-confidence; the city’s port, bishopric and 12th–13th-century urban renewal are documented.',
  sources:[
   ['Ville de Vannes — Au fil de l’Histoire','https://www.mairie-vannes.fr/au-fil-de-lhistoire'],
   ['Ville de Vannes — Identité bretonne','https://www.mairie-vannes.fr/identite-bretonne']
  ]
 },
 {
  id:'1300-rouen',name:'Rouen',modern:'Rouen',country:'Kingdom of France',subrealm:'Royal Duchy of Normandy · capital and Seine port',
  lon:1.0993,lat:49.4432,rarity:4,year:1300,people:40000,populationText:'≈40.0 K',populationRange:'≈35–45 K',populationConfidence:'medium',
  sizeText:'≈1.50 km²',sizeConfidence:'low',army:4500,armyText:'≈4.5 K',navy:14,navyText:'≈14',
  food:79,technology:83,satisfaction:71,
  historicalRole:'Capital of Normandy and one of the largest commercial cities in the French kingdom',
  economy:'Textiles, Seine shipping, wine, salt, fish and international trade',
  militaryRole:'Major fortified river-port controlling the lower Seine',
  researchSummary:'Rouen entered the French royal domain in 1204 but retained its communal privileges and commercial power. Around 1300 it was among the kingdom’s most important cities after Paris.',
  evidenceNote:'Population is a medium-confidence order-of-magnitude estimate; economic and political role are strongly documented.',
  sources:[
   ['Ville de Rouen — Rouen au Moyen Âge','https://www.rouen.fr/fr/moyen-age'],
   ['Préfecture de Normandie — Histoire de la Normandie','https://www.prefectures-regions.gouv.fr/normandie/Region-et-institutions/Portrait-de-la-region/Histoire/Histoire-de-la-Normandie']
  ]
 },
 {
  id:'1300-caen',name:'Caen',modern:'Caen',country:'Kingdom of France',subrealm:'Royal Duchy of Normandy · major Norman city',
  lon:-0.3707,lat:49.1829,rarity:3,year:1300,people:20000,populationText:'≈20.0 K',populationRange:'≈15–22 K',populationConfidence:'low',
  sizeText:'≈1.00 km²',sizeConfidence:'low',army:2600,armyText:'≈2.6 K',navy:3,navyText:'≈3',
  food:77,technology:76,satisfaction:70,
  historicalRole:'Major Norman administrative, religious and commercial city',
  economy:'Markets, textiles, crafts, agriculture and regional trade',
  militaryRole:'Large fortified city dominated by the ducal castle',
  researchSummary:'Caen was conquered by Philip Augustus in 1204 and remained an important Norman city under the French crown, retaining major religious foundations and a powerful castle.',
  evidenceNote:'Population is low-confidence; the 1204 political transition and major urban role are well documented.',
  sources:[
   ['Ville de Caen — dates clés','https://caen.fr/node/83730'],
   ['Préfecture de Normandie — Histoire de la Normandie','https://www.prefectures-regions.gouv.fr/normandie/Region-et-institutions/Portrait-de-la-region/Histoire/Histoire-de-la-Normandie']
  ]
 },
 {
  id:'1300-amiens',name:'Amiens',modern:'Amiens',country:'Kingdom of France',subrealm:'Amiénois · French royal sphere',
  lon:2.2958,lat:49.8941,rarity:2,year:1300,people:20000,populationText:'≈20.0 K',populationRange:'≈15–25 K',populationConfidence:'low',
  sizeText:'≈0.90 km²',sizeConfidence:'low',army:2200,armyText:'≈2.2 K',navy:0,navyText:'0',
  food:74,technology:79,satisfaction:71,
  historicalRole:'Wealthy northern textile city and episcopal centre',
  economy:'Wool and cloth, woad, markets, crafts and river commerce',
  militaryRole:'Fortified northern city with strategic value between Paris and Flanders',
  researchSummary:'Amiens prospered through textiles and trade in the 13th century while the immense Gothic cathedral transformed the city’s ecclesiastical profile.',
  evidenceNote:'Population is a low-confidence estimate; commercial wealth and cathedral construction are well established.',
  sources:[
   ['Amiens Cathedral — official monument history','https://www.cathedrale-amiens.fr/en/discover/history-of-the-monument'],
   ['Encyclopaedia Britannica — Amiens','https://www.britannica.com/place/Amiens']
  ]
 },
 {
  id:'1300-paris',name:'Paris',modern:'Paris',country:'Kingdom of France',subrealm:'Royal domain · capital of Capetian government',
  lon:2.3522,lat:48.8566,rarity:4,year:1300,people:200000,populationText:'≈200 K',populationRange:'≈170–220 K',populationConfidence:'medium',
  sizeText:'≈4.4 km²',sizeConfidence:'medium',army:12000,armyText:'≈12.0 K',navy:0,navyText:'0',
  food:70,technology:96,satisfaction:64,
  historicalRole:'Political, intellectual and economic centre of the Capetian kingdom and one of Europe’s largest cities',
  economy:'Court, university, crafts, luxury production, markets and Seine commerce',
  militaryRole:'Enormous walled capital whose manpower and royal institutions gave exceptional defensive depth',
  researchSummary:'Around 1300 Paris was the centre of Philip IV’s government and one of the largest cities in western Europe. Its university and court gave it exceptional intellectual and political weight.',
  evidenceNote:'Medieval population estimates vary substantially; 200,000 is used as a rounded medium-confidence figure rather than a census.',
  sources:[
   ['Encyclopaedia Britannica — Paris history','https://www.britannica.com/place/Paris/History'],
   ['Paris Musées — medieval Paris collections','https://www.parismuseescollections.paris.fr/en']
  ]
 },
 {
  id:'1300-reims',name:'Reims',modern:'Reims',country:'Kingdom of France',subrealm:'Archbishopric of Reims · coronation city within the French kingdom',
  lon:4.0317,lat:49.2583,rarity:3,year:1300,people:20000,populationText:'≈20.0 K',populationRange:'≈15–25 K',populationConfidence:'low',
  sizeText:'≈0.90 km²',sizeConfidence:'low',army:1900,armyText:'≈1.9 K',navy:0,navyText:'0',
  food:73,technology:87,satisfaction:70,
  historicalRole:'Archiepiscopal metropolis and traditional coronation city of the French kings',
  economy:'Church wealth, cloth, wine, markets and regional commerce',
  militaryRole:'Walled ecclesiastical city with high symbolic and strategic value',
  researchSummary:'Reims combined the temporal lordship of its archbishop with its unique role in French kingship. The cathedral and archiepiscopal complex made it one of the kingdom’s most prestigious cities.',
  evidenceNote:'Population is low-confidence; institutional and ecclesiastical significance are high confidence.',
  sources:[
   ['Visit Reims — Cathedral district','https://visit.reims.fr/accueil/cathedral-district'],
   ['Visit Reims — Château Porte-Mars','https://visit.reims.fr/parcours-dans-la-ville/cite-des-sacres/chateau-porte-mars']
  ]
 },
 {
  id:'1300-troyes',name:'Troyes',modern:'Troyes',country:'County of Champagne',subrealm:'County of Champagne · personal union with the French crown through Joan I and Philip IV',
  lon:4.0744,lat:48.2973,rarity:3,year:1300,people:20000,populationText:'≈20.0 K',populationRange:'≈15–25 K',populationConfidence:'low',
  sizeText:'≈1.00 km²',sizeConfidence:'low',army:1900,armyText:'≈1.9 K',navy:0,navyText:'0',
  food:76,technology:82,satisfaction:70,
  historicalRole:'Principal city of Champagne and international fair centre',
  economy:'Champagne fairs, cloth, finance, crafts and long-distance commerce',
  militaryRole:'Walled county capital with strong economic rather than frontier-military power',
  researchSummary:'Troyes remained the leading city of Champagne’s famous fair system. In 1300 the county was ruled by Joan I of Navarre/Champagne and her husband Philip IV of France in personal union, not yet simply erased as a separate county.',
  evidenceNote:'Population is low-confidence. The fair system and the county’s personal-union status are well documented.',
  sources:[
   ['Ville de Troyes — medieval history','https://www.ville-troyes.fr/decouvrir-troyes/troyes-une-histoire-passionnante/'],
   ['Larousse — French royal domain and Champagne','https://www.larousse.fr/encyclopedie/divers/domaine_royal/44341']
  ]
 },
 {
  id:'1300-provins',name:'Provins',modern:'Provins',country:'County of Champagne',subrealm:'County of Champagne · international fair city',
  lon:3.2990,lat:48.5601,rarity:2,year:1300,people:10000,populationText:'≈10.0 K',populationRange:'≈8–15 K',populationConfidence:'low',
  sizeText:'≈0.65 km²',sizeConfidence:'low',army:1100,armyText:'≈1.1 K',navy:0,navyText:'0',
  food:70,technology:83,satisfaction:68,
  historicalRole:'Merchant city of the Champagne fairs at the end of their great 12th–13th-century apogee',
  economy:'International fairs, money-changing, cloth, warehousing and crafts',
  militaryRole:'Strongly fortified commercial town',
  researchSummary:'Provins was one of the defining merchant cities of the Champagne fairs. Its economic zenith lay in the 12th and 13th centuries, so the 1300 card captures a still-important centre beginning to pass its peak.',
  evidenceNote:'Population is low-confidence; international commercial significance is high confidence.',
  sources:[
   ['Provins Tourisme — UNESCO medieval town','https://provins.net/en/discover-visit/the-medieval-town-of-provins/provins-unesco/'],
   ['Provins Tourisme — Tithe Barn and fairs','https://provins.net/en/the-tithe-barn-of-provins/']
  ]
 },
 {
  id:'1300-dijon',name:'Dijon',modern:'Dijon',country:'Duchy of Burgundy',subrealm:'Duchy of Burgundy · ducal capital under Robert II',
  lon:5.0415,lat:47.3220,rarity:3,year:1300,people:12000,populationText:'≈12.0 K',populationRange:'≈10–15 K',populationConfidence:'low',
  sizeText:'≈0.75 km²',sizeConfidence:'low',army:1800,armyText:'≈1.8 K',navy:0,navyText:'0',
  food:79,technology:75,satisfaction:72,
  historicalRole:'Capital of the Capetian Duchy of Burgundy',
  economy:'Ducal administration, wine, crafts, markets and regional trade',
  militaryRole:'Walled ducal capital with central command value',
  researchSummary:'Dijon had been the capital of the Duchy of Burgundy since the 11th century. In 1300 Duke Robert II still ruled the duchy as a major prince of the French kingdom.',
  evidenceNote:'Population is low-confidence; political ownership and Dijon’s status as ducal capital are high confidence.',
  sources:[
   ['Dijon Patrimoine — Dijon au Moyen Âge','https://patrimoine.dijon.fr/wp-content/uploads/sites/20/2025/05/Dijon_dossier_moyen-age_2025.pdf'],
   ['Académie de Dijon — Robert II, duc de Bourgogne','https://www.academie-sabl-dijon.org/celebration/robert-ii-duc-de-bourgogne/']
  ]
 },
 {
  id:'1300-tours',name:'Tours',modern:'Tours',country:'Kingdom of France',subrealm:'Touraine · French royal domain',
  lon:0.6848,lat:47.3941,rarity:2,year:1300,people:10000,populationText:'≈10.0 K',populationRange:'≈8–12 K',populationConfidence:'low',
  sizeText:'≈0.65 km²',sizeConfidence:'low',army:1300,armyText:'≈1.3 K',navy:0,navyText:'0',
  food:82,technology:76,satisfaction:73,
  historicalRole:'Important Loire city, pilgrimage centre and regional commercial hub',
  economy:'Pilgrimage, river commerce, agriculture, crafts and church activity',
  militaryRole:'Fortified Loire crossing with strategic central location',
  researchSummary:'Tours remained an important Loire centre around the shrine of Saint Martin and the episcopal city, under Capetian control after the collapse of Plantagenet power north of the Loire.',
  evidenceNote:'Population is low-confidence; importance as a religious and Loire-route centre is well established.',
  sources:[
   ['Encyclopaedia Britannica — Tours','https://www.britannica.com/place/Tours'],
   ['Ville de Tours — official site','https://www.tours.fr/']
  ]
 },
 {
  id:'1300-angers',name:'Angers',modern:'Angers',country:'County of Anjou',subrealm:'County of Anjou · held by Charles of Valois from 1290',
  lon:-0.5632,lat:47.4784,rarity:2,year:1300,people:12000,populationText:'≈12.0 K',populationRange:'≈10–15 K',populationConfidence:'low',
  sizeText:'≈0.80 km²',sizeConfidence:'low',army:1900,armyText:'≈1.9 K',navy:0,navyText:'0',
  food:82,technology:76,satisfaction:70,
  historicalRole:'Capital of the County of Anjou and major fortress-city on the Maine',
  economy:'Agriculture, river trade, crafts, church institutions and princely administration',
  militaryRole:'Powerful 13th-century castle and 3.8 km urban enceinte facing independent Brittany',
  researchSummary:'Angers was not simply direct royal France in 1300: Charles of Valois had held the County of Anjou since 1290. The massive royal-era castle and walls made the city one of western France’s strongest fortresses.',
  evidenceNote:'Population is low-confidence; the ownership by Charles of Valois and major 13th-century fortifications are documented.',
  sources:[
   ['Archives d’Angers — Les princes angevins','https://archives.angers.fr/aide-memoire/angers-en-dates/angers-dans-l-histoire/les-princes-angevins/index.html'],
   ['Archives départementales Maine-et-Loire — L’Anjou au cours des siècles','https://archives.maine-et-loire.fr/decouvrir-et-apprendre/parcourir-lhistoire-de-lanjou/lanjou-au-cours-des-siecles']
  ]
 },
 {
  id:'1300-poitiers',name:'Poitiers',modern:'Poitiers',country:'Kingdom of France',subrealm:'Poitou · reverted to the French royal domain in 1271',
  lon:0.3404,lat:46.5802,rarity:2,year:1300,people:10000,populationText:'≈10.0 K',populationRange:'≈8–13 K',populationConfidence:'low',
  sizeText:'≈0.80 km²',sizeConfidence:'low',army:1400,armyText:'≈1.4 K',navy:0,navyText:'0',
  food:76,technology:75,satisfaction:70,
  historicalRole:'Major administrative and ecclesiastical centre of Poitou',
  economy:'Markets, crafts, agriculture, church institutions and regional exchange',
  militaryRole:'Strong walled hill city with commanding position',
  researchSummary:'After the death of Alphonse of Poitiers in 1271, Poitou reverted to the royal domain. Poitiers remained its principal urban and administrative centre.',
  evidenceNote:'Population is low-confidence; political placement in the royal domain after 1271 is firm.',
  sources:[
   ['Encyclopaedia Britannica — Poitiers','https://www.britannica.com/place/Poitiers-France'],
   ['Larousse — domaine royal','https://www.larousse.fr/encyclopedie/divers/domaine_royal/44341']
  ]
 },
 {
  id:'1300-la-rochelle',name:'La Rochelle',modern:'La Rochelle',country:'Kingdom of France',subrealm:'Aunis/Saintonge frontier · French royal port',
  lon:-1.1511,lat:46.1603,rarity:3,year:1300,people:12000,populationText:'≈12.0 K',populationRange:'≈10–15 K',populationConfidence:'low',
  sizeText:'≈0.70 km²',sizeConfidence:'low',army:1500,armyText:'≈1.5 K',navy:15,navyText:'≈15',
  food:75,technology:78,satisfaction:72,
  historicalRole:'Important Atlantic trading port of the French crown',
  economy:'Wine, salt, Atlantic shipping, fisheries and merchant trade',
  militaryRole:'Walled port with substantial merchant-maritime capacity',
  researchSummary:'La Rochelle was a strategically important Atlantic port in the French royal sphere by 1300, with extensive maritime trade and strong urban privileges.',
  evidenceNote:'Population and navy are gameplay estimates; port significance and French political control are well established.',
  sources:[
   ['Encyclopaedia Britannica — La Rochelle','https://www.britannica.com/place/La-Rochelle'],
   ['Ville de La Rochelle — official site','https://www.larochelle.fr/']
  ]
 },
 {
  id:'1300-orleans',name:'Orléans',modern:'Orléans',country:'Kingdom of France',subrealm:'Orléanais · core Capetian royal domain',
  lon:1.9093,lat:47.9029,rarity:3,year:1300,people:15000,populationText:'≈15.0 K',populationRange:'≈12–18 K',populationConfidence:'low',
  sizeText:'≈0.85 km²',sizeConfidence:'low',army:1800,armyText:'≈1.8 K',navy:0,navyText:'0',
  food:85,technology:82,satisfaction:73,
  historicalRole:'Core royal-domain city and strategic Loire crossing',
  economy:'Loire river trade, agriculture, crafts, markets and legal learning',
  militaryRole:'Key fortified bridge city guarding the Loire corridor',
  researchSummary:'Orléans was one of the oldest pillars of the Capetian royal domain. Philip IV was physically present there in July 1300, underlining its continuing place in royal itineration.',
  evidenceNote:'Population is low-confidence; direct royal-domain status is high confidence.',
  sources:[
   ['TELMA — Act of Philip IV at Orléans, July 1300','https://telma-chartes.irht.cnrs.fr/actes-philippe4.php/16742'],
   ['FranceArchives — Orléans privileges and royal affairs','https://francearchives.gouv.fr/facomponent/a04b0ebb5a3a485f356d4db567719c1f9b8a8ac6']
  ]
 },
 {
  id:'1300-bourges',name:'Bourges',modern:'Bourges',country:'Kingdom of France',subrealm:'Berry · French royal domain',
  lon:2.3988,lat:47.0810,rarity:2,year:1300,people:15000,populationText:'≈15.0 K',populationRange:'≈12–18 K',populationConfidence:'low',
  sizeText:'≈0.85 km²',sizeConfidence:'low',army:1700,armyText:'≈1.7 K',navy:0,navyText:'0',
  food:78,technology:79,satisfaction:72,
  historicalRole:'Major central royal city and archiepiscopal centre of Berry',
  economy:'Agriculture, crafts, markets, ecclesiastical wealth and regional administration',
  militaryRole:'Large walled inland city in the secure royal heartland',
  researchSummary:'Berry, centred on Bourges, had belonged to the Capetian royal domain since the early 12th century. Bourges combined archiepiscopal and royal-administrative weight.',
  evidenceNote:'Population is low-confidence; royal ownership is well established.',
  sources:[
   ['Encyclopaedia Britannica — Bourges','https://www.britannica.com/place/Bourges'],
   ['Larousse — French royal domain','https://www.larousse.fr/encyclopedie/divers/domaine_royal/44341']
  ]
 },
 {
  id:'1300-limoges',name:'Limoges',modern:'Limoges',country:'Viscounty of Limoges',subrealm:'Bipartite city: Château under viscomital/communal power; Cité under the bishop',
  lon:1.2611,lat:45.8336,rarity:2,year:1300,people:12000,populationText:'≈12.0 K',populationRange:'≈10–15 K',populationConfidence:'low',
  sizeText:'≈0.75 km²',sizeConfidence:'low',army:1400,armyText:'≈1.4 K',navy:0,navyText:'0',
  food:72,technology:88,satisfaction:64,
  historicalRole:'Famous enamel-production and pilgrimage centre divided between two urban jurisdictions',
  economy:'Limoges enamels, pilgrimage, crafts, trade and church institutions',
  militaryRole:'Two fortified urban nuclei with fragmented lordship rather than unified military command',
  researchSummary:'Limoges around 1300 was not a simple French royal city. It consisted of the episcopal Cité and the Château, linked to the Viscounty of Limoges, which passed into the Dreux-Brittany dynasty around 1290.',
  evidenceNote:'Population is low-confidence. The divided urban jurisdiction and viscomital status are documented; Technology is high because of the internationally renowned Limoges enamel industry and Saint-Martial cultural tradition.',
  sources:[
   ['Ville de Limoges — portrait and medieval history','https://www.limoges.fr/ville-creative/portrait-dune-ville'],
   ['Musée des Beaux-Arts de Limoges — Limoges au Moyen Âge','https://beauxarts.limoges.fr/sites/musee_des_beaux_arts/files/3-1-histoire-de-limoges-au-moyen-age.pdf']
  ]
 },
 {
  id:'1300-bordeaux',name:'Bordeaux',modern:'Bordeaux',country:'Duchy of Aquitaine (English Crown)',subrealm:'Duchy of Aquitaine/Gascony · held by Edward I as duke',
  lon:-0.5792,lat:44.8378,rarity:4,year:1300,people:30000,populationText:'≈30.0 K',populationRange:'≈25–35 K',populationConfidence:'low',
  sizeText:'≈1.20 km²',sizeConfidence:'low',army:3200,armyText:'≈3.2 K',navy:18,navyText:'≈18',
  food:80,technology:82,satisfaction:74,
  historicalRole:'Principal city of English-ruled Gascony and major wine-export port',
  economy:'Wine exports, Atlantic shipping, finance, crafts and regional trade',
  militaryRole:'Major fortified river-port and administrative centre of the English duchy',
  researchSummary:'In 1300 Bordeaux was under Edward I’s authority as duke of Aquitaine/Gascony, even though the duchy was feudally held from the French king. Its English trade connection made the city exceptionally prosperous.',
  evidenceNote:'Population is low-confidence; political dependence on the English crown and wine-export economy are high confidence.',
  sources:[
   ['Gascon Rolls Project — English administration of Gascony','https://www.gasconrolls.org/'],
   ['Bordeaux — English community and medieval wine trade','https://seniorsreporters.bordeaux.fr/2026/06/03/la-communaute-anglaise-de-bordeaux/']
  ]
 },
 {
  id:'1300-bayonne',name:'Bayonne',modern:'Bayonne',country:'Duchy of Aquitaine (English Crown)',subrealm:'English-held Gascony · directly administered royal port',
  lon:-1.4748,lat:43.4929,rarity:2,year:1300,people:10000,populationText:'≈10.0 K',populationRange:'≈8–12 K',populationConfidence:'low',
  sizeText:'≈0.60 km²',sizeConfidence:'low',army:1400,armyText:'≈1.4 K',navy:16,navyText:'≈16',
  food:76,technology:73,satisfaction:76,
  historicalRole:'Important English-Gascon fortified port and shipbuilding centre',
  economy:'Shipping, shipbuilding, wine transport, fisheries and Atlantic trade',
  militaryRole:'Fortified port with a notably active fleet and direct English royal administration',
  researchSummary:'Bayonne had been incorporated into the Aquitanian lands of the English crown after 1152 and by 1300 was administered through English royal officers. Its maritime community was one of the strongest in Gascony.',
  evidenceNote:'Population is low-confidence; English political authority and maritime role are directly documented.',
  sources:[
   ['Ville de Bayonne — formation of the city','https://www.bayonne.fr/cest-a-bayonne/culture/histoire-et-patrimoines/une-ville-dart-et-dhistoire/comprendre-la-formation-de-la-ville'],
   ['Ville de Bayonne — heritage brochure','https://www.bayonne.fr/fileadmin/medias/Publications/Patrimoine_-_VAH/Parcours_Bayonne.pdf']
  ]
 },
 {
  id:'1300-toulouse',name:'Toulouse',modern:'Toulouse',country:'Kingdom of France',subrealm:'Former County of Toulouse · direct royal domain since 1271',
  lon:1.4442,lat:43.6047,rarity:4,year:1300,people:35000,populationText:'≈35.0 K',populationRange:'≈30–40 K',populationConfidence:'low',
  sizeText:'≈1.60 km²',sizeConfidence:'low',army:3600,armyText:'≈3.6 K',navy:0,navyText:'0',
  food:89,technology:91,satisfaction:67,
  historicalRole:'Great southern commercial, university and administrative city newly integrated into the royal domain',
  economy:'Grain, crafts, mills, regional trade and university activity',
  militaryRole:'Large walled city with major manpower and regional command value',
  researchSummary:'The County and city of Toulouse entered the French royal domain in 1271. By 1300 the city remained a rich merchant centre with consular traditions, a university and major religious institutions.',
  evidenceNote:'Population is low-confidence; the 1271 royal incorporation is directly documented by Toulouse archives.',
  sources:[
   ['Toulouse Archives — Le Moyen Âge','https://www.archives.toulouse.fr/histoire-de-toulouse/le-moyen-age'],
   ['Toulouse Archives — 1271 incorporation into royal domain','https://www.archives.toulouse.fr/en/histoire-de-toulouse/chronologie?_2_WAR_archiveportlet_INSTANCE_5awtB7cA9vC4_uid=225']
  ]
 },
 {
  id:'1300-carcassonne',name:'Carcassonne',modern:'Carcassonne',country:'Kingdom of France',subrealm:'Royal sénéchaussée and frontier fortress of Languedoc',
  lon:2.3537,lat:43.2130,rarity:3,year:1300,people:10000,populationText:'≈10.0 K',populationRange:'≈8–12 K',populationConfidence:'low',
  sizeText:'≈0.75 km²',sizeConfidence:'low',army:2200,armyText:'≈2.2 K',navy:0,navyText:'0',
  food:72,technology:72,satisfaction:61,
  historicalRole:'One of the French crown’s premier southern fortresses',
  economy:'Regional markets, crafts, military administration and agriculture',
  militaryRole:'Exceptional double-walled royal fortress modernised under Philip III and Philip IV',
  researchSummary:'Carcassonne had entered the French royal domain in the 13th century and around 1300 was being developed as a massive royal stronghold close to the southern frontier.',
  evidenceNote:'Population is low-confidence; military strength is deliberately high because the surviving 13th-century fortification programme is exceptionally well documented.',
  sources:[
   ['Centre des monuments nationaux — Carcassonne history','https://www.remparts-carcassonne.fr/en/discover/history-of-the-monument'],
   ['Cité de Carcassonne — attachment to royal domain','https://citedecarcassonne.culture.gouv.fr/fr/le-rattachement-au-domaine-royal']
  ]
 },
 {
  id:'1300-montpellier',name:'Montpellier',modern:'Montpellier',country:'Kingdom of Majorca',subrealm:'Lordship of Montpellier · possession of the kings of Majorca',
  lon:3.8767,lat:43.6108,rarity:4,year:1300,people:35000,populationText:'≈35.0 K',populationRange:'≈30–40 K',populationConfidence:'medium',
  sizeText:'≈1.10 km²',sizeConfidence:'low',army:2600,armyText:'≈2.6 K',navy:4,navyText:'≈4',
  food:81,technology:93,satisfaction:74,
  historicalRole:'Major Mediterranean commercial and medical-learning centre under the kings of Majorca',
  economy:'Mediterranean trade, medicine, textiles, finance, spices and Lattes port traffic',
  militaryRole:'Large walled commercial city with limited direct naval capacity through nearby Lattes',
  researchSummary:'Montpellier was not French in 1300. The lordship had passed through Aragon to the kings of Majorca and remained theirs until its sale to the French crown in 1349.',
  evidenceNote:'Population is a medium-confidence order-of-magnitude estimate. Political ownership is high confidence.',
  sources:[
   ['Ville de Montpellier — Marie and the lordship of Montpellier','https://en-commun.montpellier.fr/articles/2025-08-18-marie-la-derniere-dame-de-montpellier'],
   ['Cambridge — A Mediterranean Emporium / Kingdom of Majorca','https://www.cambridge.org/core/books/abs/mediterranean-emporium/montpellier-inquest-13381339/DE2160EBBA43F6547AD75DC3B1683B36']
  ]
 },
 {
  id:'1300-lyon',name:'Lyon',modern:'Lyon',country:'Archbishopric of Lyon (Holy Roman Empire)',subrealm:'Imperial archiepiscopal city · not annexed to France until 1312',
  lon:4.8357,lat:45.7640,rarity:3,year:1300,people:15000,populationText:'≈15.0 K',populationRange:'≈12–20 K',populationConfidence:'low',
  sizeText:'≈0.90 km²',sizeConfidence:'low',army:1700,armyText:'≈1.7 K',navy:0,navyText:'0',
  food:77,technology:82,satisfaction:55,
  historicalRole:'Imperial archiepiscopal city at a major Rhône-Saône crossroads',
  economy:'River trade, crafts, church wealth and long-distance transit',
  militaryRole:'Fortified strategic crossroads contested between archbishop, citizens and growing French influence',
  researchSummary:'In 1300 Lyon still unquestionably belonged to the Empire and remained under archiepiscopal lordship. French control intensified after 1307 and the definitive incorporation occurred only in 1312.',
  evidenceNote:'Population is low-confidence. Satisfaction is reduced to reflect the documented conflict between archbishop, chapter, citizens and increasingly interventionist French monarchy.',
  sources:[
   ['Archives de Lyon — Lyon au fil du temps','https://www.archives-lyon.fr/expos/lyon-au-fil-du-temps'],
   ['Archives de Lyon — chronology around 1297–1312','https://www.archives-lyon.fr/arrive-a-lyon?page=9']
  ]
 },
 {
  id:'1300-vienne',name:'Vienne',modern:'Vienne',country:'Archbishopric of Vienne (Holy Roman Empire)',subrealm:'Imperial prince-archbishopric · city ruled by the Archbishop of Vienne',
  lon:4.8747,lat:45.5256,rarity:2,year:1300,people:7000,populationText:'≈7.0 K',populationRange:'≈5–9 K',populationConfidence:'low',
  sizeText:'≈0.50 km²',sizeConfidence:'low',army:1000,armyText:'≈1.0 K',navy:0,navyText:'0',
  food:75,technology:79,satisfaction:65,
  historicalRole:'Imperial archiepiscopal city and major ecclesiastical centre on the Rhône',
  economy:'Church institutions, Rhône trade, crafts and surrounding agriculture',
  militaryRole:'Fortified river city under a powerful prince-archbishop',
  researchSummary:'Vienne was still a city of the Holy Roman Empire in 1300. The archbishop exercised temporal rule; the city was not included in the 1349 sale of Dauphiné and did not become French until the mid-15th century.',
  evidenceNote:'Population is low-confidence; imperial and archiepiscopal sovereignty are high confidence.',
  sources:[
   ['Ville de Vienne — Archéologie and historical overview','https://vienne.fr/nos-services/archeologie/'],
   ['Cambridge Medieval History — ecclesiastical principalities of Viennois','https://cristoraul.org/english/readinghall/thirdmillenniumlibrary/Medieval-History-Chapters/PDF/NCMedH_6-1198-1300.pdf']
  ]
 },
 {
  id:'1300-marseille',name:'Marseille',modern:'Marseille',country:'County of Provence',subrealm:'Angevin County of Provence · under Charles II of Naples',
  lon:5.3698,lat:43.2965,rarity:3,year:1300,people:15000,populationText:'≈15.0 K',populationRange:'≈12–20 K',populationConfidence:'low',
  sizeText:'≈0.85 km²',sizeConfidence:'low',army:1800,armyText:'≈1.8 K',navy:20,navyText:'≈20',
  food:72,technology:80,satisfaction:62,
  historicalRole:'Leading Provençal Mediterranean port under Angevin comital rule',
  economy:'Mediterranean shipping, trade, fisheries, crafts and provisioning',
  militaryRole:'Strong maritime city whose independent traditions had been subdued by the Angevin counts',
  researchSummary:'Marseille was not French in 1300. It lay in the County of Provence, then ruled by Charles II of Anjou-Naples, after Charles I had forcibly reduced the city’s autonomy in the 13th century.',
  evidenceNote:'Population is low-confidence; Provence’s Angevin government under Charles II (1285–1309) is securely documented.',
  sources:[
   ['Ville de Marseille — 2,600 ans d’histoire','https://www.marseille.fr/decouvrir-marseille/histoire-de-marseille/pr%C3%A9sentation'],
   ['École française de Rome — Provence under Charles II, 1285–1309','https://www.persee.fr/doc/efr_0223-5099_2008_act_399_1_9274']
  ]
 },
 {
  id:'1300-aix-en-provence',name:'Aix-en-Provence',modern:'Aix-en-Provence',country:'County of Provence',subrealm:'Angevin County of Provence · principal comital capital',
  lon:5.4474,lat:43.5297,rarity:3,year:1300,people:10000,populationText:'≈10.0 K',populationRange:'≈8–12 K',populationConfidence:'low',
  sizeText:'≈0.60 km²',sizeConfidence:'low',army:1400,armyText:'≈1.4 K',navy:0,navyText:'0',
  food:78,technology:78,satisfaction:70,
  historicalRole:'Political and administrative capital of Angevin Provence',
  economy:'Comital administration, markets, crafts, agriculture and regional trade',
  militaryRole:'Inland comital centre with strong administrative and strategic importance',
  researchSummary:'Aix occupied the political centre of the County of Provence and remained a key comital residence under the Angevin dynasty. In 1300 it was ruled by Charles II, king of Naples and count of Provence.',
  evidenceNote:'Population is low-confidence; Aix’s political centrality within Provence and Charles II’s rule are well documented.',
  sources:[
   ['Persée — Aix, capitale de la Provence angevine','https://www.persee.fr/doc/efr_0223-5099_1998_act_245_1_5324'],
   ['École française de Rome — Provence under Charles II, 1285–1309','https://www.persee.fr/doc/efr_0223-5099_2008_act_399_1_9274']
  ]
 },
 {
  id:'1300-bruges',name:'Bruges',modern:'Bruges',country:'County of Flanders',subrealm:'County of Flanders · under French occupation during 1300',
  lon:3.2247,lat:51.2093,rarity:4,year:1300,people:40000,populationText:'≈40.0 K',populationRange:'≈35–45 K',populationConfidence:'medium',
  sizeText:'≈2.0 km²',sizeConfidence:'low',army:4200,armyText:'≈4.2 K',navy:18,navyText:'≈18',
  food:74,technology:90,satisfaction:58,
  historicalRole:'One of north-west Europe’s foremost cloth, finance and international trading cities',
  economy:'Cloth, wool, merchant finance, fairs, maritime trade through the Zwin and luxury crafts',
  militaryRole:'Large fortified commercial city with substantial civic militia and maritime connections',
  researchSummary:'Bruges was among Europe’s great commercial cities around 1300. The county remained Flanders, although Philip IV’s forces occupied it in 1300 before the Flemish revolt of 1302.',
  evidenceNote:'Population is an approximate historical range. Army, navy and scores are comparative gameplay estimates; the 1300 French occupation is noted without relabelling the underlying county.',
  sources:[['Bruges','https://en.wikipedia.org/wiki/Bruges'],['County of Flanders','https://en.wikipedia.org/wiki/County_of_Flanders']]
 },
 {
  id:'1300-ghent',name:'Ghent',modern:'Ghent',country:'County of Flanders',subrealm:'County of Flanders · under French occupation during 1300',
  lon:3.7174,lat:51.0543,rarity:4,year:1300,people:50000,populationText:'≈50.0 K',populationRange:'≈45–60 K',populationConfidence:'medium',
  sizeText:'≈2.2 km²',sizeConfidence:'low',army:5200,armyText:'≈5.2 K',navy:4,navyText:'≈4',
  food:79,technology:88,satisfaction:60,
  historicalRole:'Huge cloth-producing commune and one of the largest cities north of the Alps',
  economy:'Wool textiles, grain trade, crafts, river transport and merchant capital',
  militaryRole:'Exceptionally large urban militia backed by wealthy guilds and strong fortifications',
  researchSummary:'Ghent’s cloth industry, guild organisation and demographic scale made it a heavyweight within Flanders around 1300.',
  evidenceNote:'Population is a medium-confidence range rather than a census. High Army reflects urban militia potential, not a standing army.',
  sources:[['Ghent','https://en.wikipedia.org/wiki/Ghent'],['County of Flanders','https://en.wikipedia.org/wiki/County_of_Flanders']]
 },
 {
  id:'1300-ypres',name:'Ypres',modern:'Ypres',country:'County of Flanders',subrealm:'County of Flanders · major cloth city',
  lon:2.8860,lat:50.8514,rarity:3,year:1300,people:25000,populationText:'≈25.0 K',populationRange:'≈20–30 K',populationConfidence:'low',
  sizeText:'≈1.2 km²',sizeConfidence:'low',army:2800,armyText:'≈2.8 K',navy:0,navyText:'0',
  food:71,technology:86,satisfaction:59,
  historicalRole:'Internationally important Flemish cloth-manufacturing city',
  economy:'Fine woollen cloth, markets, guild crafts and long-distance trade',
  militaryRole:'Walled industrial commune with a substantial civic militia',
  researchSummary:'Ypres formed with Bruges and Ghent the famous trio of great Flemish cloth cities.',
  evidenceNote:'Population is low-confidence; economic significance of its textile industry is high confidence.',
  sources:[['Ypres','https://en.wikipedia.org/wiki/Ypres'],['County of Flanders','https://en.wikipedia.org/wiki/County_of_Flanders']]
 },
 {
  id:'1300-leuven',name:'Leuven',modern:'Leuven',country:'Duchy of Brabant',subrealm:'Duchy of Brabant · historic ducal centre',
  lon:4.7005,lat:50.8798,rarity:3,year:1300,people:15000,populationText:'≈15.0 K',populationRange:'≈12–18 K',populationConfidence:'low',
  sizeText:'≈1.0 km²',sizeConfidence:'low',army:1900,armyText:'≈1.9 K',navy:0,navyText:'0',
  food:77,technology:77,satisfaction:70,
  historicalRole:'Historic seat of the dukes of Brabant and important cloth-producing town',
  economy:'Cloth, crafts, markets, brewing and regional agriculture',
  militaryRole:'Large walled Brabantine city with ducal and civic military importance',
  researchSummary:'Leuven remained one of Brabant’s principal towns around 1300 even as Brussels increasingly shared ducal political importance.',
  evidenceNote:'Population is low-confidence; no university credit is applied because Leuven’s university was founded only in the 15th century.',
  sources:[['Leuven','https://en.wikipedia.org/wiki/Leuven'],['Duchy of Brabant','https://en.wikipedia.org/wiki/Duchy_of_Brabant']]
 },
 {
  id:'1300-brussels',name:'Brussels',modern:'Brussels',country:'Duchy of Brabant',subrealm:'Duchy of Brabant · growing ducal residence',
  lon:4.3517,lat:50.8503,rarity:3,year:1300,people:12000,populationText:'≈12.0 K',populationRange:'≈10–15 K',populationConfidence:'low',
  sizeText:'≈0.9 km²',sizeConfidence:'low',army:1700,armyText:'≈1.7 K',navy:0,navyText:'0',
  food:75,technology:76,satisfaction:71,
  historicalRole:'Fast-growing Brabantine commercial city and increasingly important ducal residence',
  economy:'Cloth, crafts, markets, brewing and ducal services',
  militaryRole:'Fortified central Brabantine city with growing administrative significance',
  researchSummary:'By 1300 Brussels was expanding rapidly and becoming one of the principal urban centres of Brabant.',
  evidenceNote:'Population is a low-confidence range; political and commercial importance is clearer than precise demography.',
  sources:[['City of Brussels — historical timeline','https://www.brussels.be/timeline-history-brussels'],['Duchy of Brabant','https://en.wikipedia.org/wiki/Duchy_of_Brabant']]
 },
 {
  id:'1300-antwerp',name:'Antwerp',modern:'Antwerp',country:'Duchy of Brabant',subrealm:'Duchy of Brabant · Scheldt port',
  lon:4.4025,lat:51.2194,rarity:3,year:1300,people:10000,populationText:'≈10.0 K',populationRange:'≈8–12 K',populationConfidence:'low',
  sizeText:'≈0.7 km²',sizeConfidence:'low',army:1400,armyText:'≈1.4 K',navy:10,navyText:'≈10',
  food:73,technology:75,satisfaction:68,
  historicalRole:'Growing Scheldt port and fortified commercial city of Brabant',
  economy:'River shipping, markets, crafts, grain storage and regional trade',
  militaryRole:'Fortified port with improving riverine and commercial strategic value',
  researchSummary:'Antwerp had not yet reached its later 16th-century peak, but around 1300 its importance was already increasing and major waterfront fortifications were being constructed.',
  evidenceNote:'Population is low-confidence; archaeology documents new city-wall and port works around 1300.',
  sources:[['Antwerp — medieval harbour archaeology','https://pers.antwerpen.be/archeologen-ontdekken-middeleeuws-stukje-haven-in-antwerpen'],['Duchy of Brabant','https://en.wikipedia.org/wiki/Duchy_of_Brabant']]
 },
 {
  id:'1300-s-hertogenbosch',name:'’s-Hertogenbosch',modern:'’s-Hertogenbosch',country:'Duchy of Brabant',subrealm:'Duchy of Brabant · northern fortified ducal town',
  lon:5.3037,lat:51.6978,rarity:2,year:1300,people:8000,populationText:'≈8.0 K',populationRange:'≈6–10 K',populationConfidence:'low',
  sizeText:'≈0.6 km²',sizeConfidence:'low',army:1300,armyText:'≈1.3 K',navy:0,navyText:'0',
  food:74,technology:68,satisfaction:72,
  historicalRole:'Northern Brabantine market and fortress city founded by the dukes',
  economy:'Markets, crafts, livestock, agriculture and regional trade',
  militaryRole:'Strategic fortified town guarding Brabant’s northern approaches',
  researchSummary:'Founded in the late 12th century by the dukes of Brabant, ’s-Hertogenbosch developed quickly into a key northern urban centre.',
  evidenceNote:'Population is low-confidence; strategic importance derives from ducal foundation, walls and frontier position.',
  sources:[['%27s-Hertogenbosch','https://en.wikipedia.org/wiki/%27s-Hertogenbosch'],['Duchy of Brabant','https://en.wikipedia.org/wiki/Duchy_of_Brabant']]
 },
 {
  id:'1300-mons',name:'Mons',modern:'Mons',country:'County of Hainaut',subrealm:'County of Hainaut · comital centre',
  lon:3.9517,lat:50.4542,rarity:2,year:1300,people:8000,populationText:'≈8.0 K',populationRange:'≈6–10 K',populationConfidence:'low',
  sizeText:'≈0.55 km²',sizeConfidence:'low',army:1200,armyText:'≈1.2 K',navy:0,navyText:'0',
  food:73,technology:68,satisfaction:70,
  historicalRole:'One of the principal political centres of the County of Hainaut',
  economy:'Markets, crafts, agriculture and comital administration',
  militaryRole:'Fortified comital town with strong regional command value',
  researchSummary:'Mons served as one of Hainaut’s central comital and administrative towns around 1300.',
  evidenceNote:'Population is a low-confidence estimate; political importance is well established.',
  sources:[['Mons, Belgium','https://en.wikipedia.org/wiki/Mons,_Belgium'],['County of Hainaut','https://en.wikipedia.org/wiki/County_of_Hainaut']]
 },
 {
  id:'1300-valenciennes',name:'Valenciennes',modern:'Valenciennes',country:'County of Hainaut',subrealm:'County of Hainaut · major Scheldt commercial town',
  lon:3.5183,lat:50.3571,rarity:2,year:1300,people:12000,populationText:'≈12.0 K',populationRange:'≈10–15 K',populationConfidence:'low',
  sizeText:'≈0.7 km²',sizeConfidence:'low',army:1500,armyText:'≈1.5 K',navy:0,navyText:'0',
  food:72,technology:74,satisfaction:68,
  historicalRole:'Prosperous commercial and textile centre of Hainaut',
  economy:'Cloth, crafts, markets and Scheldt-basin trade',
  militaryRole:'Walled town with substantial civic manpower',
  researchSummary:'Valenciennes was one of the richest and most urbanised places in medieval Hainaut.',
  evidenceNote:'Population is low-confidence; relative economic importance is better documented.',
  sources:[['Valenciennes','https://en.wikipedia.org/wiki/Valenciennes'],['County of Hainaut','https://en.wikipedia.org/wiki/County_of_Hainaut']]
 },
 {
  id:'1300-dordrecht',name:'Dordrecht',modern:'Dordrecht',country:'County of Holland',subrealm:'County of Holland · principal river-trading city',
  lon:4.6901,lat:51.8133,rarity:3,year:1300,people:10000,populationText:'≈10.0 K',populationRange:'≈8–12 K',populationConfidence:'low',
  sizeText:'≈0.6 km²',sizeConfidence:'low',army:1200,armyText:'≈1.2 K',navy:12,navyText:'≈12',
  food:78,technology:76,satisfaction:74,
  historicalRole:'Leading commercial city of Holland at a major Rhine-Meuse waterway junction',
  economy:'Wine, grain, timber, shipping and river tolls',
  militaryRole:'Strategically placed river city with meaningful shipping capacity',
  researchSummary:'Dordrecht’s location on major shipping routes made it the commercial leader of Holland around 1300.',
  evidenceNote:'Population is low-confidence. City rights date to 1220 and late-13th-century evidence shows an established administrative and trading centre.',
  sources:[['Dordrecht — growth of a trading city','https://cms.dordrecht.nl/Inwoners/Overzicht_Inwoners/Bouwen_en_verbouwen_voor_inwoners/Welstand/Beeldkwaliteitplan_voor_de_binnenstad.org'],['County of Holland','https://en.wikipedia.org/wiki/County_of_Holland']]
 },
 {
  id:'1300-haarlem',name:'Haarlem',modern:'Haarlem',country:'County of Holland',subrealm:'County of Holland · chartered town',
  lon:4.6462,lat:52.3874,rarity:2,year:1300,people:6000,populationText:'≈6.0 K',populationRange:'≈4–8 K',populationConfidence:'low',
  sizeText:'≈0.4 km²',sizeConfidence:'low',army:800,armyText:'≈800',navy:2,navyText:'≈2',
  food:72,technology:67,satisfaction:73,
  historicalRole:'Growing chartered town controlling routes through central Holland',
  economy:'Brewing, crafts, markets and surrounding agriculture',
  militaryRole:'Walled town with regional defensive value',
  researchSummary:'Haarlem had received city rights in the 13th century and was developing into an important urban centre of Holland.',
  evidenceNote:'Population is low-confidence; urban status and regional importance are secure.',
  sources:[['Haarlem','https://en.wikipedia.org/wiki/Haarlem'],['County of Holland','https://en.wikipedia.org/wiki/County_of_Holland']]
 },
 {
  id:'1300-leiden',name:'Leiden',modern:'Leiden',country:'County of Holland',subrealm:'County of Holland · growing Rhine town',
  lon:4.4970,lat:52.1601,rarity:2,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–7 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:700,armyText:'≈700',navy:2,navyText:'≈2',
  food:72,technology:68,satisfaction:72,
  historicalRole:'Growing market town on the Old Rhine',
  economy:'Crafts, cloth, regional markets and river trade',
  militaryRole:'Compact fortified settlement with local strategic value',
  researchSummary:'Leiden was still much smaller than its later Golden Age form but was already a recognised urban centre in Holland.',
  evidenceNote:'Population and size are low-confidence estimates.',
  sources:[['Leiden','https://en.wikipedia.org/wiki/Leiden'],['County of Holland','https://en.wikipedia.org/wiki/County_of_Holland']]
 },
 {
  id:'1300-delft',name:'Delft',modern:'Delft',country:'County of Holland',subrealm:'County of Holland · chartered canal town',
  lon:4.3571,lat:52.0116,rarity:2,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–7 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:700,armyText:'≈700',navy:2,navyText:'≈2',
  food:71,technology:68,satisfaction:73,
  historicalRole:'Young but expanding chartered town in the core of Holland',
  economy:'Markets, crafts, canal transport and agriculture',
  militaryRole:'Small fortified urban centre on inland waterways',
  researchSummary:'Delft received city rights in 1246 and by 1300 was a growing town in Holland’s increasingly urban network.',
  evidenceNote:'Population is a low-confidence estimate; date of urban charter is well documented.',
  sources:[['Delft','https://en.wikipedia.org/wiki/Delft'],['County of Holland','https://en.wikipedia.org/wiki/County_of_Holland']]
 },
 {
  id:'1300-nijmegen',name:'Nijmegen',modern:'Nijmegen',country:'County of Guelders',subrealm:'County of Guelders · former imperial city pledged to Guelders',
  lon:5.8528,lat:51.8426,rarity:2,year:1300,people:8000,populationText:'≈8.0 K',populationRange:'≈6–10 K',populationConfidence:'low',
  sizeText:'≈0.5 km²',sizeConfidence:'low',army:1200,armyText:'≈1.2 K',navy:0,navyText:'0',
  food:73,technology:72,satisfaction:65,
  historicalRole:'Important Waal crossing and politically prestigious city of Guelders',
  economy:'River trade, markets, crafts and tolls',
  militaryRole:'Strong elevated river fortress with an imperial past',
  researchSummary:'Nijmegen had imperial traditions but was pledged to the counts of Guelders in the late 13th century and functioned within their political sphere by 1300.',
  evidenceNote:'Population is low-confidence; strategic river-crossing and political status are high confidence.',
  sources:[['Nijmegen','https://en.wikipedia.org/wiki/Nijmegen'],['County of Guelders','https://en.wikipedia.org/wiki/Duchy_of_Guelders']]
 },
 {
  id:'1300-zutphen',name:'Zutphen',modern:'Zutphen',country:'County of Guelders',subrealm:'County of Guelders · major IJssel town',
  lon:6.2017,lat:52.1400,rarity:2,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–7 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:800,armyText:'≈800',navy:1,navyText:'≈1',
  food:72,technology:69,satisfaction:71,
  historicalRole:'Old comital centre and important IJssel trading town',
  economy:'River trade, markets, crafts and surrounding agriculture',
  militaryRole:'Walled river town with longstanding comital importance',
  researchSummary:'Zutphen was one of the historic centres from which the Guelders polity developed.',
  evidenceNote:'Population is a low-confidence estimate.',
  sources:[['Zutphen','https://en.wikipedia.org/wiki/Zutphen'],['County of Guelders','https://en.wikipedia.org/wiki/Duchy_of_Guelders']]
 },
 {
  id:'1300-arnhem',name:'Arnhem',modern:'Arnhem',country:'County of Guelders',subrealm:'County of Guelders · chartered Rhine-area town',
  lon:5.8987,lat:51.9851,rarity:1,year:1300,people:4000,populationText:'≈4.0 K',populationRange:'≈3–5 K',populationConfidence:'low',
  sizeText:'≈0.3 km²',sizeConfidence:'low',army:650,armyText:'≈650',navy:0,navyText:'0',
  food:72,technology:63,satisfaction:73,
  historicalRole:'Growing chartered town in central Guelders',
  economy:'Markets, crafts, agriculture and regional trade',
  militaryRole:'Small fortified town of regional value',
  researchSummary:'Arnhem had received city rights in the 13th century and was developing as one of Guelders’ urban centres.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Arnhem','https://en.wikipedia.org/wiki/Arnhem'],['County of Guelders','https://en.wikipedia.org/wiki/Duchy_of_Guelders']]
 },
 {
  id:'1300-stavoren',name:'Stavoren',modern:'Stavoren',country:'Frisian Freedom',subrealm:'Frisian Freedom · autonomous maritime community',
  lon:5.3595,lat:52.8836,rarity:2,year:1300,people:3000,populationText:'≈3.0 K',populationRange:'≈2–4 K',populationConfidence:'low',
  sizeText:'≈0.2 km²',sizeConfidence:'low',army:450,armyText:'≈450',navy:9,navyText:'≈9',
  food:67,technology:68,satisfaction:76,
  historicalRole:'Important Frisian maritime trading town within the lordless Frisian political order',
  economy:'Baltic and North Sea shipping, fisheries and trade',
  militaryRole:'Small population but disproportionate maritime capacity',
  researchSummary:'Stavoren was one of the best-known medieval Frisian ports and fits the politically decentralised Frisian Freedom around 1300.',
  evidenceNote:'Population is low-confidence; high Navy reflects maritime function rather than resident scale.',
  sources:[['Stavoren','https://en.wikipedia.org/wiki/Stavoren'],['Frisian freedom','https://en.wikipedia.org/wiki/Frisian_freedom']]
 },
 {
  id:'1300-oldenburg',name:'Oldenburg',modern:'Oldenburg',country:'County of Oldenburg',subrealm:'County of Oldenburg · comital seat',
  lon:8.2146,lat:53.1435,rarity:1,year:1300,people:2500,populationText:'≈2.5 K',populationRange:'≈2–3.5 K',populationConfidence:'low',
  sizeText:'≈0.2 km²',sizeConfidence:'low',army:450,armyText:'≈450',navy:0,navyText:'0',
  food:70,technology:58,satisfaction:72,
  historicalRole:'Small comital centre of the House of Oldenburg',
  economy:'Agriculture, livestock, markets and comital administration',
  militaryRole:'Castle-town serving a small north German county',
  researchSummary:'Oldenburg was a modest town but politically important as the seat of its own county.',
  evidenceNote:'Population is a low-confidence gameplay estimate.',
  sources:[['Oldenburg (city)','https://en.wikipedia.org/wiki/Oldenburg_(city)'],['County of Oldenburg','https://en.wikipedia.org/wiki/County_of_Oldenburg']]
 },
 {
  id:'1300-kleve',name:'Kleve',modern:'Kleve',country:'County of Cleves',subrealm:'County of Cleves · comital seat',
  lon:6.1381,lat:51.7893,rarity:1,year:1300,people:3000,populationText:'≈3.0 K',populationRange:'≈2–4 K',populationConfidence:'low',
  sizeText:'≈0.22 km²',sizeConfidence:'low',army:500,armyText:'≈500',navy:0,navyText:'0',
  food:72,technology:61,satisfaction:71,
  historicalRole:'Capital town of the County of Cleves near the lower Rhine',
  economy:'Markets, agriculture, tolls and comital administration',
  militaryRole:'Castle-centred town controlling lower-Rhine routes',
  researchSummary:'Kleve was a small but strategically placed comital capital.',
  evidenceNote:'Population is a low-confidence estimate.',
  sources:[['Kleve','https://en.wikipedia.org/wiki/Kleve'],['Duchy of Cleves','https://en.wikipedia.org/wiki/Duchy_of_Cleves']]
 },
 {
  id:'1300-julich',name:'Jülich',modern:'Jülich',country:'County of Jülich',subrealm:'County of Jülich · comital centre',
  lon:6.3648,lat:50.9221,rarity:1,year:1300,people:2500,populationText:'≈2.5 K',populationRange:'≈2–3.5 K',populationConfidence:'low',
  sizeText:'≈0.2 km²',sizeConfidence:'low',army:450,armyText:'≈450',navy:0,navyText:'0',
  food:71,technology:59,satisfaction:70,
  historicalRole:'Administrative and fortified centre of the County of Jülich',
  economy:'Agriculture, markets and comital administration',
  militaryRole:'Small fortified county centre between Meuse and Rhine',
  researchSummary:'Jülich’s political importance as a county centre exceeded its urban population.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Jülich','https://en.wikipedia.org/wiki/J%C3%BClich'],['Duchy of Jülich','https://en.wikipedia.org/wiki/Duchy_of_J%C3%BClich']]
 },
 {
  id:'1300-dusseldorf',name:'Düsseldorf',modern:'Düsseldorf',country:'County of Berg',subrealm:'County of Berg · newly chartered town',
  lon:6.7735,lat:51.2277,rarity:1,year:1300,people:2000,populationText:'≈2.0 K',populationRange:'≈1.5–3 K',populationConfidence:'low',
  sizeText:'≈0.18 km²',sizeConfidence:'low',army:350,armyText:'≈350',navy:0,navyText:'0',
  food:70,technology:58,satisfaction:72,
  historicalRole:'New Rhine town of the counts of Berg after receiving city rights in 1288',
  economy:'Markets, Rhine traffic, crafts and agriculture',
  militaryRole:'Small but strategically situated fortified Rhine settlement',
  researchSummary:'Düsseldorf was still a small town around 1300, having received city rights only after the Battle of Worringen in 1288.',
  evidenceNote:'Population is deliberately modest and low-confidence.',
  sources:[['Düsseldorf','https://en.wikipedia.org/wiki/D%C3%BCsseldorf'],['Duchy of Berg','https://en.wikipedia.org/wiki/Duchy_of_Berg']]
 },
 {
  id:'1300-hamm',name:'Hamm',modern:'Hamm',country:'County of Mark',subrealm:'County of Mark · planned comital town',
  lon:7.8178,lat:51.6739,rarity:1,year:1300,people:2500,populationText:'≈2.5 K',populationRange:'≈2–3.5 K',populationConfidence:'low',
  sizeText:'≈0.2 km²',sizeConfidence:'low',army:450,armyText:'≈450',navy:0,navyText:'0',
  food:72,technology:59,satisfaction:73,
  historicalRole:'Purpose-built urban centre of the counts of Mark',
  economy:'Markets, crafts, agriculture and comital administration',
  militaryRole:'Planned fortified town supporting the counts of Mark',
  researchSummary:'Hamm was founded in 1226 and grew as an administrative and commercial centre of the County of Mark.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Hamm','https://en.wikipedia.org/wiki/Hamm'],['County of Mark','https://en.wikipedia.org/wiki/County_of_Mark']]
 },
 {
  id:'1300-luxembourg',name:'Luxembourg',modern:'Luxembourg',country:'County of Luxembourg',subrealm:'County of Luxembourg · fortified comital capital',
  lon:6.1319,lat:49.6116,rarity:2,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–7 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:900,armyText:'≈900',navy:0,navyText:'0',
  food:67,technology:68,satisfaction:69,
  historicalRole:'Fortress-capital of the rising House of Luxembourg',
  economy:'Markets, crafts, regional trade and comital administration',
  militaryRole:'Exceptionally strong rocky fortress position',
  researchSummary:'Luxembourg’s strategic fortress anchored a county whose dynasty was becoming increasingly influential in imperial politics.',
  evidenceNote:'Population is low-confidence; military value reflects terrain and fortification more than demographic scale.',
  sources:[['Luxembourg City','https://en.wikipedia.org/wiki/Luxembourg_City'],['County of Luxembourg','https://en.wikipedia.org/wiki/County_of_Luxembourg']]
 },
 {
  id:'1300-idstein',name:'Idstein',modern:'Idstein',country:'County of Nassau',subrealm:'Walramian Nassau · Idstein lordship',
  lon:8.2689,lat:50.2216,rarity:1,year:1300,people:1500,populationText:'≈1.5 K',populationRange:'≈1–2.5 K',populationConfidence:'low',
  sizeText:'≈0.12 km²',sizeConfidence:'low',army:300,armyText:'≈300',navy:0,navyText:'0',
  food:68,technology:56,satisfaction:71,
  historicalRole:'Small fortified residence in the divided Nassau lands',
  economy:'Agriculture, local markets and lordly administration',
  militaryRole:'Castle settlement controlling local routes in the Taunus',
  researchSummary:'Idstein represented the Walramian branch of the fragmented Nassau possessions around 1300.',
  evidenceNote:'Population is a deliberately conservative low-confidence estimate.',
  sources:[['Idstein','https://en.wikipedia.org/wiki/Idstein'],['County of Nassau','https://en.wikipedia.org/wiki/County_of_Nassau']]
 },
 {
  id:'1300-siegen',name:'Siegen',modern:'Siegen',country:'County of Nassau',subrealm:'Ottonian Nassau · Siegen centre',
  lon:8.0243,lat:50.8748,rarity:1,year:1300,people:3000,populationText:'≈3.0 K',populationRange:'≈2–4 K',populationConfidence:'low',
  sizeText:'≈0.22 km²',sizeConfidence:'low',army:500,armyText:'≈500',navy:0,navyText:'0',
  food:66,technology:65,satisfaction:70,
  historicalRole:'Mining and administrative centre of the northern Nassau lands',
  economy:'Iron mining, metalworking, markets and agriculture',
  militaryRole:'Fortified regional centre in hilly terrain',
  researchSummary:'Siegen’s mineral resources gave the small Nassau town economic importance disproportionate to its population.',
  evidenceNote:'Population is low-confidence; mining justifies its relatively high Technology score.',
  sources:[['Siegen','https://en.wikipedia.org/wiki/Siegen'],['County of Nassau','https://en.wikipedia.org/wiki/County_of_Nassau']]
 },
 {
  id:'1300-nancy',name:'Nancy',modern:'Nancy',country:'Duchy of Lorraine',subrealm:'Duchy of Lorraine · ducal capital',
  lon:6.1844,lat:48.6921,rarity:2,year:1300,people:6000,populationText:'≈6.0 K',populationRange:'≈5–8 K',populationConfidence:'low',
  sizeText:'≈0.45 km²',sizeConfidence:'low',army:1100,armyText:'≈1.1 K',navy:0,navyText:'0',
  food:72,technology:68,satisfaction:70,
  historicalRole:'Principal residence and political centre of the dukes of Lorraine',
  economy:'Ducal administration, markets, crafts and agriculture',
  militaryRole:'Fortified ducal city between French and imperial spheres',
  researchSummary:'Nancy was developing into the political centre of the Duchy of Lorraine by the late 13th and early 14th centuries.',
  evidenceNote:'Population is low-confidence; ducal significance is high confidence.',
  sources:[['Nancy, France','https://en.wikipedia.org/wiki/Nancy,_France'],['Duchy of Lorraine','https://en.wikipedia.org/wiki/Duchy_of_Lorraine']]
 },
 {
  id:'1300-epinal',name:'Épinal',modern:'Épinal',country:'Duchy of Lorraine',subrealm:'Duchy of Lorraine · fortified Moselle town',
  lon:6.4494,lat:48.1740,rarity:1,year:1300,people:4000,populationText:'≈4.0 K',populationRange:'≈3–5 K',populationConfidence:'low',
  sizeText:'≈0.3 km²',sizeConfidence:'low',army:700,armyText:'≈700',navy:0,navyText:'0',
  food:70,technology:61,satisfaction:71,
  historicalRole:'Fortified regional town on the upper Moselle',
  economy:'Markets, crafts, agriculture and church-related activity',
  militaryRole:'Castle-town controlling local routes through Lorraine',
  researchSummary:'Épinal was a useful fortified regional centre within Lorraine, though far smaller than the major Rhine cities.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Épinal','https://en.wikipedia.org/wiki/%C3%89pinal'],['Duchy of Lorraine','https://en.wikipedia.org/wiki/Duchy_of_Lorraine']]
 },
 {
  id:'1300-trier',name:'Trier',modern:'Trier',country:'Archbishopric of Trier',subrealm:'Electoral Archbishopric of Trier · archiepiscopal capital',
  lon:6.6412,lat:49.7490,rarity:3,year:1300,people:12000,populationText:'≈12.0 K',populationRange:'≈10–15 K',populationConfidence:'low',
  sizeText:'≈0.8 km²',sizeConfidence:'low',army:1600,armyText:'≈1.6 K',navy:0,navyText:'0',
  food:69,technology:84,satisfaction:67,
  historicalRole:'Capital of one of the Empire’s leading ecclesiastical principalities and an electoral see',
  economy:'Church wealth, Moselle trade, wine, crafts and pilgrimage',
  militaryRole:'Ancient walled city controlling an important Moselle corridor',
  researchSummary:'Trier’s archbishop was one of the great imperial princes and electors, giving the city exceptional political importance.',
  evidenceNote:'Population is low-confidence; ecclesiastical-electoral status is high confidence.',
  sources:[['Trier','https://en.wikipedia.org/wiki/Trier'],['Electorate of Trier','https://en.wikipedia.org/wiki/Electorate_of_Trier']]
 },
 {
  id:'1300-mainz',name:'Mainz',modern:'Mainz',country:'Archbishopric of Mainz',subrealm:'Electoral Archbishopric of Mainz · free-city privileges under the archchancellor',
  lon:8.2473,lat:49.9929,rarity:4,year:1300,people:20000,populationText:'≈20.0 K',populationRange:'≈15–25 K',populationConfidence:'low',
  sizeText:'≈1.0 km²',sizeConfidence:'low',army:2200,armyText:'≈2.2 K',navy:0,navyText:'0',
  food:73,technology:91,satisfaction:63,
  historicalRole:'Seat of the Empire’s archchancellor and one of the richest cities of the Rhineland',
  economy:'Rhine trade, wine, crafts, church institutions and imperial politics',
  militaryRole:'Large fortified Rhine city with substantial civic autonomy',
  researchSummary:'Mainz combined the political authority of its archbishop-elector with broad urban freedoms. The archbishop was the Empire’s archchancellor and leading elector.',
  evidenceNote:'Population is low-confidence. The city’s free-city period and the archbishop’s exceptional imperial status are well documented.',
  sources:[['Mainz — official historical timeline','https://www.mainz.de/en/angebote-entdecken/kultur/stadtgeschichte/zeittafel'],['Mainz — medieval importance','https://www.mainz.de/en/microsite/gutenberg/zeit/gutenberg_mainz']]
 },
 {
  id:'1300-bonn',name:'Bonn',modern:'Bonn',country:'Archbishopric of Cologne',subrealm:'Archbishopric/Electorate of Cologne · principal archiepiscopal residence after 1288',
  lon:7.0982,lat:50.7374,rarity:2,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–7 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:900,armyText:'≈900',navy:0,navyText:'0',
  food:72,technology:70,satisfaction:69,
  historicalRole:'Important residence and territorial centre of the archbishops of Cologne after their loss of political control inside Cologne',
  economy:'Archiepiscopal administration, Rhine trade, markets and agriculture',
  militaryRole:'Fortified Rhine town serving the territorial archbishopric',
  researchSummary:'After the Battle of Worringen in 1288 the archbishops could no longer dominate Cologne itself; Bonn became increasingly important within their territorial state.',
  evidenceNote:'Population is low-confidence; post-1288 political role is well established.',
  sources:[['Bonn','https://en.wikipedia.org/wiki/Bonn'],['Electorate of Cologne','https://en.wikipedia.org/wiki/Electorate_of_Cologne']]
 },
 {
  id:'1300-cologne',name:'Cologne',modern:'Cologne',country:'Independent City of Cologne',subrealm:'De facto autonomous city after the Battle of Worringen (1288)',
  lon:6.9603,lat:50.9375,rarity:4,year:1300,people:45000,populationText:'≈45.0 K',populationRange:'≈40–50 K',populationConfidence:'medium',
  sizeText:'≈4.0 km²',sizeConfidence:'medium',army:5200,armyText:'≈5.2 K',navy:0,navyText:'0',
  food:73,technology:91,satisfaction:76,
  historicalRole:'One of the largest cities of the Empire, a major Rhine trading centre and effectively self-governing commune',
  economy:'Rhine trade, crafts, finance, wine, markets and international commerce',
  militaryRole:'Huge fortified city with powerful civic institutions and militia',
  researchSummary:'After defeating the archbishop at Worringen in 1288, Cologne was effectively independent in municipal affairs, although formal free-imperial status came later.',
  evidenceNote:'Population is a medium-confidence range; the distinction between de facto autonomy and later formal Free Imperial City status is intentional.',
  sources:[['Cologne — history','https://en.wikipedia.org/wiki/History_of_Cologne'],['Battle of Worringen','https://en.wikipedia.org/wiki/Battle_of_Worringen']]
 },
 {
  id:'1300-heidelberg',name:'Heidelberg',modern:'Heidelberg',country:'County Palatine of the Rhine',subrealm:'Electoral Palatinate · principal residence of the counts palatine',
  lon:8.6724,lat:49.3988,rarity:2,year:1300,people:6000,populationText:'≈6.0 K',populationRange:'≈5–8 K',populationConfidence:'low',
  sizeText:'≈0.4 km²',sizeConfidence:'low',army:1000,armyText:'≈1.0 K',navy:0,navyText:'0',
  food:71,technology:70,satisfaction:71,
  historicalRole:'Growing residence and administrative centre of the Rhine Palatinate',
  economy:'Court services, markets, wine, crafts and Neckar trade',
  militaryRole:'Castle-dominated town commanding the Neckar valley',
  researchSummary:'Heidelberg was already a principal seat of the counts palatine before the later university made it famous.',
  evidenceNote:'Population is low-confidence; no university Technology bonus is applied because Heidelberg University dates from 1386.',
  sources:[['Heidelberg','https://en.wikipedia.org/wiki/Heidelberg'],['Electoral Palatinate','https://en.wikipedia.org/wiki/Electoral_Palatinate']]
 },
 {
  id:'1300-pforzheim',name:'Pforzheim',modern:'Pforzheim',country:'Margraviate of Baden',subrealm:'Margraviate of Baden · important northern market town',
  lon:8.4037,lat:48.8922,rarity:2,year:1300,people:4000,populationText:'≈4.0 K',populationRange:'≈3–5 K',populationConfidence:'low',
  sizeText:'≈0.3 km²',sizeConfidence:'low',army:700,armyText:'≈700',navy:0,navyText:'0',
  food:70,technology:64,satisfaction:72,
  historicalRole:'Important Baden market and administrative centre at the northern edge of the margraviate',
  economy:'Markets, crafts, agriculture and regional trade',
  militaryRole:'Fortified town controlling routes between Rhine and Württemberg lands',
  researchSummary:'Pforzheim was one of the more important urban centres held by the margraves of Baden around 1300.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Pforzheim','https://en.wikipedia.org/wiki/Pforzheim'],['Margraviate of Baden','https://en.wikipedia.org/wiki/Margraviate_of_Baden']]
 },
 {
  id:'1300-baden-baden',name:'Baden',modern:'Baden-Baden',country:'Margraviate of Baden',subrealm:'Margraviate of Baden · dynastic seat around Hohenbaden',
  lon:8.2398,lat:48.7606,rarity:1,year:1300,people:3000,populationText:'≈3.0 K',populationRange:'≈2–4 K',populationConfidence:'low',
  sizeText:'≈0.22 km²',sizeConfidence:'low',army:550,armyText:'≈550',navy:0,navyText:'0',
  food:69,technology:61,satisfaction:72,
  historicalRole:'Dynastic centre that gave the Margraviate of Baden its name',
  economy:'Court services, baths, markets, agriculture and crafts',
  militaryRole:'Castle-town centred on the margraves’ stronghold',
  researchSummary:'Baden was modest in population but politically central as the namesake seat of the margravial dynasty.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Baden-Baden','https://en.wikipedia.org/wiki/Baden-Baden'],['Margraviate of Baden','https://en.wikipedia.org/wiki/Margraviate_of_Baden']]
 },
 {
  id:'1300-stuttgart',name:'Stuttgart',modern:'Stuttgart',country:'County of Württemberg',subrealm:'County of Württemberg · comital residence',
  lon:9.1829,lat:48.7758,rarity:2,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–7 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:850,armyText:'≈850',navy:0,navyText:'0',
  food:72,technology:66,satisfaction:72,
  historicalRole:'Growing residence of the counts of Württemberg',
  economy:'Court services, wine, markets, crafts and agriculture',
  militaryRole:'Fortified comital centre in the Neckar basin',
  researchSummary:'Stuttgart was emerging as the political centre of Württemberg around 1300, long before its later role as a major capital.',
  evidenceNote:'Population is low-confidence; comital-residence role is well established.',
  sources:[['Stuttgart','https://en.wikipedia.org/wiki/Stuttgart'],['County of Württemberg','https://en.wikipedia.org/wiki/County_of_W%C3%BCrttemberg']]
 },
 {
  id:'1300-tubingen',name:'Tübingen',modern:'Tübingen',country:'County of Württemberg',subrealm:'County of Württemberg · recently acquired former palatine town',
  lon:9.0576,lat:48.5216,rarity:2,year:1300,people:4000,populationText:'≈4.0 K',populationRange:'≈3–5 K',populationConfidence:'low',
  sizeText:'≈0.3 km²',sizeConfidence:'low',army:700,armyText:'≈700',navy:0,navyText:'0',
  food:71,technology:65,satisfaction:68,
  historicalRole:'Fortified Neckar town with strong castle and regional market functions',
  economy:'Markets, wine, crafts and agriculture',
  militaryRole:'Castle-centred town commanding a Neckar crossing',
  researchSummary:'Tübingen was a strategically useful urban centre in the Württemberg sphere around the turn of the 14th century.',
  evidenceNote:'Population is low-confidence; no university bonus is applied because Tübingen University was founded only in 1477.',
  sources:[['Tübingen','https://en.wikipedia.org/wiki/T%C3%BCbingen'],['County of Württemberg','https://en.wikipedia.org/wiki/County_of_W%C3%BCrttemberg']]
 },
 {
  id:'1300-marburg',name:'Marburg',modern:'Marburg',country:'Landgraviate of Hesse',subrealm:'Landgraviate of Hesse · dynastic centre of Henry I',
  lon:8.7709,lat:50.8075,rarity:2,year:1300,people:8000,populationText:'≈8.0 K',populationRange:'≈6–10 K',populationConfidence:'low',
  sizeText:'≈0.55 km²',sizeConfidence:'low',army:1200,armyText:'≈1.2 K',navy:0,navyText:'0',
  food:70,technology:75,satisfaction:72,
  historicalRole:'Core dynastic and ecclesiastical centre of the newly established Landgraviate of Hesse',
  economy:'Court services, markets, crafts, pilgrimage and agriculture',
  militaryRole:'Castle town on strong terrain overlooking the Lahn',
  researchSummary:'Marburg formed part of the core territory from which the Landgraviate of Hesse emerged after 1264 and remained one of Henry I’s most important centres.',
  evidenceNote:'Population and size are low-confidence estimates. Political importance is high confidence.',
  sources:[['Marburg','https://en.wikipedia.org/wiki/Marburg'],['Landgraviate of Hesse','https://en.wikipedia.org/wiki/Landgraviate_of_Hesse']]
 },
 {
  id:'1300-kassel',name:'Kassel',modern:'Kassel',country:'Landgraviate of Hesse',subrealm:'Landgraviate of Hesse · residence used by Henry I from 1277',
  lon:9.4797,lat:51.3127,rarity:2,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–7 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:850,armyText:'≈850',navy:0,navyText:'0',
  food:72,technology:67,satisfaction:73,
  historicalRole:'Growing Hessian residence and market town on the Fulda',
  economy:'Markets, court services, crafts and agriculture',
  militaryRole:'Fortified residence controlling routes through northern Hesse',
  researchSummary:'Kassel became an important Hessian residence under Henry I and by 1300 was one of the landgraviate’s principal towns.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Kassel','https://en.wikipedia.org/wiki/Kassel'],['Landgraviate of Hesse','https://en.wikipedia.org/wiki/Landgraviate_of_Hesse']]
 },
 {
  id:'1300-eisenach',name:'Eisenach',modern:'Eisenach',country:'Landgraviate of Thuringia',subrealm:'Landgraviate of Thuringia · Wartburg centre',
  lon:10.3150,lat:50.9804,rarity:2,year:1300,people:7000,populationText:'≈7.0 K',populationRange:'≈5–9 K',populationConfidence:'low',
  sizeText:'≈0.5 km²',sizeConfidence:'low',army:1200,armyText:'≈1.2 K',navy:0,navyText:'0',
  food:69,technology:73,satisfaction:69,
  historicalRole:'Major Thuringian castle-town below the Wartburg',
  economy:'Markets, crafts, court activity and regional agriculture',
  militaryRole:'Strong castle-backed urban centre controlling west-Thuringian routes',
  researchSummary:'Eisenach’s association with the Wartburg made it one of the politically and militarily significant towns of Thuringia.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Eisenach','https://en.wikipedia.org/wiki/Eisenach'],['Landgraviate of Thuringia','https://en.wikipedia.org/wiki/Landgraviate_of_Thuringia']]
 },
 {
  id:'1300-gotha',name:'Gotha',modern:'Gotha',country:'Landgraviate of Thuringia',subrealm:'Landgraviate of Thuringia · market and administrative town',
  lon:10.7042,lat:50.9482,rarity:1,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–6 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:750,armyText:'≈750',navy:0,navyText:'0',
  food:72,technology:64,satisfaction:72,
  historicalRole:'Established market town in central Thuringia',
  economy:'Markets, crafts and surrounding agriculture',
  militaryRole:'Fortified regional centre',
  researchSummary:'Gotha was an established urban centre within the Thuringian lands, useful for trade and administration.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Gotha','https://en.wikipedia.org/wiki/Gotha_(town)'],['Landgraviate of Thuringia','https://en.wikipedia.org/wiki/Landgraviate_of_Thuringia']]
 },
 {
  id:'1300-meissen',name:'Meissen',modern:'Meissen',country:'Margraviate of Meissen',subrealm:'Margraviate of Meissen · margravial and episcopal centre',
  lon:13.4730,lat:51.1634,rarity:2,year:1300,people:6000,populationText:'≈6.0 K',populationRange:'≈5–8 K',populationConfidence:'low',
  sizeText:'≈0.4 km²',sizeConfidence:'low',army:1000,armyText:'≈1.0 K',navy:0,navyText:'0',
  food:69,technology:75,satisfaction:70,
  historicalRole:'Namesake political centre of the Margraviate of Meissen and episcopal seat',
  economy:'Court, church institutions, wine, crafts and Elbe trade',
  militaryRole:'Strong hilltop castle-cathedral complex above the Elbe',
  researchSummary:'Meissen remained symbolically central to the Wettin margraviate, even as Leipzig grew commercially.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Meissen','https://en.wikipedia.org/wiki/Meissen'],['Margraviate of Meissen','https://en.wikipedia.org/wiki/Margraviate_of_Meissen']]
 },
 {
  id:'1300-leipzig',name:'Leipzig',modern:'Leipzig',country:'Margraviate of Meissen',subrealm:'Margraviate of Meissen · major fair and trading town',
  lon:12.3731,lat:51.3397,rarity:3,year:1300,people:9000,populationText:'≈9.0 K',populationRange:'≈7–11 K',populationConfidence:'low',
  sizeText:'≈0.55 km²',sizeConfidence:'low',army:1200,armyText:'≈1.2 K',navy:0,navyText:'0',
  food:73,technology:79,satisfaction:74,
  historicalRole:'Fast-growing commercial town at the crossroads of major central European routes',
  economy:'Fairs, long-distance trade, crafts and regional agriculture',
  militaryRole:'Walled merchant town with growing civic resources',
  researchSummary:'Leipzig’s location on major trade routes had already made it one of the most commercially important towns in the Meissen lands.',
  evidenceNote:'Population is low-confidence; commercial significance is higher confidence.',
  sources:[['Leipzig','https://en.wikipedia.org/wiki/Leipzig'],['Margraviate of Meissen','https://en.wikipedia.org/wiki/Margraviate_of_Meissen']]
 },
 {
  id:'1300-dresden',name:'Dresden',modern:'Dresden',country:'Margraviate of Meissen',subrealm:'Margraviate of Meissen · Elbe residence town',
  lon:13.7373,lat:51.0504,rarity:2,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–6 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:850,armyText:'≈850',navy:0,navyText:'0',
  food:72,technology:66,satisfaction:72,
  historicalRole:'Elbe crossing and developing Wettin residence town',
  economy:'River trade, markets, crafts and agriculture',
  militaryRole:'Fortified bridge-town controlling an Elbe crossing',
  researchSummary:'Dresden was still smaller than Leipzig around 1300 but already strategically useful as an Elbe crossing and residence.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Dresden','https://en.wikipedia.org/wiki/Dresden'],['Margraviate of_Meissen','https://en.wikipedia.org/wiki/Margraviate_of_Meissen']]
 },
 {
  id:'1300-brandenburg',name:'Brandenburg an der Havel',modern:'Brandenburg an der Havel',country:'Margraviate of Brandenburg',subrealm:'Margraviate of Brandenburg · historic namesake centre',
  lon:12.5498,lat:52.4125,rarity:2,year:1300,people:7000,populationText:'≈7.0 K',populationRange:'≈5–9 K',populationConfidence:'low',
  sizeText:'≈0.5 km²',sizeConfidence:'low',army:1100,armyText:'≈1.1 K',navy:0,navyText:'0',
  food:68,technology:68,satisfaction:70,
  historicalRole:'Historic political and ecclesiastical centre of the Mark Brandenburg',
  economy:'Markets, river trade, crafts and agriculture',
  militaryRole:'Fortified Havel city with strong symbolic and strategic value',
  researchSummary:'Brandenburg an der Havel remained the namesake city of the margraviate and a key centre even as other towns expanded.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Brandenburg an der Havel','https://en.wikipedia.org/wiki/Brandenburg_an_der_Havel'],['Margraviate of Brandenburg','https://en.wikipedia.org/wiki/Margraviate_of_Brandenburg']]
 },
 {
  id:'1300-berlin-colln',name:'Berlin-Cölln',modern:'Berlin',country:'Margraviate of Brandenburg',subrealm:'Margraviate of Brandenburg · twin merchant towns, still administratively separate in 1300',
  lon:13.4050,lat:52.5200,rarity:2,year:1300,people:6500,populationText:'≈6.5 K',populationRange:'≈5–7.5 K',populationConfidence:'low',
  sizeText:'≈0.45 km²',sizeConfidence:'low',army:900,armyText:'≈900',navy:0,navyText:'0',
  food:68,technology:71,satisfaction:73,
  historicalRole:'Growing twin merchant settlements on opposite banks of the Spree',
  economy:'Regional trade, crafts, markets and river transport',
  militaryRole:'Two fortified towns controlling a Spree crossing',
  researchSummary:'Berlin and Cölln already formed a closely linked commercial pair around 1300, although their formal union for joint external action dates from 1307.',
  evidenceNote:'Berlin’s official history confirms the two-town structure and their first documentary mentions in the 13th century. Population is a conservative low-confidence estimate extrapolated backward from later medieval figures.',
  sources:[['Berlin.de — medieval trading centre','https://www.berlin.de/en/history/8476760-8619314-the-medieval-trading-center.en.html'],['Margraviate of Brandenburg','https://en.wikipedia.org/wiki/Margraviate_of_Brandenburg']]
 },
 {
  id:'1300-frankfurt-oder',name:'Frankfurt an der Oder',modern:'Frankfurt (Oder)',country:'Margraviate of Brandenburg',subrealm:'Margraviate of Brandenburg · Oder trading town',
  lon:14.5506,lat:52.3471,rarity:2,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–7 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:800,armyText:'≈800',navy:0,navyText:'0',
  food:70,technology:68,satisfaction:72,
  historicalRole:'Important Oder crossing and eastern trading town of Brandenburg',
  economy:'River trade, markets, crafts and regional exchange',
  militaryRole:'Fortified Oder crossing near the eastern frontier',
  researchSummary:'Frankfurt had city rights from the 13th century and was strategically placed on Brandenburg’s eastern trade routes.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Frankfurt (Oder)','https://en.wikipedia.org/wiki/Frankfurt_(Oder)'],['Margraviate of Brandenburg','https://en.wikipedia.org/wiki/Margraviate_of_Brandenburg']]
 },
 {
  id:'1300-wittenberg',name:'Wittenberg',modern:'Wittenberg',country:'Duchy of Saxony-Wittenberg',subrealm:'Duchy of Saxony-Wittenberg · Ascanian ducal seat after the 1296 partition',
  lon:12.6489,lat:51.8667,rarity:2,year:1300,people:4000,populationText:'≈4.0 K',populationRange:'≈3–5 K',populationConfidence:'low',
  sizeText:'≈0.3 km²',sizeConfidence:'low',army:700,armyText:'≈700',navy:0,navyText:'0',
  food:68,technology:65,satisfaction:70,
  historicalRole:'New ducal centre of the Saxony-Wittenberg branch of the Ascanians',
  economy:'Court services, markets, crafts and agriculture',
  militaryRole:'Fortified Elbe town with dynastic importance',
  researchSummary:'Following the final 1296 division of the Ascanian Saxon lands, Wittenberg became the seat of Saxony-Wittenberg.',
  evidenceNote:'Population is low-confidence; the 1296 political split is high confidence.',
  sources:[['Wittenberg','https://en.wikipedia.org/wiki/Wittenberg'],['Duchy of Saxe-Wittenberg','https://en.wikipedia.org/wiki/Duchy_of_Saxe-Wittenberg']]
 },
 {
  id:'1300-lauenburg',name:'Lauenburg',modern:'Lauenburg/Elbe',country:'Duchy of Saxe-Lauenburg',subrealm:'Duchy of Saxe-Lauenburg · Ascanian ducal centre after the 1296 partition',
  lon:10.5560,lat:53.3714,rarity:1,year:1300,people:2500,populationText:'≈2.5 K',populationRange:'≈2–3.5 K',populationConfidence:'low',
  sizeText:'≈0.2 km²',sizeConfidence:'low',army:450,armyText:'≈450',navy:0,navyText:'0',
  food:67,technology:59,satisfaction:71,
  historicalRole:'Small Elbe castle-town of the Saxe-Lauenburg Ascanian line',
  economy:'River traffic, markets, agriculture and ducal administration',
  militaryRole:'Castle settlement controlling a strategic Elbe crossing zone',
  researchSummary:'Lauenburg represented the northern Ascanian Saxon line after the division of 1296.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Lauenburg','https://en.wikipedia.org/wiki/Lauenburg'],['Saxe-Lauenburg','https://en.wikipedia.org/wiki/Saxe-Lauenburg']]
 },
 {
  id:'1300-brunswick',name:'Brunswick',modern:'Braunschweig',country:'Duchy of Brunswick-Lüneburg',subrealm:'Brunswick principality · major Welf city with extensive civic autonomy',
  lon:10.5268,lat:52.2689,rarity:3,year:1300,people:15000,populationText:'≈15.0 K',populationRange:'≈12–18 K',populationConfidence:'low',
  sizeText:'≈0.9 km²',sizeConfidence:'low',army:1900,armyText:'≈1.9 K',navy:0,navyText:'0',
  food:72,technology:78,satisfaction:69,
  historicalRole:'One of the principal cities of the Welf lands and a major north German commercial centre',
  economy:'Crafts, cloth, markets, long-distance trade and regional administration',
  militaryRole:'Large fortified city with significant civic autonomy and militia',
  researchSummary:'The Welf duchy had been partitioned in 1269; Brunswick remained one of its dominant urban centres and enjoyed considerable autonomy.',
  evidenceNote:'Population is low-confidence; the Welf partition and Brunswick’s autonomous status are well documented.',
  sources:[['Duchy of Brunswick-Lüneburg','https://en.wikipedia.org/wiki/Duchy_of_Brunswick-L%C3%BCneburg'],['Brunswick, Germany','https://en.wikipedia.org/wiki/Braunschweig']]
 },
 {
  id:'1300-luneburg',name:'Lüneburg',modern:'Lüneburg',country:'Duchy of Brunswick-Lüneburg',subrealm:'Principality of Lüneburg · salt-rich capital',
  lon:10.4079,lat:53.2464,rarity:3,year:1300,people:10000,populationText:'≈10.0 K',populationRange:'≈8–12 K',populationConfidence:'low',
  sizeText:'≈0.65 km²',sizeConfidence:'low',army:1300,armyText:'≈1.3 K',navy:0,navyText:'0',
  food:69,technology:81,satisfaction:74,
  historicalRole:'Capital of the Principality of Lüneburg and a wealthy salt-production centre',
  economy:'Salt mining, trade, crafts and long-distance commerce',
  militaryRole:'Fortified merchant city with strong economic resources',
  researchSummary:'Lüneburg became the capital of its own Welf principality after the 1269 partition and its saltworks made it exceptionally wealthy.',
  evidenceNote:'Population is low-confidence; salt wealth and political role are high confidence.',
  sources:[['Principality of Lüneburg','https://en.wikipedia.org/wiki/Principality_of_L%C3%BCneburg'],['Lüneburg','https://en.wikipedia.org/wiki/L%C3%BCneburg']]
 },
 {
  id:'1300-zerbst',name:'Zerbst',modern:'Zerbst',country:'Principality of Anhalt',subrealm:'Principality of Anhalt-Zerbst',
  lon:12.0850,lat:51.9660,rarity:1,year:1300,people:3500,populationText:'≈3.5 K',populationRange:'≈3–5 K',populationConfidence:'low',
  sizeText:'≈0.25 km²',sizeConfidence:'low',army:550,armyText:'≈550',navy:0,navyText:'0',
  food:69,technology:61,satisfaction:72,
  historicalRole:'Residence and urban centre of the Anhalt-Zerbst branch',
  economy:'Markets, crafts, agriculture and princely administration',
  militaryRole:'Small fortified princely town',
  researchSummary:'The Anhalt lands had been divided among Ascanian branches; Zerbst was the centre of the Zerbst line.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Principality of Anhalt-Zerbst','https://en.wikipedia.org/wiki/Principality_of_Anhalt-Zerbst'],['Zerbst','https://en.wikipedia.org/wiki/Zerbst']]
 },
 {
  id:'1300-bernburg',name:'Bernburg',modern:'Bernburg',country:'Principality of Anhalt',subrealm:'Principality of Anhalt-Bernburg',
  lon:11.7400,lat:51.7940,rarity:1,year:1300,people:3000,populationText:'≈3.0 K',populationRange:'≈2–4 K',populationConfidence:'low',
  sizeText:'≈0.22 km²',sizeConfidence:'low',army:500,armyText:'≈500',navy:0,navyText:'0',
  food:69,technology:60,satisfaction:72,
  historicalRole:'Residence town of the Anhalt-Bernburg branch',
  economy:'Agriculture, markets, crafts and princely administration',
  militaryRole:'Castle-town above the Saale',
  researchSummary:'Bernburg represented one of the separate Anhalt principalities created by dynastic partition.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Principality of Anhalt-Bernburg','https://en.wikipedia.org/wiki/Principality_of_Anhalt-Bernburg'],['Bernburg','https://en.wikipedia.org/wiki/Bernburg']]
 },
 {
  id:'1300-aschersleben',name:'Aschersleben',modern:'Aschersleben',country:'Principality of Anhalt',subrealm:'Principality of Anhalt-Aschersleben',
  lon:11.4600,lat:51.7560,rarity:2,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–6 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:750,armyText:'≈750',navy:0,navyText:'0',
  food:70,technology:65,satisfaction:71,
  historicalRole:'Capital of the short-lived Anhalt-Aschersleben principality',
  economy:'Markets, crafts, agriculture and regional trade',
  militaryRole:'Fortified princely town',
  researchSummary:'Anhalt-Aschersleben existed as a distinct principality from 1252 until 1315, making it a particularly exact fit for the 1300 snapshot.',
  evidenceNote:'Population is low-confidence; political status is high confidence.',
  sources:[['Principality of Anhalt-Aschersleben','https://en.wikipedia.org/wiki/Principality_of_Anhalt-Aschersleben'],['Aschersleben','https://en.wikipedia.org/wiki/Aschersleben']]
 },
 {
  id:'1300-kiel',name:'Kiel',modern:'Kiel',country:'County of Holstein',subrealm:'County of Holstein · Baltic port town',
  lon:10.1228,lat:54.3233,rarity:2,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–6 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:700,armyText:'≈700',navy:8,navyText:'≈8',
  food:68,technology:68,satisfaction:73,
  historicalRole:'Baltic port and chartered town of the counts of Holstein',
  economy:'Maritime trade, fisheries, crafts and regional markets',
  militaryRole:'Small but useful Baltic harbour',
  researchSummary:'Kiel had urban privileges and a strategically valuable Baltic harbour by the 13th century.',
  evidenceNote:'Population is low-confidence; Navy is a gameplay estimate based on port function.',
  sources:[['Kiel','https://en.wikipedia.org/wiki/Kiel'],['Holstein','https://en.wikipedia.org/wiki/Holstein']]
 },
 {
  id:'1300-wismar',name:'Wismar',modern:'Wismar',country:'Lordship of Mecklenburg',subrealm:'Lordship of Mecklenburg · Baltic Hanseatic port',
  lon:11.4660,lat:53.8920,rarity:3,year:1300,people:8000,populationText:'≈8.0 K',populationRange:'≈6–10 K',populationConfidence:'low',
  sizeText:'≈0.55 km²',sizeConfidence:'low',army:1100,armyText:'≈1.1 K',navy:12,navyText:'≈12',
  food:67,technology:78,satisfaction:74,
  historicalRole:'Important Baltic merchant port in the Mecklenburg lands',
  economy:'Hanseatic shipping, fish, grain, beer and merchant trade',
  militaryRole:'Walled port with significant merchant-maritime capacity',
  researchSummary:'Wismar had become an important Baltic trading city by the late 13th century and belonged to the Mecklenburg lordship, which was not raised to a duchy until the 14th century.',
  evidenceNote:'Population is low-confidence; the political label intentionally uses Lordship rather than anachronistic Duchy.',
  sources:[['Wismar','https://en.wikipedia.org/wiki/Wismar'],['Mecklenburg','https://en.wikipedia.org/wiki/Mecklenburg']]
 },
 {
  id:'1300-gustrow',name:'Güstrow',modern:'Güstrow',country:'Lordship of Werle',subrealm:'Lordship of Werle · former Werle-Güstrow centre, reunited under Nicholas II by 1300',
  lon:12.1730,lat:53.7930,rarity:1,year:1300,people:3500,populationText:'≈3.5 K',populationRange:'≈3–5 K',populationConfidence:'low',
  sizeText:'≈0.25 km²',sizeConfidence:'low',army:550,armyText:'≈550',navy:0,navyText:'0',
  food:69,technology:61,satisfaction:71,
  historicalRole:'Regional princely centre within the Werle branch of the Mecklenburg dynasty',
  economy:'Markets, crafts, agriculture and princely administration',
  militaryRole:'Castle-town controlling the surrounding Werle lands',
  researchSummary:'The Werle-Güstrow and Werle-Parchim branches had been reunited around 1292 under Nicholas II, so Güstrow in 1300 belongs to the reunited Lordship of Werle.',
  evidenceNote:'Population is low-confidence; the 1292 political reunification is documented.',
  sources:[['Werle','https://en.wikipedia.org/wiki/Werle'],['Güstrow','https://en.wikipedia.org/wiki/G%C3%BCstrow']]
 },
 {
  id:'1300-stettin',name:'Stettin / Szczecin',modern:'Szczecin',country:'Duchy of Pomerania-Stettin',subrealm:'Duchy of Pomerania-Stettin · ducal and Oder port city',
  lon:14.5528,lat:53.4285,rarity:3,year:1300,people:8000,populationText:'≈8.0 K',populationRange:'≈6–10 K',populationConfidence:'low',
  sizeText:'≈0.55 km²',sizeConfidence:'low',army:1200,armyText:'≈1.2 K',navy:10,navyText:'≈10',
  food:70,technology:74,satisfaction:70,
  historicalRole:'Capital and major Oder port of the Pomerania-Stettin branch created in 1295',
  economy:'Oder trade, Baltic commerce, crafts and ducal administration',
  militaryRole:'Fortified river-port with strategic access to the Baltic',
  researchSummary:'The 1295 partition of Pomerania created distinct Stettin and Wolgast branches; Stettin became the key centre of the eastern branch.',
  evidenceNote:'Population is low-confidence; 1295 political division is high confidence.',
  sources:[['Duchy of Pomerania','https://en.wikipedia.org/wiki/Duchy_of_Pomerania'],['Szczecin','https://en.wikipedia.org/wiki/Szczecin']]
 },
 {
  id:'1300-stargard',name:'Stargard',modern:'Stargard',country:'Duchy of Pomerania-Stettin',subrealm:'Duchy of Pomerania-Stettin · inland Hanseatic-oriented town',
  lon:15.0499,lat:53.3367,rarity:2,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–7 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:800,armyText:'≈800',navy:0,navyText:'0',
  food:71,technology:69,satisfaction:72,
  historicalRole:'Growing fortified trading town of Pomerania-Stettin',
  economy:'Grain, crafts, markets and regional trade',
  militaryRole:'Walled inland commercial centre',
  researchSummary:'Stargard was an important east-Pomeranian town within the Stettin branch after the 1295 partition.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Stargard','https://en.wikipedia.org/wiki/Stargard'],['Duchy of Pomerania','https://en.wikipedia.org/wiki/Duchy_of_Pomerania']]
 },
 {
  id:'1300-wolgast',name:'Wolgast',modern:'Wolgast',country:'Duchy of Pomerania-Wolgast',subrealm:'Duchy of Pomerania-Wolgast · ducal residence after 1295',
  lon:13.7729,lat:54.0528,rarity:2,year:1300,people:3500,populationText:'≈3.5 K',populationRange:'≈3–5 K',populationConfidence:'low',
  sizeText:'≈0.25 km²',sizeConfidence:'low',army:600,armyText:'≈600',navy:5,navyText:'≈5',
  food:68,technology:65,satisfaction:71,
  historicalRole:'Namesake ducal residence of the Pomerania-Wolgast branch',
  economy:'Baltic trade, fisheries, agriculture and ducal services',
  militaryRole:'Small fortified coastal residence with useful maritime position',
  researchSummary:'Wolgast became the dynastic centre of the western Pomeranian branch created by the 1295 division.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Wolgast','https://en.wikipedia.org/wiki/Wolgast'],['Duchy of Pomerania','https://en.wikipedia.org/wiki/Duchy_of_Pomerania']]
 },
 {
  id:'1300-greifswald',name:'Greifswald',modern:'Greifswald',country:'Duchy of Pomerania-Wolgast',subrealm:'Duchy of Pomerania-Wolgast · Baltic merchant city',
  lon:13.3815,lat:54.0958,rarity:2,year:1300,people:6000,populationText:'≈6.0 K',populationRange:'≈5–8 K',populationConfidence:'low',
  sizeText:'≈0.4 km²',sizeConfidence:'low',army:850,armyText:'≈850',navy:8,navyText:'≈8',
  food:68,technology:72,satisfaction:74,
  historicalRole:'Prosperous Baltic trading town within Pomerania-Wolgast',
  economy:'Baltic shipping, salt, fish, grain and crafts',
  militaryRole:'Walled port-oriented town with strong merchant resources',
  researchSummary:'Greifswald grew rapidly in the 13th century and belonged to the Wolgast branch after the 1295 partition.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Greifswald','https://en.wikipedia.org/wiki/Greifswald'],['Duchy of Pomerania','https://en.wikipedia.org/wiki/Duchy_of_Pomerania']]
 },
 {
  id:'1300-stralsund',name:'Stralsund',modern:'Stralsund',country:'Duchy of Pomerania-Wolgast',subrealm:'Duchy of Pomerania-Wolgast · major Hanseatic Baltic port',
  lon:13.0850,lat:54.3091,rarity:3,year:1300,people:10000,populationText:'≈10.0 K',populationRange:'≈8–12 K',populationConfidence:'low',
  sizeText:'≈0.65 km²',sizeConfidence:'low',army:1300,armyText:'≈1.3 K',navy:15,navyText:'≈15',
  food:69,technology:80,satisfaction:75,
  historicalRole:'One of the strongest Baltic merchant cities of the Pomeranian coast',
  economy:'Hanseatic shipping, herring, grain, salt and long-distance trade',
  militaryRole:'Strongly fortified maritime city with notable merchant fleet capacity',
  researchSummary:'Stralsund’s position and merchant wealth made it one of the standout urban centres of Pomerania-Wolgast.',
  evidenceNote:'Population is low-confidence; high Navy reflects maritime commerce, not a permanent state fleet.',
  sources:[['Stralsund','https://en.wikipedia.org/wiki/Stralsund'],['Duchy of Pomerania','https://en.wikipedia.org/wiki/Duchy_of_Pomerania']]
 },
 {
  id:'1300-munich',name:'Munich',modern:'Munich',country:'Duchy of Upper Bavaria',subrealm:'Upper Bavaria · ducal capital of the Wittelsbach line',
  lon:11.5820,lat:48.1351,rarity:3,year:1300,people:12000,populationText:'≈12.0 K',populationRange:'≈10–15 K',populationConfidence:'low',
  sizeText:'≈0.75 km²',sizeConfidence:'low',army:1700,armyText:'≈1.7 K',navy:0,navyText:'0',
  food:79,technology:75,satisfaction:71,
  historicalRole:'Capital and principal residence of Upper Bavaria',
  economy:'Court services, salt trade, brewing, crafts and regional markets',
  militaryRole:'Fortified ducal capital with strong administrative resources',
  researchSummary:'After the 1255 division of Bavaria, Munich became the main centre of Upper Bavaria and grew under Wittelsbach patronage.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Munich','https://en.wikipedia.org/wiki/Munich'],['Duchy of Bavaria','https://en.wikipedia.org/wiki/Duchy_of_Bavaria']]
 },
 {
  id:'1300-ingolstadt',name:'Ingolstadt',modern:'Ingolstadt',country:'Duchy of Upper Bavaria',subrealm:'Upper Bavaria · fortified Danube town',
  lon:11.4258,lat:48.7665,rarity:2,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–7 K',populationConfidence:'low',
  sizeText:'≈0.35 km²',sizeConfidence:'low',army:850,armyText:'≈850',navy:0,navyText:'0',
  food:78,technology:66,satisfaction:72,
  historicalRole:'Strategic Danube town in Upper Bavaria',
  economy:'Danube trade, markets, crafts and agriculture',
  militaryRole:'Fortified river town controlling regional routes',
  researchSummary:'Ingolstadt was a useful Upper Bavarian urban and strategic centre long before its later university prominence.',
  evidenceNote:'Population is low-confidence; no university bonus is applied because the university dates from 1472.',
  sources:[['Ingolstadt','https://en.wikipedia.org/wiki/Ingolstadt'],['Duchy of Bavaria','https://en.wikipedia.org/wiki/Duchy_of_Bavaria']]
 },
 {
  id:'1300-landshut',name:'Landshut',modern:'Landshut',country:'Duchy of Lower Bavaria',subrealm:'Lower Bavaria · principal ducal capital',
  lon:12.1522,lat:48.5442,rarity:3,year:1300,people:9000,populationText:'≈9.0 K',populationRange:'≈7–11 K',populationConfidence:'low',
  sizeText:'≈0.6 km²',sizeConfidence:'low',army:1400,armyText:'≈1.4 K',navy:0,navyText:'0',
  food:82,technology:72,satisfaction:72,
  historicalRole:'Principal capital of Lower Bavaria after the 1255 Wittelsbach partition',
  economy:'Court services, Isar trade, crafts, markets and agriculture',
  militaryRole:'Castle-backed ducal capital with substantial regional manpower',
  researchSummary:'Landshut served as the chief political centre of Lower Bavaria and developed rapidly under its Wittelsbach dukes.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Landshut','https://en.wikipedia.org/wiki/Landshut'],['Duchy of Bavaria','https://en.wikipedia.org/wiki/Duchy_of_Bavaria']]
 },
 {
  id:'1300-straubing',name:'Straubing',modern:'Straubing',country:'Duchy of Lower Bavaria',subrealm:'Lower Bavaria · Danube market and ducal town',
  lon:12.5732,lat:48.8813,rarity:2,year:1300,people:6000,populationText:'≈6.0 K',populationRange:'≈5–8 K',populationConfidence:'low',
  sizeText:'≈0.4 km²',sizeConfidence:'low',army:900,armyText:'≈900',navy:0,navyText:'0',
  food:83,technology:67,satisfaction:73,
  historicalRole:'Important Danube market town of Lower Bavaria',
  economy:'Grain, livestock, Danube trade, markets and crafts',
  militaryRole:'Fortified Danube town with regional strategic value',
  researchSummary:'Straubing was an established Lower Bavarian urban centre positioned on the Danube trade corridor.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Straubing','https://en.wikipedia.org/wiki/Straubing'],['Duchy of Bavaria','https://en.wikipedia.org/wiki/Duchy_of_Bavaria']]
 },
 {
  id:'1300-salzburg',name:'Salzburg',modern:'Salzburg',country:'Archbishopric of Salzburg',subrealm:'Prince-Archbishopric of Salzburg · ecclesiastical capital',
  lon:13.0550,lat:47.8095,rarity:3,year:1300,people:9000,populationText:'≈9.0 K',populationRange:'≈7–11 K',populationConfidence:'low',
  sizeText:'≈0.6 km²',sizeConfidence:'low',army:1300,armyText:'≈1.3 K',navy:0,navyText:'0',
  food:74,technology:84,satisfaction:68,
  historicalRole:'Capital of a powerful ecclesiastical principality enriched by Alpine salt',
  economy:'Salt, church revenues, markets, crafts and trans-Alpine trade',
  militaryRole:'Strong fortress-city dominated by Hohensalzburg',
  researchSummary:'Salzburg was the political and ecclesiastical heart of an increasingly territorial prince-archbishopric, with salt revenues supporting its power.',
  evidenceNote:'Population is low-confidence; church and salt importance are high confidence.',
  sources:[['Salzburg','https://en.wikipedia.org/wiki/Salzburg'],['Prince-Archbishopric of Salzburg','https://en.wikipedia.org/wiki/Prince-Archbishopric_of_Salzburg']]
 },
 {
  id:'1300-hallein',name:'Hallein',modern:'Hallein',country:'Archbishopric of Salzburg',subrealm:'Prince-Archbishopric of Salzburg · salt-mining town',
  lon:13.0926,lat:47.6833,rarity:2,year:1300,people:4000,populationText:'≈4.0 K',populationRange:'≈3–5 K',populationConfidence:'low',
  sizeText:'≈0.28 km²',sizeConfidence:'low',army:600,armyText:'≈600',navy:0,navyText:'0',
  food:70,technology:76,satisfaction:70,
  historicalRole:'Key salt-production centre of the Salzburg archbishops',
  economy:'Salt mining, processing, transport and regional markets',
  militaryRole:'Small fortified economic centre with strategic resource importance',
  researchSummary:'Hallein’s salt mines were one of the economic foundations of Salzburg’s medieval territorial power.',
  evidenceNote:'Population is low-confidence; Technology and economy are raised by specialised salt extraction and processing.',
  sources:[['Hallein','https://en.wikipedia.org/wiki/Hallein'],['Prince-Archbishopric of Salzburg','https://en.wikipedia.org/wiki/Prince-Archbishopric_of_Salzburg']]
 }
];

export const CITY_1300=Object.fromEntries(CITIES_1300.map((c,index)=>[c.id,{...c,index}]));
export const RESEARCH_1300_NOTE='Population figures are historical estimates, not census counts. Army, navy, Food, Technology and Satisfaction are comparative Cardwars gameplay estimates based on population, strategic role, institutions, trade, fortifications and frontier exposure. Political ownership follows the exact c. 1300 snapshot, including temporary occupations such as Aragonese Murcia.';
