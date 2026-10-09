# Capstone source and design review

Reviewed 2026-10-09 by the primary assistant. No GapCode used.

The primary references were opened during authoring, not inferred from their titles:

- [NIST SP 800-34 Rev. 1](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final): contingency planning and recovery objectives. The document dates to 2010 and is used as a planning reference, not a current product prescription.
- [Cisco reliable FC SAN design](https://www.cisco.com/c/dam/en/us/td/docs/dcn/whitepapers/design-a-reliable-and-highly-available-fibre-channel.pdf): independent fabric boundaries. The 2017 white paper is not evidence of current model support; no specific appliance purchase or firmware compatibility is asserted.
- [Google SRE monitoring](https://sre.google/sre-book/monitoring-distributed-systems/): workload symptoms and service signals.
- [Python SQLite backup](https://docs.python.org/3/library/sqlite3.html#sqlite3.Connection.backup): backup API used by the executed companion. Actual execution here uses installed Python 3.12; documentation on the unversioned URL may describe newer Python.

The original 15 deliverable names and logical architecture were reviewed against `original/index.html`. Original bytes remain unchanged. The worked native FC attachment is HBA → FC fabric → array target, not Ethernet leaf → FC fabric. EVPN/VXLAN and ACI remain distinct choices. The workbook explicitly exposes shared array, rack, power and administrative risks.

All numeric requirements, port schedules, addresses, placement and recovery budgets are fictional original teaching assumptions. Review corrected the initial user allocation to a /22 and a 949-address DHCP range, sufficient for the stated 500 users. Aggregate capacity is 160 against 140; the serial budget is 55 against 60; point age is 10 against 15. Equality is permitted by the worksheet but provides no margin. No model output is a deployment certification.

The 13 original questions were reviewed individually for correspondence with the published lesson. They cover independence, acknowledged loss, FC separation, survivor capacity, RTO, RPO, storage verification, fencing, policy after recovery, rack scope, restore content, stale-baseline rejection and evidence scope. Written answers are explicitly self-assessed in the shared reader.

Documentation was checked against actual script options and output. The first Windows run exposed SQLite handles remaining open after transaction contexts; an explicit connection-closing context fixed this. Later normal and all four supported interruption paths verified cleanup. The abandoned directory from the failed development run was removed by deleting its two known database files and then the empty directory. The script accepts no existing target path.

The Capstone was explicitly requested ahead of the recorded sequence. Concurrent Batches 25–27 drafts were preserved; their authorship or acceptance is outside this review.
