# Network Security evidence workbook

Browser worksheets evaluate supplied classroom inputs. Device configuration and vendor integration are guided, not executed. The optional owned-loopback fixture is an application access test, not a deployed firewall, IPsec tunnel, AAA server or WAF.

## Baseline and recovery contract

Use isolated supported targets and a tested independent console. Save the exact scoped baseline securely, record version, observer, source/destination, attachment/direction and timestamp. Do not collect real secrets. Change one exclusively owned setting, retain the expected denied observation, restore the exact baseline and repeat original allowed and prohibited operations. Remove only owned fixtures after recovery. Documentation addresses identify the classroom design and are not reachable deployment targets.

## s5-g0-t0 — Security Fundamentals

Network security protects assets and intended operations against unauthorized disclosure, modification and disruption. Begin with a service objective, the identities that need it and the paths that cross trust boundaries. A vulnerability is a weakness; a threat is a potential cause of harm; risk combines context, likelihood and consequence. Buying a control without defining the protected transaction leaves its benefit untestable.

Scope: Independent declared CIA consequences, without risk scoring or likelihood estimation.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
ss -lnt
```

- Draw the user, server and management boundaries on paper; list one required transaction and one forbidden transaction.
- Fault: remove the documented management restriction from the tabletop design and identify the newly exposed asset.
- Restore the exact restriction; retain both allowed-service and denied-management evidence requirements.
- Predict the baseline Security Fundamentals result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Record a permitted user-to-server HTTPS flow, a prohibited user-to-management flow and a separate recovery console. Review dependencies before enforcing a deny policy; DNS, time, certificate validation and logging can fail independently of the application. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Retest the required flow and prohibited flow from the original observers. A configuration listing alone does not demonstrate enforcement. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g0-t1 — CIA Triad

The CIA triad separates confidentiality, integrity and availability. Confidentiality restricts disclosure; integrity protects against unauthorized alteration; availability preserves timely authorized use. These are independent requirements: a reachable server may return altered data, and an encrypted backup may be unreadable during recovery. Use the triad to classify consequences and select evidence, not to collapse security into a single score.

Scope: Independent declared CIA consequences, without risk scoring or likelihood estimation.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
sha256sum labs/network-security-workbook.md
```

- Define three acceptance observations for an owned configuration backup.
- Fault: replace the expected-content declaration while leaving reachability and read restrictions true.
- Restore the content declaration and explain why availability alone never resolved the integrity failure.
- Predict the baseline CIA Triad result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. For a configuration backup, define who may read it, how changes are authenticated and how quickly it must be restored. Keep the recovery key accessible through a controlled independent process. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Authorized access, trusted content and timely recovery. All required properties need their own evidence. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g0-t2 — Attack surfaces

An attack surface is the collection of reachable interfaces and interactions through which a system may be affected. Include listeners, management APIs, credentials, dependencies, local attachment and human workflows. Reachability is contextual: an interface hidden from the Internet can remain exposed to an internal compromised endpoint. An open port is an inventory observation, not a vulnerability verdict.

Scope: Independent declared CIA consequences, without risk scoring or likelihood estimation.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
ss -lnt
```

- Capture the owned host listener inventory and label each endpoint with its service owner.
- Fault: add an undocumented management path to the paper inventory; identify missing authorization and logging.
- Restore the restriction in the plan and describe which source-specific observation would confirm it.
- Predict the baseline Attack surfaces result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Build a local listener list, then compare it with the documented service owner list. On an optional isolated VM disable only an owned unused listener, verify its absence and verify required services remain usable. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: The restricted endpoint stays restricted while required services still work. Retest both negative and positive objectives. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g0-t3 — Segmentation

Segmentation separates groups of systems and controls the flows that cross their boundaries. A VLAN separates a Layer 2 broadcast domain, while routing and policy determine inter-VLAN communication. A separate subnet with unrestricted routing is organizational separation without enforced access restriction. Start from a directional flow matrix rather than treating every connection inside a segment as trusted.

Scope: Attached nonempty ordered IPv4 whole-packet filter: TCP/UDP/ICMP, wildcard matching, no fragments, NAT or connection tracking.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show ip access-lists
show ip interface
```

- Write the users-to-application HTTPS permit and an explicit prohibited users-to-management objective.
- Fault: move the broad deny above the required permit in the worksheet; predict the first match.
- Restore the exact order and separately test the prohibited flow and return-path requirement.
- Predict the baseline Segmentation result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use users 192.0.2.0/24, an application 198.51.100.10 and separate management. Permit only required HTTPS in the worksheet; plan reverse traffic explicitly on a stateless target. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Required HTTPS works and prohibited management initiation remains denied. Restoring a permit must not silently broaden the boundary. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g0-t4 — Defense in depth

