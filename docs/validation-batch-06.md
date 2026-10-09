# Batch 06 acceptance — 2026-10-08

All twelve original Batch 06 nodes are authored and editorially accepted: eleven diagnostic topics plus `lab-1`. Overall: **61/442 accepted units, 610 exams, 183 quick checks**. Batch 06 contributes 120 exams and 36 quick checks. The next original node is `s2-g0-t0` in Batch 07; the usage-bounded overall build remains active.

The integrated lab satisfies the original ARP/DHCP/DNS/TCP-handshake/ICMP capture requirement with real traffic on isolated veth links. DHCP transaction/client identity and Offer/ACK address/router/DNS fields pass independent TShark assertions. A TCP stream contains opening flags; separate payload replies verify FIELD/OK. Gateway ARP and matched ICMP directions are present. During the deliberate server return-route fault, a server-interface capture contains incoming client SYNs and no SYNACK; local gateway echo/DNS controls continue. Restoring the specific route restores the original transaction.

`tests/network-fundamentals.py` passes inert help, retained and temporary CLI runs, repeated normal execution and two injected cleanup failures. Host links, IPv4/IPv6 routes, forwarding settings, resolver bytes and service-process inventory are unchanged. Raw host inventory is not retained. Four integrated-lesson commands are verified, with the retained output path substituted by a new test-owned temporary path. The default run removes its evidence; explicit --output refuses existing directories and preserves captures for learner annotations.

Fresh evidence: 14 Batch 06 browser checks, 18 general browser checks, the 61-route quality audit (9 checks, local search 165 ms), packet-model binary comparisons and independent PCAP/filter/checksum tests pass. The integrated mobile screenshot was visually inspected. Forty topic commands pass after installing Ubuntu traceroute 2.1.5; the old optional-tool gap is resolved. Integrated commands are tracked separately in network-fundamentals-results.json rather than silently omitted from command coverage.

Technical review: preserve route-selected next hop versus remote destination; address presence versus reachability; DNS status versus process exit; socket establishment versus application exchange; trace response versus forwarding path; captured bytes versus original length; and synthetic browser scenarios versus executed packet evidence. Every unit retains its full sections, lab, comparisons, mechanisms, three checks and ten distinct exams. Source review is in research-batch-06.md. Automated structure/contrast checks supplement manual inspection; they are not a full accessibility certification.

Scope limits: shared-kernel Linux virtual links and bounded local Windows/Linux tools. No physical router, external reachability, production availability, throughput, TLS or desktop Wireshark GUI automation is claimed. Optional GUI steps remain clearly labelled. Old checkpoints below preserve history and are superseded by this acceptance record.

# Batch 06 draft checkpoint — resumed 2026-10-08

## Integrated lab runner checkpoint — 2026-10-08

The user explicitly reconfirmed that GapCode must not be used. Work resumed directly. `labs/network-fundamentals.py` now creates a client, gateway and server in three owned Linux network namespaces, with no host uplink. WSL prerequisites added: dnsmasq-base 2.91 and BusyBox 1.36.1. Default invocation prints help; execution requires root, `--run` and a new `--output` directory. Existing output directories are refused.

The runner obtains 192.0.2.10 through DHCP, resolves app.lab.test through the isolated gateway, and exercises ICMP plus a bounded TCP FIELD/OK exchange with 198.51.100.20. Removing the server return route breaks ICMP and the application while gateway DNS still works. Restoring that route recovers both. The dedicated DHCP hook never edits the host resolver. This hook intentionally installs the known lab address and route after checking the assigned address; it is not a general-purpose DHCP configuration script.

Fresh `tests/network-fundamentals.py` passes real DHCP Discover/Offer/Request/ACK, DNS answer, TCP flag, gateway ARP and ICMP checks. It verifies normal cleanup and injected failures after namespace creation and after service/capture startup. Host interface inventory, IPv4/IPv6 routes, forwarding, resolver bytes and relevant process inventory remain unchanged. All owned long-running processes are stopped and reaped before namespace deletion.

A capture-delivery defect found during review was repaired: immediate capture delivery and an explicit check for both saved application replies now precede capture shutdown. The verified sample is `docs/network-fundamentals-verified/traffic.pcap`, with its logs and result.json beside it. `docs/network-fundamentals-run/` is the earlier development sample, which lacks the final recovery packets; do not use it as complete recovery evidence. Protocol packet counts vary naturally with retries and timing. Capture is capped at 200 packets, and process readiness and each foreground operation have deadlines. This is virtual IPv4 networking, not a physical-wire, external-service, IPv6 or Wireshark GUI validation.

