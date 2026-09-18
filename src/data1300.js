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
  lon:-9.1393,lat:38.7223,rarity:4,year:1300,people:35000,populationText:'≈35.0 K',populationConfidence:'medium',
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
  lon:2.1734,lat:41.3851,rarity:4,year:1300,people:35000,populationText:'≈35.0 K',populationRange:'≈30–40 K',populationConfidence:'medium',
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
  lon:-0.3763,lat:39.4699,rarity:4,year:1300,people:25000,populationText:'≈25.0 K',populationConfidence:'medium',
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
  lon:-0.4810,lat:38.3452,rarity:2,year:1300,people:5000,populationText:'≈5.0 K',populationRange:'≈4–6 K',populationConfidence:'low',
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
  lon:-4.4214,lat:36.7213,rarity:3,year:1300,people:25000,populationText:'≈25.0 K',populationRange:'≈20–35 K',populationConfidence:'low',
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
 }
];

export const CITY_1300=Object.fromEntries(CITIES_1300.map((c,index)=>[c.id,{...c,index}]));
export const RESEARCH_1300_NOTE='Population figures are historical estimates, not census counts. Army, navy, Food, Technology and Satisfaction are comparative Cardwars gameplay estimates based on population, strategic role, institutions, trade, fortifications and frontier exposure. Political ownership follows the exact c. 1300 snapshot, including temporary occupations such as Aragonese Murcia.';
