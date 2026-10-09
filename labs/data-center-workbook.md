# Data Center Foundations evidence workbook

This workbook describes a classroom design and guided physical/vendor procedures. Browser calculations are not actual devices, electrical tests, cooling measurements or management sessions.

## Three-rack baseline

All racks have 42U, front-to-rear equipment airflow, front cold aisle and rear hot aisle. R1: storage U1–4, compute U5–12, leaf switches U40–41; 6 kW. R2: compute U1–12, leaf switches U40–41; 6 kW. R3: backup U1–4, leaves U36–37, spines U38–39, OOB switch U40; 4 kW. Blank unused front openings with supported panels. Rack dimensions, mass/rails, floor loading and approved inlet limits are separate installation checks.

Every dual-cord device maps PSU A → rack PDU A → UPS A → supply domain A and PSU B → rack PDU B → UPS B → supply domain B. Each entire rack path has 10 kW rating with a declared planning allowance of 80%, hence 8 kW usable on either surviving path. Site total is 16 kW; each site supply/UPS path has a declared 25 kW rating and 80% allowance, hence 20 kW. These are invented design inputs, not universal derating rules or a licensed electrical plan. A/B labels alone do not establish upstream independence. Single-cord equipment needs a supported transfer/redundancy design and its own failure analysis.

Cooling: declared 20 kW available sensible removal for 16 kW IT load. At 2 m³/s, assumed density 1.2 kg/m³ and specific heat 1.005 kJ/(kg·K), mean air rise is about 6.63 K. This does not establish maximum inlet, containment efficiency, humidity or cooling redundancy. Verify those with qualified facility staff and actual measurements.

Fabric: two leaves per rack, two spines in R3; each leaf connects to both spines with 100 Gb/s links. The isolated worksheet compares a representative 48×25 Gb/s leaf (6:1 healthy, 12:1 with one uplink unavailable), not the smaller installed server population as a measured traffic demand. Show port/optic/speed/length and separate route A/B for each cable. Never infer single-flow 200 Gb/s from two uplinks.

OOB: use documentation-only 192.0.2.0/24: jump host .10, controller inventory .21–.32, OOB switch .2; these are plan labels, not addresses configured on the host. Protected management ingress permits the named administrator read-only HTTPS operation to assigned controllers; guest/application clients are denied. DNS/time/logging and emergency console dependencies require explicit targets and scope. Keep BMC standby power and OOB switch/jump access independent of the workload path where supported; shared-NIC or shared-UPS coupling must be documented. No Internet exposure, default credentials or real secrets in the workbook.

## Baseline/fault/restore record

Record observer, timestamp, intended operation, attachment, supported versions and expected positive/negative observations. Save the exact owned baseline and independent recovery access. Introduce only one owned plan/configuration fault, retain its failure evidence, restore exact prior state, repeat original allowed and prohibited operations, then remove only owned artifacts. For physical work use approved qualified procedures; do not pull cables, open energized panels or force storage assembly on this host.

## Endpoint cable and controller schedule

Planned media and lengths below are invented inputs, requiring supported optics/channel/route verification. Routes A/B must be reviewed for actual physical diversity. The single R3 OOB switch and jump host remain named shared recovery dependencies; this plan does not claim fully redundant management. Server dual attachment requires a supported bonding/teaming and switch policy not deployed by this artifact. Storage/backup replication and storage-transport paths beyond the declared workload NICs are external scoped additions, never implicit permits.

