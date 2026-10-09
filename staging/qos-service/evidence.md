# Bounded QoS service draft evidence

Checked 2026-10-09. Implementation edits are confined to `staging/qos-service/`. The parent owns planning, review, integration and browser acceptance. Gateway and BGP staging were read only where needed; their handoffs remain frozen.

## Deliverables and declared contracts

- `lessons.json`: Batch10 s3-g9-t0, t3, t4 and t5. Each has the existing 30-key structured schema, 10 multiple-choice exams with four unique exact options, three short-answer quick checks, four flow pairs, three-column comparisons, four guided read-only command groups, glossary object and shared scoped tabletop lab.
- `model.js`: CommonJS and browser `window.QosServiceModels`. Public `catalog(kind)`, fresh `preset(kind,id)`, pure `evaluate(kind,state)`, `html(kind)`, `mount(kind)`. `fields(kind)` also exposes control metadata. Kinds are qos-fundamentals, policing, shaping and queuing; required IDs use qf/qp/qs/qq.
- `style.css`: scoped worksheet controls, responsive layout, named keyboard-focusable `.en-scroll` result region.
- `model.test.cjs`: independent manually derived examples, boundary and class-order matrices, strict rejection, immutability, stub-DOM rendering/reset and content-shape checks.
- `build-lessons.cjs`: reproducible local content authoring source; parent may integrate the JSON directly.
- `model-results.json`: actual local test summary, not a Linux target report.

Fundamentals adds three declared integer bit rates, computes offered utilization and positive overload, and independently calculates one packet serialization. It assigns no automatic priority or SLA.

Policing is a chosen initially full single-rate single bucket with two outcomes. Ideal refill uses R/8000 bytes per millisecond; conform consumes the complete size and excess drops without consumption. B is a byte cap, so a packet larger than B cannot conform. It is explicitly not RFC2697 srTCM or a universal vendor algorithm.

Shaping uses the same bucket with FIFO ideal waiting and an infinite buffer for finite input. It reports token-eligible release, queue wait and separate standalone C-based serialization. It never silently adds serialization to eligibility. Packets larger than B explicitly drop under the no-fragment/no-oversized-exception teaching contract. This exception policy is not attributed to Linux TBF or all hardware.

Queuing has at most eight declared packets, two supplied classes and one nonpreemptive ideal link server. FIFO uses arrival/input order; strict priority chooses already-arrived H before L at each free instant. Finite completion does not establish a bound for arbitrary future high-priority arrivals. WFQ, DRR, packet WRR and vendor LLQ are not implemented.

Every model treats original application readiness as a separate boolean declaration. No arithmetic asserts observed delivery, installed policy, application latency or end-to-end service.

## Primary-source ledger

