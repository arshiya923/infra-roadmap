# Storage & Virtualization — Batch 20

Each incident below is authored evidence, not captured vendor output. Use the browser worksheet for prediction and comparison. Platform procedures are guided and require the exact supported release, an owned disposable target, and a captured rollback baseline. No production storage change is part of this course.

## Procedure shared by each exercise

1. Name the owner, device identity, observer, required operation and failure scope.
2. Write a prediction before selecting the fault case.
3. Separate the first failed boundary from downstream symptoms.
4. Restore the stated narrow condition; keep a denied identity or operation denied.
5. Record baseline/fault/recovery evidence and what was not executed.

## s8-g3-t0 — Storage arrays

A storage array combines media, controllers, cache, protection and presentation services. Its logical volumes and front-end paths depend on shared allocation, power and software; multiple controllers do not guarantee every failure is survivable.

Baseline: A thin pool has 10 TiB usable, 7 TiB allocated and 12 TiB promised across volumes; growth must be monitored against the 3 TiB physical headroom.

Fault: Hosts report logical free space while the backing pool approaches exhaustion.

Acceptance: Reconcile actual pool allocation, snapshot growth and commitments; apply a supported capacity or retention change and verify original writes without deleting unknown volumes.

Mechanism:
- Media is organized into a supported protection and allocation layout, with usable capacity reduced by redundancy and reserves.
- Controllers process requests, protect cache according to the write policy and expose logical objects through front-end ports.
- Host mappings, path policy and application durability requirements determine whether a nominally healthy array provides correct service.

Companion scope: Payload arithmetic only: operations/s multiplied by bytes/operation. A latency-times-rate estimate uses a steady-state average. No workload, queue distribution, protocol overhead or benchmark is simulated.

## s8-g3-t1 — HPE MSA

HPE MSA is a storage-array family. This lesson uses the 1060/2060/2062 management concepts: pools and volumes, initiator/host mappings, controller ownership and supported host multipathing; it does not generalize every generation or firmware feature.

Baseline: A dual-controller MSA presents one training volume to a host with one initiator in each independent fabric.

Fault: The host object contains only the Fabric A initiator, so losing A removes access despite healthy B cabling.

Acceptance: Compare actual initiator inventory to the approved MSA host and volume mapping; restore the missing intended identity and verify the same volume through B.

Mechanism:
- Create a documented pool/volume design using the exact controller and disk support matrix.
- Group the intended initiators into the correct host context and map only the required volume.
- Compare controller ownership and optimized path behavior with the supported host configuration before validating application I/O.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g3-t2 — Dell EMC concepts

Dell EMC names a broad storage portfolio, not one interchangeable configuration model. This lesson uses PowerStore block-volume and host-mapping concepts as a concrete example; Unity, PowerMax and other families require their own manuals.

Baseline: A PowerStore volume intended for a three-host cluster is accidentally mapped to a fourth unrelated host group.

Fault: The array is healthy and all I/O succeeds, but a presentation error exposes protected data to an unrelated host.

Acceptance: Retain the mapping evidence, remove only the unauthorized association under the approved procedure, and prove the intended cluster retains access while the unrelated host does not.

Mechanism:
- Identify the exact product and release before selecting its storage object model and supported front-end transport.
- Create or inspect the intended volume and associate it with the correct host/host group.
- Track logical allocation, protection policy and host-visible identity; local snapshots and remote recovery have different failure scopes.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g3-t3 — NetApp concepts

NetApp ONTAP separates storage virtual machines, volumes, logical interfaces and protocol-specific presentation. In a SAN example, an igroup associates initiators with LUN mappings; NAS access uses a different export/share policy layer.

Baseline: One SVM presents a LUN to a three-host cluster while a different dataset is exported through NFS.

Fault: A SAN access issue is investigated by changing an NFS export policy, leaving the incorrect igroup unchanged.

Acceptance: Identify the protocol and SVM first, reconcile the actual initiator with the SAN LUN map, and verify the intended device without altering unrelated NAS access.

Mechanism:
- An SVM supplies protocol and namespace context while volumes contain data objects.
- FC or iSCSI logical interfaces provide access endpoints; zoning and network reachability establish only the path.
- The LUN map and igroup membership authorize SAN presentation, and host multipath behavior must match the supported ONTAP design.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g4-t0 — Hypervisor

