"""Read authored lesson evidence offline. No devices, subprocesses or writes."""
import argparse,json
from pathlib import Path

def inspect(topic,root=None):
    root=Path(root) if root else Path(__file__).resolve().parents[1]
    for path in sorted((root/'content').glob('batch-*.js')):
        if path.stem not in ('batch-19','batch-20','batch-21'):continue
        raw=path.read_text(encoding='utf-8');start=raw.index(' = [')+3
        for lesson in json.loads(raw[start:].rstrip().removesuffix(';')):
            if lesson['id']==topic:
                return dict(evidenceType='AUTHORED SCENARIO — not captured target output',topic=topic,title=lesson['title'],mechanism=lesson['mechanism'],**lesson['storageVirtualization'])
    raise ValueError('Unknown or unauthored topic: '+topic)

def main():
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--topic',required=True);args=parser.parse_args()
    try:print(json.dumps(inspect(args.topic),ensure_ascii=True,indent=2))
    except ValueError as e:parser.error(str(e))
if __name__=='__main__':main()
