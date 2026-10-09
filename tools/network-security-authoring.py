"""Primary-authored topic records, reviewed before editorial acceptance."""
S=[]
SRC={
 'risk':('NIST SP 800-30 Rev. 1 risk assessment','https://csrc.nist.gov/pubs/sp/800/30/r1/final'),
 'cia':('NIST information system security risk glossary','https://csrc.nist.gov/glossary/term/information_system_related_security_risks'),
 'acl':('Cisco IOS XE 17 IP access-list overview','https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-access-list-ov-0.html'),
 'l2':('Catalyst 9300 IOS XE 17.13 security configuration guide','https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-13/configuration_guide/sec/b_1713_sec_9300_cg.pdf'),
 'dai':('Cisco IOS XE dynamic ARP inspection','https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/sec-crypto/fhs-sisf/fhs-and-sisf-configuration-guide/dynamic-arp-inspection.html'),
 'ipsg':('Cisco IOS XE IP source guard','https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/sec-crypto/fhs-sisf/fhs-and-sisf-configuration-guide/ip-source-guard.html'),
 'pvlan':('Catalyst 9300 IOS XE 17.3 private VLANs','https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-3/configuration_guide/vlan/b_173_vlan_9300_cg/configuring_private_vlans.html'),
 'eap':('RFC 3748 EAP','https://www.rfc-editor.org/rfc/rfc3748.html'),
 'radius':('RFC 2865 classic RADIUS','https://www.rfc-editor.org/rfc/rfc2865.html'),
 'copp':('Catalyst 9600 IOS XE 17.17 CoPP','https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9600/software/release/17-17/configuration_guide/sec/b_1717_sec_9600_cg/configuring_control_plane_policing.html'),
 'plane':('IOS XE 17 management/control plane protection','https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/qos/b-quality-of-service/m_qos-plcshp-mgt-plane-prt.html'),
 'ipsec':('RFC 4301 IPsec architecture','https://www.rfc-editor.org/rfc/rfc4301.html'),
 'ike':('RFC 7296 IKEv2','https://www.rfc-editor.org/info/rfc7296/'),
 'vti':('IOS XE 17 IPsec virtual tunnel interfaces','https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-ipsec-virt-tunnl-0.html'),
 'fw':('NIST SP 800-41 Rev. 1 firewall policy','https://csrc.nist.gov/pubs/sp/800/41/r1/final'),
 'zbf':('IOS XE 17 zone-based policy firewall','https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-zone-pol-fw-xe.html'),
 'asa':('Secure Firewall ASA 9.20 firewall services','https://www.cisco.com/c/en/us/td/docs/security/asa/asa920/configuration/firewall/asa-920-firewall-config/intro-fw-services.html'),
 'ftd':('Cisco Secure Firewall threat protection practices','https://secure.cisco.com/secure-firewall/docs/threat-protection-best-practices'),
 'ids':('NIST SP 800-94 IDPS','https://csrc.nist.gov/pubs/sp/800/94/final'),
 'waf':('Cloudflare WAF documentation','https://developers.cloudflare.com/waf/get-started/'),
 'zt':('NIST SP 800-207 zero trust','https://csrc.nist.gov/pubs/sp/800/207/final'),
 'ise':('Cisco ISE 3.4 policy sets and segmentation','https://www.cisco.com/c/en/us/td/docs/security/ise/3-4/admin_guide/b_ise_admin_3_4/b_ISE_admin_segmentation.html'),
 'tls':('RFC 8446 TLS 1.3','https://www.rfc-editor.org/rfc/rfc8446.html')}
def add(id,key,kind,definition,mechanisms,operation,security,performance,terms,practice,command,sources,questions):
    qs=[row.split('|') for row in questions.strip().splitlines()]
    assert len(qs)==10 and all(len(q)==3 for q in qs),(id,qs)
    ms=mechanisms.split('\n');ts=[x.split('|') for x in terms.split('\n')]
    assert len(ms)==3 and len(ts)==3 and all(len(t)==3 for t in ts),id
    S.append(dict(id=id,key=key,kind=kind,definition=definition,mechanisms=ms,operation=operation,security=security,performance=performance,terms=ts,practice=practice.split('\n'),command=command,sources=sources,questions=qs))

add('s5-g0-t0','fundamentals','risk',
'Network security protects assets and intended operations against unauthorized disclosure, modification and disruption. Begin with a service objective, the identities that need it and the paths that cross trust boundaries. A vulnerability is a weakness; a threat is a potential cause of harm; risk combines context, likelihood and consequence. Buying a control without defining the protected transaction leaves its benefit untestable.',
'Inventory the management, user, server and third-party paths, including maintenance access. Attach an accountable owner to each asset and describe the consequence of failure rather than assigning every asset the same priority.\nChoose preventive controls for the intended abuse path, detective observations for attempts and corrective actions for recovery. A log entry is useful only if someone can interpret it and act within the service objective.\nVerify the intended user transaction and a narrowly chosen prohibited transaction from the same boundary. Document the remaining exposure, decision owner and review trigger; a passed classroom case never establishes that no other attack exists.',
'Record a permitted user-to-server HTTPS flow, a prohibited user-to-management flow and a separate recovery console. Review dependencies before enforcing a deny policy; DNS, time, certificate validation and logging can fail independently of the application.',
'Limit administrative identities, protect secrets and patch supported components. Recovery access must be tightly controlled and tested rather than becoming an undocumented universal bypass.',
'Measure service latency, policy lookup cost and log volume at equivalent loads. An overly broad log rule can create an availability problem without improving the quality of detection.',
'Asset|What must remain trustworthy or usable|Prioritize from business consequence.\nThreat|Potential cause of an unwanted event|State the actor and reachable path.\nResidual risk|Exposure after chosen controls|Assign an owner and review date.',
'Draw the user, server and management boundaries on paper; list one required transaction and one forbidden transaction.\nFault: remove the documented management restriction from the tabletop design and identify the newly exposed asset.\nRestore the exact restriction; retain both allowed-service and denied-management evidence requirements.',
'ss -lnt','risk,cia',
'''An inventory omits the management interface; what remains unknown?|An administrative attack surface.|The application service inventory does not cover every privileged path.
Does installing a firewall remove all risk?|No; residual risk remains.|Policy mistakes, compromised endpoints and uninspected paths can survive the control.
Which item is a vulnerability: attacker or unsupported firmware?|Unsupported firmware.|The weakness differs from the actor that could exploit it.
A deny rule stops both abuse and payroll; is it accepted?|No; verify the intended service objective.|Security and operational acceptance need positive and negative tests.
Who accepts the remaining exposure?|The accountable risk owner.|A worksheet result cannot authorize organizational risk acceptance.
Why preserve a separate console path?|To recover safely from an access-policy mistake.|Recovery must not depend on the path being deliberately denied.
Is a logged attempt proof of prevented damage?|No; correlate enforcement and outcome.|Detection and prevention are different observations.
What should trigger reassessment after acceptance?|A changed asset, dependency, threat or policy.|Risk context changes when the protected system changes.
Why can logging every packet hurt availability?|It can overwhelm processing and storage.|Choose actionable bounded observations rather than unbounded noise.
How do you verify a restored restriction?|Retest the required flow and prohibited flow from the original observers.|A configuration listing alone does not demonstrate enforcement.''')

add('s5-g0-t1','cia','risk',
'The CIA triad separates confidentiality, integrity and availability. Confidentiality restricts disclosure; integrity protects against unauthorized alteration; availability preserves timely authorized use. These are independent requirements: a reachable server may return altered data, and an encrypted backup may be unreadable during recovery. Use the triad to classify consequences and select evidence, not to collapse security into a single score.',
'Name the information and operation before assigning an impact. Exposing a key affects confidentiality and can enable later integrity damage; the second consequence must be reasoned about separately.\nMap controls to the property they actually establish. Encryption can conceal content; authenticated integrity checks reveal unauthorized changes; redundancy supports availability only if failover and recovery work.\nDesign a positive and negative observation for each required property. Record authorization for reading, an independently checked expected content value and a bounded recovery-time goal. Passing one observation does not stand in for the other two.',
'For a configuration backup, define who may read it, how changes are authenticated and how quickly it must be restored. Keep the recovery key accessible through a controlled independent process.',
'A public hash does not authenticate an attacker-controlled file when the attacker can replace both file and hash. Use a trusted signature or separately protected expected digest.',
'Integrity validation and replication have measurable costs. Evaluate the recovery path under realistic load rather than inferring availability from the number of copies.',
'Confidentiality|Authorized disclosure only|Encryption needs identity and key control.\nIntegrity|Authorized changes and trustworthy content|Authenticate the reference as well as the data.\nAvailability|Timely authorized use|Test recovery rather than count replicas.',
'Define three acceptance observations for an owned configuration backup.\nFault: replace the expected-content declaration while leaving reachability and read restrictions true.\nRestore the content declaration and explain why availability alone never resolved the integrity failure.',
'sha256sum labs/network-security-workbook.md','cia,risk',
'''A public service returns a tampered balance; which property failed?|Integrity.|Reachability did not establish trustworthy content.
A backup is encrypted but the only key is lost; which property is threatened?|Availability.|Protected content must still be recoverable by authorized operators.
Does encryption alone prove the file is authentic?|No.|Confidentiality and source/content authentication require distinct evidence.
An unauthorized user reads a valid configuration; classify the direct harm.|Confidentiality loss.|The file can be unchanged and available while disclosure is unauthorized.
What makes a hash comparison meaningful?|A separately trusted expected digest.|An attacker-controlled reference does not establish authenticity.
Two replicas share one power feed; is availability assured?|No.|A common dependency can fail every copy together.
Can an integrity incident later cause an outage?|Yes.|The properties are distinct but consequences can interact.
What is a useful availability acceptance target?|A defined authorized operation within a stated recovery time.|A green process icon does not establish the service objective.
How should replica overhead be evaluated?|Measure equivalent workloads and the recovery path.|Nominal replica count supplies no throughput guarantee.
What must be retested after restoring a backup?|Authorized access, trusted content and timely recovery.|All required properties need their own evidence.''')

add('s5-g0-t2','surfaces','risk',
'An attack surface is the collection of reachable interfaces and interactions through which a system may be affected. Include listeners, management APIs, credentials, dependencies, local attachment and human workflows. Reachability is contextual: an interface hidden from the Internet can remain exposed to an internal compromised endpoint. An open port is an inventory observation, not a vulnerability verdict.',
'Enumerate interfaces at the relevant observers: public client, ordinary user segment and management segment. Include outbound integrations and remote update paths because inbound-listener discovery alone misses them.\nFor each entry record identity requirements, exposed data, permitted operations and owner. Distinguish configured service, local listener, remotely reachable endpoint and successful authorized operation.\nReduce unnecessary exposure by disabling unused owned services or restricting consuming paths. Repeat the same inventory after one change; an empty result from one source does not prove absence from every source.',
'Build a local listener list, then compare it with the documented service owner list. On an optional isolated VM disable only an owned unused listener, verify its absence and verify required services remain usable.',
'Include IPv6, wireless/remote access and emergency accounts. A hidden interface is not protected merely because it is absent from a diagram.',
'Discovery rate affects target load and interpretation. This lab uses local read-only inventory and performs no remote scanning or exploitation.',
'Listener|Local endpoint accepting traffic|Confirm ownership and bind address.\nReachability|A source can reach an endpoint|State source, path and protocol.\nVulnerability|An exploitable weakness in context|Inventory alone cannot establish it.',
'Capture the owned host listener inventory and label each endpoint with its service owner.\nFault: add an undocumented management path to the paper inventory; identify missing authorization and logging.\nRestore the restriction in the plan and describe which source-specific observation would confirm it.',
'ss -lnt','risk,fw',
'''An open TCP port is found; is a vulnerability proven?|No.|Reachable service and exploitable weakness are different claims.
Only Internet-facing interfaces were inventoried; what is missing?|Internal and management paths.|Compromised internal sources can reach interfaces unavailable publicly.
Does a local listener prove remote reachability?|No.|Binding, routing and policy still determine the remote path.
Why record the bind address?|It helps identify which local interfaces expose the service.|Loopback and all-interface bindings have different intended boundaries.
An outbound update channel is absent from the map; why care?|It crosses a trust boundary into a dependency.|Attack surface includes supplied content and outbound relationships.
Is IPv4 inventory sufficient for a dual-stack host?|No.|IPv6 can expose a separately controlled path.
Who should approve removing an unexplained listener?|The responsible service owner after dependency review.|Unknown ownership calls for investigation before disruption.
Does hiding an API URL establish authorization?|No.|Knowledge of a path is not protected identity or permission.
Why avoid an unbounded discovery rate?|It can disrupt the target and corrupt observations.|Choose a scoped read-only method for this exercise.
What demonstrates recovery after an exposure change?|The restricted endpoint stays restricted while required services still work.|Retest both negative and positive objectives.''')