| Source | Destination | Planned media / length | Route |
| --- | --- | --- | --- |
| R1 Leaf A uplink1 | R3 Spine A port1 | 100G supported fiber / planned 15 m | Route A |
| R1 Leaf A uplink2 | R3 Spine B port1 | 100G supported fiber / planned 15 m | Route B |
| R1 Leaf B uplink1 | R3 Spine A port2 | 100G supported fiber / planned 15 m | Route A |
| R1 Leaf B uplink2 | R3 Spine B port2 | 100G supported fiber / planned 15 m | Route B |
| R2 Leaf A uplink1 | R3 Spine A port3 | 100G supported fiber / planned 15 m | Route A |
| R2 Leaf A uplink2 | R3 Spine B port3 | 100G supported fiber / planned 15 m | Route B |
| R2 Leaf B uplink1 | R3 Spine A port4 | 100G supported fiber / planned 15 m | Route A |
| R2 Leaf B uplink2 | R3 Spine B port4 | 100G supported fiber / planned 15 m | Route B |
| Jump host .10 | R3 OOB switch access1 | 1G supported copper / planned 10 m | OOB route |
| R1 Server1 NICA | R1 Leaf A downlink1 | 25G supported media / planned 3 m | Route A |
| R1 Server1 NICB | R1 Leaf B downlink1 | 25G supported media / planned 3 m | Route B |
| R1 Server2 NICA | R1 Leaf A downlink2 | 25G supported media / planned 3 m | Route A |
| R1 Server2 NICB | R1 Leaf B downlink2 | 25G supported media / planned 3 m | Route B |
| R1 Server3 NICA | R1 Leaf A downlink3 | 25G supported media / planned 3 m | Route A |
| R1 Server3 NICB | R1 Leaf B downlink3 | 25G supported media / planned 3 m | Route B |
| R1 Server4 NICA | R1 Leaf A downlink4 | 25G supported media / planned 3 m | Route A |
| R1 Server4 NICB | R1 Leaf B downlink4 | 25G supported media / planned 3 m | Route B |
| R2 Server1 NICA | R2 Leaf A downlink1 | 25G supported media / planned 3 m | Route A |
| R2 Server1 NICB | R2 Leaf B downlink1 | 25G supported media / planned 3 m | Route B |
| R2 Server2 NICA | R2 Leaf A downlink2 | 25G supported media / planned 3 m | Route A |
| R2 Server2 NICB | R2 Leaf B downlink2 | 25G supported media / planned 3 m | Route B |
| R2 Server3 NICA | R2 Leaf A downlink3 | 25G supported media / planned 3 m | Route A |
| R2 Server3 NICB | R2 Leaf B downlink3 | 25G supported media / planned 3 m | Route B |
| R2 Server4 NICA | R2 Leaf A downlink4 | 25G supported media / planned 3 m | Route A |
| R2 Server4 NICB | R2 Leaf B downlink4 | 25G supported media / planned 3 m | Route B |
| R2 Server5 NICA | R2 Leaf A downlink5 | 25G supported media / planned 3 m | Route A |
| R2 Server5 NICB | R2 Leaf B downlink5 | 25G supported media / planned 3 m | Route B |
| R2 Server6 NICA | R2 Leaf A downlink6 | 25G supported media / planned 3 m | Route A |
| R2 Server6 NICB | R2 Leaf B downlink6 | 25G supported media / planned 3 m | Route B |
| R1 Storage BMC 192.0.2.21 | R3 OOB switch access2 | 1G supported copper / planned 15 m | OOB route |
| R1 Server1 BMC 192.0.2.22 | R3 OOB switch access3 | 1G supported copper / planned 15 m | OOB route |
| R1 Server2 BMC 192.0.2.23 | R3 OOB switch access4 | 1G supported copper / planned 15 m | OOB route |
| R1 Server3 BMC 192.0.2.24 | R3 OOB switch access5 | 1G supported copper / planned 15 m | OOB route |
| R1 Server4 BMC 192.0.2.25 | R3 OOB switch access6 | 1G supported copper / planned 15 m | OOB route |
| R2 Server1 BMC 192.0.2.26 | R3 OOB switch access7 | 1G supported copper / planned 15 m | OOB route |
| R2 Server2 BMC 192.0.2.27 | R3 OOB switch access8 | 1G supported copper / planned 15 m | OOB route |
| R2 Server3 BMC 192.0.2.28 | R3 OOB switch access9 | 1G supported copper / planned 15 m | OOB route |
| R2 Server4 BMC 192.0.2.29 | R3 OOB switch access10 | 1G supported copper / planned 15 m | OOB route |
| R2 Server5 BMC 192.0.2.30 | R3 OOB switch access11 | 1G supported copper / planned 15 m | OOB route |
| R2 Server6 BMC 192.0.2.31 | R3 OOB switch access12 | 1G supported copper / planned 15 m | OOB route |
| R3 Backup BMC 192.0.2.32 | R3 OOB switch access13 | 1G supported copper / planned 15 m | OOB route |
| R1 Leaf A management 192.0.2.40 | R3 OOB switch access14 | 1G supported copper / planned 15 m | OOB route |
| R1 Leaf B management 192.0.2.41 | R3 OOB switch access15 | 1G supported copper / planned 15 m | OOB route |
| R2 Leaf A management 192.0.2.42 | R3 OOB switch access16 | 1G supported copper / planned 15 m | OOB route |
| R2 Leaf B management 192.0.2.43 | R3 OOB switch access17 | 1G supported copper / planned 15 m | OOB route |
| R3 Leaf A management 192.0.2.44 | R3 OOB switch access18 | 1G supported copper / planned 15 m | OOB route |
| R3 Leaf B management 192.0.2.45 | R3 OOB switch access19 | 1G supported copper / planned 15 m | OOB route |
| R3 Spine A management 192.0.2.46 | R3 OOB switch access20 | 1G supported copper / planned 15 m | OOB route |
| R3 Spine B management 192.0.2.47 | R3 OOB switch access21 | 1G supported copper / planned 15 m | OOB route |
| R3 Leaf A uplink1 | R3 Spine A port5 | 100G supported fiber / planned 3 m | Route A |
| R3 Leaf A uplink2 | R3 Spine B port5 | 100G supported fiber / planned 3 m | Route B |
| R3 Leaf B uplink1 | R3 Spine A port6 | 100G supported fiber / planned 3 m | Route A |
| R3 Leaf B uplink2 | R3 Spine B port6 | 100G supported fiber / planned 3 m | Route B |
| R1 Storage NICA | R1 Leaf A downlink5 | 25G supported media / planned 3 m | Route A |
| R1 Storage NICB | R1 Leaf B downlink5 | 25G supported media / planned 3 m | Route B |
| R3 Backup NICA | R3 Leaf A downlink1 | 25G supported media / planned 3 m | Route A |
| R3 Backup NICB | R3 Leaf B downlink1 | 25G supported media / planned 3 m | Route B |

Controller addresses .21–.32 follow the twelve named storage/compute/backup assets in the cable schedule. Switch management .40–.47 has separate role/target policy to design; the offline BMC read rule does not automatically authorize those switches. OOB switch .2 and jump .10 are plan labels only. DNS/time/logging, phase/outlet ratings, full rack mass/depth, cooling failure domains and emergency console remain explicit external checks.

## s6-g0-t0 — Server Hardware

Server hardware is a service dependency chain: processors execute work, local memory holds working state, adapters move data, storage persists it, and firmware, power and cooling make those components usable. Inventory includes replaceable units, attachment paths and shared chassis risks rather than only total cores and disk terabytes.

Calculation scope: Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet.

Read-only observation:
```text
lscpu
```

- Map one workload to its physical and logical dependencies. Record chassis identity, firmware release, processor sockets, populated memory, adapter location, disk-to-slot mapping and observed load before deciding which spare or maintenance window is appropriate.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Inventory, Telemetry and Service test. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Redundant PSUs survive only within their ratings and upstream failure domains; fan and memory health can reduce usable capacity before complete failure. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Health evidence plus the original service and preserved data integrity. A cleared alert alone is incomplete recovery evidence. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g0-t1 — Rack Servers

A rack server is a self-contained chassis mounted in standardized vertical rack space. Its rack-unit height describes vertical allocation, not depth, rail compatibility, weight, cooling direction or power demand. Rails, service clearance and cord reach are part of the supported installation.

