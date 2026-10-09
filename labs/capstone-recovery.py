"""Owned SQLite recovery rehearsal. No network, privileges or external targets."""
import argparse
from contextlib import contextmanager
import hashlib
import json
from pathlib import Path
import sqlite3
import tempfile
import time


@contextmanager
def connection(path):
    db = sqlite3.connect(path)
    try:
        with db:
            yield db
    finally:
        db.close()


def digest(rows):
    return hashlib.sha256(json.dumps(rows, separators=(",", ":")).encode()).hexdigest()


def read_rows(path):
    with connection(path) as db:
        return db.execute("SELECT id, item, quantity FROM orders ORDER BY id").fetchall()


def run(interrupt=None):
    evidence = {"scope": "Actual owned local SQLite backup, logical corruption, restore and cleanup; no enterprise failover or RTO/RPO measurement", "events": []}
    owned = None
    try:
        with tempfile.TemporaryDirectory(prefix="infra-capstone-") as directory:
            owned = Path(directory)
            evidence["ownedDirectory"] = str(owned)
            live, backup = owned / "orders.db", owned / "backup.db"
            def checkpoint(name):
                evidence["events"].append(name)
                if interrupt == name:
                    raise RuntimeError("Injected interruption: " + name)
            with connection(live) as db:
                db.execute("CREATE TABLE orders(id INTEGER PRIMARY KEY, item TEXT NOT NULL, quantity INTEGER CHECK(quantity > 0))")
                db.executemany("INSERT INTO orders VALUES(?, ?, ?)", [(1, "switch", 2), (2, "optic", 8)])
            expected = read_rows(live)
            evidence["baselineRows"] = expected
            evidence["baselineDigest"] = digest(expected)
            checkpoint("baseline")
            with connection(live) as source, connection(backup) as target:
                source.backup(target)
            evidence["backupDigest"] = digest(read_rows(backup))
            backup_bytes = hashlib.sha256(backup.read_bytes()).hexdigest()
            if evidence["backupDigest"] != evidence["baselineDigest"]:
                raise RuntimeError("Backup differs from baseline")
            checkpoint("backup")
            # This acknowledged transaction occurs after the recoverable point.
            with connection(live) as db:
                db.execute("INSERT INTO orders VALUES(3, 'cable', 12)")
            evidence["acknowledgedRows"] = read_rows(live)
            with connection(live) as db:
                db.execute("DELETE FROM orders")
            evidence["faultRows"] = read_rows(live)
            if evidence["faultRows"]:
                raise RuntimeError("Fault was not observed")
            checkpoint("fault")
            start = time.perf_counter()
            with connection(backup) as source, connection(live) as target:
                source.backup(target)
            evidence["restoredRows"] = read_rows(live)
            evidence["restoredDigest"] = digest(evidence["restoredRows"])
            with connection(live) as db:
                evidence["integrity"] = db.execute("PRAGMA integrity_check").fetchone()[0]
            evidence["localRestoreAndCheckSeconds"] = time.perf_counter() - start
            evidence["lostAcknowledgedIds"] = sorted({r[0] for r in evidence["acknowledgedRows"]} - {r[0] for r in evidence["restoredRows"]})
            if evidence["restoredRows"] != expected or evidence["integrity"] != "ok" or evidence["lostAcknowledgedIds"] != [3]:
                raise RuntimeError("Recovery postcondition failed")
            if hashlib.sha256(backup.read_bytes()).hexdigest() != backup_bytes:
                raise RuntimeError("Recovery modified the backup")
            checkpoint("restored")
            evidence["result"] = "PASS"
    except RuntimeError as error:
        evidence["result"] = "INTERRUPTED" if str(error).startswith("Injected interruption:") else "FAIL"
        evidence["error"] = str(error)
    finally:
        evidence["cleanupVerified"] = owned is not None and not owned.exists()
    return evidence


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--run", action="store_true", help="Create, recover and delete a fresh owned temporary database")
    parser.add_argument("--interrupt", choices=["baseline", "backup", "fault", "restored"], help="Exercise cleanup after an intentional interruption")
    args = parser.parse_args()
    if not args.run:
        parser.print_help()
    else:
        result = run(args.interrupt)
        print(json.dumps(result, indent=2))
        raise SystemExit(0 if result["result"] == "PASS" and result["cleanupVerified"] else 1)
