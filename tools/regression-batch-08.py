"""Run actual Batch 08 gates and retain per-command exit/output evidence."""
import json,pathlib,subprocess,sys
root=pathlib.Path(__file__).resolve().parents[1]
models=['switching-models','stp-evidence','mst-models','edge-models','guard-models','root-guard-models','loop-guard-models','storm-models','security-port-models','span-models','rspan-models','erspan-models','enterprise-lab-models']
browsers=['batch-08','rstp','mst','portfast','bpdu-guard','root-guard','loop-guard','storm-control','port-security','span','rspan','erspan','enterprise-lab','batch-08-acceptance']
commands=[(['node','tests/content.cjs'],'Content/original/hash/catalog contracts')]+[(['node','tests/'+name+'.cjs'],'Independent bounded model expectations') for name in models]+[(['wsl','-d','Ubuntu-24.04','--','python3','/mnt/c/Users/Arshiya/Desktop/Infta Roadmap/tests/erspan-fixture.py'],'Actual offline synthetic decoder/byte evidence')]+[(['node','tests/browser-'+name+'.cjs'],'Focused UI, animation/connection and responsive gates') for name in browsers]+[(['node','tests/browser.cjs'],'Shared reader/original controls and direct-file operation'),(['node','tests/quality-audit.cjs'],'Full authored-course prerequisite/content/route/contrast/search audit')]
checks=[]
for args,scope in commands:
    try:
        run=subprocess.run(args,cwd=root,capture_output=True,timeout=180)
        output=run.stdout.decode('utf8',errors='replace').strip()
        error=run.stderr.decode('utf8',errors='replace').strip() or None
        exit_code=run.returncode
    except (subprocess.TimeoutExpired,OSError) as exception:
        output='';error=str(exception);exit_code=None
    result='PASS' if exit_code==0 else 'FAIL'
    checks.append({'command':args,'scope':scope,'result':result,'exitCode':exit_code,'output':output,'error':error})
    print(result+' '+' '.join(args),flush=True)
    if result=='FAIL':
        print(error or output,flush=True)
report={'date':'2026-10-09','result':'PASS' if all(x['result']=='PASS' for x in checks) else 'FAIL','checks':checks,'scope':'Batch 08 taught models, actual synthetic offline fixture, full-unit UI and broad course audit. No actual Cisco execution or live fault/service/capture.'}
(root/'docs/batch-08-regression-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print(report['result']+' '+str(len(checks))+' actual regression commands',flush=True)
sys.exit(0 if report['result']=='PASS' else 1)
