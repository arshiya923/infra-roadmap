"""Primary-authored lesson specifications. No acceptance is implied by building."""
S=[]
SRC={
 'vpc':('Nexus 9000 NX-OS 10.5(x): vPC','https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/interfaces/cisco-nexus-9000-series-nx-os-interfaces-configuration-guide-release-105x/m_configuring_vpcs_9x.html'),
 'vxlan':('RFC 7348: VXLAN, Informational','https://www.rfc-editor.org/rfc/rfc7348'),
 'evpn':('RFC 7432: EVPN foundations; MPLS baseline','https://www.rfc-editor.org/rfc/rfc7432'),
 'overlay':('Nexus 9000 NX-OS 10.5(x): VXLAN BGP EVPN','https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/vxlan/cisco-nexus-9000-series-nx-os-vxlan-configuration-guide-release-105x/m_configuring_vxlan_bgp_evpn.html'),
 'fp':('Nexus 7000 NX-OS 8.x: historical FabricPath interfaces','https://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus7000/sw/fabricpath/config/cisco_nexus7000_fabricpath_config_guide_8x/configuring-fabricpath-interfaces.html'),
 'fex':('Nexus FEX compatibility matrix','https://www.cisco.com/c/dam/en/us/td/docs/Website/datacenter/fexmatrix/fexmatrix.html'),
 'n3':('Nexus 3000 NX-OS 7.x: historical switching modes','https://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus3000/sw/layer2/7x/b_Cisco_Nexus_3000_Layer_2_Switching_Config_7x/b_Cisco_Nexus_3000_Layer_2_Switching_Config_7x_chapter_0101.html'),
 'n5':('Nexus 5500 NX-OS 7.x: historical fundamentals','https://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus5500/sw/fundamentals/7x/b_5500_Fund_Config_7x/b_5500_Fund_Config_7x_chapter_010.html'),
 'n7':('Nexus 7000: historical VDC architecture','https://www.cisco.com/c/en/us/td/docs/switches/datacenter/sw/nx-os/virtual_device_context/configuration/guide/b-7k-Cisco-Nexus-7000-Series-NX-OS-Virtual-Device-Context-Configuration-Guide/m-overview-vdcs.html'),
 'upgrade':('Nexus 9000 NX-OS 10.5(x): upgrade and mode conversion','https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/upgrade/cisco-nexus-9000-series-nx-os-software-upgrade-and-downgrade-guide-105x.pdf'),
 'aci':('ACI 6.0(x): forwarding and policy fundamentals','https://www.cisco.com/c/en/us/td/docs/dcn/aci/apic/6x/aci-fundamentals/cisco-aci-fundamentals-60x/fundamentals-60x.html'),
 'bd':('APIC 6.0(x): bridging','https://www.cisco.com/c/en/us/td/docs/dcn/aci/apic/6x/l2-configuration/cisco-apic-layer-2-networking-configuration-guide-60x/bridging-60x.html'),
 'design':('Cisco ACI design guide','https://www.cisco.com/c/en/us/td/docs/dcn/whitepapers/cisco-application-centric-infrastructure-design-guide.html')}
def add(id,kind,definition,mechanism,terms,operation,fault,restore,command,refs,questions):
 q=[x.split('|') for x in questions.strip().splitlines()]
 assert len(q)==6 and all(len(x)==3 for x in q),id
 ms=mechanism.split('|'); ts=[x.split('~') for x in terms.split('|')]
 assert len(ms)==3 and len(ts)==3 and all(len(t)==3 for t in ts)
 S.append(dict(id=id,kind=kind,definition=definition,mechanism=ms,terms=ts,operation=operation,fault=fault,restore=restore,command=command,refs=refs.split(','),questions=q))

