"""Give each route-control exercise its own concrete investigation sequence."""
import json, subprocess
from pathlib import Path
root = Path(__file__).resolve().parents[1]
lessons = json.loads(subprocess.check_output(['node', 'tools/read-content.cjs'], cwd=root))['10']
investigations = {
 's3-g5-t0': [
  'Keep the session Established and compare baseline, export denied and import denied. Record candidate admission, local BGP choice and outgoing advertisement separately.',
  'Restore admission and export, then remove only NEXT_HOP resolution, system selection or return readiness in turn. Identify the first failed prerequisite without calling it a failed session.',
  'Explain why an export denial can retain the local BGP choice, and name the receiving observer needed to verify a real advertisement.'],
 's3-g5-t1': [
  'Record the baseline selected source route, IPv4 exact /24 admission, seed 20 and target tag 100.',
  'Compare sourceTag 100, a contained /25 and missing seed presence separately. Identify feedback rejection, exact-prefix rejection and the explicit worksheet seed requirement.',
  'Restore admission and remove target selection, system selection or return readiness separately. Explain why an admitted translated candidate need not be installed.',
  'Explain why the tag guard does not authenticate provenance or prevent every possible redistribution loop.'],
 's3-g5-t2': [
  'Under bounded rules, test 198.51.100.0/24, 198.51.100.240/28 and 198.51.100.248/29. Record sequence 10 explicit deny, sequence 20 permit/set and implicit denial respectively.',
  'Switch the exact /24 to list-deny rules. Explain why a deny inside the referenced prefix list is a nonmatch, allowing the later permit entry to act.',
  'Keep a permitted set result while removing only system selection or return readiness. Explain why LOCAL_PREF 200 proves neither installation nor the original exchange.'],
 's3-g5-t3': [
  'Compare a bare /24 with its /25 child, then test contained /25, /28 and /29 under ge 25 le 28. Check containment and inclusive length bounds independently.',
  'Compare default-only 0.0.0.0/0 with 0.0.0.0/0 le 32. Test both the default and a /32 host prefix.',
  'Under ordered rules, compare the denied exact 198.51.100.128/25 with a contained /26 that can reach the later permit. Explain why the later permit cannot rescue the exact denied /25.',
  'Enter a misaligned prefix such as 198.51.100.1/24. Explain why validation failure is different from a valid route receiving implicit denial.'],
 's3-g5-t4': [
  'Under extended rules, compare TCP/443 from 192.0.2.10 and 192.0.2.66 to 198.51.100.10, then change destination port to 80. Identify permit, explicit deny and implicit deny.',
  'Switch to standard rules and change destination and protocol while preserving an allowed source. Explain why this fixed standard list tests source only.',
  'Under the noncontiguous wildcard 0.0.254.255 at base 10.1.2.0, compare 10.1.254.77 and 10.1.3.77. Identify the significant low bit in the third octet.',
  'Keep a forward packet permit while removing return readiness. Explain why the stateless header decision does not establish a complete exchange.']}
for lesson in lessons[:5]:
    steps = investigations[lesson['id']]
    lesson['lab']['steps'] = steps + [
        'Keyboard-focus the named result table, inspect each decisive row and activate Reset to restore the baseline.',
        'Optional prepared-target observation uses only the four guided read-only command groups in the correct family, table, interface and direction. Record actual output and original forward/return evidence separately.']
    lesson['lab']['challenge'] = steps[-1]
p = root/'content/batch-10.js'
s = p.read_text(encoding='utf-8')
start = s.index('const lessons = ')+len('const lessons = ')
end = s.index(';\nfor(const l of lessons)', start)
p.write_text(s[:start]+json.dumps(lessons,ensure_ascii=False,indent=2)+s[end:],encoding='utf-8')
subprocess.run(['python','tools/catalog.py'],cwd=root,check=True)
print('Five route-control labs now contain concrete topic-specific cases.')