Calculation scope: Check one proposed vertical interval against a fixed three-rack teaching elevation and 8 kW per surviving feed; excludes physical dimensions, mass, circuits and installation certification.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Produce an elevation with numbered U positions, asset identity, front/rear orientation, depth, mass and service clearances. Use manufacturer rails and lifting procedures; the classroom elevation calculation does not authorize physical installation.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using U interval, Rail envelope and Feed path. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Trace both PSU cords beyond the rack outlets and reserve capacity on the surviving feed for the entire load. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: No overlaps, supported dimensions/loading, documented feeds and service clearance. A neat drawing alone is not an installation validation. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g0-t2 — Blade Servers

Blade servers separate compute modules from a shared enclosure containing power, cooling, interconnects and management. Module redundancy and dense cabling can improve operations while enclosure power, midplane, firmware and interconnect dependencies enlarge the shared failure domain.

Calculation scope: Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet.

Read-only observation:
```text
lscpu
```

- Draw module and enclosure dependencies before placing replicas. Validate supported interconnect, adapter, firmware and power combinations and retain a tested independent management path before any chassis maintenance.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Blade, Enclosure and Interconnect. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Firmware and management coordinate module discovery; two blades in one enclosure do not survive every enclosure-level incident. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Timestamped path and original-service evidence with exact restore and scoped cleanup. A management success message alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g0-t3 — CPU architecture

Server CPU architecture includes instruction-set compatibility, cores, simultaneous multithreading, caches, memory controllers and socket interconnects. A logical processor is a scheduling context; it does not automatically provide a second core worth of execution resources.

Calculation scope: Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet.

Read-only observation:
```text
lscpu
```

- Record architecture, sockets, cores, threads, supported instruction features and topology from the actual observer. Compare a representative workload before changing affinity, power policy or virtual CPU sizing.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Core, Logical CPU and Socket. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Socket-local memory and I/O attachments shape access latency, so placement and frequency under sustained load matter alongside core count. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Same-workload latency/throughput comparison plus regression and exact rollback evidence. A changed CPU mask is intent rather than benefit. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g0-t4 — Memory channels

Memory channels are independent data paths from a processor memory controller to DIMMs. Capacity, populated channels, DIMMs per channel, supported transfer rate and reliability mode are separate dimensions. The slot order and allowed combinations are platform specific.

Calculation scope: 64 useful data bits per transfer; active channels × MT/s × 8 bytes; decimal GB/s theoretical envelope, no ECC payload, controller efficiency or benchmark.

Read-only observation:
```text
lscpu
```

- Build a per-socket channel/slot table with DIMM type, size, rank, rated and negotiated transfer rate. Use the exact server population guide; the Intel example demonstrates specificity, not a universal slot sequence.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Capacity, Channel and MT/s. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. More ranks or DIMMs can change supported transfer rate and contention; ECC and spare/mirror modes change capacity or reliability without proving workload speed. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: A theoretical useful-data envelope, not a benchmark. Protocol/controller/workload effects are excluded. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g0-t5 — NUMA

Non-uniform memory access describes systems where access cost depends on the relationship between an executing CPU and the memory node holding data. Local allocation, CPU placement, allowed-node policy and device locality must be considered together; NUMA node identity is not necessarily socket identity.

Calculation scope: Weighted mean of supplied local/remote access costs and fraction; no page placement, migration, caches, queueing or workload simulation.

Read-only observation:
```text
lscpu
```

- Record CPU-to-node topology and the workload allowed/allocated nodes from the actual OS or hypervisor. Compare representative latency before changing placement and retain the old affinity/policy for exact recovery.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Execution node, Memory node and Allocation policy. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Device interrupts and DMA buffers also have locality, so a workload may pay for remote memory even when its CPU utilization looks balanced. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Original policy/affinity plus the original workload and allocation observations. A mask restored in configuration may not move existing pages. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g0-t6 — NIC

A server NIC bridges host memory/driver queues and a network link. Port speed, PCIe attachment, queue distribution, DMA locality and actual protocol overhead jointly constrain service. Multiple ports do not inherently provide path diversity or one-flow aggregation.

Calculation scope: Gen3/4/5 only, per direction, 128b/130b encoding; transaction overhead and endpoint/shared upstream limits excluded; Gen6 excluded.

Read-only observation:
```text
lscpu
```

- Map each NIC port to PCIe slot, negotiated width, driver, firmware, switch port and failure domain. Compare intended host-to-network demand with both link and PCIe envelopes, then verify a representative original service.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Ethernet rate, PCIe width and Queue locality. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Queue placement, RSS and offloads influence CPU cost and locality; bonding behavior and switch attachment determine failure and traffic distribution. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Restored attachment/settings and original service plus prohibited-path checks. A link LED alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g0-t7 — HBA

A host bus adapter connects host I/O to a storage transport such as SAS or Fibre Channel. HBA identity and topology differ from a RAID controller exposing virtual disks. An adapter, an available target and authorized storage access are distinct boundaries.

Calculation scope: Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet.

Read-only observation:
```text
lsblk -o NAME,TYPE,SIZE
```

- Record HBA mode, firmware, target identity, slot/cable path and logical-to-physical mapping without creating or importing arrays. Preserve data ownership and the supported recovery method before changing a controller.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using HBA, RAID controller and Multipath. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Pass-through or RAID mode changes which identity and metadata the OS sees, while multipath requires distinct end-to-end usable paths. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: The original target identity, usable paths and original application I/O. An adapter health flag alone is not enough. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g0-t8 — PCIe

PCI Express is a point-to-point host interconnect negotiated by generation and lane width. Each lane supports simultaneous directions, but a one-direction workload must be compared to the one-direction envelope rather than a marketing total that sums both directions.

Calculation scope: Gen3/4/5 only, per direction, 128b/130b encoding; transaction overhead and endpoint/shared upstream limits excluded; Gen6 excluded.

Read-only observation:
```text
lscpu
```