Defense in depth combines controls across different failure boundaries so one mistake does not expose the entire objective. Examples include identity checks, directional network policy, host authorization, authenticated transport, detection and tested recovery. Several appliances managed by the same compromised account may represent one common failure domain rather than independent layers.

Scope: Independent declared CIA consequences, without risk scoring or likelihood estimation.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
sha256sum labs/network-security-workbook.md
```

- Map three independent boundaries for the same protected data operation.
- Fault: mark the ACL unavailable but retain the application authorization; identify which exposure remains.
- Restore the ACL declaration and preserve the application-denial and recovery requirements.
- Predict the baseline Defense in depth result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Design a service with an ACL, application role check and protected backup. Assign separate control owners and a recovery procedure; include an intentional denied read in the acceptance plan. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: The unchanged independent controls and explicit residual exposure. Do not disable every protection to test one failure. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g1-t0 — ACL

An IPv4 packet-filter ACL is an ordered list of match/action entries consumed at a specified attachment. The first matching entry decides permit or deny; a later specific entry cannot override an earlier broad match. A nonempty conventional IP filtering ACL ends with implicit deny. This worksheet assumes an attached nonempty list; absent/empty lists and other consumers have platform-specific semantics.

Scope: Attached nonempty ordered IPv4 whole-packet filter: TCP/UDP/ICMP, wildcard matching, no fragments, NAT or connection tracking.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show ip access-lists
show ip interface
```

- Record the selected tuple and all ordered entries; predict the matching sequence before running the worksheet.
- Fault: put deny-any before the HTTPS permit and repeat the same tuple.
- Restore the original order; keep denied alternate-service and separate return-path evidence.
- Predict the baseline ACL result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Build the whole owned list before attachment and preserve an independent console. Review explicit deny counters and a bounded permitted transaction; an empty/absent named ACL must never be assumed to enforce implicit deny. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Repeat the original tuple and the prohibited tuple at the same attachment. A reordered configuration alone does not prove consumed filtering. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g1-t1 — Standard ACL

A standard IPv4 ACL primarily matches packet source addresses. It cannot express a destination-specific HTTPS exception with a port match. This narrower match vocabulary makes consuming context crucial: the same permitted source may access many destinations if the list sits before a broad routed domain. Standard ACL placement close to the destination is a design heuristic, not a substitute for path analysis.

Scope: Attached nonempty source-only IPv4 list; destination/protocol/port are context, not matched.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show ip access-lists
show ip interface
```

- Choose the standard-list worksheet and vary destination port while preserving the source.
- Fault: change source to 203.0.113.8 and observe implicit deny.
- Restore 192.0.2.8; state why both HTTPS and SSH from that permitted source receive the same list decision.
- Predict the baseline Standard ACL result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use a disposable destination-side boundary; permit 192.0.2.0/24 and deny other sources. Test two destinations from the same source to expose the intentionally limited match scope. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Same source to two different services. Both tuples should get the same list decision in this worksheet. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g1-t2 — Extended ACL

An extended IPv4 ACL can express source, destination, protocol and supported protocol-specific fields such as TCP or UDP ports. Ordered selection remains the same as for a standard list. Richer matching enables narrow service policy but requires the operator to know the tuple at the attachment, including translations and direction. This worksheet handles whole TCP/UDP/ICMP packets, not fragments or vendor-specific options.

Scope: Attached nonempty ordered IPv4 whole-packet filter: TCP/UDP/ICMP, wildcard matching, no fragments, NAT or connection tracking.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show ip access-lists
show ip interface
```

- Record the exact required TCP tuple and permit scope in the worksheet.
- Fault: change only protocol to UDP while keeping port 443.
- Restore TCP; test destination port 22 and explain its denied result without claiming the application was attacked.
- Predict the baseline Extended ACL result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Permit users 192.0.2.0/24 to application 198.51.100.10 TCP 443 in the worksheet. Predict alternate destination, UDP and SSH denials before inspecting the result. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Restore the intended protocol and repeat allowed and denied tuples. Do not broaden every protocol to hide the mismatch. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g1-t3 — Named ACL

A named ACL gives a standard or extended list a readable identifier and supports deliberate editing workflows. Naming does not add statefulness, change first-match semantics or turn a standard list into extended matching. Sequence numbers support insertion and review, but change safety depends on the consuming attachment and exact entry state, not on the readability of the name.

