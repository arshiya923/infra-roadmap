# Network Services evidence workbook

This is a guided disposable-target rehearsal. Browser cases are synthetic declarations, not captured service traffic. No target configuration, live NTP/SNMP/AAA, vendor application installation or physical switching was executed for this workbook.

## Preparation and recovery boundary

Use isolated VMs or a supported lab device with console access. Record product version, management source, destination, protocol, clock and credential scope. Save scoped baseline settings securely. Keep the console-local recovery account independent of central AAA; test it before attaching any method list. Use documentation addresses only as placeholders. Never expose a DHCP server or permissive collector on a production uplink. Each fault changes one owned lab setting; restore it before moving on. Retain both positive and negative observations, then restore all original settings and verify the original transaction.

## s4-g0-t0 — DHCP Server

Allocate a lease from the intended scope without confusing allocation with connectivity.

Observation reference (Cisco IOS XE17 supported lab router; guided, not executed):

```text
show ip dhcp binding
show ip dhcp pool
```

Compare committed client bindings and pool capacity; inspect scoped configuration separately.

- On a disconnected lab segment192.0.2.0/24, reserve/exclude gateway192.0.2.1 and server192.0.2.10. Define owned pool LAB with network192.0.2.0/24, gateway192.0.2.1 and intended resolver192.0.2.53; choose an explicit lease and record actual client identifier. Validate syntax on the target before applying.
- In the disposable pool, deliberately remove usable dynamic capacity without touching other scopes. Record server capacity and the client exchange; restore the original range/exclusions rather than deleting unrelated bindings.
- Obtain a fresh client Ack, inspect address/prefix/gateway/DNS and binding lifetime, then test the intended resolver and gateway separately.
- Open the DHCP Server evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: A wrong scope must be repaired at subnet selection; increasing its size does not fix selection. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: Exhaustion can suppress allocation despite a healthy server process. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: A valid address with a wrong gateway or DNS still breaks the intended client experience. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Define nonoverlapping subnet scopes, gateway/DNS options, exclusions, lease duration and intended client identifiers. Preserve binding state and conflict records before changing reservations. Use a supported redundancy design rather than assuming two independently overlapping pools form failover.

Expected evidence: A binding and available capacity must be correlated with actual client options and a valid lease.

Challenge: How do you demonstrate recovery from exhaustion?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g0-t1 — DHCP Relay

Carry DHCP across a router while preserving the client-subnet selection evidence.

Observation reference (Cisco IOS XE17 lab SVI; addresses are placeholders; guided, not executed):

```text
show running-config interface Vlan20
show ip route 192.0.2.10
```

Inspect helper attachment and the route to the owned server; obtain packet evidence separately.

- On the owned client SVI192.0.2.1/24, attach a helper to an isolated server198.51.100.10. Ensure the server has the client-subnet pool and return route; define the Option82 trust policy before testing.
- Change only the owned helper destination or relay-subnet mapping, not both. Record client and server transaction/giaddr observations, then restore exact original attachment.
- Verify Discover/Request context at the server and Offer/Ack return at the relay/client, ending with intended client subnet options.
- Open the DHCP Relay evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: An incorrect giaddr can select the wrong pool even when the server is reachable. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: A policy rejection is not the same as packet loss or an exhausted pool. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: Forward delivery does not prove the reply returned to the original client. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Attach the relay to the actual client L3 interface, identify the intended server and client subnet, and inspect helper forwarding behavior for the chosen release. Preserve helper addresses and option policies before one isolated change; restore exact interface attachment after testing.

Expected evidence: Configured helper and route establish intent only, not giaddr correctness or a completed lease.

Challenge: What should a fault notebook identify?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g0-t2 — DNS architecture

Separate authoritative truth, recursive lookup and cached answers.

Observation reference (BIND9 client in an isolated lab; guided, not executed):

```text
dig @192.0.2.53 app.example.test A +norecurse
```

Ask the declared authority without requesting recursion; compare separately with the intended recursive resolver.

- Prepare an authoritative example.test zone and a separate recursive lab resolver. Publish app.example.test A192.0.2.20 with TTL60; query authority with recursion disabled and query the recursive endpoint normally.
- Warm the cache, change the owned A record to192.0.2.21 and compare authority/cache TTL before expiry. Separately create an NXDOMAIN case and record SOA negative-cache context. Restore the original record/serial through the supported zone workflow.
- Compare exact name/type/AA/status/TTL at authority, recursive resolver and original client after controlled expiry; do not interpret a cache flush as repaired publication.
- Open the DNS architecture evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: Flushing a client cache cannot repair incorrect authoritative publication. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: A working authority does not ensure the client resolver can reach or validate it. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: TTL and negative caching can explain different answers without an authoritative outage. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Keep authoritative publication and recursion exposure distinct. Plan delegation, redundancy, change ownership, zone serial/transfer policy and split-view behavior. Validate names and record types from intended client networks before shortening TTLs or editing forwarding.

