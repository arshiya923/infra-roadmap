# Advanced Routing & Switching Lab workbook

**GUIDED NOT EXECUTED.** This workbook describes a separately prepared, exclusively owned IOS XE17 campus exercise. No Cisco image, switch, router, external peer, packet generator or convergence result accompanies it. The browser is a tabletop gate worksheet. Complete every ownership and baseline field before treating the optional fault procedure as executable.

## Original objective and scope

Prepare two distribution switches and two campus routers, combine HSRPv2, OSPFv2, BGP, VLAN segmentation and route filtering, then record the original exchange through one owned failure and restoration. D1/D2/R1/R2 are the four campus devices. The owned external AS65002 peer and its remote test service are additional outside resources, not a fifth campus router silently inserted into the topology.

VLAN10 and VLAN20 are distinct broadcast scopes, with their SVIs in the same ordinary campus routing table. This does not create VRFs or automatically deny inter-VLAN IP traffic. If IP isolation is intended, record and test the explicit packet policy separately. The tabletop worksheet models VLAN10 only. Its campus endpoint VLAN check does not assign the outside remote server to a campus VLAN.

## Ownership and prepared-target prerequisites

Record supported L3 switches and routers, exact IOS XE17 maintenance releases, feature/license support, console or out-of-band management, exclusive change owner, authorized window and original endpoint service. Real interface names vary by platform; the blank fields below must be filled from actual inventory and reviewed against the cable map. A blank or uncertain mapping is a stop condition for the optional fault.

| Owned object | Actual device/host identity | Exact interface or namespace | Owner and authorization | Baseline admin/oper state | Independent management |
|---|---|---|---|---|---|
| D1 VLAN10/20 SVIs | Fill | Vlan10 / Vlan20 | Fill | Fill | Fill |
| D2 VLAN10/20 SVIs | Fill | Vlan10 / Vlan20 | Fill | Fill | Fill |
| D1 end of D1–R1 | Fill | **Fill D1_UPLINK_IF** | Fill | Must be recorded | Fill |
| R1 end of D1–R1 | Fill | Fill R1_D1_IF | Fill | Fill | Fill |
| D2–R2 ends | Fill | Fill both ends | Fill | Fill | Fill |
| R1–R2 ends | Fill | Fill both ends | Fill | Fill | Fill |
| D1–D2 VLAN trunk | Fill | Fill exact ends/port-channel | Fill | Fill | Fill |
| R1–external X peer | Fill | Fill exact R1/X ends | Fill | Fill | Fill |
| Campus H10A/H10B | Fill | Fill switch access attachments | Fill | Fill | Fill |
| Campus H20 | Fill | Fill VLAN20 attachment | Fill | Fill | Fill |
| Outside service endpoint | Fill | Fill outside attachment | Fill | Fill | Fill |

Preserve the actual relevant running configuration and interface admin states in a secure off-device record before the fault. “Baseline saved” here means evidence preserved; do not write the experimental fault into startup configuration. Identify in-band management risk explicitly and prove the management path does not depend on the interface to be disabled. Keep rollback access and an owner present throughout the optional target phase.

## Exact prepared address plan

These are isolated lab addresses, not authorization to reuse them on another network. Confirm no collision or unrelated consumer before preparation.

| Scope | Network | Device/endpoint addresses | Purpose |
|---|---|---|---|
| VLAN10 | 172.16.10.0/24 | VIP172.16.10.1; D1.2; D2.3; H10A.10; H10B.20 | Modeled campus source/return endpoint scope |
| VLAN20 | 172.16.20.0/24 | VIP172.16.20.1; D1.2; D2.3; H20.10 | Independent broadcast/HSRP group scope |
| D1–R1 | 10.0.1.0/30 | D1 10.0.1.1; R1 10.0.1.2 | Routed area0 link and selected D1 uplink |
| D2–R2 | 10.0.2.0/30 | D2 10.0.2.1; R2 10.0.2.2 | Routed area0 link and D2 uplink |
| R1–R2 | 10.0.3.0/30 | R1 10.0.3.1; R2 10.0.3.2 | Routed area0 and mapped internal BGP transport |
| R1–X | 203.0.113.0/30 | R1 203.0.113.1; X 203.0.113.2 | Owned AS65001↔AS65002 external peer |
| Outside remote prefix | 198.51.100.0/24 | X gateway198.51.100.1; test service198.51.100.10 | Exact owned remote BGP origin and service |

