window.INFRA_BATCHES = window.INFRA_BATCHES || {};
window.INFRA_BATCHES["29"] = [
  {
    "id": "ADD-INFRA-001",
    "subtitle": "Follow a user operation through its dependencies and failure boundaries.",
    "minutes": 40,
    "definition": "Infrastructure is the collection of compute, network, storage, identity and operating services that allows an application to deliver an outcome. A dependency map describes what that outcome needs, in which direction, and under what conditions.",
    "purpose": "Start with an observable operation, such as placing an order and reading its receipt. A server inventory tells you what exists; it does not tell you which failure prevents the operation. Build a map that connects client behavior to service owners, protocols, state and recovery prerequisites. Use it to choose a diagnostic observation before changing a device.",
    "mental": "A dependency graph resembles a recipe: missing one required ingredient can stop the result even if all the other ingredients are present. Real systems are less rigid: caches, retries, optional features and redundant paths change requirements over time. Label synchronous requirements separately from optional or startup-only dependencies. The companion deliberately treats every edge as a required dependency and does not model those alternatives.",
    "components": [
      "Client: initiates the agreed operation and observes correctness and latency. A component can be a client upstream and a server downstream.",
      "Naming and trust: resolver, certificate chain, hostname and acceptable clock state. Cached DNS or existing TLS sessions can temporarily hide their failure.",
      "Application and data: request handler, database ownership, durable writes and read-after-write expectations.",
      "Delivery path: routing, permitted ports, middleboxes and the return path; reachability is necessary but insufficient.",
      "Operations path: identity, secrets, telemetry, backup and management access, which may share failure domains with production."
    ],
    "mechanism": [
      "Define the service boundary first. For checkout, a good result is one durable order with a receipt, not simply a TCP connection or HTTP 200. Identify who consumes the result and where you will measure it.",
      "Draw directed edges from each consumer to the dependency it requires. Label the operation, protocol, owner, timeout and stored state. Split DNS lookup, TLS verification, application processing and database commit rather than drawing one unexplained cloud.",
      "Overlay shared failure domains. Two application hosts may depend on one database, resolver, rack circuit or credential service. Distinct device names do not establish independence. Identify the smallest failure that can break every usable path.",
      "Attach observations to edges: resolved address, verified peer name, selected route, response timing, transaction identifier and durable read-back. A negative observation narrows a boundary; it does not identify the root cause without additional evidence.",
      "Test one controlled failure in an isolated scope, compare with the hypothesis and restore the exact baseline. Re-run the original operation after recovery. Keep restoration evidence separate from a diagram or configuration diff."
    ],
    "flow": [
      [
        "Define outcome",
        "One order is committed and its receipt can be retrieved."
      ],
      [
        "Map requirements",
        "Client needs naming and trust; app needs an authoritative database."
      ],
      [
        "Break one dependency",
        "In the supplied graph, database failure blocks checkout even while app exists."
      ],
      [
        "Verify recovery",
        "Restore that dependency and repeat the original operation, not only a health ping."
      ]
    ],
    "comparison": [
      [
        "Inventory",
        "Names and properties of assets",
        "Useful for ownership; insufficient for service recovery"
      ],
      [
        "Dependency map",
        "Required relationships for an operation",
        "Makes shared dependencies and recovery order explicit"
      ],
      [
        "Physical map",
        "Ports, cables, racks and power sources",
        "Tests whether logical redundancy shares a physical failure"
      ]
    ],
    "example": "The supplied graph has six nodes: checkout, dns, tls, time, app and database. Every node is required. With no failures, the model reports available. Marking only database failed makes checkout unavailable, even though DNS, time and app remain healthy. Restoring database makes the graph available again. This is a boolean teaching model, not a database availability experiment.",
    "commands": [
      {
        "filename": "Lab notebook",
        "platform": "Python 3.10+ / project root",
        "code": "python labs/infrastructure-rehearsal.py --case dependencies",
        "explanation": "Evaluate an authored six-node dependency graph under three supplied states.",
        "expected": "baseline.available=true, fault.available=false with database blocked, recovery.available=true; cleanupVerified=true."
      }
    ],
    "configuration": "Version the dependency map with the service definition and named owners. Review changed edges before deployment; preserve the previous revision. On a real owned target, validate the original client operation before and after the approved change and roll back the changed edge if the declared stop condition is reached. The local model changes no service configuration.",
    "production": "Use the map during design review, incident triage and recovery planning. Record which paths are mandatory during normal operation versus startup and disaster recovery. A working cached credential can conceal a broken identity dependency until restart; recovery plans must include the dependencies needed to start from nothing.",
    "troubleshooting": [
      [
        "Receipt missing after HTTP success",
        "Correlate request and transaction IDs, inspect commit/read-back semantics and distinguish application acknowledgment from durable success."
      ],
      [
        "Only new clients fail",
        "Compare DNS cache, certificate validation and connection establishment; an existing connection does not repeat every startup dependency."
      ],
      [
        "Both replicas fail together",
        "Inspect shared storage, control services, zone, rack and power rather than assuming two hosts imply independence."
      ],
      [
        "Graph says available but service fails",
        "The model includes only declared boolean requirements. Add missing observations for capacity, state consistency and protocol behavior; do not relabel the actual failure as success."
      ]
    ],
    "security": "Treat trust edges as authorization boundaries. Record identities and permitted operations without storing passwords or private keys in diagrams. Give recovery operators a tested path to scoped credentials even when the usual identity service is unavailable.",
    "performance": "Measure client latency and each relevant dependency separately. Sequential work contributes to the critical path; concurrent work and retries complicate simple sums. A dependency map identifies where to measure, but its edge count cannot predict throughput.",
    "mistakes": [
      "Using equipment count as proof of resilience.",
      "Omitting the return path, DNS, time or identity.",
      "Treating a green process check as transaction success.",
      "Assuming the offline graph executes network faults."
    ],
    "ports": "The companion opens no sockets. A real example may use DNS UDP/TCP 53, HTTPS TCP 443 and a separately configured database port; annotate actual service configuration rather than assuming defaults.",
    "prerequisites": [
      "s0-g2-t0",
      "s1-g1-t2"
    ],
    "related": [
      "capstone-final",
      "ADD-INFRA-002"
    ],
    "artifacts": [
      {
        "title": "Offline dependency, objective and configuration rehearsal",
        "path": "labs/infrastructure-rehearsal.py"
      }
    ],
    "sources": [
      {
        "title": "Google SRE: monitoring distributed systems",
        "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
        "checked": "2026-10-09"
      }
    ],
    "lab": {
      "objective": "Construct a service dependency graph and predict its baseline, database-failure and recovery outcomes.",
      "requirements": "Python 3.10+, the companion and a text notebook. No privileges, vendor image or network is required.",
      "topology": [
        "checkout → dns",
        "checkout → tls → time",
        "checkout → app → database"
      ],
      "steps": [
        "Draw the six-node graph before running the command; mark every edge required.",
        "Predict which outcome changes when only database fails. Identify the unaffected observations.",
        "Execute the dependency case and compare all three output states with your prediction.",
        "Add a written alternate design with two database paths and state the quorum/ownership rule it would require; do not claim that the companion models it.",
        "List the actual DNS, TLS, application and durable-write observations needed to replace each model assumption on a disposable service."
      ],
      "verification": "The fault blocks database; baseline and recovery have no blocked nodes. The required set contains all six nodes and cleanupVerified is true. Your notebook distinguishes this supplied graph result from a real client transaction.",
      "troubleshooting": "An unknown node or dependency cycle is a modeling error. Correct the map before using it as recovery guidance. A passing graph does not dismiss actual timeout or integrity evidence.",
      "challenge": "Explain how a startup-only identity dependency can break recovery while an already-running process still serves users.",
      "cleanup": "The companion removes only its newly allocated temporary directory. Keep the notebook; there are no host routes or services to restore."
    },
    "glossary": {
      "Dependency": "A capability required by another component for a specified operation.",
      "Failure domain": "Components that can fail together because of a shared cause.",
      "Critical path": "The chain of work that determines completion time for an operation.",
      "Client/server": "Roles in an interaction, not permanent device categories."
    },
    "rehearsal": {
      "scope": "Authored boolean evidence, not captured service output. All listed graph edges are mandatory.",
      "states": [
        {
          "name": "Baseline",
          "evidence": [
            "checkout requires dns, tls and app",
            "tls requires time; app requires database",
            "All six nodes declared available"
          ],
          "interpretation": "The supplied requirements are satisfied; no latency or integrity claim follows.",
          "next": "Measure a real transaction before operational acceptance."
        },
        {
          "name": "Fault",
          "evidence": [
            "Only database is declared failed",
            "App process remains available",
            "checkout.available = false"
          ],
          "interpretation": "An alive frontend cannot substitute for its required data service.",
          "next": "Check database ownership and transaction evidence on a real target."
        },
        {
          "name": "Recovery",
          "evidence": [
            "Database declaration restored",
            "checkout.available = true"
          ],
          "interpretation": "The graph returns to its baseline; the local model has not restored any real database.",
          "next": "Repeat the original durable transaction on the owned target."
        }
      ]
    },
    "quick": [
      {
        "question": "Can one component be both client and server?",
        "answer": "Yes: a web handler serves a browser while requesting data from a database.",
        "explanation": "Roles describe a particular interaction.",
        "testedConcept": "Interaction roles",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-001-QC1",
        "topicId": "ADD-INFRA-001"
      },
      {
        "question": "Why draw the return path?",
        "answer": "A request may arrive while its response is blocked or misrouted.",
        "explanation": "Forward delivery alone does not prove a completed exchange.",
        "testedConcept": "Bidirectional delivery",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-001-QC2",
        "topicId": "ADD-INFRA-001"
      },
      {
        "question": "Does the graph model throughput?",
        "answer": "No. Its nodes are declared available or failed.",
        "explanation": "Capacity and timings need separate evidence.",
        "testedConcept": "Model scope",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-001-QC3",
        "topicId": "ADD-INFRA-001"
      }
    ],
    "exams": [
      {
        "question": "Both web replicas use one database. What remains a shared dependency?",
        "answer": "The database and any common storage, identity or power it requires.",
        "explanation": "Replication of one tier does not duplicate the entire dependency chain.",
        "testedConcept": "Shared fate",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-001-EX1",
        "topicId": "ADD-INFRA-001"
      },
      {
        "question": "A cached client works while a fresh client fails. Name two boundaries to inspect.",
        "answer": "DNS resolution and TLS establishment; also compare identity and fresh connection paths.",
        "explanation": "Warm clients may reuse results that new clients must obtain.",
        "testedConcept": "Startup dependencies",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-001-EX2",
        "topicId": "ADD-INFRA-001"
      },
      {
        "question": "A dashboard shows every process alive but users cannot save. What observation is missing?",
        "answer": "A correlated durable write and read-back from the user operation.",
        "explanation": "Process health is a narrower signal than correct service behavior.",
        "testedConcept": "User outcome",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-001-EX3",
        "topicId": "ADD-INFRA-001"
      },
      {
        "question": "When is multiplying component availability misleading?",
        "answer": "When failures are correlated or the topology has alternatives, quorum, caching or changing requirements.",
        "explanation": "An independence/product model requires assumptions this graph does not establish.",
        "testedConcept": "Reliability assumptions",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-001-EX4",
        "topicId": "ADD-INFRA-001"
      },
      {
        "question": "Which node blocks the supplied graph when database fails?",
        "answer": "Database is the failed dependency and checkout becomes unavailable through app.",
        "explanation": "The dependency is transitive even though app itself is declared alive.",
        "testedConcept": "Transitive requirements",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-001-EX5",
        "topicId": "ADD-INFRA-001"
      },
      {
        "question": "How would you record an optional analytics dependency?",
        "answer": "Label it optional for checkout and define degraded behavior when it fails.",
        "explanation": "Treating every edge as required overstates user impact; the companion cannot represent optional edges.",
        "testedConcept": "Degradation",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-001-EX6",
        "topicId": "ADD-INFRA-001"
      },
      {
        "question": "Why can two NICs fail together?",
        "answer": "They can share a switch, upstream path, power source or host.",
        "explanation": "Count independent failure boundaries, not just interfaces.",
        "testedConcept": "Physical mapping",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-001-EX7",
        "topicId": "ADD-INFRA-001"
      },
      {
        "question": "What belongs on a dependency edge besides a protocol?",
        "answer": "Owner, operation, timeout, identity, state and an observable success criterion.",
        "explanation": "Operational details make the map useful during diagnosis and recovery.",
        "testedConcept": "Actionable documentation",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-001-EX8",
        "topicId": "ADD-INFRA-001"
      },
      {
        "question": "The graph is healthy after reversal. Is recovery accepted?",
        "answer": "Only for the model; a real service still needs the original transaction, data integrity and intended policy checks.",
        "explanation": "Restored intent does not establish restored behavior.",
        "testedConcept": "Recovery evidence",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-001-EX9",
        "topicId": "ADD-INFRA-001"
      },
      {
        "question": "How do you protect a recovery map containing credentials?",
        "answer": "Keep secret values out; reference a scoped, protected credential retrieval procedure and test access.",
        "explanation": "A useful diagram must not become a secret disclosure channel.",
        "testedConcept": "Recovery security",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-001-EX10",
        "topicId": "ADD-INFRA-001"
      }
    ],
    "batch": "29",
    "title": "Infrastructure and service dependency maps",
    "level": "Operational foundations / applied practice"
  },
  {
    "id": "ADD-INFRA-002",
    "subtitle": "Define a useful denominator before calculating reliability.",
    "minutes": 40,
    "definition": "A service level indicator measures a chosen aspect of service behavior. A service level objective sets its target over a defined window, while a service level agreement specifies commitments and consequences. An error budget expresses the failures allowed by an objective.",
    "purpose": "Replace vague claims such as highly available with a measurable promise. For a checkout service, decide which requests are eligible, what counts as a good result, where measurement occurs and how missing observations are handled. This makes release and reliability tradeoffs reviewable rather than dependent on the most optimistic dashboard.",
    "mental": "Think of an error budget as a spending allowance for bad outcomes within an agreed accounting window. It is not a bank balance you can reset after a repair. Request-based and time-based budgets count different things; their numbers cannot be exchanged without a measurement model. A budget guides engineering decisions and does not authorize avoidable outages.",
    "components": [
      "SLI: observed good events divided by eligible events, with correctness and latency definitions.",
      "SLO: target and window, such as at least 99.9% good eligible requests over a declared month.",
      "SLA: service agreement and specified consequences; this lesson does not interpret legal contracts.",
      "Error budget: allowed bad events minus observed bad events for the same population and window.",
      "Telemetry policy: exclusions, retries, client/server vantage, missing data and ownership of the calculation."
    ],
    "mechanism": [
      "Choose the user journey and event boundary. Count one defined operation consistently; decide whether retries are distinct attempts or part of one user transaction. Exclusions must be specified before looking at poor results.",
      "Measure a good-event predicate. For example, a correct receipt returned within 800 milliseconds is good, while an HTTP 200 with incorrect data is bad. A success-rate SLI without a latency condition cannot prove latency objectives.",
      "Compute the budget using the exact target. In 10,000 eligible requests, a 99.9% objective allows 10 bad requests. Five bad requests leave five; twenty exhaust the allowance by ten. Retain negative remaining budget rather than clamping it to zero.",
      "Compare windows carefully. A recovered service starts producing good events, but prior failures remain in the rolling or fixed window until its rules remove them. The companion recovery case is a separate supplied window, not a rewrite of history.",
      "Translate the result into a pre-agreed policy: stabilize service, prioritize fault reduction or cautiously resume changes. Budget burn rate compares observed bad fraction with permitted bad fraction over a matching interval; it does not by itself forecast future traffic."
    ],
    "flow": [
      [
        "Specify",
        "Define good event, eligibility, vantage and window."
      ],
      [
        "Count",
        "Retain good and bad events, with missing data visible."
      ],
      [
        "Compare",
        "Compute SLI and remaining allowance against the declared target."
      ],
      [
        "Act",
        "Apply the agreed reliability policy and continue observing recovery."
      ]
    ],
    "comparison": [
      [
        "Availability",
        "Service usable under a chosen measure",
        "Request-based and time-based measures can disagree"
      ],
      [
        "Reliability",
        "Consistent correct behavior over stated conditions/time",
        "Includes more than process uptime"
      ],
      [
        "Durability",
        "Retention of acknowledged data",
        "A responsive service can still lose writes"
      ],
      [
        "SLI / SLO / SLA",
        "Measurement / target / agreement",
        "Keep observed result separate from promise and consequences"
      ]
    ],
    "example": "An authored 10,000-request window with 20 bad outcomes has a 99.8% SLI. Against a 99.9% target it permits 10 bad events and has -10 remaining. A different 10,000-request window with eight bad outcomes reaches 99.92% and has two remaining. Both arithmetic results are reproducible; neither establishes real customer availability.",
    "commands": [
      {
        "filename": "Lab notebook",
        "platform": "Python 3.10+ / project root",
        "code": "python labs/infrastructure-rehearsal.py --case objectives",
        "explanation": "Calculate three independent supplied request windows using decimal arithmetic.",
        "expected": "Baseline: five remaining. Fault: minus ten. Recovery sample: two. Each output states whether that window meets 99.9%."
      }
    ],
    "configuration": "Version the SLI specification and retain raw counts before changing an alert or target. Validate new queries alongside the previous definition; changes to eligibility must be disclosed because they change comparability. Restore the previous query or dashboard on an incorrect rollout, preserving both calculation histories.",
    "production": "Use a small number of user-relevant indicators, with traffic, latency, errors and saturation as supporting diagnosis. Report the window and denominator next to percentages. A period with zero eligible requests has no request-success ratio; treat it as no data, not automatic 100% availability. Separate telemetry failure from measured service failure.",
    "troubleshooting": [
      [
        "Availability improves after excluding failures",
        "Audit eligibility and query revisions before concluding the service improved."
      ],
      [
        "Server looks fast but users wait",
        "Compare client vantage, network setup, queueing and rendering with server-only timing."
      ],
      [
        "Average latency passes but users complain",
        "Inspect the latency distribution and affected segments; an average can hide a slow tail."
      ],
      [
        "Budget appears reset after repair",
        "Check whether the window changed. Recovery should not erase earlier bad events in the same window."
      ]
    ],
    "security": "Protect telemetry identifiers and restrict access to request details. Keep aggregated counts sufficient for review while controlling personal data and sensitive payloads. Do not change exclusions to hide the impact of an incident.",
    "performance": "Measure latency percentiles or a latency success predicate with adequate sample size. Percentiles generally cannot be averaged across hosts to recover a global percentile. Capacity saturation and retry amplification can affect the next window even after current error rate falls.",
    "mistakes": [
      "Reporting percentages without a denominator and window.",
      "Counting wrong results as good because HTTP returned 200.",
      "Interchanging time and request budgets.",
      "Treating missing data as success.",
      "Erasing past errors at recovery."
    ],
    "ports": "SLI/SLO arithmetic has no required port. Collection protocols, agents and dashboards use separately configured endpoints and authorization.",
    "prerequisites": [
      "ADD-INFRA-001"
    ],
    "related": [
      "s9-g8-t0",
      "ADD-INFRA-003"
    ],
    "artifacts": [
      {
        "title": "Offline dependency, objective and configuration rehearsal",
        "path": "labs/infrastructure-rehearsal.py"
      }
    ],
    "sources": [
      {
        "title": "Google SRE: service level objectives",
        "url": "https://sre.google/sre-book/service-level-objectives/",
        "checked": "2026-10-09"
      },
      {
        "title": "Google SRE: monitoring distributed systems",
        "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
        "checked": "2026-10-09"
      }
    ],
    "lab": {
      "objective": "Reproduce an error budget and explain what recovery can and cannot change.",
      "requirements": "Python 3.10+ and a notebook; all requests are supplied counts, with no traffic generation.",
      "topology": [
        "Eligible operations",
        "Good/bad classification",
        "Window aggregation",
        "Target comparison"
      ],
      "steps": [
        "Write the formula allowedBad = eligible × (1 − target/100).",
        "Predict remaining budget for 10,000 requests with 5, 20 and 8 bad events at 99.9%.",
        "Run the objectives case and compare exact decimal results.",
        "For a fixed original window, add 1,000 good requests to the 20-bad case; recompute 20/11,000 rather than deleting failures.",
        "Specify an independent latency SLI, including threshold, eligible requests and vantage.",
        "Write a policy for an exhausted budget and identify who can authorize exceptions."
      ],
      "verification": "All three supplied counts match the predictions. The 20-bad result fails; 11,000 total with 20 bad still fails 99.9%. Zero traffic is no data. No result is described as measured production availability.",
      "troubleshooting": "Check percentage-to-fraction conversion and whether bad events were double-counted after retries. Keep populations and windows aligned before comparing.",
      "challenge": "A quiet hour has one failure in ten requests; a busy hour has 100 failures in 100,000. Compute the combined request SLI instead of averaging the two percentages.",
      "cleanup": "The program removes its temporary directory. Preserve the SLI definition and calculations; no monitoring agent or alert is installed."
    },
    "glossary": {
      "SLI": "A defined quantitative observation of service behavior.",
      "SLO": "A target for an SLI over a specified window.",
      "Error budget": "The bad outcomes permitted by an objective, accounted within its window.",
      "Burn rate": "Observed bad-event rate divided by the rate allowed by the objective."
    },
    "rehearsal": {
      "scope": "Supplied independent windows; no live traffic and no claim that recovery resets a previous window.",
      "states": [
        {
          "name": "Baseline",
          "evidence": [
            "10,000 eligible; 5 bad",
            "Target 99.9%; permitted bad=10"
          ],
          "interpretation": "99.95% SLI leaves five bad events of allowance.",
          "next": "Check that the good-event predicate includes correctness."
        },
        {
          "name": "Fault",
          "evidence": [
            "10,000 eligible; 20 bad",
            "Remaining allowance=-10"
          ],
          "interpretation": "99.8% misses the target.",
          "next": "Investigate impact and apply the agreed exhausted-budget policy."
        },
        {
          "name": "Recovery",
          "evidence": [
            "A separate sample: 10,000 eligible; 8 bad",
            "Remaining allowance=2"
          ],
          "interpretation": "99.92% passes this sample only; the earlier window is unchanged.",
          "next": "Continue the actual rolling/fixed-window calculation."
        }
      ]
    },
    "quick": [
      {
        "question": "What distinguishes an SLI from an SLO?",
        "answer": "An SLI is the measurement; an SLO is its target and window.",
        "explanation": "Observed performance and desired performance are different.",
        "testedConcept": "Measurement vs target",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-002-QC1",
        "topicId": "ADD-INFRA-002"
      },
      {
        "question": "At 99.9%, how many bad events are allowed in 10,000?",
        "answer": "Ten.",
        "explanation": "10,000 multiplied by 0.001 equals ten.",
        "testedConcept": "Budget arithmetic",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-002-QC2",
        "topicId": "ADD-INFRA-002"
      },
      {
        "question": "Is zero traffic 100% request success?",
        "answer": "No; the ratio has no denominator and should be reported as no data.",
        "explanation": "Do not invent a successful observation.",
        "testedConcept": "Missing data",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-002-QC3",
        "topicId": "ADD-INFRA-002"
      }
    ],
    "exams": [
      {
        "question": "Calculate the SLI for 20 failures in 10,000 eligible requests.",
        "answer": "99.8%.",
        "explanation": "9,980/10,000 multiplied by 100 gives the good-event percentage.",
        "testedConcept": "SLI arithmetic",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-002-EX1",
        "topicId": "ADD-INFRA-002"
      },
      {
        "question": "How much budget remains at 99.9% for that window?",
        "answer": "Minus ten bad events.",
        "explanation": "Ten were allowed and twenty occurred; the negative value exposes overspend.",
        "testedConcept": "Budget exhaustion",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-002-EX2",
        "topicId": "ADD-INFRA-002"
      },
      {
        "question": "Does a 200 status always count as good?",
        "answer": "Only if the declared predicate is met, including correctness and any latency requirement.",
        "explanation": "Transport/application status is not a complete user outcome.",
        "testedConcept": "Good-event design",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-002-EX3",
        "topicId": "ADD-INFRA-002"
      },
      {
        "question": "Why can uptime and request availability disagree?",
        "answer": "Failures during busy periods affect more requests; uptime weights elapsed time instead.",
        "explanation": "The measures have different denominators.",
        "testedConcept": "Weighting",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-002-EX4",
        "topicId": "ADD-INFRA-002"
      },
      {
        "question": "What happens to earlier failures after repair?",
        "answer": "They remain in the same accounting window until its normal rules remove them.",
        "explanation": "A restart or successful repair does not reset observed history.",
        "testedConcept": "Window semantics",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-002-EX5",
        "topicId": "ADD-INFRA-002"
      },
      {
        "question": "Can you average two hosts’ p99 latencies for the service p99?",
        "answer": "Generally no; combine the underlying observations or appropriate histograms.",
        "explanation": "Quantiles are not linearly composable.",
        "testedConcept": "Latency aggregation",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-002-EX6",
        "topicId": "ADD-INFRA-002"
      },
      {
        "question": "A dashboard loses half its samples. What should its report include?",
        "answer": "Missing-data scope and collection failure, with no unsupported success assumption.",
        "explanation": "Incomplete measurement cannot establish the claimed service level.",
        "testedConcept": "Telemetry quality",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-002-EX7",
        "topicId": "ADD-INFRA-002"
      },
      {
        "question": "At a 0.1% allowed bad rate and observed 0.2%, what is burn rate?",
        "answer": "Two times for that matching interval.",
        "explanation": "0.002 divided by 0.001 equals two, without forecasting future traffic.",
        "testedConcept": "Burn calculation",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-002-EX8",
        "topicId": "ADD-INFRA-002"
      },
      {
        "question": "What must accompany a changed eligibility query?",
        "answer": "Version, rationale, impact on comparability and retained prior/raw evidence.",
        "explanation": "Changing the denominator can improve reported performance without changing users’ experience.",
        "testedConcept": "Metric governance",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-002-EX9",
        "topicId": "ADD-INFRA-002"
      },
      {
        "question": "Combine one bad event in ten with 100 in 100,000.",
        "answer": "101 bad in 100,010, about 99.8990% good.",
        "explanation": "Aggregate counts, not an unweighted mean of percentages.",
        "testedConcept": "Population aggregation",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-002-EX10",
        "topicId": "ADD-INFRA-002"
      }
    ],
    "batch": "29",
    "title": "Availability, reliability and service objectives",
    "level": "Operational foundations / applied practice"
  },
  {
    "id": "ADD-INFRA-003",
    "subtitle": "Make changes reversible and incident conclusions evidence-based.",
    "minutes": 45,
    "definition": "Change control makes an intended modification reviewable, bounded and recoverable. Incident response coordinates restoration of an impaired service while preserving enough evidence to distinguish observations, hypotheses and confirmed causes.",
    "purpose": "Practice a small configuration change with a known baseline, a validation gate, a stop condition and exact rollback. Then use the same discipline during an incident: assign roles, describe user impact, record timed observations and choose the least risky useful action. A fast command without an ownership or recovery plan can turn a limited fault into a wider outage.",
    "mental": "A change is a controlled experiment with an escape route. State what should happen, observe it and reverse it when a declared condition fails. Production incidents are not clean experiments: several changes, missing logs and urgent mitigations can confound cause. Preserve uncertainty rather than turning the first plausible explanation into a conclusion.",
    "components": [
      "Change record: owner, purpose, affected scope, baseline revision, validation and rollback prerequisites.",
      "Incident command: a coordinator maintains priorities; operations executes; communications maintains consistent updates. Small teams may combine roles explicitly.",
      "Evidence: timestamps, observer, command/query, result, environment and known gaps.",
      "Recovery gate: original service behavior, correctness, policy and acceptable state, not only a restarted process.",
      "Follow-up: timeline, contributing conditions, corrective owners and verification dates without blame-oriented shortcuts."
    ],
    "mechanism": [
      "Record a baseline that is usable for recovery: exact configuration bytes or revision, dependency state and a successful user operation. Confirm access to the rollback mechanism before introducing the candidate.",
      "Validate the candidate offline where possible, then stage it on a disposable target. Syntax acceptance is weaker than behavioral acceptance; define a measurable stop condition and one owner for the change.",
      "During impairment, establish impact and roles. Preserve the recent change timeline and a minimal evidence set, then prefer a bounded mitigation with a known reversal. Do not postpone urgent service restoration merely to collect every possible log.",
      "Restore known configuration or apply an explicitly approved fix. Validate the original transaction and any data affected while impaired; an application rollback may not reverse a database schema or already committed writes.",
      "Close the incident only after the recovery gate and handover. Retain facts, uncertain intervals, contributing causes and follow-up actions. A cryptographic digest can detect changed bytes relative to a trusted reference but cannot prove that the original record was truthful."
    ],
    "flow": [
      [
        "Prepare",
        "Save a known baseline and specify validation and stop conditions."
      ],
      [
        "Validate",
        "Reject a candidate with an out-of-range timeout before deployment."
      ],
      [
        "Recover",
        "Restore exact configuration bytes after a simulated accidental write."
      ],
      [
        "Learn",
        "Verify the original operation and record the evidence boundary and follow-up."
      ]
    ],
    "comparison": [
      [
        "Observation",
        "Directly recorded result",
        "Include time, scope and collection method"
      ],
      [
        "Hypothesis",
        "Proposed explanation",
        "State an observation that would weaken or support it"
      ],
      [
        "Mitigation",
        "Action that reduces impact",
        "May restore service without establishing cause"
      ],
      [
        "Rollback",
        "Reversal to a known state",
        "May not undo data or external side effects"
      ]
    ],
    "example": "The local JSON configuration uses upstream inventory and timeout_ms 500. The validator rejects a candidate timeout of zero. The exercise then deliberately writes that invalid candidate only inside a new temporary directory, observes changed bytes and restores the exact baseline. It proves file validation and restoration; there is no running inventory service to claim recovered.",
    "commands": [
      {
        "filename": "Lab notebook",
        "platform": "Python 3.10+ / project root",
        "code": "python labs/infrastructure-rehearsal.py --case change",
        "explanation": "Reject an invalid candidate and reproduce an accidental local file write followed by byte-exact rollback.",
        "expected": "candidateRejected, faultDiffers, restoredExact and cleanupVerified are true; the baseline digest is recorded."
      }
    ],
    "configuration": "For a real change, define the exact target, allowed modification, prechecks, verification window and stop condition. Back up only the owned configuration to a protected location; do not overwrite another operator’s newer revision. If rollback requires compatible application and database versions, test that combination before approval. The companion is deliberately limited to one owned file.",
    "production": "Maintain an incident timeline in a shared record, distinguish impact time from detection time and record timezone/clock uncertainty. Use clear ownership to avoid competing fixes. Communicate what is known, what is being tested and the next update point; avoid unsupported restoration estimates.",
    "troubleshooting": [
      [
        "Syntax passes but users fail",
        "Compare behavior, dependencies and semantics with the baseline; a parser proves only accepted syntax."
      ],
      [
        "Rollback file differs from the saved digest",
        "Stop and identify which revision is authoritative. Preserve both files instead of overwriting newer work."
      ],
      [
        "Service is healthy but data is missing",
        "Reconcile acknowledged writes and the selected recovery point; code rollback cannot recreate lost transactions."
      ],
      [
        "Logs disagree on order",
        "Compare clock sources, timezones and collection delays. Keep uncertain ordering explicit rather than fabricating a precise timeline."
      ]
    ],
    "security": "Restrict incident evidence by sensitivity. Redact secrets and personal payloads in shared summaries while preserving controlled originals when needed. Use scoped operator privileges and audit actions; emergency access must remain attributable and be revoked after use.",
    "performance": "Bound validation duration and resource impact. A diagnostic that saturates disk or floods a dependency can worsen the incident. Prefer small targeted observations and compare the same workload before and after a change.",
    "mistakes": [
      "Calling a recent change the root cause without corroboration.",
      "Assuming rollback reverses data writes.",
      "Running several uncoordinated mitigations.",
      "Publishing raw secrets from incident logs.",
      "Closing on process status alone."
    ],
    "ports": "The local exercise opens no listeners. Incident collection and remote management use target-specific authenticated channels; their availability and credentials belong in the dependency map.",
    "prerequisites": [
      "ADD-INFRA-001",
      "ADD-INFRA-002"
    ],
    "related": [
      "trouble-20",
      "s9-g4-t2"
    ],
    "artifacts": [
      {
        "title": "Offline dependency, objective and configuration rehearsal",
        "path": "labs/infrastructure-rehearsal.py"
      }
    ],
    "sources": [
      {
        "title": "Google SRE: managing incidents",
        "url": "https://sre.google/sre-book/managing-incidents/",
        "checked": "2026-10-09"
      }
    ],
    "lab": {
      "objective": "Produce a change record and verify exact owned-file rollback with clearly scoped evidence.",
      "requirements": "Python 3.10+, the companion and a notebook. No privileged commands or running service are required.",
      "topology": [
        "Known JSON baseline",
        "Candidate validation",
        "Accidental owned-file change",
        "Exact restore and revalidation"
      ],
      "steps": [
        "Record the baseline timeout, candidate timeout and validator rule before running the lab.",
        "Predict whether a zero timeout is acceptable and define the stop condition.",
        "Run the change case; record the four boolean postconditions and baseline SHA-256.",
        "Write a short incident timeline separating candidate rejection, accidental write and restoration.",
        "Add a real-service extension plan: original user probe, validation interval, data-side-effect review and rollback compatibility. Do not execute that extension on an unowned service.",
        "Write one corrective action that prevents bypassing the validation gate, with an owner and a verification test."
      ],
      "verification": "Invalid candidate rejection and byte-exact restoration are demonstrated. The temporary directory is absent. The report explicitly avoids a service-recovery claim because no service was started.",
      "troubleshooting": "If JSON is malformed or a postcondition is false, preserve the actual output and treat the run as incomplete. Do not change the expected result to match an unexplained failure.",
      "challenge": "A database migration ran after the saved configuration. Explain why restoring only the application configuration may be unsafe, and what compatibility evidence is needed.",
      "cleanup": "Only the program’s new temporary directory is removed automatically. Retain the sanitized change and incident records; no shared application is restarted."
    },
    "glossary": {
      "Baseline": "Known recorded state used for comparison and recovery.",
      "Stop condition": "Predefined observation that halts or reverses a change.",
      "Mitigation": "Action intended to reduce current user impact.",
      "Provenance": "Where evidence came from and how it was collected."
    },
    "rehearsal": {
      "scope": "Authored incident narrative matching the local file exercise; no production outage is simulated.",
      "states": [
        {
          "name": "Baseline",
          "evidence": [
            "upstream=inventory; timeout_ms=500",
            "Saved bytes and SHA-256 available"
          ],
          "interpretation": "The local configuration satisfies the validator.",
          "next": "Record a separate service probe for any real deployment."
        },
        {
          "name": "Fault",
          "evidence": [
            "Candidate timeout_ms=0 rejected",
            "Simulated accidental write differs from saved bytes"
          ],
          "interpretation": "The validation rule caught a bad candidate, but the exercise demonstrates a bypassed gate.",
          "next": "Restore only the owned file from the verified baseline."
        },
        {
          "name": "Recovery",
          "evidence": [
            "Bytes match baseline exactly",
            "Validator accepts; temporary directory removed"
          ],
          "interpretation": "File recovery is verified, not application behavior.",
          "next": "Document gate enforcement and the unexecuted service checks."
        }
      ]
    },
    "quick": [
      {
        "question": "Does mitigation prove root cause?",
        "answer": "No; it can reduce impact while causal uncertainty remains.",
        "explanation": "Restoration and explanation are separate tasks.",
        "testedConcept": "Causal confidence",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-003-QC1",
        "topicId": "ADD-INFRA-003"
      },
      {
        "question": "What does a matching digest establish?",
        "answer": "Byte equality relative to the trusted recorded reference.",
        "explanation": "It does not prove the truth or completeness of the original observation.",
        "testedConcept": "Evidence integrity",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-003-QC2",
        "topicId": "ADD-INFRA-003"
      },
      {
        "question": "Why assign one change owner?",
        "answer": "To coordinate scope, stop conditions and reversal without competing actions.",
        "explanation": "Concurrent uncontrolled changes make recovery and diagnosis harder.",
        "testedConcept": "Operational ownership",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-003-QC3",
        "topicId": "ADD-INFRA-003"
      }
    ],
    "exams": [
      {
        "question": "The parser accepts a configuration. What must still be tested?",
        "answer": "Its intended service behavior, security policy and recovery conditions.",
        "explanation": "Syntax is not semantic or end-to-end correctness.",
        "testedConcept": "Validation layers",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-003-EX1",
        "topicId": "ADD-INFRA-003"
      },
      {
        "question": "Which candidate does the local validator reject?",
        "answer": "timeout_ms zero; the supported range is 1 through 5000 with the inventory upstream.",
        "explanation": "The rejection occurs before an actual service is involved.",
        "testedConcept": "Bounded validation",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-003-EX2",
        "topicId": "ADD-INFRA-003"
      },
      {
        "question": "Why preserve exact baseline bytes?",
        "answer": "To reproduce the prior owned-file state and compare restoration without ambiguous manual edits.",
        "explanation": "A remembered approximation can omit significant settings.",
        "testedConcept": "Reversal fidelity",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-003-EX3",
        "topicId": "ADD-INFRA-003"
      },
      {
        "question": "Two operators deploy different fixes. What should the coordinator do?",
        "answer": "Establish one current plan and owner, record both actions and stop conflicting changes.",
        "explanation": "A clear sequence limits blast radius and restores useful evidence.",
        "testedConcept": "Incident coordination",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-003-EX4",
        "topicId": "ADD-INFRA-003"
      },
      {
        "question": "A repaired process responds but receipts are missing. Can the incident close?",
        "answer": "Not until acknowledged data and the original operation are reconciled against acceptance criteria.",
        "explanation": "Liveness does not prove data correctness.",
        "testedConcept": "Recovery gate",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-003-EX5",
        "topicId": "ADD-INFRA-003"
      },
      {
        "question": "How should uncertain log ordering be represented?",
        "answer": "State clock/collection uncertainty and avoid claiming an exact sequence unsupported by observations.",
        "explanation": "Timestamps can reflect different clocks or ingestion times.",
        "testedConcept": "Timeline quality",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-003-EX6",
        "topicId": "ADD-INFRA-003"
      },
      {
        "question": "What makes a rollback unsafe after a schema migration?",
        "answer": "The previous application may not understand the new schema or changed data.",
        "explanation": "Compatibility and irreversible side effects must be tested separately.",
        "testedConcept": "Rollback compatibility",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-003-EX7",
        "topicId": "ADD-INFRA-003"
      },
      {
        "question": "What should an incident update contain?",
        "answer": "Known impact, current mitigation or investigation, uncertainty and the next update point.",
        "explanation": "Useful communication avoids invented causes or recovery estimates.",
        "testedConcept": "Communication",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-003-EX8",
        "topicId": "ADD-INFRA-003"
      },
      {
        "question": "Why is a command history without results insufficient evidence?",
        "answer": "It records intended actions but not their success, target or resulting state.",
        "explanation": "Capture exit status and scoped observations with provenance.",
        "testedConcept": "Evidence completeness",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-003-EX9",
        "topicId": "ADD-INFRA-003"
      },
      {
        "question": "What follow-up prevents this lab’s bypassed gate?",
        "answer": "Require validated candidates to be the exact bytes promoted, with controlled write ownership and a regression test.",
        "explanation": "Validation of one object is useless if a different object can be deployed afterward.",
        "testedConcept": "Change integrity",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-INFRA-003-EX10",
        "topicId": "ADD-INFRA-003"
      }
    ],
    "batch": "29",
    "title": "Change control, incidents and evidence",
    "level": "Operational foundations / applied practice"
  }
];
