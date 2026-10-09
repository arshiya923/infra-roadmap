# Cisco Data Center — Batch 18 evidence workbook

Version scopes: NX-OS 10.5(x), ACI 6.0(x), and explicitly historical family/FabricPath references. Exact model/release support remains a target prerequisite. All Cisco commands below are guided and unexecuted. Browser models and offline artifacts do not certify hardware, convergence, storage access or production operation.

## s7-g5-t0 — Cisco ACI fundamentals

Cisco Application Centric Infrastructure expresses connectivity through a policy model managed by APIC and realized by fabric switches. It is an alternative operating model to a standalone NX-OS EVPN fabric, not merely a new name for a VLAN configuration.

Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.

### Evidence and rehearsal

- Translate Web-to-App TCP 443 into endpoint classification, routing context and a scoped contract while retaining a denied SSH test.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- A contract object exists but no consumer/provider relationship connects the intended EPGs.
- Restore the intended relationship and validate leaf deployment plus allowed HTTPS and denied SSH.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
APIC GUI: Tenants > selected tenant > Application Profiles
APIC GUI: Tenants > selected tenant > Contracts
```

Restoration: Restore the intended relationship and validate leaf deployment plus allowed HTTPS and denied SSH.

## s7-g5-t1 — APIC

The Application Policy Infrastructure Controller manages ACI policy, configuration and operational visibility. An APIC cluster is important to management availability, but controllers are not ordinary packet-forwarding hops. Existing deployed state must be distinguished from future policy changes during a controller outage.

Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.

### Evidence and rehearsal

- Record controller health, deployed policy and an existing endpoint flow as three separate observations before a maintenance scenario.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- APIC reachability is lost while policy is already deployed; the worksheet must not automatically declare all traffic lost.
- Restore management reachability and supported cluster health, then validate both policy operations and the original endpoint flow.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
APIC GUI: System > Controllers
APIC GUI: Tenants > selected tenant > Faults
```

Restoration: Restore management reachability and supported cluster health, then validate both policy operations and the original endpoint flow.

## s7-g5-t2 — Spine

An ACI spine provides fabric transit between leaves and participates in the fabric control architecture. It is not interchangeable with an endpoint-facing leaf, and its role should not be confused with the APIC policy-management role.

Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.

### Evidence and rehearsal

- Trace a Web-to-App flow across two leaves and identify what is lost when one of the two spines becomes unavailable.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- One spine is unavailable and the remaining uplink cannot carry the declared offered load.
- Restore the supported path or reduce demand, then check fabric health and the original endpoint operation.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
APIC GUI: Fabric > Inventory > selected spine
```

Restoration: Restore the supported path or reduce demand, then check fabric health and the original endpoint operation.

## s7-g5-t3 — Leaf

An ACI leaf attaches endpoints or supported external connectivity and realizes policy in the data path. Endpoint classification, forwarding context and deployed policy must agree before an application can communicate as intended.

Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.

### Evidence and rehearsal

- Map a Web host from physical port and encapsulation to its EPG, BD and VRF before checking its App contract.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- A host is learned on the expected leaf but classified into the wrong EPG.
- Restore the intended attachment mapping and verify endpoint location, deployed policy and allowed/denied service behavior.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
APIC GUI: Tenants > selected tenant > Application Profiles > selected EPG > Operational
```

Restoration: Restore the intended attachment mapping and verify endpoint location, deployed policy and allowed/denied service behavior.

## s7-g5-t4 — Endpoint Groups

An Endpoint Group collects endpoints that share policy treatment. An application EPG relates to a bridge domain and obtains endpoint membership through supported attachment/classification. EPG, VLAN and subnet are related but distinct abstractions.

Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.

### Evidence and rehearsal

