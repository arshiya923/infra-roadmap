"""Original teaching specifications. Build and acceptance are separate operations."""
S=[]
def add(id,definition,mechanism,terms,case,fault,repair,questions,refs='storage',kind='path'):
    S.append(dict(id=id,definition=definition,mechanism=mechanism.split('|'),terms=[x.split('~') for x in terms.split('|')],case=case,fault=fault,repair=repair,questions=[x.split('|') for x in questions.strip().splitlines()],refs=refs.split(','),kind=kind))

add('s8-g0-t0',
'Storage is a stack of interfaces and persistence guarantees. An application operation passes through caches, a filesystem or object API, a transport and media; capacity, availability and durability describe different properties.',
'The application defines an operation and its required persistence point; a successful write call may only populate a cache.|The filesystem and device translate that operation into requests; flush and ordering semantics determine what an acknowledgement promises.|Recovery must reconstruct correct application state after the stated failure, using both surviving storage and an independently restorable copy.',
'IOPS~Completed operations per second~Always state operation size and read/write mix.|Latency~Time per operation~Tail percentiles reveal delays hidden by a mean.|Durability~Retention after the specified failures~An acknowledgement needs a documented persistence contract.',
'A workload completes 12000 operations/s of 8192 bytes each: payload is 98304000 bytes/s, before protocol overhead. Compare this to a 4 KiB random-write workload without assuming equal IOPS.',
'A power-loss recovery plan relies only on a successful buffered write and a second path to the same array.',
'Retain the actual flush/acknowledgement contract, identify shared failures and restore an independent copy in an isolated target; check application records and hashes.',
'''What payload rate follows from 12000 operations/s at 8192 bytes?|98304000 bytes/s, or 98.304 decimal MB/s.|Operation count needs an operation size.
Does two-path access imply an independent backup?|No; both paths may reach the same damaged data.|Path redundancy addresses access failures.
Why retain p99 latency as well as average latency?|A minority of very slow requests can violate the service objective.|A mean hides the latency distribution.
What additional condition connects a write acknowledgement to power-loss durability?|The relevant caches and persistence contract must survive that failure or flush to durable media.|Completion at one layer is not the entire contract.
Why can free logical capacity coexist with an exhausted array pool?|Thin provisioning can promise more logical space than available physical allocation.|Measure allocation and growth at both layers.
What proves a restore is useful?|An isolated restored application opens and validates the required data within the recovery objective.|A backup job success flag is insufficient.''',kind='io')

add('s8-g0-t1',
'Direct-attached storage connects to a host without a storage network service between them. SATA, SAS and locally attached NVMe are common examples; attachment location does not by itself define redundancy or backup.',
'The host discovers a controller and device, then assigns a stable device identity independent of a transient OS path.|A filesystem or volume manager consumes that device and supplies access to applications.|When the host fails, local media may remain intact but unavailable to other hosts unless a supported recovery design exists.',
'Controller~Host-side storage interface~Controller failure can hide otherwise intact disks.|Device identity~Persistent identifier of the storage object~A device path can change after reboot.|Local failure domain~Dependencies tied to one host~Mirrors do not remove host loss.',
'A build worker keeps disposable cache on local NVMe and publishes completed artifacts to separate protected storage.',
'A second virtualization host is expected to restart a VM whose only disk resides on the failed first host.',
'Choose supported replication or shared access before claiming host failover; prove the destination can access the correct disk and independently restore retained data.',
'''Is a locally attached NVMe drive inherently network storage?|No; NVMe names a command/interface family, not a mandatory network attachment.|NVMe-oF is a separate transport context.
Two mirrored local disks survive one disk failure. What host failure remains?|Loss of the host or shared controller can still make both inaccessible.|Count shared dependencies.
Where should the disposable build cache live in the example?|Local fast storage is reasonable if it is reconstructible.|The durable artifact copy has a different role.
Why record a stable disk identifier before service work?|OS enumeration names can change.|The wrong device must never be selected by guesswork.
Can another host restart a local-disk VM solely because CPU capacity is free?|No; it also needs valid access to the VM state.|Compute availability does not supply storage.
What restore test covers accidental cache/artifact classification error?|Restore a completed artifact from the independently retained copy.|A mirror preserves accidental deletion too.''')

add('s8-g0-t2',
'Network-attached storage serves files through a network filesystem protocol. Clients request named files and directories while the server controls filesystem organization and permissions.',
'The client resolves the server and establishes an authenticated protocol session or mount.|Server export/share policy and file permissions decide which named operations are allowed.|The server translates allowed requests into storage I/O; client caching and locking must follow the chosen protocol semantics.',
'Share or export~Published file namespace~Reachability does not authorize a user.|File permission~Policy on a file or directory~Share policy is an additional boundary.|Locking~Coordination of concurrent access~Application behavior must match server semantics.',
'An engineering team shares project files through SMB; a Linux compute group uses a separately scoped NFS export.',
'A share is reachable but one user cannot create a file; an operator proposes opening the firewall to everyone.',
'Compare that user identity, share/export rights and parent-directory permissions; restore only the intended access and verify a prohibited identity remains denied.',
'''Who ordinarily owns the filesystem metadata in NAS?|The file server.|Clients request files rather than directly owning raw shared blocks.
Does successful ping prove a user can write a share?|No; protocol, identity and authorization remain.|ICMP does not test a file operation.
What should a write-denied investigation retain?|User identity, target share/path and the exact failed operation.|A generic unavailable report loses the authorization boundary.
Why can a user list a folder but fail to create a file?|Read/list rights can differ from write/create rights.|Test each required operation explicitly.
Should SMB and NFS views of one dataset be assumed to have identical identity semantics?|No; mapping and permission behavior require deliberate configuration.|Protocol coexistence does not solve identity mapping.
What negative test follows a permission repair?|An intentionally excluded identity still cannot access the protected data.|Availability must not erase isolation.''',refs='storage,smb')

add('s8-g0-t3',
'A storage area network carries storage access between initiators and targets, commonly providing block devices over Fibre Channel or iSCSI. A SAN is not synonymous with a filesystem or a backup system.',
'An initiator reaches a target over an allowed fabric or IP path and establishes the relevant storage session.|Array mapping exposes a particular logical unit to that initiator; the host identifies the same unit across paths.|A supported filesystem, datastore or application coordinates use of the blocks; independent hosts must not mount an ordinary local filesystem read-write concurrently.',
'Initiator~Endpoint issuing storage commands~Its identity must match the intended host.|Target~Endpoint servicing commands~Reachability alone does not expose a LUN.|Shared block device~Blocks visible to multiple hosts~Concurrent access needs coordination.',
'Three hosts each have one HBA connection to Fabric A and one to Fabric B, with array target ports on both fabrics.',
'All FC links are up, but a newly installed host sees no assigned LUN.',
'Trace initiator WWPN, fabric login, active zoning, target login, array mapping and host discovery in order; stop at the first mismatch.',
'''Does a SAN automatically provide file locking between arbitrary hosts?|No; block sharing needs a supported coordinating layer.|A storage network is below filesystem semantics.
What separates zoning from LUN masking?|Zoning limits fabric communication; masking controls array presentation.|Both can be necessary.
Why use two independent fabrics?|One fabric outage should leave a separate path.|Two ports in one switch still share that switch.
What can link-up establish?|A local physical/protocol link state, not LUN visibility or useful I/O.|Observe progressively higher layers.
Why identify a LUN by stable identity across paths?|The host must aggregate paths to one device, not mistake them for unrelated disks.|Path count and device count differ.
What does the three-host design still share?|The array and any common power, management or data dependencies.|Redundancy has a stated failure scope.''',refs='storage,zoning')

add('s8-g0-t4',
'Block storage exposes addressable logical blocks. It leaves file naming, directory layout and much application consistency work to a layer above the block device.',
'The consumer translates file or database operations into logical block reads and writes.|The device maps logical addresses to physical allocation; thin allocation can defer physical space consumption.|The consumer uses ordering, flushes and recovery metadata to reconstruct consistent state after interruptions.',
'LBA~Logical block address~It is not a physical platter position.|Filesystem~Organization of named files over storage~Formatting creates metadata and can destroy prior data.|Thin volume~Logical allocation backed on demand~Advertised capacity is not reserved physical space.',
'A 2 TiB logical volume uses 400 GiB in a shared pool; several peers can grow into the remaining physical capacity.',
'An operator formats an already shared LUN because a second host reports an unknown filesystem.',
'Stop writes, identify the intended shared filesystem and existing signatures, and follow its supported discovery procedure; do not initialize unknown devices.',
'''Which layer gives raw blocks file names?|A filesystem or application above the block device.|Blocks have addresses rather than directory paths.
Is LBA 100 necessarily a fixed physical sector?|No; translation and allocation can change placement.|Logical addressing abstracts the medium.
Why is formatting an unknown shared volume unsafe?|It can replace metadata used by other consumers.|Unknown does not mean empty.
A thin volume reports 2 TiB. Is 2 TiB physically reserved?|Not necessarily.|Logical and physical allocation are distinct.
Can two ordinary ext4 mounts safely write the same LUN independently?|No; that is not a supported shared-write coordination scheme.|Use a suitable clustered filesystem or exclusive owner.
What identifies the correct existing volume during discovery?|Stable device identity plus documented ownership and filesystem signatures.|A convenient device name alone is insufficient.''')

add('s8-g0-t5',
'File storage presents named files and hierarchical directories with access and metadata operations. Local filesystems and remote NFS/SMB services share this abstraction while differing in transport and consistency behavior.',
'Path traversal resolves directories and requires the relevant search permissions at each parent.|Opening a file combines identity, access mode and filesystem policy.|Writes, rename, locks and sync calls have specific semantics; application recovery must use those semantics rather than assume all operations are atomic.',
'Path~Route through a directory namespace~Parent permissions can block traversal.|Metadata~Names, ownership, times and attributes~Small metadata operations can dominate workloads.|Atomic rename~Indivisible name update within supported scope~Cross-filesystem moves need not have the same semantics.',
'A report writer creates an owned temporary file, flushes it, and replaces its prior report on the same filesystem.',
'A remote report exists but is partially updated after the writer crashes.',
'Examine the writer commit protocol, sync requirements and filesystem guarantees; validate the restored report content, not just its directory entry.',
'''Why can a readable file remain inaccessible?|A parent directory may deny traversal.|Access includes the path to the file.
What workload can bottleneck without high byte throughput?|Many small metadata operations.|IOPS and namespace operations matter.
Is every move an atomic rename?|No; cross-filesystem behavior differs.|State the operation scope.
Why validate file contents after a crash?|Name existence does not establish a complete committed report.|Metadata and application state differ.
Does a file lock automatically create a backup?|No; it coordinates access.|Recovery copies have a separate purpose.
What evidence distinguishes server slowness from client path denial?|Timed operation results and exact identity/path errors.|Throughput tuning does not fix permissions.''')

