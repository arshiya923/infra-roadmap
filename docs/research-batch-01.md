# Batch 01 research and technical review

Research performed 3–4 October 2026. Sources were used to verify specific behavior; instructional wording, examples and assessment questions are original. This is a foundational hardware batch, not a complete certification blueprint.

| Evidence | Applied to | Review outcome |
|---|---|---|
| [util-linux lscpu](https://www.man7.org/linux/man-pages/man1/lscpu.1.html) | CPU topology and virtual guest limitations | Separate physical cores, exposed threads and virtual topology. |
| [Linux CPU performance scaling](https://docs.kernel.org/admin-guide/pm/cpufreq.html) | Frequency/power policies | Do not equate advertised frequency with sustained application performance. |
| [procps vmstat](https://man7.org/linux/man-pages/man8/vmstat.8.html) | Interval evidence | Distinguish initial since-boot summary from subsequent interval rows. |
| [procps free](https://man7.org/linux/man-pages/man1/free.1.html) | Memory accounting | Explain available versus free memory. |
| [Linux physical memory](https://www.kernel.org/doc/html/latest/mm/physical_memory.html), [NUMA policy](https://cdn.kernel.org/doc/html/latest/admin-guide/mm/numa_memory_policy.html) | RAM/locality | Distinguish capacity from access locality. |
| [util-linux lsblk](https://www.man7.org/linux/man-pages/man8/lsblk.8.html) | Device hierarchy | Use explicit output columns; do not equate filesystem and physical disk. |
| [Linux writeback controls](https://docs.kernel.org/block/writeback_cache_control.html) | Persistence | Buffered completion and persistence are different boundaries. |
| [pciutils lspci](https://man7.org/linux/man-pages/man8/lspci.8.html), [Linux DMA guide](https://docs.kernel.org/core-api/dma-api-howto.html) | Enumeration, drivers and memory access | Distinguish enumeration, driver binding, link status and DMA. |
| [Dell R340 expansion guidelines](https://www.dell.com/support/manuals/en-us/poweredge-r340/per340_ism_pub/expansion-card-installation-guidelines?guid=guid-56f8fff3-347d-4f79-b759-6d09f74c2cc9) | Physical versus electrical slots | Concrete vendor confirmation of differing connector width and electrical bandwidth; not a purchase recommendation. |
| [Linux interface statistics](https://docs.kernel.org/networking/statistics.html), [ip-link manual](https://man7.org/linux/man-pages/man8/ip-link.8.html) | NIC observations | Counters and state require scope and driver context. |
| [Linux MD arrays](https://docs.kernel.org/admin-guide/md.html) | RAID operation | Inspect health without teaching force-assembly or destructive host-device changes. |
| [Dell RAID specifications](https://www.dell.com/support/kbdoc/en-us/000128635/dell-servers-what-are-the-raid-levels-and-their-specifications) | RAID capacity/tolerance | Verify RAID 10 mirror-pair dependence and RAID 5/6 parity limits. Avoid vendor prose suggesting zero delay or universally improved performance. |

## Assessment research and limitations

The provider-hosted [CompTIA Core 1 objectives draft](https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/under-development/draft-comptia-a-220-1201-exam-objectives-%281-0%29.pdf?sfvrsn=db69af5f_4) identifies hardware and troubleshooting skills including processors, memory, storage and RAID. It is labelled a draft and is used only as historical skill-scope context. The attempted current CompTIA page/objective endpoint was not retrievable in this environment. No current exam alignment, weighting or exact question-frequency claim is made.

Questions therefore test original scenarios and technical reasoning, not copied exam items. Each lesson includes beginner, intermediate, advanced, troubleshooting and design prompts as appropriate. There is one automatically scored multiple-choice question and nine written-response questions per lesson. Every question has an answer, rationale and tested concept. Written answers are explicitly self-assessed; opening a model answer earns no automatic correctness credit.

## Command validation context

Read-only lscpu, free, vmstat, lsblk, ip link, ip route and uname invocations were exercised in Ubuntu 24.04 under WSL2 (kernel 6.6.87.2-microsoft-standard-WSL2). Observed virtual CPU topology, memory accounting, block hierarchy and virtual interface output matched the interpretation described. The local WSL installation lacks pciutils/lspci; its syntax was checked against the primary manual, and the lab explicitly supplies synthetic evidence when physical capabilities are unavailable. Interactive top behavior is documented rather than a claim of physical-host stress testing.

No benchmark, destructive disk operation, memory exhaustion, physical cable removal or RAID hardware failure was performed. Simulator predictions and read-only inspection are the intended Batch 01 lab scope.
