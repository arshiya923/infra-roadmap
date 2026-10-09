"""Primary-authored teaching and assessments. No acceptance is implied by generation."""
S=[]
SRC={
 'md':('Linux 6.6 MD array semantics','https://www.kernel.org/doc/html/v6.6/admin-guide/md.html'),
 'numa':('Linux 6.6 NUMA memory policy','https://www.kernel.org/doc/html/v6.6/admin-guide/mm/numa_memory_policy.html'),
 'memory':('Intel S2600WF memory population rules — platform example','https://www.intel.com/content/www/us/en/support/articles/000055509/server-products/server-boards.html'),
 'pcie':('PCI-SIG PCIe 3.0 encoding FAQ','https://pcisig.com/faq?field_category_value%5B%5D=pci_express_3.0'),
 'nvme':('NVM Express PCIe transport specification index','https://nvmexpress.org/specification/nvme-over-pcie-transport-specification/'),
 'sas':('Seagate SAS interface manual — historical protocol reference','https://www.seagate.com/staticfiles/support/disc/manuals/Interface%20manuals/100293071c.pdf'),
 'fabric':('Cisco scalable leaf-spine design','https://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/white-paper-c11-743245.html'),
 'redfish':('DMTF Redfish standard and implementation resources','https://www.dmtf.org/standards/redfish'),
 'ilo':('HPE iLO 6 security guidelines','https://support.hpe.com/hpesc/public/docDisplay?docId=sd00002198en_us&docLocale=en_US&page=GUID-C93876C5-7709-41CF-A9E8-0FD8438255A9.html'),
 'idrac':('Dell iDRAC9 5.x security configuration guide','https://www.dell.com/support/manuals/en-uk/idrac9-lifecycle-controller-v5.x-series/idrac9_security_configuration_guide/overview?guid=guid-a509a6da-8e73-419b-afc9-897e4122fc00&lang=en-us'),
 'cimc':('Cisco standalone compute hardening guide','https://www.cisco.com/c/en/us/products/collateral/servers-unified-computing/compute-security-hardening-guide-standalone-wp.pdf'),
 'ups':('APC UPS selection — W versus VA and runtime','https://www.apc.com/us/en/support/product-support/ups-buying-guide-for-selecting-a-battery-backup-system.jsp'),
 'cooling':('Schneider Electric containment measurements — historical study','https://blog.se.com/datacenter/2019/04/25/results-are-in-our-study-measuring-the-different-levels-of-data-center-air-containment/'),
 'pcie45':('PCI-SIG Gen4/5 lane signaling rates','https://pcisig.com/blog/pushing-limits-understanding-lane-margining-pcie%C2%AE')}
def add(id,kind,definition,mechanisms,operation,security,performance,terms,command,sources,questions):
 qs=[line.split('|') for line in questions.strip().splitlines()];assert len(qs)==10 and all(len(q)==3 for q in qs),id
 S.append(dict(id=id,kind=kind,definition=definition,mechanisms=mechanisms.split('|'),operation=operation,security=security,performance=performance,terms=[t.split('~') for t in terms.split('|')],command=command,sources=sources.split(','),questions=qs))

add('s6-g0-t0','platform',
'Server hardware is a service dependency chain: processors execute work, local memory holds working state, adapters move data, storage persists it, and firmware, power and cooling make those components usable. Inventory includes replaceable units, attachment paths and shared chassis risks rather than only total cores and disk terabytes.',
'Trace request → NIC → DMA buffers → CPU → storage completion; a detected adapter does not prove a completed transaction.|Firmware discovers devices and exposes topology; the OS driver and application must consume the correct interface and supported firmware combination.|Redundant PSUs survive only within their ratings and upstream failure domains; fan and memory health can reduce usable capacity before complete failure.',
'Map one workload to its physical and logical dependencies. Record chassis identity, firmware release, processor sockets, populated memory, adapter location, disk-to-slot mapping and observed load before deciding which spare or maintenance window is appropriate.',
'Secure the controller and firmware update path as privileged infrastructure. Export inventory without serial-to-customer mappings or credentials; test access through the authorized management boundary.',
'Measure the limiting resource under representative work. CPU utilization alone misses queueing, remote memory, PCIe bottlenecks and thermal throttling; nameplate power is not a workload measurement.',
'Inventory~Installed components and attachment map~Discovery does not certify health.|Telemetry~Observed health and resource counters~Correlate timestamp and sensor meaning.|Service test~Original user operation~Checks the assembled dependency path.',
'lscpu','memory,redfish',
'''An inventory lists two PSUs. What observation is still needed for feed resilience?|Trace each cord through independent upstream capacity and retest the required service after a scoped loss.|Two replaceable supplies can share one PDU or UPS.
A NIC appears in inventory but requests fail. What is the next evidence boundary?|Driver, link, addressing, route and application response at the intended client.|Presence is discovery evidence, not transaction evidence.
Both CPU sockets exist but one lacks supported DIMMs. What should be checked?|The platform population map and usable local memory per socket.|Socket count does not establish balanced memory access.
After a firmware update storage disappears. What baseline matters?|Controller mode, firmware compatibility, device identity and boot configuration.|A boot change can alter discovery without a disk failure.
The host reports thermal throttling while idle temperature looks normal. What evidence helps?|Time-correlated inlet, fan, CPU frequency and workload telemetry.|A single later temperature sample misses the triggering condition.
A spare controller has the same connector. Is replacement compatibility proven?|No; validate model, firmware, metadata format and cache protection.|Physical fit does not imply a readable array.
The application is slow at 20% CPU. Name another bottleneck to inspect.|Memory locality, I/O queue latency or network/PCIe capacity.|Aggregate CPU use hides stalled work.
What is the smallest useful hardware failure-domain diagram?|Workload dependencies with shared power, chassis, controller and fabric parents.|Duplicated parts can depend on one shared parent.
Why preserve serial-to-slot mapping before maintenance?|It prevents replacing a healthy component mistaken for the failed one.|Logical device names and physical bays can differ.
What verifies recovery after replacing an owned component?|Health evidence plus the original service and preserved data integrity.|A cleared alert alone is incomplete recovery evidence.''')

add('s6-g0-t1','rack',
'A rack server is a self-contained chassis mounted in standardized vertical rack space. Its rack-unit height describes vertical allocation, not depth, rail compatibility, weight, cooling direction or power demand. Rails, service clearance and cord reach are part of the supported installation.',
'Translate chassis height into an inclusive U interval and check occupied intervals before mounting.|Follow front inlet to rear exhaust and preserve cable-arm travel so maintenance does not block airflow or pull connectors.|Trace both PSU cords beyond the rack outlets and reserve capacity on the surviving feed for the entire load.',
'Produce an elevation with numbered U positions, asset identity, front/rear orientation, depth, mass and service clearances. Use manufacturer rails and lifting procedures; the classroom elevation calculation does not authorize physical installation.',
'Lock physical and console access and retain asset ownership. A locked rack does not secure an exposed BMC network or a forgotten virtual-media session.',
'Density is constrained by power, thermal removal, port counts and access as well as spare U positions. Empty rack space cannot compensate for an overloaded feed.',
'U interval~Vertical occupied positions~A 2U device at U5 occupies U5 and U6.|Rail envelope~Supported depth and service travel~Check vendor kit and cabinet compatibility.|Feed path~Cord to upstream supply~Distinct outlets may share the same circuit.',
'sha256sum labs/data-center-workbook.md','redfish,cooling',
'''A 2U chassis starts at U5. Which positions are occupied?|U5 and U6.|Intervals include both endpoints.
A new 3U device starts at U41 in a 42U rack. Does it fit?|No; its last position would be U43.|Vertical fit uses start plus height minus one.
Two devices both include U12. Is the elevation valid?|No; their intervals overlap.|Different front labels do not remove physical overlap.
There are 20 free U but the B feed cannot carry full rack load. What constrains expansion?|Surviving-feed power capacity.|Available height is only one constraint.
Does a 1U designation prove the server fits a shallow rack?|No; depth, rails and cable clearance require separate checks.|Rack-unit height says nothing about depth.
What should be verified before sliding a powered chassis for service?|Cable-arm movement, cord slack, airflow and supported service procedure.|A rail motion can interrupt power or data.
Where should a heavy chassis generally be considered in planning?|Low positions subject to the cabinet and installation instructions.|Stability and rated loading matter beyond unused U.
Why label both ends of an uplink before a server replacement?|To restore the exact attachment without guessing from link LEDs.|A lit wrong port can still break the service.
A rack is locked but BMC HTTPS is Internet reachable. Is access controlled?|No; management requires its own network and identity policy.|Physical and logical boundaries are independent.
What evidence should complete an elevation review?|No overlaps, supported dimensions/loading, documented feeds and service clearance.|A neat drawing alone is not an installation validation.''')

add('s6-g0-t2','platform',
'Blade servers separate compute modules from a shared enclosure containing power, cooling, interconnects and management. Module redundancy and dense cabling can improve operations while enclosure power, midplane, firmware and interconnect dependencies enlarge the shared failure domain.',
'Map each blade CPU/memory to mezzanine adapter → enclosure interconnect → external fabric; slot identity and port mapping determine the actual path.|Enclosure power allocation and fan policy decide whether inserted hardware can operate at full capacity; spare slots do not establish available watts.|Firmware and management coordinate module discovery; two blades in one enclosure do not survive every enclosure-level incident.',
'Draw module and enclosure dependencies before placing replicas. Validate supported interconnect, adapter, firmware and power combinations and retain a tested independent management path before any chassis maintenance.',
'Enclosure management can affect many blades at once. Apply separate privileged roles, firmware provenance and audit retention; avoid treating the management module as a low-impact switch.',
'Compare usable compute and uplink capacity after a power/interconnect loss. Shared uplinks and chassis thermal limits can constrain many workloads concurrently even when every blade is healthy.',
'Blade~Compute module~Depends on enclosure services.|Enclosure~Shared power/cooling/management~Creates correlated failures.|Interconnect~Module-to-fabric boundary~Port and mode mapping require validation.',
'lscpu','memory,redfish',
'''Two application replicas occupy blades in the same enclosure. Which risk remains?|An enclosure power, midplane or shared management failure.|Replicas are not independent just because compute modules differ.
Empty blade slots are available. Can additional modules be approved from slot count alone?|No; check power allocation, cooling, licensing and interconnect capacity.|Mechanical space does not imply service capacity.
A mezzanine NIC is detected but external traffic fails. What mapping must be traced?|Blade slot and adapter port through the actual interconnect uplink.|Discovery does not validate fabric mapping.
One interconnect is removed. What distinguishes redundancy from usable resilience?|Surviving paths must carry the required load and the service must recover.|A second path can lack capacity or correct policy.
Why record enclosure firmware before replacing a blade?|Supported module, interconnect and management combinations may depend on release.|Matching connector shapes do not guarantee compatibility.
An enclosure administrator can mount remote media on every blade. What security boundary is affected?|Privileged access to the whole enclosure workload domain.|Management privileges can bypass guest OS controls.
What placement improves protection from one enclosure outage?|Replicas across independently powered enclosures with tested dependency paths.|Physical distribution needs independent shared parents.
A blade has two NICs mapped to one interconnect. Is interconnect diversity present?|No; both adapters share that parent.|Adapter count does not identify failure domains.
Why compare cable density with fault impact rather than only cable count?|Fewer cables can concentrate traffic and failures on shared trunks.|Operational convenience may hide correlated risk.
What completes a blade failover rehearsal?|Timestamped path and original-service evidence with exact restore and scoped cleanup.|A management success message alone is insufficient.''')

add('s6-g0-t3','platform',
'Server CPU architecture includes instruction-set compatibility, cores, simultaneous multithreading, caches, memory controllers and socket interconnects. A logical processor is a scheduling context; it does not automatically provide a second core worth of execution resources.',
'Instructions pass through caches and execution resources shared to different degrees; stalls can leave runnable work without useful throughput.|Firmware topology becomes OS sockets, cores and logical processors; virtualization may expose a topology different from the physical host.|Socket-local memory and I/O attachments shape access latency, so placement and frequency under sustained load matter alongside core count.',
'Record architecture, sockets, cores, threads, supported instruction features and topology from the actual observer. Compare a representative workload before changing affinity, power policy or virtual CPU sizing.',
'Microcode and firmware support, workload isolation and privileged performance tooling require controlled ownership. Masking a CPU feature for compatibility can affect both security controls and application behavior.',
'Use throughput and latency with workload concurrency and sustained frequency. GHz, advertised boost and logical-thread count are poor substitutes for measured work per unit time.',
'Core~Execution resources~Can host multiple logical threads.|Logical CPU~OS scheduling context~May share a core.|Socket~Processor attachment and locality~Can contain several NUMA domains.',
'lscpu','numa,memory',
'''A server has 2 sockets, 8 cores per socket and 2 threads per core. How many logical CPUs are exposed if all are enabled?|32 logical CPUs.|Multiply sockets, physical cores and enabled threads.
Does 32 logical CPUs mean 32 independent physical cores?|No; this example has 16 cores.|SMT contexts share execution resources.
Why might a newer 2.5 GHz CPU outperform an older 3 GHz CPU?|Instruction work per cycle, caches, vector support and workload behavior differ.|Frequency alone is not a throughput comparison.
A VM reports one socket. Does that prove the host has one socket?|No; the hypervisor can present virtual topology.|Observer identity matters for hardware conclusions.
What should be checked when a binary faults on an unsupported instruction?|Exposed ISA features and the binary target requirements.|A nominal CPU family label may omit feature masking.
Why can oversized vCPU allocation hurt a latency-sensitive workload?|Scheduling contention and cross-locality access can increase delay.|More runnable contexts do not guarantee more completed work.
An all-core workload runs below advertised single-core boost. Is failure established?|No; compare sustained frequency, power and thermal limits under that workload.|Boost conditions vary with concurrency.
What evidence separates CPU saturation from I/O wait?|Runnable queues, scheduling time and transaction/I/O latency.|A utilization aggregate loses stall context.
Can one processor socket contain multiple NUMA nodes?|Yes on supported architectures and firmware modes.|Socket and NUMA node are different abstractions.
What verifies an affinity change helped?|Same-workload latency/throughput comparison plus regression and exact rollback evidence.|A changed CPU mask is intent rather than benefit.''')