add('s8-g0-t6',
'Object storage addresses data as objects by keys through an API. Each object combines payload and metadata; bucket policy, versions and lifecycle rules govern access and retention.',
'The client authenticates an API request naming a bucket and object key.|The service applies authorization and operation semantics, then stores or returns object data and metadata.|Version and lifecycle settings control retained historical objects; applications must account for the chosen service consistency and conditional-write guarantees.',
'Object key~Identifier within a bucket~A slash may be part of a key rather than a real directory.|Version~Retained object revision when enabled~Retention and deletion rules still matter.|Conditional request~Operation gated by a precondition~It can prevent a stale writer overwriting newer state.',
'An artifact publisher stores immutable build objects by digest and separately updates a small release manifest.',
'Two publishers overwrite a release manifest from stale reads, losing one update.',
'Use the service-supported conditional update or serialized publisher policy and verify the final manifest references the intended immutable objects.',
'''Does an object key containing slashes guarantee POSIX directories?|No; key structure is not a filesystem contract.|APIs define the namespace.
Why publish artifacts under immutable digest keys?|Different content obtains a distinct identity that can be verified.|A mutable name alone cannot identify bytes.
What prevents a stale manifest writer from silently overwriting a newer version?|An appropriate conditional update or serialization protocol.|Read then unconditional write races.
Is object storage universally eventually consistent?|No; guarantees depend on service and operation.|Do not carry assumptions between products.
Does enabling versioning alone guarantee a recoverable backup?|No; permissions, retention and independent recovery remain necessary.|Versions can still be deleted or become inaccessible.
What belongs in an object restore test?|Retrieve the intended version and validate its digest and application references.|A successful listing does not prove content recovery.''',refs='object',kind='io')

add('s8-g1-t0',
'NFS is a network filesystem protocol. NFSv4 integrates stateful operations such as opens and locking; security flavor, identity mapping and server export policy are part of the access contract.',
'Client and server agree on protocol version and security flavor before interpreting file operations.|The server combines export policy with mapped identities and filesystem permissions.|State and caches are recovered or revalidated under the protocol; a mounted path does not guarantee every operation succeeds.',
'Export~Server-published filesystem scope~Allowed client is not an unrestricted user.|Security flavor~Authentication/protection mode~AUTH_SYS and Kerberos are different trust models.|Root squashing~Mapping client root to an unprivileged identity~Client root is not automatically server root.',
'A Linux analytics client mounts an authorized NFSv4 dataset read-only; a separate writer identity publishes files.',
'A client root process receives permission denied and the proposed fix is disabling root squashing globally.',
'Check export scope, security flavor, mapped UID/GID and directory permissions; grant the narrow intended writer instead of removing the root boundary.',
'''Which common transport endpoint serves ordinary NFSv4 over TCP?|TCP 2049.|Other versions and deployment modes can require additional services.
Why can client root be denied by the server?|Root squashing and server permissions may deliberately restrict it.|Local privilege is not remote ownership.
What should be recorded with an NFS mount?|Version, security flavor, export and mount options.|The same pathname can hide different semantics.
Does successful mounting prove writes are permitted?|No; test the named user and operation.|Read-only exports can mount normally.
Why is AUTH_SYS inappropriate as proof of cryptographic user identity?|It relies on client-supplied identity information within its trust model.|Use supported stronger authentication where required.
What validates the narrow repair?|The intended writer succeeds and the read-only client still cannot write.|A broad export change can violate policy.''',refs='nfs')

add('s8-g1-t1',
'SMB provides remote file and related services. The negotiated dialect, authentication, signing, encryption and authorization determine the actual session properties; the name SMB alone does not specify them.',
'The client negotiates a dialect and establishes an authenticated session.|A tree connection selects the share; share and filesystem policy constrain the requested operation.|The server manages opens, locks and supported caching/reconnection behavior while client operations expose success or failure.',
'Dialect~Negotiated protocol version~Do not infer it from the OS brand.|Signing~Message integrity/authenticity protection~It is different from encryption.|Encryption~Protection of message confidentiality~Verify negotiation and policy rather than assume it.',
'A Windows user reads a finance share successfully but is denied modifying payroll; this is an intentional permission boundary.',
'A migrated share grants broad share-level access but NTFS permissions omit the intended writer group.',
'Compare effective share and filesystem access for the named principal; restore the missing narrow group entry and retest permitted and denied operations.',
'''Does successful authentication grant access to every share?|No; authorization follows authentication.|Identity and rights are separate.
What is the common direct SMB TCP port?|445.|Legacy and alternate transports require their own scope.
Does signing hide file contents from an observer?|No; encryption supplies confidentiality.|Integrity and secrecy differ.
Why inspect both share and filesystem permissions?|Both constrain access in the Windows example.|Changing only one can leave denial intact.
What evidence confirms actual dialect/security use?|Negotiated session properties from the real client and server.|Configured intent alone is weaker evidence.
Should SMB1 be enabled to bypass an unexplained access failure?|No; identify the failure and use a supported protocol configuration.|Protocol downgrade is not a permission repair.''',refs='smb')

add('s8-g1-t2',
'iSCSI transports SCSI commands over TCP/IP. An initiator identifies itself, logs in to a target portal and accesses authorized logical units; IP connectivity is only the first prerequisite.',
'The initiator reaches a target portal and negotiates a session, with configured authentication where required.|The target authorizes initiator identity and presents mapped LUNs.|Host multipathing associates supported sessions and paths with stable device identity; filesystems consume the resulting device.',
'IQN~An iSCSI qualified name~It identifies an endpoint, not a secret.|Portal~Target IP address and port~Multiple portals may share one physical dependency.|CHAP~Challenge-response authentication~It does not encrypt block payloads.',
'A host uses separate IP storage networks A and B to reach two supported target portals for one mapped LUN.',
'Ping to the target succeeds, but the initiator is absent from the array host mapping.',
'Verify the intended IQN, session/authentication state and exact LUN map, then confirm one stable device and supported paths without formatting it.',
'''What common TCP destination serves iSCSI?|3260.|The management web port is a different service.
Is an IQN a password?|No; it is an identifier.|Authentication requires separate material.
Does CHAP encrypt application blocks?|No.|Authentication and confidentiality are separate properties.
Why can ping succeed while no LUN appears?|Session, authentication or array mapping may fail.|IP reachability is only one layer.
Do two target IPs guarantee independent paths?|No; they can share NIC, switch, power or controller dependencies.|Map the full failure domain.
What host evidence should follow mapping?|Correct stable device identity and expected usable paths.|Do not initialize a device simply because it is newly visible.''',refs='iscsi')

add('s8-g1-t3',
'Fibre Channel is a storage networking architecture with fabric addressing, login and frame transport. FCP carries SCSI over FC; NVMe/FC uses the fabric for a different command set.',
'A physical port establishes a link and logs in to the fabric, obtaining a fabric address in a switched fabric.|Name-service and active zoning state constrain which initiator and target ports can communicate.|Upper-layer login and array authorization allow commands; buffer-credit behavior and error rates affect delivery.',
'FCID~Fabric-assigned address~It can change and differs from the port WWPN.|FCP~SCSI carried over Fibre Channel~FC also supports other upper layers.|Buffer credit~Receiver buffer flow-control allowance~Credit starvation can limit throughput without link loss.',
'One host has FC ports in isolated fabrics A and B; each fabric reaches a supported target port on the shared array.',
'An HBA is online but active zoning uses the replaced adapter WWPN.',
'Reconcile the replacement identity with active fabric policy and array mapping, restore only the intended members and verify real I/O through the surviving path.',
'''Does native FC require a TCP port?|No; it is not TCP/IP transport.|Management over IP is separate.
Is an FCID the same as a WWPN?|No; fabric address and persistent port identity have different roles.|Do not zone by a transient assumption.
What does FCP carry?|SCSI commands and data over Fibre Channel.|NVMe/FC is distinct.
Why can an online HBA still see no storage?|Zoning, login or mapping can deny it.|Local link state is not device presentation.
Can depleted buffer credits affect a healthy link?|Yes; flow control can stall transmission.|Link-up does not imply available throughput.
What should a replaced HBA procedure update?|The validated identity references in zoning and array host mapping as required.|Do not duplicate or broaden access blindly.''',refs='zoning,mds')

add('s8-g1-t4',
'FCoE encapsulates Fibre Channel frames over Ethernet within a supported converged design. It retains FC identities and storage authorization while relying on the required Ethernet loss-management and discovery mechanisms.',
'The converged adapter and fabric discover an FCoE forwarder through the supported FIP process.|The selected Ethernet service carries FC frames with the configured Data Center Bridging treatment.|FC login, zoning and array mapping still determine storage access; ordinary Ethernet connectivity does not complete these layers.',
'CNA~Converged network adapter~Ethernet and FC functions have distinct identities.|FIP~FCoE initialization protocol~Discovery is separate from data frames.|PFC~Priority-based flow control~A configured priority can have congestion dependencies.',
'A supported CNA reaches an FCoE forwarder on a converged access segment that connects to the FC SAN.',
'Ethernet traffic works while FCoE discovery or its assigned service priority is misconfigured.',
'Compare the validated VLAN, FIP, DCB and virtual FC binding against the exact platform guide; retest storage login and application I/O after restoring the owned mismatch.',
'''Does successful Ethernet ping prove FCoE login?|No.|FIP, FC and mapping have separate state.
Does FCoE remove the need for zoning?|No; FC access policy remains.|Encapsulation changes transport, not ownership.
Is FCoE simply FC carried over TCP?|No; it encapsulates FC directly over Ethernet in its supported design.|Do not assign it an iSCSI port.
What risk accompanies indiscriminate pause configuration?|Congestion can propagate and affect unrelated work or cause stalls.|Loss management needs an end-to-end design.
What component bridges the Ethernet FCoE attachment into FC services?|An FCoE forwarder in the supported topology.|An arbitrary IP router is not that role.
What is the acceptance transaction?|Correct storage identity plus sustained bounded read/write verification on an owned test volume.|An Ethernet link flag is insufficient.''',refs='fcoe')

