# Infrastructure Fieldbook

Current checkpoint: **457 accepted lessons** — 442 original nodes across Batches 01–28 and 15 separately counted expansion lessons across Batches 29–33. All 84 supporting items have individual editorial reviews. Learner study progress remains separate from acceptance.

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Visit http://127.0.0.1:8765/learn.html. There is no application build step or external CDN dependency. The reader also supports local file URLs.

## What is available

Every lesson provides teaching, mechanisms, a visual/static sequence, comparison, practical guidance, scoped lab, three quick checks and ten original exam questions. Written answers use self-assessment; multiple choice is automatically checked. Search includes unopened lessons through a generated word index.

The expansion covers service objectives and incidents, Linux operations, HTTP/TLS and proxies, containers/Kubernetes, and cloud architecture/cost controls. It adds 15 evidence desks, 150 exam questions and 45 quick checks. Original node IDs and the immutable source are preserved. Original study data uses `infra-path.progress.v1`; expansion checkmarks use `infra-path.expansion-progress.v1` so the original roadmap import/export remains compatible.

Open [supporting material](supporting.html) for certification planning, practice environments, the troubleshooting method and all capstone/diagram review notes. The [cross-domain workbook](labs/expansion-capstones.md) connects network/application, Linux/container and objective/recovery practice. The existing [capstone workbook](labs/capstone-workbook.md) contains all 15 engineering deliverables.

## Verification and evidence scope

See [final expansion verification](docs/validation-expansion-final.md) and the individual [Batch 29](docs/validation-batch-29.md), [30](docs/validation-batch-30.md), [31](docs/validation-batch-31.md), [32](docs/validation-batch-32.md) and [33](docs/validation-batch-33.md) records. Local companions execute owned-file restoration, ordinary-user Linux permission/process cases, loopback HTTP/TLS and one restricted cached-image container. Other vendor/cloud operations are guided or explicitly modelled; no production or cloud deployment is claimed.

Python companions use the standard library. Linux cases require an ordinary Linux user; TLS also requires OpenSSL. Container execution requires an owned Docker engine, Compose and an already cached nginx:alpine image, resolved to its local content ID; the exercise never pulls. Browser verification requires Playwright and Edge as documented below. A complete assistive-technology audit and current certification-objective alignment are not claimed.

## Maintenance

All planned batches are accepted. Read ROADMAP_ENRICHMENT_PROGRESS.md, ROADMAP_BATCH_PLAN.md and ROADMAP_DECISIONS.md before editing. content/enrichment.json is the editorial source of truth; content/expansion-inventory.json extends, and never rewrites, the original inventory. Supporting review status lives in content/supporting-review.json. Dated development notes below remain historical.

- `python tools/inventory.py` extracts the immutable source.
- `python tools/audit.py` renders the structural audit.
- `python tools/progress.py` validates assignment coverage and renders progress/plan files.
- `python tools/catalog.py` builds the lightweight browser catalog from reviewed status.
- `node tests/content.cjs` validates identities, source hash, lesson contracts and questions.
- `node tests/browser.cjs` runs browser checks against the local HTTP server. It requires Playwright in Node's module search path and Microsoft Edge. See docs/validation.md for the bundled runtime used in this environment.
- `node tests/browser-batch-02.cjs` checks cross-batch routing/search, Operating Systems lessons and the permission explorer.
- `node tests/browser-batch-03.cjs` checks Networking Basics, packet journey, calculator, keyboard controls and responsive layouts.
- `node tests/network-models.cjs` verifies packet fields and independent MTU/rate/delay arithmetic.
- `node tests/commands-batch-03.cjs` checks read-only network inspection and bounded loopback examples, recording physical-environment limits.
- `node tests/browser-batch-04.cjs` checks the addressing tools, lesson routes and lab download.
- `node tests/address-models.cjs` compares address calculations against independent Python references.
- `node tests/commands-batch-04.cjs` verifies the exact calculation/read-only examples.
- `node tests/foundation-lab.cjs` runs the isolated namespace LAN under WSL root and verifies recovery, cleanup and unchanged host network state.
- `node tests/quality-audit.cjs` performs the broader cross-course structure, prerequisite, contrast and local-loading audit.
- `node tests/commands.cjs` executes the reviewed read-only Windows examples and harmless Bash fixtures. It requires Windows PowerShell and Ubuntu-24.04 in WSL; it does not install or configure server roles.