Scope: Attached nonempty ordered IPv4 whole-packet filter: TCP/UDP/ICMP, wildcard matching, no fragments, NAT or connection tracking.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show ip access-lists
show ip interface
```

- Label the worksheet list USERS-HTTPS in the evidence notebook and record its consumers.
- Fault: move the broad deny ahead of the permit; identify the now-shadowed entry.
- Restore exact order, then compare the permitted tuple and prohibited service without adding permit-any.
- Predict the baseline Named ACL result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use an owned USERS-HTTPS list and record its full order. Plan an insertion/removal by sequence on a release that supports it, with console access and exact rollback; do not modify a shared production list. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Retest relevant allowed/denied tuples at each affected consumer. One working client cannot validate every attachment. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g2-t0 — Dynamic ARP Inspection

Dynamic ARP Inspection checks ARP received on untrusted switch attachments against accepted IP-to-MAC evidence. Dynamic bindings commonly come from DHCP snooping; static-address designs require an appropriate explicit policy. DAI is an ingress ARP control, not user authentication, routed IP filtering or an IPv6 neighbor-discovery defense. Trusting a port bypasses this validation and therefore requires a justified upstream trust boundary.

Scope: One declared ARP sender binding and ingress trust, without static ARP ACL precedence, optional validation or rate limits.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show ip arp inspection
show ip dhcp snooping binding
```

- Record the owned VLAN 20 host IP/MAC/port binding and the ARP sender claim.
- Fault: change only the worksheet sender MAC; predict rejection on untrusted ingress.
- Restore the exact MAC and compare counters/ARP state on an optional target without emitting a forged production packet.
- Predict the baseline Dynamic ARP Inspection result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Wait for known bindings or create supported owned static policy before enforcing an isolated VLAN. Preserve console access, ARP policy attachment and rate/error-disable recovery settings. Do not repair a host mismatch by trusting every edge port. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Restore the owned correct evidence and retest, retaining untrusted edge policy. Trusting every host attachment hides the original defect. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g2-t1 — DHCP Snooping

DHCP snooping distinguishes client and server attachment trust and learns scoped lease bindings for downstream controls. Trusted ports are the intended paths for server/relay messages; ordinary host ports remain untrusted. It is not a DHCP server and does not by itself authenticate every client. VLAN enablement, relay information, persistence and switch topology must be designed before enforcement.

Scope: Declared message direction, VLAN enablement and ingress trust only; no DHCP parser or lease allocation.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show ip dhcp snooping
show ip dhcp snooping binding
```

- Select a declared server reply on the intended trusted worksheet attachment.
- Fault: make that attachment untrusted and predict server-message rejection.
- Restore its exact trust setting and require a completed client lease plus scoped binding, not merely a configured pool.
- Predict the baseline DHCP Snooping result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use an isolated client VLAN and one intended server path. Capture baseline lease/binding; change only that lab path trust for a negative rehearsal, then restore it before enabling dependent enforcement. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Obtain an intended lease and matching scoped binding from the original client. A trust configuration listing alone is incomplete. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g2-t2 — IP Source Guard

IP Source Guard restricts host-originated IP traffic at supported Layer 2 attachments using dynamic or supported static source bindings. The binding includes source address and attachment context; optional IP-and-MAC mode adds the MAC condition. It differs from DAI because the protected traffic is IP rather than ARP. A manually configured host address is not automatically a valid source binding.

Scope: One supplied source binding and IP-only/IP-and-MAC mode; no actual device tracking or hardware filtering.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show ip source binding
show ip verify source
```

- Record IP 192.0.2.8, VLAN 20 and the owned port binding in the worksheet.
- Fault: change only VLAN to 30 while leaving IP unchanged.
- Restore VLAN 20, compare optional IP-and-MAC mode and require the original host transaction after target recovery.
- Predict the baseline IP Source Guard result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Build DHCP/static binding evidence before enabling the owned access-port filter. Check release support for trunks, EtherChannel, PVLAN and authentication integration; do not assume the same features on every Catalyst. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Matching source/scope evidence and the original host operation. A table entry alone is not end-to-end recovery. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g2-t3 — Private VLAN

Private VLANs divide a Layer 2 domain into primary and secondary roles. An isolated host communicates with a properly mapped promiscuous attachment, while community hosts can also communicate within their own community. Different communities and isolated peers are separated at this modeled Layer 2 boundary. Routing through a promiscuous gateway can reconnect hosts unless Layer 3 policy restricts that path.

