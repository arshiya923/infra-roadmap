const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert/strict'),{chromium}=require('playwright');
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync('content/batch-28.js','utf8'),ctx);const l=ctx.window.INFRA_BATCHES['28'][0],errors=[],checks=[];let browser;
(async()=>{
 browser=await chromium.launch({channel:'msedge',headless:true});const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']}),p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(r.url());});
 await p.goto('http://127.0.0.1:8765/learn.html#lesson=capstone-final');await p.locator('#capstone-tool').waitFor();assert.equal(await p.locator('h1').innerText(),l.title);assert.equal(await p.locator('[data-question]').count(),13);
 assert.match(await p.locator('#capstone-result').innerText(),/160 units.*55 minutes.*10 minutes/);
 for(const [stage,expected] of [['baseline','160 usable'],['power','PDU A'],['san','HBA B'],['site','fence']]){await p.locator('[data-capstone-case="'+stage+'"]').focus();await p.keyboard.press('Enter');assert((await p.locator('#capstone-case').innerText()).includes(expected));}
 await p.locator('#capstone-restore').fill('40');await p.locator('#capstone-age').fill('20');assert.match(await p.locator('#capstone-result').innerText(),/70 minutes.*EXCEEDS RTO.*EXCEEDS RPO/);
 await p.locator('#capstone-demand').fill('');assert(await p.locator('#capstone-result').isHidden());assert(await p.locator('#capstone-error').isVisible());await p.locator('#capstone-reset').click();assert(await p.locator('#capstone-result').isVisible());checks.push('four keyboard cases; budget failures; invalid input clears stale result; reset');
 for(const q of [...l.quick,...l.exams]){const item=p.locator('[data-question="'+q.questionId+'"]');assert(await item.locator('.feedback').isHidden());await item.locator('textarea').fill(q.answer);await item.locator('button').click();assert((await item.locator('.feedback').innerText()).includes(q.answer));}checks.push('all 13 assessment submissions and answer explanations');
 await p.locator('#flow-next').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('#flow-count').innerText(),'2 / 4');await p.locator('#flow-reset').click();await p.emulateMedia({reducedMotion:'reduce'});await p.locator('#flow-play').click();assert.equal(await p.locator('#flow-play').innerText(),'Play');
 await p.locator('[data-copy="0"]').click();assert.equal((await p.evaluate(()=>navigator.clipboard.readText())).replace(/\r\n/g,'\n'),l.commands[0].code);
 const editorial=await p.locator('#editorial-count').innerText();await p.locator('#study-complete').click();assert.equal(await p.locator('#editorial-count').innerText(),editorial);await p.locator('#study-complete').click();checks.push('flow keyboard/reset/reduced motion; exact copy; separate learner/editorial progress');
 for(const a of l.artifacts){const [d]=await Promise.all([p.waitForEvent('download'),p.locator('a[download][href="'+a.path+'"]').click()]);assert.equal(fs.readFileSync(await d.path(),'utf8'),fs.readFileSync(a.path,'utf8'));}checks.push('both downloads byte-equivalent');
 fs.mkdirSync('docs/screenshots/capstone',{recursive:true});
 for(const width of [1440,768,390,320])for(const theme of ['light','dark']){
  await p.setViewportSize({width,height:1000});await p.evaluate(t=>document.documentElement.dataset.theme=t,theme);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow '+width+' '+theme);
  if(width===1440||width===390){await p.locator('#capstone-tool').screenshot({path:`docs/screenshots/capstone/${width}-${theme}.png`});}
 }checks.push('eight viewport/theme combinations without document overflow');
 await p.setViewportSize({width:1440,height:1000});await p.locator('#visual').screenshot({path:'docs/screenshots/capstone/flow.png'});
 await p.goto('file:///'+path.resolve('learn.html').replace(/\\/g,'/')+'#lesson=capstone-final');await p.locator('#capstone-tool').waitFor();assert.equal(await p.locator('h1').innerText(),l.title);checks.push('direct-file lesson and model load');
 assert.deepEqual(errors,[]);fs.writeFileSync('docs/browser-capstone-results.json',JSON.stringify({result:'PASS',checks,errors},null,2)+'\n');console.log(JSON.stringify({result:'PASS',checks,errors}));
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();});