add('s8-g1-t5',
'NVMe over Fabrics extends the NVMe command model across supported transports such as TCP, RDMA and Fibre Channel. Subsystem, controller and namespace identities replace assumptions copied from SCSI LUN terminology.',
'The host locates a subsystem through the chosen transport and establishes an allowed controller connection.|A namespace is exposed to the authorized host; its stable identity connects the namespace to the intended data.|Supported multipath and asymmetric namespace access behavior determine path use; transport and media remain independent bottlenecks.',
'NQN~NVMe qualified name~Subsystem/host identity is not a credential.|Namespace~Addressable NVMe storage entity~It is analogous to, but not literally, a SCSI LUN.|ANA~Asymmetric namespace access state~Path preference is not an application latency guarantee.',
'An NVMe/TCP client has two supported subsystem connections; both expose the same namespace identity.',
'An operator combines namespaces with similar sizes but different identities as though they were paths to one device.',
'Compare subsystem and namespace identifiers and supported multipath ownership; restore the intended namespace mapping before any data operation.',
'''Is NVMe-oF restricted to RDMA?|No; TCP and FC are also transports in this family.|Name the selected transport.
What is the storage unit exposed by NVMe?|A namespace.|SCSI LUN language is not an exact object model.
Does NVMe/TCP inherently require PFC?|No; it uses TCP, while other transports have different network requirements.|Do not copy RoCE assumptions blindly.
What does ANA communicate?|Asymmetric namespace path access state.|It helps path selection but is not measured performance.
Can equal namespace sizes prove identical data identity?|No.|Compare stable namespace and subsystem identifiers.
Does a fast flash array eliminate network queueing?|No.|The entire request path contributes latency.''',refs='nvme')

add('s8-g2-t0',
'A host bus adapter connects the host storage stack to a storage transport. Firmware, driver, port identity, queueing and fabric state all contribute to usable storage paths.',
'The OS binds a supported driver to the adapter and exposes its ports and identifiers.|Each port establishes the supported link and storage login through its assigned fabric.|The host aggregates supported paths by device identity, then issues I/O subject to adapter and downstream queues.',
'Driver~OS interface to the adapter~A visible PCI device may lack a working driver.|Firmware~Adapter-resident implementation~Compatibility includes host and array versions.|Queue depth~Outstanding-command allowance~Increasing it can move congestion downstream.',
'A server has two single-port HBAs on independently documented fabrics; replacement changes one port identity.',
'A new HBA appears in PCI inventory but its driver is missing, so no storage port is operational.',
'Compare supported driver/firmware inventory before changing zoning; after binding, reconcile the new WWPN and verify expected paths to the original device.',
'''Does PCI presence prove a working storage port?|No; driver, firmware and link state remain.|Inventory is an early boundary.
What identity often changes with an FC HBA replacement?|The port WWPN unless an explicitly supported identity abstraction preserves it.|Check actual identity.
Can two ports on one adapter share a failure?|Yes; the card or its PCIe path can fail.|Port count is not complete independence.
Why validate driver and firmware together?|Supported combinations affect correctness and features.|Newer in isolation is not automatically compatible.
Does increasing queue depth always lower latency?|No; more outstanding work can increase downstream contention.|Measure the workload.
What proves restoration after replacement?|The correct mapped device, expected usable paths and an owned application I/O check.|A green adapter LED is narrower evidence.''',refs='storage,zoning')

add('s8-g2-t1',
'World Wide Name is a general identity term used in Fibre Channel. Node and port names identify different objects; a troubleshooting record must state which form it contains.',
'Inventory gathers WWNN and WWPN values with their owning node and physical or virtual port.|Fabric observations correlate the port identity to its current location and FCID.|Access policy refers to the supported identity type; an alias is only a readable reference to the recorded value.',
'WWNN~World Wide Node Name~Node identity is not a port selector.|WWPN~World Wide Port Name~A node can have multiple port identities.|Alias~Readable name for an identifier~The label does not prove the underlying value is current.',
'A host inventory records one node name and two different port names, each assigned to its own fabric.',
'A spreadsheet column labelled WWN mixes node names and port names, causing a wrong zoning request.',
'Separate node and port columns, reconcile each with the observed owner and active fabric policy, and retain the corrected mapping.',
'''What ambiguity exists in the label WWN?|It may refer to a node or a port name.|Record the exact identity kind.
Does one node necessarily have one WWPN?|No; it may expose multiple ports.|Node and port cardinality differ.
Can an alias name prove host ownership?|No; compare its referenced value to actual inventory.|Labels can be stale.
Why record fabric membership with a WWPN?|It locates the path and its failure domain.|The identifier alone is not topology.
What should happen when a value cannot be tied to an owner?|Keep access changes pending until identity is reconciled.|Guessing can expose another host.
What replaces the ambiguous spreadsheet column?|Explicit WWNN, WWPN, host, port and fabric fields.|Structured identity prevents category errors.''',refs='zoning')

add('s8-g2-t2',
'A WWPN identifies an FC port, including a supported virtual port. Port identity is used in common zoning and host-mapping designs but does not itself prove a port is logged in or authorized.',
'The port presents its WWPN during fabric participation; virtual ports can create additional identities on one physical attachment.|The fabric associates the identity with current login/location state.|Zoning and array host records must both refer to the intended identity; replacement or virtualization changes require reconciliation.',
'Port identity~WWPN of an initiator or target~It differs from FCID.|NPIV~Multiple virtual N_Port identities on one physical port~Virtual identity does not create physical independence.|Host mapping~Array association with initiator identity~Zoning cannot substitute for it.',
'A virtualized initiator retains a managed virtual WWPN while moving between supported physical attachments.',
'The array map contains an old physical WWPN while the workload now uses a virtual initiator WWPN.',
'Identify the actual logged-in initiator and its supported lifecycle, align only the intended zone/map references, and verify unauthorized hosts remain excluded.',
'''Can one physical attachment carry multiple WWPN identities?|Yes, with supported NPIV.|Identity count is not link count.
Does a known WWPN prove a live login?|No.|Inventory and operational state differ.
Which identity must array mapping match?|The actual intended initiator identity used by the workload.|A nearby physical label can be misleading.
What can remain shared between virtual WWPNs?|Physical port, adapter, switch and power dependencies.|Virtual names do not add hardware paths.
Why distinguish target and initiator WWPNs?|They play different roles in policy and session analysis.|A valid format can still identify the wrong endpoint.
What must be verified after identity migration?|Correct active location, zoning, map and usable device access.|Retaining a name alone is insufficient.''',refs='zoning')

add('s8-g2-t3',
'FC zoning limits communication among fabric members. Defined configuration, active configuration and array LUN mapping are separate layers; a zone definition alone is not evidence of active enforcement.',
'The administrator describes the intended initiator and target members using supported identifiers.|A reviewed zone configuration is activated within the correct fabric or VSAN, with fabric-wide effects understood.|Array mapping and host discovery then determine which storage objects appear; positive and negative access checks validate the intended boundary.',
'Defined zone~Saved or candidate member set~It may not be active.|Active zone set~Currently enforced membership~Scope includes the correct fabric/VSAN.|LUN masking~Array control of object presentation~It is distinct from fabric communication policy.',
'Host h1 initiator A can reach only its intended array targets in Fabric A; Fabric B has a separately reviewed equivalent policy.',
'A correct new zone exists in the configuration database but was omitted from the activated zone set.',
'Compare active membership to the approved baseline, activate only the reviewed change under the platform procedure, then verify h1 access and h2 denial.',
'''Why can a correctly defined zone have no effect?|It may not be part of the active configuration.|Inspect enforcement, not just saved intent.
Does zoning assign a LUN to a host?|No; array mapping does that.|Fabric and object authorization are separate.
Why prefer a narrowly scoped initiator zone design?|It limits unintended initiator relationships and simplifies diagnosis.|Follow the array/fabric interoperability guidance.
What scope error can invalidate an otherwise correct MDS zone?|Activating it in the wrong VSAN.|Identity and context both matter.
Should a recovery enable an allow-all default zone?|No; repair the specific policy mismatch.|Broad access defeats isolation.
What negative test accompanies h1 recovery?|An excluded initiator still cannot access the protected volume.|Availability alone does not validate policy.''',refs='zoning,mds')

add('s8-g2-t4',
'A logical unit is a SCSI-addressable storage entity; its LUN number addresses it within a presentation context. The same number on two targets does not by itself identify the same storage data.',
'The array creates a logical storage object from its backing allocation and protection scheme.|Mapping presents that object to selected initiators using a supported LUN addressing policy.|Host discovery reads stable device identity and combines paths appropriately before an authorized consumer uses the blocks.',
'LUN number~Address within the presentation context~It is not globally unique data identity.|Device WWID~Stable identifier used to distinguish a device~Compare it across paths.|Masking~Restriction of presentation to initiators~Visibility does not establish safe shared writes.',
'Two unrelated arrays both present LUN 5; their device identifiers differ and they must not be treated as one disk.',
'A migration spreadsheet uses only LUN numbers, causing source and destination data to be confused.',
'Record array identity, stable device ID, size, owner and mappings; verify the exact expected volume before any migration or filesystem operation.',
'''Is LUN 5 globally unique?|No; it is scoped to a presentation context.|Different targets can reuse a number.
What distinguishes source and destination volumes reliably?|Stable device identity and recorded array/ownership context.|Size and LUN number alone are weak evidence.
Does mapping a LUN create a filesystem?|No.|It presents blocks for a consumer.
Can one LUN have several paths?|Yes.|Paths are access routes to the same entity.
What protects a LUN from an unintended host at the array?|The intended initiator mapping/masking policy.|A fabric zone alone is not object authorization.
What should precede any destructive initialization?|Confirmed empty ownership and exact identity under an approved disposable workflow.|This course never formats host devices.''',refs='storage,zoning')

