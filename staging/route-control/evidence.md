# Route-control Batch10 draft evidence

All authored files remain under `staging/route-control/`. No shared content, script, style, integration or earlier lesson files were edited.

## Delivered contract

`lessons.json` has five full-schema lessons: s3-g5-t0 Route filtering, t1 Route redistribution, t2 Route maps, t3 Prefix lists and t4 Access lists; all batch10. Each has exactly ten MCQs with four unique topic-specific options, exactly one matching answer and a concise question-specific explanation; three quick checks, four flow pairs, four guided read-only command groups, an object glossary and a complete scoped tabletop lab. Correct option positions rotate. Narrative word counts excluding assessments/commands/sources were 1179, 1149, 1159, 1105 and 1191 before minor readability spacing; all exceed800. New-node prerequisites point only backward in the group.

`model.js` exports window.RouteControlModels and CommonJS with catalog(kind), preset(kind,id), evaluate(kind,input), html(kind), mount(kind) and fields(kind). There are 53 meaningful supplied cases across five scopes, including four intentionally malformed prefix/address presets. UI IDs use rf, rd, rm, pl and acl prefixes with tool/case/output/error/reset hooks, en-tool, named keyboard-focusable en-scroll regions, native reset buttons and immediate input listeners. Dynamic content uses textContent. Unknown scenario stays hidden across subsequent edits; malformed inputs clear trace rows and hide output until valid/reset.

## Primary references reviewed on 2026-10-09

- [FRR stable8.4 Filtering](https://docs.frrouting.org/en/stable-8.4/filter.html): exact match without ge/le, inclusive ranges, ordered first-match behavior and show ip prefix-list inspection syntax. Prefix decisions require both containment and length.
- [FRR stable8.4 Route Maps](https://docs.frrouting.org/en/stable-8.4/routemap.html): match/action distinction, ordinary matching permit/deny, implicit final deny, LOCAL_PREF set, tag match/set and show route-map. The model implements simple prefix-list matches and default exits only; call/continue/goto and arbitrary logical matching are excluded.
- [FRR stable8.4 BGP](https://docs.frrouting.org/en/stable-8.4/bgp.html): address-family context and BGP table/summary inspection. The filtering scope separates import candidate visibility from export advertisement; no complete BGP selection algorithm is run.
- [FRR stable8.4 OSPFv2](https://docs.frrouting.org/en/stable-8.4/ospfd.html): redistribution metric range0–16777214, metric/type/filter context and external database inspection. Explicit seed presence is a design requirement of this worksheet, not a universal claim about protocol defaults.
- [FRR stable8.4 Zebra](https://docs.frrouting.org/en/stable-8.4/zebra.html): exact-prefix system route inspection, distinct from protocol and original service evidence.
- [Cisco IOS XE17.x ACL overview](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-access-list-ov-0.html): ordered packet rules, standard source scope, extended packet fields, wildcard-bit matching and consumer/attachment distinctions. Noncontiguous wildcard0.0.254.255 is modeled with bit equality, not contiguous subnet conversion.
- [Cisco IOS XE16.12.x ACL creation/attachment](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/sec_data_acl/configuration/xe-16-12/sec-data-acl-xe-16-12-book/sec-create-ip-apply.html): relevant ACL inspection and attachment; real empty/missing lists differ from this nonempty fixed scope.
- [Cisco IOS XE prefix-list examples](https://netascode.cisco.com/docs/data_models/iosxe/device/prefix_list/): ge/le and a default-only entry.
- [Cisco IOS security command reference](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/security/s1/sec-s1-cr-book/sec-cr-s4.html) and [protocol-independent command reference](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_pi/command/iri-cr-book/iri-cr-s1.html): show ip access-lists, show ip interface and show ip route inspection context.

Every lesson command group is labeled GUIDED NOT EXECUTED. No FRR or Cisco command was run on a network target.

## Executed checks

`node --check staging/route-control/model.js` exited0.

`node --test staging/route-control/model.test.cjs` exited0: ten test groups, ten pass, zero fail. Independent literal preset tables verify substantive outputs rather than deriving expected answers from model constants. Exhaustive checks cover256 filtering gate combinations,64 redistribution admission/feedback combinations, all default/all prefix lengths0–32, exact/children length boundaries24–32, ordered deny and later child permit, route-map explicit denial versus referenced-list nonmatch, standard/extended packet distinctions,1024 noncontiguous wildcard third/last-octet combinations, strict canonical parsing and no-coercion schemas, outcome separation, lesson counts/answers/narrative/prerequisite constraints, and mocked DOM invalid-context/input/reset behavior.

## Limits for primary acceptance

No actual browser layout, theme, screen-width, native keyboard, assistive-technology or application transaction verification occurred in this worker. Mock DOM checks validate event/output logic only. The primary assistant owns review, actual browser acceptance and integration. The worksheets are fixed postpolicy declarations, not universal policy parsers, running protocols or packet tools. Tags are scoped administrative guards without authentication or universal loop-proof claims; metrics are target-context values without numeric cross-protocol conversion. ACL route-policy semantics, IPv6, fragments, stateful inspection, time ranges, arbitrary policy strings and full best-path/convergence execution are excluded.
