from pathlib import Path
import json
from collections import defaultdict
R=Path(__file__).resolve().parents[1]
d=json.loads((R/'content/roadmap-inventory.json').read_text(encoding='utf-8'))
lines=['# Roadmap Content Audit','', 'Audit date: 2026-10-03. This is a complete structural/content-gap audit, not a claim that all vendor statements have been researched. Each batch must perform its own technical review.','',
'## Baseline and counts',f"Original SHA-256: `{d['sha256']}`",'One HTML file, 100,327 bytes, no dependencies/build tooling. Inline data, styles and event handlers. Ten stages, 69 group nodes, 373 stage topic occurrences, ten stage labs, 17 device nodes, 20 hardware nodes, 21 troubleshooting nodes and one final capstone = 442 progress-bearing nodes.','',
'## Existing strengths','Hierarchical roadmap, local learner status, JSON progress import/export, keyboard-accessible buttons, native dialogs, reduced-motion CSS, mobile navigation, skill matrix, a conceptual architecture SVG and explicit lab suggestions. Preserve these.','',
'## Systemic gaps','Only 42 named brief entries exist. Other nodes fall back to generic group concepts and stage lab text. No node meets the requested enriched-topic definition yet. No structured question bank, lesson-specific ten-question exams, quick checks, internal-flow animations, lab verification/cleanup procedures or full text lesson search exist. Configuration rollback, command output interpretation, security and performance treatment are inconsistent or absent.','The original recommendation algorithm uses prior groups/stage labs as broad gates. It can force unrelated topics and hides missing conceptual dependencies. byName chooses the first repeated title, making precise cross-links ambiguous. Keep occurrence IDs and write explicit lesson links.','Original learner dashboard counts are not editorial progress. Existing completion may be self-reported without evidence. The UI must distinguish those meanings.','',
'## Technical corrections and review queue',
'- CPU: clock frequency and logical CPU count do not determine application throughput. SMT shares resources; virtual topology may be synthetic.',
'- RAM: free RAM is not the same as available RAM; page cache is useful. ECC is fault detection/correction, not a backup. NUMA placement affects access latency.',
'- Storage: capacity, bandwidth, IOPS and latency differ; page cache can distort tests. Durability depends on the full flush/power-loss path.',
'- RAID and snapshots: neither substitutes for an independent, tested backup. RAID 0 provides no redundancy; RAID 10 tolerance depends on which mirror members fail.',
'- PCIe/NIC: slot length differs from negotiated lane width. Link-up alone does not prove IP reachability; virtual interfaces and offloads change observable counters/captures.',
'- Original capstone places SAN and Ethernet elements in one conceptual drawing. Explain FC fabric separation and actual attachment paths before treating it as a wiring design.',
'- IPv6 must use Neighbor Discovery rather than ARP; do not carry IPv4 broadcast assumptions into IPv6. Subnet host counts need /31 and /32 exceptions.',
'- TCP reliability is not application transaction success. ICMP failure does not prove a host is down. DNS commonly uses both UDP and TCP; NAT is not a security policy.',
'- VLAN, STP, EtherChannel and vPC are distinct mechanisms; explicitly cover loop prevention, peer failures and per-flow hashing limits.',
'- Cisco boot registers, image modes, recovery, routing features and security commands vary by platform and release. Do not generalize IOS procedures to IOS XE/NX-OS.',
'- Legacy platform families and protocols (2960/3750, Aironet, Nexus 5000/7000, FabricPath, DTP/VTP/PAgP, TFTP/FTP) need dated lifecycle/context checks; inclusion is not a current purchase recommendation.',
'- Existing certification cards explicitly describe approximate alignment. Verify current provider objectives before updating; do not imply exam coverage or certification from completion.',
'- VMware licensing, supported hardware and version features require current vendor verification in their batch. Avoid presenting trial or free-tier availability as permanent.',
'',
'## Missing curriculum and dependency decisions',
'- ADD-INFRA-001 infrastructure/client-server/dependency maps; ADD-INFRA-002 availability vs reliability, SLI/SLO/SLA and error budgets; ADD-INFRA-003 change control, incident response and evidence handling.',
'- ADD-LINUX-001 filesystems, permissions, users, sudo and packages; ADD-LINUX-002 processes, systemd, journald and scheduling; ADD-LINUX-003 mounts/LVM, pressure diagnostics and service recovery.',
'- ADD-APP-001 HTTP request lifecycle and proxies; ADD-APP-002 TLS trust/renewal and Nginx validation/rollback; ADD-APP-003 load balancing, health checks and connection pools.',
'- ADD-CONT-001 namespaces/cgroups/images and Docker/Compose; ADD-CONT-002 Kubernetes scheduling/network/storage/RBAC; ADD-CONT-003 deployment/debugging/backup and cluster upgrade practice.',
'- ADD-CLOUD-001 shared responsibility/IAM and cloud networking; ADD-CLOUD-002 compute/storage/availability-zone architecture; ADD-CLOUD-003 cost budgets, tagging, IaC and recovery.',
'- Add cross-domain capstones after networking, Linux/application delivery and observability. Explain TLS/DNS/time dependencies of identity and automation. Backup restoration must precede claims of disaster-recovery readiness.','',
'## Complete original hierarchy and per-node gap disposition',
'Every row below was extracted from the original DATA object. Initial disposition for every original node: inspected structurally, enrichment pending. Each topic requires its own mechanism, example, troubleshooting, security/performance, sources, practice and assessment. Repeated nodes are retained, not silently deduplicated.','']
for si,s in enumerate(d['originalData']['stages']):
    lines += [f"### Stage {si+1}: {s['title']}",f"Domain: {s['domain']}",f"Original purpose: {s['why']}",'']
    for g in [g for g in d['groups'] if g['stage']==si]:
        lines += [f"#### {g['id']} — {g['name']}",'| ID | Original topic | Existing content |','|---|---|---|']
        for n in [n for n in d['nodes'] if n.get('groupId')==g['id']]:
            existing='Named brief; expand and verify' if n['name'] in d['originalData']['briefs'] else 'Generic/heuristic brief; author full lesson'
            lines.append(f"| {n['id']} | {n['name']} | {existing} |")
        lines += ['']
    lines += [f"Stage lab `lab-{si}`: {s['lab']}",'Lab gap: add requirements, topology, exact steps, expected observations, fault/recovery, cleanup and evidence rubric.','']