A hypervisor virtualizes execution and resource access for guest operating systems. Virtual CPUs, memory and devices are abstractions scheduled or backed by physical resources; isolation and overcommit depend on configuration and workload.

Baseline: Three hosts each provide 128 GiB with 16 GiB reserved per available host; 180 GiB aggregate workload demand fits after one host loss at the aggregate level.

Fault: An operator allocates many vCPUs to a stalled VM without checking host contention or CPU scheduling delay.

Acceptance: Compare guest demand with host scheduling, memory pressure and I/O evidence; adjust only a measured bottleneck and retest the same workload.

Mechanism:
- The hypervisor schedules virtual CPUs onto physical execution resources and manages guest address translation.
- Virtual device paths use emulation, paravirtualization or supported passthrough to reach host I/O.
- Resource limits, contention and shared dependencies shape guest performance and failure behavior.

Companion scope: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.

## s8-g4-t1 — Type 1 Hypervisor

A type 1 hypervisor provides virtualization directly at the hardware execution layer rather than as an ordinary application on a general-purpose host OS. Management partitions or appliances can still be present.

Baseline: A Windows Hyper-V host has a visible management OS but uses a type 1 hypervisor beneath the partitions.

Fault: A design review classifies every system with a visible desktop as a hosted type 2 hypervisor.

Acceptance: Trace where privileged execution is mediated and how the management OS relates to the hypervisor; correct the architecture diagram before making isolation claims.

Mechanism:
- Hardware virtualization support assists privileged guest execution under the hypervisor.
- Management and device-service components configure guests and mediate supported I/O paths.
- A guest depends on the physical host and its resource policy even when guest kernels are isolated from one another.

Companion scope: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.

## s8-g4-t2 — Type 2 Hypervisor

A type 2 or hosted hypervisor runs within a general-purpose host operating environment. It is useful for desktop labs, while host scheduling, updates, sleep behavior and device access add dependencies.

Baseline: A laptop runs a disposable two-VM study network on an isolated virtual segment, separate from the home LAN.

Fault: A learner selects bridged networking unintentionally and exposes a lab service to the physical LAN.

Acceptance: Stop the unintended exposure, choose the intended isolated mode, verify actual guest reachability and retain the host/guest network boundary in the diagram.

Mechanism:
- The host OS runs the virtualization process and supplies resource and device services.
- The hypervisor presents guest hardware and uses available hardware assistance through supported host interfaces.
- Guest workloads contend with host applications and inherit host availability constraints such as sleep or restart.

Companion scope: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.

## s8-g5-t0 — VMware ESXi

VMware ESXi is a hypervisor host platform. The VMkernel, host management and virtual machine execution supply different observations; a reachable host UI does not establish datastore or guest-service health.

Baseline: An ESXi 8.x host remains manageable while the datastore path used by one VM is unavailable.

Fault: The operator restarts management services to fix a storage-path failure that does not affect management access.

Acceptance: Correlate the affected VM disk with datastore and device-path evidence, restore the owned storage fault and verify the guest operation.

Mechanism:
- The host discovers supported CPU, memory, network and storage devices using its driver/firmware stack.
- VMkernel resource and I/O services back virtual machines and their configured networks and disks.
- Host management exposes configuration and operational state, while the guest application supplies the final acceptance transaction.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g5-t1 — vCenter

vCenter provides centralized inventory, authorization and orchestration for managed vSphere hosts. Existing VM execution resides on the hosts; management-plane loss affects operations without necessarily stopping running VMs.

Baseline: vCenter becomes unreachable, but a directly observed application on a managed ESXi host still answers its health transaction.

Fault: An incident plan powers off healthy hosts because their centralized inventory view is disconnected.

Acceptance: Verify direct host and guest service evidence, recover the management service through its documented backup/restore procedure, then reconcile inventory without disrupting healthy guests.

Mechanism:
- vCenter authenticates administrative requests and keeps inventory and desired configuration context.
- Hosts execute assigned work and expose operational state; cluster services have their own dependencies.
- Operators distinguish a vCenter communication failure from host, datastore and guest application failures before taking recovery action.

Companion scope: Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.

## s8-g5-t2 — Datastore