Expected evidence: Inspect AA, status, answer type and TTL; a timeout differs from NXDOMAIN or a cached answer.

Challenge: DNS resolves; what remains for HTTPS?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g0-t3 — NTP

Estimate offset from four timestamps without mistaking stratum for accuracy.

Observation reference (Ubuntu24.04 with an already configured chrony lab daemon; guided, not executed):

```text
chronyc tracking
chronyc sources -v
```

Read synchronization and source-selection state without altering time.

- Configure an already prepared disposable chrony client to approved isolated time sources. Preserve its source file and service policy; record chronyc tracking and sources before making a single source-selection change.
- Make only the owned source unavailable through the isolated lab path. Observe selection/synchronization evidence, then restore the saved source/path; never step the host production clock.
- Record selected source, synchronization status, offset/uncertainty trends and event timestamps over the chosen observation interval.
- Open the NTP evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: A replying unsynchronized source must not be treated as a valid reference. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: Low stratum alone does not override unsuitable delay or uncertainty. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: Configured source intent is not evidence that the client selected or synchronized to it. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Define approved diverse sources, access policy, monitoring and time-dependent service requirements. Preserve source configuration before changing one owned peer. Validate synchronization and timestamp correlation over a suitable interval; do not force manual time changes on a production authentication system.

Expected evidence: Selected source, offset and synchronization evidence are distinct from merely seeing a reachable address.

Challenge: How should this arithmetic be reported?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g1-t0 — SNMP

Read a scoped management object and distinguish polling from notifications.

Observation reference (Cisco IOS XE17 supported isolated device; guided, not executed):

```text
show snmp user
show snmp group
```

Inspect configured user security and group/view bindings without displaying a secret-bearing client command.

- Create an owned read-only SNMPv3 authPriv identity with a narrow view on the prepared agent; obtain its exact version/algorithm support first. Query one permitted interface counter and one deliberately excluded OID from the owned manager using protected credential handling.
- Change only the owned view to exclude the test object. Preserve actual authorization error, then restore the prior view; do not widen access to the whole tree as a shortcut.
- Verify permitted and denied objects, instance mapping and two counter samples with measured interval and discontinuity evidence. Test notifications separately if they are in scope.
- Open the SNMP evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: An authentication failure is not resolved by widening an object view. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: A valid identity does not automatically authorize every OID. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: A reset or changed instance invalidates a naive counter-difference rate. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Prefer restricted read access under supported SNMPv3 authPriv configuration, dedicated management sources and narrowly selected objects. Use high-capacity counters where suitable, preserve instance mapping, and record poll interval and discontinuity evidence before computing utilization.

Expected evidence: A configured user/group is intent; verify a scoped OID query separately on the prepared target.

Challenge: How do you demonstrate a notification recovery?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g1-t1 — Syslog

Preserve event provenance and verify collector delivery separately from local logging.

Observation reference (Cisco IOS XE17 owned device; guided, not executed):

```text
show logging
```

Inspect buffer, severity filters and declared destinations; preserve sensitive output privately.

- Configure an owned sender and collector with matching transport/framing and a documented facility/severity filter. Where TLS is used, install only the intended lab trust and validate receiver identity.
- Emit a unique marker such as NSLAB-owned-001, then alter only the owned severity filter to suppress it. Restore the filter and send a new unique marker, retaining event and receive times.
- Correlate originator record, collector ingestion and searchable retained result. Record TLS/framing evidence separately from local buffer content.
- Open the Syslog evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: A dropped-by-filter event need never leave the originator. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: A TCP connection alone does not establish correctly framed or accepted messages. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: Received bytes without retained searchable evidence do not complete this logging objective. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Choose facility/severity filters, secure collector paths, framing, retention and access controls. Save the exact sender and collector configuration before one test filter change. Verify redacted marker delivery and searchability after restoring; local logger success alone is insufficient.

Expected evidence: A buffered local event does not prove network delivery, collector ingestion or retained search results.

Challenge: What must be preserved for incident ordering?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g2-t0 — AAA

Treat authentication, authorization and accounting as distinct decisions.

Observation reference (Cisco IOS XE17 target where supported; guided, not executed):

```text
show aaa servers
```

Inspect server status alongside the exact consuming method list and session evidence.

- Prepare independent console-local recovery first. On a disposable target, define an owned AAA server group and method list attached only to the intended test VTY/service. Create approved read role and intended denied configuration action, plus accounting destination.
- Test explicit server rejection before any outage case. In a separate controlled case make only the central endpoint unavailable while retaining console access. Record method-list behavior and restore exact attachment.
- Demonstrate approved login/action, forbidden action denial, correlated accounting and console-local access before, during outage and after restoration.
- Open the AAA evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: Explicit authentication rejection must not be relabelled as a server outage. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: Login success does not confer every administrative action. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: Authorization success alone does not establish an audit trail. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Define method list, consumer attachment, privilege scope, accounting destination and failure policy. Preserve the exact original console/VTY configuration and a tested independent local account. Attach experimental policy only to a disposable target or separately controlled session while console access remains.

