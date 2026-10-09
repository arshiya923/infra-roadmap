"""Independent fixture, CLI and cleanup checks on Windows or Linux."""
from pathlib import Path
import hashlib
import importlib.util
import json
import os
import subprocess
import sys
import tempfile
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / 'labs/image-audit.py'
spec = importlib.util.spec_from_file_location('image_audit', SCRIPT)
lab = importlib.util.module_from_spec(spec)
spec.loader.exec_module(lab)


def cli(*args):
    return subprocess.run([sys.executable, str(SCRIPT), *args], capture_output=True, text=True, timeout=20)


checks = []
with tempfile.TemporaryDirectory(prefix='infra-image-test-') as directory:
    scratch = Path(directory)
    target = scratch / 'sample.bin'
    data = bytes(range(256)) * 8193  # More than two streaming blocks.
    target.write_bytes(data)
    expected = hashlib.sha512(data).hexdigest()
    before = target.stat()
    observed_modes = []
    original_open = Path.open

    def watched_open(self, mode='r', *args, **kwargs):
        observed_modes.append(mode)
        return original_open(self, mode, *args, **kwargs)

    with patch.object(Path, 'open', watched_open):
        report = lab.compare(target, expected.upper())
    assert observed_modes == ['rb']
    assert report['match'] and report['bytes'] == len(data)
    assert report['sha512'] == expected and report['unchanged_during_observation']
    assert target.read_bytes() == data and target.stat().st_mtime_ns == before.st_mtime_ns
    checks.append('Streaming comparison is read-only, preserves bytes/mtime and accepts uppercase expected digest')
    assert cli('--file', str(target), '--sha512', expected).returncode == 0
    altered = bytearray(data)
    altered[-1] ^= 1
    target.write_bytes(altered)
    result = cli('--file', str(target), '--sha512', expected)
    assert result.returncode == 1 and not json.loads(result.stdout)['match']
    assert json.loads(result.stdout)['bytes'] == len(data)
    checks.append('Same-size single-byte change fails independently supplied digest comparison')
    for args in [('--file', str(target)), ('--sha512', expected), ('--file', str(target), '--sha512', 'bad'), ('--file', str(scratch / 'absent'), '--sha512', expected), ('--file', str(scratch), '--sha512', expected)]:
        assert cli(*args).returncode == 2
    checks.append('Missing arguments, malformed digest, missing file and directory are rejected')
    if hasattr(os, 'mkfifo'):
        fifo = scratch / 'not-a-regular-file'
        os.mkfifo(fifo)
        assert cli('--file', str(fifo), '--sha512', expected).returncode == 2
        checks.append('Linux FIFO rejected before blocking read')
    assert 'usage:' in cli().stdout and cli().returncode == 0
    assert 'usage:' in cli('--help').stdout
    checks.append('Default invocation is inert help')
    created = []
    original_temp = tempfile.TemporaryDirectory

    def owned_temp(*args, **kwargs):
        kwargs['dir'] = scratch
        manager = original_temp(*args, **kwargs)
        created.append(Path(manager.name))
        return manager

    with patch.object(lab.tempfile, 'TemporaryDirectory', owned_temp):
        demo = lab.demo()
        assert demo['baseline']['match'] and not demo['same_size_change']['match']
    assert created and all(not p.exists() for p in created)
    with patch.object(lab.tempfile, 'TemporaryDirectory', owned_temp), patch.object(lab, 'compare', side_effect=OSError('injected')):
        try:
            lab.demo()
            raise AssertionError('Injected error was swallowed')
        except OSError:
            pass
    assert all(not p.exists() for p in created)
    assert cli('--run').returncode == 0
    checks.append('Temporary demo cleanup verified on normal and injected failure paths')
report = {'result': 'PASS', 'platform': sys.platform, 'checks': checks, 'scope': 'Synthetic bytes only; no Cisco image, vendor signature, compatibility or boot execution'}
print(json.dumps(report, indent=2))
