"""Owned loopback HTTP application boundary; not a firewall, VPN or production auth system.

Default invocation prints help. --run uses disposable in-memory credentials,
an OS-assigned 127.0.0.1 port and bounded harmless requests, then closes it.
No host firewall, route, service, account or persistent credential is changed.
"""
from http.server import BaseHTTPRequestHandler,HTTPServer
from urllib import request,error
from pathlib import Path
import argparse,hashlib,hmac,json,secrets,socket,threading

class FixtureInterrupted(RuntimeError):
    def __init__(self,report):super().__init__('Injected owned fixture interruption');self.report=report

def run_fixture(fail_at=None):
    token=secrets.token_hex(32);recovery=secrets.token_hex(32)
    state={'application':True,'requests':0};events=[];checks=[]
    class Handler(BaseHTTPRequestHandler):
        def setup(self):super().setup();self.connection.settimeout(2)
        def log_message(self,*args):pass
        def do_GET(self):
            state['requests']+=1
            credential=self.headers.get('Authorization','')
            if state['requests']>64:status,body=429,b'request limit'
            elif len(self.path)>128 or self.path not in ('/servers','/management','/console'):status,body=404,b'unknown resource'
            elif len(credential)>80:status,body=401,b'identity denied'
            elif self.path=='/console':
                status,body=(200,b'independent recovery observation') if hmac.compare_digest(credential,'Bearer '+recovery) else (403,b'recovery permission denied')
            elif not hmac.compare_digest(credential,'Bearer '+token):status,body=401,b'identity denied'
            elif self.path=='/management':status,body=403,b'operation denied'
            elif not state['application']:status,body=403,b'application policy denied'
            else:status,body=200,b'approved training resource'
            events.append({'path':self.path[:128],'status':status}) # Never retain Authorization.
            self.send_response(status);self.send_header('Content-Type','text/plain; charset=utf-8');self.send_header('Content-Length',str(len(body)));self.send_header('Cache-Control','no-store');self.send_header('X-Content-Type-Options','nosniff');self.send_header('X-Frame-Options','DENY');self.send_header('Content-Security-Policy',"default-src 'none'; frame-ancestors 'none'");self.end_headers();self.wfile.write(body)
    server=HTTPServer(('127.0.0.1',0),Handler);port=server.server_address[1]
    thread=threading.Thread(target=server.serve_forever,kwargs={'poll_interval':.05},daemon=True);thread.start();interrupted=False
    report={'scope':'Actual owned plain-HTTP loopback application identity/operation checks. Disposable tokens in memory only; no TLS, network-zone firewall, AAA, WAF, VPN or physical/device deployment.','checks':checks}
    def probe(label,path,credential,expected,content=None):
        req=request.Request(f'http://127.0.0.1:{port}'+path,headers={'Authorization':'Bearer '+credential} if credential is not None else {})
        try:
            with request.urlopen(req,timeout=3) as response:status=response.status;body=response.read(256);headers=dict(response.headers)
        except error.HTTPError as response:status=response.code;body=response.read(256);headers=dict(response.headers)
        assert status==expected,(label,status,expected)
        if content is not None:assert body==content,(label,body)
        assert headers['Cache-Control']=='no-store' and headers['X-Content-Type-Options']=='nosniff'
        checks.append(dict(label=label,path=path,status=status,result='PASS',bodySha256=hashlib.sha256(body).hexdigest()))
    def boundary(name):
        if fail_at==name:raise FixtureInterrupted(report)
    try:
        probe('baseline required application','/servers',token,200,b'approved training resource')
        probe('baseline prohibited management','/management',token,403)
        probe('independent console baseline','/console',recovery,200)
        probe('missing identity','/servers',None,401)
        probe('wrong identity','/servers','owned-invalid-token',401)
        probe('unknown/encoded resource','/%2e%2e/management',token,404)
        probe('query not accepted as another resource','/servers?role=admin',token,404)
        boundary('baseline')
        state['application']=False
        probe('single owned application fault','/servers',token,403)
        probe('management remains denied during fault','/management',token,403)
        probe('independent console survives fault','/console',recovery,200)
        boundary('fault')
        state['application']=True
        probe('exact restore original application','/servers',token,200,b'approved training resource')
        probe('exact restore prohibited management','/management',token,403)
        probe('user cannot use recovery path','/console',token,403)
        boundary('restored')
    except FixtureInterrupted:
        interrupted=True
    finally:
        state['application']=True;server.shutdown();server.server_close();thread.join(timeout=3)
        assert not thread.is_alive()
        with socket.socket() as probe_socket:
            probe_socket.settimeout(1);assert probe_socket.connect_ex(('127.0.0.1',port))!=0
        report.update(cleanup=dict(threadStopped=True,ownedListenerClosed=True,baselineRestoredInMemory=True,noPersistentCredentials=True),events=events,result='PASS',failureInjected=fail_at if interrupted else None)
    if interrupted:raise FixtureInterrupted(report)
    return report

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--run',action='store_true',help='Execute owned ephemeral loopback fixture and verify cleanup.')
    args=parser.parse_args()
    if args.run:print(json.dumps(run_fixture(),indent=2))
    else:parser.print_help()