add('s5-g0-t3','segmentation','acl',
'Segmentation separates groups of systems and controls the flows that cross their boundaries. A VLAN separates a Layer 2 broadcast domain, while routing and policy determine inter-VLAN communication. A separate subnet with unrestricted routing is organizational separation without enforced access restriction. Start from a directional flow matrix rather than treating every connection inside a segment as trusted.',
'Identify source identity/segment, destination service and required protocol. Document support flows such as DNS and logging separately from application access so a broad permit does not conceal them.\nPlace enforcement at a boundary that every relevant path crosses. Check alternate routing, IPv6, tunnels and host-local paths; a rule is ineffective if traffic bypasses its consuming attachment.\nTest required initiation and response paths, plus a prohibited cross-boundary transaction. Stateless ACLs do not remember a forward permit. Stateful devices can admit matching established responses under their own supported policy.',
'Use users 192.0.2.0/24, an application 198.51.100.10 and separate management. Permit only required HTTPS in the worksheet; plan reverse traffic explicitly on a stateless target.',
'Segment management and sensitive services with independent identity controls. Avoid treating every member of a shared VLAN as equally authorized.',
'Policy scale, logging and asymmetric paths affect enforcement cost. The worksheet performs one IPv4 tuple lookup; it makes no hardware throughput claim.',
'VLAN|Layer 2 broadcast separation|Routing can reconnect the domains.\nACL boundary|Directional stateless filtering|Evaluate return traffic separately.\nStateful boundary|Flow context under a policy|Validate path symmetry and expiry.',
'Write the users-to-application HTTPS permit and an explicit prohibited users-to-management objective.\nFault: move the broad deny above the required permit in the worksheet; predict the first match.\nRestore the exact order and separately test the prohibited flow and return-path requirement.',
'show ip access-lists\nshow ip interface','acl,fw',
'''Two VLANs route freely; is least-privilege segmentation enforced?|No.|Layer 2 separation does not restrict the routed flow matrix.
Why is the flow matrix directional?|Initiation and return may meet different policy.|A forward permit alone does not establish a stateless reply permit.
An ACL exists but traffic takes another interface; what failed?|The consuming enforcement boundary.|Configured intent cannot filter a bypass path.
Should DNS be hidden in permit-any?|No; document its required source and destination.|Named dependencies support narrow explainable rules.
Users need HTTPS to one application; what should be permitted?|The intended source range, application address and TCP destination 443.|A service-specific permit is narrower than unrestricted routing.
Why review IPv6 separately?|An independently routed IPv6 path can bypass IPv4 policy.|An IPv4 worksheet is not dual-stack enforcement evidence.
Can two hosts in one VLAN be differently authorized?|Yes.|Location and identity are separate access inputs.
Does an established stateful return admit a new reverse connection?|No.|A response belongs to the admitted flow; new initiation needs policy.
What scale observation is useful?|Policy evaluation, logging and service latency under equivalent load.|Rule count alone does not predict target capacity.
How do you verify segmentation recovery?|Required HTTPS works and prohibited management initiation remains denied.|Restoring a permit must not silently broaden the boundary.''')

add('s5-g0-t4','depth','risk',
'Defense in depth combines controls across different failure boundaries so one mistake does not expose the entire objective. Examples include identity checks, directional network policy, host authorization, authenticated transport, detection and tested recovery. Several appliances managed by the same compromised account may represent one common failure domain rather than independent layers.',
'Trace one concrete abuse path from source through network boundary to application and data. For each step identify what stops, detects or repairs the event and what evidence would show that control being consumed.\nAnalyze shared dependencies: administrator identities, signing keys, central policy, power and logging. Two controls fail together when their apparent independence relies on the same compromised input.\nRehearse one control failure while retaining the other declared protections. Explain the remaining exposure instead of multiplying assumed failure probabilities or declaring the entire design safe.',
'Design a service with an ACL, application role check and protected backup. Assign separate control owners and a recovery procedure; include an intentional denied read in the acceptance plan.',
'Protect the control-management path and recovery credentials. Do not let a monitoring or backup account inherit unrestricted production administration.',
'Additional controls add policy, latency and operational work. Measure the protected transaction and recovery time; remove duplicated noise rather than a required independent boundary.',
'Preventive control|Stops a specified event|Show actual consuming attachment.\nDetective control|Produces actionable evidence|Assign an observer and response owner.\nCorrective control|Restores the objective|Test trusted recovery artifacts.',
'Map three independent boundaries for the same protected data operation.\nFault: mark the ACL unavailable but retain the application authorization; identify which exposure remains.\nRestore the ACL declaration and preserve the application-denial and recovery requirements.',
'sha256sum labs/network-security-workbook.md','risk,zt',
'''Two firewalls share an administrator credential; are they independent?|Not against compromise of that credential.|Shared control ownership can create a common failure domain.
Can a backup prevent an unauthorized read?|No.|Recovery capability does not enforce confidentiality at access time.
Which evidence supports a detective control?|An actionable observed event with an assigned response path.|A configured log destination alone does not prove useful detection.
Why trace a concrete abuse path?|To connect each control to a relevant boundary.|Counting products does not establish coverage.
One ACL fails but application roles hold; is risk zero?|No.|The remaining exposure must still be assessed explicitly.
May probabilities be multiplied without independence evidence?|No.|Correlated failures invalidate that shortcut.
Why protect the management plane of controls?|Compromise can disable multiple protective layers.|A shared admin path can defeat apparent depth.
Does a valid backup prove recovery time?|No.|Restore and original-service verification are required.
What operational cost grows with more layers?|Policy coordination, latency and maintenance.|Evaluate the service rather than assuming more layers are free.
What should a one-layer-failure rehearsal retain?|The unchanged independent controls and explicit residual exposure.|Do not disable every protection to test one failure.''')

add('s5-g1-t0','acl','acl',
'An IPv4 packet-filter ACL is an ordered list of match/action entries consumed at a specified attachment. The first matching entry decides permit or deny; a later specific entry cannot override an earlier broad match. A nonempty conventional IP filtering ACL ends with implicit deny. This worksheet assumes an attached nonempty list; absent/empty lists and other consumers have platform-specific semantics.',
'Record ingress or egress attachment, actual packet source/destination and protocol before matching. NAT, tunnels and locally generated traffic can change which tuple the chosen observer sees.\nFor each entry, compare only fields that type supports. A wildcard bit zero requires equality and a wildcard bit one ignores that bit; noncontiguous wildcards are valid bit patterns and are not necessarily prefixes.\nStop at the first match and retain its sequence/action as the evidence. If no entry matches, show implicit deny. A permit is one policy decision, not proof of routing, response delivery or application authorization.',
'Build the whole owned list before attachment and preserve an independent console. Review explicit deny counters and a bounded permitted transaction; an empty/absent named ACL must never be assumed to enforce implicit deny.',
'Use the narrow required tuple. ACLs are stateless; the TCP established keyword checks certain flag bits and does not replace a stateful connection tracker.',
'Hardware offload, rule capacity and logging differ by platform. This ordered worksheet proves bit/tuple selection only and never measures target TCAM capacity.',
'First match|Earliest matching entry decides|A later permit cannot override it.\nWildcard|Zero compare, one ignore|Do not assume contiguous prefix bits.\nImplicit deny|No matching permit in this nonempty list|Attachment and consumer must be known.',
'Record the selected tuple and all ordered entries; predict the matching sequence before running the worksheet.\nFault: put deny-any before the HTTPS permit and repeat the same tuple.\nRestore the original order; keep denied alternate-service and separate return-path evidence.',
'show ip access-lists\nshow ip interface','acl',
'''Deny-any precedes a specific permit; which wins?|Deny-any.|First match terminates evaluation.
What does a wildcard zero bit require?|The corresponding address bit must match.|One bits are ignored; zero bits compare.
No entry matches in the attached nonempty list; result?|Implicit deny.|The worksheet models ordinary packet-filter ACL semantics.
Does a permit establish application success?|No.|Routing, reply policy and application authorization are separate.
Why record ingress or egress direction?|It identifies which packets consume the list.|An unattached rule has no filtering effect.
Are all wildcard masks contiguous subnet inverses?|No.|Noncontiguous ignored bits are supported by bit matching.
Does TCP established authenticate a connection?|No.|A flag check is not stateful tracking or protected identity.
An absent named ACL is referenced; assume deny-all?|No; inspect actual platform/consumer semantics.|This worksheet deliberately excludes absent and empty list behavior.
Why log a broad deny cautiously?|Logging can add processing and storage load.|Counter and selective-event evidence can be more useful than every packet.
How do you verify an ACL repair?|Repeat the original tuple and the prohibited tuple at the same attachment.|A reordered configuration alone does not prove consumed filtering.''')

add('s5-g1-t1','standard-acl','acl-standard',
'A standard IPv4 ACL primarily matches packet source addresses. It cannot express a destination-specific HTTPS exception with a port match. This narrower match vocabulary makes consuming context crucial: the same permitted source may access many destinations if the list sits before a broad routed domain. Standard ACL placement close to the destination is a design heuristic, not a substitute for path analysis.',
'Select the packet source as observed at the consuming interface. Source matching can identify a network location but does not authenticate the person or device using it.\nEvaluate ordered source/wildcard entries. Destination, protocol and transport port remain visible in the worksheet as context but do not participate in a standard-list decision.\nCompare the desired service matrix with what source-only filtering can actually express. If two destinations need different permissions at one attachment, choose an appropriate extended or identity-aware control.',
'Use a disposable destination-side boundary; permit 192.0.2.0/24 and deny other sources. Test two destinations from the same source to expose the intentionally limited match scope.',
'Source spoofing protections and identity controls are separate. A standard ACL must not be described as user authentication.',
'A shorter match vocabulary is not a universal performance guarantee. Confirm the actual forwarding/offload path and required policy expressiveness.',
'Source address|Standard-list match input|Location is not authenticated identity.\nDestination context|Not matched by standard ACL|Placement controls the affected services.\nExtended list|Additional tuple fields|Use when destination/protocol/port matter.',
'Choose the standard-list worksheet and vary destination port while preserving the source.\nFault: change source to 203.0.113.8 and observe implicit deny.\nRestore 192.0.2.8; state why both HTTPS and SSH from that permitted source receive the same list decision.',
'show ip access-lists\nshow ip interface','acl',
'''Can a standard ACL match TCP destination 443?|No.|Its modeled decision uses source address only.
Same source, different destination: can this list distinguish them?|No.|Destination context belongs to a different match vocabulary or attachment.
Why is destination-side placement often suggested?|To reduce unintended blocking across other destinations.|Actual paths still determine whether the heuristic is suitable.
Does permitting 192.0.2.0/24 authenticate its users?|No.|Address location and protected identity are different.
Source changes outside the permitted range; what happens here?|Implicit deny.|The source-only nonempty list has no matching permit.
Why retain destination fields in the trace?|To show what the decision deliberately ignores.|Visible context must not be mistaken for a matched field.
Need different TCP ports for the same source; choose what?|An extended or other service-aware policy.|Source-only rules cannot encode that requirement.
What attachment evidence is required?|The actual interface direction consuming the list.|Creating a standard list does not apply it.
Is standard filtering always faster?|No such universal claim is justified.|Implementation/offload governs target performance.
What pair of tests exposes source-only scope?|Same source to two different services.|Both tuples should get the same list decision in this worksheet.''')

