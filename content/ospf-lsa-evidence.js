'use strict';
(()=>{const evidence={
  "schemaVersion": 1,
  "date": "2026-10-09",
  "kind": "PRESERVED_ACTUAL_FRR_HEADERS",
  "sources": {
    "ospf-areas-lab-results.json": {
      "sha256": "bb94274d81c0ce420bd28d2163d8e6b0af2add4c9fa4f8e20374f81659b55a79",
      "date": "2026-10-09"
    },
    "ospf-dr-bdr-lab-results.json": {
      "sha256": "a8b12f50f4c54169ee624c8f9f1cce1378493ac2a89f7d3f87ce92478435ae91",
      "date": "2026-10-09"
    }
  },
  "snapshots": [
    {
      "id": "areas-r1-0",
      "experiment": "areas",
      "observer": "R1",
      "phase": "BASELINE",
      "area": "0.0.0.0",
      "source": "docs/ospf-areas-lab-results.json",
      "record": "DATABASE_R1",
      "label": "areas / R1 / BASELINE / area 0.0.0.0",
      "entries": [
        {
          "type": 1,
          "area": "0.0.0.0",
          "id": "1.1.1.1",
          "adv": "1.1.1.1",
          "sequence": "80000003",
          "checksum": "7752",
          "age": 11,
          "hint": "Router link count 3"
        },
        {
          "type": 1,
          "area": "0.0.0.0",
          "id": "2.2.2.2",
          "adv": "2.2.2.2",
          "sequence": "80000003",
          "checksum": "4759",
          "age": 12,
          "hint": "Router link count 2"
        },
        {
          "type": 3,
          "area": "0.0.0.0",
          "id": "198.51.100.0",
          "adv": "2.2.2.2",
          "sequence": "80000001",
          "checksum": "29B9",
          "age": 1,
          "hint": "Destination 198.51.100.0/24"
        },
        {
          "type": 3,
          "area": "0.0.0.0",
          "id": "203.0.113.4",
          "adv": "2.2.2.2",
          "sequence": "80000001",
          "checksum": "20EC",
          "age": 12,
          "hint": "Destination 203.0.113.4/30"
        }
      ]
    },
    {
      "id": "areas-abr-0",
      "experiment": "areas",
      "observer": "ABR",
      "phase": "BASELINE",
      "area": "0.0.0.0",
      "source": "docs/ospf-areas-lab-results.json",
      "record": "DATABASE_ABR",
      "label": "areas / ABR / BASELINE / area 0.0.0.0",
      "entries": [
        {
          "type": 1,
          "area": "0.0.0.0",
          "id": "1.1.1.1",
          "adv": "1.1.1.1",
          "sequence": "80000003",
          "checksum": "7752",
          "age": 12,
          "hint": "Router link count 3"
        },
        {
          "type": 1,
          "area": "0.0.0.0",
          "id": "2.2.2.2",
          "adv": "2.2.2.2",
          "sequence": "80000003",
          "checksum": "4759",
          "age": 11,
          "hint": "Router link count 2"
        },
        {
          "type": 3,
          "area": "0.0.0.0",
          "id": "198.51.100.0",
          "adv": "2.2.2.2",
          "sequence": "80000001",
          "checksum": "29B9",
          "age": 1,
          "hint": "Destination 198.51.100.0/24"
        },
        {
          "type": 3,
          "area": "0.0.0.0",
          "id": "203.0.113.4",
          "adv": "2.2.2.2",
          "sequence": "80000001",
          "checksum": "20EC",
          "age": 12,
          "hint": "Destination 203.0.113.4/30"
        }
      ]
    },
    {
      "id": "areas-abr-1",
      "experiment": "areas",
      "observer": "ABR",
      "phase": "BASELINE",
      "area": "0.0.0.1",
      "source": "docs/ospf-areas-lab-results.json",
      "record": "DATABASE_ABR",
      "label": "areas / ABR / BASELINE / area 0.0.0.1",
      "entries": [
        {
          "type": 1,
          "area": "0.0.0.1",
          "id": "2.2.2.2",
          "adv": "2.2.2.2",
          "sequence": "80000003",
          "checksum": "0E83",
          "age": 11,
          "hint": "Router link count 2"
        },
        {
          "type": 1,
          "area": "0.0.0.1",
          "id": "3.3.3.3",
          "adv": "3.3.3.3",
          "sequence": "80000003",
          "checksum": "4DC7",
          "age": 11,
          "hint": "Router link count 3"
        },
        {
          "type": 3,
          "area": "0.0.0.1",
          "id": "192.0.2.0",
          "adv": "2.2.2.2",
          "sequence": "80000001",
          "checksum": "1866",
          "age": 1,
          "hint": "Destination 192.0.2.0/24"
        },
        {
          "type": 3,
          "area": "0.0.0.1",
          "id": "203.0.113.0",
          "adv": "2.2.2.2",
          "sequence": "80000001",
          "checksum": "48C8",
          "age": 12,
          "hint": "Destination 203.0.113.0/30"
        }
      ]
    },
    {
      "id": "areas-r3-1",
      "experiment": "areas",
      "observer": "R3",
      "phase": "BASELINE",
      "area": "0.0.0.1",
      "source": "docs/ospf-areas-lab-results.json",
      "record": "DATABASE_R3",
      "label": "areas / R3 / BASELINE / area 0.0.0.1",
      "entries": [
        {
          "type": 1,
          "area": "0.0.0.1",
          "id": "2.2.2.2",
          "adv": "2.2.2.2",
          "sequence": "80000003",
          "checksum": "0E83",
          "age": 11,
          "hint": "Router link count 2"
        },
        {
          "type": 1,
          "area": "0.0.0.1",
          "id": "3.3.3.3",
          "adv": "3.3.3.3",
          "sequence": "80000003",
          "checksum": "4DC7",
          "age": 11,
          "hint": "Router link count 3"
        },
        {
          "type": 3,
          "area": "0.0.0.1",
          "id": "192.0.2.0",
          "adv": "2.2.2.2",
          "sequence": "80000001",
          "checksum": "1866",
          "age": 2,
          "hint": "Destination 192.0.2.0/24"
        },
        {
          "type": 3,
          "area": "0.0.0.1",
          "id": "203.0.113.0",
          "adv": "2.2.2.2",
          "sequence": "80000001",
          "checksum": "48C8",
          "age": 12,
          "hint": "Destination 203.0.113.0/30"
        }
      ]
    },
    {
      "id": "broadcast-late-r3-0",
      "experiment": "broadcast",
      "observer": "R3",
      "phase": "LATE",
      "area": "0.0.0.0",
      "source": "docs/ospf-dr-bdr-lab-results.json",
      "record": "LATE_DATABASE_R3",
      "label": "broadcast / R3 / LATE / area 0.0.0.0",
      "entries": [
        {
          "type": 1,
          "area": "0.0.0.0",
          "id": "1.1.1.1",
          "adv": "1.1.1.1",
          "sequence": "80000006",
          "checksum": "6ED7",
          "age": 13,
          "hint": "Router link count 2"
        },
        {
          "type": 1,
          "area": "0.0.0.0",
          "id": "2.2.2.2",
          "adv": "2.2.2.2",
          "sequence": "80000006",
          "checksum": "46F5",
          "age": 13,
          "hint": "Router link count 2"
        },
        {
          "type": 1,
          "area": "0.0.0.0",
          "id": "3.3.3.3",
          "adv": "3.3.3.3",
          "sequence": "80000004",
          "checksum": "2212",
          "age": 19,
          "hint": "Router link count 2"
        },
        {
          "type": 1,
          "area": "0.0.0.0",
          "id": "4.4.4.4",
          "adv": "4.4.4.4",
          "sequence": "80000005",
          "checksum": "F731",
          "age": 13,
          "hint": "Router link count 2"
        },
        {
          "type": 2,
          "area": "0.0.0.0",
          "id": "192.0.2.1",
          "adv": "1.1.1.1",
          "sequence": "80000003",
          "checksum": "1C44",
          "age": 13,
          "hint": "Current/retained network header; inspect current DR separately"
        }
      ]
    },
    {
      "id": "broadcast-failover-r3-0",
      "experiment": "broadcast",
      "observer": "R3",
      "phase": "FAILOVER",
      "area": "0.0.0.0",
      "source": "docs/ospf-dr-bdr-lab-results.json",
      "record": "FAILOVER_DATABASE_R3",
      "label": "broadcast / R3 / FAILOVER / area 0.0.0.0",
      "entries": [
        {
          "type": 1,
          "area": "0.0.0.0",
          "id": "1.1.1.1",
          "adv": "1.1.1.1",
          "sequence": "80000006",
          "checksum": "6ED7",
          "age": 28,
          "hint": "Router link count 2"
        },
        {
          "type": 1,
          "area": "0.0.0.0",
          "id": "2.2.2.2",
          "adv": "2.2.2.2",
          "sequence": "80000007",
          "checksum": "4EEB",
          "age": 7,
          "hint": "Router link count 2"
        },
        {
          "type": 1,
          "area": "0.0.0.0",
          "id": "3.3.3.3",
          "adv": "3.3.3.3",
          "sequence": "80000006",
          "checksum": "2809",
          "age": 1,
          "hint": "Router link count 2"
        },
        {
          "type": 1,
          "area": "0.0.0.0",
          "id": "4.4.4.4",
          "adv": "4.4.4.4",
          "sequence": "80000007",
          "checksum": "FD28",
          "age": 7,
          "hint": "Router link count 2"
        },
        {
          "type": 2,
          "area": "0.0.0.0",
          "id": "192.0.2.1",
          "adv": "1.1.1.1",
          "sequence": "80000003",
          "checksum": "1C44",
          "age": 28,
          "hint": "Current/retained network header; inspect current DR separately"
        },
        {
          "type": 2,
          "area": "0.0.0.0",
          "id": "192.0.2.2",
          "adv": "2.2.2.2",
          "sequence": "80000001",
          "checksum": "3D28",
          "age": 7,
          "hint": "Current/retained network header; inspect current DR separately"
        }
      ]
    },
    {
      "id": "broadcast-recovered-r3-0",
      "experiment": "broadcast",
      "observer": "R3",
      "phase": "RECOVERED",
      "area": "0.0.0.0",
      "source": "docs/ospf-dr-bdr-lab-results.json",
      "record": "RECOVERED_DATABASE_R3",
      "label": "broadcast / R3 / RECOVERED / area 0.0.0.0",
      "entries": [
        {
          "type": 1,
          "area": "0.0.0.0",
          "id": "1.1.1.1",
          "adv": "1.1.1.1",
          "sequence": "8000000E",
          "checksum": "C27A",
          "age": 3,
          "hint": "Router link count 2"
        },
        {
          "type": 1,
          "area": "0.0.0.0",
          "id": "2.2.2.2",
          "adv": "2.2.2.2",
          "sequence": "80000009",
          "checksum": "4AED",
          "age": 6,
          "hint": "Router link count 2"
        },
        {
          "type": 1,
          "area": "0.0.0.0",
          "id": "3.3.3.3",
          "adv": "3.3.3.3",
          "sequence": "80000006",
          "checksum": "2809",
          "age": 8,
          "hint": "Router link count 2"
        },
        {
          "type": 1,
          "area": "0.0.0.0",
          "id": "4.4.4.4",
          "adv": "4.4.4.4",
          "sequence": "80000008",
          "checksum": "FB29",
          "age": 9,
          "hint": "Router link count 2"
        },
        {
          "type": 2,
          "area": "0.0.0.0",
          "id": "192.0.2.1",
          "adv": "1.1.1.1",
          "sequence": "80000005",
          "checksum": "5C1E",
          "age": 3600,
          "hint": "Current/retained network header; inspect current DR separately"
        },
        {
          "type": 2,
          "area": "0.0.0.0",
          "id": "192.0.2.2",
          "adv": "2.2.2.2",
          "sequence": "80000003",
          "checksum": "F367",
          "age": 6,
          "hint": "Current/retained network header; inspect current DR separately"
        }
      ]
    }
  ],
  "scope": "Separate actual isolated experiments, not a combined/live LSDB. Headers are copied from current passing reports; no type-4/5/7, flooding/aging/timing or application execution is claimed."
};if(typeof module!=='undefined'&&module.exports)module.exports=evidence;else window.OspfLsaEvidence=evidence;})();