Expected evidence: A reachable server display does not prove authentication, command authorization or accounting success.

Challenge: What is the minimum change record?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g2-t1 — RADIUS

Interpret access policy and accounting without assuming classic RADIUS protects every field.

Observation reference (Cisco IOS XE17 lab NAS; guided, not executed):

```text
show aaa servers
```

Inspect the intended RADIUS peer status and correlate it with actual owned access/accounting transactions.

- Register only the owned NAS/source as a policy-server client. Set protected secret references and an access policy for a disposable identity; define intended role/VLAN and a separate accounting endpoint. Follow current supported response-authenticator and transport protections.
- Use an owned identity that policy explicitly rejects; then separately test server unavailability. Restore source/peer/policy configuration and never count a rejection bypass as recovery.
- Record validated Accept/Reject, actual NAS-applied role/VLAN and correlated accounting. Verify intended permitted/denied traffic rather than only response codes.
- Open the RADIUS evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: An untrusted response must not be treated as an authorized Access-Accept. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: Reject is explicit denial; timeout cannot be silently substituted for it. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: Server acceptance alone does not prove the desired access VLAN or role took effect. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Configure owned NAS clients, source addresses, service policies and accounting endpoints. Preserve secret references privately and verify returned attributes at the consuming NAS. Use product-supported secure transport and current vulnerability guidance; no access server is configured here.

Expected evidence: Access-Accept, installed policy and retained accounting are separate observations.

Challenge: What separates access success from usable service?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g2-t2 — TACACS+

Follow device administration authentication and command authorization separately.

Observation reference (Cisco IOS XE17 lab device where this observation is supported; guided, not executed):

```text
show tacacs
```

Inspect server statistics and separately preserve command authorization/accounting outcomes.

- On the isolated administration target, define owned TACACS+ peer/group and attach authn/authz/accounting lists to the intended session. Use a protected management network and a tested console-local recovery account.
- Authenticate an approved user, request a specifically denied configuration command, and retain the authorization result. In a separate outage test observe timeout behavior without treating Reject as timeout; restore exact policies.
- Correlate session identity, command and arguments, permit/deny, retained accounting and independent console recovery.
- Open the TACACS+ evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: A TCP connection is not an authenticated administrator session. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: An authenticated session may correctly be denied a configuration command. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: A permitted command without a retained record leaves this audit objective incomplete. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Choose administration roles, command/argument policy, intended line attachments and accounting events. Preserve the current privilege and recovery design before adding a policy to a controlled lab session. Validate approved command, denied command and unavailable-server recovery separately.

Expected evidence: Transport counters and server status do not prove a command was allowed or its record retained.

Challenge: How do you demonstrate complete restored administration?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g3-t0 — NetFlow

Decode exported flow records with the matching template and observation context.

Observation reference (Cisco IOS XE17 platform supporting the selected traditional NetFlow feature; guided, not executed):

```text
show ip cache flow
```

Read cache summaries at the declared observation point; this command is not a portable FNF cache substitute.

- On a supported lab platform, define exporter source, version9 collector and configured UDP destination. Attach the chosen traditional observation feature to the owned ingress or egress interface and record sampling/timeouts.
- Restart only an owned disposable collector to lose its template state; observe undecodable data before appropriate template refresh, then restore original collector policy. Do not clear unrelated router caches.
- Record exporter/source/template context and correctly decoded directional records, counter units and sampling. Compare with an independently observed owned traffic exchange.
- Open the NetFlow evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: No matching observation can result from wrong attachment rather than absent application traffic. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: Received data cannot be reliably decoded using another exporter template with the same numeric ID. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: Unknown sampling prevents a defensible total-traffic estimate. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Specify exporter source, collector address/port, version, interface direction, cache timeouts and sampling. Record collector receipt and decoded fields with source/template identity. Protect template refresh and monitoring continuity during upgrades or collector restart.

Expected evidence: A local flow cache is distinct from correctly decoded collector records.

Challenge: How do you distinguish no traffic from lost telemetry?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g3-t1 — Flexible NetFlow

Distinguish flow keys, collected fields, monitor attachment and export.

Observation reference (Cisco IOS XE17 FNF-supported lab platform; guided, not executed):

```text
show flow record
show flow monitor
show flow exporter
```

Inspect record keys/collect fields, monitor cache and exporter independently.

- Define owned flow record with intended match source/destination/protocol keys and supported collected byte/packet counters. Associate an owned monitor and exporter, then attach the monitor to one supported lab interface/direction.
- Change one key, such as source port, and compare aggregate cardinality for equivalent owned traffic. Restore exact record/monitor/attachment rather than deleting another feature's exporter.
- Correlate supported record fields, monitor cache entries and collector decoding/template. Preserve sampling and interval context.
- Open the Flexible NetFlow evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: Unsupported fields or unintended keys invalidate the planned aggregation. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: Configured monitor objects do not observe traffic before attachment. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: A populated local cache alone does not prove decoded collector visibility. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Preserve record/monitor/exporter definitions and exact attachment. Plan cardinality, supported fields and timeouts. Change only an owned monitor on a disposable target; verify key changes through correlated cache entries and collector records, then restore the prior attachment.