- Record the negotiated endpoint and every shared upstream attachment. Compare one-direction demand with a correctly unit-labelled encoding envelope; validate actual device support before changing slot or bifurcation settings.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using GT/s, Lanes and Payload throughput. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Switches, shared upstream lanes, bifurcation and CPU attachment create additional capacity and locality boundaries beyond the endpoint slot. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Negotiated topology plus same-workload measurements and exact recovery record. An increased width does not alone prove application benefit. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g1-t0 — RAID

RAID combines members into a logical storage layout with explicit capacity and failure-pattern semantics. Redundancy protects against selected member losses, while backups and tested restore protect from deletion, corruption and broader failure domains. A survivable layout is not proof of readable application data.

Calculation scope: Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations.

Read-only observation:
```text
if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi
```

- Document level, layout, active members, smallest usable member size, failure domains and restore method. Compare nominal capacity and every relevant failure pattern without creating arrays or forcing assembly on host disks.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Nominal capacity, Survivability and Backup. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. The array metadata, controller, cache state, filesystem and application remain separate dependencies; rebuilding consumes resources and does not restore an independent backup. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Member mapping, supported replacement, integrity checks and independent restore test. Capacity and healthy flags alone are insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g1-t1 — Hardware RAID

Hardware RAID presents controller-managed logical volumes while hiding some member details from ordinary OS enumeration. Array metadata compatibility, controller firmware, cache protection and supported import/replacement procedures determine whether an acknowledged write survives failure.

Calculation scope: Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations.

Read-only observation:
```text
lsblk -o NAME,TYPE,SIZE
```

- Build a read-only controller/member/volume inventory and verify cache-protection health through the supported management tool. Preserve a known restore path before any adapter, firmware or battery/capacitor maintenance.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Virtual volume, Protected cache and Import. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. A replacement must interpret the metadata and preserved cache state correctly; matching RAID level names do not certify controller interchangeability. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Supported volume/member health plus integrity and original application tests. A green controller icon is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g1-t2 — Software RAID

Software RAID implements an array in the host storage stack, such as Linux MD. Host CPU and memory participate, while persistent metadata and the boot/initramfs configuration allow the correct members to be assembled. Software RAID is not synonymous with an unprotected or automatically portable array.

Calculation scope: Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations.

Read-only observation:
```text
if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi
```

- Observe /proc/mdstat and block-device topology only. Document UUID, metadata version, layout, boot dependencies and independent backup; use disposable owned images for any later array creation rather than a host disk.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using MD device, Metadata and Resync. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Boot dependencies must discover and assemble the correct array before required filesystems or services start; monitoring must retain member and resync state. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Correct assembly/layout, original integrity and service tests plus independent restore evidence. A completed resync alone is incomplete. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g1-t3 — RAID 0

RAID0 stripes data over members without redundant copies or reconstruction parity. It can aggregate nominal capacity and distribute work, but any missing member breaks the complete logical dataset. A recoverable workload on RAID0 needs an independent durable source.

Calculation scope: Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations.

Read-only observation:
```text
if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi
```

- Use the worksheet to compare capacity and a single-member loss. Limit any target exercise to disposable images containing reproducible scratch data and never initialize a discovered host disk.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Stripe, Member loss and Scratch data. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. One missing member makes the modeled complete array unavailable; an empty spare contains no copy of that missing data. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Reproduction from the source and original integrity/application tests. A newly empty healthy array is not recovered data. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g1-t4 — RAID 1

RAID1 mirrors logical data across members. In the worksheet it is explicitly an N-way mirror: nominal capacity equals one common member and the complete data remains reconstructible while at least one member survives. Two separate mirrored pairs would instead be a different nested layout.

Calculation scope: Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations.

Read-only observation:
```text
if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi
```

- Record mirror membership and the actual copy layout. Compare all-member versus partial-member loss and preserve an independent backup; do not describe four-way mirroring as two pairs.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Mirror copy, N-way mirror and Synchronization. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Replacing a member requires a completed synchronization before that new member is counted as a complete independent copy. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Complete synchronization, integrity and original service, with backup restore evidence separate. A detected new disk is not a recovered copy. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g1-t5 — RAID 5

RAID5 distributes data and single parity across at least three active members. Equal-member nominal capacity is (N−1)S, and the idealized layout tolerates one missing member. Reconstruction relies on the other members and consistent parity; a spare does not add another parity equation.

Calculation scope: Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations.

Read-only observation:
```text
if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi
```

- Use a disposable capacity/failure worksheet and record protected-cache and consistency assumptions. Never force a dirty degraded host array to demonstrate reconstruction; retain independent restore-tested copies.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Single parity, Degraded and Rebuild. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Small partial-stripe writes and rebuild activity can require extra I/O and consistency protection, so cache and workload conditions shape actual behavior. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Supported rebuild completion plus data integrity and original service tests. A replacement disk appearing is not sufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g1-t6 — RAID 6

RAID6 distributes two independent parity-equivalents across at least four active members. Equal-member capacity is (N−2)S and the idealized layout tolerates any two missing members. That stronger loss relation still excludes corruption, failed controllers and unavailable independent backups.

Calculation scope: Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations.

Read-only observation:
```text
if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi
```

- Compare one, two and three losses and explicitly separate the current failure state from a planned replacement. Document member identity, rebuild procedure and independent recovery copies before any optional target exercise.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Dual parity, Active members and Recovery budget. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Partial-stripe writes and reconstruction use additional resources; supported consistency and cache protection remain part of the durability contract. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Completed supported rebuild, correct membership and integrity/service evidence. A purchased replacement is not restored redundancy. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g1-t7 — RAID 10

RAID10 in this course is explicitly a stripe across adjacent two-member mirror pairs: members 0/1, 2/3 and so on. It requires an even active-member count of at least four, uses NS/2 nominal capacity and survives losses only when every pair retains a complete member. Linux MD also supports layouts beyond this narrow pair model.

Calculation scope: Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations.

Read-only observation:
```text
if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi
```

