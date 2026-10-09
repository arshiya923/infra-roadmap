'use strict';
// Primary shared-reader verification. Protocol truth is checked separately.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(root,'content/batch-10.js'),'utf8'),ctx);
const inventory=JSON.parse(fs.readFileSync(path.join(root,'content/roadmap-inventory.json'),'utf8'));
const map={
 'route-filtering':['rf','RouteControlModels'],'route-redistribution':['rd','RouteControlModels'],'route-maps':['rm','RouteControlModels'],'prefix-lists':['pl','RouteControlModels'],'access-lists':['acl','RouteControlModels'],
 'vrf':['vf','VrfScopeModels'],'vrf-lite':['vl','VrfScopeModels'],hsrp:['hs','GatewayRedundancyModels'],vrrp:['vr','GatewayRedundancyModels'],glbp:['gl','GatewayRedundancyModels'],
 'multicast-fundamentals':['mc','MulticastModels'],pim:['pm','MulticastModels'],igmp:['ig','MulticastModels'],
 classification:['qc','QosLabelModels'],marking:['qm','QosLabelModels'],
 'qos-fundamentals':['qf','QosServiceModels'],policing:['qp','QosServiceModels'],shaping:['qs','QosServiceModels'],queuing:['qq','QosServiceModels'],
 'advanced-lab':['al','AdvancedLabModels']};
