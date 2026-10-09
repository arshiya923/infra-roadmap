#!/usr/bin/env python3
"""Offline declared fabric rehearsal. No sockets, device sessions or host network changes."""
import argparse,copy,hashlib,ipaddress,json,tempfile
from pathlib import Path

def baseline():
    leaves={f'L{i}':f'203.0.113.{10+i}' for i in range(1,5)}
    endpoints={
        'web':dict(tenant='Blue',epg='Web',vni=10100,ip='192.0.2.10',mac='02:00:00:00:00:10',leaves=['L1','L2']),
        'app':dict(tenant='Blue',epg='App',vni=10100,ip='192.0.2.20',mac='02:00:00:00:00:20',leaves=['L3','L4']),
        'storage':dict(tenant='Blue',epg='Storage',vni=10100,ip='192.0.2.30',mac='02:00:00:00:00:30',leaves=['L3','L4']),
        'red':dict(tenant='Red',epg='Audit',vni=10200,ip='198.51.100.10',mac='02:00:00:00:01:10',leaves=['L2']),
        'firewall-a':dict(tenant='Blue',epg='Border',vni=10100,ip='192.0.2.50',mac='02:00:00:00:00:50',leaves=['L3']),
        'firewall-b':dict(tenant='Blue',epg='Border',vni=10100,ip='192.0.2.51',mac='02:00:00:00:00:51',leaves=['L4'])}
    return dict(spines=['S1','S2'],leaves=leaves,
        links=[dict(leaf=l,spine=s,rate=100,mtu=1600,up=True) for l in leaves for s in ['S1','S2']],
        endpoints=endpoints,imports={'Blue':['65000:10100'],'Red':['65000:10200']},
        routes={e:dict(type=2,present=True,rt='65000:'+str(x['vni']),next_hops=x['leaves'][:],mac=x['mac'],ip=x['ip']) for e,x in endpoints.items()},
        vpc_intent=[dict(domain=10,peers=['L1','L2'],peer_link='independent port channel',keepalive='separate OOB path'),dict(domain=20,peers=['L3','L4'],peer_link='independent port channel',keepalive='separate OOB path')],
        aci=dict(apic=True,deployed=True,vrfs={'Blue':'Blue-VRF','Red':'Red-VRF'},
            contracts=[dict(tenant='Blue',consumer='Web',provider='App',protocol='tcp',port=443),dict(tenant='Blue',consumer='App',provider='Storage',protocol='tcp',port=3260)]))

def integer(n,lo,hi):
    if type(n) is not int or not lo<=n<=hi:raise ValueError('Integer outside declared range')

def validate(p):
    if set(p['spines'])!={'S1','S2'} or len(p['spines'])!=2 or set(p['leaves'])!={'L1','L2','L3','L4'}:raise ValueError('Reference needs two spines and four leaves')
    addresses=[str(ipaddress.ip_address(v)) for v in p['leaves'].values()]
    seen=set()
    for link in p['links']:
        pair=(link['leaf'],link['spine'])
        if pair in seen or pair[0] not in p['leaves'] or pair[1] not in p['spines']:raise ValueError('Duplicate or unknown fabric edge')
        seen.add(pair);integer(link['rate'],1,1600);integer(link['mtu'],576,10000)
        if type(link['up']) is not bool:raise ValueError('Link up must be boolean')
    if seen!={(l,s) for l in p['leaves'] for s in p['spines']}:raise ValueError('Incomplete eight-edge reference')
    macs=[]
    for name,e in p['endpoints'].items():
        integer(e['vni'],1,16777215);addresses.append(str(ipaddress.ip_address(e['ip'])));macs.append(e['mac'])
        if not e['leaves'] or len(set(e['leaves']))!=len(e['leaves']) or not set(e['leaves'])<=set(p['leaves']):raise ValueError('Unknown/duplicate endpoint attachment')
        if e['tenant'] not in p['imports'] or e['tenant'] not in p['aci']['vrfs']:raise ValueError('Unknown tenant')
        r=p['routes'][name]
        if r['type']!=2 or type(r['present']) is not bool or not r['next_hops'] or not set(r['next_hops'])<=set(p['leaves']):raise ValueError('Invalid synthetic type-2 record')
        if r['ip']!=e['ip'] or r['mac']!=e['mac']:raise ValueError('Route identity disagrees with endpoint')
    if len(addresses)!=len(set(addresses)) or len(macs)!=len(set(macs)):raise ValueError('Duplicate address or MAC')
    for k in ['apic','deployed']:
        if type(p['aci'][k]) is not bool:raise ValueError('ACI flags must be boolean')
    for c in p['aci']['contracts']:
        integer(c['port'],1,65535)
        if c['tenant'] not in p['imports'] or c['protocol']!='tcp':raise ValueError('Unsupported contract scope')
    return True