- Draw the exact pair mapping and test every member-loss mask in the worksheet. Record actual target layout metadata before transferring this result to hardware or Linux MD; pair semantics are not claimed for every RAID10 implementation.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Mirror pair, Stripe of pairs and Failure mask. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Several failures in different pairs can be survivable, so count-only tolerance rules misdescribe the layout. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Correct pair/layout, rebuilt copy, integrity and original application evidence. A healthy total-member count can hide the wrong layout. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g1-t8 — Hot Spare

A hot spare is a compatible reserved replacement member available for a supported rebuild policy. It does not hold a guaranteed current copy before reconstruction and therefore adds neither current useful capacity nor instantaneous parity tolerance. Eligibility, assignment scope and successful rebuild are separate conditions.

Calculation scope: Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations.

Read-only observation:
```text
if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi
```

- Record global/dedicated assignment, common component size, sector format, controller policy and spare health. Compare current array survivability first, then possible reconstruction; never assume an idle spare rescues an already unreconstructible layout.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Spare eligibility, Current tolerance and Rebuild completion. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. After the spare becomes active, the reserved replacement pool can be empty and needs lifecycle attention even if the array reports healthy. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Eligibility, selected array, rebuild completion, integrity and replenishment ownership. A spare inventory count alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g2-t0 — Disk Backplane

A disk backplane connects bays to power and data paths through direct wiring, expanders or protocol-specific switching. Similar-looking carriers can terminate SAS, SATA or PCIe/NVMe paths with different firmware and hot-plug support. Bay identity is a physical topology contract.

Calculation scope: Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet.

Read-only observation:
```text
lsblk -o NAME,TYPE,SIZE
```

- Build a bay-to-device-to-controller table from supported documentation and read-only inventory. Photograph or label owned paths before maintenance, and retain an exact compatible spare rather than inferring compatibility from carrier fit.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Bay, Backplane and Expander/switch. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Hot replacement requires the chassis, backplane, controller, OS and redundancy policy all to support the specific operation; connector accessibility is not authorization. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Correct identities and redundancy plus original integrity/application tests. Presence after rescan alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g2-t1 — SAS

Serial Attached SCSI is a storage transport using SCSI commands over serial links, commonly with enterprise multi-path/dual-port capabilities on supported drives and enclosures. Protocol capability, installed path diversity and active multipath policy must be separately established.

Calculation scope: Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet.

Read-only observation:
```text
lsblk -o NAME,TYPE,SIZE
```

- Record initiator, expander, target, negotiated rate and each path parent. Validate the exact controller/backplane/drive combination and path policy before treating a dual-port label as availability.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Initiator, Target and Expander. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. SAS controllers may support SATA targets in documented combinations; a SATA controller does not thereby gain SAS-target support. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Correct target identity, usable intended paths and original I/O integrity. A link counter alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g2-t2 — SATA

Serial ATA is a storage interface and command path commonly used for individual drives. Interface rate, connector form, flash or rotating media and failure-domain design are separate choices. A SATA SSD can be faster than a rotating SAS disk for some work without changing the protocol compatibility rules.

Calculation scope: Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet.

Read-only observation:
```text
lsblk -o NAME,TYPE,SIZE
```

- Identify drive protocol, media type, negotiated link and controller/backplane support. Keep physical identity and backup/restore planning explicit; do not infer enterprise availability from a capacity or SSD label.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Interface, Media and Installed path. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Conventional SATA drives do not inherently provide SAS-style native dual-port paths; supported enclosure/interposer designs require their own validation. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Correct path/member identity, redundancy state and original integrity/service tests. Drive discovery alone does not establish data recovery. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g2-t3 — NVMe

NVMe is a command/interface architecture for nonvolatile storage with queues designed for concurrent host operation. Local NVMe commonly uses PCIe transport; NVMe is neither a synonym for an M.2 shape nor limited to flash in one connector. NVMe over Fabrics is a different transport topic.

Calculation scope: Gen3/4/5 only, per direction, 128b/130b encoding; transaction overhead and endpoint/shared upstream limits excluded; Gen6 excluded.

Read-only observation:
```text
lsblk -o NAME,TYPE,SIZE
```

- Record controller/namespace identity, transport, slot/bay mapping, negotiated PCIe path and supported firmware. Compare a Gen3/4/5 host envelope with demand and use read-only discovery; namespace creation/deletion is outside this lesson.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Controller, Namespace and Transport. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. PCIe negotiated width, shared switches, locality and media/controller behavior jointly limit local I/O; form-factor fit does not establish hot-plug or firmware support. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Correct controller/namespace identity and original integrity/application evidence. A controller appearing alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g3-t0 — Top of Rack

Top-of-rack switching places access switches near server attachments within a rack. It reduces long server cable runs and makes rack expansion modular, while concentrating rack traffic and exposing port utilization, uplink capacity and rack-local shared power as design constraints. ToR describes placement, not a particular overlay or routing protocol.

Calculation scope: Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Map each server NIC to an access port and every access uplink to a named spine/aggregation port. Count usable downlinks and surviving uplinks, and retain rack switch/power dependencies before comparing a design with end-of-row.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using ToR, Uplink and Rack domain. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Port speed, optic/cable support, length and airflow orientation must match the actual installation rather than a location label. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Restored attachment, surviving capacity and original permitted/prohibited transactions. Link LEDs do not prove service or policy recovery. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g3-t1 — End of Row

End-of-row switching concentrates access near the row rather than in every rack. It can improve port pooling and centralize operations, while requiring longer rack-to-row cable paths and exposing many racks to shared switching, patching and power dependencies.

Calculation scope: Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Compare a row design with ToR using measured attachment counts, cable length/patch budgets, optics, port utilization, maintenance impact and failure-state demand. Preserve a named alternate path rather than assuming centralized access is inherently resilient.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using EoR, Patch path and Row domain. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Row placement does not dictate Layer 2 versus routed access; forwarding and failure behavior depend on the implemented topology. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Correct endpoint/patch mapping and original workload/policy observations. A replaced cable and link light are not sufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g3-t2 — Leaf-Spine

