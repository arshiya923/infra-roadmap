"""Stable combined catalog; expansion never changes the immutable inventory."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def inventories():
    original = json.loads((ROOT / 'content/roadmap-inventory.json').read_text(encoding='utf-8'))
    additions = json.loads((ROOT / 'content/expansion-inventory.json').read_text(encoding='utf-8'))['nodes']
    nodes = original['nodes'] + additions
    assert len({n['id'] for n in nodes}) == len(nodes), 'Duplicate curriculum identity'
    assert all(n['id'].startswith('ADD-') and n['kind'] == 'expansion' for n in additions)
    return original, additions, nodes

def completed(manifest):
    original, additions, _ = inventories()
    baseline = set(manifest['completedNodeIds'])
    expanded = set(manifest.get('completedExpansionNodeIds', []))
    assert baseline <= {n['id'] for n in original['nodes']}
    assert expanded <= {n['id'] for n in additions}
    assert len(baseline) == len(manifest['completedNodeIds'])
    assert len(expanded) == len(manifest.get('completedExpansionNodeIds', []))
    return baseline | expanded
