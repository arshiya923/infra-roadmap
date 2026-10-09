"""Exercise real loopback sockets plus cleanup on an injected receive failure."""
import importlib.util
import json
import pathlib
import socket
import subprocess
import sys
from unittest.mock import patch

root = pathlib.Path(__file__).resolve().parents[1]
script = root / "labs/transport-loopback.py"
help_run = subprocess.run([sys.executable, str(script)], capture_output=True, text=True, timeout=10, check=True)
assert "--run" in help_run.stdout and '"result"' not in help_run.stdout
spec = importlib.util.spec_from_file_location("transport_lab", script)
lab = importlib.util.module_from_spec(spec)
spec.loader.exec_module(lab)
real_socket = socket.socket
created = []


class ObservedSocket(real_socket):
    fail_receive = False

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        created.append(self)

    def bind(self, address):
        assert address == ("127.0.0.1", 0), address
        return super().bind(address)

    def connect(self, address):
        assert address[0] == "127.0.0.1" and address[1] > 0
        return super().connect(address)

    def sendto(self, data, address):
        assert address[0] == "127.0.0.1" and address[1] > 0
        return super().sendto(data, address)

    def recv(self, size, *args):
        if self.fail_receive:
            raise OSError("injected receive failure")
        return super().recv(size, *args)


with patch.object(socket, "socket", ObservedSocket):
    result = lab.run()
assert result["result"] == "PASS"
assert result["tcp"]["bytes"] == "HELLOWORLD"
assert sum(result["tcp"]["read_lengths"]) == 10
assert result["udp"]["datagram_lengths"] == [5, 5]
assert len(created) == 5 and all(s.fileno() == -1 for s in created)
created.clear()
ObservedSocket.fail_receive = True
with patch.object(socket, "socket", ObservedSocket):
    try:
        lab.run()
    except OSError as error:
        assert str(error) == "injected receive failure"
    else:
        raise AssertionError("Failure injection did not execute")
assert len(created) == 3 and all(s.fileno() == -1 for s in created)
evidence = {"result": "PASS", "checks": ["default help", "loopback-only endpoints", "stream reconstruction", "datagram boundaries in this run", "all five sockets closed", "three sockets closed after injected failure"], "observed": result}
(root / "docs/transport-lab-results.json").write_text(json.dumps(evidence, indent=2) + "\n", encoding="utf-8")
print(json.dumps(evidence, indent=2))
