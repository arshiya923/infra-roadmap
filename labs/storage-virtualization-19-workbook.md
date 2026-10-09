# Storage & Virtualization — Batch 19

Each incident below is authored evidence, not captured vendor output. Use the browser worksheet for prediction and comparison. Platform procedures are guided and require the exact supported release, an owned disposable target, and a captured rollback baseline. No production storage change is part of this course.

## Procedure shared by each exercise

1. Name the owner, device identity, observer, required operation and failure scope.
2. Write a prediction before selecting the fault case.
3. Separate the first failed boundary from downstream symptoms.
4. Restore the stated narrow condition; keep a denied identity or operation denied.
5. Record baseline/fault/recovery evidence and what was not executed.

## s8-g0-t0 — Storage Fundamentals

Storage is a stack of interfaces and persistence guarantees. An application operation passes through caches, a filesystem or object API, a transport and media; capacity, availability and durability describe different properties.

Baseline: A workload completes 12000 operations/s of 8192 bytes each: payload is 98304000 bytes/s, before protocol overhead. Compare this to a 4 KiB random-write workload without assuming equal IOPS.

Fault: A power-loss recovery plan relies only on a successful buffered write and a second path to the same array.

Acceptance: Retain the actual flush/acknowledgement contract, identify shared failures and restore an independent copy in an isolated target; check application records and hashes.

Mechanism:
- The application defines an operation and its required persistence point; a successful write call may only populate a cache.
- The filesystem and device translate that operation into requests; flush and ordering semantics determine what an acknowledgement promises.
- Recovery must reconstruct correct application state after the stated failure, using both surviving storage and an independently restorable copy.

Companion scope: Payload arithmetic only: operations/s multiplied by bytes/operation. A latency-times-rate estimate uses a steady-state average. No workload, queue distribution, protocol overhead or benchmark is simulated.

## s8-g0-t1 — DAS

Direct-attached storage connects to a host without a storage network service between them. SATA, SAS and locally attached NVMe are common examples; attachment location does not by itself define redundancy or backup.

Baseline: A build worker keeps disposable cache on local NVMe and publishes completed artifacts to separate protected storage.

Fault: A second virtualization host is expected to restart a VM whose only disk resides on the failed first host.

Acceptance: Choose supported replication or shared access before claiming host failover; prove the destination can access the correct disk and independently restore retained data.

Mechanism:
- The host discovers a controller and device, then assigns a stable device identity independent of a transient OS path.
- A filesystem or volume manager consumes that device and supplies access to applications.
- When the host fails, local media may remain intact but unavailable to other hosts unless a supported recovery design exists.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g0-t2 — NAS

Network-attached storage serves files through a network filesystem protocol. Clients request named files and directories while the server controls filesystem organization and permissions.

Baseline: An engineering team shares project files through SMB; a Linux compute group uses a separately scoped NFS export.

Fault: A share is reachable but one user cannot create a file; an operator proposes opening the firewall to everyone.

Acceptance: Compare that user identity, share/export rights and parent-directory permissions; restore only the intended access and verify a prohibited identity remains denied.

Mechanism:
- The client resolves the server and establishes an authenticated protocol session or mount.
- Server export/share policy and file permissions decide which named operations are allowed.
- The server translates allowed requests into storage I/O; client caching and locking must follow the chosen protocol semantics.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g0-t3 — SAN

A storage area network carries storage access between initiators and targets, commonly providing block devices over Fibre Channel or iSCSI. A SAN is not synonymous with a filesystem or a backup system.

Baseline: Three hosts each have one HBA connection to Fabric A and one to Fabric B, with array target ports on both fabrics.

Fault: All FC links are up, but a newly installed host sees no assigned LUN.

Acceptance: Trace initiator WWPN, fabric login, active zoning, target login, array mapping and host discovery in order; stop at the first mismatch.

Mechanism:
- An initiator reaches a target over an allowed fabric or IP path and establishes the relevant storage session.
- Array mapping exposes a particular logical unit to that initiator; the host identifies the same unit across paths.
- A supported filesystem, datastore or application coordinates use of the blocks; independent hosts must not mount an ordinary local filesystem read-write concurrently.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g0-t4 — Block Storage

Block storage exposes addressable logical blocks. It leaves file naming, directory layout and much application consistency work to a layer above the block device.

Baseline: A 2 TiB logical volume uses 400 GiB in a shared pool; several peers can grow into the remaining physical capacity.

Fault: An operator formats an already shared LUN because a second host reports an unknown filesystem.

