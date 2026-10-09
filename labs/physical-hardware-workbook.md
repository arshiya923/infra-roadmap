# Physical Hardware operational workbook

Twenty tabletop incidents. Inputs and incident records are authored, not captured from hardware. No device credentials, live endpoints or destructive commands are required. Reused foundation worksheets retain their visible scope labels.

For each incident record asset/model/version, observer, time, attachment, supported procedure, expected result, failed boundary and exact restoration evidence. Physical installation, energized electrical work and storage modification require approved platform-specific procedures and are not performed by this workbook.

## hardware-0 — HPE ProLiant

Foundation: s6-g0-t0 (Server Hardware).

Boundary: ProLiant model, generation and supported option population

Incident: A ProLiant has an amber health indication after a memory expansion; the OS still boots.

Investigate: Compare the exact server maintenance guide, DIMM slot population and hardware event record. Successful boot does not establish a supported memory layout.

Acceptance: Record the supported slot map, resolved hardware event and workload memory observation; retain the original DIMM arrangement for qualified rollback.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-1 — Dell PowerEdge

Foundation: s6-g0-t0 (Server Hardware).

Boundary: PowerEdge Service Tag, controller and physical slot identity

Incident: A PowerEdge replacement drive appears in inventory, but its expected virtual disk is still degraded.

Investigate: Correlate Service Tag, controller, enclosure and bay with the controller event history. Do not initialize a disk or import a foreign configuration based only on a drive LED.

Acceptance: Require the intended virtual disk state, completed supported recovery, application read verification and a separately tested backup.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-2 — Cisco UCS

Foundation: s6-g5-t3 (CIMC).

Boundary: UCS management ownership and server attachment

Incident: A UCS C-Series server is reachable through CIMC but an operator cannot apply the expected standalone network setting.

Investigate: Establish whether the server is standalone or controlled by UCS Manager/Intersight. Controller reachability does not establish which manager owns the setting.

Acceptance: Retain the documented ownership mode, matching policy source and intended host NIC/HBA attachment. Mode conversion is outside this exercise.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-3 — Rack Servers

Foundation: s6-g0-t1 (Rack Servers).

Boundary: Rack server rail, depth and service envelope

Incident: A 2U server fits free rack units, but its rails and rear cable bend radius collide with the installed PDU.

Investigate: U-height is only the vertical constraint. Check rail kit support, usable depth, connector clearance, load and service access before assigning the location.

Acceptance: Produce an elevation plus measured depth/clearance and qualified mounting approval; move the proposed location on paper and recheck all constraints.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-4 — Blade Servers

Foundation: s6-g0-t2 (Blade Servers).

Boundary: Blade enclosure shared failure domain

Incident: Two redundant application blades use different bays in one enclosure and lose service together during an enclosure outage.

Investigate: Different blade bays still share enclosure power, cooling and interconnect dependencies. Trace the service through those parents.

Acceptance: Show an alternative placement across independent enclosures and verify the declared survivor capacity in the plan; real failover remains unexecuted.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-5 — Storage Arrays

Foundation: s8-g0-t3 (SAN).

Boundary: Array controller, volume and initiator access

Incident: Both host HBAs are logged into the fabric, but the required array volume is absent from the host.

Investigate: Fabric login and zoning do not establish array-side presentation. Trace initiator identity, volume mapping, controller access and host multipath discovery.

Acceptance: Correlate the same volume identity across array and host, verify authorized access and excluded-host isolation, and retain application-level evidence.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-6 — HPE MSA

Foundation: s8-g2-t5 (Multipathing).

Boundary: MSA host initiator mapping and supported multipathing

Incident: An HPE MSA host retains one path after an HBA replacement although both physical links are up.

Investigate: Compare the replacement initiator identity with the host mapping, both fabrics and supported host multipath configuration. Controller redundancy alone does not create both host paths.

Acceptance: Document the exact MSA generation/firmware, supported host combination, correct initiators and expected restored paths to the same volume.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-7 — Dell EMC

Foundation: s8-g2-t4 (LUN).

Boundary: Dell storage product identity and host presentation

Incident: An operator receives a Dell EMC runbook without a product name and proposes using it on a PowerStore volume.

Investigate: Dell EMC is a broad product label. Identify the installed product and release before choosing management, mapping, replication or recovery instructions.

Acceptance: For the PowerStore teaching example, record the intended host or host group and volume mapping; verify host-visible identity and access. Do not transfer this procedure to Unity or PowerMax.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-8 — NetApp

Foundation: s8-g2-t3 (Zoning).

Boundary: ONTAP SVM, igroup and LUN mapping

Incident: An ONTAP FC host logs into the fabric but sees no intended LUN; its replacement HBA WWPN is absent from the igroup.

Investigate: An igroup identifies permitted initiators. Zoning and an existing LUN are insufficient when the correct initiator is not in the group associated with that LUN mapping.

Acceptance: Correlate SVM, LUN path, igroup members, mapping and supported reporting paths; verify intended access and that an excluded host still lacks access.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-9 — SAN Switches

Foundation: s8-g2-t6 (SAN Switch).

Boundary: Fabric A/B separation and endpoint identity

Incident: Two SAN switches exist, but both host initiators are cabled into fabric A.

