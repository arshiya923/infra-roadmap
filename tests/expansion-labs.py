"""Independent boundaries and actual local companion runs, never vendor execution."""
import importlib.util
import json
from pathlib import Path
import sys

ROOT=Path(__file__).resolve().parents[1]
def load(name):
    spec=importlib.util.spec_from_file_location(name,ROOT/'labs'/f'{name}.py')
    module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);return module

def infrastructure():
    m=load('infrastructure-rehearsal')
    assert m.objective(10000,10,'99.9')['meets']
    assert not m.objective(10000,11,'99.9')['meets']
    assert m.objective(10,0,100)['meets']
    assert not m.objective(10,1,100)['meets']
    for values in [(0,0,99),(-1,0,99),(10,11,99),(10,-1,99),(10,0,0),(10,0,101),(10,0,'NaN'),(True,0,99)]:
        try: m.objective(*values)
        except (ValueError,ArithmeticError): pass
        else: raise AssertionError(values)
    for graph in [{'a':['b']},{'a':['a']}]:
        try: m.dependency_check(graph,'a',set())
        except ValueError: pass
        else: raise AssertionError(graph)
    result={case:m.run(case) for case in ['dependencies','objectives','change']}
    assert result['dependencies']['baseline']['available']
    assert result['dependencies']['fault']['blocked']==['database']
    assert result['dependencies']['recovery']['available']
    assert result['objectives']['fault']['remaining']=='-10.000'
    assert all(result['change'][k] for k in ['candidateRejected','faultDiffers','restoredExact'])
    assert all(r['cleanupVerified'] for r in result.values())
    return result

def linux():
    m=load('linux-operations');result={case:m.run(case) for case in ['access','process','storage']}
    assert result['access']['denied'] and result['access']['restored'] and result['access']['mode']=='0o640'
    assert [result['process'][p]['exit'] for p in ['baseline','fault','recovery']]==[0,3,0]
    assert [result['process'][p]['stdout'] for p in ['baseline','fault','recovery']]==['READY','DISABLED','READY']
    assert result['storage']['faultDiffers'] and result['storage']['restored']
    assert all(r['cleanupVerified'] for r in result.values())
    return result

def application():
    m=load('application-delivery')
    result={'http':m.http_case(),'tls':m.tls_case(),'pools':m.balance_case()}
    assert [result['http'][p]['status'] for p in ['baseline','fault','recovery']]==[200,503,200]
    assert result['http']['baseline']['body']==result['http']['recovery']['body']=='receipt-17'
    assert result['tls']['hostnameMismatchRejected']
    assert 'hostname mismatch' in result['tls']['verificationReason'].lower()
    assert result['tls']['baseline']['body']==result['tls']['recovery']['body']=='trusted-local-receipt'
    assert result['tls']['listenersClosed'] and result['tls']['cleanupVerified']
    assert [result['pools'][p]['withinDatabaseLimit'] for p in ['baseline','fault','recovery']]==[True,False,True]
    assert m.pool_envelope(5,10,50,0,0)['withinDatabaseLimit']
    assert not m.pool_envelope(5,11,50,1,1)['withinDatabaseLimit']
    for values in [(0,10,50,1,1),(4,-1,50,1,1),(4,10,50,-1,1),(4,10,50,1,float('nan'))]:
        try: m.pool_envelope(*values)
        except ValueError: pass
        else: raise AssertionError(values)
    return result

def containers():
    m=load('container-operations');result={'container':m.container_case(),'selectors':m.kubernetes_case(),'recovery':m.recovery_case()}
    assert result['container']['observations']==['baseline=ready','fault=not-ready','recovery=ready','65534']
    assert result['container']['containerRemoved'] and result['container']['composeSyntaxValidated']
    assert result['selectors']['baseline']==result['selectors']['recovery']==['web-a']
    assert result['selectors']['fault']==[]
    assert result['recovery']['restoredExact'] and result['recovery']['lostAcknowledged']==['order-3']
    assert result['recovery']['cleanupVerified'] and result['container']['cleanupVerified']
    assert m.ready_endpoints({'app':'web','tier':'front'},[{'name':'a','labels':{'app':'web'},'ready':True}])==[]
    try: m.ready_endpoints({},[])
    except ValueError: pass
    else: raise AssertionError('Empty selector must be rejected by this limited model')
    return result

def cloud():
    m=load('cloud-planning');result={'access':m.access_case(),'capacity':m.capacity_case(),'cost':m.cost_case()}
    assert [result['access'][p] for p in ['baseline','fault','recovery']]==['allow','explicit-deny','allow']
    assert result['access']['unrelated']=='implicit-deny'
    assert [result['capacity'][p]['survivingCapacity'] for p in ['baseline','fault','recovery']]==['180','60','120']
    assert m.capacity(2,50,0,100)['fits'] and not m.capacity(2,50,1,100)['fits']
    assert [result['cost'][p]['total'] for p in ['baseline','fault','recovery']]==['123.50','233.00','123.50']
    assert result['cost']['restoredExact'] and result['cost']['cleanupVerified']
    assert m.cost(1,1,1,0,0,0,0,1)['withinBudget']
    for values in [(0,50,0,1),(2,50,3,1),(2,-1,0,1),(2,50,0,float('inf'))]:
        try: m.capacity(*values)
        except ValueError: pass
        else: raise AssertionError(values)
    for values in [(-1,1,1,0,0,0,0,1),(1,1,float('nan'),0,0,0,0,1),(1,1,1,0,0,0,0,-1)]:
        try: m.cost(*values)
        except (ValueError,ArithmeticError): pass
        else: raise AssertionError(values)
    return result

if __name__=='__main__':
    batch=sys.argv[1] if len(sys.argv)>1 else '29'
    run={'29':infrastructure,'30':linux,'31':application,'32':containers,'33':cloud}.get(batch)
    if run is None: raise SystemExit('Unknown test batch')
    result={'batch':batch,'result':'PASS','evidence':run()}
    (ROOT/f'docs/expansion-lab-{batch}.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
    print(json.dumps(result,indent=2))