add('s5-g1-t2','extended-acl','acl',
'An extended IPv4 ACL can express source, destination, protocol and supported protocol-specific fields such as TCP or UDP ports. Ordered selection remains the same as for a standard list. Richer matching enables narrow service policy but requires the operator to know the tuple at the attachment, including translations and direction. This worksheet handles whole TCP/UDP/ICMP packets, not fragments or vendor-specific options.',
'Translate the requirement into the observed source range, destination address, protocol and destination service port. A client ephemeral source port is different from the server listening port.\nMatch all configured fields in each entry, then stop at the first matching action. A UDP packet to numeric port 443 does not match a TCP-only rule even though the number is equal.\nEvaluate response and new reverse initiation separately. Stateless permits do not allocate connection state; add the required scoped response treatment or select a supported stateful boundary.',
'Permit users 192.0.2.0/24 to application 198.51.100.10 TCP 443 in the worksheet. Predict alternate destination, UDP and SSH denials before inspecting the result.',
'Exclude fragments, TCP flag options and NAT processing from this arithmetic worksheet. Do not export its result as effective production firewall policy.',
'More specific fields improve expressiveness but do not establish hardware capacity. Review logging and target parser/offload behavior at the selected release.',
'Destination port|Server service number in this forward tuple|Do not confuse client ephemeral ports.\nProtocol|TCP and UDP are separate matches|A shared numeric port does not merge transports.\nDirection|Tuple as consumed at one attachment|Response traffic requires separate analysis.',
'Record the exact required TCP tuple and permit scope in the worksheet.\nFault: change only protocol to UDP while keeping port 443.\nRestore TCP; test destination port 22 and explain its denied result without claiming the application was attacked.',
'show ip access-lists\nshow ip interface','acl',
'''TCP 443 is permitted; does UDP 443 match?|No.|The protocol field is a separate condition.
Which port is normally 443 in the forward client request?|The destination service port.|The client source port is usually ephemeral.
Why inspect NAT relative to the attachment?|The observed addresses may differ before and after translation.|Match the tuple actually consumed by this list.
Same source/port but different server; permitted here?|No.|The destination address must also match.
A specific permit follows a broad deny; result?|The earlier deny.|Extended matching does not change first-match order.
Does this whole-packet worksheet model noninitial fragments?|No.|Transport fields may be absent and target fragment behavior needs separate review.
Does forward permit create response state?|No.|The ACL is stateless.
Need to permit only one service; is permit-ip-any appropriate?|No.|It broadens the policy beyond the required tuple.
What proves platform support for a match option?|The selected release documentation and target parser/behavior check.|A browser trace cannot validate device syntax.
How should a protocol mismatch be repaired?|Restore the intended protocol and repeat allowed and denied tuples.|Do not broaden every protocol to hide the mismatch.''')

add('s5-g1-t3','named-acl','acl',
'A named ACL gives a standard or extended list a readable identifier and supports deliberate editing workflows. Naming does not add statefulness, change first-match semantics or turn a standard list into extended matching. Sequence numbers support insertion and review, but change safety depends on the consuming attachment and exact entry state, not on the readability of the name.',
'Choose a name that communicates purpose and scope, then choose the actual standard or extended type. Record all consuming attachments because one shared object change can affect several paths.\nReview sequence order before editing. Insert a specific exception before the intended broad deny, then confirm the selected sequence for allowed and prohibited tuples.\nPreserve exact baseline entries and attachment before the change. A named list referenced while empty/absent can have permissive consumer behavior; build and verify the owned object before applying it.',
'Use an owned USERS-HTTPS list and record its full order. Plan an insertion/removal by sequence on a release that supports it, with console access and exact rollback; do not modify a shared production list.',
'Do not infer protection from an object name. Review shadowed entries, unintended broad permits and shared consumers separately.',
'Sequence spacing improves maintainability rather than packet performance. Hardware updates can have platform-specific atomicity and resource limits.',
'Name|Readable object identity|No change to match algorithm.\nSequence|Explicit entry order|Insert before the broad terminating match.\nConsumer|Attachment using the object|Shared edits can affect multiple paths.',
'Label the worksheet list USERS-HTTPS in the evidence notebook and record its consumers.\nFault: move the broad deny ahead of the permit; identify the now-shadowed entry.\nRestore exact order, then compare the permitted tuple and prohibited service without adding permit-any.',
'show ip access-lists\nshow ip interface','acl',
'''Does naming an ACL make it stateful?|No.|The name identifies an object; it does not create connection tracking.
Can a named standard list match ports?|No.|The list type still governs available fields.
Why inventory all consumers before editing?|One shared object can affect several attachments.|A local-looking edit may have a wider enforcement scope.
Where should a narrow exception precede a deny?|Earlier in the ordered list.|First match prevents later entries from overriding a deny.
Is the label USERS-HTTPS proof of a narrow policy?|No.|Actual entries and attachment determine the behavior.
Why preserve exact sequence state?|It makes rollback precise and reviewable.|Removing a newly inserted rule is safer than reconstructing from memory.
Should an empty referenced list be assumed deny-all?|No.|Inspect consumer-specific absent/empty semantics.
What is a shadowed rule?|An entry whose intended traffic already matches an earlier terminating rule.|Readable names do not eliminate order mistakes.
Does leaving gaps in sequences improve forwarding speed?|No.|The gaps aid editing; forwarding implementation is separate.
How do you accept a repaired shared list?|Retest relevant allowed/denied tuples at each affected consumer.|One working client cannot validate every attachment.''')
add('s5-g2-t0','dai','binding',
'Dynamic ARP Inspection checks ARP received on untrusted switch attachments against accepted IP-to-MAC evidence. Dynamic bindings commonly come from DHCP snooping; static-address designs require an appropriate explicit policy. DAI is an ingress ARP control, not user authentication, routed IP filtering or an IPv6 neighbor-discovery defense. Trusting a port bypasses this validation and therefore requires a justified upstream trust boundary.',
'Establish VLAN and interface scope, the claimed sender IP/MAC and the origin of the binding. Compare a host observation with the binding database before enabling enforcement.\nOn an untrusted attachment validate the ARP claim under the supported binding/static-ARP policy. A configured ARP ACL can take priority over snooping evidence; optional header/IP validation and rate limits add separate checks.\nRetain ingress, VLAN, binding and drop-counter evidence for one harmless owned claim. A trusted ingress bypass result is not a validated claim, and successful ARP resolution does not prove later IP service delivery.',
'Wait for known bindings or create supported owned static policy before enforcing an isolated VLAN. Preserve console access, ARP policy attachment and rate/error-disable recovery settings. Do not repair a host mismatch by trusting every edge port.',
'The worksheet models one declared binding and trust decision only. Static ARP ACL precedence, header validation, rate limits and error-disable are taught but excluded from its lookup.',
'ARP bursts and enforcement rates can affect legitimate failover. Measure the target packet rate and counters; the worksheet performs no traffic generation.',
'Untrusted ingress|Validate the supplied ARP claim|Collect binding and drop evidence.\nTrusted ingress|Bypasses this DAI validation|A trust decision is not identity proof.\nStatic policy|Explicit non-DHCP evidence|Review precedence and platform support.',
'Record the owned VLAN 20 host IP/MAC/port binding and the ARP sender claim.\nFault: change only the worksheet sender MAC; predict rejection on untrusted ingress.\nRestore the exact MAC and compare counters/ARP state on an optional target without emitting a forged production packet.',
'show ip arp inspection\nshow ip dhcp snooping binding','dai,l2',
'''A valid IP carries the wrong sender MAC on untrusted ingress; result here?|Reject the ARP claim.|Both IP and MAC must agree with the supplied binding.
Does trusted ingress prove the ARP identity was checked?|No; it bypasses this validation.|Trust moves the security obligation upstream.
A static host has no DHCP binding; what is needed?|A supported explicit static ARP policy.|Static addressing alone does not populate snooping evidence.
Does DAI filter every routed IP packet?|No.|It validates ARP at its Layer 2 ingress boundary.
Can a snooping match override an explicit ARP ACL denial?|Not under the documented ACL-priority behavior.|Static policy precedence must be reviewed separately.
Does DAI protect IPv6 Neighbor Discovery?|No.|IPv6 requires appropriate separate first-hop controls.
Why enable binding collection before enforcement?|To avoid rejecting intended hosts lacking evidence.|A correct host can fail when the policy database is absent.
What observations support a real rejection?|Correct ingress/VLAN, claim, binding and relevant drop evidence.|A silent ping failure is not enough to identify the cause.
Why review rate limits during failover?|Legitimate ARP bursts can trigger enforcement limits.|Packet rate and address validity are separate checks.
What is a safe repair for a binding mismatch?|Restore the owned correct evidence and retest, retaining untrusted edge policy.|Trusting every host attachment hides the original defect.''')

add('s5-g2-t1','snooping','snooping',
'DHCP snooping distinguishes client and server attachment trust and learns scoped lease bindings for downstream controls. Trusted ports are the intended paths for server/relay messages; ordinary host ports remain untrusted. It is not a DHCP server and does not by itself authenticate every client. VLAN enablement, relay information, persistence and switch topology must be designed before enforcement.',
'Observe which interface receives server replies and enable snooping for the intended VLAN. A server message arriving from an untrusted edge is rejected under the declared worksheet policy.\nCorrelate accepted DHCP exchanges with IP, MAC, VLAN, interface and lease evidence. The worksheet declares message direction and trust; it does not parse packets or allocate leases.\nInspect learned bindings before applying DAI or IP Source Guard. Review restart persistence and Option 82/server compatibility because a correct address with missing binding can fail a dependent control.',
'Use an isolated client VLAN and one intended server path. Capture baseline lease/binding; change only that lab path trust for a negative rehearsal, then restore it before enabling dependent enforcement.',
'Do not trust host edges or all inter-switch links by habit. Trust must follow the upstream server path and the assumptions enforced there.',
'DHCP bursts, rate limits and binding persistence influence availability. Size and test them on the actual platform rather than assuming every reconnect storm is malicious.',
'Trusted server path|May deliver declared server messages|Identify the actual ingress interface.\nBinding|Scoped lease evidence|Required by dependent first-hop controls.\nOption 82|Relay/attachment metadata|Define insertion and server acceptance policy.',
'Select a declared server reply on the intended trusted worksheet attachment.\nFault: make that attachment untrusted and predict server-message rejection.\nRestore its exact trust setting and require a completed client lease plus scoped binding, not merely a configured pool.',
'show ip dhcp snooping\nshow ip dhcp snooping binding','l2',
'''Server reply arrives on an untrusted host edge; result in this model?|Reject the server message.|Server attachment trust is separate from client permission.
Does snooping allocate a lease?|No.|Allocation belongs to the DHCP server.
Which fields should a binding record include?|IP, MAC, VLAN, interface and lease context.|An IP-only list misses the attachment boundary.
Should every trunk be trusted automatically?|No.|Trust depends on the intended server path and upstream controls.
DAI enabled before bindings exist; what may happen?|Intended host ARP may be rejected.|Dependent enforcement requires valid evidence first.
Why review Option 82 with the server?|Insertion and acceptance policy can affect the exchange.|Transport reachability alone does not prove server acceptance.
Does a snooping binding authenticate a user?|No.|It is address/attachment evidence rather than protected user identity.
Why review persistence on restart?|Lost bindings can disrupt dependent enforcement.|Configuration persistence and runtime database persistence differ.
What should reconnect burst limits accommodate?|Expected legitimate client behavior on the target.|A nominal rate is not a measured capacity result.
How do you verify restored server-path trust?|Obtain an intended lease and matching scoped binding from the original client.|A trust configuration listing alone is incomplete.''')

add('s5-g2-t2','ipsg','binding-ip',
'IP Source Guard restricts host-originated IP traffic at supported Layer 2 attachments using dynamic or supported static source bindings. The binding includes source address and attachment context; optional IP-and-MAC mode adds the MAC condition. It differs from DAI because the protected traffic is IP rather than ARP. A manually configured host address is not automatically a valid source binding.',
'Inventory host source IP, ingress VLAN and interface, then verify its accepted binding exists. Record whether the selected mode checks IP alone or IP plus MAC.\nCompare the observed source with the binding under the enabled port policy. A correct IP on the wrong VLAN or attachment fails this worksheet; additional platform prerequisites remain external.\nRetest the intended host transaction and a declared mismatched source, then restore only the owned binding/settings. DAI may separately affect address resolution before the guarded IP packet is even sent.',
'Build DHCP/static binding evidence before enabling the owned access-port filter. Check release support for trunks, EtherChannel, PVLAN and authentication integration; do not assume the same features on every Catalyst.',
'The worksheet covers a single binding and selected IP/MAC mode; it excludes device tracking, multiple bindings, IPv6 and hardware programming. Source binding does not grant application permission.',
'Binding churn and hardware table limits can affect forwarding. Measure updates and legitimate access recovery rather than infer scalability from one model row.',
'Source binding|Accepted IP and attachment context|Static host configuration alone is insufficient.\nIP-only mode|Compare source IP and scope|MAC identity is not established.\nIP-and-MAC mode|Also compare supplied source MAC|Still not cryptographic authentication.',
'Record IP 192.0.2.8, VLAN 20 and the owned port binding in the worksheet.\nFault: change only VLAN to 30 while leaving IP unchanged.\nRestore VLAN 20, compare optional IP-and-MAC mode and require the original host transaction after target recovery.',
'show ip source binding\nshow ip verify source','ipsg,l2',
'''Correct IP arrives on the wrong VLAN; permitted in the scoped model?|No.|Attachment context is part of the binding.
Is configuring a static IP on the host sufficient?|No.|Accepted static source binding is a separate switch policy.
How does IPSG differ from DAI?|IPSG filters source IP traffic; DAI validates ARP claims.|They operate on different packet classes.
IP-only mode sees another MAC with the correct IP/scope; what does this model do?|Permit the source check.|The modeled mode intentionally does not compare MAC.
Switch to IP-and-MAC mode with mismatched MAC; result?|Reject.|The additional supplied MAC condition fails.
Does a binding grant access to a sensitive application?|No.|Address validation and application authorization are distinct.
Why inspect mode and interface support?|Filtering prerequisites and supported attachments vary.|A browser calculation cannot certify platform features.
No accepted binding exists; expected guarded result?|Reject the source check.|A correct-looking address cannot substitute for policy evidence.
What capacity concern follows rapid host moves?|Binding updates and hardware programming churn.|Measure the target rather than count worksheet rows.
What confirms a repaired binding?|Matching source/scope evidence and the original host operation.|A table entry alone is not end-to-end recovery.''')

