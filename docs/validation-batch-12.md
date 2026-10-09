# Network Services acceptance — 2026-10-09

Batches 11 and 12 contain all 30 original Network Services units, including the integrated lab. The section adds 300 original exams and 90 quick checks. The course now has 165 accepted original lessons, 1650 exams and 495 quick checks; 277 originals remain. Next editorial work is Batch 13, Network Security, `s5-g0-t0`.

The primary assistant personally authored and reviewed the explanations, source applicability, ten answers/explanations per topic, distractors and topic-specific guided build/fault/restore procedures. Six inspected contact sheets contain 90 desktop worksheet, flow and narrow dark-theme views. Browser assertions additionally cover both themes at 1440/768/390/320 pixels, table start/end access, keyboard controls, reset/invalid handling, static/reduced-motion flow, all 300 exam feedback paths, incorrect multiple-choice feedback, copy, study/editorial independence, file URLs, search and original next/previous adjacency.

All nine declared regression commands passed. The independent model suite covers 741 declaration/arithmetic/transition checks. Four local read-only inspections passed. Actual loopback tests verify protected HTTPS hostname/trust checks, expected HTTP content, UDP log-marker receipt/retention and owned resource cleanup. The wider audit visits all 165 authored routes, checks prerequisite availability/cycles, DOM/accessible names, anchors, adjacency, contrast tokens, lazy bundle loading and local search.

The browser worksheets consume supplied declarations and bounded arithmetic; they do not run protocols or query devices. Target configuration, NTP synchronization, SNMPv3 agents, AAA, physical links, vendor parser support and installation/operation of PRTG/Zabbix/LibreNMS/Grafana/Prometheus remain guided and unexecuted. The TLS fixture uses a disposable self-signed local identity rather than public PKI; the UDP fixture is a scripted receiver, not a production Syslog daemon. Those limits are part of acceptance, not omitted tests claimed as executed.

Evidence: [regression](network-services-regression-results.json), [browser](browser-network-services-results.json), [models](network-services-model-results.json), [actual fixtures](network-services-fixture-results.json), [commands](commands-network-services-results.json), [primary content review](network-services-primary-review.json), [question review](network-services-exam-review.json), [manual rendering hashes](network-services-manual-review-hashes.json), [full audit](quality-audit-batch-12.json), [source applicability](research-network-services.md), [Batch11 matrix](acceptance-batch-11.json), [Batch12 matrix](acceptance-batch-12.json), [workbook](../labs/network-services-workbook.md).

Reproduce from the Windows project root with the existing localhost preview on 127.0.0.1:8765:

```powershell
python tools/regression-network-services.py
```

The runner uses the documented installed Node/Playwright runtime and headless Microsoft Edge, plus Ubuntu-24.04 in WSL for the owned OpenSSL/Python fixtures. It performs no dependency installs or production service configuration. A separate post-acceptance check verifies all 30 reviewed headers/catalog entries and the next preserved pending outline; see [accepted-state evidence](network-services-final-verification.json).
