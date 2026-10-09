# Cisco Device Mastery — guided evidence workbook

All cases below are authored teaching scenarios, not captured device transcripts. Commands are guided and unexecuted on Cisco targets. The separate Python fixture exercises only a declared compatibility checklist; it does not emulate any Cisco device.

## Required evidence record

Record: exact PID, serial redacted, OS, release, mode, license/features, topology, management recovery path, source applicability, baseline, one scoped fault, narrow repair, positive test, denied/control test, rollback and cleanup. Keep unknown values unknown.

## Optional target procedure

Use only an owned isolated compatible target. Capture its baseline and confirm console access first. Translate the stated fault into an exact reviewed change using the installed-release guide; the lesson deliberately does not supply universal write commands. Do not perform power, reload, fabric merge, image conversion or dual-link failures without a separate platform runbook. Restore the captured baseline and prove both intended service and isolation.

## Local executable worksheet

Run `python labs/device-preflight.py --run` to calculate baseline, unknown-version rejection, declared failure and restoration. No files, sockets, credentials or devices are accessed. A passing worksheet means only that supplied declarations satisfy its rule.

## device-0 — Catalyst 2960 / 2960X

2960-X IOS 15.2(2)E VLAN teaching reference; original 2960 images and feature sets must be checked separately. Treat these as existing-estate practice, not a current purchase recommendation.

Baseline: Authored case: workstation A is in VLAN 20 on Gi1/0/1; the uplink carries VLANs 10 and 20 to an external gateway. VLAN 10 management still works.

Fault: After an uplink edit, its allowed list contains only VLAN 10. VLAN 20 fails although both physical interfaces remain up.

Recovery acceptance: Restore VLAN 20 on the owned uplink without replacing the other allowed VLANs. Verify endpoint MAC learning, VLAN 20 gateway traffic both ways and continued VLAN 10 management.

Guided observations (unexecuted):

```text
show version
show vlan brief
show interfaces trunk
show mac address-table dynamic
```

Design decision: Place gateways according to verified routing capability rather than assuming all 2960 variants are identical. Record the exact image, uplink media and management dependency before a migration.

## device-1 — Catalyst 3560 / 3750

IOS 15.0(2)SE / 15.2(1)E 3560-X and 3750-X references illustrate the mechanism; check the original 3560/3750 image and SDM support independently.

Baseline: Authored case: VLANs 20 and 30 have live SVIs and correct endpoint gateways. Hosts reach their own gateway but not the other subnet.

Fault: The teaching baseline lost its ip routing setting; both VLANs still switch locally.

Recovery acceptance: On the isolated supported multilayer target, restore the captured routing setting. Verify both connected routes, bidirectional cross-VLAN traffic and the intended inter-VLAN deny rule.

Guided observations (unexecuted):

```text
show version
show ip interface brief
show ip route
show sdm prefer
```

Design decision: Separate gateway availability from stack availability. A stack shares operational fate; select a resource template against actual route and MAC scale, then plan any required reload in the release guide.

## device-2 — Catalyst 9200

Catalyst 9200 family data sheet; feature and compatibility decisions require the installed IOS XE release guide. C9200, C9200L and compact variants are not interchangeable.

Baseline: Authored case: an access stack serves desks; an added member is cabled but never reaches the expected ready state.

Fault: The change record omitted the new member software version, so compatibility has not been established.

Recovery acceptance: Collect both versions and exact models, resolve compatibility using the matching release procedure and retest member readiness. Confirm the old member interfaces and endpoint VLANs still work.

Guided observations (unexecuted):

```text
show version
show inventory
show switch
show interfaces status
```

Design decision: Build a bill of materials from exact PIDs and supported combinations. Stage replacement membership before reconnecting production endpoints; keep numbering and port maps explicit.

## device-3 — Catalyst 9300

Catalyst 9300 family data sheet; C9300, C9300L and C9300X variants require exact stacking and power compatibility checks.

Baseline: Authored case: three lab APs need 30 W each. A supplied usable budget is 80 W after reserved loads; the last AP cannot receive the requested allocation.

Fault: The requested 90 W exceeds the supplied 80 W budget by 10 W. This is budget arithmetic, not a physical power measurement.

Recovery acceptance: Restore the approved power design or reduce only the owned test load. Recheck delivered power, AP operating mode, link state and client traffic; preserve the reserved loads.

Guided observations (unexecuted):

```text
show version
show inventory
show power inline
show switch
```

Design decision: Specify the endpoint power mode and failure budget as well as port speed. Validate stack data and power designs independently; do not infer a power pool from a data-stack cable.

## device-4 — Catalyst 9500

StackWise Virtual IOS XE 16.10 reference is a historical scoped example; supported models, links and restrictions must be resolved for the installed release.

Baseline: Authored case: a reviewed pair plan includes an SVL and a physically separate dual-active detection path. A technician proposes removing that separate path because the SVL is up.

Fault: The proposal removes evidence that the design can detect a split when the main interconnect fails.