Scope: Declared mapped PVLAN roles for distinct endpoint attachments; no routing or MAC-learning simulation.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show vlan private-vlan
show interfaces switchport
```

- Select two distinct isolated endpoints, then compare same-community and different-community pairs.
- Fault: remove the declared promiscuous mapping and predict gateway-path rejection.
- Restore the mapping and retain a separate routed-policy test so gateway access does not erase the intended isolation.
- Predict the baseline Private VLAN result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Rehearse two communities and an isolated host with one mapped gateway in a disposable lab. Preserve maps before changing one host role; inspect both peer and gateway transactions. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Verify intended gateway access and prohibited direct/routed peer objectives separately. One successful gateway ping does not validate isolation. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g2-t4 — 802.1X

IEEE 802.1X controls network attachment using a supplicant, authenticator and authentication server. The endpoint exchanges EAP over LAN with the authenticator; the authenticator commonly carries EAP to the server using RADIUS. Identity validation, returned authorization and enforcement of the assigned role are separate stages. This later lesson deepens policy failure and recovery rather than repeating the earlier services introduction.

Scope: Declared classic authentication/authorization/accounting stages; unavailable-only fallback; no EAP, RADIUS or device execution.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show authentication sessions
```

- Record a declared authenticated session with a consumed restricted role.
- Fault: leave identity valid but remove role attachment in the worksheet.
- Restore the attachment declaration; require session identity plus both an intended permitted and prohibited application operation on an optional target.
- Predict the baseline 802.1X result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use a disposable authenticated client and explicit restricted role. Record method, server trust, session identity and policy attachment. Keep console access independent before testing a single owned policy fault. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Correct session/role consumption and original permitted/denied operations. A server log alone misses enforcement and application outcomes. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g2-t5 — AAA

AAA separates authentication of an identity, authorization of an operation and accounting of activity. A successful login does not imply permission to change configuration; a completed command does not imply its accounting record was retained. This Network Security occurrence focuses on failover boundaries, command policy and independent administrative recovery.

Scope: Declared classic authentication/authorization/accounting stages; unavailable-only fallback; no EAP, RADIUS or device execution.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show aaa servers
```

- Declare successful authentication and read-only authorization in the worksheet.
- Fault: set the authentication result to reject, then unavailable; explain why only the latter is eligible for the declared local fallback.
- Restore central acceptance and verify forbidden-command denial plus accounting retention without disclosing credentials.
- Predict the baseline AAA result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use a test administrator restricted to read-only commands. Preserve method-list attachments and a separately tested recovery identity before a single owned unavailable-server or denied-command rehearsal. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Identity, allowed/denied command behavior and retained accounting correlate in one session. Three separate configured objects are incomplete evidence. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g2-t6 — Port Security

Port Security limits accepted source MAC addresses on supported switch attachments using configured or learned secure-address state. Sticky learning can simplify persistence, but a learned MAC is not cryptographic identity. Protect, restrict and shutdown violation modes produce different operational evidence; the device release and interface mode constrain support.

Scope: One accepted-address/count/mode boundary; no frame learning or actual switch state change.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show port-security
show port-security interface GigabitEthernet1/0/1
```

- Set the worksheet maximum to one and accepted count to one.
- Fault: present a new unaccepted source; compare protect, restrict and shutdown outputs.
- Restore the original accepted-source declaration and explain the separate target error-disable recovery required after shutdown.
- Predict the baseline Port Security result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use an isolated access attachment and a spare owned test endpoint. Preserve secure-address entries and violation mode; rehearse only one additional address and restore the baseline before saving any configuration. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Correct secure policy, restored port state and original allowed/denied source observations. Policy restoration alone may leave the port unusable. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g3-t0 — Control Plane Protection

Control-plane protection preserves the processes that maintain routing, management and protocol state. Distinguish ordinary hardware-forwarded transit traffic from traffic to the device or punted for CPU handling. A transit packet may still be punted because of an exception, so destination address alone is insufficient for classifying every CPU path. Protection combines exposed-service reduction, admission policy, policing and monitoring.