add('s8-g2-t5',
'Multipathing presents multiple supported access paths to one storage device and selects paths according to device and host policy. It can survive specified path losses; it cannot repair corrupt data or unavailable shared media.',
'Host discovery groups paths by stable device identity rather than transient device name.|Path states and array access preferences guide selection through the supported multipath implementation.|After a path fails, eligible alternatives may carry I/O subject to timeouts, surviving capacity and application tolerance.',
'Path~Host-to-target access route~Multiple routes can share a switch.|ALUA~Asymmetric logical unit access state~Optimized and nonoptimized paths need distinct interpretation.|All paths down~No usable route to the device~Queueing and timeout policy affect applications.',
'Four discovered paths to one LUN cross two fabrics and two target ports; one fabric is removed only in the declared model.',
'The displayed path count is four, but every route crosses Fabric A, so its loss removes all access.',
'Map each path end to end, establish a usable independent Fabric B route, then verify bounded I/O and integrity while A is absent and after exact restoration.',
'''What should multipathing group together?|Paths with the same correct stable device identity.|Equal capacity alone is insufficient.
Can four paths still have one switch failure domain?|Yes.|Count independence, not only rows.
Does a nonoptimized ALUA path necessarily mean unusable?|No; behavior depends on supported access state and policy.|Preference is not simply up/down.
What can happen when all paths are lost?|I/O may queue or fail according to policy and timeouts.|An application can stall even before an explicit error.
Does failover double throughput automatically?|No.|Policy, workload and shared bottlenecks limit capacity.
What evidence demonstrates a useful failover test?|Original workload I/O and integrity with one owned path domain absent, plus restoration.|A path-status change alone does not prove service.''',refs='multipath')

add('s8-g2-t6',
'A SAN switch forwards storage fabric traffic and provides fabric services such as login, name service and zoning. Its management interface is separate from the host-to-storage data path.',
'Ports establish roles and login relationships with endpoints or inter-switch links.|Fabric services and active policy determine reachable port identities within the correct fabric scope.|Frames traverse available links subject to errors, credits and congestion; endpoint storage commands provide the final service evidence.',
'F_Port~Fabric port attached to an N_Port~Endpoint login is not an ISL.|E_Port~Inter-switch expansion port~An ISL can connect shared failure domains.|Management plane~Administrative access~Management success does not prove storage I/O.',
'Two isolated SAN switches implement Fabrics A and B, each with host and array connections; no ISL joins the two redundancy domains.',
'Both host HBAs were patched to the same switch even though port labels say A and B.',
'Trace actual cable endpoints and fabric identities; restore the intended independent fabric connection and verify both path and I/O evidence.',
'''What is an F_Port used for in this lesson?|Connecting an endpoint N_Port to the fabric.|It is distinct from an ISL role.
What does an E_Port connect?|Another fabric switch through an inter-switch link.|An ISL has its own capacity and dependencies.
Does a reachable management IP prove SAN forwarding?|No.|Management and data paths differ.
Why avoid joining A and B just to make discovery easier?|The design requires separate fabric failure domains.|A shortcut can remove independence.
Which observations help diagnose congestion?|Timed error/credit/link utilization evidence correlated with workload latency.|A static link-up flag is inadequate.
What disproves the claimed redundant cabling?|Both HBA routes terminate in the same switch or common failed dependency.|Labels are not physical evidence.''',refs='mds,zoning')

add('s8-g2-t7',
'Brocade SAN administration uses Fabric OS concepts including switch/fabric identity, port state, aliases and defined versus effective zoning configuration. Procedures must match the installed Fabric OS and hardware release.',
'Collect product, Fabric OS, switch identity and endpoint login evidence before interpreting names.|Compare alias and zone definitions with the effective configuration in the intended fabric.|Use a reviewed platform-supported activation and rollback procedure; verify host paths and an owned storage transaction after the change.',
'Fabric OS~Brocade fabric operating software~Commands and support are release-specific.|Alias~Readable zoning member reference~A stale WWPN can hide behind a correct label.|Effective configuration~Currently enforced zoning~Defined intent can differ from operational state.',
'A storage ticket references hostA, but the alias still contains the WWPN from its retired adapter.',
'The operator adds a new zone to the defined database without verifying the effective fabric configuration.',
'Read the installed-release zoning views, reconcile current WWPN ownership and the effective configuration, then retain exact before/after membership and host I/O results.',
'''Why record Fabric OS version first?|Syntax, support and operational procedures depend on release.|A vendor family name is insufficient.
What can a correct alias label conceal?|A stale or wrong underlying WWPN.|Inspect the value.
Does defined zoning always equal effective zoning?|No.|Check the active enforcement view.
What should be preserved before zoning activation?|The exact prior effective configuration and the approved member diff.|Reverting to a default is not exact rollback.
Can a switch-only review prove correct LUN masking?|No; the array has a separate mapping layer.|Follow the chain to the host.
How does this course classify Brocade target changes?|Guided and unexecuted on a real switch.|The offline model is not Fabric OS emulation.''',refs='brocade')

add('s8-g2-t8',
'Cisco MDS provides Fibre Channel fabric services with VSAN-scoped zoning and operational views. A VSAN separates logical fabrics on shared hardware; it does not create independent power or chassis.',
'Identify the switch, software release, physical ports and intended VSAN context.|Correlate fabric login and name-service evidence with the active zoneset for that VSAN.|Reconcile array presentation and host device paths before accepting useful storage access.',
'VSAN~Logical FC fabric partition~It shares underlying hardware resources.|Zoneset~Collection of zones activated in a VSAN~A saved definition can differ from active membership.|FLOGI database~Observed fabric logins~Login does not establish array authorization.',
'The intended initiator is in VSAN 20, while a copied change activated its zone only in VSAN 10.',
'The zone appears in a configuration search, but the active zoneset in the host VSAN excludes it.',
'Use the correct VSAN-scoped active view and compare it with approved members; repair only the intended scope and verify the array map and host transaction.',
'''What scope must accompany MDS zoning evidence?|The relevant VSAN.|A zone name alone is ambiguous.
Do two VSANs in one chassis survive chassis power loss independently?|No.|Logical partitioning is not physical redundancy.
What does a fabric login establish?|An observed endpoint login in the fabric.|It does not prove mapped storage.
Which documented read-only command inspects active zonesets?|show zoneset active.|Further VSAN selection must match the target context.
Why preserve the full and active configuration separately?|They can differ, and rollback must recover intended enforcement.|Saved intent is not always active state.
What closes the MDS repair investigation?|Correct active membership, mapped device identity and original host I/O with a denied-host check.|A successful CLI command is not the service result.''',refs='mds')

add('s8-g3-t0',
'A storage array combines media, controllers, cache, protection and presentation services. Its logical volumes and front-end paths depend on shared allocation, power and software; multiple controllers do not guarantee every failure is survivable.',
'Media is organized into a supported protection and allocation layout, with usable capacity reduced by redundancy and reserves.|Controllers process requests, protect cache according to the write policy and expose logical objects through front-end ports.|Host mappings, path policy and application durability requirements determine whether a nominally healthy array provides correct service.',
'Pool~Shared physical allocation domain~Thin logical promises can exceed its free space.|Protected cache~Write buffering protected by a documented mechanism~Its health can change write policy.|Controller ownership~Responsibility for serving a volume~Path preference and failover are platform-specific.',
'A thin pool has 10 TiB usable, 7 TiB allocated and 12 TiB promised across volumes; growth must be monitored against the 3 TiB physical headroom.',
'Hosts report logical free space while the backing pool approaches exhaustion.',
'Reconcile actual pool allocation, snapshot growth and commitments; apply a supported capacity or retention change and verify original writes without deleting unknown volumes.',
'''How much physical headroom remains in the example?|3 TiB before other reserves or unaccounted overhead.|Logical promises do not create capacity.
Does 12 TiB promised on 10 TiB usable necessarily mean immediate failure?|No; risk depends on actual allocation and growth, but commitments exceed physical capacity.|Monitor both current and forecast usage.
Why can cache protection failure change performance?|The supported write policy may become more conservative.|Acknowledgement safety and speed interact.
Do two controllers make array firmware corruption impossible?|No.|Shared software and data remain failure domains.
What must a host failover plan include beyond controller count?|Supported paths, mappings, access states, timeouts and an application verification.|A parts list is not a recovery test.
Why retain an independent recovery copy?|Array redundancy can preserve corrupted or deleted data just as faithfully as valid data.|Availability and recoverability differ.''',refs='storage,msa',kind='io')

add('s8-g3-t1',
'HPE MSA is a storage-array family. This lesson uses the 1060/2060/2062 management concepts: pools and volumes, initiator/host mappings, controller ownership and supported host multipathing; it does not generalize every generation or firmware feature.',
'Create a documented pool/volume design using the exact controller and disk support matrix.|Group the intended initiators into the correct host context and map only the required volume.|Compare controller ownership and optimized path behavior with the supported host configuration before validating application I/O.',
'MSA volume~Logical capacity exposed to hosts~Pool health and allocation remain shared.|Host object~Grouping of initiators for a server~An incorrect member can expose data.|Optimized path~Preferred route relative to ownership~A second path is not automatically equivalent performance.',
'A dual-controller MSA presents one training volume to a host with one initiator in each independent fabric.',
'The host object contains only the Fabric A initiator, so losing A removes access despite healthy B cabling.',
'Compare actual initiator inventory to the approved MSA host and volume mapping; restore the missing intended identity and verify the same volume through B.',
'''Which product scope is used here?|MSA 1060/2060/2062 management concepts.|Check the exact installed firmware for procedures.
Why group both intended initiators into the correct host record?|The mapping must authorize the host over its required paths.|Cabling alone does not grant access.
What can a missing B initiator mapping cause?|Access failure when Fabric A is lost.|Redundant hardware needs matching policy.
Why inspect controller ownership with path state?|Optimized access can depend on volume ownership.|Not every live route has equal preferred status.
Does adding another pool create an independent array backup?|No.|Controllers, enclosure and administration can remain shared.
What identifies the repaired volume?|The original stable device identity and verified owned test data.|A newly visible disk of the same size is not sufficient.''',refs='msa')