Recovery acceptance: Retain the supported detection path, document independent cabling and perform only the approved single-fault lab procedure with console access. Verify pair role, bundle members and end-to-end traffic after restoration.

Guided observations (unexecuted):

```text
show version
show stackwise-virtual
show stackwise-virtual dual-active-detection
show etherchannel summary
```

Design decision: Compare one logical pair with independent routed nodes against the operational failure model. Avoid a dual-failure experiment merely to demonstrate resilience.

## device-5 — Cisco ISR 4000

ISR 4000 support portal and Cisco IOS XE QFP diagnostic guidance; throughput entitlement and command availability are release-specific.

Baseline: Authored case: a branch experiences loss during a service-heavy traffic interval; routing neighbors stay established and management CPU appears moderate.

Fault: The operator concludes that the router has spare capacity from management CPU alone, without packet-processing or drop evidence.

Recovery acceptance: Correlate QFP utilization and drop-counter deltas with the same traffic interval. Validate the actual service mix and entitlement before resizing or changing features; retest a bounded representative flow.

Guided observations (unexecuted):

```text
show version
show ip route
show platform hardware qfp active datapath utilization
show interfaces
```

Design decision: Choose a branch design using measured service throughput and failure demand. Interface speed is not a promise of encrypted or inspected throughput.

## device-6 — Cisco ASR

ASR 1000 IOS XE and ASR 9000 IOS XR are distinct teaching branches; no family-wide syntax or capacity is asserted.

Baseline: Authored case: a maintenance ticket says only ASR. The supplied inventory shows ASR 9000 with IOS XR; the attached runbook was written for ASR 1000 IOS XE.

Fault: The runbook targets the wrong operating system and cannot establish a valid change or rollback.

Recovery acceptance: Reject that runbook before writes. Identify the exact XR release and supported transaction/rollback procedure; review the candidate diff and verify the routing service on a disposable matching target.

Guided observations (unexecuted):

```text
show version
show inventory
```

Design decision: Require chassis, OS, release, modules, scale and service objectives in procurement and change records. A vague ASR label is insufficient for either.

## device-7 — Cisco ASA

ASA routed-mode IPv4 diagnostic teaching case; confirm ASA software version, NAT semantics and access-list placement before adapting it.

Baseline: Authored case: a client should reach one published HTTPS service. A NAT entry exists, but a synthetic packet-tracer evaluation reports a policy drop.

Fault: The operator treats the NAT mapping as permission and proposes a broad any-to-any allow rule.

Recovery acceptance: Inspect the matched policy and ASA address semantics; correct only the intended service rule in the isolated target. Verify HTTPS, the return flow and a denied management-port probe.

Guided observations (unexecuted):

```text
show version
show access-list
show nat detail
show conn
packet-tracer input inside tcp 192.0.2.10 49152 198.51.100.20 443
```

Design decision: Name the routed or transparent mode, contexts and failover design explicitly. Treat packet-tracer as a diagnostic prediction to corroborate with observed traffic.

## device-8 — Cisco Firepower

Threat Defense / management-center access-control teaching case; ASA images, FDM and FMC workflows must not be conflated.

Baseline: Authored case: the manager editor contains an approved HTTPS rule. The target still uses the previous deployed revision and a new client flow is denied.

Fault: The operator mistakes a saved manager edit for installed device policy.

Recovery acceptance: Review and deploy the intended revision to the owned target, then create a fresh test flow and inspect its matched rule. Confirm an excluded flow remains denied and preserve the previous revision for rollback.

Guided observations (unexecuted):

```text
show version
show managers
```

Design decision: Document whether FMC or FDM owns policy, target membership and a recoverable revision. Use the manager workflow instead of treating a diagnostic CLI as the policy source.

## device-9 — Cisco Aironet

Historical Aironet mode-conversion reference and wireless compatibility matrix; conversion availability and controller support are model-specific, not universal.

Baseline: Authored case: a lightweight Aironet AP has an IP address and can reach the controller subnet, but the compatibility matrix does not include the proposed AP/release pairing.

Fault: The operator repeatedly changes DHCP despite an unsupported proposed pairing.

Recovery acceptance: Resolve the supported AP/controller combination before configuration. Keep the original approved controller or a compatible lab image, then verify join, client authentication and client DHCP separately.

Guided observations (unexecuted):

```text
show version
```

Design decision: Use legacy equipment for bounded learning with a migration plan. Do not imply every autonomous AP can be converted or every old AP can join a modern controller.

## device-10 — Cisco Catalyst Wireless

Catalyst APs with Catalyst 9800 tag/profile teaching scope; exact AP support, bands and power requirements come from the current compatibility and hardware guides.

Baseline: Authored case: an AP joins successfully and the intended WLAN profile exists, but the AP policy tag maps only a different WLAN.

Fault: The intended SSID is missing on this AP because the relevant WLAN-to-policy mapping is absent from its assigned tag.

Recovery acceptance: Correct only the owned AP policy-tag mapping after recording the original assignment. Verify SSID visibility, authentication, expected client VLAN and absence of unauthorized WLANs.

Guided observations (unexecuted):

