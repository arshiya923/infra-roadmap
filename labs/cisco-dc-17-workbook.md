# Cisco Data Center — Batch 17 evidence workbook

Version scopes: NX-OS 10.5(x), ACI 6.0(x), and explicitly historical family/FabricPath references. Exact model/release support remains a target prerequisite. All Cisco commands below are guided and unexecuted. Browser models and offline artifacts do not certify hardware, convergence, storage access or production operation.

## s7-g0-t0 — Cisco Nexus

Cisco Nexus is a family of data-center switching platforms. Family identity does not establish a universal feature set. Hardware, operating mode, release, optics, entitlement and scale must fit the intended workload together.

This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.

### Evidence and rehearsal

- Build a leaf suitability record with product ID, active release, mode, required EVPN features, optics, port rates and scale.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- A procurement sheet says Nexus but omits product ID and release; overlay support remains unproven.
- Add exact compatibility evidence and re-evaluate the workload and recovery requirements before approving the plan.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show version
show inventory
```

Restoration: Add exact compatibility evidence and re-evaluate the workload and recovery requirements before approving the plan.

## s7-g0-t1 — NX-OS

NX-OS provides data-center switching control, management and feature processes. Similarities with other Cisco CLIs do not establish identical syntax, defaults, persistence or upgrade behavior.

This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.

### Evidence and rehearsal

- Compare sanitized running/startup baselines, feature state and version before proposing a narrow change.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- A neighbor address is documented but the corresponding feature is disabled in the readiness record.
- Restore the intended feature state in the plan and require separate neighbor and forwarding verification.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show version
show feature
```

Restoration: Restore the intended feature state in the plan and require separate neighbor and forwarding verification.

## s7-g0-t2 — Nexus CLI

Nexus CLI work is performed in a specific device, privilege and configuration context. A useful transcript records target identity, time and evidence boundaries; successful command parsing does not prove service correctness.

This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.

### Evidence and rehearsal

- Prepare a read-only transcript with identity, feature and interface observations; annotate what each line cannot prove.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- A large error counter without sample time is labelled an active fault.
- Collect two timed samples and correlate the delta with the original service symptom before assigning a cause.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show version
show interface brief
show feature
```

Restoration: Collect two timed samples and correlate the delta with the original service symptom before assigning a cause.

## s7-g0-t3 — Nexus architecture

Nexus architecture separates management, control processes and hardware forwarding. Modular systems add supervisor, line-card and fabric dependencies. Logical isolation and duplicated modules protect selected boundaries but share physical resources.

This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.

### Evidence and rehearsal

- Draw a packet path with the table, queue, process and physical module responsible at each boundary.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- A route exists in control state but a forwarding entry is missing; the control/data boundary is unresolved.
- After a supported repair, compare both tables and repeat the original flow rather than closing on a route listing.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show module
show interface brief
```

Restoration: After a supported repair, compare both tables and repeat the original flow rather than closing on a route listing.

## s7-g0-t4 — Nexus 3000

Nexus 3000 models commonly appear in fixed-form and latency-sensitive data-center roles. Exact models differ in buffers, port rates and features. A quoted unloaded forwarding latency is not an application tail-latency guarantee.

This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.

### Evidence and rehearsal

- Compare an unloaded switching claim with a bursty many-to-one workload and identify unmeasured delays.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- A specification latency is substituted for peak-load application p99.
- Retain the specification separately and add workload, contention and measured latency-distribution evidence.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show version
show interface brief
```

Restoration: Retain the specification separately and add workload, contention and measured latency-distribution evidence.

## s7-g0-t5 — Nexus 5000

Nexus 5000/5500 platforms illustrate historical unified-fabric designs using Ethernet and supported Fibre Channel over Ethernet functions. Ethernet carrier, storage login and completed storage I/O are separate evidence boundaries.

This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.

### Evidence and rehearsal

- Build a historical network/storage dependency map with separate Ethernet, fabric-login and I/O checkpoints.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- Ethernet is up but no storage login exists; a green link is incorrectly treated as storage success.
- Reconcile adapter, VLAN/VSAN and QoS intent, then require login and controlled test-I/O evidence.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show version
show feature
```

