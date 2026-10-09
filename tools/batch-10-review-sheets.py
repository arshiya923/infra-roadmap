"""Make readable local contact sheets for primary visual inspection."""
import json, subprocess
from pathlib import Path
from PIL import Image, ImageDraw
root=Path(__file__).resolve().parents[1]
lessons=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=root))['10']
folder=root/'docs/screenshots/batch-10'
out=folder/'review';out.mkdir(exist_ok=True)
for i,l in enumerate(lessons):
    suffixes=['desktop','flow','mechanism','dark-mobile','light-mobile','table-start','table-end']
    tiles=[]
    for suffix in suffixes:
        p=folder/(l['interactive']+'-lesson-'+suffix+'.png')
        im=Image.open(p).convert('RGB')
        if im.width>1000:
            im.resize((1000,round(im.height*1000/im.width))).save(out/(l['interactive']+'-'+suffix+'-preview.png'))
        tiles.append((suffix,im))
    # Desktop and flow retain their readable full width in a separate sheet.
    for group,selected in [('wide',tiles[:3]),('narrow',tiles[3:])]:
        widths=[im.width for _,im in selected]
        if group=='wide':
            canvas=Image.new('RGB',(max(widths),sum(im.height+32 for _,im in selected)), '#dddddd')
            y=0
            for name,im in selected:
                ImageDraw.Draw(canvas).text((10,y+6),l['title']+' / '+name,fill='black');canvas.paste(im,(0,y+32));y+=im.height+32
        else:
            canvas=Image.new('RGB',(sum(widths),max(im.height for _,im in selected)+32),'#dddddd')
            x=0
            for name,im in selected:
                ImageDraw.Draw(canvas).text((x+5,8),l['title']+' / '+name,fill='black');canvas.paste(im,(x,32));x+=im.width
        canvas.save(out/(str(i).zfill(2)+'-'+group+'.png'))
print('Generated 40 primary review sheets from 140 captured renders.')