A conventional two-tier leaf-spine fabric connects every leaf to every spine within the fabric, without using leaf-to-leaf or spine-to-spine links for those modeled inter-leaf paths. Endpoints attach at leaves; spines provide transit. The uniform pattern simplifies path counting but does not alone ensure nonblocking traffic or operational convergence.

Calculation scope: Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Draw each leaf-to-spine edge with rate and port identity, count required spine ports for all leaves, and compare demanded traffic under a stated failure. Keep routing/ECMP configuration and observed convergence separate from this topology worksheet.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Leaf, Spine and ECMP. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. A spine or uplink loss reduces the source/destination leaf envelope and may require routing/forwarding convergence before useful traffic resumes. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Actual usable route/forwarding paths and original service within requirements. A topology drawing alone is not convergence evidence. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g3-t3 — East-West Traffic

East-west traffic is workload communication across peers within the data-center context, such as application-to-database or storage/replication exchanges. The label describes the communication relationship rather than a particular port or guaranteed physical path.

Calculation scope: Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Build an east-west demand matrix from representative original operations and placements. Compare healthy and failure-state inter-leaf envelopes without converting downlink port sums into an asserted measured workload.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Peer relationship, Locality and Demand matrix. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Policy enforcement and return traffic must be located on the actual path, including virtual switches or host boundaries where relevant. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Original peer transactions and required policy behavior after exact restoration. Route or link presence alone is incomplete. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g3-t4 — North-South Traffic

North-south traffic crosses the data-center context boundary, such as external clients accessing a published service. It may traverse edge routing, firewalls and load-balancing/service dependencies before reaching the endpoint fabric. The classification does not prove any particular Internet or security topology.

Calculation scope: Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Record actual ingress/egress, service tuple, publication, return path and policy consumers. Compare external demand with both edge and fabric failure envelopes rather than applying an inter-leaf number as the entire service capacity.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Boundary crossing, Publication and Edge envelope. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Edge failure or path asymmetry can change capacity and stateful inspection outcomes even when leaf-spine links remain healthy. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: The original external authorized transaction and intended prohibited operations. An internal link test alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g3-t5 — Oversubscription

Oversubscription compares declared potential offered capacity with the shared forwarding envelope. A port-sum ratio is a design indicator, not measured traffic, packet loss, utilization or per-flow throughput. The numerator, denominator, direction and failure state must be named.

Calculation scope: Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Calculate ratios with decimal Gb/s and document both healthy and stated-loss conditions. Compare actual representative offered traffic and latency with those envelopes; no traffic generator or live congestion test is run here.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Port sum, Shared envelope and Ratio. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Same-leaf traffic can bypass the inter-leaf denominator, while bursts, hashing and asymmetric demand can constrain particular paths before average aggregate capacity is exhausted. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Representative offered-demand/latency evidence in healthy and stated-loss conditions. A computed ratio alone is incomplete. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g3-t6 — Redundancy

Redundancy duplicates resources so a specified fault can leave sufficient usable service dependencies. The claim must identify the failed component, independent remaining parents, capacity and recovery behavior. Two labels or parts do not establish independence or successful application continuity.

Calculation scope: Full-load capacity on each independent A/B path using a supplied allowed fraction; ideal energy/load duration from supplied usable AC energy, not a UPS runtime curve or electrical certification.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Create a failure-domain table for power, network, storage, cooling and management. Use the A/B power worksheet for one explicit full-load case and keep other domains and service recovery separately documented.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Duplicate, Independent path and Surviving capacity. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Restore the exact prior state and retest original service/policy behavior; spare resources and documented failover are hypotheses until the relevant observation exists. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Original allowed/prohibited operations under the named fault and after exact restore. Component presence is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g3-t7 — High Availability

High availability is an operational service outcome under specified faults and recovery requirements. It combines independent capacity, detection, failover, state/data handling and original-user observations. Redundant components support the design but do not by themselves prove acceptable recovery time or data loss.

Calculation scope: Supplied named-fault eligibility, capacity, original service/policy observation and recovery/data-age intervals compared with declared targets. No live failover, replication or availability percentage.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Define the service, fault set, observer, recovery timing boundary and allowable data age before a rehearsal. Enter declared recovery/data observations into the worksheet and retain the original permitted/prohibited service results separately.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using RTO, RPO and Service observation. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Compare the newest recoverable data with the stated recovery-point requirement; component uptime and service/data recovery are distinct measurements. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Named fault/observer, surviving capacity, recovery and data intervals, original service/policy checks and exact restore. A redundant label or health icon is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g4-t0 — Rack design

Rack design coordinates vertical placement, mass, dimensions, rails, power, cooling, cabling and service access. The original lab uses three 42U racks and separate documented capacity paths. Free U is a planning resource rather than permission to install unsupported equipment.

Calculation scope: Check one proposed vertical interval against a fixed three-rack teaching elevation and 8 kW per surviving feed; excludes physical dimensions, mass, circuits and installation certification.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Produce three named elevations and a per-rack capacity worksheet. Preserve asset-to-slot identity and qualified physical installation checks; the browser checks only declared vertical intervals and a fixed power allowance.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Elevation, Physical envelope and Capacity worksheet. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Trace every cord and cable with both endpoints, service travel and independent-path intent; additions must fit the surviving power envelope. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Valid elevations plus supported physical, full-load power, thermal, cable and recovery records. The browser does not certify installation. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g4-t1 — Power distribution

Power distribution delivers electricity through utility/generation, UPS/transfer arrangements, circuits, PDUs, cords and device supplies. A/B diversity requires independent relevant upstream paths and adequate full-load capacity on each survivor. Real installation also depends on voltage, current, phase balance, connectors and applicable professional/code requirements.