Investigate: Switch count does not establish independent end-to-end paths. Trace initiator, switch, target port and upstream power for each path.

Acceptance: Produce two complete supported paths and a named single-fabric loss expectation; confirm application I/O separately on a real approved target.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-10 — Brocade

Foundation: s8-g2-t7 (Brocade fundamentals).

Boundary: Brocade defined versus effective zoning

Incident: A Brocade alias and zone were edited in the defined configuration, but the host still cannot reach the target.

Investigate: Compare defined and effective zoning in the correct fabric and logical-switch context. An edited candidate is not proof that the intended active policy permits the WWPN pair.

Acceptance: Retain the effective membership and original scoped configuration, verify target and host paths, and separately test allowed and prohibited access.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-11 — Cisco MDS

Foundation: s8-g2-t8 (Cisco MDS fundamentals).

Boundary: MDS VSAN and active zone-set context

Incident: An MDS zone contains the correct WWPNs, but it is in VSAN 20 while the relevant interfaces belong to VSAN 10.

Investigate: A zone name alone is insufficient. Compare interface VSAN membership, endpoint login and the active zone set in the same VSAN.

Acceptance: Require matching interface/fabric scope, active policy, array mapping and host evidence before declaring service restored.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-12 — UPS

Foundation: s6-g4-t2 (UPS).

Boundary: UPS load-dependent runtime and shutdown budget

Incident: A supplied runtime curve gives 12 minutes at the declared load; shutdown needs 9 minutes and the plan reserves 4 minutes.

Investigate: The plan is short by 1 minute because 9 + 4 exceeds 12. Name the load and battery assumptions; watt-hour arithmetic alone does not validate a runtime curve.

Acceptance: Revise the budget or supported capacity plan and retain tested shutdown ordering. Battery transfer, electrical work and actual shutdown are not executed here.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-13 — PDU

Foundation: s6-g4-t3 (PDU).

Boundary: PDU circuit identity and surviving-feed load

Incident: PSU A and PSU B use differently colored PDUs, but both PDUs are supplied by the same upstream circuit.

Investigate: The shared circuit remains a single failure domain. Trace both paths to their source and check the full surviving load against approved circuit and outlet limits.

Acceptance: Retain source/circuit/outlet records plus a qualified capacity review. Color and dual cords are not proof of independence.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-14 — Rack Management

Foundation: s6-g4-t0 (Rack design).

Boundary: Rack elevation and change-controlled asset location

Incident: The rack drawing shows U20 free, but an unrecorded 2U device occupies U19–20.

Investigate: Reconcile physical asset identity and the elevation before approving an installation. A 2U interval starting at U19 occupies both U19 and U20.

Acceptance: Correct the controlled elevation, cable/port mapping and power allocation; independently verify the new proposal has no overlap.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-15 — Environmental Monitoring

Foundation: s6-g4-t4 (Cooling).

Boundary: Environmental sensor location, freshness and alert delivery

Incident: A rack inlet probe reports normal temperature with a timestamp 45 minutes old while a nearby server reports a new inlet alarm.

Investigate: Treat stale telemetry as unknown current state. Compare sensor placement, timestamps, collection health and independent current readings before concluding that cooling is normal.

Acceptance: Require fresh inlet observations, supported thresholds and an acknowledged test alert through the monitoring path; room average and rack exhaust are different measurements.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-16 — Out-of-Band Management

Foundation: s6-g5-t0 (Out-of-band management).

Boundary: Independent recovery access path

Incident: The server OS is down and the management jump host runs as a VM on that same server.

Investigate: The proposed recovery path depends on the failed workload. Trace administrator entry, authentication, network and power dependencies end to end.

Acceptance: Document an independently reachable authorized recovery path; separately verify read access and protected control operations on an approved target.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-17 — iLO

Foundation: s6-g5-t1 (iLO).

Boundary: iLO generation, role and feature entitlement

Incident: An iLO user can view health but cannot launch a requested remote-console feature.

Investigate: Distinguish supported generation/firmware, licensing or entitlement and user privileges from a network failure. Health access proves only the permitted operation.

Acceptance: Record the exact operation and documented feature requirements, then verify with an authorized role; do not grant blanket administrator access as a diagnostic shortcut.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-18 — iDRAC

Foundation: s6-g5-t2 (iDRAC).

Boundary: iDRAC dedicated or shared NIC attachment

Incident: iDRAC becomes unreachable after a host-facing switchport change even though standby power is present.

Investigate: Check whether management uses a dedicated or shared NIC and compare its VLAN, port and routing path. OS independence does not guarantee physical network independence.

Acceptance: Restore only the owned path setting and verify trusted HTTPS plus the intended read operation; preserve alternate recovery access.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

## hardware-19 — CIMC

Foundation: s6-g5-t3 (CIMC).

Boundary: CIMC authority and management-plane evidence

Incident: CIMC displays healthy hardware while a host application is unavailable.

Investigate: Controller health and application reachability describe different layers. Preserve the hardware evidence and investigate host boot, network, storage and application dependencies.

Acceptance: Require a timestamped hardware observation and a separate original application transaction; never turn a CIMC green indicator into an application availability claim.

Rehearsal: record baseline assumptions; change one owned plan input; predict and explain failure; restore the original input; compare original allowed and prohibited operations. Record unexecuted target checks explicitly.

