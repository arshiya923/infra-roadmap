#!/usr/bin/env python3
"""Generate an entirely synthetic Ethernet PCAP. Opens no sockets; captures no traffic."""
import argparse
import hashlib
import json
import pathlib
import socket
import struct


def checksum(data):
    if len(data) % 2:
        data += b'\0'
    total = sum(struct.unpack('!' + 'H' * (len(data) // 2), data))
    while total >> 16:
        total = (total & 65535) + (total >> 16)
    return (~total) & 65535


CLIENT = socket.inet_aton('192.0.2.10')
SERVER = socket.inet_aton('192.0.2.20')
CMAC = bytes.fromhex('02000000000a')
SMAC = bytes.fromhex('020000000014')


def ethernet(body, kind=0x0800, reverse=False):
    return (CMAC + SMAC if reverse else SMAC + CMAC) + struct.pack('!H', kind) + body


def ipv4(payload, protocol, ident, reverse=False):
    src, dst = (SERVER, CLIENT) if reverse else (CLIENT, SERVER)
    header = struct.pack('!BBHHHBBH4s4s', 0x45, 0, 20 + len(payload), ident, 0x4000, 64, protocol, 0, src, dst)
    header = header[:10] + struct.pack('!H', checksum(header)) + header[12:]
    return ethernet(header + payload, reverse=reverse)


def transport(payload, protocol, reverse=False):
    src, dst = (SERVER, CLIENT) if reverse else (CLIENT, SERVER)
    pseudo = src + dst + struct.pack('!BBH', 0, protocol, len(payload))
    offset = 16 if protocol == 6 else 6
    value = checksum(pseudo + payload)
    if protocol == 17 and value == 0:
        value = 65535
    return payload[:offset] + struct.pack('!H', value) + payload[offset + 2:]


def fixture():
    frames = []
    arp = struct.pack('!HHBBH', 1, 0x0800, 6, 4, 1) + CMAC + CLIENT + b'\0' * 6 + SERVER
    frames.append(b'\xff' * 6 + CMAC + b'\x08\x06' + arp)
    arp_reply = struct.pack('!HHBBH', 1, 0x0800, 6, 4, 2) + SMAC + SERVER + CMAC + CLIENT
    frames.append(ethernet(arp_reply, 0x0806, True))
    for reverse in (False, True):
        icmp = struct.pack('!BBHHH', 0 if reverse else 8, 0, 0, 123, 1) + b'FIELDBOOK'
        icmp = icmp[:2] + struct.pack('!H', checksum(icmp)) + icmp[4:]
        frames.append(ipv4(icmp, 1, len(frames), reverse))
    for reverse, seq, ack, flags in [(False, 100, 0, 2), (True, 200, 101, 18), (False, 101, 201, 16)]:
        src, dst = (443, 50000) if reverse else (50000, 443)
        tcp = struct.pack('!HHIIBBHHH', src, dst, seq, ack, 0x50, flags, 4096, 0, 0)
        frames.append(ipv4(transport(tcp, 6, reverse), 6, len(frames), reverse))
    qname = b'\x07example\x03lab\x04test\0'
    question = qname + struct.pack('!HH', 1, 1)
    for reverse in (False, True):
        dns = struct.pack('!6H', 0xbeef, 0x8180 if reverse else 0x0100, 1, int(reverse), 0, 0) + question
        if reverse:
            dns += b'\xc0\x0c' + struct.pack('!HHIH', 1, 1, 60, 4) + SERVER
        src, dst = (53, 53000) if reverse else (53000, 53)
        udp = struct.pack('!HHHH', src, dst, 8 + len(dns), 0) + dns
        frames.append(ipv4(transport(udp, 17, reverse), 17, len(frames), reverse))
    payload = b'SYNTHETIC-APPLICATION-DATA-' * 4
    tcp = struct.pack('!HHIIBBHHH', 50000, 443, 101, 201, 0x50, 24, 4096, 0, 0) + payload
    frames.append(ipv4(transport(tcp, 6), 6, len(frames)))
    result = struct.pack('<IHHIIII', 0xa1b2c3d4, 2, 4, 0, 0, 65535, 1)
    for index, frame in enumerate(frames):
        captured = frame[:54] if index == 9 else frame
        result += struct.pack('<IIII', 1720000000, index * 1000, len(captured), len(frame)) + captured
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write', action='store_true', help='Write packet-fixture.pcap beside this script; refuse unrelated existing content')
    args = parser.parse_args()
    if not args.write:
        parser.print_help()
    else:
        target = pathlib.Path(__file__).with_suffix('.pcap')
        data = fixture()
        if target.exists() and target.read_bytes() != data:
            raise SystemExit('Refusing to overwrite an existing different file: ' + str(target))
        if not target.exists():
            with target.open('xb') as output:
                output.write(data)
        print(json.dumps({'result': 'PASS', 'file': target.name, 'packets': 10, 'sha256': hashlib.sha256(data).hexdigest(), 'scope': 'Synthetic bytes only; fixed timestamps are not real timing measurements; final packet is intentionally truncated'}, indent=2))
