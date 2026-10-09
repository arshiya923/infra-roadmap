"""Record a bounded Capstone regression; browser dependencies must be available."""
from pathlib import Path
import hashlib
import json
import os
import subprocess

ROOT = Path(__file__).resolve().parents[1]
os.chdir(ROOT)
commands = [
    ['node', '--check', 'scripts/capstone.js'],
    ['node', '--check', 'scripts/learning.js'],
    ['node', 'tests/content.cjs'],
    ['node', 'tests/capstone.cjs'],
    ['node', 'tests/browser-capstone.cjs'],
    ['node', 'tests/browser.cjs'],
]
records = []
for command in commands:
    result = subprocess.run(command, capture_output=True, text=True, encoding='utf-8')
    records.append({'command': command, 'exitCode': result.returncode, 'stdout': result.stdout, 'stderr': result.stderr})
    print(('PASS ' if result.returncode == 0 else 'FAIL ') + ' '.join(command), flush=True)
    if result.returncode:
        break
paths = ['content/batch-28.js', 'labs/capstone-workbook.md', 'labs/capstone-recovery.py', 'scripts/capstone.js', 'styles/capstone.css', 'tests/capstone.cjs', 'tests/browser-capstone.cjs']
report = {'result': 'PASS' if len(records) == len(commands) and all(r['exitCode'] == 0 for r in records) else 'FAIL', 'commands': records, 'sha256': {p: hashlib.sha256(Path(p).read_bytes()).hexdigest() for p in paths}}
Path('docs/capstone-regression-results.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
if report['result'] == 'PASS':
    Path('docs/browser-shared-capstone-results.json').write_bytes(Path('docs/browser-results.json').read_bytes())
raise SystemExit(0 if report['result'] == 'PASS' else 1)
