// Researched Cardwars city set for c. 1300 CE.
// Population figures use published estimates where available. Army/navy and the 0-100
// Food, Economy, Technology and Stability scores are explicitly modelled comparative gameplay
// estimates because no exact medieval measurements exist for those concepts.
export const RARITIES_1300=['Common','Uncommon','Rare','Epic','Legendary'];
export const RARITY_COLORS_1300=['#a5b7b1','#80bca7','#81b4e5','#bd99df','#e5b869'];

// Army audit v1 (entries 000-075): Army counts only a permanent/professional military core or fixed garrison; temporary civic militias, feudal levies and emergency peasant musters are excluded.
// Army audit v2 (entries 076-150): same conservative rule; household retainers and fixed castle/city garrisons count, temporary civic militias and wartime levies do not.
// Army audit v3 (entries 151-224): same conservative rule; Italian communal militias are excluded, while paid permanent cores, signorial household troops and fixed wartime garrisons count.
// Population/Navy/Size audit v1 (entries 000-074): population and urban footprint use source-backed c.1300 estimates where available; Navy counts dedicated or regularly maintained military vessels, excluding ordinary merchant/river craft temporarily requisitioned for war.
// Population/Navy/Size audit v2 (entries 075-149): same source-backed c.1300 rule; Navy excludes ordinary merchant and Hanseatic shipping unless vessels were maintained as a dedicated military fleet.
// Population/Navy/Size audit v3 (entries 150-224): same source-backed c.1300 rule; Navy counts dedicated or regularly available military vessels and excludes ordinary merchant shipping unless explicitly integrated into a state war fleet.
// Qualitative-score audit full set (entries 000-249): scores use a deliberately wide 0-100 comparative scale across the full current card set. ~50 is middling; 30-40 is clearly weak; 70-80 is strong; 90+ is exceptional; 100 is reserved for the strongest card(s) in that category. Food combines supply, resilience, broad access and diet quality rather than agricultural output alone. Full-set target averages are approximately 65-70.
export const CITIES_1300=[
 {
  id:'1300-seville',name:'Seville',modern:'Seville',country:'Crown of Castile',subrealm:'Kingdom of Seville',
  lon:-5.9845,lat:37.3891,rarity:4,year:1300,people:90000,populationText:'90.0 K',populationConfidence:'medium',
  sizeText:'2.7 km²',sizeConfidence:'high',army:250,armyText:'250',navy:12,navyText:'12',
  food:78,technology:78,economyScore:89,stability:58,
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
  lon:-4.7794,lat:37.8882,rarity:2,year:1300,people:60000,populationText:'60.0 K',populationConfidence:'medium',
  sizeText:'2.0 km²',sizeConfidence:'low',army:200,armyText:'200',navy:0,navyText:'0',
  food:72,technology:72,economyScore:72,stability:56,
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
  lon:-4.0273,lat:39.8628,rarity:2,year:1300,people:42000,populationText:'42.0 K',populationConfidence:'medium',
  sizeText:'1.15 km²',sizeConfidence:'high',army:0,armyText:'0',navy:0,navyText:'0',
  food:58,technology:88,economyScore:80,stability:60,
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
  lon:-4.7245,lat:41.6523,rarity:1,year:1300,people:25000,populationText:'25.0 K',populationConfidence:'medium',
  sizeText:'1.0 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:66,technology:62,economyScore:64,stability:62,
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
  lon:-3.6969,lat:42.3439,rarity:1,year:1300,people:21000,populationText:'21.0 K',populationConfidence:'medium',
  sizeText:'1.0 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:55,technology:64,economyScore:72,stability:62,
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
  lon:-1.1307,lat:37.9922,rarity:1,year:1300,people:15000,populationText:'15.0 K',populationConfidence:'medium',
  sizeText:'1.1 km²',sizeConfidence:'low',army:300,armyText:'300',navy:0,navyText:'0',
  food:94,technology:76,economyScore:70,stability:32,
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
  lon:-5.6635,lat:40.9701,rarity:1,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–14 K',populationConfidence:'low',
  sizeText:'0.9 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:54,technology:93,economyScore:62,stability:62,
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
  lon:-4.1192,lat:40.9429,rarity:0,year:1300,people:9000,populationText:'9.0 K',populationRange:'7–12 K',populationConfidence:'low',
  sizeText:'0.8 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:60,technology:57,economyScore:62,stability:60,
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
  lon:-5.5671,lat:42.5987,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationConfidence:'medium',
  sizeText:'0.33 km²',sizeConfidence:'medium',army:0,armyText:'0',navy:0,navyText:'0',
  food:53,technology:52,economyScore:47,stability:60,
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
  lon:-3.7903,lat:37.7796,rarity:0,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–15 K',populationConfidence:'low',
  sizeText:'0.45 km²',sizeConfidence:'medium',army:400,armyText:'400',navy:0,navyText:'0',
  food:67,technology:48,economyScore:50,stability:34,
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
  lon:-8.5448,lat:42.8782,rarity:1,year:1300,people:8000,populationText:'8.0 K',populationRange:'6–10 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:52,technology:80,economyScore:62,stability:68,
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
  lon:-6.0883,lat:40.0312,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.30 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:76,technology:50,economyScore:48,stability:60,
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
  lon:-8.6291,lat:41.1579,rarity:1,year:1300,people:6000,populationText:'6.0 K',populationConfidence:'medium',
  sizeText:'0.45 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:64,technology:61,economyScore:69,stability:82,
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
  lon:-8.4265,lat:41.5454,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–6 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:70,technology:69,economyScore:55,stability:80,
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
  lon:-8.2962,lat:41.4444,rarity:0,year:1300,people:4500,populationText:'4.5 K',populationRange:'3.5–5.5 K',populationConfidence:'low',
  sizeText:'0.30 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:65,technology:54,economyScore:54,stability:82,
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
  lon:-8.4292,lat:40.2033,rarity:0,year:1300,people:6000,populationText:'6.0 K',populationConfidence:'medium',
  sizeText:'0.55 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:68,technology:69,economyScore:60,stability:82,
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
  lon:-9.1393,lat:38.7223,mapLon:-9.0000,mapLat:38.7350,rarity:3,year:1300,people:35000,populationText:'35.0 K',populationConfidence:'medium',
  sizeText:'1.50 km²',sizeConfidence:'low',army:150,armyText:'150',navy:3,navyText:'3',
  food:72,technology:84,economyScore:88,stability:84,
  historicalRole:'Largest Portuguese city, major Atlantic-Tagus port and frequent centre of royal government',
  economy:'International maritime trade, shipbuilding, fisheries, crafts and Tagus-region commerce',
  militaryRole:'Large fortified port with the strongest naval potential in Portugal',
  researchSummary:'Around 1300 Lisbon was Portugal’s largest city and dominant port. The kingdom’s Studium Generale was founded there in 1290, reinforcing its administrative and intellectual importance.',
  evidenceNote:'Population uses a published c.1300 estimate around 35,000. Navy is kept conservative because Portugal’s formal office of Fleet Admiral dates from 1307; the value represents only a small regularly available military core, not merchant shipping.',
  sources:[
   ['Brill — An Agrarian History of Portugal, 1000–2000','https://brill.com/display/book/edcoll/9789004311527/B9789004311527-s003.xml'],
   ['Universidade de Coimbra — Studium Generale founded in Lisbon in 1290','https://www.uc.pt/sobrenos/historia/xiii-a-xvi/'],
   ['Encyclopaedia of Portuguese Expansion — Lisbon','https://eve.fcsh.unl.pt/en/places/lisbon']
  ]
 },
 {
  id:'1300-evora',name:'Évora',modern:'Évora',country:'Kingdom of Portugal',subrealm:'Kingdom of Portugal · major southern royal city',
  lon:-7.9135,lat:38.5714,rarity:1,year:1300,people:12000,populationText:'12.0 K',populationConfidence:'medium',
  sizeText:'0.75 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:75,technology:59,economyScore:60,stability:82,
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
  lon:-8.6868,lat:39.2362,rarity:0,year:1300,people:7000,populationText:'7.0 K',populationConfidence:'medium',
  sizeText:'0.55 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:92,technology:57,economyScore:63,stability:85,
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
  lon:-8.4382,lat:37.1890,rarity:1,year:1300,people:6000,populationText:'6.0 K',populationRange:'4–8 K',populationConfidence:'low',
  sizeText:'0.50 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:78,technology:57,economyScore:55,stability:78,
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
  lon:-1.6440,lat:42.8125,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationConfidence:'low',
  sizeText:'0.70 km²',sizeConfidence:'low',army:150,armyText:'150',navy:0,navyText:'0',
  food:50,technology:63,economyScore:58,stability:28,
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
  lon:2.1734,lat:41.3851,mapLon:2.0500,mapLat:41.3600,rarity:4,year:1300,people:35000,populationText:'35.0 K',populationRange:'30–40 K',populationConfidence:'medium',
  sizeText:'1.20 km²',sizeConfidence:'medium',army:0,armyText:'0',navy:12,navyText:'12',
  food:62,technology:92,economyScore:95,stability:70,
  historicalRole:'Leading Catalan city, royal-comital centre and major Mediterranean commercial power',
  economy:'Maritime trade, finance, textiles, crafts and Mediterranean shipping',
  militaryRole:'Large walled city and the Crown’s strongest urban maritime base in Catalonia',
  researchSummary:'By 1300 Barcelona had expanded far beyond its Roman core, enclosed its suburbs in new 13th-century walls and become a major Mediterranean economic and political centre.',
  evidenceNote:'Population is set at about 35,000 within the commonly cited 30–40K range. The 13th-century walled expansion is approximately 120 hectares. Navy reflects a conservative share of the Crown’s dedicated galley capacity associated with Barcelona’s royal shipyards, not a full campaign fleet.',
  sources:[
   ['Museu d’Història de Barcelona — Romanesque/medieval city guide','https://www.barcelona.cat/museuhistoria/sites/default/files/guia_romanesque_eng.pdf'],
   ['Enciclopèdia Catalana — demographic apogee around 1200–1300','https://www.enciclopedia.cat/catalunya-romanica/del-1200-al-1300.-cap-a-lapogeu-medieval'],
   ['Oxford — The Medieval Crown of Aragon','https://academic.oup.com/book/26955']
  ]
 },
 {
  id:'1300-zaragoza',name:'Zaragoza',modern:'Zaragoza',country:'Crown of Aragon',subrealm:'Kingdom of Aragon · royal and administrative capital',
  lon:-0.8891,lat:41.6488,rarity:2,year:1300,people:22000,populationText:'≥22.0 K',populationConfidence:'high',
  sizeText:'1.00 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:86,technology:76,economyScore:78,stability:67,
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
  lon:2.8214,lat:41.9794,mapLon:2.5500,mapLat:41.7800,rarity:1,year:1300,people:8000,populationText:'8.0 K',populationConfidence:'medium',
  sizeText:'0.55 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:61,technology:70,economyScore:61,stability:68,
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
  lon:-0.3763,lat:39.4699,mapLon:-0.4400,mapLat:39.4850,rarity:3,year:1300,people:25000,populationText:'25.0 K',populationConfidence:'medium',
  sizeText:'0.60 km²',sizeConfidence:'medium',army:150,armyText:'150',navy:2,navyText:'2',
  food:100,technology:86,economyScore:87,stability:66,
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
  lon:-0.4810,lat:38.3452,mapLon:-0.5500,mapLat:38.3600,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–6 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:200,armyText:'200',navy:0,navyText:'0',
  food:69,technology:54,economyScore:54,stability:35,
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
  lon:-6.9707,lat:38.8794,rarity:0,year:1300,people:7000,populationText:'7.0 K',populationRange:'5–9 K',populationConfidence:'low',
  sizeText:'0.50 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:68,technology:46,economyScore:46,stability:43,
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
  lon:-2.1374,lat:40.0704,rarity:1,year:1300,people:8000,populationText:'8.0 K',populationRange:'6–10 K',populationConfidence:'low',
  sizeText:'0.45 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:54,technology:67,economyScore:64,stability:60,
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
  lon:-3.1669,lat:40.6330,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–6 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:62,technology:50,economyScore:49,stability:60,
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
  lon:-3.5986,lat:37.1773,rarity:4,year:1300,people:90000,populationText:'90.0 K',populationRange:'90–150 K',populationConfidence:'low',
  sizeText:'1.80 km²',sizeConfidence:'low',army:2000,armyText:'2.0 K',navy:0,navyText:'0',
  food:96,technology:95,economyScore:91,stability:65,
  historicalRole:'Capital of the Nasrid Emirate and one of the largest, richest cities in Iberia',
  economy:'Silk, crafts, irrigated agriculture, taxation and long-distance Mediterranean trade',
  militaryRole:'Heavily fortified mountain-basin capital protected by the Alhambra and surrounding defensive system',
  researchSummary:'Granada was the capital of the Nasrid state founded in 1238, the last Muslim polity in medieval Iberia. Around 1300 it was already a major political, cultural and economic centre.',
  evidenceNote:'Published population reconstructions vary sharply, roughly from 90,000 to 150,000 for 1300. The card conservatively uses 90,000. Army uses a conservative estimate for the permanent/regular military core associated with Granada city; the wider Nasrid state could mobilise substantially more troops.',
  sources:[
   ['Oxford Bibliographies — Nasrids of Granada','https://doi.org/10.1093/obo/9780195390155-0308'],
   ['Historical city-population source compilation for Granada','https://www.worldcitypop.com/data_source.asp?disp_city=Granada&disp_time=1300'],
   ['Oxford — City of Illusions: A History of Granada','https://academic.oup.com/book/38932/chapter-abstract/338114492']
  ]
 },
 {
  id:'1300-malaga',name:'Málaga',modern:'Málaga',country:'Emirate of Granada',subrealm:'Nasrid Emirate of Granada · principal Mediterranean port',
  lon:-4.4214,lat:36.7213,mapLon:-4.4214,mapLat:36.7850,rarity:2,year:1300,people:25000,populationText:'25.0 K',populationRange:'20–35 K',populationConfidence:'low',
  sizeText:'1.00 km²',sizeConfidence:'low',army:400,armyText:'400',navy:4,navyText:'4',
  food:73,technology:82,economyScore:83,stability:68,
  historicalRole:'Major Nasrid Mediterranean port, fortified city and commercial gateway',
  economy:'Maritime trade, ceramics, agriculture, crafts and Mediterranean commerce',
  militaryRole:'Strong walled port protected by the Alcazaba and a complex urban defensive system',
  researchSummary:'Málaga entered the Nasrid Kingdom in 1238 and remained one of its key ports. Its fortified medina, suburbs and commercial activity made it one of the emirate’s most important cities.',
  evidenceNote:'The exact c.1300 population is uncertain, so the card keeps a conservative 20–35K range. Navy represents a small dedicated military core at this major Nasrid port rather than its wider merchant shipping.',
  sources:[
   ['Ayuntamiento de Málaga — Historia ampliada','https://www.malaga.eu/la-ciudad/historia-de-la-ciudad/historia-ampliada/'],
   ['Málaga archaeological routes — Muslim Málaga','https://rutasarqueologicas.malaga.eu/malaga-musulmana/'],
   ['Alcazaba de Málaga — official history','https://alcazabaygibralfaro.malaga.eu/en/alcazaba/history/']
  ]
 },
 {
  id:'1300-nantes',name:'Nantes',modern:'Nantes',country:'Kingdom of France',subrealm:'Duchy of Brittany · ducal city on the Loire',
  lon:-1.5536,lat:47.2184,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.70 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:70,technology:62,economyScore:70,stability:74,
  historicalRole:'One of the principal economic and ducal centres of independent Brittany',
  economy:'Loire trade, maritime commerce, crafts and regional agriculture',
  militaryRole:'Fortified river-port with ducal residence and useful naval capacity',
  researchSummary:'Nantes was firmly within the Duchy of Brittany in 1300 and had become one of its leading economic poles, strengthened by 13th-century ducal fortifications and its position at the Loire estuary.',
  evidenceNote:'No direct c.1300 census survives; population and size are low-confidence estimates. Political ownership and the city’s ducal-commercial role are well documented.',
  gameplayNote:'Gameplay grouping: Nantes is assigned to France to match the simplified map border.',historicalCountry:'Duchy of Brittany',historicalSubrealm:'Duchy of Brittany · ducal city on the Loire',
  sources:[
   ['Nantes Patrimonia — Duché de Bretagne','https://patrimonia.nantes.fr/fiches-encyclopediques/duche-de-bretagne/'],
   ['Nantes Patrimonia — Moyen Âge','https://patrimonia.nantes.fr/periodes/moyen-age/']
  ]
 },
 {
  id:'1300-rennes',name:'Rennes',modern:'Rennes',country:'Kingdom of France',subrealm:'Duchy of Brittany · major eastern ducal centre',
  lon:-1.6778,lat:48.1173,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:67,technology:57,economyScore:60,stability:74,
  historicalRole:'One of Brittany’s foremost political and commercial cities',
  economy:'Markets, crafts, regional agriculture and ducal administration',
  militaryRole:'Important fortified eastern city near the frontier with the French kingdom',
  researchSummary:'Rennes was one of the major urban centres of the Duchy of Brittany and a regular place of ducal power, especially important because of its eastern position.',
  evidenceNote:'Population is a broad low-confidence reconstruction; political placement inside the Duchy of Brittany is secure.',
  gameplayNote:'Gameplay grouping: Rennes is assigned to France to match the simplified map border.',historicalCountry:'Duchy of Brittany',historicalSubrealm:'Duchy of Brittany · major eastern ducal centre',
  sources:[
   ['Nantes Patrimonia — Duché de Bretagne','https://patrimonia.nantes.fr/fiches-encyclopediques/duche-de-bretagne/'],
   ['Encyclopaedia Britannica — Rennes','https://www.britannica.com/place/Rennes']
  ]
 },
 {
  id:'1300-vannes',name:'Vannes',modern:'Vannes',country:'Duchy of Brittany',subrealm:'Duchy of Brittany · episcopal and port city',
  lon:-2.7608,lat:47.6582,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–6 K',populationConfidence:'low',
  sizeText:'0.30 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:68,technology:54,economyScore:53,stability:76,
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
  id:'1300-quimper',name:'Quimper',modern:'Quimper',country:'Duchy of Brittany',subrealm:'Cornouaille · episcopal city divided between episcopal and ducal authority',
  lon:-4.1022,lat:47.9956,rarity:0,year:1300,people:3500,populationText:'3.5 K',populationRange:'3–5 K',populationConfidence:'low',
  sizeText:'0.15 km²',sizeConfidence:'medium',army:50,armyText:'50',navy:0,navyText:'0',
  food:61,technology:60,economyScore:59,stability:64,
  historicalRole:'Religious, political and administrative centre of Cornouaille with a fortified episcopal core',
  economy:'Regional markets, church institutions, crafts, agriculture and modest maritime commerce on the Odet',
  militaryRole:'Walled episcopal city whose defenses were shared and contested between bishop and duke',
  researchSummary:'Around 1300 Quimper was both an episcopal centre and part of the Breton ducal political system. The medieval city was enclosed by about 1.5 km of walls, with power divided between the bishop inside the walls and the duke in the western ducal quarter.',
  evidenceNote:'The enclosed medieval city covered about 15 hectares. No reliable c.1300 census survives; the population is therefore a cautious estimate below the roughly 4,500 residents recorded for the mid-15th century.',
  sources:[
   ['Ville de Quimper — Le bas Moyen Âge','https://www.quimper.bzh/382-le-bas-moyen-age-entre-pouvoir-episcopal-et-pouvoir-ducal.htm'],
   ['Ville de Quimper — The town’s history','https://en.quimper.bzh/664-the-town-s-history.htm']
  ]
 },
 {
  id:'1300-rouen',name:'Rouen',modern:'Rouen',country:'Kingdom of France',subrealm:'Royal Duchy of Normandy · capital and Seine port',
  lon:1.0993,lat:49.4432,rarity:3,year:1300,people:40000,populationText:'40.0 K',populationRange:'35–45 K',populationConfidence:'medium',
  sizeText:'1.70 km²',sizeConfidence:'medium',army:100,armyText:'100',navy:4,navyText:'4',
  food:58,technology:82,economyScore:89,stability:74,
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
  lon:-0.3707,lat:49.1829,rarity:2,year:1300,people:15000,populationText:'15.0 K',populationRange:'12–18 K',populationConfidence:'low',
  sizeText:'1.00 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:64,technology:65,economyScore:68,stability:74,
  historicalRole:'Major Norman administrative, religious and commercial city',
  economy:'Markets, textiles, crafts, agriculture and regional trade',
  militaryRole:'Large fortified city dominated by the ducal castle',
  researchSummary:'Caen was conquered by Philip Augustus in 1204 and remained an important Norman city under the French crown, retaining major religious foundations and a powerful castle.',
  evidenceNote:'Published medieval demographic work treats 20,000 as probably inflated and supports a figure around 15,000 near the end of the 13th century. Navy is zero because no standing military fleet is evidenced for the city.',
  sources:[
   ['Ville de Caen — dates clés','https://caen.fr/node/83730'],
   ['Préfecture de Normandie — Histoire de la Normandie','https://www.prefectures-regions.gouv.fr/normandie/Region-et-institutions/Portrait-de-la-region/Histoire/Histoire-de-la-Normandie']
  ]
 },
 {
  id:'1300-amiens',name:'Amiens',modern:'Amiens',country:'Kingdom of France',subrealm:'Amiénois · French royal sphere',
  lon:2.2958,lat:49.8941,rarity:1,year:1300,people:20000,populationText:'20.0 K',populationRange:'15–25 K',populationConfidence:'low',
  sizeText:'0.90 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:55,technology:70,economyScore:77,stability:70,
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
  lon:2.3522,lat:48.8566,rarity:4,year:1300,people:200000,populationText:'200 K',populationRange:'170–220 K',populationConfidence:'medium',
  sizeText:'4.4 km²',sizeConfidence:'medium',army:500,armyText:'500',navy:0,navyText:'0',
  food:50,technology:100,economyScore:98,stability:78,
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
  id:'1300-reims',name:'Reims',modern:'Reims',country:'County of Champagne',subrealm:'Archbishopric of Reims · coronation city within the French kingdom',
  lon:4.0317,lat:49.2583,rarity:2,year:1300,people:18000,populationText:'18.0 K',populationRange:'16–20 K',populationConfidence:'medium',
  sizeText:'1.70 km²',sizeConfidence:'medium',army:0,armyText:'0',navy:0,navyText:'0',
  food:61,technology:80,economyScore:72,stability:72,
  historicalRole:'Archiepiscopal metropolis and traditional coronation city of the French kings',
  economy:'Church wealth, cloth, wine, markets and regional commerce',
  militaryRole:'Walled ecclesiastical city with high symbolic and strategic value',
  researchSummary:'Reims combined the temporal lordship of its archbishop with its unique role in French kingship. The cathedral and archiepiscopal complex made it one of the kingdom’s most prestigious cities.',
  evidenceNote:'Population and built-up area are anchored to Pierre Desportes’ reconstruction of Reims around the turn of the 14th century; exact figures remain estimates.',
  gameplayNote:'Gameplay grouping: Reims is assigned to Champagne to match the simplified Champagne region.',historicalCountry:'Kingdom of France',historicalSubrealm:'Archbishopric of Reims · coronation city within the French kingdom',
  sources:[
   ['Visit Reims — Cathedral district','https://visit.reims.fr/accueil/cathedral-district'],
   ['Visit Reims — Château Porte-Mars','https://visit.reims.fr/parcours-dans-la-ville/cite-des-sacres/chateau-porte-mars']
  ]
 },
 {
  id:'1300-troyes',name:'Troyes',modern:'Troyes',country:'County of Champagne',subrealm:'County of Champagne · personal union with the French crown through Joan I and Philip IV',
  lon:4.0744,lat:48.2973,rarity:2,year:1300,people:11000,populationText:'11.0 K',populationRange:'10–12 K',populationConfidence:'low',
  sizeText:'1.00 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:57,technology:73,economyScore:82,stability:65,
  historicalRole:'Principal city of Champagne and international fair centre',
  economy:'Champagne fairs, cloth, finance, crafts and long-distance commerce',
  militaryRole:'Walled county capital with strong economic rather than frontier-military power',
  researchSummary:'Troyes remained the leading city of Champagne’s famous fair system. In 1300 the county was ruled by Joan I of Navarre/Champagne and her husband Philip IV of France in personal union, not yet simply erased as a separate county.',
  evidenceNote:'Population is based on published estimates around the turn of the 13th and 14th centuries. The fair system and the county’s personal-union status are well documented.',
  sources:[
   ['Ville de Troyes — medieval history','https://www.ville-troyes.fr/decouvrir-troyes/troyes-une-histoire-passionnante/'],
   ['Larousse — French royal domain and Champagne','https://www.larousse.fr/encyclopedie/divers/domaine_royal/44341']
  ]
 },
 {
  id:'1300-provins',name:'Provins',modern:'Provins',country:'County of Champagne',subrealm:'County of Champagne · international fair city',
  lon:3.2990,lat:48.5601,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–15 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:55,technology:74,economyScore:79,stability:63,
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
  lon:5.0415,lat:47.3220,rarity:1,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–15 K',populationConfidence:'low',
  sizeText:'0.75 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:69,technology:65,economyScore:66,stability:76,
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
  id:'1300-beaune',name:'Beaune',modern:'Beaune',country:'Duchy of Burgundy',subrealm:'Duchy of Burgundy · important ducal and market town',
  lon:4.8392,lat:47.0260,rarity:2,year:1300,people:11000,populationText:'11.0 K',populationRange:'8–14 K',populationConfidence:'low',
  sizeText:'0.55 km²',sizeConfidence:'low',army:70,armyText:'70',navy:0,navyText:'0',
  food:72,technology:63,economyScore:74,stability:72,
  historicalRole:'Important Burgundian market town and ducal centre south of Dijon',
  economy:'Wine, local markets, agriculture, crafts and regional trade',
  militaryRole:'Walled inland town with moderate local defensive value',
  researchSummary:'Beaune was one of the important towns of the Duchy of Burgundy and adds a strong secondary Burgundian city between Dijon and the Saône valley.',
  evidenceNote:'Population, footprint, army and comparative scores are low-confidence Cardwars gameplay estimates; the city is placed in the Duchy of Burgundy to match the current map.',
  sources:[
   ['Beaune — overview','https://fr.wikipedia.org/wiki/Beaune'],
   ['Duchy of Burgundy — overview','https://en.wikipedia.org/wiki/Duchy_of_Burgundy']
  ]
 },
 {
  id:'1300-autun',name:'Autun',modern:'Autun',country:'Duchy of Burgundy',subrealm:'Duchy of Burgundy · episcopal and regional centre',
  lon:4.2987,lat:46.9510,rarity:1,year:1300,people:9000,populationText:'9.0 K',populationRange:'7–12 K',populationConfidence:'low',
  sizeText:'0.70 km²',sizeConfidence:'low',army:60,armyText:'60',navy:0,navyText:'0',
  food:67,technology:66,economyScore:62,stability:73,
  historicalRole:'Historic episcopal city and regional centre in western Burgundy',
  economy:'Regional trade, church activity, crafts and surrounding agriculture',
  militaryRole:'Defended inland city with local strategic importance',
  researchSummary:'Autun remained a significant ecclesiastical and regional centre in Burgundy and helps fill the western part of the duchy on the Cardwars map.',
  evidenceNote:'Population, footprint, army and comparative scores are low-confidence Cardwars gameplay estimates; political ownership follows the current map.',
  sources:[
   ['Autun — overview','https://fr.wikipedia.org/wiki/Autun'],
   ['Duchy of Burgundy — overview','https://en.wikipedia.org/wiki/Duchy_of_Burgundy']
  ]
 },
 {
  id:'1300-chalon-sur-saone',name:'Chalon-sur-Saône',modern:'Chalon-sur-Saône',country:'Duchy of Burgundy',subrealm:'Duchy of Burgundy · Saône commercial centre',
  lon:4.8527,lat:46.7802,rarity:2,year:1300,people:13000,populationText:'13.0 K',populationRange:'10–16 K',populationConfidence:'low',
  sizeText:'0.85 km²',sizeConfidence:'low',army:90,armyText:'90',navy:0,navyText:'0',
  food:73,technology:64,economyScore:77,stability:69,
  historicalRole:'Important Saône river town and commercial centre of southern Burgundy',
  economy:'River commerce, markets, agriculture, crafts and transit trade',
  militaryRole:'Strategically placed river town with stronger regional military value',
  researchSummary:'Chalon-sur-Saône was a notable Burgundian urban and trading centre on the Saône and is one of the stronger secondary cities added to the duchy.',
  evidenceNote:'Population, footprint, army and comparative scores are low-confidence Cardwars gameplay estimates; political ownership follows the current map.',
  sources:[
   ['Chalon-sur-Saône — overview','https://fr.wikipedia.org/wiki/Chalon-sur-Sa%C3%B4ne'],
   ['Duchy of Burgundy — overview','https://en.wikipedia.org/wiki/Duchy_of_Burgundy']
  ]
 },
 {
  id:'1300-tours',name:'Tours',modern:'Tours',country:'Kingdom of France',subrealm:'Touraine · French royal domain',
  lon:0.6848,lat:47.3941,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:73,technology:66,economyScore:64,stability:78,
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
  lon:-0.5632,lat:47.4784,mapLon:-0.8200,mapLat:47.4200,rarity:1,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–15 K',populationConfidence:'low',
  sizeText:'0.80 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:74,technology:64,economyScore:63,stability:75,
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
  id:'1300-le-mans',name:'Le Mans',modern:'Le Mans',country:'Kingdom of France',subrealm:'County of Maine · Angevin apanage associated with Charles of Valois',
  lon:0.1996,lat:48.0061,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:70,technology:65,economyScore:64,stability:72,
  historicalRole:'Capital of Maine, episcopal centre and important fortified city between Anjou and Normandy',
  economy:'Regional markets, crafts, agriculture, church institutions and traffic across western France',
  militaryRole:'Fortified comital and episcopal city protected by the old Roman wall and later medieval defenses',
  researchSummary:'Le Mans was the traditional capital of Maine. The county had long been tied to Anjou and around 1300 belonged to the Angevin apanage associated with the Valois-Anjou line.',
  evidenceNote:'Population and urban footprint are low-confidence gameplay estimates. Le Mans’s role as capital of Maine and major episcopal centre is well established.',
  sources:[
   ['Le Mans Tourisme — Cité Plantagenêt','https://www.lemans-tourisme.com/en/discover/cite-plantagenet.html'],
   ['Encyclopaedia Britannica 1911 — Maine','https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Maine_(province)']
  ]
 },
 {
  id:'1300-poitiers',name:'Poitiers',modern:'Poitiers',country:'Kingdom of France',subrealm:'Poitou · reverted to the French royal domain in 1271',
  lon:0.3404,lat:46.5802,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–13 K',populationConfidence:'low',
  sizeText:'0.80 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:66,technology:63,economyScore:58,stability:72,
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
  id:'1300-perigueux',name:'Périgueux',modern:'Périgueux',country:'Kingdom of England',subrealm:'Périgord · Aquitanian fief; under French wartime confiscation in 1300',
  lon:0.7211,lat:45.1840,rarity:1,year:1300,people:9000,populationText:'9.0 K',populationRange:'7–11 K',populationConfidence:'low',
  sizeText:'0.45 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:70,technology:67,economyScore:66,stability:67,
  historicalRole:'Fortified pilgrimage and market city formed by the union of the Cité and Puy-Saint-Front',
  economy:'Pilgrimage, markets, crafts, agriculture and regional commerce in the Isle valley',
  militaryRole:'Two formerly separate fortified urban nuclei with a modest permanent defensive core',
  researchSummary:'The Cité and Puy-Saint-Front were formally united in 1240. Périgord was included in the Aquitanian lands recognised to the English king by the 1259 settlement, although Philip IV confiscated the duchy during the 1294–1303 Gascon War; the map keeps the longer-term Aquitaine grouping for gameplay.',
  evidenceNote:'Population and footprint are low-confidence gameplay estimates. Political control around the exact year 1300 was contested: Périgord belonged to the Aquitanian settlement but was under French wartime confiscation from 1294 until the 1303 peace. The card is grouped with Aquitaine to match the map’s non-temporary political layer.',
  sources:[
   ['Ville de Périgueux — history of the city','https://perigueux.fr/bienvenue-a-perigueux/histoire-de-la-ville.html'],
   ['Ville de Périgueux — Saint-Front historical focus','https://perigueux.fr/fileadmin/user_upload/fichiers/03-PERIGUEUX-AU-QUOTIDIEN/03-05-vie-culturelle/PDF/FOCUS-St_FRONT-perigueux-mai-2026.pdf']
  ]
 },
 {
  id:'1300-la-rochelle',name:'La Rochelle',modern:'La Rochelle',country:'Kingdom of England',subrealm:'Aunis/Saintonge frontier · French royal port',
  lon:-1.1511,lat:46.1603,rarity:2,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–15 K',populationConfidence:'low',
  sizeText:'0.70 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:67,technology:67,economyScore:79,stability:70,
  historicalRole:'Important Atlantic trading port of the French crown',
  economy:'Wine, salt, Atlantic shipping, fisheries and merchant trade',
  militaryRole:'Walled port with substantial merchant-maritime capacity',
  researchSummary:'La Rochelle was a strategically important Atlantic port in the French royal sphere by 1300, with extensive maritime trade and strong urban privileges.',
  evidenceNote:'Population and navy are gameplay estimates; port significance and French political control are well established.',
  gameplayNote:'Gameplay grouping: La Rochelle is assigned to English Aquitaine to match the simplified western border.',historicalCountry:'Kingdom of France',historicalSubrealm:'Aunis/Saintonge frontier · French royal port',
  sources:[
   ['Encyclopaedia Britannica — La Rochelle','https://www.britannica.com/place/La-Rochelle'],
   ['Ville de La Rochelle — official site','https://www.larochelle.fr/']
  ]
 },
 {
  id:'1300-orleans',name:'Orléans',modern:'Orléans',country:'Kingdom of France',subrealm:'Orléanais · core Capetian royal domain',
  lon:1.9093,lat:47.9029,rarity:2,year:1300,people:15000,populationText:'15.0 K',populationRange:'12–18 K',populationConfidence:'low',
  sizeText:'0.85 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:82,technology:74,economyScore:71,stability:77,
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
  lon:2.3988,lat:47.0810,rarity:1,year:1300,people:15000,populationText:'15.0 K',populationRange:'12–18 K',populationConfidence:'low',
  sizeText:'0.85 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:71,technology:67,economyScore:64,stability:76,
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
  lon:1.2611,lat:45.8336,rarity:1,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–15 K',populationConfidence:'low',
  sizeText:'0.75 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:59,technology:85,economyScore:67,stability:64,
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
  id:'1300-bordeaux',name:'Bordeaux',modern:'Bordeaux',country:'Kingdom of England',subrealm:'Duchy of Aquitaine/Gascony · held by Edward I as duke',
  lon:-0.5792,lat:44.8378,rarity:3,year:1300,people:30000,populationText:'30.0 K',populationRange:'25–35 K',populationConfidence:'low',
  sizeText:'1.20 km²',sizeConfidence:'low',army:200,armyText:'200',navy:0,navyText:'0',
  food:66,technology:75,economyScore:87,stability:35,
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
  id:'1300-bayonne',name:'Bayonne',modern:'Bayonne',country:'Kingdom of England',subrealm:'English-held Gascony · directly administered royal port',
  lon:-1.4748,lat:43.4929,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.60 km²',sizeConfidence:'low',army:100,armyText:'100',navy:2,navyText:'2',
  food:64,technology:66,economyScore:71,stability:48,
  historicalRole:'Important English-Gascon fortified port and shipbuilding centre',
  economy:'Shipping, shipbuilding, wine transport, fisheries and Atlantic trade',
  militaryRole:'Fortified port with a notably active fleet and direct English royal administration',
  researchSummary:'Bayonne had been incorporated into the Aquitanian lands of the English crown after 1152 and by 1300 was administered through English royal officers. Its maritime community was one of the strongest in Gascony.',
  evidenceNote:'Population is low-confidence. Bayonne had an unusually strong maritime community, but Navy counts only a conservative regular military core and excludes the broader merchant fleet that could be requisitioned.',
  sources:[
   ['Ville de Bayonne — formation of the city','https://www.bayonne.fr/cest-a-bayonne/culture/histoire-et-patrimoines/une-ville-dart-et-dhistoire/comprendre-la-formation-de-la-ville'],
   ['Ville de Bayonne — heritage brochure','https://www.bayonne.fr/fileadmin/medias/Publications/Patrimoine_-_VAH/Parcours_Bayonne.pdf']
  ]
 },
 {
  id:'1300-toulouse',name:'Toulouse',modern:'Toulouse',country:'Kingdom of France',subrealm:'Former County of Toulouse · direct royal domain since 1271',
  lon:1.4442,lat:43.6047,rarity:3,year:1300,people:35000,populationText:'35.0 K',populationRange:'30–40 K',populationConfidence:'low',
  sizeText:'1.60 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:88,technology:90,economyScore:85,stability:74,
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
  id:'1300-cahors',name:'Cahors',modern:'Cahors',country:'Kingdom of France',subrealm:'Quercy · episcopal and consular city under French royal suzerainty',
  lon:1.4400,lat:44.4475,rarity:2,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–15 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:72,technology:72,economyScore:82,stability:62,
  historicalRole:'Prosperous Quercy city, bishopric and major merchant centre in the Lot valley',
  economy:'Long-distance finance, wine, markets, crafts, river-valley trade and church revenues',
  militaryRole:'Fortified episcopal city with a modest permanent defensive establishment',
  researchSummary:'Cahors experienced a major medieval flourishing between the 12th and 14th centuries. Its consular institutions are documented in the 13th century, alongside strong episcopal lordship.',
  evidenceNote:'Population and footprint are low-confidence estimates. Economy is deliberately strong because medieval Cahors was an unusually important merchant and financial centre.',
  sources:[
   ['Grand Cahors — historic centre and cathedral','https://cahorsagglo.fr/visites-guidees-cahors-le-centre-historique-et-sa-cathedrale'],
   ['TELMA — consuls of Cahors, 1235','https://telma-chartes.irht.cnrs.fr/113846']
  ]
 },
 {
  id:'1300-carcassonne',name:'Carcassonne',modern:'Carcassonne',country:'Kingdom of France',subrealm:'Royal sénéchaussée and frontier fortress of Languedoc',
  lon:2.3537,lat:43.2130,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.75 km²',sizeConfidence:'low',army:250,armyText:'250',navy:0,navyText:'0',
  food:60,technology:59,economyScore:50,stability:68,
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
  lon:3.8767,lat:43.6108,rarity:2,year:1300,people:35000,populationText:'35.0 K',populationRange:'30–40 K',populationConfidence:'medium',
  sizeText:'1.10 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:68,technology:97,economyScore:91,stability:78,
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
  id:'1300-lyon',name:'Lyon',modern:'Lyon',country:'Archbishopric of Lyon',subrealm:'Imperial archiepiscopal city · not annexed to France until 1312',
  lon:4.8357,lat:45.7640,rarity:2,year:1300,people:15000,populationText:'15.0 K',populationRange:'12–20 K',populationConfidence:'low',
  sizeText:'0.90 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:59,technology:77,economyScore:76,stability:42,
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
  id:'1300-vienne',name:'Vienne',modern:'Vienne',country:'Archbishopric of Vienne',subrealm:'Imperial prince-archbishopric · city ruled by the Archbishop of Vienne',
  lon:4.8747,lat:45.5256,rarity:1,year:1300,people:7000,populationText:'7.0 K',populationRange:'5–9 K',populationConfidence:'low',
  sizeText:'0.50 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:64,technology:70,economyScore:56,stability:62,
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
  id:'1300-avignon',name:'Avignon',modern:'Avignon',country:'County of Provence',subrealm:'County of Provence · major Rhône religious and commercial centre',
  lon:4.8055,lat:43.9493,rarity:2,year:1300,people:18000,populationText:'18.0 K',populationRange:'15–22 K',populationConfidence:'low',
  sizeText:'0.90 km²',sizeConfidence:'low',army:90,armyText:'90',navy:0,navyText:'0',
  food:71,technology:76,economyScore:79,stability:68,
  historicalRole:'Important Rhône city, bishopric and regional commercial centre in Provence',
  economy:'Rhône trade, markets, crafts, church revenues and regional agriculture',
  militaryRole:'Walled river city with strong local strategic value',
  researchSummary:'Avignon was already an important southern city around 1300 and fits naturally into the County of Provence on the current Cardwars map.',
  evidenceNote:'Population, footprint, army and comparative scores are Cardwars gameplay estimates; political ownership follows the current map.',
  sources:[
   ['Avignon — overview','https://en.wikipedia.org/wiki/Avignon'],
   ['County of Provence — overview','https://en.wikipedia.org/wiki/County_of_Provence']
  ]
 },
 {
  id:'1300-narbonne',name:'Narbonne',modern:'Narbonne',country:'Kingdom of France',subrealm:'Languedoc · major Mediterranean and ecclesiastical centre',
  lon:3.0031,lat:43.1843,rarity:2,year:1300,people:16000,populationText:'16.0 K',populationRange:'12–20 K',populationConfidence:'low',
  sizeText:'0.80 km²',sizeConfidence:'low',army:100,armyText:'100',navy:2,navyText:'2',
  food:69,technology:72,economyScore:78,stability:70,
  historicalRole:'Important southern commercial and archiepiscopal city near the Mediterranean',
  economy:'Regional trade, wine, salt, crafts, church activity and Mediterranean connections',
  militaryRole:'Fortified southern city with access to coastal trade routes',
  researchSummary:'Narbonne remained one of the notable urban centres of Languedoc around 1300 and adds an important city between Carcassonne and the Mediterranean coast.',
  evidenceNote:'Population, footprint, army, navy and comparative scores are Cardwars gameplay estimates; political ownership follows the current map.',
  sources:[
   ['Narbonne — overview','https://en.wikipedia.org/wiki/Narbonne'],
   ['Languedoc — overview','https://en.wikipedia.org/wiki/Languedoc']
  ]
 },
 {
  id:'1300-nimes',name:'Nîmes',modern:'Nîmes',country:'Kingdom of France',subrealm:'Languedoc · fortified regional market city',
  lon:4.3601,lat:43.8367,rarity:1,year:1300,people:12000,populationText:'12.0 K',populationRange:'9–15 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:80,armyText:'80',navy:0,navyText:'0',
  food:72,technology:64,economyScore:66,stability:73,
  historicalRole:'Regional market and fortified city of southern France',
  economy:'Agriculture, local markets, crafts, wine and regional exchange',
  militaryRole:'Walled inland city controlling routes between Languedoc and the Rhône corridor',
  researchSummary:'Nîmes was an established southern urban centre around 1300 and helps fill the large gap between Montpellier, Avignon and the lower Rhône.',
  evidenceNote:'Population, footprint, army and comparative scores are Cardwars gameplay estimates; political ownership follows the current map.',
  sources:[
   ['Nîmes — overview','https://en.wikipedia.org/wiki/N%C3%AEmes'],
   ['Languedoc — overview','https://en.wikipedia.org/wiki/Languedoc']
  ]
 },
 {
  id:'1300-palma',name:'Palma',modern:'Palma de Mallorca',country:'Kingdom of Majorca',subrealm:'Majorca · principal city of Mallorca',
  lon:2.6502,lat:39.5696,rarity:3,year:1300,people:25000,populationText:'25.0 K',populationRange:'20–30 K',populationConfidence:'low',
  sizeText:'1.10 km²',sizeConfidence:'low',army:120,armyText:'120',navy:8,navyText:'8',
  food:64,technology:75,economyScore:86,stability:74,
  historicalRole:'Principal city and major maritime centre of Mallorca in the Kingdom of Majorca',
  economy:'Mediterranean shipping, trade, crafts, markets and island agriculture',
  militaryRole:'Fortified island capital with an important harbour and maritime role',
  researchSummary:'Palma was the dominant urban centre of Mallorca and is the natural city marker for the main island of the Kingdom of Majorca.',
  evidenceNote:'Population, footprint, army, navy and comparative scores are Cardwars gameplay estimates; political ownership follows the current map.',
  sources:[
   ['Palma de Mallorca — overview','https://en.wikipedia.org/wiki/Palma_de_Mallorca'],
   ['Kingdom of Majorca — overview','https://en.wikipedia.org/wiki/Kingdom_of_Majorca']
  ]
 },
 {
  id:'1300-marseille',name:'Marseille',modern:'Marseille',country:'County of Provence',subrealm:'Angevin County of Provence · under Charles II of Naples',
  lon:5.3698,lat:43.2965,rarity:2,year:1300,people:15000,populationText:'15.0 K',populationRange:'12–20 K',populationConfidence:'low',
  sizeText:'0.85 km²',sizeConfidence:'low',army:100,armyText:'100',navy:6,navyText:'6',
  food:58,technology:73,economyScore:84,stability:52,
  historicalRole:'Leading Provençal Mediterranean port under Angevin comital rule',
  economy:'Mediterranean shipping, trade, fisheries, crafts and provisioning',
  militaryRole:'Strong maritime city whose independent traditions had been subdued by the Angevin counts',
  researchSummary:'Marseille was not French in 1300. It lay in the County of Provence, then ruled by Charles II of Anjou-Naples, after Charles I had forcibly reduced the city’s autonomy in the 13th century.',
  evidenceNote:'Population is low-confidence. Navy reflects a conservative dedicated military component associated with the Angevin Mediterranean war effort, excluding the city’s much larger merchant shipping.',
  sources:[
   ['Ville de Marseille — 2,600 ans d’histoire','https://www.marseille.fr/decouvrir-marseille/histoire-de-marseille/pr%C3%A9sentation'],
   ['École française de Rome — Provence under Charles II, 1285–1309','https://www.persee.fr/doc/efr_0223-5099_2008_act_399_1_9274']
  ]
 },
 {
  id:'1300-aix-en-provence',name:'Aix-en-Provence',modern:'Aix-en-Provence',country:'County of Provence',subrealm:'Angevin County of Provence · principal comital capital',
  lon:5.4474,lat:43.5297,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.60 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:71,technology:69,economyScore:63,stability:72,
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
  lon:3.2247,lat:51.2093,rarity:3,year:1300,people:40000,populationText:'40.0 K',populationRange:'35–45 K',populationConfidence:'medium',
  sizeText:'3.70 km²',sizeConfidence:'high',army:300,armyText:'300',navy:0,navyText:'0',
  food:50,technology:90,economyScore:98,stability:25,
  historicalRole:'One of north-west Europe’s foremost cloth, finance and international trading cities',
  economy:'Cloth, wool, merchant finance, fairs, maritime trade through the Zwin and luxury crafts',
  militaryRole:'Large fortified commercial city with substantial civic militia and maritime connections',
  researchSummary:'Bruges was among Europe’s great commercial cities around 1300. The county remained Flanders, although Philip IV’s forces occupied it in 1300 before the Flemish revolt of 1302.',
  evidenceNote:'Population around 1300 is commonly placed near 40–45K. The second enclosure begun in 1297 surrounded about 370 hectares. Navy excludes merchant vessels temporarily requisitioned and converted for war.',
  sources:[['Bruges','https://en.wikipedia.org/wiki/Bruges'],['County of Flanders','https://en.wikipedia.org/wiki/County_of_Flanders']]
 },
 {
  id:'1300-ghent',name:'Ghent',modern:'Ghent',country:'County of Flanders',subrealm:'County of Flanders · under French occupation during 1300',
  lon:3.7174,lat:51.0543,rarity:3,year:1300,people:64000,populationText:'64.0 K',populationRange:'60–65 K',populationConfidence:'high',
  sizeText:'6.44 km²',sizeConfidence:'high',army:150,armyText:'150',navy:0,navyText:'0',
  food:54,technology:87,economyScore:96,stability:34,
  historicalRole:'Huge cloth-producing commune and one of the largest cities north of the Alps',
  economy:'Wool textiles, grain trade, crafts, river transport and merchant capital',
  militaryRole:'Exceptionally large urban militia backed by wealthy guilds and strong fortifications',
  researchSummary:'Ghent’s cloth industry, guild organisation and demographic scale made it a heavyweight within Flanders around 1300.',
  evidenceNote:'Ghent’s official city history gives about 64,000 inhabitants and a 644-hectare enclosure around 1300. Navy excludes merchant and river craft temporarily adapted for war.',
  sources:[['Ghent','https://en.wikipedia.org/wiki/Ghent'],['County of Flanders','https://en.wikipedia.org/wiki/County_of_Flanders']]
 },
 {
  id:'1300-ypres',name:'Ypres',modern:'Ypres',country:'County of Flanders',subrealm:'County of Flanders · major cloth city',
  lon:2.8860,lat:50.8514,rarity:2,year:1300,people:25000,populationText:'25.0 K',populationRange:'20–30 K',populationConfidence:'low',
  sizeText:'1.2 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:47,technology:82,economyScore:88,stability:30,
  historicalRole:'Internationally important Flemish cloth-manufacturing city',
  economy:'Fine woollen cloth, markets, guild crafts and long-distance trade',
  militaryRole:'Walled industrial commune with a substantial civic militia',
  researchSummary:'Ypres formed with Bruges and Ghent the famous trio of great Flemish cloth cities.',
  evidenceNote:'Population is low-confidence; economic significance of its textile industry is high confidence.',
  sources:[['Ypres','https://en.wikipedia.org/wiki/Ypres'],['County of Flanders','https://en.wikipedia.org/wiki/County_of_Flanders']]
 },
 {
  id:'1300-leuven',name:'Leuven',modern:'Leuven',country:'Duchy of Brabant',subrealm:'Duchy of Brabant · historic ducal centre',
  lon:4.7005,lat:50.8798,rarity:1,year:1300,people:15000,populationText:'15.0 K',populationRange:'12–18 K',populationConfidence:'low',
  sizeText:'1.0 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:62,technology:67,economyScore:74,stability:68,
  historicalRole:'Historic seat of the dukes of Brabant and important cloth-producing town',
  economy:'Cloth, crafts, markets, brewing and regional agriculture',
  militaryRole:'Large walled Brabantine city with ducal and civic military importance',
  researchSummary:'Leuven remained one of Brabant’s principal towns around 1300 even as Brussels increasingly shared ducal political importance.',
  evidenceNote:'Population is low-confidence; no university credit is applied because Leuven’s university was founded only in the 15th century.',
  sources:[['Leuven','https://en.wikipedia.org/wiki/Leuven'],['Duchy of Brabant','https://en.wikipedia.org/wiki/Duchy_of_Brabant']]
 },
 {
  id:'1300-brussels',name:'Brussels',modern:'Brussels',country:'Duchy of Brabant',subrealm:'Duchy of Brabant · growing ducal residence',
  lon:4.3517,lat:50.8503,rarity:1,year:1300,people:20000,populationText:'20.0 K',populationRange:'18–22 K',populationConfidence:'medium',
  sizeText:'0.9 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:61,technology:66,economyScore:76,stability:70,
  historicalRole:'Fast-growing Brabantine commercial city and increasingly important ducal residence',
  economy:'Cloth, crafts, markets, brewing and ducal services',
  militaryRole:'Fortified central Brabantine city with growing administrative significance',
  researchSummary:'By 1300 Brussels was expanding rapidly and becoming one of the principal urban centres of Brabant.',
  evidenceNote:'Population is a low-confidence range; political and commercial importance is clearer than precise demography.',
  sources:[['City of Brussels — historical timeline','https://www.brussels.be/timeline-history-brussels'],['Duchy of Brabant','https://en.wikipedia.org/wiki/Duchy_of_Brabant']]
 },
 {
  id:'1300-antwerp',name:'Antwerp',modern:'Antwerp',country:'Duchy of Brabant',subrealm:'Duchy of Brabant · Scheldt port',
  lon:4.4025,lat:51.2194,rarity:2,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.7 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:58,technology:65,economyScore:78,stability:66,
  historicalRole:'Growing Scheldt port and fortified commercial city of Brabant',
  economy:'River shipping, markets, crafts, grain storage and regional trade',
  militaryRole:'Fortified port with improving riverine and commercial strategic value',
  researchSummary:'Antwerp had not yet reached its later 16th-century peak, but around 1300 its importance was already increasing and major waterfront fortifications were being constructed.',
  evidenceNote:'Population is low-confidence; archaeology documents new city-wall and port works around 1300.',
  sources:[['Antwerp — medieval harbour archaeology','https://pers.antwerpen.be/archeologen-ontdekken-middeleeuws-stukje-haven-in-antwerpen'],['Duchy of Brabant','https://en.wikipedia.org/wiki/Duchy_of_Brabant']]
 },
 {
  id:'1300-s-hertogenbosch',name:'’s-Hertogenbosch',modern:'’s-Hertogenbosch',country:'County of Guelders',subrealm:'Duchy of Brabant · northern fortified ducal town',
  lon:5.3037,lat:51.6978,rarity:0,year:1300,people:8000,populationText:'8.0 K',populationRange:'6–10 K',populationConfidence:'low',
  sizeText:'0.6 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:67,technology:56,economyScore:61,stability:70,
  historicalRole:'Northern Brabantine market and fortress city founded by the dukes',
  economy:'Markets, crafts, livestock, agriculture and regional trade',
  militaryRole:'Strategic fortified town guarding Brabant’s northern approaches',
  researchSummary:'Founded in the late 12th century by the dukes of Brabant, ’s-Hertogenbosch developed quickly into a key northern urban centre.',
  evidenceNote:'Population is low-confidence; strategic importance derives from ducal foundation, walls and frontier position.',
  sources:[['%27s-Hertogenbosch','https://en.wikipedia.org/wiki/%27s-Hertogenbosch'],['Duchy of Brabant','https://en.wikipedia.org/wiki/Duchy_of_Brabant']]
 },
 {
  id:'1300-mons',name:'Mons',modern:'Mons',country:'County of Hainaut',subrealm:'County of Hainaut · comital centre',
  lon:3.9517,lat:50.4542,rarity:0,year:1300,people:8000,populationText:'8.0 K',populationRange:'6–10 K',populationConfidence:'low',
  sizeText:'0.55 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:65,technology:55,economyScore:59,stability:72,
  historicalRole:'One of the principal political centres of the County of Hainaut',
  economy:'Markets, crafts, agriculture and comital administration',
  militaryRole:'Fortified comital town with strong regional command value',
  researchSummary:'Mons served as one of Hainaut’s central comital and administrative towns around 1300.',
  evidenceNote:'Population is a low-confidence estimate; political importance is well established.',
  sources:[['Mons, Belgium','https://en.wikipedia.org/wiki/Mons,_Belgium'],['County of Hainaut','https://en.wikipedia.org/wiki/County_of_Hainaut']]
 },
 {
  id:'1300-valenciennes',name:'Valenciennes',modern:'Valenciennes',country:'County of Hainaut',subrealm:'County of Hainaut · major Scheldt commercial town',
  lon:3.5183,lat:50.3571,rarity:1,year:1300,people:9000,populationText:'9.0 K',populationRange:'8–10 K',populationConfidence:'low',
  sizeText:'0.7 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:58,technology:65,economyScore:71,stability:66,
  historicalRole:'Prosperous commercial and textile centre of Hainaut',
  economy:'Cloth, crafts, markets and Scheldt-basin trade',
  militaryRole:'Walled town with substantial civic manpower',
  researchSummary:'Valenciennes was one of the richest and most urbanised places in medieval Hainaut.',
  evidenceNote:'Population is low-confidence; relative economic importance is better documented.',
  sources:[['Valenciennes','https://en.wikipedia.org/wiki/Valenciennes'],['County of Hainaut','https://en.wikipedia.org/wiki/County_of_Hainaut']]
 },
 {
  id:'1300-dordrecht',name:'Dordrecht',modern:'Dordrecht',country:'County of Holland',subrealm:'County of Holland · principal river-trading city',
  lon:4.6901,lat:51.8133,rarity:2,year:1300,people:6000,populationText:'6.0 K',populationRange:'5.5–6.5 K',populationConfidence:'medium',
  sizeText:'0.16 km²',sizeConfidence:'high',army:0,armyText:'0',navy:0,navyText:'0',
  food:66,technology:65,economyScore:78,stability:76,
  historicalRole:'Leading commercial city of Holland at a major Rhine-Meuse waterway junction',
  economy:'Wine, grain, timber, shipping and river tolls',
  militaryRole:'Strategically placed river city with meaningful shipping capacity',
  researchSummary:'Dordrecht’s location on major shipping routes made it the commercial leader of Holland around 1300.',
  evidenceNote:'A reconstruction for c.1300 gives roughly 5,940 inhabitants on about 16 hectares. Navy excludes commercial river shipping that was not maintained as a standing war fleet.',
  sources:[['Dordrecht — growth of a trading city','https://cms.dordrecht.nl/Inwoners/Overzicht_Inwoners/Bouwen_en_verbouwen_voor_inwoners/Welstand/Beeldkwaliteitplan_voor_de_binnenstad.org'],['County of Holland','https://en.wikipedia.org/wiki/County_of_Holland']]
 },
 {
  id:'1300-haarlem',name:'Haarlem',modern:'Haarlem',country:'County of Holland',subrealm:'County of Holland · chartered town',
  lon:4.6462,lat:52.3874,rarity:0,year:1300,people:6000,populationText:'6.0 K',populationRange:'4–8 K',populationConfidence:'low',
  sizeText:'0.4 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:65,technology:54,economyScore:57,stability:74,
  historicalRole:'Growing chartered town controlling routes through central Holland',
  economy:'Brewing, crafts, markets and surrounding agriculture',
  militaryRole:'Walled town with regional defensive value',
  researchSummary:'Haarlem had received city rights in the 13th century and was developing into an important urban centre of Holland.',
  evidenceNote:'Population is low-confidence; urban status and regional importance are secure.',
  sources:[['Haarlem','https://en.wikipedia.org/wiki/Haarlem'],['County of Holland','https://en.wikipedia.org/wiki/County_of_Holland']]
 },
 {
  id:'1300-leiden',name:'Leiden',modern:'Leiden',country:'County of Holland',subrealm:'County of Holland · growing Rhine town',
  lon:4.4970,lat:52.1601,rarity:0,year:1300,people:1900,populationText:'1.9 K',populationRange:'1.5–2.5 K',populationConfidence:'medium',
  sizeText:'0.21 km²',sizeConfidence:'medium',army:0,armyText:'0',navy:0,navyText:'0',
  food:63,technology:55,economyScore:57,stability:74,
  historicalRole:'Growing market town on the Old Rhine',
  economy:'Crafts, cloth, regional markets and river trade',
  militaryRole:'Compact fortified settlement with local strategic value',
  researchSummary:'Leiden was still much smaller than its later Golden Age form but was already a recognised urban centre in Holland.',
  evidenceNote:'A comparative reconstruction for c.1300 gives about 1,900 inhabitants over roughly 21 hectares; both figures remain historical estimates.',
  sources:[['Leiden','https://en.wikipedia.org/wiki/Leiden'],['County of Holland','https://en.wikipedia.org/wiki/County_of_Holland']]
 },
 {
  id:'1300-delft',name:'Delft',modern:'Delft',country:'County of Holland',subrealm:'County of Holland · chartered canal town',
  lon:4.3571,lat:52.0116,rarity:0,year:1300,people:2000,populationText:'2.0 K',populationRange:'1.5–2.5 K',populationConfidence:'medium',
  sizeText:'0.35 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:67,technology:55,economyScore:56,stability:75,
  historicalRole:'Young but expanding chartered town in the core of Holland',
  economy:'Markets, crafts, canal transport and agriculture',
  militaryRole:'Small fortified urban centre on inland waterways',
  researchSummary:'Delft received city rights in 1246 and by 1300 was a growing town in Holland’s increasingly urban network.',
  evidenceNote:'Archaeological and demographic work places Delft at roughly 2,000 inhabitants around 1300. It was still a small, largely agrarian canal town.',
  sources:[['Delft','https://en.wikipedia.org/wiki/Delft'],['County of Holland','https://en.wikipedia.org/wiki/County_of_Holland']]
 },
 {
  id:'1300-nijmegen',name:'Nijmegen',modern:'Nijmegen',country:'County of Guelders',subrealm:'County of Guelders · former imperial city pledged to Guelders',
  lon:5.8528,lat:51.8426,rarity:1,year:1300,people:8000,populationText:'8.0 K',populationRange:'6–10 K',populationConfidence:'low',
  sizeText:'0.5 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:62,technology:62,economyScore:64,stability:60,
  historicalRole:'Important Waal crossing and politically prestigious city of Guelders',
  economy:'River trade, markets, crafts and tolls',
  militaryRole:'Strong elevated river fortress with an imperial past',
  researchSummary:'Nijmegen had imperial traditions but was pledged to the counts of Guelders in the late 13th century and functioned within their political sphere by 1300.',
  evidenceNote:'Population is low-confidence; strategic river-crossing and political status are high confidence.',
  sources:[['Nijmegen','https://en.wikipedia.org/wiki/Nijmegen'],['County of Guelders','https://en.wikipedia.org/wiki/Duchy_of_Guelders']]
 },
 {
  id:'1300-zutphen',name:'Zutphen',modern:'Zutphen',country:'County of Guelders',subrealm:'County of Guelders · major IJssel town',
  lon:6.2017,lat:52.1400,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:66,technology:57,economyScore:62,stability:70,
  historicalRole:'Old comital centre and important IJssel trading town',
  economy:'River trade, markets, crafts and surrounding agriculture',
  militaryRole:'Walled river town with longstanding comital importance',
  researchSummary:'Zutphen was one of the historic centres from which the Guelders polity developed.',
  evidenceNote:'Population is a low-confidence estimate.',
  sources:[['Zutphen','https://en.wikipedia.org/wiki/Zutphen'],['County of Guelders','https://en.wikipedia.org/wiki/Duchy_of_Guelders']]
 },
 {
  id:'1300-arnhem',name:'Arnhem',modern:'Arnhem',country:'County of Guelders',subrealm:'County of Guelders · chartered Rhine-area town',
  lon:5.8987,lat:51.9851,rarity:0,year:1300,people:4000,populationText:'4.0 K',populationRange:'3–5 K',populationConfidence:'low',
  sizeText:'0.3 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:66,technology:49,economyScore:54,stability:72,
  historicalRole:'Growing chartered town in central Guelders',
  economy:'Markets, crafts, agriculture and regional trade',
  militaryRole:'Small fortified town of regional value',
  researchSummary:'Arnhem had received city rights in the 13th century and was developing as one of Guelders’ urban centres.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Arnhem','https://en.wikipedia.org/wiki/Arnhem'],['County of Guelders','https://en.wikipedia.org/wiki/Duchy_of_Guelders']]
 },
 {
  id:'1300-stavoren',name:'Stavoren',modern:'Stavoren',country:'County of Holland',subrealm:'Frisian Freedom · autonomous maritime community',
  lon:5.3595,lat:52.8836,rarity:0,year:1300,people:3000,populationText:'3.0 K',populationRange:'2–4 K',populationConfidence:'low',
  sizeText:'0.2 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:58,technology:59,economyScore:72,stability:78,
  historicalRole:'Important Frisian maritime trading town within the lordless Frisian political order',
  economy:'Baltic and North Sea shipping, fisheries and trade',
  militaryRole:'Small population but disproportionate maritime capacity',
  researchSummary:'Stavoren was one of the best-known medieval Frisian ports and fits the politically decentralised Frisian Freedom around 1300.',
  evidenceNote:'Population is low-confidence. Stavoren was a major maritime trading community, but no standing dedicated war fleet is securely evidenced for 1300, so merchant shipping is not counted as Navy.',
  sources:[['Stavoren','https://en.wikipedia.org/wiki/Stavoren'],['Frisian freedom','https://en.wikipedia.org/wiki/Frisian_freedom']]
 },
 {
  id:'1300-oldenburg',name:'Oldenburg',modern:'Oldenburg',country:'County of Oldenburg',subrealm:'County of Oldenburg · comital seat',
  lon:8.2146,lat:53.1435,rarity:0,year:1300,people:2500,populationText:'2.5 K',populationRange:'2–3.5 K',populationConfidence:'low',
  sizeText:'0.2 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:66,technology:48,economyScore:50,stability:70,
  historicalRole:'Small comital centre of the House of Oldenburg',
  economy:'Agriculture, livestock, markets and comital administration',
  militaryRole:'Castle-town serving a small north German county',
  researchSummary:'Oldenburg was a modest town but politically important as the seat of its own county.',
  evidenceNote:'Population is a low-confidence gameplay estimate.',
  sources:[['Oldenburg (city)','https://en.wikipedia.org/wiki/Oldenburg_(city)'],['County of Oldenburg','https://en.wikipedia.org/wiki/County_of_Oldenburg']]
 },
 {
  id:'1300-kleve',name:'Kleve',modern:'Kleve',country:'County of Cleves',subrealm:'County of Cleves · comital seat',
  lon:6.1381,lat:51.7893,rarity:0,year:1300,people:3000,populationText:'3.0 K',populationRange:'2–4 K',populationConfidence:'low',
  sizeText:'0.22 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:68,technology:52,economyScore:52,stability:68,
  historicalRole:'Capital town of the County of Cleves near the lower Rhine',
  economy:'Markets, agriculture, tolls and comital administration',
  militaryRole:'Castle-centred town controlling lower-Rhine routes',
  researchSummary:'Kleve was a small but strategically placed comital capital.',
  evidenceNote:'Population is a low-confidence estimate.',
  sources:[['Kleve','https://en.wikipedia.org/wiki/Kleve'],['Duchy of Cleves','https://en.wikipedia.org/wiki/Duchy_of_Cleves']]
 },
 {
  id:'1300-julich',name:'Jülich',modern:'Jülich',country:'County of Julich',subrealm:'County of Jülich · comital centre',
  lon:6.3648,lat:50.9221,rarity:0,year:1300,people:2500,populationText:'2.5 K',populationRange:'2–3.5 K',populationConfidence:'low',
  sizeText:'0.2 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:67,technology:50,economyScore:49,stability:68,
  historicalRole:'Administrative and fortified centre of the County of Jülich',
  economy:'Agriculture, markets and comital administration',
  militaryRole:'Small fortified county centre between Meuse and Rhine',
  researchSummary:'Jülich’s political importance as a county centre exceeded its urban population.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Jülich','https://en.wikipedia.org/wiki/J%C3%BClich'],['Duchy of Jülich','https://en.wikipedia.org/wiki/Duchy_of_J%C3%BClich']]
 },
 {
  id:'1300-dusseldorf',name:'Düsseldorf',modern:'Düsseldorf',country:'County of Berg',subrealm:'County of Berg · newly chartered town',
  lon:6.7735,lat:51.2277,rarity:0,year:1300,people:2000,populationText:'2.0 K',populationRange:'1.5–3 K',populationConfidence:'low',
  sizeText:'0.18 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:64,technology:50,economyScore:54,stability:70,
  historicalRole:'New Rhine town of the counts of Berg after receiving city rights in 1288',
  economy:'Markets, Rhine traffic, crafts and agriculture',
  militaryRole:'Small but strategically situated fortified Rhine settlement',
  researchSummary:'Düsseldorf was still a small town around 1300, having received city rights only after the Battle of Worringen in 1288.',
  evidenceNote:'Population is deliberately modest and low-confidence.',
  sources:[['Düsseldorf','https://en.wikipedia.org/wiki/D%C3%BCsseldorf'],['Duchy of Berg','https://en.wikipedia.org/wiki/Duchy_of_Berg']]
 },
 {
  id:'1300-hamm',name:'Hamm',modern:'Hamm',country:'County of Mark',subrealm:'County of Mark · planned comital town',
  lon:7.8178,lat:51.6739,rarity:0,year:1300,people:2500,populationText:'2.5 K',populationRange:'2–3.5 K',populationConfidence:'low',
  sizeText:'0.2 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:68,technology:50,economyScore:50,stability:71,
  historicalRole:'Purpose-built urban centre of the counts of Mark',
  economy:'Markets, crafts, agriculture and comital administration',
  militaryRole:'Planned fortified town supporting the counts of Mark',
  researchSummary:'Hamm was founded in 1226 and grew as an administrative and commercial centre of the County of Mark.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Hamm','https://en.wikipedia.org/wiki/Hamm'],['County of Mark','https://en.wikipedia.org/wiki/County_of_Mark']]
 },
 {
  id:'1300-luxembourg',name:'Luxembourg',modern:'Luxembourg',country:'County of Luxembourg',subrealm:'County of Luxembourg · fortified comital capital',
  lon:6.1319,lat:49.6116,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:60,technology:62,economyScore:59,stability:66,
  historicalRole:'Fortress-capital of the rising House of Luxembourg',
  economy:'Markets, crafts, regional trade and comital administration',
  militaryRole:'Exceptionally strong rocky fortress position',
  researchSummary:'Luxembourg’s strategic fortress anchored a county whose dynasty was becoming increasingly influential in imperial politics.',
  evidenceNote:'Population is low-confidence; military value reflects terrain and fortification more than demographic scale.',
  sources:[['Luxembourg City','https://en.wikipedia.org/wiki/Luxembourg_City'],['County of Luxembourg','https://en.wikipedia.org/wiki/County_of_Luxembourg']]
 },
 {
  id:'1300-idstein',name:'Idstein',modern:'Idstein',country:'Archbishopric of Mainz',subrealm:'Walramian Nassau · Idstein lordship',
  lon:8.2689,lat:50.2216,rarity:0,year:1300,people:1500,populationText:'1.5 K',populationRange:'1–2.5 K',populationConfidence:'low',
  sizeText:'0.12 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:64,technology:45,economyScore:45,stability:70,
  historicalRole:'Small fortified residence in the divided Nassau lands',
  economy:'Agriculture, local markets and lordly administration',
  militaryRole:'Castle settlement controlling local routes in the Taunus',
  researchSummary:'Idstein represented the Walramian branch of the fragmented Nassau possessions around 1300.',
  evidenceNote:'Population is a deliberately conservative low-confidence estimate.',
  sources:[['Idstein','https://en.wikipedia.org/wiki/Idstein'],['County of Nassau','https://en.wikipedia.org/wiki/County_of_Nassau']]
 },
 {
  id:'1300-siegen',name:'Siegen',modern:'Siegen',country:'County of Nassau',subrealm:'Ottonian Nassau · Siegen centre',
  lon:8.0243,lat:50.8748,rarity:0,year:1300,people:3000,populationText:'3.0 K',populationRange:'2–4 K',populationConfidence:'low',
  sizeText:'0.22 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:58,technology:72,economyScore:65,stability:67,
  historicalRole:'Mining and administrative centre of the northern Nassau lands',
  economy:'Iron mining, metalworking, markets and agriculture',
  militaryRole:'Fortified regional centre in hilly terrain',
  researchSummary:'Siegen’s mineral resources gave the small Nassau town economic importance disproportionate to its population.',
  evidenceNote:'Population is low-confidence; mining justifies its relatively high Technology score.',
  sources:[['Siegen','https://en.wikipedia.org/wiki/Siegen'],['County of Nassau','https://en.wikipedia.org/wiki/County_of_Nassau']]
 },
 {
  id:'1300-nancy',name:'Nancy',modern:'Nancy',country:'County of Champagne',subrealm:'Duchy of Lorraine · ducal capital',
  lon:6.1844,lat:48.6921,rarity:0,year:1300,people:6000,populationText:'6.0 K',populationRange:'5–8 K',populationConfidence:'low',
  sizeText:'0.45 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:68,technology:60,economyScore:60,stability:67,
  historicalRole:'Principal residence and political centre of the dukes of Lorraine',
  economy:'Ducal administration, markets, crafts and agriculture',
  militaryRole:'Fortified ducal city between French and imperial spheres',
  researchSummary:'Nancy was developing into the political centre of the Duchy of Lorraine by the late 13th and early 14th centuries.',
  evidenceNote:'Population is low-confidence; ducal significance is high confidence.',
  sources:[['Nancy, France','https://en.wikipedia.org/wiki/Nancy,_France'],['Duchy of Lorraine','https://en.wikipedia.org/wiki/Duchy_of_Lorraine']]
 },
 {
  id:'1300-epinal',name:'Épinal',modern:'Épinal',country:'Prince-Bishopric of Strasbourg',subrealm:'Duchy of Lorraine · fortified Moselle town',
  lon:6.4494,lat:48.1740,rarity:0,year:1300,people:4000,populationText:'4.0 K',populationRange:'3–5 K',populationConfidence:'low',
  sizeText:'0.3 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:66,technology:52,economyScore:50,stability:70,
  historicalRole:'Fortified regional town on the upper Moselle',
  economy:'Markets, crafts, agriculture and church-related activity',
  militaryRole:'Castle-town controlling local routes through Lorraine',
  researchSummary:'Épinal was a useful fortified regional centre within Lorraine, though far smaller than the major Rhine cities.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Épinal','https://en.wikipedia.org/wiki/%C3%89pinal'],['Duchy of Lorraine','https://en.wikipedia.org/wiki/Duchy_of_Lorraine']]
 },
 {
  id:'1300-trier',name:'Trier',modern:'Trier',country:'Archbishopric of Trier',subrealm:'Electoral Archbishopric of Trier · archiepiscopal capital',
  lon:6.6412,lat:49.7490,rarity:1,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–15 K',populationConfidence:'low',
  sizeText:'0.8 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:61,technology:80,economyScore:76,stability:65,
  historicalRole:'Capital of one of the Empire’s leading ecclesiastical principalities and an electoral see',
  economy:'Church wealth, Moselle trade, wine, crafts and pilgrimage',
  militaryRole:'Ancient walled city controlling an important Moselle corridor',
  researchSummary:'Trier’s archbishop was one of the great imperial princes and electors, giving the city exceptional political importance.',
  evidenceNote:'Population is low-confidence; ecclesiastical-electoral status is high confidence.',
  sources:[['Trier','https://en.wikipedia.org/wiki/Trier'],['Electorate of Trier','https://en.wikipedia.org/wiki/Electorate_of_Trier']]
 },
 {
  id:'1300-mainz',name:'Mainz',modern:'Mainz',country:'Archbishopric of Mainz',subrealm:'Electoral Archbishopric of Mainz · free-city privileges under the archchancellor',
  lon:8.2473,lat:49.9929,rarity:2,year:1300,people:20000,populationText:'20.0 K',populationRange:'15–25 K',populationConfidence:'low',
  sizeText:'1.0 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:60,technology:90,economyScore:86,stability:60,
  historicalRole:'Seat of the Empire’s archchancellor and one of the richest cities of the Rhineland',
  economy:'Rhine trade, wine, crafts, church institutions and imperial politics',
  militaryRole:'Large fortified Rhine city with substantial civic autonomy',
  researchSummary:'Mainz combined the political authority of its archbishop-elector with broad urban freedoms. The archbishop was the Empire’s archchancellor and leading elector.',
  evidenceNote:'Population is low-confidence. The city’s free-city period and the archbishop’s exceptional imperial status are well documented.',
  sources:[['Mainz — official historical timeline','https://www.mainz.de/en/angebote-entdecken/kultur/stadtgeschichte/zeittafel'],['Mainz — medieval importance','https://www.mainz.de/en/microsite/gutenberg/zeit/gutenberg_mainz']]
 },
 {
  id:'1300-bonn',name:'Bonn',modern:'Bonn',country:'Archbishopric of Cologne',subrealm:'Archbishopric/Electorate of Cologne · principal archiepiscopal residence after 1288',
  lon:7.0982,lat:50.7374,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:67,technology:60,economyScore:61,stability:68,
  historicalRole:'Important residence and territorial centre of the archbishops of Cologne after their loss of political control inside Cologne',
  economy:'Archiepiscopal administration, Rhine trade, markets and agriculture',
  militaryRole:'Fortified Rhine town serving the territorial archbishopric',
  researchSummary:'After the Battle of Worringen in 1288 the archbishops could no longer dominate Cologne itself; Bonn became increasingly important within their territorial state.',
  evidenceNote:'Population is low-confidence; post-1288 political role is well established.',
  sources:[['Bonn','https://en.wikipedia.org/wiki/Bonn'],['Electorate of Cologne','https://en.wikipedia.org/wiki/Electorate_of_Cologne']]
 },
 {
  id:'1300-cologne',name:'Cologne',modern:'Cologne',country:'Archbishopric of Cologne',subrealm:'De facto autonomous city after the Battle of Worringen (1288)',
  lon:6.9603,lat:50.9375,rarity:3,year:1300,people:45000,populationText:'45.0 K',populationRange:'40–50 K',populationConfidence:'medium',
  sizeText:'4.0 km²',sizeConfidence:'medium',army:100,armyText:'100',navy:0,navyText:'0',
  food:55,technology:90,economyScore:94,stability:78,
  historicalRole:'One of the largest cities of the Empire, a major Rhine trading centre and effectively self-governing commune',
  economy:'Rhine trade, crafts, finance, wine, markets and international commerce',
  militaryRole:'Huge fortified city with powerful civic institutions and militia',
  researchSummary:'After defeating the archbishop at Worringen in 1288, Cologne was effectively independent in municipal affairs, although formal free-imperial status came later.',
  evidenceNote:'Population is a medium-confidence range; the distinction between de facto autonomy and later formal Free Imperial City status is intentional.',
  sources:[['Cologne — history','https://en.wikipedia.org/wiki/History_of_Cologne'],['Battle of Worringen','https://en.wikipedia.org/wiki/Battle_of_Worringen']]
 },
 {
  id:'1300-heidelberg',name:'Heidelberg',modern:'Heidelberg',country:'County Palatine of the Rhine',subrealm:'Electoral Palatinate · principal residence of the counts palatine',
  lon:8.6724,lat:49.3988,rarity:0,year:1300,people:6000,populationText:'6.0 K',populationRange:'5–8 K',populationConfidence:'low',
  sizeText:'0.4 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:65,technology:60,economyScore:63,stability:70,
  historicalRole:'Growing residence and administrative centre of the Rhine Palatinate',
  economy:'Court services, markets, wine, crafts and Neckar trade',
  militaryRole:'Castle-dominated town commanding the Neckar valley',
  researchSummary:'Heidelberg was already a principal seat of the counts palatine before the later university made it famous.',
  evidenceNote:'Population is low-confidence; no university Technology bonus is applied because Heidelberg University dates from 1386.',
  sources:[['Heidelberg','https://en.wikipedia.org/wiki/Heidelberg'],['Electoral Palatinate','https://en.wikipedia.org/wiki/Electoral_Palatinate']]
 },
 {
  id:'1300-pforzheim',name:'Pforzheim',modern:'Pforzheim',country:'County of Wurttemberg',subrealm:'Margraviate of Baden · important northern market town',
  lon:8.4037,lat:48.8922,rarity:0,year:1300,people:4000,populationText:'4.0 K',populationRange:'3–5 K',populationConfidence:'low',
  sizeText:'0.3 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:65,technology:58,economyScore:57,stability:71,
  historicalRole:'Important Baden market and administrative centre at the northern edge of the margraviate',
  economy:'Markets, crafts, agriculture and regional trade',
  militaryRole:'Fortified town controlling routes between Rhine and Württemberg lands',
  researchSummary:'Pforzheim was one of the more important urban centres held by the margraves of Baden around 1300.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Pforzheim','https://en.wikipedia.org/wiki/Pforzheim'],['Margraviate of Baden','https://en.wikipedia.org/wiki/Margraviate_of_Baden']]
 },
 {
  id:'1300-baden-baden',name:'Baden',modern:'Baden-Baden',country:'Margraviate of Baden',subrealm:'Margraviate of Baden · dynastic seat around Hohenbaden',
  lon:8.2398,lat:48.7606,mapLon:8.2398,mapLat:48.45,rarity:0,year:1300,people:3000,populationText:'3.0 K',populationRange:'2–4 K',populationConfidence:'low',
  sizeText:'0.22 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:64,technology:55,economyScore:53,stability:71,
  historicalRole:'Dynastic centre that gave the Margraviate of Baden its name',
  economy:'Court services, baths, markets, agriculture and crafts',
  militaryRole:'Castle-town centred on the margraves’ stronghold',
  researchSummary:'Baden was modest in population but politically central as the namesake seat of the margravial dynasty.',
  evidenceNote:'Population is low-confidence. The real city lies slightly north of the simplified Baden polygon, so only its map marker is shifted south while the real coordinates are preserved.',
  sources:[['Baden-Baden official tourism — medieval city history','https://www.baden-baden.com/en/the-city'],['Margraviate of Baden','https://en.wikipedia.org/wiki/Margraviate_of_Baden']]
 },
 {
  id:'1300-stuttgart',name:'Stuttgart',modern:'Stuttgart',country:'County of Wurttemberg',subrealm:'County of Württemberg · comital residence',
  lon:9.1829,lat:48.7758,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:68,technology:60,economyScore:61,stability:71,
  historicalRole:'Growing residence of the counts of Württemberg',
  economy:'Court services, wine, markets, crafts and agriculture',
  militaryRole:'Fortified comital centre in the Neckar basin',
  researchSummary:'Stuttgart was emerging as the political centre of Württemberg around 1300, long before its later role as a major capital.',
  evidenceNote:'Population is low-confidence; comital-residence role is well established.',
  sources:[['Stuttgart','https://en.wikipedia.org/wiki/Stuttgart'],['County of Württemberg','https://en.wikipedia.org/wiki/County_of_W%C3%BCrttemberg']]
 },
 {
  id:'1300-tubingen',name:'Tübingen',modern:'Tübingen',country:'County of Wurttemberg',subrealm:'County of Württemberg · recently acquired former palatine town',
  lon:9.0576,lat:48.5216,rarity:0,year:1300,people:4000,populationText:'4.0 K',populationRange:'3–5 K',populationConfidence:'low',
  sizeText:'0.3 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:66,technology:58,economyScore:57,stability:65,
  historicalRole:'Fortified Neckar town with strong castle and regional market functions',
  economy:'Markets, wine, crafts and agriculture',
  militaryRole:'Castle-centred town commanding a Neckar crossing',
  researchSummary:'Tübingen was a strategically useful urban centre in the Württemberg sphere around the turn of the 14th century.',
  evidenceNote:'Population is low-confidence; no university bonus is applied because Tübingen University was founded only in 1477.',
  sources:[['Tübingen','https://en.wikipedia.org/wiki/T%C3%BCbingen'],['County of Württemberg','https://en.wikipedia.org/wiki/County_of_W%C3%BCrttemberg']]
 },
 {
  id:'1300-marburg',name:'Marburg',modern:'Marburg',country:'Landgraviate of Hesse',subrealm:'Landgraviate of Hesse · dynastic centre of Henry I',
  lon:8.7709,lat:50.8075,rarity:1,year:1300,people:8000,populationText:'8.0 K',populationRange:'6–10 K',populationConfidence:'low',
  sizeText:'0.55 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:60,technology:72,economyScore:64,stability:70,
  historicalRole:'Core dynastic and ecclesiastical centre of the newly established Landgraviate of Hesse',
  economy:'Court services, markets, crafts, pilgrimage and agriculture',
  militaryRole:'Castle town on strong terrain overlooking the Lahn',
  researchSummary:'Marburg formed part of the core territory from which the Landgraviate of Hesse emerged after 1264 and remained one of Henry I’s most important centres.',
  evidenceNote:'Population and size are low-confidence estimates. Political importance is high confidence.',
  sources:[['Marburg','https://en.wikipedia.org/wiki/Marburg'],['Landgraviate of Hesse','https://en.wikipedia.org/wiki/Landgraviate_of_Hesse']]
 },
 {
  id:'1300-kassel',name:'Kassel',modern:'Kassel',country:'Landgraviate of Hesse',subrealm:'Landgraviate of Hesse · residence used by Henry I from 1277',
  lon:9.4797,lat:51.3127,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:68,technology:60,economyScore:57,stability:72,
  historicalRole:'Growing Hessian residence and market town on the Fulda',
  economy:'Markets, court services, crafts and agriculture',
  militaryRole:'Fortified residence controlling routes through northern Hesse',
  researchSummary:'Kassel became an important Hessian residence under Henry I and by 1300 was one of the landgraviate’s principal towns.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Kassel','https://en.wikipedia.org/wiki/Kassel'],['Landgraviate of Hesse','https://en.wikipedia.org/wiki/Landgraviate_of_Hesse']]
 },
 {
  id:'1300-eisenach',name:'Eisenach',modern:'Eisenach',country:'Landgraviate of Thuringia',subrealm:'Landgraviate of Thuringia · Wartburg centre',
  lon:10.3150,lat:50.9804,rarity:0,year:1300,people:7000,populationText:'7.0 K',populationRange:'5–9 K',populationConfidence:'low',
  sizeText:'0.5 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:63,technology:68,economyScore:61,stability:66,
  historicalRole:'Major Thuringian castle-town below the Wartburg',
  economy:'Markets, crafts, court activity and regional agriculture',
  militaryRole:'Strong castle-backed urban centre controlling west-Thuringian routes',
  researchSummary:'Eisenach’s association with the Wartburg made it one of the politically and militarily significant towns of Thuringia.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Eisenach','https://en.wikipedia.org/wiki/Eisenach'],['Landgraviate of Thuringia','https://en.wikipedia.org/wiki/Landgraviate_of_Thuringia']]
 },
 {
  id:'1300-gotha',name:'Gotha',modern:'Gotha',country:'Landgraviate of Thuringia',subrealm:'Landgraviate of Thuringia · market and administrative town',
  lon:10.7042,lat:50.9482,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–6 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:69,technology:56,economyScore:52,stability:71,
  historicalRole:'Established market town in central Thuringia',
  economy:'Markets, crafts and surrounding agriculture',
  militaryRole:'Fortified regional centre',
  researchSummary:'Gotha was an established urban centre within the Thuringian lands, useful for trade and administration.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Gotha','https://en.wikipedia.org/wiki/Gotha_(town)'],['Landgraviate of Thuringia','https://en.wikipedia.org/wiki/Landgraviate_of_Thuringia']]
 },
 {
  id:'1300-meissen',name:'Meissen',modern:'Meissen',country:'Margraviate of Meissen',subrealm:'Margraviate of Meissen · margravial and episcopal centre',
  lon:13.4730,lat:51.1634,rarity:0,year:1300,people:2000,populationText:'2.0 K',populationRange:'1.5–2.5 K',populationConfidence:'medium',
  sizeText:'0.4 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:61,technology:72,economyScore:63,stability:68,
  historicalRole:'Namesake political centre of the Margraviate of Meissen and episcopal seat',
  economy:'Court, church institutions, wine, crafts and Elbe trade',
  militaryRole:'Strong hilltop castle-cathedral complex above the Elbe',
  researchSummary:'Meissen remained symbolically central to the Wettin margraviate, even as Leipzig grew commercially.',
  evidenceNote:'A comparative reconstruction of Saxon towns around 1300 places Meissen at roughly 2,000 inhabitants; the exact total remains an estimate.',
  sources:[['Meissen','https://en.wikipedia.org/wiki/Meissen'],['Margraviate of Meissen','https://en.wikipedia.org/wiki/Margraviate_of_Meissen']]
 },
 {
  id:'1300-leipzig',name:'Leipzig',modern:'Leipzig',country:'Margraviate of Meissen',subrealm:'Margraviate of Meissen · major fair and trading town',
  lon:12.3731,lat:51.3397,rarity:1,year:1300,people:3000,populationText:'3.0 K',populationRange:'2.5–3.5 K',populationConfidence:'medium',
  sizeText:'0.55 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:64,technology:72,economyScore:74,stability:72,
  historicalRole:'Fast-growing commercial town at the crossroads of major central European routes',
  economy:'Fairs, long-distance trade, crafts and regional agriculture',
  militaryRole:'Walled merchant town with growing civic resources',
  researchSummary:'Leipzig’s location on major trade routes had already made it one of the most commercially important towns in the Meissen lands.',
  evidenceNote:'A comparative reconstruction of Saxon towns around 1300 places Leipzig at roughly 3,000 inhabitants; later medieval growth should not be projected backward to 1300.',
  sources:[['Leipzig','https://en.wikipedia.org/wiki/Leipzig'],['Margraviate of Meissen','https://en.wikipedia.org/wiki/Margraviate_of_Meissen']]
 },
 {
  id:'1300-dresden',name:'Dresden',modern:'Dresden',country:'Margraviate of Meissen',subrealm:'Margraviate of Meissen · Elbe residence town',
  lon:13.7373,lat:51.0504,rarity:0,year:1300,people:2500,populationText:'2.5 K',populationRange:'2–3 K',populationConfidence:'medium',
  sizeText:'0.35 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:66,technology:59,economyScore:57,stability:71,
  historicalRole:'Elbe crossing and developing Wettin residence town',
  economy:'River trade, markets, crafts and agriculture',
  militaryRole:'Fortified bridge-town controlling an Elbe crossing',
  researchSummary:'Dresden was still smaller than Leipzig around 1300 but already strategically useful as an Elbe crossing and residence.',
  evidenceNote:'A comparative reconstruction of Saxon towns around 1300 places Dresden at roughly 2,500 inhabitants.',
  sources:[['Dresden','https://en.wikipedia.org/wiki/Dresden'],['Margraviate of_Meissen','https://en.wikipedia.org/wiki/Margraviate_of_Meissen']]
 },
 {
  id:'1300-brandenburg',name:'Brandenburg an der Havel',modern:'Brandenburg an der Havel',country:'Margraviate of Brandenburg',subrealm:'Margraviate of Brandenburg · historic namesake centre',
  lon:12.5498,lat:52.4125,rarity:0,year:1300,people:7000,populationText:'7.0 K',populationRange:'5–9 K',populationConfidence:'low',
  sizeText:'0.5 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:60,technology:61,economyScore:59,stability:66,
  historicalRole:'Historic political and ecclesiastical centre of the Mark Brandenburg',
  economy:'Markets, river trade, crafts and agriculture',
  militaryRole:'Fortified Havel city with strong symbolic and strategic value',
  researchSummary:'Brandenburg an der Havel remained the namesake city of the margraviate and a key centre even as other towns expanded.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Brandenburg an der Havel','https://en.wikipedia.org/wiki/Brandenburg_an_der_Havel'],['Margraviate of Brandenburg','https://en.wikipedia.org/wiki/Margraviate_of_Brandenburg']]
 },
 {
  id:'1300-berlin-colln',name:'Berlin-Cölln',modern:'Berlin',country:'Margraviate of Brandenburg',subrealm:'Margraviate of Brandenburg · twin merchant towns, still administratively separate in 1300',
  lon:13.4050,lat:52.5200,rarity:0,year:1300,people:4000,populationText:'4.0 K',populationRange:'3.5–4.5 K',populationConfidence:'medium',
  sizeText:'0.45 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:60,technology:62,economyScore:62,stability:71,
  historicalRole:'Growing twin merchant settlements on opposite banks of the Spree',
  economy:'Regional trade, crafts, markets and river transport',
  militaryRole:'Two fortified towns controlling a Spree crossing',
  researchSummary:'Berlin and Cölln already formed a closely linked commercial pair around 1300, although their formal union for joint external action dates from 1307.',
  evidenceNote:'Berlin and Cölln were still separate twin towns in 1300; reconstructed estimates place their combined population at roughly 4,000 rather than later-medieval levels.',
  sources:[['Berlin.de — medieval trading centre','https://www.berlin.de/en/history/8476760-8619314-the-medieval-trading-center.en.html'],['Margraviate of Brandenburg','https://en.wikipedia.org/wiki/Margraviate_of_Brandenburg']]
 },
 {
  id:'1300-frankfurt-oder',name:'Frankfurt an der Oder',modern:'Frankfurt (Oder)',country:'Margraviate of Brandenburg',subrealm:'Margraviate of Brandenburg · Oder trading town',
  lon:14.5506,lat:52.3471,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:64,technology:61,economyScore:64,stability:70,
  historicalRole:'Important Oder crossing and eastern trading town of Brandenburg',
  economy:'River trade, markets, crafts and regional exchange',
  militaryRole:'Fortified Oder crossing near the eastern frontier',
  researchSummary:'Frankfurt had city rights from the 13th century and was strategically placed on Brandenburg’s eastern trade routes.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Frankfurt (Oder)','https://en.wikipedia.org/wiki/Frankfurt_(Oder)'],['Margraviate of Brandenburg','https://en.wikipedia.org/wiki/Margraviate_of_Brandenburg']]
 },
 {
  id:'1300-wittenberg',name:'Wittenberg',modern:'Wittenberg',country:'Duchy of Saxony-Wittenberg',subrealm:'Duchy of Saxony-Wittenberg · Ascanian ducal seat after the 1296 partition',
  lon:12.6489,lat:51.8667,rarity:0,year:1300,people:4000,populationText:'4.0 K',populationRange:'3–5 K',populationConfidence:'low',
  sizeText:'0.3 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:60,technology:58,economyScore:54,stability:67,
  historicalRole:'New ducal centre of the Saxony-Wittenberg branch of the Ascanians',
  economy:'Court services, markets, crafts and agriculture',
  militaryRole:'Fortified Elbe town with dynastic importance',
  researchSummary:'Following the final 1296 division of the Ascanian Saxon lands, Wittenberg became the seat of Saxony-Wittenberg.',
  evidenceNote:'Population is low-confidence; the 1296 political split is high confidence.',
  sources:[['Wittenberg','https://en.wikipedia.org/wiki/Wittenberg'],['Duchy of Saxe-Wittenberg','https://en.wikipedia.org/wiki/Duchy_of_Saxe-Wittenberg']]
 },
 {
  id:'1300-lauenburg',name:'Lauenburg',modern:'Lauenburg/Elbe',country:'Duchy of Saxe-Lauenburg',subrealm:'Duchy of Saxe-Lauenburg · Ascanian ducal centre after the 1296 partition',
  lon:10.5560,lat:53.3714,rarity:0,year:1300,people:2500,populationText:'2.5 K',populationRange:'2–3.5 K',populationConfidence:'low',
  sizeText:'0.2 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:58,technology:50,economyScore:50,stability:68,
  historicalRole:'Small Elbe castle-town of the Saxe-Lauenburg Ascanian line',
  economy:'River traffic, markets, agriculture and ducal administration',
  militaryRole:'Castle settlement controlling a strategic Elbe crossing zone',
  researchSummary:'Lauenburg represented the northern Ascanian Saxon line after the division of 1296.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Lauenburg','https://en.wikipedia.org/wiki/Lauenburg'],['Saxe-Lauenburg','https://en.wikipedia.org/wiki/Saxe-Lauenburg']]
 },
 {
  id:'1300-brunswick',name:'Brunswick',modern:'Braunschweig',country:'Duchy of Brunswick-Lüneburg',subrealm:'Brunswick principality · major Welf city with extensive civic autonomy',
  lon:10.5268,lat:52.2689,rarity:1,year:1300,people:15000,populationText:'15.0 K',populationRange:'12–18 K',populationConfidence:'low',
  sizeText:'0.9 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:65,technology:73,economyScore:74,stability:66,
  historicalRole:'One of the principal cities of the Welf lands and a major north German commercial centre',
  economy:'Crafts, cloth, markets, long-distance trade and regional administration',
  militaryRole:'Large fortified city with significant civic autonomy and militia',
  researchSummary:'The Welf duchy had been partitioned in 1269; Brunswick remained one of its dominant urban centres and enjoyed considerable autonomy.',
  evidenceNote:'Population is low-confidence; the Welf partition and Brunswick’s autonomous status are well documented.',
  sources:[['Duchy of Brunswick-Lüneburg','https://en.wikipedia.org/wiki/Duchy_of_Brunswick-L%C3%BCneburg'],['Brunswick, Germany','https://en.wikipedia.org/wiki/Braunschweig']]
 },
 {
  id:'1300-luneburg',name:'Lüneburg',modern:'Lüneburg',country:'Duchy of Saxe-Lauenburg',subrealm:'Principality of Lüneburg · salt-rich capital',
  lon:10.4079,lat:53.2464,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:58,technology:83,economyScore:88,stability:72,
  historicalRole:'Capital of the Principality of Lüneburg and a wealthy salt-production centre',
  economy:'Salt mining, trade, crafts and long-distance commerce',
  militaryRole:'Fortified merchant city with strong economic resources',
  researchSummary:'Lüneburg became the capital of its own Welf principality after the 1269 partition and its saltworks made it exceptionally wealthy.',
  evidenceNote:'Population is low-confidence; salt wealth and political role are high confidence.',
  sources:[['Principality of Lüneburg','https://en.wikipedia.org/wiki/Principality_of_L%C3%BCneburg'],['Lüneburg','https://en.wikipedia.org/wiki/L%C3%BCneburg']]
 },
 {
  id:'1300-zerbst',name:'Zerbst',modern:'Zerbst',country:'Principality of Anhalt',subrealm:'Principality of Anhalt-Zerbst',
  lon:12.0850,lat:51.9660,rarity:0,year:1300,people:3500,populationText:'3.5 K',populationRange:'3–5 K',populationConfidence:'low',
  sizeText:'0.25 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:66,technology:52,economyScore:50,stability:70,
  historicalRole:'Residence and urban centre of the Anhalt-Zerbst branch',
  economy:'Markets, crafts, agriculture and princely administration',
  militaryRole:'Small fortified princely town',
  researchSummary:'The Anhalt lands had been divided among Ascanian branches; Zerbst was the centre of the Zerbst line.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Principality of Anhalt-Zerbst','https://en.wikipedia.org/wiki/Principality_of_Anhalt-Zerbst'],['Zerbst','https://en.wikipedia.org/wiki/Zerbst']]
 },
 {
  id:'1300-bernburg',name:'Bernburg',modern:'Bernburg',country:'Principality of Anhalt',subrealm:'Principality of Anhalt-Bernburg',
  lon:11.7400,lat:51.7940,rarity:0,year:1300,people:3000,populationText:'3.0 K',populationRange:'2–4 K',populationConfidence:'low',
  sizeText:'0.22 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:65,technology:50,economyScore:48,stability:70,
  historicalRole:'Residence town of the Anhalt-Bernburg branch',
  economy:'Agriculture, markets, crafts and princely administration',
  militaryRole:'Castle-town above the Saale',
  researchSummary:'Bernburg represented one of the separate Anhalt principalities created by dynastic partition.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Principality of Anhalt-Bernburg','https://en.wikipedia.org/wiki/Principality_of_Anhalt-Bernburg'],['Bernburg','https://en.wikipedia.org/wiki/Bernburg']]
 },
 {
  id:'1300-aschersleben',name:'Aschersleben',modern:'Aschersleben',country:'Principality of Anhalt',subrealm:'Principality of Anhalt-Aschersleben',
  lon:11.4600,lat:51.7560,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–6 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:68,technology:55,economyScore:52,stability:70,
  historicalRole:'Capital of the short-lived Anhalt-Aschersleben principality',
  economy:'Markets, crafts, agriculture and regional trade',
  militaryRole:'Fortified princely town',
  researchSummary:'Anhalt-Aschersleben existed as a distinct principality from 1252 until 1315, making it a particularly exact fit for the 1300 snapshot.',
  evidenceNote:'Population is low-confidence; political status is high confidence.',
  sources:[['Principality of Anhalt-Aschersleben','https://en.wikipedia.org/wiki/Principality_of_Anhalt-Aschersleben'],['Aschersleben','https://en.wikipedia.org/wiki/Aschersleben']]
 },
 {
  id:'1300-kiel',name:'Kiel',modern:'Kiel',country:'County of Holstein',subrealm:'County of Holstein · Baltic port town',
  lon:10.1228,lat:54.3233,mapLon:10.1000,mapLat:54.3000,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–6 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:60,technology:56,economyScore:60,stability:72,
  historicalRole:'Baltic port and chartered town of the counts of Holstein',
  economy:'Maritime trade, fisheries, crafts and regional markets',
  militaryRole:'Small but useful Baltic harbour',
  researchSummary:'Kiel had urban privileges and a strategically valuable Baltic harbour by the 13th century.',
  evidenceNote:'Population is low-confidence. Navy is zero under the Cardwars standing-fleet definition: ordinary merchant shipping or vessels armed only for a campaign are not counted.',
  sources:[['Kiel','https://en.wikipedia.org/wiki/Kiel'],['Holstein','https://en.wikipedia.org/wiki/Holstein']]
 },
 {
  id:'1300-wismar',name:'Wismar',modern:'Wismar',country:'Lordship of Mecklenburg',subrealm:'Lordship of Mecklenburg · Baltic Hanseatic port',
  lon:11.4660,lat:53.8920,rarity:1,year:1300,people:8000,populationText:'8.0 K',populationRange:'6–10 K',populationConfidence:'low',
  sizeText:'0.55 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:57,technology:72,economyScore:77,stability:75,
  historicalRole:'Important Baltic merchant port in the Mecklenburg lands',
  economy:'Hanseatic shipping, fish, grain, beer and merchant trade',
  militaryRole:'Walled port with significant merchant-maritime capacity',
  researchSummary:'Wismar had become an important Baltic trading city by the late 13th century and belonged to the Mecklenburg lordship, which was not raised to a duchy until the 14th century.',
  evidenceNote:'Population is low-confidence. Wismar had important Baltic merchant shipping, but no dedicated permanent war fleet is counted here.',
  sources:[['Wismar','https://en.wikipedia.org/wiki/Wismar'],['Mecklenburg','https://en.wikipedia.org/wiki/Mecklenburg']]
 },
 {
  id:'1300-gustrow',name:'Güstrow',modern:'Güstrow',country:'Lordship of Werle',subrealm:'Lordship of Werle · former Werle-Güstrow centre, reunited under Nicholas II by 1300',
  lon:12.1730,lat:53.7930,rarity:0,year:1300,people:3500,populationText:'3.5 K',populationRange:'3–5 K',populationConfidence:'low',
  sizeText:'0.25 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:66,technology:50,economyScore:48,stability:69,
  historicalRole:'Regional princely centre within the Werle branch of the Mecklenburg dynasty',
  economy:'Markets, crafts, agriculture and princely administration',
  militaryRole:'Castle-town controlling the surrounding Werle lands',
  researchSummary:'The Werle-Güstrow and Werle-Parchim branches had been reunited around 1292 under Nicholas II, so Güstrow in 1300 belongs to the reunited Lordship of Werle.',
  evidenceNote:'Population is low-confidence; the 1292 political reunification is documented.',
  sources:[['Werle','https://en.wikipedia.org/wiki/Werle'],['Güstrow','https://en.wikipedia.org/wiki/G%C3%BCstrow']]
 },
 {
  id:'1300-stettin',name:'Szczecin',modern:'Szczecin',country:'Duchy of Pomerania-Stettin',subrealm:'Duchy of Pomerania-Stettin · ducal and Oder port city',
  lon:14.5528,lat:53.4285,rarity:1,year:1300,people:8000,populationText:'8.0 K',populationRange:'6–10 K',populationConfidence:'low',
  sizeText:'0.55 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:60,technology:68,economyScore:69,stability:65,
  historicalRole:'Capital and major Oder port of the Pomerania-Stettin branch created in 1295',
  economy:'Oder trade, Baltic commerce, crafts and ducal administration',
  militaryRole:'Fortified river-port with strategic access to the Baltic',
  researchSummary:'The 1295 partition of Pomerania created distinct Stettin and Wolgast branches; Stettin became the key centre of the eastern branch.',
  evidenceNote:'Population is low-confidence; the 1295 political division is high confidence. Navy excludes merchant shipping temporarily requisitioned or armed for war.',
  sources:[['Duchy of Pomerania','https://en.wikipedia.org/wiki/Duchy_of_Pomerania'],['Szczecin','https://en.wikipedia.org/wiki/Szczecin']]
 },
 {
  id:'1300-stargard',name:'Stargard',modern:'Stargard',country:'Duchy of Pomerania-Stettin',subrealm:'Duchy of Pomerania-Stettin · inland Hanseatic-oriented town',
  lon:15.0499,lat:53.3367,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:69,technology:61,economyScore:57,stability:72,
  historicalRole:'Growing fortified trading town of Pomerania-Stettin',
  economy:'Grain, crafts, markets and regional trade',
  militaryRole:'Walled inland commercial centre',
  researchSummary:'Stargard was an important east-Pomeranian town within the Stettin branch after the 1295 partition.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Stargard','https://en.wikipedia.org/wiki/Stargard'],['Duchy of Pomerania','https://en.wikipedia.org/wiki/Duchy_of_Pomerania']]
 },
 {
  id:'1300-wolgast',name:'Wolgast',modern:'Wolgast',country:'Duchy of Pomerania-Wolgast',subrealm:'Duchy of Pomerania-Wolgast · ducal residence after 1295',
  lon:13.7729,lat:54.0528,mapLon:13.7500,mapLat:54.0200,rarity:0,year:1300,people:3500,populationText:'3.5 K',populationRange:'3–5 K',populationConfidence:'low',
  sizeText:'0.25 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:58,technology:56,economyScore:55,stability:67,
  historicalRole:'Namesake ducal residence of the Pomerania-Wolgast branch',
  economy:'Baltic trade, fisheries, agriculture and ducal services',
  militaryRole:'Small fortified coastal residence with useful maritime position',
  researchSummary:'Wolgast became the dynastic centre of the western Pomeranian branch created by the 1295 division.',
  evidenceNote:'Population is low-confidence. Its maritime position does not by itself demonstrate a permanent dedicated war fleet.',
  sources:[['Wolgast','https://en.wikipedia.org/wiki/Wolgast'],['Duchy of Pomerania','https://en.wikipedia.org/wiki/Duchy_of_Pomerania']]
 },
 {
  id:'1300-greifswald',name:'Greifswald',modern:'Greifswald',country:'Duchy of Pomerania-Wolgast',subrealm:'Duchy of Pomerania-Wolgast · Baltic merchant city',
  lon:13.3815,lat:54.0958,rarity:1,year:1300,people:6000,populationText:'6.0 K',populationRange:'5–8 K',populationConfidence:'low',
  sizeText:'0.4 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:58,technology:68,economyScore:70,stability:74,
  historicalRole:'Prosperous Baltic trading town within Pomerania-Wolgast',
  economy:'Baltic shipping, salt, fish, grain and crafts',
  militaryRole:'Walled port-oriented town with strong merchant resources',
  researchSummary:'Greifswald grew rapidly in the 13th century and belonged to the Wolgast branch after the 1295 partition.',
  evidenceNote:'Population is low-confidence. Merchant and Hanseatic shipping is excluded from Navy unless maintained as a dedicated military fleet.',
  sources:[['Greifswald','https://en.wikipedia.org/wiki/Greifswald'],['Duchy of Pomerania','https://en.wikipedia.org/wiki/Duchy_of_Pomerania']]
 },
 {
  id:'1300-stralsund',name:'Stralsund',modern:'Stralsund',country:'Duchy of Pomerania-Wolgast',subrealm:'Duchy of Pomerania-Wolgast · major Hanseatic Baltic port',
  lon:13.0850,lat:54.3091,mapLon:13.0400,mapLat:54.2000,rarity:2,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:55,technology:80,economyScore:83,stability:78,
  historicalRole:'One of the strongest Baltic merchant cities of the Pomeranian coast',
  economy:'Hanseatic shipping, herring, grain, salt and long-distance trade',
  militaryRole:'Strongly fortified maritime city with notable merchant fleet capacity',
  researchSummary:'Stralsund’s position and merchant wealth made it one of the standout urban centres of Pomerania-Wolgast.',
  evidenceNote:'Population is low-confidence. Stralsund had major maritime capacity, but Navy is zero because merchant vessels assembled or armed for wartime are not treated as a standing fleet.',
  sources:[['Stralsund','https://en.wikipedia.org/wiki/Stralsund'],['Duchy of Pomerania','https://en.wikipedia.org/wiki/Duchy_of_Pomerania']]
 },
 {
  id:'1300-munich',name:'Munich',modern:'Munich',country:'Duchy of Upper Bavaria',subrealm:'Upper Bavaria · ducal capital of the Wittelsbach line',
  lon:11.5820,lat:48.1351,rarity:1,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–15 K',populationConfidence:'low',
  sizeText:'0.75 km²',sizeConfidence:'low',army:150,armyText:'150',navy:0,navyText:'0',
  food:73,technology:70,economyScore:72,stability:70,
  historicalRole:'Capital and principal residence of Upper Bavaria',
  economy:'Court services, salt trade, brewing, crafts and regional markets',
  militaryRole:'Fortified ducal capital with strong administrative resources',
  researchSummary:'After the 1255 division of Bavaria, Munich became the main centre of Upper Bavaria and grew under Wittelsbach patronage.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Munich','https://en.wikipedia.org/wiki/Munich'],['Duchy of Bavaria','https://en.wikipedia.org/wiki/Duchy_of_Bavaria']]
 },
 {
  id:'1300-ingolstadt',name:'Ingolstadt',modern:'Ingolstadt',country:'Duchy of Upper Bavaria',subrealm:'Upper Bavaria · fortified Danube town',
  lon:11.4258,lat:48.7665,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:74,technology:58,economyScore:60,stability:73,
  historicalRole:'Strategic Danube town in Upper Bavaria',
  economy:'Danube trade, markets, crafts and agriculture',
  militaryRole:'Fortified river town controlling regional routes',
  researchSummary:'Ingolstadt was a useful Upper Bavarian urban and strategic centre long before its later university prominence.',
  evidenceNote:'Population is low-confidence; no university bonus is applied because the university dates from 1472.',
  sources:[['Ingolstadt','https://en.wikipedia.org/wiki/Ingolstadt'],['Duchy of Bavaria','https://en.wikipedia.org/wiki/Duchy_of_Bavaria']]
 },
 {
  id:'1300-landshut',name:'Landshut',modern:'Landshut',country:'Duchy of Lower Bavaria',subrealm:'Lower Bavaria · principal ducal capital',
  lon:12.1522,lat:48.5442,rarity:1,year:1300,people:9000,populationText:'9.0 K',populationRange:'7–11 K',populationConfidence:'low',
  sizeText:'0.6 km²',sizeConfidence:'low',army:150,armyText:'150',navy:0,navyText:'0',
  food:78,technology:64,economyScore:68,stability:71,
  historicalRole:'Principal capital of Lower Bavaria after the 1255 Wittelsbach partition',
  economy:'Court services, Isar trade, crafts, markets and agriculture',
  militaryRole:'Castle-backed ducal capital with substantial regional manpower',
  researchSummary:'Landshut served as the chief political centre of Lower Bavaria and developed rapidly under its Wittelsbach dukes.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Landshut','https://en.wikipedia.org/wiki/Landshut'],['Duchy of Bavaria','https://en.wikipedia.org/wiki/Duchy_of_Bavaria']]
 },
 {
  id:'1300-straubing',name:'Straubing',modern:'Straubing',country:'Duchy of Lower Bavaria',subrealm:'Lower Bavaria · Danube market and ducal town',
  lon:12.5732,lat:48.8813,rarity:0,year:1300,people:6000,populationText:'6.0 K',populationRange:'5–8 K',populationConfidence:'low',
  sizeText:'0.4 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:82,technology:59,economyScore:63,stability:74,
  historicalRole:'Important Danube market town of Lower Bavaria',
  economy:'Grain, livestock, Danube trade, markets and crafts',
  militaryRole:'Fortified Danube town with regional strategic value',
  researchSummary:'Straubing was an established Lower Bavarian urban centre positioned on the Danube trade corridor.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Straubing','https://en.wikipedia.org/wiki/Straubing'],['Duchy of Bavaria','https://en.wikipedia.org/wiki/Duchy_of_Bavaria']]
 },
 {
  id:'1300-salzburg',name:'Salzburg',modern:'Salzburg',country:'Archbishopric of Salzburg',subrealm:'Prince-Archbishopric of Salzburg · ecclesiastical capital',
  lon:13.0550,lat:47.8095,rarity:1,year:1300,people:9000,populationText:'9.0 K',populationRange:'7–11 K',populationConfidence:'low',
  sizeText:'0.6 km²',sizeConfidence:'low',army:150,armyText:'150',navy:0,navyText:'0',
  food:64,technology:82,economyScore:82,stability:68,
  historicalRole:'Capital of a powerful ecclesiastical principality enriched by Alpine salt',
  economy:'Salt, church revenues, markets, crafts and trans-Alpine trade',
  militaryRole:'Strong fortress-city dominated by Hohensalzburg',
  researchSummary:'Salzburg was the political and ecclesiastical heart of an increasingly territorial prince-archbishopric, with salt revenues supporting its power.',
  evidenceNote:'Population is low-confidence; church and salt importance are high confidence.',
  sources:[['Salzburg','https://en.wikipedia.org/wiki/Salzburg'],['Prince-Archbishopric of Salzburg','https://en.wikipedia.org/wiki/Prince-Archbishopric_of_Salzburg']]
 },
 {
  id:'1300-hallein',name:'Hallein',modern:'Hallein',country:'Archbishopric of Salzburg',subrealm:'Prince-Archbishopric of Salzburg · salt-mining town',
  lon:13.0926,lat:47.6833,rarity:0,year:1300,people:4000,populationText:'4.0 K',populationRange:'3–5 K',populationConfidence:'low',
  sizeText:'0.28 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:58,technology:80,economyScore:76,stability:70,
  historicalRole:'Key salt-production centre of the Salzburg archbishops',
  economy:'Salt mining, processing, transport and regional markets',
  militaryRole:'Small fortified economic centre with strategic resource importance',
  researchSummary:'Hallein’s salt mines were one of the economic foundations of Salzburg’s medieval territorial power.',
  evidenceNote:'Population is low-confidence; Technology and economy are raised by specialised salt extraction and processing.',
  sources:[['Hallein','https://en.wikipedia.org/wiki/Hallein'],['Prince-Archbishopric of Salzburg','https://en.wikipedia.org/wiki/Prince-Archbishopric_of_Salzburg']]
 },
 {
  id:'1300-vienna',name:'Vienna',modern:'Vienna',country:'Duchy of Austria',subrealm:'Habsburg Duchy of Austria · principal ducal city',
  lon:16.3738,lat:48.2082,rarity:3,year:1300,people:20000,populationText:'20.0 K',populationRange:'18–25 K',populationConfidence:'low',
  sizeText:'1.0 km²',sizeConfidence:'low',army:250,armyText:'250',navy:0,navyText:'0',
  food:70,technology:82,economyScore:84,stability:72,
  historicalRole:'Principal Habsburg city in Austria and major Danube commercial centre',
  economy:'Danube trade, wine, crafts, court services and regional markets',
  militaryRole:'Large walled ducal city controlling an important Danube corridor',
  researchSummary:'Vienna was already the leading city of the Duchy of Austria under Habsburg rule around 1300, long before becoming an imperial capital in the later sense.',
  evidenceNote:'Population is a low-confidence range; political and commercial importance are high confidence.',
  sources:[['Vienna','https://en.wikipedia.org/wiki/Vienna'],['Duchy of Austria','https://en.wikipedia.org/wiki/Duchy_of_Austria']]
 },
 {
  id:'1300-krems',name:'Krems',modern:'Krems an der Donau',country:'Duchy of Austria',subrealm:'Duchy of Austria · Danube wine and trading town paired with Stein',
  lon:15.6042,lat:48.4100,rarity:0,year:1300,people:6000,populationText:'6.0 K',populationRange:'5–8 K',populationConfidence:'low',
  sizeText:'0.4 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:76,technology:61,economyScore:64,stability:75,
  historicalRole:'Important Danube market and wine-trading town of Austria',
  economy:'Wine, Danube shipping, markets, crafts and agriculture',
  militaryRole:'Fortified river town with commercial rather than major military weight',
  researchSummary:'Krems and nearby Stein formed an important Danube commercial node in medieval Austria.',
  evidenceNote:'Population is low-confidence; river-trade and wine importance are better documented.',
  sources:[['Krems an der Donau','https://en.wikipedia.org/wiki/Krems_an_der_Donau'],['Duchy of Austria','https://en.wikipedia.org/wiki/Duchy_of_Austria']]
 },
 {
  id:'1300-wiener-neustadt',name:'Wiener Neustadt',modern:'Wiener Neustadt',country:'Duchy of Austria',subrealm:'Duchy of Austria · fortified Babenberg foundation under Habsburg rule',
  lon:16.2497,lat:47.8150,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.4 km²',sizeConfidence:'low',army:150,armyText:'150',navy:0,navyText:'0',
  food:62,technology:60,economyScore:57,stability:68,
  historicalRole:'Planned fortified town guarding Austria’s southeastern approaches',
  economy:'Markets, crafts, agriculture and military provisioning',
  militaryRole:'Purpose-built fortified frontier city',
  researchSummary:'Founded in the late 12th century, Wiener Neustadt retained strong strategic value under the Habsburg dukes.',
  evidenceNote:'Population is low-confidence; fortified-planned-city status is high confidence.',
  sources:[['Wiener Neustadt','https://en.wikipedia.org/wiki/Wiener_Neustadt'],['Duchy of Austria','https://en.wikipedia.org/wiki/Duchy_of_Austria']]
 },
 {
  id:'1300-linz',name:'Linz',modern:'Linz',country:'Duchy of Austria',subrealm:'Duchy of Austria · upper Danube market town',
  lon:14.2858,lat:48.3069,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:74,technology:60,economyScore:61,stability:74,
  historicalRole:'Important Danube crossing and market centre in Upper Austria',
  economy:'Danube trade, markets, crafts and agriculture',
  militaryRole:'Fortified river town with regional strategic value',
  researchSummary:'Linz was a useful Habsburg market and Danube crossing town around 1300, though much smaller than Vienna.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Linz','https://en.wikipedia.org/wiki/Linz'],['Duchy of Austria','https://en.wikipedia.org/wiki/Duchy_of_Austria']]
 },
 {
  id:'1300-graz',name:'Graz',modern:'Graz',country:'Duchy of Styria',subrealm:'Habsburg Duchy of Styria · principal urban and ducal centre',
  lon:15.4395,lat:47.0707,rarity:1,year:1300,people:2000,populationText:'2.0 K',populationRange:'1.8–2.2 K',populationConfidence:'high',
  sizeText:'0.6 km²',sizeConfidence:'low',army:150,armyText:'150',navy:0,navyText:'0',
  food:72,technology:64,economyScore:68,stability:68,
  historicalRole:'Leading city of Styria under Habsburg rule',
  economy:'Court services, markets, crafts, wine and agriculture',
  militaryRole:'Castle-backed city controlling routes through central Styria',
  researchSummary:'Graz had developed into the chief urban centre of Styria and became increasingly important under Habsburg government.',
  evidenceNote:'The City of Graz population statistics give about 2,000 inhabitants at the end of the 13th century.',
  sources:[['Graz','https://en.wikipedia.org/wiki/Graz'],['Duchy of Styria','https://en.wikipedia.org/wiki/Duchy_of_Styria']]
 },
 {
  id:'1300-judenburg',name:'Judenburg',modern:'Judenburg',country:'Duchy of Styria',subrealm:'Duchy of Styria · alpine trade and market town',
  lon:14.6603,lat:47.1696,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:62,technology:67,economyScore:63,stability:70,
  historicalRole:'Important Styrian trading town on trans-Alpine routes',
  economy:'Transit trade, markets, crafts, iron-region exchange and agriculture',
  militaryRole:'Fortified market town guarding Alpine approaches',
  researchSummary:'Judenburg prospered through its location on major commercial routes linking Styria with Carinthia and Italy.',
  evidenceNote:'Population is low-confidence; trade-route significance supports above-average economy-related scores.',
  sources:[['Judenburg','https://en.wikipedia.org/wiki/Judenburg'],['Duchy of Styria','https://en.wikipedia.org/wiki/Duchy_of_Styria']]
 },
 {
  id:'1300-st-veit',name:'St. Veit an der Glan',modern:'St. Veit an der Glan',country:'Duchy of Carinthia',subrealm:'Duchy of Carinthia · ducal capital under the Meinhardiner dynasty',
  lon:14.3603,lat:46.7681,rarity:0,year:1300,people:3000,populationText:'3.0 K',populationRange:'2.5–3 K',populationConfidence:'medium',
  sizeText:'0.35 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:65,technology:60,economyScore:57,stability:64,
  historicalRole:'Principal ducal town and political centre of Carinthia',
  economy:'Court services, markets, crafts and regional agriculture',
  militaryRole:'Fortified ducal centre on routes across Carinthia',
  researchSummary:'St. Veit served as the medieval capital of Carinthia while the duchy remained under the Meinhardiner line around 1300.',
  evidenceNote:'Historical summaries place medieval St. Veit at up to roughly 3,000 inhabitants; the card uses that upper-end estimate because it was the ducal capital.',
  sources:[['Sankt Veit an der Glan','https://en.wikipedia.org/wiki/Sankt_Veit_an_der_Glan'],['Duchy of Carinthia','https://en.wikipedia.org/wiki/Duchy_of_Carinthia']]
 },
 {
  id:'1300-klagenfurt',name:'Klagenfurt',modern:'Klagenfurt',country:'Duchy of Carinthia',subrealm:'Duchy of Carinthia · young chartered town',
  lon:14.3050,lat:46.6247,rarity:0,year:1300,people:3500,populationText:'3.5 K',populationRange:'3–5 K',populationConfidence:'low',
  sizeText:'0.25 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:66,technology:54,economyScore:50,stability:72,
  historicalRole:'Young but growing urban centre in the Carinthian basin',
  economy:'Markets, crafts and agriculture',
  militaryRole:'Small fortified town with regional value',
  researchSummary:'Klagenfurt had received urban privileges in the 13th century but remained smaller than St. Veit around 1300.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Klagenfurt','https://en.wikipedia.org/wiki/Klagenfurt'],['Duchy of Carinthia','https://en.wikipedia.org/wiki/Duchy_of_Carinthia']]
 },
 {
  id:'1300-merano',name:'Merano',modern:'Merano',country:'County of Tyrol',subrealm:'County of Tyrol · principal comital town',
  lon:11.1590,lat:46.6713,rarity:0,year:1300,people:1300,populationText:'1.3 K',populationRange:'1–1.5 K',populationConfidence:'medium',
  sizeText:'0.35 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:69,technology:64,economyScore:61,stability:74,
  historicalRole:'Principal urban centre of the County of Tyrol before Innsbruck’s later rise',
  economy:'Wine, markets, Alpine transit trade and crafts',
  militaryRole:'Fortified town on key Alpine routes',
  researchSummary:'Merano was the leading town of the County of Tyrol around 1300 under the Meinhardiner counts.',
  evidenceNote:'Research on Tyrolean towns places Merano at roughly 1,000–1,500 inhabitants around 1300; a 1304 fiscal record is consistent with a small town of this order.',
  sources:[['Merano','https://en.wikipedia.org/wiki/Merano'],['County of Tyrol','https://en.wikipedia.org/wiki/County_of_Tyrol']]
 },
 {
  id:'1300-innsbruck',name:'Innsbruck',modern:'Innsbruck',country:'County of Tyrol',subrealm:'County of Tyrol · Inn bridge and trans-Alpine market town',
  lon:11.4041,lat:47.2692,rarity:0,year:1300,people:1300,populationText:'1.3 K',populationRange:'1–1.5 K',populationConfidence:'high',
  sizeText:'0.3 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:58,technology:66,economyScore:63,stability:72,
  historicalRole:'Strategic bridge-town on one of the main trans-Alpine routes',
  economy:'Transit tolls, markets, crafts and Alpine trade',
  militaryRole:'Fortified crossing controlling the Inn valley',
  researchSummary:'Innsbruck already benefited from its bridge and Alpine transit route but had not yet displaced Merano as Tyrol’s principal political centre.',
  evidenceNote:'Innsbruck’s city archive gives roughly 1,000–1,500 inhabitants around 1300.',
  sources:[['Innsbruck','https://en.wikipedia.org/wiki/Innsbruck'],['County of Tyrol','https://en.wikipedia.org/wiki/County_of_Tyrol']]
 },
 {
  id:'1300-prague',name:'Prague',modern:'Prague',country:'Kingdom of Bohemia',subrealm:'Kingdom of Bohemia · royal capital of Wenceslaus II',
  lon:14.4378,lat:50.0755,rarity:3,year:1300,people:20000,populationText:'20.0 K',populationRange:'18–22 K',populationConfidence:'medium',
  sizeText:'2.0 km²',sizeConfidence:'low',army:400,armyText:'400',navy:0,navyText:'0',
  food:64,technology:88,economyScore:90,stability:78,
  historicalRole:'Royal capital of Bohemia and one of central Europe’s great political and commercial cities',
  economy:'Court, crafts, markets, long-distance trade and administration',
  militaryRole:'Large fortified royal city dominated by Prague Castle and river crossings',
  researchSummary:'Under Wenceslaus II, Prague was the political heart of a rapidly strengthening Bohemian monarchy whose influence extended into Poland and Hungary.',
  evidenceNote:'Published estimates for Prague around 1300 vary substantially. The card uses a conservative roughly 20,000, consistent with the New Cambridge Medieval History, rather than projecting the 30–40K scale reached after later 14th-century expansion backward.',
  sources:[['Prague','https://en.wikipedia.org/wiki/Prague'],['Kingdom of Bohemia','https://en.wikipedia.org/wiki/Kingdom_of_Bohemia']]
 },
 {
  id:'1300-kutna-hora',name:'Kutná Hora',modern:'Kutná Hora',country:'Kingdom of Bohemia',subrealm:'Kingdom of Bohemia · royal silver-mining centre',
  lon:15.2682,lat:49.9484,rarity:2,year:1300,people:3000,populationText:'3.0 K',populationRange:'2–4 K',populationConfidence:'low',
  sizeText:'0.7 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:50,technology:96,economyScore:96,stability:68,
  historicalRole:'Explosive silver-mining centre central to Wenceslaus II’s monetary reforms',
  economy:'Silver mining, minting, metallurgy, merchant finance and royal revenue',
  militaryRole:'Economically strategic royal town whose mines justified substantial protection',
  researchSummary:'Kutná Hora’s silver boom transformed Bohemia. In 1300 Wenceslaus II issued the Ius regale montanorum and concentrated minting of the Prague groschen there.',
  evidenceNote:'Kutná Hora was only emerging as a major silver centre around 1300 and was not yet the much larger 14th-century mining city; the card therefore uses a conservative early-growth estimate.',
  sources:[['UNESCO — Kutná Hora','https://whc.unesco.org/en/list/732/'],['Kutná Hora','https://en.wikipedia.org/wiki/Kutn%C3%A1_Hora']]
 },
 {
  id:'1300-plzen',name:'Plzeň',modern:'Plzeň',country:'Kingdom of Bohemia',subrealm:'Kingdom of Bohemia · newly founded royal city',
  lon:13.3776,lat:49.7384,rarity:0,year:1300,people:2000,populationText:'2.0 K',populationRange:'1.5–2.5 K',populationConfidence:'low',
  sizeText:'0.20 km²',sizeConfidence:'high',army:50,armyText:'50',navy:0,navyText:'0',
  food:68,technology:56,economyScore:52,stability:76,
  historicalRole:'New planned royal town founded by Wenceslaus II in the 1290s',
  economy:'Markets, crafts, agriculture and crossroads trade',
  militaryRole:'Planned fortified royal settlement',
  researchSummary:'New Plzeň was founded in 1295, making it one of the youngest cards in the set at the exact 1300 snapshot.',
  evidenceNote:'New Plzeň was founded only around 1295. The official city history gives the original Gothic town an area of about 20 hectares and about 3,000 inhabitants in the 14th century, so the exact 1300 snapshot is set conservatively below that later level.',
  sources:[['Plzeň','https://en.wikipedia.org/wiki/Plze%C5%88'],['Kingdom of Bohemia','https://en.wikipedia.org/wiki/Kingdom_of_Bohemia']]
 },
 {
  id:'1300-ceske-budejovice',name:'České Budějovice',modern:'České Budějovice',country:'Kingdom of Bohemia',subrealm:'Kingdom of Bohemia · royal city founded by Přemysl Ottokar II',
  lon:14.4747,lat:48.9745,rarity:0,year:1300,people:2000,populationText:'2.0 K',populationRange:'1.5–2.5 K',populationConfidence:'medium',
  sizeText:'0.35 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:72,technology:57,economyScore:55,stability:74,
  historicalRole:'Royal foundation strengthening the monarchy in southern Bohemia',
  economy:'Markets, crafts, agriculture and regional trade',
  militaryRole:'Planned fortified royal town',
  researchSummary:'Founded in 1265, České Budějovice was designed as a royal counterweight to powerful noble families in southern Bohemia.',
  evidenceNote:'The city was founded in 1265. Its first usable demographic reconstruction gives about 2,600 inhabitants in 1384, so 5,000 in 1300 was too high; the card uses a conservative earlier estimate.',
  sources:[['České Budějovice','https://en.wikipedia.org/wiki/%C4%8Cesk%C3%A9_Bud%C4%9Bjovice'],['Kingdom of Bohemia','https://en.wikipedia.org/wiki/Kingdom_of_Bohemia']]
 },
 {
  id:'1300-hradec-kralove',name:'Hradec Králové',modern:'Hradec Králové',country:'Kingdom of Bohemia',subrealm:'Kingdom of Bohemia · royal town of Hradec',
  lon:15.8328,lat:50.2104,rarity:0,year:1300,people:6000,populationText:'6.0 K',populationRange:'5–8 K',populationConfidence:'low',
  sizeText:'0.4 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:74,technology:58,economyScore:57,stability:74,
  historicalRole:'Important fortified royal town in eastern Bohemia',
  economy:'Markets, crafts, agriculture and regional administration',
  militaryRole:'Strong royal hill-town at the confluence of the Elbe and Orlice',
  researchSummary:'The settlement known then primarily as Hradec was an established royal city; its later association with Bohemian queens produced the modern name Hradec Králové.',
  evidenceNote:'Population is low-confidence; the card uses the modern recognisable city name while keeping the historical note period-correct.',
  sources:[['Hradec Králové','https://en.wikipedia.org/wiki/Hradec_Kr%C3%A1lov%C3%A9'],['Kingdom of Bohemia','https://en.wikipedia.org/wiki/Kingdom_of_Bohemia']]
 },
 {
  id:'1300-brno',name:'Brno',modern:'Brno',country:'Margraviate of Moravia',subrealm:'Margraviate of Moravia · principal southern Moravian city',
  lon:16.6068,lat:49.1951,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:72,technology:71,economyScore:72,stability:70,
  historicalRole:'One of Moravia’s two leading political and commercial cities',
  economy:'Markets, crafts, wine, regional trade and administration',
  militaryRole:'Strong walled city associated with Špilberk Castle',
  researchSummary:'Brno was a principal Moravian centre within the lands of the Bohemian crown and had strong royal and administrative importance.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Brno','https://en.wikipedia.org/wiki/Brno'],['Margraviate of Moravia','https://en.wikipedia.org/wiki/Margraviate_of_Moravia']]
 },
 {
  id:'1300-olomouc',name:'Olomouc',modern:'Olomouc',country:'Margraviate of Moravia',subrealm:'Margraviate of Moravia · episcopal and political centre',
  lon:17.2509,lat:49.5938,rarity:1,year:1300,people:9000,populationText:'9.0 K',populationRange:'7–11 K',populationConfidence:'low',
  sizeText:'0.6 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:68,technology:78,economyScore:69,stability:67,
  historicalRole:'Major Moravian episcopal city and political centre',
  economy:'Church institutions, markets, crafts and regional trade',
  militaryRole:'Fortified episcopal city controlling northern Moravian routes',
  researchSummary:'Olomouc rivalled Brno as one of medieval Moravia’s principal cities and benefited from its powerful bishopric.',
  evidenceNote:'Population is low-confidence; ecclesiastical importance supports high Technology.',
  sources:[['Olomouc','https://en.wikipedia.org/wiki/Olomouc'],['Margraviate of Moravia','https://en.wikipedia.org/wiki/Margraviate_of_Moravia']]
 },
 {
  id:'1300-znojmo',name:'Znojmo',modern:'Znojmo',country:'Margraviate of Moravia',subrealm:'Margraviate of Moravia · fortified royal and wine town',
  lon:16.0488,lat:48.8555,rarity:0,year:1300,people:6000,populationText:'6.0 K',populationRange:'5–8 K',populationConfidence:'low',
  sizeText:'0.4 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:78,technology:61,economyScore:61,stability:72,
  historicalRole:'Strong southern Moravian fortress and commercial town',
  economy:'Wine, agriculture, markets and regional trade',
  militaryRole:'Fortified frontier town near the Austrian border',
  researchSummary:'Znojmo combined a major castle, wine economy and strategic position on Moravia’s southern approaches.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Znojmo','https://en.wikipedia.org/wiki/Znojmo'],['Margraviate of Moravia','https://en.wikipedia.org/wiki/Margraviate_of_Moravia']]
 },
 {
  id:'1300-jihlava',name:'Jihlava',modern:'Jihlava',country:'Margraviate of Moravia',subrealm:'Margraviate of Moravia · royal silver-mining city',
  lon:15.5912,lat:49.3961,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:52,technology:93,economyScore:87,stability:68,
  historicalRole:'Major silver-mining and legal centre of Moravia',
  economy:'Silver mining, metallurgy, mint-related commerce, crafts and trade',
  militaryRole:'Wealthy fortified mining town with strategic royal importance',
  researchSummary:'Jihlava was one of central Europe’s important 13th-century silver towns and its mining law influenced other mining centres.',
  evidenceNote:'Population is low-confidence; Technology is high because of advanced mining organisation and metallurgy.',
  sources:[['Jihlava','https://en.wikipedia.org/wiki/Jihlava'],['Margraviate of Moravia','https://en.wikipedia.org/wiki/Margraviate_of_Moravia']]
 },
 {
  id:'1300-schwyz',name:'Schwyz',modern:'Schwyz',country:'Lordship of Milan',subrealm:'Valley community of Schwyz · early Swiss Confederacy within the Holy Roman Empire',
  lon:8.6541,lat:47.0207,rarity:0,year:1300,people:2500,populationText:'2.5 K',populationRange:'2–4 K',populationConfidence:'low',
  sizeText:'0.15 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:66,technology:50,economyScore:45,stability:90,
  historicalRole:'One of the three original Waldstätte communities associated by the 1291 Federal Charter',
  economy:'Pastoral agriculture, local markets and Alpine transit connections',
  militaryRole:'Small population with strong militia traditions and defensible Alpine terrain',
  researchSummary:'Schwyz was one of the three valley communities associated with the 1291 alliance later regarded as the foundation of the Old Swiss Confederacy.',
  evidenceNote:'People is low-confidence. Stability is comparatively high to represent communal autonomy, not a measured historical statistic.',
  sources:[['Federal Charter of 1291','https://en.wikipedia.org/wiki/Federal_Charter_of_1291'],['Schwyz','https://en.wikipedia.org/wiki/Schwyz']]
 },
 {
  id:'1300-altdorf',name:'Altdorf',modern:'Altdorf, Uri',country:'Lordship of Milan',subrealm:'Uri valley community · early Swiss Confederacy within the Holy Roman Empire',
  lon:8.6444,lat:46.8804,rarity:0,year:1300,people:2000,populationText:'2.0 K',populationRange:'1.5–3 K',populationConfidence:'low',
  sizeText:'0.12 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:64,technology:48,economyScore:43,stability:90,
  historicalRole:'Central settlement of Uri, one of the three original Waldstätte communities',
  economy:'Pastoral farming, Alpine transit and local markets',
  militaryRole:'Small militia community guarding approaches to the Gotthard route',
  researchSummary:'Altdorf represented Uri, whose communal liberties and participation in the 1291 alliance make it important despite its very small urban scale.',
  evidenceNote:'Population is low-confidence; Army reflects militia potential rather than a permanent force.',
  sources:[['Altdorf, Switzerland','https://en.wikipedia.org/wiki/Altdorf,_Switzerland'],['Federal Charter of 1291','https://en.wikipedia.org/wiki/Federal_Charter_of_1291']]
 },
 {
  id:'1300-freiburg-breisgau',name:'Freiburg im Breisgau',modern:'Freiburg im Breisgau',country:'City of Freiburg',subrealm:'City of Freiburg · under the Counts of Freiburg',
  lon:7.8421,lat:47.9990,rarity:1,year:1300,people:9000,populationText:'9.0 K',populationRange:'7–11 K',populationConfidence:'low',
  sizeText:'0.6 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:64,technology:76,economyScore:74,stability:64,
  historicalRole:'Prosperous Upper Rhine market and mining-linked city under the Counts of Freiburg',
  economy:'Silver-region commerce, crafts, markets, wine and trans-regional trade',
  militaryRole:'Fortified city with growing civic power beneath the count’s lordship',
  researchSummary:'Freiburg was still under its counts around 1300, though the city had a strong communal identity and profited from nearby Black Forest silver and trade routes.',
  evidenceNote:'Population is low-confidence; the card intentionally does not treat Freiburg as a Free Imperial City.',
  sources:[['Freiburg im Breisgau','https://en.wikipedia.org/wiki/Freiburg_im_Breisgau'],['Counts of Freiburg','https://de.wikipedia.org/wiki/Grafen_von_Freiburg']]
 },
 {
  id:'1300-basel',name:'Basel',modern:'Basel',country:'Prince-Bishopric of Basel',subrealm:'Prince-Bishopric of Basel · episcopal city with strong civic institutions',
  lon:7.5886,lat:47.5596,rarity:1,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–15 K',populationConfidence:'low',
  sizeText:'0.75 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:59,technology:79,economyScore:79,stability:67,
  historicalRole:'Major Upper Rhine episcopal, commercial and bridge city',
  economy:'Rhine trade, crafts, markets, church institutions and regional commerce',
  militaryRole:'Strongly fortified Rhine crossing with substantial civic manpower',
  researchSummary:'Basel remained under the prince-bishop in 1300 while its commune and merchant elite were already developing considerable urban autonomy.',
  evidenceNote:'Population is low-confidence; political ownership and episcopal status are high confidence.',
  sources:[['Basel','https://en.wikipedia.org/wiki/Basel'],['Prince-Bishopric of Basel','https://en.wikipedia.org/wiki/Prince-Bishopric_of_Basel']]
 },
 {
  id:'1300-munster',name:'Münster',modern:'Münster',country:'Prince-Bishopric of Munster',subrealm:'Prince-Bishopric of Münster · episcopal capital',
  lon:7.6261,lat:51.9607,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:70,technology:70,economyScore:70,stability:67,
  historicalRole:'Capital of a large Westphalian prince-bishopric and important market city',
  economy:'Church revenues, markets, crafts, agriculture and regional trade',
  militaryRole:'Walled episcopal city with significant regional manpower',
  researchSummary:'Münster was the political and ecclesiastical centre of one of the important Westphalian prince-bishoprics.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Münster','https://en.wikipedia.org/wiki/M%C3%BCnster'],['Prince-Bishopric of Münster','https://en.wikipedia.org/wiki/Prince-Bishopric_of_M%C3%BCnster']]
 },
 {
  id:'1300-osnabruck',name:'Osnabrück',modern:'Osnabrück',country:'Prince-Bishopric of Osnabruck',subrealm:'Prince-Bishopric of Osnabrück · episcopal and merchant city',
  lon:8.0472,lat:52.2799,rarity:0,year:1300,people:7000,populationText:'7.0 K',populationRange:'5–9 K',populationConfidence:'low',
  sizeText:'0.5 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:68,technology:64,economyScore:61,stability:68,
  historicalRole:'Episcopal city and regional commercial centre in western Saxony',
  economy:'Markets, crafts, church activity and regional agriculture',
  militaryRole:'Fortified bishopric centre controlling local routes',
  researchSummary:'Osnabrück combined episcopal government with an increasingly organised urban community around 1300.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Osnabrück','https://en.wikipedia.org/wiki/Osnabr%C3%BCck'],['Prince-Bishopric of Osnabrück','https://en.wikipedia.org/wiki/Prince-Bishopric_of_Osnabr%C3%BCck']]
 },
 {
  id:'1300-paderborn',name:'Paderborn',modern:'Paderborn',country:'Prince-Bishopric of Paderborn',subrealm:'Prince-Bishopric of Paderborn · episcopal capital',
  lon:8.7575,lat:51.7189,rarity:0,year:1300,people:6000,populationText:'6.0 K',populationRange:'5–8 K',populationConfidence:'low',
  sizeText:'0.42 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:68,technology:66,economyScore:59,stability:67,
  historicalRole:'Old episcopal and imperial-meeting centre in eastern Westphalia',
  economy:'Church institutions, markets, crafts and agriculture',
  militaryRole:'Fortified episcopal city with strategic regional value',
  researchSummary:'Paderborn retained significance as the seat of its prince-bishopric and as an old royal and ecclesiastical centre.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Paderborn','https://en.wikipedia.org/wiki/Paderborn'],['Prince-Bishopric of Paderborn','https://en.wikipedia.org/wiki/Prince-Bishopric_of_Paderborn']]
 },
 {
  id:'1300-wurzburg',name:'Würzburg',modern:'Würzburg',country:'Prince-Bishopric of Wurzburg',subrealm:'Prince-Bishopric of Würzburg · episcopal capital in Franconia',
  lon:9.9534,lat:49.7913,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:72,technology:75,economyScore:76,stability:63,
  historicalRole:'Capital of a powerful Franconian prince-bishopric',
  economy:'Wine, church wealth, Main river trade, crafts and markets',
  militaryRole:'Fortified city dominated by the Marienberg stronghold',
  researchSummary:'Würzburg was one of the principal ecclesiastical states of Franconia and a major Main valley city.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Würzburg','https://en.wikipedia.org/wiki/W%C3%BCrzburg'],['Prince-Bishopric of Würzburg','https://en.wikipedia.org/wiki/Prince-Bishopric_of_W%C3%BCrzburg']]
 },
 {
  id:'1300-bamberg',name:'Bamberg',modern:'Bamberg',country:'Prince-Bishopric of Bamberg',subrealm:'Prince-Bishopric of Bamberg · cathedral and episcopal city',
  lon:10.8860,lat:49.8988,rarity:1,year:1300,people:9000,populationText:'9.0 K',populationRange:'7–11 K',populationConfidence:'low',
  sizeText:'0.6 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:70,technology:78,economyScore:73,stability:68,
  historicalRole:'Important Franconian cathedral city and capital of its prince-bishopric',
  economy:'Church revenues, markets, crafts, river trade and agriculture',
  militaryRole:'Fortified episcopal centre with strong institutional resources',
  researchSummary:'Bamberg’s cathedral, bishopric and imperial-era foundations kept it among the more important Franconian cities around 1300.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Bamberg','https://en.wikipedia.org/wiki/Bamberg'],['Prince-Bishopric of Bamberg','https://en.wikipedia.org/wiki/Prince-Bishopric_of_Bamberg']]
 },
 {
  id:'1300-passau',name:'Passau',modern:'Passau',country:'Prince-Bishopric of Passau',subrealm:'Prince-Bishopric of Passau · Danube-Inn episcopal city',
  lon:13.4319,lat:48.5667,rarity:1,year:1300,people:9000,populationText:'9.0 K',populationRange:'7–11 K',populationConfidence:'low',
  sizeText:'0.55 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:72,technology:72,economyScore:74,stability:65,
  historicalRole:'Strategic episcopal city at the confluence of the Danube, Inn and Ilz',
  economy:'River trade, salt traffic, crafts, church revenues and markets',
  militaryRole:'Highly strategic fortified river-confluence city',
  researchSummary:'Passau’s river position and episcopal status made it one of the strongest ecclesiastical trading centres on the middle Danube.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Passau','https://en.wikipedia.org/wiki/Passau'],['Prince-Bishopric of Passau','https://en.wikipedia.org/wiki/Prince-Bishopric_of_Passau']]
 },
 {
  id:'1300-dillingen',name:'Dillingen an der Donau',modern:'Dillingen an der Donau',country:'Duchy of Upper Bavaria',subrealm:'Prince-Bishopric of Augsburg · episcopal territorial residence acquired in 1258',
  lon:10.4933,lat:48.5817,rarity:0,year:1300,people:3000,populationText:'3.0 K',populationRange:'2–4 K',populationConfidence:'low',
  sizeText:'0.22 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:69,technology:54,economyScore:51,stability:72,
  historicalRole:'Small Danube territorial centre of the bishops of Augsburg',
  economy:'Agriculture, markets, church administration and crafts',
  militaryRole:'Castle-town supporting the territorial prince-bishopric',
  researchSummary:'Dillingen came into the possession of the bishops of Augsburg in 1258 and is used here to represent their territorial state separately from the increasingly autonomous city of Augsburg.',
  evidenceNote:'Population is low-confidence; territorial ownership is the key reason for inclusion.',
  sources:[['Dillingen an der Donau','https://en.wikipedia.org/wiki/Dillingen_an_der_Donau'],['Prince-Bishopric of Augsburg','https://en.wikipedia.org/wiki/Prince-Bishopric_of_Augsburg']]
 },
 {
  id:'1300-donaustauf',name:'Donaustauf',modern:'Donaustauf',country:'Prince-Bishopric of Regensburg',subrealm:'Prince-Bishopric of Regensburg · episcopal castle-town',
  lon:12.2048,lat:49.0320,rarity:0,year:1300,people:1800,populationText:'1.8 K',populationRange:'1–2.5 K',populationConfidence:'low',
  sizeText:'0.12 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:64,technology:48,economyScore:45,stability:70,
  historicalRole:'Small fortified territorial centre of the bishops of Regensburg',
  economy:'Agriculture, local markets and episcopal administration',
  militaryRole:'Castle settlement overlooking the Danube',
  researchSummary:'Because Regensburg city itself had been a Free Imperial City since 1245, Donaustauf is used to represent the territorial Prince-Bishopric of Regensburg.',
  evidenceNote:'Population is a deliberately conservative low-confidence estimate.',
  sources:[['Donaustauf','https://en.wikipedia.org/wiki/Donaustauf'],['Prince-Bishopric of Regensburg','https://en.wikipedia.org/wiki/Prince-Bishopric_of_Regensburg']]
 },
 {
  id:'1300-bruchsal',name:'Bruchsal',modern:'Bruchsal',country:'County Palatine of the Rhine',subrealm:'Palatinate · former Speyer bishopric',
  historicalCountry:'Prince-Bishopric of Speyer',historicalSubrealm:'Prince-Bishopric of Speyer · episcopal territorial town',gameplayNote:'Political grouping simplified for gameplay; the historical affiliation is retained below.',
  lon:8.5980,lat:49.1243,rarity:0,year:1300,people:2500,populationText:'2.5 K',populationRange:'2–3.5 K',populationConfidence:'low',
  sizeText:'0.18 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:68,technology:50,economyScore:48,stability:71,
  historicalRole:'Territorial town of the bishops of Speyer outside the autonomous city of Speyer',
  economy:'Agriculture, markets and episcopal administration',
  militaryRole:'Small fortified bishopric centre',
  researchSummary:'Bruchsal belonged to the territorial Prince-Bishopric of Speyer and therefore cleanly separates the bishop’s lands from the Free Imperial City of Speyer.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Bruchsal','https://en.wikipedia.org/wiki/Bruchsal'],['Prince-Bishopric of Speyer','https://en.wikipedia.org/wiki/Prince-Bishopric_of_Speyer']]
 },
 {
  id:'1300-saverne',name:'Saverne',modern:'Saverne',country:'Prince-Bishopric of Strasbourg',subrealm:'Prince-Bishopric of Strasbourg · episcopal territorial centre',
  lon:7.3622,lat:48.7414,rarity:0,year:1300,people:3000,populationText:'3.0 K',populationRange:'2–4 K',populationConfidence:'low',
  sizeText:'0.22 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:65,technology:52,economyScore:50,stability:68,
  historicalRole:'Territorial centre of the Strasbourg bishopric beyond the independent city',
  economy:'Markets, agriculture, crafts and episcopal administration',
  militaryRole:'Fortified route-town at the Vosges passage',
  researchSummary:'After Strasbourg city became free in 1262, the bishopric remained a substantial territorial principality; Saverne is used to represent that state.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Saverne','https://en.wikipedia.org/wiki/Saverne'],['Prince-Bishopric of Strasbourg','https://en.wikipedia.org/wiki/Prince-Bishopric_of_Strasbourg']]
 },
 {
  id:'1300-lubeck',name:'Lübeck',modern:'Lübeck',country:'Free Imperial City of Lübeck',subrealm:'Free Imperial City since the 1226 Reichsfreiheitsprivileg',
  lon:10.6866,lat:53.8655,rarity:3,year:1300,people:20000,populationText:'20.0 K',populationRange:'18–25 K',populationConfidence:'medium',
  sizeText:'1.1 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:60,technology:88,economyScore:92,stability:86,
  historicalRole:'Leading Baltic merchant republic and future head city of the Hanseatic network',
  economy:'Baltic shipping, salt, fish, grain, cloth, merchant finance and long-distance trade',
  militaryRole:'Strongly fortified island city with exceptional merchant-maritime capacity',
  researchSummary:'Lübeck had enjoyed imperial immediacy since 1226 and by 1300 was the dominant commercial hub linking the Baltic and North Sea trading worlds.',
  evidenceNote:'Population remains approximate. Lübeck had exceptional merchant shipping, but Navy is zero under the standing-fleet rule because ordinary Hanseatic merchant vessels armed or assembled for war are not counted as a permanent military fleet.',
  sources:[['Lübeck city history — Reichsfreiheit 1226','https://www.kulturdenkmale.luebeck.de/de/stadtleben/tourismus/luebeck/geschichte/zeittafel.html'],['Hanseatic City of Lübeck World Heritage Management Plan','https://bekanntmachungen.luebeck.de/dokumente/d/954/inline']]
 },
 {
  id:'1300-hamburg',name:'Hamburg',modern:'Hamburg',country:'Free Imperial City of Hamburg',subrealm:'Highly autonomous city under Schauenburg-Holstein overlordship',
  lon:9.9937,lat:53.5511,rarity:1,year:1300,people:4500,populationText:'4.5 K',populationRange:'4–5 K',populationConfidence:'high',
  sizeText:'0.35 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:61,technology:70,economyScore:77,stability:82,
  historicalRole:'Rapidly self-governing Elbe port with major North Sea and Baltic trade links',
  economy:'Shipping, grain, cloth, timber, metals and merchant trade',
  militaryRole:'Small population but strategically important fortified port with merchant shipping',
  researchSummary:'Hamburg was not yet a formally recognised Free Imperial City in 1300. It remained under Schauenburg-Holstein overlordship while possessing extensive civic autonomy; the counts confirmed the city’s right to issue its own laws in 1292.',
  evidenceNote:'The population estimate of roughly 4,000–5,000 around 1300 comes from Hamburg’s own historical portal. Navy is zero because its commercial shipping was not a permanently maintained municipal war fleet.',
  sources:[['Geschichtsbuch Hamburg — city overview','https://geschichtsbuch.hamburg.de/epochen/ueberblick/'],['Geschichtsbuch Hamburg — High Middle Ages','https://geschichtsbuch.hamburg.de/epochen/hohes-mittelalter/']]
 },
 {
  id:'1300-bremen',name:'Bremen',modern:'Bremen',country:'Free Imperial City of Bremen',subrealm:'Self-governing city under the archbishop’s formal lordship',
  lon:8.8017,lat:53.0793,rarity:2,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:62,technology:73,economyScore:79,stability:80,
  historicalRole:'Commercial Weser city with a mature council and substantial civic autonomy',
  economy:'River and maritime trade, markets, crafts and merchant shipping',
  militaryRole:'Walled port city with organised civic government and militia',
  researchSummary:'Bremen had a documented council by 1225 and was already an independent political actor, but formal recognition as a Free Imperial City came only in 1646. In 1300 the archbishop remained the formal city lord.',
  evidenceNote:'The card separates effective civic autonomy from later formal imperial immediacy. Navy excludes Bremen’s commercial shipping because no dedicated standing war fleet is evidenced for 1300.',
  sources:[['Bremen State Archive — path to independence','https://www.staatsarchiv.bremen.de/entdecken/geschichten-aus-der-landesgeschichte/epochenuebergreifend/selbstaendigkeit-1750'],['Bremen State Archive — medieval period','https://www.staatsarchiv.bremen.de/entdecken/geschichten-aus-der-landesgeschichte/mittelalter-16013']]
 },
 {
  id:'1300-frankfurt-main',name:'Frankfurt am Main',modern:'Frankfurt am Main',country:'Archbishopric of Mainz',subrealm:'Frankfurt district · assigned to the Archbishopric of Mainz on the Cardwars c.1300 map',
  lon:8.6821,lat:50.1109,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.7 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:65,technology:78,economyScore:88,stability:78,
  historicalRole:'Important royal city, fair centre and Main crossing directly linked to the empire',
  economy:'Fairs, long-distance trade, finance, crafts and river commerce',
  militaryRole:'Walled imperial city with substantial civic resources',
  researchSummary:'Frankfurt was already reichsabhängig and strongly self-governing around 1300, but the city itself dates full Free Imperial City status to the acquisition of key imperial offices and rights in 1372.',
  evidenceNote:'The label Imperial City avoids projecting the 1372 constitutional milestone backward to 1300.',
  sources:[['Frankfurt.de — 1372 and Free Imperial City status','https://frankfurt.de/themen/umwelt-und-gruen/orte/wald/650-jahre-frankfurter-stadtwald'],['Frankfurt am Main','https://en.wikipedia.org/wiki/Frankfurt']]
 },
 {
  id:'1300-nuremberg',name:'Nuremberg',modern:'Nuremberg',country:'Free Imperial City of Nuremberg',subrealm:'Imperial city with civic self-government and major imperial castle',
  lon:11.0767,lat:49.4521,rarity:3,year:1300,people:9000,populationText:'9.0 K',populationRange:'8–10 K',populationConfidence:'high',
  sizeText:'0.80 km²',sizeConfidence:'medium',army:100,armyText:'100',navy:0,navyText:'0',
  food:60,technology:88,economyScore:89,stability:78,
  historicalRole:'One of the Empire’s foremost royal and merchant cities',
  economy:'Long-distance trade, metalwork, crafts, markets and imperial services',
  militaryRole:'Strongly fortified city beneath one of the Empire’s major castles',
  researchSummary:'Nuremberg’s imperial-city constitution was developing strongly by the late 13th century and the city was already a major political and commercial centre.',
  evidenceNote:'Nuremberg’s own city history says the population around 1300 was probably still below 10,000. The c.1300 footprint is kept below the later outer-wall area because the major 1346–1400 expansion approximately doubled the fortified city.',
  sources:[['Nuremberg city law — imperial city 1254/72–1806','https://www.nuernberg.de/internet/stadtrecht/entfaltung_verfassung.html'],['Nuremberg city history','https://www.nuernberg.de/internet/stadtarchiv/stadtgeschichte.html']]
 },
 {
  id:'1300-regensburg',name:'Regensburg',modern:'Regensburg',country:'Free Imperial City of Regensburg',subrealm:'Free Imperial City since 1245',
  lon:12.1016,lat:49.0134,rarity:2,year:1300,people:20000,populationText:'20.0 K',populationRange:'18–25 K',populationConfidence:'low',
  sizeText:'1.2 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:65,technology:86,economyScore:88,stability:79,
  historicalRole:'Major Danube trading metropolis and independent imperial city',
  economy:'Danube trade, long-distance commerce, crafts, finance and markets',
  militaryRole:'Large fortified river city with substantial civic resources',
  researchSummary:'Frederick II granted Regensburg Free Imperial City status in 1245, making its independence unambiguous for the 1300 snapshot.',
  evidenceNote:'Population is approximate; political status is high confidence.',
  sources:[['Regensburg Tourism — Free Imperial City since 1245','https://tourismus.regensburg.de/en/experience-discover/sightseeing-unesco-world-heritage/old-town-hall'],['Regensburg','https://en.wikipedia.org/wiki/Regensburg']]
 },
 {
  id:'1300-augsburg',name:'Augsburg',modern:'Augsburg',country:'Duchy of Upper Bavaria',subrealm:'Upper Bavaria · gameplay grouping',
  historicalCountry:'Free Imperial City of Augsburg',historicalSubrealm:'Imperial city increasingly independent from its bishop',gameplayNote:'Political grouping simplified for gameplay; the historical affiliation is retained below.',
  lon:10.8978,lat:48.3705,rarity:2,year:1300,people:18000,populationText:'18.0 K',populationRange:'15–22 K',populationConfidence:'low',
  sizeText:'1.0 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:62,technology:84,stability:70,economyScore:86,
  historicalRole:'Large Swabian imperial city, textile and long-distance trading centre',
  economy:'Textiles, crafts, finance, markets and trans-Alpine trade',
  militaryRole:'Large walled city with strong civic institutions and militia',
  researchSummary:'Augsburg’s citizens had won substantial constitutional independence by the late 13th century, separating the city politically from the bishop’s territorial state represented by Dillingen.',
  evidenceNote:'Population is low-confidence; the city and bishopric are intentionally separate cards.',
  sources:[['Augsburg','https://en.wikipedia.org/wiki/Augsburg'],['Free Imperial City of Augsburg','https://en.wikipedia.org/wiki/Free_Imperial_City_of_Augsburg']]
 },
 {
  id:'1300-strasbourg',name:'Strasbourg',modern:'Strasbourg',country:'Prince-Bishopric of Strasbourg',subrealm:'Unified Strasbourg state · city and bishopric',
  historicalCountry:'Free Imperial City of Strasbourg',historicalSubrealm:'Free city after the 1262 victory over the prince-bishop',gameplayNote:'Political grouping simplified for gameplay; the historical affiliation is retained below.',
  lon:7.7521,lat:48.5734,rarity:2,year:1300,people:20000,populationText:'20.0 K',populationRange:'18–25 K',populationConfidence:'low',
  sizeText:'1.1 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:65,technology:88,stability:76,economyScore:90,
  historicalRole:'Powerful self-governing Rhine city with major trade and cathedral institutions',
  economy:'Rhine trade, crafts, markets, wine and merchant commerce',
  militaryRole:'Heavily fortified urban republic with substantial civic militia',
  researchSummary:'Strasbourg became a free city after defeating its prince-bishop in 1262, making independent civic government fully appropriate in 1300.',
  evidenceNote:'Political status is high confidence; population remains approximate.',
  sources:[['Strasbourg.eu — Free city after 1262','https://int.strasbourg.eu/free-city-germanic-holy-roman-empire'],['Strasbourg city history','https://int.strasbourg.eu/history-of-the-city']]
 },
 {
  id:'1300-speyer',name:'Speyer',modern:'Speyer',country:'County Palatine of the Rhine',subrealm:'Palatinate · gameplay grouping',
  historicalCountry:'Free Imperial City of Speyer',historicalSubrealm:'Free Imperial City since 1294',gameplayNote:'Political grouping simplified for gameplay; the historical affiliation is retained below.',
  lon:8.4342,lat:49.3173,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:61,technology:80,stability:75,economyScore:76,
  historicalRole:'Newly free imperial cathedral and Rhine trading city',
  economy:'Rhine trade, crafts, markets, church institutions and wine',
  militaryRole:'Walled Rhine city with independent civic government',
  researchSummary:'Speyer’s episcopal city lordship ended in 1294, only six years before the game snapshot, when it became a Free Imperial City.',
  evidenceNote:'The 1294 constitutional date is directly documented.',
  sources:[['Speyer official history — Free Imperial City in 1294','https://www.speyer.de/en/tourism/service/downloads/brochures/meeting-place-broschuere-englisch-081121.pdf'],['Speyer','https://en.wikipedia.org/wiki/Speyer']]
 },
 {
  id:'1300-worms',name:'Worms',modern:'Worms',country:'County Palatine of the Rhine',subrealm:'Palatinate · gameplay grouping',
  historicalCountry:'Free Imperial City of Worms',historicalSubrealm:'Imperial city with extensive civic liberties beside its bishopric',gameplayNote:'Political grouping simplified for gameplay; the historical affiliation is retained below.',
  lon:8.3597,lat:49.6341,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:61,technology:77,stability:70,economyScore:74,
  historicalRole:'Ancient Rhine cathedral city with strong imperial and civic institutions',
  economy:'Rhine trade, wine, crafts, markets and church activity',
  militaryRole:'Fortified Rhine city with significant civic autonomy',
  researchSummary:'Worms possessed extensive imperial privileges and a powerful council tradition; around 1300 its civic government was increasingly distinct from the bishop’s authority.',
  evidenceNote:'Population is low-confidence; political status reflects the city’s imperial liberties.',
  sources:[['Worms city history','https://www.worms.de/en/web/luther/Worms_1521/Worms_1521/'],['Worms, Germany','https://en.wikipedia.org/wiki/Worms,_Germany']]
 },
 {
  id:'1300-ulm',name:'Ulm',modern:'Ulm',country:'Free Imperial City of Ulm',subrealm:'Free Imperial City directly attached to emperor and king',
  lon:9.9934,lat:48.4011,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:66,technology:76,stability:76,economyScore:77,
  historicalRole:'Growing Swabian imperial trading city on the Danube',
  economy:'Danube trade, textiles, crafts, markets and regional commerce',
  militaryRole:'Fortified self-governing city with strong civic militia',
  researchSummary:'Ulm maintained direct attachment to king and emperor after the Staufen collapse and developed civic self-government as a Free Imperial City during the 13th century.',
  evidenceNote:'Political status is supported by Ulm’s official city history; population is low-confidence.',
  sources:[['City of Ulm — history','https://www.ulm.de/tourismus/stadtgeschichte/geschichte-der-stadt'],['Ulm historical brochure','https://www.ulm.de/-/media/ulm/zoea/downloads/2016/geschichte-der-stadt_11_2011_engl.pdf']]
 },
 {
  id:'1300-chambery',name:'Chambéry',modern:'Chambéry',country:'Dauphine of Viennois',subrealm:'County of Savoy · principal residence of Amadeus V',
  lon:5.9118,lat:45.5646,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:66,technology:61,stability:72,economyScore:63,
  historicalRole:'Principal political centre of the expanding County of Savoy',
  economy:'Court services, Alpine transit, markets and crafts',
  militaryRole:'Fortified residence controlling routes between France and Italy',
  researchSummary:'Chambéry had become a principal Savoyard residence in the 13th century and was central to Amadeus V’s government around 1300.',
  evidenceNote:'Population is low-confidence; political centrality is well established.',
  sources:[['Chambéry','https://en.wikipedia.org/wiki/Chamb%C3%A9ry'],['County of Savoy','https://en.wikipedia.org/wiki/County_of_Savoy']]
 },
 {
  id:'1300-susa',name:'Susa',modern:'Susa',country:'County of Savoy',subrealm:'County of Savoy · Alpine gateway in the Susa Valley',
  lon:7.0524,lat:45.1362,rarity:0,year:1300,people:3000,populationText:'3.0 K',populationRange:'2–4 K',populationConfidence:'low',
  sizeText:'0.22 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:55,technology:54,stability:69,economyScore:55,
  historicalRole:'Strategic Alpine transit town linking Piedmont with the Mont Cenis route',
  economy:'Tolls, transit trade, markets and mountain agriculture',
  militaryRole:'Small but strategically important Alpine fortress-town',
  researchSummary:'Susa’s importance around 1300 came primarily from its control of Alpine transit rather than population size.',
  evidenceNote:'Population is low-confidence; strategic role is high confidence.',
  sources:[['Susa, Piedmont','https://en.wikipedia.org/wiki/Susa,_Piedmont'],['County of Savoy','https://en.wikipedia.org/wiki/County_of_Savoy']]
 },
 {
  id:'1300-aosta',name:'Aosta',modern:'Aosta',country:'County of Savoy',subrealm:'County of Savoy · autonomous Alpine valley centre',
  lon:7.3201,lat:45.7370,rarity:0,year:1300,people:4500,populationText:'4.5 K',populationRange:'3.5–6 K',populationConfidence:'low',
  sizeText:'0.3 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:60,technology:58,stability:75,economyScore:58,
  historicalRole:'Principal city of the Aosta Valley under Savoyard overlordship',
  economy:'Alpine trade, tolls, church institutions and agriculture',
  militaryRole:'Fortified valley centre controlling Great and Little St Bernard routes',
  researchSummary:'Aosta was part of the Savoyard political sphere while retaining strong local privileges and strategic Alpine importance.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Aosta','https://en.wikipedia.org/wiki/Aosta'],['County of Savoy','https://en.wikipedia.org/wiki/County_of_Savoy']]
 },
 {
  id:'1300-casale-monferrato',name:'Casale Monferrato',modern:'Casale Monferrato',country:'Marquisate of Montferrat',subrealm:'Aleramici Marquisate of Montferrat · Casale di Sant’Evasio',
  lon:8.4527,lat:45.1351,rarity:0,year:1300,people:6000,populationText:'6.0 K',populationRange:'5–8 K',populationConfidence:'low',
  sizeText:'0.4 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:78,technology:61,stability:68,economyScore:63,
  historicalRole:'Important Monferrat town before its later rise as the marquisate’s capital',
  economy:'Agriculture, wine, markets, crafts and Po-basin trade',
  militaryRole:'Fortified regional town within the Montferrat lands',
  researchSummary:'Casale belonged to the Aleramici rulers of Montferrat in 1300, although its later status as the marquisate’s capital had not yet fully developed.',
  evidenceNote:'Population is low-confidence; the card avoids projecting Casale’s later capital status backward.',
  sources:[['Casale Monferrato — castle history','https://comune.casale-monferrato.al.it/la-storia-del-castello-del-monferrato-parte-i/'],['Marquisate of Montferrat','https://en.wikipedia.org/wiki/Marquisate_of_Montferrat']]
 },
 {
  id:'1300-saluzzo',name:'Saluzzo',modern:'Saluzzo',country:'Marquisate of Saluzzo',subrealm:'Marquisate of Saluzzo · capital under Manfred IV',
  lon:7.4911,lat:44.6460,rarity:0,year:1300,people:6000,populationText:'6.0 K',populationRange:'5–8 K',populationConfidence:'low',
  sizeText:'0.4 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:68,technology:60,stability:73,economyScore:61,
  historicalRole:'Capital of an independent Alpine marquisate under Manfred IV',
  economy:'Markets, agriculture, crafts and Alpine-French trade connections',
  militaryRole:'Fortified hill town and dynastic capital',
  researchSummary:'Saluzzo had become the habitual residence and political centre of its marquises by the mid-13th century and was ruled by Manfred IV in 1300.',
  evidenceNote:'Population is low-confidence; capital status is strongly documented.',
  sources:[['Comune di Saluzzo — Il Marchesato di Saluzzo','https://comune.saluzzo.cn.it/vivere-il-comune/storia-e-cultura/il-marchesato-di-saluzzo/'],['Archivio di Stato di Torino — Marchesato di Saluzzo','https://archiviodistatotorino.cultura.gov.it/percorsi-tra-le-carte/storie-d-archivio/marchesato-di-saluzzo/']]
 },
 {
  id:'1300-milan',name:'Milan',modern:'Milan',country:'Lordship of Milan',subrealm:'Visconti Lordship of Milan · ruled by Matteo I Visconti',
  lon:9.1900,lat:45.4642,rarity:4,year:1300,people:100000,populationText:'100 K',populationRange:'90–120 K',populationConfidence:'low',
  sizeText:'2.60 km²',sizeConfidence:'high',army:500,armyText:'500',navy:0,navyText:'0',
  food:84,technology:92,economyScore:96,stability:42,
  historicalRole:'One of northern Italy’s largest cities and the centre of Visconti power',
  economy:'Textiles, metalwork, finance, crafts, markets and Lombard trade',
  militaryRole:'Huge walled city capable of fielding major communal and lordly forces',
  researchSummary:'By 1300 Milan was under Visconti lordship and was already one of the demographic, economic and military giants of northern Italy.',
  evidenceNote:'Population is a broad estimate, but Milan’s medieval defensive circuit is unusually well documented: the post-1162 enclosure covered about 260 hectares, with additional suburbs outside it by 1300.',
  sources:[['Milan','https://en.wikipedia.org/wiki/Milan'],['Visconti of Milan','https://en.wikipedia.org/wiki/Visconti_of_Milan']]
 },
 {
  id:'1300-monza',name:'Monza',modern:'Monza',country:'Lordship of Milan',subrealm:'Visconti Milanese sphere · major Lombard town',
  lon:9.2744,lat:45.5845,rarity:1,year:1300,people:8000,populationText:'8.0 K',populationRange:'6–10 K',populationConfidence:'low',
  sizeText:'0.5 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:75,technology:64,stability:65,economyScore:67,
  historicalRole:'Important town north of Milan with royal and ecclesiastical prestige',
  economy:'Markets, crafts, agriculture and regional trade',
  militaryRole:'Fortified town closely tied to Milan’s political sphere',
  researchSummary:'Monza retained symbolic importance through its royal associations but around 1300 lay within the political orbit of Visconti Milan.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Monza','https://en.wikipedia.org/wiki/Monza'],['Lordship of Milan','https://en.wikipedia.org/wiki/Duchy_of_Milan']]
 },
 {
  id:'1300-como',name:'Como',modern:'Como',country:'Lordship of Milan',subrealm:'Lordship of Milan · Como (gameplay grouping)',
  lon:9.0852,lat:45.8081,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.6 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:66,technology:70,stability:64,economyScore:75,
  historicalRole:'Independent Lombard commune controlling Lake Como trade routes',
  economy:'Lake trade, textiles, crafts and Alpine commerce',
  militaryRole:'Walled lake city with strategic Alpine access',
  researchSummary:'Como remained a distinct communal polity in the fragmented Lombard political landscape around 1300.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Como','https://en.wikipedia.org/wiki/Como'],['Medieval commune','https://en.wikipedia.org/wiki/Medieval_commune']]
 },
 {
  id:'1300-brescia',name:'Brescia',modern:'Brescia',country:'Commune of Brescia',subrealm:'Commune of Brescia · Lombard communal republic',
  lon:10.2118,lat:45.5416,rarity:2,year:1300,people:30000,populationText:'30.0 K',populationRange:'25–35 K',populationConfidence:'low',
  sizeText:'1.2 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:82,technology:79,stability:55,economyScore:85,
  historicalRole:'Large and wealthy Lombard commune between Milan and Verona',
  economy:'Textiles, metalwork, agriculture, crafts and regional trade',
  militaryRole:'Major fortified commune with substantial militia',
  researchSummary:'Brescia was one of Lombardy’s stronger communal cities, with enough wealth and manpower to remain a serious regional actor.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Brescia','https://en.wikipedia.org/wiki/Brescia'],['Medieval commune','https://en.wikipedia.org/wiki/Medieval_commune']]
 },
 {
  id:'1300-pavia',name:'Pavia',modern:'Pavia',country:'Commune of Pavia',subrealm:'Commune of Pavia · Lombard city-state',
  lon:9.1582,lat:45.1847,rarity:2,year:1300,people:20000,populationText:'20.0 K',populationRange:'15–25 K',populationConfidence:'low',
  sizeText:'0.9 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:84,technology:75,stability:58,economyScore:80,
  historicalRole:'Ancient royal city and important Po-region commune',
  economy:'Agriculture, river trade, crafts and markets',
  militaryRole:'Strongly fortified city with prestigious political traditions',
  researchSummary:'Pavia remained a significant autonomous Lombard commune around 1300, even though Milan increasingly dominated the region.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Pavia','https://en.wikipedia.org/wiki/Pavia'],['Medieval commune','https://en.wikipedia.org/wiki/Medieval_commune']]
 },
 {
  id:'1300-cremona',name:'Cremona',modern:'Cremona',country:'Commune of Cremona',subrealm:'Commune of Cremona · Po-valley city-state',
  lon:10.0227,lat:45.1332,rarity:2,year:1300,people:25000,populationText:'25.0 K',populationRange:'20–30 K',populationConfidence:'low',
  sizeText:'1.0 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:88,technology:74,stability:58,economyScore:84,
  historicalRole:'Prosperous agricultural and commercial Lombard commune',
  economy:'Po trade, grain, crafts, textiles and agriculture',
  militaryRole:'Large fortified commune with important Po access',
  researchSummary:'Cremona was one of the major communal cities of the central Po valley around 1300.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Cremona','https://en.wikipedia.org/wiki/Cremona'],['Medieval commune','https://en.wikipedia.org/wiki/Medieval_commune']]
 },
 {
  id:'1300-alessandria',name:'Alessandria',modern:'Alessandria',country:'Commune of Alessandria',subrealm:'Commune of Alessandria · fortified anti-imperial foundation',
  lon:8.6158,lat:44.9120,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.6 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:85,technology:62,stability:64,economyScore:68,
  historicalRole:'Strategic Piedmontese commune founded by the Lombard League',
  economy:'Agriculture, markets, crafts and route trade',
  militaryRole:'Purposefully fortified communal city at a strategic crossroads',
  researchSummary:'Alessandria’s communal identity and defensive origins remained central to its importance around 1300.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Alessandria','https://en.wikipedia.org/wiki/Alessandria'],['Lombard League','https://en.wikipedia.org/wiki/Lombard_League']]
 },
 {
  id:'1300-piacenza',name:'Piacenza',modern:'Piacenza',country:'Commune of Piacenza',subrealm:'Commune of Piacenza · Po commercial city-state',
  lon:9.6930,lat:45.0526,rarity:2,year:1300,people:20000,populationText:'20.0 K',populationRange:'15–25 K',populationConfidence:'low',
  sizeText:'0.85 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:87,technology:73,stability:58,economyScore:83,
  historicalRole:'Major Po crossing and commercial commune',
  economy:'River trade, grain, textiles, crafts and markets',
  militaryRole:'Strong fortified Po city with significant militia',
  researchSummary:'Piacenza remained an important commune positioned on the Via Francigena and the Po.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Piacenza','https://en.wikipedia.org/wiki/Piacenza'],['Medieval commune','https://en.wikipedia.org/wiki/Medieval_commune']]
 },
 {
  id:'1300-parma',name:'Parma',modern:'Parma',country:'Commune of Parma',subrealm:'Commune of Parma · Emilian communal city',
  lon:10.3279,lat:44.8015,rarity:2,year:1300,people:18000,populationText:'18.0 K',populationRange:'15–22 K',populationConfidence:'low',
  sizeText:'0.8 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:90,technology:72,stability:60,economyScore:82,
  historicalRole:'Important Emilian commune with strong agricultural hinterland',
  economy:'Agriculture, food production, crafts, markets and road trade',
  militaryRole:'Fortified commune controlling routes across Emilia',
  researchSummary:'Parma combined rich agricultural surroundings with a strong communal urban tradition around 1300.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Parma','https://en.wikipedia.org/wiki/Parma'],['Medieval commune','https://en.wikipedia.org/wiki/Medieval_commune']]
 },
 {
  id:'1300-verona',name:'Verona',modern:'Verona',country:'Lordship of Verona',subrealm:'Scaliger Lordship of Verona · ruled by Bartolomeo I della Scala',
  lon:10.9916,lat:45.4384,rarity:3,year:1300,people:30000,populationText:'30.0 K',populationRange:'25–35 K',populationConfidence:'low',
  sizeText:'1.2 km²',sizeConfidence:'low',army:300,armyText:'300',navy:0,navyText:'0',
  food:82,technology:80,stability:68,economyScore:87,
  historicalRole:'Powerful north-Italian lordship at a strategic Adige crossing',
  economy:'Trade, textiles, crafts, agriculture and Alpine-route commerce',
  militaryRole:'Major fortified city under the militarily ambitious Scaliger dynasty',
  researchSummary:'Verona was already under della Scala lordship by 1300 and was becoming one of northeastern Italy’s strongest territorial powers.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Verona','https://en.wikipedia.org/wiki/Verona'],['Scaliger','https://en.wikipedia.org/wiki/Scaliger']]
 },
 {
  id:'1300-padua',name:'Padua',modern:'Padua',country:'Commune of Padua',subrealm:'Commune of Padua · major autonomous city before the Carraresi signoria',
  lon:11.8768,lat:45.4064,rarity:3,year:1300,people:30000,populationText:'30.0 K',populationRange:'25–35 K',populationConfidence:'low',
  sizeText:'1.2 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:84,technology:97,stability:62,economyScore:90,
  historicalRole:'Large Venetian-region commune and major university city',
  economy:'University, markets, agriculture, crafts and regional trade',
  militaryRole:'Powerful fortified commune with extensive contado',
  researchSummary:'Padua combined communal government with the University of Padua, founded in 1222, giving the city exceptional intellectual weight.',
  evidenceNote:'Population is low-confidence; Technology is high because the university already existed in 1300.',
  sources:[['Padua','https://en.wikipedia.org/wiki/Padua'],['University of Padua','https://en.wikipedia.org/wiki/University_of_Padua']]
 },
 {
  id:'1300-vicenza',name:'Vicenza',modern:'Vicenza',country:'Commune of Padua',subrealm:'Vicenza · under Paduan political dominance around 1300',
  lon:11.5403,lat:45.5455,rarity:1,year:1300,people:15000,populationText:'15.0 K',populationRange:'12–18 K',populationConfidence:'low',
  sizeText:'0.7 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:80,technology:67,stability:52,economyScore:72,
  historicalRole:'Prosperous but politically subordinated city in the Paduan sphere',
  economy:'Textiles, crafts, agriculture and regional trade',
  militaryRole:'Fortified city on contested routes between Padua and Verona',
  researchSummary:'Vicenza had lost much of its earlier communal independence and around 1300 lay under strong Paduan control.',
  evidenceNote:'Population is low-confidence; lower Satisfaction reflects its subordinated political position.',
  sources:[['Vicenza','https://en.wikipedia.org/wiki/Vicenza'],['Padua','https://en.wikipedia.org/wiki/Padua']]
 },
 {
  id:'1300-mantua',name:'Mantua',modern:'Mantua',country:'Lordship of Mantua',subrealm:'Bonacolsi Lordship of Mantua · ruled by Guido Bonacolsi',
  lon:10.7914,lat:45.1564,rarity:1,year:1300,people:15000,populationText:'15.0 K',populationRange:'12–18 K',populationConfidence:'low',
  sizeText:'0.75 km²',sizeConfidence:'low',army:200,armyText:'200',navy:0,navyText:'0',
  food:86,technology:70,stability:64,economyScore:75,
  historicalRole:'Independent Lombard lordship under the Bonacolsi dynasty',
  economy:'Agriculture, river/lake trade, crafts and regional markets',
  militaryRole:'Naturally defensible lake city with strong lordly fortifications',
  researchSummary:'Mantua was ruled by the Bonacolsi in 1300, before the Gonzaga takeover of 1328.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Mantua','https://en.wikipedia.org/wiki/Mantua'],['Bonacolsi','https://en.wikipedia.org/wiki/Bonacolsi']]
 },
 {
  id:'1300-ferrara',name:'Ferrara',modern:'Ferrara',country:'Marquisate of Ferrara',subrealm:'Este Lordship / Marquisate of Ferrara · under Azzo VIII d’Este',
  lon:11.6198,lat:44.8381,rarity:2,year:1300,people:20000,populationText:'20.0 K',populationRange:'15–25 K',populationConfidence:'low',
  sizeText:'0.9 km²',sizeConfidence:'low',army:250,armyText:'250',navy:0,navyText:'0',
  food:88,technology:75,stability:61,economyScore:81,
  historicalRole:'Este dynastic capital controlling a strategic lower-Po region',
  economy:'Po trade, agriculture, crafts, markets and lordly administration',
  militaryRole:'Strong river city and dynastic power base',
  researchSummary:'Ferrara was firmly dominated by the House of Este around 1300 under Azzo VIII.',
  evidenceNote:'Population is low-confidence; dynastic ownership is high confidence.',
  sources:[['Ferrara','https://en.wikipedia.org/wiki/Ferrara'],['House of Este','https://en.wikipedia.org/wiki/House_of_Este']]
 },
 {
  id:'1300-modena',name:'Modena',modern:'Modena',country:'Lordship of Modena',subrealm:'Este Lordship of Modena',
  lon:10.9252,lat:44.6471,rarity:1,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–15 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:85,technology:66,stability:57,economyScore:72,
  historicalRole:'Important Emilian city under Este lordship',
  economy:'Agriculture, crafts, markets and regional road trade',
  militaryRole:'Fortified city supporting Este territorial ambitions',
  researchSummary:'Modena had passed under Este domination in the late 13th century and formed part of the dynasty’s expanding Emilian power.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Modena','https://en.wikipedia.org/wiki/Modena'],['House of Este','https://en.wikipedia.org/wiki/House_of_Este']]
 },
 {
  id:'1300-bologna',name:'Bologna',modern:'Bologna',country:'Commune of Bologna',subrealm:'Commune of Bologna · major university republic',
  lon:11.3426,lat:44.4949,rarity:3,year:1300,people:50000,populationText:'50.0 K',populationRange:'50–60 K',populationConfidence:'high',
  sizeText:'4.00 km²',sizeConfidence:'high',army:200,armyText:'200',navy:0,navyText:'0',
  food:83,technology:100,economyScore:94,stability:55,
  historicalRole:'One of Italy’s largest communes and the leading university city of Latin Europe',
  economy:'University, law, textiles, crafts, markets and long-distance trade',
  militaryRole:'Very large walled commune with major militia capacity',
  researchSummary:'Late-13th-century fiscal records place Bologna near its demographic peak; the University of Bologna made it one of Europe’s premier intellectual centres.',
  evidenceNote:'Population is based on scholarly estimates around 50–60K. Bologna’s third defensive circuit, begun in 1226, defined an urban area of about 400 hectares.',
  sources:[['Cambridge Urban History — Bologna 1287–1383','https://www.cambridge.org/core/journals/urban-history/article/dynamics-of-healthscaping-mapping-communal-hygiene-in-bologna-12871383/E4FA1704EF3CED66E8AE8B1E965E2A48'],['Bologna','https://en.wikipedia.org/wiki/Bologna']]
 },
 {
  id:'1300-udine',name:'Udine',modern:'Udine',country:'Patriarchate of Aquileia',subrealm:'Patriarchate of Aquileia · growing inland patriarchal centre',
  lon:13.2346,lat:46.0711,rarity:0,year:1300,people:8000,populationText:'8.0 K',populationRange:'6–10 K',populationConfidence:'low',
  sizeText:'0.5 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:72,technology:62,stability:68,economyScore:66,
  historicalRole:'Growing political and commercial centre of the Aquileian patriarchal state',
  economy:'Markets, crafts, agriculture and trans-Alpine trade',
  militaryRole:'Fortified inland centre increasingly important to the patriarchs',
  researchSummary:'Udine’s importance was rising around 1300 and it would later replace Aquileia as the patriarchate’s practical centre.',
  evidenceNote:'Population is low-confidence; later capital status is not projected backward.',
  sources:[['Udine','https://en.wikipedia.org/wiki/Udine'],['Patriarchate of Aquileia','https://en.wikipedia.org/wiki/Patriarchate_of_Aquileia']]
 },
 {
  id:'1300-aquileia',name:'Aquileia',modern:'Aquileia',country:'Patriarchate of Aquileia',subrealm:'Patriarchate of Aquileia · historic ecclesiastical seat',
  lon:13.3700,lat:45.7686,rarity:0,year:1300,people:4000,populationText:'4.0 K',populationRange:'3–5 K',populationConfidence:'low',
  sizeText:'0.3 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:68,technology:70,stability:62,economyScore:55,
  historicalRole:'Ancient patriarchal seat with enormous ecclesiastical prestige but reduced urban scale',
  economy:'Church institutions, agriculture, pilgrimage and regional trade',
  militaryRole:'Symbolically important but no longer a major demographic fortress-city',
  researchSummary:'Aquileia remained the nominal patriarchal seat in 1300 even as its practical urban importance had declined.',
  evidenceNote:'Population is low-confidence; ecclesiastical importance is high confidence.',
  sources:[['Aquileia','https://en.wikipedia.org/wiki/Aquileia'],['Patriarchate of Aquileia','https://en.wikipedia.org/wiki/Patriarchate_of_Aquileia']]
 },
 {
  id:'1300-cividale',name:'Cividale del Friuli',modern:'Cividale del Friuli',country:'Patriarchate of Aquileia',subrealm:'Patriarchate of Aquileia · major Friulian town',
  lon:13.4320,lat:46.0907,rarity:0,year:1300,people:6000,populationText:'6.0 K',populationRange:'5–8 K',populationConfidence:'low',
  sizeText:'0.4 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:70,technology:65,stability:67,economyScore:62,
  historicalRole:'Important Friulian town with Lombard and patriarchal traditions',
  economy:'Markets, crafts, agriculture and Alpine-route commerce',
  militaryRole:'Fortified town close to eastern Alpine routes',
  researchSummary:'Cividale remained one of the patriarchate’s most important urban centres around 1300.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Cividale del Friuli','https://en.wikipedia.org/wiki/Cividale_del_Friuli'],['Patriarchate of Aquileia','https://en.wikipedia.org/wiki/Patriarchate_of_Aquileia']]
 },
 {
  id:'1300-gorizia',name:'Gorizia',modern:'Gorizia',country:'County of Gorizia',subrealm:'County of Gorizia · comital castle-town',
  lon:13.6202,lat:45.9402,rarity:0,year:1300,people:4000,populationText:'4.0 K',populationRange:'3–5 K',populationConfidence:'low',
  sizeText:'0.3 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:67,technology:55,stability:72,economyScore:57,
  historicalRole:'Capital of the increasingly influential Counts of Gorizia',
  economy:'Court services, agriculture, markets and Alpine-Adriatic transit',
  militaryRole:'Castle-dominated frontier town between Friuli and the Alpine lands',
  researchSummary:'Gorizia was the dynastic centre of its own county and a useful power between the Patriarchate of Aquileia and the eastern Alps.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Gorizia','https://en.wikipedia.org/wiki/Gorizia'],['County of Gorizia','https://en.wikipedia.org/wiki/County_of_Gorizia']]
 },
 {
  id:'1300-venice',name:'Venice',modern:'Venice',country:'Republic of Venice',subrealm:'Most Serene Republic of Venice · Doge Pietro Gradenigo',
  lon:12.3155,lat:45.4408,rarity:4,year:1300,people:110000,populationText:'110 K',populationRange:'100–130 K',populationConfidence:'medium',
  sizeText:'4.5 km²',sizeConfidence:'low',army:200,armyText:'200',navy:100,navyText:'100',
  food:88,technology:98,economyScore:100,stability:86,
  historicalRole:'Mediterranean maritime superpower and one of Europe’s largest cities',
  economy:'Shipping, finance, luxury goods, salt, eastern trade, shipbuilding and crafts',
  militaryRole:'Exceptional naval and commercial power centred on the Arsenal and lagoon defenses',
  researchSummary:'Around 1300 Venice was at or near the demographic peak of its high-medieval expansion and dominated a vast commercial network across the Adriatic and eastern Mediterranean.',
  evidenceNote:'Population above 100,000 around the start of the 14th century is well supported. Immediately after the 1299 peace with Genoa, contemporary reconstruction puts the Venetian fleet at roughly 100 galleys available to the military authorities.',
  sources:[['Treccani — medieval urban development of Venice','https://www.treccani.it/enciclopedia/la-conquista-e-l-organizzazione-dello-spazio-urbano_%28Storia-di-Venezia%29/'],['Republic of Venice','https://en.wikipedia.org/wiki/Republic_of_Venice']]
 },
 {
  id:'1300-chioggia',name:'Chioggia',modern:'Chioggia',country:'Republic of Venice',subrealm:'Republic of Venice · lagoon port and salt centre',
  lon:12.2790,lat:45.2180,mapLon:12.1800,mapLat:45.2200,rarity:1,year:1300,people:8000,populationText:'8.0 K',populationRange:'6–10 K',populationConfidence:'low',
  sizeText:'0.45 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:74,technology:60,stability:76,economyScore:69,
  historicalRole:'Important lagoon port and salt-producing community of Venice',
  economy:'Salt, fisheries, lagoon shipping and regional trade',
  militaryRole:'Useful maritime outpost guarding the southern lagoon',
  researchSummary:'Chioggia was smaller than Venice but strategically and economically valuable because of salt and lagoon access.',
  evidenceNote:'Population is low-confidence. Chioggia was an important lagoon and salt port, but its local merchant and service craft are not counted as a separate permanent military fleet from Venice.',
  sources:[['Chioggia','https://en.wikipedia.org/wiki/Chioggia'],['Republic of Venice','https://en.wikipedia.org/wiki/Republic_of_Venice']]
 },
 {
  id:'1300-genoa',name:'Genoa',modern:'Genoa',country:'Republic of Genoa',subrealm:'Republic of Genoa · major Mediterranean maritime republic',
  lon:8.9463,lat:44.4056,rarity:4,year:1300,people:100000,populationText:'100 K',populationRange:'80–110 K',populationConfidence:'low',
  sizeText:'0.55 km²',sizeConfidence:'medium',army:200,armyText:'200',navy:50,navyText:'50',
  food:72,technology:95,economyScore:99,stability:38,
  historicalRole:'Mediterranean naval and commercial superpower rivaling Venice',
  economy:'Shipping, banking, Black Sea trade, textiles, finance and shipbuilding',
  militaryRole:'Exceptional naval republic with large merchant and war fleets',
  researchSummary:'Genoa around 1300 was one of the Mediterranean’s dominant maritime powers, with colonies and commercial networks reaching the Black Sea.',
  evidenceNote:'Population estimates for Genoa around 1300 vary widely. The Barbarossa wall circuit still defining the fortified city around 1300 enclosed roughly 55 hectares; the major new wall extensions began only in 1320.',
  sources:[['Genoa','https://en.wikipedia.org/wiki/Genoa'],['Republic of Genoa','https://en.wikipedia.org/wiki/Republic_of_Genoa']]
 },
 {
  id:'1300-florence',name:'Florence',modern:'Florence',country:'Republic of Florence',subrealm:'Florentine Republic · merchant and banking powerhouse',
  lon:11.2558,lat:43.7696,rarity:4,year:1300,people:95000,populationText:'95.0 K',populationRange:'90–105 K',populationConfidence:'medium',
  sizeText:'6.00 km²',sizeConfidence:'medium',army:300,armyText:'300',navy:0,navyText:'0',
  food:80,technology:96,economyScore:100,stability:48,
  historicalRole:'One of Europe’s largest cities and a leading banking, cloth and commercial republic',
  economy:'Banking, wool, cloth finishing, finance, crafts and international trade',
  militaryRole:'Huge urban militia and wealthy republic capable of sustained regional warfare',
  researchSummary:'Around 1300 Florence was near 100,000 inhabitants and at the centre of a rapidly expanding financial and textile economy.',
  evidenceNote:'Population around 1300 is debated but Florence was near the 100,000 order of magnitude. The Arnolfian wall circuit begun in 1284 defined the greatly enlarged early-14th-century city, commonly estimated at about 600 hectares.',
  sources:[['ScienceDirect — population of Florence before the Black Death','https://www.sciencedirect.com/science/article/pii/S0304418102000027'],['Princeton Dante Project — Fiorenza demographic estimates','https://dante.princeton.edu/cgi-bin/dante/DispToynbeeByTitOrId.pl?INP_ID=212654']]
 },
 {
  id:'1300-pisa',name:'Pisa',modern:'Pisa',country:'Republic of Pisa',subrealm:'Republic of Pisa · maritime republic after the Meloria defeat',
  lon:10.4017,lat:43.7228,rarity:3,year:1300,people:40000,populationText:'40.0 K',populationRange:'35–45 K',populationConfidence:'low',
  sizeText:'1.6 km²',sizeConfidence:'low',army:200,armyText:'200',navy:5,navyText:'5',
  food:70,technology:84,economyScore:86,stability:40,
  historicalRole:'Still-powerful Tuscan maritime republic recovering from its 1284 defeat by Genoa',
  economy:'Mediterranean shipping, trade, crafts, finance and Tuscan commerce',
  militaryRole:'Major naval republic whose fleet was weakened but still substantial',
  researchSummary:'Pisa remained a major city and naval power in 1300, although the Battle of Meloria in 1284 had badly damaged its maritime supremacy.',
  evidenceNote:'Population is low-confidence. Navy is deliberately conservative: Pisa’s fleet was devastated at Meloria in 1284 and Porto Pisano was badly damaged by Genoa in 1290, so its 1300 naval strength was far below its pre-1284 peak.',
  sources:[['Pisa','https://en.wikipedia.org/wiki/Pisa'],['Republic of Pisa','https://en.wikipedia.org/wiki/Republic_of_Pisa']]
 },
 {
  id:'1300-lucca',name:'Lucca',modern:'Lucca',country:'Republic of Lucca',subrealm:'Republic of Lucca · independent Tuscan commune',
  lon:10.5027,lat:43.8429,rarity:2,year:1300,people:20000,populationText:'20.0 K',populationRange:'15–25 K',populationConfidence:'low',
  sizeText:'0.9 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:76,technology:78,stability:74,economyScore:87,
  historicalRole:'Independent Tuscan merchant republic with a strong silk and banking economy',
  economy:'Silk, banking, crafts, markets and long-distance trade',
  militaryRole:'Walled commune with substantial civic militia',
  researchSummary:'Lucca remained a wealthy autonomous republic around 1300 and was one of Tuscany’s important commercial cities.',
  evidenceNote:'Population is low-confidence; political independence and mercantile importance are well established.',
  sources:[['Lucca','https://en.wikipedia.org/wiki/Lucca'],['Republic of Lucca','https://en.wikipedia.org/wiki/Republic_of_Lucca']]
 },
 {
  id:'1300-siena',name:'Siena',modern:'Siena',country:'Republic of Siena',subrealm:'Republic of Siena · wealthy Tuscan commune',
  lon:11.3308,lat:43.3188,rarity:3,year:1300,people:50000,populationText:'50.0 K',populationRange:'45–55 K',populationConfidence:'medium',
  sizeText:'1.5 km²',sizeConfidence:'low',army:200,armyText:'200',navy:0,navyText:'0',
  food:82,technology:90,economyScore:94,stability:72,
  historicalRole:'Major Tuscan banking, commercial and artistic republic',
  economy:'Banking, wool, trade, crafts and agriculture',
  militaryRole:'Large fortified republic with strong urban militia',
  researchSummary:'Siena was near the height of its medieval prosperity around 1300, with major banking houses, trade and civic building activity.',
  evidenceNote:'Population is a medium-confidence rounded estimate; exact totals remain debated.',
  sources:[['Siena','https://en.wikipedia.org/wiki/Siena'],['Republic of Siena','https://en.wikipedia.org/wiki/Republic_of_Siena']]
 },
 {
  id:'1300-ravenna',name:'Ravenna',modern:'Ravenna',country:'Lordship of Ravenna',subrealm:'Da Polenta Lordship of Ravenna',
  lon:12.2035,lat:44.4184,rarity:1,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–15 K',populationConfidence:'low',
  sizeText:'0.7 km²',sizeConfidence:'low',army:150,armyText:'150',navy:0,navyText:'0',
  food:74,technology:70,stability:68,economyScore:70,
  historicalRole:'Historic Adriatic city ruled by the da Polenta family',
  economy:'Agriculture, crafts, church wealth and Adriatic trade',
  militaryRole:'Fortified lordship city with limited maritime capacity',
  researchSummary:'The da Polenta family had controlled Ravenna since the late 13th century, making a lordship label appropriate for 1300.',
  evidenceNote:'Population is low-confidence. Maritime access does not by itself demonstrate a dedicated permanent war fleet in 1300.',
  sources:[['Ravenna','https://en.wikipedia.org/wiki/Ravenna'],['Da Polenta','https://en.wikipedia.org/wiki/Da_Polenta']]
 },
 {
  id:'1300-rimini',name:'Rimini',modern:'Rimini',country:'Lordship of Rimini',subrealm:'Malatesta Lordship of Rimini',
  lon:12.5683,lat:44.0678,rarity:1,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–15 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:250,armyText:'250',navy:0,navyText:'0',
  food:72,technology:66,stability:64,economyScore:68,
  historicalRole:'Adriatic lordship and power base of the Malatesta family',
  economy:'Adriatic trade, agriculture, crafts and markets',
  militaryRole:'Fortified coastal city under a militarised signorial dynasty',
  researchSummary:'The Malatesta had established durable control over Rimini by the end of the 13th century.',
  evidenceNote:'Population is low-confidence. The Malatesta lordship was militarised on land, but the card does not count ordinary coastal shipping as a standing Navy.',
  sources:[['Rimini','https://en.wikipedia.org/wiki/Rimini'],['House of Malatesta','https://en.wikipedia.org/wiki/House_of_Malatesta']]
 },
 {
  id:'1300-urbino',name:'Urbino',modern:'Urbino',country:'Lordship of Urbino',subrealm:'Montefeltro Lordship / County of Urbino',
  lon:12.6372,lat:43.7263,rarity:0,year:1300,people:7000,populationText:'7.0 K',populationRange:'5–9 K',populationConfidence:'low',
  sizeText:'0.45 km²',sizeConfidence:'low',army:250,armyText:'250',navy:0,navyText:'0',
  food:64,technology:62,stability:66,economyScore:58,
  historicalRole:'Hilltop political centre of the Montefeltro family',
  economy:'Court services, agriculture, crafts and regional trade',
  militaryRole:'Highly defensible hill city with strong military traditions',
  researchSummary:'Urbino formed the core of Montefeltro power around 1300 and is best represented as a small but militarily significant lordship.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Urbino','https://en.wikipedia.org/wiki/Urbino'],['House of Montefeltro','https://en.wikipedia.org/wiki/House_of_Montefeltro']]
 },
 {
  id:'1300-ancona',name:'Ancona',modern:'Ancona',country:'Commune of Ancona',subrealm:'Maritime Commune of Ancona',
  lon:13.5189,lat:43.6158,mapLon:13.4800,mapLat:43.6000,rarity:2,year:1300,people:15000,populationText:'15.0 K',populationRange:'12–18 K',populationConfidence:'low',
  sizeText:'0.75 km²',sizeConfidence:'low',army:100,armyText:'100',navy:6,navyText:'6',
  food:70,technology:74,stability:70,economyScore:79,
  historicalRole:'Autonomous Adriatic maritime commune with eastern Mediterranean trade',
  economy:'Shipping, trade, fisheries, crafts and markets',
  militaryRole:'Fortified port with a meaningful merchant and naval fleet',
  researchSummary:'Ancona maintained a strong communal and maritime identity, balancing papal claims with practical self-government.',
  evidenceNote:'Population is low-confidence. Ancona was a genuine maritime republic and could provide crewed combat vessels, but Navy is kept conservative rather than equating its whole merchant marine with a permanent war fleet.',
  sources:[['Ancona','https://en.wikipedia.org/wiki/Ancona'],['Republic of Ancona','https://en.wikipedia.org/wiki/Republic_of_Ancona']]
 },
 {
  id:'1300-perugia',name:'Perugia',modern:'Perugia',country:'Commune of Perugia',subrealm:'Commune of Perugia · papal-aligned but self-governing',
  lon:12.3908,lat:43.1107,rarity:2,year:1300,people:30000,populationText:'30.0 K',populationRange:'25–35 K',populationConfidence:'low',
  sizeText:'1.2 km²',sizeConfidence:'low',army:150,armyText:'150',navy:0,navyText:'0',
  food:78,technology:80,stability:63,economyScore:83,
  historicalRole:'Large Umbrian commune with strong civic institutions',
  economy:'Textiles, agriculture, markets, crafts and regional finance',
  militaryRole:'Strong hilltop commune with substantial militia',
  researchSummary:'Perugia was one of central Italy’s strongest communes, formally within the papal sphere but exercising considerable self-government.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Perugia','https://en.wikipedia.org/wiki/Perugia'],['History of Perugia','https://en.wikipedia.org/wiki/Perugia#History']]
 },
 {
  id:'1300-san-marino',name:'San Marino',modern:'San Marino',country:'Republic of San Marino',subrealm:'Commune of San Marino · autonomous mountain republic',
  lon:12.4578,lat:43.9424,rarity:0,year:1300,people:1500,populationText:'1.5 K',populationRange:'1–2 K',populationConfidence:'low',
  sizeText:'0.10 km²',sizeConfidence:'low',army:0,armyText:'0',navy:0,navyText:'0',
  food:68,technology:45,stability:100,economyScore:42,
  historicalRole:'Tiny autonomous mountain commune with strong communal traditions',
  economy:'Pastoral agriculture, local crafts and small markets',
  militaryRole:'Very small militia protected by difficult mountain terrain',
  researchSummary:'San Marino was already functioning as an autonomous commune by the late 13th century and is included as a deliberately tiny but distinctive polity.',
  evidenceNote:'People is low-confidence; high Satisfaction represents communal autonomy as a gameplay abstraction.',
  sources:[['San Marino','https://en.wikipedia.org/wiki/San_Marino'],['History of San Marino','https://en.wikipedia.org/wiki/History_of_San_Marino']]
 },
 {
  id:'1300-rome',name:'Rome',modern:'Rome',country:'Papal States',subrealm:'Papal States · city of Pope Boniface VIII and the 1300 Jubilee',
  lon:12.4964,lat:41.9028,rarity:3,year:1300,people:20000,populationText:'20.0 K',populationRange:'18–22 K',populationConfidence:'high',
  sizeText:'2.0 km²',sizeConfidence:'low',army:200,armyText:'200',navy:0,navyText:'0',
  food:55,technology:90,economyScore:78,stability:35,
  historicalRole:'Spiritual centre of Latin Christianity and capital of the papal state',
  economy:'Pilgrimage, church institutions, markets, crafts and elite services',
  militaryRole:'Large but politically factional city protected by walls, towers and noble strongholds',
  researchSummary:'Rome in 1300 hosted the first papal Jubilee under Boniface VIII, drawing enormous pilgrim traffic despite intense factional politics.',
  evidenceNote:'Treccani’s account of the 1300 Jubilee places Rome’s resident population at roughly 20,000; the enormous pilgrim influx that year is transient and is not included in People.',
  sources:[['Rome','https://en.wikipedia.org/wiki/Rome'],['Pope Boniface VIII','https://www.treccani.it/enciclopedia/bonifacio-viii_%28Enciclopedia-dei-Papi%29/']]
 },
 {
  id:'1300-viterbo',name:'Viterbo',modern:'Viterbo',country:'Papal States',subrealm:'Papal States · major papal and Tuscia city',
  lon:12.1077,lat:42.4207,rarity:2,year:1300,people:15000,populationText:'15.0 K',populationRange:'12–18 K',populationConfidence:'low',
  sizeText:'0.8 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:70,technology:78,stability:58,economyScore:72,
  historicalRole:'Important papal residence city in the Patrimony of St Peter',
  economy:'Church institutions, markets, crafts and agriculture',
  militaryRole:'Strongly walled city with strategic importance north of Rome',
  researchSummary:'Viterbo remained one of the most important papal cities of central Italy around 1300 even when the pope was not resident there.',
  evidenceNote:'Population is low-confidence.',
  sources:[['Viterbo','https://en.wikipedia.org/wiki/Viterbo'],['Papal States','https://en.wikipedia.org/wiki/Papal_States']]
 },
 {
  id:'1300-benevento',name:'Benevento',modern:'Benevento',country:'Papal States',subrealm:'Papal enclave of Benevento inside the Kingdom of Naples',
  lon:14.7822,lat:41.1298,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.6 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:72,technology:67,stability:57,economyScore:62,
  historicalRole:'Papal enclave and strategic southern Italian city surrounded by Angevin territory',
  economy:'Markets, agriculture, crafts and church administration',
  militaryRole:'Fortified enclave guarding an important route through Campania',
  researchSummary:'Benevento remained a papal enclave in southern Italy rather than part of the Angevin Kingdom of Naples.',
  evidenceNote:'Population is low-confidence; papal enclave status is well documented.',
  sources:[['Treccani — Benevento','https://www.treccani.it/enciclopedia/benevento_%28Federiciana%29/'],['Benevento','https://en.wikipedia.org/wiki/Benevento']]
 },
 {
  id:'1300-naples',name:'Naples',modern:'Naples',country:'Kingdom of Naples',subrealm:'Angevin Kingdom of Naples · capital of Charles II',
  lon:14.2681,lat:40.8518,mapLon:14.2200,mapLat:40.8600,rarity:4,year:1300,people:60000,populationText:'60.0 K',populationRange:'50–70 K',populationConfidence:'low',
  sizeText:'2.2 km²',sizeConfidence:'low',army:500,armyText:'500',navy:25,navyText:'25',
  food:84,technology:85,economyScore:91,stability:70,
  historicalRole:'Capital of the Angevin mainland kingdom and one of the Mediterranean’s largest royal cities',
  economy:'Court, Mediterranean shipping, markets, crafts, finance and regional trade',
  militaryRole:'Major royal port, fortress and administrative centre',
  researchSummary:'Naples had become the Angevin capital after the Sicilian Vespers and was the political centre of Charles II’s mainland kingdom.',
  evidenceNote:'Population is low-confidence; capital status is high confidence.',
  sources:[['Naples','https://en.wikipedia.org/wiki/Naples'],['Kingdom of Naples','https://en.wikipedia.org/wiki/Kingdom_of_Naples']]
 },
 {
  id:'1300-salerno',name:'Salerno',modern:'Salerno',country:'Kingdom of Naples',subrealm:'Angevin Kingdom of Naples · Campanian port',
  lon:14.7681,lat:40.6824,mapLon:14.7300,mapLat:40.7000,rarity:1,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–15 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:80,technology:82,stability:66,economyScore:73,
  historicalRole:'Important Campanian port with enduring medical and commercial traditions',
  economy:'Shipping, markets, crafts, agriculture and medical learning',
  militaryRole:'Fortified coastal city with useful port capacity',
  researchSummary:'Salerno remained an important secondary city of the Angevin kingdom, though its famous medical school was past its earlier peak.',
  evidenceNote:'Population is low-confidence. Salerno had coastal commerce, but no separate standing war fleet is evidenced strongly enough to count under the conservative Navy definition.',
  sources:[['Salerno','https://en.wikipedia.org/wiki/Salerno'],['Kingdom of Naples','https://en.wikipedia.org/wiki/Kingdom_of_Naples']]
 },
 {
  id:'1300-bari',name:'Bari',modern:'Bari',country:'Kingdom of Naples',subrealm:'Angevin Kingdom of Naples · Adriatic Apulian port',
  lon:16.8719,lat:41.1171,rarity:2,year:1300,people:15000,populationText:'15.0 K',populationRange:'12–18 K',populationConfidence:'low',
  sizeText:'0.75 km²',sizeConfidence:'low',army:150,armyText:'150',navy:4,navyText:'4',
  food:82,technology:70,stability:68,economyScore:78,
  historicalRole:'Major Adriatic port and pilgrimage city of Apulia',
  economy:'Shipping, pilgrimage, grain, olive oil, crafts and trade',
  militaryRole:'Fortified port with useful Adriatic naval capacity',
  researchSummary:'Bari was one of the main Adriatic ports of the Angevin kingdom and remained important through trade and the shrine of St Nicholas.',
  evidenceNote:'Population is low-confidence. Apulian ports supplied substantial Angevin naval forces, but Bari’s Navy is kept to a small conservative dedicated component rather than the wider regional mobilisation.',
  sources:[['Bari','https://en.wikipedia.org/wiki/Bari'],['Kingdom of Naples','https://en.wikipedia.org/wiki/Kingdom_of_Naples']]
 },
 {
  id:'1300-laquila',name:'L’Aquila',modern:'L’Aquila',country:'Kingdom of Naples',subrealm:'Angevin Kingdom of Naples · communal mountain city rebuilt under Charles I',
  lon:13.3995,lat:42.3498,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'1.57 km²',sizeConfidence:'high',army:0,armyText:'0',navy:0,navyText:'0',
  food:66,technology:62,stability:74,economyScore:64,
  historicalRole:'Young but rapidly growing communal city in the Abruzzi',
  economy:'Wool, agriculture, markets and trans-Apennine trade',
  militaryRole:'Strong mountain city with broad communal manpower',
  researchSummary:'L’Aquila had been founded in the 13th century, destroyed by Manfred and rebuilt under Angevin rule; by 1300 it was already an important Abruzzese centre.',
  evidenceNote:'Population is low-confidence. The Angevin wall circuit begun in the 1270s and completed in 1316 enclosed about 157 hectares; around 1300 much of that planned area was still sparsely built.',
  sources:[['L’Aquila','https://en.wikipedia.org/wiki/L%27Aquila'],['Kingdom of Naples','https://en.wikipedia.org/wiki/Kingdom_of_Naples']]
 },
 {
  id:'1300-taranto',name:'Taranto',modern:'Taranto',country:'Kingdom of Naples',subrealm:'Principality of Taranto · held by Philip I, son of Charles II',
  lon:17.2470,lat:40.4644,rarity:2,year:1300,people:15000,populationText:'15.0 K',populationRange:'12–18 K',populationConfidence:'low',
  sizeText:'0.75 km²',sizeConfidence:'low',army:200,armyText:'200',navy:4,navyText:'4',
  food:79,technology:70,stability:62,economyScore:74,
  historicalRole:'Strategic southern port and capital of the Angevin Principality of Taranto',
  economy:'Mediterranean shipping, fisheries, agriculture and regional trade',
  militaryRole:'Major fortified naval position controlling the Gulf of Taranto',
  researchSummary:'In 1300 Taranto was held by Philip I of Taranto, an Angevin prince and son of Charles II, within the broader Kingdom of Naples.',
  evidenceNote:'Population is low-confidence; subrealm ownership is high confidence. Navy represents only a small regularly available military component at the strategic port, not all shipping in the Gulf of Taranto.',
  sources:[['Philip I, Prince of Taranto','https://en.wikipedia.org/wiki/Philip_I,_Prince_of_Taranto'],['Taranto','https://en.wikipedia.org/wiki/Taranto']]
 },
 {
  id:'1300-palermo',name:'Palermo',modern:'Palermo',country:'Kingdom of Sicily',subrealm:'Island Kingdom of Sicily under Frederick III of Aragon',
  lon:13.3614,lat:38.1157,rarity:3,year:1300,people:50000,populationText:'50.0 K',populationRange:'40–60 K',populationConfidence:'low',
  sizeText:'1.8 km²',sizeConfidence:'low',army:500,armyText:'500',navy:8,navyText:'8',
  food:88,technology:82,economyScore:86,stability:40,
  historicalRole:'Largest western Sicilian city and a royal centre of Frederick III’s island kingdom',
  economy:'Mediterranean shipping, grain, citrus, crafts, markets and royal administration',
  militaryRole:'Major fortified port with substantial naval resources',
  researchSummary:'During the War of the Sicilian Vespers, Palermo supported the Aragonese-Sicilian monarchy of Frederick III and remained one of the island kingdom’s key cities.',
  evidenceNote:'Population is low-confidence. Sicily was in active naval war in 1300; Navy counts a conservative local military component and avoids assigning the kingdom’s whole campaign fleet to Palermo.',
  sources:[['Palermo','https://en.wikipedia.org/wiki/Palermo'],['Frederick III of Sicily','https://en.wikipedia.org/wiki/Frederick_III_of_Sicily']]
 },
 {
  id:'1300-messina',name:'Messina',modern:'Messina',country:'Kingdom of Sicily',subrealm:'Island Kingdom of Sicily under Frederick III · Strait stronghold',
  lon:15.5540,lat:38.1938,mapLon:15.4800,mapLat:38.1700,rarity:3,year:1300,people:35000,populationText:'35.0 K',populationRange:'30–40 K',populationConfidence:'low',
  sizeText:'1.3 km²',sizeConfidence:'low',army:800,armyText:'800',navy:12,navyText:'12',
  food:75,technology:81,economyScore:85,stability:35,
  historicalRole:'Strategic Strait of Messina port and one of Sicily’s most important cities',
  economy:'Shipping, trade, fisheries, crafts and Mediterranean commerce',
  militaryRole:'Critical fortified strait city with strong naval importance',
  researchSummary:'Messina was one of the central strongholds of the Sicilian Vespers and remained strategically vital in the war around 1300.',
  evidenceNote:'Population is low-confidence; military and maritime importance are high confidence. Messina receives the largest Sicilian local Navy value because it was the crucial Strait stronghold during the ongoing war, but the kingdom-wide fleet is not assigned wholly to the city.',
  sources:[['Messina','https://en.wikipedia.org/wiki/Messina'],['War of the Sicilian Vespers','https://en.wikipedia.org/wiki/War_of_the_Sicilian_Vespers']]
 },
 {
  id:'1300-catania',name:'Catania',modern:'Catania',country:'Kingdom of Sicily',subrealm:'Island Kingdom of Sicily under Frederick III',
  lon:15.0873,lat:37.5027,rarity:2,year:1300,people:18000,populationText:'18.0 K',populationRange:'15–22 K',populationConfidence:'low',
  sizeText:'0.8 km²',sizeConfidence:'low',army:300,armyText:'300',navy:4,navyText:'4',
  food:90,technology:70,stability:42,economyScore:76,
  historicalRole:'Major eastern Sicilian city beneath Mount Etna',
  economy:'Agriculture, grain, wine, crafts and coastal trade',
  militaryRole:'Fortified coastal city with regional military importance',
  researchSummary:'Catania was a major eastern centre of Frederick III’s Sicily during the continuing conflict with the Angevins.',
  evidenceNote:'Population is low-confidence. Catania was an active wartime coastal centre, but Navy counts only a conservative local military component.',
  sources:[['Catania','https://en.wikipedia.org/wiki/Catania'],['Kingdom of Sicily','https://en.wikipedia.org/wiki/Kingdom_of_Sicily']]
 },
 {
  id:'1300-syracuse',name:'Syracuse',modern:'Syracuse',country:'Kingdom of Sicily',subrealm:'Island Kingdom of Sicily under Frederick III',
  lon:15.2866,lat:37.0755,rarity:2,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–15 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:300,armyText:'300',navy:4,navyText:'4',
  food:84,technology:70,stability:44,economyScore:70,
  historicalRole:'Historic fortified harbour city of southeastern Sicily',
  economy:'Shipping, grain, fisheries, crafts and regional trade',
  militaryRole:'Strong natural harbour and fortified island-peninsula position',
  researchSummary:'Syracuse remained strategically important because of its harbour and southeastern position even though it was far below its ancient scale.',
  evidenceNote:'Population is low-confidence. Syracuse’s harbour was strategically important in the ongoing Sicilian war, but the card counts only a small local military naval component.',
  sources:[['Syracuse, Sicily','https://en.wikipedia.org/wiki/Syracuse,_Sicily'],['Kingdom of Sicily','https://en.wikipedia.org/wiki/Kingdom_of_Sicily']]
 },
 {
  id:'1300-trapani',name:'Trapani',modern:'Trapani',country:'Kingdom of Sicily',subrealm:'Island Kingdom of Sicily under Frederick III · western maritime port',
  lon:12.5365,lat:38.0176,mapLon:12.5000,mapLat:38.0000,rarity:2,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–15 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:300,armyText:'300',navy:4,navyText:'4',
  food:80,technology:68,stability:48,economyScore:76,
  historicalRole:'Western Sicilian port with strong maritime and salt-trade functions',
  economy:'Salt, fishing, shipping, grain and Mediterranean trade',
  militaryRole:'Strategic naval port facing Tunisia and the western Mediterranean',
  researchSummary:'Trapani’s maritime position and salt economy made it an important western stronghold of the island kingdom.',
  evidenceNote:'Population is low-confidence. Trapani was strategically maritime, but Navy excludes most merchant shipping and counts only a conservative dedicated military component.',
  sources:[['Trapani','https://en.wikipedia.org/wiki/Trapani'],['Kingdom of Sicily','https://en.wikipedia.org/wiki/Kingdom_of_Sicily']]
 },
 {
  id:'1300-oristano',name:'Oristano',modern:'Oristano',country:'Judicate of Arborea',subrealm:'Judicate of Arborea · capital under Judge Giovanni of Arborea',
  lon:8.5919,lat:39.9036,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.6 km²',sizeConfidence:'low',army:150,armyText:'150',navy:0,navyText:'0',
  food:82,technology:60,stability:72,economyScore:61,
  historicalRole:'Capital of the last fully sovereign Sardinian judicate',
  economy:'Agriculture, markets, crafts and regional trade',
  militaryRole:'Fortified capital of a resilient native Sardinian polity',
  researchSummary:'Arborea was the only Sardinian judicate to remain sovereign after the collapse of the other three; Giovanni ruled from 1299 to 1301.',
  evidenceNote:'Population is low-confidence; political status is high confidence. Maritime access did not amount to a securely evidenced permanent war fleet.',
  sources:[['Treccani — Arborea','https://www.treccani.it/enciclopedia/arborea_%28Enciclopedia-Italiana%29/'],['Judicate of Arborea','https://en.wikipedia.org/wiki/Judicate_of_Arborea']]
 },
 {
  id:'1300-olbia',name:'Olbia',modern:'Olbia',country:'Gallura',subrealm:'Gallura · Terranova under de facto Pisan control after Nino Visconti’s death in 1296',
  lon:9.4964,lat:40.9236,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:72,technology:55,stability:42,economyScore:52,
  historicalRole:'Principal town of former Gallura under disputed but effective Pisan domination',
  economy:'Maritime trade, agriculture, fisheries and local markets',
  militaryRole:'Small strategic harbour in northeastern Sardinia',
  researchSummary:'Nino Visconti, judge of Gallura, died in 1296. His daughter Giovanna inherited claims, but Pisa moved to strip the family of its holdings; the 1300 card therefore uses Pisan de facto control while explicitly noting the dispute.',
  evidenceNote:'Political status is more uncertain than most cards; the subrealm text preserves that ambiguity. Local harbour activity is not counted as a permanent Pisan war fleet.',
  sources:[['Treccani — Nino Visconti','https://www.treccani.it/enciclopedia/nino-visconti_%28Enciclopedia-Dantesca%29/'],['Comune di Olbia — historical study of Terranova and Gallura','https://servizionline.comune.olbia.ot.it/002-PubCED/2025.05.08-Punto_11_PUC/FASE%20I_ASSETTO%20STORICO%20CULTURALE/RS_Storia.pdf']]
 },
 {
  id:'1300-cagliari',name:'Cagliari',modern:'Cagliari',country:'Caralis',subrealm:'Caralis · Pisan Castel di Castro after the 1258 fall of the Judicate of Cagliari',
  lon:9.1217,lat:39.2238,rarity:2,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.6 km²',sizeConfidence:'low',army:200,armyText:'200',navy:4,navyText:'4',
  food:78,technology:64,stability:48,economyScore:72,
  historicalRole:'Pisan fortress-port and principal urban stronghold in southern Sardinia',
  economy:'Shipping, trade, salt, markets and agriculture',
  militaryRole:'Major fortified Pisan citadel dominating southern Sardinian commerce',
  researchSummary:'The Judicate of Cagliari had been destroyed in 1258. Castel di Castro was the principal Pisan urban and military centre in the area and remained Pisan until the Aragonese conquest of 1326.',
  evidenceNote:'Population is low-confidence; Pisan political control is high confidence. Castel di Castro was an important Pisan stronghold, but Navy is kept to a conservative local military component rather than Pisa’s broader maritime resources.',
  sources:[['Treccani — Cagliari','https://www.treccani.it/enciclopedia/cagliari/'],['Comune di Cagliari — Torre di San Pancrazio and Pisan Castello','https://www.comune.cagliari.it/portale/page/it/torre_di_san_pancrazio?contentId=LGO12100']]
 },
 {
  id:'1300-bonifacio',name:'Bonifacio',modern:'Bonifacio',country:'Republic of Genoa',subrealm:'Genoese colony and fortified commune since 1195',
  lon:9.1594,lat:41.3872,rarity:0,year:1300,people:4000,populationText:'4.0 K',populationRange:'3–5 K',populationConfidence:'low',
  sizeText:'0.28 km²',sizeConfidence:'low',army:150,armyText:'150',navy:2,navyText:'2',
  food:60,technology:60,stability:74,economyScore:58,
  historicalRole:'Strong Genoese fortress-port controlling the Strait of Bonifacio',
  economy:'Shipping, fisheries, trade and military provisioning',
  militaryRole:'Highly defensible cliff-top maritime fortress',
  researchSummary:'Genoa had controlled Bonifacio since 1195, making the city a secure Genoese foothold in Corsica despite broader island-wide political complexity.',
  evidenceNote:'Population is low-confidence; Genoese control is high confidence. The fortress-port merits a small permanent naval component, but not the larger Genoese fleet as a whole.',
  sources:[['Corsica official tourism — history','https://www.visit-corsica.com/en/Explore-Corsica/Our-inspirations/Cultural-inspirations/A-strong-and-turbulent-history'],['Bonifacio, Corse-du-Sud','https://en.wikipedia.org/wiki/Bonifacio,_Corse-du-Sud']]
 },
 {
  id:'1300-calvi',name:'Calvi',modern:'Calvi',country:'Republic of Genoa',subrealm:'Genoese-aligned fortified town after the 1278 submission',
  lon:8.7570,lat:42.5660,rarity:0,year:1300,people:3000,populationText:'3.0 K',populationRange:'2–4 K',populationConfidence:'low',
  sizeText:'0.22 km²',sizeConfidence:'low',army:100,armyText:'100',navy:1,navyText:'1',
  food:60,technology:56,stability:76,economyScore:52,
  historicalRole:'Small but strategically valuable Genoese stronghold in northwestern Corsica',
  economy:'Shipping, fisheries, timber, local trade and agriculture',
  militaryRole:'Cliff-top fortified harbour with outsized strategic value',
  researchSummary:'Calvi placed itself under Genoese protection in 1278 and remained closely tied to Genoa thereafter, making Genoese ownership appropriate for the 1300 card.',
  evidenceNote:'Population is low-confidence; the 1278 Genoese alignment is directly attested. Navy represents only a minimal permanent local naval presence.',
  sources:[['Treccani — Calvi','https://www.treccani.it/enciclopedia/calvi_%28Enciclopedia-Italiana%29/'],['France.fr — Citadel of Calvi','https://www.france.fr/en/article/citadel-calvi/']]
 }
