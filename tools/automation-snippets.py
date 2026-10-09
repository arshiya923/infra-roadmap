"""Standalone Python examples, executed by the content verification suite."""
SNIPPETS={
's9-g0-t0':'''def validate_name(record):
    name = record.get("name")
    if not isinstance(name, str) or not name:
        raise ValueError("name is required")
    return {"name": name, "valid": True}

print(validate_name({"name": "edge-1"}))
try:
    validate_name({})
except ValueError as error:
    print("Rejected:", error)
''',
's9-g0-t1':'''from ipaddress import ip_address

inventory = ["192.0.2.10", "2001:db8::10", "999.1.1.1"]
for raw in inventory:
    try:
        print({"input": raw, "normalized": str(ip_address(raw))})
    except ValueError:
        print({"input": raw, "result": "invalid address"})
''',
's9-g0-t2':'''def valid_vlan(value):
    return type(value) is int and 1 <= value <= 4094

for value in [20, "20", True, 4095]:
    print(repr(value), valid_vlan(value))
print("Nonempty text is truthy:", bool("false"))
''',
's9-g0-t3':'''# Synthetic read outcomes; no network calls.
outcomes = {"edge-a": ["timeout", "ok"], "edge-b": ["denied", "ok"]}
for host, replies in outcomes.items():
    for attempt, reply in enumerate(replies, start=1):
        print(host, attempt, reply)
        if reply in ("ok", "denied"):
            break
    else:
        print(host, "attempt budget exhausted")
''',
's9-g0-t4':'''def plan(current, desired):
    return {key: value for key, value in desired.items()
            if key not in current or current[key] != value}

baseline = {"vlan": 10, "enabled": True}
desired = {"vlan": 20, "enabled": True}
print(plan(baseline, desired))
print(plan(desired, desired))
assert baseline["vlan"] == 10
''',
's9-g0-t5':'''from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory(prefix="infra-file-example-") as owned:
    path = Path(owned) / "intent.txt"
    path.write_text("site=Tehran\\n", encoding="utf-8")
    baseline = path.read_bytes()
    path.write_text("site=Lab\\n", encoding="utf-8")
    path.write_bytes(baseline)
    print("restored", path.read_bytes() == baseline)
print("cleaned", not Path(owned).exists())
''',
's9-g0-t6':'''import json

def unique(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError("duplicate key: " + key)
        result[key] = value
    return result

print(json.loads('{"vlan": 20}', object_pairs_hook=unique))
try:
    json.loads('{"vlan": 10, "vlan": 20}', object_pairs_hook=unique)
except ValueError as error:
    print("Rejected:", error)
''',
's9-g0-t8':'''import re
from ipaddress import ip_address

for line in ["address=192.0.2.10", "address=999.1.1.1", "unexpected"]:
    match = re.fullmatch(r"address=([0-9.]+)", line)
    try:
        if not match:
            raise ValueError("unexpected line format")
        print(ip_address(match.group(1)))
    except ValueError:
        print("Rejected:", line)
'''
}
