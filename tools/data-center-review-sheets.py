"""Assemble actual browser screenshots; human visual review remains separate."""
from pathlib import Path
from PIL import Image,ImageDraw
import json,subprocess
R=Path(__file__).resolve().parents[1];folder=R/'docs/screenshots/data-center';out=folder/'review';out.mkdir(exist_ok=True)
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=R,text=True,encoding='utf-8'))
lessons=bundles.get('15',[])+bundles.get('16',[])
for start in range(0,len(lessons),4):
 images=[]
 for col,l in enumerate(lessons[start:start+4]):
  y=55
  for suffix in ['worksheet','flow','mobile']:
   im=Image.open(folder/f'{l["id"]}-{suffix}.png').convert('RGB');im.thumbnail((400,1100));images.append((col*420+10,y,im));y+=im.height+25
 sheet=Image.new('RGB',(1680,max(y+im.height for x,y,im in images)+20),'#f6f5f1');draw=ImageDraw.Draw(sheet)
 for col,l in enumerate(lessons[start:start+4]):draw.text((col*420+10,12),f'{l["id"]}\n{l["title"]}',fill='black')
 for x,y,im in images:sheet.paste(im,(x,y))
 sheet.save(out/f'{start//4+1:02}-contact.png')
print(f'{(len(lessons)+3)//4} sheets of {len(lessons)*3} actual worksheet/flow/mobile captures; review is not asserted.')
