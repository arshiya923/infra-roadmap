"""Assemble actual browser renders for primary inspection; no acceptance assertion."""
from pathlib import Path
from PIL import Image,ImageDraw
folder=Path(__file__).resolve().parents[1]/'docs/screenshots/devices'
for start in range(0,17,3):
 pieces=[];heights=[]
 for col,i in enumerate(range(start,min(start+3,17))):
  y=35
  for suffix in ['desktop','flow','mobile']:
   im=Image.open(folder/f'device-{i}-{suffix}.png').convert('RGB');im.thumbnail((520,1100));pieces.append((col*540,y,im));y+=im.height+12
  heights.append(y)
 sheet=Image.new('RGB',(1620,max(heights)+10),'white');d=ImageDraw.Draw(sheet)
 for col,i in enumerate(range(start,min(start+3,17))):d.text((col*540+5,5),f'device-{i}',fill='black')
 for x,y,im in pieces:sheet.paste(im,(x,y))
 sheet.save(folder/f'review-{start//3+1}.jpg')
print('Created six sheets; manual inspection required.')
