"""Run Batch 10 checks sequentially and retain exact execution evidence."""
import datetime, json, os, pathlib, subprocess, sys, time

root = pathlib.Path(__file__).resolve().parents[1]
os.environ.setdefault('NODE_PATH', str(pathlib.Path.home() / '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'))
groups = ['route-control', 'vrf-scope', 'gateway-redundancy', 'multicast', 'qos-labels', 'qos-service', 'advanced-lab']
commands = [['node', 'tests/content.cjs']]
commands += [['node', f'staging/{group}/model.test.cjs'] for group in groups]
commands += [['node', 'tests/batch-10-primary.cjs'], ['node', 'tests/batch-10-service-primary.cjs']]
commands += [['node', 'tests/browser-batch-10.cjs'], ['node', 'tests/browser-batch-10-acceptance.cjs'], ['node', 'tests/browser.cjs'], ['node', 'tests/quality-audit.cjs']]
checks = []
for command in commands:
    start = time.monotonic()
    try:
        run = subprocess.run(command, cwd=root, capture_output=True, timeout=600)
        code = run.returncode
        output = run.stdout.decode('utf-8', errors='replace')
        error = run.stderr.decode('utf-8', errors='replace')
    except (OSError, subprocess.TimeoutExpired) as exc:
        code, output, error = None, '', str(exc)
    result = 'PASS' if code == 0 else 'FAIL'
    checks.append(dict(command=command, exitCode=code, result=result, output=output, error=error, seconds=round(time.monotonic()-start, 2)))
    report = dict(date=datetime.date.today().isoformat(), result='RUNNING', checks=checks,
                  scope='Existing content, independent declared-state models and real browser UI checks. Guided target-device commands and physical protocol/service behavior remain unexecuted.')
    (root/'docs/batch-10-regression-results.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print(result+' '+' '.join(command), flush=True)
    if result == 'FAIL':
        print(error or output, flush=True)
        break
report['result'] = 'PASS' if len(checks) == len(commands) and all(c['exitCode'] == 0 for c in checks) else 'FAIL'
(root/'docs/batch-10-regression-results.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(report['result']+' '+str(len(checks))+' executed checks', flush=True)
sys.exit(0 if report['result'] == 'PASS' else 1)