Expected evidence: Each display answers a different question; correlate actual interface attachment and collector decoding.

Challenge: What rollback is precise?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g3-t2 — IP SLA

Read an active probe result in its actual source and operation context.

Observation reference (Cisco IOS XE17 IP SLA-supported lab target; guided, not executed):

```text
show ip sla configuration
show ip sla statistics
```

Compare operation source/schedule and current result code.

- On a supported disposable router, prepare one ICMP echo operation to an owned address with explicit source interface/VRF, frequency and timeout; schedule it under the supported release syntax. Preserve a path for the measurement independent of any route consumer.
- Block only the owned echo path and record a fresh return code; restore that path and observe a fresh original-source success. Avoid substituting a different destination.
- Record configuration, schedule, sample time/latency and result. If an application operation is intended, test that exact operation separately.
- Open the IP SLA evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: A probe from another source or VRF may observe a different path. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: A defined but unscheduled operation has no fresh measurement. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: This failure is scoped to the probe; this success is not general application proof. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Document operation type, source context, target, schedule, expected outcome and dependent consumer. Preserve probe reachability and management access. Verify baseline/fault/recovery from the same operation rather than switching to an easier target after failure.

Expected evidence: A successful ICMP operation is evidence of that echo exchange, not application health.

Challenge: What belongs in an incident record?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g3-t3 — Object Tracking

Convert scoped observations into delayed state without losing the recovery path.

Observation reference (Cisco IOS XE17 enhanced tracking lab; prefix placeholder; guided, not executed):

```text
show track
show ip route 198.51.100.0/24
```

Read object type, state/delay and the actual consuming route separately.

- Define an owned track object consuming the previously prepared SLA result and explicit delay-down10s/delay-up20s, then attach only the intended lab route or redundancy consumer. Preserve independent probe and console paths.
- Induce a down result for less than10s, then a longer sustained failure; record accepted state and consumer action. Restore underlying path and observe20s recovery behavior without removing the measurement route.
- Keep the sample/pending/accepted/consumer timeline and verify the original transaction after precise restore.
- Open the Object Tracking evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: A mismatched probe cannot safely govern the intended route. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: One changed sample may not immediately change the accepted track state. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: A route withdrawn by its own dependent probe can prevent later recovery observations. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Record object identity, type, delay policy and every consumer. Preserve exact tracked-route attachment and ensure probe/management reachability. Verify the timeline of measurement, accepted state and consumer action rather than relying on one instantaneous display.

Expected evidence: Object up does not prove consumer installation, forwarding or the original application transaction.

Challenge: What timeline should be recorded?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g4-t0 — Cisco Discovery Protocol

Use neighbor advertisements as local attachment clues, with explicit trust limits.

Observation reference (Cisco IOS XE17 CDP-supported lab device; guided, not executed):

```text
show cdp neighbors detail
show cdp interface
```

Read neighbor metadata and local advertisement status.

- On one owned directly connected lab pair, inspect local/global CDP participation and capture device ID, local/remote port and holdtime. Compare against a separate cable or virtual-link mapping.
- Disable only the owned interface advertisement, retain the last entry and observe holdtime aging. Restore exact participation and wait for a fresh advertisement.
- Verify the expected neighbor at the same local observer; test routed management separately and do not authenticate identity from the advertised name.
- Open the Cisco Discovery Protocol evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: No entry with discovery disabled does not establish physical link failure. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: A stale cached advertisement can survive a failed attachment temporarily. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: Advertised identity alone is not authenticated physical or service evidence. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Enable discovery only where its operational value fits the exposure policy. Preserve interface-level and global state before a lab disable/restore. Correlate local port, remote advertised port and actual patch/virtual-link mapping.

Expected evidence: A neighbor entry is an advertised local attachment clue, not verified routed management access.

Challenge: What is the useful topology record?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g4-t1 — LLDP

Read standardized local-link discovery without treating a neighbor table as authorization.

Observation reference (Cisco IOS XE17 LLDP-supported target; guided, not executed):

```text
show lldp neighbors detail
show lldp interface
```

Compare per-interface participation, TTL and neighbor TLVs.

- On an owned two-device link, record transmit/receive policy, chassis/port ID subtypes, TTL and optional management fields. Verify support and separate physical/virtual attachment evidence.
- Disable only one lab direction of LLDP participation and observe its effect on the two receivers separately. Restore policy and compare fresh TLVs.
- Record receiving interface, ID subtype, TTL/time and intended attachment. Optional phone policy requires independent endpoint/VLAN/QoS evidence.
- Open the LLDP evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: A disabled receive path can hide a healthy link advertisement. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: An aged or stale entry is not a fresh attachment observation. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: Assuming every ID is a MAC address can misidentify the neighbor. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Plan per-interface transmit/receive participation and metadata exposure. Save chassis/port/TTL evidence before one controlled change. Validate cross-vendor field interpretation and corroborate any management or endpoint policy claims independently.