Acceptance: Stop writes, identify the intended shared filesystem and existing signatures, and follow its supported discovery procedure; do not initialize unknown devices.

Mechanism:
- The consumer translates file or database operations into logical block reads and writes.
- The device maps logical addresses to physical allocation; thin allocation can defer physical space consumption.
- The consumer uses ordering, flushes and recovery metadata to reconstruct consistent state after interruptions.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g0-t5 — File Storage

File storage presents named files and hierarchical directories with access and metadata operations. Local filesystems and remote NFS/SMB services share this abstraction while differing in transport and consistency behavior.

Baseline: A report writer creates an owned temporary file, flushes it, and replaces its prior report on the same filesystem.

Fault: A remote report exists but is partially updated after the writer crashes.

Acceptance: Examine the writer commit protocol, sync requirements and filesystem guarantees; validate the restored report content, not just its directory entry.

Mechanism:
- Path traversal resolves directories and requires the relevant search permissions at each parent.
- Opening a file combines identity, access mode and filesystem policy.
- Writes, rename, locks and sync calls have specific semantics; application recovery must use those semantics rather than assume all operations are atomic.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g0-t6 — Object Storage

Object storage addresses data as objects by keys through an API. Each object combines payload and metadata; bucket policy, versions and lifecycle rules govern access and retention.

Baseline: An artifact publisher stores immutable build objects by digest and separately updates a small release manifest.

Fault: Two publishers overwrite a release manifest from stale reads, losing one update.

Acceptance: Use the service-supported conditional update or serialized publisher policy and verify the final manifest references the intended immutable objects.

Mechanism:
- The client authenticates an API request naming a bucket and object key.
- The service applies authorization and operation semantics, then stores or returns object data and metadata.
- Version and lifecycle settings control retained historical objects; applications must account for the chosen service consistency and conditional-write guarantees.

Companion scope: Payload arithmetic only: operations/s multiplied by bytes/operation. A latency-times-rate estimate uses a steady-state average. No workload, queue distribution, protocol overhead or benchmark is simulated.

## s8-g1-t0 — NFS

NFS is a network filesystem protocol. NFSv4 integrates stateful operations such as opens and locking; security flavor, identity mapping and server export policy are part of the access contract.

Baseline: A Linux analytics client mounts an authorized NFSv4 dataset read-only; a separate writer identity publishes files.

Fault: A client root process receives permission denied and the proposed fix is disabling root squashing globally.

Acceptance: Check export scope, security flavor, mapped UID/GID and directory permissions; grant the narrow intended writer instead of removing the root boundary.

Mechanism:
- Client and server agree on protocol version and security flavor before interpreting file operations.
- The server combines export policy with mapped identities and filesystem permissions.
- State and caches are recovered or revalidated under the protocol; a mounted path does not guarantee every operation succeeds.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g1-t1 — SMB

SMB provides remote file and related services. The negotiated dialect, authentication, signing, encryption and authorization determine the actual session properties; the name SMB alone does not specify them.

Baseline: A Windows user reads a finance share successfully but is denied modifying payroll; this is an intentional permission boundary.

Fault: A migrated share grants broad share-level access but NTFS permissions omit the intended writer group.

Acceptance: Compare effective share and filesystem access for the named principal; restore the missing narrow group entry and retest permitted and denied operations.

Mechanism:
- The client negotiates a dialect and establishes an authenticated session.
- A tree connection selects the share; share and filesystem policy constrain the requested operation.
- The server manages opens, locks and supported caching/reconnection behavior while client operations expose success or failure.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g1-t2 — iSCSI

iSCSI transports SCSI commands over TCP/IP. An initiator identifies itself, logs in to a target portal and accesses authorized logical units; IP connectivity is only the first prerequisite.

Baseline: A host uses separate IP storage networks A and B to reach two supported target portals for one mapped LUN.

Fault: Ping to the target succeeds, but the initiator is absent from the array host mapping.

Acceptance: Verify the intended IQN, session/authentication state and exact LUN map, then confirm one stable device and supported paths without formatting it.

Mechanism:
- The initiator reaches a target portal and negotiates a session, with configured authentication where required.
- The target authorizes initiator identity and presents mapped LUNs.
- Host multipathing associates supported sessions and paths with stable device identity; filesystems consume the resulting device.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g1-t3 — Fibre Channel

Fibre Channel is a storage networking architecture with fabric addressing, login and frame transport. FCP carries SCSI over FC; NVMe/FC uses the fabric for a different command set.

Baseline: One host has FC ports in isolated fabrics A and B; each fabric reaches a supported target port on the shared array.

