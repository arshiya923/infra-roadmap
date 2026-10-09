#!/usr/bin/env python3
"""Inspect owned loopback sockets using Windows netstat or Linux ss; no external traffic."""
import argparse
import json
import os
import shutil
import socket
import subprocess


def inspect(protocol, port, listening=False):
    endpoint = '127.0.0.1:' + str(port)
    if os.name == 'nt':
        args = ['netstat.exe', '-ano', '-p', protocol]
    else:
        args = ['ss', '-H', '-ltn' if protocol == 'tcp' and listening else '-tn' if protocol == 'tcp' else '-lun', 'sport = :' + str(port)]
    result = subprocess.run(args, capture_output=True, text=True, timeout=5, check=True)
    selected = []
    for line in result.stdout.splitlines():
        fields = line.split()
        if os.name == 'nt':
            if len(fields) < 4 or fields[0].lower() != protocol or fields[1] != endpoint:
                continue
            if fields[-1] != str(os.getpid()):
                continue
            state = fields[3] if protocol == 'tcp' else 'BOUND'
            if listening and state != 'LISTENING':
                continue
        else:
            if len(fields) < 5 or fields[3] != endpoint:
                continue
            state = fields[0]
        selected.append(state)
    return selected


def run():
    provider = 'netstat.exe' if os.name == 'nt' else 'ss'
    if not shutil.which(provider):
        raise RuntimeError(provider + ' is required; the lab installs nothing')
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as listener, socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as udp:
        listener.settimeout(2)
        listener.bind(('127.0.0.1', 0))
        listener.listen(1)
        tcp_port = listener.getsockname()[1]
        udp.bind(('127.0.0.1', 0))
        udp_port = udp.getsockname()[1]
        listening = inspect('tcp', tcp_port, listening=True)
        expected_listen = 'LISTENING' if os.name == 'nt' else 'LISTEN'
        if expected_listen not in listening:
            raise RuntimeError('Owned TCP listener was not observed')
        udp_states = inspect('udp', udp_port)
        if ('BOUND' if os.name == 'nt' else 'UNCONN') not in udp_states:
            raise RuntimeError('Owned UDP binding was not observed')
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
            client.settimeout(2)
            client.connect(('127.0.0.1', tcp_port))
            accepted, _ = listener.accept()
            with accepted:
                accepted.settimeout(2)
                established = inspect('tcp', tcp_port)
                expected_established = 'ESTABLISHED' if os.name == 'nt' else 'ESTAB'
                if expected_established not in established:
                    raise RuntimeError('Owned accepted connection was not observed')
                client.sendall(b'PING')
                request = b''
                while len(request) < 4:
                    chunk = accepted.recv(4 - len(request))
                    if not chunk:
                        raise RuntimeError('Unexpected EOF')
                    request += chunk
                if request != b'PING':
                    raise RuntimeError('Unexpected application request')
                accepted.sendall(b'OK')
                response = b''
                while len(response) < 2:
                    chunk = client.recv(2 - len(response))
                    if not chunk:
                        raise RuntimeError('Unexpected response EOF')
                    response += chunk
                if response != b'OK':
                    raise RuntimeError('Unexpected application response')
    if inspect('tcp', tcp_port, listening=True):
        raise RuntimeError('Owned listener still reported after closure')
    return {'result': 'PASS', 'provider': provider, 'scope': 'IPv4 loopback only, ephemeral owned ports; no raw host socket inventory retained', 'checks': ['TCP listener observed', 'UDP bound socket observed without a handshake claim', 'Accepted TCP connection observed independently from listener', 'PING/OK application exchange verified separately', 'Listener absent after socket cleanup'], 'limitations': 'No external reachability, IPv6, TLS, production application, backlog load or firewall change tested'}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--run', action='store_true')
    args = parser.parse_args()
    if args.run:
        print(json.dumps(run(), indent=2))
    else:
        parser.print_help()
