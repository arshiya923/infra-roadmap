// Capture actual rendered diagrams for manual editorial review; no acceptance mutation.
const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),ids=process.argv.slice(2);let browser;
(async()=>{
 if(!ids.length||ids.some(id=>!/^s\d+-g\d+-t\d+$/.test(id)))throw new Error('Provide original topic IDs');
 const folder=path.join(root,'docs/screenshots/batch-07/review');fs.mkdirSync(folder,{recursive:true});
 browser=await chromium.launch({channel:'msedge',headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}});
 for(const id of ids){await page.goto('http://127.0.0.1:8765/learn.html#lesson='+id);await page.locator('#flow-next').waitFor();
  await page.locator('#visual').screenshot({path:path.join(folder,id+'-flow.png')});
  await page.locator('.lab-topology').screenshot({path:path.join(folder,id+'-lab-path.png')});
 }
 await page.setViewportSize({width:320,height:1000});await page.goto('http://127.0.0.1:8765/learn.html#lesson='+ids.at(-1));await page.locator('#flow-next').waitFor();
 await page.locator('#mechanism .callout').screenshot({path:path.join(folder,ids.at(-1)+'-example-mobile.png')});
 console.log('Captured '+ids.length+' flow/lab-path pairs and final mobile example. Manual inspection still required.');
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();});
