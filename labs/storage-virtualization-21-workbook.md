# Storage & Virtualization — Batch 21

Each incident below is authored evidence, not captured vendor output. Use the browser worksheet for prediction and comparison. Platform procedures are guided and require the exact supported release, an owned disposable target, and a captured rollback baseline. No production storage change is part of this course.

## Procedure shared by each exercise

1. Name the owner, device identity, observer, required operation and failure scope.
2. Write a prediction before selecting the fault case.
3. Separate the first failed boundary from downstream symptoms.
4. Restore the stated narrow condition; keep a denied identity or operation denied.
5. Record baseline/fault/recovery evidence and what was not executed.

## s8-g6-t0 — Microsoft Hyper-V

Microsoft Hyper-V uses a type 1 hypervisor with a privileged management partition and child partitions for VMs. Virtual switches, virtual disks and integration components supply distinct dependencies; Failover Clustering is an additional availability layer.

Baseline: A Hyper-V VM uses an owned VHDX on supported storage and an isolated training virtual switch; its intended recovery is documented separately from checkpoints.

Fault: The VM is running, but its virtual switch is bound to the wrong physical network after host maintenance.

Acceptance: Compare the VM adapter, switch type and actual uplink mapping; restore the recorded attachment and verify guest connectivity and isolation.

Mechanism:
- The hypervisor partitions processor and memory execution while the management partition provides management and supported device services.
- A VM uses virtual storage and networking whose backing paths must be documented and authorized.
- Migration, checkpoints, replication and clustered restart have different requirements and recovery semantics; each needs its own validation.

Companion scope: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.

## s8-g6-t1 — KVM

KVM supplies Linux kernel virtualization facilities. A typical supported stack combines KVM with QEMU for the VM machine/device model and libvirt for lifecycle management; these are related components, not synonyms.

Baseline: An owned Linux host runs a QEMU/KVM guest managed by libvirt, with a documented disk path and isolated virtual network.

Fault: A VM definition points to a disk path that exists but is inaccessible to the configured service identity or security policy.

Acceptance: Verify the exact disk identity, path traversal, ownership and host security policy; restore narrow intended access and start only the owned disposable guest.

Mechanism:
- KVM exposes kernel virtualization interfaces using available processor assistance.
- QEMU supplies a userspace machine and device model, optionally using virtio interfaces for efficient guest I/O.
- Libvirt manages VM definitions and lifecycle according to host policy; host permissions, networking and storage remain separate dependencies.

Companion scope: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.

## s8-g6-t2 — Containers fundamentals

A container packages and runs processes with isolation and resource controls while sharing a kernel in the ordinary Linux container model. An image is a reusable filesystem/configuration source; persistent application data requires an explicit lifecycle outside the disposable writable layer.

Baseline: A stateful service stores records on an explicitly owned volume; its container image is pinned to a reviewed digest.

Fault: The application writes its database into the container writable layer and loses it when that instance is replaced.

Acceptance: Restore the dataset from a verified retained copy, mount the intended persistent storage and test replacement without losing records; retain separate backup verification.

Mechanism:
- A runtime constructs the process environment from an image and configured mounts, identity and network settings.
- Namespaces and control groups provide selected isolation and resource boundaries around processes sharing a kernel.
- The application writes either to its disposable layer or a deliberately managed volume; restart and rescheduling must preserve the intended data contract.

Companion scope: Declared desired replicas, available slots and ready replicas. Scheduled and ready counts are different. No container runtime, scheduler, persistent-volume controller or application is executed.

## s8-g6-t3 — Docker basics

Docker supplies tooling and a runtime workflow for building images and managing containers. The CLI talks to a daemon or configured context; that target identity matters before creating, stopping or removing anything.

Baseline: A disposable app container exposes a test service only on loopback and mounts a named owned data volume.

Fault: A learner uses the wrong Docker context and prepares a cleanup command for a shared daemon.

Acceptance: Verify context and object ownership before any mutation; select the intended disposable daemon and remove only exact owned objects after retaining required data.

Mechanism:
- A build definition and context produce an image whose provenance and included files should be reviewed.
- The client asks the selected daemon to create a container with explicit ports, mounts, identity and resource settings.
- Runtime logs and inspection show the process and configuration; an application transaction and persistence test establish useful operation.

Companion scope: Declared desired replicas, available slots and ready replicas. Scheduled and ready counts are different. No container runtime, scheduler, persistent-volume controller or application is executed.

## s8-g6-t4 — Kubernetes overview

Kubernetes reconciles declared workload state through API, controller, scheduler and node components. A desired replica count is an intention; scheduled, running and ready instances are different observations, especially when storage or resources are constrained.

Baseline: A deployment desires three replicas, has only two eligible declared slots, and one of the scheduled replicas is ready: one is pending and one is scheduled but unready.

Fault: An operator repeatedly deletes a pending Pod whose PVC cannot be bound in the eligible topology.

Acceptance: Inspect scheduling and storage events, reconcile the storage class/claim/topology under the supported design and verify ready endpoints plus the original client operation.

