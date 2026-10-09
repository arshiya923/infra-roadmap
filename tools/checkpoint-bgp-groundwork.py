"""Verify BGP foundation evidence while leaving the full original lesson pending."""
import collections,hashlib,json,pathlib,re,subprocess
root=pathlib.Path(__file__).resolve().parents[1]
def read(n):return json.loads((root/n).read_text(encoding='utf8'))
def node(code):return json.loads(subprocess.check_output(['node','-e',code],cwd=root).decode('utf8'))
reg=read('docs/batch-09-regression-results.json');assert reg['result']=='PASS' and len(reg['checks'])==43 and all(c['result']=='PASS' and c['exitCode']==0 for c in reg['checks'])
for command in [['node','tests/bgp-routing-lab.cjs'],['python','tools/build-bgp-evidence.py'],['node','tests/bgp-evidence.cjs'],['node','tests/browser-bgp.cjs']]:assert command in [c['command'] for c in reg['checks']]
quality=read('docs/quality-audit-latest.json');assert quality['result']=='PASS' and quality['lessons']==107 and not quality['issues']
actual=read('docs/bgp-routing-lab-results.json');assert actual['result']=='PASS' and len(actual['checks'])==11 and len(actual['interruptedCleanup'])==5
assert any(l.startswith('ccedcc8a053756575bd9f8935be012080eb70091991afd8bb44c95bd51267a20 ') for l in actual['environment']) and any(l.startswith('ee00c785b39db8e2da6f2e8d43cffcb501b5a6c7e54bebc64ee34918cc869e21 ') for l in actual['environment'])
assert [c['exitCode'] for c in actual['interruptedCleanup']]==[23,24,25,26,27] and all(c['baselineMatched'] for c in actual['interruptedCleanup'])
assert any(l=='RECOVERY_ACTION restore only the exact owned R2 network statement; no daemon restart or session clear' for l in actual['output'])
records=actual['records']
for observer,peer,remote in [('R1','203.0.113.2','198.51.100.0/24'),('R2','203.0.113.1','192.0.2.0/24')]:
 assert 'frr version 8.4.4\n' in records['BASELINE_CONFIG_'+observer]['output']
 assert records['BASELINE_CONFIG_'+observer]['output']==records['RECOVERED_CONFIG_'+observer]['output']
 base=records['BASELINE_SUMMARY_'+observer]['peers'][peer]
 for phase in ['BASELINE','FAULT','RECOVERED']:
  p=records[phase+'_SUMMARY_'+observer]['peers'][peer];assert p['state']=='Established' and p['connectionsEstablished']==base['connectionsEstablished'] and p['connectionsDropped']==base['connectionsDropped']==0
  af=records[phase+'_NEIGHBORS_'+observer][peer]['addressFamilyInfo']['ipv4Unicast'];assert af['inboundPathPolicyConfig'] and af['outboundPathPolicyConfig'] and af['routeMapForIncomingAdvertisements']=='PEER-IMPORT' and af['routeMapForOutgoingAdvertisements']=='OWN-EXPORT'
 for phase in ['BASELINE','RECOVERED']:
  assert records[phase+'_TABLE_'+observer]['routes'][remote][0]['bestpath']
  assert records[phase+'_RIB_'+observer][remote][0]['selected'] and records[phase+'_RIB_'+observer][remote][0]['installed']
  assert any(r['dst']==remote and r.get('gateway')==peer and r['protocol']=='bgp' for r in records[phase+'_KERNEL_'+observer])
assert records['FAULT_CONFIG_R1']['output']==records['BASELINE_CONFIG_R1']['output']
assert records['FAULT_CONFIG_R2']['output']==records['BASELINE_CONFIG_R2']['output'].replace('  network 198.51.100.0/24\n','')
assert '198.51.100.0/24' not in records['FAULT_TABLE_R1']['routes'] and '198.51.100.0/24' not in records['FAULT_RIB_R1'] and not any(r['dst']=='198.51.100.0/24' for r in records['FAULT_KERNEL_R1'])
assert records['FAULT_RIB_R2']['192.0.2.0/24'][0]['selected']
for endpoint in ['CLIENT','SERVER']:
 assert records['BASELINE_PROBE_'+endpoint]['exitCode']==0 and records['RECOVERED_PROBE_'+endpoint]['exitCode']==0 and records['FAULT_PROBE_'+endpoint]['exitCode']!=0 and records['FAULT_PROBE_'+endpoint+'_GATEWAY']['exitCode']==0
evidence=node("process.stdout.write(JSON.stringify(require('./content/bgp-evidence.js')))")
assert evidence['source']['sha256']==hashlib.sha256((root/evidence['source']['path']).read_bytes()).hexdigest() and len(evidence['views'])==6 and evidence['packets']==records['PACKETS']
for v in evidence['views']:
 for k,value in v['records'].items():assert value==records[k]