,
 {
  id:'1300-krakow',name:'Kraków',modern:'Kraków',country:'Kingdom of Poland',subrealm:'Lesser Poland · royal centre under Wenceslaus II', 
  lon:19.94498,lat:50.06465,rarity:2,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–15 K',populationConfidence:'low',
  sizeText:'0.50 km²',sizeConfidence:'low',army:150,armyText:'150',navy:0,navyText:'0',
  food:72,technology:78,economyScore:82,stability:58,
  historicalRole:'Principal city of Lesser Poland and one of the main royal and commercial centres of the Polish lands',
  economy:'Long-distance trade, crafts, salt-linked commerce, markets and royal administration',
  militaryRole:'Fortified royal centre with a small permanent castle and household military core',
  researchSummary:'Kraków had been reorganised under Magdeburg law in 1257 and by 1300 was one of the principal political and commercial centres of the Polish lands under King Wenceslaus II.',
  evidenceNote:'No secure c.1300 census survives; population and urban footprint are conservative estimates. Army counts only a small permanent royal/castle core, not feudal levies or urban militia.',
  sources:[['Kraków municipal history','https://www.krakow.pl/'],['Wenceslaus II and Poland','https://www.britannica.com/biography/Wenceslas-II']]
 },
 {
  id:'1300-poznan',name:'Poznań',modern:'Poznań',country:'Kingdom of Poland',subrealm:'Greater Poland · major Piast urban centre',
  lon:16.92517,lat:52.40637,rarity:1,year:1300,people:8000,populationText:'8.0 K',populationRange:'6–10 K',populationConfidence:'low',
  sizeText:'0.25 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:74,technology:66,economyScore:72,stability:62,
  historicalRole:'Historic capital of Greater Poland and an important fortified commercial city on the Warta',
  economy:'Markets, crafts, regional trade, ecclesiastical activity and river commerce',
  militaryRole:'Fortified regional capital with a modest permanent ducal or royal military core',
  researchSummary:'Poznań was refounded on Magdeburg law in 1253 and remained one of the principal political and economic centres of Greater Poland around 1300.',
  evidenceNote:'Population and enclosed area are low-confidence gameplay estimates. The city’s 1253 charter and political significance are well documented.',
  sources:[['City of Poznań — history','https://www.poznan.pl/mim/main/en/-%2Cp%2C25064%2C25065.html'],['Poznań — 1253 charter','https://www.poznan.pl/mim/smartcity/infoteka%2C1202/770-lat-praw-miejskich-poznania%2C199095.html']]
 },
 {
  id:'1300-gniezno',name:'Gniezno',modern:'Gniezno',country:'Kingdom of Poland',subrealm:'Greater Poland · archiepiscopal and coronation city',
  lon:17.58266,lat:52.53481,rarity:1,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–6 K',populationConfidence:'low',
  sizeText:'0.18 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:70,technology:76,economyScore:60,stability:64,
  historicalRole:'Metropolitan church centre and traditional Polish coronation city where Wenceslaus II was crowned in 1300',
  economy:'Pilgrimage, church revenues, crafts, markets and regional exchange',
  militaryRole:'Walled ecclesiastical city with a small permanent defensive core',
  researchSummary:'Gniezno remained Poland’s leading metropolitan church centre and hosted the coronation of Wenceslaus II as king of Poland in 1300.',
  evidenceNote:'The exact population is unknown. Technology is high for the city’s exceptional clerical, archival and metropolitan role rather than for industrial capacity.',
  sources:[['Gniezno official history','https://www.gniezno.eu/cms/20274/historia'],['Gniezno — Wenceslaus II coronation','https://www.gniezno.eu/wiadomosci/1/wiadomosc/242148/wernisaz_wystawy_i_wyklad_historyczny_o_waclawie_ii']]
 },
 {
  id:'1300-kalisz',name:'Kalisz',modern:'Kalisz',country:'Kingdom of Poland',subrealm:'Greater Poland · Kalisz district',
  lon:18.09102,lat:51.76109,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–6 K',populationConfidence:'low',
  sizeText:'0.20 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:76,technology:62,economyScore:68,stability:65,
  historicalRole:'Important Greater Polish market city at a crossroads of long-distance routes',
  economy:'Trade-route commerce, crafts, markets, agriculture and mint-linked exchange',
  militaryRole:'Fortified regional town with limited permanent military staffing',
  researchSummary:'Kalisz was relocated and chartered around 1257 and developed rapidly as one of Greater Poland’s important political and commercial centres.',
  evidenceNote:'Population and size are cautious estimates. The city’s charter, commercial role and long-distance route position are much better documented than its exact demographic scale.',
  sources:[['Kalisz official history','https://www.kalisz.pl/en/city/about-kalisz/the-history-of-kalisz'],['Kalisz multicultural medieval history','https://www.kalisz.pl/miasto/o-miescie/kalisz-wielokulturowy']]
 },
 {
  id:'1300-sandomierz',name:'Sandomierz',modern:'Sandomierz',country:'Kingdom of Poland',subrealm:'Land of Sandomierz · Lesser Poland',
  lon:21.74898,lat:50.68265,rarity:0,year:1300,people:3000,populationText:'3.0 K',populationRange:'2.5–3.5 K',populationConfidence:'medium',
  sizeText:'0.16 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:74,technology:60,economyScore:67,stability:62,
  historicalRole:'Historic princely centre and Vistula trading city rebuilt under Magdeburg law after the Mongol invasions',
  economy:'Vistula trade, tolls, markets, crafts, agriculture and warehousing',
  militaryRole:'Defensible hill town controlling an important Vistula crossing and trade route',
  researchSummary:'Sandomierz received a renewed Magdeburg-law charter in 1286, including storage, toll, navigation and minting privileges, and was rebuilding as a major Lesser Polish centre around 1300.',
  evidenceNote:'The municipality gives about 3,000 inhabitants for the medieval city in the period after reunification, used here as the nearest practical benchmark.',
  sources:[['Sandomierz — 1286 charter','https://sandomierz.eu/323/dokument-lokacyjny.html'],['Sandomierz — medieval history','https://sandomierz.eu/874/sredniowiecze.html']]
 },
 {
  id:'1300-plock',name:'Płock',modern:'Płock',country:'Duchy of Masovia',subrealm:'Masovian Piast duchy under Bolesław II',
  lon:19.70654,lat:52.54634,rarity:0,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.22 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:72,technology:68,economyScore:64,stability:66,
  historicalRole:'Principal Masovian ducal and episcopal centre on the Vistula',
  economy:'River trade, markets, crafts, church revenues and ducal administration',
  militaryRole:'Ducal castle city with a small permanent household and garrison core',
  researchSummary:'Płock had city rights from 1237 and was rebuilt around the turn of the 13th and 14th centuries under Masovian duke Bolesław II.',
  evidenceNote:'No reliable c.1300 census survives. Its independent Masovian political identity is kept separate from the Kingdom of Poland card group.',
  sources:[['Płock — medieval Old Market history','https://old.plock.eu/de/der_altmarkt.html']]
 },
 {
  id:'1300-wroclaw',name:'Wrocław',modern:'Wrocław',country:'Duchy of Wrocław',subrealm:'Silesian Piast duchy · regency-era capital',
  lon:17.03854,lat:51.10788,rarity:2,year:1300,people:20000,populationText:'20.0 K',populationRange:'15–25 K',populationConfidence:'low',
  sizeText:'0.70 km²',sizeConfidence:'low',army:200,armyText:'200',navy:0,navyText:'0',
  food:74,technology:80,economyScore:86,stability:60,
  historicalRole:'One of the largest and most commercially advanced cities of the Silesian Piast lands',
  economy:'Long-distance trade, cloth, crafts, markets, church wealth and Oder commerce',
  militaryRole:'Strongly fortified ducal capital with a modest permanent castle and household force',
  researchSummary:'Wrocław was the dominant urban centre of Lower Silesia around 1300 and belonged to the fragmented Silesian Piast political landscape rather than a unified Polish kingdom administration.',
  evidenceNote:'Population and size are broad estimates. The city’s economic and ecclesiastical importance is much more secure than any exact c.1300 headcount.',
  sources:[['Wrocław history','https://www.britannica.com/place/Wroclaw'],['Duchy of Wrocław background','https://en.wikipedia.org/wiki/Duchy_of_Wroc%C5%82aw']]
 },
 {
  id:'1300-gdansk',name:'Gdańsk',modern:'Gdańsk',country:'Duchy of Pomerelia',subrealm:'Pomerelian Baltic port under contested Polish-Bohemian influence',
  lon:18.64664,lat:54.35205,rarity:1,year:1300,people:8000,populationText:'8.0 K',populationRange:'6–10 K',populationConfidence:'low',
  sizeText:'0.30 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:68,technology:66,economyScore:68,stability:50,
  historicalRole:'Major Baltic port of Pomerelia on the eve of the early-14th-century struggle for control of the city',
  economy:'Baltic shipping, grain, timber, fish, crafts and merchant trade',
  militaryRole:'Fortified port whose maritime strength depended mainly on merchant shipping rather than a standing war fleet',
  researchSummary:'Gdańsk possessed Lübeck-law traditions by the 13th century and was already a major Baltic commercial centre before the Teutonic takeover of 1308.',
  evidenceNote:'Political control around 1300 was contested and transitional, so the card uses Duchy of Pomerelia rather than projecting the 1308 Teutonic takeover backward. Navy remains zero under the standing-fleet rule.',
  sources:[['Gdańsk — Lübeck law code of 1263','https://www.gdansk.pl/urzad-miejski/wiadomosci/kodeks-lubecki-drukowana-historia-miasta%2Ca%2C8149'],['Gdańsk history','https://www.britannica.com/place/Gdansk']]
 },
 {
  id:'1300-buda',name:'Buda',modern:'Budapest',country:'Kingdom of Hungary',subrealm:'Royal town and castle centre under Andrew III',
  lon:19.03991,lat:47.49790,rarity:2,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.40 km²',sizeConfidence:'low',army:200,armyText:'200',navy:0,navyText:'0',
  food:70,technology:82,economyScore:86,stability:48,
  historicalRole:'Fast-rising royal castle town and one of the principal political centres of late Árpád Hungary',
  economy:'Royal services, Danube trade, markets, crafts, wine and regional commerce',
  militaryRole:'Royal castle and fortified hill town with a meaningful permanent household and garrison core',
  researchSummary:'Buda grew rapidly after the Mongol invasion and by the late 13th century had become a central royal and commercial site in the Hungarian kingdom.',
  evidenceNote:'No exact c.1300 census exists. Stability is reduced because royal power was increasingly challenged by powerful oligarchs at the end of Andrew III’s reign.',
  sources:[['Budapest history','https://www.britannica.com/place/Budapest/History'],['Kingdom of Hungary — Andrew III','https://www.britannica.com/biography/Andrew-III']]
 },
 {
  id:'1300-esztergom',name:'Esztergom',modern:'Esztergom',country:'Kingdom of Hungary',subrealm:'Archbishopric of Esztergom · primatial castle city',
  lon:18.74345,lat:47.78550,rarity:1,year:1300,people:6000,populationText:'6.0 K',populationRange:'5–8 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:68,technology:82,economyScore:72,stability:60,
  historicalRole:'Seat of Hungary’s senior archbishop and a major ecclesiastical and fortified Danube centre',
  economy:'Church revenues, Danube trade, markets, crafts and pilgrimage',
  militaryRole:'Archiepiscopal castle complex with a small permanent armed household and garrison',
  researchSummary:'After the royal court moved away following the Mongol invasion, Esztergom remained the seat of the kingdom’s primate and one of Hungary’s most important ecclesiastical centres.',
  evidenceNote:'Technology reflects clerical literacy, administration and monumental building traditions. Population and size are low-confidence estimates.',
  sources:[['City of Esztergom — history','https://www.esztergom.hu/en/en_history/161-history']]
 },
 {
  id:'1300-szekesfehervar',name:'Székesfehérvár',modern:'Székesfehérvár',country:'Kingdom of Hungary',subrealm:'Royal coronation and burial city',
  lon:18.41081,lat:47.18603,rarity:1,year:1300,people:6000,populationText:'6.0 K',populationRange:'5–8 K',populationConfidence:'low',
  sizeText:'0.30 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:72,technology:74,economyScore:70,stability:58,
  historicalRole:'Traditional coronation and royal burial city of the Hungarian monarchy',
  economy:'Royal ceremonies, markets, pilgrimage, crafts and regional commerce',
  militaryRole:'Fortified royal city with a small permanent defensive and ceremonial military core',
  researchSummary:'Székesfehérvár retained its exceptional constitutional role as Hungary’s coronation and royal burial city through the end of the Árpád dynasty.',
  evidenceNote:'Its political-symbolic role is much better documented than its exact c.1300 population. The city remained central to royal legitimacy even as other centres grew.',
  sources:[['Székesfehérvár — historical past','https://www.szekesfehervar.hu/a-tortenelmi-mult']]
 },
 {
  id:'1300-pozsony',name:'Bratislava',modern:'Bratislava',country:'Kingdom of Hungary',subrealm:'Western royal town on the Austrian frontier',
  lon:17.10775,lat:48.14860,rarity:1,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.25 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:70,technology:72,economyScore:78,stability:60,
  historicalRole:'Privileged frontier city and Danube trading centre near the western edge of the Hungarian kingdom',
  economy:'Danube trade, wine, markets, crafts and frontier commerce',
  militaryRole:'Fortified royal border town with a modest permanent defensive core',
  researchSummary:'Andrew III granted major urban privileges to Pozsony in 1291, confirming a mature self-governing royal town immediately before the 1300 snapshot.',
  evidenceNote:'Population and size are low-confidence estimates. The 1291 privilege is directly preserved in the Bratislava City Archive.',
  sources:[['Bratislava City Archive — 1291 privilege','https://primacialnypalac.bratislava.sk/en/city-of-bratislava/bratislava-city-archive/archival-funds'],['Bratislava — city privileges','https://bratislava.sk/spravy/pozyvame-vas-na-16-rocnik-bratislavskych-mestskych-dni']]
 },
 {
  id:'1300-kassa',name:'Košice',modern:'Košice',country:'Kingdom of Hungary',subrealm:'Upper Hungarian royal market town',
  lon:21.26110,lat:48.71640,rarity:1,year:1300,people:3000,populationText:'3.0 K',populationRange:'2–4 K',populationConfidence:'low',
  sizeText:'0.22 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:70,technology:70,economyScore:72,stability:64,
  historicalRole:'Rapidly developing eastern market and fortified town linking Hungary with Poland and the Baltic trade routes',
  economy:'Markets, crafts, imported goods, regional trade and north-south commerce',
  militaryRole:'Newly fortified royal town with a small permanent defensive establishment',
  researchSummary:'By around 1290 Košice possessed urban privileges, markets and partially completed walls and was emerging as an important trading centre of Upper Hungary.',
  evidenceNote:'The population is a cautious estimate. Official city history confirms substantial urban development and fortification by the end of the 13th century.',
  sources:[['Košice official history','https://geoportal.kosice.sk/city/history-of-the-city'],['Košice — 13th-century history','https://www.kosice.sk/city/history-of-kosice-13th-century']]
 },
 {
  id:'1300-sopron',name:'Sopron',modern:'Sopron',country:'Kingdom of Hungary',subrealm:'Western royal frontier town',
  lon:16.59049,lat:47.68166,rarity:1,year:1300,people:4000,populationText:'4.0 K',populationRange:'3–5 K',populationConfidence:'low',
  sizeText:'0.22 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:72,technology:72,economyScore:78,stability:64,
  historicalRole:'Fortified western frontier and wine-trading royal town',
  economy:'Wine, markets, crafts, agriculture and Austrian-Hungarian frontier trade',
  militaryRole:'Strong walled frontier town whose wartime manpower relied mainly on citizens rather than a large standing force',
  researchSummary:'Sopron was an established royal frontier town by 1300, benefiting from trade and viticulture near the Austrian border.',
  evidenceNote:'Population and permanent Army are conservative estimates; civic militia is excluded under the standing-force definition.',
  sources:[['Sopron history','https://www.britannica.com/place/Sopron']]
 },
 {
  id:'1300-pecs',name:'Pécs',modern:'Pécs',country:'Kingdom of Hungary',subrealm:'Bishopric of Pécs · Baranya',
  lon:18.23227,lat:46.07273,rarity:1,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:77,technology:74,economyScore:68,stability:64,
  historicalRole:'Important southern episcopal city with strong ecclesiastical and monastic institutions',
  economy:'Church revenues, markets, wine, agriculture, crafts and regional trade',
  militaryRole:'Episcopal urban centre with limited permanent military staffing',
  researchSummary:'Pécs was the seat of a bishopric founded in 1009 and remained one of southern Hungary’s principal ecclesiastical cities around 1300.',
  evidenceNote:'The famous university belongs to 1367 and is not credited here. Technology instead reflects the long-established bishopric, monasteries and clerical institutions.',
  sources:[['City of Pécs — history','https://pecs.hu/en/the-history-of-pecs/']]
 },
 {
  id:'1300-gradec',name:'Gradec',modern:'Zagreb',country:'Kingdom of Hungary',subrealm:'Kingdom of Croatia-Slavonia · free royal town of Gradec',
  lon:15.97300,lat:45.81440,mapLon:16.45,mapLat:45.95,rarity:0,year:1300,people:2000,populationText:'2.0 K',populationRange:'1.5–3 K',populationConfidence:'low',
  sizeText:'0.12 km²',sizeConfidence:'medium',army:50,armyText:'50',navy:0,navyText:'0',
  food:72,technology:62,economyScore:64,stability:68,
  historicalRole:'Autonomous free royal hill town beside the episcopal settlement of Kaptol',
  economy:'Markets, crafts, agriculture, royal privileges and regional exchange',
  militaryRole:'Walled free royal town whose defence rested primarily on its citizens',
  researchSummary:'Gradec received free royal city status in 1242 and was enclosed by walls and towers by 1266, giving the Zagreb hill town a distinct autonomous urban identity by 1300.',
  evidenceNote:'The card represents Gradec rather than the later unified city of Zagreb. Population is low confidence; the small medieval walled footprint is comparatively well defined.',
  sources:[['City of Zagreb — Gradec history','https://aktivnosti.zagreb.hr/iz-povijesti-13432/13432'],['University of Zagreb — medieval Gradec elite','https://repozitorij.hrstud.unizg.hr/islandora/object/hrstud%3A973/datastream/PDF/view']]
 }