add('s6-g0-t4','memory',
'Memory channels are independent data paths from a processor memory controller to DIMMs. Capacity, populated channels, DIMMs per channel, supported transfer rate and reliability mode are separate dimensions. The slot order and allowed combinations are platform specific.',
'Populate the documented primary slots across channels before assuming a balanced arrangement; channels with no DIMMs contribute no bandwidth.|Compute a theoretical data envelope from active channels × transfers per second × data bytes per transfer; exclude ECC bits from useful data width.|More ranks or DIMMs can change supported transfer rate and contention; ECC and spare/mirror modes change capacity or reliability without proving workload speed.',
'Build a per-socket channel/slot table with DIMM type, size, rank, rated and negotiated transfer rate. Use the exact server population guide; the Intel example demonstrates specificity, not a universal slot sequence.',
'Treat memory error telemetry and firmware reliability settings as integrity evidence. Sanitize retired DIMMs through an approved lifecycle process and protect crash dumps that can contain application secrets.',
'The worksheet uses 64 data bits per transfer and decimal GB/s. It excludes controller efficiency, rank timing, refresh and application locality; measure sustained performance rather than advertising the sum as an achieved rate.',
'Capacity~Bytes addressable~Not the same as bandwidth.|Channel~Independent data path~Needs supported population.|MT/s~Transfers per second~Not a CPU clock frequency.',
'lscpu','memory,numa',
'''Four populated 64-bit channels run at 3200 MT/s. What is the theoretical data envelope?|102.4 decimal GB/s.|Four times 3200 million transfers times eight useful bytes.
Two 32 GB DIMMs populate one channel. Does that create two channels?|No; they share the one channel data path.|DIMM count and channel count differ.
Why use negotiated rather than label transfer rate?|Population and controller rules may reduce the actual supported rate.|A faster DIMM label does not determine the bus rate.
Does ECC make the worksheet data width 72 useful bits?|No; the worksheet counts 64 data bits and excludes protection bits.|ECC bits are not application payload.
Can an empty channel contribute to the calculated envelope?|No.|Only populated supported active channels carry the declared data.
What is wrong with a universal rule to fill slot A1 first on every server?|Slot identifiers and population orders are model specific.|Consult the exact hardware guide.
What changes when a reliability mode reserves or mirrors memory?|Usable capacity and sometimes performance behavior.|Installed bytes do not necessarily equal usable bytes.
Why might twice the DIMMs not double application throughput?|Shared channels, lower transfer rate, access pattern and locality.|Capacity expansion is not a guaranteed bandwidth expansion.
What table should accompany a memory upgrade?|Socket, channel, slot, DIMM attributes and negotiated rate.|An aggregate GB total hides imbalance.
How should the 102.4 GB/s result be described?|A theoretical useful-data envelope, not a benchmark.|Protocol/controller/workload effects are excluded.''')

add('s6-g0-t5','numa',
'Non-uniform memory access describes systems where access cost depends on the relationship between an executing CPU and the memory node holding data. Local allocation, CPU placement, allowed-node policy and device locality must be considered together; NUMA node identity is not necessarily socket identity.',
'The scheduler selects an execution CPU while allocation policy and first touch influence page placement; moving a thread does not automatically move its pages.|Remote access traverses an interconnect and can add latency and consume shared bandwidth; local capacity shortages or policies can cause fallback.|Device interrupts and DMA buffers also have locality, so a workload may pay for remote memory even when its CPU utilization looks balanced.',
'Record CPU-to-node topology and the workload allowed/allocated nodes from the actual OS or hypervisor. Compare representative latency before changing placement and retain the old affinity/policy for exact recovery.',
'Avoid granting unrestricted affinity or memory policy tooling to untrusted users. Core/node placement is not a complete isolation control; review shared caches, memory ownership and virtualization boundaries.',
'The arithmetic worksheet uses supplied local/remote latencies and access fraction. Its weighted mean is not a measured response time: queueing, caches, parallel accesses and migration are excluded.',
'Execution node~CPU locality~Thread placement can change.|Memory node~Page locality~May differ from execution.|Allocation policy~Allowed/preferred placement~Subject to availability and OS semantics.',
'lscpu','numa',
'''Local latency is 80 ns, remote is 140 ns and 25% of declared accesses are remote. What is the weighted mean?|95 ns.|0.75 times 80 plus 0.25 times 140.
Does moving a thread to another CPU necessarily move its existing memory pages?|No.|Scheduling placement and page allocation are separate mechanisms.
Can a process with local preference allocate remotely?|Yes when policy semantics and local availability allow fallback.|Preference is not an unconditional reservation.
Why record cpuset restrictions alongside NUMA policy?|Administrative allowed-node boundaries can constrain allocation.|Policy operates within permitted resources.
A NIC attaches near node 0 but workers run on node 1. What cost should be investigated?|Remote DMA-buffer and interrupt/processing locality.|Device paths participate in NUMA behavior.
Does a NUMA node always equal a processor socket?|No.|Firmware and processor designs can expose several nodes per socket.
What does first touch help explain?|Page allocation may follow the node of the task that first faults a page under the applicable policy.|Later worker placement may differ from initialization placement.
Why can strict placement hurt a workload?|Capacity pressure or reduced scheduling flexibility can offset locality benefits.|Locality tuning needs workload evidence.
Can the weighted mean establish application p99 latency?|No.|Averages exclude distributions, queueing and overlap.
What verifies a NUMA policy rollback?|Original policy/affinity plus the original workload and allocation observations.|A mask restored in configuration may not move existing pages.''')

add('s6-g0-t6','pcie',
'A server NIC bridges host memory/driver queues and a network link. Port speed, PCIe attachment, queue distribution, DMA locality and actual protocol overhead jointly constrain service. Multiple ports do not inherently provide path diversity or one-flow aggregation.',
'The driver posts descriptors and buffers; the adapter exchanges data using DMA and signals completion through interrupts or polling.|A negotiated PCIe generation and lane width bound host-side transfers independently of Ethernet link rate.|Queue placement, RSS and offloads influence CPU cost and locality; bonding behavior and switch attachment determine failure and traffic distribution.',
'Map each NIC port to PCIe slot, negotiated width, driver, firmware, switch port and failure domain. Compare intended host-to-network demand with both link and PCIe envelopes, then verify a representative original service.',
'Protect firmware provenance and DMA isolation where supported. Do not assume an offload or virtual function inherits every host policy; document ownership and attachment constraints.',
'The worksheet uses PCIe Gen3/4/5 encoded-bit envelope per direction and supplied demand. It excludes PCIe transaction and Ethernet overhead, queue limits, CPU work and actual traffic throughput.',
'Ethernet rate~Network link envelope~Not host-side capacity.|PCIe width~Negotiated lane count~May be lower than slot size.|Queue locality~Processing placement~Can affect CPU and memory costs.',
'lscpu','pcie,pcie45,numa',
'''A Gen3 x4 NIC carries two nominal 25 Gb/s ports. Is its host-side encoded envelope 50 Gb/s?|No; it is about 31.51 Gb/s per direction before transaction overhead.|Network labels can exceed host attachment capacity.
Does a physical x16 slot prove x16 electrical attachment?|No.|Slot size and negotiated lanes differ.
Why might a single flow use only one bonded member?|Hash-based distribution often selects one member per flow.|Aggregate link rate is not a one-flow promise.
Two NIC ports connect to one switch. What failure domain remains?|That shared switch and its upstream power/control dependencies.|Port duplication does not diversify parents.
What does an interrupt counter prove?|Interrupt events at that observer, not completed application work.|Offloads or polling can change the relationship.
Why inspect NUMA locality for a high-rate NIC?|Remote buffer and worker access can constrain processing.|The host path includes memory placement.
A virtual function bypasses a host bridge policy. What should be reviewed?|Actual enforcement location and the VF attachment security contract.|A host policy name does not prove consumption.
Why compare driver and firmware versions together?|Supported combinations and defects affect behavior.|An installed version alone does not certify compatibility.
What remains unmeasured after the PCIe calculation?|Transaction overhead, queues, CPU cost and end-to-end throughput.|The result is an upper envelope.
What completes a NIC recovery rehearsal?|Restored attachment/settings and original service plus prohibited-path checks.|A link LED alone is insufficient.''')

add('s6-g0-t7','platform',
'A host bus adapter connects host I/O to a storage transport such as SAS or Fibre Channel. HBA identity and topology differ from a RAID controller exposing virtual disks. An adapter, an available target and authorized storage access are distinct boundaries.',
'Host driver submits I/O through queues and DMA; the adapter maps requests to its transport and attached targets.|Target discovery follows actual cabling and transport rules; SAS addressing and FC WWPN/zoning are not interchangeable concepts.|Pass-through or RAID mode changes which identity and metadata the OS sees, while multipath requires distinct end-to-end usable paths.',
'Record HBA mode, firmware, target identity, slot/cable path and logical-to-physical mapping without creating or importing arrays. Preserve data ownership and the supported recovery method before changing a controller.',
'Storage authorization belongs at actual target/fabric boundaries and management roles. Discovery of a disk does not grant permission to overwrite it; avoid exporting WWPN-to-tenant mappings casually.',
'Queue depth, negotiated transport, PCIe width and shared expanders bound work. More paths can improve resilience without doubling performance, and a target can remain the common bottleneck.',
'HBA~Transport adapter~May expose individual devices.|RAID controller~Array mapping engine~Can expose logical volumes.|Multipath~Multiple paths to one target~Needs path identity and policy.',
'lsblk -o NAME,TYPE,SIZE','sas,md',
'''An HBA discovers a target. Does that establish application read permission?|No.|Transport discovery is separate from storage and application authorization.
Why record controller mode before replacing an adapter?|RAID and pass-through modes expose different device identities and metadata paths.|A matching adapter can still change the OS view.
Do two cables through one expander remove expander risk?|No.|The expander remains a shared parent.
What identifies a Fibre Channel adapter port for zoning?|Its WWPN in the intended fabric context.|SAS addressing is a different transport mechanism.
Does an HBA always perform hardware RAID?|No.|Transport adaptation and array mapping are different roles.
Why map a logical disk to physical slot before maintenance?|OS names can change and do not reliably name the bay.|Wrong-slot removal can turn a degraded array into data loss.
What should be checked before exposing a disk directly to an OS?|Ownership, supported mode, metadata and intended read-only discovery procedure.|Visibility does not authorize initialization.
Can multipathing guarantee twice the target throughput?|No.|Path policy and shared target resources may limit throughput.
What additional link can constrain a fast HBA?|The negotiated host PCIe attachment.|Transport speed alone misses host-side constraints.
What is sufficient recovery evidence after a path repair?|The original target identity, usable paths and original application I/O.|An adapter health flag alone is not enough.''')

add('s6-g0-t8','pcie',
'PCI Express is a point-to-point host interconnect negotiated by generation and lane width. Each lane supports simultaneous directions, but a one-direction workload must be compared to the one-direction envelope rather than a marketing total that sums both directions.',
'Root complex and device train a link at a mutually supported generation and electrical width; a larger mechanical connector can carry fewer lanes.|For Gen3/4/5 the worksheet applies 128b/130b encoding to 8/16/32 GT/s per lane; transaction, flow-control and software overhead remain excluded.|Switches, shared upstream lanes, bifurcation and CPU attachment create additional capacity and locality boundaries beyond the endpoint slot.',
'Record the negotiated endpoint and every shared upstream attachment. Compare one-direction demand with a correctly unit-labelled encoding envelope; validate actual device support before changing slot or bifurcation settings.',
'Use supported firmware and DMA protection policy. Moving an adapter can change isolation groups and device identity; treat the new attachment as a reviewed boundary rather than an equivalent empty slot.',
'The worksheet intentionally excludes Gen6 FLIT/PAM4/FEC semantics. Its Gen3/4/5 arithmetic is neither a transaction payload benchmark nor a promise that a switch upstream link can carry all downstream endpoints at once.',
'GT/s~Lane transfers per second~Different from useful bytes per second.|Lanes~Negotiated parallel links~Electrical width matters.|Payload throughput~Completed useful data~Lower than raw encoding envelope.',
'lscpu','pcie,pcie45,nvme',
'''What is the Gen3 x4 encoded envelope per direction?|About 31.51 Gb/s or 3.94 decimal GB/s.|Four times 8 times 128 divided by 130; bytes divide by eight.
Should both directions be added when checking a one-way stream?|No.|Full duplex directions are independent.
A Gen4 card negotiates Gen3 x8. Which parameters belong in the calculation?|Gen3 and eight lanes.|Negotiated attachment governs the envelope.
Does x16 printed beside a connector guarantee sixteen active lanes?|No.|Mechanical and electrical dimensions can differ.
What bounds several devices behind a PCIe switch?|Their shared upstream link as well as each endpoint link.|Independent endpoint calculations miss aggregation.
Can Gen5 encoding arithmetic be copied directly to Gen6?|No.|Gen6 uses different signaling and FLIT/FEC behavior.
Why do payload benchmarks fall below the encoding result?|Transaction/control overhead and device/software limitations consume capacity.|Encoding is only one overhead layer.
What does bifurcation change?|How a supported lane group is split among endpoints.|It requires platform and device support.
Why inspect attachment locality after moving a card?|CPU/NUMA proximity and isolation grouping may change.|An empty slot is not necessarily an equivalent path.
What evidence verifies a slot change helped?|Negotiated topology plus same-workload measurements and exact recovery record.|An increased width does not alone prove application benefit.''')

add('s6-g1-t0','raid',
'RAID combines members into a logical storage layout with explicit capacity and failure-pattern semantics. Redundancy protects against selected member losses, while backups and tested restore protect from deletion, corruption and broader failure domains. A survivable layout is not proof of readable application data.',
'Striping places logical ranges across members; mirroring copies them and parity stores reconstruction information.|Count failed members and, for pair-based RAID10, locate each failed member in its mirror pair before deciding survivability.|The array metadata, controller, cache state, filesystem and application remain separate dependencies; rebuilding consumes resources and does not restore an independent backup.',
'Document level, layout, active members, smallest usable member size, failure domains and restore method. Compare nominal capacity and every relevant failure pattern without creating arrays or forcing assembly on host disks.',
'Do not substitute RAID for immutable/offline recovery or encryption. Preserve metadata and disk identities securely; destructive create/import/force commands are outside these classroom labs.',
'Capacity arithmetic excludes metadata and filesystem reservations. Random write behavior, stripe alignment, cache protection, rebuild load and workload shape matter more than a universal fastest-level ranking.',
'Nominal capacity~Layout-derived usable bytes~Excludes metadata and formatting.|Survivability~Declared member-loss relation~Does not prove integrity.|Backup~Independent recoverable copy~Must be restore-tested.',
"if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi",'md',
'''Six equal 2 TB members use RAID6. What is nominal capacity?|8 decimal TB.|Two member-equivalents are reserved for dual parity.
Can RAID protect a file deleted by an authorized application?|No independent prior copy is guaranteed.|The deletion is propagated through the layout.
Two members fail in pair-based RAID10. What information is essential?|Whether both belong to the same mirror pair.|Count alone does not establish survivability.
An array is online after a fault. What still requires verification?|Original data integrity and application operations.|Online metadata is weaker than end-to-end recovery evidence.
Why use the smallest usable member size in equal-member arithmetic?|Each stripe/copy requires a supported common component capacity.|Larger-member excess may be unused.
Can a hot spare increase current parity tolerance?|No.|It is a replacement resource, not an extra completed parity copy.
What should be recorded before replacing a disk?|Array UUID, member identity, physical slot and supported recovery procedure.|Device names can change across boots.
Why is forced assembly excluded from the introductory lab?|It can expose stale or inconsistent data and affect owned storage.|A command that bypasses safeguards is not a harmless observation.
Does redundancy in one enclosure protect from enclosure destruction?|No.|The layout shares that physical domain.
What constitutes a complete RAID recovery plan?|Member mapping, supported replacement, integrity checks and independent restore test.|Capacity and healthy flags alone are insufficient.''')

