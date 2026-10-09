// Inspect scroll endpoints and guided configuration layout; no editorial mutation.
const {chromium}=require('playwright'),path=require('node:path');let browser;
(async()=>{browser=await chromium.launch({channel:'msedge',headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}});const folder=path.resolve(__dirname,'../docs/screenshots/batch-07/review');
for(const id of ['s2-g1-t2','s2-g3-t0','s2-g3-t2']){await page.goto('http://127.0.0.1:8765/learn.html#lesson='+id);const lab=page.locator('.lab-topology');await lab.waitFor();for(const edge of ['start','end']){await lab.evaluate((e,edge)=>e.scrollLeft=edge==='start'?0:e.scrollWidth,edge);await lab.screenshot({path:path.join(folder,id+'-lab-path-'+edge+'.png')});}}
await page.setViewportSize({width:320,height:1000});await page.goto('http://127.0.0.1:8765/learn.html#lesson=s2-g3-t1');await page.locator('#practice .command').nth(3).screenshot({path:path.join(folder,'lacp-prepare-mobile.png')});console.log('Captured scroll endpoints and LACP preparation command.');
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();});
