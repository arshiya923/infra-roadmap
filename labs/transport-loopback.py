"""Bounded IPv4 loopback lab; no external targets or persistent services."""
import argparse
import json
import socket


def run():
    # A deliberately small read size illustrates stream consumption. TCP packet
    # segmentation and recv chunk boundaries remain implementation-dependent.
    writes = [b"HELLO", b"WORLD"]
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as listener:
        listener.settimeout(3)
        listener.bind(("127.0.0.1", 0))
        listener.listen(1)
        tcp_address = listener.getsockname()
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
            client.settimeout(3)
            client.connect(tcp_address)
            connection, peer = listener.accept()
            with connection:
                connection.settimeout(3)
                for data in writes:
                    client.sendall(data)
                client.shutdown(socket.SHUT_WR)
                reads = []
                while True:
                    data = connection.recv(3)
                    if not data:
                        break
                    reads.append(data)
                if b"".join(reads) != b"HELLOWORLD":
                    raise RuntimeError("TCP byte-stream verification failed")
                if any(len(data) > 3 for data in reads):
                    raise RuntimeError("Read buffer contract violated")
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as receiver:
        receiver.settimeout(3)
        receiver.bind(("127.0.0.1", 0))
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sender:
            sender.settimeout(3)
            for data in writes:
                sender.sendto(data, receiver.getsockname())
            datagrams = [receiver.recvfrom(64)[0] for _ in writes]
            if datagrams != writes:
                raise RuntimeError("This local UDP run lost or reordered data")
    return {
        "result": "PASS",
        "scope": "IPv4 loopback only; ephemeral ports; sockets closed on exit",
        "tcp": {"write_lengths": [5, 5], "read_lengths": [len(x) for x in reads],
                "bytes": b"".join(reads).decode("ascii"),
                "note": "Reads use a three-byte buffer; this is not a wire-segmentation measurement."},
        "udp": {"datagram_lengths": [len(x) for x in datagrams],
                "note": "Observed delivery in this run does not guarantee UDP delivery, ordering or duplicate suppression."},
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--run", action="store_true", help="run the bounded loopback exercise")
    args = parser.parse_args()
    if args.run:
        print(json.dumps(run(), indent=2))
    else:
        parser.print_help()