model=read('docs/bgp-evidence-results.json');assert model['result']=='PASS' and model['combinations']==12 and model['views']==6 and model['prefixScopes']==2 and len(model['checks'])==5
browser=read('docs/browser-bgp-results.json');assert browser['result']=='PASS' and len(browser['checks'])==6 and not browser['errors']
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=root).decode('utf8'));lessons=[l for b in bundles.values() for l in b];assert len(lessons)==107 and sum(len(l['exams']) for l in lessons)==1070 and sum(len(l['quick']) for l in lessons)==321 and not any(l['id']=='s3-g3-t0' for l in lessons)
manifest=read('content/enrichment.json');b=next(b for b in manifest['batches'] if b['id']=='09');assert len(manifest['completedNodeIds'])==95 and len(b['draftNodeIds'])==12 and b['nextAuthoringNode']=='s3-g3-t0' and b['bgpGroundwork']['status']=='VERIFIED_GROUNDWORK_FULL_LESSON_PENDING'
review=read('docs/review-batch-09.json');assert len(review['topics'])==12 and len(review['remainingIds'])==8 and review['nextAuthoringNode']=='s3-g3-t0' and all(g['result']=='PENDING_FULL_20_TOPIC_BATCH' for g in review['batchGates']) and len(review['batchGates'])==13
q=read('docs/exam-review-batch-09.json');assert q['examCount']==120 and q['quickCount']==36
c=read('docs/commands-results-batch-09.json');assert len(c['blocks'])==108 and collections.Counter(v['classification'] for v in c['blocks'])==dict(GUIDED_NOT_EXECUTED=85,PASS_ACTUAL_ISOLATED_LINUX=14,PASS_ACTUAL_PACKAGE_EXTRACTION=9)
assert not any(v['topicId']=='s3-g3-t0' for v in review['topics'])
manual=read('docs/bgp-groundwork-manual-screenshot-hashes.json');screens=['bgp-groundwork-'+n+'.png' for n in ['desktop','light-mobile','dark-mobile','table-start','table-end']];assert set(screens)==set(manual['sha256']) and all(hashlib.sha256((root/'docs/screenshots/batch-09'/s).read_bytes()).hexdigest()==manual['sha256'][s] for s in screens)
sha=hashlib.sha256((root/'original/index.html').read_bytes()).hexdigest();assert sha=='ac6c8cec9f3fb2b25e146cf17981d8b5498413a18a4f1035dbf5a200941f8a25'
links=[]
for n in ['docs/bgp-runtime-foundation.md','docs/validation-batch-09.md']:
 p=root/n
 for ref in re.findall(r'\]\(([^)]+)\)',p.read_text(encoding='utf8')):
  if '://' in ref:continue
  target=ref.split('#')[0]
  if target and target!='bgp-groundwork-checkpoint-results.json':assert (p.parent/target).is_file(),ref
  links.append([n,ref])
foundationReview=read('docs/bgp-foundation-review.json');assert foundationReview['result']=='PASS_WITH_DOCUMENTED_SCOPE' and len(foundationReview['sources'])==8 and all(s['checked']=='2026-10-09' and s['url'].startswith('https://') for s in foundationReview['sources'])
assert foundationReview['fullOriginalLesson']=='PENDING' and foundationReview['manualRendering']['reviewed']==screens
checks=['43 fresh actual regression commands pass; original content/prerequisites and 107-lesson quality audit preserved','Eleven actual BGP categories and five interrupted cleanup boundaries independently retain explicit policy and host resources','Known exact origin withdrawal/repair preserves observed sessions/counters while prefix installation and original round trips change; baseline config restored without restart/clear','Six exact source-hashed raw observer/checkpoint views and twelve independently compared local/remote prefix combinations','Six standalone browser categories pass, including invalidation/inert text/exact downloads/responsiveness/keyboard scrolling and HTTP/direct-file use','Five current screenshots individually inspected with exact hashes','107 authored/1070 exams/321 quick checks and 95 accepted unchanged; no full original BGP lesson or new exam/command acceptance falsely recorded','Twelve reviewed drafts/eight remaining topics/thirteen full-batch gates remain pending; full BGP fundamentals is next','Eight checked primary references, local evidence links and immutable source hash verified']
result=dict(date='2026-10-09',result='PASS',checks=checks,screenshots=screens,sourceHash=sha,localLinks=links,scope='BGP foundation progress only; full original BGP fundamentals teaching, thirteen assessments, diagram, integrated reader checks and primary topic review remain pending. Goal continues; no GapCode.')
(root/'docs/bgp-groundwork-checkpoint-results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf8');print('PASS BGP foundation checkpoint; full original lesson pending')
