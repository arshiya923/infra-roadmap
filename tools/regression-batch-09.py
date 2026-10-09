"""Current Batch 09 draft gates; preserve actual command results separately from acceptance."""
import json,pathlib,subprocess,sys
root=pathlib.Path(__file__).resolve().parents[1]
commands=[['node','tests/content.cjs'],['node','tests/static-route-models.cjs'],['node','tests/floating-route-models.cjs'],['node','tests/pbr-models.cjs'],['node','tests/ospf-models.cjs'],['node','tests/ospf-area-models.cjs'],['node','tests/ospf-dr-bdr-models.cjs'],['node','tests/routing-models.cjs'],['node','tests/static-routing-lab.cjs'],['node','tests/ospf-routing-lab.cjs'],['node','tests/ospf-areas-lab.cjs'],['node','tests/ospf-dr-bdr-lab.cjs'],['node','tests/eigrp-routing-lab.cjs'],['node','tests/bgp-routing-lab.cjs'],['python','tools/build-bgp-evidence.py'],['node','tests/bgp-evidence.cjs'],['node','tests/eigrp-models.cjs'],['node','tests/eigrp-metric-models.cjs'],['python','tools/build-eigrp-neighbor-evidence.py'],['node','tests/eigrp-neighbor-evidence.cjs'],['node','tests/eigrp-topology.cjs'],['python','tools/build-ospf-lsa-evidence.py'],['node','tests/ospf-lsa-models.cjs'],['node','tests/ospf-lsa-evidence.cjs'],['python','tools/build-ospf-troubleshooting-evidence.py'],['node','tests/ospf-troubleshooting-evidence.cjs'],['node','tests/browser-static-routing.cjs'],['node','tests/browser-floating-routes.cjs'],['node','tests/browser-pbr.cjs'],['node','tests/browser-ospf.cjs'],['node','tests/browser-ospf-areas.cjs'],['node','tests/browser-ospf-dr-bdr.cjs'],['node','tests/browser-ospf-lsa.cjs'],['node','tests/browser-ospf-troubleshooting.cjs'],['node','tests/browser-eigrp.cjs'],['node','tests/browser-eigrp-lesson.cjs'],['node','tests/browser-eigrp-metrics.cjs'],['node','tests/browser-eigrp-neighbors.cjs'],['node','tests/browser-eigrp-topology.cjs'],['node','tests/browser-bgp.cjs'],['node','tests/browser-bgp-lesson.cjs'],['node','tests/browser-enterprise-lab.cjs'],['node','tests/browser.cjs'],['node','tests/quality-audit.cjs']]
commands += [['node','tests/ebgp-policy-models.cjs'],['node','tests/browser-ebgp-policy.cjs'],['node','tests/browser-ebgp-lesson.cjs'],['node','tests/ibgp-models.cjs'],['node','tests/browser-ibgp.cjs'],['node','tests/browser-ibgp-lesson.cjs']]
commands += [['node', 'staging/'+name+'/model.test.cjs'] for name in ['bgp-attributes','local-preference','med','as-path','communities']]
commands += [['node','tests/bgp-policy-primary.cjs'],['node','tests/browser-bgp-policy-series.cjs'],['node','tests/content.cjs']]
checks=[]
for command in commands:
    try:
        run=subprocess.run(command,cwd=root,capture_output=True,timeout=300 if command[-1]=='tests/ospf-routing-lab.cjs' else 180)
        output=run.stdout.decode('utf8',errors='replace').strip()
        error=run.stderr.decode('utf8',errors='replace').strip() or None
        code=run.returncode
    except (subprocess.TimeoutExpired,OSError) as exception:
        output='';error=str(exception);code=None
    result='PASS' if code==0 else 'FAIL'
    checks.append(dict(command=command,result=result,exitCode=code,output=output,error=error))
    print(result+' '+' '.join(command),flush=True)
    if result=='FAIL': print(error or output,flush=True)
report=dict(date='2026-10-09',result='PASS' if all(x['result']=='PASS' for x in checks) else 'FAIL',checks=checks,scope='Twenty authored Batch09 routing drafts;115 authored lessons total and95 accepted originals until primary batch acceptance. Actual isolated Linux/FRR companions remain separate from browser declarations and guided Cisco/FRR inspection. BGP attribute flags, Local Preference, conditional two-path MED, ordinary AS_SEQUENCE and community-set policy are bounded deterministic exercises, not full bestpath, malformed UPDATE execution, iBGP/RR execution or actual policy/multipath/hardware/application/convergence proof.')
(root/'docs/batch-09-regression-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n','utf8')
print(report['result']+' '+str(len(checks))+' actual regression commands',flush=True)
sys.exit(0 if report['result']=='PASS' else 1)