HSRPv2 group10 on VLAN10 is prepared with VIP172.16.10.1, supplied D1 active priority110, D2 standby priority100 and D2 preempt enabled. Record actual D1 preempt and tracking settings too; do not infer them from a sample priority. Group20 uses VIP172.16.20.1 with separately recorded actual roles/priorities/version. The group20 state must not be copied into group10 observations.

OSPFv2 area0 carries the three routed /30 links and the owned VLAN endpoint prefixes through passive SVI advertisement. Passive endpoint interfaces do not form host or D1–D2 OSPF neighbors merely because the network is advertised. Record actual router IDs, timers, areas, table and selected campus/underlay routes. No protocol timer values are assumed by this workbook.

Both R1 and R2 use AS65001. Explicitly prepare the mapped internal relationship on10.0.3.1/10.0.3.2 and owned R1–X external relationship with X AS65002. A prepared R1 next-hop-self advertisement toward R2 must be reviewed and verified with a usable NEXT_HOP at R2; neither a session nor an attribute knob creates its underlay route automatically. No full internal mesh or best-path algorithm is supplied by the worksheet.

Document exact route-policy ownership: import from X only the intended remote198.51.100.0/24; export toward X only the intended campus172.16.10.0/24 and172.16.20.0/24 when these owned candidates are eligible and deliberately originated. Avoid accidental broad redistribution or default export. Observe X's accepted return-prefix state separately from R1's export view.

D1/D2 also require explicit prepared remote forwarding intent. One bounded lab choice is an exclusively owned exact198.51.100.0/24 static candidate at D1 via10.0.1.2 and at D2 via10.0.2.2, with its actual system installation/resolution recorded. This is a prepared forwarding design, not a claim that OSPF automatically learns BGP destinations. R1/R2 require selected BGP remote information and selected campus return information in their actual shared table. Do not generalize this static choice into a production recommendation.

## Concrete prepared-target configuration templates

**GUIDED NOT EXECUTED — IOS XE17, newly prepared and exclusively owned isolated objects only.** These templates complete the original configuration exercise; they have not been applied or validated on a Cisco target here. D1/D2/R1/R2 remain the four campus devices. X is an optional additional owned outside peer/service resource. Do not paste a block until every interface placeholder is mapped, its device-specific command/feature support is checked, baseline state is preserved off-device and out-of-band management is working.

Collision-check OSPF process10, local BGP AS65001/65002, all addresses, VLANs10/20, HSRP groups10/20, static prefixes, real interfaces and device-local names LAB_B10_REMOTE, LAB_B10_CAMPUS and LAB_B10_DENY. Existing objects or attachments with those names must not be overwritten. Verify that mapped access/trunk/routed ports are distinct and exclusively owned. Review any existing prefix/route-map references before preparation. These templates deliberately enable preempt on both prepared D1/D2 switches and contain no effective upstream tracking; preserve that explicit baseline when assessing the later uplink failure.

| Placeholder | Exact owned role | Actual mapped interface |
|---|---|---|
| D1_TRUNK_IF / D2_TRUNK_IF | Two ends of the isolated D1–D2 VLAN10/20 trunk | Fill both |
| D1_H10A_IF | D1 access port for H10A VLAN10 | Fill |
| D2_H10B_IF | D2 access port for H10B VLAN10 | Fill |
| D2_H20_IF | D2 access port for H20 VLAN20 | Fill |
| D1_UPLINK_IF / R1_D1_IF | Two ends of routed10.0.1.0/30; same D1 interface used by fault/restore | Fill both |
| D2_UPLINK_IF / R2_D2_IF | Two ends of routed10.0.2.0/30 | Fill both |
| R1_R2_IF / R2_R1_IF | Two ends of routed10.0.3.0/30 | Fill both |
| R1_X_IF / X_R1_IF | Two ends of the owned external203.0.113.0/30 link | Fill both |
| X_LAN_IF | Outside198.51.100.0/24 service LAN | Fill |