Content bundles are plain JavaScript holding structured data, loaded on demand by batch even on file URLs. A later batch should add its bundle and manifest plan, regenerate the catalog, and reuse the components. Bundle discovery and navigation no longer require a per-batch reader rewrite.

## Scope of the labs

Most introductory labs use read-only observation or clearly labelled synthetic evidence. Batch 04 also includes `labs/foundation-lan.sh`, an explicitly isolated virtual LAN lab requiring Linux root/namespace support. Its default invocation shows help; `--run` creates temporary owned namespaces, tests a subnet fault/recovery and removes them. It does not attach to a host uplink or alter existing host network configuration. The RAID model and architecture failures are tabletop simulations. Do not interpret these as verified procedures for hot-swapping hardware, formatting disks, forcing RAID assembly or modifying a production network.

Batch 05 is accepted: eighteen lessons (OSI through IPv6 fundamentals), 180 exam questions, protocol/cache/lease/translation/switching/routing explorers and three executable labs. The Batch 05 acceptance snapshot records 49/442; that historical progress snapshot was 61/442. See docs/validation-batch-05.md for evidence. Run `node tests/browser-batch-05.cjs` to check these lessons.

`node tests/commands-batch-05.cjs` verifies the command allowlist for all eighteen lessons. `node tests/protocol-models.cjs` checks DNS cache boundaries; `node tests/service-models.cjs` checks lease states and translation tuples. `python tests/transport-lab.py` verifies real stream/datagram behaviour and cleanup after success and injected failure.

`node tests/vlan-lab.cjs` verifies isolated VLAN delivery, separation, missing trunk membership, recovery and unchanged host networking. The downloadable shell script must retain LF line endings.

`node tests/switching-models.cjs` checks stable triangle roles and complete MAC-learning replay snapshots. STP timing and live redundant switching are explicitly outside the model.

`node tests/routing-models.cjs` compares 1,546 route selections with Python ipaddress. `node tests/routing-lab.cjs` verifies dual-stack delivery, an IPv4 return-route fault, recovery, cleanup and unchanged host forwarding settings. Batch 07 Cisco authoring is in progress.

Batch 06 is accepted: eleven diagnostic topics and the integrated Networking Fundamentals Lab. `node tests/browser-batch-06.cjs`, `node tests/diagnostic-models.cjs` and `node tests/commands-batch-06.cjs` cover the reader, synthetic models and forty topic commands. `wsl -d Ubuntu-24.04 -u root -- python3 tests/network-fundamentals.py` verifies the four integrated commands, captured protocol fields, fault/recovery and cleanup. Traceroute 2.1.5 is installed and its bounded loopback command passes.

`wsl -d Ubuntu-24.04 -- python3 tests/dns-lab.py` verifies the loopback DNS fixture with installed BIND clients, including negative answers, timeout, explicit TCP, listener cleanup and unchanged resolver configuration. The downloadable script uses no external DNS service and does not install software.

`python tests/socket-lab.py` and `wsl -d Ubuntu-24.04 -- python3 tests/socket-lab.py` verify the owned socket experiment with Windows netstat and Linux ss respectively, including separate application exchange and failure cleanup. The October 4 build run stopped at the requested 30% weekly allowance; work resumed October 8 after the allowance reset, retaining that stopping limit. Batch 06 acceptance evidence is in docs/validation-batch-06.md.

`wsl -d Ubuntu-24.04 -- python3 tests/packet-fixture.py` validates the generated ten-packet PCAP with tcpdump/TShark. `node tests/packet-models.cjs` checks the browser inspector against its binary lengths/protocols. Capture commands read this synthetic file only; Wireshark desktop GUI and live-capture behavior are not claimed as tested.


### Latest accepted checkpoint - 2026-10-09

**Batches 01-07 complete: 82/442 accepted original lessons**, with 820 original exams and 246 quick checks. Batch 07 covers CLI/configuration, boot/recovery, VLAN/control and aggregation. Its 21 lessons satisfy the recorded [Topic and Batch acceptance matrix](docs/acceptance-batch-07.json). All 210 exams were reviewed, with 42 applied-question revisions; technical/lab and manual diagram reviews are saved separately.

`node tests/verify-batch-07.cjs` passes 21 suites, including all Batch 07 animation/static/connection routes, mobile active-step visibility, the full 82-route quality audit and accepted-state progress checks. Local hash auditing and isolated Linux VLAN delivery/fault/recovery/cleanup are verified. Cisco parser, firmware, boot/install/recovery, DTP/VTP, physical phone/QoS, aggregation, throughput and convergence remain guided or modeled, with no actual execution claimed. See [verification and limits](docs/validation-batch-07.md) and [source applicability](docs/research-batch-07.md).