- Model Web and App as separate EPGs and classify two endpoints before permitting only Web-to-App HTTPS.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- Web and App are accidentally placed in one ordinary EPG, bypassing the intended inter-EPG boundary.
- Restore separate membership and verify the intended contract as well as denied SSH; inspect any explicit intra-EPG policy separately.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
APIC GUI: Tenants > selected tenant > Application Profiles > selected application > Application EPGs
```

Restoration: Restore separate membership and verify the intended contract as well as denied SSH; inspect any explicit intra-EPG policy separately.

## s7-g5-t5 — Bridge Domains

A bridge domain defines an ACI Layer 2 forwarding scope and relates to a VRF for routing context. A BD can serve multiple EPGs and supported multiple subnets; it is not simply a one-to-one translation of a traditional VLAN.

Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.

### Evidence and rehearsal

- Draw Web/App EPG relationships to their BDs and one VRF, then state the intended routing and discovery policies.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- The EPG points to a BD associated with the wrong VRF; correct IP addressing alone cannot repair the context.
- Restore the intended BD/VRF relationship and validate gateway, resolution and cross-EPG policy without broad flooding shortcuts.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
APIC GUI: Tenants > selected tenant > Networking > Bridge Domains
```

Restoration: Restore the intended BD/VRF relationship and validate gateway, resolution and cross-EPG policy without broad flooding shortcuts.

## s7-g5-t6 — Contracts

An ACI contract expresses permitted relationships between policy groups using subjects and filters. A contract must be attached with the intended roles and realized on the relevant switches. It is not automatically a stateful application firewall.

Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.

### Evidence and rehearsal

- Define a TCP destination-443 Web consumer/App provider rule and retain an explicit destination-22 denial test.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- A broad filter admits SSH while the intended application requirement was HTTPS only.
- Restore the scoped filter and verify forward and return behavior plus denied SSH without claiming stateful inspection.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
APIC GUI: Tenants > selected tenant > Contracts
APIC GUI: Tenants > selected tenant > Filters
```

Restoration: Restore the scoped filter and verify forward and return behavior plus denied SSH without claiming stateful inspection.

## s7-g5-t7 — Application Profiles

An application profile organizes related EPGs within a tenant so an application policy structure can be managed coherently. It is an organizational policy container, not an independent forwarding or security boundary by its name alone.

Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.

### Evidence and rehearsal

- Build a three-tier profile and document the exact Web-to-App and App-to-Database service relationships.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- The operator assumes all EPGs in one application profile can communicate because the profile exists.
- Retain the organization but restore explicit scoped relationships and verify each permitted and prohibited tier flow.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
APIC GUI: Tenants > selected tenant > Application Profiles
```

Restoration: Retain the organization but restore explicit scoped relationships and verify each permitted and prohibited tier flow.

## s7-g5-t8 — Tenants

An ACI tenant is a policy-administration container for application and networking objects. Effective isolation depends on VRF, BD, EPG and contract relationships plus any deliberate shared services; tenant names alone do not prove impermeable network separation.

Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.

### Evidence and rehearsal

- Design Blue and Red tenants with separate VRFs and a written decision on whether any shared service is permitted.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- A broad shared-service relationship permits an unintended Red-to-Blue operation despite different tenant names.
- Remove only the unintended owned relationship and verify required shared services plus denied cross-tenant flows.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.

### Guided read-only commands

```text
APIC GUI: Tenants > selected tenant > Networking > VRFs
APIC GUI: Tenants > selected tenant > Contracts
```

Restoration: Remove only the unintended owned relationship and verify required shared services plus denied cross-tenant flows.

## Integrated reference schedule

The following addresses, rates and roles are invented documentation-range inputs. The offline runner evaluates known-unicast eligibility, not BGP sessions, unknown-unicast flooding, real vPC behavior, storage I/O, firewall HA or application transactions. It does not issue Cisco configuration.

| Leaf | VTEP identity | Spine attachments |
|---|---|---|
| L1 | 203.0.113.11 | S1 and S2; 100 Gb/s each; IP MTU 1600 |
| L2 | 203.0.113.12 | S1 and S2; 100 Gb/s each; IP MTU 1600 |
| L3 | 203.0.113.13 | S1 and S2; 100 Gb/s each; IP MTU 1600 |
| L4 | 203.0.113.14 | S1 and S2; 100 Gb/s each; IP MTU 1600 |

| Endpoint | Tenant / EPG | IPv4 | L2 VNI | Leaves |
|---|---|---|---|---|
| web | Blue / Web | 192.0.2.10 | 10100 | L1, L2 |
| app | Blue / App | 192.0.2.20 | 10100 | L3, L4 |
| storage | Blue / Storage | 192.0.2.30 | 10100 | L3, L4 |
| red | Red / Audit | 198.51.100.10 | 10200 | L2 |
| firewall-a | Blue / Border | 192.0.2.50 | 10100 | L3 |
| firewall-b | Blue / Border | 192.0.2.51 | 10100 | L4 |

