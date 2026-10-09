'use strict';
// Dedicated primary render capture. Wait for the browser compositor after scrolling.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),{chromium}=require('playwright'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(root,'content/batch-10.js'),'utf8'),ctx);
let browser;
(async()=>{browser=await chromium.launch({channel:'msedge',headless:true});const p=await browser.newPage({viewport:{width:1440,height:1000}});await p.emulateMedia({reducedMotion:'reduce'});
 const folder=path.join(root,'docs/screenshots/batch-10');fs.mkdirSync(folder,{recursive:true});
 for(const l of ctx.window.INFRA_BATCHES['10'].filter(l=>process.argv.length<3||process.argv.slice(2).includes(l.interactive))){
  await p.setViewportSize({width:1440,height:1000});await p.goto('http://127.0.0.1:8765/learn.html#lesson='+l.id);await p.locator('#lab .en-tool').waitFor();await p.evaluate(()=>document.documentElement.dataset.theme='light');
  const capture=async(locator,suffix)=>{await locator.scrollIntoViewIfNeeded();await p.waitForTimeout(600);await locator.screenshot({animations:'disabled',path:path.join(folder,l.interactive+'-lesson-'+suffix+'.png')});};
  await capture(p.locator('#lab .en-tool'),'desktop');await capture(p.locator('#mechanism'),'mechanism');await capture(p.locator('#visual'),'flow');
  await p.setViewportSize({width:320,height:1000});for(const theme of ['light','dark']){await p.evaluate(t=>document.documentElement.dataset.theme=t,theme);await capture(p.locator('#lab .en-tool'),theme+'-mobile');}
  const region=p.locator('#lab .en-tool .en-scroll').first();for(const edge of ['start','end']){await region.evaluate((e,edge)=>{e.style.scrollBehavior='auto';e.scrollLeft=edge==='start'?0:e.scrollWidth},edge);await capture(region,'table-'+edge);}
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));console.log('CAPTURED seven stable renders '+l.id);
 }
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close()});