Scope: Constant-size offered-load conversion and nominal-rate comparison; no token bucket, burst, per-packet conformance, CPU or actual drop simulation.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show policy-map control-plane
```

- Inventory intended management and routing traffic with the installed class policy.
- Fault: raise the supplied worksheet packet rate above the configured envelope; calculate the offered byte rate.
- Restore the rate declaration and specify CPU, neighbor and original-management observations needed for a real recovery claim.
- Predict the baseline Control Plane Protection result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Observe the installed control-plane policy on a supported owned device. Baseline routing/management continuity before one bounded declaration-only excess-load case; do not flood a live router. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Policy/class evidence, neighbor continuity and original management/service observations. A single counter or configuration line does not establish recovery. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g3-t1 — CoPP

Control Plane Policing classifies traffic reaching the control-plane path and applies supported rate/action policy. Platform hardware queues and system policy differ from general router MQC examples. A nominal rate alone is incomplete: units, burst allowance, packet accounting and the action for conforming/exceeding input determine the behavior. This worksheet compares a constant-size offered load with a declared envelope, without simulating a token bucket.

Scope: Constant-size offered-load conversion and nominal-rate comparison; no token bucket, burst, per-packet conformance, CPU or actual drop simulation.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show policy-map control-plane
```

- Record the installed class, rate units and supported action before using the calculator.
- Fault: change only declared packet size while holding pps constant; compare bit/s envelopes.
- Restore the original size/rate and specify target class counters plus management/routing continuity for acceptance.
- Predict the baseline CoPP result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use the documented installed system policy rather than replacing it with a generic example. Preserve supported policer rates/class mappings and an independent management recovery route before an owned change. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Restore the exact supported baseline and verify the original control operations. Do not remove all protection to hide the failure. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g4-t0 — VPN concepts

A virtual private network carries selected private communication over another network under an explicitly chosen tunnel and security design. A tunnel is an overlay relationship; its underlay must still reach the peer. Private addressing or encapsulation alone does not establish confidentiality, authenticated identity or least-privilege access. VPN acceptance follows the original protected application transaction rather than stopping at a tunnel-up icon.

Scope: Ordered declared underlay/identity/child-SA/route/return/application prerequisites; no encryption, negotiation or measured traffic.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show crypto ikev2 sa
show crypto ipsec sa
```

- Record outer peers and inner application source/destination in separate columns.
- Fault: clear only the worksheet child-path declaration while retaining underlay reachability.
- Restore it and list matching protected-path, return-route and application evidence needed on a target.
- Predict the baseline VPN concepts result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use two isolated gateway/client endpoints and a documented application objective. Preserve management access and baseline routes before changing one owned traffic-selection declaration. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Restore exact selection and verify protected request, return and application permission. Do not broaden all traffic merely to make an icon green. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g4-t1 — IPsec

IPsec applies policy to IP traffic using security associations and packet protection. The security policy database describes whether traffic is bypassed, discarded or protected; the security association database holds the negotiated/installed state for protection. ESP can provide confidentiality and integrity under the chosen transform; AH does not encrypt content. Algorithm choice, mode and actual endpoint support remain deployment-specific.

Scope: Ordered declared underlay/identity/child-SA/route/return/application prerequisites; no encryption, negotiation or measured traffic.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show crypto ipsec sa
```

- Write one owned selector pair and separate inbound/outbound SA observations.
- Fault: remove only the declared matching child SA while leaving peer authentication true.
- Restore it; require protected counters for the original traffic and both application directions, not unrelated SA activity.
- Predict the baseline IPsec result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Record protected selectors, peer identity, mode, NAT handling and installed directional SAs before testing. Use supported platform guidance rather than a universal crypto-map recipe. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Matching directional state and original protected request/response evidence. A peer-up status or unrelated counter is incomplete. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g4-t2 — IKE

Internet Key Exchange authenticates peers and establishes keying/security association relationships for IPsec. This lesson centers on IKEv2; IKEv1 phase terminology must not be imposed on its different exchanges. IKE_SA_INIT establishes initial cryptographic negotiation material, and IKE_AUTH authenticates identities and ordinarily establishes the first child SA. Initial negotiation success alone is not authenticated peer acceptance.

Scope: Ordered declared underlay/identity/child-SA/route/return/application prerequisites; no encryption, negotiation or measured traffic.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show crypto ikev2 sa
show crypto ipsec sa
```

- Separate underlay, initial exchange, authentication and child-SA evidence in the notebook.
- Fault: mark peer identity unacceptable while leaving transport reachability true.
- Restore the expected identity policy and require authenticated IKE plus matching child state before the original application test.
- Predict the baseline IKE result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Capture proposal, expected peer identity, trust anchor/shared-secret scope and child selectors on both endpoints. Preserve a supported baseline and independent console before a single owned identity-policy fault. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Expected authenticated peer, matching child state and original protected application operation. Transport reachability alone remains insufficient. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g4-t3 — Site-to-Site VPN

A site-to-site VPN joins selected networks through authenticated gateways. Gateway identity differs from the identities of individual application users behind them. Route-based and policy-based designs select traffic differently, so accepting one peer relationship does not prove every local source enters the intended tunnel. Both endpoint policy and underlay/return paths must agree with the same documented objective.

Scope: Ordered declared underlay/identity/child-SA/route/return/application prerequisites; no encryption, negotiation or measured traffic.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show crypto ikev2 sa
show crypto ipsec sa
show ip route
```

