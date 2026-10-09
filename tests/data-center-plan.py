"""Independent negative design cases plus actual owned-file recovery and interruptions."""
import copy,importlib.util,json,math
from pathlib import Path
R=Path(__file__).resolve().parents[1];spec=importlib.util.spec_from_file_location('plan',R/'labs/data-center-plan.py');p=importlib.util.module_from_spec(spec);spec.loader.exec_module(p)
checks=[]
def check(name,condition):
 assert condition,name;checks.append(name)
normal=p.run();check('baseline/fault/exact-restore file lifecycle',normal['result']=='PASS' and normal['events']==['baseline','fault','restored']);check('exact bytes restored',normal['baselineSha256']==normal['restoredSha256']);check('owned directory removed',normal['ownedDirectoryRemoved']);check('three-rack total',normal['baseline']['totalKW']==16);check('independent thermal arithmetic',math.isclose(normal['baseline']['meanRiseK'],16/2/1.206));
for name,mutate in [
 ('overlap',lambda x:x['racks'][0]['items'].append(['Owned proposal',4,2])),
 ('out of range',lambda x:x['racks'][0]['items'].append(['Owned proposal',42,2])),
 ('rack survivor overload',lambda x:x['racks'][1].update(load=9)),
 ('site survivor overload',lambda x:x.update(upstreamB=15)),
 ('shared supply domain',lambda x:x.update(domainB='Supply A')),
 ('missing power map',lambda x:x['powerPaths']['B'].pop()),
 ('insufficient cooling',lambda x:x.update(coolingKW=15)),
 ('missing airflow return',lambda x:x['airflow'].pop()),
 ('missing cable',lambda x:x['cables'].pop()),
 ('reused endpoint',lambda x:x['cables'][1].__setitem__(1,x['cables'][0][1])),
 ('wrong cable endpoint',lambda x:x['cables'][0].__setitem__(1,'wrong target')),
 ('guest grant',lambda x:x['oob']['readRules'].append(dict(subject='guest',source='192.0.2.99',operation='read',protocol='https',port=443))),
 ('missing standby',lambda x:x['oob'].update(standby=False))]:
 x=copy.deepcopy(p.BASELINE);mutate(x);check(name+' rejected',p.validate(x)['result']=='FAIL')
for host in [False,True]:
 x=copy.deepcopy(p.BASELINE);x['oob']['hostOS']=host;check('host independence '+str(host),p.allowed(x,'administrator','192.0.2.10','192.0.2.21'))
for subject,source,target,operation,protocol,port in [('guest','192.0.2.99','192.0.2.21','read','https',443),('administrator','192.0.2.99','192.0.2.21','read','https',443),('administrator','192.0.2.10','192.0.2.99','read','https',443),('administrator','192.0.2.10','192.0.2.21','power-off','https',443),('administrator','192.0.2.10','192.0.2.21','read','http',80)]:check('denied '+str((subject,source,target,operation,protocol,port)),not p.allowed(p.BASELINE,subject,source,target,operation,protocol,port))
for bad in [None,True,float('nan'),float('inf'),-1,0]:
 x=copy.deepcopy(p.BASELINE);x['airM3s']=bad
 try:p.validate(x)
 except (ValueError,TypeError):checks.append('invalid flow '+repr(bad)+' rejected')
 else:raise AssertionError('invalid flow accepted')
interruptions=[p.run(stage) for stage in ['baseline','fault','restored']]
for r in interruptions:check('interruption exact restore and cleanup '+r['events'][-1],r['result']=='PASS' and r['baselineSha256']==r['restoredSha256'] and r['ownedDirectoryRemoved'])
report=dict(date='2026-10-09',result='PASS',checks=checks,normal=normal,interruptions=interruptions,scope='Actual owned offline file rehearsal; declared policy/calculation tests, not live equipment.');(R/'docs/data-center-plan-results.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8');print('PASS '+str(len(checks))+' checks and 3 interrupted restores; offline plan only.')