Restoration: Reconcile adapter, VLAN/VSAN and QoS intent, then require login and controlled test-I/O evidence.

## s7-g0-t6 — Nexus 7000

Nexus 7000 is a modular family associated with supervisor, line-card, fabric and supported Virtual Device Context designs. A VDC is a logical device boundary inside a chassis, not an independent physical failure domain.

This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.

### Evidence and rehearsal

- Map two tenant contexts onto their shared physical resources and identify failures that affect both.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- Replicas in separate VDCs on one chassis are claimed to survive chassis loss.
- Correct the failure-domain record and require separate physical systems if chassis-loss survival is an objective.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show module
show version
```

Restoration: Correct the failure-domain record and require separate physical systems if chassis-loss survival is an objective.

## s7-g0-t7 — Nexus 9000

Nexus 9000 spans fixed and modular hardware used in NX-OS fabrics and supported ACI deployments. Operating mode, ASIC generation and release determine management workflow, feature availability and resource limits.

This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.

### Evidence and rehearsal

- Compare NX-OS EVPN and ACI as alternative operating designs, including policy ownership and recovery.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- An ACI-mode leaf is assigned a standalone NX-OS change procedure.
- Select the matching supported workflow and retain the mode-specific baseline and recovery requirements.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show version
show inventory
```

Restoration: Select the matching supported workflow and retain the mode-specific baseline and recovery requirements.

## s7-g1-t0 — vPC

A virtual PortChannel lets a downstream device form one logical port channel to two cooperating Nexus peers. The peers retain separate control planes and coordinate the attachment; they do not become one chassis.

Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated.

### Evidence and rehearsal

- Inspect both peers and the downstream channel; distinguish healthy, keepalive-only loss, peer-link loss and ambiguous dual loss.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- Peer link is down while keepalive shows the primary alive; secondary member suspension is the expected bounded steady-state outcome.
- Restore the peer link and consistent parameters, then retest downstream service through the intended paths.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show vpc brief
show port-channel summary
```

Restoration: Restore the peer link and consistent parameters, then retest downstream service through the intended paths.

## s7-g1-t1 — vPC Peer Link

The vPC peer link is a supported port channel between peers for coordination and required data handling. VLAN scope, capacity and physical diversity matter when normal local attachments fail.

Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated.

### Evidence and rehearsal

- Map peer-link ports to modules and required VLANs, then compare surviving capacity with redirected demand.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- One required VLAN is absent while both member links are up.
- Restore the exact VLAN scope and verify consistency plus the affected service in both directions.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show vpc brief
show interface trunk
```

Restoration: Restore the exact VLAN scope and verify consistency plus the affected service in both directions.

## s7-g1-t2 — Keepalive

Peer keepalive is a Layer 3 liveness exchange that helps distinguish peer-link loss from peer loss. It carries neither user data nor configuration synchronization, and its route should avoid the failure domain it helps diagnose.

Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated.

### Evidence and rehearsal

- Trace the keepalive VRF, filtering and physical route without relying on the peer link as its sole transport.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- Keepalive is down while the peer link is up; identify degraded detection without claiming total outage.
- Restore the original VRF/path policy and verify liveness, vPC state and the original service separately.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show vpc peer-keepalive
show vpc brief
```

Restoration: Restore the original VRF/path policy and verify liveness, vPC state and the original service separately.

## s7-g1-t3 — Orphan ports

An orphan port is an attachment on a vPC peer that is not itself a vPC member. Its connectivity can depend on the peer link or another supported path. Peer membership does not automatically dual-home every endpoint.

Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated.

### Evidence and rehearsal

- Compare a secondary orphan server with a vPC-attached server and identify their different failure paths.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- The peer link fails and the orphan remains locally up but loses its required remote path.
- Restore the recorded peer path or reviewed alternate attachment, then test orphan service and isolation.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show vpc brief
show interface brief
```

Restoration: Restore the recorded peer path or reviewed alternate attachment, then test orphan service and isolation.

## s7-g2-t0 — FabricPath concepts