,
 {
  id:'1300-debrecen',name:'Debrecen',modern:'Debrecen',country:'Kingdom of Hungary',subrealm:'Eastern Hungarian market settlement · Bihar and Hajdú frontier zone',
  lon:21.6273,lat:47.5316,rarity:0,year:1300,people:2500,populationText:'2.5 K',populationRange:'2–3.5 K',populationConfidence:'low',
  sizeText:'0.18 km²',sizeConfidence:'low',army:30,armyText:'30',navy:0,navyText:'0',
  food:78,technology:52,economyScore:60,stability:58,
  historicalRole:'Fast-growing eastern settlement developing into a regional market centre after the Mongol invasion',
  economy:'Agriculture, livestock, local markets, craft production and regional exchange',
  militaryRole:'Unwalled or lightly defended settlement with only a very small permanent armed household core',
  researchSummary:'Debrecen grew rapidly after the mid-13th century as surrounding villages declined or merged into the expanding settlement. Around 1300 it was not yet the privileged market town it would become in the 14th century, but it was already an emerging regional centre.',
  evidenceNote:'Population and footprint are low-confidence gameplay estimates. Rarity is Common because Debrecen was still developing around 1300 and had not yet received the later 14th-century civic privileges that made it a major market town.',
  sources:[['Visit Debrecen — history of the town square and medieval St Andrew church','https://visitdebrecen.com/hot-now/the-history-of-the-town-square-and-the-reformed-great-church/'],['Visit Debrecen — 660 years of city privileges','https://visitdebrecen.com/hot-now/debrecen-for-660-years/']]
 },
 {
  id:'1300-oradea',name:'Oradea',modern:'Oradea',country:'Kingdom of Hungary',subrealm:'Bishopric of Várad · episcopal fortress and regional centre',
  lon:21.9189,lat:47.0465,rarity:1,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–7 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:70,technology:78,economyScore:72,stability:60,
  historicalRole:'Important episcopal fortress-city and religious centre on the eastern approaches of the Hungarian kingdom',
  economy:'Church revenues, markets, crafts, agriculture, pilgrimage and regional trade',
  militaryRole:'Fortified episcopal centre with a modest permanent castle and household garrison',
  researchSummary:'Oradea developed around the royal and episcopal foundation created in the late 11th century. By around 1300 its bishopric, cathedral complex and fortress made it one of the most important ecclesiastical centres in eastern Hungary.',
  evidenceNote:'Population is approximate. Rarity is Uncommon, comparable to Pécs and Kassa: stronger institutionally than a small market settlement, but below Buda in royal and kingdom-wide importance.',
  sources:[['Oradea Heritage — Oradea Fortress','https://www.oradeaheritage.ro/oradeas-fortress/']]
 },
 {
  id:'1300-cluj',name:'Cluj',modern:'Cluj-Napoca',country:'Kingdom of Hungary',subrealm:'Transylvania · royal and episcopal settlement of Kolozs',
  lon:23.5899,lat:46.7712,rarity:0,year:1300,people:3000,populationText:'3.0 K',populationRange:'2–4 K',populationConfidence:'low',
  sizeText:'0.22 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:70,technology:64,economyScore:64,stability:56,
  historicalRole:'Rebuilt Transylvanian settlement growing beside a royal castle and episcopal holdings',
  economy:'Markets, crafts, agriculture, local administration and regional trade',
  militaryRole:'Small royal-settlement defensive core associated with the castle and local authorities',
  researchSummary:'Cluj was devastated in 1241 and rebuilt during the later 13th century with new privileges for settlers. In 1275 it appears as Villa Kulusvar; full city status followed only in 1316, shortly after the Cardwars snapshot.',
  evidenceNote:'Rarity is Common because c.1300 Cluj was still in the transition from rebuilt settlement to full city, despite its strong later importance. Population and size are cautious estimates.',
  sources:[['Transylvania Trust — medieval fortifications and 13th-century Cluj','https://www.transylvaniatrust.ro/en/the-mediaeval-fortifications-of-the-town-of-cluj/']]
 },
 {
  id:'1300-alba-iulia',name:'Alba Iulia',modern:'Alba Iulia',country:'Kingdom of Hungary',subrealm:'Transylvania · seat of the Transylvanian bishopric',
  lon:23.5730,lat:46.0670,rarity:1,year:1300,people:4000,populationText:'4.0 K',populationRange:'3–6 K',populationConfidence:'low',
  sizeText:'0.30 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:69,technology:82,economyScore:68,stability:58,
  historicalRole:'Principal episcopal and cathedral centre of medieval Transylvania',
  economy:'Church revenues, markets, crafts, agriculture, cathedral administration and regional exchange',
  militaryRole:'Episcopal stronghold with a modest permanent household and defensive core',
  researchSummary:'Alba Iulia was the seat of the Transylvanian bishopric and cathedral chapter. The great cathedral and chapter made the settlement a major religious, administrative and literate centre by the late 13th century.',
  evidenceNote:'Rarity is Uncommon, similar to other important episcopal centres such as Pécs and Esztergom. Technology is comparatively high because of the cathedral chapter, literacy and ecclesiastical administration.',
  sources:[['Roman Catholic Archdiocese of Alba Iulia — history of the diocese','https://ersekseg.ro/en/node/80']]
 },
 {
  id:'1300-sibiu',name:'Sibiu',modern:'Sibiu',country:'Kingdom of Hungary',subrealm:'Transylvania · principal Saxon centre of the Sibiu district',
  lon:24.1517,lat:45.7983,rarity:2,year:1300,people:6000,populationText:'6.0 K',populationRange:'5–8 K',populationConfidence:'low',
  sizeText:'0.40 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:68,technology:80,economyScore:80,stability:66,
  historicalRole:'Leading Saxon political, fortified and commercial centre in southern Transylvania',
  economy:'Crafts, transit trade, markets, agriculture, church institutions and Carpathian-route commerce',
  militaryRole:'Strongly fortified settlement with a permanent defensive core, while most wartime manpower came from the community',
  researchSummary:'Sibiu was documented by 1191 and became the political centre of the early Saxon settlement area. After its destruction in 1241 it was rebuilt, and its first major fortification precincts date from the 13th century.',
  evidenceNote:'Rarity is Rare: around 1300 Sibiu was more regionally important and better fortified than Kassa, Pécs or Sopron, but still below the largest kingdom-wide centres. Population remains approximate.',
  sources:[['City of Sibiu — history','https://www.sibiu.ro/sibiu/istoria'],['Sibiu tourism — medieval fortifications','https://turism.sibiu.ro/en/fortificatie/173']]
 },
 {
  id:'1300-brasov',name:'Brașov',modern:'Brașov',country:'Kingdom of Hungary',subrealm:'Transylvania · Saxon settlement of Corona in the Burzenland',
  lon:25.6012,lat:45.6579,rarity:1,year:1300,people:3500,populationText:'3.5 K',populationRange:'3–5 K',populationConfidence:'low',
  sizeText:'0.25 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:66,technology:66,economyScore:69,stability:60,
  historicalRole:'Growing Saxon trade settlement at a strategic Carpathian crossroads',
  economy:'Regional trade, crafts, livestock, agriculture and traffic through the Carpathian passes',
  militaryRole:'Frontier settlement with a small permanent defensive core and broader communal defence obligations',
  researchSummary:'Brașov developed from several early settlements in the Burzenland and is documented as Corona in the first half of the 13th century. By around 1300 it was a growing Saxon urban centre at an important commercial and frontier crossroads.',
  evidenceNote:'Rarity is Uncommon: its trade position and strategic role place it above a minor local settlement, but much of Brașov’s greatest urban and commercial expansion belongs to the 14th and 15th centuries.',
  sources:[['Municipality of Brașov — historical overview','https://www.brasovcity.ro/file-zone/regulamente/primarie/Statutul-mun-Brasov.pdf']]
 }
