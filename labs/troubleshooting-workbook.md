# Troubleshooting Mastery — incident workbook

All 21 records below are authored synthetic cases. No device output or physical repair is claimed.
Record scope, timestamp, observer, baseline, hypothesis, discriminating test, bounded change, rollback and recovery evidence.
The browser case desk lets you predict before revealing evidence. The separate Python lab executes only owned temporary-file operations.

## Eight-step diagnostic method

1. Define the problem: name the failed user operation, affected endpoints, start time and impact; distinguish a symptom from its cause.
2. Gather evidence: record observer, clock/epoch, current state and a comparable healthy baseline before clearing counters or changing configuration.
3. Identify the affected layer: trace the last successful handoff and the first failed one; shared dependencies may cross nominal layers.
4. Build hypotheses: list at least two plausible explanations and a prediction that could disprove each one.
5. Test safely: choose the least disruptive discriminating observation and bound duration, targets and collected data.
6. Apply corrective action: state the exact intended change, owner, stop condition and captured baseline for rollback.
7. Validate: repeat the original transaction under comparable conditions and verify required isolation, redundancy and observation-window behavior.
8. Document root cause: separate proven cause, contributing factors and unresolved hypotheses; retain a timeline, recovery evidence and follow-up owners.

These steps preserve the eight original roadmap method items. An incident may return to an earlier step when a test disproves a hypothesis.

## trouble-0 — Layer 1 troubleshooting

Baseline: A server NIC and access port report carrier up at the intended speed; gateway traffic succeeds.

Fault: After a patch-panel move, both ends report enabled but no carrier. The switch has no recent receive traffic.

Test: Trace the labelled cable end to end; compare peer identity, media, supported optics and receive light or link indication. Substitute one known-good compatible patch lead on an owned test link.

Interpretation: The failed boundary is physical continuity or transceiver compatibility; enabled is administrative intent, not carrier evidence.

Alternative: A disabled peer or err-disabled switch port also prevents useful service. Confirm administrative and protection state before blaming the cable.

Guard: Do not look into fiber or disconnect an unidentified production circuit. Record labels and preserve the original patch map.

Recovery: Both partners regain stable carrier at the expected speed; a bounded gateway and application test succeeds without new physical errors.

Challenge: Carrier returns but the gateway still fails. What comes next?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-1 — Interface errors

Baseline: At 12:00 an interface records 100 input errors and 20 output drops; at 12:01 those values remain unchanged.

Fault: During a slow transfer, output drops rise from 20 to 420 in 60 seconds while input CRC stays at zero.

Test: Take timestamped samples from the same interface and epoch; compare output queue drops with utilization and offered bursts. Preserve both endpoint observations.

Interpretation: There are 400 new output drops, about 6.67 per second. This supports an egress queue/capacity investigation, not proof of corrupt received frames.

Alternative: A counter reset or interface replacement invalidates subtraction. A low minute average can conceal microbursts.

Guard: Do not clear counters before collecting the incident interval. Increasing buffers can trade packet loss for latency and is not a universal repair.

Recovery: After the scoped queue or load correction, comparable traffic meets latency/loss objectives and the output-drop rate returns to its agreed baseline.

Challenge: The second counter is smaller than the first. May the drop rate be negative?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-2 — CRC errors

Baseline: A receiving port has a stable FCS/CRC count of 7 across two samples under ordinary load.

Fault: The receiver rises from 7 to 67 CRC errors in 30 seconds. A separate output-drop counter is unchanged.

Test: Localize the receiving interface and upstream segment, compare the peer and adjacent-hop counters, then change one compatible cable/optic component in a controlled window.

Interpretation: The receiver observed 60 additional corrupt frames, or 2 per second. The count localizes observed corruption but does not alone identify the faulty component.

Alternative: Duplex problems on legacy copper and forwarding of corrupted frames on some switch architectures can complicate localization; inspect the actual platform.

Guard: Save original samples and optic identity. Do not equate a lifetime nonzero counter with a continuing fault.

Recovery: Repeat the same traffic interval after repair: no new CRC errors at the identified receiver and the original application succeeds.

Challenge: CRC stops increasing during an idle minute. Has the repair been proved?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-3 — Duplex mismatch

