'use strict';
window.DATA_CENTER_CASES=[
  {
    "key": "s6-g0-t0",
    "title": "Server Hardware",
    "kind": "platform",
    "fields": [
      [
        "power",
        "Supported power path ready",
        "bool",
        true
      ],
      [
        "cooling",
        "Required cooling ready",
        "bool",
        true
      ],
      [
        "mapping",
        "Correct component/attachment mapping",
        "bool",
        true
      ],
      [
        "software",
        "Supported firmware and driver context",
        "bool",
        true
      ],
      [
        "service",
        "Original transaction observed successful",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": true
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": false,
          "software": true,
          "service": true
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": false
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": true
        }
      }
    ],
    "scope": "Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet."
  },
  {
    "key": "s6-g0-t1",
    "title": "Rack Servers",
    "kind": "rack",
    "fields": [
      [
        "rack",
        "Rack in three-rack plan",
        "select",
        [
          "R1",
          "R2",
          "R3"
        ]
      ],
      [
        "start",
        "Proposed device start U",
        "number",
        15
      ],
      [
        "height",
        "Proposed device height U",
        "number",
        2
      ],
      [
        "load",
        "Proposed device load (kW)",
        "number",
        1
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "rack": "R1",
          "start": 15,
          "height": 2,
          "load": 1
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "rack": "R1",
          "start": 5,
          "height": 2,
          "load": 1
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "rack": "R3",
          "start": 20,
          "height": 3,
          "load": 1
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "rack": "R1",
          "start": 15,
          "height": 2,
          "load": 1
        }
      }
    ],
    "scope": "Check one proposed vertical interval against a fixed three-rack teaching elevation and 8 kW per surviving feed; excludes physical dimensions, mass, circuits and installation certification."
  },
  {
    "key": "s6-g0-t2",
    "title": "Blade Servers",
    "kind": "platform",
    "fields": [
      [
        "power",
        "Supported power path ready",
        "bool",
        true
      ],
      [
        "cooling",
        "Required cooling ready",
        "bool",
        true
      ],
      [
        "mapping",
        "Correct component/attachment mapping",
        "bool",
        true
      ],
      [
        "software",
        "Supported firmware and driver context",
        "bool",
        true
      ],
      [
        "service",
        "Original transaction observed successful",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": true
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": false,
          "software": true,
          "service": true
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": false
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": true
        }
      }
    ],
    "scope": "Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet."
  },
  {
    "key": "s6-g0-t3",
    "title": "CPU architecture",
    "kind": "platform",
    "fields": [
      [
        "power",
        "Supported power path ready",
        "bool",
        true
      ],
      [
        "cooling",
        "Required cooling ready",
        "bool",
        true
      ],
      [
        "mapping",
        "Correct component/attachment mapping",
        "bool",
        true
      ],
      [
        "software",
        "Supported firmware and driver context",
        "bool",
        true
      ],
      [
        "service",
        "Original transaction observed successful",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": true
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": false,
          "software": true,
          "service": true
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": false
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": true
        }
      }
    ],
    "scope": "Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet."
  },
  {
    "key": "s6-g0-t4",
    "title": "Memory channels",
    "kind": "memory",
    "fields": [
      [
        "channels",
        "Populated active channels",
        "number",
        4
      ],
      [
        "mts",
        "Negotiated MT/s per channel",
        "number",
        3200
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "channels": 4,
          "mts": 3200
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "channels": 2,
          "mts": 3200
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "channels": 4,
          "mts": 2400
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "channels": 4,
          "mts": 3200
        }
      }
    ],
    "scope": "64 useful data bits per transfer; active channels × MT/s × 8 bytes; decimal GB/s theoretical envelope, no ECC payload, controller efficiency or benchmark."
  },
  {
    "key": "s6-g0-t5",
    "title": "NUMA",
    "kind": "numa",
    "fields": [
      [
        "local",
        "Supplied local access latency (ns)",
        "number",
        80
      ],
      [
        "remote",
        "Supplied remote access latency (ns)",
        "number",
        140
      ],
      [
        "fraction",
        "Remote access fraction (%)",
        "number",
        25
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "local": 80,
          "remote": 140,
          "fraction": 25
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "local": 80,
          "remote": 140,
          "fraction": 75
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "local": 80,
          "remote": 140,
          "fraction": 0
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "local": 80,
          "remote": 140,
          "fraction": 25
        }
      }
    ],
    "scope": "Weighted mean of supplied local/remote access costs and fraction; no page placement, migration, caches, queueing or workload simulation."
  },
  {
    "key": "s6-g0-t6",
    "title": "NIC",
    "kind": "pcie",
    "fields": [
      [
        "generation",
        "Negotiated generation",
        "select",
        [
          "3",
          "4",
          "5"
        ]
      ],
      [
        "lanes",
        "Negotiated lanes",
        "select",
        [
          "1",
          "2",
          "4",
          "8",
          "16"
        ]
      ],
      [
        "demand",
        "One-direction demand (Gb/s)",
        "number",
        25
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "generation": "3",
          "lanes": "4",
          "demand": 25
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "generation": "3",
          "lanes": "4",
          "demand": 50
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "generation": "4",
          "lanes": "4",
          "demand": 25
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "generation": "3",
          "lanes": "4",
          "demand": 25
        }
      }
    ],
    "scope": "Gen3/4/5 only, per direction, 128b/130b encoding; transaction overhead and endpoint/shared upstream limits excluded; Gen6 excluded."
  },
  {
    "key": "s6-g0-t7",
    "title": "HBA",
    "kind": "platform",
    "fields": [
      [
        "power",
        "Supported power path ready",
        "bool",
        true
      ],
      [
        "cooling",
        "Required cooling ready",
        "bool",
        true
      ],
      [
        "mapping",
        "Correct component/attachment mapping",
        "bool",
        true
      ],
      [
        "software",
        "Supported firmware and driver context",
        "bool",
        true
      ],
      [
        "service",
        "Original transaction observed successful",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": true
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": false,
          "software": true,
          "service": true
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": false
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": true
        }
      }
    ],
    "scope": "Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet."
  },
  {
    "key": "s6-g0-t8",
    "title": "PCIe",
    "kind": "pcie",
    "fields": [
      [
        "generation",
        "Negotiated generation",
        "select",
        [
          "3",
          "4",
          "5"
        ]
      ],
      [
        "lanes",
        "Negotiated lanes",
        "select",
        [
          "1",
          "2",
          "4",
          "8",
          "16"
        ]
      ],
      [
        "demand",
        "One-direction demand (Gb/s)",
        "number",
        25
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "generation": "3",
          "lanes": "4",
          "demand": 25
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "generation": "3",
          "lanes": "4",
          "demand": 50
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "generation": "4",
          "lanes": "4",
          "demand": 25
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "generation": "3",
          "lanes": "4",
          "demand": 25
        }
      }
    ],
    "scope": "Gen3/4/5 only, per direction, 128b/130b encoding; transaction overhead and endpoint/shared upstream limits excluded; Gen6 excluded."
  },
  {
    "key": "s6-g1-t0",
    "title": "RAID",
    "kind": "raid",
    "fields": [
      [
        "level",
        "Declared layout",
        "select",
        [
          "0",
          "1",
          "5",
          "6",
          "10"
        ]
      ],
      [
        "members",
        "Active equal-size members",
        "number",
        6
      ],
      [
        "size",
        "Common usable member size (decimal TB)",
        "number",
        2
      ],
      [
        "mask",
        "Failure mask (member 0 is bit 0)",
        "number",
        0
      ],
      [
        "spare",
        "Compatible idle spare declared",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "level": "6",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": false
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "level": "6",
          "members": 6,
          "size": 2,
          "mask": 7,
          "spare": false
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "level": "10",
          "members": 6,
          "size": 2,
          "mask": 21,
          "spare": false
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "level": "6",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": false
        }
      }
    ],
    "scope": "Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations."
  },
  {
    "key": "s6-g1-t1",
    "title": "Hardware RAID",
    "kind": "raid",
    "fields": [
      [
        "level",
        "Declared layout",
        "select",
        [
          "0",
          "1",
          "5",
          "6",
          "10"
        ]
      ],
      [
        "members",
        "Active equal-size members",
        "number",
        6
      ],
      [
        "size",
        "Common usable member size (decimal TB)",
        "number",
        2
      ],
      [
        "mask",
        "Failure mask (member 0 is bit 0)",
        "number",
        0
      ],
      [
        "spare",
        "Compatible idle spare declared",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "level": "6",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": false
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "level": "6",
          "members": 6,
          "size": 2,
          "mask": 7,
          "spare": false
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "level": "10",
          "members": 6,
          "size": 2,
          "mask": 21,
          "spare": false
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "level": "6",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": false
        }
      }
    ],
    "scope": "Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations."
  },
  {
    "key": "s6-g1-t2",
    "title": "Software RAID",
    "kind": "raid",
    "fields": [
      [
        "level",
        "Declared layout",
        "select",
        [
          "0",
          "1",
          "5",
          "6",
          "10"
        ]
      ],
      [
        "members",
        "Active equal-size members",
        "number",
        6
      ],
      [
        "size",
        "Common usable member size (decimal TB)",
        "number",
        2
      ],
      [
        "mask",
        "Failure mask (member 0 is bit 0)",
        "number",
        0
      ],
      [
        "spare",
        "Compatible idle spare declared",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "level": "6",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": false
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "level": "6",
          "members": 6,
          "size": 2,
          "mask": 7,
          "spare": false
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "level": "10",
          "members": 6,
          "size": 2,
          "mask": 21,
          "spare": false
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "level": "6",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": false
        }
      }
    ],
    "scope": "Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations."
  },
  {
    "key": "s6-g1-t3",
    "title": "RAID 0",
    "kind": "raid",
    "fields": [
      [
        "level",
        "Declared layout",
        "select",
        [
          "0",
          "1",
          "5",
          "6",
          "10"
        ]
      ],
      [
        "members",
        "Active equal-size members",
        "number",
        6
      ],
      [
        "size",
        "Common usable member size (decimal TB)",
        "number",
        2
      ],
      [
        "mask",
        "Failure mask (member 0 is bit 0)",
        "number",
        0
      ],
      [
        "spare",
        "Compatible idle spare declared",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "level": "0",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": false
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "level": "0",
          "members": 6,
          "size": 2,
          "mask": 7,
          "spare": false
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "level": "10",
          "members": 6,
          "size": 2,
          "mask": 21,
          "spare": false
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "level": "0",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": false
        }
      }
    ],
    "scope": "Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations."
  },
  {
    "key": "s6-g1-t4",
    "title": "RAID 1",
    "kind": "raid",
    "fields": [
      [
        "level",
        "Declared layout",
        "select",
        [
          "0",
          "1",
          "5",
          "6",
          "10"
        ]
      ],
      [
        "members",
        "Active equal-size members",
        "number",
        6
      ],
      [
        "size",
        "Common usable member size (decimal TB)",
        "number",
        2
      ],
      [
        "mask",
        "Failure mask (member 0 is bit 0)",
        "number",
        0
      ],
      [
        "spare",
        "Compatible idle spare declared",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "level": "1",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": false
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "level": "1",
          "members": 6,
          "size": 2,
          "mask": 7,
          "spare": false
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "level": "10",
          "members": 6,
          "size": 2,
          "mask": 21,
          "spare": false
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "level": "1",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": false
        }
      }
    ],
    "scope": "Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations."
  },
  {
    "key": "s6-g1-t5",
    "title": "RAID 5",
    "kind": "raid",
    "fields": [
      [
        "level",
        "Declared layout",
        "select",
        [
          "0",
          "1",
          "5",
          "6",
          "10"
        ]
      ],
      [
        "members",
        "Active equal-size members",
        "number",
        6
      ],
      [
        "size",
        "Common usable member size (decimal TB)",
        "number",
        2
      ],
      [
        "mask",
        "Failure mask (member 0 is bit 0)",
        "number",
        0
      ],
      [
        "spare",
        "Compatible idle spare declared",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "level": "5",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": false
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "level": "5",
          "members": 6,
          "size": 2,
          "mask": 7,
          "spare": false
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "level": "10",
          "members": 6,
          "size": 2,
          "mask": 21,
          "spare": false
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "level": "5",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": false
        }
      }
    ],
    "scope": "Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations."
  },
  {
    "key": "s6-g1-t6",
    "title": "RAID 6",
    "kind": "raid",
    "fields": [
      [
        "level",
        "Declared layout",
        "select",
        [
          "0",
          "1",
          "5",
          "6",
          "10"
        ]
      ],
      [
        "members",
        "Active equal-size members",
        "number",
        6
      ],
      [
        "size",
        "Common usable member size (decimal TB)",
        "number",
        2
      ],
      [
        "mask",
        "Failure mask (member 0 is bit 0)",
        "number",
        0
      ],
      [
        "spare",
        "Compatible idle spare declared",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "level": "6",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": false
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "level": "6",
          "members": 6,
          "size": 2,
          "mask": 7,
          "spare": false
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "level": "10",
          "members": 6,
          "size": 2,
          "mask": 21,
          "spare": false
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "level": "6",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": false
        }
      }
    ],
    "scope": "Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations."
  },
  {
    "key": "s6-g1-t7",
    "title": "RAID 10",
    "kind": "raid",
    "fields": [
      [
        "level",
        "Declared layout",
        "select",
        [
          "0",
          "1",
          "5",
          "6",
          "10"
        ]
      ],
      [
        "members",
        "Active equal-size members",
        "number",
        6
      ],
      [
        "size",
        "Common usable member size (decimal TB)",
        "number",
        2
      ],
      [
        "mask",
        "Failure mask (member 0 is bit 0)",
        "number",
        0
      ],
      [
        "spare",
        "Compatible idle spare declared",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "level": "10",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": false
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "level": "10",
          "members": 6,
          "size": 2,
          "mask": 7,
          "spare": false
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "level": "10",
          "members": 6,
          "size": 2,
          "mask": 21,
          "spare": false
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "level": "10",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": false
        }
      }
    ],
    "scope": "Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations."
  },
  {
    "key": "s6-g1-t8",
    "title": "Hot Spare",
    "kind": "raid",
    "fields": [
      [
        "level",
        "Declared layout",
        "select",
        [
          "0",
          "1",
          "5",
          "6",
          "10"
        ]
      ],
      [
        "members",
        "Active equal-size members",
        "number",
        6
      ],
      [
        "size",
        "Common usable member size (decimal TB)",
        "number",
        2
      ],
      [
        "mask",
        "Failure mask (member 0 is bit 0)",
        "number",
        0
      ],
      [
        "spare",
        "Compatible idle spare declared",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "level": "6",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": true
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "level": "6",
          "members": 6,
          "size": 2,
          "mask": 7,
          "spare": true
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "level": "10",
          "members": 6,
          "size": 2,
          "mask": 21,
          "spare": true
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "level": "6",
          "members": 6,
          "size": 2,
          "mask": 0,
          "spare": true
        }
      }
    ],
    "scope": "Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations."
  },
  {
    "key": "s6-g2-t0",
    "title": "Disk Backplane",
    "kind": "platform",
    "fields": [
      [
        "power",
        "Supported power path ready",
        "bool",
        true
      ],
      [
        "cooling",
        "Required cooling ready",
        "bool",
        true
      ],
      [
        "mapping",
        "Correct component/attachment mapping",
        "bool",
        true
      ],
      [
        "software",
        "Supported firmware and driver context",
        "bool",
        true
      ],
      [
        "service",
        "Original transaction observed successful",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": true
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": false,
          "software": true,
          "service": true
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": false
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": true
        }
      }
    ],
    "scope": "Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet."
  },
  {
    "key": "s6-g2-t1",
    "title": "SAS",
    "kind": "platform",
    "fields": [
      [
        "power",
        "Supported power path ready",
        "bool",
        true
      ],
      [
        "cooling",
        "Required cooling ready",
        "bool",
        true
      ],
      [
        "mapping",
        "Correct component/attachment mapping",
        "bool",
        true
      ],
      [
        "software",
        "Supported firmware and driver context",
        "bool",
        true
      ],
      [
        "service",
        "Original transaction observed successful",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": true
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": false,
          "software": true,
          "service": true
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": false
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": true
        }
      }
    ],
    "scope": "Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet."
  },
  {
    "key": "s6-g2-t2",
    "title": "SATA",
    "kind": "platform",
    "fields": [
      [
        "power",
        "Supported power path ready",
        "bool",
        true
      ],
      [
        "cooling",
        "Required cooling ready",
        "bool",
        true
      ],
      [
        "mapping",
        "Correct component/attachment mapping",
        "bool",
        true
      ],
      [
        "software",
        "Supported firmware and driver context",
        "bool",
        true
      ],
      [
        "service",
        "Original transaction observed successful",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": true
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": false,
          "software": true,
          "service": true
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": false
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "power": true,
          "cooling": true,
          "mapping": true,
          "software": true,
          "service": true
        }
      }
    ],
    "scope": "Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet."
  },
  {
    "key": "s6-g2-t3",
    "title": "NVMe",
    "kind": "pcie",
    "fields": [
      [
        "generation",
        "Negotiated generation",
        "select",
        [
          "3",
          "4",
          "5"
        ]
      ],
      [
        "lanes",
        "Negotiated lanes",
        "select",
        [
          "1",
          "2",
          "4",
          "8",
          "16"
        ]
      ],
      [
        "demand",
        "One-direction demand (Gb/s)",
        "number",
        25
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "generation": "3",
          "lanes": "4",
          "demand": 25
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "generation": "3",
          "lanes": "4",
          "demand": 50
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "generation": "4",
          "lanes": "4",
          "demand": 25
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "generation": "3",
          "lanes": "4",
          "demand": 25
        }
      }
    ],
    "scope": "Gen3/4/5 only, per direction, 128b/130b encoding; transaction overhead and endpoint/shared upstream limits excluded; Gen6 excluded."
  },
  {
    "key": "s6-g3-t0",
    "title": "Top of Rack",
    "kind": "fabric",
    "fields": [
      [
        "downPorts",
        "Declared downlink count",
        "number",
        48
      ],
      [
        "downRate",
        "Downlink rate per port (Gb/s)",
        "number",
        25
      ],
      [
        "upPorts",
        "Installed spine uplinks per leaf",
        "number",
        2
      ],
      [
        "upRate",
        "Uplink rate per link (Gb/s)",
        "number",
        100
      ],
      [
        "lost",
        "Unavailable uplinks per involved leaf",
        "number",
        0
      ],
      [
        "same",
        "Source and destination on same leaf",
        "bool",
        false
      ],
      [
        "demand",
        "Aggregate inter-leaf demand (Gb/s)",
        "number",
        100
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 0,
          "same": false,
          "demand": 100
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 1,
          "same": false,
          "demand": 150
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 2,
          "same": true,
          "demand": 100
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 0,
          "same": false,
          "demand": 100
        }
      }
    ],
    "scope": "Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic."
  },
  {
    "key": "s6-g3-t1",
    "title": "End of Row",
    "kind": "fabric",
    "fields": [
      [
        "downPorts",
        "Declared downlink count",
        "number",
        48
      ],
      [
        "downRate",
        "Downlink rate per port (Gb/s)",
        "number",
        25
      ],
      [
        "upPorts",
        "Installed spine uplinks per leaf",
        "number",
        2
      ],
      [
        "upRate",
        "Uplink rate per link (Gb/s)",
        "number",
        100
      ],
      [
        "lost",
        "Unavailable uplinks per involved leaf",
        "number",
        0
      ],
      [
        "same",
        "Source and destination on same leaf",
        "bool",
        false
      ],
      [
        "demand",
        "Aggregate inter-leaf demand (Gb/s)",
        "number",
        100
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 0,
          "same": false,
          "demand": 100
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 1,
          "same": false,
          "demand": 150
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 2,
          "same": true,
          "demand": 100
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 0,
          "same": false,
          "demand": 100
        }
      }
    ],
    "scope": "Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic."
  },
  {
    "key": "s6-g3-t2",
    "title": "Leaf-Spine",
    "kind": "fabric",
    "fields": [
      [
        "downPorts",
        "Declared downlink count",
        "number",
        48
      ],
      [
        "downRate",
        "Downlink rate per port (Gb/s)",
        "number",
        25
      ],
      [
        "upPorts",
        "Installed spine uplinks per leaf",
        "number",
        2
      ],
      [
        "upRate",
        "Uplink rate per link (Gb/s)",
        "number",
        100
      ],
      [
        "lost",
        "Unavailable uplinks per involved leaf",
        "number",
        0
      ],
      [
        "same",
        "Source and destination on same leaf",
        "bool",
        false
      ],
      [
        "demand",
        "Aggregate inter-leaf demand (Gb/s)",
        "number",
        100
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 0,
          "same": false,
          "demand": 100
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 1,
          "same": false,
          "demand": 150
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 2,
          "same": true,
          "demand": 100
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 0,
          "same": false,
          "demand": 100
        }
      }
    ],
    "scope": "Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic."
  },
  {
    "key": "s6-g3-t3",
    "title": "East-West Traffic",
    "kind": "fabric",
    "fields": [
      [
        "downPorts",
        "Declared downlink count",
        "number",
        48
      ],
      [
        "downRate",
        "Downlink rate per port (Gb/s)",
        "number",
        25
      ],
      [
        "upPorts",
        "Installed spine uplinks per leaf",
        "number",
        2
      ],
      [
        "upRate",
        "Uplink rate per link (Gb/s)",
        "number",
        100
      ],
      [
        "lost",
        "Unavailable uplinks per involved leaf",
        "number",
        0
      ],
      [
        "same",
        "Source and destination on same leaf",
        "bool",
        false
      ],
      [
        "demand",
        "Aggregate inter-leaf demand (Gb/s)",
        "number",
        100
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 0,
          "same": false,
          "demand": 100
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 1,
          "same": false,
          "demand": 150
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 2,
          "same": true,
          "demand": 100
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 0,
          "same": false,
          "demand": 100
        }
      }
    ],
    "scope": "Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic."
  },
  {
    "key": "s6-g3-t4",
    "title": "North-South Traffic",
    "kind": "fabric",
    "fields": [
      [
        "downPorts",
        "Declared downlink count",
        "number",
        48
      ],
      [
        "downRate",
        "Downlink rate per port (Gb/s)",
        "number",
        25
      ],
      [
        "upPorts",
        "Installed spine uplinks per leaf",
        "number",
        2
      ],
      [
        "upRate",
        "Uplink rate per link (Gb/s)",
        "number",
        100
      ],
      [
        "lost",
        "Unavailable uplinks per involved leaf",
        "number",
        0
      ],
      [
        "same",
        "Source and destination on same leaf",
        "bool",
        false
      ],
      [
        "demand",
        "Aggregate inter-leaf demand (Gb/s)",
        "number",
        100
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 0,
          "same": false,
          "demand": 100
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 1,
          "same": false,
          "demand": 150
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 2,
          "same": true,
          "demand": 100
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 0,
          "same": false,
          "demand": 100
        }
      }
    ],
    "scope": "Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic."
  },
  {
    "key": "s6-g3-t5",
    "title": "Oversubscription",
    "kind": "fabric",
    "fields": [
      [
        "downPorts",
        "Declared downlink count",
        "number",
        48
      ],
      [
        "downRate",
        "Downlink rate per port (Gb/s)",
        "number",
        25
      ],
      [
        "upPorts",
        "Installed spine uplinks per leaf",
        "number",
        2
      ],
      [
        "upRate",
        "Uplink rate per link (Gb/s)",
        "number",
        100
      ],
      [
        "lost",
        "Unavailable uplinks per involved leaf",
        "number",
        0
      ],
      [
        "same",
        "Source and destination on same leaf",
        "bool",
        false
      ],
      [
        "demand",
        "Aggregate inter-leaf demand (Gb/s)",
        "number",
        100
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 0,
          "same": false,
          "demand": 100
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 1,
          "same": false,
          "demand": 150
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 2,
          "same": true,
          "demand": 100
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "downPorts": 48,
          "downRate": 25,
          "upPorts": 2,
          "upRate": 100,
          "lost": 0,
          "same": false,
          "demand": 100
        }
      }
    ],
    "scope": "Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic."
  },
  {
    "key": "s6-g3-t6",
    "title": "Redundancy",
    "kind": "power",
    "fields": [
      [
        "load",
        "IT load (kW)",
        "number",
        6
      ],
      [
        "ratingA",
        "Path A full-load rating (kW)",
        "number",
        10
      ],
      [
        "ratingB",
        "Path B full-load rating (kW)",
        "number",
        10
      ],
      [
        "limit",
        "Allowed fraction of each rating (%)",
        "number",
        80
      ],
      [
        "independent",
        "A/B upstream domains independent",
        "bool",
        true
      ],
      [
        "energy",
        "Supplied usable AC energy (Wh)",
        "number",
        1500
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "load": 6,
          "ratingA": 10,
          "ratingB": 10,
          "limit": 80,
          "independent": true,
          "energy": 1500
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "load": 6,
          "ratingA": 10,
          "ratingB": 5,
          "limit": 80,
          "independent": true,
          "energy": 1500
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "load": 6,
          "ratingA": 10,
          "ratingB": 10,
          "limit": 80,
          "independent": false,
          "energy": 1500
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "load": 6,
          "ratingA": 10,
          "ratingB": 10,
          "limit": 80,
          "independent": true,
          "energy": 1500
        }
      }
    ],
    "scope": "Full-load capacity on each independent A/B path using a supplied allowed fraction; ideal energy/load duration from supplied usable AC energy, not a UPS runtime curve or electrical certification."
  },
  {
    "key": "s6-g3-t7",
    "title": "High Availability",
    "kind": "ha",
    "fields": [
      [
        "independent",
        "Surviving path independent for named fault",
        "bool",
        true
      ],
      [
        "capacity",
        "Survivor carries required load",
        "bool",
        true
      ],
      [
        "service",
        "Original service and policy checks succeeded",
        "bool",
        true
      ],
      [
        "recovery",
        "Observed recovery interval (s)",
        "number",
        25
      ],
      [
        "rto",
        "Declared recovery target (s)",
        "number",
        30
      ],
      [
        "age",
        "Recoverable data age (min)",
        "number",
        5
      ],
      [
        "rpo",
        "Declared data-age target (min)",
        "number",
        10
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "independent": true,
          "capacity": true,
          "service": true,
          "recovery": 25,
          "rto": 30,
          "age": 5,
          "rpo": 10
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "independent": true,
          "capacity": true,
          "service": true,
          "recovery": 25,
          "rto": 30,
          "age": 12,
          "rpo": 10
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "independent": true,
          "capacity": true,
          "service": true,
          "recovery": 31,
          "rto": 30,
          "age": 5,
          "rpo": 10
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "independent": true,
          "capacity": true,
          "service": true,
          "recovery": 25,
          "rto": 30,
          "age": 5,
          "rpo": 10
        }
      }
    ],
    "scope": "Supplied named-fault eligibility, capacity, original service/policy observation and recovery/data-age intervals compared with declared targets. No live failover, replication or availability percentage."
  },
  {
    "key": "s6-g4-t0",
    "title": "Rack design",
    "kind": "rack",
    "fields": [
      [
        "rack",
        "Rack in three-rack plan",
        "select",
        [
          "R1",
          "R2",
          "R3"
        ]
      ],
      [
        "start",
        "Proposed device start U",
        "number",
        15
      ],
      [
        "height",
        "Proposed device height U",
        "number",
        2
      ],
      [
        "load",
        "Proposed device load (kW)",
        "number",
        1
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "rack": "R1",
          "start": 15,
          "height": 2,
          "load": 1
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "rack": "R1",
          "start": 5,
          "height": 2,
          "load": 1
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "rack": "R3",
          "start": 20,
          "height": 3,
          "load": 1
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "rack": "R1",
          "start": 15,
          "height": 2,
          "load": 1
        }
      }
    ],
    "scope": "Check one proposed vertical interval against a fixed three-rack teaching elevation and 8 kW per surviving feed; excludes physical dimensions, mass, circuits and installation certification."
  },
  {
    "key": "s6-g4-t1",
    "title": "Power distribution",
    "kind": "power",
    "fields": [
      [
        "load",
        "IT load (kW)",
        "number",
        6
      ],
      [
        "ratingA",
        "Path A full-load rating (kW)",
        "number",
        10
      ],
      [
        "ratingB",
        "Path B full-load rating (kW)",
        "number",
        10
      ],
      [
        "limit",
        "Allowed fraction of each rating (%)",
        "number",
        80
      ],
      [
        "independent",
        "A/B upstream domains independent",
        "bool",
        true
      ],
      [
        "energy",
        "Supplied usable AC energy (Wh)",
        "number",
        1500
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "load": 6,
          "ratingA": 10,
          "ratingB": 10,
          "limit": 80,
          "independent": true,
          "energy": 1500
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "load": 6,
          "ratingA": 10,
          "ratingB": 5,
          "limit": 80,
          "independent": true,
          "energy": 1500
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "load": 6,
          "ratingA": 10,
          "ratingB": 10,
          "limit": 80,
          "independent": false,
          "energy": 1500
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "load": 6,
          "ratingA": 10,
          "ratingB": 10,
          "limit": 80,
          "independent": true,
          "energy": 1500
        }
      }
    ],
    "scope": "Full-load capacity on each independent A/B path using a supplied allowed fraction; ideal energy/load duration from supplied usable AC energy, not a UPS runtime curve or electrical certification."
  },
  {
    "key": "s6-g4-t2",
    "title": "UPS",
    "kind": "power",
    "fields": [
      [
        "load",
        "IT load (kW)",
        "number",
        6
      ],
      [
        "ratingA",
        "Path A full-load rating (kW)",
        "number",
        10
      ],
      [
        "ratingB",
        "Path B full-load rating (kW)",
        "number",
        10
      ],
      [
        "limit",
        "Allowed fraction of each rating (%)",
        "number",
        80
      ],
      [
        "independent",
        "A/B upstream domains independent",
        "bool",
        true
      ],
      [
        "energy",
        "Supplied usable AC energy (Wh)",
        "number",
        1500
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "load": 6,
          "ratingA": 10,
          "ratingB": 10,
          "limit": 80,
          "independent": true,
          "energy": 1500
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "load": 6,
          "ratingA": 10,
          "ratingB": 5,
          "limit": 80,
          "independent": true,
          "energy": 1500
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "load": 6,
          "ratingA": 10,
          "ratingB": 10,
          "limit": 80,
          "independent": false,
          "energy": 1500
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "load": 6,
          "ratingA": 10,
          "ratingB": 10,
          "limit": 80,
          "independent": true,
          "energy": 1500
        }
      }
    ],
    "scope": "Full-load capacity on each independent A/B path using a supplied allowed fraction; ideal energy/load duration from supplied usable AC energy, not a UPS runtime curve or electrical certification."
  },
  {
    "key": "s6-g4-t3",
    "title": "PDU",
    "kind": "power",
    "fields": [
      [
        "load",
        "IT load (kW)",
        "number",
        6
      ],
      [
        "ratingA",
        "Path A full-load rating (kW)",
        "number",
        10
      ],
      [
        "ratingB",
        "Path B full-load rating (kW)",
        "number",
        10
      ],
      [
        "limit",
        "Allowed fraction of each rating (%)",
        "number",
        80
      ],
      [
        "independent",
        "A/B upstream domains independent",
        "bool",
        true
      ],
      [
        "energy",
        "Supplied usable AC energy (Wh)",
        "number",
        1500
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "load": 6,
          "ratingA": 10,
          "ratingB": 10,
          "limit": 80,
          "independent": true,
          "energy": 1500
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "load": 6,
          "ratingA": 10,
          "ratingB": 5,
          "limit": 80,
          "independent": true,
          "energy": 1500
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "load": 6,
          "ratingA": 10,
          "ratingB": 10,
          "limit": 80,
          "independent": false,
          "energy": 1500
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "load": 6,
          "ratingA": 10,
          "ratingB": 10,
          "limit": 80,
          "independent": true,
          "energy": 1500
        }
      }
    ],
    "scope": "Full-load capacity on each independent A/B path using a supplied allowed fraction; ideal energy/load duration from supplied usable AC energy, not a UPS runtime curve or electrical certification."
  },
  {
    "key": "s6-g4-t4",
    "title": "Cooling",
    "kind": "thermal",
    "fields": [
      [
        "load",
        "IT heat load (kW)",
        "number",
        6
      ],
      [
        "flow",
        "Supplied air volume flow (m³/s)",
        "number",
        1
      ],
      [
        "inlet",
        "Supplied inlet temperature (°C)",
        "number",
        22
      ],
      [
        "cooling",
        "Available sensible cooling (kW)",
        "number",
        10
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "load": 6,
          "flow": 1,
          "inlet": 22,
          "cooling": 10
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "load": 6,
          "flow": 1,
          "inlet": 22,
          "cooling": 5
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "load": 6,
          "flow": 2,
          "inlet": 22,
          "cooling": 10
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "load": 6,
          "flow": 1,
          "inlet": 22,
          "cooling": 10
        }
      }
    ],
    "scope": "Steady sensible heat balance with air density 1.2 kg/m³ and heat capacity 1.005 kJ/(kg·K); no humidity, recirculation, CFD, thermal transients or compliance certification."
  },
  {
    "key": "s6-g4-t5",
    "title": "Airflow",
    "kind": "thermal",
    "fields": [
      [
        "load",
        "IT heat load (kW)",
        "number",
        6
      ],
      [
        "flow",
        "Supplied air volume flow (m³/s)",
        "number",
        1
      ],
      [
        "inlet",
        "Supplied inlet temperature (°C)",
        "number",
        22
      ],
      [
        "cooling",
        "Available sensible cooling (kW)",
        "number",
        10
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "load": 6,
          "flow": 1,
          "inlet": 22,
          "cooling": 10
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "load": 6,
          "flow": 1,
          "inlet": 22,
          "cooling": 5
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "load": 6,
          "flow": 2,
          "inlet": 22,
          "cooling": 10
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "load": 6,
          "flow": 1,
          "inlet": 22,
          "cooling": 10
        }
      }
    ],
    "scope": "Steady sensible heat balance with air density 1.2 kg/m³ and heat capacity 1.005 kJ/(kg·K); no humidity, recirculation, CFD, thermal transients or compliance certification."
  },
  {
    "key": "s6-g4-t6",
    "title": "Hot aisle",
    "kind": "thermal",
    "fields": [
      [
        "load",
        "IT heat load (kW)",
        "number",
        6
      ],
      [
        "flow",
        "Supplied air volume flow (m³/s)",
        "number",
        1
      ],
      [
        "inlet",
        "Supplied inlet temperature (°C)",
        "number",
        22
      ],
      [
        "cooling",
        "Available sensible cooling (kW)",
        "number",
        10
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "load": 6,
          "flow": 1,
          "inlet": 22,
          "cooling": 10
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "load": 6,
          "flow": 1,
          "inlet": 22,
          "cooling": 5
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "load": 6,
          "flow": 2,
          "inlet": 22,
          "cooling": 10
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "load": 6,
          "flow": 1,
          "inlet": 22,
          "cooling": 10
        }
      }
    ],
    "scope": "Steady sensible heat balance with air density 1.2 kg/m³ and heat capacity 1.005 kJ/(kg·K); no humidity, recirculation, CFD, thermal transients or compliance certification."
  },
  {
    "key": "s6-g4-t7",
    "title": "Cold aisle",
    "kind": "thermal",
    "fields": [
      [
        "load",
        "IT heat load (kW)",
        "number",
        6
      ],
      [
        "flow",
        "Supplied air volume flow (m³/s)",
        "number",
        1
      ],
      [
        "inlet",
        "Supplied inlet temperature (°C)",
        "number",
        22
      ],
      [
        "cooling",
        "Available sensible cooling (kW)",
        "number",
        10
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "load": 6,
          "flow": 1,
          "inlet": 22,
          "cooling": 10
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "load": 6,
          "flow": 1,
          "inlet": 22,
          "cooling": 5
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "load": 6,
          "flow": 2,
          "inlet": 22,
          "cooling": 10
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "load": 6,
          "flow": 1,
          "inlet": 22,
          "cooling": 10
        }
      }
    ],
    "scope": "Steady sensible heat balance with air density 1.2 kg/m³ and heat capacity 1.005 kJ/(kg·K); no humidity, recirculation, CFD, thermal transients or compliance certification."
  },
  {
    "key": "s6-g4-t8",
    "title": "Cable management",
    "kind": "rack",
    "fields": [
      [
        "rack",
        "Rack in three-rack plan",
        "select",
        [
          "R1",
          "R2",
          "R3"
        ]
      ],
      [
        "start",
        "Proposed device start U",
        "number",
        15
      ],
      [
        "height",
        "Proposed device height U",
        "number",
        2
      ],
      [
        "load",
        "Proposed device load (kW)",
        "number",
        1
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "rack": "R1",
          "start": 15,
          "height": 2,
          "load": 1
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "rack": "R1",
          "start": 5,
          "height": 2,
          "load": 1
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "rack": "R3",
          "start": 20,
          "height": 3,
          "load": 1
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "rack": "R1",
          "start": 15,
          "height": 2,
          "load": 1
        }
      }
    ],
    "scope": "Check one proposed vertical interval against a fixed three-rack teaching elevation and 8 kW per surviving feed; excludes physical dimensions, mass, circuits and installation certification."
  },
  {
    "key": "s6-g5-t0",
    "title": "Out-of-band management",
    "kind": "oob",
    "fields": [
      [
        "standby",
        "Controller standby power available",
        "bool",
        true
      ],
      [
        "path",
        "Intended management path reachable",
        "bool",
        true
      ],
      [
        "identity",
        "Authorized identity accepted",
        "bool",
        true
      ],
      [
        "permission",
        "Requested read operation permitted",
        "bool",
        true
      ],
      [
        "tls",
        "Trusted HTTPS endpoint validated",
        "bool",
        true
      ],
      [
        "host",
        "Host operating system running",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "standby": true,
          "path": true,
          "identity": true,
          "permission": true,
          "tls": true,
          "host": false
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "standby": true,
          "path": false,
          "identity": true,
          "permission": true,
          "tls": true,
          "host": false
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "standby": true,
          "path": true,
          "identity": true,
          "permission": false,
          "tls": true,
          "host": true
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "standby": true,
          "path": true,
          "identity": true,
          "permission": true,
          "tls": true,
          "host": false
        }
      }
    ],
    "scope": "Declared controller standby/path/identity/permission/TLS conditions; host OS is deliberately independent. No actual iLO/iDRAC/CIMC, TLS or management network query."
  },
  {
    "key": "s6-g5-t1",
    "title": "iLO",
    "kind": "oob",
    "fields": [
      [
        "standby",
        "Controller standby power available",
        "bool",
        true
      ],
      [
        "path",
        "Intended management path reachable",
        "bool",
        true
      ],
      [
        "identity",
        "Authorized identity accepted",
        "bool",
        true
      ],
      [
        "permission",
        "Requested read operation permitted",
        "bool",
        true
      ],
      [
        "tls",
        "Trusted HTTPS endpoint validated",
        "bool",
        true
      ],
      [
        "host",
        "Host operating system running",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "standby": true,
          "path": true,
          "identity": true,
          "permission": true,
          "tls": true,
          "host": false
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "standby": true,
          "path": false,
          "identity": true,
          "permission": true,
          "tls": true,
          "host": false
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "standby": true,
          "path": true,
          "identity": true,
          "permission": false,
          "tls": true,
          "host": true
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "standby": true,
          "path": true,
          "identity": true,
          "permission": true,
          "tls": true,
          "host": false
        }
      }
    ],
    "scope": "Declared controller standby/path/identity/permission/TLS conditions; host OS is deliberately independent. No actual iLO/iDRAC/CIMC, TLS or management network query."
  },
  {
    "key": "s6-g5-t2",
    "title": "iDRAC",
    "kind": "oob",
    "fields": [
      [
        "standby",
        "Controller standby power available",
        "bool",
        true
      ],
      [
        "path",
        "Intended management path reachable",
        "bool",
        true
      ],
      [
        "identity",
        "Authorized identity accepted",
        "bool",
        true
      ],
      [
        "permission",
        "Requested read operation permitted",
        "bool",
        true
      ],
      [
        "tls",
        "Trusted HTTPS endpoint validated",
        "bool",
        true
      ],
      [
        "host",
        "Host operating system running",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "standby": true,
          "path": true,
          "identity": true,
          "permission": true,
          "tls": true,
          "host": false
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "standby": true,
          "path": false,
          "identity": true,
          "permission": true,
          "tls": true,
          "host": false
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "standby": true,
          "path": true,
          "identity": true,
          "permission": false,
          "tls": true,
          "host": true
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "standby": true,
          "path": true,
          "identity": true,
          "permission": true,
          "tls": true,
          "host": false
        }
      }
    ],
    "scope": "Declared controller standby/path/identity/permission/TLS conditions; host OS is deliberately independent. No actual iLO/iDRAC/CIMC, TLS or management network query."
  },
  {
    "key": "s6-g5-t3",
    "title": "CIMC",
    "kind": "oob",
    "fields": [
      [
        "standby",
        "Controller standby power available",
        "bool",
        true
      ],
      [
        "path",
        "Intended management path reachable",
        "bool",
        true
      ],
      [
        "identity",
        "Authorized identity accepted",
        "bool",
        true
      ],
      [
        "permission",
        "Requested read operation permitted",
        "bool",
        true
      ],
      [
        "tls",
        "Trusted HTTPS endpoint validated",
        "bool",
        true
      ],
      [
        "host",
        "Host operating system running",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "standby": true,
          "path": true,
          "identity": true,
          "permission": true,
          "tls": true,
          "host": false
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "standby": true,
          "path": false,
          "identity": true,
          "permission": true,
          "tls": true,
          "host": false
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "standby": true,
          "path": true,
          "identity": true,
          "permission": false,
          "tls": true,
          "host": true
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "standby": true,
          "path": true,
          "identity": true,
          "permission": true,
          "tls": true,
          "host": false
        }
      }
    ],
    "scope": "Declared controller standby/path/identity/permission/TLS conditions; host OS is deliberately independent. No actual iLO/iDRAC/CIMC, TLS or management network query."
  },
  {
    "key": "lab-6",
    "title": "Data Center Foundations Lab",
    "kind": "rack",
    "fields": [
      [
        "rack",
        "Rack in three-rack plan",
        "select",
        [
          "R1",
          "R2",
          "R3"
        ]
      ],
      [
        "start",
        "Proposed device start U",
        "number",
        15
      ],
      [
        "height",
        "Proposed device height U",
        "number",
        2
      ],
      [
        "load",
        "Proposed device load (kW)",
        "number",
        1
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "rack": "R1",
          "start": 15,
          "height": 2,
          "load": 1
        }
      },
      {
        "id": "fault",
        "label": "One changed boundary",
        "values": {
          "rack": "R1",
          "start": 5,
          "height": 2,
          "load": 1
        }
      },
      {
        "id": "contrast",
        "label": "Different operating condition",
        "values": {
          "rack": "R3",
          "start": 20,
          "height": 3,
          "load": 1
        }
      },
      {
        "id": "restored",
        "label": "Exact restored inputs",
        "values": {
          "rack": "R1",
          "start": 15,
          "height": 2,
          "load": 1
        }
      }
    ],
    "scope": "Check one proposed vertical interval against a fixed three-rack teaching elevation and 8 kW per surviving feed; excludes physical dimensions, mass, circuits and installation certification."
  }
];
