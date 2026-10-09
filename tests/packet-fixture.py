import hashlib
import importlib.util
import json
import pathlib
import struct
import subprocess
import sys

root = pathlib.Path(__file__).resolve().parents[1]
source = root / 'labs/packet-fixture.py'
capture = root / 'labs/packet-fixture.pcap'
spec = importlib.util.spec_from_file_location('fixture', source)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
data = capture.read_bytes()
assert data == module.fixture()
assert hashlib.sha256(data).hexdigest() == '6fac48f1c199a3f88130a56073ef267635f403237d512fabffe63190b9fa4db5'
assert struct.unpack('<IHHIIII', data[:24]) == (0xa1b2c3d4, 2, 4, 0, 0, 65535, 1)
frames = []
offset = 24
while offset < len(data):
    seconds, micros, captured, original = struct.unpack('<4I', data[offset:offset + 16])
    assert seconds == 1720000000 and micros == len(frames) * 1000
    packet = data[offset + 16:offset + 16 + captured]
    assert len(packet) == captured and captured <= original
    frames.append((packet, captured, original))
    offset += 16 + captured
assert offset == len(data) and len(frames) == 10
assert [len(x[0]) for x in frames] == [42, 42, 51, 51, 54, 54, 54, 76, 92, 54]
assert frames[-1][2] == 162


def valid_checksum(raw):
    padded = raw + (b'\0' if len(raw) % 2 else b'')
    total = sum(int.from_bytes(padded[i:i + 2], 'big') for i in range(0, len(padded), 2))
    return ((total & 65535) + (total >> 16)) % 65535 == 0


for packet, captured, original in frames[2:]:
    ip = packet[14:34]
    assert valid_checksum(ip)
    if captured != original:
        continue  # Truncated payload cannot prove the transport checksum.
    payload, protocol = packet[34:], ip[9]
    if protocol == 1:
        assert valid_checksum(payload)
    else:
        pseudo = ip[12:20] + bytes([0, protocol]) + struct.pack('!H', len(payload))
        assert valid_checksum(pseudo + payload)


def run(args, expected=0):
    result = subprocess.run(args, capture_output=True, text=True, timeout=10)
    assert result.returncode == expected, result.stderr
    return result.stdout


help_text = run([sys.executable, str(source)])
assert '--write' in help_text and '"result"' not in help_text
cases = []
for expression, count in [('arp', 2), ('icmp', 2), ('tcp port 443', 4), ('udp port 53', 2), ('tcp port 80', 0)]:
    text = run(['tcpdump', '-nn', '-r', str(capture), expression])
    assert len(text.splitlines()) == count, expression
    cases.append({'tool': 'tcpdump', 'filter': expression, 'packets': count})
for expression, numbers in [('arp', ['1', '2']), ('icmp', ['3', '4']), ('tcp.flags.syn == 1', ['5', '6']), ('dns.flags.response == 1', ['9']), ('frame.cap_len < frame.len', ['10']), ('tcp.stream == 0', ['5', '6', '7', '10'])]:
    text = run(['tshark', '-n', '-r', str(capture), '-Y', expression, '-T', 'fields', '-e', 'frame.number'])
    assert text.splitlines() == numbers, expression
    cases.append({'tool': 'tshark', 'filter': expression, 'frames': numbers})
for args in [['tcpdump', '-nn', '-r', str(capture), 'tcp.port == 443'], ['tshark', '-n', '-r', str(capture), '-Y', 'tcp port 443']]:
    invalid = subprocess.run(args, capture_output=True, text=True, timeout=10)
    assert invalid.returncode != 0
assert capture.read_bytes() == data
result = {'date': '2026-10-08', 'result': 'PASS', 'sha256': hashlib.sha256(data).hexdigest(), 'checks': ['Inert generator help and deterministic bytes', 'Independent PCAP lengths, link type and timestamps', 'IPv4 and complete transport/ICMP checksums valid', 'Final packet intentionally has 54 captured / 162 original bytes', 'Five libpcap filter cases and six Wireshark display-filter cases', 'Cross-language filter mistakes rejected', 'Offline analysis leaves fixture unchanged'], 'cases': cases, 'limitations': 'Generated Ethernet bytes; no live capture, GUI interaction, real timing, TLS or production traffic tested'}
(root / 'docs/packet-fixture-results.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
print(json.dumps(result, indent=2))