- Record one local-host/remote-service flow and the protected selector/route scope on each site.
- Fault: clear only the protected outbound-route declaration while leaving authenticated SAs true.
- Restore the route and verify the original protected service plus a forbidden remote-management tuple.
- Predict the baseline Site-to-Site VPN result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use two disposable gateways with one permitted application and a separate management path. Save routes, policy attachment and NAT handling before a single owned protected-route fault. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Repeat original bidirectional service and prohibited-flow tests with matching protected-path evidence. Do not stop at a tunnel-up icon. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g4-t4 — Remote Access VPN

Remote-access VPN policy admits an individual user/device to a scoped set of resources through a protected session. Authentication, assigned routes/DNS, endpoint posture and resource authorization are different obligations. A full-tunnel versus split-tunnel design changes where traffic is sent; neither automatically establishes the security of every endpoint or application.

Scope: Ordered declared underlay/identity/child-SA/route/return/application prerequisites; no encryption, negotiation or measured traffic.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show crypto ikev2 sa
```

- Record one protected application and one prohibited administration operation for a disposable user.
- Fault: retain valid identity but deny the requested role in the worksheet.
- Restore the intended restricted role and describe a separate revoke/reconnect test without using a real account.
- Predict the baseline Remote Access VPN result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use one disposable identity and a least-privilege test role. Record assigned address, routes, DNS and gateway/session context; preserve a separate administrator recovery route before changing a single owned role. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Verify consumed routes/DNS/role, original permitted use and prohibited use. A connected icon remains only one observation. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g5-t0 — Firewall fundamentals

A firewall enforces an explicit traffic policy at a selected boundary. Stateless filters decide from packet fields; stateful inspection also uses admitted flow context. Neither automatically authenticates users or fixes application defects. Begin with a default-deny resource matrix and documented exceptions, then verify which interface, zone, session and translation context actually consumes it.

Scope: Declared initiation versus response and inspect/pass/drop action; no connection-table implementation, NAT, retransmission or expiry simulation.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show ip access-lists
```

- Declare an inspected forward initiation, then compare response versus new reverse initiation.
- Fault: select pass instead of inspect for the forward policy; remove the reverse permit and predict the response denial.
- Restore inspect and separately verify a prohibited new reverse connection remains denied on the planned target.
- Predict the baseline Firewall fundamentals result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use a disposable boundary with required HTTPS and prohibited administration. Preserve policy, translations, routes and independent management before one owned service-rule fault. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Required original service works while prohibited initiation remains denied. A broad permit may restore usability while breaking the security objective. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g5-t1 — Zone Based Firewall

Cisco Zone-Based Firewall groups interfaces into zones and attaches directional policy to a source/destination zone pair. An inspect action provides supported stateful handling; pass allows matched traffic without creating inspection state; drop rejects it. Inter-zone policy must be defined deliberately. Same-zone and self-zone behavior have separate defaults/controls and cannot be inferred from an ordinary inter-zone example.

Scope: Declared initiation versus response and inspect/pass/drop action; no connection-table implementation, NAT, retransmission or expiry simulation.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show zone-pair security
show policy-map type inspect zone-pair session
```

- Draw Users → Servers and Servers → Users as separate initiation directions; record inspect on the intended forward pair.
- Fault: change inspect to pass and examine a response without a reverse permit.
- Restore inspect, then add explicit self-zone management review rather than treating it as transit.
- Predict the baseline Zone Based Firewall result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Preserve zone memberships, zone pairs, class/policy objects and management path on a disposable supported router. Test one owned wrong-direction or pass-versus-inspect declaration and restore exact attachment. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Correct membership/attachment/session evidence and original permitted/denied operations. A defined object alone does not prove consumed behavior. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g5-t2 — Cisco ASA fundamentals

Cisco ASA software provides firewall policy, connection handling, translation and supported inspection. Routed mode and transparent mode attach to different forwarding designs; security contexts and management scope also affect interpretation. Interface security levels describe part of default policy behavior but cannot replace explicit least-privilege rules. This lesson uses ASA 9.20 documentation and does not equate ASA software with FTD.

Scope: Declared initiation versus response and inspect/pass/drop action; no connection-table implementation, NAT, retransmission or expiry simulation.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show access-list
show conn
show xlate
```

