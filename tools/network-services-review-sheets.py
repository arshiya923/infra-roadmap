"""Assemble actual browser captures for the primary assistant's visual review."""
from pathlib import Path
from PIL import Image,ImageDraw
import json,subprocess
root=Path(__file__).resolve().parents[1];folder=root/'docs/screenshots/network-services';out=folder/'review';out.mkdir(exist_ok=True)
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=root,text=True,encoding='utf-8'));lessons=bundles['11']+bundles['12']
for start in range(0,30,5):
    images=[]
    for col,l in enumerate(lessons[start:start+5]):
        y=55
        for suffix in ['worksheet','flow','mobile']:
            p=folder/f'{l["id"]}-{suffix}.png';im=Image.open(p).convert('RGB');im.thumbnail((340,1000));images.append((col*360+10,y,im));y+=im.height+25
    sheet=Image.new('RGB',(1800,max(y+im.height for x,y,im in images)+20),'#f6f5f1');draw=ImageDraw.Draw(sheet)
    for col,l in enumerate(lessons[start:start+5]):draw.text((col*360+10,12),f'{l["id"]}\n{l["title"]}',fill='black')
    for x,y,im in images:sheet.paste(im,(x,y))
    sheet.save(out/f'{start//5+1:02}-contact.png')
print('6 sheets containing 90 actual worksheet/flow/mobile captures; review is not asserted by this tool.')
