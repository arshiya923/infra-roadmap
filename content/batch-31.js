window.INFRA_BATCHES = window.INFRA_BATCHES || {};
window.INFRA_BATCHES["31"] = [
  {
    "id": "ADD-APP-001",
    "subtitle": "Trace requests across connection and application boundaries.",
    "minutes": 45,
    "definition": "HTTP describes request and response semantics between clients, intermediaries and origin services. A reverse proxy accepts requests for a service and forwards them to selected upstreams, creating separate downstream and upstream exchanges with their own failures and timing.",
    "purpose": "Diagnose a failed page or API call by separating naming, transport, TLS, HTTP routing and application correctness. Record what the client requested and which upstream actually handled it. A proxy success code, a backend health check and a committed transaction each answer a different question.",
    "mental": "A reverse proxy resembles a reception desk that chooses the correct internal team and relays a reply. It can answer from a cache or reject a request before forwarding. The analogy does not model streaming, multiplexing, connection reuse or retry semantics; inspect the actual HTTP version and configuration before reasoning about those paths.",
    "components": [
      "Client request: method, target, headers and optional content with an application-defined operation.",
      "Origin service: authoritative handler for the selected resource and its state changes.",
      "Reverse proxy: routing, header normalization, timeouts, buffering and possibly TLS termination.",
      "Connection boundaries: client-to-proxy and proxy-to-upstream, which may use different versions and trust settings.",
      "Correlation: request ID and bounded logs that connect client outcome to upstream status and timing without exposing secrets."
    ],
    "mechanism": [
      "Start with a fully specified request, including scheme, authority, method and target. A fresh HTTPS client may need DNS, connection establishment and certificate verification before sending HTTP. A reused connection skips some setup, so compare like with like.",
      "At the proxy, determine the virtual host and route before the upstream request is constructed. Path rewriting can alter which resource the origin sees; trailing-slash or prefix behavior must be tested against the exact configuration.",
      "Treat forwarded identity metadata as untrusted unless it came from a known proxy chain. A public client must not choose its own trusted source address or authentication identity through a header.",
      "Observe the response at each hop. A 503 emitted by the backend may be forwarded unchanged; a gateway-generated error reflects another boundary. Status class narrows the problem but does not prove a particular root cause.",
      "Validate the original application operation after recovery. If a timeout happened after a state-changing request reached the origin, its outcome may be unknown. Retry only under a defined idempotency or reconciliation scheme, not merely because the client did not see success."
    ],
    "flow": [
      [
        "Establish",
        "Resolve and verify the intended peer before HTTP where applicable."
      ],
      [
        "Route",
        "Proxy selects the upstream and constructs the forwarded request."
      ],
      [
        "Observe",
        "Record downstream and upstream status, body and timing separately."
      ],
      [
        "Reconcile",
        "Verify the intended operation and safe retry/recovery semantics."
      ]
    ],
    "comparison": [
      [
        "Forward proxy",
        "Acts on behalf of clients reaching destinations",
        "Its trust and routing role differs from a service frontend"
      ],
      [
        "Reverse proxy",
        "Acts in front of origin services",
        "May terminate TLS, route, cache or reject"
      ],
      [
        "HTTP success",
        "A response status under protocol semantics",
        "Application data still needs correctness validation"
      ],
      [
        "Transport failure",
        "Exchange did not complete as observed",
        "A state-changing origin operation may still have happened"
      ]
    ],
    "example": "The companion runs an owned origin and a simple forwarding handler on two loopback ports. A GET returns receipt-17 with status 200. The origin is deliberately changed to return 503 maintenance; the proxy forwards that same response. Restoring the origin gives 200 and the original receipt. This proves a controlled response path, not Nginx behavior or a TCP refusal.",
    "commands": [
      {
        "filename": "Lab notebook",
        "platform": "Linux / Python 3.10+; TLS also needs OpenSSL",
        "code": "python3 labs/application-delivery.py --case http",
        "explanation": "Run the bounded local companion; listeners, when used, bind only loopback ephemeral ports and are closed afterward.",
        "expected": "Compare baseline, fault and recovery. TLS additionally requires OpenSSL and reports hostnameMismatchRejected. Pool output is supplied arithmetic."
      }
    ],
    "configuration": "For a disposable Nginx target, preserve the exact configuration revision, define the expected Host/path mapping and test syntax before a controlled reload. Probe both the proxy and owned origin with the intended Host and path. On failure restore the reviewed configuration, validate it and reload again. Do not change a shared default site to imitate this Python experiment.",
    "production": "Set explicit upstream connection and response budgets compatible with the end-to-end deadline. Decide whether requests or responses are buffered and account for body-size limits and streaming. Keep correlation IDs scoped and controlled; logs should distinguish upstream timing from total client time.",
    "troubleshooting": [
      [
        "Wrong content with status 200",
        "Inspect virtual-host selection, path rewriting and cache key before assuming the origin is correct."
      ],
      [
        "Client sees 503",
        "Determine which hop generated it and correlate origin state; the local case deliberately forwards an origin 503."
      ],
      [
        "Direct origin works but proxy fails",
        "Compare upstream address, route, trusted name, Host/path, timeouts and policy."
      ],
      [
        "Retry created duplicate orders",
        "Reconcile transaction identifiers and implement idempotency; a client timeout did not prove the first write failed."
      ]
    ],
    "security": "Reject untrusted identity headers at the public boundary and forward only the intended normalized metadata. Restrict upstream reachability so clients cannot bypass the proxy’s controls. Treat proxy logs as potentially sensitive; omit authorization tokens and request bodies unless a controlled investigation requires them.",
    "performance": "Separate DNS/TLS setup, queueing, upstream work, buffering and response transfer. Connection reuse can reduce setup cost but retain stale connections. A local loopback success cannot establish WAN latency or throughput.",
    "mistakes": [
      "Treating every 502/503/504 as the same root cause.",
      "Retrying state-changing requests without reconciliation.",
      "Trusting client-supplied forwarding headers.",
      "Testing the wrong Host or path."
    ],
    "ports": "The companion uses dynamically assigned loopback TCP ports. Conventional HTTP/HTTPS ports are 80/443, but actual proxy and origin listeners are configurable; HTTP/3 uses QUIC over UDP.",
    "prerequisites": [
      "ADD-INFRA-001",
      "ADD-LINUX-002"
    ],
    "related": [
      "s1-g2-t0",
      "ADD-APP-002"
    ],
    "artifacts": [
      {
        "title": "Owned loopback delivery and pool companion",
        "path": "labs/application-delivery.py"
      }
    ],
    "sources": [
      {
        "title": "RFC 9110: HTTP Semantics",
        "url": "https://www.rfc-editor.org/rfc/rfc9110.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Nginx: beginner guide and reload behavior",
        "url": "https://nginx.org/en/docs/beginners_guide.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Nginx: HTTP proxy module",
        "url": "https://nginx.org/en/docs/http/ngx_http_proxy_module.html",
        "checked": "2026-10-09"
      }
    ],
    "lab": {
      "objective": "Observe a real controlled HTTP response failure across an owned forwarding boundary.",
      "requirements": "Python 3.10+ with loopback sockets permitted. No Nginx installation, external request or administrative port binding is needed.",
      "topology": [
        "Client GET /receipt",
        "Loopback forwarding handler",
        "Loopback origin",
        "Response status and receipt"
      ],
      "steps": [
        "Predict whether a backend 503 will be transformed or forwarded by this companion.",
        "Run the HTTP case and record the three statuses and bodies.",
        "Draw the two separate TCP exchanges and label which handler generates the fault.",
        "Explain why this result does not establish DNS, TLS, timeout or Nginx behavior.",
        "Design an owned-target test for Host/path rewriting with exact expected upstream paths.",
        "Describe a state-changing request whose timeout requires transaction reconciliation before retry."
      ],
      "verification": "Responses are 200 receipt-17, 503 maintenance and 200 receipt-17. Both listener contexts exit and their threads stop. No external address is contacted.",
      "troubleshooting": "An unexpected exception, timeout or body is a failed run, not the intended 503 case. Preserve the result and check whether the loopback listeners could bind.",
      "challenge": "A proxy retries POST after an upstream read timeout. Explain how the original write can succeed even though the client sees an error.",
      "cleanup": "The context managers stop threads and close both servers even on errors. The companion writes no service configuration."
    },
    "glossary": {
      "Origin": "Service authoritative for a resource.",
      "Authority": "Host and optional port identifying the destination in a URI.",
      "Idempotent operation": "Repeated intended effect is equivalent to a single execution under its defined semantics.",
      "Upstream": "Server contacted by an intermediary for a downstream request."
    },
    "rehearsal": {
      "scope": "Authored summary of the actual loopback HTTP case; not Nginx terminal output.",
      "states": [
        {
          "name": "Baseline",
          "evidence": [
            "GET /receipt → proxy → origin",
            "200; receipt-17"
          ],
          "interpretation": "Both local exchanges complete with the expected content.",
          "next": "Keep status and body as separate observations."
        },
        {
          "name": "Fault",
          "evidence": [
            "Origin configured to return 503 maintenance",
            "Proxy forwards 503 maintenance"
          ],
          "interpretation": "This is an origin response failure, not a TCP refusal or inferred gateway cause.",
          "next": "Correlate the origin decision with the same request."
        },
        {
          "name": "Recovery",
          "evidence": [
            "Origin restored",
            "200; receipt-17; listener threads closed"
          ],
          "interpretation": "The original controlled request succeeds again.",
          "next": "Use actual target tests for path rewriting and retry behavior."
        }
      ]
    },
    "quick": [
      {
        "question": "Does the proxy necessarily use the same connection as the client?",
        "answer": "No; downstream and upstream exchanges are separate.",
        "explanation": "They can have distinct protocols, trust and timeouts.",
        "testedConcept": "Hop boundaries",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-001-QC1",
        "topicId": "ADD-APP-001"
      },
      {
        "question": "What generated this lab’s 503?",
        "answer": "The owned origin.",
        "explanation": "The forwarding handler preserves it.",
        "testedConcept": "Fault provenance",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-001-QC2",
        "topicId": "ADD-APP-001"
      },
      {
        "question": "Is an unseen response proof that a write failed?",
        "answer": "No.",
        "explanation": "The origin may have committed before the response was lost.",
        "testedConcept": "Ambiguous outcomes",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-001-QC3",
        "topicId": "ADD-APP-001"
      }
    ],
    "exams": [
      {
        "question": "A proxy serves the wrong app under status 200. What should you inspect first?",
        "answer": "Authority/Host selection, route and path rewriting, plus any cache key.",
        "explanation": "Status success cannot establish that the intended resource was served.",
        "testedConcept": "Routing correctness",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-001-EX1",
        "topicId": "ADD-APP-001"
      },
      {
        "question": "Why distinguish total time from upstream time?",
        "answer": "Client setup, queueing, buffering and transfer can occur outside origin processing.",
        "explanation": "One timing field cannot explain every part of latency.",
        "testedConcept": "Timing boundaries",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-001-EX2",
        "topicId": "ADD-APP-001"
      },
      {
        "question": "What is dangerous about trusting arbitrary X-Forwarded-For?",
        "answer": "A client can supply a forged identity/address value.",
        "explanation": "Only an explicitly trusted and normalized proxy chain should influence security decisions.",
        "testedConcept": "Header trust",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-001-EX3",
        "topicId": "ADD-APP-001"
      },
      {
        "question": "Which observations prove the local recovery?",
        "answer": "The same GET returns 200 and receipt-17 after the controlled origin state is restored.",
        "explanation": "A handler object existing is weaker evidence.",
        "testedConcept": "Recovery check",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-001-EX4",
        "topicId": "ADD-APP-001"
      },
      {
        "question": "Why is this not a Nginx acceptance test?",
        "answer": "It uses Python handlers with a very small forwarding behavior.",
        "explanation": "Implementation-specific rewrite, timeout and reload behavior is unexecuted.",
        "testedConcept": "Evidence scope",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-001-EX5",
        "topicId": "ADD-APP-001"
      },
      {
        "question": "A direct origin probe works. Does that prove the frontend?",
        "answer": "No; the proxy has its own routing, policy, trust and deadlines.",
        "explanation": "Test through the actual client path too.",
        "testedConcept": "End-to-end validation",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-001-EX6",
        "topicId": "ADD-APP-001"
      },
      {
        "question": "When can a retry be made safe for a payment request?",
        "answer": "With a defined idempotency key/deduplication contract or reconciliation of the original operation.",
        "explanation": "Transport errors do not guarantee no application side effect.",
        "testedConcept": "Retry safety",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-001-EX7",
        "topicId": "ADD-APP-001"
      },
      {
        "question": "What should an upstream route test specify?",
        "answer": "Exact method, authority, path, expected origin and response.",
        "explanation": "An unspecified curl against localhost may select a different virtual host.",
        "testedConcept": "Test identity",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-001-EX8",
        "topicId": "ADD-APP-001"
      },
      {
        "question": "Does loopback timing predict internet latency?",
        "answer": "No.",
        "explanation": "External network, TLS, load and client behavior are outside this experiment.",
        "testedConcept": "Performance scope",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-001-EX9",
        "topicId": "ADD-APP-001"
      },
      {
        "question": "How should a proxy change be reversed?",
        "answer": "Restore the recorded configuration, validate it, reload under the owned-target procedure and repeat the original request.",
        "explanation": "A file restore without behavior verification is incomplete.",
        "testedConcept": "Configuration rollback",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-001-EX10",
        "topicId": "ADD-APP-001"
      }
    ],
    "batch": "31",
    "title": "HTTP request lifecycle and reverse proxies",
    "level": "Operational foundations / applied practice"
  },
  {
    "id": "ADD-APP-002",
    "subtitle": "Verify the peer name, trust path and deployed certificate separately.",
    "minutes": 50,
    "definition": "TLS protects an exchange using negotiated cryptography and authenticated peer identity under a trust policy. For ordinary HTTPS server authentication, the client must validate the certificate path, expected hostname and validity period. Certificate issuance, renewal and deployment are separate operational steps.",
    "purpose": "Investigate certificate failures without disabling verification. Distinguish an untrusted issuer, wrong hostname, invalid time window, incomplete chain and a listener still serving an older certificate. Plan renewal so a newly issued certificate is validated and actually loaded before the current one becomes unusable.",
    "mental": "A certificate is a signed identity claim, not a universal approval stamp. The client decides which issuers it trusts and which name it expected. A valid signature for the wrong name is still the wrong peer. A secure connection also does not make the application’s data or authorization correct.",
    "components": [
      "Expected DNS name: the identity the client intends to contact, checked against certificate subject alternative names.",
      "Trust anchors and intermediates: the client’s accepted certification path, which can differ between clients.",
      "Private key: secret material paired with the certificate and protected from disclosure.",
      "Validity and clock: certificate time constraints interpreted using the validating client’s time.",
      "Renewal/deployment path: challenge access, issuance, file permissions, validation, listener reload and external observation."
    ],
    "mechanism": [
      "Select the intended service name and trust policy. SNI helps a server choose a certificate, while hostname verification checks that the certificate matches the client’s expected name; these are related but distinct actions.",
      "Build and verify the certificate path, name and validity. A connection with verification disabled demonstrates encrypted connectivity at most, not authenticated identity. Preserve the actual verification error instead of using an insecure bypass as a permanent repair.",
      "Treat renewal as an automated change with monitored prerequisites. Challenge method, DNS or HTTP reachability, issuer account, credentials and rate policies affect issuance; a certificate file arriving does not prove deployment.",
      "On a disposable Nginx target, validate the configuration and key/certificate pairing, preserve the current revision and reload through the target’s controlled procedure. Observe the certificate served on a fresh connection with the intended SNI/name.",
      "Verify application behavior after the handshake and monitor remaining certificate lifetime and renewal success. Restore the prior known configuration on a failed rollout only if it remains valid; an expired prior certificate is not a workable recovery plan."
    ],
    "flow": [
      [
        "Expect identity",
        "Choose the hostname and accepted trust source."
      ],
      [
        "Verify",
        "Validate path, name and time during a fresh handshake."
      ],
      [
        "Deploy renewal",
        "Validate new material and load it under a controlled change."
      ],
      [
        "Observe served state",
        "Connect anew, inspect the served identity and test the application."
      ]
    ],
    "comparison": [
      [
        "SNI",
        "Name sent to help select a virtual TLS service",
        "Does not replace hostname validation"
      ],
      [
        "Trust path",
        "Issuer chain accepted by the client",
        "A trusted wrong-name certificate must still fail"
      ],
      [
        "Issuance",
        "Certificate authority produces a certificate",
        "The running listener may still serve the old one"
      ],
      [
        "TLS success",
        "Peer authentication and protected channel under policy",
        "Application authorization/correctness remain separate"
      ]
    ],
    "example": "The local TLS case generates a one-day self-signed certificate for localhost and trusts it only in the test client context. A fresh localhost request succeeds. Using wrong.invalid as the expected peer name fails certificate verification; localhost succeeds again. The program never modifies the system trust store and does not simulate certificate renewal or expiry.",
    "commands": [
      {
        "filename": "Lab notebook",
        "platform": "Linux / Python 3.10+; TLS also needs OpenSSL",
        "code": "python3 labs/application-delivery.py --case tls",
        "explanation": "Run the bounded local companion; listeners, when used, bind only loopback ephemeral ports and are closed afterward.",
        "expected": "Compare baseline, fault and recovery. TLS additionally requires OpenSSL and reports hostnameMismatchRejected. Pool output is supplied arithmetic."
      },
      {
        "filename": "Lab notebook",
        "platform": "Owned Nginx target / guided, not executed in this batch",
        "code": "nginx -t",
        "explanation": "On an already installed, owned Nginx target, validate the selected configuration and referenced files without reloading. This optional command is guided here.",
        "expected": "Require a successful diagnostic for the intended config. Permissions or absent binaries are meaningful failures; syntax success still needs a client probe."
      }
    ],
    "configuration": "Before renewal deployment, preserve the exact certificate/config revision and protected key permissions; do not copy secret keys into the evidence report. Validate the candidate, deploy through the owned service workflow and verify from a fresh client connection. Record the actually served serial/fingerprint and name. Roll back only to a compatible, unexpired known state; keep issuer and DNS credential recovery separately planned.",
    "production": "Alert on failed renewal attempts and the certificate clients actually receive, including every termination point. A load balancer and origin may terminate separate TLS connections. Public certificate issuance is not needed for the loopback exercise; use an isolated trust context for its disposable certificate.",
    "troubleshooting": [
      [
        "Works with verification disabled",
        "Treat that as evidence to inspect trust/name/time, not as proof the authenticated path is repaired."
      ],
      [
        "Certificate file is new but clients see old serial",
        "Inspect the actual listener, reload outcome, load-balanced endpoints and fresh connection behavior."
      ],
      [
        "Only some clients reject",
        "Compare trust stores, intermediate chain delivery, clock and supported TLS behavior."
      ],
      [
        "Renewal challenge fails",
        "Check the selected method’s DNS/HTTP path and scoped credentials; do not repeatedly retry blindly."
      ]
    ],
    "security": "Protect private keys and issuer/DNS credentials, restrict file access and avoid logging them. Keep hostname and certificate verification enabled. The temporary key is deleted with its owned directory and is never a reusable trust anchor for a real service.",
    "performance": "Measure full handshakes and resumed connections separately. Certificate validation, connection reuse and upstream TLS affect different portions of request latency. Do not infer production cipher capacity from one local RSA certificate generation or loopback request.",
    "mistakes": [
      "Using insecure verification bypass as the fix.",
      "Equating certificate issuance with deployment.",
      "Confusing SNI with hostname validation.",
      "Trusting a new certificate globally for a temporary exercise."
    ],
    "ports": "The local TLS server uses an ephemeral loopback TCP port. HTTPS commonly uses TCP 443. ACME challenge reachability depends on the chosen method; HTTP-01 uses port 80 and DNS-01 uses DNS TXT records.",
    "prerequisites": [
      "ADD-APP-001"
    ],
    "related": [
      "s1-g2-t1",
      "s4-g0-t0"
    ],
    "artifacts": [
      {
        "title": "Owned loopback delivery and pool companion",
        "path": "labs/application-delivery.py"
      }
    ],
    "sources": [
      {
        "title": "Nginx: HTTP SSL module",
        "url": "https://nginx.org/en/docs/http/ngx_http_ssl_module.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Let’s Encrypt: challenge types",
        "url": "https://letsencrypt.org/docs/challenge-types/",
        "checked": "2026-10-09"
      },
      {
        "title": "Nginx: beginner guide and reload behavior",
        "url": "https://nginx.org/en/docs/beginners_guide.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Python SSL library",
        "url": "https://docs.python.org/3/library/ssl.html",
        "checked": "2026-10-09"
      }
    ],
    "lab": {
      "objective": "Observe actual expected-name rejection with verification enabled and restore the intended identity.",
      "requirements": "Python 3.10+, OpenSSL on PATH and loopback sockets; no public DNS, certificate authority account or system trust change.",
      "topology": [
        "Ephemeral localhost certificate",
        "Loopback TLS server",
        "Client-only explicit trust",
        "Expected hostname validation"
      ],
      "steps": [
        "Predict why trusting the certificate does not make wrong.invalid acceptable.",
        "Run the TLS case; record the successful baseline and the actual verification reason.",
        "Require hostnameMismatchRejected=true and a successful localhost recovery response.",
        "Confirm cleanupVerified and listenersClosed; the key/certificate must not be retained for deployment.",
        "Write a guided renewal checklist that distinguishes issuance, file validation, reload and served-certificate verification.",
        "Specify a stop condition if a candidate name, key or validity window does not match the intended service."
      ],
      "verification": "Baseline/recovery return trusted-local-receipt over TLS; the wrong name is rejected specifically for hostname mismatch. Temporary key material and listeners are removed.",
      "troubleshooting": "An unavailable OpenSSL binary, failed generation, expired certificate or generic handshake failure is not evidence of the intended hostname fault. Preserve the actual reason and rerun only after resolving it.",
      "challenge": "One of three TLS frontends keeps serving the old certificate after renewal. Design a check that reaches and verifies each endpoint with the same expected name.",
      "cleanup": "The program closes the listener and removes its generated key and certificate directory. Trust was confined to one SSLContext and never installed globally."
    },
    "glossary": {
      "SAN": "Subject Alternative Name: identities bound by the certificate.",
      "SNI": "TLS extension used to indicate the intended server name.",
      "Trust anchor": "Locally accepted root of a certificate validation path.",
      "ACME": "Protocol used for automated certificate issuance and related account operations."
    },
    "rehearsal": {
      "scope": "Authored summary of fresh local TLS observations with an ephemeral client-only trust context.",
      "states": [
        {
          "name": "Baseline",
          "evidence": [
            "Expected name localhost",
            "Explicit test certificate trusted; HTTPS body received"
          ],
          "interpretation": "The chosen identity and trust policy pass this local handshake.",
          "next": "Record the actually served certificate for real deployments."
        },
        {
          "name": "Fault",
          "evidence": [
            "Expected name changed to wrong.invalid",
            "Hostname verification rejects the peer"
          ],
          "interpretation": "Trusting an issuer or certificate does not permit arbitrary names.",
          "next": "Restore the intended name; keep verification enabled."
        },
        {
          "name": "Recovery",
          "evidence": [
            "Expected name localhost restored",
            "Fresh HTTPS request succeeds; temporary key deleted"
          ],
          "interpretation": "Identity verification and local cleanup are restored.",
          "next": "Renewal, expiry and Nginx reload remain separate target checks."
        }
      ]
    },
    "quick": [
      {
        "question": "Does SNI prove hostname validation happened?",
        "answer": "No.",
        "explanation": "Selection and client verification are distinct.",
        "testedConcept": "TLS identity",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-002-QC1",
        "topicId": "ADD-APP-002"
      },
      {
        "question": "Where is the test certificate trusted?",
        "answer": "Only in the companion client SSLContext.",
        "explanation": "No global trust store is changed.",
        "testedConcept": "Trust scope",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-002-QC2",
        "topicId": "ADD-APP-002"
      },
      {
        "question": "Does a newly issued certificate prove a listener serves it?",
        "answer": "No.",
        "explanation": "Deployment and a fresh client observation are required.",
        "testedConcept": "Deployment evidence",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-002-QC3",
        "topicId": "ADD-APP-002"
      }
    ],
    "exams": [
      {
        "question": "Why does wrong.invalid fail even though the certificate is trusted?",
        "answer": "It does not match the certificate’s localhost identity.",
        "explanation": "Trust and expected-name verification are separate requirements.",
        "testedConcept": "Name verification",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-002-EX1",
        "topicId": "ADD-APP-002"
      },
      {
        "question": "What is lost when verification is disabled?",
        "answer": "Evidence that the peer is authenticated under the intended name and trust policy.",
        "explanation": "Encryption alone does not establish the correct remote identity.",
        "testedConcept": "Authenticated transport",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-002-EX2",
        "topicId": "ADD-APP-002"
      },
      {
        "question": "A renewed file exists but clients report expiration. What should be inspected?",
        "answer": "The certificate actually served by each termination point, reload outcome and client time.",
        "explanation": "Disk state can differ from running listener state.",
        "testedConcept": "Served state",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-002-EX3",
        "topicId": "ADD-APP-002"
      },
      {
        "question": "What must a renewal monitor observe besides remaining lifetime?",
        "answer": "Renewal attempts, challenge dependencies, deployment success and the served certificate.",
        "explanation": "A scheduler running does not imply successful issuance or deployment.",
        "testedConcept": "Renewal operations",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-002-EX4",
        "topicId": "ADD-APP-002"
      },
      {
        "question": "Why keep the private key out of incident reports?",
        "answer": "Disclosure can let others impersonate the service while the key is usable.",
        "explanation": "Record nonsecret certificate metadata instead.",
        "testedConcept": "Key handling",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-002-EX5",
        "topicId": "ADD-APP-002"
      },
      {
        "question": "What does nginx -t not establish?",
        "answer": "Successful reload, correct externally served certificate or application behavior.",
        "explanation": "Static configuration validation is only one gate.",
        "testedConcept": "Validation scope",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-002-EX6",
        "topicId": "ADD-APP-002"
      },
      {
        "question": "Why can client clocks affect certificate validation?",
        "answer": "Validity is checked against the client’s view of time.",
        "explanation": "Investigate clock error without weakening trust rules.",
        "testedConcept": "Time dependency",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-002-EX7",
        "topicId": "ADD-APP-002"
      },
      {
        "question": "Is rolling back to an expired certificate a recovery?",
        "answer": "No; it cannot meet normal validity checks.",
        "explanation": "A rollback candidate must itself remain operationally valid.",
        "testedConcept": "Rollback viability",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-002-EX8",
        "topicId": "ADD-APP-002"
      },
      {
        "question": "What TLS faults does the companion not execute?",
        "answer": "Expiry, ACME challenge/renewal, revoked certificates and Nginx deployment.",
        "explanation": "Its actual fault is a wrong expected hostname.",
        "testedConcept": "Evidence boundary",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-002-EX9",
        "topicId": "ADD-APP-002"
      },
      {
        "question": "After TLS succeeds, what still validates the service?",
        "answer": "The intended authorized application transaction and correct response/data.",
        "explanation": "A secure channel can carry an application error.",
        "testedConcept": "Layered verification",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-002-EX10",
        "topicId": "ADD-APP-002"
      }
    ],
    "batch": "31",
    "title": "TLS trust, certificate renewal and Nginx changes",
    "level": "Operational foundations / applied practice"
  },
  {
    "id": "ADD-APP-003",
    "subtitle": "Balance useful work without overwhelming shared dependencies.",
    "minutes": 45,
    "definition": "A load balancer chooses a backend for work under a routing policy. Health checks influence eligibility, while connection pools reuse a bounded set of connections. These controls interact with capacity, timeouts, retries and shared dependencies, so more replicas or larger pools do not automatically improve service.",
    "purpose": "Design health and capacity gates that preserve correct requests during backend failure or overload. Calculate the total possible connection demand across workers and compare it with the database budget. Distinguish a steady-state concurrency estimate from a measured queue or latency guarantee.",
    "mental": "Backends are service counters and a connection pool is a limited set of tickets to a downstream counter. Adding tickets cannot create more downstream capacity; it may lengthen contention. Real requests vary in duration and cost, so a mean estimate must be paired with headroom and measured tails.",
    "components": [
      "Balancing policy: round-robin, weighted or load-sensitive selection within the eligible set.",
      "Health/readiness signal: whether a backend should receive new work, with thresholds and scope.",
      "Connection pool: per-process or per-worker reuse and upper bound, plus checkout timeout.",
      "Drain procedure: stop new assignment while permitting bounded in-flight work to complete.",
      "Shared service budget: database connections, transaction capacity, queue lengths and deadline propagation."
    ],
    "mechanism": [
      "Define what a health check proves and how failures change eligibility. A shallow process check may miss database failure; a deep check can amplify dependency incidents if every replica is simultaneously removed. Separate liveness from traffic readiness.",
      "Select a policy suited to workload variance and state. Equal request counts need not mean equal work. Sticky routing can aid state affinity but creates hot spots and does not make state durable.",
      "Compute connection ceilings across all clients sharing the database. Four workers each permitting ten connections can offer forty before other services, maintenance and failover headroom. A per-worker setting is not a service-wide cap.",
      "Use the steady-state relationship mean in-flight = arrival rate × mean holding time only with aligned units and a stable boundary. At 100 operations/second held 0.2 seconds, the mean is 20. If mean holding grows to 0.8 seconds, it becomes 80; this is not a p99 or a complete queueing model.",
      "Recover by removing the bottleneck or controlling offered load, not by blindly multiplying pools and retries. Drain backends with a deadline, preserve transaction semantics and test both survivors’ capacity and original client behavior."
    ],
    "flow": [
      [
        "Qualify",
        "Choose meaningful readiness and backend eligibility."
      ],
      [
        "Budget",
        "Sum connection limits across all workers and consumers."
      ],
      [
        "Bound",
        "Align queue, checkout, upstream and client deadlines."
      ],
      [
        "Recover",
        "Drain or restore a backend and verify original requests under declared load."
      ]
    ],
    "comparison": [
      [
        "Liveness",
        "Process should continue or be restarted",
        "Does not decide whether it can serve traffic now"
      ],
      [
        "Readiness",
        "Eligible for new service requests",
        "Can remove a backend without killing it"
      ],
      [
        "Pool ceiling",
        "Maximum configured connections",
        "Not measured active work or throughput"
      ],
      [
        "Mean concurrency",
        "Rate multiplied by mean holding time in steady state",
        "Does not capture bursts, variance or tail latency"
      ]
    ],
    "example": "The supplied baseline has four workers, ten connections each and a database budget of fifty: forty configured connections fit, leaving ten for the declared budget’s other needs. The fault doubles each pool to twenty: eighty exceeds fifty. Independently, 100 operations/s held for 0.8 s implies mean in-flight 80. Restoring the baseline arithmetic does not execute database recovery.",
    "commands": [
      {
        "filename": "Lab notebook",
        "platform": "Linux / Python 3.10+; TLS also needs OpenSSL",
        "code": "python3 labs/application-delivery.py --case pools",
        "explanation": "Run the bounded local companion; listeners, when used, bind only loopback ephemeral ports and are closed afterward.",
        "expected": "Compare baseline, fault and recovery. TLS additionally requires OpenSSL and reports hostnameMismatchRejected. Pool output is supplied arithmetic."
      }
    ],
    "configuration": "Record per-worker pool size, maximum worker count, other clients and database reserve before changing limits. Validate a bounded candidate on a disposable load test and watch checkout waits, service latency and database saturation. Revert exact limits if the agreed stop conditions trigger. Never change a shared production database limit solely to match this worksheet.",
    "production": "Use health checks with failure/recovery thresholds and avoid flapping. Keep retry budgets finite and preserve idempotency for state-changing work. During deployment, drain and verify survivor capacity before terminating a backend. Check edition/version support before assuming a particular Nginx active-health-check feature exists.",
    "troubleshooting": [
      [
        "More app replicas cause database errors",
        "Sum pools across the new worker count and inspect actual sessions/reserve."
      ],
      [
        "All backends become unready together",
        "Check shared dependencies and whether the health probe is magnifying a common failure."
      ],
      [
        "CPU low but clients queue",
        "Inspect connection checkout, downstream waits, concurrency limits and blocked work."
      ],
      [
        "Traffic is evenly distributed but one host is slow",
        "Compare request cost, state affinity, backend capacity and per-host latency rather than only counts."
      ]
    ],
    "security": "Health endpoints should reveal only necessary status and be protected from excessive probing. Pool credentials need minimum privileges and rotation planning. Do not make a backend publicly reachable merely to simplify a health check.",
    "performance": "Connection reuse reduces setup work but can hold scarce slots and stale state. Track active/idle pool counts, checkout timeouts, request deadlines and downstream saturation. Mean concurrency arithmetic is useful for a first envelope; measured burst and tail behavior determine operational limits.",
    "mistakes": [
      "Treating per-worker limits as global.",
      "Increasing pools to fix every timeout.",
      "Equating health with transaction correctness.",
      "Calling mean concurrency a maximum or percentile.",
      "Retrying without a finite budget."
    ],
    "ports": "Balancers and pools use the configured application/database listeners; no single port defines these concepts. The pool companion performs arithmetic only and opens no sockets.",
    "prerequisites": [
      "ADD-APP-001",
      "ADD-INFRA-002"
    ],
    "related": [
      "ADD-APP-002",
      "s9-g6-t8"
    ],
    "artifacts": [
      {
        "title": "Owned loopback delivery and pool companion",
        "path": "labs/application-delivery.py"
      }
    ],
    "sources": [
      {
        "title": "Nginx: HTTP load balancing",
        "url": "https://nginx.org/en/docs/http/load_balancing.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Nginx: HTTP proxy module",
        "url": "https://nginx.org/en/docs/http/ngx_http_proxy_module.html",
        "checked": "2026-10-09"
      }
    ],
    "lab": {
      "objective": "Calculate a connection envelope and diagnose a supplied overload without claiming live performance.",
      "requirements": "Python 3.10+ and a notebook; the pools case has no network or database dependency.",
      "topology": [
        "Four application workers",
        "Per-worker pools",
        "Shared database limit 50",
        "Client workload"
      ],
      "steps": [
        "Calculate configured baseline connections and headroom before running the companion.",
        "Compute mean in-flight at 100/s and 0.2 s, then 0.8 s.",
        "Run the pools case and compare baseline/fault/recovery envelopes.",
        "Add another service with twelve connections and explain why a forty-connection app no longer fits within a fifty-connection shared cap without adjustment.",
        "Draft a backend drain plan with new-work exclusion, in-flight deadline and original client validation.",
        "State what an actual load test must measure before accepting this design."
      ],
      "verification": "Configured totals are 40, 80 and 40; withinDatabaseLimit is true/false/true. Mean in-flight values are 20, 80 and 20. All are supplied calculations, not measurements.",
      "troubleshooting": "Check units and worker counts. If traffic is unstable or mean holding time comes from a different boundary, do not treat the simple relation as a forecast.",
      "challenge": "A 20-connection pool has an average occupancy of 10 but frequent checkout timeouts. Explain which burst, long-tail and leak observations could resolve the discrepancy.",
      "cleanup": "The pools case has no listeners, files or database sessions. Reset any separate owned-target configuration only through its recorded rollback plan."
    },
    "glossary": {
      "Pool checkout": "Acquiring an available reusable connection for work.",
      "Drain": "Stop new assignments while allowing bounded existing work to finish.",
      "Headroom": "Capacity reserved beyond expected current demand.",
      "Backpressure": "Limiting accepted work when downstream capacity is constrained."
    },
    "rehearsal": {
      "scope": "Supplied arithmetic only; no real balancer, database, queue or traffic benchmark.",
      "states": [
        {
          "name": "Baseline",
          "evidence": [
            "4 workers × 10 connections = 40",
            "Database budget 50; mean in-flight 100/s × 0.2s = 20"
          ],
          "interpretation": "The declared pool ceiling fits; tail behavior is unknown.",
          "next": "Measure actual checkout waits and reserve needs on a disposable target."
        },
        {
          "name": "Fault",
          "evidence": [
            "4 workers × 20 connections = 80",
            "Database budget 50; holding time 0.8s"
          ],
          "interpretation": "Configured connections exceed the budget; larger pools do not create capacity.",
          "next": "Inspect the downstream bottleneck and bound offered work."
        },
        {
          "name": "Recovery",
          "evidence": [
            "Pools restored to 10 per worker",
            "Supplied hold time restored to 0.2s"
          ],
          "interpretation": "The arithmetic envelope fits again; no performance recovery is measured.",
          "next": "Verify real client latency and saturation under representative load."
        }
      ]
    },
    "quick": [
      {
        "question": "What is four pools of ten?",
        "answer": "Forty possible configured connections.",
        "explanation": "The limit multiplies across workers.",
        "testedConcept": "Pool aggregation",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-003-QC1",
        "topicId": "ADD-APP-003"
      },
      {
        "question": "Does readiness failure require restarting the process?",
        "answer": "Not necessarily.",
        "explanation": "Traffic eligibility and liveness are separate decisions.",
        "testedConcept": "Health semantics",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-003-QC2",
        "topicId": "ADD-APP-003"
      },
      {
        "question": "What is 100/s times 0.2 seconds?",
        "answer": "Twenty mean in-flight operations under steady-state assumptions.",
        "explanation": "Aligned units produce concurrency, not latency percentiles.",
        "testedConcept": "Concurrency arithmetic",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-003-QC3",
        "topicId": "ADD-APP-003"
      }
    ],
    "exams": [
      {
        "question": "Why can scaling application replicas overload a database?",
        "answer": "Each replica may add pools, retries and concurrent demand against the same shared capacity.",
        "explanation": "Horizontal scaling of one tier does not scale every dependency.",
        "testedConcept": "Shared capacity",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-003-EX1",
        "topicId": "ADD-APP-003"
      },
      {
        "question": "Four workers have pools of twenty against fifty database slots. What is the excess?",
        "answer": "Thirty configured connections before other consumers.",
        "explanation": "80 minus 50 equals 30.",
        "testedConcept": "Connection envelope",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-003-EX2",
        "topicId": "ADD-APP-003"
      },
      {
        "question": "Why is equal request count not equal backend load?",
        "answer": "Requests differ in duration, resource cost and state affinity.",
        "explanation": "Choose observations and policy that reflect actual work.",
        "testedConcept": "Balancing policy",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-003-EX3",
        "topicId": "ADD-APP-003"
      },
      {
        "question": "What should a drain procedure do first?",
        "answer": "Stop assigning new work to the selected backend.",
        "explanation": "Then wait or terminate existing work under a defined deadline and correctness policy.",
        "testedConcept": "Drain ordering",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-003-EX4",
        "topicId": "ADD-APP-003"
      },
      {
        "question": "Can a deep health check worsen a shared database incident?",
        "answer": "Yes; it can remove every backend or add probe load simultaneously.",
        "explanation": "Design readiness behavior for dependency failure and controlled degradation.",
        "testedConcept": "Probe coupling",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-003-EX5",
        "topicId": "ADD-APP-003"
      },
      {
        "question": "Mean holding rises from 0.2 to 0.8 seconds at 100/s. What happens to mean concurrency?",
        "answer": "It rises from 20 to 80 in the stated steady-state model.",
        "explanation": "A fourfold hold-time increase multiplies occupancy at fixed rate.",
        "testedConcept": "Occupancy",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-003-EX6",
        "topicId": "ADD-APP-003"
      },
      {
        "question": "Does an 80-operation mean prove a safe pool size of eighty?",
        "answer": "No; variance, bursts, reserves and throughput constraints are unmodeled.",
        "explanation": "Sizing needs measured tail and saturation evidence.",
        "testedConcept": "Model limits",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-003-EX7",
        "topicId": "ADD-APP-003"
      },
      {
        "question": "What evidence distinguishes checkout delay from slow query execution?",
        "answer": "Separate time spent waiting for a pool slot from time holding it during the downstream operation.",
        "explanation": "Total request latency mixes these boundaries.",
        "testedConcept": "Latency diagnosis",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-003-EX8",
        "topicId": "ADD-APP-003"
      },
      {
        "question": "Why avoid infinite retries?",
        "answer": "They amplify load and can duplicate state changes or exceed useful deadlines.",
        "explanation": "Use finite budgets, backoff and idempotency rules.",
        "testedConcept": "Retry amplification",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-003-EX9",
        "topicId": "ADD-APP-003"
      },
      {
        "question": "What proves real recovery after a pool change?",
        "answer": "Representative original requests meet correctness/latency goals while shared capacity remains stable.",
        "explanation": "A smaller configured number alone is only restored intent.",
        "testedConcept": "Operational acceptance",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-APP-003-EX10",
        "topicId": "ADD-APP-003"
      }
    ],
    "batch": "31",
    "title": "Load balancing, health checks and connection pools",
    "level": "Operational foundations / applied practice"
  }
];
