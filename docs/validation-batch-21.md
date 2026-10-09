# Storage & Virtualization complete — 2026-10-09

All **47 original units in Batches 19–21** are authored, reviewed and editorially accepted: 470 exam questions, 141 quick checks, mechanism diagrams, incident exercises and the integrated lab. Batch 21 contributes six units, 60 exams and 18 quick checks. Course editorial progress is **321/442**, with 3,210 exams and 963 quick checks. Learner checkmarks remain independent. Next is Batch 22 (`s9-g0-t0`); it has not been started by this task.

## Evidence

| Check | Result and scope |
|---|---|
| Topic content | [Batch 19](storage-virtualization-content-19-results.json), [20](storage-virtualization-content-20-results.json), [21](storage-virtualization-content-21-results.json): exact bundles, assessments and actual offline inspector invocation for every new topic. |
| Primary review | [Storage](storage-virtualization-primary-review-19.json), [arrays/VMware](storage-virtualization-primary-review-20.json), [alternatives/lab](storage-virtualization-primary-review-21.json): all 611 answers reviewed; 13 contact sheets contain 141 desktop/mobile/flow captures, with additional topology views. Exact lesson and question hashes are retained. |
| Interactive models | [6,718 checks](storage-virtualization-model-results.json): path truth table, payload arithmetic, homogeneous capacity envelope, migration prerequisites, snapshot budget and replica-state boundaries. Invalid inputs remove stale results. |
| Integrated executable lab | [24,619 checks](storage-virtualization-lab-results.json): 4,096 synthetic topology combinations, actual owned-file corruption/restore and five interrupted cleanup runs. |
| Focused reader | [22 storage routes](browser-storage-virtualization-19-results.json), [19 arrays/VMware routes](browser-storage-virtualization-20-results.json), [six final routes](browser-storage-virtualization-21-results.json): questions, incident states, four widths, two themes, file URLs, clipboard, downloads, keyboard and learner/editorial separation. |
| Final integration | [Final browser checks](storage-virtualization-final-browser.json): cross-batch navigation, unloaded-topic search, byte-identical lab download, diagram and result-table scrolling, all 47 accepted catalog records. |
| Whole course | [321-route audit](quality-audit-batch-21.json): prerequisites, original adjacency, named controls, local loading/search and page exceptions. Shared-reader regression also passes all 18 checks. |

## Run the lab

From the course root, using Python 3.10 or newer:

```text
python labs/storage-virtualization.py --run
```

The [workbook](../labs/storage-virtualization-21-workbook.md) preserves the original topology: two SAN switches, three virtualization hosts, redundant guest-network switches and a shared dual-controller array. It includes explicit optional procedures for real-platform path failure and VM restart verification.

Normal execution reports `PASS` and `planRestored`, `dataRestored`, `cleaned` all true. To test interruption cleanup:

```text
python labs/storage-virtualization.py --run --inject-failure host-fault
```

This intentionally reports `INTERRUPTED`, exits with code 2 and still restores/removes only owned temporary artifacts. Other phases are `baseline`, `path-fault`, `corruption` and `restored`. Without `--run`, the script only prints help. It accepts no deletion path and touches no host devices, network configuration or services.

Reproduce the main checks with `node tests/content.cjs`, `node tests/storage-virtualization-models.cjs`, `python tests/storage-virtualization-lab.py`, the three `python tests/storage-virtualization-content.py BATCH` invocations, `node tests/storage-virtualization-final-browser.cjs --accepted`, `node tests/browser.cjs` and `node tests/quality-audit.cjs`. Focused browser tests take batch argument `19`, `20` or `21`. Browser setup is documented in [validation setup](validation.md).

## Limits and review findings

SAN paths and VM placement are synthetic. Actual execution covers authored-data inspection and small temporary-file operations, including byte corruption detection, restoration and cleanup. It does not prove real SAN failover, VM boot/migration, HA timing, application recovery or independent physical backup durability. Vendor commands and the real-platform extension remain guided and unexecuted. Docker and Kubernetes lessons do not install or run those services.

Review corrected the prediction-field layout, integer-capacity input scope, topology connector visibility and text encoding. Mobile diagram screenshots now wait for a painted scroll state. The initial responsive timing failure is retained in the Batch 20 narrative; the passing rerun checks the actual width condition. Source-retrieval restrictions are recorded in the [research notes](research-storage-virtualization.md), not represented as successful HTTP checks. No GapCode or delegated agents were used.