On platforms requiring a trunk-encapsulation selection, review and use that exact platform's supported command before trunk mode. No generic encapsulation command is provided because many supported switches do not accept one. The allowed-VLAN replacement below is appropriate only on this exclusively owned isolated trunk; otherwise preserve its existing allowed list and do not run the replacement. SVI operational state also depends on actual active VLAN carriage. These are preparation commands, not evidence that the resulting SVI or protocol became usable.

### D1 prepared L3 switch

**GUIDED NOT EXECUTED.** H10A is attached to its mapped VLAN10 port. D1–R1 is routed rather than a VLAN trunk.

```text
configure terminal
ip routing
vlan 10
exit
vlan 20
exit
interface <D1_TRUNK_IF>
switchport mode trunk
switchport trunk allowed vlan 10,20
no shutdown
exit
interface <D1_H10A_IF>
switchport mode access
switchport access vlan 10
no shutdown
exit
interface Vlan10
ip address 172.16.10.2 255.255.255.0
standby version 2
standby 10 ip 172.16.10.1
standby 10 priority 110
standby 10 preempt
no shutdown
exit
interface Vlan20
ip address 172.16.20.2 255.255.255.0
standby version 2
standby 20 ip 172.16.20.1
standby 20 priority 110
standby 20 preempt
no shutdown
exit
interface <D1_UPLINK_IF>
no switchport
ip address 10.0.1.1 255.255.255.252
no shutdown
exit
router ospf 10
router-id 192.0.2.11
passive-interface default
no passive-interface <D1_UPLINK_IF>
network 172.16.10.0 0.0.0.255 area 0
network 172.16.20.0 0.0.0.255 area 0
network 10.0.1.0 0.0.0.3 area 0
exit
ip route 198.51.100.0 255.255.255.0 10.0.1.2
end
```

### D2 prepared L3 switch

**GUIDED NOT EXECUTED.** H10B and H20 use separate exclusively owned access ports. Group20 remains independently observable even though the template intentionally chooses the same priority ordering as group10.

```text
configure terminal
ip routing
vlan 10
exit
vlan 20
exit
interface <D2_TRUNK_IF>
switchport mode trunk
switchport trunk allowed vlan 10,20
no shutdown
exit
interface <D2_H10B_IF>
switchport mode access
switchport access vlan 10
no shutdown
exit
interface <D2_H20_IF>
switchport mode access
switchport access vlan 20
no shutdown
exit
interface Vlan10
ip address 172.16.10.3 255.255.255.0
standby version 2
standby 10 ip 172.16.10.1
standby 10 priority 100
standby 10 preempt
no shutdown
exit
interface Vlan20
ip address 172.16.20.3 255.255.255.0
standby version 2
standby 20 ip 172.16.20.1
standby 20 priority 100
standby 20 preempt
no shutdown
exit
interface <D2_UPLINK_IF>
no switchport
ip address 10.0.2.1 255.255.255.252
no shutdown
exit
router ospf 10
router-id 192.0.2.12
passive-interface default
no passive-interface <D2_UPLINK_IF>
network 172.16.10.0 0.0.0.255 area 0
network 172.16.20.0 0.0.0.255 area 0
network 10.0.2.0 0.0.0.3 area 0
exit
ip route 198.51.100.0 255.255.255.0 10.0.2.2
end
```

### R1 prepared campus router and external boundary

