# VRF and VRF-Lite bounded worker evidence

Stable staged implementation for primary review/integration. Writes are limited to `staging/vrf-scope/`; the earlier MED draft and shared files were not edited in this assignment. No worker delegation or live network provisioning occurred.

## Files and API

- `lessons.json`: two plain full-schema lesson objects, IDs `s3-g6-t0` and `s3-g6-t1`, batch10. Each has exactly 10 MCQs, three quick checks, four flow pairs, four guided read-only command groups, glossary object and full tabletop lab. Artifacts are empty arrays. Question/topic IDs are left for bundle integration.
- `model.js`: CommonJS and `window.VrfScopeModels`; `catalog(kind)`, `preset(kind,id)`, `evaluate(kind,input)`, `html(kind)`, `mount(kind)`, plus `fields(kind)`. Supported kinds are `vrf` and `vrf-lite`. DOM prefixes are `vf` and `vl`, with tool/case/output/error/reset integration IDs.
- `style.css`: locally named `en-scroll` table regions with labels and tabindex0, local overflow, `en-tool` integration and scoped focus/hidden styles.
- `model.test.cjs`: independent authored inventories and outcome cases, strict invalid-input tests, fake-DOM textContent/reset/stale-hiding contracts, schema/count/assessment/dependency checks.

## Fresh execution results

Executed in the Windows workspace:

```
node staging/vrf-scope/model.test.cjs
node --check staging/vrf-scope/model.js
node --check staging/vrf-scope/model.test.cjs
```

All returned exit0. Test output:

```
VRF scope independent assertions: 607 passed; 18 VRF presets, 20 VRF-Lite presets, explicit leak truth cases, strict invalid-input and fake-DOM contracts; two full-schema lessons with 20 MCQs/6 quick checks. No live FRR/Linux/Cisco or browser-layout execution.
```

Dependency tests check every prerequisite/related ID against `content/roadmap-inventory.json`, verify prerequisite content exists in already-authored bundles or the preceding staged VRF lesson, and traverse prerequisite edges to reject cycles. Primary review caught an initially guessed `s3-g6-t2` related ID; both lessons now use valid `s3-g5-t1` as their redistribution relation. MCQs have four distinct topic-specific choices and one exact answer match each.

## Primary sources checked 2026-10-09

1. [Linux kernel6.6 VRF documentation](https://www.kernel.org/doc/html/v6.6/networking/vrf.html): Linux VRF device/table and l3mdev-rule scope, higher-priority policy-rule possibility, terminal unreachable default example, interface membership and scoped inspection. Verified exact read-only forms: `ip -d link show type vrf`, `ip link show master NAME`, `ip route show vrf NAME`, `ip route show table ID`, and `ip route get ADDRESS vrf NAME`. The lessons use discovered names rather than inventing live table identifiers. No setup commands were executed.
2. [iproute2 v6.6.0 ip-rule manual](https://github.com/iproute2/iproute2/blob/v6.6.0/man/man8/ip-rule.8): `ip rule show` lists rules. This exact primary source supports rule inspection without configuration or cache flushing.
3. [FRR stable8.4 Zebra VRF guide](https://docs.frrouting.org/en/stable-8.4/zebra.html#virtual-routing-and-forwarding): ordinary Linux VRF-device backend versus Zebra `-n` namespace backend, read-only `show ip route vrf NAME` and `show ip nht vrf NAME`. Guide explicitly warns that Linux table misses can proceed to another applicable rule without an appropriate terminal default. The worksheets' no-borrow behavior is therefore declared policy, not a claimed universal Linux property. No FRR daemon or parser was run.
4. [FRR stable8.4 BGP VRF route leaking](https://docs.frrouting.org/en/stable-8.4/bgp.html#vrf-route-leaking): explicit configured leaking uses a real implementation/control-plane mechanism. The chosen-prefix permission checkbox does not run `import vrf`, VPN RIB, RD/RT or BGP logic. Candidate permission and target next-hop/source declarations are separate.
5. [Cisco Catalyst9600 IOS XE17.17.x VRF-Lite guide](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9600/software/release/17-17/configuration_guide/rtng/b_1717_rtng_9600_cg/configuring_vrf_lite.html): input-interface context, separate overlapping routing domains, logical Layer3 attachments and shared physical VLAN transport. Verified `show vrf definition interfaces`, `show ip route vrf NAME` and `show ip arp vrf NAME`. Its local CE lookup is distinct from the optional provider MPLS backbone it also discusses. The model's abstract blue-dot10/red-dot20 labels do not assert Catalyst router-subinterface support.
6. [Cisco Catalyst9600 IOS XE17.17.x VLAN trunk guide](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9600/software/release/17-17/configuration_guide/vlan/b_1717_vlan_9600_cg/configuring_vlan_trunks.html): verified `show interfaces INTERFACE trunk` and target-specific native/tag/allowed VLAN considerations. The example port must be mapped to an existing owned target interface. No trunk changes ran.

## Model boundaries and evidence limits

- BLUE, RED and default own independent overlapping10.10.0.0/24 candidates. BLUE/RED gateways share numeric10.10.0.1 but have separate context ownership. Native next hops and selected sources are independently declared.
- Actual declared L3 binding supplies the table context before destination query. A known wrong binding remains visible as its actual declared context; destination address never corrects it. Intended endpoint/gateway/attachment agreement is a diagnostic readiness gate, not an ACL and not a claim real misbound traffic is dropped.
- Unknown kind, VRF, attachment, destination or scenario is rejected; invalid UI state hides and clears prior rows/outcome text. Invalid scenario remains invalid through later field changes. Every field has immediate input and change validation; native reset restores baseline and clears errors.
- Only two fixed exact-prefix queries are modeled. No arbitrary prefix parsing/LPM, policy-rule evaluation, source-route ranking, recursive resolver, timer/history or automatic fallback. Real RPDB continuation and terminal-route design are source-described outside the model.
- The explicit BLUE service203.0.113.0/24 → RED declaration requires source presence, permission, target RED next-hop resolution and selected imported source. It never imports tenant overlap, introduces a default-context service candidate or creates the reverse path. Source resolution in BLUE does not satisfy the separate RED target declaration.
- VRF-Lite adds one shared declared tenant trunk and numeric VLAN enums10/20, with abstract logical attachments. Value0 is an untagged separate default-port sentinel; it is not on-wire VLAN0 or automatic native/fallback processing. Default-port is outside the tenant trunk. VLANs, frames, STP and encapsulation are not simulated.
- Installation, service policy/NAT and original forward/return prerequisites are separate declarations. RD/RT, BGP, MPLS, VPN transport, authentication, encryption and universal security isolation are not modeled or promised.
- Syntax is source-checked and commands are clearly guided/not executed. No live Linux namespace/VRF, FRR/Cisco parser, route/FIB, neighbor, frame, probe, packet or performance evidence was generated. Fake-DOM tests verify callbacks and output handling, not real keyboard/browser layout behavior. Primary performs integrated browser/technical acceptance separately.