add('s6-g1-t1','raid',
'Hardware RAID presents controller-managed logical volumes while hiding some member details from ordinary OS enumeration. Array metadata compatibility, controller firmware, cache protection and supported import/replacement procedures determine whether an acknowledged write survives failure.',
'The controller maps logical requests to its declared layout and may acknowledge writes using a cache; durability depends on protected cache and flush semantics.|Controller-specific tools expose members, virtual volumes and cache health; OS disk count may represent logical volumes rather than physical members.|A replacement must interpret the metadata and preserved cache state correctly; matching RAID level names do not certify controller interchangeability.',
'Build a read-only controller/member/volume inventory and verify cache-protection health through the supported management tool. Preserve a known restore path before any adapter, firmware or battery/capacitor maintenance.',
'Controller administration can initialize or delete many disks at once. Apply privileged access and firmware provenance and keep destructive operations out of routine monitoring scripts.',
'Protected write-back can change latency; loss of protection may trigger write-through and a deliberate performance reduction. Do not disable that safety behavior to make a dashboard look faster.',
'Virtual volume~Controller logical device~May hide physical members.|Protected cache~Retained acknowledged writes~Depends on supported hardware health.|Import~Metadata interpretation~Requires exact compatibility.',
'lsblk -o NAME,TYPE,SIZE','md,redfish',
'''The OS lists one disk backed by eight members. What is likely being enumerated?|A controller logical volume.|OS device count need not equal physical disk count.
Write latency rises after cache-protection failure. What safe hypothesis should be checked?|The controller may have switched to write-through.|Protection failure can intentionally alter acknowledgment behavior.
Is a same-level RAID controller automatically a compatible replacement?|No.|Metadata formats, firmware and cache state may differ.
What must survive for cached acknowledged writes to be recoverable?|The supported protected-cache data and its recovery path.|A healthy disk set does not recover lost volatile cache.
Why should routine inventory scripts avoid import and initialize commands?|They can mutate metadata or destroy data.|Observation and configuration are different scopes.
Can hardware RAID replace a tested backup?|No.|Corruption and deletion can reach every member.
What maps a failed controller member to the replaceable disk?|Controller member identity and physical slot record.|Logical volume names do not identify bays.
Why retain firmware release with array evidence?|Supported tools and recovery semantics can be release specific.|Generic product names are not enough.
Should cache protection be bypassed to regain benchmark speed?|No; restore supported protection and assess risk first.|Fast acknowledgment without durability is a different contract.
What validates hardware RAID recovery?|Supported volume/member health plus integrity and original application tests.|A green controller icon is insufficient.''')

add('s6-g1-t2','raid',
'Software RAID implements an array in the host storage stack, such as Linux MD. Host CPU and memory participate, while persistent metadata and the boot/initramfs configuration allow the correct members to be assembled. Software RAID is not synonymous with an unprotected or automatically portable array.',
'The host array driver maps logical blocks to members according to level and layout; the filesystem remains above that logical device.|Metadata associates member identities and roles, and degraded/dirty conditions affect safe assembly behavior.|Boot dependencies must discover and assemble the correct array before required filesystems or services start; monitoring must retain member and resync state.',
'Observe /proc/mdstat and block-device topology only. Document UUID, metadata version, layout, boot dependencies and independent backup; use disposable owned images for any later array creation rather than a host disk.',
'Restrict administration of raw block devices and avoid auto-assembling unknown members. Force options that override degraded/dirty safeguards require a separate recovery decision and are not included here.',
'Parity work, resync, device latency, cache/flush behavior and CPU resources jointly affect service. A modern CPU can handle substantial work, but no universal overhead percentage is asserted.',
'MD device~Host-managed logical array~Separate from its filesystem.|Metadata~Member and layout identity~Needed for correct assembly.|Resync~Consistency/reconstruction work~Consumes shared I/O resources.',
"if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi",'md',
'''Does a software RAID array depend on the host storage stack?|Yes.|Array mapping executes in that stack.
What does /proc/mdstat establish?|The local kernel reported array/member and activity state at that time.|It does not inspect a remote hardware controller or certify file integrity.
Why include array assembly in boot planning?|A required filesystem may depend on the array being available before services start.|Runtime health alone misses boot dependencies.
Can an unknown member be safely force-assembled from its device name alone?|No.|Identity, metadata and consistency must be established.
Does software RAID eliminate cache durability concerns?|No.|Drive/controller caches and flush semantics still matter.
What identifies an array more reliably than a transient md device number?|Its recorded metadata UUID and member identities.|Enumeration can change.
Why distinguish filesystem errors from array-member health?|The filesystem can be corrupt on a mechanically healthy layout.|Layer-specific evidence prevents inappropriate disk replacement.
Does a resync progress percentage predict exact completion time?|No.|Workload and device rates can change.
What limits claims of universal CPU overhead?|Parity/layout, hardware, queueing and workload differences.|No fixed percentage covers every system.
What verifies software RAID recovery?|Correct assembly/layout, original integrity and service tests plus independent restore evidence.|A completed resync alone is incomplete.''')

add('s6-g1-t3','raid',
'RAID0 stripes data over members without redundant copies or reconstruction parity. It can aggregate nominal capacity and distribute work, but any missing member breaks the complete logical dataset. A recoverable workload on RAID0 needs an independent durable source.',
'Logical stripes alternate among members; each member owns data ranges unavailable elsewhere in the layout.|The nominal equal-member capacity is N times S before metadata/filesystem costs.|One missing member makes the modeled complete array unavailable; an empty spare contains no copy of that missing data.',
'Use the worksheet to compare capacity and a single-member loss. Limit any target exercise to disposable images containing reproducible scratch data and never initialize a discovered host disk.',
'RAID0 offers no member-loss integrity protection and is not a backup. Apply storage access controls and data classification even when contents are described as temporary.',
'Striping can increase aggregate sequential work if independent members and upstream paths allow it; one bottleneck and random workload behavior can prevent linear scaling.',
'Stripe~Distributed logical range~No duplicate in RAID0.|Member loss~Missing data ranges~Breaks the complete array.|Scratch data~Reproducible working data~Needs a retained source.',
"if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi",'md',
'''Four equal 2 TB members use RAID0. What is nominal capacity?|8 decimal TB.|All four member capacities contribute without redundancy.
One member fails. Can the complete dataset be reconstructed from the layout?|No.|Missing stripes have no duplicate or parity.
Can an empty spare repair the missing member data?|No.|A spare is not a previously written copy.
Why might RAID0 be acceptable for some scratch workloads?|The data can be reproduced from a retained durable source and downtime is acceptable.|That is a workload recovery decision, not RAID protection.
Does doubling members guarantee twice the application rate?|No.|Shared paths and workload behavior can limit scaling.
Can files unaffected by a failure be assumed safe without checking the filesystem?|No.|Filesystem metadata and file extents may span members.
What should be preserved before a disposable stripe experiment?|The reproducible data source and exact owned-image identities.|Do not rely on the array itself for recovery.
Is RAID0 suitable as the only copy of an irreplaceable dataset?|No.|Any member loss can destroy the logical dataset.
What changes if one member is larger in the simplified equal-component model?|Only the common usable size is counted.|The worksheet does not allocate unequal extras.
What verifies recovery after rebuilding scratch storage?|Reproduction from the source and original integrity/application tests.|A newly empty healthy array is not recovered data.''')

add('s6-g1-t4','raid',
'RAID1 mirrors logical data across members. In the worksheet it is explicitly an N-way mirror: nominal capacity equals one common member and the complete data remains reconstructible while at least one member survives. Two separate mirrored pairs would instead be a different nested layout.',
'Each logical block has a copy on every member in this N-way teaching model; writes and acknowledgment follow the actual implementation contract.|Failure removes copies rather than unique stripes, but surviving media errors or propagated corruption can still defeat recovery.|Replacing a member requires a completed synchronization before that new member is counted as a complete independent copy.',
'Record mirror membership and the actual copy layout. Compare all-member versus partial-member loss and preserve an independent backup; do not describe four-way mirroring as two pairs.',
'Deletion, ransomware and application corruption can be mirrored consistently. Isolation and restore-tested independent versions remain necessary; redundancy is not a history of correct data.',
'Read distribution and write acknowledgment are implementation specific. The usable-capacity calculation does not assert that N copies yield N times read throughput.',
'Mirror copy~Same logical blocks~Not historical versioning.|N-way mirror~All members hold the dataset~Capacity is one common member.|Synchronization~Build a complete new copy~Not instantaneous on insertion.',
"if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi",'md',
'''Four 2 TB members form the declared N-way RAID1. What is nominal capacity?|2 decimal TB.|Every member duplicates the same logical data.
Three of those four members fail. What is the idealized layout outcome?|Reconstructible from the remaining complete member.|The model assumes that surviving member data is intact.
Is four-way RAID1 the same as two striped mirror pairs?|No.|Striped pairs are the worksheet RAID10 arrangement.
Does deleting a file leave an old version on other mirror members?|Not as a RAID guarantee.|The write/deletion is propagated.
Can an inserted blank replacement count immediately as a complete copy?|No.|It requires supported completed synchronization.
What hidden assumption underlies the member-loss result?|Surviving data and metadata remain usable and consistent.|Count-based arithmetic excludes corruption.
Can mirroring protect against loss of the entire shared enclosure?|No.|All copies can share that failure domain.
Does N-way mirroring guarantee N times read throughput?|No.|Read scheduling and other bottlenecks are implementation dependent.
Why monitor synchronization alongside healthy-member count?|A present replacement may not yet contain complete data.|Presence and redundancy completion differ.
What verifies a mirror replacement recovery?|Complete synchronization, integrity and original service, with backup restore evidence separate.|A detected new disk is not a recovered copy.''')

add('s6-g1-t5','raid',
'RAID5 distributes data and single parity across at least three active members. Equal-member nominal capacity is (N−1)S, and the idealized layout tolerates one missing member. Reconstruction relies on the other members and consistent parity; a spare does not add another parity equation.',
'Full stripes retain one parity-equivalent per stripe, distributed among members rather than a universally dedicated parity disk.|A missing block can be reconstructed from surviving stripe blocks and parity; a second missing member exceeds the modeled information budget.|Small partial-stripe writes and rebuild activity can require extra I/O and consistency protection, so cache and workload conditions shape actual behavior.',
'Use a disposable capacity/failure worksheet and record protected-cache and consistency assumptions. Never force a dirty degraded host array to demonstrate reconstruction; retain independent restore-tested copies.',
'RAID5 does not protect against malicious logical writes or corruption on surviving data. Protect raw-device access, monitoring and backup isolation rather than treating parity as authentication.',
'Avoid fixed write-penalty claims as a universal benchmark. Full-stripe versus small writes, cache, queue depth, media errors and rebuild load change observed service latency.',
'Single parity~One reconstruction equation~Tolerates one declared member loss.|Degraded~Redundancy consumed~Additional losses are dangerous.|Rebuild~Read survivors to restore a member~Adds workload and exposure.',
"if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi",'md',
'''Five equal 2 TB active members use RAID5. What is nominal capacity?|8 decimal TB.|One member-equivalent is reserved for parity.
Two active members are missing. What is the model outcome?|Unavailable.|Single parity cannot reconstruct two missing member contributions.
Is parity always stored on one dedicated disk in RAID5?|No; it is distributed.|A dedicated parity arrangement would be a different level.
Does adding an idle spare change tolerance from one loss to two?|No.|No second parity equation has been added.
What does degraded state imply for another member loss?|The redundancy budget is already consumed.|A healthy spare must finish reconstruction before redundancy returns.
Why can a rebuild increase application latency?|It shares survivor I/O and controller/CPU resources.|Reconstruction is not free background work.
Can single parity authenticate a maliciously rewritten file?|No.|Logical corruption can be stored consistently.
Why is a dirty degraded array a separate recovery concern?|Parity and missing data may be inconsistent.|The simple loss model assumes usable consistent survivors.
Can capacity arithmetic predict small-write throughput?|No.|Write shape, cache and implementation change I/O work.
What verifies RAID5 recovery?|Supported rebuild completion plus data integrity and original service tests.|A replacement disk appearing is not sufficient.''')

add('s6-g1-t6','raid',
'RAID6 distributes two independent parity-equivalents across at least four active members. Equal-member capacity is (N−2)S and the idealized layout tolerates any two missing members. That stronger loss relation still excludes corruption, failed controllers and unavailable independent backups.',
'Each stripe retains two reconstruction relations, enabling recovery of two missing member contributions when surviving data and metadata remain consistent.|Three missing members exceed the teaching model regardless of how many empty replacements are available.|Partial-stripe writes and reconstruction use additional resources; supported consistency and cache protection remain part of the durability contract.',
'Compare one, two and three losses and explicitly separate the current failure state from a planned replacement. Document member identity, rebuild procedure and independent recovery copies before any optional target exercise.',
'Dual parity is neither encryption nor immutable history. Restrict array administration and keep backup credentials and copies outside the same compromised failure domain.',
'RAID6 trades more parity capacity and work for stronger member-loss tolerance. No universal throughput ordering relative to RAID10 is asserted without workload and implementation evidence.',
'Dual parity~Two independent equations~Protects two declared member losses.|Active members~Data/parity participants~Excludes idle spares.|Recovery budget~Remaining redundancy~Changes while degraded.',
"if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi",'md',
'''Six 2 TB active members use RAID6. What is nominal capacity?|8 decimal TB.|Four member-equivalents contribute useful data.
Two arbitrary active members fail. What is the idealized layout outcome?|Reconstructible.|Dual parity supports two declared missing members.
Three members fail and one spare exists. Is current reconstruction possible in this model?|No.|An empty spare provides no missing information.
What minimum active-member count does this worksheet require for RAID6?|Four.|The model reserves two parity-equivalents and useful data members.
Does dual parity protect from deletion by the application?|No independent version is retained as a RAID guarantee.|Logical writes propagate across the layout.
Why should a second failed member change maintenance urgency?|The modeled redundancy budget is exhausted.|A further loss exceeds tolerance.
Can RAID6 always be called slower than RAID10?|No without the actual workload and implementation evidence.|A universal ranking hides cache and access-shape effects.
What remains outside the two-loss result?|Survivor corruption, metadata inconsistency, controller failure and service dependencies.|The arithmetic has explicit assumptions.
Why identify active versus spare members in capacity records?|Idle spare capacity is not part of the current useful layout.|Counting all installed disks overstates capacity.
What verifies restored dual-parity resilience?|Completed supported rebuild, correct membership and integrity/service evidence.|A purchased replacement is not restored redundancy.''')

