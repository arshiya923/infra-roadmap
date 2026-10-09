#!/usr/bin/env python3
"""Bounded DNS teaching fixture, loopback only. Not a recursive/production DNS server."""
import argparse
import contextlib
import json
import select
import shutil
import socket
import struct
import subprocess
import threading


def name_wire(name):
    return b''.join(bytes([len(x)]) + x.encode('ascii') for x in name.rstrip('.').split('.')) + b'\0'


def answer(packet):
    """Accept one plain IN question; ignore malformed/unsupported messages."""
    if len(packet) < 17:
        return None
    ident, flags, count, _, _, _ = struct.unpack('!6H', packet[:12])
    if flags & 0xf800 or count != 1:
        return None
    offset, labels = 12, []
    try:
        while packet[offset]:
            size = packet[offset]
            if size > 63 or offset + size + 1 >= len(packet):
                return None
            labels.append(packet[offset + 1:offset + 1 + size].decode('ascii').lower())
            offset += size + 1
        offset += 1
        qtype, qclass = struct.unpack('!HH', packet[offset:offset + 4])
    except (IndexError, UnicodeError, struct.error):
        return None
    if qclass != 1 or offset > 267:
        return None
    name = '.'.join(labels)
    question = packet[12:offset + 4]
    if name == 'quiet.lab.test':
        return None
    rcode, auth, record = 0, True, b''
    if name == 'app.lab.test' and qtype == 1:
        record = b'\xc0\x0c' + struct.pack('!HHIH', 1, 1, 60, 4) + socket.inet_aton('192.0.2.80')
    elif name == 'app.lab.test':
        pass  # Existing owner name, no record of the requested type.
    elif name == 'missing.lab.test':
        rcode = 3
    elif name == 'fail.lab.test':
        rcode, auth = 2, False
    else:
        rcode, auth = 5, False  # Refuse unrelated names; never recurse.
    authority = b''
    if auth and not record:
        soa = name_wire('ns.lab.test') + name_wire('hostmaster.lab.test') + struct.pack('!5I', 1, 3600, 600, 86400, 60)
        authority = name_wire('lab.test') + struct.pack('!HHIH', 6, 1, 60, len(soa)) + soa
    response_flags = 0x8000 | (flags & 0x0100) | (0x0400 if auth else 0) | rcode
    return struct.pack('!6H', ident, response_flags, 1, int(bool(record)), int(bool(authority)), 0) + question + record + authority


@contextlib.contextmanager
def fixture():
    """Own both listeners and close them even when a client command fails."""
    stop = threading.Event()
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as udp, socket.socket(socket.AF_INET, socket.SOCK_STREAM) as tcp:
        udp.bind(('127.0.0.1', 0))
        port = udp.getsockname()[1]
        tcp.bind(('127.0.0.1', port))
        tcp.listen(4)
        tcp.settimeout(0.2)
        errors = []

        def serve():
            try:
                while not stop.is_set():
                    ready, _, _ = select.select([udp, tcp], [], [], 0.1)
                    for listener in ready:
                        if listener is udp:
                            packet, peer = udp.recvfrom(4096)
                            response = answer(packet)
                            if response is not None:
                                udp.sendto(response, peer)
                        else:
                            connection, _ = tcp.accept()
                            with connection:
                                connection.settimeout(0.5)
                                data = b''
                                try:
                                    while len(data) < 2:
                                        chunk = connection.recv(2 - len(data))
                                        if not chunk:
                                            break
                                        data += chunk
                                    if len(data) != 2:
                                        continue
                                    size = struct.unpack('!H', data)[0]
                                    if size > 4096:
                                        continue
                                    packet = b''
                                    while len(packet) < size:
                                        chunk = connection.recv(size - len(packet))
                                        if not chunk:
                                            break
                                        packet += chunk
                                    response = answer(packet) if len(packet) == size else None
                                    if response is not None:
                                        connection.sendall(struct.pack('!H', len(response)) + response)
                                except (TimeoutError, ConnectionError):
                                    continue
            except Exception as error:
                errors.append(str(error))

        worker = threading.Thread(target=serve, daemon=True)
        worker.start()
        try:
            yield port
        finally:
            stop.set()
            worker.join(2)
            if worker.is_alive():
                raise RuntimeError('DNS fixture did not stop within its bound')
            if errors:
                raise RuntimeError('DNS fixture failed: ' + '; '.join(errors))


def run():
    for program in ('dig', 'nslookup'):
        if not shutil.which(program):
            raise RuntimeError(program + ' is required; no software is installed by this lab')
    evidence = []
    with fixture() as port:
        base = ['dig', '@127.0.0.1', '-p', str(port), '+time=1', '+tries=1', '+noedns', '+norecurse']
        cases = [('answer', 'app.lab.test.', 'A', 'NOERROR', 0), ('nodata', 'app.lab.test.', 'AAAA', 'NOERROR', 0), ('nxdomain', 'missing.lab.test.', 'A', 'NXDOMAIN', 0), ('servfail', 'fail.lab.test.', 'A', 'SERVFAIL', 0), ('timeout', 'quiet.lab.test.', 'A', None, 9), ('tcp', 'app.lab.test.', 'A', 'NOERROR', 0)]
        for case, name, qtype, status, exit_code in cases:
            args = base + [name, qtype] + (['+tcp'] if case == 'tcp' else [])
            result = subprocess.run(args, capture_output=True, text=True, timeout=5, check=False)
            if result.returncode != exit_code or (status and 'status: ' + status not in result.stdout):
                raise RuntimeError(case + ' unexpected client result: ' + result.stdout + result.stderr)
            if case in ('answer', 'tcp') and '192.0.2.80' not in result.stdout:
                raise RuntimeError('Expected A answer absent')
            if case in ('nodata', 'nxdomain') and ('ANSWER: 0' not in result.stdout or 'SOA' not in result.stdout):
                raise RuntimeError('Expected negative-answer evidence absent')
            if case == 'timeout' and 'no servers could be reached' not in result.stdout + result.stderr:
                raise RuntimeError('Expected timeout evidence absent')
            evidence.append({'case': case, 'client': 'dig', 'status': status or 'NO RESPONSE', 'exitCode': result.returncode})
        args = ['nslookup', '-port=' + str(port), '-timeout=1', '-retry=1', '-type=A', 'app.lab.test.', '127.0.0.1']
        result = subprocess.run(args, capture_output=True, text=True, timeout=5, check=False)
        if result.returncode or '192.0.2.80' not in result.stdout:
            raise RuntimeError('nslookup did not return the fixture answer: ' + result.stdout + result.stderr)
        evidence.append({'case': 'answer', 'client': 'nslookup', 'status': '192.0.2.80', 'exitCode': 0})
    return {'result': 'PASS', 'scope': 'IPv4 loopback UDP/TCP, ephemeral port; no recursion or resolver configuration changes', 'cases': evidence, 'cleanup': 'Owned listeners closed after all cases'}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--run', action='store_true', help='Run bounded loopback fixture and installed dig/nslookup clients')
    args = parser.parse_args()
    if args.run:
        print(json.dumps(run(), indent=2))
    else:
        parser.print_help()