add('s5-g2-t3','pvlan','pvlan',
'Private VLANs divide a Layer 2 domain into primary and secondary roles. An isolated host communicates with a properly mapped promiscuous attachment, while community hosts can also communicate within their own community. Different communities and isolated peers are separated at this modeled Layer 2 boundary. Routing through a promiscuous gateway can reconnect hosts unless Layer 3 policy restricts that path.',
'Record primary/secondary VLAN association and host/promiscuous mappings on supported switches. A role label without the required mapping does not establish forwarding.\nFor two distinct endpoint attachments, compare roles: a mapped promiscuous endpoint permits the modeled path; community peers need the same community; isolated-to-isolated and isolated-to-community are denied.\nTest direct peer delivery separately from routed access through the gateway. A failed Layer 2 peer path does not establish that higher-layer communication is impossible through every route.',
'Rehearse two communities and an isolated host with one mapped gateway in a disposable lab. Preserve maps before changing one host role; inspect both peer and gateway transactions.',
'Restrict gateway hairpin/routed policy where isolation is required. Verify trunk propagation and switch support rather than assuming one local role protects the entire fabric.',
'Platform VLAN, trunk and feature-combination limits matter. The truth table models declared roles and mapping, not MAC learning or physical forwarding capacity.',
'Isolated|No direct host-peer access in this model|Mapped promiscuous access is separate.\nCommunity|Direct peers in the same community|Other communities remain separated.\nPromiscuous|Mapped access to secondary roles|Routed policy still controls higher-layer paths.',
'Select two distinct isolated endpoints, then compare same-community and different-community pairs.\nFault: remove the declared promiscuous mapping and predict gateway-path rejection.\nRestore the mapping and retain a separate routed-policy test so gateway access does not erase the intended isolation.',
'show vlan private-vlan\nshow interfaces switchport','pvlan',
'''Two isolated host ports: direct Layer 2 path here?|Denied.|They are separated under the declared mapped PVLAN roles.
Two hosts in community 10: direct path?|Permitted in this model.|Same-community peers can communicate.
Communities 10 and 11: direct peer path?|Denied.|Different communities remain separated.
An isolated host reaches the mapped promiscuous gateway; expected?|Permitted in this model.|Promiscuous access is distinct from host-peer access.
Promiscuous role is declared but mapping is absent; result?|Denied by the mapping requirement.|Role labels cannot replace the consuming map.
Can routing through a gateway reconnect separated hosts?|Yes, unless Layer 3 policy prevents it.|Layer 2 separation is not universal communication isolation.
Does this truth table learn MAC addresses?|No.|It evaluates supplied roles for distinct endpoints only.
Why inspect trunk propagation?|The role/association scope must persist across intended switches.|A local map does not prove fabric-wide enforcement.
What platform limits should be checked?|VLAN/trunk capacity and supported feature combinations.|The worksheet makes no hardware scale claim.
How do you accept a restored PVLAN map?|Verify intended gateway access and prohibited direct/routed peer objectives separately.|One successful gateway ping does not validate isolation.''')

add('s5-g2-t4','dot1x','identity',
'IEEE 802.1X controls network attachment using a supplicant, authenticator and authentication server. The endpoint exchanges EAP over LAN with the authenticator; the authenticator commonly carries EAP to the server using RADIUS. Identity validation, returned authorization and enforcement of the assigned role are separate stages. This later lesson deepens policy failure and recovery rather than repeating the earlier services introduction.',
'The supplicant participates in the selected EAP method and must validate the authentication-server identity where the method requires it. The switch relays the exchange without becoming the user identity store.\nA successful server result is followed by authorization policy such as a role, VLAN or downloadable ACL. Verify the selected result was actually consumed at the correct attachment and host mode.\nInspect the session and original permitted/denied service operations. MAB and critical/outage access are separately designed exceptions, not equivalent proof of certificate-backed identity.',
'Use a disposable authenticated client and explicit restricted role. Record method, server trust, session identity and policy attachment. Keep console access independent before testing a single owned policy fault.',
'Protect EAP server trust and credentials. Classic RADIUS transport limits are separate from the chosen EAP method; do not describe an Access-Accept as unlimited network authorization.',
'Reauthentication, host modes and server latency affect access continuity. Test bursts and server unavailability under the actual policy; this declaration trace runs no EAP exchange.',
'Supplicant|Endpoint participating in EAP|Validate server trust for the selected method.\nAuthenticator|Enforces attachment policy|Returned authorization must be consumed.\nAuthentication server|Evaluates method and identity|Success differs from assigned permission.',
'Record a declared authenticated session with a consumed restricted role.\nFault: leave identity valid but remove role attachment in the worksheet.\nRestore the attachment declaration; require session identity plus both an intended permitted and prohibited application operation on an optional target.',
'show authentication sessions','eap,l2,radius',
'''Which link carries EAPOL?|Supplicant to authenticator on the local attachment.|RADIUS is a separate authenticator-to-server exchange.
Access-Accept received; is role enforcement proven?|No.|The returned result must be consumed at the attachment.
Why validate EAP server identity?|To avoid trusting an unintended authentication endpoint.|Method protection depends on the configured trust boundary.
Valid identity but forbidden role: expected decision here?|Deny authorization.|Authentication is not permission for every operation.
What does MAB establish compared with protected EAP identity?|A different weaker exception based on MAC identification.|It must not be reported as equivalent certificate-backed identity.
Why inspect host mode?|Multiple endpoints and voice/data handling affect session scope.|One authenticated endpoint need not authorize every attached device.
Does this trace perform EAP negotiation?|No.|It consumes declarations of stage results.
What recovery path is required before a policy fault?|Independent console-local access.|The test must not lock out all administrative recovery.
Which load concern accompanies reauthentication storms?|Server and authenticator request capacity/latency.|A single successful session does not establish scale.
What verifies restored access?|Correct session/role consumption and original permitted/denied operations.|A server log alone misses enforcement and application outcomes.''')

add('s5-g2-t5','aaa','identity',
'AAA separates authentication of an identity, authorization of an operation and accounting of activity. A successful login does not imply permission to change configuration; a completed command does not imply its accounting record was retained. This Network Security occurrence focuses on failover boundaries, command policy and independent administrative recovery.',
'Attach the intended login and authorization method lists to the correct lines/session context. A defined server group or method list that is never consumed establishes no enforcement.\nDistinguish explicit rejection from unavailable/error behavior. In classic method-list reasoning a rejection stops access, while an unavailable method may lead to a configured next method; the actual platform and server result handling must be checked.\nCorrelate identity, authorized operation and retained accounting from the same session. Test one harmless prohibited command and preserve console-local recovery without letting fallback silently bypass an explicit denial.',
'Use a test administrator restricted to read-only commands. Preserve method-list attachments and a separately tested recovery identity before a single owned unavailable-server or denied-command rehearsal.',
'Protect central transport and recovery credentials. RADIUS and TACACS+ roles/security differ; legacy shared-secret/body protection must not be equated with modern authenticated transport.',
'Central policy availability and accounting queues affect management access. Decide fail-open/fail-closed behavior explicitly per operation; the worksheet does not contact AAA servers.',
'Authentication|Identity result|Success does not grant every command.\nAuthorization|Allowed operation and consumed policy|Verify actual command/service scope.\nAccounting|Recorded activity|Retention is independent of access success.',
'Declare successful authentication and read-only authorization in the worksheet.\nFault: set the authentication result to reject, then unavailable; explain why only the latter is eligible for the declared local fallback.\nRestore central acceptance and verify forbidden-command denial plus accounting retention without disclosing credentials.',
'show aaa servers','radius,l2',
'''Login succeeds; may the user change every setting?|No.|Command authorization is an independent decision.
Central authentication explicitly rejects; use local fallback here?|No.|The modeled rejection stops the chain.
Central method is unavailable and local fallback is allowed; what next?|Evaluate the local identity and operation under the declared policy.|Availability failure is distinct from explicit rejection.
An accounting destination exists; is retention proven?|No.|The record must actually arrive and be retained.
A method list is defined but unattached; is enforcement established?|No.|The consuming session/line attachment matters.
Why test a read-only identity?|To demonstrate permitted observation and prohibited change separately.|Successful login alone misses least-privilege enforcement.
Should recovery credentials be shared with all users?|No.|Emergency access is a protected independent control.
Does classic shared-secret transport equal TLS?|No.|Legacy protection has distinct documented limits.
Which failover design question must be explicit?|Whether each operation fails open or closed on unavailable policy.|Availability policy must not accidentally override a denial.
How is AAA recovery accepted?|Identity, allowed/denied command behavior and retained accounting correlate in one session.|Three separate configured objects are incomplete evidence.''')

add('s5-g2-t6','port-security','port',
'Port Security limits accepted source MAC addresses on supported switch attachments using configured or learned secure-address state. Sticky learning can simplify persistence, but a learned MAC is not cryptographic identity. Protect, restrict and shutdown violation modes produce different operational evidence; the device release and interface mode constrain support.',
'Record the maximum secure-address count, accepted addresses and learning/persistence behavior before the test. A phone plus workstation or host replacement can legitimately need more than one address.\nWhen a new source exceeds the declared maximum, protect drops the violating traffic, restrict also exposes violation evidence and shutdown places the attachment into the modeled error-disabled state. Actual counter/log behavior requires platform verification.\nRestore the correct owned address/count and the supported port recovery state, then verify the original allowed host and prohibited extra source. Removing every learned address or disabling enforcement is not a precise repair.',
'Use an isolated access attachment and a spare owned test endpoint. Preserve secure-address entries and violation mode; rehearse only one additional address and restore the baseline before saving any configuration.',
'MAC spoofing can impersonate an allowed address; Port Security does not replace 802.1X or application identity. Sticky learned addresses can become stale after legitimate equipment replacement.',
'Maximum counts and churn affect moves and recovery. The worksheet models one count/mode boundary and does not learn real frames or modify a switch port.',
'Protect|Drop violating traffic in the model|Keep accepted sources distinct.\nRestrict|Drop with violation evidence|Inspect supported counters/logging.\nShutdown|Model error-disabled attachment|Restore policy and port state safely.',
'Set the worksheet maximum to one and accepted count to one.\nFault: present a new unaccepted source; compare protect, restrict and shutdown outputs.\nRestore the original accepted-source declaration and explain the separate target error-disable recovery required after shutdown.',
'show port-security\nshow port-security interface GigabitEthernet1/0/1','l2',
'''Does a secure MAC authenticate its owner cryptographically?|No.|A MAC address can be spoofed.
One accepted MAC, maximum one, new source: what triggers?|A violation under the declared count limit.|The new source would exceed the accepted-address allowance.
Which mode models dropping without added violation reporting?|Protect.|Reporting differences remain platform-specific in real operation.
Which mode models dropping with violation evidence?|Restrict.|The affected traffic is denied while the attachment remains usable for accepted sources.
Which mode models error-disable?|Shutdown.|Recovery includes port state as well as the corrected policy.
Why review phone plus workstation topology?|It can require multiple legitimate source addresses.|A count chosen without endpoint context can break intended access.
Sticky address remains after host replacement; what should be checked?|Owned learned-state and persistence before precise replacement.|Do not clear unrelated secure entries.
Is disabling all Port Security a precise violation repair?|No.|Restore the intended address/count and supported port state.
What churn cost should be measured?|Legitimate moves and replacement recovery on the target.|A worksheet cannot predict actual learning capacity.
What verifies recovery after shutdown mode?|Correct secure policy, restored port state and original allowed/denied source observations.|Policy restoration alone may leave the port unusable.''')