add('s6-g1-t7','raid',
'RAID10 in this course is explicitly a stripe across adjacent two-member mirror pairs: members 0/1, 2/3 and so on. It requires an even active-member count of at least four, uses NS/2 nominal capacity and survives losses only when every pair retains a complete member. Linux MD also supports layouts beyond this narrow pair model.',
'Mirroring supplies two copies within each pair while striping distributes different logical ranges across pairs.|Losing both members of one pair removes unique logical ranges even if other pairs are intact.|Several failures in different pairs can be survivable, so count-only tolerance rules misdescribe the layout.',
'Draw the exact pair mapping and test every member-loss mask in the worksheet. Record actual target layout metadata before transferring this result to hardware or Linux MD; pair semantics are not claimed for every RAID10 implementation.',
'Mirrored writes can preserve malicious changes on both members. Keep independent versions and avoid replacing a healthy paired survivor based on ambiguous bay labels.',
'Write distribution and reconstruction differ from parity layouts, but pair locality, device rates, shared controllers and workload still govern latency. Half-capacity arithmetic is not a throughput guarantee.',
'Mirror pair~Two copies of one range~One survivor required.|Stripe of pairs~Different ranges per pair~Each pair must remain usable.|Failure mask~Exact missing-member set~Count alone is insufficient.',
"if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi",'md',
'''Six equal 2 TB members use this paired RAID10. What is nominal capacity?|6 decimal TB.|Three mirror pairs each contribute 2 TB.
Members 0 and 1 fail. What is the model outcome?|Unavailable.|The first pair has no surviving copy.
Members 0, 2 and 4 fail. What is the model outcome?|Reconstructible.|One member survives in every pair.
Can all two-member failures be assumed survivable?|No.|Two losses in one pair break the layout.
Why is an odd member count rejected here?|This teaching layout requires adjacent two-member pairs.|Other RAID10 layouts are outside its contract.
Does this pair map describe every Linux MD RAID10 layout?|No.|Actual near/far/offset and copy layouts require metadata-specific interpretation.
What should be checked before replacing a degraded pair member?|Exact member-to-pair and physical bay mapping.|Removing its healthy partner destroys that range.
Can a mirror pair preserve a previous uncorrupted file version after overwrite?|Not as a RAID guarantee.|Both copies can receive the same bad write.
Why enumerate masks rather than only failed-member counts?|Position within pairs controls survivability.|Equal counts can produce different outcomes.
What completes a RAID10 recovery record?|Correct pair/layout, rebuilt copy, integrity and original application evidence.|A healthy total-member count can hide the wrong layout.''')

add('s6-g1-t8','raid',
'A hot spare is a compatible reserved replacement member available for a supported rebuild policy. It does not hold a guaranteed current copy before reconstruction and therefore adds neither current useful capacity nor instantaneous parity tolerance. Eligibility, assignment scope and successful rebuild are separate conditions.',
'A supported failure/rebuild policy selects an eligible spare with sufficient usable size, interface and format; a visible spare can still be unsuitable.|Reconstruction uses surviving layout information to populate the replacement; current loss tolerance is not repaired until supported completion.|After the spare becomes active, the reserved replacement pool can be empty and needs lifecycle attention even if the array reports healthy.',
'Record global/dedicated assignment, common component size, sector format, controller policy and spare health. Compare current array survivability first, then possible reconstruction; never assume an idle spare rescues an already unreconstructible layout.',
'Spare provisioning and retirement can expose tenant data or mutate arrays. Use exact disk ownership, approved sanitization and least-privilege storage administration.',
'Rebuild time and foreground impact depend on survivor rates, contention and implementation. A spare reduces response delay for some failures but does not eliminate the rebuild exposure window.',
'Spare eligibility~Supported replacement match~Size alone is not enough.|Current tolerance~Existing reconstruction information~Unchanged by an idle spare.|Rebuild completion~New member fully populated~Must be observed.',
"if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi",'md',
'''A five-member RAID5 has an idle 2 TB spare. What is nominal useful capacity if active members are 2 TB?|8 decimal TB.|The spare is excluded from active capacity.
Two RAID5 members fail before reconstruction. Can the empty spare recover the array?|No.|Single parity lacks enough information for two missing members.
A spare is smaller than the common component size. What must be checked?|It cannot serve the required replacement capacity in this model.|A smaller disk cannot store the complete reconstructed member.
Does a matching capacity label prove spare eligibility?|No.|Interface, sector format, controller support and assignment also matter.
When can restored redundancy be claimed?|After supported reconstruction completion and integrity/service verification.|Selection or insertion alone is not completion.
What is the operational consequence after a spare becomes active?|The replacement pool may be empty.|A healthy array can still lack the next spare.
Why distinguish dedicated and global spare policy?|They determine which arrays may consume the replacement.|A visible spare may be assigned elsewhere.
Does a hot spare act as an independent backup?|No.|It becomes part of the same live array and failure domain.
Why does spare readiness reduce only part of recovery delay?|Detection/selection may accelerate but reconstruction still requires survivor work.|Exposure does not disappear on insertion.
What should a spare recovery record retain?|Eligibility, selected array, rebuild completion, integrity and replenishment ownership.|A spare inventory count alone is insufficient.''')

add('s6-g2-t0','platform',
'A disk backplane connects bays to power and data paths through direct wiring, expanders or protocol-specific switching. Similar-looking carriers can terminate SAS, SATA or PCIe/NVMe paths with different firmware and hot-plug support. Bay identity is a physical topology contract.',
'Trace each bay connector through backplane revision, cable and controller/CPU attachment; front labels do not identify the protocol alone.|Expanders or switches can aggregate paths and introduce a shared power/data failure domain.|Hot replacement requires the chassis, backplane, controller, OS and redundancy policy all to support the specific operation; connector accessibility is not authorization.',
'Build a bay-to-device-to-controller table from supported documentation and read-only inventory. Photograph or label owned paths before maintenance, and retain an exact compatible spare rather than inferring compatibility from carrier fit.',
'Physical replacement can bypass operating-system access controls. Control asset custody and sanitize retired media; keep serial and tenant mappings in the appropriate protected inventory.',
'Shared uplinks and backplane paths can constrain aggregate I/O. A fast individual drive label does not establish per-bay negotiated speed or full-rack throughput.',
'Bay~Physical replaceable position~Must map to logical identity.|Backplane~Bay connection assembly~Protocol and revision matter.|Expander/switch~Shared aggregation~Can concentrate bottlenecks and faults.',
'lsblk -o NAME,TYPE,SIZE','sas,nvme',
'''A carrier fits a bay. Does this prove NVMe support?|No.|Backplane wiring, firmware and host attachment must support PCIe/NVMe.
Why map OS device to bay before removing a member?|Enumeration names may not match physical positions.|Wrong-member removal can destroy a degraded layout.
Eight drives share one expander uplink. What constraint remains?|The shared uplink capacity and expander failure domain.|Drive counts do not imply independent paths.
Does an accessible front carrier authorize hot removal?|No.|Supported hot-plug and array recovery conditions must be verified.
All disks vanish together. Which common boundary should be investigated?|Backplane power, shared cable, expander/controller or discovery state.|Simultaneous individual disk failure is only one hypothesis.
Why record backplane revision?|Protocol support and cabling can change by hardware revision.|Chassis family names may hide variants.
Can a SAS/SATA bay be assumed to carry PCIe lanes?|No.|NVMe local transport requires the intended PCIe path.
What is the security concern in retiring a failed disk?|Residual tenant data and custody even if the disk is currently unreadable.|Failure is not sanitization.
Why inspect per-path negotiated link rates?|Common aggregation and downtraining can reduce the expected envelope.|Drive advertising is not installed-path evidence.
What verifies a repaired backplane path?|Correct identities and redundancy plus original integrity/application tests.|Presence after rescan alone is insufficient.''')

add('s6-g2-t1','platform',
'Serial Attached SCSI is a storage transport using SCSI commands over serial links, commonly with enterprise multi-path/dual-port capabilities on supported drives and enclosures. Protocol capability, installed path diversity and active multipath policy must be separately established.',
'An initiator discovers targets through direct links or expanders and identifies the actual SAS topology.|A supported dual-port device can connect through distinct paths, but two ports sharing an expander/controller still share that parent.|SAS controllers may support SATA targets in documented combinations; a SATA controller does not thereby gain SAS-target support.',
'Record initiator, expander, target, negotiated rate and each path parent. Validate the exact controller/backplane/drive combination and path policy before treating a dual-port label as availability.',
'Limit storage management and physical media custody. Transport discovery and a second path do not grant application permission or encrypt stored data.',
'Media latency, command queueing, expanders, PCIe attachment and workload govern achieved I/O. Link generation or RPM alone does not predict end-to-end throughput.',
'Initiator~Requesting adapter~Creates transport operations.|Target~Storage endpoint~Has supported protocol/ports.|Expander~SAS aggregation~Shared path and capacity boundary.',
'lsblk -o NAME,TYPE,SIZE','sas',
'''A supported SAS controller accepts a SATA drive. Does the reverse follow?|No; a SATA controller does not support SAS drives merely by connector similarity.|Protocol compatibility is directional and documented.
Does dual-port SAS guarantee independent storage paths?|No.|Installed parents and multipath configuration still matter.
Two target paths share one expander. What risk persists?|That common expander and its power path.|Port diversity is weaker than failure-domain diversity.
What identifies the actual path for a SAS target?|Initiator, expander/port, target identity and negotiated attachment.|A drive model label is incomplete topology evidence.
Does discovering a SAS target establish data encryption?|No.|Transport presence says nothing about encryption policy.
What distinguishes media performance from transport capacity?|The drive workload rate and latency can be below the link envelope.|Fast links do not remove media limits.
Why retain enclosure support with drive choice?|Backplane, firmware, format and supported combinations determine use.|Protocol family alone is insufficient compatibility evidence.
Can a surviving path still fail the original application?|Yes if target, policy, return path or host configuration is unusable.|Path presence is not a completed I/O transaction.
What does an expander introduce into capacity planning?|A possible shared uplink bottleneck.|Summing device links can overstate aggregate bandwidth.
What verifies a SAS path recovery?|Correct target identity, usable intended paths and original I/O integrity.|A link counter alone is insufficient.''')

add('s6-g2-t2','platform',
'Serial ATA is a storage interface and command path commonly used for individual drives. Interface rate, connector form, flash or rotating media and failure-domain design are separate choices. A SATA SSD can be faster than a rotating SAS disk for some work without changing the protocol compatibility rules.',
'The host controller exchanges commands and data with a supported SATA target through the actual bay/controller path.|Queueing and drive behavior shape latency; the media can bottleneck well below the advertised interface rate.|Conventional SATA drives do not inherently provide SAS-style native dual-port paths; supported enclosure/interposer designs require their own validation.',
'Identify drive protocol, media type, negotiated link and controller/backplane support. Keep physical identity and backup/restore planning explicit; do not infer enterprise availability from a capacity or SSD label.',
'Apply data-at-rest policy, custody and approved sanitization. SSD wear and a failed read path do not prove erased secrets or an intact independent backup.',
'Conventional SATA 6 Gb/s is a signaling label, not 6 GB/s useful throughput. Encoding, commands, media, queues and shared upstream paths reduce achieved payload rates.',
'Interface~Host-to-drive protocol~Separate from media.|Media~Flash or rotating storage~Changes latency/wear behavior.|Installed path~Controller and bay~Needs negotiated support.',
'lsblk -o NAME,TYPE,SIZE','sas',
'''Is 6 Gb/s SATA the same as 6 GB/s payload?|No.|Bytes differ by eight and protocol overhead remains.
Does a SATA SSD become SAS because it occupies a SAS-compatible bay?|No.|The drive still speaks its supported protocol.
Can media type be inferred from SATA versus SAS alone?|No.|Both protocol families can attach different media types.
Why is a SATA drive on a supported SAS controller not proof of reverse compatibility?|The SAS controller may implement SATA support; a SATA controller lacks SAS protocol support.|Compatibility is not symmetric.
Do conventional SATA drives inherently provide native SAS dual-port behavior?|No.|Special enclosure/interposer support must be validated separately.
What constrains throughput below an interface label?|Media latency, queue behavior, encoding and shared upstream resources.|Signaling rate is not a benchmark.
Why record negotiated link instead of only drive specification?|The installed controller/cable path can operate at a lower rate.|Capability and actual attachment differ.
Does a worn-out SSD prove tenant data is erased?|No.|Unreadability is not sanitization.
What is required before replacing a SATA array member?|Exact physical identity, supported replacement attributes and recovery procedure.|A same-size label is insufficient.
What completes recovery evidence?|Correct path/member identity, redundancy state and original integrity/service tests.|Drive discovery alone does not establish data recovery.''')