Expected evidence: Neighbor fields identify advertised context; validate actual attachment and service separately.

Challenge: What makes a defensible neighbor record?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g4-t2 — SSH

Verify the server host before authenticating the administrative user.

Observation reference (OpenSSH client; configuration expansion only; guided, not executed):

```text
ssh -G admin@lab.example.test
```

Inspect effective client settings without connecting to a host.

- Prepare a disposable SSH server and independently obtain its expected host fingerprint. Configure the owned client known-host trust, a limited user key and intended allowed channel; keep private keys with their owner.
- Present an intentionally wrong trusted fingerprint in a disposable client trust file. Confirm rejection, then restore the independently verified key; never disable host checking. Separately test a denied user/channel.
- Verify host identity, approved user/action and intended denied action, preserving the exact hostname/port and redacted outputs.
- Open the SSH evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: An encrypted channel to an unverified key does not identify the intended server. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: Trusted server identity does not automatically authenticate a user. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: A successful login need not permit forwarding or every command. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Preserve known host trust and server access policy, use dedicated administrative identities and restrict unnecessary forwarding. Confirm host fingerprints through an independent trusted path; restore precise trust records only after identity verification.

Expected evidence: Expanded settings show intent, not a verified server, accepted credential or executed session.

Challenge: What does a safe key-change record include?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g4-t3 — SFTP

Verify the SSH subsystem and remote file permissions rather than assuming shell access is enough.

Observation reference (OpenSSH client; usage inspection only; guided, not executed):

```text
sftp -h
```

Display supported syntax; this does not connect or transfer a file.

- Prepare an owned SSH SFTP subsystem-only account and bounded disposable directory. Verify host trust and client-visible chroot paths. Record intended read/create/rename permissions before transfer.
- Remove only the test account's intended write permission on the owned directory, observe failure and restore the saved permission. Transfer only a disposable file rather than changing broad access rights.
- Compare independent source/destination length/hash and final path; verify a denied outside path and delete only the owned test artifact.
- Open the SFTP evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: Do not bypass host trust merely to obtain a transfer connection. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: Shell access or directory listing does not establish write permission to the intended destination. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: Successful login or partial upload is not verified final file delivery. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Use a bounded transfer account and owned lab directory. Preserve subsystem/chroot/permissions before one negative path test. Verify approved read/write operations, intended denial and independent file integrity before declaring recovery.

Expected evidence: A usage display confirms local client availability only, not a working remote subsystem.

Challenge: What cleanup is appropriate?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g4-t4 — TFTP

Track the initial request and negotiated transfer identifiers separately.

Observation reference (Installed compatible lab client; availability/usage inspection only; guided, not executed):

```text
tftp --help
```

Inspect the local client syntax without contacting a server.

- Prepare a disconnected TFTP server root containing one owned nonsecret file and a trusted expected hash. Permit only intended test peers and record the initial request plus negotiated transfer TIDs.
- In the isolated lab path, admit initiation but deny the negotiated data path; observe the incomplete transfer, restore exact tuple policy and repeat. Do not expose a broad writable root.
- Verify same filename, data/ack progression and independent destination hash, then remove owned files and restore server-root/access settings.
- Open the TFTP evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: Reachability to UDP69 alone does not establish allowed file access. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: A UDP69-only rule can admit requests but break later data packets. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: Completed transport alone does not authenticate the transferred image. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Limit TFTP to a tightly scoped disposable or otherwise controlled network need. Record negotiated tuple, filename, server root and expected artifact hash. Validate supported options and bootloader/device constraints before using a reference procedure for firmware.

Expected evidence: Client presence and help output do not verify transfer tuple, server access or artifact authenticity.

Challenge: What is safe cleanup?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g4-t5 — FTP

Separate FTP control login, data connection and transport protection.

Observation reference (curl client; read-only feature inspection; guided, not executed):

```text
curl --version
```

Inspect advertised protocol/TLS features without performing a transfer.

- Prepare an isolated FTP/FTPS test account and owned directory with documented passive range and advertised address. For sensitive content require validated TLS and intended control/data protection; use only nonsecret fixtures for plain FTP demonstrations.
- Change only the owned passive advertised address/range to an unusable value and compare successful control login with failed data listing. Restore the precise endpoint/range.
- Record active/passive tuple, protection policy, control/data outcomes and independent artifact hash; restore account/files and remove only owned test data.
- Open the FTP evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: A working control connection is not a completed data transfer. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: A blocked data connection can prevent listings despite successful login. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: An FTP completion reply alone does not replace independent integrity or channel-policy checks. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Prefer an appropriate protected transfer design over plain FTP for sensitive data. Preserve passive range, advertised address, TLS and filesystem settings before a lab fault. Correlate control reply, data tuple and final artifact from the same transaction.

Expected evidence: Client features do not prove server TLS policy, data-channel connectivity or artifact delivery.