add('s7-g0-t0','evidence',
'Cisco Nexus is a family of data-center switching platforms. Family identity does not establish a universal feature set. Hardware, operating mode, release, optics, entitlement and scale must fit the intended workload together.',
'Identify the product ID and installed modules before assigning port capabilities.|Separate management access, control computation and ASIC forwarding; one can work while another fails.|Match the intended fabric feature to exact hardware and software documentation, then verify the original service.',
'Product ID~Exact hardware identity~A family name is insufficient.|Operating mode~NX-OS or supported ACI mode~Management workflows differ.|Support matrix~Feature applicability by combination~Documentation presence is not universal support.',
'Build a leaf suitability record with product ID, active release, mode, required EVPN features, optics, port rates and scale.',
'A procurement sheet says Nexus but omits product ID and release; overlay support remains unproven.',
'Add exact compatibility evidence and re-evaluate the workload and recovery requirements before approving the plan.',
'show version\nshow inventory','upgrade,overlay',
'''A proposal names only Nexus. What blocks EVPN approval?|Exact hardware, mode, release and support evidence are absent.|Brand identity cannot settle compatibility.
The console works but hosts fail. Which planes need separate checks?|Control routes, hardware forwarding and the endpoint path.|Management is a different transaction.
Does a supported port speed prove an optic works?|No; check optic, cable, distance and software compatibility.|Speed is only one constraint.
A virtual image accepts a command. What physical ASIC capability is proven?|None.|Parser behavior does not certify hardware support or scale.
What is stronger acceptance than all links green?|A named permitted application exchange and a prohibited-flow check.|Carrier state does not validate isolation.
How should legacy Nexus coverage be used?|As architectural context with exact lifecycle checks separately.|It is not a current procurement recommendation.''')
add('s7-g0-t1','evidence',
'NX-OS provides data-center switching control, management and feature processes. Similarities with other Cisco CLIs do not establish identical syntax, defaults, persistence or upgrade behavior.',
'Enabling a feature exposes functionality but does not create addressing, neighbors or policy.|Running configuration describes active intent; startup state matters at the next boot.|Redundancy and software modularity do not guarantee every upgrade is nondisruptive; verify the exact path.',
'Running configuration~Active intended state~Not a traffic observation.|Startup configuration~Persisted boot intent~Save verified state deliberately.|Feature state~Enabled function~Additional operational dependencies remain.',
'Compare sanitized running/startup baselines, feature state and version before proposing a narrow change.',
'A neighbor address is documented but the corresponding feature is disabled in the readiness record.',
'Restore the intended feature state in the plan and require separate neighbor and forwarding verification.',
'show version\nshow feature','upgrade,overlay',
'''BGP is enabled. Is EVPN ready?|No; family activation, peers, policy and forwarding remain.|Feature activation is only a prerequisite.
A change vanishes after reboot. Which boundary is suspect?|Verified running state was not persisted appropriately.|Runtime and startup state can differ.
Does a redundant supervisor guarantee a hitless upgrade?|No; consult the exact supported path and limitations.|Redundancy does not remove all disruption modes.
What must precede saving configuration?|A reviewed diff and functional and isolation checks.|Saving a fault preserves it.
Why is removing a whole feature a poor rollback for one neighbor edit?|It can affect unrelated users of that feature.|Rollback should match the owned change.
Why retain an off-device configuration export?|It survives device storage or management failure.|A local checkpoint shares the device failure domain.''')
add('s7-g0-t2','evidence',
'Nexus CLI work is performed in a specific device, privilege and configuration context. A useful transcript records target identity, time and evidence boundaries; successful command parsing does not prove service correctness.',
'Anchor observations to exact target identity and software before interpreting state.|Compare timed interface counter deltas with workload symptoms rather than diagnosing from cumulative totals.|Capture the owned baseline and applied diff; restore that baseline rather than assuming command negation recreates it.',
'Context~Target and privilege scope~A prompt does not prove ownership.|Counter delta~Change between timed samples~Old totals do not establish current rate.|Rollback~Exact owned prior state~A default can differ from the baseline.',
'Prepare a read-only transcript with identity, feature and interface observations; annotate what each line cannot prove.',
'A large error counter without sample time is labelled an active fault.',
'Collect two timed samples and correlate the delta with the original service symptom before assigning a cause.',
'show version\nshow interface brief\nshow feature','vpc,upgrade',
'''Does one million cumulative interface errors prove a current fault?|No; compare timed deltas and present symptoms.|The total has no rate boundary.
What must be confirmed before pasting a configuration block?|Target, context, privilege, release and ownership.|Correct syntax on the wrong target remains harmful.
Why avoid clearing counters first?|It destroys historical evidence before capture.|Preserve observations before changing them.
Why is no followed by a command not always exact rollback?|It may restore a default instead of the prior setting.|The baseline can be nondefault.
A paste fails halfway through. What should happen next?|Stop and reconcile the partial applied state.|A block is not necessarily atomic.
Have the Cisco examples been executed on real hardware here?|No; they are scoped guided commands.|Offline checks cannot certify the vendor parser.''')
add('s7-g0-t3','evidence',
'Nexus architecture separates management, control processes and hardware forwarding. Modular systems add supervisor, line-card and fabric dependencies. Logical isolation and duplicated modules protect selected boundaries but share physical resources.',
'Ingress parsing and lookups select policy, adjacency and egress treatment.|Control protocols compute state that must be programmed into finite forwarding tables and queues.|Cross-card traffic uses available fabric resources while power and chassis services remain common dependencies.',
'ASIC~Packet-processing hardware~Finite tables and queues.|Supervisor~Control and management module~Not a second chassis.|Fabric module~Internal cross-card transport~Failure-state capacity is model-specific.',
'Draw a packet path with the table, queue, process and physical module responsible at each boundary.',
'A route exists in control state but a forwarding entry is missing; the control/data boundary is unresolved.',
'After a supported repair, compare both tables and repeat the original flow rather than closing on a route listing.',
'show module\nshow interface brief','n7,n3',
'''A route is present but delivery fails. What additional state matters?|Forwarding programming, adjacency and egress behavior.|Computed state is not packet delivery.
What do two supervisors leave shared?|Chassis, fabric, power and other common dependencies.|Control redundancy is not two systems.
Why can low mean utilization accompany drops?|Short bursts can exhaust queues.|Averages hide transient contention.
What limits policy scale beyond port count?|Hardware table allocation and feature combinations.|Interfaces do not describe TCAM capacity.
Does cut-through remove queue delay?|No; egress contention can still buffer traffic.|Forwarding mode is one latency component.
What should a fabric capacity estimate use during maintenance?|The surviving modules and links under the named fault.|Healthy totals overstate the failure envelope.''')
add('s7-g0-t4','evidence',
'Nexus 3000 models commonly appear in fixed-form and latency-sensitive data-center roles. Exact models differ in buffers, port rates and features. A quoted unloaded forwarding latency is not an application tail-latency guarantee.',
'Identify the exact switch and release before comparing workload requirements.|Separate serialization, lookup and queueing; speed conversion can change forwarding behavior.|Measure a latency distribution under realistic offered load and packet sizes rather than treating an unloaded figure as a bound.',
'Cut-through~Early forwarding when supported~Does not prevent congestion.|Serialization~Time to transmit bits~Depends on packet size and link rate.|Tail latency~High-percentile delay~Needs workload and sample context.',
'Compare an unloaded switching claim with a bursty many-to-one workload and identify unmeasured delays.',
'A specification latency is substituted for peak-load application p99.',
'Retain the specification separately and add workload, contention and measured latency-distribution evidence.',
'show version\nshow interface brief','n3',
'''Does a low data-sheet latency bound application p99?|No; host, queues and application delays remain.|The measurement scope is narrower.
Why can many senders overwhelm a fast switch?|Their sum can exceed one egress capacity and buffer budget.|Ingress aggregate does not enlarge one output.
What happens to serialization when the output port is slower?|It takes longer and buffering may be needed.|Rate conversion affects the path.
Does cut-through check the full frame before any transmission?|Not necessarily.|Early forwarding can precede the final integrity check.
Why test multiple packet sizes?|Packet rate and serialization stress different limits.|Equal bit rates are not equal packet workloads.
What physical benchmark was performed for this lesson?|None.|The worksheet examines evidence, not silicon performance.''')
add('s7-g0-t5','evidence',
'Nexus 5000/5500 platforms illustrate historical unified-fabric designs using Ethernet and supported Fibre Channel over Ethernet functions. Ethernet carrier, storage login and completed storage I/O are separate evidence boundaries.',
'A supported converged adapter carries Fibre Channel frames inside Ethernet on the FCoE path.|Map physical attachment, FCoE VLAN and VSAN explicitly rather than treating storage as ordinary IP routing.|Verify the supported lossless-class and fabric design along with storage login and I/O, not just Ethernet reachability.',
'FCoE~Fibre Channel in Ethernet~Not iSCSI.|VSAN~Logical Fibre Channel fabric~Distinct from Ethernet VLAN.|CNA~Converged network adapter~Needs compatible host and fabric support.',
'Build a historical network/storage dependency map with separate Ethernet, fabric-login and I/O checkpoints.',
'Ethernet is up but no storage login exists; a green link is incorrectly treated as storage success.',
'Reconcile adapter, VLAN/VSAN and QoS intent, then require login and controlled test-I/O evidence.',
'show version\nshow feature','n5',
'''Does Ethernet up prove FCoE storage access?|No; fabric login, zoning and I/O remain.|Carrier is only one boundary.
Does FCoE use TCP 3260?|No; that is associated with iSCSI.|FCoE is a different transport.
Why record VLAN and VSAN separately?|They name different protocol scopes.|Equal numbers do not make them equivalent.
Can an ordinary IP router forward FCoE as IP?|No.|FCoE is Ethernet encapsulation, not an IP overlay.
What makes migration acceptance stronger than ping?|Controlled storage I/O with integrity evidence.|IP reachability does not exercise the storage protocol.
Does every 5000 model support every unified-fabric feature?|No; check model, module, release and topology.|Family identity is not universal support.''')
add('s7-g0-t6','evidence',
'Nexus 7000 is a modular family associated with supervisor, line-card, fabric and supported Virtual Device Context designs. A VDC is a logical device boundary inside a chassis, not an independent physical failure domain.',
'Allocate supported interfaces and resources to contexts according to supervisor and software restrictions.|Contexts maintain logical configuration and protocol state while sharing chassis dependencies.|Trace cross-module forwarding and surviving fabric capacity before attributing resilience to duplicated control modules.',
'VDC~Virtual Device Context~Broader than one routing table.|Line card~Ports and forwarding resources~Support varies by card.|Chassis domain~Shared physical dependency~Logical partitions do not remove it.',
'Map two tenant contexts onto their shared physical resources and identify failures that affect both.',
'Replicas in separate VDCs on one chassis are claimed to survive chassis loss.',
'Correct the failure-domain record and require separate physical systems if chassis-loss survival is an objective.',
'show module\nshow version','n7',
'''Are VDCs physically independent switches?|No; they share the chassis.|Logical separation is not physical duplication.
Why inspect the supervisor before planning contexts?|Supported limits depend on the platform combination.|A generic guide is insufficient.
Is a VDC equivalent to a VRF?|No; a VDC has broader logical-device scope.|A VRF separates routing tables.
Does a second supervisor double forwarding throughput?|Not generally.|Control redundancy is distinct from forwarding capacity.
Can every line card be assumed feature-compatible?|No; inspect exact card and release support.|Chassis membership does not imply parity.
What verifies recovery after a module fault?|All affected context services and module/path checks.|One chassis summary can miss a tenant outage.''')
add('s7-g0-t7','evidence',
'Nexus 9000 spans fixed and modular hardware used in NX-OS fabrics and supported ACI deployments. Operating mode, ASIC generation and release determine management workflow, feature availability and resource limits.',
'Establish hardware and mode before selecting standalone NX-OS configuration or APIC policy management.|For NX-OS EVPN, check underlay transport separately from overlay distribution and forwarding.|Treat mode conversion as a supported migration with disruption and configuration-impact planning, not a live feature toggle.',
'NX-OS mode~Device-oriented fabric configuration~Uses matching release guides.|ACI mode~APIC policy-managed fabric role~Requires supported hardware.|ASIC generation~Forwarding implementation~Changes scale and capabilities.',
'Compare NX-OS EVPN and ACI as alternative operating designs, including policy ownership and recovery.',
'An ACI-mode leaf is assigned a standalone NX-OS change procedure.',
'Select the matching supported workflow and retain the mode-specific baseline and recovery requirements.',
'show version\nshow inventory','upgrade,overlay,aci',
'''Is NX-OS to ACI conversion a harmless live toggle?|No; follow the exact migration and account for disruption.|Operating models differ.
Do all 9000 ASICs have identical EVPN scale?|No.|Hardware and software limits are specific.
What must precede blaming EVPN for unreachable peers?|Underlay reachability to tunnel endpoints.|The overlay depends on transport.
Who normally defines ACI tenant policy?|APIC through its policy model.|Standalone CLI is a different workflow.
Does a virtual image boot prove physical deployment support?|No.|Hardware and feature qualification remain.
What validates a mode migration beyond a prompt?|Required services, denied paths, management recovery and health.|Console access is insufficient.''')
add('s7-g1-t0','vpc',
'A virtual PortChannel lets a downstream device form one logical port channel to two cooperating Nexus peers. The peers retain separate control planes and coordinate the attachment; they do not become one chassis.',
'The downstream LACP participant sees a coordinated channel across two peers.|The peer link carries coordination and applicable traffic; keepalive supplies separate liveness evidence.|Peer-link loss with the other peer alive normally suspends secondary vPC members; dual-path loss needs failure history and recovery settings.',
'vPC member~Downstream channel attachment~Needs consistent peer configuration.|Peer link~Coordination and applicable data~Not the keepalive path.|Consistency check~Comparison of peer parameters~Some mismatches suspend forwarding.',
'Inspect both peers and the downstream channel; distinguish healthy, keepalive-only loss, peer-link loss and ambiguous dual loss.',
'Peer link is down while keepalive shows the primary alive; secondary member suspension is the expected bounded steady-state outcome.',
'Restore the peer link and consistent parameters, then retest downstream service through the intended paths.',
'show vpc brief\nshow port-channel summary','vpc',
'''Does vPC merge control planes?|No; peers remain separate devices.|Inspect both peers.
Can keepalive replace peer-link traffic?|No; keepalive carries liveness only.|It does not synchronize or transport user traffic.
Peer link fails with keepalive up. What normally happens on the secondary?|Its vPC members suspend after the applicable detection process.|This limits unsafe isolated forwarding.
Does keepalive-only loss force immediate suspension?|Not normally while the peer link remains healthy.|Detection redundancy is degraded.
Can two down-state booleans predict dual-loss behavior exactly?|No; sequence, health, timers and recovery settings are needed.|A static snapshot omits essential context.
Does two-member LACP double every single flow?|No; typical hashing selects one member per flow.|Aggregate and per-flow capacity differ.''')
add('s7-g1-t1','vpc',
'The vPC peer link is a supported port channel between peers for coordination and required data handling. VLAN scope, capacity and physical diversity matter when normal local attachments fail.',
'Build the interconnect from supported members and matching peer intent.|Check required VLAN admission independently from physical channel state.|Size for declared failure traffic and orphan paths rather than only healthy utilization.',
'Peer channel~Bundled interconnect~Members can share a failed module.|VLAN admission~Allowed service scope~An up channel may omit a VLAN.|Failure load~Redirected traffic after a fault~Can exceed normal load.',
'Map peer-link ports to modules and required VLANs, then compare surviving capacity with redirected demand.',
'One required VLAN is absent while both member links are up.',
'Restore the exact VLAN scope and verify consistency plus the affected service in both directions.',
'show vpc brief\nshow interface trunk','vpc',
'''Does an up peer channel prove every VLAN passes?|No; inspect allowed and active membership.|Aggregation and classification differ.
Why use diverse member modules where supported?|To reduce shared failure exposure.|Two cables can share one failed parent.
What traffic must sizing include?|Supported fault-redirected and orphan traffic.|Healthy utilization can understate demand.
One member fails. Is the whole peer link necessarily down?|No; remaining members may carry it with less capacity.|Availability and bandwidth differ.
Why is allowing all VLANs a poor generic rollback?|It changes isolation beyond the owned edit.|Restore the recorded list.
What closes a peer-link incident?|Consistency, membership and original service checks.|Carrier restoration alone is incomplete.''')
add('s7-g1-t2','vpc',
'Peer keepalive is a Layer 3 liveness exchange that helps distinguish peer-link loss from peer loss. It carries neither user data nor configuration synchronization, and its route should avoid the failure domain it helps diagnose.',
'Trace the configured source, destination and VRF to the actual transport path.|Combine keepalive and peer-link observations instead of treating either as complete device health.|A missing response can reflect filtering or routing rather than power loss; preserve timestamps and independent evidence.',
'VRF~Routing context~Default-table reachability can be irrelevant.|Liveness~Peer response evidence~Not complete forwarding health.|Independent path~Different relevant failure domain~Different addresses alone do not prove it.',
'Trace the keepalive VRF, filtering and physical route without relying on the peer link as its sole transport.',
'Keepalive is down while the peer link is up; identify degraded detection without claiming total outage.',
'Restore the original VRF/path policy and verify liveness, vPC state and the original service separately.',
'show vpc peer-keepalive\nshow vpc brief','vpc',
'''Why can default-VRF ping miss a keepalive fault?|Keepalive can use another VRF and source.|Use the actual context.
Does keepalive synchronize MAC state?|No.|Its scope is liveness.
Why avoid a keepalive route over only the peer link?|One fault would remove both observations.|Independence supports diagnosis.
Does missing keepalive prove a powered-off peer?|No; path or ACL loss can look the same.|Absence of reply is ambiguous.
Do two IP addresses prove physical diversity?|No; their paths may share one link or switch.|Logical identity is not failure independence.
What extra evidence is needed when both links are down?|Sequence, peer health and recovery configuration.|A snapshot cannot settle dual-active risk.''')
add('s7-g1-t3','vpc',
'An orphan port is an attachment on a vPC peer that is not itself a vPC member. Its connectivity can depend on the peer link or another supported path. Peer membership does not automatically dual-home every endpoint.',
'Trace the single-attached endpoint to local and remote destinations separately.|A physically up orphan on an isolated secondary can lose remote service when the peer link fails.|Supported selected orphan suspension can trigger an alternate attachment, but only if endpoint failover is actually configured.',
'Orphan attachment~Non-vPC endpoint link~May remain up while isolated.|Alternate path~Endpoint recovery attachment~Must be operationally tested.|Suspend policy~Supported per-port treatment~Not a universal default.',
'Compare a secondary orphan server with a vPC-attached server and identify their different failure paths.',
'The peer link fails and the orphan remains locally up but loses its required remote path.',
'Restore the recorded peer path or reviewed alternate attachment, then test orphan service and isolation.',
'show vpc brief\nshow interface brief','vpc',
'''Is every port on a vPC peer redundant?|No; each attachment needs its own path analysis.|A peer relationship does not duplicate host links.
Why can an orphan stay link-up during service loss?|Its local carrier survives while a remote dependency fails.|Link state is local evidence.
What precedes orphan suspension configuration?|Platform support and a verified endpoint alternate path.|Without an alternate it can only disconnect the host.
Are all secondary orphan ports suspended by default?|Do not assume so; inspect actual supported policy.|Configured examples are not universal defaults.
Why test both local and remote destinations?|Their paths can have different dependencies.|One local success can conceal remote isolation.
Does the generic vPC member model predict all orphan behavior?|No; it omits per-orphan policy and endpoint failover.|Use the guided path analysis for those details.''')
add('s7-g2-t0','evidence',
'FabricPath is a Cisco Layer 2 multipath technology used on supported historical Nexus platforms. It differs from an ordinary STP tree and from a VXLAN/EVPN IP overlay.',
'IS-IS topology information supports FabricPath switch identities and fabric forwarding.|Encapsulated Ethernet crosses supported fabric interfaces rather than following a conventional STP tree inside the fabric.|Classic Ethernet boundaries still need supported loop prevention; interior multipath does not make arbitrary edge loops safe.',
'Switch ID~Fabric forwarding identity~Not a VNI.|Fabric interface~FabricPath transport port~Requires supported hardware.|Classic edge~Ordinary Ethernet boundary~Loop prevention still matters.',
'Label historical FabricPath interior and classic Ethernet edges, then compare them with an IP-underlay overlay.',
'A classic Ethernet loop is ignored because the core uses FabricPath.',
'Restore the explicit boundary and the supported edge loop-prevention design.',
'show version\nshow module','fp',
'''Is FabricPath the same encapsulation as VXLAN?|No.|Shared multipath goals do not imply identical formats.
Which control protocol supports FabricPath topology?|IS-IS.|It is not MP-BGP EVPN.
Does ordinary STP span the fabric interior?|No; fabric forwarding uses its own topology.|Classic boundaries still need loop control.
Why inspect line-card support?|Support depends on module and release.|Family naming is insufficient.
Does a native FabricPath design require an EVPN RT?|No.|EVPN policy belongs to a different control model.
What does historical coverage establish about current procurement?|Nothing without exact lifecycle and support evidence.|Architecture knowledge is not a support guarantee.''')
add('s7-g2-t1','evidence',
'A Fabric Extender expands a supported parent Nexus with remote host-facing interfaces. The conventional architecture behaves like a remote line card, not an independent access switch with its own local switching control plane.',
'Host traffic travels from the extender to its parent for switching decisions.|The parent owns configuration and supported software coordination.|Many host interfaces share fabric uplinks; same-FEX proximity does not eliminate parent dependence.',
'Host interface~Endpoint-facing FEX port~Not a generic inter-switch link.|Fabric uplink~Transport to parent~Shared host capacity.|Parent~Controlling switch~Common control and forwarding dependency.',
'Trace two same-FEX hosts through the parent and calculate the surviving uplink envelope after one member loss.',
'The plan assumes same-FEX hosts keep switching after their only parent fails.',
'Correct the parent-dependent path and record supported redundancy or the expected outage.',
'show fex\nshow interface brief','fex,n5',
'''Can a conventional FEX operate as an independent switch without its parent?|No.|It is a remote extension architecture.
Do same-FEX hosts necessarily switch locally?|No; the conventional path uses the parent.|Physical proximity is not forwarding locality.
What determines parent compatibility?|Exact FEX, parent, release and topology support.|Connectors alone are insufficient.
Why calculate uplink oversubscription?|Host-port sum can exceed shared transport capacity.|Line rates are not simultaneous guarantees.
Can any network switch be attached to a host interface?|Do not assume so; follow supported restrictions.|Host interfaces are not generic aggregation ports.
Does online status prove application recovery?|No; mapping, policy and host traffic still need checks.|Discovery is a narrower boundary.''')
add('s7-g2-t2','evidence',
'Cisco Fabric Extender operations require stable identity and port mapping during discovery, replacement and recovery. This lesson deepens the earlier FEX architecture with a replacement evidence workflow rather than duplicating its purpose.',
'Correlate parent inventory, FEX number and physical identity before changing cables.|Separate discovery, online state and original endpoint delivery.|Preserve physical host-to-port mapping during replacement so the intended policy reaches the intended endpoint.',
'FEX identity~Logical number plus physical identity~Either alone can be confused.|Online state~Parent relationship established~Not an application result.|Host mapping~Endpoint to parent interface~Retain before replacement.',
'Prepare a replacement worksheet with server labels, FEX ports, parent interfaces and an independent recovery session.',
'The replacement is online but a server cable lands on a port assigned to another VLAN.',
'Restore the recorded mapping and repeat both permitted and prohibited endpoint operations.',
'show fex\nshow inventory','fex',
'''A replacement is online but one server fails. What next?|Inspect that server cable, mapped interface and policy.|Online does not mean correctly attached.
Why record serial identity as well as FEX number?|To bind the logical name to the physical extender.|Numbers can be reused.
Can matching the logical ID fix unsupported hardware?|No.|Identity does not add compatibility.
Why test every affected host after replacement?|Other ports can remain mispatched despite one successful host.|Acceptance covers the changed scope.
What risk comes from stale host-port policy?|An endpoint may enter an unintended VLAN or access domain.|Mispatching can be a security failure.
What physical operation was performed in this lesson?|None; replacement is a guided rehearsal.|Offline evidence is not hardware recovery evidence.''')
add('s7-g2-t3','evidence',
'Data Center Interconnect joins services across sites using an explicitly chosen Layer 2 or Layer 3 boundary. Extending connectivity also extends selected failure dependencies; a network path does not provide application consistency or storage recovery.',
'Prefer a documented service requirement when choosing routed exchange versus Layer 2 extension.|For stretch designs, identify broadcast scope, gateway location, MTU and failure containment.|Measure application recovery and data age separately from tunnel state, including stateful return-path behavior.',
'DCI~Inter-site connectivity~Not application recovery itself.|Stretch domain~Layer 2 scope across sites~Expands selected fault domains.|Recovery objective~Service and data target~Requires application observations.',
'Compare routed and stretched alternatives with latency, bandwidth, gateway and recovery assumptions.',
'The network link returns but the replica remains stale; full recovery is falsely declared.',
'Retest client operation and recoverable data age with separate infrastructure and application timestamps.',
'show ip route\nshow interface brief','overlay,design',
'''Does Layer 2 stretch guarantee disruption-free application mobility?|No; sessions, storage and policy remain.|Address continuity is only one dependency.
What can a routed boundary reduce?|Layer 2 broadcast and fault scope.|Benefits depend on actual design.
Why check encapsulated MTU across all site paths?|One smaller intermediate path can break large packets.|Tunnel state does not prove packet fit.
What can asymmetric firewall paths break?|Stateful session acceptance.|Routes alone do not align firewall state.
Does restored connectivity prove the RPO?|No; recoverable data age must be measured.|RPO is a data objective.
What belongs in site-partition testing?|Application ownership, split-brain handling and policy behavior.|Network-only ping misses service consistency.''')
add('s7-g3-t0','vxlan',
'VXLAN carries an inner Ethernet frame in UDP/IP between tunnel endpoints. Its 24-bit VNI identifies the overlay segment. The underlay routes the outer packet; VXLAN itself provides neither encryption nor the EVPN control plane.',
'Ingress classification selects a VNI and remote endpoint or replication treatment.|Encapsulation adds VXLAN, UDP and outer IP headers around inner Ethernet without the original FCS.|The remote VTEP decapsulates and forwards in the mapped local segment after required policy checks.',
'Inner frame~Tenant Ethernet without original FCS~Includes inner Ethernet header.|Outer packet~Routed underlay IP object~Compare IP MTU to this boundary.|VNI~24-bit overlay identifier~Not encryption.',
'Calculate the outer IP budget for a 1500-byte inner IP packet and trace both sets of addresses across the underlay.',
'A 1500-byte underlay IP MTU cannot carry a 1550-byte outer IPv4 packet for the stated untagged-inner assumptions.',
'Restore a supported end-to-end MTU or reduce the inner budget, then require actual large-packet service testing separately.',
'show nve peers\nshow nve vni','vxlan,overlay',
'''What does the underlay route?|The outer IP packet between VTEPs.|Tenant MACs are inside the encapsulation.
What outer IP size carries 1500-byte inner IP over untagged inner Ethernet and base outer IPv4?|1550 bytes.|Add 14 Ethernet, 8 VXLAN, 8 UDP and 20 outer IP bytes; no FCS.
What changes with base outer IPv6?|The outer IP packet becomes 1570 bytes.|Its base header adds 20 more bytes than IPv4.
Does VXLAN encrypt traffic?|No.|Encapsulation is not confidentiality.
Which UDP destination port is assigned to VXLAN?|4789.|BGP transport is separate.
Why can small pings pass during an MTU fault?|They may fit while larger encapsulated packets do not.|Probe size matters.''')
add('s7-g3-t1','vxlan',
'A VXLAN Network Identifier is a 24-bit segment identifier. In common symmetric EVPN designs, an L2 VNI identifies a bridging context and an L3 VNI associates a tenant routing context. Local VLAN and VNI namespaces are distinct.',
'Map the local attachment to the intended L2 VNI at each VTEP.|Associate tenant routing with a separate L3 VNI where the supported design requires it.|Check import/export policy together with VNI mapping; matching numbers alone do not prove reachability or authorization.',
'L2 VNI~Overlay bridging context~Mapped from local attachment.|L3 VNI~Tenant routing association~Distinct from endpoint VLAN.|Local VLAN~Local classification number~Need not numerically equal VNI.',
'Map Blue VLAN 10 to VNI 10100 and Red VLAN 20 to 10200 with explicit VRFs and import policies.',
'The remote Blue attachment is incorrectly mapped to VNI 10200 while transport stays healthy.',
'Restore the exact mapping and verify same-tenant delivery and denied cross-tenant traffic.',
'show nve vni\nshow vlan brief','vxlan,overlay',
'''Must VLAN 10 use VNI 10?|No.|A configured mapping relates different namespaces.
Does 24-bit encoding imply every value is supported concurrently?|No; implementation scale is specific.|Field size is not hardware capacity.
What does an L2 VNI represent here?|A bridging segment.|It is not automatically the tenant VRF.
What does an L3 VNI associate with?|A tenant routing context in the taught symmetric design.|Its role differs from endpoint L2 segments.
Can different local VLANs map into one overlay segment?|Yes, with supported consistent mappings.|Local numbers have local significance.
Why test a denied path after mapping repair?|A wrong mapping can restore connectivity by leaking isolation.|Availability alone is insufficient.''')
add('s7-g3-t2','vxlan',
'A VTEP originates and terminates VXLAN between a local attachment and an IP underlay. Source identity, remote reachability, VNI membership and endpoint state must agree. The management address need not be the tunnel source.',
'Local classification and endpoint information select a remote forwarding destination.|The outer source and destination must be reachable through the actual underlay context.|Remote decapsulation resolves the VNI and local endpoint path; transport readiness alone does not authorize tenant traffic.',
'Tunnel source~Outer endpoint identity~Often a designated loopback.|NVE~NX-OS overlay abstraction~State is not complete tenant delivery.|Remote peer~Destination tunnel endpoint~Reachability is necessary, not sufficient.',
'Trace a frame through access port, local NVE, remote tunnel source and destination attachment.',
'Management is reachable but the route to the remote tunnel source is absent.',
'Restore the intended underlay reachability and verify peer, VNI and original tenant-flow state.',
'show nve peers\nshow nve interface','overlay,vxlan',
'''Does management ping prove VTEP reachability?|No; addresses and contexts may differ.|Check the actual tunnel endpoint.
Where are VXLAN headers added?|At the ingress VTEP.|Transit routers normally forward outer IP.
Where is the inner frame recovered?|At the destination VTEP.|Local mapping then controls delivery.
Why inspect peer and VNI state separately?|A reachable peer can lack the required segment.|Transport and membership differ.
Must underlay spines learn every tenant MAC in this basic design?|No.|They can route outer VTEP addresses.
What can stale remote endpoint state cause?|Forwarding toward the wrong location.|Healthy transport can carry a misdirected packet.''')
add('s7-g4-t0','evpn',
'EVPN distributes Ethernet/IP reachability with BGP extensions and can pair with VXLAN. Route types, tenant import policy and next-hop resolution explain why a received route may not become usable forwarding.',
'Local endpoints and prefixes originate appropriate EVPN reachability records.|An RD provides uniqueness while RTs select intended import scope.|A receiver evaluates policy and transport resolution before forwarding; route visibility alone is not delivery.',
'RD~Route distinguisher~Uniqueness, not import permission.|RT~Route target~Import/export policy community.|Type 2~MAC and optional IP route~Different from type 3 membership.',
'Compare a matching-RT reachable route with a visible route whose RT is not imported by the local tenant.',
'The BGP session stays up while local import RT changes; the received route no longer qualifies.',
'Restore exact import scope, resolve the next hop and test delivery without broad route leakage.',
'show bgp l2vpn evpn\nshow nve peers','evpn,overlay',
'''Is EVPN the packet encapsulation replacing VXLAN?|No; it distributes reachability.|Control and data planes differ.
Does matching RD authorize import?|No; route-target policy controls intended import.|RD serves uniqueness.
What does type 2 commonly carry?|MAC and optional IP reachability.|It represents endpoint information.
What is type 3 used for here?|Inclusive multicast membership for BUM handling.|It is not an ordinary host-unicast route.
Is a received route with unreachable next hop ready to forward?|No.|Transport resolution remains missing.
How is RFC 7432 used for VXLAN?|As control-plane foundations supplemented by VXLAN guidance.|Its baseline data plane is MPLS.''')
add('s7-g4-t1','evpn',
'MP-BGP EVPN exchanges EVPN routes in a specific address family. A transport session being Established does not establish EVPN negotiation, origination, extended-community propagation, import policy or usable tenant forwarding.',
'Underlay reachability supports BGP transport and capability negotiation.|The EVPN family distributes route types and attributes through the chosen iBGP/eBGP design.|A route reflector can distribute control information without carrying the tenant data path; forwarding resolves toward the advertised endpoint.',
'Address family~Negotiated information class~EVPN differs from IPv4 unicast.|Extended community~Carries policy attributes such as RT~Propagation matters.|Route reflector~iBGP distribution role~Not necessarily a VXLAN hop.',
'Check transport, EVPN family, advertised/received records, RT policy and next-hop resolution in order.',
'Transport is Established but the EVPN family is disabled in the fixture.',
'Restore family and policy intent and verify a specific usable route plus the original transaction.',
'show bgp l2vpn evpn summary\nshow bgp l2vpn evpn','overlay,evpn',
'''Does IPv4-unicast Established prove EVPN exchange?|No; inspect the EVPN family.|Transport can support distinct families.
Which TCP port supports ordinary BGP establishment?|179.|It is distinct from VXLAN UDP.
Why can stripping extended communities break tenant import?|RT information may be removed.|A received route can lack needed policy attributes.
Must a route reflector carry tenant packets?|No.|Control distribution and forwarding paths differ.
A session has no EVPN routes. What next?|Check origination, family activation and export policy.|There may be no eligible advertisement.
Why is importing all RTs a poor recovery shortcut?|It can leak tenants.|Restore exact policy, not just prefix count.''')
add('s7-g4-t2','fabric',
'A basic two-tier leaf-spine fabric attaches endpoints to leaves and each leaf to every spine. Inter-leaf paths have predictable structure, but resilience depends on surviving capacity, routing and traffic locality rather than link count alone.',
'Same-leaf traffic can remain local without using a spine.|Inter-leaf traffic crosses a selected eligible spine toward the destination leaf.|ECMP normally hashes flows; removing a spine reduces aggregate capacity and may change selection without splitting every flow over all links.',
'Leaf~Endpoint and overlay edge~Local attachment context.|Spine~Inter-leaf transit~Not necessarily tenant gateway.|Oversubscription~Downlink divided by uplink envelope~Not actual utilization.',
'Draw two spines and four leaves with eight leaf-spine links and calculate one-spine-loss capacity per leaf.',
'One of two 100-Gb/s uplinks is lost while inter-leaf demand is 150 Gb/s; surviving capacity is insufficient.',
'Restore the owned path or reduce admitted load in the worksheet, then require measured target behavior separately.',
'show ip route\nshow interface brief','overlay,design',
'''How many links join four leaves to both spines?|Eight.|Each leaf has two spine attachments.
Must same-leaf traffic cross a spine?|No.|Locality changes resource use.
Does one flow necessarily use both 100-Gb/s uplinks at once?|No; typical hashing selects one.|Aggregate is not single-flow bandwidth.
What remains after one of those links fails?|100 Gb/s of uplink envelope.|Redundancy does not preserve the sum.
What is 48x25 divided by 2x100 oversubscription?|6 to 1.|1200/200 equals 6; offered load may be lower.
What does this calculator omit?|Queues, flow hashing and convergence time.|It is an envelope model, not a traffic simulator.''')
add('s7-g5-t0','aci',
'Cisco Application Centric Infrastructure expresses connectivity through a policy model managed by APIC and realized by fabric switches. It is an alternative operating model to a standalone NX-OS EVPN fabric, not merely a new name for a VLAN configuration.',
'Define tenant context, endpoint groups and intended relationships in policy objects.|APIC distributes the applicable intent and the switches realize supported forwarding and policy state.|Packets traverse leaves and spines rather than APIC; verify deployed state and actual endpoint traffic separately from controller health.',
'Policy intent~Declared desired relationships~Not proof of deployment.|EPG~Endpoint group for common policy~Distinct from a subnet.|Fabric realization~Switch state implementing intent~Requires operational verification.',
'Translate Web-to-App TCP 443 into endpoint classification, routing context and a scoped contract while retaining a denied SSH test.',
'A contract object exists but no consumer/provider relationship connects the intended EPGs.',
'Restore the intended relationship and validate leaf deployment plus allowed HTTPS and denied SSH.',
'APIC GUI: Tenants > selected tenant > Application Profiles\nAPIC GUI: Tenants > selected tenant > Contracts','aci,design',
'''Does every ACI packet pass through APIC?|No; switches forward the traffic.|Controller and packet paths are separate.
Is an EPG simply another name for an IP subnet?|No.|Policy grouping and addressing are distinct.
Does an APIC object prove leaf enforcement is installed?|No; deployment and endpoint tests remain.|Intent is not realization.
What does an absent relationship between two EPGs mean in the enforced example?|The proposed contract does not permit the flow.|An unused contract object grants nothing.
Why keep denied SSH alongside allowed HTTPS?|It checks that the policy is narrow.|Connectivity alone can conceal over-permission.
Can standalone NX-OS CLI recipes be applied unchanged to ACI?|No; use the supported policy workflow.|The operating model differs.''')
add('s7-g5-t1','aci',
'The Application Policy Infrastructure Controller manages ACI policy, configuration and operational visibility. An APIC cluster is important to management availability, but controllers are not ordinary packet-forwarding hops. Existing deployed state must be distinguished from future policy changes during a controller outage.',
'The cluster maintains the policy model and coordinates supported configuration workflows.|Fabric nodes receive applicable policy and retain operational forwarding state.|Controller unavailability affects management and new changes; it does not by itself prove immediate loss of every already-established data path.',
'APIC cluster~Policy and management system~Not in the packet transit path.|Deployed state~Policy realized on switches~Independent evidence from object existence.|Management recovery~Restored policy control~Separate from original traffic continuity.',
'Record controller health, deployed policy and an existing endpoint flow as three separate observations before a maintenance scenario.',
'APIC reachability is lost while policy is already deployed; the worksheet must not automatically declare all traffic lost.',
'Restore management reachability and supported cluster health, then validate both policy operations and the original endpoint flow.',
'APIC GUI: System > Controllers\nAPIC GUI: Tenants > selected tenant > Faults','aci,design',
'''Does APIC unreachability mean every existing flow stops immediately?|No; existing deployed forwarding can continue.|Management and forwarding dependencies differ.
Can successful existing traffic prove new policy changes can be applied?|No.|The controller workflow may still be unavailable.
What should be checked before a controller maintenance action?|Supported cluster health, backup and recovery requirements.|A generic VM snapshot is not a universal supported recovery plan.
Why inspect leaf deployment separately from controller objects?|The intended object may not be realized where endpoints attach.|Intent can exist without usable enforcement.
Is the browser APIC checkbox a cluster simulator?|No; it illustrates one management/data distinction.|Quorum, shard health and recovery are excluded.
What completes controller recovery verification?|Supported management operations and preserved endpoint policy behavior.|A login page alone is insufficient.''')
add('s7-g5-t2','aci',
'An ACI spine provides fabric transit between leaves and participates in the fabric control architecture. It is not interchangeable with an endpoint-facing leaf, and its role should not be confused with the APIC policy-management role.',
'Leaves connect to spines to obtain the intended two-tier fabric paths.|Spines provide transit and participate in endpoint-location distribution through the supported fabric mechanisms, including COOP.|A spine loss changes available paths and capacity; the remaining topology and original service must still be verified.',
'Spine~Fabric transit role~Ordinary endpoints attach to leaves.|COOP~ACI endpoint-location distribution mechanism~Different from standalone EVPN RT policy.|Surviving path~Available leaf-to-leaf route~Capacity is a separate constraint.',
'Trace a Web-to-App flow across two leaves and identify what is lost when one of the two spines becomes unavailable.',
'One spine is unavailable and the remaining uplink cannot carry the declared offered load.',
'Restore the supported path or reduce demand, then check fabric health and the original endpoint operation.',
'APIC GUI: Fabric > Inventory > selected spine','aci,design',
'''Where do ordinary workload endpoints attach in this ACI design?|To leaves.|Spines provide fabric transit.
Does a surviving spine guarantee the workload fits?|No; capacity and service evidence still matter.|Topology availability is not capacity assurance.
Is COOP identical to standalone MP-BGP EVPN route import?|No.|They belong to different fabric control designs.
Does APIC act as a spare spine when one fails?|No.|Its role is policy management.
Why inspect every affected leaf after a spine fault?|A leaf may have a missing or unhealthy remaining attachment.|One successful pair does not cover the fabric.
What is excluded from the policy worksheet for this lesson?|Actual spine routing, endpoint database and convergence behavior.|It only illustrates a narrow inter-EPG relation.''')
add('s7-g5-t3','aci',
'An ACI leaf attaches endpoints or supported external connectivity and realizes policy in the data path. Endpoint classification, forwarding context and deployed policy must agree before an application can communicate as intended.',
'An access attachment associates an arriving endpoint with the configured policy context.|The leaf uses local/fabric endpoint information and bridge/routing context to select forwarding treatment.|Switch hardware applies the relevant policy; endpoint delivery and a negative policy test validate more than discovery alone.',
'Attachment~Port/domain/encapsulation association~Physical link alone does not classify correctly.|Endpoint learning~Observed endpoint location~Can be stale or mapped incorrectly.|Leaf policy~Realized forwarding permission~Not equivalent to an APIC object.',
'Map a Web host from physical port and encapsulation to its EPG, BD and VRF before checking its App contract.',
'A host is learned on the expected leaf but classified into the wrong EPG.',
'Restore the intended attachment mapping and verify endpoint location, deployed policy and allowed/denied service behavior.',
'APIC GUI: Tenants > selected tenant > Application Profiles > selected EPG > Operational','aci,bd',
'''Does learning a MAC prove the correct EPG classification?|No.|The endpoint can be learned in the wrong context.
Why check attachment before changing contracts?|Wrong classification changes which policy applies.|A broad contract can hide the root cause.
Is a green physical port enough for endpoint delivery?|No; classification, forwarding and policy remain.|Carrier is local evidence.
What does an endpoint move require the operator to reconcile?|Old/new location, identity and intended policy context.|A move can be legitimate or a fault.
Where is normal workload policy realized?|On fabric switch hardware, particularly leaf data paths.|APIC is not a packet filter in transit.
What should a corrected mapping retain?|The original tenant boundary and a denied-path test.|Restored reachability alone can mask a leak.''')
add('s7-g5-t4','aci',
'An Endpoint Group collects endpoints that share policy treatment. An application EPG relates to a bridge domain and obtains endpoint membership through supported attachment/classification. EPG, VLAN and subnet are related but distinct abstractions.',
'A domain and attachment mapping classify traffic into the intended EPG.|The EPG references a BD for forwarding context and participates in consumer/provider contract relationships.|In the ordinary baseline, intra-EPG communication is permitted; isolation features and other exceptions require explicit policy analysis.',
'EPG~Common endpoint policy group~Not inherently one subnet.|BD relationship~Forwarding-context association~One BD may serve multiple EPGs.|Membership~Endpoint classification~Needs attachment evidence.',
'Model Web and App as separate EPGs and classify two endpoints before permitting only Web-to-App HTTPS.',
'Web and App are accidentally placed in one ordinary EPG, bypassing the intended inter-EPG boundary.',
'Restore separate membership and verify the intended contract as well as denied SSH; inspect any explicit intra-EPG policy separately.',
'APIC GUI: Tenants > selected tenant > Application Profiles > selected application > Application EPGs','aci,bd',
'''Is one EPG necessarily one IP subnet?|No.|Policy membership and addressing differ.
Can multiple EPGs use one BD?|Yes, in supported designs.|The BD and policy boundaries are distinct.
What is the ordinary intra-EPG baseline?|Communication is normally permitted unless configured isolation or exceptions change it.|Do not apply inter-EPG default assumptions inside one EPG.
Why can putting Web and App in one EPG weaken the intended design?|It can remove the expected inter-EPG contract boundary.|Membership is part of security intent.
Does a static attachment guarantee that the endpoint is present?|No; operational learning and traffic still need observation.|Configuration is not discovery.
What must a membership repair test?|Both intended communication and prohibited service behavior.|A correct name alone is insufficient.''')
add('s7-g5-t5','aci',
'A bridge domain defines an ACI Layer 2 forwarding scope and relates to a VRF for routing context. A BD can serve multiple EPGs and supported multiple subnets; it is not simply a one-to-one translation of a traditional VLAN.',
'EPGs relate to the BD while the BD associates with its VRF and configured subnets.|Unicast routing, endpoint learning and unknown-unicast/ARP treatment follow the chosen BD policies.|Changing flooding or learning policy affects discovery and delivery; neither a subnet object nor a healthy controller proves endpoint resolution.',
'BD~Layer 2 forwarding scope~Not necessarily one VLAN or one subnet.|VRF relation~Routing context for the BD~Keep tenant isolation explicit.|Unknown-unicast policy~Treatment of unresolved destinations~Proxy and flooding have different implications.',
'Draw Web/App EPG relationships to their BDs and one VRF, then state the intended routing and discovery policies.',
'The EPG points to a BD associated with the wrong VRF; correct IP addressing alone cannot repair the context.',
'Restore the intended BD/VRF relationship and validate gateway, resolution and cross-EPG policy without broad flooding shortcuts.',
'APIC GUI: Tenants > selected tenant > Networking > Bridge Domains','bd,aci',
'''Must each BD equal exactly one VLAN and subnet?|No.|The ACI abstraction supports different mappings.
Where does a BD obtain its routing context?|Its VRF relationship.|The EPG name alone does not identify that context.
Does enabling hardware proxy mean no broadcast ever occurs?|No; traffic classes and other settings differ.|Unknown-unicast treatment is not every flooding behavior.
Can correct host IPs compensate for the wrong BD/VRF association?|No.|Forwarding context must also be correct.
Why avoid changing flooding policy as an unexplained fix?|It can hide learning or attachment errors and enlarge traffic scope.|Diagnose the first failing boundary.
What verifies restoration after a BD change?|Endpoint resolution, gateway behavior and original allowed/denied traffic.|Configuration objects are insufficient.''')
add('s7-g5-t6','aci',
'An ACI contract expresses permitted relationships between policy groups using subjects and filters. A contract must be attached with the intended roles and realized on the relevant switches. It is not automatically a stateful application firewall.',
'The consuming EPG requests the service provided by another EPG through the contract relationship.|Subjects and filters constrain relevant protocol/port attributes within the policy scope.|Direction, reverse-port treatment, exceptions and service graphs affect actual behavior; verify both directions and avoid assuming a simple port match models every case.',
'Consumer~EPG using a service~A role in the relationship.|Provider~EPG offering the service~Must attach the intended contract.|Filter~Protocol and port match~Not full application authentication.',
'Define a TCP destination-443 Web consumer/App provider rule and retain an explicit destination-22 denial test.',
'A broad filter admits SSH while the intended application requirement was HTTPS only.',
'Restore the scoped filter and verify forward and return behavior plus denied SSH without claiming stateful inspection.',
'APIC GUI: Tenants > selected tenant > Contracts\nAPIC GUI: Tenants > selected tenant > Filters','aci,design',
'''Does creating a contract object alone permit traffic?|No; relationships, scope and deployment must agree.|Unused intent grants no path.
Which role normally requests the provided service?|The consumer EPG.|Consumer/provider roles explain the policy relationship.
Does TCP 443 permission authenticate the application user?|No.|Network port policy is not application identity verification.
Is every ACI contract a stateful firewall session policy?|No.|Direction and matching semantics require explicit analysis.
Why test SSH after restoring HTTPS?|It reveals an overbroad filter.|Positive tests alone miss excess access.
What contract details are excluded from this browser relation?|Return-filter semantics, policy exceptions and service graphs.|The narrow predicate must not be treated as a full APIC simulator.''')
add('s7-g5-t7','aci',
'An application profile organizes related EPGs within a tenant so an application policy structure can be managed coherently. It is an organizational policy container, not an independent forwarding or security boundary by its name alone.',
'Group application EPGs such as Web, App and Database beneath a named profile.|Each EPG keeps its BD and attachment relationships while contracts express permitted interactions.|Moving or renaming an object requires dependency review; membership in one profile does not automatically authorize all communication.',
'Application profile~Container for related EPGs~Does not replace contracts.|EPG relationship~Policy component linkage~Preserve BD and attachment bindings.|Dependency review~References affected by a change~Names alone do not describe impact.',
'Build a three-tier profile and document the exact Web-to-App and App-to-Database service relationships.',
'The operator assumes all EPGs in one application profile can communicate because the profile exists.',
'Retain the organization but restore explicit scoped relationships and verify each permitted and prohibited tier flow.',
'APIC GUI: Tenants > selected tenant > Application Profiles','aci,design',
'''Does sharing an application profile permit all EPG traffic?|No.|Contracts and other policy still apply.
What belongs beneath an application profile in this example?|The Web, App and Database EPGs.|It organizes application policy components.
Does the profile replace BD/VRF relationships?|No.|Forwarding context remains separately defined.
Why inspect references before deleting a profile?|Its EPGs and associated application intent may be affected.|An organizational object can still have operational dependencies.
What is a useful three-tier acceptance matrix?|Each intended service and explicitly denied lateral path.|One successful tier does not validate the whole application.
What does renaming a profile alone prove about security?|Nothing.|Labels are not enforcement evidence.''')
add('s7-g5-t8','aci',
'An ACI tenant is a policy-administration container for application and networking objects. Effective isolation depends on VRF, BD, EPG and contract relationships plus any deliberate shared services; tenant names alone do not prove impermeable network separation.',
'Create application profiles and networking objects within the intended administrative scope.|Map BDs to the correct VRFs and endpoint policies rather than inferring routing isolation from a display name.|Review common/shared-service references and deliberate cross-tenant relationships, with negative tests for everything not authorized.',
'Tenant~Administrative policy container~Not proof of every isolation boundary.|VRF~Routing-table context~Explicit mapping matters.|Shared service~Deliberate cross-scope dependency~Needs narrow policy and testing.',
'Design Blue and Red tenants with separate VRFs and a written decision on whether any shared service is permitted.',
'A broad shared-service relationship permits an unintended Red-to-Blue operation despite different tenant names.',
'Remove only the unintended owned relationship and verify required shared services plus denied cross-tenant flows.',
'APIC GUI: Tenants > selected tenant > Networking > VRFs\nAPIC GUI: Tenants > selected tenant > Contracts','aci,design',
'''Do different tenant names prove network isolation?|No.|Actual VRF and policy relationships determine it.
Why inventory common/shared references?|They can create deliberate cross-scope dependencies.|Administrative separation may coexist with connectivity.
Can separate tenants use overlapping addresses safely by name alone?|No; routing contexts and shared-service design must support it.|Names do not resolve address collisions.
What should a shared-service rule specify?|Exact consumers, provider, service and permitted scope.|Broad trust defeats narrow isolation.
What is a safe rollback of an unintended relation?|Restore the exact prior owned relationship and retest required services.|Deleting every shared object can break legitimate users.
What completes the tenant review?|A mapping inventory plus permitted and prohibited traffic evidence.|A tidy object tree is not enforcement proof.''')
add('lab-7','aci',
'The Cisco Data Center lab integrates a declared two-spine/four-leaf topology, server/storage/firewall attachments, VXLAN byte budgeting, EVPN reachability and tenant isolation. A separate ACI policy design expresses similar service intent without mixing NX-OS and APIC configurations.',
'Trace Blue Web on L1/L2 toward Blue App on L3/L4 through either S1 or S2, with an explicit same-tenant VNI and imported route.|Withdraw the synthetic Blue App route while keeping the underlay intact, then distinguish control reachability loss from transport failure.|Restore the exact serialized plan and validate both permitted Blue traffic and denied Red traffic; compare an ACI Web-consumer/App-provider HTTPS policy separately.',
'Fabric plan~Two spines, four leaves and attachments~Offline intent, not discovered devices.|EVPN fixture~Synthetic route and import policy~No BGP session is executed.|ACI alternative~EPG/BD/VRF and contract mapping~Separate operating design.',
'Run the downloadable offline rehearsal and retain baseline, one-fault, exact-restore and cleanup evidence for the integrated design.',
'The Blue App type-2 route is withdrawn in the owned JSON fixture while every underlay link remains available.',
'Restore byte-identical baseline JSON, re-evaluate Blue delivery eligibility and Red isolation, and confirm removal of the owned temporary directory.',
'python labs/cisco-dc-fabric.py --run','overlay,vpc,aci,design',
'''How many leaf-spine links does the reference plan contain?|Eight.|Each of four leaves connects to both spines.
What does route withdrawal with intact underlay demonstrate?|Transport reachability alone does not provide overlay destination knowledge.|Control and data dependencies are separate.
Why test Red-to-Blue denial after restoration?|Recovery must preserve tenant isolation.|A broad import can restore connectivity while leaking routes.
Does the offline runner exchange BGP or VXLAN packets?|No.|It validates declared records and an owned temporary file.
How is ACI compared with the NX-OS design?|As a separate policy mapping for the same service intent.|The two operating workflows are not combined.
What is stronger than resetting a fault flag?|Byte-identical baseline restoration plus repeated positive/negative checks and cleanup.|Exact state and behavior both matter.''')
