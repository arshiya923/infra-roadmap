"""Record primary review after fresh batch checks; not a replacement for that review."""
import hashlib
import json
from pathlib import Path
import sys
ROOT=Path(__file__).resolve().parents[1]

def accept(batch,scope,source_urls,review):
    browser=json.loads((ROOT/f'docs/browser-expansion-{batch}.json').read_text(encoding='utf-8'))
    lab=json.loads((ROOT/f'docs/expansion-lab-{batch}.json').read_text(encoding='utf-8'))
    assert browser['result']==lab['result']=='PASS'
    manifest_path=ROOT/'content/enrichment.json';m=json.loads(manifest_path.read_text(encoding='utf-8'))
    b=next(b for b in m['batches'] if b['id']==batch)
    completed=m.setdefault('completedExpansionNodeIds',[])
    for node in b['nodeIds']:
        if node not in completed: completed.append(node)
    b.update(status='completed',draftNodeIds=[])
    next_batch=next((x for x in m['batches'] if x['status'] not in ('complete','completed')),None)
    m.update(currentBatch=next_batch['id'] if next_batch else 'none',nextNode=next_batch['nodeIds'][0] if next_batch else 'none')
    manifest_path.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    files=[f'content/batch-{batch}.js',f'docs/browser-expansion-{batch}.json',f'docs/expansion-lab-{batch}.json','scripts/expansion.js']
    evidence=dict(date='2026-10-09',batch=batch,status='accepted',scope=scope,primaryReview=review,sources=source_urls,hashes={f:hashlib.sha256((ROOT/f).read_bytes()).hexdigest() for f in files})
    (ROOT/f'docs/acceptance-batch-{batch}.json').write_text(json.dumps(evidence,indent=2)+'\n',encoding='utf-8')
    doc=f'''# Batch {batch} — {b['title']}

Accepted by the primary assistant on 9 October 2026, after direct implementation
under the user's instruction not to use GapCode.

Three full lessons, 30 original written exam questions, nine quick checks, three
four-step visual/static mechanisms, comparisons and three-phase incident desks.
Written answers use self-assessment. Study progress is separate from editorial status.

## Review and evidence

{review}

- [Browser checks](browser-expansion-{batch}.json): all three routes, keyboard phases,
  reset, reduced motion, answer reveals, exact clipboard and downloads, direct files,
  separate persistent progress and 1440/768/390/320 widths in light and dark.
- [Local lab checks](expansion-lab-{batch}.json): actual results and declared model scope.
- [Acceptance hashes](acceptance-batch-{batch}.json) bind this reviewed checkpoint.

## Scope and limits

{scope}

The evidence desks are authored scenarios, not captured vendor terminal output.
Automated accessible-name/structure checks and inspected screenshots do not constitute
a complete screen-reader or external WCAG audit.

## Reproduce

From the project root, with the local server at 127.0.0.1:8765 and the documented
Playwright/Edge runtime:

```text
node tests/content.cjs
node tests/browser-expansion.cjs {batch}
```

The lab report records its execution platform and scope. Follow the commands in the
lesson rather than treating guided platform operations as previously executed.
'''
    (ROOT/f'docs/validation-batch-{batch}.md').write_text(doc,encoding='utf-8')
    print('Accepted expansion batch '+batch)

if __name__=='__main__':
    raise SystemExit('Import accept() only after primary review and fresh verification.')
