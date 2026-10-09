"""Run with Ubuntu Python beside installed dig/nslookup; no external DNS queries."""
import importlib.util
import json
import pathlib
import socket
import struct
import subprocess
from unittest.mock import patch

root = pathlib.Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('dns_lab', root / 'labs/dns-loopback.py')
lab = importlib.util.module_from_spec(spec)
spec.loader.exec_module(lab)
resolver_before = pathlib.Path('/etc/resolv.conf').read_bytes()
original_socket = socket.socket
sockets = []
binds = []


class TrackedSocket(original_socket):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        sockets.append(self)

    def bind(self, endpoint):
        assert endpoint[0] == '127.0.0.1', endpoint
        binds.append(endpoint)
        return super().bind(endpoint)


help_result = subprocess.run(['python3', str(root / 'labs/dns-loopback.py')], capture_output=True, text=True, timeout=5, check=True)
assert '--run' in help_result.stdout and '"cases"' not in help_result.stdout
with patch.object(lab.socket, 'socket', TrackedSocket):
    evidence = lab.run()
assert evidence['result'] == 'PASS' and len(evidence['cases']) == 7
assert len(binds) == 2 and all(s.fileno() == -1 for s in sockets)

# Independently encoded question; inspect fields rather than using fixture encoders.
question = b'\x03app\x03lab\x04test\0' + struct.pack('!HH', 1, 1)
packet = struct.pack('!6H', 0x1234, 0x100, 1, 0, 0, 0) + question
response = lab.answer(packet)
ident, flags, qd, an, ns, ar = struct.unpack('!6H', response[:12])
assert (ident, qd, an, ns, ar) == (0x1234, 1, 1, 0, 0)
assert flags & 0x8000 and flags & 0x400 and flags & 0x100 and not flags & 0x80
assert response[12:12 + len(question)] == question and response[-4:] == b'\xc0\x00\x02\x50'
for bad in [b'', b'\0' * 12, packet[:18], packet[:12] + b'\xc0\x0c\0\x01\0\x01']:
    assert lab.answer(bad) is None
foreign = struct.pack('!6H', 1, 0, 1, 0, 0, 0) + b'\x07outside\x04test\0' + struct.pack('!HH', 1, 1)
assert struct.unpack('!H', lab.answer(foreign)[2:4])[0] & 15 == 5

with patch.object(lab.socket, 'socket', TrackedSocket):
    with patch.object(lab.subprocess, 'run', side_effect=RuntimeError('injected client failure')):
        try:
            lab.run()
            raise AssertionError('Expected failure not raised')
        except RuntimeError as error:
            assert 'injected client failure' in str(error)
assert len(binds) == 4 and all(s.fileno() == -1 for s in sockets)
assert pathlib.Path('/etc/resolv.conf').read_bytes() == resolver_before
result = {'date': '2026-10-04', 'result': 'PASS', 'checks': ['Inert default help', 'Seven real dig/nslookup cases including TCP and timeout', 'Only loopback listeners on ephemeral port', 'Independent wire header, question, A data and no recursion capability', 'Malformed/compressed questions ignored; unrelated names refused', 'Listener cleanup after success and injected client failure', 'Host resolver configuration unchanged'], 'observed': evidence, 'limitations': 'Minimal explicit fixture, no caching/recursion/delegation/DNSSEC, no external or Windows DNS-client validation'}
(root / 'docs/dns-lab-results.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
print(json.dumps(result, indent=2))