Baseline: An owned 100 Mb/s copper test link has both partners negotiating full duplex with stable counters.

Fault: One partner is forced to 100/full; the other reports 100/half. Throughput collapses under bidirectional traffic and late collisions appear on the half-duplex side.

Test: Read configured and operational speed/duplex on both ends. Correlate the mismatch with load-sensitive collision and error deltas.

Interpretation: The partners disagree on medium access behavior. Carrier and equal speed do not establish duplex agreement.

Alternative: Bad cabling may also cause receive errors, but cannot explain away explicit contradictory duplex observations.

Guard: This fixture is legacy 10/100 copper. Do not generalize half-duplex forcing to modern fiber or all gigabit platforms.

Recovery: Restore a mutually supported negotiation policy on both partners; verify matching full duplex, stable counters and bidirectional application transfer.

Challenge: Why can a one-way ping look healthy?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-4 — VLAN troubleshooting

Baseline: Client port is access VLAN 20; both trunk endpoints carry VLAN 20; the gateway SVI is reachable.

Fault: Client carrier remains up, but VLAN 20 is missing from the uplink allowed list. VLAN 10 users on the same uplink work.

Test: Follow VLAN 20 from ingress classification through operational trunk membership and STP forwarding to the gateway; compare both trunk ends.

Interpretation: The failure is selective VLAN admission on the uplink, not proof of a dead physical link or failed entire switch.

Alternative: Wrong access VLAN or non-forwarding STP state produces a similar endpoint symptom; test these boundaries before altering the trunk.

Guard: Do not replace the allowed list with all VLANs. Capture exact existing membership for rollback.

Recovery: Restore only the intended VLAN membership; verify VLAN 20 gateway/application access and continued isolation from unauthorized VLANs.

Challenge: VLAN 20 now crosses the trunk but has no gateway reply. What evidence is missing?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-5 — STP troubleshooting

Baseline: A redundant triangle has one expected root and a stable alternate blocked path for VLAN 20.

Fault: After an unmanaged bridge is attached on two unprotected access ports, MAC addresses move repeatedly and broadcast volume rises. The expected forwarding tree no longer explains the observed physical paths.

Test: Record root identity, per-VLAN roles, topology-change timestamps and MAC moves; correlate the new physical connection and guard logs.

Interpretation: The attachment introduced an unexpected bridging path. A blocked alternate port itself is normal protection, not the cause to remove.

Alternative: A flapping legitimate link can also cause topology changes. A change counter alone does not prove a loop.

Guard: Never disable STP or clear a guard condition without resolving its trigger. Preserve an independent management path.

Recovery: Remove or correct the unauthorized lab bridge; confirm expected root/roles, stable MAC learning, traffic recovery and retained edge protection.

Challenge: Only one VLAN changes root. Should every instance be reset?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-6 — EtherChannel troubleshooting

Baseline: Two intended links are bundled in one LACP port-channel with matching trunk policy and a common peer.

Fault: One member is suspended after its VLAN settings diverge; the logical channel stays up with one member.

Test: Compare operational aggregation state, peer/system identity and member compatibility. Test multiple traffic flows and remaining capacity separately.

Interpretation: The logical link masks a loss of redundancy and capacity. A configured channel-group is not proof of member participation.

Alternative: One flow remaining on one member is normal hashing behavior and does not itself indicate a failed bundle.

Guard: Do not force a static channel to hide LACP mismatch. Preserve the working member and stop if peer identities differ.

Recovery: Restore compatible settings using the supported platform procedure; confirm both members bundle, allowed traffic works and a controlled single-link failure meets the objective.

Challenge: Two 1 Gb/s members are healthy. Must one TCP flow reach 2 Gb/s?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-7 — Routing troubleshooting

Baseline: Client 192.0.2.10 reaches service 198.51.100.20 through a router; both directions have valid routes.

Fault: A request reaches the service, but the service-side router has no route back to 192.0.2.0/24 in the relevant VRF.

Test: Check destination lookup and recursive next-hop resolution in both directions using the actual source and VRF. Compare endpoint capture with router forwarding evidence.

Interpretation: The observed request path is intact; the missing return route prevents the response from completing the transaction.

