"""Render auditable progress; completion is an explicit reviewed manifest decision."""
from pathlib import Path
import json,subprocess
from curriculum import inventories, completed as accepted_ids
from collections import defaultdict
ROOT=Path(__file__).resolve().parents[1]
inv=json.loads((ROOT/'content/roadmap-inventory.json').read_text(encoding='utf-8'))
manifest_path=ROOT/'content/enrichment.json'
if manifest_path.exists():
    manifest=json.loads(manifest_path.read_text(encoding='utf-8'))
else:
    batches=[]
    def batch(title,ids,dependencies=None):
        number=len(batches)+1
        batches.append(dict(id=f'{number:02}',title=title,nodeIds=ids,dependencies=dependencies or ([f'{number-1:02}'] if number>1 else []),status='not-started'))
    for si,stage in enumerate(inv['originalData']['stages']):
        sg=[g for g in inv['groups'] if g['stage']==si]
        if si==0:
            for g in sg: batch(g['name'],g['children'])
        else:
            pending=[]; names=[]
            for g in sg:
                if pending and len(pending)+len(g['children'])>22:
                    batch(' / '.join(names),pending); pending=[]; names=[]
                pending+=g['children']; names.append(g['name'])
            if pending: batch(' / '.join(names),pending)
        batches[-1]['nodeIds'].append(f'lab-{si}')
    for kind,title in [('device','Cisco Device Mastery'),('hardware','Physical Hardware'),('trouble','Troubleshooting Mastery')]:
        ids=[n['id'] for n in inv['nodes'] if n['kind']==kind]
        batch(title,ids)
    batch('Enterprise architecture capstone',['capstone-final'])
    for title,ids in [
        ('Infrastructure concepts and service objectives',['ADD-INFRA-001','ADD-INFRA-002','ADD-INFRA-003']),
        ('Linux administration depth',['ADD-LINUX-001','ADD-LINUX-002','ADD-LINUX-003']),
        ('Application delivery, TLS and reverse proxies',['ADD-APP-001','ADD-APP-002','ADD-APP-003']),
        ('Container and Kubernetes operations',['ADD-CONT-001','ADD-CONT-002','ADD-CONT-003']),
        ('Cloud architecture and cost controls',['ADD-CLOUD-001','ADD-CLOUD-002','ADD-CLOUD-003'])]: batch(title,ids)
    manifest=dict(schemaVersion=1,reviewedDate='2026-10-03',originalNodes=len(inv['nodes']),completedNodeIds=[],batches=batches,currentBatch='01',nextNode='s0-g0-t0',limitations=['Full curriculum remains pending.','Vendor lifecycle and certification alignments require current sources in their assigned batches.'])
    manifest_path.write_text(json.dumps(manifest,indent=2),encoding='utf-8')
inv, additions, all_nodes = inventories()
names={n['id']:n['name'] for n in all_nodes}
original_ids={n['id'] for n in inv['nodes']}
completed=accepted_ids(manifest)
assert completed<=names.keys()
bundles=json.loads(subprocess.check_output(['node',str(ROOT/'tools/read-content.cjs')],text=True,encoding='utf-8'))
authored={lesson['id'] for lessons in bundles.values() for lesson in lessons}
draft=authored-completed
assert completed<=authored and authored<=names.keys()
assigned=[i for b in manifest['batches'] for i in b['nodeIds'] if i in names]
assert len(assigned)==len(set(assigned))==len(names) and set(assigned)==names.keys()
support=manifest.get('supportingReview',{})
lines=['# Infrastructure Roadmap Enrichment Progress','',f"Original progress-bearing nodes: {len(original_ids)}",f"Completed enriched original nodes: {len(completed & original_ids)}",f"Remaining original nodes: {len(original_ids-completed)}",'Group nodes: 69 (derived summaries; not counted as lessons)',f"Supporting collections: 5 — {support.get('status','pending review')}",f"Added coverage: {len(completed-original_ids)}/{len(additions)} accepted, separately counted",'', 'Learner self-reported progress is independent of editorial completion.','']
for b in manifest['batches']:
    lines += [f"## Batch {b['id']} — {b['title']}",f"Status: {b['status']}",'']
    lines += [f"- [{'x' if i in completed else ' '}] `{i}` — {names[i]}"+(' (draft available; batch acceptance pending)' if i in draft else '') for i in b['nodeIds']]
    lines += ['']
next_work=(f"Continue batch {manifest['currentBatch']} at {manifest['nextNode']}." if manifest['nextNode']!='none' else 'All 33 planned batches are accepted. No planned lesson remains unfinished. Maintain source/version currency and retain the documented execution limits.')
lines += ['# Next Work','',next_work,'','## Known limitations']+['- '+s for s in manifest['limitations']]
if manifest.get('qualityAudits'):
    lines += ['', '## Periodic quality audits']+['- After batch '+a['afterBatch']+': '+a['status']+' — '+a['evidence'] for a in manifest['qualityAudits']]
(ROOT/'ROADMAP_ENRICHMENT_PROGRESS.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
plan=['# Roadmap Batch Plan','','Every original progress-bearing ID is assigned exactly once. Sequence is editorial order; lesson prerequisites will be precise links, not blanket stage gates.','Batch 01 is deliberately seven substantial hardware topics. Later batch scopes may be split without changing original IDs.','Complete audit → research → design → implementation → visualization → labs → questions → tests → Astra review → progress update before advancing.','Run a broad consistency/accessibility/performance audit after batches 04, 08, 12 and every fourth batch thereafter.','']
for b in manifest['batches']:
    plan += [f"## Batch {b['id']} — {b['title']}",f"Status: {b['status']}",f"Dependencies: {', '.join(b['dependencies']) or 'none'}",'Topics:']+['- `'+i+'` — '+names.get(i,'Added curriculum coverage') for i in b['nodeIds']]
    plan += ['Planned visuals: '+b.get('visualizations','annotated component/dependency map; step-by-step mechanism; relevant comparison table.'),'Planned labs: '+b.get('labs','isolated inventory/configuration exercise, a controlled failure, recovery verification and evidence record.'),'Planned interactions: '+b.get('interactions','stepper with static explanation; quick checks and separate 10-question exam per substantial topic; collapsible advanced material.'),'Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.','']
plan += ['## Supporting material',('All 84 original supporting items have individual editorial reviews in content/supporting-review.json and supporting.html; the immutable inventory remains a historical snapshot.' if support.get('status')=='reviewed' else 'Review original certification cards, lab environments, diagnostic method, capstone deliverables and architecture diagram; preserve the immutable source.'),'', '# Next Work',next_work]
(ROOT/'ROADMAP_BATCH_PLAN.md').write_text('\n'.join(plan)+'\n',encoding='utf-8')
print(f"Coverage verified: {len(assigned)} IDs assigned once; {len(completed)} editorially complete; {len(manifest['batches'])} batches.")