The integrated lesson remains unauthored. Counts remain 60 authored / 49 accepted; Batch 06 is not accepted. Next: author lab-1, provide packet-field/path/timing annotation exercises and its 3 quick checks / 10 exams, then review the full batch.

## Current checkpoint: capture-analysis drafts

Resumed at the user's request after the weekly allowance reset; the usage tool showed 86% remaining. The 30% stopping limit remains in effect. Current availability is **60 authored units, 600 exams and 180 quick checks**, with **49/442 accepted**. Batch 06 has eleven drafts through Wireshark (110 exams, 33 quick checks); only `lab-1`, Networking Fundamentals Lab, remains before full batch acceptance review.

Installed Ubuntu repository packages tcpdump and tshark in WSL (tcpdump 4.99.4 and Wireshark/TShark 4.2.2). No Windows GUI or capture driver was installed. Exact lesson commands read a generated file or report versions; they perform no live capture. The localhost preview server had stopped and was restarted bound to 127.0.0.1:8765.

New evidence: 13 Batch 06 browser checks PASS, 19 Batch 04 regression checks PASS, 18 general browser checks PASS. The expanded cross-course audit passes all 60 routes and verifies previous/next adjacency against the original inventory, including unfinished labs; local search measured 154 ms. A discovered footer fallback skipped the pending lab after Wireshark. It now follows original node order without filtering out labs. The 38 reviewed command examples pass; optional Linux traceroute remains the one recorded unavailable command.

`labs/packet-fixture.pcap` contains ten deterministic generated Ethernet records: ARP 2, ICMP 2, TCP 4, DNS/UDP 2. Its SHA-256 is `6fac48f1c199a3f88130a56073ef267635f403237d512fabffe63190b9fa4db5`. Records omit Ethernet padding/FCS; these are teaching capture bytes, not a physical-wire measurement. Fixed timestamps are authored. Packet 10 deliberately saves 54 of 162 bytes, leaving 108 declared payload bytes unavailable. Complete IPv4/ICMP/transport checksums pass independent checks; transport checksum validation is intentionally not claimed for the truncated record.

`tests/packet-fixture.py` passes binary structure/hash checks, five libpcap filter cases, six Wireshark display-filter cases, rejection of cross-language filter mistakes and unchanged input after offline analysis. `tests/packet-models.cjs` independently reads the PCAP to check every displayed protocol and length, five exact category sets, invalid-category rejection and state independence. Browser checks cover keyboard selection, truncation explanation, filtering/reset, direct-file use, four viewport widths and exact binary download; the mobile inspector screenshot was visually reviewed.

Wireshark GUI steps are guided but unexecuted; TShark validates the offline dissector/filter behavior. Neither the fixture nor its browser inspector captures traffic or proves real timing, TLS, external reachability or application health. The older stopping checkpoints below are historical and are superseded by this resume checkpoint.

## Stopping checkpoint: requested weekly allowance reached

The authoritative Codex usage tool reported 70% used / 30% remaining in the 10080-minute weekly window. Authoring stopped at that boundary; final verification and checkpoint records were completed. This fulfills the usage-bounded build run, not the entire curriculum.

Current state: nine Batch 06 drafts through `ss`, 90 exams and 27 quick checks. Overall: **58 authored units, 580 exams, 174 quick checks; 49/442 accepted**. The three remaining Batch 06 nodes are tcpdump (`s1-g5-t9`), Wireshark (`s1-g5-t10`) and Networking Fundamentals Lab (`lab-1`). Batch 06 remains in progress and all nine lessons retain draft labels.

Final evidence: content/identity checks PASS; 11 Batch 06 browser checks PASS across nine lesson contracts and four viewport widths; 18 general browser checks PASS; broader audit PASS across all 58 routes (local search 165 ms). The command allowlist validates 30 examples and records one UNAVAILABLE optional Linux traceroute command. Legacy Linux arp/netstat are also absent and their lessons explicitly use installed Windows counterparts or Linux iproute2 alternatives, without claiming those absent utilities were executed.