,
 {
  id:'1300-gueret',name:'Guéret',modern:'Guéret',country:'Kingdom of France',subrealm:'County of La Marche · Haute-Marche châtellenie',
  lon:1.87144,lat:46.17050,rarity:0,year:1300,people:2500,populationText:'2.5 K',populationRange:'2–3 K',populationConfidence:'low',
  sizeText:'0.12 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:69,technology:48,economyScore:50,stability:66,
  historicalRole:'Small fortified châtellenie centre of the Haute-Marche within the French kingdom',
  economy:'Local markets, agriculture, livestock, woodland resources and comital administration',
  militaryRole:'Small fortified local centre with only a minimal permanent armed core',
  researchSummary:'Guéret was one of seven châtellenies administering justice in the Haute-Marche for the count during the 13th century. It was still a small settlement around 1300 and did not receive its later communal franchise until 1406.',
  evidenceNote:'Population and footprint are conservative gameplay estimates because no c.1300 census survives. The city is grouped under the Kingdom of France, with La Marche retained only as its historical subregion.',
  sources:[['Archives départementales de la Creuse — medieval châtellenies','https://archives.creuse.fr/rechercher/repertoires-et-aides-a-la-recherche/aides-a-la-recherche/organisation-du-territoire/retracer-lhistoire-dune-commune/etat-des-sources']]
 },
 {
  id:'1300-clermont',name:'Clermont',modern:'Clermont-Ferrand',country:'Kingdom of France',subrealm:'Auvergne · episcopal city of Clermont',
  lon:3.08703,lat:45.77722,rarity:1,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–12 K',populationConfidence:'low',
  sizeText:'0.40 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:74,technology:76,economyScore:68,stability:62,
  historicalRole:'Principal episcopal city of Auvergne and a major religious, market and administrative centre',
  economy:'Markets, church wealth, crafts, wine, agriculture and regional trade',
  militaryRole:'Walled episcopal city with a modest permanent defensive and household core',
  researchSummary:'Clermont was the leading episcopal city of Auvergne. The wider Auvergne lands had largely returned to the French crown in 1271, while Clermont itself retained strong episcopal lordship and urban institutions.',
  evidenceNote:'Population and area are cautious estimates. Technology is elevated by Clermont’s large diocese, clerical institutions and sophisticated ecclesiastical administration rather than by any later university.',
  sources:[['Persée — the diocese of Clermont','https://www.persee.fr/doc/efr_0223-5099_1997_act_236_1_6048'],['Persée — Auvergne and the French crown','https://www.persee.fr/doc/rharm_0035-3299_1968_num_24_3_8426']]
 },
 {
  id:'1300-mende',name:'Mende',modern:'Mende',country:'Kingdom of France',subrealm:'Gévaudan · episcopal city under French royal suzerainty',
  lon:3.50112,lat:44.51802,rarity:1,year:1300,people:5000,populationText:'5.0 K',populationRange:'4–6 K',populationConfidence:'low',
  sizeText:'0.25 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:70,technology:72,economyScore:70,stability:60,
  historicalRole:'Prosperous fortified episcopal city and principal urban centre of Gévaudan',
  economy:'Crafts, regional trade, church revenues, livestock and traffic between Languedoc and Auvergne',
  militaryRole:'Walled episcopal city with a small permanent defensive establishment',
  researchSummary:'Mende grew around the episcopal seat and the shrine of Saint Privat. By the 12th century its bishop held temporal powers under the French king; continuing jurisdictional disputes with the crown were formalised in the 1307 paréage.',
  evidenceNote:'The exact population is unknown. Stability is held near average because royal and episcopal jurisdictions were still contested around 1300, even though the city itself was prosperous and fortified.',
  sources:[['Ville de Mende — history','https://mende.fr/ma-ville/histoire-et-patrimoine/histoire/'],['Ville de Mende — medieval development report','https://mende.fr/app/uploads/sites/2/2022/12/SPR-Rapport.pdf']]
 }