- Record ASA mode/context and pre/post-translation intended tuple in the evidence notebook.
- Fault: keep translation present but remove the modeled forward permit.
- Restore the narrow permit and require original allowed/denied flow evidence rather than publishing a broad any-any exception.
- Predict the baseline Cisco ASA fundamentals result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use an isolated ASA context with console access and one owned flow. Preserve access-group, NAT, routes and service policy before testing a narrow required-service rule; use release-specific syntax. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Repeat original required and prohibited operations with scoped rule/connection evidence. Do not accept an unrestricted permit merely because it restores reachability. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g5-t3 — Cisco Firepower concepts

Cisco Firepower concepts are taught here using the distinct Secure Firewall Threat Defense and management roles. FTD executes supported traffic/inspection policy; management tooling authors and deploys that policy. A saved management change is not evidence that the intended device received and enforced it. Access-control actions, intrusion policy, encrypted-content visibility and licensing/support scope must be reviewed separately.

Scope: Declared content visibility, rule match and enforcement; no payload scanner, attack generator or real IDS/IPS/WAF.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show version
```

- Record policy version, intended device and deployment evidence separately from rule contents.
- Fault: keep a declared rule match but switch the inspection role to IDS/monitor behavior.
- Restore supported blocking enforcement and specify original-client denial plus device evidence required on a target.
- Predict the baseline Cisco Firepower concepts result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use an isolated supported target and benign test content only. Preserve the exact deployed policy/version and rollback plan before a single owned monitor-versus-block comparison; no FTD/FMC is installed here. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Confirmed deployed enforcement plus original-client and device observations. A changed rule label alone is incomplete. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g5-t4 — IDS / IPS

An IDS observes and reports signals; an inline IPS can enforce prevention under its policy. Detection methods include signatures and behavior-based analysis, but a match is not automatically a confirmed successful compromise. Placement and visibility determine what can be observed. A clean event list may mean no signal, no content, bypass or missing telemetry.

Scope: Declared content visibility, rule match and enforcement; no payload scanner, attack generator or real IDS/IPS/WAF.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show version
```

- Compare the same declared visible match in IDS and blocking IPS modes.
- Fault: remove the visibility declaration while retaining the supplied match flag.
- Restore visibility and separate detection/enforcement evidence from actual incident confirmation.
- Predict the baseline IDS / IPS result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use supplied detector cases or a disposable harmless marker application. Do not generate live attacks or attach a traffic generator to production. Document sensor path and known visibility limits. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Original benign-marker behavior and scoped sensor observations agree, with permitted service retained. Do not equate one marker with coverage of every threat. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g5-t5 — WAF concepts

A web application firewall evaluates HTTP-oriented requests under a supported deployment and rule policy. It can enforce signals relevant to web attacks, but it does not fix application authorization, unsafe database construction or every business-logic flaw. Network port filtering and WAF parsing have different scopes. TLS termination/inspection placement determines whether request content is visible to the control.

Scope: Declared content visibility, rule match and enforcement; no payload scanner, attack generator or real IDS/IPS/WAF.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
ss -lnt
```

- Record the proxy/origin path and where HTTP content is visible after TLS handling.
- Fault: declare visible harmless rule match but disable blocking; distinguish alert from prevention.
- Restore blocking in the worksheet and require the marker denial and normal authorized application result on an optional target.
- Predict the baseline WAF concepts result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use a disposable HTTP application or supplied cases. Scope exceptions to the actual endpoint/rule and test normal users after one owned monitor/block fault. Keep direct origin exposure in the threat model. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Harmless marker action, original normal application use and protected-origin path agree. One alert label is not enforcement proof. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g6-t0 — Zero Trust overview

Zero trust organizes resource access around explicit identity, device, context and policy decisions rather than inherent trust in network location. The policy engine decides access, the policy administrator establishes/terminates the communication path and the policy enforcement point consumes the decision. Segmentation and protected transport can support this design, but neither a product name nor an internal source address implements the complete architecture.

Scope: Declared protected identity/device/resource/freshness/enforcement policy conditions; no live posture, identity, policy-server or session queries.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show authentication sessions
```

