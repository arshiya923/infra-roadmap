"""Build the personally authored Network Services lessons; never accepts drafts."""
from pathlib import Path
import json
import re
ROOT=Path(__file__).resolve().parents[1]
S=[]
def add(id, key, subtitle, definition, mechanisms, operational, security, ports, command, source, gates, questions, prerequisite=None):
    assert len(questions)==10 and len(mechanisms)==3 and len(gates)==3
    S.append(dict(id=id,key=key,subtitle=subtitle,definition=definition,mechanisms=mechanisms,operational=operational,security=security,ports=ports,command=command,source=source,gates=gates,questions=questions,prerequisite=prerequisite))
def rfc(n):return [f'RFC {n}',f'https://www.rfc-editor.org/rfc/rfc{n}.html']
exec((ROOT/'tools/network-services-authoring.py').read_text(encoding='utf-8'))
inventory=json.loads((ROOT/'content/roadmap-inventory.json').read_text(encoding='utf-8'))
manifest=json.loads((ROOT/'content/enrichment.json').read_text(encoding='utf-8'))
practice=json.loads((ROOT/'tools/network-services-practice.json').read_text(encoding='utf-8'))
distractors=json.loads((ROOT/'tools/network-services-distractors.json').read_text(encoding='utf-8'))
order=[id for b in manifest['batches'] if b['id'] in ('11','12') for id in b['nodeIds']]
assert {x['id'] for x in S}==set(order) and len(S)==30
S.sort(key=lambda s:order.index(s['id']))
for s in S:
    if s['key']=='radius':
        s['source'].append(rfc(9765))
        s['security']+=' RFC9765 defines an Experimental RADIUS/1.1 profile that negotiates a TLS/DTLS-based variant without the legacy MD5 mechanisms. This does not change classic UDP deployments or prove product support; verify the negotiated profile and implementation before relying on it.'
    if s['key'] in ('http','certificates'):s['source'].append(rfc(9525))
    if s['key']=='http':s['source'].append(rfc(9114))