,
 {
  id:'1300-belgrade',name:'Belgrade',modern:'Belgrade',country:'Kingdom of Serbia',subrealm:'Northern Serbian realm of King Stefan Dragutin · Belgrade and Mačva',
  lon:20.4573,lat:44.8125,mapLon:20.4373,mapLat:44.8125,rarity:2,year:1300,people:6000,populationText:'6.0 K',populationRange:'5–8 K',populationConfidence:'low',
  sizeText:'0.30 km²',sizeConfidence:'low',army:150,armyText:'150',navy:0,navyText:'0',
  food:68,technology:70,economyScore:72,stability:60,
  historicalRole:'Strategic Danube-Sava fortress and residence of the former Serbian king Stefan Dragutin',
  economy:'River trade, frontier commerce, crafts, markets and princely administration',
  militaryRole:'Major frontier fortress with a small permanent princely and garrison core',
  researchSummary:'Belgrade entered Serbian rule in 1284 when the Hungarian crown granted the city and Mačva to Stefan Dragutin. Dragutin maintained a palace there and strengthened its Serbian ecclesiastical presence.',
  evidenceNote:'The exact population is unknown and the card uses a conservative low-confidence estimate. For gameplay the city is grouped under Serbia, although Dragutin ruled a distinct northern Serbian realm tied to Hungary rather than Milutin’s core kingdom.',
  gameplayNote:'Gameplay grouping: Belgrade is shown with Serbia. Historically in 1300 it belonged to Stefan Dragutin’s separate northern Serbian realm, held through his relationship with the Hungarian crown.',
  sources:[['City of Belgrade — history','https://www.beograd.rs/en/discover-belgrade/a2014/History.html']]
 },
 {
  id:'1300-prizren',name:'Prizren',modern:'Prizren',country:'Kingdom of Serbia',subrealm:'Kingdom of Serbia under Stefan Uroš II Milutin',
  lon:20.7397,lat:42.2139,mapLon:20.40,mapLat:42.53,rarity:2,year:1300,people:8000,populationText:'8.0 K',populationRange:'6–10 K',populationConfidence:'low',
  sizeText:'0.35 km²',sizeConfidence:'low',army:150,armyText:'150',navy:0,navyText:'0',
  food:76,technology:80,economyScore:82,stability:68,
  historicalRole:'Major Serbian urban, episcopal and commercial centre in the heart of the Nemanjić state',
  economy:'Regional and long-distance trade, crafts, church wealth, markets and royal demand',
  militaryRole:'Important fortified royal city with a modest permanent military core',
  researchSummary:'Prizren had been an urban episcopal centre before its incorporation into the Nemanjić state and remained one of medieval Serbia’s principal cities. Its churches and bishopric helped drive both urban and economic development.',
  evidenceNote:'No reliable c.1300 census survives, so population and area are low-confidence estimates. The map marker is shifted slightly northwest to fit the simplified c.1300 Serbia polygon while preserving the real coordinates in the card data.',
  sources:[['Institute for the Protection of Cultural Monuments of Serbia — Prizren urban development','https://www.heritage.gov.rs/cirilica/Download/Saopstenja/Saopstenja_LIII_2021/Saopstenja_LIII_2021_Sakralne_strukture_Prizrena_kao_element_privrednog_i_urbanog_razvoja.pdf']]
 },
 {
  id:'1300-pec',name:'Peć',modern:'Peć / Peja',country:'Kingdom of Serbia',subrealm:'Seat of the Serbian Archbishopric under King Milutin',
  lon:20.2883,lat:42.6591,rarity:1,year:1300,people:3000,populationText:'3.0 K',populationRange:'2–4 K',populationConfidence:'low',
  sizeText:'0.18 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:72,technology:80,economyScore:60,stability:72,
  historicalRole:'Spiritual centre of medieval Serbia and seat of the Serbian archbishops from the end of the 13th century',
  economy:'Church revenues, pilgrimage, local markets, crafts and agricultural support',
  militaryRole:'Ecclesiastical centre protected by a small permanent household and local defensive force',
  researchSummary:'The archiepiscopal seat moved from Žiča to Peć in 1292. By the 1300 snapshot Peć was therefore one of the most important religious and cultural centres of the Serbian kingdom.',
  evidenceNote:'Peć was much smaller than major commercial cities, so Population and Economy remain modest. Technology is high because the archbishopric concentrated literacy, manuscript culture, administration and elite building expertise.',
  sources:[['UNESCO nomination — Patriarchate of Peć','https://whc.unesco.org/uploads/nominations/724bis.pdf'],['Serbia Tourism — medieval monasteries','https://www.serbia.travel/en/monasteries-of-kosovo-and-metohija/']]
 }