add('s6-g2-t3','pcie',
'NVMe is a command/interface architecture for nonvolatile storage with queues designed for concurrent host operation. Local NVMe commonly uses PCIe transport; NVMe is neither a synonym for an M.2 shape nor limited to flash in one connector. NVMe over Fabrics is a different transport topic.',
'Host software discovers controllers and namespaces, then uses submission/completion queue pairs and supported interrupts/polling.|The controller exposes namespace storage independently of physical package shape; namespace identity is not simply a SATA-style bay number.|PCIe negotiated width, shared switches, locality and media/controller behavior jointly limit local I/O; form-factor fit does not establish hot-plug or firmware support.',
'Record controller/namespace identity, transport, slot/bay mapping, negotiated PCIe path and supported firmware. Compare a Gen3/4/5 host envelope with demand and use read-only discovery; namespace creation/deletion is outside this lesson.',
'Namespace administration and firmware update are privileged destructive-capable boundaries. Protect identifiers and tenant mapping, validate supported sanitization and preserve independent recoverable copies.',
'Multiple queues enable concurrency without guaranteeing low latency under every queue depth. The worksheet encoding envelope excludes transaction overhead, controller limits, media behavior and software scheduling.',
'Controller~NVMe command endpoint~Can expose namespaces.|Namespace~Addressable storage object~Not a form factor.|Transport~Command carriage~Local PCIe differs from NVMe-oF.',
'lsblk -o NAME,TYPE,SIZE','nvme,pcie,pcie45',
'''Does M.2 automatically mean NVMe?|No.|M.2 is a form factor and may carry other supported interfaces.
What is an NVMe namespace?|An addressable storage object exposed by a controller.|It is not necessarily an entire physical package.
Does NVMe always mean local PCIe transport?|No; NVMe over Fabrics uses other transport arrangements.|Command architecture and transport are separate.
What bounds a local Gen3 x4 attachment before transaction overhead?|About 31.51 Gb/s per direction.|Apply the negotiated lane and encoding envelope.
Can a physically fitting NVMe carrier be hot removed safely from any server?|No.|Chassis, firmware, OS and workload recovery support must be validated.
Why can increased queue depth raise latency?|More outstanding work can wait behind device/controller service.|Concurrency is not an unconditional latency benefit.
What is dangerous about namespace administration?|Creation/deletion can change or destroy storage ownership and data.|Observation does not authorize mutation.
Why map namespace identity to physical controller and bay?|Logical namespace enumeration is not a reliable replaceable-unit label.|Recovery needs the actual topology.
Does a PCIe envelope prove achievable NVMe payload rate?|No.|Media, controller, transaction and software costs are excluded.
What verifies a local NVMe path repair?|Correct controller/namespace identity and original integrity/application evidence.|A controller appearing alone is insufficient.''')
add('s6-g3-t0','fabric',
'Top-of-rack switching places access switches near server attachments within a rack. It reduces long server cable runs and makes rack expansion modular, while concentrating rack traffic and exposing port utilization, uplink capacity and rack-local shared power as design constraints. ToR describes placement, not a particular overlay or routing protocol.',
'Server ports connect to rack switches and selected uplinks carry off-rack traffic; same-switch traffic need not cross a spine.|Two rack switches provide useful diversity only with supported server attachment, independent paths and enough surviving capacity.|Port speed, optic/cable support, length and airflow orientation must match the actual installation rather than a location label.',
'Map each server NIC to an access port and every access uplink to a named spine/aggregation port. Count usable downlinks and surviving uplinks, and retain rack switch/power dependencies before comparing a design with end-of-row.',
'Access segmentation and protected switch management remain necessary inside a rack. A short cable does not imply trusted workloads or protect a management interface from unauthorized access.',
'Compare potential port sums with measured rack demand, one-flow behavior and failure-state capacity. Idle ports, optic count and power/cooling overhead can matter even when an aggregate envelope is adequate.',
'ToR~Rack-local access placement~Not automatically leaf-spine.|Uplink~Off-rack attachment~Shared by many downlinks.|Rack domain~Shared local dependencies~Trace power and switch parents.',
'sha256sum labs/data-center-workbook.md','fabric',
'''A leaf has 48×25 Gb/s downlinks and 2×100 Gb/s uplinks. What is port-sum oversubscription?|6:1.|1200 Gb/s potential downlinks divided by 200 Gb/s uplinks.
Does top-of-rack automatically mean VXLAN EVPN?|No.|Placement does not choose an overlay/control plane.
Two server NICs attach to one ToR. What failure remains?|Loss of that shared ToR and its parents.|NIC count does not establish switch diversity.
One of two uplinks is unavailable. What is the new port-sum ratio?|12:1 for the stated 48×25 design.|Surviving uplink capacity is 100 Gb/s.
Does 200 Gb/s aggregate uplink imply one flow gets 200 Gb/s?|No.|Hashing and endpoint/path limits govern individual flows.
Why inspect switch fan/PSU airflow before mounting?|Its inlet/exhaust orientation must fit the aisle plan.|Switch placement can conflict with server airflow.
What cable record makes a rack replacement recoverable?|Both endpoint ports, media/optic, length and path label.|A cable color alone is ambiguous.
Can free switch ports approve more servers without other checks?|No.|Power, cooling, uplinks and server attachment also constrain growth.
Why retain switch power-parent mapping?|Two switches can share one circuit or UPS.|Duplicated equipment can fail together.
What verifies a ToR recovery?|Restored attachment, surviving capacity and original permitted/prohibited transactions.|Link LEDs do not prove service or policy recovery.''')

add('s6-g3-t1','fabric',
'End-of-row switching concentrates access near the row rather than in every rack. It can improve port pooling and centralize operations, while requiring longer rack-to-row cable paths and exposing many racks to shared switching, patching and power dependencies.',
'Server or rack aggregation cables traverse structured pathways to row access ports; port/patch identity and supported distance define the attachment.|A row switch failure can affect multiple racks, so redundant row paths must be evaluated by shared parents and surviving capacity.|Row placement does not dictate Layer 2 versus routed access; forwarding and failure behavior depend on the implemented topology.',
'Compare a row design with ToR using measured attachment counts, cable length/patch budgets, optics, port utilization, maintenance impact and failure-state demand. Preserve a named alternate path rather than assuming centralized access is inherently resilient.',
'A row patch area can expose many tenant attachments. Control physical access and maintain explicit logical segmentation and management policy independently of the cable route.',
'Central pooling can reduce idle access ports but length, optics, shared uplinks and operational blast radius affect cost and latency. Do not select placement from nominal switch capacity alone.',
'EoR~Row-centralized access~Longer server/rack paths.|Patch path~Structured cable segments~Needs endpoint and length records.|Row domain~Shared multi-rack parents~Evaluate failure impact.',
'sha256sum labs/data-center-workbook.md','fabric',
'''An EoR design centralizes ports for six racks. What failure-domain observation matters most?|Which racks share its switch, power and cable parents.|Centralization can correlate several racks.
Does end-of-row require Layer 2 access?|No.|Placement and forwarding design are separate.
Why can port pooling reduce idle capacity?|Several racks can consume one shared access-port pool.|That benefit must be weighed against shared failure impact.
What should be counted in a long copper/fiber attachment?|Total supported channel length, patches, media and optics.|Straight-line rack distance is incomplete.
Two EoR switches use the same tray. What risk remains?|A common tray incident can interrupt both paths.|Switch diversity can share a cable failure domain.
Does a spare row switch instantly preserve active sessions?|No.|Attachment, control/forwarding state and recovery behavior require validation.
What distinguishes capacity from failure resilience?|The surviving path must carry required traffic after the stated fault.|Healthy port totals are insufficient.
Can one EoR failure affect more workloads than one ToR failure?|Yes depending on attachment scope.|Draw actual rack-to-switch dependencies.
Why protect row patch records?|They reveal physical tenant connectivity and support exact restoration.|Operational maps can also be sensitive infrastructure data.
What verifies row-path restoration?|Correct endpoint/patch mapping and original workload/policy observations.|A replaced cable and link light are not sufficient.''')

add('s6-g3-t2','fabric',
'A conventional two-tier leaf-spine fabric connects every leaf to every spine within the fabric, without using leaf-to-leaf or spine-to-spine links for those modeled inter-leaf paths. Endpoints attach at leaves; spines provide transit. The uniform pattern simplifies path counting but does not alone ensure nonblocking traffic or operational convergence.',
'A packet between leaves follows source leaf → selected available spine → destination leaf; same-leaf forwarding need not use a spine.|Multiple equal paths can distribute flows by implementation-specific hashing; one flow does not automatically combine all uplinks.|A spine or uplink loss reduces the source/destination leaf envelope and may require routing/forwarding convergence before useful traffic resumes.',
'Draw each leaf-to-spine edge with rate and port identity, count required spine ports for all leaves, and compare demanded traffic under a stated failure. Keep routing/ECMP configuration and observed convergence separate from this topology worksheet.',
'Physical connectivity does not establish tenant or management policy. Apply the relevant segmentation/enforcement boundaries and protect routing and switch administration.',
'The worksheet assumes symmetric installed links and supplied loss per involved leaf. It does not model ECMP collisions, internal switching, shared endpoint limits or measured single-flow bandwidth.',
'Leaf~Endpoint access boundary~May handle same-leaf traffic locally.|Spine~Inter-leaf transit~Connects the modeled leaves.|ECMP~Multiple equal paths~Distribution is not per-flow aggregation.',
'sha256sum labs/data-center-workbook.md','fabric',
'''Four leaves connect to two spines with one link per leaf-spine pair. How many such links exist?|Eight links.|Every leaf has two spine attachments.
Which modeled path carries traffic between two different leaves?|Source leaf, an available spine, then destination leaf.|The two-tier pattern supplies transit through spines.
Must same-leaf traffic cross a spine?|No in this scoped forwarding case.|Endpoint locality changes which envelope is relevant.
Does two-tier connectivity alone prove a nonblocking network?|No.|Link/port capacity and traffic matrix still matter.
What changes when one spine becomes unavailable?|Paths and aggregate uplink capacity per leaf can shrink.|Routing convergence and service recovery are additional observations.
Does ECMP necessarily split one flow equally over all paths?|No.|Many designs hash a flow onto one path.
Why count spine ports before adding leaves?|Each spine needs an attachment for each added leaf in this topology.|Leaf port availability alone misses spine constraints.
Are VXLAN and EVPN required to define leaf-spine placement?|No.|An overlay/control plane is a separate design choice.
What assumption limits this worksheet failure calculation?|Both involved leaves have the same supplied surviving uplink count/rate.|Asymmetric paths need their own bottleneck analysis.
What verifies a fabric failover?|Actual usable route/forwarding paths and original service within requirements.|A topology drawing alone is not convergence evidence.''')

add('s6-g3-t3','fabric',
'East-west traffic is workload communication across peers within the data-center context, such as application-to-database or storage/replication exchanges. The label describes the communication relationship rather than a particular port or guaranteed physical path.',
'Identify source and destination roles and actual placement; peers on one leaf can use a different path from peers on different leaves.|Replication, storage and application calls create different concurrency, latency and directionality needs; averages can hide synchronized bursts.|Policy enforcement and return traffic must be located on the actual path, including virtual switches or host boundaries where relevant.',
'Build an east-west demand matrix from representative original operations and placements. Compare healthy and failure-state inter-leaf envelopes without converting downlink port sums into an asserted measured workload.',
'Internal peer traffic still needs least privilege and protected identity/data handling. East-west classification does not authorize database, storage or management operations.',
'Measure per-operation latency, burst and aggregate offered rates. Server placement can change locality while preserving the same logical workload; flow hashing and endpoint limits remain independent.',
'Peer relationship~Workloads within the DC context~Not a trust designation.|Locality~Actual attachment placement~Selects the physical path.|Demand matrix~Source/destination offered work~Not port capacity.',
'sha256sum labs/data-center-workbook.md','fabric',
'''An application calls a database on another leaf. What traffic class and modeled path apply?|East-west through source leaf, spine and destination leaf.|Logical peers can still cross fabric transit.
Does east-west mean packets are trusted?|No.|Traffic relationship does not grant authorization.
What changes if both peers move to the same leaf?|The scoped path can bypass the spine envelope.|The logical application relationship can remain the same.
Why is average daily replication bandwidth insufficient for capacity planning?|Synchronized bursts and failure-state demand can exceed the average.|Time distribution affects queueing and recovery.
Can the sum of all server port rates be called measured east-west demand?|No.|It is potential attachment capacity.
Which latency matters to an application-to-database call?|The original transaction latency and its path/dependency context.|A link-speed label omits queueing and processing.
Why locate enforcement along the actual peer path?|A policy on a bypassed boundary is not consumed.|Placement determines the effective consumer.
How can replica placement affect recovery traffic?|Rebuild or resynchronization can concentrate additional inter-leaf work.|Failure-state workload may differ from normal operation.
Does classifying a flow as east-west identify its TCP port?|No.|The actual application tuple must be inventoried.
What verifies an east-west recovery?|Original peer transactions and required policy behavior after exact restoration.|Route or link presence alone is incomplete.''')

add('s6-g3-t4','fabric',
'North-south traffic crosses the data-center context boundary, such as external clients accessing a published service. It may traverse edge routing, firewalls and load-balancing/service dependencies before reaching the endpoint fabric. The classification does not prove any particular Internet or security topology.',
'Trace external source → intended edge/service boundary → endpoint attachment, then trace the response separately.|Published identity, route, translation and service policy can make configured reachability differ from authorized original use.|Edge failure or path asymmetry can change capacity and stateful inspection outcomes even when leaf-spine links remain healthy.',
'Record actual ingress/egress, service tuple, publication, return path and policy consumers. Compare external demand with both edge and fabric failure envelopes rather than applying an inter-leaf number as the entire service capacity.',
'Restrict publication to named operations and protect management separately. An edge firewall permit is not application authorization, and a returned response needs its actual identity/trust context.',
'Edge links, translation/inspection, service processing and endpoint queues may bottleneck before the fabric. Track original external transaction percentiles and offered rate rather than only internal switch counters.',
'Boundary crossing~External-to-DC relationship~Not a specific device chain.|Publication~Exposed service mapping~Requires policy and return path.|Edge envelope~External path capacity~Separate from fabric sums.',
'sha256sum labs/data-center-workbook.md','fabric',
'''An external client requests a published HTTPS application. Which traffic relationship applies?|North-south.|The operation crosses the data-center context boundary.
Does the north-south label prove the flow crossed a firewall?|No.|The actual implemented path must be traced.
Why is an inter-leaf capacity calculation insufficient for the whole published service?|Edge links, inspection, translation and service processing can constrain it.|The end-to-end chain contains other envelopes.
What must be traced besides the forward publication?|The actual response route and stateful policy context.|One-way reachability is incomplete.
Does an edge permit authenticate the application user?|No.|Network permission and application identity are separate.
The fabric is healthy but external users fail. Where should evidence expand?|Edge path, publication, DNS, policy and original application response.|Internal health does not settle external service success.
Why can path asymmetry affect a stateful service?|The response may miss the device holding required connection state.|Topology and policy consumption interact.
Should BMC access be published with the user application?|No; preserve a separately protected management boundary.|Privileged management is a different operation.
What rate belongs in an external demand record?|Observed offered workload at the stated external/service observer.|Internal port sums are not that demand.
What verifies north-south recovery?|The original external authorized transaction and intended prohibited operations.|An internal link test alone is insufficient.''')