Alternative: A host firewall could suppress replies even with a valid return route. Establish whether a reply is generated before assigning all blame to routing.

Guard: Do not add a broad default route to conceal a missing specific path. Record ownership and the exact route to remove on rollback.

Recovery: Restore the intended return prefix in the correct table and verify a fresh application exchange from the original client without cross-VRF leakage.

Challenge: A more specific route points to a discard while a default is valid. Which wins?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-8 — OSPF troubleshooting

Baseline: Two point-to-point lab routers have matching OSPF area/timers and a Full adjacency with a learned remote prefix.

Fault: After a timer change, captured Hellos advertise different intervals and the adjacency disappears.

Test: Compare received Hello fields and interface settings at both peers within the same process/area. Separate neighbor formation from prefix origination and route installation.

Interpretation: The mismatched Hello timing is an adjacency acceptance fault in this supplied case, not evidence of BGP policy failure.

Alternative: No received Hello could instead mean filtering, carrier, addressing or passive configuration; an absent neighbor alone does not select one cause.

Guard: Do not restart every routing process or disable authentication as a diagnostic shortcut. Save original interface settings.

Recovery: Restore the captured compatible timer values; verify Full, the expected LSA, installed prefix/next hop and an endpoint exchange.

Challenge: Full returns but the destination is absent. What should be inspected next?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-9 — BGP troubleshooting

Baseline: Two lab BGP speakers are Established; an approved documentation prefix is advertised, accepted and installed.

Fault: The session remains Established after an inbound policy change, but the approved prefix is absent from the accepted routes.

Test: Compare advertised, received where supported, accepted and best-path/installed views for the exact prefix and address family; inspect the effective policy and next hop.

Interpretation: The supplied evidence points to route admission policy, not a TCP session failure. Established describes the session rather than acceptance of every prefix.

Alternative: A missing origin advertisement or unresolved next hop can also remove an installed route. Determine the first view where the prefix disappears.

Guard: Never permit every prefix to test policy. Use supported soft refresh only when required; avoid disruptive hard resets.

Recovery: Repair the narrow policy clause; verify approved prefix admission and installation, rejection of an unauthorized prefix and endpoint reachability.

Challenge: A prefix is accepted but not installed. What separates this from filtering?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-10 — DHCP troubleshooting

Baseline: A VLAN 20 client receives a lease from the intended subnet through a relay to the server.

Fault: DISCOVER reaches the relay but no forwarded request appears at the server after the helper destination changes.

Test: Correlate transaction identity across client, relay and server observations; verify relay destination, routing and filters before changing the scope.

Interpretation: The first demonstrated failed handoff is relay-to-server delivery. Pool exhaustion is not supported until the request reaches the server.

Alternative: A server receiving DISCOVER without offering a lease warrants scope/availability checks; an OFFER failing to return shifts the investigation to the return path.

Guard: Use a disposable client for renew/release testing. Do not interrupt active production leases or introduce an unauthorized DHCP server.

Recovery: Restore the intended relay target; verify DORA, subnet/mask/gateway/DNS options and a fresh client service test; confirm other scopes remain isolated.

Challenge: An address is leased but DNS is wrong. Is DHCP fully accepted?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-11 — DNS troubleshooting

Baseline: The intended resolver returns the current A record for app.example.test and the application uses it successfully.

Fault: The authoritative test zone has the new record, but one recursive resolver continues returning a cached NXDOMAIN before its negative TTL expires.

Test: Compare the exact name, type and resolver with an authoritative query and the cached answer/TTL. Distinguish NXDOMAIN, NOERROR with no requested data, SERVFAIL and timeout.

Interpretation: The supplied mismatch is negative-cache state at one resolver; an authoritative record does not instantly invalidate every cache.

Alternative: A different search suffix, split DNS view or queried record type can make two apparently similar queries non-equivalent.

Guard: Do not flush every resolver or point clients at public DNS to bypass an internal view. Retain query details without sensitive names.

Recovery: After the scoped expiry or authorized cache action, the intended resolver returns the correct answer and a new application request reaches the intended endpoint.

Challenge: SERVFAIL appears instead of NXDOMAIN. May you call the name nonexistent?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-12 — NAT troubleshooting