**GUIDED NOT EXECUTED.** R1 participates in area0 on its D1 and R2 links only. Its outside X link is not advertised into OSPF. Exact campus routes learned from the passive SVI advertisements must be present in R1's actual RIB before the BGP network statements originate them. No broad redistribution or default origin is configured.

```text
configure terminal
interface <R1_D1_IF>
ip address 10.0.1.2 255.255.255.252
no shutdown
exit
interface <R1_R2_IF>
ip address 10.0.3.1 255.255.255.252
no shutdown
exit
interface <R1_X_IF>
ip address 203.0.113.1 255.255.255.252
no shutdown
exit
router ospf 10
router-id 192.0.2.21
passive-interface default
no passive-interface <R1_D1_IF>
no passive-interface <R1_R2_IF>
network 10.0.1.0 0.0.0.3 area 0
network 10.0.3.0 0.0.0.3 area 0
exit
ip prefix-list LAB_B10_REMOTE seq 10 permit 198.51.100.0/24
ip prefix-list LAB_B10_CAMPUS seq 10 permit 172.16.10.0/24
ip prefix-list LAB_B10_CAMPUS seq 20 permit 172.16.20.0/24
route-map LAB_B10_REMOTE permit 10
match ip address prefix-list LAB_B10_REMOTE
exit
route-map LAB_B10_CAMPUS permit 10
match ip address prefix-list LAB_B10_CAMPUS
exit
route-map LAB_B10_DENY deny 10
exit
router bgp 65001
bgp log-neighbor-changes
neighbor 203.0.113.2 remote-as 65002
neighbor 10.0.3.2 remote-as 65001
address-family ipv4 unicast
neighbor 203.0.113.2 activate
neighbor 10.0.3.2 activate
network 172.16.10.0 mask 255.255.255.0
network 172.16.20.0 mask 255.255.255.0
neighbor 203.0.113.2 route-map LAB_B10_REMOTE in
neighbor 203.0.113.2 route-map LAB_B10_CAMPUS out
neighbor 10.0.3.2 next-hop-self
neighbor 10.0.3.2 route-map LAB_B10_REMOTE out
neighbor 10.0.3.2 route-map LAB_B10_DENY in
exit-address-family
end
```

LAB_B10_REMOTE and LAB_B10_CAMPUS have no ge/le modifiers: only the exact three named prefixes are admitted in their respective lists. Their matching permit maps implicitly deny unmatched routes. LAB_B10_DENY is an unconditional matching deny entry, deliberately blocking all imports from R2 in this prepared R1 direction. The R1→R2 advertisement permits only the owned remote prefix and supplies next-hop-self10.0.3.1; the campus return routes remain OSPF information, not iBGP-to-OSPF redistribution.

### R2 prepared campus router

**GUIDED NOT EXECUTED.** These prefix-list/route-map names are device-local owned objects on R2, separately collision-checked. R2 originates no BGP prefix in this template and exports none toward R1.

```text
configure terminal
interface <R2_D2_IF>
ip address 10.0.2.2 255.255.255.252
no shutdown
exit
interface <R2_R1_IF>
ip address 10.0.3.2 255.255.255.252
no shutdown
exit
router ospf 10
router-id 192.0.2.22
passive-interface default
no passive-interface <R2_D2_IF>
no passive-interface <R2_R1_IF>
network 10.0.2.0 0.0.0.3 area 0
network 10.0.3.0 0.0.0.3 area 0
exit
ip prefix-list LAB_B10_REMOTE seq 10 permit 198.51.100.0/24
route-map LAB_B10_REMOTE permit 10
match ip address prefix-list LAB_B10_REMOTE
exit
route-map LAB_B10_DENY deny 10
exit
router bgp 65001
bgp log-neighbor-changes
neighbor 10.0.3.1 remote-as 65001
address-family ipv4 unicast
neighbor 10.0.3.1 activate
neighbor 10.0.3.1 route-map LAB_B10_REMOTE in
neighbor 10.0.3.1 route-map LAB_B10_DENY out
exit-address-family
end
```

### X optional owned outside IOS XE17 peer

