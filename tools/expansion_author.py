"""Render individually authored expansion lessons; never promotes acceptance."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATE = '2026-10-09'

def source(title, url):
    return dict(title=title, url=url, checked=DATE)

def question(text, answer, explanation, concept):
    return dict(question=text, answer=answer, explanation=explanation, testedConcept=concept,
                difficulty='applied', type='short-answer')

def command(code, explanation, expected, platform='Python 3.10+ / project root'):
    return dict(filename='Lab notebook', platform=platform, code=code, explanation=explanation, expected=expected)

def state(name, evidence, interpretation, next_observation):
    return dict(name=name, evidence=evidence, interpretation=interpretation, next=next_observation)

def write_batch(batch, lessons):
    inventory=json.loads((ROOT/'content/expansion-inventory.json').read_text(encoding='utf-8'))
    names={n['id']:n['name'] for n in inventory['nodes']}
    for l in lessons:
        l.update(batch=batch, title=names[l['id']], level='Operational foundations / applied practice')
        for key,prefix in [('quick','QC'),('exams','EX')]:
            for i,q in enumerate(l[key],1):
                q.update(questionId=f"{l['id']}-{prefix}{i}",topicId=l['id'])
        assert len(l['quick'])==3 and len(l['exams'])==10
    text='window.INFRA_BATCHES = window.INFRA_BATCHES || {};\n'
    text+=f'window.INFRA_BATCHES["{batch}"] = '+json.dumps(lessons,ensure_ascii=False,indent=2)+';\n'
    (ROOT/f'content/batch-{batch}.js').write_text(text,encoding='utf-8')
    manifest_path=ROOT/'content/enrichment.json'
    m=json.loads(manifest_path.read_text(encoding='utf-8'))
    b=next(b for b in m['batches'] if b['id']==batch)
    accepted=set(m.get('completedExpansionNodeIds',[]))
    b['draftNodeIds']=[l['id'] for l in lessons if l['id'] not in accepted]
    if b['draftNodeIds']: b['status']='in-progress'
    b['visualizations']='Four-step visual/static mechanism, concept comparison and three-phase incident evidence desk per lesson.'
    b['labs']='Scoped local companion plus lesson-specific investigation and guided target extension; see batch validation.'
    b['interactions']='Three evidence desks, 30 original written exams and nine quick checks; keyboard controls and static equivalents.'
    manifest_path.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'Authored Batch {batch}: {len(lessons)} lessons; acceptance unchanged.')
