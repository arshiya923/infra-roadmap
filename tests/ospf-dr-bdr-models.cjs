'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),model=require('../scripts/ospf-dr-bdr-models.js');
const root=path.resolve(__dirname,'..'),names=['R1','R2','R3','R4'];
// Independent per-router declaration calculation: RFC 2328 9.4 steps 2–4.
// Local recalculation and rounds yield consensus; this is not the model's
// incumbent/vacancy shortcut. Departed routers lose their prior declarations.
function oracle(priorities,events){let declarations=['Other','Other','Other','Other'],previous=0;const history=[];
 for(const mask of events){const present=i=>!!(mask&(1<<i));declarations=declarations.map((v,i)=>present(i)&&(previous&(1<<i))?v:'Other');const candidates=names.map((_,i)=>i).filter(i=>present(i)&&priorities[i]>0);
  const highest=list=>list.reduce((best,i)=>best===null||priorities[i]>priorities[best]||priorities[i]===priorities[best]&&i>best?i:best,null);
  let stable=false,outputs;
  for(let round=0;round<10;round++){
   outputs=names.map((_,self)=>{if(!present(self))return {dr:null,bdr:null,role:'Other'};const local=declarations.slice();let dr,bdr;
    for(let pass=0;pass<2;pass++){const backup=candidates.filter(i=>local[i]!=='DR'),declared=backup.filter(i=>local[i]==='BDR');bdr=highest(declared.length?declared:backup);const designated=candidates.filter(i=>local[i]==='DR');dr=designated.length?highest(designated):bdr;const next=self===dr?'DR':self===bdr?'BDR':'Other';if(local[self]===next)break;local[self]=next;}
    return {dr,bdr,role:local[self]};});
   const next=outputs.map(v=>v.role);stable=next.every((v,i)=>v===declarations[i]);declarations=next;if(stable)break;
  }
  assert(stable,'declaration oracle failed to settle');const active=outputs.filter((_,i)=>present(i)),dr=active[0]?.dr??null,bdr=active[0]?.bdr??null;for(const o of active)assert.deepEqual([o.dr,o.bdr],[dr,bdr],'settled consensus');
  history.push({dr:dr===null?null:names[dr],bdr:bdr===null?null:names[bdr],roles:names.map((_,i)=>!present(i)?'Absent':declarations[i]==='Other'?'DROther':declarations[i])});previous=mask;
 }return history;
}
const profiles=[[100,50,0,200],[1,1,1,1],[0,0,0,0],[255,0,0,0],[0,1,2,3],[255,254,253,252],[1,255,1,255],[0,0,1,0],[0,0,0,255],[1,0,1,0],[42,42,0,42],[200,1,255,50]];
let vectors=0;function check(priorities,events){const s={priorities,events,ribReady:true,forwardReady:true,returnReady:true},before=JSON.stringify(s),r=model.evaluate(s),expected=oracle(priorities,events);assert.equal(r.history.length,events.length);
 for(let event=0;event<events.length;event++){const h=r.history[event],e=expected[event],mask=events[event];assert.deepEqual([h.dr,h.bdr,h.roles],[e.dr,e.bdr,e.roles]);const attached=names.flatMap((n,i)=>mask&(1<<i)?[`${i+1}.${i+1}.${i+1}.${i+1}`]:[]);assert.equal(h.pairs.length,6);for(const p of h.pairs){const a=names.indexOf(p.a),b=names.indexOf(p.b),state=e.roles[a]==='Absent'||e.roles[b]==='Absent'?'Absent':[a,b].some(i=>['DR','BDR'].includes(e.roles[i]))?'Full':'2-Way';assert.equal(p.state,state);}
  if(e.dr&&attached.length>1){const i=names.indexOf(e.dr)+1;assert.deepEqual(h.type2,{linkStateId:`192.0.2.${i}`,advertisingRouter:`${i}.${i}.${i}.${i}`,mask:'/24',attached});}else assert.equal(h.type2,null);
 }assert.equal(r.possible,(events.at(-1)&12)===12&&r.current.dr!==null);assert.equal(JSON.stringify(s),before);vectors++;
}
for(const p of profiles)for(let a=0;a<16;a++)for(let b=0;b<16;b++)check(p,[a,b]);
for(const p of profiles.slice(0,4))for(let a=0;a<16;a++)for(let b=0;b<16;b++)for(let c=0;c<16;c++)check(p,[a,b,c]);
const expected=[['established','R1','R2'],['late','R1','R2'],['failover','R2','R4'],['recovered','R2','R4'],['cold','R4','R1'],['tie','R4','R3'],['zero',null,null],['single','R1',null],['lone','R1',null],['bdr-failure','R1','R4'],['rib','R2','R4'],['forward','R2','R4'],['return','R2','R4']];
for(const [id,dr,bdr] of expected){const s=model.scenario(id),r=model.evaluate(s);assert.deepEqual([r.current.dr,r.current.bdr],[dr,bdr],id);assert.equal(r.possible,!['established','zero','lone','rib','forward','return'].includes(id),id);check(s.priorities,s.events);}
for(const key of ['ribReady','forwardReady','returnReady']){const s=model.scenario('late');s[key]=false;const r=model.evaluate(s);assert(!r.possible);assert.deepEqual(r.current,model.evaluate(model.scenario('late')).current);}
for(const value of [-1,256,1.5,'100',NaN,Infinity,null,undefined]){const s=model.scenario('late');s.priorities[0]=value;assert.throws(()=>model.evaluate(s),RangeError);}
for(const value of [-1,16,1.5,'15',null,undefined])assert.throws(()=>model.evaluate({...model.scenario('late'),events:[value]}),RangeError);
for(const priorities of [[],[1,2,3],Array(4),null])assert.throws(()=>model.evaluate({...model.scenario('late'),priorities}),RangeError);
for(const events of [[],Array(2),Array(17).fill(15),null])assert.throws(()=>model.evaluate({...model.scenario('late'),events}),RangeError);
for(const key of ['ribReady','forwardReady','returnReady'])for(const value of [0,1,'true',null,undefined])assert.throws(()=>model.evaluate({...model.scenario('late'),[key]:value}),RangeError);
assert.throws(()=>model.evaluate(null),RangeError);assert.throws(()=>model.scenario('bad'),RangeError);assert.equal(model.html('other'),'');const copy=model.scenario('late');copy.priorities[0]=255;copy.events.length=0;assert.equal(model.scenario('late').priorities[0],100);const r=model.evaluate(model.scenario('late'));r.current.roles[0]='corrupt';r.current.pairs[0].state='corrupt';r.current.type2.attached.push('corrupt');assert.equal(model.evaluate(model.scenario('late')).current.roles[0],'DR');assert.equal(model.evaluate(model.scenario('late')).current.type2.attached.length,4);
// Corroboration, not an oracle substitute: compare preserved actual FRR records.
const lab=JSON.parse(fs.readFileSync(path.join(root,'docs/ospf-dr-bdr-lab-results.json'),'utf8'));assert.equal(lab.result,'PASS');
for(const [phase,id] of [['ESTABLISHED','established'],['LATE','late'],['FAILOVER','failover'],['RECOVERED','recovered']]){const c=model.evaluate(model.scenario(id)).current;for(let i=0;i<4;i++){const record=lab.records[`${phase}_INTERFACES_R${i+1}`];if(c.roles[i]==='Absent'){assert(!record?.interfaces?.lan);continue;}const lan=record.interfaces.lan;assert.equal(lan.state,c.roles[i]==='BDR'?'Backup':c.roles[i]);assert.equal(lan.drAddress,c.type2.linkStateId);const bi=names.indexOf(c.bdr)+1;assert.equal(lan.bdrAddress,`192.0.2.${bi}`);
 const neighbors=lab.records[`${phase}_NEIGHBORS_R${i+1}`].neighbors;for(const p of c.pairs.filter(p=>[p.a,p.b].includes(names[i]))){const other=names.indexOf(p.a===names[i]?p.b:p.a)+1,entries=neighbors[`${other}.${other}.${other}.${other}`];if(p.state==='Absent')assert(!entries);else assert.equal(entries[0].converged,p.state);}
 const lsas=lab.records[`${phase}_NETWORK_LSA_R${i+1}`].networkLinkStates.areas['0.0.0.0'],current=lsas.filter(l=>l.advertisingRouter===c.type2.advertisingRouter&&l.linkStateId===c.type2.linkStateId);assert.equal(current.length,1);assert.equal(current[0].networkMask,24);assert.deepEqual(Object.keys(current[0].attchedRouters).sort(),c.type2.attached.slice().sort());}}
const checks=['19456 independent two-/three-event presence histories across twelve priority profiles, plus thirteen authored cases','Per-router declaration oracle follows RFC 2328 section 9.4 local recalculation and consensus, separately from model shortcut','Six pair states, priority-zero exclusion, BDR promotion, nonpreemption, cold-start ties and lone-DR network-LSA suppression','RIB/forward/return gates do not change role history; strict bounds, sparse arrays, input preservation and fresh nested results','Four event checkpoints corroborated against preserved actual FRR interfaces, neighbor pairs and current-DR network-LSA identity/membership'];
fs.writeFileSync(path.join(root,'docs/ospf-dr-bdr-model-results.json'),JSON.stringify({date:'2026-10-09',result:'PASS',vectors,checks,scope:'Settled consistent broadcast segment with fixed unique RIDs and reset departed attachments. Not a complete RFC election/neighbor FSM, timing, packet, LSA retention, conflicting-declaration or forwarding engine. Curriculum lesson is integrated as a draft; full batch acceptance remains pending.'},null,2)+'\n');console.log('PASS '+vectors+' independent DR/BDR event histories; actual phase corroboration');
