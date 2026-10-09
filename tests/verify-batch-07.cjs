// Re-run existing evidence suites without making an editorial acceptance decision.
const {spawnSync}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),checks=[];
const suites=[
 ['content.cjs','Original IDs/hash, catalog and lesson/question contracts'],
 ['cisco-models.cjs','Bounded CLI/configuration transitions'],
 ['boot-models.cjs','Selected register fields and boot cases'],
 ['storage-models.cjs','Protected dry-run capacity planner'],
 ['lifecycle-models.cjs','Install dependencies and recovery cases'],
 ['port-models.cjs','Ordinary access/trunk classification'],
 ['vlan-control-models.cjs','DTP role table and VTP/voice/aggregation evidence'],
 ['aggregation-models.cjs','LACP/PAgP selected prerequisites'],
 ['image-audit.py','Local byte comparison, CLI errors and cleanup'],
 ['vlan-lab.cjs','Actual isolated Linux membership/fault/recovery and cleanup'],
 ['browser-batch-07.cjs','CLI/register/boot UI'],
 ['browser-flow-visibility.cjs','Mobile active flow step visibility in both zoom states'],
 ['browser-batch-07-acceptance.cjs','Every Batch 07 animation, static alternative and connection target'],
 ['browser-storage.cjs','Storage/image UI and download'],
 ['browser-lifecycle.cjs','Install/recovery UI'],
 ['browser-ports.cjs','VLAN/access/trunk UI and download'],
 ['browser-vlan-control.cjs','DTP/VTP/voice UI'],
 ['browser-channel.cjs','EtherChannel evidence UI'],
 ['browser-aggregation.cjs','LACP/PAgP prerequisite UI'],
 ['browser.cjs','General reader regressions'],
 ['quality-audit.cjs','All authored routes and prerequisite/DOM/search audit']
];
for(const [file,scope] of suites){const command=file.endsWith('.py')?'python':process.execPath,r=spawnSync(command,[path.join(root,'tests',file)],{cwd:root,encoding:'utf8',timeout:120000,env:process.env});const passed=r.status===0&&!r.error;checks.push({suite:'tests/'+file,scope,result:passed?'PASS':'FAIL',exitCode:r.status,error:r.error?.message||null,output:(r.stdout+r.stderr).trim()});console.log((passed?'PASS ':'FAIL ')+file);if(!passed){process.exitCode=1;console.error(r.stderr||r.error?.message||r.stdout);break;}}
fs.writeFileSync(path.join(root,'docs/batch-07-regression-results.json'),JSON.stringify({date:'2026-10-09',result:checks.length===suites.length&&checks.every(c=>c.result==='PASS')?'PASS':'FAIL',checks,limits:'Existing suite scope only. No actual Cisco software/parser, boot/install/recovery, DTP/VTP, physical phone, aggregation, vendor hash, throughput or convergence. This record does not accept a batch or replace technical/editorial review.'},null,2)+'\n');