FabricPath is a Cisco Layer 2 multipath technology used on supported historical Nexus platforms. It differs from an ordinary STP tree and from a VXLAN/EVPN IP overlay.

This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.

### Evidence and rehearsal

- Label historical FabricPath interior and classic Ethernet edges, then compare them with an IP-underlay overlay.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- A classic Ethernet loop is ignored because the core uses FabricPath.
- Restore the explicit boundary and the supported edge loop-prevention design.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show version
show module
```

Restoration: Restore the explicit boundary and the supported edge loop-prevention design.

## s7-g2-t1 — FEX

A Fabric Extender expands a supported parent Nexus with remote host-facing interfaces. The conventional architecture behaves like a remote line card, not an independent access switch with its own local switching control plane.

This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.

### Evidence and rehearsal

- Trace two same-FEX hosts through the parent and calculate the surviving uplink envelope after one member loss.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- The plan assumes same-FEX hosts keep switching after their only parent fails.
- Correct the parent-dependent path and record supported redundancy or the expected outage.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show fex
show interface brief
```

Restoration: Correct the parent-dependent path and record supported redundancy or the expected outage.

## s7-g2-t2 — Cisco Fabric Extender

Cisco Fabric Extender operations require stable identity and port mapping during discovery, replacement and recovery. This lesson deepens the earlier FEX architecture with a replacement evidence workflow rather than duplicating its purpose.

This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.

### Evidence and rehearsal

- Prepare a replacement worksheet with server labels, FEX ports, parent interfaces and an independent recovery session.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- The replacement is online but a server cable lands on a port assigned to another VLAN.
- Restore the recorded mapping and repeat both permitted and prohibited endpoint operations.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show fex
show inventory
```

Restoration: Restore the recorded mapping and repeat both permitted and prohibited endpoint operations.

## s7-g2-t3 — Data Center Interconnect

Data Center Interconnect joins services across sites using an explicitly chosen Layer 2 or Layer 3 boundary. Extending connectivity also extends selected failure dependencies; a network path does not provide application consistency or storage recovery.

This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.

### Evidence and rehearsal

- Compare routed and stretched alternatives with latency, bandwidth, gateway and recovery assumptions.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- The network link returns but the replica remains stale; full recovery is falsely declared.
- Retest client operation and recoverable data age with separate infrastructure and application timestamps.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show ip route
show interface brief
```

Restoration: Retest client operation and recoverable data age with separate infrastructure and application timestamps.

## s7-g3-t0 — VXLAN

VXLAN carries an inner Ethernet frame in UDP/IP between tunnel endpoints. Its 24-bit VNI identifies the overlay segment. The underlay routes the outer packet; VXLAN itself provides neither encryption nor the EVPN control plane.

Outer IP byte budget = inner IP + inner Ethernet 14 + optional inner tag 4 + VXLAN 8 + UDP 8 + base outer IP 20 or 40. No FCS, outer Ethernet, IP options/extensions, encryption or measured path MTU. A retained inner tag is an explicit arithmetic input, not a claim of default platform behavior.

### Evidence and rehearsal

- Calculate the outer IP budget for a 1500-byte inner IP packet and trace both sets of addresses across the underlay.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- A 1500-byte underlay IP MTU cannot carry a 1550-byte outer IPv4 packet for the stated untagged-inner assumptions.
- Restore a supported end-to-end MTU or reduce the inner budget, then require actual large-packet service testing separately.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show nve peers
show nve vni
```

Restoration: Restore a supported end-to-end MTU or reduce the inner budget, then require actual large-packet service testing separately.

## s7-g3-t1 — VXLAN VNI

A VXLAN Network Identifier is a 24-bit segment identifier. In common symmetric EVPN designs, an L2 VNI identifies a bridging context and an L3 VNI associates a tenant routing context. Local VLAN and VNI namespaces are distinct.

Compare two supplied local VLAN-to-L2-VNI mappings. Different VLAN numbers can map to the same VNI. Matching VNI numbers establish identifier consistency only; routing, EVPN policy, platform reserved values and device scale remain outside this arithmetic worksheet.

### Evidence and rehearsal

- Map Blue VLAN 10 to VNI 10100 and Red VLAN 20 to 10200 with explicit VRFs and import policies.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- The remote Blue attachment is incorrectly mapped to VNI 10200 while transport stays healthy.
- Restore the exact mapping and verify same-tenant delivery and denied cross-tenant traffic.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show nve vni
show vlan brief
```