const lessons=ctx.window.INFRA_BATCHES['10'].filter(l=>process.argv.length<3||process.argv.slice(2).includes(l.id)||process.argv.slice(2).includes(l.interactive));
const folder=path.join(root,'docs/screenshots/batch-10');fs.mkdirSync(folder,{recursive:true});let browser;const checks=[],errors=[];
(async()=>{
 browser=await chromium.launch({channel:'msedge',headless:true});const p=await browser.newPage({viewport:{width:1440,height:1000}});
 p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(r.url())});
 for(const l of lessons){
  const [prefix,namespace]=map[l.interactive]||[];assert(prefix,l.id+' interactive mapping');
  await p.setViewportSize({width:1440,height:1000});await p.emulateMedia({reducedMotion:'no-preference'});
  await p.goto('http://127.0.0.1:8765/learn.html#lesson='+l.id);await p.locator('#'+prefix+'-tool').waitFor();
  assert.equal(await p.locator('h1').innerText(),inventory.nodes.find(n=>n.id===l.id).name);assert.equal(await p.locator('.lesson-section').count(),10);assert.equal(await p.locator('[data-question]').count(),13);assert.equal(await p.locator('#practice .command').count(),l.commands.length);
  const catalog=await p.evaluate(([n,k])=>window[n].catalog(k),[namespace,l.interactive]);assert(catalog.length>=8,l.id+' scenarios');
  for(const c of catalog){const valid=await p.evaluate(([n,k,id])=>{try{window[n].evaluate(k,window[n].preset(k,id));return true}catch{return false}},[namespace,l.interactive,c.id]);
   await p.selectOption('#'+prefix+'-case',c.id);assert.equal(await p.locator('#'+prefix+'-output').isVisible(),valid,l.id+' '+c.id);assert.equal(await p.locator('#'+prefix+'-error').isVisible(),!valid);}
  await p.evaluate(prefix=>{const e=document.getElementById(prefix+'-case'),o=document.createElement('option');o.value='unknown-case';o.textContent='Unknown test context';e.append(o);e.value=o.value;e.dispatchEvent(new Event('change',{bubbles:true}));},prefix);
  assert(await p.locator('#'+prefix+'-output').isHidden());assert(await p.locator('#'+prefix+'-error').isVisible());
  const checkbox=p.locator('#'+prefix+'-tool input[type=checkbox]').first();if(await checkbox.count()){await checkbox.setChecked(!(await checkbox.isChecked()));assert(await p.locator('#'+prefix+'-output').isHidden());}
  await p.locator('#'+prefix+'-reset').focus();await p.keyboard.press('Enter');assert(await p.locator('#'+prefix+'-output').isVisible());
  const input=p.locator('#'+prefix+'-tool input:not([type=checkbox]), #'+prefix+'-tool textarea').first();
  if(await input.count()){const type=await input.getAttribute('type');await input.fill(type==='number'?'1.5':'<img src=x onerror=window.badInputExecuted=true>');assert(await p.locator('#'+prefix+'-output').isHidden(),l.id+' invalid typed input hides stale result');assert(await p.locator('#'+prefix+'-error').isVisible());assert.equal(await p.evaluate(()=>window.badInputExecuted),undefined);await p.locator('#'+prefix+'-reset').click();}
  const select=p.locator('#'+prefix+'-tool select:not(#'+prefix+'-case)').first();
  if(await select.count()){await select.evaluate(e=>{const o=document.createElement('option');o.value='unknown-value';e.append(o);e.value=o.value;e.dispatchEvent(new Event('change',{bubbles:true}))});assert(await p.locator('#'+prefix+'-output').isHidden());await p.locator('#'+prefix+'-reset').click();}
  for(const q of l.exams){const e=p.locator('[data-question="'+q.questionId+'"]');await e.getByLabel(q.answer,{exact:true}).check();await e.locator('button').click();assert.match(await e.locator('.feedback').innerText(),/^Correct/,q.questionId);}
  await p.evaluate(()=>document.documentElement.dataset.theme='light');
  for(const [section,suffix] of [['#'+prefix+'-tool','desktop'],['#mechanism','mechanism'],['#visual','flow']]){await p.locator(section).scrollIntoViewIfNeeded();await p.waitForTimeout(300);await p.locator(section).screenshot({path:path.join(folder,l.interactive+'-lesson-'+suffix+'.png')});}
  for(const width of [1440,768,390,320])for(const theme of ['light','dark']){await p.setViewportSize({width,height:1000});await p.evaluate(t=>document.documentElement.dataset.theme=t,theme);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),l.id+' '+width+' '+theme);if(width===320)await p.locator('#'+prefix+'-tool').screenshot({path:path.join(folder,l.interactive+'-lesson-'+theme+'-mobile.png')});}
  const region=p.locator('#'+prefix+'-tool .en-scroll').first();assert.equal(await region.getAttribute('role'),'region');assert.equal(await region.getAttribute('tabindex'),'0');assert(await region.getAttribute('aria-label'));await region.focus();await p.keyboard.press('ArrowRight');await p.waitForTimeout(250);
  for(const edge of ['start','end']){await region.evaluate((e,edge)=>{e.style.scrollBehavior='auto';e.scrollLeft=edge==='start'?0:e.scrollWidth},edge);assert(await region.evaluate((e,edge)=>Math.abs(e.scrollLeft-(edge==='start'?0:e.scrollWidth-e.clientWidth))<=1,edge));await region.screenshot({path:path.join(folder,l.interactive+'-lesson-table-'+edge+'.png')});}
  await p.locator('#flow-reset').click();for(let i=0;i<4;i++){assert.equal(await p.locator('#flow-count').innerText(),(i+1)+' / 4');if(i<3)await p.locator('#flow-next').click();}
  await p.locator('#flow-reset').click();await p.emulateMedia({reducedMotion:'reduce'});assert(await p.getByText('Read the complete static sequence',{exact:true}).isVisible());
  const accepted=await p.locator('#editorial-count').innerText();await p.locator('#study-complete').click();assert.equal(JSON.parse(await p.evaluate(()=>localStorage.getItem('infra-path.progress.v1')))[l.id],'completed');assert.equal(await p.locator('#editorial-count').innerText(),accepted);await p.locator('#study-complete').click();
  await p.goto('file:///'+path.join(root,'learn.html').split(path.sep).join('/')+'#lesson='+l.id);await p.locator('#'+prefix+'-tool').waitFor();assert(await p.locator('#'+prefix+'-output').isVisible());
  checks.push({topicId:l.id,interactive:l.interactive,result:'PASS',presets:catalog.length,exams:10,quick:3,widths:[1440,768,390,320],themes:['light','dark'],screens:7,file:true});
 }
 assert.deepEqual(errors,[]);const file=process.argv.length>2?'browser-batch-10-selected-results.json':'browser-batch-10-results.json';fs.writeFileSync(path.join(root,'docs',file),JSON.stringify({date:'2026-10-09',result:'PASS',checks,errors,scope:'Reader/UI contract. Protocol truth, guided target commands and primary manual rendering review are separate.'},null,2)+'\n');console.log('PASS '+checks.length+' Batch10 integrated lesson routes');
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close()});