```text
show ap summary
show wireless tag policy summary
show wlan summary
```

Design decision: Keep AP hardware identity separate from the controller policy model. Plan a small AP canary and record its original tag assignments.

## device-11 — Cisco Wireless LAN Controller

Catalyst 9800 is the worked IOS XE example; AireOS terminology is compared conceptually, not translated command-for-command.

Baseline: Authored case: a centrally switched client authenticates but never obtains an address. Its policy selects VLAN 40, while the controller uplink permits only VLAN 10.

Fault: Client VLAN 40 is absent from the wired path at the declared central switching boundary.

Recovery acceptance: Restore the approved VLAN 40 path on the isolated controller uplink. Verify DHCP exchange, the client subnet, gateway access and policy isolation; do not edit the AP uplink as if this were local switching.

Guided observations (unexecuted):

```text
show version
show ap summary
show wlan summary
show wireless client summary
```

Design decision: Write the switching location into the topology before troubleshooting. Controller redundancy and AP support require matching release documentation, not only a shared vendor.

## device-12 — Cisco Nexus 3000

Nexus 3000 NX-OS 7.x Layer 2 and 9.3(x) Layer 3 interface teaching references; breakout is specific to port and platform.

Baseline: Authored case: a server expects four breakout lanes, but the supplied switch plan uses the port as one unbroken interface.

Fault: The physical connector is present, but the endpoint lane mapping and switch port mode disagree.

Recovery acceptance: Resolve a supported port/media/mode combination in the installed guide; schedule any disruptive mode conversion. Restore the documented baseline if lanes do not appear, then verify each intended lane and traffic path.

Guided observations (unexecuted):

```text
show version
show interface status
show interface capabilities
show port-channel summary
```

Design decision: Specify exact ports and optical compatibility in a rack plan. Never promise a breakout mode from the Nexus 3000 name alone.

## device-13 — Cisco Nexus 5000

Nexus 5000 FCoE/NPIV teaching reference; Ethernet-only and unified-port variants, licenses and release support differ.

Baseline: Authored case: Ethernet traffic is healthy on the converged link, but the intended virtual FC attachment has no fabric login after a binding edit.

Fault: The changed vFC binding no longer matches the intended Ethernet attachment.

Recovery acceptance: Restore the approved binding in an isolated supported converged lab. Verify login, correct VSAN, active zoning and host paths, while ensuring Ethernet service remains intact.

Guided observations (unexecuted):

```text
show version
show interface brief
show flogi database
show fex
```

Design decision: Document Ethernet and storage dependencies separately even when they share a cable. Do not attach ordinary switch topology to a FEX as though it were an independent leaf.

## device-14 — Cisco Nexus 7000

Nexus 7000 VDC overview and Layer 2 configuration references; VDC count and allocation constraints depend on supervisor, line card, license and release.

Baseline: Authored case: a port is visible in chassis inventory but missing from tenant VDC B. The supplied allocation record assigns it to VDC A.

Fault: The operator is inspecting the wrong resource ownership context.

Recovery acceptance: Verify the allocation and approved ownership before any reassignment. A planned move must evacuate the old service, preserve its configuration and validate both contexts after restoration or reassignment.

Guided observations (unexecuted):

```text
show version
show vdc
show vdc membership
show module
```

Design decision: Use VDCs for a supported administrative and resource partition, while documenting common chassis failure. Never describe two VDCs as independent physical switches.

## device-15 — Cisco Nexus 9000

Nexus 9000 release portal and ACI fabric overview; hardware/mode compatibility must be verified. The lesson does not propose an in-place mode conversion.

Baseline: Authored case: an ACI leaf learns both endpoints, but the supplied policy has no contract permitting the intended inter-EPG HTTPS flow.

Fault: The operator interprets endpoint discovery as permission and proposes an unrelated standalone NX-OS ACL change.

Recovery acceptance: Use the authoritative APIC policy to review and deploy the narrow intended contract in the isolated fabric. Validate the endpoint/EPG mapping, HTTPS flow and continued denial of an excluded service.

Guided observations (unexecuted):

```text
show version
```

Design decision: Choose mode according to the operational architecture before authoring changes. ACI deployment is not equivalent to configuring independent NX-OS boxes.

## device-16 — Cisco MDS SAN switches

MDS 9000 NX-OS Fabric Configuration Guide 9.x zoning scope; switch model, zoning mode and host/array compatibility remain target-specific.

Baseline: Authored case: an initiator and target are logged into VSAN 10. The desired zone exists in the full database but is absent from the active zoneset.

Fault: The operator assumes an edited zone is already enforced and starts changing host multipath settings.

Recovery acceptance: Review and activate the intended zoneset using the matching zoning-mode procedure in the isolated fabric. Verify only intended WWPN access, array masking and host paths; retain the previously active zoneset as rollback.

Guided observations (unexecuted):

```text
show version
show flogi database
show zoneset active
show zone
```

Design decision: Keep fabrics A and B independently documented and avoid changing both at once. Record WWPNs from authoritative device/array evidence rather than display aliases alone.

