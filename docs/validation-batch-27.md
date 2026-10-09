# Batch 27 — Troubleshooting Mastery

Scope: all 21 original `trouble-0` through `trouble-20` IDs. The primary assistant authored and reviewed this batch directly at the user's request, without GapCode. Editorial acceptance is recorded in `content/enrichment.json` after the checks below pass; learner study checkmarks remain independent.

## Delivered curriculum

Each topic has a diagnostic boundary, technical mechanism, comparison table, four-step visual with static equivalent, distinct baseline/fault/test/recovery case, competing hypothesis, guarded remediation and rollback guidance, practical lab record, sources, glossary, three quick checks and ten original self-assessed exam questions. There are 210 exams and 63 quick checks. The shared workbook also develops all eight original diagnostic-method steps without changing the immutable source inventory.

Coverage includes carrier, interface and CRC counters, legacy duplex mismatch, VLANs, STP, aggregation, bidirectional routing, OSPF, BGP policy, DHCP relay, DNS caching, NAT state, ordered ACLs, stateful firewalls, WLAN client stages, server power redundancy, RAID recovery, SAN paths, VMware storage dependencies and shared-dependency outage analysis.

The staged incident desk uses native keyboard-operable controls, explicit synthetic-evidence labels, a prediction field, hidden reasoning and a complete static case record. Reset clears the prediction and returns to the baseline. The existing reader supplies quizzes, command copy, original-node navigation, themes and learner persistence.

## Verification and evidence

Run from the course root:

```powershell
python tools/build-troubleshooting.py
python tools/catalog.py
python tools/progress.py
node tests/content.cjs
python tests/troubleshooting-lab.py
node tests/browser-troubleshooting-mastery.cjs
node tests/quality-audit.cjs
```

Browser tests require the existing Playwright installation, Microsoft Edge and the local course server at `127.0.0.1:8765`. The README describes serving the static course. No application build step is needed.

| Evidence | Scope |
|---|---|
| [Focused browser results](browser-troubleshooting-mastery-results.json) | All 21 routes; 273 model-answer interactions; three case states; reveal/reset; keyboard controls; flow/reset/reduced motion; command copy; separate study/editorial state; exact download contents; direct-file loading; source-independent search; no page exceptions or failed local responses. |
| Same focused report | Widths 1440, 768, 390 and 320 in both themes; unique DOM IDs and labelled form controls. This is automated local Edge coverage, not a complete assistive-technology certification. |
| [Local lab results](troubleshooting-lab-results.json) | Actual temporary-file baseline, intentional wrong port, independent content/hash detection, byte restoration and owned-directory cleanup. Normal and interrupted paths pass. All 21 inspector topics work from a standalone downloaded script; invalid inputs are rejected. |
| [Course audit](quality-audit-latest.json) | Authored route structure, prerequisites, adjacent original-node navigation, core contrast tokens and local search. This shared report can be refreshed by later work. |
| `tests/content.cjs` | Original source SHA-256, all 442 identities and assignments, lesson/question contracts, local artifact existence and catalog consistency. |
| [Screenshots](screenshots/troubleshooting/) | Desktop, narrow dark-theme incident desks and flows for physical links, OSPF, wireless and outage analysis; inspected by the primary assistant. |

Review corrected inherited references to widgets that are not part of these lessons, scoped the CRC lesson independently from duplex, clarified the STP fault's unprotected attachment, and retained a complete static alternative for every staged case.

## Research and source limitations

[Source reachability records](troubleshooting-source-checks.json) distinguish actual HTTP results from technical review. The direct check obtained 28 successful responses from 58 unique references; 29 requests were refused with HTTP 403 and one returned HTTP 503. These are recorded access limitations, not proof that the pages are missing. The browser research service could read the official Cisco STP and wireless pages, Dell PowerEdge guide and Broadcom APD article despite direct-client refusals. Earlier foundation references retain their original check dates.

New references include [Cisco STP troubleshooting](https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/28943-170.html), [Cisco WLAN client states](https://www.cisco.com/c/en/us/support/docs/wireless/5508-wireless-controller/200072-Cheat-Sheet-Common-Wireless-issues.html), [Dell's PowerEdge troubleshooting guide](https://dl.dell.com/topicspdf/troubleshootingguide_en-us.pdf), [Broadcom APD guidance](https://knowledge.broadcom.com/external/article/318938/esxi-hosts-in-all-paths-down-apd-conditi.html), and [Google SRE incident response](https://sre.google/workbook/incident-response/). Older vendor examples are scoped to their media/platform context; they are not blanket configuration instructions for current devices.

## Acceptance limits

The 21 incident records are authored synthetic exercises, not captured faults. The actual executable lab proves local-file detection and recovery only. Optional Linux/vendor inspection commands are labelled guided and were not executed as platform verification for this batch. No physical cable/optic, switch, wireless controller, RAID, SAN or ESXi repair, production failover, throughput or convergence measurement is claimed.

Acceptance covers the delivered teaching, static and interactive cases, assessments and isolated local lab. It does not certify a learner's mastery, complete other batches, or imply real-device qualification. The user's explicit request authorized Batch 27 out of the normal sequence; only its own IDs are promoted here.
