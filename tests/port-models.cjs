const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync('scripts/port-models.js','utf8'),ctx);const path=ctx.window.PortModels.path;
const vids=[10,20,99],subsets=Array.from({length:8},(_,mask)=>vids.filter((_,i)=>mask&(1<<i)));let cases=0;
for(const src of [10,20])for(const dst of [10,20])for(const na of vids)for(const nb of vids)for(const aa of subsets)for(const ab of subsets)for(const tag of [false,true]){
 const r=path(src,dst,na,nb,aa,ab,tag),sent=aa.includes(src),wireVid=tag||src!==na?src:null,classified=sent?(wireVid===null?nb:wireVid):null;
 assert.equal(r.sent,sent);assert.equal(r.wireTag,sent?wireVid:null);assert.equal(r.received,classified);assert.equal(r.admitted,sent&&ab.includes(classified));assert.equal(r.delivered,sent&&ab.includes(classified)&&classified===dst);assert.equal(r.reclassified,sent&&classified!==src);cases++;
}
const mismatch=path(10,20,10,20,[10,20],[10,20]);assert.equal(mismatch.delivered,true);assert.equal(mismatch.reclassified,true);assert.match(mismatch.warning,/segmentation fault/);
const tagged=path(10,10,10,20,[10,20],[10,20],true);assert.equal(tagged.delivered,true);assert.equal(tagged.reclassified,false);
for(const fn of [()=>path(0,10,99,99,[],[]),()=>path('10',10,99,99,[],[]),()=>path(10,10,99,99,null,[]),()=>path(10,10,99,99,[4095],[]),()=>path(10,10,99,99,[],[],1)])assert.throws(fn);
fs.writeFileSync('docs/port-models-results.json',JSON.stringify({date:'2026-10-09',result:'PASS',cases,checks:['Independent source/wire/receive/destination truth table','Native mismatch can reclassify into another domain','Shared native-tag policy preserves selected VLAN','Invalid inputs rejected'],limits:'Ordinary-frame teaching path only; no actual Cisco forwarding, control protocols or native-tag platform execution'},null,2)+'\n');console.log(`PASS ${cases} ordinary-frame path cases and native mismatch boundaries`);