add('s5-g3-t0','control-plane','copp',
'Control-plane protection preserves the processes that maintain routing, management and protocol state. Distinguish ordinary hardware-forwarded transit traffic from traffic to the device or punted for CPU handling. A transit packet may still be punted because of an exception, so destination address alone is insufficient for classifying every CPU path. Protection combines exposed-service reduction, admission policy, policing and monitoring.',
'Inventory routing neighbors, management sources and exception traffic that the selected platform sends to CPU. Identify the supported queue/class mapping before changing a policer.\nSeparate required protocol/management traffic from unneeded or excessive input. Restrict sources where possible and preserve sufficient policy for legitimate protocol bursts and recovery.\nCorrelate class counters, CPU behavior, neighbor/session continuity and original service observations. A drop counter demonstrates a class action, not that every required control protocol remains healthy.',
'Observe the installed control-plane policy on a supported owned device. Baseline routing/management continuity before one bounded declaration-only excess-load case; do not flood a live router.',
'An overly aggressive default class can disable routing and administrative recovery. Platform-installed system policies must be reviewed in their documented supported form.',
'Packet rate, byte rate and burst behavior differ. The worksheet computes a declared constant-size offered load only; it does not model punts, CPU scheduling or real drops.',
'Transit path|Ordinary forwarding across the device|Exceptions can still cause a CPU punt.\nTo-device path|Management/protocol destination|Apply an appropriate control-plane boundary.\nProtection evidence|Class actions plus service continuity|Counter changes alone are insufficient.',
'Inventory intended management and routing traffic with the installed class policy.\nFault: raise the supplied worksheet packet rate above the configured envelope; calculate the offered byte rate.\nRestore the rate declaration and specify CPU, neighbor and original-management observations needed for a real recovery claim.',
'show policy-map control-plane','plane,copp',
'''Does every transit packet avoid CPU processing?|No.|Exceptions can punt traffic to the control plane.
Why inventory routing and management before policing?|They must remain usable under the protective policy.|A broad drop can harm the objective it protects.
Drop counters rise; are neighbors necessarily healthy?|No.|Protocol continuity must be checked separately.
Which load units must be distinguished?|Packets per second and bits per second.|Packet size changes their relationship.
Can destination address classify every CPU exception?|No.|Platform punt reasons and queues also matter.
Should a live router be flooded for this lesson?|No.|Use the declaration worksheet and owned bounded observations.
Why keep an independent console?|A policing mistake can deny the management path.|Recovery cannot rely solely on the affected class.
Does a source ACL replace every CPU protection measure?|No.|Permitted sources can still send excessive or expensive traffic.
Does this envelope calculate CPU utilization?|No.|Offered arithmetic is not a CPU scheduler or throughput measurement.
What supports recovery after a protection change?|Policy/class evidence, neighbor continuity and original management/service observations.|A single counter or configuration line does not establish recovery.''')

add('s5-g3-t1','copp','copp',
'Control Plane Policing classifies traffic reaching the control-plane path and applies supported rate/action policy. Platform hardware queues and system policy differ from general router MQC examples. A nominal rate alone is incomplete: units, burst allowance, packet accounting and the action for conforming/exceeding input determine the behavior. This worksheet compares a constant-size offered load with a declared envelope, without simulating a token bucket.',
'Identify the traffic class and actual attachment in the installed policy. An ACL used for classification selects a class; its permit/deny does not automatically equal an interface packet-filter action.\nRecord whether the policy rate is pps or bit/s. Convert constant declared packet size using eight bits per byte, while retaining that wire overhead and hardware accounting can differ from the worksheet.\nCompare the offered average with the rate, then review bursts and required protocol behavior separately. At exactly the nominal rate the arithmetic is within the envelope; that does not predict per-packet conformance, drop counts or real CPU availability.',
'Use the documented installed system policy rather than replacing it with a generic example. Preserve supported policer rates/class mappings and an independent management recovery route before an owned change.',
'Protect routing and AAA/authentication classes as well as user-facing management. Do not make an unbounded permit class for traffic merely because its protocol is legitimate.',
'A fixed 1000 pps envelope represents very different byte loads for 64-byte and 1500-byte packets. Burst state and platform accounting are excluded, so no calculated excess is presented as measured loss.',
'Class match|Selects the control-plane class|ACL classification differs from filtering.\nRate envelope|Nominal pps or bit/s threshold|Keep units and size assumptions explicit.\nBurst/action|Per-packet state and enforcement|Not inferred from an average rate comparison.',
'Record the installed class, rate units and supported action before using the calculator.\nFault: change only declared packet size while holding pps constant; compare bit/s envelopes.\nRestore the original size/rate and specify target class counters plus management/routing continuity for acceptance.',
'show policy-map control-plane','copp,plane',
'''100 packets/s of 100 bytes gives what modeled load?|80000 bit/s.|Multiply packets by bytes and eight; wire overhead is excluded.
An ACL permit selects a CoPP class; does it automatically forward the packet?|No.|The class policy action still determines enforcement.
Offered average equals rate; what may this worksheet conclude?|Within the declared nominal envelope.|Burst state and actual drops remain unknown.
Why do pps and bit/s policies differ?|Byte load depends on packet size.|Equal packet rates can carry very different bit rates.
Does calculated excess equal measured dropped packets?|No.|A token bucket, burst and action would need actual state.
Why inspect the installed system policy?|Supported classes/queues differ by platform.|Generic router configuration may not apply to a Catalyst system policy.
Can a low policer break legitimate routing?|Yes.|Required control bursts and continuity must be preserved.
Does this calculator include Ethernet wire overhead?|No.|It uses explicitly supplied accounted packet bytes.
What evidence should accompany a rate change?|Class counters, CPU context and original routing/management continuity.|A configured nominal value is not service proof.
How should a bad rate be restored?|Restore the exact supported baseline and verify the original control operations.|Do not remove all protection to hide the failure.''')
add('s5-g4-t0','vpn','vpn',
'A virtual private network carries selected private communication over another network under an explicitly chosen tunnel and security design. A tunnel is an overlay relationship; its underlay must still reach the peer. Private addressing or encapsulation alone does not establish confidentiality, authenticated identity or least-privilege access. VPN acceptance follows the original protected application transaction rather than stopping at a tunnel-up icon.',
'Define which sources, destinations and operations enter the protected overlay and which stay outside it. Record endpoints, identity policy, routing and the observation point before selecting a technology.\nEstablish underlay reachability independently, then validate the protected endpoint relationship and intended traffic selection. The outer packet serves the underlay while inner addressing serves the protected path.\nCorrelate selected traffic, protected-path evidence, return route and original application behavior. A reachable peer without a matching protected path is not a functioning private service; a working tunnel can still authorize too much.',
'Use two isolated gateway/client endpoints and a documented application objective. Preserve management access and baseline routes before changing one owned traffic-selection declaration.',
'Protect endpoint identity and keys and restrict the resources exposed after tunnel entry. Do not equate being inside a VPN with authorization to administer every server.',
'Encapsulation reduces effective MTU and encryption adds processing. Measure target throughput, path MTU and recovery rather than borrowing a nominal interface rate.',
'Underlay|Network carrying the outer packet|Must reach the peer independently.\nOverlay|Selected protected communication|Routing and selection determine scope.\nApplication permission|Original allowed operation|A tunnel does not grant every privilege.',
'Record outer peers and inner application source/destination in separate columns.\nFault: clear only the worksheet child-path declaration while retaining underlay reachability.\nRestore it and list matching protected-path, return-route and application evidence needed on a target.',
'show crypto ikev2 sa\nshow crypto ipsec sa','ipsec,vti',
'''The peer is reachable; is the protected service proven?|No.|Underlay reachability is separate from tunnel selection and application behavior.
Does encapsulation alone encrypt content?|No.|Protection depends on the selected protocol and negotiated policy.
Why record inner and outer addresses separately?|They identify different routing/observation scopes.|Outer delivery does not prove the inner protected flow.
VPN login succeeds; is server administration automatically permitted?|No.|Application authorization remains independent.
Which route must be checked for the protected request?|The original source route selecting the intended overlay.|The gateway may have a tunnel that this source never uses.
Why test the return route?|The original transaction needs bidirectional delivery.|Outbound protected counters alone are incomplete.
Can split routing intentionally leave some traffic outside the VPN?|Yes.|The exception must match the documented policy and disclosure risk.
What should a tunnel-up icon be correlated with?|The original selected protected transaction.|Control state alone cannot establish usable service.
How does encapsulation affect MTU?|It reduces the available inner packet budget.|Actual overhead and path behavior depend on the design.
How do you accept recovery after a selection fault?|Restore exact selection and verify protected request, return and application permission.|Do not broaden all traffic merely to make an icon green.''')

add('s5-g4-t1','ipsec','vpn',
'IPsec applies policy to IP traffic using security associations and packet protection. The security policy database describes whether traffic is bypassed, discarded or protected; the security association database holds the negotiated/installed state for protection. ESP can provide confidentiality and integrity under the chosen transform; AH does not encrypt content. Algorithm choice, mode and actual endpoint support remain deployment-specific.',
'Match the observed traffic to the policy and selectors. Tunnel mode carries an inner IP packet within an outer IP packet; transport mode protects applicable upper-layer content without the same full inner-packet encapsulation.\nUse the selected security association with its direction, SPI, endpoints and transform. IPsec SAs are unidirectional, so usable request/response protection requires the appropriate state for both directions.\nReview protected counters, selector agreement, anti-replay behavior and the original application observation. Counter increments can belong to unrelated traffic; an IKE SA without a matching child/data SA is insufficient.',
'Record protected selectors, peer identity, mode, NAT handling and installed directional SAs before testing. Use supported platform guidance rather than a universal crypto-map recipe.',
'Verify authenticated peer identity and approved current transforms. Anti-replay rejects duplicates in its supported sequence-window context; it does not prove content is benign or application access is authorized.',
'Overhead depends on headers, transforms, padding and NAT traversal. The worksheet does not encrypt packets or predict effective MTU, hardware acceleration or throughput.',
'SPD|Policy for bypass/discard/protect|Match the intended traffic at the chosen observer.\nSAD|Installed association state|Direction and selectors must match.\nESP versus AH|Different protection capabilities|AH is not a confidentiality mechanism.',
'Write one owned selector pair and separate inbound/outbound SA observations.\nFault: remove only the declared matching child SA while leaving peer authentication true.\nRestore it; require protected counters for the original traffic and both application directions, not unrelated SA activity.',
'show crypto ipsec sa','ipsec,vti',
'''IKE SA exists but child SA is absent; is protected data delivery proven?|No.|Control negotiation and data protection have distinct state.
Is an IPsec SA bidirectional?|No; it is unidirectional.|Both directions need appropriate protection state.
Which database contains the traffic treatment policy?|The SPD.|The SAD holds association state rather than the policy decision itself.
Does AH encrypt application content?|No.|Authentication/integrity protection is distinct from confidentiality.
What does tunnel mode encapsulate?|An inner IP packet under an outer IP header.|The outer route serves the tunnel peer path.
Does an ESP counter increase prove this application succeeded?|No.|Correlate selectors, original traffic and application outcome.
What is anti-replay intended to reject?|Repeated protected packets under the association sequence/window rules.|It is not malware detection or user authorization.
Why inspect NAT handling around policy selection?|Translation can change the tuple or required encapsulation.|The deployment must reconcile selection and observation points.
Can this worksheet calculate real encryption throughput?|No.|It traces supplied prerequisites without packet protection or hardware measurement.
What supports recovery after an SA/selector fault?|Matching directional state and original protected request/response evidence.|A peer-up status or unrelated counter is incomplete.''')

