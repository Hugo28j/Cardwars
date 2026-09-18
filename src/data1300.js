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
 }
];

export const CITY_1300=Object.fromEntries(CITIES_1300.map((c,index)=>[c.id,{...c,index}]));
export const RESEARCH_1300_NOTE='Population figures are historical estimates, not census counts. Army, navy, Food, Technology and Satisfaction are comparative Cardwars gameplay estimates based on population, strategic role, institutions, trade, fortifications and frontier exposure. Political ownership follows the exact c. 1300 snapshot, including temporary occupations such as Aragonese Murcia.';