**Historical next step: Batch 08, STP (`s2-g4-t0`)**, followed by edge protection, traffic mirroring and the integrated switching lab. `content/enrichment.json` and generated progress files are authoritative; learner self-reported study progress remains separate. Continue directly without GapCode. The build goal continues until weekly Codex allowance reaches 30% remaining.

### Historical Batch 08 drafts - 2026-10-09

STP, RSTP, MST, PortFast, BPDU Guard, Root Guard, Loop Guard, Storm Control, Port Security, SPAN and RSPAN are available: **93 authored, 82/442 accepted**, 930 exams and 279 quick checks. Exercises cover stable/control/guard evidence, thresholds, source persistence, local copy selection and declared remote mirror prerequisites, with scoped configuration/rollback, labs and ten original exams each. Model, focused browser and all-route audits pass within recorded scopes; Batch 08 acceptance and actual Cisco execution remain pending. Next authoring: ERSPAN. See [Batch 08 checkpoint](docs/validation-batch-08.md).

## Historical ERSPAN draft checkpoint · 2026-10-09

Batch 08 now has twelve reviewed drafts. The ERSPAN lesson includes an interactive collector/path worksheet, independent size-budget exercise and two downloadable offline synthetic fixture files. The 94 authored lessons contain 940 exams and 282 quick checks; accepted progress remains 82/442. Model, installed offline decoder, focused browser/download and all-route audit checks pass. Cisco configuration remains guided and unexecuted. Next: integrated Cisco Enterprise Networking Lab, then the full thirteen-unit Batch 08 acceptance review. See [validation evidence](docs/validation-batch-08.md) and [offline fixture results](docs/erspan-fixture-results.json).

## Batch 08 accepted · 2026-10-09

All thirteen original units pass the 22-item Topic matrix and thirteen Batch gates. The integrated Cisco lab preserves the original three-switch/VLAN/trunk/LACP/root/PortFast/BPDU Guard/link-failure scope with a mapped guided build, fault/restore and evidence notebook. Its browser worksheet separates stable topology, VLAN components, logical members, endpoint availability, mirror readiness and manually recorded service observations. No Cisco target was executed.

Thirty-one regression commands pass, along with accepted-state checks for all thirteen units and the broader 95-route audit. The batch adds 130 reviewed exams and 39 quick checks. Sixty vendor command blocks remain guided/unexecuted; two ERSPAN decoder blocks were actually verified against the supplied synthetic offline file. [Acceptance matrix](docs/acceptance-batch-08.json), [regression evidence](docs/batch-08-regression-results.json) and [broader audit](docs/quality-audit-batch-08.json) preserve the scope and limits. Next: Batch 09, starting with Static Routing.


## Historical Batch 09 first-topic checkpoint - 2026-10-09

Static Routing adds a candidate-installation/longest-prefix worksheet, eight cases, ten exams and three quick checks. Its two-router Linux runner actually verifies both directions, a more-specific discard, a missing return route, exact repair and owned cleanup; the existing dual-stack runner was also re-verified. Six IOS XE blocks remain guided and unexecuted. Model/actual Linux/browser evidence stays separate.

See docs/validation-batch-09.md and docs/review-batch-09.json. There are 96 authored lessons and 95 accepted original nodes; nineteen Batch 09 nodes remain to author. Next authoring: Floating Static Routes (s3-g0-t1). No Batch 10 advancement or full-course completion is claimed. No GapCode was used.


## Historical Batch 09 two-topic checkpoint - 2026-10-09

Floating Static Routes adds a parallel-path diagram and worksheet separating backup preference, route withdrawal, downstream health, static tracking and return readiness. Ten scenarios and 2,048 independent cases cover wrong/equal distances and AD 255 as well as normal/backup/restoration states. Entered service observations stay separate and changes clear old observations. Eight additional Cisco blocks remain guided/unexecuted; no live routing or IP SLA operation is claimed.

Current total: 97 authored lessons, 970 exams, 291 quick checks, 95 accepted original nodes. Eighteen Batch 09 nodes remain; next authoring is Policy-Based Routing (s3-g0-t2). See docs/validation-batch-09.md for current ten-command regression and scoped review. No GapCode was used.


## Historical Batch 09 three-topic checkpoint - 2026-10-09

