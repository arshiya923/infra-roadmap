"""Disposable cached-image container, offline selector model and owned restore.
Never contacts Kubernetes. Docker case needs a local nginx:alpine image and uses
no network, host mounts, ports or pulls. No existing containers are changed.
"""
import argparse
from copy import deepcopy
import json
from pathlib import Path
import subprocess
import tempfile
import uuid

def docker(*args,check=True):
    return subprocess.run(['docker',*args],capture_output=True,text=True,timeout=45,check=check)

def container_case():
    image=docker('image','inspect','nginx:alpine','--format','{{.Id}}').stdout.strip()
    if not image.startswith('sha256:'): raise RuntimeError('Cached image ID required')
    name='fieldbook-'+uuid.uuid4().hex
    script='printf ready > /work/state; test "$(cat /work/state)" = ready || exit 2; printf "baseline=ready\n"; printf broken > /work/state; if test "$(cat /work/state)" = ready; then exit 3; fi; printf "fault=not-ready\n"; printf ready > /work/state; test "$(cat /work/state)" = ready || exit 4; printf "recovery=ready\n"; id -u'
    label='infra.fieldbook.owner='+name
    try:
        p=docker('run','--name',name,'--label',label,'--rm','--pull','never','--network','none','--read-only','--user','65534:65534','--cap-drop','ALL','--security-opt','no-new-privileges','--memory','64m','--cpus','0.5','--pids-limit','32','--tmpfs','/work:rw,noexec,nosuid,size=1m,mode=1777','--entrypoint','/bin/sh',image,'-c',script)
        output=p.stdout.strip().splitlines()
        if output!=['baseline=ready','fault=not-ready','recovery=ready','65534']: raise RuntimeError('Unexpected owned container output: '+p.stdout)
    finally:
        # An exact unique ownership label is required before removing a leftover.
        owned=docker('ps','-aq','--filter','label='+label).stdout.split()
        for identifier in owned: docker('rm','-f',identifier)
    remaining=docker('ps','-aq','--filter','label='+label).stdout.strip()
    with tempfile.TemporaryDirectory(prefix='compose-fieldbook-') as directory:
        config=Path(directory)/'compose.json'
        config.write_text(json.dumps({'services':{'lesson':{'image':image,'network_mode':'none','read_only':True,'user':'65534:65534','entrypoint':['/bin/sh','-c','echo lesson']}}}),encoding='utf-8')
        docker('compose','-p',name,'-f',str(config),'config','--quiet')
    return dict(imageId=image,observations=output,containerRemoved=not remaining,composeSyntaxValidated=True,cleanupVerified=not Path(directory).exists(),scope='Actual isolated non-root container file fault/recovery and Compose syntax check; no Compose deployment, resource-pressure injection or network service.')

def ready_endpoints(selector,pods):
    if not selector: raise ValueError('This teaching model requires a nonempty selector')
    return sorted(p['name'] for p in pods if p['ready'] and all(p['labels'].get(k)==v for k,v in selector.items()))

def kubernetes_case():
    pods=[dict(name='web-a',labels={'app':'web'},ready=True),dict(name='web-b',labels={'app':'web'},ready=False)]
    baseline=ready_endpoints({'app':'web'},pods)
    fault=ready_endpoints({'app':'api'},pods)
    recovery=ready_endpoints({'app':'web'},pods)
    return dict(baseline=baseline,fault=fault,recovery=recovery,scope='Authored exact-label and readiness model only; no API server, scheduler, EndpointSlice controller, network or RBAC execution.')

def recovery_case():
    with tempfile.TemporaryDirectory(prefix='cluster-record-') as directory:
        p=Path(directory)/'record.json';baseline={'deploymentRevision':'v1','acknowledged':['order-1','order-2']}
        p.write_text(json.dumps(baseline),encoding='utf-8');backup=p.read_bytes()
        changed=deepcopy(baseline);changed['deploymentRevision']='v2';changed['acknowledged'].append('order-3')
        p.write_text(json.dumps(changed),encoding='utf-8');before_restore=json.loads(p.read_text(encoding='utf-8'))
        p.write_bytes(backup);restored=json.loads(p.read_text(encoding='utf-8'))
        lost=sorted(set(before_restore['acknowledged'])-set(restored['acknowledged']))
    return dict(restoredExact=restored==baseline,lostAcknowledged=lost,cleanupVerified=not Path(directory).exists(),scope='Actual local JSON snapshot restoration; not Kubernetes rollout, etcd, PV or database recovery. Acknowledged loss is intentional and explicit.')

if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--case',choices=['container','selectors','recovery'],required=True);a=p.parse_args()
    print(json.dumps({'container':container_case,'selectors':kubernetes_case,'recovery':recovery_case}[a.case](),indent=2))