add('s5-g4-t2','ike','vpn',
'Internet Key Exchange authenticates peers and establishes keying/security association relationships for IPsec. This lesson centers on IKEv2; IKEv1 phase terminology must not be imposed on its different exchanges. IKE_SA_INIT establishes initial cryptographic negotiation material, and IKE_AUTH authenticates identities and ordinarily establishes the first child SA. Initial negotiation success alone is not authenticated peer acceptance.',
'Agree on compatible proposals and exchange initial keying material/nonces under IKEv2. Packet delivery on the negotiation transport is a prerequisite, not proof of successful identity validation.\nAuthenticate the intended peer using the configured identity/trust policy and create the required child SA/selectors. Authentication failures differ from no compatible proposal and from protected-route failure.\nAdditional child creation and rekeying use CREATE_CHILD_SA; retain lifetime/renewal evidence separately from application continuity. Reauthentication/rekey handling and liveness depend on the actual implementation and policy.',
'Capture proposal, expected peer identity, trust anchor/shared-secret scope and child selectors on both endpoints. Preserve a supported baseline and independent console before a single owned identity-policy fault.',
'Do not disable peer verification to repair a mismatch. Use independently approved transform/trust policy; this course provides no real secrets or deployment-ready universal suite.',
'Negotiation bursts, renewal intervals and server/key operations affect load. A declared authenticated checkbox measures neither cryptographic strength nor actual handshake latency.',
'IKE_SA_INIT|Initial proposal/keying exchange|Peer authentication is not yet established.\nIKE_AUTH|Authenticated identity and initial child context|Verify the expected identity/trust policy.\nCREATE_CHILD_SA|Additional/rekey association exchange|Continuity requires separate observation.',
'Separate underlay, initial exchange, authentication and child-SA evidence in the notebook.\nFault: mark peer identity unacceptable while leaving transport reachability true.\nRestore the expected identity policy and require authenticated IKE plus matching child state before the original application test.',
'show crypto ikev2 sa\nshow crypto ipsec sa','ike,vti',
'''IKE_SA_INIT completed; is the peer authenticated?|No.|IKE_AUTH is the distinct authenticated exchange context.
Which IKEv2 exchange ordinarily establishes the first child SA?|IKE_AUTH.|Later association creation/rekeying uses a different exchange.
Which exchange creates additional or rekeyed child SAs?|CREATE_CHILD_SA.|IKEv2 is not described accurately by only IKEv1 phase labels.
UDP reachability succeeds but identity fails; where is the fault?|At peer authentication/trust policy.|Opening more ports does not repair unacceptable identity.
Should peer verification be disabled to resolve mismatch?|No.|Restore the intended identity and approved trust configuration.
Does a matching proposal alone authorize the application?|No.|Authenticated child/route state and application permission remain separate.
Why record both peers selectors?|The installed child policy must protect the intended traffic.|Negotiation can succeed for unrelated selector scope.
Is rekey completion the same as uninterrupted application service?|No.|The original transaction needs continuity/recovery observation.
Which capacity issue accompanies many renewals?|Negotiation and cryptographic operation load.|A worksheet does not benchmark handshake throughput.
How do you verify an identity-policy repair?|Expected authenticated peer, matching child state and original protected application operation.|Transport reachability alone remains insufficient.''')

add('s5-g4-t3','site-vpn','vpn',
'A site-to-site VPN joins selected networks through authenticated gateways. Gateway identity differs from the identities of individual application users behind them. Route-based and policy-based designs select traffic differently, so accepting one peer relationship does not prove every local source enters the intended tunnel. Both endpoint policy and underlay/return paths must agree with the same documented objective.',
'Define local and remote protected networks, gateway identities and the intended service tuple. Review overlap and address translation before selecting a route or traffic-selector policy.\nEstablish authenticated gateway and matching directional data associations. For a route-based design inspect the source routing table/VRF and tunnel attachment; for a policy-based design inspect the relevant selected tuple.\nTest the original local host toward the remote service, its protected reply and an explicitly prohibited tuple. Retain the negative observation without broadening all selectors, and verify recovery from the same host.',
'Use two disposable gateways with one permitted application and a separate management path. Save routes, policy attachment and NAT handling before a single owned protected-route fault.',
'A gateway-authenticated tunnel is not per-user authorization. Keep remote management and sensitive server access behind explicit resource policy.',
'Overlapping addressing, asymmetric return and overhead can dominate troubleshooting. Measure path/MTU and endpoint CPU; the worksheet has no real tunnel traffic.',
'Gateway identity|Authenticates the tunnel endpoint|Does not identify each inner user.\nTraffic selection|Route or policy chooses protected scope|Record the actual consuming design.\nReturn path|Remote response uses intended policy|Outbound counters alone are insufficient.',
'Record one local-host/remote-service flow and the protected selector/route scope on each site.\nFault: clear only the protected outbound-route declaration while leaving authenticated SAs true.\nRestore the route and verify the original protected service plus a forbidden remote-management tuple.',
'show crypto ikev2 sa\nshow crypto ipsec sa\nshow ip route','ipsec,ike,vti',
'''Gateway identities are valid; is every inner user authorized?|No.|Tunnel endpoint trust differs from application-user permission.
What distinguishes route-based traffic selection?|The intended route/tunnel attachment selects the protected path.|Policy-based selection relies on its applicable match policy.
Tunnel exists but host route selects another path; what failed?|The protected traffic-selection route.|Installed association state can be unused by the original source.
Why review overlapping private networks?|The endpoints may not uniquely route the intended inner destination.|Addressing/NAT design precedes acceptance.
Outbound encryption grows but reply is missing; next evidence?|Remote return route/policy and corresponding inbound traffic.|One direction does not prove the original transaction.
Should selector-any repair an unexplained failure?|No.|Restore the intended narrow scope and investigate the actual boundary.
Which observer should verify application recovery?|The original local host toward the original remote service.|A gateway-originated probe may use a different source or policy.
What negative test belongs in acceptance?|An explicitly prohibited remote resource operation.|Usability and least privilege require separate observations.
Can advertised link speed predict encrypted throughput?|No.|Overhead, transforms and endpoint processing matter.
How do you accept a restored protected route?|Repeat original bidirectional service and prohibited-flow tests with matching protected-path evidence.|Do not stop at a tunnel-up icon.''')

add('s5-g4-t4','remote-vpn','vpn',
'Remote-access VPN policy admits an individual user/device to a scoped set of resources through a protected session. Authentication, assigned routes/DNS, endpoint posture and resource authorization are different obligations. A full-tunnel versus split-tunnel design changes where traffic is sent; neither automatically establishes the security of every endpoint or application.',
'Validate the intended server identity and user/device authentication using the chosen method. Apply MFA or certificate policy as designed; a password accepted by an unintended server is not a trusted session.\nConsume the assigned access role, client routes and DNS policy. Check whether each intended application enters the protected path and whether name resolution or local subnet overlap sends it elsewhere.\nRetest allowed and prohibited resources and revoke the owned session/identity as a separate denial test. A retained client profile or connected icon does not demonstrate fresh authorization after revocation.',
'Use one disposable identity and a least-privilege test role. Record assigned address, routes, DNS and gateway/session context; preserve a separate administrator recovery route before changing a single owned role.',
'Protect client endpoint and server trust. Explain split exclusions and credential/session revocation explicitly; being remote-connected is not a universal trusted-network membership.',
'Concurrent sessions, encryption and endpoint network conditions affect capacity and user latency. This declaration trace does not install a client or benchmark a gateway.',
'Protected session|Expected server and user/device relationship|Identity and transport trust both matter.\nAssigned policy|Routes, DNS and resource role|Verify actual client consumption.\nRevocation|Removes permitted session/resource use|Test denial under the implemented lifecycle.',
'Record one protected application and one prohibited administration operation for a disposable user.\nFault: retain valid identity but deny the requested role in the worksheet.\nRestore the intended restricted role and describe a separate revoke/reconnect test without using a real account.',
'show crypto ikev2 sa','ike,tls,zt',
'''Connected VPN icon appears; is application access proven?|No.|Client path, role and application behavior need separate verification.
Why validate the gateway identity?|To authenticate the intended protected endpoint.|Successful user credentials alone do not establish trusted server identity.
What can wrong assigned DNS affect?|Resolution and selection of the intended application endpoint.|Tunnel state does not establish correct naming.
Does split tunneling send every flow through the VPN?|No.|Explicit route policy selects included and excluded traffic.
Valid identity but denied role: should access be granted?|No.|Authentication does not override resource authorization.
Why check local subnet overlap?|A client may route the intended destination locally.|The actual client route can differ from gateway intent.
What proves revocation behavior?|The implemented session/resource denial at the original client.|Removing a database entry without observing enforcement is incomplete.
Should every remote user inherit management access?|No.|Define a least-privilege resource scope.
What capacity variables matter?|Concurrent sessions, protection overhead and user-path conditions.|A single model trace supplies no gateway scale estimate.
How do you accept repaired remote policy?|Verify consumed routes/DNS/role, original permitted use and prohibited use.|A connected icon remains only one observation.''')
add('s5-g5-t0','firewall','firewall',
'A firewall enforces an explicit traffic policy at a selected boundary. Stateless filters decide from packet fields; stateful inspection also uses admitted flow context. Neither automatically authenticates users or fixes application defects. Begin with a default-deny resource matrix and documented exceptions, then verify which interface, zone, session and translation context actually consumes it.',
'Describe permitted initiation using source, destination, protocol and service. Separate traffic to the firewall itself from transit traffic, and review address translation at the selected observation point.\nFor stateful policy, distinguish a response belonging to admitted valid state from a new reverse-direction initiation. The worksheet consumes a declared valid-state flag; it does not create or authenticate a real connection.\nRetain rule/session evidence and the original allowed and prohibited application observations. A permitted filter result does not establish routing, content visibility or endpoint authorization; a timeout does not uniquely identify a firewall deny.',
'Use a disposable boundary with required HTTPS and prohibited administration. Preserve policy, translations, routes and independent management before one owned service-rule fault.',
'Restrict firewall administration and logging, including the management plane and secrets in configuration backups. Stateful admission does not make allowed encrypted content benign.',
'Connection limits, inspection, logging and asymmetric paths affect performance. Measure the actual supported workload; this trace has no real session table or throughput estimate.',
'Stateless permit|One packet decision|Return permission is separate.\nStateful response|Belongs to an admitted valid flow|New reverse initiation is different.\nApplication permission|Endpoint access decision|Firewall admission does not override it.',
'Declare an inspected forward initiation, then compare response versus new reverse initiation.\nFault: select pass instead of inspect for the forward policy; remove the reverse permit and predict the response denial.\nRestore inspect and separately verify a prohibited new reverse connection remains denied on the planned target.',
'show ip access-lists','fw,zbf',
'''An admitted stateful response arrives; does it authorize new reverse initiation?|No.|Responses and new sessions have different policy meaning.
What makes a stateless filter different?|It evaluates packet fields without creating connection state.|A forward permit does not automatically admit replies.
A timeout follows a request; is firewall denial proven?|No.|Path, listener, return policy and application failure can also time out.
Why record NAT relative to rule evaluation?|The tuple may be translated at different boundaries.|Match the fields actually consumed by the selected policy.
Does firewall permit override application denial?|No.|Endpoint authorization is independent.
What does the worksheet valid-state flag represent?|A supplied condition, not a real tracked connection.|No actual state creation, expiry or sequence validation occurs.
Why protect firewall administration separately?|Its compromise can disable traffic controls.|Transit policy does not necessarily govern to-device management.
Can encrypted admitted content still be harmful?|Yes.|Transport admission and content safety are different claims.
Which load dimensions should be measured?|Connections, inspection, logging and equivalent workload latency.|Rule count alone does not establish target capacity.
What verifies repair of a required-service rule?|Required original service works while prohibited initiation remains denied.|A broad permit may restore usability while breaking the security objective.''')

add('s5-g5-t1','zbf','firewall',
'Cisco Zone-Based Firewall groups interfaces into zones and attaches directional policy to a source/destination zone pair. An inspect action provides supported stateful handling; pass allows matched traffic without creating inspection state; drop rejects it. Inter-zone policy must be defined deliberately. Same-zone and self-zone behavior have separate defaults/controls and cannot be inferred from an ordinary inter-zone example.',
'Identify actual ingress/egress zones and any interface ACL that also consumes the traffic. Define the intended directional zone pair and attach the matching inspect-type policy; merely defining a class map has no service effect.\nClassify the forward flow and apply inspect, pass or drop. A permitted ACL in a class map can select traffic for a drop action, so classification is not itself the enforcement decision.\nFor a matching response, inspect state may supply reverse handling under the configured design; pass requires an independent reverse policy. Verify state and original service, then treat self-zone management and new reverse initiation separately.',
'Preserve zone memberships, zone pairs, class/policy objects and management path on a disposable supported router. Test one owned wrong-direction or pass-versus-inspect declaration and restore exact attachment.',
'Do not assign every interface to zones before verifying recovery dependencies. Self-zone management and existing interface ACLs require explicit independent review.',
'Inspect-supported protocol behavior, connection scale and logging vary. The trace covers a supplied policy relation, not ALG behavior, reclassification or real session expiry.',
'Zone pair|Directional source-to-destination policy|Wrong direction leaves the intended flow unprotected/unusable.\nInspect|Supported stateful processing|Matching response state is separate from a new session.\nPass|Permit without state creation|Reverse permission needs independent policy.',
'Draw Users → Servers and Servers → Users as separate initiation directions; record inspect on the intended forward pair.\nFault: change inspect to pass and examine a response without a reverse permit.\nRestore inspect, then add explicit self-zone management review rather than treating it as transit.',
'show zone-pair security\nshow policy-map type inspect zone-pair session','zbf',
'''Forward policy uses pass without reverse permission; modeled response?|Denied.|Pass creates no inspection state for return handling.
What does a zone pair identify?|A directional source/destination zone relationship.|Its reverse is a different initiation policy.
Class-map ACL permits a tuple; may the policy drop it?|Yes.|Classification selects a class whose action can be drop.
Is merely defining a policy map sufficient?|No.|It must be attached to the consuming zone pair.
Does an inter-zone example define self-zone management policy?|No.|Traffic to/from the router itself has a separate scope.
Does same-zone behavior follow every inter-zone default?|No.|Review supported same-zone controls and defaults explicitly.
Why inspect interface ACLs too?|They can affect traffic before the zone policy.|Multiple consuming boundaries can explain a failure.
Can inspect state authorize unrelated reverse initiation?|No.|Matching responses differ from new connections.
Does this trace simulate an application inspection engine?|No.|ALG, reclassification, expiry and device sessions are excluded.
How do you verify restored zone-pair policy?|Correct membership/attachment/session evidence and original permitted/denied operations.|A defined object alone does not prove consumed behavior.''')