Fault: An HBA is online but active zoning uses the replaced adapter WWPN.

Acceptance: Reconcile the replacement identity with active fabric policy and array mapping, restore only the intended members and verify real I/O through the surviving path.

Mechanism:
- A physical port establishes a link and logs in to the fabric, obtaining a fabric address in a switched fabric.
- Name-service and active zoning state constrain which initiator and target ports can communicate.
- Upper-layer login and array authorization allow commands; buffer-credit behavior and error rates affect delivery.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g1-t4 — FCoE

FCoE encapsulates Fibre Channel frames over Ethernet within a supported converged design. It retains FC identities and storage authorization while relying on the required Ethernet loss-management and discovery mechanisms.

Baseline: A supported CNA reaches an FCoE forwarder on a converged access segment that connects to the FC SAN.

Fault: Ethernet traffic works while FCoE discovery or its assigned service priority is misconfigured.

Acceptance: Compare the validated VLAN, FIP, DCB and virtual FC binding against the exact platform guide; retest storage login and application I/O after restoring the owned mismatch.

Mechanism:
- The converged adapter and fabric discover an FCoE forwarder through the supported FIP process.
- The selected Ethernet service carries FC frames with the configured Data Center Bridging treatment.
- FC login, zoning and array mapping still determine storage access; ordinary Ethernet connectivity does not complete these layers.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g1-t5 — NVMe-oF

NVMe over Fabrics extends the NVMe command model across supported transports such as TCP, RDMA and Fibre Channel. Subsystem, controller and namespace identities replace assumptions copied from SCSI LUN terminology.

Baseline: An NVMe/TCP client has two supported subsystem connections; both expose the same namespace identity.

Fault: An operator combines namespaces with similar sizes but different identities as though they were paths to one device.

Acceptance: Compare subsystem and namespace identifiers and supported multipath ownership; restore the intended namespace mapping before any data operation.

Mechanism:
- The host locates a subsystem through the chosen transport and establishes an allowed controller connection.
- A namespace is exposed to the authorized host; its stable identity connects the namespace to the intended data.
- Supported multipath and asymmetric namespace access behavior determine path use; transport and media remain independent bottlenecks.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g2-t0 — HBA

A host bus adapter connects the host storage stack to a storage transport. Firmware, driver, port identity, queueing and fabric state all contribute to usable storage paths.

Baseline: A server has two single-port HBAs on independently documented fabrics; replacement changes one port identity.

Fault: A new HBA appears in PCI inventory but its driver is missing, so no storage port is operational.

Acceptance: Compare supported driver/firmware inventory before changing zoning; after binding, reconcile the new WWPN and verify expected paths to the original device.

Mechanism:
- The OS binds a supported driver to the adapter and exposes its ports and identifiers.
- Each port establishes the supported link and storage login through its assigned fabric.
- The host aggregates supported paths by device identity, then issues I/O subject to adapter and downstream queues.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g2-t1 — WWN

World Wide Name is a general identity term used in Fibre Channel. Node and port names identify different objects; a troubleshooting record must state which form it contains.

Baseline: A host inventory records one node name and two different port names, each assigned to its own fabric.

Fault: A spreadsheet column labelled WWN mixes node names and port names, causing a wrong zoning request.

Acceptance: Separate node and port columns, reconcile each with the observed owner and active fabric policy, and retain the corrected mapping.

Mechanism:
- Inventory gathers WWNN and WWPN values with their owning node and physical or virtual port.
- Fabric observations correlate the port identity to its current location and FCID.
- Access policy refers to the supported identity type; an alias is only a readable reference to the recorded value.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g2-t2 — WWPN

A WWPN identifies an FC port, including a supported virtual port. Port identity is used in common zoning and host-mapping designs but does not itself prove a port is logged in or authorized.

Baseline: A virtualized initiator retains a managed virtual WWPN while moving between supported physical attachments.

Fault: The array map contains an old physical WWPN while the workload now uses a virtual initiator WWPN.

Acceptance: Identify the actual logged-in initiator and its supported lifecycle, align only the intended zone/map references, and verify unauthorized hosts remain excluded.

Mechanism:
- The port presents its WWPN during fabric participation; virtual ports can create additional identities on one physical attachment.
- The fabric associates the identity with current login/location state.
- Zoning and array host records must both refer to the intended identity; replacement or virtualization changes require reconciliation.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g2-t3 — Zoning

FC zoning limits communication among fabric members. Defined configuration, active configuration and array LUN mapping are separate layers; a zone definition alone is not evidence of active enforcement.