add('s8-g3-t2',
'Dell EMC names a broad storage portfolio, not one interchangeable configuration model. This lesson uses PowerStore block-volume and host-mapping concepts as a concrete example; Unity, PowerMax and other families require their own manuals.',
'Identify the exact product and release before selecting its storage object model and supported front-end transport.|Create or inspect the intended volume and associate it with the correct host/host group.|Track logical allocation, protection policy and host-visible identity; local snapshots and remote recovery have different failure scopes.',
'PowerStore volume~Logical block resource~Supported protocols vary with platform/release.|Host group~Set of hosts used for presentation~Membership changes can broaden access.|Protection policy~Rules associated with a resource~A configured policy is not proof of a successful restore.',
'A PowerStore volume intended for a three-host cluster is accidentally mapped to a fourth unrelated host group.',
'The array is healthy and all I/O succeeds, but a presentation error exposes protected data to an unrelated host.',
'Retain the mapping evidence, remove only the unauthorized association under the approved procedure, and prove the intended cluster retains access while the unrelated host does not.',
'''Why is Dell EMC alone insufficient for a command recipe?|It covers distinct product families.|Use the exact product and release.
Which concrete family anchors this lesson?|PowerStore.|Other families have different object models and procedures.
Can a healthy array still have a severe access defect?|Yes; incorrect mapping can expose data.|Availability is not authorization correctness.
What should a host-group membership review compare?|Actual initiator identities and approved workload ownership.|A familiar group name is not proof.
Does assigning a protection policy establish recoverability?|No; executions, retention and restore validation are separate.|Configured intent can fail at runtime.
What verifies the exposure repair?|Authorized cluster access continues and the excluded host loses access.|Positive and negative tests are both required.''',refs='dell')

add('s8-g3-t3',
'NetApp ONTAP separates storage virtual machines, volumes, logical interfaces and protocol-specific presentation. In a SAN example, an igroup associates initiators with LUN mappings; NAS access uses a different export/share policy layer.',
'An SVM supplies protocol and namespace context while volumes contain data objects.|FC or iSCSI logical interfaces provide access endpoints; zoning and network reachability establish only the path.|The LUN map and igroup membership authorize SAN presentation, and host multipath behavior must match the supported ONTAP design.',
'SVM~Storage virtual machine providing a logical service context~It shares cluster hardware.|LIF~Logical network or storage interface~Its identity and role depend on protocol.|Igroup~Initiator group for LUN mapping~It is not an NFS export rule.',
'One SVM presents a LUN to a three-host cluster while a different dataset is exported through NFS.',
'A SAN access issue is investigated by changing an NFS export policy, leaving the incorrect igroup unchanged.',
'Identify the protocol and SVM first, reconcile the actual initiator with the SAN LUN map, and verify the intended device without altering unrelated NAS access.',
'''Does an igroup authorize NFS clients?|No; it serves SAN initiator mapping.|NAS uses protocol-specific access policy.
What does an SVM separate?|Logical storage service context and administration within its supported scope.|Physical cluster dependencies remain.
Is a LIF necessarily a physical Ethernet port?|No; it is a logical interface with a protocol role.|Do not confuse logical and physical identity.
Which layer follows successful FC zoning for LUN visibility?|The intended ONTAP SAN mapping and host discovery.|Fabric communication alone is insufficient.
Why identify protocol before changing policy?|SAN and NAS authorization objects differ.|Repairing the wrong policy cannot fix the boundary.
What evidence closes the incident?|Correct initiator-to-LUN mapping and verified host I/O, with unrelated access preserved.|Controller status is not application proof.''',refs='netapp,zoning')

add('s8-g4-t0',
'A hypervisor virtualizes execution and resource access for guest operating systems. Virtual CPUs, memory and devices are abstractions scheduled or backed by physical resources; isolation and overcommit depend on configuration and workload.',
'The hypervisor schedules virtual CPUs onto physical execution resources and manages guest address translation.|Virtual device paths use emulation, paravirtualization or supported passthrough to reach host I/O.|Resource limits, contention and shared dependencies shape guest performance and failure behavior.',
'vCPU~Guest-visible scheduled CPU resource~It is not a dedicated physical core by default.|Guest memory~Memory presented to the VM~Backing and reclamation policy affect performance.|Virtual device~Guest I/O interface~Its path can include shared host queues.',
'Three hosts each provide 128 GiB with 16 GiB reserved per available host; 180 GiB aggregate workload demand fits after one host loss at the aggregate level.',
'An operator allocates many vCPUs to a stalled VM without checking host contention or CPU scheduling delay.',
'Compare guest demand with host scheduling, memory pressure and I/O evidence; adjust only a measured bottleneck and retest the same workload.',
'''Does one vCPU imply one permanently dedicated core?|No.|Scheduling policy controls backing.
How much aggregate memory remains after one host loss in the example?|224 GiB: two times 112 GiB.|This ignores per-VM placement constraints and other bottlenecks.
Does aggregate memory fit prove every VM can be placed?|No; individual size and constraints can block placement.|Bin packing is stricter than a total sum.
Why can more vCPUs hurt a workload?|Scheduling and workload parallelism can make extra allocation ineffective or costly.|Measure instead of sizing by intuition.
Are guests independent of a shared host failure?|No.|Isolation is not failure-domain separation.
What should accompany a resource tuning change?|Comparable demand, latency and contention measurements before and after.|A larger configured number is not evidence of improvement.''',refs='virt',kind='capacity')

add('s8-g4-t1',
'A type 1 hypervisor provides virtualization directly at the hardware execution layer rather than as an ordinary application on a general-purpose host OS. Management partitions or appliances can still be present.',
'Hardware virtualization support assists privileged guest execution under the hypervisor.|Management and device-service components configure guests and mediate supported I/O paths.|A guest depends on the physical host and its resource policy even when guest kernels are isolated from one another.',
'Bare-metal layer~Hypervisor execution relationship to hardware~It does not mean management components disappear.|Management partition~Privileged management/device service context~Its appearance can resemble a normal OS.|Hardware assistance~Processor virtualization facilities~Compatibility and security remain platform-specific.',
'A Windows Hyper-V host has a visible management OS but uses a type 1 hypervisor beneath the partitions.',
'A design review classifies every system with a visible desktop as a hosted type 2 hypervisor.',
'Trace where privileged execution is mediated and how the management OS relates to the hypervisor; correct the architecture diagram before making isolation claims.',
'''Does a visible management desktop prove type 2 architecture?|No.|Classify the execution layer, not the user interface.
Which architecture does Microsoft describe for Hyper-V?|Type 1.|The management OS is a partition above the hypervisor.
Does type 1 imply zero management attack surface?|No.|Privileged management services still need protection.
What resource failure can affect every VM on one type 1 host?|Shared hardware, power or storage access failure.|Guest isolation does not remove host dependence.
Why validate hardware support before installation?|Virtualization features, drivers and devices must form a supported combination.|Architectural category alone is insufficient.
What evidence supports the architecture classification?|The platform execution and partition model in its primary documentation.|A screenshot of the console does not settle it.''',refs='hyperv,virt',kind='capacity')

add('s8-g4-t2',
'A type 2 or hosted hypervisor runs within a general-purpose host operating environment. It is useful for desktop labs, while host scheduling, updates, sleep behavior and device access add dependencies.',
'The host OS runs the virtualization process and supplies resource and device services.|The hypervisor presents guest hardware and uses available hardware assistance through supported host interfaces.|Guest workloads contend with host applications and inherit host availability constraints such as sleep or restart.',
'Hosted process~Virtualization application in the host environment~The host lifecycle can interrupt guests.|Virtual network mode~NAT, bridged or isolated attachment choice~Names do not prove tenant isolation.|Nested virtualization~Hypervisor operating inside a VM~Hardware features and support may be restricted.',
'A laptop runs a disposable two-VM study network on an isolated virtual segment, separate from the home LAN.',
'A learner selects bridged networking unintentionally and exposes a lab service to the physical LAN.',
'Stop the unintended exposure, choose the intended isolated mode, verify actual guest reachability and retain the host/guest network boundary in the diagram.',
'''What additional scheduler dependency exists in a hosted lab?|The general-purpose host OS and its other workloads.|Guest resource inventory is not a performance guarantee.
Can host sleep interrupt the lab?|Yes.|Availability depends on host lifecycle.
Does NAT automatically mean no possible inbound exposure?|No; forwarding and other configuration can change reachability.|Test the actual network policy.
Why prefer an explicitly isolated network for this lab?|Its intended scope excludes physical-LAN exposure.|Mode labels still need verification.
Does nested virtualization reproduce every physical-host feature?|No.|Instruction exposure, drivers and support differ.
What proves the exposure repair?|The intended lab peers communicate while the excluded physical-LAN path cannot reach the service.|Changing a dropdown alone is not enough.''',refs='virt',kind='capacity')

add('s8-g5-t0',
'VMware ESXi is a hypervisor host platform. The VMkernel, host management and virtual machine execution supply different observations; a reachable host UI does not establish datastore or guest-service health.',
'The host discovers supported CPU, memory, network and storage devices using its driver/firmware stack.|VMkernel resource and I/O services back virtual machines and their configured networks and disks.|Host management exposes configuration and operational state, while the guest application supplies the final acceptance transaction.',
'VMkernel~Core hypervisor resource and I/O services~It differs from a guest kernel.|Host management~Administrative control of one host~Management availability is narrower than guest health.|Compatibility~Supported hardware/software combination~An apparently working driver is not support evidence.',
'An ESXi 8.x host remains manageable while the datastore path used by one VM is unavailable.',
'The operator restarts management services to fix a storage-path failure that does not affect management access.',
'Correlate the affected VM disk with datastore and device-path evidence, restore the owned storage fault and verify the guest operation.',
'''Does Host Client login prove VM storage is healthy?|No.|Management and storage paths are separate.
Which core component supplies hypervisor resource services?|VMkernel.|A guest kernel has a different scope.
What should hardware validation record?|Server, adapter, firmware, driver and ESXi release compatibility.|A product brand alone is not enough.
What is the first mapping for a one-VM disk incident?|VM disk to datastore to device or remote storage service.|Identify the dependency before restarting unrelated services.
Can a host continue running some VMs while one datastore fails?|Yes, depending on their dependencies.|Do not generalize one failure to every guest.
What closes the storage repair?|Restored correct device access and the original guest application transaction.|A host status icon is insufficient.''',refs='esx,virt',kind='path')

