"""Independent topology truth table plus actual CLI and cleanup checks."""
import hashlib,itertools,json,subprocess,sys,runpy
from pathlib import Path
R=Path(__file__).resolve().parents[1];lab=runpy.run_path(str(R/'labs/storage-virtualization.py'));checks=0
for mask in range(1<<12):
 s={k:bool(mask&(1<<i)) for i,k in enumerate(lab['FLAGS'])}
 # Reference calculates path counts by availability products, not route enumeration.
 fabrics=int(s['fabricA'] and s['zoneA'])+int(s['fabricB'] and s['zoneB']);controllers=int(s['cA'])+int(s['cB'])
 for h in ('h1','h2','h3'):
  expected=int(s[h])*int(s['mapped'])*fabrics*controllers
  assert len(lab['paths'](s,h))==expected;checks+=1
 assert lab['paths'](s,'excluded-host')==[];checks+=1
 hosts=sum(s[h] for h in ('h1','h2','h3'))
 slots=hosts*3 if s['mapped'] and fabrics and controllers and (s['nA'] or s['nB']) else 0
 r=lab['placement'](s);assert len(r['assigned'])==min(6,slots) and len(r['pending'])==max(0,6-slots);checks+=1
 assert all(x<=112 for x in r['usedGiB'].values());checks+=1
assert lab['placement'](lab['BASE'],[dict(id='oversize',gib=120)])['pending']==['oversize'];checks+=1
for bad in ({},{**lab['BASE'],'h1':1},{**lab['BASE'],'extra':True}):
 try:lab['paths'](bad,'h1');raise AssertionError('Expected rejection')
 except ValueError:checks+=1
reports=[]
for phase in [None,'baseline','path-fault','host-fault','corruption','restored']:
 cmd=[sys.executable,'labs/storage-virtualization.py','--run']+(['--inject-failure',phase] if phase else [])
 p=subprocess.run(cmd,cwd=R,text=True,capture_output=True);assert p.returncode==(2 if phase else 0),(p.returncode,p.stderr)
 r=json.loads(p.stdout);assert r['result']==('INTERRUPTED' if phase else 'PASS');assert r['planRestored'] and r['dataRestored'] and r['cleaned'];assert not Path(r['ownedDirectory']).exists();reports.append(r);checks+=5
full=reports[0];events={e['phase']:e for e in full['events']}
assert sum(map(len,events['baseline']['paths'].values()))==12
assert sum(map(len,events['path-fault']['paths'].values()))==6
assert sum(map(len,events['host-fault']['paths'].values()))==4
assert events['host-fault']['placement']['complete']
assert not events['all-paths-down']['placement']['complete']
assert not events['mapping-denial']['placement']['complete']
assert not events['guest-network-loss']['placement']['complete']
assert events['corruption']['detected'] and events['corruption']['expectedSHA256']==full['dataSHA256'];checks+=8
p=subprocess.run([sys.executable,'labs/storage-virtualization.py'],cwd=R,text=True,capture_output=True);assert p.returncode==0 and '--run' in p.stdout;checks+=1
out=dict(result='PASS',checks=checks,scope='4096 synthetic topology combinations; actual local file writes/corruption/restore and five interrupted cleanup runs; no real VM, SAN, container or network execution.',scriptSHA256=hashlib.sha256((R/'labs/storage-virtualization.py').read_bytes()).hexdigest(),runs=reports)
(R/'docs/storage-virtualization-lab-results.json').write_text(json.dumps(out,indent=2)+'\n');print('PASS',checks,'lab checks')
