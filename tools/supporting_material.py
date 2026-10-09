"""Render the individually reviewed supporting inventory without altering its source."""
from collections import Counter
import html
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
inventory=json.loads((ROOT/'content/roadmap-inventory.json').read_text(encoding='utf-8'))
refs={
 'cisco':'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/index.html',
 'vmware':'https://www.broadcom.com/support/education/vmware/certification',
 'linux':'https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/',
 'ansible':'https://www.redhat.com/en/technologies/management/ansible/training-and-certification'
}
certs=[
 ('Networking fundamentals, addressing, switching and basic service diagnosis; compare the current provider objectives with your own evidence notebook.','cisco','lab-1'),
 ('Enterprise routing, services, security and automation are relevant practice areas; the course is not a complete exam-objective mapping.','cisco','lab-3'),
 ('Fabric, compute, storage and automation topics have scoped models and guided vendor practice; actual target proficiency needs its own evidence.','cisco','lab-7'),
 ('Expert-level enterprise work needs integrated time-bounded configuration and troubleshooting on supported targets beyond written questions.','cisco','lab-3'),
 ('Expert-level data-center work needs platform-specific integration and failure recovery; a conceptual capstone does not certify that performance.','cisco','capstone-final'),
 ('This original label is a broad family reference. Confirm the current Broadcom program, product version and assessment before planning preparation. The fetched portal exposed no detailed syllabus, so no requirements or alignment are asserted.','vmware','lab-8'),
 ('Linux administration practice now includes permissions, processes, storage and recovery. Choose a specific provider assessment and compare its current objectives independently.','linux','ADD-LINUX-001'),
 ('Automation practice covers versioned intent, validation and rollback. Confirm the chosen Red Hat track and product scope on the provider site; no prerequisites, price or exam equivalence are asserted here.','ansible','s9-g3-t0')]
