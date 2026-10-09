#!/usr/bin/env python3
"""Capture five protocols on an isolated virtual network. Linux/root only; no host uplink."""
import argparse
import json
import os
import pathlib
import shutil
import signal
import subprocess
import sys
import tempfile
import time


def command(*args, check=True, timeout=12):
    return subprocess.run(args, capture_output=True, text=True, check=check, timeout=timeout)


def run(output, fail_after=None):
    if os.geteuid() != 0:
        raise RuntimeError('Root namespace capability required')
    for tool in ('ip', 'dnsmasq', 'busybox', 'tcpdump', 'tshark', 'dig', 'ping', 'sysctl', 'ss'):
        if not shutil.which(tool):
            raise RuntimeError('Missing prerequisite: ' + tool)
    output = pathlib.Path(output).resolve()
    output.mkdir(exist_ok=False)  # Never replace another run's evidence.
    names = [f'fb06-{os.getpid()}-{part}' for part in ('client', 'gateway', 'server')]
    client, gateway, server = names
    created, processes, logs = [], [], []
    deadline = time.monotonic() + 90
    existing = {line.split()[0] for line in command('ip', 'netns', 'list').stdout.splitlines()}
    if existing.intersection(names):
        raise RuntimeError('Refusing existing namespace name')

    def ns(name, *args, **kw):
        if time.monotonic() >= deadline:
            raise RuntimeError('Overall lab deadline exceeded')
        kw['timeout'] = min(kw.get('timeout', 12), max(.1, deadline - time.monotonic()))
        return command('ip', 'netns', 'exec', name, *args, **kw)

    def start(name, label, *args):
        log = open(output / (label + '.log'), 'w', encoding='utf-8')
        logs.append(log)
        process = subprocess.Popen(['ip', 'netns', 'exec', name, *args], stdout=log, stderr=log)
        processes.append(process)
        return process

    def ready(process, predicate):
        end = time.monotonic() + 5
        while time.monotonic() < end:
            if process.poll() is not None:
                raise RuntimeError('Lab process exited before readiness; inspect logs')
            if predicate():
                return
            time.sleep(.05)
        raise RuntimeError('Lab readiness deadline exceeded')

    def stop(process):
        if process.poll() is None:
            process.send_signal(signal.SIGINT if 'tcpdump' in process.args else signal.SIGTERM)
            try:
                process.wait(timeout=3)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait(timeout=3)
        else:
            process.wait(timeout=3)

    def capture_on(name, label):
        process = start(name, label, 'tcpdump', '--immediate-mode', '-i', 'eth0', '-nn', '-s', '0', '-U', '-Z', 'root', '-c', '200', '-w', str(output / (label + '.pcap')), 'arp or icmp or udp port 67 or udp port 68 or udp port 53 or tcp port 8080')
        ready(process, lambda: 'listening on eth0' in (output / (label + '.log')).read_text(encoding='utf-8'))
        return process

    def ping():
        return ns(client, 'ping', '-4', '-n', '-c', '1', '-W', '1', '-w', '2', '198.51.100.20', check=False).returncode

    transaction = "import socket; s=socket.create_connection(('198.51.100.20',8080),2); s.sendall(b'FIELD\\n'); s.settimeout(2); data=s.makefile('rb').readline(32); assert data==b'OK\\n',data; s.close()"
    result = {'scope': 'Real packets on isolated Linux veth links; no physical wire or external service test', 'checks': []}
    try:
        for name in names:
            command('ip', 'netns', 'add', name)
            created.append(name)
            command('ip', '-n', name, 'link', 'set', 'lo', 'up')
        if fail_after == 'namespaces':
            raise RuntimeError('Injected failure after namespaces')
        for host, port, address in ((client, 'left', '192.0.2.1/24'), (server, 'right', '198.51.100.1/24')):
            command('ip', '-n', gateway, 'link', 'add', port, 'type', 'veth', 'peer', 'name', 'peer0')
            command('ip', '-n', gateway, 'link', 'set', 'peer0', 'netns', host)
            command('ip', '-n', host, 'link', 'set', 'peer0', 'name', 'eth0')
            command('ip', '-n', host, 'link', 'set', 'eth0', 'up')
            command('ip', '-n', gateway, 'address', 'add', address, 'dev', port)
            command('ip', '-n', gateway, 'link', 'set', port, 'up')
        command('ip', '-n', client, 'link', 'set', 'eth0', 'address', '02:00:00:00:06:10')
        command('ip', '-n', server, 'address', 'add', '198.51.100.20/24', 'dev', 'eth0')
        command('ip', '-n', server, 'route', 'add', '192.0.2.0/24', 'via', '198.51.100.1')
        ns(gateway, 'sysctl', '-qw', 'net.ipv4.ip_forward=1')
        with tempfile.TemporaryDirectory(prefix='fieldbook06-') as temporary:
            temp = pathlib.Path(temporary)
            # A dedicated hook changes only this client's interface/routes. Never edit resolv.conf.
            hook = temp / 'lease.sh'
            hook.write_text('#!/bin/sh\nset -eu\ncase "$1" in\nbound|renew)\n [ "$interface" = eth0 ]\n [ "$ip" = 192.0.2.10 ]\n [ "$subnet" = 255.255.255.0 ]\n [ "$router" = 192.0.2.1 ]\n [ "$dns" = 192.0.2.1 ]\n ip address replace 192.0.2.10/24 dev eth0\n ip route replace default via 192.0.2.1\n ;;\nesac\n', encoding='utf-8')
            hook.chmod(0o700)
            dns = start(gateway, 'dnsmasq', 'dnsmasq', '--no-daemon', '--conf-file=/dev/null', '--no-hosts', '--no-resolv', '--bind-interfaces', '--interface=left', '--except-interface=lo', '--dhcp-range=192.0.2.10,192.0.2.10,255.255.255.0,5m', '--dhcp-option=3,192.0.2.1', '--dhcp-option=6,192.0.2.1', '--host-record=app.lab.test,198.51.100.20', '--local=/lab.test/', '--dhcp-leasefile=' + str(temp / 'leases'), '--log-facility=-')
            ready(dns, lambda: 'started, version' in (output / 'dnsmasq.log').read_text(encoding='utf-8'))
            app_code = "import socket,pathlib; s=socket.socket(); s.bind(('198.51.100.20',8080)); s.listen(4); pathlib.Path(" + repr(str(temp / 'ready')) + ").touch();\nwhile True:\n c,a=s.accept(); c.settimeout(2)\n try:\n  data=c.makefile('rb').readline(32)\n  if data==b'FIELD\\n': c.sendall(b'OK\\n')\n finally: c.close()\n"
            app = start(server, 'application', sys.executable, '-u', '-c', app_code)
            ready(app, lambda: (temp / 'ready').exists())
            capture = capture_on(client, 'traffic')
            # Every subprocess below has a timeout, bounding the capture lifetime as well.
            if fail_after == 'services':
                raise RuntimeError('Injected failure after services')
            lease = ns(client, 'busybox', 'udhcpc', '-i', 'eth0', '-B', '-f', '-n', '-q', '-t', '3', '-T', '3', '-s', str(hook), check=False)
            (output / 'lease.log').write_text(lease.stdout + lease.stderr, encoding='utf-8')
            assert lease.returncode == 0, lease.stdout + lease.stderr
            addresses = json.loads(command('ip', '-n', client, '-j', 'address', 'show', 'dev', 'eth0').stdout)
            assert any(a.get('local') == '192.0.2.10' for a in addresses[0]['addr_info'])
            assert 'via 192.0.2.1' in ns(client, 'ip', 'route', 'get', '198.51.100.20').stdout
            ns(client, 'ping', '-4', '-n', '-c', '1', '-W', '1', '-w', '2', '192.0.2.1')
            answer = ns(client, 'dig', '@192.0.2.1', 'app.lab.test', 'A', '+short', '+tries=1', '+time=1').stdout.strip()
            assert answer == '198.51.100.20', answer
            assert ping() == 0
            ns(client, sys.executable, '-c', transaction)
            assert '8080' in ns(server, 'ss', '-ltn').stdout
            assert '192.0.2.1' in ns(client, 'ip', 'neighbour', 'show', 'dev', 'eth0').stdout
            result['checks'].append('DHCP address, DNS answer, ICMP and application baseline')
            fault_capture = capture_on(server, 'fault-server')
            command('ip', '-n', server, 'route', 'del', '192.0.2.0/24', 'via', '198.51.100.1')
            assert ns(server, 'ip', 'route', 'get', '192.0.2.10', check=False).returncode != 0
            assert ping() != 0
            assert ns(client, sys.executable, '-c', transaction, check=False).returncode != 0
            ns(client, 'ping', '-4', '-n', '-c', '1', '-W', '1', '-w', '2', '192.0.2.1')
            assert ns(client, 'dig', '@192.0.2.1', 'app.lab.test', 'A', '+short', '+tries=1', '+time=1').stdout.strip() == answer
            result['checks'].append('Missing server return route breaks ICMP/application while local DNS works')
            def fault_saved():
                read = command('tshark', '-n', '-r', str(output / 'fault-server.pcap'), '-Y', 'tcp.flags.syn == 1 && tcp.flags.ack == 0', '-T', 'fields', '-e', 'frame.number', check=False)
                return read.returncode == 0 and bool(read.stdout.strip())
            ready(fault_capture, fault_saved)
            stop(fault_capture)
            result['checks'].append('Server-side fault capture proves SYN arrival despite missing return route')
            command('ip', '-n', server, 'route', 'add', '192.0.2.0/24', 'via', '198.51.100.1')
            assert ping() == 0
            ns(client, sys.executable, '-c', transaction)
            result['checks'].append('Restored return route recovers ICMP and application')
            # Wait for baseline AND recovery replies to be written, not a guessed sleep.
            def recovery_saved():
                read = command('tshark', '-n', '-r', str(output / 'traffic.pcap'), '-Y', 'tcp.payload == 4f:4b:0a', '-T', 'fields', '-e', 'frame.number', check=False)
                return read.returncode == 0 and len(read.stdout.splitlines()) >= 2
            ready(capture, recovery_saved)
            stop(capture)
            for label, expression in {'ARP': 'arp', 'DHCP': 'dhcp', 'DNS': 'dns', 'TCP SYN': 'tcp.flags.syn == 1', 'ICMP': 'icmp'}.items():
                rows = command('tshark', '-n', '-r', str(output / 'traffic.pcap'), '-Y', expression, '-T', 'fields', '-e', 'frame.number').stdout.splitlines()
                assert rows, 'Missing captured protocol: ' + label
                result.setdefault('captured_frames', {})[label] = len(rows)
    finally:
        cleanup_errors = []
        for process in reversed(processes):
            try:
                stop(process)
            except Exception as error:
                cleanup_errors.append(str(error))
        for log in logs:
            log.close()
        for name in reversed(created):
            deletion = command('ip', 'netns', 'delete', name, check=False)
            if deletion.returncode:
                cleanup_errors.append(deletion.stderr)
        if cleanup_errors:
            raise RuntimeError('Cleanup failed: ' + '; '.join(cleanup_errors))
    result['checks'].append('Owned processes reaped and namespaces removed')
    (output / 'result.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--run', action='store_true')
    parser.add_argument('--output', help='New output directory; existing directories are refused')
    args = parser.parse_args()
    if not args.run:
        parser.print_help()
    else:
        # Convert termination into an exception so the cleanup finally block runs.
        for sig in (signal.SIGTERM, signal.SIGINT):
            signal.signal(sig, lambda signum, frame: sys.exit(128 + signum))
        if args.output:
            print(json.dumps(run(args.output), indent=2))
        else:
            with tempfile.TemporaryDirectory(prefix='fieldbook06-run-') as temporary:
                print(json.dumps(run(pathlib.Path(temporary) / 'evidence'), indent=2))
