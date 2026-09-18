import json,pathlib
root=pathlib.Path(__file__).resolve().parent.parent
rows=json.loads((root/'scripts/city-seeds.json').read_text())
head='''// Late-antique places, c. 600 CE. Modern flags identify present-day geography.
// Every numerical stat and rarity is an authored, deterministic gameplay value.
export const COUNTRIES={it:'Italy',fr:'France',es:'Spain',pt:'Portugal',be:'Belgium',nl:'Netherlands',de:'Germany',ch:'Switzerland',at:'Austria',hr:'Croatia',si:'Slovenia',rs:'Serbia',bg:'Bulgaria',gr:'Greece',al:'Albania',tr:'Türkiye',ro:'Romania'};
export const RARITIES=['Common','Uncommon','Rare','Epic','Legendary'];
export const RARITY_COLORS=['#a5b7b1','#80bca7','#81b4e5','#bd99df','#e5b869'];
export const DUPLICATE_COINS=[10,25,60,150,400];
export const PACK={id:'europe',name:'Europe pack',cards:5,odds:[50,28,15,6,1],cost:0};
const SEEDS='''
tail=''';
const hash=s=>[...s].reduce((h,c)=>(Math.imul(h,31)+c.charCodeAt(0))>>>0,7);
const ports=new Set(['rome','ravenna','genoa','naples','bari','taranto','brindisi','otranto','salerno','rimini','aquileia','pisa','luni','marseille','narbonne','nantes','bordeaux','seville','tarragona','barcelona','valencia','lisbon','porto','faro','salona','split','zadar','trogir','pula','porec','koper','varna','nesebar','athens','thessalonica','corinth','patras','nicopolis','durres','constantinople','constanta','mangalia','histria']);
export const CITIES=SEEDS.map(([id,name,modern,countryCode,lon,lat,rarity,realm,article],index)=>{
 const h=hash(id),people=[3500,10500,22000,50000,105000][rarity]+h%[6000,14000,25000,45000,85000][rarity];
 const city={id,name,modern,countryCode,country:COUNTRIES[countryCode],flag:`assets/flags/${countryCode}.svg`,region:'Europe',lon,lat,rarity,realm,article,index,
  food:48+(h%45),army:[600,1800,4500,8000,12000][rarity]+h%[1300,2200,3500,5000,9000][rarity],navy:ports.has(id)?8+rarity*20+h%24:0,
  people,size:350+rarity*550+h%650,technology:40+rarity*10+h%17,satisfaction:48+h%38,
  image:`assets/cities/${id}.jpg`,source:`https://en.wikipedia.org/wiki/${encodeURIComponent(article.replaceAll(' ','_'))}`,
  description:`${name}${name!==modern?` (present-day ${modern})`:''} is a late-antique settlement in the area of modern ${COUNTRIES[countryCode]}. Around 600 CE its regional context was ${realm}.`};
 if(id==='constantinople')Object.assign(city,{people:450000,army:24000,navy:180,technology:91,size:2800,description:'The Eastern Roman imperial capital controls the meeting point of Europe and Asia. This card represents the historic city on the European side of the Bosporus.'});
 if(id==='rome')Object.assign(city,{people:45000,army:6800,technology:75,description:'The former imperial capital remains a religious centre. Its legendary status reflects its exceptional historical importance, although its population and military power have declined.'});
 if(id==='toledo')city.description='The royal centre of the Visigothic kingdom stands above the Tagus. Its court and church councils give it exceptional political importance.';
 if(id==='thessalonica')Object.assign(city,{people:90000,army:12500,description:'A major fortified port in the Balkans, linking the Aegean with the roads of the northern provinces.'});
 if(id==='narbonne'||id==='nimes')city.description+=' Septimania was still Visigothic at this date, despite lying within modern France.';
 if(['teurnia','aguntum','histria','ptuj','aquileia','salona'].includes(id))city.description+=' This is a period of regional upheaval and urban contraction; local control and settlement continuity are not known with exact precision.';
 return city;
});
export const CITY=Object.fromEntries(CITIES.map(c=>[c.id,c]));
'''
(root/'src/data.js').write_text(head+json.dumps(rows,ensure_ascii=False,separators=(',',':'))+tail)
print('Built',len(rows),'city cards')
