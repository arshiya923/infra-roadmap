"""Persist the primary assistant's completed content and six-sheet visual review."""
import hashlib,json,subprocess
from pathlib import Path
R=Path(__file__).resolve().parents[1]
sha=lambda p:hashlib.sha256((R/p).read_bytes()).hexdigest()
digest=lambda x:hashlib.sha256(json.dumps(x,ensure_ascii=False,sort_keys=True).encode()).hexdigest()
lessons=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=R,text=True,encoding='utf-8'))['25']
notes=[
 'Management SVI is separated from transit routing; VLAN-only failure preserves management control.',
 'Original and X-series scope is explicit; routing setting, SVI and SDM are distinct.',
 'PID/software/accessory compatibility precedes member readiness; no universal stack promise.',
 '90 W versus 80 W is supplied arithmetic; data stack and shared power remain separate.',
 'Historical StackWise Virtual scope; independent detection and bounded single-fault drill.',
 'Management CPU is not QFP headroom; time-aligned counters and service profile are required.',
 'ASR IOS XE versus IOS XR is explicitly separated; mismatched runbook rejected before writes.',
 'NAT is not permission; packet-tracer is synthetic; denied-flow control retained.',
 'Saved policy, deployment revision and fresh traffic are separate stages.',
 'Autonomous/lightweight ownership and exact compatibility are distinguished.',
 'Policy/RF/site tags are distinct; missing WLAN mapping is a policy-tag case.',
 'Central switching is declared before locating the client VLAN fault.',
 'Breakout is port-specific; planned conversion is disruptive and guided.',
 'FEX parent, vFC login and storage I/O are different boundaries.',
 'VDC resource ownership does not imply physical fault independence.',
 'NX-OS/ACI authority is explicit; endpoint discovery does not grant inter-EPG permission.',
 'Full versus active zoneset, masking and independent fabrics are distinct.'
]
review=dict(result='PASS',date='2026-10-09',reviewer='Primary assistant; no GapCode or delegated work',bundleSha256=sha('content/batch-25.js'),implementationHashes={p:sha(p) for p in ['scripts/device-mastery.js','styles/device-mastery.css','labs/device-preflight.py']},topics=[dict(id=l['id'],sha256=digest(l),questions={q['questionId']:digest(q) for q in l['exams']+l['quick']},note=notes[i]) for i,l in enumerate(lessons)],visualSheets=[f'docs/screenshots/devices/review-{i}.jpg' for i in range(1,7)],visualReview='All six final contact sheets inspected: 17 desktop worksheets, 17 mobile worksheets and 17 mechanism diagrams. First-pass control alignment and generic labels were corrected; final labels, wrapping and controls were reviewed. Full-size desktop and 320px mobile device-0 renders also inspected.',assessmentReview='170 original exams and 51 quick checks reviewed for lesson alignment, explicit self-assessment and model answers; all feedback paths exercised by browser tests.',limits='Authored cases and declared predicates; no Cisco target execution or physical measurements.')
(R/'docs/device-primary-review.json').write_text(json.dumps(review,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Recorded completed primary review for 17 topics and 221 questions.')