,
 {
  id:'1300-huesca',name:'Huesca',modern:'Huesca',country:'Crown of Aragon',subrealm:'Kingdom of Aragon · Upper Aragon',
  lon:-0.4089,lat:42.1362,rarity:1,year:1300,people:6000,populationText:'6.0 K',populationRange:'5–7 K',populationConfidence:'low',
  sizeText:'0.22 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:72,technology:68,economyScore:66,stability:72,
  historicalRole:'Important inland city of the Kingdom of Aragon and one of the principal centres of Upper Aragon',
  economy:'Regional trade, agriculture, crafts, church activity and administrative functions',
  militaryRole:'Fortified inland city with a small permanent defensive core',
  researchSummary:'Huesca remained one of the key urban centres of the Kingdom of Aragon around 1300, with regional political, ecclesiastical and commercial importance.',
  evidenceNote:'Population and urban size are conservative estimates. The city is important at regional level, but not in the same class as Barcelona, Valencia or Zaragoza.',
  sources:[['Britannica — Huesca','https://www.britannica.com/place/Huesca']]
 },
 {
  id:'1300-tarragona',name:'Tarragona',modern:'Tarragona',country:'Crown of Aragon',subrealm:'Principality of Catalonia · Mediterranean port and archbishopric',
  lon:1.2445,lat:41.1189,rarity:1,year:1300,people:7000,populationText:'7.0 K',populationRange:'6–8 K',populationConfidence:'low',
  sizeText:'0.24 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:70,technology:72,economyScore:74,stability:74,
  historicalRole:'Important Catalan port and archiepiscopal city on the Mediterranean',
  economy:'Port trade, wine, agriculture, crafts, church revenues and coastal commerce',
  militaryRole:'Walled coastal city with limited permanent military staffing',
  researchSummary:'Tarragona was an important ecclesiastical and maritime centre in Catalonia, though smaller than Barcelona and Valencia in overall economic scale.',
  evidenceNote:'Navy remains zero because the stat represents a permanent war fleet, not merchant shipping. Population is a low-confidence estimate.',
  sources:[['Britannica — Tarragona','https://www.britannica.com/place/Tarragona-Spain']]
 },
 {
  id:'1300-almeria',name:'Almería',modern:'Almería',country:'Emirate of Granada',subrealm:'Nasrid frontier port of Almería',
  lon:-2.4637,lat:36.8340,rarity:1,year:1300,people:7000,populationText:'7.0 K',populationRange:'6–9 K',populationConfidence:'low',
  sizeText:'0.25 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:74,technology:74,economyScore:76,stability:64,
  historicalRole:'Principal southeastern port of the Nasrid kingdom and an important fortified coastal city',
  economy:'Mediterranean trade, crafts, irrigated agriculture, fishing and port commerce',
  militaryRole:'Fortified port city with a modest permanent defensive core',
  researchSummary:'Almería remained one of the most important coastal cities of the Nasrid realm around 1300 and served as a strategic maritime outlet of Granada.',
  evidenceNote:'Population and footprint are cautious estimates. Economy is strong regionally, but below Málaga and Granada itself.',
  sources:[['Britannica — Almería','https://www.britannica.com/place/Almeria-Spain']]
 },
 {
  id:'1300-andorra-la-vella',name:'Andorra la Vella',modern:'Andorra la Vella',country:'Andorra',subrealm:'Paréage of Andorra · co-lordship of Urgell and Foix',
  lon:1.5211,lat:42.5063,rarity:0,year:1300,people:1200,populationText:'1.2 K',populationRange:'1–2 K',populationConfidence:'low',
  sizeText:'0.08 km²',sizeConfidence:'low',army:20,armyText:'20',navy:0,navyText:'0',
  food:38,technology:38,economyScore:34,stability:72,
  historicalRole:'Small Pyrenean settlement representing the Andorran valleys under the paréage system',
  economy:'Pastoralism, mountain agriculture, local exchange and movement across Pyrenean routes',
  militaryRole:'Very small mountain community with negligible permanent military capacity',
  researchSummary:'The Andorran valleys were governed through the paréage agreements between the bishop of Urgell and the count of Foix. Andorra la Vella is used as the representative settlement for gameplay.',
  evidenceNote:'No reliable c.1300 census survives. Population, footprint and military values are deliberately cautious gameplay estimates.',
  sources:[['Government of Andorra — History of Andorra','https://www.govern.ad/ca/tematiques/cultura-i-esports/patrimoni-cultural/coneixer-el-patrimoni-cultural/historia-d-andorra']]
 },
 {
  id:'1300-perpignan',name:'Perpignan',modern:'Perpignan',country:'Roussillon',subrealm:'County of Roussillon · under the kings of Majorca',
  lon:2.8948,lat:42.6887,rarity:1,year:1300,people:12000,populationText:'12.0 K',populationRange:'10–15 K',populationConfidence:'low',
  sizeText:'0.70 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:68,technology:72,economyScore:80,stability:64,
  historicalRole:'Principal city of Roussillon and a major continental centre of the kings of Majorca',
  economy:'Regional trade, crafts, viticulture, administration and exchange across the eastern Pyrenees',
  militaryRole:'Fortified regional capital with a modest permanent defensive core',
  researchSummary:'Perpignan was one of the key continental centres of the Kingdom of Majorca and is the natural representative city for Roussillon around 1300.',
  evidenceNote:'Population and footprint are cautious gameplay estimates. Political and commercial importance is weighted more heavily than permanent military strength.',
  sources:[['Ville de Perpignan — medieval history','https://www.mairie-perpignan.fr/culture-patrimoine/culture/festivals/grands-rendez-vous-annuels/trobades-medievales']]
 },
 {
  id:'1300-avila',name:'Ávila',modern:'Ávila',country:'Crown of Castile',subrealm:'Kingdom of Castile',
  lon:-4.6977,lat:40.6561,rarity:0,year:1300,people:7000,populationText:'7.0 K',populationRange:'6–9 K',populationConfidence:'low',
  sizeText:'0.33 km²',sizeConfidence:'low',army:80,armyText:'80',navy:0,navyText:'0',
  food:56,technology:55,economyScore:53,stability:64,
  historicalRole:'Strongly fortified Castilian city of the central Meseta',
  economy:'Wool, livestock, crafts, local trade and surrounding agriculture',
  militaryRole:'Walled inland city with unusually strong defensive infrastructure',
  researchSummary:'Ávila was an important repopulated and fortified city of Castile and fits naturally into the central Castilian urban network around 1300.',
  evidenceNote:'Population and size are low-confidence comparative estimates; its fortifications justify a stronger defensive role than its population alone suggests.',
  sources:[['UNESCO — Old Town of Ávila with its Extra-Muros Churches','https://whc.unesco.org/en/list/348']]
 },
 {
  id:'1300-zamora',name:'Zamora',modern:'Zamora',country:'Crown of Castile',subrealm:'Kingdom of León',
  lon:-5.7446,lat:41.5035,rarity:0,year:1300,people:7000,populationText:'7.0 K',populationRange:'6–9 K',populationConfidence:'low',
  sizeText:'0.34 km²',sizeConfidence:'low',army:80,armyText:'80',navy:0,navyText:'0',
  food:58,technology:53,economyScore:52,stability:65,
  historicalRole:'Important Duero city in the Leonese part of the Crown of Castile',
  economy:'Agriculture, livestock, crafts and regional exchange along the Duero corridor',
  militaryRole:'Well-fortified city with strategic value in western Castile and León',
  researchSummary:'Zamora remained a significant fortified urban centre on the Duero and fills the western-northern Castilian map between Salamanca and León.',
  evidenceNote:'Population and footprint are low-confidence gameplay estimates based on regional importance and the scale of the medieval defenses.',
  sources:[['Spain.info — Walls of Zamora','https://www.spain.info/en/places-of-interest/walls-zamora/']]
 }