| Source checked | Supported scope | Implementation boundary |
|---|---|---|
| [RFC 3290](https://www.rfc-editor.org/rfc/rfc3290), terminology, sections 5–7 and Appendix A | Conceptual meters/actions/queues/schedulers; strict-priority and weighted sharing distinction; token bucket discussion. Section 7 and scheduler examples discuss protecting lower classes against starvation. | Informational management model, not a normative emulation specification. The local exact arithmetic and finite workloads are authored teaching contracts. |
| [RFC 2474](https://www.rfc-editor.org/rfc/rfc2474), section 3 | Six-bit DSCP and policy-based per-hop treatment. | Codepoint does not supply capacity, authenticate a flow or guarantee an application result. The old CU wording is interpreted with RFC 3168 below. |
| [RFC 3168](https://www.rfc-editor.org/rfc/rfc3168), section 5, Figures 1–2 | Two-bit ECN field distinct from six-bit DSCP. | No ECN marking, negotiation, response or transport simulation. No historical ECN nonce claim is imported. |
| [RFC 2697](https://www.rfc-editor.org/rfc/rfc2697), sections 2–3 | Single-rate three-color marker has C/E buckets and green/yellow/red behavior. | Comparison only; the worksheet implements one bucket/two outcomes and cannot be labeled srTCM. |
| [iproute2 v6.6.0 tc.8](https://github.com/iproute2/iproute2/blob/v6.6.0/man/man8/tc.8), synopsis and options | qdisc/class/filter show dev DEV; -s statistics and -d details; hierarchy context. | Syntax reference pinned to v6.6.0. No installed Linux version, actual counters, interface or namespace was exercised. |
| [iproute2 v6.6.0 tc-tbf.8](https://github.com/iproute2/iproute2/blob/v6.6.0/man/man8/tc-tbf.8), description and parameters | Token-bucket qdisc with rate, burst, limits/latency and implementation considerations. | Comparison only. Its historical clock discussion is not generalized into a claim about every current kernel. No TBF clock, buffer, peakrate, overhead or device emulation. |
| [iproute2 v6.6.0 tc-prio.8](https://github.com/iproute2/iproute2/blob/v6.6.0/man/man8/tc-prio.8), description/algorithm | Priority bands and work-conserving scheduler behavior, child disciplines separately scoped. | Two-class worksheet is not the complete Linux three-band/filter/child-qdisc implementation. |
| [iproute2 v6.6.0 tc-drr.8](https://github.com/iproute2/iproute2/blob/v6.6.0/man/man8/tc-drr.8), algorithm and quantum | Deficit counters compared with packet size; quantum expressed in bytes. | Prose fairness contrast only; no DRR execution or inferred weights. |

The kernel.org pinned manual URL could not be retrieved by the web tool; the official iproute2 repository’s v6.6.0 GitHub mirror supplied the pinned upstream files. No secondary tutorial was used as a protocol authority.

## Actual local commands and results

1. `node staging/qos-service/build-lessons.cjs` — completed with exit 0; writes only its local lessons.json.
2. `node -e` catalog/evaluate smoke check across all supplied cases — completed with exit 0, eight presets per kind.
3. Initial `node staging/qos-service/model.test.cjs` — completed with exit 0: 32 presets and 303 independent cases. Primary review subsequently found the exact-boundary defect recorded below; this initial result did not cover that defect.
4. After adding the reported tenths-refill regression, `node staging/qos-service/model.test.cjs` failed with exit 1: the packet at 10 ms incorrectly dropped instead of conforming. This established the original symptom before repair.
5. After exact-state repair, `node staging/qos-service/model.test.cjs` completed with exit 0: `PASS: 32 presets; 309 independent cases; strict input and mounted reset checks; four lesson structures and narrative minimums.`
6. `node --check staging/qos-service/model.js` and `node --check staging/qos-service/model.test.cjs` each completed with exit 0.

Narrative word checks recursively count definition/purpose/mental/components/mechanism/flow/comparison/example/ports/configuration/production/troubleshooting/security/performance/mistakes/lab/glossary values. They exclude exams, quick questions, source metadata, command objects, IDs and titles. All four exceed 1000 words; precise counts are in model-results.json.

Manually expected core examples:

- Fundamentals: 6 Mb/s demand against 10 Mb/s gives 60%; a 1500-byte packet serializes in 1.2 ms.
- Policing R = 8000 bps, B = 1000 B with (0 ms, 600 B), (0 ms, 600 B), (200 ms, 500 B): conform/drop/conform and balances 400/400/100 bytes.
- Shaping same input: token releases 0/200/700 ms, waits 0/200/500 ms. At R = 3000 bps after a full-bucket packet, subsequent 1 B and 2 B release at 8/3 and 8 ms.
- Queuing baseline C = 8000 bps: FIFO order 1/2/3; strict priority 1/3/2. The L packet already in service is never interrupted. An H arriving at 1 ms after a 1000 B L starts waits 999 ms.

Tests also cover exact equality, one-byte deficit, idle refill caps, oversized packets preserving credit, fractional rates, line capacity independence, future H eligibility, finish-boundary arrivals, same-arrival permutations, extra/missing fields, NaN/infinities/fractions/coercion, unsupported enums, packet limits/order, inert injected text, Reset and invalid scenario staying hidden through subsequent field edits.

## Exact arithmetic repair after primary review

The original policing implementation accumulated fractional Number byte credits. With R = 800 bps, B = 1 byte and one-byte packets at every integer millisecond from 0 through 10, ten refills of 0.1 byte left a floating value just below 1. The exact mathematical boundary packet wrongly dropped. The added regression failed before the repair and now requires the complete expected decision list, before credit exactly 1 and after credit exactly 0; it uses no eligibility tolerance.

Policing and shaping now retain credit as BigInt units of byte × 8000, with cap B × 8000 and packet cost bytes × 8000. Time checkpoints use BigInt work units of milliseconds × R. Integer arrival work and packet deficits therefore give exact rational shaping eligibility under the fixed rate. Refill, saturation, comparison, token consumption and FIFO checkpoint decisions all occur before Number conversion. Shaping computes wait from exact work differences, preserving tiny relative waits even when absolute timestamps are large. Oversized drops retain the same stated local contract.

Queuing likewise retains arrival, start and finish work in BigInt milliseconds × C. Packet service costs bytes × 8000 work units. Candidate eligibility uses exact arrival-work comparison at every free instant, and wait/sojourn use exact differences before output conversion. A regression whose first three durations are 0.3, 0.6 and 0.1 ms now admits H arriving at exactly 1 ms before the already waiting fourth L packet. This tests a scheduling decision, not only a display tolerance.

Additional strict regression oracles cover capped refill with rate × elapsed products beyond Number's exact integer range, shaping releases 0, 8/3, 16/3 and exactly 8 ms, zero wait at the rational refill boundary, and separately preserved tiny shaping/queue waits at arrival 1,000,000,000 ms. Public result properties remain ordinary numbers and strings; JSON serialization tests verify no BigInt internal state leaks. Absolute fractional numeric displays remain rounded representations of rational values, and the UI still rounds to six decimal places. Those displays never feed back into eligibility or state decisions.

The DOM test is an explicit minimal stub: it checks event handlers, hiding/clearing, textContent, header scope and static named scroll attributes. It is not real-browser keyboard, viewport or assistive-technology acceptance. Parent review must validate actual rendering after integration.

## Substantive limitations for primary review

No Linux command, interface mutation, target packet, traffic generator, live scheduler, receiver transaction, clock measurement or kernel test occurred. Guided command expected fields identify what a learner should inspect in an already prepared owned context; they contain no fabricated output. QOS_DEV must be mapped externally, and parent/ingress/namespace context may need additional read-only inspection.

The inputs use ideal integer declarations, finite workloads, continuous token arithmetic and an abstract one-server serializer. No classification execution, metadata parsing, overhead, AQM, finite-buffer loss, driver/offload behavior, weighted scheduler, starvation measurement, route discovery or service guarantee is supplied. Exact version support and operational conclusions require actual target evidence.

Prerequisites use inventory foundation IDs for fundamentals and backward QoS dependencies for later lessons. t1/t2 are assigned to a separate worker and must exist at integration; this draft creates no dependency cycle. Parent retains responsibility for all 52 assessment reviews, source reconciliation, integration and final browser acceptance.
