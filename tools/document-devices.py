from pathlib import Path
R=Path(__file__).resolve().parents[1]
p=R/'README.md';s=p.read_text(encoding='utf-8')
s=s.replace('Batches 01–24 and Physical Hardware (Batch 26) are accepted.','Batches 01–26 are accepted, including Cisco Device Mastery and Physical Hardware.')
s=s.replace('The current next editorial step is Batch 25 (`device-0`); the earlier checkpoints are historical.','Cisco Device Mastery (Batch 25) is accepted; content/enrichment.json identifies the next editorial step. The earlier checkpoints are historical.')
entry='''
## Cisco Device Mastery accepted — 2026-10-09

All 17 device-family lessons are complete within their authored, worksheet and guided-lab scopes: 170 original exams, 51 quick checks, 17 incident rehearsals and a downloadable evidence workbook. The 508 model/content checks, 17-route browser suite and full-course route audit pass. Six visually inspected sheets contain 51 actual renders. Cisco target configuration, forwarding, power, RF, failover and SAN I/O remain guided and unexecuted. Work was performed directly without GapCode. See [verification and limits](docs/validation-batch-25.md).
'''
if '## Cisco Device Mastery accepted' not in s:s+='\n'+entry
p.write_text(s,encoding='utf-8')
p=R/'ROADMAP_DECISIONS.md';s=p.read_text(encoding='utf-8')
if '## Cisco Device Mastery acceptance boundary' not in s:
 s+='''

## Cisco Device Mastery acceptance boundary — 2026-10-09

Batch 25 retains all 17 original device IDs and the existing static reader. Exact platform identity precedes syntax: ASR OS family, firewall image/manager, wireless switching location, Nexus mode and MDS active zoning are explicit boundaries. Device-specific four-step mechanisms and authored incidents reuse the shared accessible reader. A separate three-valued checklist treats unknown as blocking and never claims automatic compatibility discovery. The Python worksheet has no persistent resources or network activity.

Primary content, question and visual review plus passing browser, model and shared-route checks support editorial acceptance. No Cisco device execution is claimed. Direct HTTP access restrictions are recorded separately from successful research-browser document reads. Concurrent section edits were preserved; only Batch 25 IDs were promoted by this task. The current manifest, not a fixed historical total, remains authoritative. No GapCode was used.
'''
 p.write_text(s,encoding='utf-8')