,
 {
  id:'1300-leeuwarden',name:'Leeuwarden',modern:'Leeuwarden',country:'Frisian Freedom',subrealm:'Frisian Freedom · Nijehove and Oldehove settlement cluster',
  lon:5.7999,lat:53.2012,rarity:0,year:1300,people:2000,populationText:'2.0 K',populationRange:'1.5–3 K',populationConfidence:'low',
  sizeText:'0.15 km²',sizeConfidence:'low',army:30,armyText:'30',navy:0,navyText:'0',
  food:64,technology:52,economyScore:58,stability:61,
  historicalRole:'Emerging Frisian market and waterway settlement within the self-governing Frisian lands',
  economy:'Local trade, agriculture, fishing, river traffic and craft production',
  militaryRole:'Small settlement whose defence depended on local Frisian communities rather than a standing garrison',
  researchSummary:'The later city of Leeuwarden grew from Oldehove, Nijehove and Hoek. By the late 13th century Nijehove had developed into a moated small town, making Leeuwarden the strongest representative settlement for Frisian Freedom around 1300.',
  evidenceNote:'The three settlements were not formally united as the city of Leeuwarden until the 15th century. Population, footprint and military values are cautious gameplay estimates for the c.1300 settlement cluster.',
  sources:[['Visit Friesland — history of Leeuwarden and the Frisian eleven cities','https://www.friesland.nl/nl/blog/historie/de-geschiedenis-van-de-friese-elf-steden'],['Visit Friesland — medieval Frisian freedom','https://www.friesland.nl/nl/blog/historie/de-vrijheidsgeest-van-de-friezen']]
 }