add('s6-g3-t5','fabric',
'Oversubscription compares declared potential offered capacity with the shared forwarding envelope. A port-sum ratio is a design indicator, not measured traffic, packet loss, utilization or per-flow throughput. The numerator, denominator, direction and failure state must be named.',
'Sum declared downlink count × rate and divide by available uplink count × rate in the symmetric worksheet.|A lost uplink changes the denominator; a design acceptable under healthy demand may fail its recovery envelope.|Same-leaf traffic can bypass the inter-leaf denominator, while bursts, hashing and asymmetric demand can constrain particular paths before average aggregate capacity is exhausted.',
'Calculate ratios with decimal Gb/s and document both healthy and stated-loss conditions. Compare actual representative offered traffic and latency with those envelopes; no traffic generator or live congestion test is run here.',
'Congestion can impair authorized availability and monitoring. Protect required management/control paths through an explicit design rather than assuming spare nominal bandwidth guarantees them.',
'A 6:1 potential ratio can be acceptable for a measured sparse workload and unsuitable for synchronized replication. No universal safe ratio is asserted; evaluate traffic and surviving-path requirements.',
'Port sum~Potential attachment rate~Not offered workload.|Shared envelope~Surviving uplink sum~Direction and failure state matter.|Ratio~Potential/shared capacity~Not a loss percentage.',
'sha256sum labs/data-center-workbook.md','fabric',
'''What is the ratio for 48×25 Gb/s downlinks and 2×100 Gb/s uplinks?|6:1.|1200 divided by 200.
One of those uplinks is unavailable. What is the ratio?|12:1.|The numerator remains 1200 while the denominator falls to 100.
Does 6:1 mean five out of six packets are dropped?|No.|The ratio compares potential capacity, not observed traffic or loss.
Can 150 Gb/s inter-leaf demand fit the healthy stated envelope?|Yes at the aggregate-envelope level only.|150 is below 200; hashing and other costs remain unproven.
Can that 150 Gb/s demand fit after one 100 Gb/s uplink loss?|No in this declared envelope.|150 exceeds the surviving 100.
Why state direction when comparing duplex rates?|One-direction demand must use one-direction capacity.|Adding opposite directions overstates the relevant budget.
What happens to the ratio with no surviving uplinks?|No finite uplink ratio or usable inter-leaf uplink path exists.|Do not divide by zero or call the path healthy.
Does same-leaf traffic necessarily consume the spine envelope?|No in this worksheet scope.|Locality changes the shared boundary.
Can one universal acceptable ratio serve every workload?|No.|Burst, replication, latency and failure requirements differ.
What verifies a capacity design?|Representative offered-demand/latency evidence in healthy and stated-loss conditions.|A computed ratio alone is incomplete.''')

add('s6-g3-t6','power',
'Redundancy duplicates resources so a specified fault can leave sufficient usable service dependencies. The claim must identify the failed component, independent remaining parents, capacity and recovery behavior. Two labels or parts do not establish independence or successful application continuity.',
'Draw each resource path to its upstream power, chassis, controller and network parents to expose common failures.|Remove the named dependency in a declared design and compare required full load with the surviving envelope.|Restore the exact prior state and retest original service/policy behavior; spare resources and documented failover are hypotheses until the relevant observation exists.',
'Create a failure-domain table for power, network, storage, cooling and management. Use the A/B power worksheet for one explicit full-load case and keep other domains and service recovery separately documented.',
'Duplicate controls can share credentials or management failures. Preserve independent recovery and backup ownership rather than assuming identical components are security diversity.',
'Healthy load sharing can hide an overloaded survivor. Reserve the specified loss-state capacity, not merely average spare percentage; every common parent and maintenance scenario changes the requirement.',
'Duplicate~Additional resource~May share every parent.|Independent path~Distinct relevant failure domain~Must be traced.|Surviving capacity~Required load after fault~Cannot sum the failed path.',
'sha256sum labs/data-center-workbook.md','ups,fabric',
'''Two PSUs connect to the same UPS. Is UPS failure diversity present?|No.|The UPS is a shared upstream parent.
Each path allows 8 kW and rack load is 9 kW. Is A/B full-load resilience satisfied?|No.|Either survivor must carry all 9 kW.
Does normal 4.5 kW load on each feed settle the previous question?|No.|Loss moves the full 9 kW onto one path.
Why distinguish a spare from an active independent path?|A spare may require replacement/rebuild before service returns.|Availability and recovery timing differ.
Two switches have separate cords in one tray. What common domain remains?|The shared cable route and possibly upstream supplies.|Multiple parts can share physical parents.
Can duplicate administrators with one shared credential improve identity isolation?|No.|Credential compromise remains correlated.
What should a redundancy claim name?|The fault, surviving parents, required capacity and service recovery requirement.|Unqualified redundant is too broad.
Why include maintenance in failure analysis?|A planned removal can combine with an unrelated fault.|The design must state which simultaneous conditions it supports.
Does cooling unit count alone prove required resilience?|No.|Available removal, airflow and control/power parents matter.
What verifies a redundancy rehearsal?|Original allowed/prohibited operations under the named fault and after exact restore.|Component presence is insufficient.''')

add('s6-g3-t7','ha',
'High availability is an operational service outcome under specified faults and recovery requirements. It combines independent capacity, detection, failover, state/data handling and original-user observations. Redundant components support the design but do not by themselves prove acceptable recovery time or data loss.',
'Detection and failover must leave an eligible usable dependency path; surviving capacity and control/state behavior must support the original operation.|Measure recovery interval from the agreed event/start to verified original success, and compare it with the stated recovery-time requirement.|Compare the newest recoverable data with the stated recovery-point requirement; component uptime and service/data recovery are distinct measurements.',
'Define the service, fault set, observer, recovery timing boundary and allowable data age before a rehearsal. Enter declared recovery/data observations into the worksheet and retain the original permitted/prohibited service results separately.',
'Failover must retain authorization and data integrity, not merely make an endpoint answer. Protect recovery credentials and replicated state, and test the independently scoped management path.',
'Capacity, convergence, retry behavior and repair work can raise latency during faults. The worksheet compares supplied intervals to targets and never derives an availability percentage from unsupported component probabilities.',
'RTO~Required recovery-time objective~Specify start and verified finish.|RPO~Required recoverable-data age~Different from downtime.|Service observation~Original completed operation~Stronger than component health.',
'sha256sum labs/data-center-workbook.md','fabric,ups',
'''Failover takes 25 s with a 30 s recovery target. Is the timing requirement met for that recorded interval?|Yes for the supplied observation.|25 is within 30; other eligibility/data/service conditions remain separate.
Does an available second server prove high availability?|No.|State, capacity, failover and original service must work.
Recoverable data is 12 min old but the RPO is 10 min. Is the data requirement met?|No.|Recovery timing success does not repair excessive data age.
What timestamp ends a useful recovery measurement?|Verified completion of the agreed original service operation.|A link or process becoming healthy can occur earlier.
Why state the tested fault set?|Different shared or simultaneous failures can exceed the design.|An observed single-fault result is not universal availability.
Can a recovery that opens unauthorized operations be accepted?|No.|Service continuity must preserve policy.
Does component uptime directly determine application availability?|No.|Dependencies and original transaction outcomes matter.
Why preserve client retry behavior in the rehearsal?|It can affect when useful service resumes.|Control-plane convergence alone is not user recovery time.
What is excluded from the worksheet?|Live failover, data replication and statistically measured availability.|Inputs are supplied observations, not generated events.
What completes an HA acceptance record?|Named fault/observer, surviving capacity, recovery and data intervals, original service/policy checks and exact restore.|A redundant label or health icon is insufficient.''')

add('s6-g4-t0','rack',
'Rack design coordinates vertical placement, mass, dimensions, rails, power, cooling, cabling and service access. The original lab uses three 42U racks and separate documented capacity paths. Free U is a planning resource rather than permission to install unsupported equipment.',
'Assign inclusive U intervals and detect overlap/out-of-range endpoints, then validate depth, rails, mass and floor/cabinet support separately.|Align installed equipment airflow with cold-front/hot-rear layout and blank unused openings using supported materials.|Trace every cord and cable with both endpoints, service travel and independent-path intent; additions must fit the surviving power envelope.',
'Produce three named elevations and a per-rack capacity worksheet. Preserve asset-to-slot identity and qualified physical installation checks; the browser checks only declared vertical intervals and a fixed power allowance.',
'Control rack/console access and media custody. Hide real serial-to-tenant relationships from public diagrams while retaining authorized recovery mapping.',
'Dense racks can run out of heat removal, circuit/phase/outlet capacity or port/cable access before U positions. Reserve the binding resource explicitly rather than a universal density target.',
'Elevation~Numbered vertical placement~Check inclusive intervals.|Physical envelope~Depth, rails, mass and access~Not captured by U alone.|Capacity worksheet~Per-rack surviving limits~Includes explicit units.',
'sha256sum labs/data-center-workbook.md','cooling,ups',
'''A 2U device starts at U15. What interval should be marked?|U15–U16.|Height counts occupied units including the start.
Can a 2U device start at U42 in a 42U rack?|No.|Its end would be U43.
Why show both front and rear installation context?|Airflow, rails, cable access and service clearance differ.|One flat elevation is not the whole physical envelope.
What happens if a proposed interval intersects an existing device?|The declared elevation is invalid.|No shared occupied U is allowed in this model.
R1 has 6 kW baseline and an 8 kW surviving allowance. Can a 3 kW addition fit?|No.|The new 9 kW exceeds the single-path allowance.
Does a valid U diagram certify floor loading?|No.|Mass, cabinet/floor ratings and installation approval are separate.
Why label unused openings and blanking intent?|Uncontrolled gaps can permit bypass or recirculation.|Visual empty space affects airflow.
What should a cable plan retain besides its color?|Endpoint ports, medium/optic, length, route and service slack.|Color alone is not exact restoration evidence.
Why place capacity and failure domains on the elevation record?|A rack-local drawing can otherwise hide upstream shared constraints.|Mechanical fit is only one requirement.
What completes a rack-design review?|Valid elevations plus supported physical, full-load power, thermal, cable and recovery records.|The browser does not certify installation.''')

add('s6-g4-t1','power',
'Power distribution delivers electricity through utility/generation, UPS/transfer arrangements, circuits, PDUs, cords and device supplies. A/B diversity requires independent relevant upstream paths and adequate full-load capacity on each survivor. Real installation also depends on voltage, current, phase balance, connectors and applicable professional/code requirements.',
'Trace each PSU cord through rack outlet, branch circuit, UPS and source domain; distinct colors can terminate at one common parent.|Use explicit W/kW real load and the supported ratings/allowances for every upstream element; healthy split load is not the loss-state load.|Check single-cord devices and shared switch/management/cooling supply dependencies rather than assuming every required service has dual inputs.',
'Produce a cord-to-source schedule and per-rack/site capacity sheet from supported ratings and measured/planned load. The 80% allowance is a classroom input, not a universal electrical rule; qualified staff must approve actual circuit work.',
'Power controls can stop many services. Restrict switched-outlet and transfer permissions and protect independent recovery; never turn a design worksheet into an authorized energized-panel operation.',
'Nameplate input, measured real power and failure-state demand differ. Use phase/outlet/circuit and UPS ratings separately; total kW alone cannot certify the physical system.',
'W/kW~Real power demand~Distinct from apparent VA.|A/B path~Cord through upstream domains~Names do not prove independence.|Surviving envelope~Each path carries full required load~Includes explicit allowance.',
'sha256sum labs/data-center-workbook.md','ups',
'''Each path is rated 10 kW with an 80% declared allowance. What full-load envelope applies to each path?|8 kW.|Rating times the supplied allowance.
Rack load is 6 kW. Can it fit either 8 kW path alone?|Yes at this declared capacity level.|Other electrical and independence checks remain required.
Should A and B allowances be summed to approve a 12 kW resilient load?|No.|The survivor must carry the full load alone.
Does 80% in this worksheet assert every local code rule?|No.|It is an invented planning input.
Why distinguish W from VA?|Real and apparent power differ and equipment has both kinds of ratings.|A VA label is not guaranteed usable watts.
What parent should be traced beyond the rack PDU?|Branch circuit, UPS/transfer and source domain.|Rack outlet labels hide upstream coupling.
What complication do single-cord required devices introduce?|They need a supported transfer/redundancy design or an explicit single-path limitation.|Dual-PSU assumptions cannot be applied to them.
Can total kW certify safe three-phase loading?|No.|Phase, current, voltage, connectors and circuit ratings require separate checks.
Why protect switched PDU administration?|It can interrupt the entire affected workload path.|Outlet control is privileged infrastructure access.
What verifies power-path planning?|Complete supported cord/source mapping and full-load survivor capacity, followed by approved qualified testing where appropriate.|No electrical test is executed by this worksheet.''')

add('s6-g4-t2','power',
'An uninterruptible power supply supports specified load through supported input-loss and power-quality conditions for a limited duration. Watt/VA capacity, battery state, runtime curves, transfer/bypass behavior and upstream/downstream redundancy are different requirements. UPS presence alone does not prove uninterrupted useful service.',
'The UPS supplies the supported connected load subject to both real/apparent ratings and operating mode.|Stored energy and conversion/load conditions bound duration; supplied usable AC Wh divided by W gives only an ideal planning estimate.|Bypass, battery maintenance, transfer and cooling/network parents can change the failure domain, so protected components and independent management must be mapped.',
'Record exact UPS model, supported voltage/frequency, real/apparent ratings, mode, battery health and manufacturer load/runtime curve. Plan graceful shutdown or generator/recovery dependencies within verified duration; no input removal or battery discharge is performed here.',
'UPS network administration and bypass/outlet operations are privileged. Keep monitored alarms and protected management independently reachable where possible and avoid exposing UPS controls with public services.',
'The worksheet assumes already usable AC energy, not nameplate battery Ah or ideal voltage times Ah. Actual age, temperature, load and conversion behavior require the manufacturer curve and approved testing.',
'Output rating~Supported instantaneous W/VA load~Different from duration.|Usable energy~Supplied AC Wh~Not nominal battery charge.|Runtime curve~Load-specific duration~Requires actual model/state.',
'sha256sum labs/data-center-workbook.md','ups',
'''Supplied usable AC energy is 1500 Wh and load is 6000 W. What ideal duration results?|15 minutes.|1500 divided by 6000 hours, then times sixty.
Does a UPS VA rating directly state output watts?|No.|Check real-power rating and load/power-factor context.
Can nominal battery Ah alone predict runtime?|No.|Voltage, usable energy, conversion and load behavior matter.
Why use the exact manufacturer runtime curve?|Duration depends on model, load and supported battery conditions.|Simple energy arithmetic is not an actual discharge curve.
What can UPS bypass change?|The load may depend on a different unconditioned/shared supply path.|Operating mode is part of the availability contract.
Does a UPS protect an unconnected cooling controller?|No.|Protected power paths must include required dependencies.
What should happen before planned battery maintenance?|Review supported procedure, current health, independent paths and recovery/shutdown plan.|Presence of batteries is not sufficient resilience.
Why may runtime shrink over lifecycle?|Age, temperature and battery condition can reduce usable energy.|The baseline cannot be assumed permanent.
Is this lesson authorizing a live power-disconnect rehearsal?|No.|Actual work requires approved qualified procedures and isolated targets.
What verifies a UPS plan?|Supported rating/runtime evidence, mapped dependencies and approved original-service recovery/shutdown checks.|A UPS icon alone is insufficient.''')

