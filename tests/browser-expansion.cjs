const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),batch=process.argv[2]||'29',ctx={window:{}};
vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(root,`content/batch-${batch}.js`),'utf8'),ctx);
const lessons=ctx.window.INFRA_BATCHES[batch],base='http://127.0.0.1:8765',checks=[],errors=[];
let browser;
(async()=>{
 browser=await chromium.launch({channel:'msedge',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',permissions:['clipboard-read','clipboard-write']});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.status()+' '+r.url())});
 for(const lesson of lessons){
  await page.goto(`${base}/learn.html#lesson=${lesson.id}`);await page.locator('#incident-evidence').waitFor();assert.equal(await page.locator('h1').innerText(),lesson.title);
  const structure=await page.evaluate(()=>({ids:[...document.querySelectorAll('[id]')].map(e=>e.id),unlabeled:[...document.querySelectorAll('input,textarea,select')].filter(e=>!e.labels?.length&&!e.getAttribute('aria-label')).length}));
  assert.equal(new Set(structure.ids).size,structure.ids.length);assert.equal(structure.unlabeled,0);
  for(let i=0;i<3;i++){const b=page.locator(`[data-phase="${i}"]`);await b.focus();await page.keyboard.press('Enter');assert.equal(await b.getAttribute('aria-pressed'),'true');assert((await page.locator('#incident-evidence').innerText()).includes(lesson.rehearsal.states[i].interpretation));}
  await page.locator('#incident-reset').click();assert.equal(await page.locator('[data-phase="0"]').getAttribute('aria-pressed'),'true');
  await page.locator('#flow-next').click();assert.match(await page.locator('#flow-count').innerText(),/2 \/ 4/);await page.locator('#flow-play').click();assert.equal(await page.locator('#flow-play').innerText(),'Play');await page.locator('#flow-reset').click();
  for(const field of await page.locator('#quick .question').all()){await field.locator('textarea').fill('My prediction is recorded before comparison.');await field.locator('[data-answer]').click();}assert.equal(await page.locator('#quick .feedback:visible').count(),3);
  await page.selectOption('#exam-mode','learning');assert.equal(await page.locator('#exam .feedback:visible').count(),10);await page.selectOption('#exam-mode','exam');assert.equal(await page.locator('#exam .feedback:visible').count(),0);
  await page.locator('[data-copy="0"]').click();assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),lesson.commands[0].code);
  for(const artifact of lesson.artifacts){const response=await context.request.get(base+'/'+artifact.path);assert(response.ok());assert((await response.body()).equals(fs.readFileSync(path.join(root,artifact.path))));}
  for(const theme of ['light','dark'])for(const width of [1440,768,390,320]){
   await page.setViewportSize({width,height:950});await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
   await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   const overflow=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,bad:[...document.querySelectorAll('body *')].filter(e=>{let n=e;while(n&&n!==document.body){if(['auto','scroll','hidden'].includes(getComputedStyle(n).overflowX))return false;n=n.parentElement;}return e.getBoundingClientRect().right>innerWidth+1}).map(e=>({tag:e.tagName,text:e.textContent.slice(0,80)}))}));
   assert(overflow.scroll<=overflow.width+1,`${lesson.id}/${theme}/${width} overflow: ${JSON.stringify(overflow)}`);
  }
  checks.push(lesson.id+': route, structure, three keyboard phases/reset, reduced motion, 13 answers, clipboard, downloads and eight viewport/theme combinations');
 }
 await page.setViewportSize({width:1440,height:1000});await page.goto(`${base}/learn.html#lesson=${lessons[0].id}`);await page.locator('#study-complete').waitFor();
 await page.evaluate(()=>localStorage.setItem('infra-path.progress.v1',JSON.stringify({'s0-g0-t0':'completed','legacy-sentinel':'preserve'})));
 await page.reload();await page.locator('#study-complete').waitFor();await page.locator('#study-complete').click();
 let saved=await page.evaluate(()=>({old:JSON.parse(localStorage.getItem('infra-path.progress.v1')),added:JSON.parse(localStorage.getItem('infra-path.expansion-progress.v1'))}));assert.deepEqual(saved.old,{'s0-g0-t0':'completed','legacy-sentinel':'preserve'});assert.equal(saved.added[lessons[0].id],'completed');
 await page.reload();await page.locator('#study-complete').waitFor();assert.equal(await page.locator('#study-complete').getAttribute('aria-pressed'),'true');assert.match(await page.locator('#editorial-count').innerText(),/442 \/ 442 original/);
 await page.locator('#study-complete').click();await page.locator('#lesson-search').fill(lessons[0].title);await page.waitForFunction(()=>document.querySelector('#search-status').textContent.includes('matches'));assert(await page.locator(`#catalog a[href="#lesson=${lessons[0].id}"]`).count());
 checks.push('Expansion progress persists independently, preserves legacy keys, leaves editorial original count unchanged, and title search finds the lesson');
 await page.locator('#lesson-search').fill('');const out=path.join(root,'docs/screenshots/expansion');fs.mkdirSync(out,{recursive:true});
 await page.evaluate(()=>document.documentElement.dataset.theme='light');await page.locator('#expansion-desk').screenshot({path:path.join(out,`batch-${batch}-desktop.png`)});
 await page.setViewportSize({width:390,height:1000});await page.evaluate(()=>document.documentElement.dataset.theme='dark');await page.locator('#expansion-desk').screenshot({path:path.join(out,`batch-${batch}-mobile.png`)});
 await page.goto('file:///'+path.join(root,'learn.html').replace(/\\/g,'/')+'#lesson='+lessons[2].id);await page.locator('#incident-evidence').waitFor();assert.equal(await page.locator('h1').innerText(),lessons[2].title);checks.push('Direct-file route and incident desk load');
 assert.deepEqual(errors,[]);const result={date:'2026-10-09',batch,result:'PASS',checks,errors,limits:'Local Edge, authored incident records; not platform execution or a complete assistive-technology audit.'};fs.writeFileSync(path.join(root,`docs/browser-expansion-${batch}.json`),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close()});