Restoration: Restore the exact mapping and verify same-tenant delivery and denied cross-tenant traffic.

## s7-g3-t2 — VTEP

A VTEP originates and terminates VXLAN between a local attachment and an IP underlay. Source identity, remote reachability, VNI membership and endpoint state must agree. The management address need not be the tunnel source.

Outer IP byte budget = inner IP + inner Ethernet 14 + optional inner tag 4 + VXLAN 8 + UDP 8 + base outer IP 20 or 40. No FCS, outer Ethernet, IP options/extensions, encryption or measured path MTU. A retained inner tag is an explicit arithmetic input, not a claim of default platform behavior.

### Evidence and rehearsal

- Trace a frame through access port, local NVE, remote tunnel source and destination attachment.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- Management is reachable but the route to the remote tunnel source is absent.
- Restore the intended underlay reachability and verify peer, VNI and original tenant-flow state.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show nve peers
show nve interface
```

Restoration: Restore the intended underlay reachability and verify peer, VNI and original tenant-flow state.

## s7-g4-t0 — EVPN

EVPN distributes Ethernet/IP reachability with BGP extensions and can pair with VXLAN. Route types, tenant import policy and next-hop resolution explain why a received route may not become usable forwarding.

Single synthetic type-2 route eligibility: BGP session, EVPN family, route presence, exact RT membership and reachable next hop. RD is deliberately not an import gate. No full BGP selection, hardware programming, MAC mobility, multihoming or measured forwarding.

### Evidence and rehearsal

- Compare a matching-RT reachable route with a visible route whose RT is not imported by the local tenant.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- The BGP session stays up while local import RT changes; the received route no longer qualifies.
- Restore exact import scope, resolve the next hop and test delivery without broad route leakage.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show bgp l2vpn evpn
show nve peers
```

Restoration: Restore exact import scope, resolve the next hop and test delivery without broad route leakage.

## s7-g4-t1 — MP-BGP EVPN

MP-BGP EVPN exchanges EVPN routes in a specific address family. A transport session being Established does not establish EVPN negotiation, origination, extended-community propagation, import policy or usable tenant forwarding.

Single synthetic type-2 route eligibility: BGP session, EVPN family, route presence, exact RT membership and reachable next hop. RD is deliberately not an import gate. No full BGP selection, hardware programming, MAC mobility, multihoming or measured forwarding.

### Evidence and rehearsal

- Check transport, EVPN family, advertised/received records, RT policy and next-hop resolution in order.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- Transport is Established but the EVPN family is disabled in the fixture.
- Restore family and policy intent and verify a specific usable route plus the original transaction.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show bgp l2vpn evpn summary
show bgp l2vpn evpn
```

Restoration: Restore family and policy intent and verify a specific usable route plus the original transaction.

## s7-g4-t2 — Leaf-Spine Architecture

A basic two-tier leaf-spine fabric attaches endpoints to leaves and each leaf to every spine. Inter-leaf paths have predictable structure, but resilience depends on surviving capacity, routing and traffic locality rather than link count alone.

Symmetric per-leaf uplink envelope: remaining links times rate, compared to supplied inter-leaf demand. Two spines and four leaves are the reference topology. No per-flow hashing, queues, convergence or actual traffic.

### Evidence and rehearsal

- Draw two spines and four leaves with eight leaf-spine links and calculate one-spine-loss capacity per leaf.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- One of two 100-Gb/s uplinks is lost while inter-leaf demand is 150 Gb/s; surviving capacity is insufficient.
- Restore the owned path or reduce admitted load in the worksheet, then require measured target behavior separately.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
show ip route
show interface brief
```

Restoration: Restore the owned path or reduce admitted load in the worksheet, then require measured target behavior separately.

