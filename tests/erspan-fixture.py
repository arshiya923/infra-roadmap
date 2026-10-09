"""Independent record/byte checks plus installed TShark offline decoding; no live capture."""
import hashlib, importlib.util, json, pathlib, struct, subprocess, sys, tempfile
root = pathlib.Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('erspan_fixture', root / 'labs/erspan-fixture.py')
generator = importlib.util.module_from_spec(spec)
spec.loader.exec_module(generator)
data = (root / 'labs/erspan-fixture.pcap').read_bytes()
digest = hashlib.sha256(data).hexdigest()
assert digest == '1365c7f0710ad9f10ac57612ddf513a34d962ab7e39aa311aa9ce523d97b9b5e'
assert data == generator.fixture()
assert struct.unpack('<IHHIIII',data[:24]) == (0xa1b2c3d4,2,4,0,0,65535,1)
def check_sum(blob):
    words = [int.from_bytes(blob[i:i+2], 'big') for i in range(0,len(blob),2)]
    total = sum(words)
    while total > 65535:
        total = (total & 65535) + (total >> 16)
    assert total == 65535
offset = 24
for i, (length, destination, flow, truncated) in enumerate([(1550,20,100,False),(1550,20,101,False),(1550,30,100,False),(110,20,100,True)]):
    seconds,micros,caplen,original = struct.unpack('<4I',data[offset:offset+16]);offset+=16
    assert (seconds,micros,caplen,original) == (1720000000,i*1000,length,length)
    packet=data[offset:offset+caplen];offset+=caplen
    assert len(packet)==length and packet[12:14]==b'\x08\x00'
    ip=packet[14:34];check_sum(ip)
    assert ip[0]==0x45 and ip[8:10]==bytes([32,47])
    assert int.from_bytes(ip[2:4],'big')==length-14
    assert ip[12:16]==bytes([192,0,2,10]) and ip[16:20]==bytes([192,0,2,destination])
    assert struct.unpack('!HHI',packet[34:42])==(0x1000,0x88be,i+1)
    version_vlan, flags_flow, index=struct.unpack('!HHI',packet[42:50])
    assert version_vlan==0x100a and index==1
    assert flags_flow==flow+(0x400 if truncated else 0)
    inner=packet[50:];assert len(inner)==(60 if truncated else 1500)
    assert inner[12:14]==b'\x08\x00';check_sum(inner[14:34])
    assert int.from_bytes(inner[16:18],'big')==1486
    assert inner[26:34]==bytes([198,51,100,10,198,51,100,20])
    assert struct.unpack('!HHH',inner[34:40])==(50000,5555,1466)
    if not truncated:
        check_sum(inner[26:34]+b'\0\x11'+(1466).to_bytes(2,'big')+inner[34:])
assert offset==len(data)
base=['tshark','-n','-r',str(root/'labs/erspan-fixture.pcap')]
fields=['frame.number','ip.dst','erspan.spanid','erspan.truncated','frame.cap_len','frame.len']
args=base+['-T','fields','-E','occurrence=f']
for field in fields:args+=['-e',field]
actual=subprocess.check_output(args,text=True).strip().splitlines()
expected=['1\t192.0.2.20\t100\t0\t1550\t1550','2\t192.0.2.20\t101\t0\t1550\t1550','3\t192.0.2.30\t100\t0\t1550\t1550','4\t192.0.2.20\t100\t1\t110\t110']
assert actual==expected,actual
filters={'erspan':['1','2','3','4'],'erspan.spanid == 100':['1','3','4'],'erspan.spanid == 100 && ip.dst == 192.0.2.20':['1','4'],'erspan.truncated == 1':['4'],'frame.cap_len < frame.len':[]}
for expression,expected_numbers in filters.items():
    assert subprocess.check_output(base+['-Y',expression,'-T','fields','-e','frame.number'],text=True).splitlines()==expected_numbers
with tempfile.TemporaryDirectory(prefix='erspan-fixture-check-') as folder:
    script=pathlib.Path(folder)/'erspan-fixture.py';script.write_bytes((root/'labs/erspan-fixture.py').read_bytes())
    subprocess.run([sys.executable,str(script)],check=True,stdout=subprocess.PIPE)
    target=script.with_suffix('.pcap');assert not target.exists()
    subprocess.run([sys.executable,str(script),'--write'],check=True,stdout=subprocess.PIPE)
    assert target.read_bytes()==data
    target.write_bytes(b'owned test sentinel')
    result=subprocess.run([sys.executable,str(script),'--write'],capture_output=True,text=True)
    assert result.returncode!=0 and 'Refusing to replace' in result.stderr and target.read_bytes()==b'owned test sentinel'
version=subprocess.check_output(['tshark','--version'],text=True).splitlines()[0]
report={'date':'2026-10-09','result':'PASS','decoder':version,'sha256':digest,'records':4,'fieldRows':actual,'filters':filters,'checks':['Pinned deterministic bytes and independent PCAP/IP/GRE/ERSPAN/inner-header lengths','IPv4 checksums all records and UDP checksum for three complete inner copies','ERSPAN truncation distinct from complete PCAP record lengths','Installed TShark fields and five offline filters','Generator default inert, explicit owned write and refusal to replace different bytes'],'scope':'Offline synthetic bytes only; no live capture, network emission, target session, transport arrival or original service'}
(root/'docs/erspan-fixture-results.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf8')
print('PASS four independent synthetic records, checksums, installed offline decoder fields/five filters and guarded generator writes')
