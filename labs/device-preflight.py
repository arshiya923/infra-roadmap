"""Declared-evidence worksheet, NOT a Cisco compatibility checker or emulator."""
import argparse
import json
GATES=('identity','compatibility','baseline','recovery','service')
def evaluate(values):
    if not isinstance(values,dict) or set(values)!=set(GATES):
        raise ValueError('Supply exactly the five declared gates')
    if any(v not in ('pass','fail','unknown') for v in values.values()):
        raise ValueError('Gate values must be pass, fail or unknown')
    failed=[k for k in GATES if values[k]=='fail']
    unknown=[k for k in GATES if values[k]=='unknown']
    return dict(eligible=not failed and not unknown,failed=failed,unknown=unknown)
def run():
    baseline=dict.fromkeys(GATES,'pass')
    cases=[('baseline',baseline),('unknown version',{**baseline,'compatibility':'unknown'}),('service fault',{**baseline,'service':'fail'}),('restored declaration',baseline)]
    return dict(scope='CALCULATED from supplied declarations; no Cisco execution, compatibility discovery or traffic test',checkpoints=[dict(name=n,inputs=v,result=evaluate(v)) for n,v in cases],persistentResources='none')
if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--run',action='store_true')
    args=parser.parse_args()
    if args.run: print(json.dumps(run(),indent=2))
    else: parser.print_help()