deliverables=[
 'Show client and return paths, routed underlay and optional overlay; draw native FC storage separately from Ethernet.',
 'Identify devices, ports, cable paths, NIC/HBA attachment, racks and power. Verify physical diversity rather than counting links.',
 'Record nonoverlapping subnets, gateways, allocation owners and site scope; include IPv6 policy where applicable.',
 'Map VLAN membership, trunks and routed boundaries; a VLAN ID alone is not an authorization policy.',
 'Document route sources, policy, summarization assumptions, convergence evidence and return paths.',
 'Define source/destination/service identity, intended allows and denies, logging and stateful return behavior.',
 'Record rack units, weight/power/cooling limits, maintenance clearances and independent feeds; supplied dimensions need target validation.',
 'Connect CPU/memory demand, placement, NIC/HBA attachment and survivor capacity to measured workload requirements.',
 'Show FC fabrics, zoning/masking, host multipath, data protection and supported array/controller failure behavior.',
 'Name the failure set, remaining capacity and shared dependencies; HA is not a backup or complete site-recovery plan.',
 'Define user-facing signals, infrastructure diagnosis, alert ownership and operation when the monitored system is impaired.',
 'Retain independently protected usable copies, keys and restore evidence; a successful backup job is insufficient.',
 'Specify fencing, recovery point, dependencies, cutover validation, RTO/RPO measurements and failback ownership.',
 'Use versioned intent, validation, review, bounded apply and rollback with actual resulting-state checks.',
 'Maintain an indexed as-built package with owner, revision, assumptions, evidence, limits and handover actions.'
]
methods=[
 'State the affected user operation, scope, time and expected behavior. Distinguish impact from detection time.',
 'Capture bounded observations with provenance, timestamps and relevant configuration; protect secrets and retain uncertainty.',
 'Locate the failing boundary using evidence from both sides. Layer labels organize investigation but do not prove cause.',
 'List plausible explanations and an observation that would disprove each; do not promote the latest change to root cause by chronology alone.',
 'Choose one bounded reversible test on an owned target, with baseline, stop condition and cleanup. Avoid competing changes.',
 'Apply the reviewed repair or mitigation under one owner. Record exactly what changed and which revision can be restored.',
 'Repeat the original operation and policy/data checks, then verify stability and cleanup. A green process is not sufficient.',
 'Separate confirmed causes, contributing conditions and unresolved hypotheses. Assign corrective actions and verification dates; do not invent certainty.'
]
environments=[
 'Begin with a small owned topology, a baseline, one controlled fault and a recovery notebook. Existing local labs provide a no-hardware path.',
 'Packet Tracer is a teaching simulator. Use its legal distribution and document which features are simulated rather than treating its output as hardware evidence.',
 'Emulation platforms still require legitimate images, adequate host resources and an isolated management/network plan. Feature support follows the exact image.',
 'Capture only traffic you are authorized to inspect. Record interface/filter/time scope and protect payloads; a capture startup message is not decoded packet evidence.',
 'Use a disposable Linux guest or the documented WSL scope. Record kernel/distribution differences and snapshot/restore requirements before mutations.',
 'Use an owned licensed/evaluation server under its actual terms. Domain/role operations remain guided; do not attach a practice domain or DHCP service to a shared network.',
 'Move to integrated virtual appliances only after individual mechanisms and rollback procedures are understood. Resource capacity and legal images are prerequisites.',
 'IOSv/IOSvL2 are platform-specific virtual practice targets. Verify supported features and image rights; virtual behavior does not establish ASIC or physical-port behavior.',
 'These are original virtual-router family examples, not current purchase advice. Confirm the exact supported image/version and resource/license requirements.',
 'NX-OS virtual practice is feature- and version-scoped. Do not infer physical Nexus forwarding, vPC or storage capabilities from a generic VM.',
 'Use an owned virtual firewall with explicit interfaces, allow/deny tests and rollback. Do not route normal host traffic through an unreviewed practice policy.',
 'Choose the OS required by the lesson and record its version. Keep identity, DNS/DHCP and routing experiments isolated from shared services.',
 'Use a supported owned hypervisor and compatible hardware/software. Product licensing and trial availability are not assumed by this course.',
 'Physical practice is optional and requires an owned target, maintenance access and an exact rollback plan. The educational curriculum does not claim these operations were executed.',
 'The listed Catalyst families are historical roadmap examples. Validate lifecycle, software support and needed features before selecting any real target.',
 'The listed ISR is a historical practice example. Check its exact support/release context; virtual routing results do not prove physical throughput.',
 'Nexus families differ in features and lifecycle. Select a supported exact target and keep fabric, storage and management paths distinct.',
 'Wireless practice needs permitted RF operation, compatible AP/controller software and client evidence. Wired reachability alone does not validate roaming or radio capacity.',
 'These ProLiant generations are historical examples. Check firmware, OS compatibility, power and lifecycle for the owned unit; no purchase recommendation is made.',
 'SAN work needs precise WWPNs, supported zoning/masking/multipath and protected data. Never infer a safe LUN change from a hostname alone.',
 'Power practice requires qualified personnel and approved procedures. Do not pull shared feeds or defeat protections to reproduce a classroom failure.'
]
architecture=[
 'External users and dependencies are outside the local failure boundary; define reachability and provider assumptions.',
 'Provider A needs its own path and routing evidence; a name on a diagram does not prove physical diversity.',
 'Provider B can share ducts, exchanges or power with A; verify actual independence before claiming resilience.',
 'Edge A needs policy, upstream and return-route validation under normal and failed states.',
 'Edge B must have usable survivor capacity and policy, not merely a configured neighbor.',
 'Firewall A enforces the explicit zone policy and contributes connection state to the HA design.',
 'Firewall B needs supported state/policy synchronization and tested takeover behavior.',
 'A heartbeat or sync link alone does not prove equivalent policy or preservation of the original application session.',
 'The core pair needs a documented topology and failure behavior; device count is insufficient.',
 'Spine 1 participates in the routed underlay with links to the leaves; hosts are not implied to attach directly.',
 'Spine 2 supplies an alternate fabric path only under the actual routing and failure design.',
 'Leaf 1 provides selected host/border attachment; map its exact NIC, uplink and policy relationships.',
 'Leaf 2 must be placed and connected according to the supported host multihoming design.',
 'Leaf 3 needs the same explicit underlay/overlay and port mapping, not a copied redundancy label.',
 'Leaf 4 contributes capacity and paths only where workloads and policy actually use it.',
 'Compute/hypervisor workloads depend on storage, identity, networking and management; validate actual placement and survivor capacity.',
 'Dual NICs require a supported bonding/multihoming design. vPC is conditional, not a universal server requirement.',
 'SAN A and SAN B are separate native FC fabrics. Shared arrays, software or power remain possible common failures.',
 'Native FC attachment is host HBA to FC fabric to storage target; it is not an Ethernet-leaf cable in this reference.',
 'Campus distribution/access attaches users and local services through deliberate routed/policy boundaries.',
 'Wireless and campus access need their own client, RF, policy and failure observations.',
 'Management/OOB needs protected access and a path usable during production-network impairment.',
 'AAA, DNS, DHCP and time are distinct service dependencies; record identities, addressing, trust and recovery order.',
 'Monitoring and logs need protected retention, meaningful signals and access during incidents; telemetry success is not application success.',
 'Automation must use scoped authority, reviewed intent and validation/rollback; its host is itself a dependency.',
 'NetBox, Ansible and Git are example roles for inventory, execution and version history, not interchangeable sources of truth.',
 'Backup/recovery includes usable protected copies, keys, restore procedure and data reconciliation.',
 'Independence means a different relevant failure/administration boundary, not merely a second filename.',
 'A DR site requires capacity, data, identity, connectivity and writer ownership before cutover.',
 'RTO/RPO are targets until measured under a declared exercise; the local restore duration is not whole-site recovery time.',
 'The original caption already distinguishes routed underlay, optional EVPN/VXLAN, alternative ACI and separate native FC. Retain these boundaries and use the worked attachment map for implementation planning.',
 'All fifteen engineering deliverables are worked in the existing capstone workbook; each still needs target-specific evidence before operational deployment.'
]
environment_lessons=['lab-1','lab-1','lab-1','s1-g5-t10','s0-g1-t2','s0-g1-t1','lab-3','lab-2','device-5','s7-g0-t1','lab-5','s0-g1-t1','s8-g5-t0','lab-6','device-0','device-5','s7-g0-t0','trouble-15','hardware-0','hardware-9','hardware-12']
groups={'support-certs':('Certification planning','The original cards are approximate study signposts, not a current exam-coverage promise. Provider pages were checked on 9 October 2026. Confirm the exact track, version, requirements and assessment with the provider before making a study or purchase decision.'),
 'support-deliverables':('Engineering deliverables','The existing capstone workbook contains all fifteen numbered deliverables. These review notes explain the acceptance boundary for each; no second version of the design is introduced.'),
 'support-method':('Eight-step troubleshooting method','Use the method as a loop: evidence can send you back to the problem statement or hypotheses. Preserve uncertainty and validate the original service after any mitigation.'),
 'support-lab-environment':('Practice environments','The original equipment/software names are retained as historical examples, not a shopping list or a promise of current licensing/support. Use legal images and owned isolated targets. The local companion labs provide scoped executable practice without purchasing equipment.'),
 'support-capstone':('Architecture diagram review','The original graphic is a conceptual reference. The worked capstone separates native FC, Ethernet, management, backup and recovery paths. Every original label is accounted for below; no physical topology is certified by this review.')}