def overlay(p,source,destination,inner_ip=1500):
    """Declared known-unicast relation only; not a packet or BGP simulator."""
    validate(p);integer(inner_ip,68,9000)
    a,b=p['endpoints'][source],p['endpoints'][destination];r=p['routes'][destination]
    if a['vni']!=b['vni']:return dict(eligible=False,reason='different L2 VNIs',paths=[])
    if not r['present']:return dict(eligible=False,reason='destination route withdrawn',paths=[])
    if r['rt'] not in p['imports'][a['tenant']]:return dict(eligible=False,reason='RT not imported',paths=[])
    links={(x['leaf'],x['spine']):x for x in p['links']};paths=[];oversize=False
    # The integrated assessed flow crosses disjoint leaf pairs. Same-leaf traffic is explicitly local.
    for src in a['leaves']:
        for dst in b['leaves']:
            if dst not in r['next_hops']:continue
            if src==dst:paths.append([src]);continue
            for spine in p['spines']:
                left,right=links[src,spine],links[dst,spine]
                if left['up'] and right['up']:
                    if inner_ip+50<=min(left['mtu'],right['mtu']):paths.append([src,spine,dst])
                    else:oversize=True
    return dict(eligible=bool(paths),reason='declared path eligible' if paths else 'outer IP exceeds path MTU' if oversize else 'no declared usable underlay path',paths=paths,outer_ip=inner_ip+50)

def aci(p,source,destination,port):
    """Separate one-way enforced inter-EPG TCP policy intent; no return/session semantics."""
    validate(p);integer(port,1,65535);a,b=p['endpoints'][source],p['endpoints'][destination]
    if a['epg']==b['epg']:raise ValueError('This comparison is inter-EPG only')
    return p['aci']['deployed'] and any(c==dict(tenant=a['tenant'],consumer=a['epg'],provider=b['epg'],protocol='tcp',port=port) and a['tenant']==b['tenant'] for c in p['aci']['contracts'])

def capacity(p):
    validate(p)
    return {l:sum(x['rate'] for x in p['links'] if x['leaf']==l and x['up']) for l in p['leaves']}

class InjectedFailure(Exception):pass

def run(inject=None):
    if inject not in (None,'baseline','fault','restored'):raise ValueError('Unknown injection stage')
    original=json.dumps(baseline(),sort_keys=True,indent=2).encode();events=[];interrupted=False;restored=False
    with tempfile.TemporaryDirectory(prefix='cisco-dc-owned-') as tmp:
        owned=Path(tmp);file=owned/'fabric.json';file.write_bytes(original)
        try:
            p=json.loads(file.read_bytes());validate(p)
            assert overlay(p,'web','app')['eligible'] and not overlay(p,'red','app')['eligible']
            assert aci(p,'web','app',443) and not aci(p,'web','app',22)
            events.append('baseline positive/negative overlay and ACI checks passed')
            if inject=='baseline':raise InjectedFailure()
            p['routes']['app']['present']=False;file.write_text(json.dumps(p),encoding='utf-8')
            failed=overlay(json.loads(file.read_bytes()),'web','app');assert not failed['eligible'] and failed['reason']=='destination route withdrawn'
            assert all(x['up'] for x in p['links']);events.append('route withdrawal rejected while all eight underlay links remain up')
            if inject=='fault':raise InjectedFailure()
            file.write_bytes(original);assert file.read_bytes()==original;restored=True
            q=json.loads(file.read_bytes());assert overlay(q,'web','app')['eligible'] and not overlay(q,'red','app')['eligible'];events.append('byte-identical restore and positive/negative recheck passed')
            if inject=='restored':raise InjectedFailure()
        except InjectedFailure:interrupted=True
        finally:
            file.write_bytes(original);restored=file.read_bytes()==original
            assert restored and overlay(json.loads(file.read_bytes()),'web','app')['eligible']
    assert not owned.exists()
    return dict(result='INTERRUPTED' if interrupted else 'PASS',events=events,restored=restored,cleaned=not owned.exists(),baselineSHA256=hashlib.sha256(original).hexdigest(),scope='Offline declared topology/route/policy records and an owned temporary JSON file. No packets, Cisco sessions, vPC convergence, firewall state or storage I/O.')

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--run',action='store_true');parser.add_argument('--inject-failure',choices=['baseline','fault','restored']);args=parser.parse_args()
    if not args.run:parser.print_help()
    else:print(json.dumps(run(args.inject_failure),indent=2))