add('s8-g5-t1',
'vCenter provides centralized inventory, authorization and orchestration for managed vSphere hosts. Existing VM execution resides on the hosts; management-plane loss affects operations without necessarily stopping running VMs.',
'vCenter authenticates administrative requests and keeps inventory and desired configuration context.|Hosts execute assigned work and expose operational state; cluster services have their own dependencies.|Operators distinguish a vCenter communication failure from host, datastore and guest application failures before taking recovery action.',
'Inventory~Management representation of hosts and VMs~A stale view can differ from current execution.|Orchestration~Coordinated operations across hosts~It requires the relevant control services.|Host execution~Actual VM operation on ESXi~It is not performed inside the vCenter database.',
'vCenter becomes unreachable, but a directly observed application on a managed ESXi host still answers its health transaction.',
'An incident plan powers off healthy hosts because their centralized inventory view is disconnected.',
'Verify direct host and guest service evidence, recover the management service through its documented backup/restore procedure, then reconcile inventory without disrupting healthy guests.',
'''Must existing VMs stop immediately when vCenter is unavailable?|No.|VM execution is on the hosts.
Does that mean every cluster operation works without vCenter?|No.|Orchestration dependencies differ by operation.
Why compare inventory with direct observations?|Management data can be stale or unavailable.|Disconnected is not synonymous with powered off.
What should a vCenter recovery plan protect?|Configuration, identity, supported backups and the dependencies needed for restore.|A local VM snapshot is not a complete management recovery plan.
Why avoid rebooting hosts first?|It can destroy healthy execution while leaving the management cause unresolved.|Test the failing boundary.
What validates management recovery?|Authorized inventory/control access reconciles with actual host and guest state.|A login screen alone does not verify orchestration.''',refs='cluster,snapshot',kind='migration')

add('s8-g5-t2',
'A datastore is a vSphere storage container for VM files and related objects. VMFS on block storage, NFS-backed datastores and other supported types have different discovery and coordination mechanisms.',
'The host establishes the backing storage path and discovers the appropriate device or remote namespace.|The supported datastore layer presents a namespace and capacity to the host.|VM disks and configuration depend on that namespace; host visibility, datastore accessibility and application integrity require separate checks.',
'VMFS~VMware clustered filesystem on block storage~Do not substitute an ordinary uncoordinated local filesystem.|NFS datastore~Datastore backed by a file service~Its identity and access path differ from a SCSI LUN.|Datastore UUID~Identity of a datastore~A display name alone may be duplicated.',
'Hosts h1, h2 and h3 list the same intended shared datastore identity before a VM migration.',
'Two hosts display a datastore called shared01 but actually refer to different backing storage.',
'Compare datastore identity, backing device/export and intended VM files across hosts; repair the mapping without formatting or resignaturing unknown data.',
'''Does the same datastore display name prove shared backing?|No.|Compare identity and backing path.
Which filesystem is designed here for shared vSphere block access?|VMFS.|Ordinary independent local mounts are not equivalent.
Does NFS datastore discovery necessarily involve a SCSI LUN?|No.|It uses a file-service namespace.
Why avoid formatting an unrecognized datastore candidate?|It may contain existing VM data.|Unknown visibility is not evidence of emptiness.
What does esxcli storage filesystem list inspect?|Volumes available to the host.|It does not prove guest application consistency.
What validates a corrected datastore presentation?|All intended hosts identify the same backing and the owned VM files remain intact and usable.|Free-space numbers alone are insufficient.''',refs='esx',kind='path')

add('s8-g5-t3',
'A standard vSwitch supplies host-local virtual Ethernet switching for VM and VMkernel connections. Port groups, VLAN treatment and physical uplinks connect logical endpoints to the intended network.',
'A VM virtual NIC or VMkernel interface attaches to a configured port group.|The virtual switch applies the relevant local switching and VLAN/security policy.|Traffic leaving the host uses eligible physical uplinks and matching physical-network configuration.',
'Port group~Named virtual attachment policy~An identical name across hosts need not mean identical settings.|Uplink~Physical NIC connecting the virtual switch outward~It can share an upstream switch failure.|VLAN policy~Classification of Ethernet traffic~Both virtual and physical sides must agree.',
'Two ESXi hosts have a port group called app, but one uses VLAN 120 and the other uses VLAN 121.',
'A VM loses external connectivity after migration even though its port group name is unchanged.',
'Compare actual VLAN policy, uplink teaming and upstream trunk allowance on both hosts, restore the intended VLAN 120 path and retest the original guest transaction.',
'''Is a standard vSwitch configuration automatically shared across all hosts?|No; it is host-local.|Consistent names need configuration verification.
Why can same-host VM traffic succeed while external traffic fails?|The local switch path can work while the physical uplink or trunk fails.|Trace the actual destination path.
Does two-uplink teaming guarantee two physical switch domains?|No.|Both cables may reach one switch.
What mismatch explains the case?|Different VLAN policies behind the same port group name.|Names are labels, not configuration equality.
Does a VMkernel interface serve the same role as a VM vNIC?|No; it provides host networking services.|Guest and host endpoints differ.
What must the repair preserve?|The intended VLAN isolation as well as guest connectivity.|Allowing every VLAN is not a narrow repair.''',refs='network',kind='migration')

add('s8-g5-t4',
'A vSphere Distributed Switch centralizes virtual-network configuration across participating hosts while host proxy switching components perform the data-plane work. Central management and current forwarding are distinct dependencies.',
'Administrators define distributed port group and switch policy through the supported management plane.|Participating hosts realize that configuration and attach their physical uplinks and endpoints.|Traffic depends on each host realization plus the physical network; staged migration protects the management path.',
'Distributed port group~Centrally managed attachment policy~Host realization can still be incomplete.|Host proxy switch~Host-side data-plane representation~Existing forwarding is not performed by vCenter.|Uplink assignment~Physical mapping into the distributed design~Wrong assignment can sever management.',
'A host migrates to a distributed switch one uplink at a time while independent console access and a verified rollback remain available.',
'Both management uplinks are moved together into a port group with the wrong VLAN policy.',
'Use independent management to restore the captured known-good uplink and management attachment; validate one staged path before moving the second.',
'''Does vCenter forward every VM Ethernet frame?|No; hosts perform the switching data-plane work.|Management and forwarding differ.
Why stage uplink migration?|It retains a verified recovery path while testing the new configuration.|Moving all dependencies together raises lockout risk.
Does centralized policy guarantee every physical trunk matches?|No.|Upstream network configuration remains a separate dependency.
What must be available before moving management networking?|Independent console/recovery access and the exact baseline.|The path being changed cannot be the only recovery method.
Can existing forwarding necessarily be inferred from vCenter reachability?|No.|Check host realization and actual transactions.
What validates the repaired migration?|Both intended management and guest paths work, with VLAN boundaries retained.|A configured distributed port group is not sufficient.''',refs='network,cluster',kind='migration')

add('s8-g5-t5',
'A VMkernel network interface provides an ESXi host IP endpoint for enabled host services such as management, vMotion or IP storage. It is separate from a VM guest virtual NIC.',
'The interface obtains IP settings and attaches through a port group to a virtual switch and uplinks.|A selected TCP/IP stack and enabled service determine how host traffic uses the interface.|End-to-end addressing, routing, VLAN and MTU must match the actual service path, not only a successful guest ping.',
'VMkernel adapter~Host IP endpoint~It does not give every VM the same IP path.|Service binding~Host function enabled on an adapter~Addressing alone does not enable the function.|TCP/IP stack~Host routing/service context~A test must use the intended source context.',
'A host has separate management and migration VMkernel interfaces on different VLANs, with documented physical uplinks.',
'Management ping passes while the migration VMkernel adapter has an incorrect VLAN or missing service binding.',
'Inspect the selected host interface, service and routing context; restore the intended migration path and verify its end-to-end reachability before attempting migration.',
'''Is a VMkernel adapter a guest VM NIC?|No.|It terminates host services.
Does an IP address alone enable vMotion on that adapter?|No; the relevant service configuration is required.|Addressing and service binding differ.
Why can management ping pass while migration fails?|The services can use different interfaces, stacks, VLANs or paths.|Test the failing source context.
Where must an MTU requirement hold?|Across the entire selected path.|One jumbo-enabled interface is not end-to-end evidence.
What should an interface inventory record?|Adapter, IP, stack, service, port group, VLAN and uplinks.|A single IP column loses dependencies.
What is the next check after path restoration?|The original host service operation, followed by guest-service continuity where relevant.|Reachability is necessary but narrower than service success.''',refs='motion,network',kind='migration')

add('s8-g5-t6',
'vMotion moves a running VM between supported hosts while preserving its execution state within the supported migration contract. Compute migration, storage migration and shared-nothing variants have different prerequisites; this lesson models a shared-storage compute move.',
'Compatibility and resource checks establish an eligible destination, matching guest network and accessible VM storage.|The migration transfers execution state while tracking changed memory under the supported mechanism.|A final switchover resumes execution at the destination, after which application continuity must be observed rather than assumed.',
'Pre-copy~Transfer of memory while the source still runs~A high dirtying rate can slow progress.|Switchover~Final execution handoff~Brief interruption is not the same as zero latency impact.|Shared-storage prerequisite~Both hosts access the required VM disks in this example~Other migration variants have different rules.',
'A VM on shared storage moves from h1 to h2 while a client records transaction success and latency before, during and after.',
'CPU and storage checks pass, but the destination guest port group reaches the wrong VLAN.',
'Restore the destination guest-network equivalence, revalidate migration prerequisites and verify the original client transaction across the move on a disposable target.',
'''Does vMotion restart a failed host VM in the same way as HA?|No; this is planned live execution migration.|HA restart follows a different failure mechanism.
Does this lesson require shared storage for every possible vMotion variant?|No; only for its declared example.|Do not generalize one variant.
Why can heavy memory dirtying slow migration?|Changed pages must be transferred under the migration algorithm.|Network rate alone is not the whole workload.
Can a migration task succeed while the application loses connectivity?|Yes; destination guest networking can be wrong.|Task completion and client service differ.
Which evidence measures continuity?|A timed client transaction stream with failures and latency retained.|An inventory location change does not measure service.
Do five true worksheet gates prove a real migration?|No; they are declared prerequisites only.|Actual target execution remains unverified here.''',refs='motion',kind='migration')