add('s6-g4-t3','power',
'A power distribution unit delivers power to multiple outlets and may meter, switch or remotely manage them depending on the model. A PDU is not inherently a UPS, redundant supply or independent failure domain. Its inlet, phase, outlet and upstream ratings remain separate constraints.',
'Follow device cord → specific outlet → branch/phase/inlet → upstream circuit and supply to identify the real capacity chain.|Metered readings establish selected electrical observations while switched control can change service availability; these functions depend on exact model/support.|Two PDUs provide supply diversity only if their relevant upstream parents and full-load survivor capacities are genuinely independent.',
'Produce a per-outlet load/phase/circuit map and role-controlled monitoring plan. Retain exact outlet identity and disabled destructive permissions for observers; qualified staff approve the actual electrical installation.',
'Switched outlets are destructive-capable infrastructure controls. Assign read versus power-control roles separately, use trusted management access and preserve an independent emergency recovery path.',
'An acceptable aggregate rack kW can still overload one outlet, phase or branch. Use supported ratings and real metering rather than treating PDU socket count as usable power capacity.',
'Basic PDU~Outlet distribution~No implied battery backup.|Metered PDU~Electrical observations~Scope depends on sensors.|Switched PDU~Remote outlet control~Requires stronger permissions.',
'sha256sum labs/data-center-workbook.md','ups,redfish',
'''A PDU has many outlets but no battery. Does it provide UPS runtime?|No.|Distribution is different from stored-energy backup.
Does a metered PDU necessarily allow remote outlet switching?|No.|Feature capability is model specific.
Why map individual phase/outlet loads?|Aggregate kW can hide a narrower overloaded element.|Capacity applies at every rated boundary.
Two PDUs terminate on one circuit. What diversity is missing?|Circuit failure independence.|Different rack boxes can share one parent.
What privilege should an inventory-only operator receive?|Read-only metering/inventory, not outlet power control.|Observation need not grant interruption capability.
Can an outlet count approve server expansion?|No.|Current, phase, inlet, circuit and survivor capacity still matter.
Why retain cord-to-outlet labels before maintenance?|Exact restoration must reconnect the intended A/B paths.|An arbitrary free outlet may change the domain.
Does a green PDU status establish application continuity?|No.|It reports selected device conditions rather than original service results.
What should be checked before a remote outlet action?|Exact asset mapping, ownership, supported procedure and independent recovery.|A mistaken outlet can stop unrelated workloads.
What verifies the distribution plan?|Supported per-element ratings, independent source map and approved service/recovery evidence.|The worksheet is not electrical certification.''')

add('s6-g4-t4','thermal',
'Cooling removes heat while delivering supported environmental conditions at equipment inlets. IT electrical work largely becomes heat in the room, but total removal capacity and actual inlet conditions are different boundaries. Humidity, airflow distribution, recirculation and failure-state removal must be separately evaluated.',
'Compare declared sensible heat load with available sensible removal, including the stated failure condition rather than only installed tonnage.|For a steady ideal air stream, heat equals density × volume flow × heat capacity × temperature rise; the worksheet names every coefficient and unit.|Measure inlet conditions across heights and racks because mixing and bypass can create hot spots even when a mean thermal budget fits.',
'Map heat and available removal per rack/room, inlet sensor positions, airflow paths and shared cooling power/control dependencies. Consult supported equipment limits and qualified facility procedures; do not treat a calculated mean as a compliance temperature.',
'Protect cooling controls and sensor integrity because wrong settings can affect many workloads. Monitor loss of telemetry distinctly from a real safe environment.',
'The worksheet excludes humidity, latent heat, transients, equipment fan curves and CFD. Capacity and mean rise are planning calculations; actual measured maximum inlet and failure-state behavior remain external evidence.',
'Sensible heat~Temperature-related thermal load~Latent moisture effects excluded.|Inlet condition~Air delivered to equipment~Not room-average temperature.|Removal envelope~Available sensible cooling~Shared failures can reduce it.',
'sha256sum labs/data-center-workbook.md','cooling',
'''At 6 kW, 1 m³/s, density 1.2 and heat capacity 1.005, what is mean air rise?|About 4.98 K.|Six divided by 1.2 times 1.005 times one.
Does adequate room cooling capacity prove every inlet is acceptable?|No.|Air distribution and recirculation can create hot spots.
Where should a server environmental acceptance observation be taken?|At its relevant inlets and documented sensor positions.|A room-average reading can miss the delivered condition.
What happens to the ideal mean rise if flow doubles at the same heat load?|It halves.|Steady sensible balance divides heat by mass-flow heat capacity.
Can the worksheet certify humidity compliance?|No.|Humidity and latent effects are excluded.
Why review cooling power/control parents?|Several cooling units can fail with one shared dependency.|Unit count alone is not removal resilience.
What differentiates installed from available capacity?|Operating conditions and unavailable units/paths can reduce usable removal.|The failure state needs its own envelope.
Does a Celsius temperature rise differ numerically from a Kelvin rise?|No for a temperature difference.|Absolute scales differ by offset, differences do not.
Why wait for an approved stable measurement when comparing a change?|Thermal transients can hide or exaggerate the final condition.|Instant samples are not steady-state evidence.
What verifies cooling recovery?|Supported inlet/humidity and original service evidence after exact approved restoration.|The calculated mean alone is incomplete.''')

add('s6-g4-t5','thermal',
'Airflow design routes conditioned air through required equipment and returns exhaust without harmful mixing or bypass. Flow quantity, pressure, equipment fan behavior and physical obstructions interact. Server and switch orientation must be confirmed from actual installed airflow variants.',
'Trace cold supply → intended equipment inlet → internal heat transfer → exhaust → cooling return.|Unblanked openings, cable penetrations and blocked passages can redirect air around equipment or return hot air to inlets.|Match supply and IT flow behavior through approved measurement; increasing fan speed does not guarantee improved delivery at every inlet.',
'Create front/rear flow arrows, blanking and penetration records and inlet sensor positions for each rack. Check cable-arm and switch airflow variants; use only supported installation materials and qualified facility changes.',
'Protect fan/cooling configuration and telemetry integrity. Loss of a sensor or control path should be visible as uncertainty rather than silently interpreted as a safe inlet.',
'More airflow can change mean rise in the ideal worksheet but power use, pressure and recirculation remain unmodeled. Compare actual inlet distributions and supported fan operating conditions.',
'Bypass~Supply air avoids equipment~Can waste usable flow.|Recirculation~Exhaust returns to inlet~Can create hot spots.|Flow balance~Supply and equipment demand~Needs observed conditions.',
'sha256sum labs/data-center-workbook.md','cooling',
'''A rack opening lets hot rear air reach a front inlet. Which mechanism is present?|Recirculation.|Exhaust returns to the equipment supply boundary.
What is bypass airflow?|Conditioned air that avoids the intended heat-producing equipment.|Total fan flow can overstate useful delivery.
Does doubling declared flow halve actual maximum inlet temperature?|No.|The ideal mean rise changes, while mixing and inlet conditions differ.
Why inspect the switch airflow variant?|Some models support different inlet/exhaust directions.|Front-panel position alone may not identify flow.
What can dense rear cabling cause?|Obstruction of exhaust or service airflow paths.|Cable layout affects the thermal boundary.
Why blank unused openings with supported panels?|To limit unintended mixing/bypass paths.|Unused U is not thermally neutral.
Does increasing supply fan speed always solve recirculation?|No.|Pressure, containment, distribution and equipment response matter.
What should a sensor failure produce operationally?|A visible missing-observation condition and investigation.|Absent telemetry is not evidence of safe temperature.
Why draw separate supply and return paths?|It exposes where hot/cold streams can mix or short-circuit.|A single airflow arrow hides useful boundaries.
What verifies an airflow change?|Supported stable inlet distribution and original service after exact restoration.|An ideal flow calculation alone is insufficient.''')

add('s6-g4-t6','thermal',
'A hot aisle groups equipment exhaust sides so warm return air can be separated from inlet supply. Containment can reduce mixing when supported by the room/cooling design, but it also changes return paths, work conditions and interactions with fire detection, suppression and access requirements.',
'Orient supported exhaust paths toward the hot aisle and trace its return to the cooling boundary.|Containment, doors, blanking and penetrations influence separation; incomplete barriers can leave hot-air leakage and recirculation.|Validate inlet conditions and approved safety/access requirements rather than interpreting high contained-return temperature as an automatic server failure.',
'Mark exhaust-facing rack rears, approved containment/return routes and inlet measurement points. Coordinate modifications with qualified facilities and safety staff; no containment or live cooling change is executed here.',
'Restrict cooling-control changes and preserve service access. A physically contained aisle still contains cable, media and management assets requiring ordinary access controls.',
'A warmer well-separated return can coexist with acceptable inlets, while poor separation can create local hot spots. Do not transfer a manufacturer test efficiency result to this classroom design.',
'Hot aisle~Grouped exhaust-side space~Not an inlet temperature criterion.|Containment~Stream-separation boundary~Must fit approved safety design.|Return path~Exhaust to cooling~Requires actual flow mapping.',
'sha256sum labs/data-center-workbook.md','cooling',
'''Which equipment sides face a conventional hot aisle?|Exhaust sides.|The layout groups warm return air.
Does hot-aisle temperature alone certify server inlet failure?|No.|Acceptance concerns supported inlet conditions and equipment observations.
Why review fire/access requirements before containment?|Barriers and flow changes can affect approved detection, suppression and access.|Thermal planning is not the only installation constraint.
Can an open door change containment performance?|Yes.|It changes the stream-separation boundary.
What should the hot return connect toward?|The designed cooling return path.|Warm exhaust should not be assumed to disappear in the room.
Why keep blanking and penetration records?|Leakage paths can route exhaust back to inlets.|A nominal containment label is insufficient.
Can a higher return temperature coexist with acceptable inlets?|Yes.|Good separation can preserve inlet conditions while concentrating return heat.
Does this worksheet measure containment efficiency?|No.|Mixing and actual flow distribution are excluded.
Where should thermal recovery be checked?|At supported equipment inlet positions and the original service.|Return mean alone is insufficient.
What completes a hot-aisle plan review?|Supported orientation, return/separation, safety/access and measured inlet requirements.|A colored aisle diagram alone is incomplete.''')

add('s6-g4-t7','thermal',
'A cold aisle groups equipment inlet sides so conditioned supply can reach the intended heat-producing devices. It does not require a raised floor, and an aisle name or low room average does not prove every device receives a supported environment.',
'Orient supported inlet paths toward the cold aisle and trace the actual supply source and delivery openings.|Containment and blanking can limit mixing while inadequate supply distribution can still leave top-of-rack or high-density inlets hot.|Measure across rack heights and loads and preserve approved work/access/fire requirements when altering the aisle.',
'Draw inlet-facing rack fronts, supply/return paths, approved containment and sensor positions. Specify exact equipment environmental limits separately; this course provides no universal safe temperature range.',
'Protect sensors and cooling-control access, and keep physical service paths available. A low displayed temperature with missing or misplaced sensors is not trustworthy operational evidence.',
'Cold-air quantity must be delivered usefully rather than bypassing equipment. Supply pressure, placement and fan behavior matter beyond the ideal mean heat/flow calculation.',
'Cold aisle~Grouped inlet-side space~Not necessarily raised-floor supply.|Supply path~Cooling to equipment~Needs distribution evidence.|Inlet distribution~Observed values across positions~Mean alone hides maxima.',
'sha256sum labs/data-center-workbook.md','cooling',
'''Which equipment sides face a conventional cold aisle?|Inlet sides.|The layout groups conditioned supply delivery.
Does cold-aisle design require a raised floor?|No.|Other supported supply/return architectures exist.
Why sample several rack heights?|Top or locally starved inlets can differ from the average.|Distribution determines local conditions.
Can a cool room coexist with a hot server inlet?|Yes.|Recirculation or poor delivery can create local hot spots.
Does a missing temperature sensor establish a safe condition?|No.|It is missing evidence, not a low measurement.
What can happen if conditioned air bypasses equipment?|Useful heat removal may be lower than total supplied flow suggests.|Air quantity alone misses delivery.
Why review doors/penetrations in containment?|They alter mixing and pressure boundaries.|A containment name does not define actual separation.
Should one temperature range be assumed safe for all equipment?|No.|Use exact supported environmental requirements.
What is the relationship between cold and hot paths?|Supply must reach inlets and exhaust must return without harmful mixing.|Both sides belong in the same plan.
What verifies cold-aisle recovery?|Supported inlet distribution and original service after approved exact restoration.|A room-average dashboard alone is insufficient.''')

add('s6-g4-t8','rack',
'Cable management records and supports physical paths so connectivity, airflow and maintenance remain reproducible. Length/media/optic support, bend radius, strain relief, separation, endpoint identity and service movement all matter. A neat bundle can still combine both redundant paths into one failure domain.',
'Map every cable from exact endpoint port through patching and route to its remote port with supported media, optic and total length.|Provide supported bend/strain/service allowance without obstructing inlets, exhaust or replaceable units.|Trace redundant routes to shared trays/penetrations and preserve labeling at both ends so recovery restores intent rather than a merely lit link.',
'Produce a cable schedule and route diagram for the three-rack plan with A/B power, fabric and OOB paths separated by documented intent. Follow vendor and qualified facility separation/fire rules; the worksheet checks placement/capacity rather than physical cable certification.',
'Control access to patching and expose sensitive tenant mappings only to authorized operators. OOB separation requires its actual path and policy, not just a different cable color.',
'Incorrect media/length, bends or optical budget can impair links, and blocked airflow can reduce compute capacity. Serviceability and recovery accuracy are performance/availability constraints too.',
'Endpoint record~Both port identities~Enables exact restoration.|Route domain~Tray/patch/penetration path~Can correlate redundant links.|Service allowance~Supported movement/strain~Must preserve airflow and connectors.',
'sha256sum labs/data-center-workbook.md','fabric,cooling',
'''Two redundant uplinks occupy one tray. What shared risk remains?|A tray/route incident can interrupt both.|Logical link diversity can share a physical domain.
Does cable color alone identify a recoverable attachment?|No.|Record both exact endpoints and route/context.
What length matters for supported channel planning?|The complete installed channel including relevant patch segments.|Straight-line rack distance is incomplete.
Why preserve bend and strain requirements?|Unsupported bends or tension can degrade or damage the link.|A neatly tied bundle can still violate support.
How can rear cabling affect server performance?|It can obstruct exhaust and contribute to thermal throttling.|Physical cable layout interacts with cooling.
Why include service-arm travel in the plan?|Moving a supported chassis must not pull cords or data links.|Normal maintenance can become a connectivity fault.
Does a separate OOB cable color establish isolation?|No.|Actual route, attachment and enforcement must be traced.
What should be checked before changing a patch?|Exact asset/port identity, ownership, supported path and recovery.|A lit alternative port may be the wrong attachment.
Why keep tenant mapping protected while retaining labels?|Operators need recovery identity but public topology may expose sensitive relationships.|Availability and confidentiality both matter.
What verifies cable recovery?|Correct endpoints/path and original service/policy results, with airflow restored.|Link light alone is insufficient.''')