Calculation scope: Full-load capacity on each independent A/B path using a supplied allowed fraction; ideal energy/load duration from supplied usable AC energy, not a UPS runtime curve or electrical certification.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Produce a cord-to-source schedule and per-rack/site capacity sheet from supported ratings and measured/planned load. The 80% allowance is a classroom input, not a universal electrical rule; qualified staff must approve actual circuit work.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using W/kW, A/B path and Surviving envelope. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Check single-cord devices and shared switch/management/cooling supply dependencies rather than assuming every required service has dual inputs. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Complete supported cord/source mapping and full-load survivor capacity, followed by approved qualified testing where appropriate. No electrical test is executed by this worksheet. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g4-t2 — UPS

An uninterruptible power supply supports specified load through supported input-loss and power-quality conditions for a limited duration. Watt/VA capacity, battery state, runtime curves, transfer/bypass behavior and upstream/downstream redundancy are different requirements. UPS presence alone does not prove uninterrupted useful service.

Calculation scope: Full-load capacity on each independent A/B path using a supplied allowed fraction; ideal energy/load duration from supplied usable AC energy, not a UPS runtime curve or electrical certification.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Record exact UPS model, supported voltage/frequency, real/apparent ratings, mode, battery health and manufacturer load/runtime curve. Plan graceful shutdown or generator/recovery dependencies within verified duration; no input removal or battery discharge is performed here.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Output rating, Usable energy and Runtime curve. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Bypass, battery maintenance, transfer and cooling/network parents can change the failure domain, so protected components and independent management must be mapped. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Supported rating/runtime evidence, mapped dependencies and approved original-service recovery/shutdown checks. A UPS icon alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g4-t3 — PDU

A power distribution unit delivers power to multiple outlets and may meter, switch or remotely manage them depending on the model. A PDU is not inherently a UPS, redundant supply or independent failure domain. Its inlet, phase, outlet and upstream ratings remain separate constraints.

Calculation scope: Full-load capacity on each independent A/B path using a supplied allowed fraction; ideal energy/load duration from supplied usable AC energy, not a UPS runtime curve or electrical certification.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Produce a per-outlet load/phase/circuit map and role-controlled monitoring plan. Retain exact outlet identity and disabled destructive permissions for observers; qualified staff approve the actual electrical installation.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Basic PDU, Metered PDU and Switched PDU. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Two PDUs provide supply diversity only if their relevant upstream parents and full-load survivor capacities are genuinely independent. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Supported per-element ratings, independent source map and approved service/recovery evidence. The worksheet is not electrical certification. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g4-t4 — Cooling

Cooling removes heat while delivering supported environmental conditions at equipment inlets. IT electrical work largely becomes heat in the room, but total removal capacity and actual inlet conditions are different boundaries. Humidity, airflow distribution, recirculation and failure-state removal must be separately evaluated.

Calculation scope: Steady sensible heat balance with air density 1.2 kg/m³ and heat capacity 1.005 kJ/(kg·K); no humidity, recirculation, CFD, thermal transients or compliance certification.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Map heat and available removal per rack/room, inlet sensor positions, airflow paths and shared cooling power/control dependencies. Consult supported equipment limits and qualified facility procedures; do not treat a calculated mean as a compliance temperature.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Sensible heat, Inlet condition and Removal envelope. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Measure inlet conditions across heights and racks because mixing and bypass can create hot spots even when a mean thermal budget fits. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Supported inlet/humidity and original service evidence after exact approved restoration. The calculated mean alone is incomplete. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g4-t5 — Airflow

Airflow design routes conditioned air through required equipment and returns exhaust without harmful mixing or bypass. Flow quantity, pressure, equipment fan behavior and physical obstructions interact. Server and switch orientation must be confirmed from actual installed airflow variants.

Calculation scope: Steady sensible heat balance with air density 1.2 kg/m³ and heat capacity 1.005 kJ/(kg·K); no humidity, recirculation, CFD, thermal transients or compliance certification.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Create front/rear flow arrows, blanking and penetration records and inlet sensor positions for each rack. Check cable-arm and switch airflow variants; use only supported installation materials and qualified facility changes.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Bypass, Recirculation and Flow balance. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Match supply and IT flow behavior through approved measurement; increasing fan speed does not guarantee improved delivery at every inlet. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Supported stable inlet distribution and original service after exact restoration. An ideal flow calculation alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g4-t6 — Hot aisle

A hot aisle groups equipment exhaust sides so warm return air can be separated from inlet supply. Containment can reduce mixing when supported by the room/cooling design, but it also changes return paths, work conditions and interactions with fire detection, suppression and access requirements.

Calculation scope: Steady sensible heat balance with air density 1.2 kg/m³ and heat capacity 1.005 kJ/(kg·K); no humidity, recirculation, CFD, thermal transients or compliance certification.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Mark exhaust-facing rack rears, approved containment/return routes and inlet measurement points. Coordinate modifications with qualified facilities and safety staff; no containment or live cooling change is executed here.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Hot aisle, Containment and Return path. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Validate inlet conditions and approved safety/access requirements rather than interpreting high contained-return temperature as an automatic server failure. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Supported orientation, return/separation, safety/access and measured inlet requirements. A colored aisle diagram alone is incomplete. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g4-t7 — Cold aisle

A cold aisle groups equipment inlet sides so conditioned supply can reach the intended heat-producing devices. It does not require a raised floor, and an aisle name or low room average does not prove every device receives a supported environment.

Calculation scope: Steady sensible heat balance with air density 1.2 kg/m³ and heat capacity 1.005 kJ/(kg·K); no humidity, recirculation, CFD, thermal transients or compliance certification.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Draw inlet-facing rack fronts, supply/return paths, approved containment and sensor positions. Specify exact equipment environmental limits separately; this course provides no universal safe temperature range.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Cold aisle, Supply path and Inlet distribution. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Measure across rack heights and loads and preserve approved work/access/fire requirements when altering the aisle. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Supported inlet distribution and original service after approved exact restoration. A room-average dashboard alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g4-t8 — Cable management

