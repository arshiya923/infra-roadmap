"""Arrange actual screenshots for primary visual inspection; does not assert review."""
from pathlib import Path
from PIL import Image,ImageDraw
import json,subprocess,sys
R=Path(__file__).resolve().parents[1];batch=sys.argv[1];folder=R/'docs/screenshots/automation'
ls=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],text=True,encoding='utf-8'))[batch]
for start in range(0,len(ls),4):
 pieces=[];heights=[]
 for col,l in enumerate(ls[start:start+4]):
  y=40
  for suffix in ['desktop','flow','mobile']:
   im=Image.open(folder/f'{l["id"]}-{suffix}.png').convert('RGB');im.thumbnail((400,800));pieces.append((col*420,y,im));y+=im.height+15
  heights.append(y)
 sheet=Image.new('RGB',(1680,max(heights)+10),'white');d=ImageDraw.Draw(sheet)
 for col,l in enumerate(ls[start:start+4]):d.text((col*420+5,5),l['id']+' '+l['title'],fill='black')
 for x,y,im in pieces:sheet.paste(im,(x,y))
 sheet.save(folder/f'batch-{batch}-review-{start//4+1}.jpg')
print('Created', (len(ls)+3)//4,'contact sheets for batch',batch)