Challenge: What records distinguish control from delivery?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g4-t6 — HTTP / HTTPS

Verify HTTP semantics and HTTPS identity in the original application request.

Observation reference (curl client; read-only capability inspection; guided, not executed):

```text
curl --version
```

Inspect supported protocols and TLS implementation without contacting an external service.

- Prepare a disposable HTTPS endpoint for app.example.test with a lab certificate and independently trusted lab CA, plus known expected response content. Record actual hostname, scheme, method, proxy and client clock.
- Use a deliberately wrong hostname or certificate on the owned fixture and verify rejection with checks enabled. Separately return a200 error body to demonstrate status versus expected content. Restore original binding/content.
- Verify original name/method and user policy, TLS identity, final redirect origin and explicit expected content; retain an intended access-denial response.
- Open the HTTP / HTTPS evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: A changed hostname or proxy path can test a different application. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: An open port or disabled verification is not authenticated HTTPS identity. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: HTTP200 alone does not guarantee correct application behavior. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Define expected URL/method/result, server identity and authenticated user scope. Preserve proxy/cache/TLS settings before a disposable fault. Verify the original transaction and an intended denial after restore, including final endpoint and expected content.

Expected evidence: Local features are not proof of server identity, HTTP response or application success.

Challenge: What belongs in a safe evidence record?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g5-t0 — PKI fundamentals

Build a trust path while keeping identity, key custody and authorization separate.

Observation reference (OpenSSL lab client; version inspection only; guided, not executed):

```text
openssl version
```

Inspect the local cryptographic tool version without generating keys or changing trust.

- Use a disposable trust store and an owned root/intermediate/leaf test chain with constrained CA/usage policy. Keep key material private and record only public certificate metadata. Install the lab anchor only in the disposable relying client.
- Remove the owned trust anchor from that disposable store and verify path rejection. Restore only the intended anchor and separately test a missing intermediate or inappropriate CA constraint.
- Validate path under the actual intended client policy and service name, then remove owned lab trust and artifacts without replacing unrelated trust.
- Open the PKI fundamentals evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: Self-signature or a downloaded root does not automatically establish trust. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: A chain assembled from names alone does not demonstrate path validation. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: A valid public certificate does not repair disclosure of its private key. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Define approved issuers and relying-party trust stores, controlled key generation/custody, certificate inventory and renewal owners. Preserve a disposable trust store before adding a lab CA; remove only that owned anchor after verifying restoration.

Expected evidence: Tool availability is not a validated certificate chain or an authenticated application endpoint.

Challenge: What cleanup after a lab CA?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g5-t1 — Certificates

Validate a certificate for the actual hostname, time and intended use.

Observation reference (OpenSSL with a separately prepared owned PEM fixture; guided only; guided, not executed):

```text
openssl x509 -in labs/owned-server.pem -noout -issuer -subject -dates -ext subjectAltName
```

Inspect public certificate metadata without altering trust or reading a private key.

- Prepare owned public PEM fixtures with known issuer/SAN/time/usage. Inspect metadata using the guided command, then use the actual intended relying client to validate the endpoint chain and reference name.
- Present an owned expired or wrong-SAN fixture, one fault at a time. Keep identity/time checks enabled and restore the intended certificate binding. Do not edit the host clock to hide expiry.
- Verify the original endpoint presents the renewed certificate and check client-specific revocation policy/failure behavior where configured.
- Open the Certificates evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: A valid certificate for another hostname remains wrong for this request. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: Unexpired alone does not establish suitable usage or correct client time. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: Revocation checks vary; do not infer a universal check from a displayed certificate. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Track certificate owner, names, issuer, renewal lead time and deployment targets. Preserve endpoint binding and trust configuration before one lab replacement. Verify the intended hostname with checks enabled and retain the precise failed validation reason.

Expected evidence: Parsing and metadata do not prove path trust, reference identity, revocation or a live endpoint.

Challenge: What record helps repair a mismatch safely?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g5-t2 — 802.1X fundamentals

Separate endpoint EAP, authenticator decisions and policy-server transport.

Observation reference (Cisco IOS XE17 access device where supported; owned port placeholder; guided, not executed):

```text
show authentication sessions interface GigabitEthernet1/0/10 details
```

Inspect method, state and assigned policy on the intended lab port.

- Prepare a disposable supplicant/access-port/server path with intended EAP-TLS identity/trust and a test VLAN/role. Preserve console management and original port policy. Configure explicit MAB/outage behavior only if the lab objective requires those exceptions.
- Use an owned invalid endpoint certificate and verify intended rejection. Separately make the server unavailable and record any designed critical-access behavior as an exception, then restore exact port/server policy.
- Correlate EAP method and identities, authenticator session/assigned role, intended allowed/denied traffic and restored console management.
- Open the 802.1X fundamentals evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: MAB or an outage exception is not successful EAP-TLS authentication. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: Server acceptance alone does not prove the desired VLAN or role. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: Link-up and an authorized label do not prove application policy enforcement. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Define EAP method, supplicant trust, server client mapping, assigned access policy and explicit outage behavior. Preserve the exact lab-port policy and console management before one fault. Verify authorized/denied traffic and authentication records separately.

