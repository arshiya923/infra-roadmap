import importlib.util
import json
import os
import pathlib
import socket
import subprocess
import sys
from unittest.mock import patch

root = pathlib.Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('socket_lab', root / 'labs/socket-inspection.py')
lab = importlib.util.module_from_spec(spec)
spec.loader.exec_module(lab)
original = socket.socket
owned = []
bindings = []


class TrackedSocket(original):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        owned.append(self)

    def bind(self, endpoint):
        assert endpoint[0] == '127.0.0.1' and endpoint[1] == 0
        bindings.append(endpoint)
        return super().bind(endpoint)

    def connect(self, endpoint):
        assert endpoint[0] == '127.0.0.1'
        return super().connect(endpoint)


help_result = subprocess.run([sys.executable, str(root / 'labs/socket-inspection.py')], capture_output=True, text=True, timeout=5, check=True)
assert '--run' in help_result.stdout and '"result"' not in help_result.stdout
with patch.object(lab.socket, 'socket', TrackedSocket):
    observed = lab.run()
assert observed['result'] == 'PASS' and len(bindings) == 2
assert len(owned) == 4 and all(item.fileno() == -1 for item in owned)
with patch.object(lab.socket, 'socket', TrackedSocket):
    with patch.object(lab, 'inspect', side_effect=RuntimeError('injected inspection failure')):
        try:
            lab.run()
            raise AssertionError('Missing expected failure')
        except RuntimeError as error:
            assert 'injected inspection failure' in str(error)
assert len(bindings) == 4 and len(owned) == 6
assert all(item.fileno() == -1 for item in owned)
result = {'date': '2026-10-04', 'result': 'PASS', 'environment': 'Windows' if os.name == 'nt' else 'Ubuntu WSL', 'checks': ['Inert help', 'Only ephemeral loopback binds and loopback connects', 'Five real state/application observations', 'All four sockets closed normally', 'Both sockets closed after injected inspection failure'], 'observed': observed}
name = 'socket-lab-windows-results.json' if os.name == 'nt' else 'socket-lab-linux-results.json'
(root / 'docs' / name).write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
print(json.dumps(result, indent=2))