for kind in ['device','hardware','trouble','capstone']:
    lines += ['### '+kind.title()+' track']+['- `'+n['id']+'` — '+n['name'] for n in d['nodes'] if n['kind']==kind]+['']
duplicates=defaultdict(list)
for n in d['nodes']: duplicates[n['name'].casefold()].append(n)
lines += ['## Exact duplicate topic occurrences','']
for ns in duplicates.values():
    if len(ns)>1: lines.append('- '+ns[0]['name']+': '+', '.join('`'+n['id']+'`' for n in ns))
lines += ['','Near-duplicates also need canonical linking: NIC/NICs, CPU/CPU architecture, STP/STP concepts, IPv6/IPv6 fundamentals, FEX/Cisco Fabric Extender, HBA/storage attachment, snapshots/templates and platform families. Keep introductory and operational treatments distinct.','', '## Supporting collections','Preserved in inventory: certification cards; capstone deliverables; diagnostic method; lab-environment HTML; capstone HTML/SVG. They are not silently counted as enriched lessons. Each item/diagram label also has its own stable supporting ID:','']
lines += ['- `'+n['id']+'` — '+n['name'] for n in d['supportingNodes']]
lines += ['','## Acceptance record','No topics were marked completed by the initial audit. The reviewed completion manifest records subsequent acceptance.']
lines += ['','## Networking Basics review','Batch 03 corrections and source scope are recorded in [docs/research-batch-03.md](docs/research-batch-03.md), with acceptance evidence in [docs/validation-batch-03.md](docs/validation-batch-03.md). Key distinctions: VLAN versus IP subnet; next-hop MAC versus endpoint IP; frame length versus IP MTU; IPv4 versus IPv6 fragmentation; capacity versus goodput versus delay; legacy duplex behavior versus modern PHY-specific rules. See the manifest for current editorial status.']
lines += ['','## Binary and Subnetting review','Batch 04 reviews all eight addressing nodes and the original foundation lab. [Source/correction ledger](docs/research-batch-04.md) and [acceptance evidence](docs/validation-batch-04.md) record strict parsing, /31-/32 semantics, IPv6 normalization, aligned VLSM and the executed isolated virtual LAN. The physical managed-switch variant remains explicitly unexecuted. The scheduled cross-course audit is recorded in docs/quality-audit-batch-04.json.']
lines += ['','## Protocols, switching and routing review','Batch 05 accepts 18 lessons with bounded protocol models and executed loopback transport, isolated VLAN and dual-stack routing labs. [Source ledger](docs/research-batch-05.md) and [acceptance evidence](docs/validation-batch-05.md) distinguish synthetic state from live behavior, prefix selection from delivery, stable STP roles from convergence and static IPv6 from automatic configuration. The additional cross-course audit is docs/quality-audit-batch-05.json.']
(R/'ROADMAP_CONTENT_AUDIT.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
print('Full audit written with every original node and group.')