The socket-inspection lab passed on both Windows netstat and Linux ss. Each provider observes a TCP listener, a UDP binding, an accepted TCP connection, a separately checked PING/OK exchange and listener removal. Harness instrumentation verifies ephemeral loopback-only binds/connects, all four sockets closed normally, and both initial sockets closed after an injected inspection failure. No external listener, production application, IPv6 socket behavior, TLS, backlog load or firewall change is claimed. Evidence: `socket-lab-windows-results.json` and `socket-lab-linux-results.json`.

The new arp lesson retains next-hop/interface context and distinguishes cache evidence from identity, routing and switch forwarding. Windows socket-state labels and options are separated from Linux ss semantics. The exact downloadable socket lab and ss quiz feedback passed browser checks. Historical checkpoints below retain their original counts.

## Historical six-lesson checkpoint

Latest checkpoint: six drafts through `ip`, with 60 exams and 18 quick checks. Overall: 55 authored units, 550 exams and 165 quick checks; accepted progress remains 49/442. Six Batch 06 nodes remain, starting at `s1-g5-t6` (arp). Historical two-lesson evidence below retains its checkpoint counts.

The extension adds nslookup, dig, ipconfig and ip. Ten current Batch 06 browser checks passed across all six contracts and four viewport widths, with DNS case selection/disclosure, exact lab download, direct-file operation and no page errors. The general 18-check browser suite also passed after moving the outline fixture to arp. A broader audit passed all 55 authored routes; local search measured 139 ms. DNS mobile layout was visually reviewed.

The DNS lab passed seven checks: inert help; seven real BIND dig/nslookup cases; loopback-only ephemeral UDP/TCP listeners; independent response-header/question/A-data checks; malformed/compressed-question rejection and unrelated-name refusal; normal/injected-failure cleanup; unchanged host resolver configuration. The five browser DNS cases match the recorded client status/exit evidence. The fixture has no recursion, cache, delegation or DNSSEC implementation; Windows DNS-client behavior and external DNS paths are not tested.

The command harness streams and discards `/displaydns` output because the host cache exceeded the original synchronous output buffer. It stores no raw cache names. Windows `ipconfig /?` printed the requested help and returned 1 on this host; the lesson and test record that implementation-specific result explicitly instead of pretending every useful command exits zero. No cache was flushed and no adapter was renewed or released.

The final command allowlist run validated 19 examples, with one explicit UNAVAILABLE result for optional Linux traceroute. Exact exit codes and scopes are saved in `commands-results-batch-06.json`. Browser and content checks passed; no partial Batch 06 acceptance is implied.

## Historical two-lesson checkpoint

Two drafts are available: `s1-g5-t0` (ping) and `s1-g5-t1` (traceroute), with 20 original exams and six quick checks. Overall authored count is 51, while accepted editorial progress remains 49/442. Ten Batch 06 nodes remain, beginning with `s1-g5-t2` (nslookup). This is not Batch 06 acceptance.

Fresh evidence:

- Content contracts: 51 units, 510 exam questions, 153 quick checks; immutable original hash unchanged.
- Eight Batch 06 browser checks passed: full contracts and draft labels, separate timing/missing-response interpretation, scenario disclosure/reset, keyboard controls, narrow layouts, screenshots, outline navigation, quiz feedback, direct-file use and no page/resource errors. Mobile trace screenshot visually reviewed.
- Diagnostic model tests passed six independent numeric expectations, ten invalid sample cases and eight scenario contracts, with copy independence. Missing replies are excluded from timing; an all-missing sample reports timing unavailable. A real zero RTT remains a valid observed value.
- Six exact bounded loopback commands passed: Linux IPv4/IPv6 ping, Windows IPv4/IPv6 ping and Windows IPv4/IPv6 tracert. Linux `traceroute --help` is recorded as UNAVAILABLE because the package is absent; it was not installed or represented as executed successfully.
- The broader current audit passed all 51 authored routes, including prerequisite availability, named controls, DOM IDs, lazy loading, core contrast and page exceptions. Local search measured 146 ms. This draft audit updates `quality-audit-latest.json` without replacing the saved Batch 05 acceptance snapshot.

The explorer uses invented observations and sends no traffic. It does not parse arbitrary real trace output, locate a fault automatically or estimate end-to-end service availability. Windows traces go only to loopback and do not validate a multi-router path. Linux traceroute's optional help command and platform distinction are visible in the lesson.

Evidence files: `browser-results-batch-06.json`, `commands-results-batch-06.json`, `diagnostic-models-results.json`. Run the correspondingly named tests before extending the batch; keep its drafts separate from accepted IDs.