Policy-Based Routing adds an ordered ACL/route-map trace, eleven cases, ten exams and three quick checks. Its 2,048 independent cases distinguish ACL deny skipping a classifier match, matched map deny returning to normal routing, later permit, ingress/local/target-specific fragment scope and separate path/return health. Seven additional vendor blocks remain guided/unexecuted; the actual IPv4 no-form detachment syntax was corrected during source review.

Current total: 98 authored lessons, 980 exams, 294 quick checks, 95 accepted original nodes. Seventeen Batch 09 nodes remain; next authoring is OSPF (s3-g1-t0). See docs/validation-batch-09.md for twelve-command regression and full 98-route audit. No GapCode was used.


## Historical Batch 09 four-topic checkpoint - 2026-10-09

OSPF adds a directed-cost three-router explorer, ten authored cases, ten exams and three quick checks. Its 1,536 independent cases distinguish shortest router paths, destination stub cost, both directions, equal-cost candidates, prefix withholding, RIB selection and downstream declarations. The actual separate two-router FRR lab passes twelve checks for package preparation, interface/neighbor/database/routes, bounded Hello capture, bidirectional ICMP, passive-transit failure, exact recovery and normal/early-failure isolation. Eight new Cisco blocks remain guided and unexecuted.

All fifteen regression commands and the broad 99-route audit pass. Ten screenshots and all thirteen OSPF questions were reviewed. Current total: 99 authored lessons, 990 exams, 297 quick checks and 95 accepted original nodes. Sixteen Batch 09 nodes remain; next authoring is OSPF Areas (s3-g1-t1). See docs/validation-batch-09.md and docs/review-batch-09.json. Full batch acceptance remains pending. No GapCode was used.

## Historical OSPF Areas lab groundwork - 2026-10-09

An actual three-router FRR lab now demonstrates separate area databases, ABR-originated type-3 reachability, inter-area versus intra-area routes, an area-mismatch fault and exact recovery. Standard ABR mode is explicitly configured; advertised /24 prefixes are not aggregated. Twelve lab checks cover actual protocol/route/ICMP evidence and normal plus three partial-start cleanup paths. See [reproduction and limits](docs/ospf-areas-runtime-foundation.md) and [actual lab results](docs/ospf-areas-lab-results.json).

This is groundwork for the pending OSPF Areas lesson. Totals remain 99 authored lessons, 990 exams, 297 quick checks and 95 accepted original nodes; four Batch 09 drafts are reviewed. Lesson authoring and full Batch 09 acceptance remain pending. No GapCode was used.

All sixteen current regression commands and the full 99-route audit pass; see [current validation](docs/validation-batch-09.md) for the evidence. The build goal continues with 75% of weekly allowance remaining.

## Batch 09 five-topic checkpoint - 2026-10-09

OSPF Areas now adds a two-area topology/reachability explorer, eleven scenarios, ten exams, three quick checks and the actual multi-area FRR lab. The lesson distinguishes area-local topology from ABR summaries, summary LSAs from aggregation and calculated routes from actual forwarding. Guided Cisco commands remain unexecuted.

All eighteen regression commands and the broad 100-route audit pass. Model coverage includes 3,072 independent graph cases; nine focused browser checks, twelve screenshots and all thirteen new questions were reviewed. Totals are 100 authored lessons, 1,000 exams, 300 quick checks and 95 accepted original nodes. Fifteen Batch 09 nodes remain; next authoring is DR/BDR. [Current validation](docs/validation-batch-09.md) and [review matrix](docs/review-batch-09.json) retain the evidence and scope. Full batch acceptance remains pending. No GapCode was used.

## DR/BDR lab groundwork - 2026-10-09

An actual four-router broadcast FRR lab now records staged election, a higher-priority nonpreempting arrival, normal DROther 2-Way, current DR network LSAs, direct peer forwarding/capture, BDR promotion and return after an owned attachment reset. Twelve independent checks include normal and four partial-start/capture cleanup paths. A passive-return trial that failed the proposed rejoining behavior is retained separately and excluded from main recovery proof. See [reproduction and limits](docs/ospf-dr-bdr-runtime-foundation.md) and [actual results](docs/ospf-dr-bdr-lab-results.json).

This is groundwork, not an authored DR/BDR lesson. Totals remain 100 authored lessons, 1,000 exams, 300 quick checks and 95 accepted original nodes, with five reviewed Batch 09 drafts. DR/BDR teaching content, visualization and questions are next. Full batch acceptance remains pending. No GapCode was used.