**GUIDED NOT EXECUTED — X is outside the four-device campus.** If no exclusively owned supported outside peer/service exists, keep this phase tabletop and report that limitation. The external connected198.51.100.0/24 route must be selected in X's actual RIB before its network statement originates that prefix.

```text
configure terminal
interface <X_R1_IF>
ip address 203.0.113.2 255.255.255.252
no shutdown
exit
interface <X_LAN_IF>
ip address 198.51.100.1 255.255.255.0
no shutdown
exit
ip prefix-list LAB_B10_REMOTE seq 10 permit 198.51.100.0/24
ip prefix-list LAB_B10_CAMPUS seq 10 permit 172.16.10.0/24
ip prefix-list LAB_B10_CAMPUS seq 20 permit 172.16.20.0/24
route-map LAB_B10_REMOTE permit 10
match ip address prefix-list LAB_B10_REMOTE
exit
route-map LAB_B10_CAMPUS permit 10
match ip address prefix-list LAB_B10_CAMPUS
exit
router bgp 65002
bgp log-neighbor-changes
neighbor 203.0.113.1 remote-as 65001
address-family ipv4 unicast
neighbor 203.0.113.1 activate
network 198.51.100.0 mask 255.255.255.0
neighbor 203.0.113.1 route-map LAB_B10_CAMPUS in
neighbor 203.0.113.1 route-map LAB_B10_REMOTE out
exit-address-family
end
```

Explicit IPv4-unicast neighbor activation is shown for every prepared relationship; release-default activation is not relied upon. Retain the exact device's supported address-family syntax and do not infer that a BGP session or network statement installed the required route. Every preparation block ends unsaved. Do not add save, reload, clear or unrelated broad redistribution commands.

Configure the owned endpoints through their actual platform's address interface: H10A172.16.10.10/24 gateway172.16.10.1, H10B172.16.10.20/24 gateway172.16.10.1, H20 172.16.20.10/24 gateway172.16.20.1, and remote198.51.100.10/24 gateway198.51.100.1. No generic host command is supplied because host platforms and interface identity must be mapped. IP routing between VLANs remains permitted by this prepared shared-RIB topology unless an explicitly reviewed packet policy is separately chosen; these templates invent no ACL requirement.

### Validate the prepared baseline before any fault

Record exact selected RIB routes needed by every network statement and forwarding decision. R1 must have selected172.16.10.0/24 and172.16.20.0/24 from the intended OSPF context before originating those exact campus prefixes. X must have its selected connected198.51.100.0/24. R1 should import only the remote prefix from X with usable next hop203.0.113.2; R2 should receive only that remote prefix through R1 with usable next hop10.0.3.1. D1/D2 should resolve and install their owned exact static remote route toward10.0.1.2/10.0.2.2 respectively. X must actually accept both owned campus return prefixes; R1's export view alone does not establish that result.

Use the read-only groups below plus each actual neighbor's correct local context to compare matched policy, selected attributes, system routes and original return/service. Passive SVI advertisement, iBGP distribution and redistribution are different mechanisms. Preserve the original probe baseline and exact group10 role before moving to the single mapped fault; a configuration block or command acknowledgement is not baseline validation. Restore the exact pre-preparation owned baseline if an object collision, unsupported command, address conflict or management discrepancy appears; do not proceed to failure testing with an unresolved baseline.

## Baseline observations and evidence columns

Name the original test H10A172.16.10.10 → remote198.51.100.10, address family IPv4, actual service protocol/port and source binding. Record the service command/tool, version, retry/timeout behavior and output timestamps. A supporting H10A→H10B test checks campus attachment but cannot replace the remote original exchange.