add('s6-g5-t0','oob',
'Out-of-band management gives administrators a supported management path separate from the workload operating system and intended production traffic dependencies. A BMC can remain usable while the host OS is stopped, but it still needs controller/standby power, a working upstream path, trusted endpoint and authorized operation.',
'BMC hardware/firmware provides inventory, console or power functions independently of the host OS on supported systems.|Dedicated versus shared NIC mode changes physical coupling; a dedicated port can still depend on the same switch, UPS or upstream access service.|Authentication, role permission, trusted transport, logging and emergency recovery remain distinct requirements even after management reachability succeeds.',
'Draw jump host → protected management ingress → OOB switch → assigned BMC, then document shared parents and permitted read/control operations. Preserve local recovery before any vendor network/role change; no BMC endpoint or privileged action is executed here.',
'BMC privileges can bypass guest OS boundaries through power, console and virtual media. Isolate ingress, remove default/shared credentials, use trusted endpoint validation, minimal roles and redacted audit evidence.',
'OOB is an availability path, not a high-throughput workload network. Console/media and firmware actions can consume controller/path capacity and disrupt service; monitor and rate-limit according to exact support.',
'BMC~Privileged management controller~Needs standby power and firmware.|Dedicated path~Separate management attachment~Upstream independence still needs tracing.|Authorized operation~Role-scoped action~Reachability does not grant permission.',
'sha256sum labs/data-center-workbook.md','redfish,ilo,idrac,cimc',
'''Host OS is stopped, but standby power, protected path and read-role trust conditions are ready. Can a supported BMC read operation remain possible?|Yes independently of host OS health.|The controller has its own dependencies; actual session still needs verification.
Does a dedicated BMC NIC guarantee an independent UPS?|No.|Upstream supply and network parents can remain shared.
Why separate read roles from power/virtual-media roles?|Control operations can disrupt or bypass the workload OS.|Inventory access need not grant destructive capability.
Can a ping to a BMC prove administrator authorization?|No.|Reachability and requested operation permission are separate.
What happens if standby power is unavailable?|The management controller may be unavailable despite host-OS independence.|Out-of-band is not independent of all power.
Why retain a tested local recovery path?|A network/role change can lock out remote management.|The recovery path should survive the changed boundary.
Should BMC management be directly Internet exposed?|No; use the protected authorized management design.|The controller is a highly privileged boundary.
What should be verified for HTTPS management trust?|The intended endpoint and valid trusted certificate/transport policy.|An encrypted connection to the wrong endpoint is insufficient.
What coupling can shared-NIC mode introduce?|Management may depend on workload NIC/port attachment and policy.|Physical mode affects failure domains.
What completes OOB recovery evidence?|Original authorized read/control scope, denied guest operation and exact restored path/roles with redacted audit.|A healthy host OS is not that evidence.''')

add('s6-g5-t1','oob',
'Integrated Lights-Out is HPE server management implemented by supported controller hardware/firmware. This lesson uses iLO 6 security guidance for architectural orientation; feature availability, dedicated/shared-port support, licenses and exact procedures depend on the server and release.',
'iLO exposes supported inventory/health and privileged console/power functions while retaining controller/standby and upstream network dependencies.|Supported dedicated or shared network mode changes attachment coupling, so verify the actual server capability and intended management boundary.|Account roles, trusted transport, certificate/time context and audit retention govern the operation; a successful login does not authorize every function.',
'Inventory exact server, iLO generation, firmware, NIC mode and licensed functions through approved read-only management. Design role-scoped jump access and preserve local recovery before guided network/credential changes; no iLO session is run here.',
'Apply the official generation-specific security guide and protect console/media/power roles. Keep credentials out of workbook commands and screenshots and do not disable certificate validation to make a demonstration connect.',
'Controller functions have supported resource/connection limits and may depend on license or firmware. A responsive web page does not establish complete remote-console or virtual-media capacity.',
'iLO generation~Controller family~Support varies by server/release.|NIC mode~Dedicated or supported shared attachment~Changes physical dependencies.|Feature entitlement~Supported/license scope~Does not replace role permission.',
'sha256sum labs/data-center-workbook.md','ilo,redfish',
'''An iLO page opens but the operator cannot start remote console. What should be checked beyond reachability?|Exact supported feature/license, role permission and release requirements.|A web login does not grant every function.
Does every HPE server necessarily have a dedicated iLO port?|No; validate the actual supported hardware.|Generational guidance is not a universal hardware assertion.
Can iLO remain available when the host OS is stopped?|On supported powered/controller-ready systems, yes.|Host independence still requires standby power and upstream access.
Why record the iLO generation with firmware?|Procedures and security capabilities differ by release/family.|The product name alone is insufficient.
Is a shared NIC mode physically independent of the workload NIC?|Not necessarily.|Shared attachment introduces coupling that must be documented.
Should certificate checks be disabled to simplify a lab login?|No.|Trusted endpoint validation is part of the management boundary.
Why limit virtual-media privileges?|They can affect boot and bypass workload OS controls.|Management permissions have a wider impact than simple inventory.
Does a licensed feature automatically grant an account permission?|No.|Entitlement and role authorization are separate.
What should be retained before changing iLO network settings?|Exact supported baseline and independent local recovery.|The change can remove the remote path used to administer it.
What verifies an iLO recovery?|Original authorized operation, denied unprivileged operation and exact restored supported state.|No actual vendor session is inferred from the worksheet.''')

add('s6-g5-t2','oob',
'Integrated Dell Remote Access Controller is privileged management on supported PowerEdge servers. This lesson anchors security discussion to the iDRAC9 5.x guide; hardware, firmware, license and NIC-mode support must be checked for the actual server rather than inferred across every generation.',
'iDRAC inventories supported host health and can provide role-scoped console, media and power operations while the OS has a separate lifecycle.|Dedicated/shared network and failover modes affect actual management attachment and its common parents.|Identity roles, certificate trust, audit and feature entitlement determine permitted operations after a network path is established.',
'Record server model, iDRAC generation/firmware, NIC mode, supported feature/license and role design through approved read-only observation. Retain local recovery before any guided network/account change; no RACADM or iDRAC API command is executed.',
'Treat remote console, virtual media and power as privileged. Use protected management ingress, trusted endpoint validation, minimal roles and sanitized audit; avoid public/default credential deployments.',
'Management readiness and original workload health are independent observations. Firmware tasks, console/media and connection limits have model/release constraints and do not make iDRAC a workload-performance sensor for every layer.',
'iDRAC version~Supported controller context~Generation/release matters.|Dedicated NIC~Management attachment option~Does not prove upstream diversity.|Read/control roles~Scoped permissions~Power/media are higher-impact than inventory.',
'sha256sum labs/data-center-workbook.md','idrac,redfish',
'''Two servers say iDRAC but use different generations. Can one procedure be assumed identical?|No; validate exact generation/firmware/model guidance.|A product family label does not establish support.
Does a dedicated iDRAC NIC prove independent upstream management?|No.|It can still share switches, power and access services.
Can a read-only inventory role be separated from power control?|Yes in a supported role design; verify the actual role configuration.|Monitoring need not grant service-interruption capability.
What does a successful iDRAC login prove?|Accepted identity for that session, not permission for every action.|Authorization remains operation specific.
Why preserve certificate/time context?|Trust and audit interpretation depend on correct supported endpoint/time behavior.|Reachable HTTPS alone is weaker evidence.
Does license entitlement imply account authorization?|No.|Feature availability and role permission differ.
Why is virtual media security-sensitive?|It can affect boot and expose a path around workload OS controls.|Management has privileged reach.
What should a management NIC-mode change preserve?|Exact prior mode/address/policy and independent recovery.|An incorrect attachment can lock out remote administration.
Does iDRAC health alone certify application recovery?|No.|The original user transaction must be verified separately.
What completes an iDRAC recovery record?|Supported version/role/path and original authorized/denied management operations after exact restore.|No actual iDRAC execution is claimed here.''')

add('s6-g5-t3','oob',
'Cisco Integrated Management Controller provides privileged management for supported Cisco compute systems. Standalone CIMC management, UCS Manager and Intersight are distinct operational contexts; support and control ownership depend on the actual server, mode, firmware and integration.',
'The supported controller exposes inventory, health and role-scoped console/power functions with standby and upstream path dependencies.|NIC mode and redundancy settings select a supported management attachment; dedicated mode alone does not establish all upstream failure diversity.|Authentication/roles, trusted endpoint and audit govern each operation, while central integration can change where configuration ownership is consumed.',
'Record exact server, CIMC firmware, standalone/integrated ownership and supported NIC mode. Use the release-specific guide to preserve an independent local recovery path before any guided management/role change; no CIMC CLI/API is executed.',
'Follow the Cisco hardening context for management access, roles and supported transport. Protect console/media/power and avoid publishing credentials or assuming workload OS controls govern the controller.',
'A reachable CIMC and a healthy host are different observations. Controller connection/function support and update effects need exact release evidence, not a generic expectation of unlimited remote management.',
'CIMC~Compute management controller~Privileged and host-OS independent within support.|Ownership mode~Standalone or integrated context~Determines configuration consumer.|NIC mode~Supported management path choice~Trace shared parents.',
'sha256sum labs/data-center-workbook.md','cimc,redfish',
'''A server has CIMC. Does that automatically mean UCS Manager controls it?|No.|Standalone and integrated ownership contexts differ.
Why record firmware and ownership mode before a change?|Supported settings and their actual configuration consumer depend on context.|A command in the wrong control plane may not govern the target.
Does dedicated NIC mode prove independent power?|No.|Standby and upstream switch/supply parents remain relevant.
Can CIMC access remain possible while the workload OS is stopped?|On a supported controller-ready powered path, yes.|Host independence is not independence from all dependencies.
What does management reachability fail to establish?|Identity, operation permission, endpoint trust and original service.|A path alone is insufficient.
Why restrict power/virtual-media roles?|They can disrupt service or bypass the workload OS boundary.|Controller permissions have privileged impact.
Should CIMC be treated as identical to Intersight?|No.|They represent different local/central management contexts.
What recovery must precede a NIC-mode change?|Supported exact baseline and tested independent local access.|The new mode can remove the current remote path.
Can a controller health page verify workload recovery?|No.|Original application operations require a separate observer.
What completes CIMC recovery evidence?|Correct ownership/version/path and original allowed/denied operation results after restore.|The worksheet does not execute a Cisco management session.''')

add('lab-6','rack',
'The Data Center Foundations Lab designs three racks as one dependency system: elevations, independent full-load power paths, cooling/airflow, fabric/cable schedules, capacity and protected OOB access. Its deliverables are explicit classroom artifacts, while physical installation, power loss, cooling and vendor sessions remain guided external exercises.',
'Map assets to R1/R2/R3 occupied U intervals and workload dependencies; validate no overlap while retaining dimensions, rails/mass and service-clearance requirements separately.|Trace every PSU and fabric/OOB cable to its upstream parent; compare each surviving rack/site feed and cooling envelope with the complete stated load.|Preserve allowed administrator read and denied guest access in the offline plan, introduce one owned feed-capacity fault, restore exact serialized baseline and verify declared design predicates again.',
'Produce the workbook three-rack elevations, A/B cord-to-source schedule, sensible cooling sheet, leaf-spine cable endpoints and protected OOB address/policy map. Run the optional offline owned plan rehearsal and keep its JSON validation distinct from actual service or physical observations.',
'Use documentation-only addresses and no credentials in the plan. Separate management identity/operation from workload access; facility and hardware execution requires exact supported ownership, approved qualified procedures and independent recovery.',
'The baseline declares R1/R2/R3 loads 6/6/4 kW, each rack survivor allowance 8 kW, each site survivor allowance 20 kW and 20 kW sensible cooling. These invented inputs pass only the stated arithmetic and design predicates, not physical capacity or compliance certification.',
'Elevation artifact~Three named rack maps~Inclusive intervals and remaining physical checks.|Capacity artifact~Rack/site survivor and cooling budgets~Inputs are declarations.|Recovery artifact~Owned fault and exact baseline restore~Offline predicates, not live failover.',
'sha256sum labs/data-center-workbook.md','fabric,ups,cooling,redfish',
'''R1/R2/R3 loads are 6, 6 and 4 kW. What site IT load belongs in the capacity sheet?|16 kW.|Sum all declared rack loads without averaging them.
Each site path has 25 kW rating at an 80% allowance. What survivor envelope applies?|20 kW per path.|The complete 16 kW load must fit each independently.
R1 feed B allowance becomes 4 kW while R1 load remains 6 kW. What design requirement fails?|R1 full-load survival after A loss.|Healthy sharing does not repair inadequate B capacity.
Why preserve exactly three original racks?|The original lab objective requires their elevations and coordinated dependencies.|Do not replace it with a one-server demonstration.
At 16 kW and 2 m³/s with the declared coefficients, what mean air rise results?|About 6.63 K.|Sixteen divided by 1.2 times 1.005 times two.
Does 20 kW sensible cooling prove maximum inlet compliance?|No.|Distribution, humidity and supported inlet conditions remain unmeasured.
What does the offline guest denial test prove?|The supplied design policy rejects that declared read operation.|It does not deploy a firewall, identity provider or BMC.
What establishes exact plan restoration?|Restored serialized bytes/hash plus repeated baseline design checks.|A visually similar diagram can differ in policy or capacity.
Why keep fabric and OOB cable paths separately documented?|Management recovery should expose coupling to workload and upstream domains.|Different colors alone do not prove independence.
What completes lab acceptance within this course scope?|All six design deliverables, reviewed calculations, offline fault/restore and explicit guided physical/vendor limits.|No actual three-rack installation or live failover is claimed.''')
