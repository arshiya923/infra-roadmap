"""Offline authorization/capacity/cost teaching models and owned-file restoration.
No cloud SDK, credentials, network calls, provider pricing or resources are used.
"""
import argparse
from decimal import Decimal
import json
from pathlib import Path
import tempfile

def decision(action,resource,allow,deny):
    pair=(action,resource)
    if pair in deny:return 'explicit-deny'
    return 'allow' if pair in allow else 'implicit-deny'

def access_case():
    pair=('read','lesson/receipt')
    return dict(baseline=decision(*pair,{pair},set()),fault=decision(*pair,{pair},{pair}),recovery=decision(*pair,{pair},set()),
                unrelated=decision('write','lesson/receipt',{pair},set()),scope='Exact-pair authorization teaching model; no AWS IAM evaluation, wildcards, roles, resource policies, conditions or organizational policies.')

def capacity(zones,capacity_per_zone,failed,demand):
    if any(type(v) is not int for v in [zones,failed]) or zones<1 or not 0<=failed<=zones:raise ValueError('Invalid domain counts')
    values=[Decimal(str(capacity_per_zone)),Decimal(str(demand))]
    if any(not v.is_finite() or v<0 for v in values):raise ValueError('Invalid capacity/demand')
    available=(zones-failed)*values[0]
    return dict(survivingCapacity=str(available),demand=str(values[1]),fits=available>=values[1])

def capacity_case():
    return dict(baseline=capacity(3,60,0,100),fault=capacity(3,60,2,100),recovery=capacity(3,60,1,100),
                scope='Supplied equal-domain aggregate capacity only. No placement, quorum, storage replication, quota or cloud failover execution.')

def cost(instances,hours,rate,storage_gb,storage_rate,egress_gb,egress_rate,budget):
    if type(instances) is not int or instances<0: raise ValueError('Invalid instance count')
    v=[Decimal(str(x)) for x in [hours,rate,storage_gb,storage_rate,egress_gb,egress_rate,budget]]
    if any(not x.is_finite() or x<0 for x in v):raise ValueError('Nonnegative finite prices/usage required')
    h,r,s,sr,e,er,b=v;compute=instances*h*r;storage=s*sr;egress=e*er;total=compute+storage+egress
    return dict(compute=str(compute),storage=str(storage),egress=str(egress),total=str(total),remaining=str(b-total),withinBudget=total<=b)

def cost_case():
    with tempfile.TemporaryDirectory(prefix='cloud-plan-') as directory:
        p=Path(directory)/'plan.json';baseline={'instances':3,'owner':'training','environment':'disposable'}
        p.write_text(json.dumps(baseline),encoding='utf-8');saved=p.read_bytes()
        p.write_text(json.dumps({**baseline,'instances':6}),encoding='utf-8');changed=p.read_bytes()!=saved
        p.write_bytes(saved);restored=p.read_bytes()==saved
    return dict(baseline=cost(3,730,'.05',100,'.10',50,'.08',150),fault=cost(6,730,'.05',100,'.10',50,'.08',150),recovery=cost(3,730,'.05',100,'.10',50,'.08',150),planChanged=changed,restoredExact=restored,cleanupVerified=not Path(directory).exists(),
                scope='Fictional currency units and rates, not provider prices. Actual local plan-file restoration; no Terraform or cloud API execution and no billing stop mechanism.')

if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--case',choices=['access','capacity','cost'],required=True);a=p.parse_args()
    print(json.dumps({'access':access_case,'capacity':capacity_case,'cost':cost_case}[a.case](),indent=2))
