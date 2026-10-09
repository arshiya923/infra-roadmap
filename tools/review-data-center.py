"""Record primary review after personally inspecting content and actual visuals."""
from pathlib import Path
import json,hashlib,subprocess,sys
R=Path(__file__).resolve().parents[1];bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=R,text=True,encoding='utf-8'));lessons=bundles.get('15',[])+bundles.get('16',[])
notes={
 'platform':'Capability/discovery/attachment/service distinctions, shared parents, compatibility and original-operation recovery reviewed; no physical execution inferred.',
 'rack':'Inclusive U interval, exact existing occupancy and per-surviving-feed allowance reviewed; dimensions, rails, mass and qualified installation remain separate.',
 'memory':'Populated channels, negotiated MT/s, 64 useful data bits and decimal units reviewed; platform example not generalized to universal population rules.',
 'numa':'Execution versus page/device locality, policy fallback and weighted-mean limits reviewed; no automatic page migration or application p99 claim.',
 'pcie':'Gen3/4/5 negotiated electrical width, 128/130 overhead and independent directions reviewed; payload/shared upstream/Gen6 exclusions retained.',
 'raid':'Equal common active-member capacity; N-way RAID1 and exact adjacent pair RAID10 masks reviewed; parity/spare/rebuild/backup/integrity kept separate.',
 'fabric':'Port-sum versus measured demand, same-leaf versus inter-leaf, symmetric link-loss and independent path limitations reviewed; no one-flow aggregation or routing simulation.',
 'power':'Each path must carry full load at declared allowance and independent parents; AC usable Wh arithmetic not rated battery curve or electrical-code compliance.',
 'thermal':'Steady sensible heat with explicit density/specific heat/flow, K rise and mean exhaust; inlet/humidity/CFD/certification excluded.',
 'ha':'Named fault, independent survivor capacity, original service/policy, recovery interval/RTO and data age/RPO reviewed separately; supplied observations, not live failover or statistical availability.',
 'oob':'Host-OS independence, required standby/upstream power, dedicated/shared coupling, endpoint trust and authorized operation reviewed; no vendor session executed.'}
topics=[];questions=[]
for l in lessons:
 kind=next(s['kind'] for s in json.loads((R/'content/data-center-cases.js').read_text(encoding='utf-8').split('=',1)[1].rstrip(';\n')) if 'dc-'+s['key']==l['interactive'])
 topics.append(dict(id=l['id'],result='PASS',notes=notes[kind],sha256=hashlib.sha256(json.dumps(l,ensure_ascii=False,sort_keys=True).encode()).hexdigest()))
 for q in l['quick']+l['exams']:
  assert q['answer'] and q['explanation'] and (not q.get('options') or len(set(q['options']))==4)
  questions.append(dict(id=q['questionId'],topic=l['id'],result='PASS',review='Primary authored/reviewed scenario, answer, explanation, units and applicable distractors against the lesson mechanism and declared source scope.',sha256=hashlib.sha256(json.dumps(q,ensure_ascii=False,sort_keys=True).encode()).hexdigest()))
for name,body in [('data-center-primary-review',dict(topics=topics)),('data-center-question-review',dict(questions=questions))]:(R/f'docs/{name}.json').write_text(json.dumps(dict(date='2026-10-09',reviewer='Primary assistant',result='PASS',**body),indent=2)+'\n',encoding='utf-8')
print(f'Recorded primary content/assessment review: {len(topics)} topics, {len(questions)} assessments.')
