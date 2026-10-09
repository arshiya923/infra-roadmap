const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const original=read('content/roadmap-inventory.json'),review=read('content/supporting-review.json'),additions=read('content/expansion-inventory.json').nodes;
assert.equal(review.items.length,84);assert.deepEqual(review.items.map(x=>x.id).sort(),original.supportingNodes.map(x=>x.id).sort());
const ids=new Set([...original.nodes,...additions].map(x=>x.id));
for(const item of review.items){assert.equal(item.status,'reviewed');assert(item.note.length>70);for(const target of [item.reference,item.related]){
 if(target.startsWith('https:'))continue;
 assert(fs.existsSync(path.join(root,target.split('#')[0])),target);
 if(target.startsWith('learn.html#lesson='))assert(ids.has(target.split('=')[1]),target);
}}
let browser;
(async()=>{
 browser=await chromium.launch({channel:'msedge',headless:true});const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/supporting.html');assert.equal(await page.locator('.support-item').count(),84);assert.equal(await page.locator('h1').count(),1);
 for(const theme of ['light','dark'])for(const width of [1440,768,390,320]){await page.setViewportSize({width,height:950});await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),theme+'/'+width);}
 await page.locator('#support-theme').focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.documentElement.dataset.theme),'light');
 await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:path.join(root,'docs/screenshots/expansion/supporting-desktop.png')});
 await page.setViewportSize({width:390,height:1000});await page.locator('#support-theme').click();await page.screenshot({path:path.join(root,'docs/screenshots/expansion/supporting-mobile.png')});
 await page.goto('http://127.0.0.1:8765/index.html');await page.locator('#expansion a[href="supporting.html"]').click();await page.locator('.support-item').first().waitFor();
 await page.goto('http://127.0.0.1:8765/learn.html#lesson=ADD-INFRA-001');await page.locator('#study-complete').waitFor();await page.locator('.header-actions a[href="supporting.html"]').click();await page.locator('.support-item').first().waitFor();
 await page.goto('file:///'+path.join(root,'supporting.html').replace(/\\/g,'/'));assert.equal(await page.locator('.support-item').count(),84);assert.deepEqual(errors,[]);
 const result={date:'2026-10-09',result:'PASS',items:84,collections:5,checks:['Exact original supporting ID coverage','All local references exist and lesson IDs resolve','84 learner-facing review entries','Four widths in both themes','Keyboard theme control','Links from roadmap and reader','Direct-file support','No page exceptions'],limits:'Editorial supporting review, not full certification alignment or physical validation.'};fs.writeFileSync(path.join(root,'docs/supporting-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close()});