Baseline: Host h1 initiator A can reach only its intended array targets in Fabric A; Fabric B has a separately reviewed equivalent policy.

Fault: A correct new zone exists in the configuration database but was omitted from the activated zone set.

Acceptance: Compare active membership to the approved baseline, activate only the reviewed change under the platform procedure, then verify h1 access and h2 denial.

Mechanism:
- The administrator describes the intended initiator and target members using supported identifiers.
- A reviewed zone configuration is activated within the correct fabric or VSAN, with fabric-wide effects understood.
- Array mapping and host discovery then determine which storage objects appear; positive and negative access checks validate the intended boundary.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g2-t4 — LUN

A logical unit is a SCSI-addressable storage entity; its LUN number addresses it within a presentation context. The same number on two targets does not by itself identify the same storage data.

Baseline: Two unrelated arrays both present LUN 5; their device identifiers differ and they must not be treated as one disk.

Fault: A migration spreadsheet uses only LUN numbers, causing source and destination data to be confused.

Acceptance: Record array identity, stable device ID, size, owner and mappings; verify the exact expected volume before any migration or filesystem operation.

Mechanism:
- The array creates a logical storage object from its backing allocation and protection scheme.
- Mapping presents that object to selected initiators using a supported LUN addressing policy.
- Host discovery reads stable device identity and combines paths appropriately before an authorized consumer uses the blocks.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g2-t5 — Multipathing

Multipathing presents multiple supported access paths to one storage device and selects paths according to device and host policy. It can survive specified path losses; it cannot repair corrupt data or unavailable shared media.

Baseline: Four discovered paths to one LUN cross two fabrics and two target ports; one fabric is removed only in the declared model.

Fault: The displayed path count is four, but every route crosses Fabric A, so its loss removes all access.

Acceptance: Map each path end to end, establish a usable independent Fabric B route, then verify bounded I/O and integrity while A is absent and after exact restoration.

Mechanism:
- Host discovery groups paths by stable device identity rather than transient device name.
- Path states and array access preferences guide selection through the supported multipath implementation.
- After a path fails, eligible alternatives may carry I/O subject to timeouts, surviving capacity and application tolerance.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g2-t6 — SAN Switch

A SAN switch forwards storage fabric traffic and provides fabric services such as login, name service and zoning. Its management interface is separate from the host-to-storage data path.

Baseline: Two isolated SAN switches implement Fabrics A and B, each with host and array connections; no ISL joins the two redundancy domains.

Fault: Both host HBAs were patched to the same switch even though port labels say A and B.

Acceptance: Trace actual cable endpoints and fabric identities; restore the intended independent fabric connection and verify both path and I/O evidence.

Mechanism:
- Ports establish roles and login relationships with endpoints or inter-switch links.
- Fabric services and active policy determine reachable port identities within the correct fabric scope.
- Frames traverse available links subject to errors, credits and congestion; endpoint storage commands provide the final service evidence.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g2-t7 — Brocade fundamentals

Brocade SAN administration uses Fabric OS concepts including switch/fabric identity, port state, aliases and defined versus effective zoning configuration. Procedures must match the installed Fabric OS and hardware release.

Baseline: A storage ticket references hostA, but the alias still contains the WWPN from its retired adapter.

Fault: The operator adds a new zone to the defined database without verifying the effective fabric configuration.

Acceptance: Read the installed-release zoning views, reconcile current WWPN ownership and the effective configuration, then retain exact before/after membership and host I/O results.

Mechanism:
- Collect product, Fabric OS, switch identity and endpoint login evidence before interpreting names.
- Compare alias and zone definitions with the effective configuration in the intended fabric.
- Use a reviewed platform-supported activation and rollback procedure; verify host paths and an owned storage transaction after the change.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g2-t8 — Cisco MDS fundamentals

Cisco MDS provides Fibre Channel fabric services with VSAN-scoped zoning and operational views. A VSAN separates logical fabrics on shared hardware; it does not create independent power or chassis.

Baseline: The intended initiator is in VSAN 20, while a copied change activated its zone only in VSAN 10.

Fault: The zone appears in a configuration search, but the active zoneset in the host VSAN excludes it.

Acceptance: Use the correct VSAN-scoped active view and compare it with approved members; repair only the intended scope and verify the array map and host transaction.

Mechanism:
- Identify the switch, software release, physical ports and intended VSAN context.
- Correlate fabric login and name-service evidence with the active zoneset for that VSAN.
- Reconcile array presentation and host device paths before accepting useful storage access.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

