"""Owned loopback HTTP/TLS observations and an explicitly separate pool model.
HTTP/TLS listeners bind 127.0.0.1 on ephemeral ports and are always closed.
TLS needs OpenSSL on PATH; no system trust or certificate store is changed.
"""
import argparse
from contextlib import contextmanager
import http.client
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import shutil
import socket
import ssl
import subprocess
import tempfile
import threading

@contextmanager
def serving(handler, tls=None):
    server=ThreadingHTTPServer(('127.0.0.1',0),handler)
    thread=None
    try:
        if tls: server.socket=tls.wrap_socket(server.socket,server_side=True)
        thread=threading.Thread(target=server.serve_forever,daemon=True);thread.start()
        yield server.server_address[1]
    finally:
        if thread: server.shutdown();thread.join(timeout=5)
        server.server_close()
        if thread and thread.is_alive(): raise RuntimeError('Listener thread did not stop')

class Quiet(BaseHTTPRequestHandler):
    def log_message(self,*args): pass
    def reply(self,status,body):
        body=body.encode();self.send_response(status);self.send_header('Content-Type','text/plain');self.send_header('Content-Length',str(len(body)));self.end_headers();self.wfile.write(body)

def get(port):
    connection=http.client.HTTPConnection('127.0.0.1',port,timeout=3)
    try:
        connection.request('GET','/receipt');response=connection.getresponse();return dict(status=response.status,body=response.read().decode())
    finally: connection.close()

def http_case():
    state={'healthy':True}
    class Backend(Quiet):
        def do_GET(self): self.reply(200 if state['healthy'] else 503,'receipt-17' if state['healthy'] else 'maintenance')
    with serving(Backend) as backend:
        class Proxy(Quiet):
            def do_GET(self):
                result=get(backend);self.reply(result['status'],result['body'])
        with serving(Proxy) as proxy:
            baseline=get(proxy);state['healthy']=False;fault=get(proxy);state['healthy']=True;recovery=get(proxy)
    return dict(baseline=baseline,fault=fault,recovery=recovery,listenersClosed=True,scope='Actual HTTP/1.x loopback forwarding; backend controlled 503, not TCP refusal, Nginx, DNS or external traffic.')

def tls_case():
    openssl=shutil.which('openssl')
    if not openssl: raise RuntimeError('OpenSSL required; do not substitute an unverified TLS result')
    with tempfile.TemporaryDirectory(prefix='tls-fieldbook-') as directory:
        root=Path(directory);key=root/'key.pem';cert=root/'cert.pem'
        subprocess.run([openssl,'req','-x509','-newkey','rsa:2048','-nodes','-keyout',str(key),'-out',str(cert),'-days','1','-subj','/CN=localhost','-addext','subjectAltName=DNS:localhost'],check=True,capture_output=True,timeout=30)
        key.chmod(0o600)
        server_context=ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER);server_context.load_cert_chain(str(cert),str(key))
        client_context=ssl.create_default_context(cafile=str(cert))
        class Handler(Quiet):
            def do_GET(self): self.reply(200,'trusted-local-receipt')
        def probe(port,hostname):
            with socket.create_connection(('127.0.0.1',port),timeout=3) as raw:
                with client_context.wrap_socket(raw,server_hostname=hostname) as tls:
                    tls.sendall(b'GET / HTTP/1.0\r\nHost: localhost\r\n\r\n')
                    data=b''
                    while True:
                        part=tls.recv(4096)
                        if not part: break
                        data+=part
                    return dict(statusLine=data.split(b'\r\n')[0].decode(),body=data.split(b'\r\n\r\n',1)[1].decode())
        with serving(Handler,server_context) as port:
            baseline=probe(port,'localhost');rejected=False;reason=''
            try: probe(port,'wrong.invalid')
            except ssl.SSLCertVerificationError as e: rejected=True;reason=e.verify_message
            recovery=probe(port,'localhost')
        result=dict(baseline=baseline,hostnameMismatchRejected=rejected,verificationReason=reason,recovery=recovery,listenersClosed=True,
                    scope='Actual TLS verification with an ephemeral explicitly trusted self-signed certificate; no ACME, renewal, expiry fault or Nginx execution.')
    result['cleanupVerified']=not Path(directory).exists();return result

def pool_envelope(workers,pool,db_limit,rate,hold):
    if any(type(v) is not int or v<=0 for v in [workers,pool,db_limit]) or rate<0 or hold<0:
        raise ValueError('Invalid nonnegative workload or positive integer capacity')
    import math
    if not math.isfinite(rate) or not math.isfinite(hold): raise ValueError('Finite workload required')
    configured=workers*pool
    return dict(configuredConnections=configured,withinDatabaseLimit=configured<=db_limit,meanInFlight=rate*hold)

def balance_case():
    return dict(baseline=pool_envelope(4,10,50,100,.2),fault=pool_envelope(4,20,50,100,.8),recovery=pool_envelope(4,10,50,100,.2),
                scope='Supplied pool envelope and steady-state mean concurrency only; no live balancing, queuing, database or latency measurement.')

if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--case',choices=['http','tls','pools'],required=True);a=p.parse_args()
    print(json.dumps({'http':http_case,'tls':tls_case,'pools':balance_case}[a.case](),indent=2))
