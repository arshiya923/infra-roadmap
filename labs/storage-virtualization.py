"""Offline topology/placement model plus real owned-file corruption and restore.

No network, block devices, VMs, containers or platform services are touched.
Without --run this displays help. All mutations stay in a fresh owned tempdir.
"""
from pathlib import Path
import argparse,copy,hashlib,json,tempfile

FLAGS=('h1','h2','h3','fabricA','fabricB','cA','cB','nA','nB','zoneA','zoneB','mapped')
BASE={k:True for k in FLAGS}
VMS=[dict(id='vm'+str(i+1),gib=30) for i in range(6)]

def paths(state,host):
    """Return synthetic eligible route labels for an authorized host."""
    if set(state)!=set(FLAGS) or any(type(v) is not bool for v in state.values()):
        raise ValueError('Provide all and only the boolean topology flags')
    if host not in ('h1','h2','h3') or not state[host] or not state['mapped']:return []
    return [f'{host}/{fabric}/{controller}' for fabric,zone in [('fabricA','zoneA'),('fabricB','zoneB')]
            for controller in ('cA','cB') if state[fabric] and state[zone] and state[controller]]

def placement(state,workloads=None):
    """Deterministic greedy memory-only placement; no real scheduler or VM."""
    workloads=VMS if workloads is None else workloads
    if any(type(v.get('gib')) is not int or v['gib']<=0 or not isinstance(v.get('id'),str) for v in workloads):raise ValueError('Positive integer GiB and string IDs required')
    if len({v['id'] for v in workloads})!=len(workloads):raise ValueError('Duplicate workload identity')
    eligible=[h for h in ('h1','h2','h3') if paths(state,h) and (state['nA'] or state['nB'])]
    used={h:0 for h in eligible};assigned={};pending=[]
    for v in sorted(workloads,key=lambda x:(-x['gib'],x['id'])):
        choices=[h for h in eligible if used[h]+v['gib']<=112]
        if choices:
            h=min(choices,key=lambda h:(used[h],h));used[h]+=v['gib'];assigned[v['id']]=h
        else:pending.append(v['id'])
    return dict(assigned=assigned,pending=pending,usedGiB=used,complete=not pending)

def observe(state):
    return dict(scope='SYNTHETIC TOPOLOGY AND MEMORY-ONLY PLACEMENT',paths={h:paths(state,h) for h in ('h1','h2','h3')},placement=placement(state),unauthorizedHostPaths=paths(state,'excluded-host'))

def run(inject=None):
    if inject not in (None,'baseline','path-fault','host-fault','corruption','restored'):raise ValueError('Unknown interruption phase')
    evidence=[];payload=b'owned-training-records\naccount=demo;balance=314159\n';baseline=json.dumps(BASE,sort_keys=True).encode();digest=lambda b:hashlib.sha256(b).hexdigest()
    report=dict(result='PASS',scope='Topology/VM placement is simulated. File writes, corruption detection, restore and cleanup are actual local execution. No independent physical backup or hypervisor recovery is proven.',events=evidence)
    temp=tempfile.TemporaryDirectory(prefix='infra-storage-lab-');root=Path(temp.name).resolve();plan=root/'plan.json';data=root/'records.bin';backup=root/'retained.bin'
    def phase(name,state):
        plan.write_text(json.dumps(state,sort_keys=True),encoding='utf-8');evidence.append(dict(phase=name,**observe(state)))
        if inject==name:raise InterruptedError(name)
    try:
        backup.write_bytes(payload);data.write_bytes(payload);phase('baseline',copy.deepcopy(BASE))
        state=copy.deepcopy(BASE);state['fabricA']=False;phase('path-fault',state)
        state['h1']=False;phase('host-fault',state)
        blocked=copy.deepcopy(state);blocked['fabricB']=False;phase('all-paths-down',blocked)
        assert not evidence[-1]['placement']['complete']
        missing=copy.deepcopy(BASE);missing['mapped']=False;phase('mapping-denial',missing)
        network=copy.deepcopy(BASE);network['nA']=network['nB']=False;phase('guest-network-loss',network)
        # This local file operation is separate from simulated path eligibility.
        data.write_bytes(b'intentionally altered owned training data\n')
        detected=digest(data.read_bytes())!=digest(payload);assert detected
        evidence.append(dict(phase='corruption',scope='ACTUAL OWNED FILE OPERATION',detected=detected,expectedSHA256=digest(payload),observedSHA256=digest(data.read_bytes())))
        if inject=='corruption':raise InterruptedError('corruption')
        data.write_bytes(backup.read_bytes());assert data.read_bytes()==payload
        phase('restored',copy.deepcopy(BASE))
    except InterruptedError as e:
        report.update(result='INTERRUPTED',interruptedAt=str(e))
    finally:
        # Fixed children of an exclusively owned TemporaryDirectory, never user paths.
        plan.write_bytes(baseline);data.write_bytes(payload)
        report.update(planRestored=plan.read_bytes()==baseline,dataRestored=data.read_bytes()==payload,baselineSHA256=digest(baseline),dataSHA256=digest(data.read_bytes()),ownedDirectory=str(root))
        temp.cleanup();report['cleaned']=not root.exists()
    return report

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--run',action='store_true');p.add_argument('--inject-failure',choices=['baseline','path-fault','host-fault','corruption','restored']);args=p.parse_args()
    if not args.run:p.print_help();return
    result=run(args.inject_failure);print(json.dumps(result,indent=2));raise SystemExit(0 if result['result']=='PASS' else 2)
if __name__=='__main__':main()
