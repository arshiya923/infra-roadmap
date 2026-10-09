"""Offline architecture rehearsal. Python 3.10+, standard library; no network calls.
--run owns a fresh temporary directory. No user-supplied write/delete path.
"""
import argparse,copy,hashlib,ipaddress,json,re,tempfile
from pathlib import Path
PHASES=('validated','applied','drifted','restored')
BASE={'revision':1,'devices':[{'name':'edge-a','address':'192.0.2.10','vlan':10,'enabled':True},{'name':'edge-b','address':'192.0.2.11','vlan':10,'enabled':True}]}
def digest(data):return hashlib.sha256(data).hexdigest()
def unique(pairs):
 d={}
 for k,v in pairs:
  if k in d:raise ValueError('Duplicate JSON key: '+k)
  d[k]=v
 return d
def decode(text):return json.loads(text,object_pairs_hook=unique)
def validate(value):
 if not isinstance(value,dict) or set(value)!={'revision','devices'}:raise ValueError('Expected revision and devices only')
 if type(value['revision']) is not int or value['revision']<1:raise ValueError('Positive integer revision required')
 if not isinstance(value['devices'],list) or not 1<=len(value['devices'])<=100:raise ValueError('Expected 1..100 devices')
 names=set();addresses=set()
 for d in value['devices']:
  if not isinstance(d,dict) or set(d)!={'name','address','vlan','enabled'}:raise ValueError('Device schema mismatch')
  if not isinstance(d['name'],str) or not re.fullmatch(r'[a-z][a-z0-9-]{0,31}',d['name']):raise ValueError('Invalid device name')
  if not isinstance(d['address'],str):raise ValueError('Address must be text')
  address=str(ipaddress.ip_address(d['address']))
  if d['name'] in names or address in addresses:raise ValueError('Duplicate device identity or address')
  names.add(d['name']);addresses.add(address)
  if type(d['vlan']) is not int or not 1<=d['vlan']<=4094:raise ValueError('VLAN must be integer 1..4094')
  if type(d['enabled']) is not bool:raise ValueError('enabled must be boolean')
 result=copy.deepcopy(value)
 for d in result['devices']:d['address']=str(ipaddress.ip_address(d['address']))
 result['devices'].sort(key=lambda d:d['name'])
 return result
def render(value):
 v=validate(value)
 return ('# LOCAL PLAN ONLY; not vendor CLI\n'+'\n'.join(f"{d['name']} address={d['address']} vlan={d['vlan']} enabled={str(d['enabled']).lower()}" for d in v['devices'])+'\n').encode('utf-8')
def apply_owned(path,expected_digest,desired):
 """Single-process teaching guard, not an OS lock or distributed transaction."""
 before=path.read_bytes()
 if digest(before)!=expected_digest:raise ValueError('Stale baseline: no write performed')
 if before==desired:return False
 staged=path.with_name('staged-plan.txt');staged.write_bytes(desired);staged.replace(path)
 return True
def run(inject=None):
 if inject is not None and inject not in PHASES:raise ValueError('Unknown interruption phase')
 report={'scope':'Actual local validation/render/file operations; topology and budgets are synthetic. No external deployment.','events':[],'result':'PASS'}
 owned=tempfile.TemporaryDirectory(prefix='infra-automation-');root=Path(owned.name);path=root/'plan.txt';baseline=render(BASE);path.write_bytes(baseline)
 def phase(name):
  report['events'].append({'phase':name,'sha256':digest(path.read_bytes())})
  if inject==name:raise InterruptedError(name)
 try:
  desired=copy.deepcopy(BASE);desired['revision']=2;desired['devices'][0]['vlan']=20
  bad=copy.deepcopy(desired);bad['devices'][0]['vlan']=True
  try:validate(bad)
  except ValueError:report['invalidRejected']=True
  else:raise AssertionError('Invalid intent accepted')
  target=render(decode(json.dumps(desired)));report['revision']=desired['revision'];report['artifactSha256']=digest(target);phase('validated')
  report['changed']=apply_owned(path,digest(baseline),target)
  report['secondChanged']=apply_owned(path,digest(target),target);phase('applied')
  path.write_bytes(b'LOCAL DRIFT\n')
  try:apply_owned(path,digest(target),target)
  except ValueError:report['staleRejected']=True
  else:raise AssertionError('Stale baseline accepted')
  phase('drifted');path.write_bytes(baseline);phase('restored')
  report['designCalculations']={'survivorCapacityUnits':160,'demandUnits':140,'serialRecoveryMinutes':70,'rtoMinutes':60,'rtoGapMinutes':10,'recoverablePointAgeMinutes':40,'rpoMinutes':15,'rpoGapMinutes':25,'note':'Supplied design arithmetic, not measured timing or deployment'}
 except InterruptedError as e:report.update(result='INTERRUPTED',interruptedAt=str(e))
 finally:
  try:path.write_bytes(baseline);report['restored']=path.read_bytes()==baseline;report['baselineSha256']=digest(baseline)
  finally:owned.cleanup();report['cleaned']=not root.exists();report['ownedDirectory']=str(root)
 return report
def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--run',action='store_true');p.add_argument('--inject-failure',choices=PHASES);a=p.parse_args()
 if not a.run:p.print_help();return 0
 report=run(a.inject_failure);print(json.dumps(report,indent=2));return 0 if report['result']=='PASS' else 2
if __name__=='__main__':raise SystemExit(main())