Baseline: Inside client 192.0.2.10:53000 maps to documentation address 203.0.113.5:40001 for an approved service.

Fault: The request is observed after translation, but the response returns through a different unsynchronized stateful gateway.

Test: Correlate original and translated five-tuples at ingress/egress and the returning gateway; check mapping lifetime, routing and filtering separately.

Interpretation: The reply misses the device holding the mapping. A successful outbound translation does not prove reverse delivery.

Alternative: Port exhaustion or a rule that never matches would instead prevent the outbound mapping; neither is proved by this successful translated request.

Guard: Do not clear all NAT state or expose inside addresses to diagnose one flow. Keep the test tuple bounded and document translation order for the platform.

Recovery: Restore the intended symmetric/state-compatible path; verify a new connection and its reverse translation, while unsolicited traffic remains denied.

Challenge: Ping works but a new TCP application fails. Has NAT been cleared?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-13 — ACL troubleshooting

Baseline: Policy permits a test client to TCP 443 on a service and denies unrelated access.

Fault: A broader deny appears before the intended permit. The deny counter increases on each fresh test connection.

Test: Read effective rule order, attachment interface/direction, address family and pre/post-NAT tuple context; correlate a bounded test with counter deltas.

Interpretation: First matching rule order shadows the later permit for this test. Merely finding a permit in the text is insufficient.

Alternative: A correct ACL on the wrong interface or direction will not explain a matching counter there; confirm the real traffic path.

Guard: Keep management access and a rollback path. Do not append an any-any permit as a connectivity experiment.

Recovery: Apply the reviewed narrow ordering correction and verify both the permitted transaction and a deliberately denied control flow.

Challenge: The permit counter rises but the service fails. What remains unproved?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-14 — Firewall troubleshooting

Baseline: A new TCP connection traverses the intended firewall zones and receives an allowed response.

Fault: After a routing change, SYN enters firewall A while SYN-ACK reaches firewall B without synchronized session state.

Test: Correlate both directions of a new five-tuple with route, zone, rule and session/drop reason evidence. Distinguish existing sessions from new-session policy.

Interpretation: Asymmetric traversal lacks the required state on B in this case; a permissive-looking static rule alone cannot establish session acceptance.

Alternative: TLS negotiation or an unhealthy listener can fail after a successful handshake. A firewall allow log is not proof of application health.

Guard: Do not disable inspection or expose all zones. Sanitize captures and change only the demonstrated path or rule.

Recovery: Restore a supported state-compatible traffic path; verify a new handshake and application transaction, denied control traffic and the agreed HA behavior.

Challenge: Old connections work but new ones fail after a policy edit. What comparison helps?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-15 — Wireless troubleshooting

Baseline: A test client associates with the intended AP, authenticates, receives an address and opens the service.

Fault: The client is associated and authenticated but remains without a lease. Controller evidence places it at the DHCP stage.

Test: Inspect client state and correlate DHCP requests across the WLAN/VLAN mapping and relay. Compare RF retries separately from addressing evidence.

Interpretation: The supplied evidence has passed association/authentication but not addressing. Strong signal alone does not establish network service.

Alternative: High retry rates or roaming problems require RF/channel evidence; they cannot be inferred solely from an absent address.

Guard: Use an owned test SSID/client. Never turn off encryption or authentication to make the status look healthy.

Recovery: Correct the intended WLAN-to-VLAN or relay handoff; confirm authentication remains required, a correct lease arrives and a fresh application request works.

Challenge: The client has a lease but stalls after roaming. What should be correlated?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-16 — Server hardware troubleshooting

Baseline: A rack server has redundant power feeds, normal thermal readings and a stable hardware event log.

Fault: Guests remain running but the management controller records loss of PSU B input at the same time as a rack power alert.

Test: Compare PSU identity, input state and PDU/feed map with timestamped events. Distinguish lost input from an internal PSU failure before replacing parts.

Interpretation: The server has lost power redundancy despite continued service. The shared feed observation makes upstream power a candidate requiring inspection.

Alternative: An old unacknowledged alarm may not be active; correlate current sensor state and incident time rather than only alarm color.

