'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(root,'content/batch-27.js'),'utf8'),ctx);
const lessons=ctx.window.INFRA_BATCHES['27'],errors=[],checks=[],folder=path.join(root,'docs/screenshots/troubleshooting');fs.mkdirSync(folder,{recursive:true});let browser;
(async()=>{
 browser=await chromium.launch({channel:'msedge',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});const p=await context.newPage();
 p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(r.url()+' '+r.status());});
 for(const l of lessons){
  await p.setViewportSize({width:1440,height:1000});await p.goto('http://127.0.0.1:8765/learn.html#lesson='+l.id);await p.locator('#tm-tool').waitFor();
  assert.equal(await p.locator('h1').innerText(),l.title);assert.equal(await p.locator('[data-question]').count(),13);
  for(const s of ['baseline','fault','recovery']){
   await p.locator('[data-tm-stage="'+s+'"]').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('#tm-observation').innerText(),l.incident[s]);
   assert(await p.locator('#tm-reasoning').isHidden());await p.locator('#tm-prediction').fill('Compare the boundary with a competing explanation.');
   await p.locator('#tm-reveal').click();assert((await p.locator('#tm-reasoning').innerText()).includes(l.incident.test));
   assert.equal(await p.locator('[data-tm-stage="'+s+'"]').getAttribute('aria-pressed'),'true');
  }
  await p.locator('#tm-reset').click();assert.equal(await p.locator('#tm-prediction').inputValue(),'');assert.equal(await p.locator('#tm-observation').innerText(),l.incident.baseline);assert(await p.locator('#tm-reasoning').isHidden());
  for(const q of [...l.quick,...l.exams]){const item=p.locator('[data-question="'+q.questionId+'"]');assert(await item.locator('.feedback').isHidden());await item.locator('textarea').fill(q.answer);await item.locator('button').click();assert((await item.locator('.feedback').innerText()).includes(q.answer));}
  await p.locator('#exam-reset').click();assert(await p.locator('#exam-questions .feedback').first().isHidden());
  await p.locator('#flow-next').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('#flow-count').innerText(),'2 / 4');await p.locator('#flow-reset').click();
  await p.emulateMedia({reducedMotion:'reduce'});await p.locator('#flow-play').click();assert.equal(await p.locator('#flow-play').innerText(),'Play');await p.emulateMedia({reducedMotion:'no-preference'});
  await p.locator('[data-copy="0"]').click();assert.equal((await p.evaluate(()=>navigator.clipboard.readText())).replace(/\r\n/g,'\n'),l.commands[0].code);
  const editorial=await p.locator('#editorial-count').innerText();await p.locator('#study-complete').click();assert.equal(await p.locator('#editorial-count').innerText(),editorial);await p.locator('#study-complete').click();
  for(let i=0;i<l.artifacts.length;i++){const [download]=await Promise.all([p.waitForEvent('download'),p.locator('a[download]').nth(i).click()]);assert.equal(fs.readFileSync(await download.path(),'utf8'),fs.readFileSync(path.join(root,l.artifacts[i].path),'utf8'));}
  const dom=await p.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(x=>x.id);return {duplicates:ids.filter((x,i)=>ids.indexOf(x)!==i),unnamed:[...document.querySelectorAll('input,textarea,select')].filter(x=>!(x.labels?.length||x.getAttribute('aria-label'))).map(x=>x.id)};});assert.deepEqual(dom,{duplicates:[],unnamed:[]});
  for(const width of [1440,768,390,320])for(const theme of ['light','dark']){await p.setViewportSize({width,height:1000});await p.evaluate(t=>document.documentElement.dataset.theme=t,theme);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),l.id+' overflow '+width+' '+theme);}
  if(['trouble-0','trouble-8','trouble-15','trouble-20'].includes(l.id)){
   await p.locator('#tm-tool').screenshot({path:path.join(folder,l.id+'-mobile.png')});
   await p.setViewportSize({width:1440,height:1000});await p.evaluate(()=>document.documentElement.dataset.theme='light');await p.locator('#tm-tool').screenshot({path:path.join(folder,l.id+'-desktop.png')});await p.locator('#visual').screenshot({path:path.join(folder,l.id+'-flow.png')});
  }
  await p.goto('file:///'+path.join(root,'learn.html').replace(/\\/g,'/')+'#lesson='+l.id);await p.locator('#tm-tool').waitFor();assert.equal(await p.locator('h1').innerText(),l.title);
  checks.push({id:l.id,questions:13,stages:3,widths:[1440,768,390,320],themes:2,downloads:l.artifacts.length,file:true,result:'PASS'});console.log('PASS '+l.id);
 }
 await p.goto('http://127.0.0.1:8765/learn.html#lesson=trouble-0');await p.locator('#tm-tool').waitFor();await p.locator('#lesson-search').fill('negative-cache');await p.waitForFunction(()=>document.querySelector('#catalog')?.textContent.includes('DNS troubleshooting'));assert((await p.locator('#catalog').innerText()).includes('DNS troubleshooting'));
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(root,'docs/browser-troubleshooting-mastery-results.json'),JSON.stringify({result:'PASS',topics:checks.length,checks,errors,batchSHA256:require('crypto').createHash('sha256').update(fs.readFileSync(path.join(root,'content/batch-27.js'))).digest('hex')},null,2)+'\n');
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();});