add('s5-g5-t2','asa','firewall',
'Cisco ASA software provides firewall policy, connection handling, translation and supported inspection. Routed mode and transparent mode attach to different forwarding designs; security contexts and management scope also affect interpretation. Interface security levels describe part of default policy behavior but cannot replace explicit least-privilege rules. This lesson uses ASA 9.20 documentation and does not equate ASA software with FTD.',
'Record mode, context, interface/nameif, route and translation context for the original flow. Determine the observed addresses at the applicable policy stage instead of assuming pre/post-NAT behavior from another product.\nReview the consuming access rule, connection and inspection policy. A static translation publishes addressing, but it is not itself application authentication or proof that the access policy admits the intended flow.\nCorrelate allowed and denied original operations with scoped counters/connection state. State handling and inspection can affect response behavior; a generic inspect/pass classroom relation is not an ASA parser or feature emulator.',
'Use an isolated ASA context with console access and one owned flow. Preserve access-group, NAT, routes and service policy before testing a narrow required-service rule; use release-specific syntax.',
'Restrict to-device management separately and review default same-security/inter-interface behavior in the exact design. Do not depend on a high security-level label as an identity check.',
'State, inspections, logging and context allocation affect capacity. No ASA appliance, license, parser or throughput was exercised by this course.',
'ASA software|Firewall operating software with supported services|Distinct from FTD product/policy management.\nNAT|Address/port translation|Does not authenticate application access.\nConnection/inspection|State and protocol handling|Correlate the original flow, not unrelated sessions.',
'Record ASA mode/context and pre/post-translation intended tuple in the evidence notebook.\nFault: keep translation present but remove the modeled forward permit.\nRestore the narrow permit and require original allowed/denied flow evidence rather than publishing a broad any-any exception.',
'show access-list\nshow conn\nshow xlate','asa',
'''A static translation exists; is application access proven?|No.|Translation, traffic policy and application permission are separate.
Are ASA software and FTD interchangeable policy systems?|No.|Their products, configuration and management roles differ.
Why record the security context?|It identifies the policy/state scope being observed.|A connection in another context does not prove this flow.
Does a high security level authenticate users?|No.|A zone/interface default is not protected identity.
Can a generic IOS ACL recipe certify ASA syntax?|No.|Use the exact ASA release and mode documentation.
What differs between routed and transparent designs?|The forwarding attachment and interpretation context.|Do not assume identical route/translation procedures.
Why protect to-device management separately?|It may consume different controls from transit traffic.|Application boundary rules alone are incomplete management protection.
Does show conn for unrelated traffic establish this application?|No.|Correlate the original tuple and operation.
What should throughput evaluation include?|State, inspection, logging and allocated appliance/context resources.|A classroom state declaration is no benchmark.
How do you verify a repaired access rule?|Repeat original required and prohibited operations with scoped rule/connection evidence.|Do not accept an unrestricted permit merely because it restores reachability.''')

add('s5-g5-t3','firepower','detector',
'Cisco Firepower concepts are taught here using the distinct Secure Firewall Threat Defense and management roles. FTD executes supported traffic/inspection policy; management tooling authors and deploys that policy. A saved management change is not evidence that the intended device received and enforced it. Access-control actions, intrusion policy, encrypted-content visibility and licensing/support scope must be reviewed separately.',
'Identify the managed device, interface/zone and selected access-control policy. Confirm the intended deployment reached the target rather than treating an edited rule in the management UI as active enforcement.\nFollow the actual access decision and applicable inspection policy. Intrusion detection/prevention needs relevant content visibility and a supported enforced rule; encrypted visibility or decryption choices have their own limits.\nCorrelate device events with the original transaction and a harmless supplied rule marker. A monitor/alert result differs from an enforced block, and a lack of events may reflect bypass, missing visibility or logging rather than absence of threats.',
'Use an isolated supported target and benign test content only. Preserve the exact deployed policy/version and rollback plan before a single owned monitor-versus-block comparison; no FTD/FMC is installed here.',
'Protect management identities and inspect sensitive-data exposure before enabling decryption/logging. Product licensing, supported versions and hardware lifecycle must be checked for the real deployment.',
'Inspection, logging and decryption alter resource demands. The detector worksheet consumes declared match/visibility flags and does not scan payloads or measure appliance performance.',
'Management configuration|Authored desired policy|Deployment confirmation is separate.\nDevice enforcement|Consumed access/inspection decision|Correlate device and original-client evidence.\nVisibility|Content available to the control|No event does not establish clean traffic.',
'Record policy version, intended device and deployment evidence separately from rule contents.\nFault: keep a declared rule match but switch the inspection role to IDS/monitor behavior.\nRestore supported blocking enforcement and specify original-client denial plus device evidence required on a target.',
'show version','ftd,ids',
'''Policy was saved in management; is device enforcement proven?|No.|Deployment and actual consuming device state need separate evidence.
What role does FTD provide?|Supported traffic and threat-policy execution on the device.|Management authoring is a different role.
Supplied rule matches in IDS mode; expected worksheet result?|Alert without inspection block.|Passive detection is distinct from prevention.
Content is not visible; does no detection imply safe traffic?|No.|Visibility limits can hide relevant content.
Is a matching signature proof of successful exploitation?|No.|A signal needs context and outcome analysis.
Why record deployment version/device?|To tie intended policy to the actual enforcement target.|A management screenshot can describe unused configuration.
Should real malicious payloads be used in this lab?|No.|Use supplied declarations or an owned harmless marker.
Why review decryption privacy?|Inspected content/logs may contain sensitive data.|Visibility controls create their own handling obligations.
What drives appliance inspection cost?|Policy, visibility/decryption, connection workload and logging.|Declared signals do not benchmark the device.
How do you accept monitor-to-block recovery?|Confirmed deployed enforcement plus original-client and device observations.|A changed rule label alone is incomplete.''')

add('s5-g5-t4','ids-ips','detector',
'An IDS observes and reports signals; an inline IPS can enforce prevention under its policy. Detection methods include signatures and behavior-based analysis, but a match is not automatically a confirmed successful compromise. Placement and visibility determine what can be observed. A clean event list may mean no signal, no content, bypass or missing telemetry.',
'Identify the sensor path and whether traffic is mirrored/passive or actually traverses inline enforcement. Record encrypted-content visibility and the rule/version expected to recognize the chosen benign test marker.\nDistinguish a rule signal from its action: alert/monitor, block, bypass or failure behavior. A blocking policy needs actual consumption at the intended inline boundary; a passive sensor cannot deny the packet by observation alone.\nRetain original-client and sensor evidence for one harmless marker, then restore the baseline and repeat intended service. Review false positives/negatives and fail-open/fail-closed behavior without inferring incident prevalence from the raw alert count.',
'Use supplied detector cases or a disposable harmless marker application. Do not generate live attacks or attach a traffic generator to production. Document sensor path and known visibility limits.',
'Protect sensor management and retained packet/event data. Rule matches can contain sensitive payloads; preserve only the scoped redacted evidence needed for investigation.',
'Inspection load, packet loss and logging can reduce visibility or availability. The worksheet models declared signals only and supplies no detection-rate or false-positive benchmark.',
'IDS|Observation and alert role|Does not inline-block by itself.\nIPS|Inline enforcement role under policy|Verify the traffic actually traverses it.\nDetection signal|Evidence requiring interpretation|Different from confirmed compromise.',
'Compare the same declared visible match in IDS and blocking IPS modes.\nFault: remove the visibility declaration while retaining the supplied match flag.\nRestore visibility and separate detection/enforcement evidence from actual incident confirmation.',
'show version','ids,ftd',
'''A passive IDS reports a match; has it blocked the packet?|No.|Observation alone is not inline enforcement.
What must be true for modeled IPS blocking?|Visible content, a supplied match and enabled blocking in IPS mode.|The worksheet declares these conditions rather than measuring them.
No alerts are present; is traffic definitely safe?|No.|Visibility, bypass and telemetry gaps remain possible.
Can a signature match establish successful compromise?|No.|Correlate context and outcome independently.
Why record the actual sensor path?|Placement determines what is observed or enforced.|A passive mirror and inline path have different authority.
What is a false positive?|A signal/action incorrectly classifying benign activity as relevant malicious activity.|Evaluate intended service impact and rule context.
What is a false negative?|A relevant harmful event not detected by the control.|A quiet dashboard alone cannot quantify it.
Why define fail-open versus fail-closed?|Sensor failure can either preserve forwarding or deny service.|Availability and exposure tradeoffs must be explicit.
Does this worksheet estimate detection accuracy?|No.|It consumes rule-match and visibility declarations.
How do you verify a restored detection path?|Original benign-marker behavior and scoped sensor observations agree, with permitted service retained.|Do not equate one marker with coverage of every threat.''')

add('s5-g5-t5','waf','detector',
'A web application firewall evaluates HTTP-oriented requests under a supported deployment and rule policy. It can enforce signals relevant to web attacks, but it does not fix application authorization, unsafe database construction or every business-logic flaw. Network port filtering and WAF parsing have different scopes. TLS termination/inspection placement determines whether request content is visible to the control.',
'Identify the client-to-proxy-to-origin path, trusted proxy metadata and TLS termination. A rule defined on a WAF that the client bypasses cannot protect the direct origin path.\nApply the relevant parsed request/rule policy and action. Managed rules, exceptions and request normalization are implementation-specific; this worksheet consumes a declared match, not a regular-expression payload scanner.\nTest permitted application requests and an owned harmless rule marker from the original path. Preserve request IDs, action and origin outcome without recording secrets; a clean WAF decision does not override application identity/authorization.',
'Use a disposable HTTP application or supplied cases. Scope exceptions to the actual endpoint/rule and test normal users after one owned monitor/block fault. Keep direct origin exposure in the threat model.',
'Protect TLS keys, authentication tokens and sensitive request logs. Test application validation and parameterized data access independently; WAF coverage is not a substitute for them.',
'Rule processing, body limits, exceptions and TLS visibility influence latency and coverage. This detector model does not implement HTTP parsing, normalize attacks or estimate a vendor detection rate.',
'Network filter|Protocol/address/port policy|Does not parse full web semantics.\nWAF rule|HTTP-aware signal/action|Visibility and path consumption matter.\nApplication authorization|Resource/business permission|A clean WAF result does not establish it.',
'Record the proxy/origin path and where HTTP content is visible after TLS handling.\nFault: declare visible harmless rule match but disable blocking; distinguish alert from prevention.\nRestore blocking in the worksheet and require the marker denial and normal authorized application result on an optional target.',
'ss -lnt','waf,tls',
'''WAF permits a request; is application authorization proven?|No.|Business/resource permission belongs to the application.
Where must HTTP content be visible?|At the control inspecting the request under the chosen TLS design.|Encrypted bytes alone may not expose relevant request semantics.
A client bypasses the WAF to the origin; is its rule consumed?|No.|The intended proxy boundary is bypassed.
Does a TCP port-443 permit parse HTTP attacks?|No.|Transport filtering differs from HTTP-aware policy.
Does this worksheet scan malicious payloads?|No.|It consumes supplied match and visibility flags.
Why test normal users after tuning a rule?|A false positive can disrupt intended service.|A marker block alone misses operational acceptance.
Should a broad disable-all exception repair one false positive?|No.|Scope the exception to the justified endpoint/rule and retest.
Does a WAF replace parameterized database access?|No.|Application construction and validation need independent protection.
What resource cost depends on body inspection?|Parsing/rule processing and retained content/log volume.|The worksheet supplies no vendor latency estimate.
How do you accept restored WAF enforcement?|Harmless marker action, original normal application use and protected-origin path agree.|One alert label is not enforcement proof.''')
add('s5-g6-t0','zero-trust','access',
'Zero trust organizes resource access around explicit identity, device, context and policy decisions rather than inherent trust in network location. The policy engine decides access, the policy administrator establishes/terminates the communication path and the policy enforcement point consumes the decision. Segmentation and protected transport can support this design, but neither a product name nor an internal source address implements the complete architecture.',
'Identify the requested resource and operation, subject identity, device signals and policy freshness. A successful earlier login is not a permanent authorization for every future resource.\nEvaluate the applicable policy and ensure its result reaches the enforcement point. A valid decision in an isolated server log can be unused if the resource path bypasses or never consumes it.\nReassess under the chosen session/lifecycle policy and verify permitted and denied operations at the resource. Continuous evaluation is an architectural objective whose cadence/mechanism must be specified; this worksheet does not monitor real devices or revoke sessions.',
'Define one resource-specific permitted operation, a prohibited management operation and the evidence needed for identity/device/context. Preserve independent recovery and explicit exceptions before a policy rehearsal.',
'Network location and device profiling are signals, not blanket trust. Protect decision/enforcement administration and avoid turning availability exceptions into silent unrestricted access.',
'Identity evaluation, policy calls and enforcement updates introduce latency and availability dependencies. Measure actual resource access and renewal/revocation behavior instead of claiming continuous verification from one checkbox.',
'Policy engine|Makes the resource access decision|Inputs require trustworthy provenance and freshness.\nPolicy administrator|Establishes/terminates the policy path|Decision delivery and lifecycle are separate.\nEnforcement point|Consumes access policy on the resource path|A bypass invalidates the boundary.',
'Record identity, device eligibility, resource permission, fresh policy and consumed enforcement for one requested operation.\nFault: leave identity valid but mark device/context policy unacceptable.\nRestore the intended policy and specify original-resource and revocation evidence separately from a decision-server log.',
'show authentication sessions','zt',
'''A user is on the internal LAN; is access inherently trusted?|No.|Location does not establish resource-specific identity/context permission.
Which component makes the access decision?|The policy engine.|Policy administration and enforcement have separate roles.
Valid identity but device policy fails; result here?|Deny the declared operation.|Identity success does not override other required policy.
Which component consumes policy on the traffic/resource path?|The policy enforcement point.|A decision that is not consumed does not enforce access.
Does buying one product implement all zero trust?|No.|Architecture includes resources, inputs, policy, enforcement and lifecycle.
Why record policy freshness?|A stale decision may not reflect current eligibility.|Session validity and reassessment rules must be explicit.
Does endpoint profiling prove protected identity?|No.|A classification signal can be wrong or spoofed.
What makes a permitted-operation test insufficient alone?|It does not verify denial or revocation boundaries.|Least privilege needs positive and negative observations.
What availability dependency can policy add?|Identity/decision/enforcement communication and update paths.|Measure the actual transaction under the chosen failure policy.
How do you accept restored resource policy?|Original allowed/denied operations and fresh consumed decision evidence agree.|Network location or a server Accept is incomplete proof.''')