,
 {
  id:'1300-rijeka',name:'Rijeka',modern:'Rijeka',country:'Patriarchate of Aquileia',subrealm:'Flumen Sancti Viti · fortified port in the Duino lordship and Aquileian sphere',
  lon:14.4422,lat:45.3271,mapLon:14.40,mapLat:45.50,rarity:0,year:1300,people:3000,populationText:'3.0 K',populationRange:'2–4 K',populationConfidence:'low',
  sizeText:'0.20 km²',sizeConfidence:'low',army:50,armyText:'50',navy:0,navyText:'0',
  food:62,technology:58,economyScore:64,stability:64,
  historicalRole:'Small fortified Adriatic port and trading settlement at the mouth of the Rječina',
  economy:'Port trade, fishing, crafts, timber and exchange between the coast and inland routes',
  militaryRole:'Walled port-town with a small castle and defensive garrison rather than a standing field army',
  researchSummary:'Medieval Rijeka, known as Flumen Sancti Viti, is documented from the first half of the 13th century as a small fortified town with a castle, church of St Vitus and a lower commercial settlement. Around this period the Counts of Duino were important lords in the area.',
  evidenceNote:'Population, footprint and Army are cautious gameplay estimates. The real coordinates are preserved while the map marker is shifted slightly north so it sits cleanly inside the simplified northern Adriatic map region.',
  sources:[['City of Rijeka — History of Rijeka','https://www.rijeka.hr/en/city-government/history-of-rijeka/']]
 },
 {
  id:'1300-pag',name:'Pag',modern:'Pag',country:'Republic of Venice',subrealm:'Commune of Pag · island community under a Venetian count',
  lon:15.0576,lat:44.4450,rarity:0,year:1300,people:2500,populationText:'2.5 K',populationRange:'2–3.5 K',populationConfidence:'low',
  sizeText:'0.16 km²',sizeConfidence:'low',army:30,armyText:'30',navy:0,navyText:'0',
  food:66,technology:52,economyScore:66,stability:62,
  historicalRole:'Small but organised island commune whose salt and maritime position gave it outsized regional value',
  economy:'Salt production, sheep, fishing, coastal trade and local markets',
  militaryRole:'Small communal settlement with local defensive manpower but no dedicated standing war fleet',
  researchSummary:'Pag had emerged as a distinct commune by the end of the 13th century. Its political position was closely tied to the rivalry between Zadar and Venice, and from 1192 it had a separate count under Venetian influence.',
  evidenceNote:'Population and footprint are low-confidence gameplay estimates. Rarity is Common because Pag was much smaller than Zadar or Split despite its valuable salt economy and communal institutions.',
  sources:[['University of Zadar — formation of the medieval Commune of Pag','https://morepress.unizd.hr/journals/index.php/pov/en/article/view/2078']]
 },
 {
  id:'1300-zadar',name:'Zadar',modern:'Zadar',country:'Republic of Venice',subrealm:'Dalmatian commune under Venetian rector Michael Morosini',
  lon:15.2314,lat:44.1194,rarity:2,year:1300,people:15000,populationText:'15.0 K',populationRange:'12–20 K',populationConfidence:'low',
  sizeText:'0.80 km²',sizeConfidence:'low',army:150,armyText:'150',navy:0,navyText:'0',
  food:72,technology:80,economyScore:84,stability:58,
  historicalRole:'Major fortified Dalmatian city, episcopal centre and one of the eastern Adriatic’s leading commercial communes',
  economy:'Adriatic trade, crafts, shipping, church wealth, markets and links with the Croatian hinterland',
  militaryRole:'Strongly fortified maritime city with a permanent defensive core; ordinary merchant shipping is not counted as a standing Navy',
  researchSummary:'Zadar recovered strongly during the 13th century after the Fourth Crusade sack, rebuilt institutions and churches and expanded trade. In 1300 the city had a Venetian rector, Michael Morosini, while remaining a powerful and frequently contested Dalmatian commune.',
  evidenceNote:'Population is a comparative low-confidence estimate. Rarity is Rare, comparable to Ancona but with greater regional political weight and stronger fortifications; it remains below Venice’s exceptional scale and naval power.',
  sources:[['University of Zadar — Zadar and the Angevin connections in the 13th century','https://morepress.unizd.hr/journals/index.php/radovidz/hr/article/view/2059'],['University of Zadar — Michael Morosini as rector of Zadar, 1299–1301','https://morepress.unizd.hr/journals/index.php/mhm/en/article/view/3173']]
 },
 {
  id:'1300-split',name:'Split',modern:'Split',country:'Kingdom of Hungary',subrealm:'Kingdom of Croatia-Slavonia · autonomous commune in the Croatian-Hungarian sphere',
  lon:16.4402,lat:43.5081,mapLon:16.45,mapLat:43.68,rarity:2,year:1300,people:10000,populationText:'10.0 K',populationRange:'8–13 K',populationConfidence:'low',
  sizeText:'0.65 km²',sizeConfidence:'low',army:100,armyText:'100',navy:0,navyText:'0',
  food:72,technology:79,economyScore:78,stability:62,
  historicalRole:'Leading Dalmatian commune and archiepiscopal city centred on the fortified former palace of Diocletian',
  economy:'Adriatic trade, crafts, church revenues, markets, wine, agriculture and coastal shipping',
  militaryRole:'Fortified commune with civic defenses and a modest permanent armed core rather than a large standing army',
  researchSummary:'Medieval Split functioned as a self-governing commune under changing regional overlords. Its own council and communal institutions were well established, and the city codified its statute in 1312, only a few years after the Cardwars snapshot.',
  evidenceNote:'Population and footprint are cautious gameplay estimates. Rarity is Rare because Split combined a substantial population, archiepiscopal importance, trade and mature communal government, while remaining below Venice in scale and reach.',
  sources:[['City of Split — History of the city','https://split.hr/kategorije/o-splitu/povijest-grada']]
 }
,
 {
  id:'1300-reggio-calabria',name:'Reggio Calabria',modern:'Reggio Calabria',country:'Kingdom of Naples',subrealm:'Calabria Ultra · strategic Strait fortress during the War of the Sicilian Vespers',
  lon:15.6500,lat:38.1113,rarity:2,year:1300,people:12000,populationText:'12.0 K',populationRange:'9–15 K',populationConfidence:'low',
  sizeText:'0.60 km²',sizeConfidence:'low',army:200,armyText:'200',navy:2,navyText:'2',
  food:72,technology:70,economyScore:74,stability:38,
  historicalRole:'Fortified mainland city controlling the eastern side of the Strait of Messina',
  economy:'Strait commerce, coastal shipping, fishing, agriculture, crafts and regional trade',
  militaryRole:'Strategic fortified city with a strong local garrison and limited dedicated naval capability',
  researchSummary:'Reggio remained one of the key fortified cities of southern Calabria during the conflict between the Angevin mainland kingdom and the Aragonese-Sicilian forces. Its position directly opposite Messina made control of the city militarily important around 1300.',
  evidenceNote:'Population and size are low-confidence gameplay estimates. Rarity is Rare: Reggio is strategically much more important than a minor Calabrian town, but remains below Messina, Palermo and Naples in scale and wider economic weight.',
  sources:[['Comune di Reggio Calabria — Castello Aragonese and medieval control','https://comune.reggio-calabria.it/Notizie/Details/2068'],['Turismo Reggio Calabria — archaeology and history','https://turismo.reggiocal.it/en/culture/archeology-and-history']]
 },
 {
  id:'1300-catanzaro',name:'Catanzaro',modern:'Catanzaro',country:'Kingdom of Naples',subrealm:'County of Catanzaro · Ruffo stronghold in Calabria Ultra',
  lon:16.5877,lat:38.9098,rarity:1,year:1300,people:8000,populationText:'8.0 K',populationRange:'6–10 K',populationConfidence:'low',
  sizeText:'0.40 km²',sizeConfidence:'low',army:150,armyText:'150',navy:0,navyText:'0',
  food:69,technology:65,economyScore:63,stability:34,
  historicalRole:'Fortified county seat and episcopal centre in central Calabria',
  economy:'Agriculture, local markets, crafts, church revenues and inland regional exchange',
  militaryRole:'Defensible hill city and feudal stronghold with a modest permanent armed core',
  researchSummary:'Catanzaro was a long-established fortified and episcopal centre. During the War of the Sicilian Vespers it became a contested Ruffo stronghold: it was captured by Sicilian-Aragonese forces in 1297 and was back in Pietro Ruffo’s hands by 1300.',
  evidenceNote:'Population and footprint are cautious gameplay estimates. Rarity is Uncommon: Catanzaro had real political and military relevance as a county seat, but was smaller and less commercially important than the major southern ports.',
  sources:[['Treccani — Catanzaro','https://www.treccani.it/enciclopedia/catanzaro/'],['Treccani — Pietro Ruffo, count of Catanzaro','https://www.treccani.it/enciclopedia/ruffo-pietro-ii-conte-di-catanzaro/']]
 }
];


export const SUPPORT_TERRITORIES_1300=[
 {
  id:'1300-england-home-realm',name:'England home realm',country:'Kingdom of England',year:1300,
  supportTerritory:true,playable:false,packable:false,
  people:1000000,populationText:'1.00 M',populationConfidence:'low',
  army:3500,armyText:'3.5 K',navy:50,navyText:'50',
  food:70,technology:74,economyScore:78,stability:68,
  historicalRole:'Non-playable national support territory representing England on the British Isles',
  economy:'Agriculture, wool, royal taxation, market towns, ports and long-distance trade',
  militaryRole:'National wartime manpower and maritime mobilisation capacity under Edward I',
  researchSummary:'This support entity represents the non-playable English homeland so the Kingdom of England retains national population, military and naval weight even though the British Isles are not represented by packable city cards.',
  evidenceNote:'These are deliberately game-scaled support values rather than literal national totals, so England remains comparable with countries represented mainly through playable city cards. The support territory contributes 1,000,000 population, 3,500 army and 50 navy to the Kingdom of England totals.',
  linkedPlayableCityIds:['1300-perigueux','1300-la-rochelle','1300-bordeaux','1300-bayonne'],
  sources:[
   ['Oxford ORA — English agricultural output and population c.1300','https://ora.ox.ac.uk/objects/uuid:8f6d2c2a-be53-4bdf-b995-b6594689487f'],
   ['Journal of Medieval History — Edward I armies','https://www.sciencedirect.com/science/article/abs/pii/S0304418111000248'],
   ['Cambridge — Edward I / earlier English fleet mobilisation','https://www.cambridge.org/core/books/abs/edward-iii-and-the-war-at-sea/edward-iii-and-resistance-to-the-navy/A1BB96CA711909182877B369866DD65D']
  ]
 }
];

export const CITY_1300=Object.fromEntries(CITIES_1300.map((c,index)=>[c.id,{...c,index}]));
export const RESEARCH_1300_NOTE='Population figures are historical estimates, not census counts. Army, navy and all 0–100 scores are comparative Cardwars gameplay estimates. Food, Economy, Technology and Stability are calibrated across the full current c.1300 set, with roughly 50 as middling, 70–80 as strong, 90+ as exceptional and 100 reserved for the strongest card or tied strongest cards in a category. Political ownership follows the exact c.1300 snapshot, including temporary occupations such as Aragonese Murcia.';
