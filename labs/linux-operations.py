"""Unprivileged Linux file access, child exit and supplied storage accounting.
Run on Linux as an ordinary user. Never modifies accounts, units, mounts or disks.
"""
import argparse
import json
import os
from pathlib import Path
import stat
import subprocess
import sys
import tempfile

def run(case):
    if sys.platform!='linux' or os.geteuid()==0:
        raise RuntimeError('Run on Linux as an ordinary user, not root')
    with tempfile.TemporaryDirectory(prefix='linux-fieldbook-') as directory:
        root=Path(directory);config=root/'config.json';config.write_text('{"enabled":true}',encoding='utf-8')
        if case=='access':
            config.chmod(0o640);before=config.read_bytes();denied=False
            try:
                config.chmod(0o000)
                try: config.read_bytes()
                except PermissionError: denied=True
            finally: config.chmod(0o640)
            result=dict(mode=oct(stat.S_IMODE(config.stat().st_mode)),denied=denied,restored=config.read_bytes()==before,
                        scope='Actual owner read denial and mode restoration; not a complete ACL/capability/security-module audit.')
            if not denied: raise RuntimeError('Permission failure was not observed; do not claim this lab passed')
        elif case=='process':
            code='import json,sys; x=json.load(open(sys.argv[1])); print("READY" if x.get("enabled") else "DISABLED"); sys.exit(0 if x.get("enabled") else 3)'
            def child():
                p=subprocess.run([sys.executable,'-c',code,str(config)],capture_output=True,text=True,timeout=5)
                return dict(exit=p.returncode,stdout=p.stdout.strip(),stderr=p.stderr.strip())
            baseline=child();config.write_text('{"enabled":false}',encoding='utf-8');fault=child()
            config.write_text('{"enabled":true}',encoding='utf-8');recovery=child()
            result=dict(baseline=baseline,fault=fault,recovery=recovery,scope='Actual bounded child executions; no systemd unit or timer is installed.')
        else:
            payload=root/'receipt';payload.write_bytes(b'order-17\n');backup=payload.read_bytes()
            payload.write_bytes(b'corrupt\n');fault=payload.read_bytes()!=backup
            payload.write_bytes(backup)
            result=dict(faultDiffers=fault,restored=payload.read_bytes()==backup,
                        suppliedCapacity=dict(vgFreeGiB=12,requestedGrowthGiB=8,remainingGiB=4),
                        scope='Actual owned-file restore; supplied capacity arithmetic does not extend an LV or filesystem. No host disk pressure is induced.')
    result.update(cleanupVerified=not Path(directory).exists(),platform=sys.platform,euid=os.geteuid())
    return result

if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--case',choices=['access','process','storage'],required=True);a=p.parse_args()
    print(json.dumps(run(a.case),indent=2))
