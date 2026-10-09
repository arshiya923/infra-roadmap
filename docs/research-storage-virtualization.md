# Source review and teaching scope — 2026-10-09

Primary sources were checked through web retrieval and an independent link-retrieval script. [Raw retrieval results](storage-virtualization-source-checks.json) retain HTTP 403 responses, including several pages whose contents were available through the web tool. A 200 status only proves retrieval, not technical correctness or support. The course source metadata records the review date, not the vendor publication date.

- Red Hat Enterprise Linux 9 storage, multipath, file-service and virtualization manuals support the layer and operational distinctions. Linux concepts are not presented as VMware, ONTAP or Windows configuration recipes.
- RFC 7143 anchors iSCSI transport, naming and authentication. CHAP is not described as payload encryption.
- Microsoft SMB and Hyper-V documentation distinguishes negotiated security properties and a type 1 hypervisor with a management partition. No current licensing or scale-limit recommendation is made.
- ONTAP documentation separates WWPN zoning, SVM/LIF context and igroup/LUN mapping. Logical service boundaries retain their physical dependencies.
- Cisco MDS 9.x and Nexus 9.3(x) sources are release-scoped. Defined policy, active enforcement and storage presentation remain separate. No FC/FCoE target or command parser was executed.
- Brocade FOS 8.2.x command reference is a historical primary source for defined/effective zoning terminology, not an assertion of current support or an upgrade recommendation. The generic product landing page did not provide reliable web-tool access, so the lesson points to the actual reference PDF.
- HPE MSA 1060/2060/2062 management concepts and Dell PowerStore volume concepts are explicitly family-scoped. Other generations and Dell families require their own manuals.
- Broadcom ESXCLI references identify read-only inventory commands. vSphere cluster, vMotion and snapshot references support the separation of management, migration, restart, placement and dependent rollback state. The lesson targets ESXi/vCenter 8.x concepts without asserting current licensing or lifecycle status. Commands remain guided/unexecuted.
- Linux kernel KVM documentation, Docker documentation and Kubernetes component documentation support the alternative-platform concepts. An offline Python process is never labelled a VM, container or Kubernetes deployment.

Original scenarios, arithmetic examples, questions and failure exercises were authored for this course. Source support for a concept is not runtime evidence for a scenario. No certification alignment, hardware compatibility certification, workload benchmark or complete accessibility audit is claimed.