| Time/clock | Phase | Observer/table/interface | Original transaction or command | Raw result/path attributes | Interpretation | Uncertainty/next check |
|---|---|---|---|---|---|---|
| Fill | Baseline | H10A and outside service | Timed original application/probe | Fill | Original forward/return baseline | Tool interval/retry effects |
| Fill | Baseline | D1/D2 VLAN10 | show standby brief; VLAN/trunk inspection | Fill | Selected group10 role and L2 scope | Role does not prove uplink |
| Fill | Baseline | All area0 observers | OSPF neighbor/interface and selected routes | Fill | Underlay/campus return state | Neighbor does not prove every route |
| Fill | Baseline | R1/R2/X actual peer contexts | BGP exact prefix and advertisement views | Fill | Import/export/NEXT_HOP/choice | Receiving policy independent |
| Fill | Baseline | Actual original path | System lookup, ARP and packet attachments | Fill | Local forwarding prerequisites | Hardware/service evidence separate |

Read-only guided command groups, **GUIDED NOT EXECUTED**:

```text
# D1/D2 supported switch context
show standby brief
show vlan brief
show interfaces trunk

# Actual area0 observers
show ip ospf neighbor
show ip ospf interface
show ip route ospf

# R1 only for the mapped outside peer203.0.113.2
show ip bgp summary
show ip bgp 198.51.100.0 255.255.255.0
show ip bgp neighbors 203.0.113.2 advertised-routes

# Actual original-path observers; preserve sensitive configuration securely
show ip route 198.51.100.10
show ip arp
show ip interface
show running-config
```

Use actual R2 internal-peer context for its neighbor inspection. Do not run R1's X-specific command on R2 and call its absence a protocol failure. Table/VRF, interface and platform support belong in every evidence row.

## One fault at a time: expected contrast

Start with the prepared no-effective-upstream-tracking baseline for the selected D1 uplink experiment; preserve all actual settings. A D1–R1 shutdown can leave D1 active on VLAN10 while the selected original upstream path fails. D2 preempt at lower priority does not prove takeover. This is the expected mechanism contrast, not a prediction that every supported implementation or topology will show identical timings or roles. Record what actually happened.

| Fault or tabletop case | Preserved independent declaration | Required contrasting observation |
|---|---|---|
| Wrong campus VLAN | Other protocol declarations | Campus attachment mismatch; not universal VLAN20 unreachability |
| Selected D1 uplink unavailable | Supplied D1 HSRP role | Active role can coexist with unusable original uplink |
| Underlay route missing | OSPF adjacency | Required selected route is a separate fact |
| Remote import denied | BGP session | Exact-prefix admission can fail while session remains ready |
| NEXT_HOP unresolved | Imported candidate visibility | Candidate visibility does not establish eligibility |
| System displacement | BGP choice | Protocol choice can remain while another system source wins |
| Packet denied | Selected route | Routing admission is not packet permission |
| Return/service absent | Forward prerequisites | Forward evidence does not certify the original exchange |

Do not combine gateway, policy and interface changes in the same failure observation. A separately reviewed tracking experiment is a different run with a new baseline and exact rollback, not an automatic repair added midway.

## Optional mapped interface fault and exact rollback

**GUIDED NOT EXECUTED.** Execute only on the exclusively owned, prepared D1 device after D1_UPLINK_IF has been filled with the exact real D1–R1 interface and reviewed against inventory, baseline admin state and independent management. The placeholder below is intentionally not an executable interface name. If the recorded baseline was already shut, this fault procedure is inapplicable; do not “restore” it by enabling an originally disabled interface.

1. Preserve baseline and confirm sustained original exchange success. Start a continuous timestamped original probe log at the declared interval; keep it running through the complete observation and rollback.
2. Record planned fault, exact device/interface, owner and injection timestamp from the command observer. Confirm independent management remains live and note any clock offset relative to probe logs.
3. On that exact D1 interface only, use the prepared IOS XE configuration procedure:

```text
# GUIDED NOT EXECUTED — substitute reviewed exact D1_UPLINK_IF only
configure terminal
interface <D1_UPLINK_IF>
shutdown
end
```