Mechanism:
- The API accepts authorized desired-state objects and stores cluster state; controllers observe and reconcile differences.
- The scheduler assigns eligible pending Pods to nodes according to resource and policy constraints.
- Kubelet and the runtime start containers; readiness, networking and persistent-storage attachment determine whether the service can use them.

Companion scope: Declared desired replicas, available slots and ready replicas. Scheduled and ready counts are different. No container runtime, scheduler, persistent-volume controller or application is executed.

## Integrated topology and execution

The original objective is retained: design SAN storage, two SAN switches, three virtualization hosts, redundant network switches and shared storage; validate path failover and VM recovery. This implementation offers a synthetic path/placement rehearsal and a separate actual file restore. Real VM failover remains the guided extension below.

```text
h1-A ─┐                  ┌─ cA target A
h2-A ─┼─ SAN switch A ────┤
h3-A ─┘                  └─ cB target A
                              │
                        shared array / volume
                              │
h1-B ─┐                  ┌─ cA target B
h2-B ─┼─ SAN switch B ────┤
h3-B ─┘                  └─ cB target B

h1,h2,h3 → network switch nA and network switch nB → client
```

No ISL merges Fabrics A and B in this design. Every initiator/controller route has an explicit fabric label. A/B labels are declarations, not proof of electrical or physical independence. Both controllers still share array data and administration.

### Reproduce and classify evidence

- Draw the original design: two independent SAN switches, three virtualization hosts, redundant guest-network switches and one dual-controller shared array. Label shared power, chassis, software and administrative dependencies that this logical model cannot prove independent.
- Record twelve planned paths: each of h1/h2/h3 reaches cA and cB through both Fabric A and Fabric B. Record one intended stable volume identity and restrict mapping to the three hosts; an excluded fourth host has no access.
- Set the planning workload to six 30 GiB VM records. Each 128 GiB host reserves 16 GiB, leaving 112 GiB in this memory-only plan. Explain why two survivors can each hold three records while one 120 GiB record cannot fit on any host.
- Run python labs/storage-virtualization.py to inspect help, then python labs/storage-virtualization.py --run. The script opens no device and creates no VM. Retain the JSON evidence with its simulation/actual labels.
- Compare baseline twelve paths, Fabric A loss six paths and subsequent h1 loss four paths. Inspect the declared placement after each phase. Contrast the both-fabric, missing-map and guest-network failure states.
- Read the corruption event separately: the script changes bytes in an owned temporary file, detects the different SHA-256 and restores retained bytes. This actual local operation is not a storage-array power-loss test or an independent physical backup.
- Confirm planRestored, dataRestored and cleaned are true. Run python labs/storage-virtualization.py --run --inject-failure host-fault; expect INTERRUPTED and exit code 2 with the same restoration/cleanup evidence. Repeat other documented phases only within this owned fixture.
- For a real disposable platform extension, establish an independent management session and verified restore point. Capture host/array/fabric identities and mappings first. Isolate one owned path domain, measure original I/O and integrity, restore it, then perform a separately approved host-loss/restart exercise. Record restart, guest boot and application recovery separately. Do not disable production fabrics using this offline example.
- Submit the topology, per-host paths, identity/mapping sheet, one-failure capacity and individual-fit calculations, baseline/fault/recovery table, integrity evidence and cleanup record. Mark real FC, VM migration, HA restart, failure timing and application recovery as not executed unless independently observed on the optional target.

Failure injection phases: `baseline`, `path-fault`, `host-fault`, `corruption`, `restored`. Use `--run --inject-failure PHASE`; exit 2 means the intentional interruption occurred. Running without `--run` only prints help. The script reports its owned temporary path after removing it; it never accepts a user-supplied deletion path.

## lab-8 — Storage & Virtualization Lab

The integrated Storage & Virtualization Lab joins two SAN fabrics, three hosts, redundant guest networking and shared storage into an explicit recovery plan. The downloadable Python lab evaluates synthetic path/placement states and separately performs real file corruption detection and restore inside an owned temporary directory.

Baseline: The baseline has twelve declared storage paths and six 30 GiB workloads. Losing Fabric A leaves six paths; losing h1 afterward leaves four paths and two hosts that can each fit three workloads.

Fault: Both fabrics fail while hosts remain alive; restarting workload records cannot recreate the absent storage path. A separate byte-corruption exercise also shows that redundant paths do not repair bad data.

Acceptance: Restore the exact failed fabric flags and baseline plan bytes, validate all twelve paths and workload assignments, then restore the intentionally corrupted owned file and compare its content hash before cleanup.

Mechanism:
- Inventory h1, h2 and h3 with two fabric attachments each; Fabrics A and B reach controllers cA and cB on one shared array. Guest networking uses independent declared switches nA and nB.
- Evaluate baseline, one-fabric loss, host loss, all-path loss, missing mapping and network loss separately; place six 30 GiB workload records on eligible hosts with 112 GiB usable each.
- Restore exact plan bytes, verify file content against a retained SHA-256 and clean owned artifacts after normal and interrupted runs; actual VM failover remains a separate guided target exercise.

Companion scope: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.