Cable management records and supports physical paths so connectivity, airflow and maintenance remain reproducible. Length/media/optic support, bend radius, strain relief, separation, endpoint identity and service movement all matter. A neat bundle can still combine both redundant paths into one failure domain.

Calculation scope: Check one proposed vertical interval against a fixed three-rack teaching elevation and 8 kW per surviving feed; excludes physical dimensions, mass, circuits and installation certification.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Produce a cable schedule and route diagram for the three-rack plan with A/B power, fabric and OOB paths separated by documented intent. Follow vendor and qualified facility separation/fire rules; the worksheet checks placement/capacity rather than physical cable certification.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Endpoint record, Route domain and Service allowance. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Trace redundant routes to shared trays/penetrations and preserve labeling at both ends so recovery restores intent rather than a merely lit link. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Correct endpoints/path and original service/policy results, with airflow restored. Link light alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g5-t0 — Out-of-band management

Out-of-band management gives administrators a supported management path separate from the workload operating system and intended production traffic dependencies. A BMC can remain usable while the host OS is stopped, but it still needs controller/standby power, a working upstream path, trusted endpoint and authorized operation.

Calculation scope: Declared controller standby/path/identity/permission/TLS conditions; host OS is deliberately independent. No actual iLO/iDRAC/CIMC, TLS or management network query.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Draw jump host → protected management ingress → OOB switch → assigned BMC, then document shared parents and permitted read/control operations. Preserve local recovery before any vendor network/role change; no BMC endpoint or privileged action is executed here.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using BMC, Dedicated path and Authorized operation. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Authentication, role permission, trusted transport, logging and emergency recovery remain distinct requirements even after management reachability succeeds. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Original authorized read/control scope, denied guest operation and exact restored path/roles with redacted audit. A healthy host OS is not that evidence. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g5-t1 — iLO

Integrated Lights-Out is HPE server management implemented by supported controller hardware/firmware. This lesson uses iLO 6 security guidance for architectural orientation; feature availability, dedicated/shared-port support, licenses and exact procedures depend on the server and release.

Calculation scope: Declared controller standby/path/identity/permission/TLS conditions; host OS is deliberately independent. No actual iLO/iDRAC/CIMC, TLS or management network query.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Inventory exact server, iLO generation, firmware, NIC mode and licensed functions through approved read-only management. Design role-scoped jump access and preserve local recovery before guided network/credential changes; no iLO session is run here.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using iLO generation, NIC mode and Feature entitlement. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Account roles, trusted transport, certificate/time context and audit retention govern the operation; a successful login does not authorize every function. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Original authorized operation, denied unprivileged operation and exact restored supported state. No actual vendor session is inferred from the worksheet. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g5-t2 — iDRAC

Integrated Dell Remote Access Controller is privileged management on supported PowerEdge servers. This lesson anchors security discussion to the iDRAC9 5.x guide; hardware, firmware, license and NIC-mode support must be checked for the actual server rather than inferred across every generation.

Calculation scope: Declared controller standby/path/identity/permission/TLS conditions; host OS is deliberately independent. No actual iLO/iDRAC/CIMC, TLS or management network query.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Record server model, iDRAC generation/firmware, NIC mode, supported feature/license and role design through approved read-only observation. Retain local recovery before any guided network/account change; no RACADM or iDRAC API command is executed.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using iDRAC version, Dedicated NIC and Read/control roles. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Identity roles, certificate trust, audit and feature entitlement determine permitted operations after a network path is established. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Supported version/role/path and original authorized/denied management operations after exact restore. No actual iDRAC execution is claimed here. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## s6-g5-t3 — CIMC

Cisco Integrated Management Controller provides privileged management for supported Cisco compute systems. Standalone CIMC management, UCS Manager and Intersight are distinct operational contexts; support and control ownership depend on the actual server, mode, firmware and integration.

Calculation scope: Declared controller standby/path/identity/permission/TLS conditions; host OS is deliberately independent. No actual iLO/iDRAC/CIMC, TLS or management network query.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Record exact server, CIMC firmware, standalone/integrated ownership and supported NIC mode. Use the release-specific guide to preserve an independent local recovery path before any guided management/role change; no CIMC CLI/API is executed.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using CIMC, Ownership mode and NIC mode. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Authentication/roles, trusted endpoint and audit govern each operation, while central integration can change where configuration ownership is consumed. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.

Verification: Correct ownership/version/path and original allowed/denied operation results after restore. The worksheet does not execute a Cisco management session. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

## lab-6 — Data Center Foundations Lab

The Data Center Foundations Lab designs three racks as one dependency system: elevations, independent full-load power paths, cooling/airflow, fabric/cable schedules, capacity and protected OOB access. Its deliverables are explicit classroom artifacts, while physical installation, power loss, cooling and vendor sessions remain guided external exercises.

Calculation scope: Check one proposed vertical interval against a fixed three-rack teaching elevation and 8 kW per surviving feed; excludes physical dimensions, mass, circuits and installation certification.

Read-only observation:
```text
sha256sum labs/data-center-workbook.md
```

- Produce the workbook three-rack elevations, A/B cord-to-source schedule, sensible cooling sheet, leaf-spine cable endpoints and protected OOB address/policy map. Run the optional offline owned plan rehearsal and keep its JSON validation distinct from actual service or physical observations.
- Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.
- Create a topology/evidence table using Elevation artifact, Capacity artifact and Recovery artifact. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.
- Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.
- For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Preserve allowed administrator read and denied guest access in the offline plan, introduce one owned feed-capacity fault, restore exact serialized baseline and verify declared design predicates again. No physical or vendor configuration is executed by selecting a browser case.
- Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.
- Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.
- Run python labs/data-center-plan.py --run for the offline JSON design validation and one-fault/exact-restore rehearsal. It creates only an owned temporary file directory, never actual racks, circuits, disks, VLANs or controllers.

Verification: All six design deliverables, reviewed calculations, offline fault/restore and explicit guided physical/vendor limits. No actual three-rack installation or live failover is claimed. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.

Cleanup: Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services.

