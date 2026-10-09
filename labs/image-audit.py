"""Read-only SHA-512 comparison and an isolated teaching fixture. No Cisco software."""
import argparse
import hashlib
import hmac
import json
import os
from pathlib import Path
import re
import stat
import tempfile


def compare(path, expected):
    if not isinstance(expected, str) or not re.fullmatch(r'[0-9a-fA-F]{128}', expected):
        raise ValueError('Expected SHA-512 must contain exactly 128 hexadecimal digits.')
    if not stat.S_ISREG(Path(path).stat().st_mode):
        raise ValueError('Only regular files are supported.')
    with Path(path).open('rb') as stream:
        before = os.fstat(stream.fileno())
        if not stat.S_ISREG(before.st_mode):
            raise ValueError('Only regular files are supported.')
        digest = hashlib.sha512()
        count = 0
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(block)
            count += len(block)
        after = os.fstat(stream.fileno())
    stable = (before.st_size, before.st_mtime_ns, before.st_ctime_ns) == (
        after.st_size, after.st_mtime_ns, after.st_ctime_ns) and count == after.st_size
    actual = digest.hexdigest()
    return {'bytes': count, 'sha512': actual, 'unchanged_during_observation': stable,
            'match': stable and hmac.compare_digest(actual, expected.lower()),
            'limit': 'Byte comparison with supplied expected digest only; no signature, compatibility, boot or runtime validation. Metadata checks cannot guarantee an immutable snapshot.'}


def demo():
    with tempfile.TemporaryDirectory(prefix='infra-image-audit-') as directory:
        fixture = Path(directory) / 'teaching-artifact.bin'
        original = b'FIELD BOOK TEACHING BYTES\n' * 128
        expected = hashlib.sha512(original).hexdigest()
        fixture.write_bytes(original)
        baseline = compare(fixture, expected)
        changed = bytearray(original)
        changed[17] ^= 1
        fixture.write_bytes(changed)
        tampered = compare(fixture, expected)
        assert baseline['match'] and not tampered['match']
        assert baseline['bytes'] == tampered['bytes']
        return {'scope': 'Synthetic local bytes; not a Cisco image', 'baseline': baseline,
                'same_size_change': tampered,
                'lesson': 'A filename and equal length do not establish equal bytes. A trusted expected digest is a separate input.'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    actions = parser.add_mutually_exclusive_group()
    actions.add_argument('--run', action='store_true', help='Create and remove temporary synthetic fixtures.')
    actions.add_argument('--file', type=Path, help='Read an existing regular file without modifying it.')
    parser.add_argument('--sha512', help='Expected digest from an independently trusted source; required with --file.')
    args = parser.parse_args()
    if not args.run and args.file is None and args.sha512 is None:
        parser.print_help()
        return 0
    if args.sha512 and args.file is None:
        parser.error('--sha512 requires --file')
    if args.file is not None and args.sha512 is None:
        parser.error('--file requires --sha512')
    try:
        report = demo() if args.run else compare(args.file, args.sha512)
    except (OSError, ValueError) as exc:
        parser.error(str(exc))
    print(json.dumps(report, indent=2))
    return 0 if args.run or report['match'] else 1


if __name__ == '__main__':
    raise SystemExit(main())
