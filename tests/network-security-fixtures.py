"""Exercise actual owned operations and cleanup after three interrupted boundaries."""
from pathlib import Path
import importlib.util,json
R=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('security_loopback',R/'labs/network-security-loopback.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
normal=module.run_fixture();interruptions=[]
assert len(normal['checks'])==13
for boundary in ('baseline','fault','restored'):
    try:module.run_fixture(fail_at=boundary)
    except module.FixtureInterrupted as e:
        assert e.report['failureInjected']==boundary and all(e.report['cleanup'].values());interruptions.append(e.report)
    else:raise AssertionError('Expected owned interruption')
out=dict(date='2026-10-09',result='PASS',normal=normal,interruptions=interruptions,scope=normal['scope'])
(R/'docs/network-security-fixture-results.json').write_text(json.dumps(out,indent=2)+'\n',encoding='utf-8')
print('PASS 13 actual application checks, independent recovery, and 3 interrupted cleanup paths')
