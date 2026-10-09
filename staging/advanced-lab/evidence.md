# Advanced routing and switching lab draft evidence

All writes were confined to `staging/advanced-lab/`. Route-control and shared files were left unchanged. The primary assistant owns review, browser acceptance and integration, including copying workbook.md to labs/advanced-routing-switching-workbook.md.

## Delivered scope

`lessons.json` contains one full Batch10 lesson, lab-3 Advanced Routing & Switching Lab, interactive advanced-lab. It preserves two distribution switches, two campus routers, HSRPv2, OSPFv2, BGP, VLAN segmentation/route filtering and a timed failure-observation exercise. The external AS65002 peer is explicitly outside the four-device campus. Glossary is an object; four flows, three-column comparisons, ten MCQs with distinct plausible distractors/exact answers, three topic-specific quick checks and four read-only guided CLI groups are supplied. Artifacts uses the existing renderer's array of object entries, with one {title,path,description} for labs/advanced-routing-switching-workbook.md.

`model.js` exports CommonJS/window.AdvancedLabModels with catalog(kind), preset(kind,id), evaluate(kind,state), html(kind), mount(kind), fields and bools; kind advanced-lab, IDs al-*. Eighteen presets cover both supplied selected gateways, VLAN scope, absent/unusable gateway, active uplink failure, context/adjacency/route, session/import/NEXT_HOP/choice/system, packet denial, return and application boundaries. Nine ordered gates preserve both independent readiness and cumulative agreement. No election, tracking transition, SPF, BGP mesh/best path, alternate repair or convergence calculator exists.

`workbook.md` records exact owned interface mapping blanks, address plan, shared campus RIB, independent VLAN20 group, routed area0 links, explicit internal/external peer context, D1/D2 prepared forwarding intent and remote return advertisement scope. It includes raw-evidence columns, one-fault contrast, continuous timestamped original probes, sampling/clock/retry uncertainty, sustained-restoration criterion and exact mapped shutdown/no shutdown rollback. The fault requires a baseline administratively-up exclusive D1 uplink and independent management, remains unsaved and excludes reload/broad clears. Everything is labeled GUIDED NOT EXECUTED; no actual target or Cisco image is present.

## Primary references checked 2026-10-09

- [Cisco IOS XE17.x HSRP](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ntw-servs/b-network-services/m_fhp-hsrp-0.html) and [preempt/track guidance](https://www.cisco.com/c/en/us/support/docs/ip/hot-standby-router-protocol-hsrp/13780-6.html): supplied role, priority/preemption, object tracking and show standby context. The worksheet does not turn priority declarations into an election simulator.
- [Cisco IOS XE17.x HSRP version2](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ntw-servs/b-network-services/m_fhp-hsrp-v2.html): IPv4 multicast224.0.0.102 distinguished from version1 multicast224.0.0.2.
- [Cisco IOS XE17.x OSPF](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_iro-cfg-0.html): passive interface hello suppression and actual neighbor/interface/route inspection context.
- [Cisco IOS XE17.x basic BGP](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_irg-basic-net-0.html) and [switch BGP policy](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr3-fwd/bgp/bgp-configuration-guide/routing-bgp.html): exact route/summary/advertisement observations and separate import/export attachment.
- [Cisco IOS XE17.12 VLANs](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9500/software/release/17-12/configuration_guide/vlan/b_1712_vlan_9500_cg/configuring_vlans.html) and [VLAN trunks](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9500/software/release/17-12/configuration_guide/vlan/b_1712_vlan_9500_cg/configuring_vlan_trunks.html): VLAN broadcast membership, trunk allowed scope and inspection syntax.
- [Cisco IOS XE17.17 unicast routing](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9600/software/release/17-17/configuration_guide/rtng/b_1717_rtng_9600_cg/configuring_ip_unicast_routing.html) and [protocol-independent route command reference](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_pi/command/iri-cr-book/iri-cr-s1.html): route, ARP and IP interface observations. Exact prepared hardware/release support must still be confirmed.

No FRR syntax is presented as IOS XE; no actual HSRP/OSPF/BGP/FIB/application outcome is claimed.

## Executed checks

`node --check staging/advanced-lab/model.js` exited0.

`node --test staging/advanced-lab/model.test.cjs` exited0: seven groups, seven pass, zero fail. Independent literal preset tables verify first failed gate and forward/network/application agreement. Exhaustive8192 boolean masks verify raw/cumulative state and outcome separation; twelve gateway/VLAN combinations verify strict VLAN10 scope and supplied roles. Tests reject malformed enums, coercion, missing/extra fields and unsupported measurement fields. Lesson schema/assessment/artifact/narrative checks, workbook ownership/timestamp/rollback checks and mocked DOM accessibility/invalid-context/immediate-input/reset checks also pass.

## Limits awaiting primary acceptance

This worker performed no actual browser visual/theme/width/native-keyboard or assistive-technology verification, no Cisco/FRR target execution, no continuous probe, no fault injection and no measured convergence or original service result. Mock DOM validates event/output logic only. All-green is supplied declaration agreement. Actual sampled restoration observations require the owned prepared target, documented observer clocks, interval/retry behavior and sustained-success criterion. A post-injection first-success gap is not a pure protocol convergence value or exact zero-loss guarantee.