Expected evidence: Authorized display must be corroborated with intended permitted/denied traffic and identity evidence.

Challenge: What must remain independent during the lab?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g5-t3 — Network monitoring fundamentals

Define a measurable service objective and distinguish silence from healthy state.

Observation reference (Linux read-only clock observation; guided, not executed):

```text
date -u
```

Record observer wall time; this is not proof that the clock is synchronized.

- Define one owned service objective such as expected HTTPS body with identity checks enabled and an observation interval. Pair it with independent device/metric evidence; document units, no-data behavior, thresholds and response owner.
- Induce one owned service fault, then a distinct collector/no-data fault. Observe detection and notification rather than turning missingness into numeric zero; restore exact check and alert settings.
- Record sample timestamps, firing/pending/resolved states, recipient delivery and owner acknowledgement, including recovery suppression behavior.
- Open the Network monitoring fundamentals evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: A ping or uptime metric alone may not represent the original user workflow. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: No-data or stale data must not silently become healthy zero. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: A visible dashboard is not a tested incident notification workflow. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Assign metric definitions, owners, thresholds, dependency suppression and retention. Keep raw observations separate from inferred incident causes. Preserve alert policy before one lab outage/no-data test and verify expected firing, notification and resolution.

Expected evidence: Timestamp provenance helps interpretation but requires separate synchronization evidence.

Challenge: What should an alert rule specify?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g6-t0 — PRTG

Map a sensor to its probe, target and notification dependency.

Observation reference (PRTG prepared lab UI; guided not executed; guided, not executed):

```text
Open the owned sensor: Overview → latest result/error; inspect its probe and inherited settings.
```

Read the actual observer, interval, channels and dependencies; no installation is performed.

- On an already prepared PRTG lab installation, create an owned sensor on the intended local/remote probe for one disposable target. Set explicit units/interval and inspect inherited credentials and dependencies; verify current edition support.
- Make only the owned target/check fail, then separately pause the sensor or remove collection. Observe the distinction from healthy data and the actual notification trigger behavior; restore exact policy.
- Verify fresh same-probe sensor results, intended alert recipient and recovery handling. Remove only the owned sensor/test credential after retaining redacted evidence.
- Open the PRTG evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: Core reachability alone does not establish the remote probe path. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: Paused or stale sensor state is not a fresh healthy measurement. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: A red sensor does not prove an alert reached its responsible operator. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Plan probe placement, sensor definition, least-privilege credentials, inheritance and dependencies. Preserve a test sensor and notification policy before one outage scenario; restore it and verify fresh results plus notification recovery.

Expected evidence: Sensor status is scoped to that check, and notification delivery needs separate receiver evidence.

Challenge: What record belongs with a sensor?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g6-t1 — Zabbix

Follow an item value through trigger evaluation to an owned action.

Observation reference (Zabbix prepared lab UI; guided not executed; guided, not executed):

```text
Open Latest data for the owned item, then inspect its trigger event and action history.
```

Trace item timestamps, evaluation and actual recipient delivery independently.

- On an already prepared lab server/proxy, create one owned host/item with explicit key/type/units and one trigger expression with duration/no-data policy. Attach a bounded action to a test recipient.
- Cause the owned item to fail or become unsupported, separately from a valid zero. Preserve event/time and action history, then restore the item/trigger/action settings.
- Verify fresh item data, intended problem and resolution, action delivery and proxy timestamp context; remove only owned objects.
- Open the Zabbix evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: An unsupported item can have no valid value even while the host is reachable. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: An old value or wrong expression can conceal the original condition. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: A problem event alone does not prove the notification action completed. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Plan template inheritance, host identities, item support, proxy placement and response ownership. Preserve item/trigger/action settings before one lab fault. Verify observed data and configured expressions under the actual release instead of assuming template names prove correctness.

Expected evidence: Frontend login and host presence do not prove current item collection or delivered notifications.

Challenge: What must a fault record name?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g6-t2 — LibreNMS

Separate inventory discovery, successful polling and retained time-series evidence.

Observation reference (LibreNMS prepared lab UI; guided not executed; guided, not executed):

```text
Inspect the owned device last poll/error and compare interface instance mapping with graph timestamps.
```

Read discovery, polling and storage evidence as distinct stages.

- On an already prepared LibreNMS lab, add one supported owned device with least-privilege SNMP view and expected interface mapping. Record discovery results, last poll/error and graph timestamps.
- Deny only the owned test OID view while maintaining reachability. Compare discovery presence with failed fresh polling, then restore the view without resetting unrelated history.
- Verify exact object/instance, fresh values/history continuity and tested alert/recipient recovery. Remove only owned lab device/credentials.
- Open the LibreNMS evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: Wrong discovery or instance mapping can mislabel later values. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: A discovered device can still fail actual polling. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: Fresh polling alone does not establish stored history or recipient delivery. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Plan supported device inventory, SNMPv3 credentials/views, poller placement, storage and alerts. Preserve exact device settings and graph mapping before one controlled fault. Confirm OS support and deployment prerequisites using current documentation.

