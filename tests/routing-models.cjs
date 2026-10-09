const assert=require('node:assert/strict'),cp=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const {lookup}=require('../scripts/routing-models.js');
const inputs=[];for(const prefix of ['192.0.2','198.51.100','203.0.113'])for(let i=0;i<256;i++)inputs.push(prefix+'.'+i);inputs.push('0.0.0.0','255.255.255.255','198.18.0.1','192.0.1.255','192.0.3.0');
const reference=cp.spawnSync('python',['-c',`import ipaddress,json,sys
routes=[('192.0.2.0/24',0),('198.51.100.0/24',20),('198.51.100.0/24',50),('198.51.100.128/25',500),('203.0.113.0/24',1),('0.0.0.0/0',100)]
out=[]
for value in json.load(sys.stdin):
 for enabled in [True,False]:
  matches=[(p,m) for p,m in routes if (enabled or p!='0.0.0.0/0') and ipaddress.ip_address(value) in ipaddress.ip_network(p)]
  matches.sort(key=lambda r:(-ipaddress.ip_network(r[0]).prefixlen,r[1]))
  out.append(matches[0] if matches else None)
print(json.dumps(out))`],{input:JSON.stringify(inputs),encoding:'utf8',windowsHide:true});
assert.ifError(reference.error);assert.equal(reference.status,0,reference.stderr);const expected=JSON.parse(reference.stdout);let index=0;
for(const address of inputs)for(const enabled of [true,false]){const result=lookup(address,enabled),actual=result.selected;assert.deepEqual(actual?[actual.prefix,actual.metric]:null,expected[index++],address);assert.equal(result.rows.filter(r=>r.selected).length,actual?1:0);}
assert.equal(lookup('203.0.113.10').selected.action,'discard');assert.equal(lookup('192.0.2.10').selected.action,'connected');assert.equal(lookup('198.51.100.128').selected.via,'192.0.2.2');assert.equal(lookup('198.51.100.127').selected.via,'192.0.2.1');
const invalid=['',' 192.0.2.1','192.0.2.1 ','192.000.2.1','256.0.0.0','-1.0.0.0','1.2.3','1.2.3.4.5','1e2.2.3.4','1.2.3.4/24','::1','<script>',null,123];for(const v of invalid)assert.throws(()=>lookup(v),RangeError);assert.throws(()=>lookup('192.0.2.1','false'),TypeError);
const changed=lookup('198.51.100.20');changed.selected.metric=999;changed.rows[1].via='changed';assert.equal(lookup('198.51.100.20').selected.metric,20);assert.equal(lookup('198.51.100.20').selected.via,'192.0.2.1');
const evidence={date:'2026-10-04',result:'PASS',reference:'Python standard-library ipaddress, independent prefix matching',vectors:index,invalidInputs:invalid.length+1,checks:['All addresses in three sample /24s plus external boundaries, default on/off','Prefix length precedes metric; equal-prefix lower metric wins','Blackhole is terminal; connected action distinct','Invalid inputs rejected; results cannot mutate subsequent lookup'],limitations:'Fixed eligible IPv4 table; no policy routing, route installation, ECMP or neighbor resolution'};fs.writeFileSync(path.join(__dirname,'../docs/routing-models-results.json'),JSON.stringify(evidence,null,2)+'\n');console.log(evidence);
