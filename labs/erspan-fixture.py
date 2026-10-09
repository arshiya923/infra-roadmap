#!/usr/bin/env python3
"""Generate four synthetic ERSPAN Type-II Ethernet records; opens no sockets."""
import argparse
import hashlib
import pathlib
import socket
import struct


def checksum(data):
    data += b'\0' if len(data) % 2 else b''
    total = sum(struct.unpack('!' + 'H' * (len(data) // 2), data))
    while total >> 16:
        total = (total & 65535) + (total >> 16)
    return (~total) & 65535


def ipv4(payload, protocol, source, destination, ident, ttl):
    addresses = socket.inet_aton(source) + socket.inet_aton(destination)
    header = struct.pack('!BBHHHBBH', 0x45, 0, 20 + len(payload), ident, 0x4000, ttl, protocol, 0) + addresses
    return header[:10] + struct.pack('!H', checksum(header)) + header[12:] + payload


def inner_frame():
    payload = (b'SYNTHETIC-ERSPAN-ONLY|' * 70)[:1458]
    assert len(payload) == 1458
    udp = struct.pack('!4H', 50000, 5555, 8 + len(payload), 0) + payload
    addresses = socket.inet_aton('198.51.100.10') + socket.inet_aton('198.51.100.20')
    pseudo = addresses + struct.pack('!BBH', 0, 17, len(udp))
    value = checksum(pseudo + udp) or 65535
    udp = udp[:6] + struct.pack('!H', value) + udp[8:]
    ethernet = bytes.fromhex('02000000001402000000000a0800')
    return ethernet + ipv4(udp, 17, '198.51.100.10', '198.51.100.20', 10, 64)


def fixture():
    inner = inner_frame()
    assert len(inner) == 1500
    data = struct.pack('<IHHIIII', 0xa1b2c3d4, 2, 4, 0, 0, 65535, 1)
    for index, (flow, destination, prefix) in enumerate([(100, '192.0.2.20', None), (101, '192.0.2.20', None), (100, '192.0.2.30', None), (100, '192.0.2.20', 60)]):
        retained = inner if prefix is None else inner[:prefix]
        gre = struct.pack('!HHI', 0x1000, 0x88be, index + 1)
        # Type-II version 1, VLAN 10 metadata, no tag in inner frame, T flag and flow ID.
        erspan = struct.pack('!HHI', 0x100a, (0x400 if prefix else 0) | flow, 1)
        ethernet = bytes.fromhex('0200000000200200000000100800')
        packet = ethernet + ipv4(gre + erspan + retained, 47, '192.0.2.10', destination, index + 1, 32)
        data += struct.pack('<4I', 1720000000, index * 1000, len(packet), len(packet)) + packet
    return data


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write', action='store_true', help='Write erspan-fixture.pcap beside the script; refuse different existing bytes')
    args = parser.parse_args()
    if not args.write:
        parser.print_help()
    else:
        target = pathlib.Path(__file__).with_suffix('.pcap')
        data = fixture()
        if target.exists() and target.read_bytes() != data:
            raise SystemExit('Refusing to replace different existing bytes: ' + str(target))
        if not target.exists():
            with target.open('xb') as output:
                output.write(data)
        print('Synthetic records: 4; SHA256: ' + hashlib.sha256(data).hexdigest())