Expected evidence: A discovered device or graph frame does not establish fresh values or alert delivery.

Challenge: What evidence isolates a graph gap?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g6-t3 — Grafana

Trace a displayed panel to its query, data source and alert failure policy.

Observation reference (Grafana prepared lab UI; guided not executed; guided, not executed):

```text
Inspect panel query and data inspection, then compare alert evaluation and notification history.
```

Record datasource, variables, units, time range and no-data/error policy.

- On an already prepared lab, add an owned datasource using bounded credentials and create one panel with explicit query, variables, units and time range. Define a separate owned alert with documented no-data/error policy and recipient.
- Make the owned query match no series, then separately use a bad query or deny its datasource permission. Compare no-data/error/zero behavior and restore the exact query/access settings.
- Compare an independent backend query with current panel results and alert evaluation/delivery. Export only redacted owned dashboard evidence and remove owned objects.
- Open the Grafana evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: A loaded dashboard shell does not establish datasource access. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: An empty selection or stale series must not be mistaken for healthy zero. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: A panel threshold color is not automatically the alert rule or notification result. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Define datasource access, panel query/unit/time range, alert semantics and recipient owner. Avoid exporting dashboards with secrets. Verify the actual data and an independent source query before interpreting panel colors as measured service health.

Expected evidence: A rendered panel or datasource test alone is not verified measurement or recipient delivery.

Challenge: What makes a panel reviewable?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## s4-g6-t4 — Prometheus

Interpret scrape success, counter rates and label cardinality separately.

Observation reference (Prometheus prepared lab UI; guided not executed; guided, not executed):

```text
Inspect the owned target page, up{job="lab"}, and the documented service metric over a bounded interval.
```

Compare scrape health, metric type/labels, sample freshness and alert evidence.

- On an already prepared lab, add an owned target exposing one bounded gauge and counter with controlled labels. Set scrape interval and documented service rule; preserve original scrape/rule files and validate supported syntax before reload.
- Stop only the owned target to observe up=0 or missing data under applicable semantics. Separately keep scraping successful while publishing an application-failure gauge. Restore target/rules precisely.
- Verify same-target fresh samples, counter-aware rate/reset behavior, bounded label cardinality and intended alert delivery/resolution. Close only the owned target process.
- Open the Prometheus evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: Scrape failure differs from a collected metric value of zero. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: A raw counter is not a current rate; unrelated series cannot be subtracted safely. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: up=1 does not guarantee user-visible service success. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Define target ownership, scrape identity/access, metric types, labels, query range and alert response. Preserve scrape/rule configuration before a lab fault. Validate under the installed product release without assuming a universal retention or capacity recommendation.

Expected evidence: up=1 means that scrape succeeded, not that the original application transaction succeeded.

Challenge: What should a query record specify?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

## lab-4 — Network Services Lab

Correlate time, logging, polling and administrative policy without losing local recovery.

Observation reference (Cisco IOS XE17 supported disposable lab device; guided observations; guided, not executed):

```text
show ntp associations
show logging
show snmp user
show aaa servers
```

Collect separate time, local-log, security-user and AAA-peer observations, then corroborate each at its intended receiver/client.

- Prepare one disposable managed target, separate approved NTP/log/SNMP/AAA endpoints and an independent console. Record all exact versions and baseline settings. Before central AAA attachment, verify the console-local account and define approved identity/role plus an intended denied command.
- Verify NTP synchronization, a uniquely correlated collector log marker, allowed/denied SNMP objects and AAA authentication/authorization/accounting independently. Inject only one owned central-service fault at a time; test explicit Reject separately from unavailability while preserving console recovery.
- After each fault restore exact settings and rerun the same original client/observer transactions. Final evidence must include timestamps, retained marker, scoped polling, approved action, forbidden-action denial, accounting and local recovery. Remove only owned fixtures after these pass.
- Open the Network Services Lab evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.
- Choose the first fault: Ping and configuration displays cannot replace actual service observations. Record which prerequisite changed and explain why the other declarations alone cannot override it.
- Restore that prerequisite, then choose the second fault: A rejection bypassed by fallback is a failure of the intended boundary. Predict the output before revealing it and compare the explanation with the mechanism sequence.
- Compare the third boundary: Central outage testing is unsafe without independently verified recovery. State which observation would independently confirm a real transaction and which evidence is still missing.
- Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.
- On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Use the downloadable workbook as the evidence record. For every service keep baseline, one fault, recovery, observer/time and remaining limits. The completion boundary requires all six original observations; optional DNS/PKI/monitoring dependencies deepen the exercise without replacing NTP/Syslog/SNMP/AAA.

Expected evidence: These displays alone do not complete synchronization, remote marker delivery, scoped OID access, user/command decisions or local recovery.

Challenge: What must the final lab notebook separate?

Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started.

