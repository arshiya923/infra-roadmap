"""Offline dependency/SLO models and actual owned configuration rollback.

No network services or host configuration are touched. Only a new temporary
directory is written; its pathname is never supplied by the caller.
"""
import argparse
from copy import deepcopy
from decimal import Decimal
import hashlib
import json
from pathlib import Path
import tempfile

def dependency_check(graph, root, failed):
    visited, active, blocked = set(), set(), set()
    def walk(node):
        if node in active: raise ValueError('Dependency cycle')
        if node not in graph: raise ValueError('Unknown dependency: '+node)
        if node in visited: return
        active.add(node)
        if node in failed: blocked.add(node)
        for dependency in graph[node]: walk(dependency)
        active.remove(node); visited.add(node)
    walk(root)
    return dict(available=not blocked, blocked=sorted(blocked), required=sorted(visited))

def objective(total, bad, target):
    if isinstance(total,bool) or not isinstance(total,int) or total<=0: raise ValueError('Positive request count required')
    if isinstance(bad,bool) or not isinstance(bad,int) or not 0<=bad<=total: raise ValueError('Bad count out of range')
    target=Decimal(str(target))
    if not target.is_finite() or not 0<target<=100: raise ValueError('Target must be in (0, 100]')
    allowed=Decimal(total)*(1-target/100)
    return dict(sli=str(100*(Decimal(total)-bad)/total),allowedBad=str(allowed),remaining=str(allowed-bad),meets=Decimal(bad)<=allowed)

def validate(config):
    if set(config)!= {'upstream','timeout_ms'} or config['upstream']!='inventory' or type(config['timeout_ms']) is not int or not 1<=config['timeout_ms']<=5000:
        raise ValueError('Configuration rejected')

def run(case, interrupt=False):
    with tempfile.TemporaryDirectory(prefix='infra-expansion-') as directory:
        path=Path(directory)
        if case=='dependencies':
            graph={'checkout':['dns','tls','app'],'dns':[],'tls':['time'],'time':[],'app':['database'],'database':[]}
            result={'baseline':dependency_check(graph,'checkout',set()),'fault':dependency_check(graph,'checkout',{'database'}),'recovery':dependency_check(graph,'checkout',set())}
        elif case=='objectives':
            result={'baseline':objective(10000,5,'99.9'),'fault':objective(10000,20,'99.9'),'recovery':objective(10000,8,'99.9'),
                    'scope':'Three independent supplied windows. Recovery does not erase bad requests from an earlier window.'}
        else:
            config=path/'service.json'; baseline={'upstream':'inventory','timeout_ms':500}
            config.write_text(json.dumps(baseline),encoding='utf-8');before=config.read_bytes()
            candidate=deepcopy(baseline);candidate['timeout_ms']=0
            rejected=False
            try: validate(candidate)
            except ValueError: rejected=True
            # Demonstrate an accidentally written invalid candidate and exact restore.
            config.write_text(json.dumps(candidate),encoding='utf-8')
            fault=config.read_bytes()!=before
            config.write_bytes(before);validate(json.loads(config.read_text(encoding='utf-8')))
            result={'candidateRejected':rejected,'faultDiffers':fault,'restoredExact':config.read_bytes()==before,'sha256':hashlib.sha256(before).hexdigest(),
                    'scope':'Actual local file validation/restoration; no running service or production deployment.'}
        if interrupt: raise RuntimeError('Intentional interruption after owned exercise')
    result.update(temporaryDirectory=directory,cleanupVerified=not Path(directory).exists())
    return result

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--case',choices=['dependencies','objectives','change'],required=True)
    args=parser.parse_args()
    print(json.dumps(run(args.case),indent=2))