Blue-VNI 10100 imports only RT 65000:10100. Red-VNI 10200 imports only RT 65000:10200. Each synthetic type-2 record carries its endpoint MAC/IP and declared destination leaf set. Dual-leaf attachments are abstract intent: actual supported vPC/EVPN anycast addressing, peer links, keepalive routing and compatibility must be engineered separately. Domain 10 names L1/L2 and domain 20 names L3/L4; no vPC timing or configuration is emulated.

The baseline Web-to-App flow crosses disjoint leaf pairs. A 1500-byte inner IP packet becomes a 1550-byte outer IPv4 packet in the untagged-inner case, fitting the declared 1600 IP MTU. One-spine loss leaves 100 Gb/s per leaf; 150 Gb/s of inter-leaf demand would no longer fit that envelope. The path predicate does not simulate offered traffic or queueing.

### Separate ACI mapping

| Tenant | VRF | BD / subnet | Application profile and EPGs |
|---|---|---|---|
| Blue | Blue-VRF | Blue-BD / 192.0.2.1/24 gateway intent | ThreeTier: Web, App, Storage, Border |
| Red | Red-VRF | Red-BD / 198.51.100.1/24 gateway intent | AuditApp: Audit |

| Consumer | Provider | One-way service intent | Expected |
|---|---|---|---|
| Blue Web | Blue App | TCP destination 443 | Permitted |
| Blue Web | Blue App | TCP destination 22 | Denied |
| Blue App | Blue Storage | TCP destination 3260 | Permitted |
| Blue Web | Blue Storage | TCP destination 3260 | Denied |
| Red Audit | Blue App | TCP destination 443 | Denied |

This ACI alternative assumes correctly attached endpoints and the required forwarding context. It evaluates inter-EPG TCP intent only. It does not certify return direction, state tracking, preferred groups, vzAny, shared services, contract inheritance or service graphs. IP storage uses an iSCSI service intent, not a Fibre Channel attachment through the spines. Firewall nodes describe border placement; external routing, state synchronization, asymmetric return paths and gateway HA remain explicit design tasks rather than tested outcomes.

### Reproduce baseline → fault → exact restore

1. Run `python labs/cisco-dc-fabric.py` to view help without creating a plan.
2. Run `python labs/cisco-dc-fabric.py --run`. Retain its JSON, baseline hash and three event descriptions.
3. Explain why withdrawing the App route denies known-unicast eligibility while all eight underlay links remain up. Unknown-destination flooding is intentionally excluded.
4. Confirm `restored: true` and `cleaned: true`; restoration writes identical serialized baseline bytes before removing the owned temporary directory.
5. Optionally run `python labs/cisco-dc-fabric.py --run --inject-failure fault`; expected result is INTERRUPTED with restored/cleaned true. An interrupted rehearsal is not normal completion.
6. Compare the separate ACI service table. APIC unavailability alone does not remove already deployed policy in the model. Removing deployed policy does.
7. On a separately authorized disposable Cisco target, replace declarations with actual operational and packet/service evidence using the exact supported release procedures. Do not present this offline JSON as target output.

## lab-7 — Cisco Data Center Lab

The Cisco Data Center lab integrates a declared two-spine/four-leaf topology, server/storage/firewall attachments, VXLAN byte budgeting, EVPN reachability and tenant isolation. A separate ACI policy design expresses similar service intent without mixing NX-OS and APIC configurations.

Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.

### Evidence and rehearsal

- Run the downloadable offline rehearsal and retain baseline, one-fault, exact-restore and cleanup evidence for the integrated design.
- Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.
- Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.
- The Blue App type-2 route is withdrawn in the owned JSON fixture while every underlay link remains available.
- Restore byte-identical baseline JSON, re-evaluate Blue delivery eligibility and Red isolation, and confirm removal of the owned temporary directory.
- If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.
- Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.
- Run python labs/cisco-dc-fabric.py --run. It evaluates synthetic topology, route, MTU and policy records in memory and an owned temporary directory; it sends no traffic and modifies no device.

### Guided read-only commands

```text
python labs/cisco-dc-fabric.py --run
```

Restoration: Restore byte-identical baseline JSON, re-evaluate Blue delivery eligibility and Red isolation, and confirm removal of the owned temporary directory.