All nineteen current regression commands and the full 100-route audit pass. [Current validation](docs/validation-batch-09.md) records the tested scope. The persistent build goal continues with 73% of weekly allowance remaining.

## DR/BDR election explorer groundwork - 2026-10-09

The [working explorer](docs/ospf-dr-bdr-explorer.html) replays thirteen histories: arrival order, higher-priority late arrival, BDR promotion, attachment reset/rejoining, no-incumbent ties, zero priority and independent readiness failures. It distinguishes expected Full/2-Way relationships and current-DR network-LSA templates from actual CLI evidence. An independent per-router declaration oracle checks 19,469 event histories; four checkpoints also match the actual FRR interfaces, neighbor pairs and current network LSAs. [Contract and evidence](docs/ospf-dr-bdr-explorer-foundation.md) explain its settled-segment assumptions.

All twenty-one regression commands and the broad 100-route audit pass. Seven focused browser checks cover controls, invalid inputs, exact lab download, keyboard scrolling, mobile themes and direct-file execution. Nine screenshots were manually inspected. This preview does not add an authored lesson or questions: totals remain 100 lessons, 1,000 exams, 300 quick checks and 95 accepted nodes. DR/BDR prose, guided procedures, full reader integration and questions remain next; full Batch 09 acceptance is pending. No GapCode was used. Weekly allowance remains 73%.

## Batch 09 six-topic checkpoint - 2026-10-09

DR/BDR now integrates the history explorer and actual broadcast lab into the full draft, with election/adjacency/forwarding explanations, mechanism sequence, isolated guided procedures, ten exams and three quick checks. It distinguishes late arrival from initial-candidate ranking, BDR promotion from reranking, normal DROther 2-Way from a failed required adjacency, and control-plane roles from direct peer forwarding. Shared attachment labels avoid implying a router chain.

All twenty-one regression commands and the broad 101-route audit pass. The model has 19,469 independently checked histories, the actual broadcast lab has twelve checks, and nine focused lesson-browser checks plus twelve manually reviewed screenshots cover the integrated experience. Fourteen new command references retain twelve guided Cisco classifications and separate actual preparation/runtime evidence. [Current validation](docs/validation-batch-09.md) and [topic review](docs/review-batch-09.json) retain the evidence and limits.

Totals are 101 authored lessons, 1,010 exams, 303 quick checks and 95 accepted original nodes. Six Batch 09 drafts are reviewed; fourteen nodes remain. Next authoring: LSA basics (`s3-g1-t3`). Full Batch 09 acceptance remains pending. No GapCode was used; the build goal continues with 72% weekly allowance remaining.

## Historical Batch 09 seven-topic checkpoint - 2026-10-09