rows=[]
for n in inventory['supportingNodes']:
    group=n['parentId'];number=int(n['id'].rsplit('-',1)[1]);reference='labs/capstone-workbook.md';label='Worked capstone workbook'
    if group=='support-certs':
        note,provider,lesson=certs[number];reference=refs[provider];label='Official provider reference'
        extra='learn.html#lesson='+lesson
    elif group=='support-deliverables':
        note=deliverables[number]+' See workbook section '+str(number+1)+'.';extra='learn.html#lesson=capstone-final'
    elif group=='support-method':
        note=methods[number];reference='learn.html#lesson=ADD-INFRA-003';label='Change, incident and evidence lesson';extra='learn.html#lesson=trouble-20'
    elif group=='support-lab-environment':
        note=environments[number];reference='labs/expansion-capstones.md';label='Cross-domain practice workbook';extra='learn.html#lesson='+environment_lessons[number]
    else:
        note=architecture[number];extra='learn.html#lesson=capstone-final'
    rows.append(dict(id=n['id'],name=n['name'],collection=group,status='reviewed',reviewDate='2026-10-09',note=note,reference=reference,referenceLabel=label,related=extra))
assert len(rows)==84 and len({r['id'] for r in rows})==84
ledger=dict(schemaVersion=1,reviewDate='2026-10-09',scope='Editorial review and evidence mapping, not certification alignment or physical/vendor execution.',collections=5,items=rows)
(ROOT/'content/supporting-review.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
esc=html.escape
body=[]
for group,(title,intro) in groups.items():
    body.append(f'<section id="{group}" class="lesson-section"><h2>{esc(title)}</h2><p>{esc(intro)}</p>')
    for row in (r for r in rows if r['collection']==group):
        external=row['reference'].startswith('https:')
        rel=' target="_blank" rel="noopener noreferrer"' if external else ''
        body.append(f'<article id="{row["id"]}" class="support-item"><h3>{esc(row["name"])}</h3><p>{esc(row["note"])}</p><p><a href="{esc(row["reference"])}"{rel}>{esc(row["referenceLabel"])}</a> · <a href="{esc(row["related"])}">Related fieldbook lesson</a></p><small>{row["id"]} · editorial review 2026-10-09</small></article>')
    body.append('</section>')
nav=''.join(f'<a href="#{g}">{esc(v[0])}</a>' for g,v in groups.items())
page=f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Supporting material · Infrastructure Fieldbook</title><link rel="icon" href="assets/favicon.svg"><link rel="stylesheet" href="styles/learning.css"><link rel="stylesheet" href="styles/supporting.css"><script defer src="scripts/supporting.js"></script></head>
<body><a class="skip-link" href="#support-main">Skip to supporting material</a><header class="masthead"><a class="brand" href="learn.html">INFRA / FIELDNOTES</a><div class="header-actions"><a href="index.html">Roadmap</a><button id="support-theme">Dark theme</button></div></header>
<main id="support-main" class="support-page" tabindex="-1"><p class="kicker">REFERENCE / PRACTICE / EVIDENCE</p><h1>Supporting material</h1><p class="lead">A reviewed guide to the roadmap’s 84 supporting items.</p><p>Use these notes with the 457 lessons and the worked capstone. Review status describes the teaching material; your study progress and real-world operating competence remain separate.</p><nav class="pills" aria-label="Supporting collections">{nav}</nav><p><a href="labs/expansion-capstones.md" download>Download the cross-domain practice workbook</a></p>{''.join(body)}<p><a href="learn.html#lesson=ADD-INFRA-001">Start the expansion lessons</a></p></main></body></html>
'''
(ROOT/'supporting.html').write_text(page,encoding='utf-8')
print('Rendered 84 supporting reviews across five collections.')
