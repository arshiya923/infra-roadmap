'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const m=require('./model.js');
const lesson=JSON.parse(fs.readFileSync(require.resolve('./lesson.json'),'utf8'));
assert.equal(lesson.exams.length,10);
assert.equal(lesson.exams.every(q=>q.type==='multiple-choice'&&q.options.includes(q.answer)),true,'each exam is an MCQ with an answer equal to one option');
assert.equal(lesson.quick.length,3);
assert.equal(lesson.commands.length,4);
assert.equal(typeof m.evaluate,'function');
assert.equal(m.catalog().length>=10,true);
const expected={
 baseline:['A',false,true,true],equal:[null,true,false,false],
 'higher-unresolved':['B',false,true,true],rejected:['B',false,true,true],
 none:[null,false,false,false],zero:[null,true,false,false],
 max:['A',false,true,true],'system-displaced':['A',false,false,false],
 'return-missing':['A',false,true,false],'forward-missing':['A',false,true,false],
 'default-100':[null,true,false,false]
};
for(const c of m.catalog()){
 const v=m.evaluate(m.preset(c.id));
 assert.deepEqual([v.winner,v.tie,v.installed,v.exchangePrerequisites],expected[c.id],c.id);
 assert.equal(v.prefix,'198.51.100.0/24');
}
const s=m.preset('baseline');
s.a.localPreference=1;
assert.equal(m.preset('baseline').a.localPreference,200,'preset returns fresh nested data');
for(const input of [
 {...m.preset('baseline'),extra:false},
 {...m.preset('baseline'),systemSelectsBgpWinner:1},
 {...m.preset('baseline'),a:{...m.preset('baseline').a,admitted:1}},
 {...m.preset('baseline'),a:{...m.preset('baseline').a,localPreference:'200'}},
 {...m.preset('baseline'),a:{...m.preset('baseline').a,localPreference:-1}},
 {...m.preset('baseline'),a:{...m.preset('baseline').a,localPreference:4294967296}},
 {...m.preset('baseline'),a:{...m.preset('baseline').a,localPreference:1.5}},
 {...m.preset('baseline'),a:{...m.preset('baseline').a,unexpected:true}}
])assert.throws(()=>m.evaluate(input));
assert.throws(()=>m.preset('unknown'));
assert.equal(m.evaluate({...m.preset('baseline'),a:{admitted:false,resolvable:true,localPreference:4294967295}}).winner,'B','ineligible high value does not win');
assert.equal(m.evaluate({...m.preset('baseline'),a:{admitted:true,resolvable:true,localPreference:0},b:{admitted:false,resolvable:true,localPreference:4294967295}}).winner,'A','sole eligible zero value can win');
assert.equal(m.evaluate({...m.preset('baseline'),a:{admitted:false,resolvable:false,localPreference:1},b:{admitted:false,resolvable:true,localPreference:2}}).winner,null);
assert.equal(m.evaluate({...m.preset('baseline'),forwardReady:false,returnReady:false}).exchangePrerequisites,false);
assert.equal(m.html('other'),'');
assert.match(m.html('local-preference'),/id="lp-tool"/);
assert.match(m.html('local-preference'),/tabindex="0"/);
assert.match(fs.readFileSync(require.resolve('./model.js'),'utf8'),/\.textContent\s*=/);
assert.equal(m.evaluate(m.preset('max')).candidates[0].localPreference,4294967295);
console.log('PASS: 11 presets, independent outcome oracle, strict schemas/ranges, eligibility, ties, independent system/exchange gates, fresh presets, and UI contract.');