names={n['id']:n['name'] for n in inventory['nodes']}
lessons=[]; models=[]; workbook=['# Network Services evidence workbook','','This is a guided disposable-target rehearsal. Browser cases are synthetic declarations, not captured service traffic. No target configuration, live NTP/SNMP/AAA, vendor application installation or physical switching was executed for this workbook.','','## Preparation and recovery boundary','','Use isolated VMs or a supported lab device with console access. Record product version, management source, destination, protocol, clock and credential scope. Save scoped baseline settings securely. Keep the console-local recovery account independent of central AAA; test it before attaching any method list. Use documentation addresses only as placeholders. Never expose a DHCP server or permissive collector on a production uplink. Each fault changes one owned lab setting; restore it before moving on. Retain both positive and negative observations, then restore all original settings and verify the original transaction.','']
for spec in S:
    id=spec['id']; batch=next(b['id'] for b in manifest['batches'] if id in b['nodeIds']); title=names[id]
    ms=spec['mechanisms']; gs=spec['gates']; qs=spec['questions']; key=spec['key'];
    flow=[[f'{title} context',f'{spec["subtitle"]} Record the actual endpoint, interface and time before interpreting a result.']]+[[g[0],g[1]+' '+g[2]] for g in gs]
    labsteps=[f'Open the {title} evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.',f'Choose the first fault: {gs[0][2]} Record which prerequisite changed and explain why the other declarations alone cannot override it.',f'Restore that prerequisite, then choose the second fault: {gs[1][2]} Predict the output before revealing it and compare the explanation with the mechanism sequence.',f'Compare the third boundary: {gs[2][2]} State which observation would independently confirm a real transaction and which evidence is still missing.',f'Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.',f'On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. {spec["operational"]}']
    labsteps=practice[key]+labsteps
    quick=[dict(question=qs[i][0],answer=qs[i][1],explanation=qs[i][2],type='short-answer',difficulty='Intermediate',testedConcept=qs[i][0],topicId=id,questionId=f'{id}-QC{i+1}') for i in (0,1,2)]
    exams=[]
    for i,q in enumerate(qs):
        obj=dict(question=f'{title} — {q[0]}',answer=q[1],explanation=q[2],type='short-answer',difficulty='Advanced' if i>5 else 'Intermediate',testedConcept=q[0],topicId=id,questionId=f'{id}-Q{i+1:02}')
        if i==0:obj.update(type='multiple-choice',options=[q[1],*distractors[key]])
        if len(q)>3:obj.update(type='multiple-choice',options=[q[1],*q[3]])
        if 'options' in obj:
            shift=S.index(spec)%4
            obj['options']=obj['options'][shift:]+obj['options'][:shift]
        exams.append(obj)
    command=spec['command']
    l=dict(id=id,batch=batch,title=title,subtitle=spec['subtitle'],level='Intermediate → Advanced',minutes=60 if id!='lab-4' else 120,interactive='ns-'+key,
      definition=spec['definition'],purpose=f'{spec["subtitle"]} {spec["operational"]}',mental=f'Use a three-column evidence notebook for {title}: prerequisite, observation and conclusion. {ms[0]} The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.',
      components=[f'{g[0]}: {g[1]}' for g in gs]+[f'Observation point: {command[2]}','Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results.'],mechanism=ms+[f'The first decisive boundary in this worksheet is {gs[0][0]}. {gs[0][2]}',f'The later evidence boundaries are {gs[1][0]} and {gs[2][0]}. {gs[1][2]} {gs[2][2]}'],flow=flow,
      comparison=[[g[0],g[1],g[2]] for g in gs],example=f'An operator investigating {title} has an apparently healthy management path. {qs[3][0]} {qs[3][1]} {qs[3][2]} Compare that observation with the separate recovery question: {qs[7][0]} {qs[7][1]} {qs[7][2]} Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.',ports=spec['ports'],
      commands=[dict(filename='guided-observation.txt',code=command[0],platform=command[1]+' · GUIDED NOT EXECUTED',explanation=command[2],expected=command[3])],
      configuration=f'For the optional disposable-target exercise, preserve the exact prior {title} settings, version and consuming attachment before any change. {spec["operational"]} The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.',
      production=spec['operational'],troubleshooting=[[g[0]+' boundary fails',g[2]+' Inspect the relevant endpoint and preserve actual output before changing that setting.'] for g in gs]+[['Worksheet differs from the target','Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies.']],security=spec['security'],
      performance=f'{qs[8][0]} {qs[8][1]} {qs[8][2]} Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.',mistakes=[qs[i][2] for i in (1,3,5,8)],
      prerequisites=spec['prerequisite'] or ['s1-g2-t0','s0-g1-t3'],related=([S[S.index(spec)+1]['id']] if spec!=S[-1] else ['s4-g0-t3','s4-g1-t0','s4-g1-t1','s4-g2-t0']),
      lab=dict(objective=f'{spec["subtitle"]} Distinguish the supplied worksheet outcome from measured service evidence.',requirements='Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.',topologyKind='shared',topology=[f'Owned client / observer → {title} endpoint',f'Boundary: {gs[0][0]} → {gs[1][0]} → {gs[2][0]}','Evidence notebook → one owned fault → exact restore → original transaction'],steps=labsteps,verification=f'{command[3]} Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.',troubleshooting=f'{gs[0][2]} {gs[1][2]} {gs[2][2]} Separate invalid inputs from a valid negative service result.',challenge=f'{qs[9][0]} Explain the observation needed to support your answer without assuming that a configured object was consumed.',cleanup='Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.'),
      glossary={g[0]:g[1] for g in gs},sources=[dict(title=x[0],url=x[1],checked='2026-10-09') for x in spec['source']],quick=quick,exams=exams,artifacts=[dict(title='Guided Network Services evidence workbook',path='labs/network-services-workbook.md')])
    def polish(v):
        if isinstance(v,str):
            v=re.sub(r'\b(TCP|UDP|RFC)(\d)',r'\1 \2',v)
            v=re.sub(r'\b(Layer)(\d)',r'\1 \2',v)
            v=re.sub(r'(\d)(ms|bits/s|octets)\b',r'\1 \2',v)
            v=re.sub(r'\b(port|facility|severity|over|at|of|by)(\d)',r'\1 \2',v)
            return v
        if isinstance(v,list):return [polish(x) for x in v]
        if isinstance(v,dict):return {k:polish(x) if k not in ('url','id','topicId','questionId','interactive','path') else x for k,x in v.items()}
        return v
    l=polish(l)
    lessons.append(l);models.append(dict(key=key,title=title,gates=polish(gs),scope='Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement.'))
    workbook += [f'## {id} — {title}','',spec['subtitle'],'',f'Observation reference ({command[1]}; guided, not executed):','', '```text',command[0],'```','',command[2],'',*['- '+x for x in labsteps],'',f'Expected evidence: {command[3]}','',f'Challenge: {qs[9][0]}','',l['lab']['cleanup'],'']
for b in ('11','12'):
    ls=[l for l in lessons if l['batch']==b]
    out="'use strict';\n(() => {\nconst lessons = "+json.dumps(ls,indent=2,ensure_ascii=False)+";\nwindow.INFRA_BATCHES=window.INFRA_BATCHES||{};window.INFRA_BATCHES['"+b+"']=lessons;\n})();\n"
    (ROOT/f'content/batch-{b}.js').write_text(out,encoding='utf-8')
    bm=next(x for x in manifest['batches'] if x['id']==b);bm.update(status='in-progress',draftNodeIds=[l['id'] for l in ls],visualizations='Topic-specific prerequisite/evidence worksheets and four-step mechanisms with static equivalents.',labs='Downloadable guided Network Services workbook with one-fault/restore/evidence records; synthetic browser declarations are separate from actual service observations.',interactions=f'{len(ls)} lesson steppers, native worksheet controls, {len(ls)*10} exams and {len(ls)*3} quick checks.')
(ROOT/'content/enrichment.json').write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
(ROOT/'labs/network-services-workbook.md').write_text('\n'.join(workbook)+'\n',encoding='utf-8')
(ROOT/'content/network-services-cases.js').write_text("'use strict';\nwindow.NETWORK_SERVICE_CASES="+json.dumps(models,indent=2,ensure_ascii=False)+';\n',encoding='utf-8')
print(f'Authored {len(lessons)} drafts, {sum(len(l["exams"]) for l in lessons)} exams; no editorial acceptance.')
