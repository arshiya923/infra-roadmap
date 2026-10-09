const assert=require('node:assert/strict'),{configuration,compare,scenario,html}=require('../scripts/mst-models.js');
const a=configuration('lab-east',7,[{instance:1,vlans:[10,20]},{instance:2,vlans:[30,40]}]);
for(let vlan=1;vlan<=4094;vlan++)assert.equal(a.map[vlan],[10,20].includes(vlan)?1:[30,40].includes(vlan)?2:0);
const reversed=configuration('lab-east',7,[{instance:2,vlans:[40,30]},{instance:1,vlans:[20,10]}]);assert.equal(compare(a,reversed).mstParametersMatch,true);
for(let vlan=1;vlan<=4094;vlan++){const b={...a,map:[...a.map]};b.map[vlan]=(b.map[vlan]+1)%3;const c=compare(a,b);assert.equal(c.mapMatch,false);assert.deepEqual(c.differences,[vlan]);}
for(const [id,field] of [['match','mstParametersMatch'],['name','nameMatch'],['revision','revisionMatch'],['mapping','mapMatch'],['extra','mapMatch'],['mode','bothMst'],['carriage','mstParametersMatch']]){const s=scenario(id);assert.equal(s.comparison[field],['match','carriage'].includes(id));}assert.deepEqual(scenario('extra').comparison.differences,[50]);assert.equal(scenario('carriage').carriage,false);assert.equal(scenario('mode').comparison.parametersMatch,true);for(const revision of [0,65535])assert.equal(configuration('lab',revision,[]).revision,revision);
for(const revision of [-1,65536,1.5,'7',NaN])assert.throws(()=>configuration('lab',revision,[]),RangeError);
for(const name of ['', 'x'.repeat(33), '\n', null])assert.throws(()=>configuration(name,7,[]),RangeError);
for(const assignments of [[{instance:3,vlans:[10]}],[{instance:1,vlans:[0]}],[{instance:1,vlans:[4095]}],[{instance:1,vlans:[10,10]}],[{instance:1,vlans:[10]},{instance:2,vlans:[10]}],[{instance:1,vlans:[]}],null])assert.throws(()=>configuration('lab',7,assignments),RangeError);
assert.throws(()=>compare(a,{...a,map:Array(4095)}),RangeError);assert.throws(()=>compare(a,a,'bad'),RangeError);for(const id of ['bad','__proto__','constructor'])assert.throws(()=>scenario(id),RangeError);
const copy=scenario('match');copy.b.map[10]=2;copy.comparison.differences.push(100);assert.equal(scenario('match').b.map[10],1);assert.deepEqual(scenario('match').comparison.differences,[]);assert.equal(html('other'),'');
console.log('PASS all 4094 map entries and single-VLAN differences, seven cases, ordering, invalid input and copy independence');