add('s8-g5-t7',
'vSphere HA can restart affected VMs on eligible surviving hosts after specified host failures. Restart requires accessible VM state, resources and applicable policy; it does not preserve every in-memory transaction or replace application-level availability.',
'Host agents and configured monitoring distinguish failure or isolation conditions under the platform policy.|Eligible surviving hosts must satisfy storage, network, capacity and placement constraints.|A restarted guest boots and recovers its applications; only application-level tests establish restored service and data consistency.',
'Admission control~Policy reserving failover capacity~It is not a guarantee against every failure combination.|Restart~VM execution begins again on a survivor~Volatile guest state can be lost.|Isolation response~Policy for a host cut off from relevant peers~It differs from confirmed power loss.',
'Three hosts reserve 16 GiB of each 128 GiB for overhead and retain 180 GiB total workload demand; two survivors have a 224 GiB aggregate envelope.',
'HA is enabled, but all surviving hosts lack access to the failed host VM disk.',
'Restore supported shared or replicated storage access and valid capacity/policy, then verify restart, guest boot, application recovery and retained records separately.',
'''Does enabling HA make inaccessible VM disks appear on survivors?|No.|Storage accessibility is a prerequisite.
Does VM restart preserve all RAM state?|No.|Applications need crash recovery and appropriate persistence.
How does HA differ from planned vMotion?|HA restarts after failure; vMotion transfers running execution in a supported planned move.|The mechanisms and outage expectations differ.
Can aggregate free memory alone guarantee restart placement?|No; individual fit, reservations and rules also matter.|The calculator is only an envelope.
Why distinguish network isolation from power failure?|The host may still run and access storage, requiring the configured isolation policy.|Failure interpretation affects safe recovery.
What closes an HA test?|Measured guest restart plus application transaction and data-integrity verification within the objective.|A powered-on VM is not necessarily a recovered application.''',refs='cluster',kind='capacity')

add('s8-g5-t8',
'Distributed Resource Scheduler evaluates VM placement and resource demand within a vSphere cluster. Recommendations or automatic actions depend on configured automation and constraints; equal VM counts are not the objective.',
'The management service collects host and workload information and evaluates resource demand against constraints.|DRS recommends or performs permitted placement and migration actions according to its automation level.|Operators validate workload outcomes and rule compliance; placement policy cannot repair missing storage or incompatible migration paths.',
'Demand~Resources a workload would use~It differs from configured vCPU count.|Automation level~Whether recommendations or actions are automatic~Manual mode intentionally waits for an operator.|Placement rule~Constraint on allowed placement~Hard constraints can limit recovery choices.',
'One host runs two busy database VMs while another runs six idle utility VMs; VM count alone is a poor balancing target.',
'An operator diagnoses DRS as broken because a manual-mode recommendation was not executed automatically.',
'Inspect automation level, recommendation reason and constraints; apply an approved move only after prerequisite validation and compare the actual workload result.',
'''Should DRS always equalize the number of VMs on each host?|No; workload demand and constraints matter.|Counts are not resource consumption.
What does manual automation do?|It presents recommendations for operator action.|No automatic move is expected.
What does partially automated mode distinguish in the cited cluster guide?|Automatic initial placement versus migration recommendations.|Different decisions can have different automation.
Can a hard placement rule block an otherwise attractive move?|Yes.|Policy constrains optimization.
Does DRS replace HA restart handling?|No.|Resource placement and failure recovery have distinct roles.
What validates a placement change?|Improved or acceptable workload metrics with policy and migration prerequisites preserved.|A more even dashboard is not sufficient.''',refs='cluster',kind='capacity')

add('s8-g5-t9',
'A VM snapshot records a point-in-time relationship to base disks and changed data, optionally including memory. It is a temporary rollback mechanism with dependency and consistency limits, not an independent backup.',
'Snapshot creation establishes a new write target or equivalent supported change-tracking structure while retaining the base relationship.|Subsequent writes consume additional allocation; application quiescing, if used, must be verified separately.|Revert changes the active state, while deletion/consolidation commits or removes snapshot relationships through the supported workflow; neither is manual file deletion.',
'Delta~Changes associated with snapshot state~It depends on the base chain.|Quiescing~Coordination toward a consistent point~Successful guest/application participation must be verified.|Consolidation~Supported processing of snapshot changes~It can require time, I/O and free capacity.',
'At a teaching change estimate of 4 MiB/s for six hours, linear growth is 84.375 GiB; with 20 GiB reserve the budget is 104.375 GiB.',
'A snapshot is retained as the only backup on the same datastore, which subsequently loses its base disk.',
'Restore from an independent verified copy; document why the dependent snapshot cannot replace the missing base, and plan bounded retention and consolidation capacity.',
'''What is the stated linear six-hour growth?|84.375 GiB.|Use 3600 seconds/hour and 1024 MiB/GiB.
Is the growth estimate a guaranteed VMware delta allocation?|No.|Actual allocation, metadata and workload behavior differ.
Can delta files alone recover a deleted base disk?|Not as a complete independent VM backup.|The chain depends on its base.
Does quiescing prove every application is consistent automatically?|No; guest and application support and results must be verified.|A checkbox is not a consistency test.
Should snapshot files be manually deleted to reclaim space?|No; use the supported snapshot/consolidation workflow.|Manual deletion can break the chain.
How do revert and delete/consolidate differ?|Revert selects earlier state; deletion/consolidation processes the snapshot relationship rather than simply rolling the VM back.|Confirm the exact supported operation before acting.''',refs='snapshot',kind='snapshot')

add('s8-g5-t10',
'A VM template is a controlled source for provisioning new VMs. It should carry a known build and configuration while instance-specific identity, credentials and application state are customized through a supported deployment process.',
'A source VM is prepared, patched and cleaned of instance-specific secrets and transient state.|The approved template or content-library item is versioned with provenance and validation evidence.|Deployment creates a new instance whose identity, network settings and secrets are customized and tested before use.',
'Template version~Recorded provisioning source~A name alone does not identify exact contents.|Customization~Assignment of new instance-specific identity/settings~It must cover the operating system and application.|Golden image~Approved reusable baseline~It still needs maintenance and validation.',
'Two application servers are deployed from a versioned source with distinct host identities and freshly issued credentials.',
'A cloned template retains a shared application token and duplicate static IP configuration.',
'Revoke the copied secret, assign intended unique instance settings and verify both instances independently before approving the template for further use.',
'''Why version a template?|To identify and reproduce the exact provisioning source.|A mutable display name loses provenance.
What must not be copied into every instance?|Live instance secrets and conflicting identity/network state.|Cloning bytes can clone exposure.
Does successful VM power-on prove template quality?|No.|Identity, patching, security and application behavior still need tests.
Why revoke a copied credential rather than only delete it from the template?|Already deployed instances may retain it.|Changing the source does not erase prior copies.
What should a deployment acceptance compare?|Unique identity, intended network, approved build and original service behavior.|A clone task result is narrower evidence.
Is a template a backup of a live application dataset?|No.|Provisioning baseline and state recovery have different purposes.''',refs='virt,cluster',kind='migration')

add('s8-g5-t11',
'A virtualization cluster groups hosts for shared management and selected resource or availability services. Its usable failure-state capacity and common dependencies determine recovery, not merely its member count.',
'Hosts join a compatible management and network context with known storage access and resource inventory.|Cluster services apply admission, placement and monitoring policies within that dependency graph.|Failure or maintenance removes capacity; remaining hosts must satisfy individual workload and service requirements.',
'Failure domain~Components lost together under one event~Hosts can share a rack or array.|N+1 envelope~Capacity after one specified member loss~It is not protection from arbitrary shared failures.|Placement constraint~Rule limiting eligible hosts~Aggregate spare capacity may be unusable.',
'Three 128 GiB hosts, each with 16 GiB reserved, support 180 GiB total demand on two survivors by aggregate memory, but a single 120 GiB VM cannot fit into a 112 GiB host allowance.',
'The cluster summary shows enough aggregate memory, yet a large VM cannot restart on any surviving host.',
'Compare per-VM demand and eligible-host headroom as well as aggregate capacity; redesign placement or resources and verify a supported failure exercise.',
'''What is the two-host aggregate allowance in the example?|224 GiB.|Each survivor contributes 112 GiB.
Why does a 120 GiB VM fail the stated per-host allowance?|Each eligible host allows only 112 GiB.|Aggregate sum does not solve individual fit.
Does N+1 host capacity protect against shared array loss?|No.|That is a different failure domain.
Why model maintenance and failure together?|A host already drained for maintenance reduces the capacity available for a subsequent fault.|Healthy-state counts overstate resilience.
Can a cluster member count alone prove high availability?|No.|Compatibility, policy and shared dependencies matter.
What evidence belongs in cluster acceptance?|A declared failure scope, valid placement, recovered application state and measured objective compliance.|Management membership is only the starting point.''',refs='cluster',kind='capacity')

add('s8-g6-t0',
'Microsoft Hyper-V uses a type 1 hypervisor with a privileged management partition and child partitions for VMs. Virtual switches, virtual disks and integration components supply distinct dependencies; Failover Clustering is an additional availability layer.',
'The hypervisor partitions processor and memory execution while the management partition provides management and supported device services.|A VM uses virtual storage and networking whose backing paths must be documented and authorized.|Migration, checkpoints, replication and clustered restart have different requirements and recovery semantics; each needs its own validation.',
'Management partition~Privileged host management and device context~A familiar Windows UI does not make Hyper-V type 2.|VHDX~Virtual disk file format~Its backing storage still needs protection.|Checkpoint~Point-in-time VM state mechanism~It is not an independent backup.',
'A Hyper-V VM uses an owned VHDX on supported storage and an isolated training virtual switch; its intended recovery is documented separately from checkpoints.',
'The VM is running, but its virtual switch is bound to the wrong physical network after host maintenance.',
'Compare the VM adapter, switch type and actual uplink mapping; restore the recorded attachment and verify guest connectivity and isolation.',
'''What hypervisor category applies to Hyper-V?|Type 1.|The management partition runs above the hypervisor.
Does Hyper-V installation alone create a failover cluster?|No.|Cluster configuration and shared dependencies are additional work.
What does a VHDX file provide?|Virtual disk backing for a VM.|The file needs a valid protected storage path.
Is a checkpoint an independent backup?|No.|It has dependencies and consistency scope.
Why check switch type as well as name?|External, internal and private attachment designs have different reachability.|Names can be misleading.
What validates the network repair?|The intended guest operation succeeds and excluded network access remains denied.|VM running state is insufficient.''',refs='hyperv',kind='capacity')