A datastore is a vSphere storage container for VM files and related objects. VMFS on block storage, NFS-backed datastores and other supported types have different discovery and coordination mechanisms.

Baseline: Hosts h1, h2 and h3 list the same intended shared datastore identity before a VM migration.

Fault: Two hosts display a datastore called shared01 but actually refer to different backing storage.

Acceptance: Compare datastore identity, backing device/export and intended VM files across hosts; repair the mapping without formatting or resignaturing unknown data.

Mechanism:
- The host establishes the backing storage path and discovers the appropriate device or remote namespace.
- The supported datastore layer presents a namespace and capacity to the host.
- VM disks and configuration depend on that namespace; host visibility, datastore accessibility and application integrity require separate checks.

Companion scope: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.

## s8-g5-t3 — vSwitch

A standard vSwitch supplies host-local virtual Ethernet switching for VM and VMkernel connections. Port groups, VLAN treatment and physical uplinks connect logical endpoints to the intended network.

Baseline: Two ESXi hosts have a port group called app, but one uses VLAN 120 and the other uses VLAN 121.

Fault: A VM loses external connectivity after migration even though its port group name is unchanged.

Acceptance: Compare actual VLAN policy, uplink teaming and upstream trunk allowance on both hosts, restore the intended VLAN 120 path and retest the original guest transaction.

Mechanism:
- A VM virtual NIC or VMkernel interface attaches to a configured port group.
- The virtual switch applies the relevant local switching and VLAN/security policy.
- Traffic leaving the host uses eligible physical uplinks and matching physical-network configuration.

Companion scope: Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.

## s8-g5-t4 — Distributed Switch

A vSphere Distributed Switch centralizes virtual-network configuration across participating hosts while host proxy switching components perform the data-plane work. Central management and current forwarding are distinct dependencies.

Baseline: A host migrates to a distributed switch one uplink at a time while independent console access and a verified rollback remain available.

Fault: Both management uplinks are moved together into a port group with the wrong VLAN policy.

Acceptance: Use independent management to restore the captured known-good uplink and management attachment; validate one staged path before moving the second.

Mechanism:
- Administrators define distributed port group and switch policy through the supported management plane.
- Participating hosts realize that configuration and attach their physical uplinks and endpoints.
- Traffic depends on each host realization plus the physical network; staged migration protects the management path.

Companion scope: Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.

## s8-g5-t5 — VMkernel

A VMkernel network interface provides an ESXi host IP endpoint for enabled host services such as management, vMotion or IP storage. It is separate from a VM guest virtual NIC.

Baseline: A host has separate management and migration VMkernel interfaces on different VLANs, with documented physical uplinks.

Fault: Management ping passes while the migration VMkernel adapter has an incorrect VLAN or missing service binding.

Acceptance: Inspect the selected host interface, service and routing context; restore the intended migration path and verify its end-to-end reachability before attempting migration.

Mechanism:
- The interface obtains IP settings and attaches through a port group to a virtual switch and uplinks.
- A selected TCP/IP stack and enabled service determine how host traffic uses the interface.
- End-to-end addressing, routing, VLAN and MTU must match the actual service path, not only a successful guest ping.

Companion scope: Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.

## s8-g5-t6 — vMotion

vMotion moves a running VM between supported hosts while preserving its execution state within the supported migration contract. Compute migration, storage migration and shared-nothing variants have different prerequisites; this lesson models a shared-storage compute move.

Baseline: A VM on shared storage moves from h1 to h2 while a client records transaction success and latency before, during and after.

Fault: CPU and storage checks pass, but the destination guest port group reaches the wrong VLAN.

Acceptance: Restore the destination guest-network equivalence, revalidate migration prerequisites and verify the original client transaction across the move on a disposable target.

Mechanism:
- Compatibility and resource checks establish an eligible destination, matching guest network and accessible VM storage.
- The migration transfers execution state while tracking changed memory under the supported mechanism.
- A final switchover resumes execution at the destination, after which application continuity must be observed rather than assumed.

Companion scope: Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.

## s8-g5-t7 — HA

vSphere HA can restart affected VMs on eligible surviving hosts after specified host failures. Restart requires accessible VM state, resources and applicable policy; it does not preserve every in-memory transaction or replace application-level availability.

