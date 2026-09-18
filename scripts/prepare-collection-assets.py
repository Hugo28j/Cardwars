"""Prepare locally hosted photographs, country flags for the collection.
Historical city seeds are authored separately; photos show present-day sites.
Requires Pillow. Use: python scripts/prepare-collection-assets.py
"""
import concurrent.futures,html,io,json,pathlib,re,subprocess,time,urllib.parse,urllib.request
from PIL import Image,ImageOps
ROOT=pathlib.Path(__file__).resolve().parent.parent
ASSETS=ROOT/'assets'
HEADERS={'User-Agent':'CardwarsCollection/1.0 (historical city card prototype)'}
API='https://en.wikipedia.org/w/api.php?'
def get(url,binary=False):
 for i in range(3):
  try:
   time.sleep(.35)
   raw=urllib.request.urlopen(urllib.request.Request(url,headers=HEADERS),timeout=18).read()
   return raw if binary else json.loads(raw)
  except Exception:
   if i==2:raise
   time.sleep(1.5)
def query(params):return get(API+urllib.parse.urlencode({'format':'json',**params}))
def clean(s):return html.unescape(re.sub('<[^>]+>','',s or '')).strip()
def chunks(xs,n=15):
 for i in range(0,len(xs),n):yield xs[i:i+n]
def normalized(t):return t.replace('_',' ').casefold()
cities=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {CITIES} from './src/data.js';console.log(JSON.stringify(CITIES))"],cwd=ROOT))
credits={}
for c in cities:
 p=ASSETS/'cities'/f"{c['id']}.json";im=ASSETS/'cities'/f"{c['id']}.jpg"
 if p.exists() and im.exists():credits[c['id']]=json.loads(p.read_text())
missing=[c for c in cities if c['id'] not in credits]
metadata={}
overrides=json.loads((ROOT/'scripts/photo-overrides.json').read_text())
for group in chunks(missing):
 try:
  data=query({'action':'query','titles':'|'.join(c['article'] for c in group),'redirects':1,'prop':'pageimages','piprop':'thumbnail|name','pithumbsize':640})['query']
  aliases={normalized(x['from']):normalized(x['to']) for x in data.get('normalized',[])+data.get('redirects',[])}
  pages={normalized(p['title']):p for p in data['pages'].values()}
  for c in group:
   name=normalized(c['article']);seen=set()
   while name in aliases and name not in seen:seen.add(name);name=aliases[name]
   page=pages.get(name,{})
   if page.get('thumbnail') and not re.search(r'\.svg|flag|coat.of.arms|location.map|locator.map',page.get('pageimage',''),re.I):metadata[c['id']]={'city':c['id'],'filename':page['pageimage'],'url':page['thumbnail']['source']}
   else:print('NO_PHOTO',c['id'],page.get('pageimage'),flush=True)
  print('Resolved photo metadata',len(metadata),'/',len(missing),flush=True)
 except Exception as e:print('METADATA_ERROR',str(e),flush=True)
for c in missing:
 if c['id'] in overrides:metadata[c['id']]={'city':c['id'],'filename':overrides[c['id']]}
for group in chunks(list(metadata.values())):
 try:
  data=query({'action':'query','titles':'|'.join('File:'+m['filename'] for m in group),'prop':'imageinfo','iiprop':'url|extmetadata','iiurlwidth':640})['query']
  byname={normalized(p['title'][5:]):p.get('imageinfo',[{}])[0] for p in data['pages'].values()}
  for m in group:
   info=byname.get(normalized(m['filename']),{});ext=info.get('extmetadata',{})
   m['url']=m.get('url') or info.get('thumburl') or info.get('url')
   m.update({'title':m['filename'],'source':info.get('descriptionurl','https://commons.wikimedia.org/wiki/File:'+urllib.parse.quote(m['filename'])),'author':clean(ext.get('Artist',{}).get('value')),'license':clean(ext.get('LicenseShortName',{}).get('value')),'licenseUrl':ext.get('LicenseUrl',{}).get('value',''),'caption':'Present-day photograph of the city or historic site; later structures may be visible. Resized and cropped for display.'})
 except Exception as e:print('CREDIT_ERROR',str(e),flush=True)
def download(m):
 if not m.get('license'):raise ValueError('Missing licence '+m['city'])
 raw=get(m['url'],True);im=ImageOps.exif_transpose(Image.open(io.BytesIO(raw))).convert('RGB');im.thumbnail((720,720));im.save(ASSETS/'cities'/f"{m['city']}.jpg",quality=82,optimize=True)
 (ASSETS/'cities'/f"{m['city']}.json").write_text(json.dumps(m,ensure_ascii=False,indent=2));return m
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as ex:
 tasks={ex.submit(download,m):m for m in metadata.values()}
 for future in concurrent.futures.as_completed(tasks):
  try:
   m=future.result();credits[m['city']]=m;print('PHOTO',m['city'],len(credits),'/',len(cities),flush=True)
  except Exception as e:print('DOWNLOAD_ERROR',tasks[future]['city'],str(e),flush=True)
(ASSETS/'photo-credits.json').write_text(json.dumps(list(credits.values()),ensure_ascii=False,indent=2))
(ASSETS/'flags').mkdir(exist_ok=True)
for code in sorted({c['countryCode'] for c in cities}):
 p=ASSETS/'flags'/f'{code}.svg'
 if not p.exists():p.write_bytes(get('https://flagcdn.com/'+code+'.svg',True))
print('COMPLETE',len(credits),'photos;',len(cities)-len(credits),'missing',flush=True)