add('s8-g6-t1',
'KVM supplies Linux kernel virtualization facilities. A typical supported stack combines KVM with QEMU for the VM machine/device model and libvirt for lifecycle management; these are related components, not synonyms.',
'KVM exposes kernel virtualization interfaces using available processor assistance.|QEMU supplies a userspace machine and device model, optionally using virtio interfaces for efficient guest I/O.|Libvirt manages VM definitions and lifecycle according to host policy; host permissions, networking and storage remain separate dependencies.',
'KVM~Kernel virtualization subsystem~It is not the complete management UI.|QEMU~Userspace machine/device implementation~Acceleration and device behavior must be specified.|Libvirt~Management interface and service layer~Its configured state must be compared with actual execution.',
'An owned Linux host runs a QEMU/KVM guest managed by libvirt, with a documented disk path and isolated virtual network.',
'A VM definition points to a disk path that exists but is inaccessible to the configured service identity or security policy.',
'Verify the exact disk identity, path traversal, ownership and host security policy; restore narrow intended access and start only the owned disposable guest.',
'''Are KVM, QEMU and libvirt the same component?|No; kernel acceleration, machine/device implementation and management have different roles.|Distinguish the failing layer.
Does hardware virtualization exposure guarantee every guest device works?|No.|Drivers, device model and supported configuration also matter.
Why can an existing disk file fail to open?|Service permissions, parent traversal or host security policy may deny it.|Existence is not authorization.
Should an access repair disable the host security framework globally?|No.|Restore the precise supported label or permission boundary.
What guest I/O family is commonly associated with paravirtualized interfaces?|Virtio.|It still requires compatible guest drivers and host support.
What validates the restored guest?|Correct disk/network identity and the original guest transaction, not only a running process.|Lifecycle state is narrower than service health.''',refs='kvm,virt',kind='capacity')

add('s8-g6-t2',
'A container packages and runs processes with isolation and resource controls while sharing a kernel in the ordinary Linux container model. An image is a reusable filesystem/configuration source; persistent application data requires an explicit lifecycle outside the disposable writable layer.',
'A runtime constructs the process environment from an image and configured mounts, identity and network settings.|Namespaces and control groups provide selected isolation and resource boundaries around processes sharing a kernel.|The application writes either to its disposable layer or a deliberately managed volume; restart and rescheduling must preserve the intended data contract.',
'Image~Reusable filesystem/configuration source~A tag can be mutable.|Container~Running or stopped process instance with configuration~It is not a separate guest kernel by default.|Volume~Storage managed outside the disposable container layer~Persistence alone does not create a backup.',
'A stateful service stores records on an explicitly owned volume; its container image is pinned to a reviewed digest.',
'The application writes its database into the container writable layer and loses it when that instance is replaced.',
'Restore the dataset from a verified retained copy, mount the intended persistent storage and test replacement without losing records; retain separate backup verification.',
'''Does each ordinary Linux container boot its own kernel?|No; containers share the host kernel.|VMs have a different execution boundary.
Is an image tag always immutable?|No.|Use a content digest where reproducible identity matters.
What is lost when a disposable writable layer is removed?|Data stored only in that layer.|Application state needs a deliberate lifecycle.
Does mounting a volume make data backed up?|No.|Persistence and independent recovery differ.
Why restrict privileged containers and host mounts?|They can weaken intended host isolation.|Packaging is not automatic least privilege.
What tests the persistence repair?|Replace the owned instance while preserving and validating the intended records, then separately test restore.|A process restart alone is a weaker test.''',refs='docker',kind='reconcile')

add('s8-g6-t3',
'Docker supplies tooling and a runtime workflow for building images and managing containers. The CLI talks to a daemon or configured context; that target identity matters before creating, stopping or removing anything.',
'A build definition and context produce an image whose provenance and included files should be reviewed.|The client asks the selected daemon to create a container with explicit ports, mounts, identity and resource settings.|Runtime logs and inspection show the process and configuration; an application transaction and persistence test establish useful operation.',
'Docker context~Selected daemon endpoint and credentials~A local command can target a remote host.|Published port~Host-to-container exposure mapping~It can expose a service beyond the intended interface.|Build context~Files available to a build~Secrets can be included accidentally.',
'A disposable app container exposes a test service only on loopback and mounts a named owned data volume.',
'A learner uses the wrong Docker context and prepares a cleanup command for a shared daemon.',
'Verify context and object ownership before any mutation; select the intended disposable daemon and remove only exact owned objects after retaining required data.',
'''Why inspect Docker context before cleanup?|The CLI may target a remote or shared daemon.|Command location does not prove target ownership.
Does docker ps list stopped containers by default?|No; docker ps -a includes them.|List semantics affect inventory.
What risk comes from publishing a test port on every host address?|The service may become reachable outside the intended local scope.|Exposure depends on binding and network policy.
Why use an exclusion file and review build context?|Unneeded files or secrets can enter the image build.|The Dockerfile alone does not show all input bytes.
Is docker system prune an appropriate default cleanup for this exercise?|No; it can affect unrelated resources.|Remove exact owned objects only.
What evidence proves the app works?|A bounded application transaction plus correct volume behavior and intended exposure.|A running container row is not enough.''',refs='docker',kind='reconcile')

add('s8-g6-t4',
'Kubernetes reconciles declared workload state through API, controller, scheduler and node components. A desired replica count is an intention; scheduled, running and ready instances are different observations, especially when storage or resources are constrained.',
'The API accepts authorized desired-state objects and stores cluster state; controllers observe and reconcile differences.|The scheduler assigns eligible pending Pods to nodes according to resource and policy constraints.|Kubelet and the runtime start containers; readiness, networking and persistent-storage attachment determine whether the service can use them.',
'Pod~Scheduling unit containing related containers~Replacement creates a new instance identity.|Controller~Reconciles desired and observed state~It does not guarantee immediately available capacity.|PVC~PersistentVolumeClaim requesting storage~Binding and attachment can block readiness.',
'A deployment desires three replicas, has only two eligible declared slots, and one of the scheduled replicas is ready: one is pending and one is scheduled but unready.',
'An operator repeatedly deletes a pending Pod whose PVC cannot be bound in the eligible topology.',
'Inspect scheduling and storage events, reconcile the storage class/claim/topology under the supported design and verify ready endpoints plus the original client operation.',
'''How many replicas are pending in the example?|One.|Desired minus schedulable count is one in this bounded model.
How many scheduled replicas are unready in the example?|One.|Scheduled count two minus ready count one.
Does a desired count of three prove three healthy processes?|No.|Intent, placement and readiness are separate.
Why can a PVC block a workload?|Provisioning, binding or attachment/topology requirements can be unsatisfied.|Compute capacity alone is insufficient.
Does repeatedly deleting a controller-managed Pod fix an unsatisfied storage policy?|No; the controller can recreate the same blocked intent.|Repair the underlying constraint.
What verifies recovered service?|Ready eligible endpoints, correct persistent data and the original client transaction.|An API object exists before service is available.''',refs='kube',kind='reconcile')

add('lab-8',
'The integrated Storage & Virtualization Lab joins two SAN fabrics, three hosts, redundant guest networking and shared storage into an explicit recovery plan. The downloadable Python lab evaluates synthetic path/placement states and separately performs real file corruption detection and restore inside an owned temporary directory.',
'Inventory h1, h2 and h3 with two fabric attachments each; Fabrics A and B reach controllers cA and cB on one shared array. Guest networking uses independent declared switches nA and nB.|Evaluate baseline, one-fabric loss, host loss, all-path loss, missing mapping and network loss separately; place six 30 GiB workload records on eligible hosts with 112 GiB usable each.|Restore exact plan bytes, verify file content against a retained SHA-256 and clean owned artifacts after normal and interrupted runs; actual VM failover remains a separate guided target exercise.',
'Path recovery~Remaining eligible declared route after a failure~This lab does not send FC or iSCSI traffic.|Placement recovery~Feasible assignment of workload records to survivors~No VM is booted or migrated.|File restore~Actual replacement and hash verification of owned data~Same-host fixture is not an independent backup system.',
'The baseline has twelve declared storage paths and six 30 GiB workloads. Losing Fabric A leaves six paths; losing h1 afterward leaves four paths and two hosts that can each fit three workloads.',
'Both fabrics fail while hosts remain alive; restarting workload records cannot recreate the absent storage path. A separate byte-corruption exercise also shows that redundant paths do not repair bad data.',
'Restore the exact failed fabric flags and baseline plan bytes, validate all twelve paths and workload assignments, then restore the intentionally corrupted owned file and compare its content hash before cleanup.',
'''How many storage paths exist at baseline in this topology?|Twelve: three hosts times two fabrics times two controllers.|These are declared routes, not discovered hardware paths.
How many paths survive Fabric A loss followed by h1 loss?|Four: two hosts times one fabric times two controllers.|Each failure removes a different dependency.
Can six 30 GiB records fit across two 112 GiB hosts?|Yes; three per host use 90 GiB each.|This homogeneous memory-only example is narrower than real placement.
Why does both-fabric loss defeat workload restart in the model?|No eligible host can reach the shared storage.|Compute availability cannot replace the missing dependency.
Which lab result is actual file execution rather than topology simulation?|Writing, detecting changed bytes, restoring retained bytes and checking SHA-256 inside an owned temporary directory.|It does not establish array durability or VM HA.
What must every interrupted run report?|Its interruption, byte-identical plan/data restoration and owned-directory cleanup.|An interrupted run is not a normal successful exercise.''',refs='multipath,cluster,snapshot',kind='capacity')