Baseline: Three hosts reserve 16 GiB of each 128 GiB for overhead and retain 180 GiB total workload demand; two survivors have a 224 GiB aggregate envelope.

Fault: HA is enabled, but all surviving hosts lack access to the failed host VM disk.

Acceptance: Restore supported shared or replicated storage access and valid capacity/policy, then verify restart, guest boot, application recovery and retained records separately.

Mechanism:
- Host agents and configured monitoring distinguish failure or isolation conditions under the platform policy.
- Eligible surviving hosts must satisfy storage, network, capacity and placement constraints.
- A restarted guest boots and recovers its applications; only application-level tests establish restored service and data consistency.

Companion scope: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.

## s8-g5-t8 — DRS

Distributed Resource Scheduler evaluates VM placement and resource demand within a vSphere cluster. Recommendations or automatic actions depend on configured automation and constraints; equal VM counts are not the objective.

Baseline: One host runs two busy database VMs while another runs six idle utility VMs; VM count alone is a poor balancing target.

Fault: An operator diagnoses DRS as broken because a manual-mode recommendation was not executed automatically.

Acceptance: Inspect automation level, recommendation reason and constraints; apply an approved move only after prerequisite validation and compare the actual workload result.

Mechanism:
- The management service collects host and workload information and evaluates resource demand against constraints.
- DRS recommends or performs permitted placement and migration actions according to its automation level.
- Operators validate workload outcomes and rule compliance; placement policy cannot repair missing storage or incompatible migration paths.

Companion scope: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.

## s8-g5-t9 — Snapshots

A VM snapshot records a point-in-time relationship to base disks and changed data, optionally including memory. It is a temporary rollback mechanism with dependency and consistency limits, not an independent backup.

Baseline: At a teaching change estimate of 4 MiB/s for six hours, linear growth is 84.375 GiB; with 20 GiB reserve the budget is 104.375 GiB.

Fault: A snapshot is retained as the only backup on the same datastore, which subsequently loses its base disk.

Acceptance: Restore from an independent verified copy; document why the dependent snapshot cannot replace the missing base, and plan bounded retention and consolidation capacity.

Mechanism:
- Snapshot creation establishes a new write target or equivalent supported change-tracking structure while retaining the base relationship.
- Subsequent writes consume additional allocation; application quiescing, if used, must be verified separately.
- Revert changes the active state, while deletion/consolidation commits or removes snapshot relationships through the supported workflow; neither is manual file deletion.

Companion scope: Linear changed-byte budget from supplied MiB/s and hours, plus reserve. Real delta growth, metadata, compression and consolidation workspace differ. This does not create a snapshot or backup.

## s8-g5-t10 — Templates

A VM template is a controlled source for provisioning new VMs. It should carry a known build and configuration while instance-specific identity, credentials and application state are customized through a supported deployment process.

Baseline: Two application servers are deployed from a versioned source with distinct host identities and freshly issued credentials.

Fault: A cloned template retains a shared application token and duplicate static IP configuration.

Acceptance: Revoke the copied secret, assign intended unique instance settings and verify both instances independently before approving the template for further use.

Mechanism:
- A source VM is prepared, patched and cleaned of instance-specific secrets and transient state.
- The approved template or content-library item is versioned with provenance and validation evidence.
- Deployment creates a new instance whose identity, network settings and secrets are customized and tested before use.

Companion scope: Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.

## s8-g5-t11 — Clusters

A virtualization cluster groups hosts for shared management and selected resource or availability services. Its usable failure-state capacity and common dependencies determine recovery, not merely its member count.

Baseline: Three 128 GiB hosts, each with 16 GiB reserved, support 180 GiB total demand on two survivors by aggregate memory, but a single 120 GiB VM cannot fit into a 112 GiB host allowance.

Fault: The cluster summary shows enough aggregate memory, yet a large VM cannot restart on any surviving host.

Acceptance: Compare per-VM demand and eligible-host headroom as well as aggregate capacity; redesign placement or resources and verify a supported failure exercise.

Mechanism:
- Hosts join a compatible management and network context with known storage access and resource inventory.
- Cluster services apply admission, placement and monitoring policies within that dependency graph.
- Failure or maintenance removes capacity; remaining hosts must satisfy individual workload and service requirements.

Companion scope: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.

