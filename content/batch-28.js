window.INFRA_BATCHES = window.INFRA_BATCHES || {};
window.INFRA_BATCHES["28"] = [
  {
    "id": "capstone-final",
    "batch": "28",
    "title": "Enterprise Data Center Architecture Capstone",
    "subtitle": "Design, validate and defend one complete service across failure boundaries.",
    "level": "Integrated architecture / design defense",
    "minutes": 120,
    "interactive": "capstone",
    "definition": "An enterprise architecture capstone connects business objectives to network, compute, storage, security and recovery decisions, then tests whether the resulting service meets those objectives under declared failures.",
    "purpose": "Build a defensible design for a fictional order-entry service serving 500 office users and external HTTPS clients. The supplied peak is 140 abstract compute units, with a 60-minute RTO and 15-minute RPO. Deliver all 15 original engineering artifacts in the downloadable workbook. Work backward from a successful client transaction and an accepted recovery point; equipment counts alone do not establish resilience. This lesson completes the educational design package, not a real infrastructure deployment.",
    "mental": "Think of the design as a chain of contracts: each dependency promises a specific service to its consumer under stated conditions. A client needs naming, trustworthy time and certificates, a permitted forward and return path, available application capacity and consistent data. Redundant nodes only help if their dependencies survive. The chain analogy simplifies concurrency and quorum; use actual dependency graphs and target observations before operating a real system.",
    "components": [
      "Service contract: peak demand, acceptable outage, acceptable data loss, owner and explicit failure set.",
      "Ethernet delivery: diverse providers, edge routing, firewall HA, core, routed leaf-spine fabric and host NICs.",
      "Storage attachment: HBA A through SAN A and HBA B through SAN B to supported array target ports; independent native FC paths.",
      "Management and dependencies: protected OOB access, DNS, time, identity, monitoring and separately recoverable credentials.",
      "Recovery: protected copies, fenced ownership, recovery-site capacity, application validation and controlled client cutover.",
      "Evidence package: the 15 deliverables, source revision, test observations, residual risks and accountable acceptance."
    ],
    "mechanism": [
      "Begin with business impact. State what must remain available through one host, link, firewall member or FC fabric loss, and what may recover after a whole-site outage. Agree RTO and RPO independently. Record which requirements are assumptions and which have measured evidence.",
      "Map the client transaction through every dependency and return path. Draw Ethernet, FC, management and backup paths separately. Connect logical intent to actual NIC/HBA, switch port, target port, PDU and upstream power identities. A shared dependency can defeat several apparently redundant devices.",
      "Check survivor capacity before promising failover. Three hosts at 100 units each with 20 reserved per survivor provide 160 after one fails, against 140 demand. This is only an aggregate envelope: placement, memory, storage IOPS, quorum and restart order can still block the application.",
      "Rehearse bounded failures and keep baseline, fault and recovery evidence separate. The browser worksheet computes supplied capacity and serial recovery budgets. The Python companion actually backs up, corrupts and restores an owned SQLite database. Neither executes enterprise network or site failover.",
      "Defend the recovery point and service result. The local restored database contains orders 1 and 2 but loses acknowledged order 3, written after backup. For the enterprise scenario, measure recoverable-point age and the entire interruption, including detection and validation. Preserve unmet requirements as open risks.",
      "Hand over an indexed, versioned package. Every deliverable identifies its owner, assumptions, decisions, acceptance observation and rollback/stop condition. A model-based educational acceptance is distinct from operational approval supported by real target tests."
    ],
    "flow": [
      [
        "Define the contract",
        "Service owner approves the fictional 140-unit demand, single-component failure set and 60/15-minute recovery objectives."
      ],
      [
        "Trace the dependencies",
        "Draw client/return, Ethernet, FC A/B, power, OOB, naming, time and identity paths with shared risks visible."
      ],
      [
        "Inject and recover",
        "Predict one failure, retain baseline/fault evidence, restore the known state and test the original operation."
      ],
      [
        "Defend the evidence",
        "Reconcile data loss, integrity, time, policy and cleanup; record guided work and unresolved target risks explicitly."
      ]
    ],
    "comparison": [
      [
        "HA",
        "Maintains or restores service through a declared component loss",
        "Shared corruption and site loss may escape its scope"
      ],
      [
        "Backup",
        "Retains a recoverable earlier data point",
        "A completed copy is not a tested restore"
      ],
      [
        "DR",
        "Coordinates dependencies, data and client recovery after disruption",
        "Requires fencing, measured timing and an accepted data point"
      ],
      [
        "Educational acceptance",
        "Complete consistent artifacts and reproducible scoped evidence",
        "Does not certify a production deployment"
      ]
    ],
    "example": "Worked design: 3 hosts, one failed, 100 units each, 20 reserved per survivor, demand 140. Usable capacity is 160 and aggregate margin is 20. Detection 5 + decision/fencing 10 + restore 25 + validation 15 gives 55 minutes, leaving 5 minutes against RTO 60. A recoverable point aged 10 minutes fits RPO 15. Change restore to 40 and interruption becomes 70, failing RTO; change point age to 20 and RPO fails even if restoration is fast. These are supplied budgets, not observed failover times.",
    "commands": [
      {
        "filename": "capstone-recovery.txt",
        "platform": "Python 3.10+ standard library; from course root",
        "code": "python labs/capstone-recovery.py --run",
        "explanation": "Creates only a fresh owned temporary directory. Uses SQLite backup, inserts one later acknowledged row, deletes live rows to inject logical corruption, restores the earlier snapshot, checks logical content and integrity, then deletes its owned directory.",
        "expected": "JSON result PASS; baseline, backup and restored digests match; faultRows empty; lostAcknowledgedIds contains 3; integrity ok; cleanupVerified true. Local restore seconds do not measure enterprise RTO."
      },
      {
        "filename": "capstone-interruption.txt",
        "platform": "Python 3.10+ standard library; intentional failure test",
        "code": "python labs/capstone-recovery.py --run --interrupt fault",
        "explanation": "Interrupts after the owned fault and exercises cleanup without attempting target configuration. A nonzero exit is intentional; inspect the structured result rather than treating it as a successful full restore.",
        "expected": "Exit 1, result INTERRUPTED, events baseline/backup/fault and cleanupVerified true. No restored evidence is claimed."
      }
    ],
    "configuration": "Use the workbook's 15 deliverables to turn requirements into an implementable intent set. Validate unique addresses, port mappings and zone membership; pin supported device, firmware, driver and hypervisor versions before using product commands. Review the exact diff against a captured baseline and begin with one owned canary. Stop on missing surviving paths, uncertain writer ownership, failed integrity or unexpected denied/allowed flows. Restore the baseline only when doing so preserves the authoritative data state. The Python lab accepts no external database path and never changes host network configuration.",
    "production": "The service owner accepts residual business risk; domain owners verify their boundary and the incident commander authorizes cutover. Trace both PSU feeds upstream, both FC paths to target ports and both client return routes through the firewall. A compute-rack failure is outside the worked single-host protection and uses recovery at Site B. Record as-built changes, version compatibility, support constraints and separately recoverable secrets. Do not call a guessed physical topology production-ready because its arithmetic fits.",
    "security": "Default deny between Internet, DMZ, app, data, users, guest, management and backup zones. Permit only named services on verified identities; the workbook gives explicit positive and negative test pairs. Separate backup deletion authority and recovery credentials from ordinary application administration. Test access after recovery, not just before it. Fence the old writer before promoting Site B and preserve an unknown fencing outcome as a stop condition. The local experiment models no real firewall, identity provider or immutable copy.",
    "performance": "Measure client latency, traffic, errors and saturation at the workload boundary. Aggregate host capacity does not prove memory fit, IOPS, quorum or restart admission. Record backup lag and restore throughput under realistic volume and contention. The worksheet assumes serial recovery phases; if steps overlap, build a dependency critical path instead of subtracting arbitrary time. The Python restore/check duration omits detection, declaration, transport and cutover and cannot substantiate the fictional 60-minute RTO.",
    "troubleshooting": [
      [
        "Two PSUs fail together",
        "Trace both feeds to PDUs and upstream circuits. Shared power invalidates the independence assumption. An authorized facilities test must establish that the surviving path can carry the load."
      ],
      [
        "Ethernet is healthy but guest I/O stalls",
        "Inspect the host's HBA, fabric, zoning, LUN presentation and multipath state. Leaf redundancy does not repair a missing FC path. Compare expected path ownership with actual workload I/O."
      ],
      [
        "A route exists but clients cannot order",
        "Check DNS/TLS/time, firewall state and return routing, application health and database ownership. A route is evidence for only one dependency."
      ],
      [
        "Restore finishes quickly but recovery fails",
        "Validate the actual recoverable point, acknowledged transaction loss and integrity. The latest scheduled backup may be incomplete or already corrupted; preserve a known good copy."
      ],
      [
        "Site B is running while Site A may still write",
        "Stop cutover until ownership is established and fencing is verified. A successful guest start cannot justify two authoritative writers."
      ],
      [
        "The local lab exits 1",
        "With --interrupt this is intentional; require INTERRUPTED and cleanupVerified. Otherwise preserve the error and investigate rather than reclassifying an incomplete run as PASS."
      ]
    ],
    "mistakes": [
      "Counting cables or devices instead of independent failure domains.",
      "Drawing native FC paths through Ethernet leaves.",
      "Treating a VLAN as authorization or route admission as delivery.",
      "Equating the backup schedule with an achieved RPO.",
      "Reporting local database restore seconds as enterprise RTO.",
      "Failing back without reconciling writes and fencing.",
      "Marking pending curriculum batches complete because the Capstone is available."
    ],
    "ports": "The local lab opens no network listener. The worked policy uses HTTPS TCP 443, chosen internal TLS TCP 8443 and PostgreSQL TCP 5432; these are explicit reference choices, not required universal ports. DNS uses UDP/TCP 53, NTP UDP 123 and the chosen TLS syslog listener TCP 6514. Native Fibre Channel is a separate storage fabric, not a TCP service.",
    "prerequisites": [
      "lab-9",
      "lab-8",
      "lab-7",
      "lab-5"
    ],
    "related": [
      "trouble-20",
      "s9-g6-t0",
      "s9-g6-t1"
    ],
    "lab": {
      "objective": "Produce and defend all 15 original deliverables, vary the declared failure budgets, and reproduce local corruption/recovery with visible acknowledged-data loss and owned cleanup.",
      "requirements": "Browser, Python 3.10+ and the downloadable workbook/companion script. The educational path requires no vendor appliance, privileges or network access. Target-specific extensions require a separately authorized owned lab.",
      "topology": [
        "Client → DNS/TLS → firewall → app → database, with return path",
        "Host NICs → Ethernet leaves; HBA A/B → independent SAN A/B",
        "Protected recovery copy → fenced Site B → application validation → client cutover"
      ],
      "steps": [
        "Read the fictional brief and list the failure set, 140-unit demand and 60/15-minute recovery targets.",
        "Fill or adapt all 15 workbook artifacts; cross-check each logical path against its physical port, zone and power dependency.",
        "Use Baseline, Shared power fault, SAN A loss and Site A loss in the worksheet. Predict the first broken dependency and the observation needed to validate recovery.",
        "Compute the baseline envelope and change restore to 40 minutes and point age to 20 minutes. Explain why these fail different objectives; reset and check an equality boundary.",
        "Before running Python, predict the rows at baseline, backup, acknowledged-write, fault and restored stages.",
        "Run the local exercise. Compare row identities and logical digests; explain why order 3 is lost even though integrity is ok.",
        "Run the intentional fault interruption and confirm a nonzero exit plus verified cleanup. Do not infer a completed recovery from interrupted evidence.",
        "Defend the package with the workbook rubric. Label target routing, firewall, FC, power and whole-site execution guided/unexecuted, and list the additional evidence operational acceptance requires."
      ],
      "verification": "All 15 artifacts are present and internally consistent. Model baseline: 160 units, 55 minutes and 10-minute point age. Actual local evidence: restored rows exactly match backup, lost acknowledged ID 3 is explicit, integrity is ok and the temporary directory is absent. Educational acceptance does not assert real service availability.",
      "troubleshooting": "If a worksheet field is missing or invalid, stale results must disappear. If a local observation differs, keep the actual error and compare transaction order and the recoverable snapshot. On a real target stop on unknown writer state, failed policy tests or missing recovery credentials.",
      "challenge": "Move every host into one rack, or place both SAN switches behind one upstream power dependency. Identify which promised failures remain protected and which require a redesigned placement or site recovery. Then defend a recovery-point age of 20 minutes against the 15-minute objective.",
      "cleanup": "Reset the worksheet. The local program closes SQLite connections and removes its new temporary directory even after any supported injected interruption. It never accepts or deletes an existing database directory. Target extensions must separately restore their approved baseline and verify normal service."
    },
    "glossary": {
      "Failure domain": "Components affected together by one event, such as a shared PDU or rack.",
      "RTO": "Target maximum service restoration time after disruption; measure the complete agreed interruption scope.",
      "RPO": "Target maximum age of the data point to which recovery may return at incident time.",
      "Fencing": "Preventing a previous owner from continuing writes before another becomes authoritative.",
      "As-built": "The actual installed topology and configuration, reconciled with approved design intent.",
      "Evidence scope": "The boundary of what an observation or calculation actually demonstrates."
    },
    "sources": [
      {
        "title": "NIST SP 800-34 Rev. 1: contingency planning",
        "url": "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco: reliable Fibre Channel SAN architecture",
        "url": "https://www.cisco.com/c/dam/en/us/td/docs/dcn/whitepapers/design-a-reliable-and-highly-available-fibre-channel.pdf",
        "checked": "2026-10-09"
      },
      {
        "title": "Google SRE: monitoring distributed systems",
        "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
        "checked": "2026-10-09"
      },
      {
        "title": "Python SQLite backup API",
        "url": "https://docs.python.org/3/library/sqlite3.html#sqlite3.Connection.backup",
        "checked": "2026-10-09"
      }
    ],
    "artifacts": [
      {
        "title": "Complete 15-deliverable workbook and defense rubric",
        "path": "labs/capstone-workbook.md"
      },
      {
        "title": "Executable owned database recovery rehearsal",
        "path": "labs/capstone-recovery.py"
      }
    ],
    "quick": [
      {
        "questionId": "capstone-final-QC1",
        "topicId": "capstone-final",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why can two PSU cords still fail together?",
        "answer": "Both may share a PDU, circuit or upstream supply.",
        "explanation": "Trace the dependency to its actual failure boundary; cord count does not establish independence.",
        "testedConcept": "Failure domains"
      },
      {
        "questionId": "capstone-final-QC2",
        "topicId": "capstone-final",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What does the local lab lose after a successful restore?",
        "answer": "Acknowledged order 3, written after the backup.",
        "explanation": "Restored integrity and acceptable data loss are separate postconditions.",
        "testedConcept": "Recoverable data point"
      },
      {
        "questionId": "capstone-final-QC3",
        "topicId": "capstone-final",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which attachment carries native FC storage traffic?",
        "answer": "Host HBAs through SAN A/B to array target ports.",
        "explanation": "Host Ethernet leaf attachment cannot substitute for a verified FC path.",
        "testedConcept": "Plane separation"
      }
    ],
    "exams": [
      {
        "questionId": "capstone-final-EX1",
        "topicId": "capstone-final",
        "difficulty": "applied",
        "type": "short-answer",
        "question": "Three hosts each supply 100 units with 20 reserved; one fails and demand is 140. Calculate capacity and margin.",
        "answer": "160 usable units and 20 units of aggregate margin.",
        "explanation": "Two survivors supply 80 units each; placement and other resource limits remain unproved.",
        "testedConcept": "Survivor capacity"
      },
      {
        "questionId": "capstone-final-EX2",
        "topicId": "capstone-final",
        "difficulty": "applied",
        "type": "short-answer",
        "question": "Detection 5, declaration 10, restore 40 and validation 15 minutes: does RTO 60 pass?",
        "answer": "No. Total interruption is 70 minutes, exceeding RTO by 10.",
        "explanation": "Include every serial phase; counting only restoration hides outage time.",
        "testedConcept": "RTO budgeting"
      },
      {
        "questionId": "capstone-final-EX3",
        "topicId": "capstone-final",
        "difficulty": "applied",
        "type": "short-answer",
        "question": "A restore takes 2 minutes but returns a 20-minute-old point against RPO 15. Is the RPO met?",
        "answer": "No. The recoverable point exceeds the objective by 5 minutes.",
        "explanation": "Restore speed does not change the age of recoverable data at the incident.",
        "testedConcept": "RPO distinction"
      },
      {
        "questionId": "capstone-final-EX4",
        "topicId": "capstone-final",
        "difficulty": "applied",
        "type": "short-answer",
        "question": "SAN A fails and all Ethernet uplinks are up. What evidence is still needed?",
        "answer": "A usable host HBA B/SAN B/target path, correct zoning and LUN presentation, and successful workload I/O through it.",
        "explanation": "Ethernet health establishes no native FC postcondition.",
        "testedConcept": "Storage recovery"
      },
      {
        "questionId": "capstone-final-EX5",
        "topicId": "capstone-final",
        "difficulty": "applied",
        "type": "short-answer",
        "question": "An application writes through both sites after failover. What acceptance gate was missed?",
        "answer": "Verified fencing and sole authoritative writer ownership before promotion.",
        "explanation": "Starting the recovery guest without controlling the old writer risks divergent state.",
        "testedConcept": "Split-brain prevention"
      },
      {
        "questionId": "capstone-final-EX6",
        "topicId": "capstone-final",
        "difficulty": "applied",
        "type": "short-answer",
        "question": "Guest users cannot reach the database before recovery but can afterward. Is recovery accepted?",
        "answer": "No. Restore the approved deny policy and retest required allowed and denied flows.",
        "explanation": "Service restoration must preserve security intent.",
        "testedConcept": "Post-recovery policy"
      },
      {
        "questionId": "capstone-final-EX7",
        "topicId": "capstone-final",
        "difficulty": "applied",
        "type": "short-answer",
        "question": "Every host is in one rack. Does passing a one-host failure test prove rack resilience?",
        "answer": "No. A rack failure can remove all hosts and shared dependencies; test a different placement or site recovery plan.",
        "explanation": "The fault set must match the claim.",
        "testedConcept": "Scope of HA"
      },
      {
        "questionId": "capstone-final-EX8",
        "topicId": "capstone-final",
        "difficulty": "applied",
        "type": "short-answer",
        "question": "A backup file exists and integrity_check is ok. What further data evidence is needed?",
        "answer": "Verify expected application rows, the actual recoverable transaction point and loss of acknowledged writes against the objective.",
        "explanation": "Structural integrity alone cannot show application completeness or freshness.",
        "testedConcept": "Restore validation"
      },
      {
        "questionId": "capstone-final-EX9",
        "topicId": "capstone-final",
        "difficulty": "applied",
        "type": "short-answer",
        "question": "What should automation do when the baseline changes after review?",
        "answer": "Reject the stale change, inspect current state and obtain review for a new exact diff before applying.",
        "explanation": "Blind application or retries can overwrite an unrelated change.",
        "testedConcept": "Safe change control"
      },
      {
        "questionId": "capstone-final-EX10",
        "topicId": "capstone-final",
        "difficulty": "applied",
        "type": "short-answer",
        "question": "What separates a complete Capstone submission from operational acceptance?",
        "answer": "The educational package has consistent artifacts and scoped reproducible evidence; operational acceptance additionally needs observed target service, policy, integrity, failure and recovery tests with owner approval.",
        "explanation": "Supplied arithmetic and local SQLite execution do not prove physical or enterprise behavior.",
        "testedConcept": "Evidence and accountability"
      }
    ]
  }
];
