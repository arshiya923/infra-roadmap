# Gateway redundancy draft evidence

Scope: three Batch 10 original topics, `s3-g7-t0` HSRP, `s3-g7-t1` VRRP and `s3-g7-t2` GLBP. Source checks and development tests occurred on 2026-10-09. This assignment wrote only `staging/gateway-redundancy/**`.

Delivered: `lessons.json` (three full lesson objects), `model.js`, `model.test.cjs`, `style.css`, `model-results.json` and this record. `build-lessons.cjs` is the local reproducible authoring source for the JSON; the final MCQ option sets and readability normalization are applied before output. No shared content, loader, CSS, progress or repository file was edited.

Each lesson has exactly 10 multiple-choice exam items, 3 quick checks, 4 flow pairs, 4 guided read-only command objects, a glossary object and a scoped tabletop lab. Correct answers exactly match one option. Final distractors compare plausible protocol roles, defaults, identities, ownership or history rather than relying on unrelated filler. No question IDs are supplied; the primary bundle assignment is separate.

## Primary sources inspected

| Source | Bounded use |
| --- | --- |
| [Cisco IOS XE 17: Configuring HSRP](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ntw-servs/b-network-services/m_fhp-hsrp-0.html) | Active/standby, default priority 100, recovery/preemption, explicit tracking decrement, detailed/brief show commands, authentication distinctions. |
| [Cisco IOS XE 17: HSRP version 2](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ntw-servs/b-network-services/m_fhp-hsrp-v2.html) | v1/v2 multicast, group and MAC ranges, version mismatch and reinitialization. Only fixed v2 group 10 is implemented. |
| [Cisco HSRP FAQ](https://www.cisco.com/c/en/us/support/docs/ip/hot-standby-router-protocol-hsrp/9281-3.html) | Initial equal-priority real-IP tie and tracking/preempt interplay. |
| [Cisco HSRP common issues](https://www.cisco.com/c/en/us/support/docs/ip/hot-standby-router-protocol-hsrp/10583-62.html) | Both IPv4 versions use UDP 1985; version-specific multicast identities. |
| [RFC 9568](https://www.rfc-editor.org/rfc/rfc9568) | Current VRRPv3 specification superseding RFC 5798; nonowner 1–254/default 100, reserved owner 255, priority-zero relinquishing advertisement, default preemption and owner exception, active/backup behavior, IPv4 protocol 112/multicast/TTL, MAC format, Accept_Mode and lack of packet authentication. |
| [Cisco IOS XE 17: Configuring VRRP](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ntw-servs/b-network-services/m_fhp-vrrp-0.html) | Read-only `show vrrp brief` syntax. Older guide content is implementation context, not normative current-standard validation. |
| [Cisco IOS XE 17 FHRP VRRP guide](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr3-fwd/fhrp/fhrp-configuration-guide/vrrp.html) | `show vrrp detail` syntax and legacy MASTER display labels. No claim that every described release implements every RFC 9568 change. |
| [Cisco IOS 15M&T GLBP guide](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipapp_fhrp/configuration/15-mt/fhp-15-mt-book/Configuring-GLBP.html) | AVG versus AVF, ARP assignments, per-MAC takeover, scoped AVG preempt disabled versus AVF enabled/default 30 seconds, weighting versus priority, redirect/forwarder history and `show glbp`/`brief`. GLBP platform support is explicitly required rather than generalized to IOS XE 17. |
| [Cisco IOS XE 17 ARP guide](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-addressing/b-ip-addressing/m_arp-config-arp-0.html) | `show ip arp` inspection syntax; host cache evidence remains a distinct observer. |
| [Cisco protocol-independent command reference](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_pi/command/iri-cr-book/iri-cr-s1.html) | `show ip route` syntax and scoped routing-table observation. The initial ISR guide URL could not be opened; final lesson sources use this successfully inspected official command reference instead. |

HSRP configuration-range distinction: scoped IOS XE configuration guidance uses 1–255. The authorized worksheet accepts supplied checkpoint values 0–255 and calculates a configured tracking decrement with a floor of zero; it does not supply a configuration command for priority zero. Primary explicitly accepted this distinction. Actual packet validation, authentication, config parser support and tracking side effects are outside the model.

## Development commands and actual results

- `node ... tools/read-content.cjs ...` — read the existing authored inventory with a larger process output buffer. Confirmed prerequisite IDs `s2-g2-t0` VLAN, `s1-g4-t2` Static routes and `s1-g1-t1` ARP. VRRP and GLBP may depend on HSRP without cyclic prerequisites.
- `node staging/gateway-redundancy/build-lessons.cjs` — wrote the three JSON objects inside the assigned directory successfully.
- `node --check staging/gateway-redundancy/model.js` — exited successfully without syntax diagnostics.
- `node staging/gateway-redundancy/model.test.cjs` — PASS: 36 supplied scenarios and 687 independent cases, strict validation, mounted invalid-context/reset and lesson structure. Repeated after the final assessment/readability/source corrections; still PASS. Wrote only the assigned `model-results.json`.

The independent cases cover initial versus retained equal-priority history, both preemption settings, availability/system/uplink/return cross products, configured tracking and clamp boundaries, owner precedence, all supplied MAC-owner/host-assignment combinations and GLBP ARP/readiness gates. Tests reject malformed enums/booleans/numeric strings/fractions/nonfinite/out-of-range/missing/extra fields, inconsistent expiry and reserved VRRP ownership inputs.

Stub DOM tests mount each protocol, invalidate its scenario and confirm that later field edits do not expose stale results; invalid numeric/history inputs hide and clear dynamic results immediately. Reset restores the valid initial declaration. Dynamic text uses `textContent`. Tables have scoped header cells and named keyboard-focusable scroll regions. These tests do not substitute for a real browser's responsive layout, dark/light contrast, keyboard focus or screen-reader acceptance.

## Material limitations awaiting primary acceptance

HSRP and VRRP are two-router fixed-LAN settled-checkpoint contracts with explicit previous-active/failure declarations. They are not packet-driven timed state machines and do not resolve split-brain, partition or election-race history. System forwarding/upstream/return predicates are declarations and cannot prove traffic. VRRP does not implement priority-zero advertisements, checksum/TTL checks, Accept_Mode, IPv6, multiple owners or implementation-specific tracking.

GLBP consumes declared settled AVG and per-MAC owners, plus two supplied cached host assignments. It computes no election, vendor assignment algorithm, weighting threshold, packet scheduling, cache expiry, redirect time or forwarder timeout. Cached forwarding can retain prerequisites when new ARP answering is unavailable within that deliberately fixed contract. Declared handoff does not establish how or when a real protocol handoff happened.

The guided commands are read-only inspection examples, never executed on Cisco equipment by this assignment. No live failover, capture, packet-delivery, latency, convergence or application claim exists. Primary still owns integration, all design/review, real-browser acceptance and final verification.