- Record identity, device eligibility, resource permission, fresh policy and consumed enforcement for one requested operation.
- Fault: leave identity valid but mark device/context policy unacceptable.
- Restore the intended policy and specify original-resource and revocation evidence separately from a decision-server log.
- Predict the baseline Zero Trust overview result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Define one resource-specific permitted operation, a prohibited management operation and the evidence needed for identity/device/context. Preserve independent recovery and explicit exceptions before a policy rehearsal. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Original allowed/denied operations and fresh consumed decision evidence agree. Network location or a server Accept is incomplete proof. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g6-t1 — Network Access Control

Network Access Control joins attachment policy, identity/device signals and enforcement to decide an endpoint access role. Authentication, profiling, posture assessment and remediation are different functions. A device classified as a printer is not thereby authenticated as an approved printer. Returned VLAN/ACL/role intent must be consumed by a supported network attachment, and application authorization remains outside the attachment decision.

Scope: Declared protected identity/device/resource/freshness/enforcement policy conditions; no live posture, identity, policy-server or session queries.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show authentication sessions
```

- Record the approved identity, posture objective and intended restricted role for one endpoint.
- Fault: keep identity accepted but clear policy consumption in the worksheet.
- Restore consumed role and require original allowed/denied service plus the explicit remediation objective on a target.
- Predict the baseline Network Access Control result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use a disposable endpoint and restricted role. Plan an unacceptable posture declaration and a controlled remediation/recovery path; keep an independent administration session before enforcement. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Consumed restricted role, allowed/denied operations and remediation/reassessment behavior agree. A server-side success message alone is incomplete. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## s5-g6-t2 — Cisco ISE concepts

Cisco Identity Services Engine centralizes supported network-access and device-administration policy. Policy sets select context, authentication rules choose methods/identity sources and authorization rules return permission profiles. This lesson uses ISE 3.4 policy documentation; it does not imply every network device consumes every returned feature. Device administration TACACS+ and network-access RADIUS have distinct work centers and session objectives.

Scope: Declared protected identity/device/resource/freshness/enforcement policy conditions; no live posture, identity, policy-server or session queries.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
show authentication sessions
```

- Record the selected ISE policy set, identity source, authorization profile and NAD attachment in separate evidence rows.
- Fault: keep the returned role correct but clear the NAD-consumption declaration.
- Restore consumption and require correlated server session, installed restriction and original allowed/denied operations.
- Predict the baseline Cisco ISE concepts result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use one disposable identity and a narrow test policy set. Record selected set/rule/profile and NAD support; keep local-console recovery before one owned authorization/profile-consumption fault. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.

Verification: Correlated selected set/rule/profile, NAD enforcement and original allowed/denied operations. Server-side acceptance alone is incomplete. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

## lab-5 — Network Security Lab

The integrated Network Security Lab preserves the original Internet, DMZ, Users, Servers, Management, Guest and Backup zones. It starts from an explicit default-deny initiation matrix and permits only documented service paths. Browser rules are a classroom policy model, not a deployed firewall. The optional actual loopback fixture demonstrates an owned application access boundary, denial, fault, restore and cleanup; it does not create these network zones.

Scope: Explicit seven-zone classroom service matrix and declared matching response state; no routing, DNS/time dependencies, identity checks or deployed firewall.

Observation reference (target commands GUIDED NOT EXECUTED):
```text
sha256sum labs/network-security-workbook.md
```

- Draw all seven zones and copy the supplied permit matrix into the evidence notebook with source, destination, protocol, port and owner.
- Confirm Users → Servers TCP 443 is permitted, Guest → Management TCP 22 is denied and Internet → Backup TCP 443 is denied.
- Fault: disable only the Users-to-Servers permit; verify that same HTTPS initiation now denies while Guest-to-Management stays denied.
- Restore the exact permit; repeat both original observations and separately compare a valid declared response with new reverse initiation.
- Optionally run the owned loopback Python fixture and inspect its request statuses, expected content and cleanup report. Its HTTP application allowlist is separate evidence, not a network-zone firewall deployment.
- Predict the baseline Network Security Lab result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.
- Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.
- For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use the worksheet and downloadable workbook first; optional target work needs isolated supported gateways/hosts and console recovery. Define every required dependency explicitly before deployment rather than copying the classroom matrix into production. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.
- Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.
- Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.
- Run python labs/network-security-loopback.py --run for the separately scoped actual application boundary. Read its final evidence summary; no vendor firewall, VPN, AAA service or seven-zone network is deployed.

Verification: Restore the exact permit and repeat original allowed/denied operations with separate identity and evidence scope. A broad permit-any would fail the original security objective. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.

Cleanup: Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data.