4. Observe the continuing original probe sequence and independent group10, link, OSPF, BGP/system and return/service evidence. Preserve raw outputs. Do not reload, save the fault or broadly clear peers/processes.
5. At the owned restoration time, restore that same interface only to its recorded administratively-up baseline:

```text
# GUIDED NOT EXECUTED — same exact reviewed interface as injection
configure terminal
interface <D1_UPLINK_IF>
no shutdown
end
```

6. Continue original probes until the declared sustained-success criterion is met and the observation window is complete. Verify actual admin/oper baseline, independent management and original gateway/route/service context. If a command acknowledgement arrives but service stays degraded, preserve evidence and diagnose the demonstrated dependency; do not declare restoration or make unrelated changes.

Keep exercise changes unsaved. Do not issue copy running-config startup-config, write memory, reload or broad clear commands. If exclusive ownership, baseline certainty or independent control is lost, stop mutation and use the agreed management/owner recovery procedure.

## Timestamped failure and recovery record

Fill the sampling interval Δ, timeout/retry behavior, clock source/offset, number of baseline successes, fault duration and sustained-restoration rule before injection. One suggested declared rule is ten consecutive original transaction successes at the unchanged one-second interval followed by a thirty-second observation window with no additional failures; this is a test criterion, not a universal service-level standard. Choose the actual supported test rate deliberately and document it.

| Field | Actual value and observer |
|---|---|
| Baseline window and sample count | Fill |
| Probe interval Δ and timeout/retries | Fill |
| Clock source and cross-observer uncertainty | Fill |
| Fault injection timestamp t_inject | Fill |
| Last success before injection | Fill |
| First observed failure after injection | Fill or explicitly “none observed” |
| Failure sample count and total sample count | Fill |
| Restoration command timestamp | Fill |
| First observed success after injection | Fill |
| First sustained-success window start/end | Fill |
| Additional failures after first success | Fill |
| HSRP role event observations | Fill; separate clock/observer |
| OSPF route/adjacency event observations | Fill; separate clock/observer |
| BGP/system route event observations | Fill; separate clock/observer |
| Exact baseline restored verification time | Fill |

Report `first observed success after injection − t_inject` only as the observed post-injection first-success gap. If success continued through all sampled observations, state “no failure observed at the declared sampling interval” rather than claiming exact zero loss. A sample interval bounds what can be noticed between observations; tool timeout and timestamp placement can further change these bounds. Do not assign a universal ±Δ precision when retries or request completion times differ.

The interval between last observed failure and the first success that begins a sustained-success window brackets sampled restoration evidence for that observer. It does not isolate HSRP, OSPF, BGP or hardware convergence, and it cannot prove no later regression beyond the recorded window. A first success before restoration may be transient or indicate an actual alternate path; preserve its route/observer evidence and avoid inventing a causal mechanism from the packet result alone.

## Acceptance and cleanup record

Record whether the original source/service baseline was restored, which sampled criterion passed, any unresolved discrepancy and each independent control-plane observation. Reconcile the exact original interface admin state, policy attachments, HSRP/tracking intent and selected routes. Preserve the raw logs and final address/interface mapping securely. Delete only exclusively owned unused lab objects after baseline and management verification; retain anything still referenced by a baseline attachment. Browser reset restores declarations only, not target interfaces or logs.

## Primary documentation

- [Cisco IOS XE17 HSRP](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ntw-servs/b-network-services/m_fhp-hsrp-0.html)
- [Cisco IOS XE17 preempt and track](https://www.cisco.com/c/en/us/support/docs/ip/hot-standby-router-protocol-hsrp/13780-6.html)
- [Cisco IOS XE17 OSPF](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_iro-cfg-0.html)
- [Cisco IOS XE17 basic BGP](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_irg-basic-net-0.html)
- [Cisco IOS XE17 switch BGP policy](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr3-fwd/bgp/bgp-configuration-guide/routing-bgp.html)

Check the exact prepared platform/release reference for every interface, feature and CLI command. No FRR command is represented as Cisco syntax, and no worksheet result is actual target evidence.
