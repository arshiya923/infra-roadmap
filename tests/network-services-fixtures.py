"""Owned loopback HTTPS identity and UDP log-transport experiments, not service deployment."""
import json, socket, ssl, subprocess, tempfile, threading, hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
checks=[]
with tempfile.TemporaryDirectory(prefix='ns-evidence-') as folder:
    base=Path(folder);cert=base/'owned.pem';key=base/'owned.key'
    subprocess.run(['openssl','req','-x509','-newkey','rsa:2048','-nodes','-keyout',str(key),'-out',str(cert),'-days','1','-subj','/CN=localhost','-addext','subjectAltName=DNS:localhost'],check=True,capture_output=True)
    server=ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER);server.load_cert_chain(cert,key)
    trusted=ssl.create_default_context(cafile=str(cert));untrusted=ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT);untrusted.load_default_certs()
    listener=socket.socket();listener.bind(('127.0.0.1',0));listener.listen(8);listener.settimeout(4);port=listener.getsockname()[1]
    failures=[];served=[]
    def run():
        for _ in range(3):
            try:
                raw,_=listener.accept()
                with raw:
                    try:
                        with server.wrap_socket(raw,server_side=True) as stream:
                            req=stream.recv(4096);assert req.startswith(b'GET /owned HTTP/1.1\r\n')
                            body=b'owned-service-ok';stream.sendall(b'HTTP/1.1 200 OK\r\nContent-Length: 16\r\nConnection: close\r\n\r\n'+body);served.append(body)
                    except ssl.SSLError:
                        pass # expected failed client trust/hostname handshakes
            except Exception as e:failures.append(repr(e))
    thread=threading.Thread(target=run);thread.start()
    try:
        with socket.create_connection(('127.0.0.1',port),timeout=3) as raw:
            with trusted.wrap_socket(raw,server_hostname='localhost') as client:
                client.sendall(b'GET /owned HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n');reply=b''
                while block:=client.recv(4096):reply+=block
                assert reply.split(b'\r\n\r\n',1)[1]==b'owned-service-ok'
        checks.append('HTTPS local fixture: trusted owned certificate, correct hostname and expected HTTP body')
        for context,hostname,label in [(trusted,'wrong.example.test','wrong hostname'),(untrusted,'localhost','untrusted root')]:
            try:
                with socket.create_connection(('127.0.0.1',port),timeout=3) as raw:
                    with context.wrap_socket(raw,server_hostname=hostname):pass
                raise AssertionError(label+' unexpectedly accepted')
            except ssl.SSLCertVerificationError:checks.append('HTTPS validation rejects '+label+' with verification enabled')
    finally:
        thread.join(8);listener.close()
    assert not thread.is_alive() and not failures and len(served)==1,(failures,served)
    with socket.socket() as probe:assert probe.connect_ex(('127.0.0.1',port))!=0
    checks.append('HTTPS owned listener closed; temporary certificate/key removed without changing host trust')
    collector=socket.socket(socket.AF_INET,socket.SOCK_DGRAM);collector.bind(('127.0.0.1',0));collector.settimeout(1);udpport=collector.getsockname()[1]
    marker=b'<164>1 2026-10-09T00:00:00Z fixture ns-lab - owned001 - NSLAB-owned-marker'
    try:
        with socket.socket(socket.AF_INET,socket.SOCK_DGRAM) as sender:sender.sendto(marker,('127.0.0.1',udpport))
        received,peer=collector.recvfrom(4096);assert received==marker and peer[0]=='127.0.0.1'
        pri=int(received.split(b'>',1)[0][1:]);assert pri//8==20 and pri%8==4
        (base/'owned-log.txt').write_bytes(received+b'\n');assert b'NSLAB-owned-marker' in (base/'owned-log.txt').read_bytes()
        checks.append('Actual loopback UDP marker receipt and owned file retention; PRI164 decodes facility20/severity4')
        try:collector.recvfrom(4096);raise AssertionError('unexpected second marker')
        except socket.timeout:checks.append('No-data interval is timeout, not an observed numeric zero or delivery success')
    finally:collector.close()
    # Exclusive rebinding establishes that our UDP socket was released.
    with socket.socket(socket.AF_INET,socket.SOCK_DGRAM) as released:released.bind(('127.0.0.1',udpport))
    checks.append('Owned UDP collector and temporary retention file cleaned')
assert not Path(folder).exists()
result=dict(date='2026-10-09',result='PASS',checks=checks,scope='Actual loopback TLS hostname/trust/HTTP-body and scripted UDP marker transport/retention. Self-signed owned fixture is not public PKI, full Syslog daemon, SNMP, NTP, AAA, production or physical-network validation.')
(ROOT/'docs/network-services-fixture-results.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8');print(json.dumps(result))
