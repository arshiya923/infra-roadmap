#!/usr/bin/env python3
"""Run under root in WSL; verify protocol evidence and cleanup on three paths."""
import importlib.util
import json
import pathlib
import subprocess
import tempfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('lab', ROOT / 'labs/network-fundamentals.py')
lab = importlib.util.module_from_spec(spec)
spec.loader.exec_module(lab)


def snapshot():
    c = lab.command
    return {
        'links': [(x['ifindex'], x['ifname']) for x in json.loads(c('ip', '-j', 'link').stdout)],
        'routes4': json.loads(c('ip', '-j', '-4', 'route', 'show', 'table', 'all').stdout),
        'routes6': json.loads(c('ip', '-j', '-6', 'route', 'show', 'table', 'all').stdout),
        'forwarding': c('sysctl', '-n', 'net.ipv4.ip_forward', 'net.ipv6.conf.all.forwarding').stdout,
        'names': c('ip', 'netns', 'list').stdout,
        'resolver': pathlib.Path('/etc/resolv.conf').read_bytes(),
        'processes': c('pgrep', '-a', '-f', 'dnsmasq|tcpdump|198.51.100.20', check=False).stdout,
    }


before = snapshot()
help_result = lab.command('python3', str(ROOT / 'labs/network-fundamentals.py'))
assert 'usage:' in help_result.stdout.lower()
assert snapshot() == before, 'Help invocation changed host state'
with tempfile.TemporaryDirectory(prefix='fieldbook-test-') as directory:
    base = pathlib.Path(directory)
    result = json.loads(lab.command('sudo', 'python3', str(ROOT / 'labs/network-fundamentals.py'), '--run', '--output', str(base / 'normal'), timeout=90).stdout)
    assert snapshot() == before, 'Normal run changed host state or leaked process'
    capture = base / 'normal/traffic.pcap'
    def fields(expression, *columns):
        args = ['tshark', '-n', '-r', str(capture), '-Y', expression, '-T', 'fields']
        for column in columns:
            args.extend(['-e', column])
        return lab.command(*args).stdout.strip().splitlines()
    assert {'1', '2', '3', '5'} <= set(fields('dhcp', 'dhcp.option.dhcp')), 'DORA exchange missing'
    dora = [row.split('\t') for row in fields('dhcp', 'dhcp.option.dhcp', 'dhcp.id', 'dhcp.hw.mac_addr')]
    assert len({row[1] for row in dora}) == 1, 'DHCP exchange is not one transaction'
    assert all(value.replace(':', '').lower() == '020000000610' for row in dora for value in row[2].split(',')), dora
    for message in (2, 5):
        options = fields('dhcp.option.dhcp == ' + str(message), 'dhcp.ip.your', 'dhcp.option.router', 'dhcp.option.domain_name_server')
    assert set(options) == {'192.0.2.10\t192.0.2.1\t192.0.2.1'}, options
    displayed = lab.command('tshark', '-n', '-r', str(capture), '-Y', 'dhcp', '-T', 'fields', '-e', 'dhcp.option.dhcp', '-e', 'dhcp.id', '-e', 'dhcp.ip.your').stdout
    assert displayed.strip(), 'Lesson DHCP fields command produced no records'
    assert '198.51.100.20' in fields('dns.flags.response == 1', 'dns.a')
    assert len(fields('dns.flags.response == 1', 'frame.number')) >= 2
    assert len(fields('tcp.payload == 4f:4b:0a', 'frame.number')) >= 2, 'Baseline/recovery replies not saved'
    assert fields('tcp.flags.syn == 1 && tcp.flags.ack == 0', 'frame.number')
    assert fields('tcp.flags.syn == 1 && tcp.flags.ack == 1', 'frame.number')
    assert fields('tcp.flags.ack == 1 && tcp.flags.syn == 0', 'frame.number')
    syn_streams = set(fields('tcp.flags.syn == 1 && tcp.flags.ack == 0', 'tcp.stream'))
    synack_streams = set(fields('tcp.flags.syn == 1 && tcp.flags.ack == 1', 'tcp.stream'))
    ack_streams = set(fields('tcp.flags.ack == 1 && tcp.flags.syn == 0', 'tcp.stream'))
    assert syn_streams & synack_streams & ack_streams, 'No single conversation contains the handshake'
    assert fields('icmp.type == 8', 'frame.number') and fields('icmp.type == 0', 'frame.number')
    assert fields('arp.dst.proto_ipv4 == 192.0.2.1', 'frame.number'), 'Gateway ARP absent'
    assert lab.command('tshark', '-n', '-r', str(capture), '-Y', 'frame.cap_len < frame.len', '-T', 'fields', '-e', 'frame.number').stdout.strip() == ''
    fault = base / 'normal/fault-server.pcap'
    arrived = lab.command('tshark', '-n', '-r', str(fault), '-Y', 'ip.src == 192.0.2.10 && ip.dst == 198.51.100.20 && tcp.dstport == 8080 && tcp.flags.syn == 1 && tcp.flags.ack == 0', '-T', 'fields', '-e', 'frame.number').stdout.strip()
    assert arrived, 'Client SYN arrival at server is not captured'
    assert not lab.command('tshark', '-n', '-r', str(fault), '-Y', 'tcp.flags.syn == 1 && tcp.flags.ack == 1', '-T', 'fields', '-e', 'frame.number').stdout.strip(), 'Unexpected SYNACK during missing-route fault'
    again = json.loads(lab.command('sudo', 'python3', str(ROOT / 'labs/network-fundamentals.py'), '--run', timeout=90).stdout)
    assert snapshot() == before, 'Repeated normal run leaked resources'
    for point in ('namespaces', 'services'):
        try:
            lab.run(base / point, fail_after=point)
            raise AssertionError('Failure injection did not fire')
        except RuntimeError as error:
            assert 'Injected failure' in str(error)
        assert snapshot() == before, 'Failure cleanup changed host state: ' + point
result['verification'] = ['Inert help', 'DHCP DORA shares transaction ID and fixed client MAC', 'Offer/ACK address, gateway and DNS options', 'DNS answer', 'TCP handshake flags in one stream', 'ICMP request/reply', 'Gateway ARP', 'No truncated records', 'Fault SYN arrival at server with no SYNACK', 'Two normal runs and two failure cleanup paths', 'Host links/routes/forwarding/resolver and service process inventory unchanged']
result['versions'] = {tool: lab.command(tool, '--version', check=False).stdout.splitlines()[0] for tool in ('dnsmasq', 'tshark')}
result['date'] = '2026-10-08'
result['result'] = 'PASS'
result['lessonCommands'] = {'result': 'PASS', 'count': 4, 'details': 'Inert help, sudo --run default temporary output, sudo --run --output retained output, and TShark DHCP fields. Retained path replaced by a test-owned fresh temporary directory.'}
(ROOT / 'docs/network-fundamentals-results.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
print(json.dumps(result, indent=2))