Guard: Electrical work is for qualified personnel. Do not pull the surviving feed or power-cycle a running host as a first test.

Recovery: An authorized operator restores the intended independent input; both supplies report healthy and the original workload remains stable through the observation window.

Challenge: Both PSUs show green but connect to one PDU. Is feed independence established?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-17 — RAID troubleshooting

Baseline: A documented four-member RAID 5 virtual disk is optimal with a verified independent backup.

Fault: The virtual disk is degraded after one member is reported failed; applications still read data.

Test: Capture controller/virtual-disk/member identifiers, error logs, rebuild state and backup status. Match enclosure/slot and serial number before proposing replacement.

Interpretation: The array is serving data with reduced redundancy. Continued reads do not establish safety from a second failure or unreadable sector.

Alternative: A cable/backplane/controller fault can make several members disappear together. Do not assume simultaneous disk media failures.

Guard: Do not initialize, force online, clear foreign metadata or replace guessed disks. Stop when member identity or recoverable state is uncertain.

Recovery: Use the exact supported controller recovery procedure in an authorized lab; verify the correct member, completed rebuild/consistency status and application data against a known reference.

Challenge: Rebuild is complete. Why test a backup restore separately?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-18 — SAN troubleshooting

Baseline: A host has the intended LUN through two independent FC fabrics and supported multipath behavior.

Fault: After a zoning edit, fabric A remains operational but the expected target login/path on fabric B disappears.

Test: Trace HBA/WWPN login, effective zone membership, target port, LUN masking and host multipath inventory in order. Compare the two fabrics without assuming they are identical.

Interpretation: The first observed loss follows the changed fabric-B admission boundary. One surviving path explains service continuity while redundancy is impaired.

Alternative: Correct zoning without LUN masking still leaves the host without the intended device; each boundary needs its own evidence.

Guard: Do not merge fabrics, zone every initiator to every target or rescan blindly during uncertain storage state. Preserve WWPN and LUN identity.

Recovery: Restore the intended narrowly scoped zone membership; verify target visibility, correct LUN identity, multipath state and controlled failover under the supported policy.

Challenge: A host sees a device with a familiar size. Is it safe to mount?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-19 — VMware troubleshooting

Baseline: An ESXi host is manageable and a VM can perform an application read from its datastore.

Fault: Management remains reachable while VM I/O stalls; host evidence shows all paths to that datastore unavailable.

Test: Correlate VM symptoms with host storage/path events, datastore identity and fabric/array observations. Distinguish management health from guest I/O and APD from an explicit permanent-loss report.

Interpretation: The affected dependency is datastore access despite a functioning management plane. The fixture reports all-path unavailability, not proof of permanent data loss.

Alternative: CPU ready time or guest service faults can also cause apparent slowness. Check whether symptoms correlate specifically with the affected datastore.

Guard: Do not mass-reboot hosts, detach active devices or delete/recreate a datastore. Capture support evidence and follow release-specific recovery guidance.

Recovery: Restore the supported storage path, verify host/datastore accessibility and a fresh application I/O operation; reconcile HA/restart effects and consistency before closure.

Challenge: vCenter is down but guests work. Should all hosts be restarted?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

## trouble-20 — Data center outage analysis

Baseline: Two application racks have separate compute capacity and an agreed client availability objective.

Fault: At 09:00 a shared DNS service fails; both racks lose name-based application access while direct addressed test endpoints remain reachable.

Test: Build a timestamped impact/dependency map with clock uncertainty; compare DNS queries, direct endpoint tests and recent changes. Assign incident coordination and a separate recovery owner.

Interpretation: The evidence favors a shared name-resolution dependency over simultaneous independent compute failures. Correlation narrows the hypothesis but still requires a confirming test.

Alternative: A direct-IP probe may bypass TLS host naming or a load balancer; use it only to isolate a boundary, not to claim application recovery.

Guard: Preserve the incident timeline and independent communication channel. Prefer reversible mitigation; never perform competing uncoordinated changes.

Recovery: Recover the scoped DNS dependency, verify name-based transactions from both racks and denied controls, then observe sustained service before closing and record follow-up owners.

Challenge: Service is restored at 09:12 after impact starts at 09:00. Does that prove RPO zero?

Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.