Original [OSPF LSA basics](learn.html#lesson=s3-g1-t3) integrates eighteen freshness cases and seven separate actual database views, a mechanism, scoped commands/labs, ten exams and three quick checks. Totals are 102 authored lessons, 1,020 exams, 306 quick checks and 95 accepted nodes. Seven drafts are reviewed; thirteen topics and full-batch gates remain pending. Next is OSPF troubleshooting.

The current regression contains 25 commands, including fresh actual labs and all 102 authored routes. The comparator independently checks 279,936 header pairs; nine browser checks and twelve manually inspected screenshots cover the integrated lesson. Snapshot fields and hashes are verified against raw reports. See [LSA contract and evidence](docs/ospf-lsa-foundation.md), [regression results](docs/batch-09-regression-results.json) and [checkpoint](docs/ospf-lsa-checkpoint-results.json). Header freshness does not validate a checksum, calculate routes or prove service. No GapCode was used.

## Historical OSPF troubleshooting groundwork - 2026-10-09

The [evidence preview](docs/ospf-troubleshooting-explorer.html) compares ten checkpoints from three separate actual experiments. The single-area lab adds forwarding-disabled and missing endpoint return-route faults: Full neighbors and installed OSPF paths persist while endpoint traffic fails; exact restoration recovers bounded bidirectional ICMP. Actual probe output and normal/four interrupted cleanup paths are retained. The preview keeps source hashes, raw records, named keyboard-scrolling regions and intervention-scoped feedback.

The current regression contains 28 commands, including seven evidence checks and six preview browser checks. All 102 authored routes remain in the broad audit. See [procedure and limits](docs/ospf-troubleshooting-foundation.md), [actual runtime](docs/ospf-routing-lab-results.json), [regression](docs/batch-09-regression-results.json) and [checkpoint](docs/ospf-troubleshooting-checkpoint-results.json). Full troubleshooting authoring remains pending; totals stay 102 lessons/1,020 exams/306 quick checks/95 accepted nodes. No GapCode was used.

## Historical Batch 09 eight-topic checkpoint - 2026-10-09

The [OSPF troubleshooting draft](learn.html#lesson=s3-g1-t4) separates neighbor formation, applicable LSDB/calculations, installed paths, forwarding and endpoint return. Ten preserved checkpoints retain source hashes and raw records from three separate actual experiments. The complete lesson includes its mechanism, scoped procedures, ten exams and three quick checks.

Current totals: **103 authored lessons, 1,030 exams, 309 quick checks and 95 accepted nodes**. Eight Batch 09 drafts are reviewed; twelve topics and full-batch gates remain pending. The 28-command regression covers all authored routes; seven evidence checks, nine integrated browser checks and twelve manually inspected screenshots cover the new lesson. Next: EIGRP (`s3-g2-t0`). See [validation](docs/validation-batch-09.md) and [lesson checkpoint](docs/ospf-troubleshooting-lesson-checkpoint-results.json). No GapCode was used.

## Historical EIGRP groundwork - 2026-10-09

The [distance worksheet](docs/eigrp-explorer.html) compares nine supplied-path cases using strict reported distance versus historical feasible distance. A separate [actual IPv4 EIGRP lab](docs/eigrp-runtime-foundation.md) retains neighbor/topology/selected-route/kernel evidence, original endpoint probes and protocol-88 startup capture. Recovery includes owned link restoration and explicit reinitialization of both owned daemons; unsupported interface settings and link-only recovery trials are retained as rejected evidence.

The 31-command regression covers all 103 authored routes. Twelve actual lab categories and five interrupted cleanup paths, 34,816 model combinations, six preview browser checks and five manually inspected screenshots support this groundwork. The complete EIGRP lesson remains next; totals stay 103 authored/95 accepted. No new questions or batch acceptance are claimed. See [checkpoint](docs/eigrp-groundwork-checkpoint-results.json). No GapCode was used.

## Historical EIGRP integrated draft — 2026-10-09

Open [the full EIGRP draft](learn.html#lesson=s3-g2-t0) or [standalone path worksheet](docs/eigrp-explorer.html). The course now has 104 authored lessons, 1,040 exams and 312 quick checks; 95 original nodes remain editorially accepted. Nine Batch 09 drafts are reviewed; eleven original topics and full-batch acceptance remain pending. EIGRP metrics is next.

[Current evidence](docs/eigrp-runtime-foundation.md) records 32 regression commands, seven integrated browser checks and the independent model/actual lab reports. The actual repair includes link restoration and both owned eigrpd restarts. Worksheet distances do not run DUAL or prove alternate-path switchover. Cisco blocks remain guided/unexecuted. Historical groundwork counts and reports are retained. No GapCode.

## Historical EIGRP metrics draft — 2026-10-09

Open [EIGRP metrics](learn.html#lesson=s3-g2-t1) or its [calculator](docs/eigrp-metrics-explorer.html). Totals: 105 authored lessons, 1,050 exams, 315 quick checks and 95 accepted original nodes. Ten routing drafts are reviewed; ten topics and full-batch acceptance remain pending. EIGRP neighbors is next.

[Metrics evidence and limits](docs/eigrp-metrics-foundation.md) records 34 regression commands, 19,600 independent arithmetic checks, eight browser categories, eleven inspected screenshots and [the checkpoint](docs/eigrp-metrics-checkpoint-results.json). The worksheet compares default-classic vectors and rounding; actual uniform-default reconciliation does not establish executed metric tuning or full FRR/wide parity. No GapCode.


## Historical EIGRP neighbors draft — 2026-10-09

Open [EIGRP neighbors](learn.html#lesson=s3-g2-t2) or the [evidence inspector](docs/eigrp-neighbors-explorer.html). Totals: 106 authored lessons, 1,060 exams, 318 quick checks and 95 accepted original nodes. Eleven routing drafts are reviewed; nine topics and full-batch acceptance remain pending. EIGRP topology is next.

[Neighbor evidence and limitations](docs/eigrp-neighbors-foundation.md) records 37 regression commands, 32 independently compared view/filter combinations, nine browser categories, eleven inspected screenshots and [the checkpoint](docs/eigrp-neighbors-checkpoint-results.json). Startup headers are separate from the selected later phase; missing INIT flags/timestamps and intermediate endpoint probes remain explicit. Actual recovery includes both owned daemon restarts. No GapCode.


## Historical BGP fundamentals integrated draft — 2026-10-09

BGP fundamentals now has complete original teaching, a four-step mechanism, the six-view/twelve-prefix actual-evidence inspector, scoped procedures and thirteen original assessments. Session, admission, attributes, selected RIB, kernel and original return-service remain separate; no full best-path, Cisco/application/hardware or convergence execution is claimed. Forty-four fresh sequential regression commands pass across all 108 authored lessons. Six BGP screenshots and all thirteen questions were inspected by the primary assistant.

Totals: 108 authored lessons, 1,080 exams, 324 quick checks and 95 accepted nodes. Thirteen Batch 09 drafts are reviewed; seven original topics and the full twenty-topic batch gates remain pending. Next authoring: eBGP (`s3-g3-t1`). The separate eBGP declaration worksheet has ten scenarios and 512 independently checked masks; its full lesson remains pending. No GapCode was used, following the current user instruction. See [BGP lesson checkpoint](docs/bgp-lesson-checkpoint-results.json) and [browser evidence](docs/browser-bgp-lesson-results.json).


## Historical eBGP integrated draft — 2026-10-09

The original eBGP topic now includes full teaching, four-step mechanism, ten supplied gate scenarios, scoped procedures and thirteen original assessments. Sender origin/export, receiver import/ordinary AS-loop rejection, next-hop resolution, system selection and original forward/return prerequisites remain separate. The512-mask model and focused integrated/standalone browser checks pass. Seven fresh targeted/shared-reader commands and the109-route audit pass. Six fresh screenshots and all thirteen questions were reviewed directly. The separate actual companion only tests its known origin withdrawal; no import/export/loop/multihop, Cisco/application/hardware or convergence execution is claimed.

Current totals:109 authored lessons,1,090 exams,327 quick checks and95 accepted nodes. Fourteen routing drafts are reviewed; six original Batch09 topics and all20 Batch10 units remain. Next authoring:iBGP (`s3-g3-t2`). No GapCode used. See [eBGP checkpoint](docs/ebgp-lesson-checkpoint-results.json) and [targeted regression](docs/ebgp-draft-regression-results.json).


## Historical iBGP integrated draft — 2026-10-09

The original iBGP topic now has full teaching, a labelled four-step mechanism, twelve supplied distribution/next-hop scenarios and thirteen original assessments. Ordinary relay, reflector client rules, unchanged AS_PATH, recipient NEXT_HOP resolution, BGP choice, system source and original forward/return declarations stay separate. Twelve scenario truth tables,256 role/session cases and32 resolution cases pass. Eight fresh targeted/shared-reader regression commands and the110-route audit pass. Seven fresh screenshots and all thirteen questions were reviewed directly. This is a declared browser/tabletop exercise; no actual iBGP/RR, full originator/cluster-loop history, path contest, physical/application or convergence execution is claimed.

Current totals:110 authored lessons,1,100 exams,330 quick checks and95 accepted nodes. Fifteen routing drafts are reviewed; five original Batch09 topics and all20 Batch10 units remain. Next authoring:BGP attributes (`s3-g3-t3`). No GapCode used. See [iBGP checkpoint](docs/ibgp-lesson-checkpoint-results.json) and [current regression](docs/ibgp-draft-regression-results.json).


## Batch09 accepted — 2026-10-09

All20 original routing topics are now reviewed and accepted. The course has115 accepted/authored lessons,1,150 exams and345 quick checks. Fifty-eight fresh regression commands pass. The five new BGP policy lessons add79 supplied scenarios,8,064 independent primary expectations and35 directly reviewed renders. Actual isolated routing fixtures and declared browser worksheets retain distinct scopes; target-router guidance is explicitly unexecuted. Native workers prepared bounded drafts and the primary reviewed and verified them. No GapCode used. Next:Batch10 route control, VRF, gateway redundancy, multicast, QoS and the advanced stage lab;20 original units remain. See [acceptance](docs/acceptance-batch-09.json) and [regression](docs/batch-09-regression-results.json).

## Batch10 accepted — 2026-10-09

All20 remaining advanced lessons are accepted, completing Advanced Routing & Switching. Fourteen regression commands and20,508 independent model expectations pass;200 exams/60 quick checks and40 visual review sheets were inspected. The guided Cisco workbook remains unexecuted. Course editorial progress is135/442; learner progress stays separate. Next:Batch11 (`s4-g0-t0`). See [acceptance](docs/acceptance-batch-10.json) and [validation](docs/validation-batch-10.md). Direct work followed the user instruction not to use GapCode.

## Network Services accepted · 2026-10-09

All 30 Batches 11/12 units are accepted, adding 300 reviewed exams and 90 quick checks. Nine regression commands pass, with independent model checks, all new browser routes, shared-reader checks and the 165-route audit. The original source hash and learner-progress boundary are preserved. Guided device/service procedures remain clearly separate from actual loopback fixtures. See [verification and limits](docs/validation-batch-12.md).

## Network Security accepted · 2026-10-09

All 33 Batches 13/14 units are accepted, adding 330 reviewed exams and 99 quick checks. Nine regression commands pass, including 70,093 independent model checks, all new reader routes, shared-reader regression, the 198-route audit and actual owned application denial/recovery with interrupted cleanup. The original seven-zone objective and source hash are preserved. Device configuration and vendor integrations remain guided; loopback application evidence has a separate scope. The user instructed direct work without GapCode. See [verification and limits](docs/validation-batch-14.md).

## Data Center Foundations accepted · 2026-10-09

All 44 Batches 15/16 units are accepted, adding 440 reviewed exams and 132 quick checks. Nine regression commands pass, including 68,178 independent calculation checks, all new routes, shared-reader regression, the 242-route audit and owned offline three-rack fault/restore/cleanup. Eleven inspected sheets contain 132 actual renders. The workbook preserves elevations, dual power, cooling, 57 cable records, capacity and protected OOB design. Physical, electrical, RAID and vendor management operations remain guided. Continue directly without GapCode. [Verification and limits](docs/validation-batch-16.md).

## Storage & Virtualization accepted · 2026-10-09

All 47 Batches 19–21 units are accepted, adding 470 exams and 141 quick checks. Six bounded models pass 6,718 checks. The integrated lab preserves two SAN switches, three hosts, redundant guest networking and shared storage; 24,619 checks cover synthetic topology/placement and actual owned file corruption/restore/cleanup. All 47 reader routes and the 321-route course audit pass. Real SAN and hypervisor operations remain guided and unexecuted. No GapCode was used. See [verification and limits](docs/validation-batch-21.md).


## Automation & Infrastructure Architecture accepted — 2026-10-09

All 62 original units now include full teaching, 620 exams and 186 quick checks. Five scoped interactive models, eight executable Python examples, topic workbooks and an integrated local architecture rehearsal cover validation, rendering, no-op repetition, stale-baseline rejection and exact rollback. External platform deployment remains guided. See [Batch 24 verification](docs/validation-batch-24.md) and the [enterprise architecture workbook](labs/automation-architecture.md).


## Cisco Device Mastery accepted — 2026-10-09

All 17 device-family lessons are complete within their authored, worksheet and guided-lab scopes: 170 original exams, 51 quick checks, 17 incident rehearsals and a downloadable evidence workbook. The 508 model/content checks, 17-route browser suite and full-course route audit pass. Six visually inspected sheets contain 51 actual renders. Cisco target configuration, forwarding, power, RF, failover and SAN I/O remain guided and unexecuted. Work was performed directly without GapCode. See [verification and limits](docs/validation-batch-25.md).


## Troubleshooting Mastery accepted — 2026-10-09

Batch 27 is complete within its documented teaching and lab scope: 21 original lessons, 210 self-assessed exam questions, 63 quick checks, 21 staged synthetic incident cases and the eight-step diagnostic method. The standalone local lab verifies actual temporary-file fault detection, recovery and interrupted-run cleanup. Vendor and physical repairs remain guided, not executed. Open [Troubleshooting Mastery](learn.html#lesson=trouble-0) and see [verification and limits](docs/validation-batch-27.md). No GapCode was used.

## Capstone accepted — 2026-10-09

The [Enterprise Data Center Architecture Capstone](learn.html#lesson=capstone-final) is complete: all 15 original design deliverables, an interactive capacity/recovery worksheet, four incident cases, 10 exams and three quick checks. The [workbook](labs/capstone-workbook.md) includes the design defense rubric; the local SQLite lab verifies backup, corruption, restore, acknowledged-data loss and cleanup. Target deployment remains guided. See [verification and limits](docs/validation-batch-28.md). This acceptance covers Batch 28 only and preserves concurrent batch work. No GapCode was used.