add('s5-g6-t1','nac','access',
'Network Access Control joins attachment policy, identity/device signals and enforcement to decide an endpoint access role. Authentication, profiling, posture assessment and remediation are different functions. A device classified as a printer is not thereby authenticated as an approved printer. Returned VLAN/ACL/role intent must be consumed by a supported network attachment, and application authorization remains outside the attachment decision.',
'Identify endpoint/session and the signal provenance: protected authentication, observed classification or posture evidence. State which are required for this role and which are exceptions.\nEvaluate the requested access or remediation policy and return supported authorization to the attachment. Validate the actual role/ACL/VLAN consumed, including host mode and feature support.\nRetest original permitted and prohibited resource operations and the designed posture-change/reassessment path. A successful remediation redirect is a different objective from full production-resource access.',
'Use a disposable endpoint and restricted role. Plan an unacceptable posture declaration and a controlled remediation/recovery path; keep an independent administration session before enforcement.',
'Treat MAB/profiling and outage access as explicit bounded exceptions. Do not grant management privileges solely from a reported OS or vendor identifier.',
'Authentication/posture bursts and reauthorization can affect client continuity. The worksheet consumes eligibility declarations, not agent health checks or live enforcement updates.',
'Authentication|Protected identity result|Distinct from a profile label.\nPosture/profile|Eligibility and classification signals|Review freshness and spoofing limits.\nRole consumption|Enforced attachment policy|Returned attributes alone do not establish it.',
'Record the approved identity, posture objective and intended restricted role for one endpoint.\nFault: keep identity accepted but clear policy consumption in the worksheet.\nRestore consumed role and require original allowed/denied service plus the explicit remediation objective on a target.',
'show authentication sessions','ise,eap,l2',
'''Endpoint is profiled as a printer; is protected identity proven?|No.|Classification differs from authenticated identity.
Valid credentials but posture fails; must full access be granted?|No.|The chosen role policy can require independent eligibility.
A VLAN attribute is returned; is switch enforcement established?|No.|The intended attachment must consume supported authorization.
Why record the host/session scope?|One endpoint result must not silently authorize unrelated hosts.|Attachment and host mode determine consumption.
What is remediation access?|A restricted path intended to correct eligibility problems.|It is not unrestricted production permission.
Should MAB be treated as equivalent to certificate-backed EAP?|No.|Its identification and spoofing boundaries differ.
How should an outage exception be managed?|Explicit scope, owner and recovery/expiry rules.|Availability handling must not become universal authorization.
Does this worksheet assess a real endpoint agent?|No.|It consumes supplied eligibility and policy states.
Which load event needs separate testing?|Authentication/posture and reauthorization bursts.|One accepted endpoint does not establish capacity.
How is repaired NAC accepted?|Consumed restricted role, allowed/denied operations and remediation/reassessment behavior agree.|A server-side success message alone is incomplete.''')

add('s5-g6-t2','ise','access',
'Cisco Identity Services Engine centralizes supported network-access and device-administration policy. Policy sets select context, authentication rules choose methods/identity sources and authorization rules return permission profiles. This lesson uses ISE 3.4 policy documentation; it does not imply every network device consumes every returned feature. Device administration TACACS+ and network-access RADIUS have distinct work centers and session objectives.',
'Select the applicable policy set from the request context in documented order. A rule in another set cannot repair a request that never selects that set; distinguish enabled, disabled and monitor behavior.\nEvaluate authentication and the authorization profile, preserving identity/source, conditions and result. Review exceptions and their scope before assuming an authenticated subject receives the intended restricted role.\nCorrelate the request/session in Live Logs with consumed authorization on the NAD and the original resource operation. Logging acceptance does not prove the downloadable ACL/VLAN/role was supported, installed or effective.',
'Use one disposable identity and a narrow test policy set. Record selected set/rule/profile and NAD support; keep local-console recovery before one owned authorization/profile-consumption fault.',
'Protect identity sources, management permissions and retained logs. Device profiling and exception policies require bounded ownership rather than blanket trust.',
'Policy ordering, identity-source queries and enforcement updates affect latency. The worksheet evaluates declarations and does not install ISE, contact a directory or benchmark authentication rate.',
'Policy set|Selects request context|Order and status affect which rules are used.\nAuthorization profile|Returned permission intent|NAD support/consumption is separate.\nCorrelated evidence|Server request plus NAD and resource|An Accept alone is incomplete.',
'Record the selected ISE policy set, identity source, authorization profile and NAD attachment in separate evidence rows.\nFault: keep the returned role correct but clear the NAD-consumption declaration.\nRestore consumption and require correlated server session, installed restriction and original allowed/denied operations.',
'show authentication sessions','ise,l2',
'''ISE returns an Accept; is requested resource access proven?|No.|NAD consumption and the original operation remain separate.
What chooses the request rule context?|The selected policy set.|Rules inside an unrelated set do not apply to this request.
What do authentication rules determine?|The supported identity method/source path.|Authorization determines the resulting operation/role permission.
Why record the exact authorization profile?|It identifies the returned permission intent.|A generic success message omits resource scope.
Can every NAD consume every profile feature?|No.|Support and installed enforcement must be verified for the target.
Are TACACS+ administration and RADIUS access the same objective?|No.|They use distinct policy/session scopes.
What risk accompanies a broad exception?|It can bypass the intended restricted role.|Bound scope, owner and review/expiry are required.
Does a Live Log record prove a downloaded ACL was installed?|No.|Observe the consuming attachment independently.
What affects authentication latency?|Policy/identity-source processing and request/enforcement load.|The worksheet does not benchmark ISE or a directory.
How do you verify a repaired ISE access policy?|Correlated selected set/rule/profile, NAD enforcement and original allowed/denied operations.|Server-side acceptance alone is incomplete.''')

add('lab-5','security-lab','zones',
'The integrated Network Security Lab preserves the original Internet, DMZ, Users, Servers, Management, Guest and Backup zones. It starts from an explicit default-deny initiation matrix and permits only documented service paths. Browser rules are a classroom policy model, not a deployed firewall. The optional actual loopback fixture demonstrates an owned application access boundary, denial, fault, restore and cleanup; it does not create these network zones.',
'Assign resources and administrators to the seven zones and write required directional services. The supplied rules permit Internet-to-DMZ HTTPS, Users-to-Servers HTTPS, DMZ-to-Servers API TCP 8443, Management-to-DMZ/Users/Servers/Backup SSH, Guest-to-Internet HTTPS and Servers-to-Backup HTTPS. All other new initiation is denied in the classroom matrix.\nEvaluate the chosen source/destination/protocol/service tuple against the explicit ordered rules and default deny. A declared valid response state can admit only the matching reverse of an allowed forward rule; it must not admit a new prohibited initiation. DNS/time/logging dependencies are deliberately not granted by this small matrix and must be designed explicitly on a target.\nCollect allowed and denied operations, independent identity/resource permission and recovery evidence. Remove only the owned Users-to-Servers permit for the fault, restore its exact entry and repeat the original permitted HTTPS and prohibited management access. The loopback application fixture supplies a separate actual request-level evidence record.',
'Use the worksheet and downloadable workbook first; optional target work needs isolated supported gateways/hosts and console recovery. Define every required dependency explicitly before deployment rather than copying the classroom matrix into production.',
'Keep Management distinct from Users/Guest and restrict Backup paths. A broadly allowed response flag must never become a universal reverse-initiation exception. Use only disposable identities and harmless content.',
'Measure rules, sessions, inspection, logging and service recovery on the chosen target. Exhaustive classroom tuple checks verify this matrix only; no physical scale, throughput or vendor deployment is claimed.',
'Initiation matrix|Explicit directional service rules|Unlisted new flows are denied.\nResponse relation|Reverse of an allowed forward flow plus declared state|New reverse initiation remains separate.\nRecovery notebook|Baseline, one owned fault and exact restore|Keep application fixture evidence separate from network policy.',
'Draw all seven zones and copy the supplied permit matrix into the evidence notebook with source, destination, protocol, port and owner.\nConfirm Users → Servers TCP 443 is permitted, Guest → Management TCP 22 is denied and Internet → Backup TCP 443 is denied.\nFault: disable only the Users-to-Servers permit; verify that same HTTPS initiation now denies while Guest-to-Management stays denied.\nRestore the exact permit; repeat both original observations and separately compare a valid declared response with new reverse initiation.\nOptionally run the owned loopback Python fixture and inspect its request statuses, expected content and cleanup report. Its HTTP application allowlist is separate evidence, not a network-zone firewall deployment.',
'sha256sum labs/network-security-workbook.md','acl,fw,zt',
'''Guest initiates SSH to Management; expected matrix result?|Deny.|No supplied permit authorizes that source/destination/service.
Internet initiates HTTPS to DMZ; expected result?|Permit by the explicit public-service rule.|Other DMZ operations remain unlisted and denied.
Users initiate HTTPS to Servers; expected baseline?|Permit by the owned application rule.|Application authorization still needs independent evidence.
Disable only the Users-to-Servers rule; expected same request?|Deny by default.|The fault removes one explicit permit without broadening another path.
Does a valid response flag admit every reverse tuple?|No.|It must match the reverse of an allowed forward rule.
Why retain separate Management and Backup zones?|They have different privileged-service and data-protection objectives.|A common unrestricted users rule would erase those boundaries.
Are DNS and time dependencies implicitly allowed here?|No.|Design and test their scoped rules separately for an actual deployment.
What does the actual loopback fixture prove?|Its owned HTTP application allow/deny, fault/restore and cleanup behavior.|It does not deploy seven zones, IPsec or a vendor firewall.
Can exhaustive tuple checks certify appliance throughput?|No.|They verify this small classroom policy relation only.
How do you accept the integrated recovery?|Restore the exact permit and repeat original allowed/denied operations with separate identity and evidence scope.|A broad permit-any would fail the original security objective.''')
