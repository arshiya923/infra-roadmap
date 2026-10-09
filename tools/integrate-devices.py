from pathlib import Path
R=Path(__file__).resolve().parents[1]
p=R/'scripts/learning.js';s=p.read_text(encoding='utf-8')
if 'window.DeviceMastery.html' not in s:
 s=s.replace('window.AutomationArchitecture.html(l.interactive)','window.DeviceMastery.html(l.interactive)||window.AutomationArchitecture.html(l.interactive)')
 s=s.replace('window.AutomationArchitecture.mount(l.interactive);','window.AutomationArchitecture.mount(l.interactive);window.DeviceMastery.mount(l.interactive);')
 p.write_text(s,encoding='utf-8')
p=R/'learn.html';s=p.read_text(encoding='utf-8')
if 'scripts/device-mastery.js' not in s:
 s=s.replace('<script defer src="scripts/learning.js"','<script defer src="scripts/device-mastery.js"></script>\n  <script defer src="scripts/learning.js"')
 assert 'scripts/device-mastery.js' in s
 p.write_text(s,encoding='utf-8')
if 'styles/device-mastery.css' not in s:
 s=s.replace('</head>','<link rel="stylesheet" href="styles/device-mastery.css">\n</head>')
 p.write_text(s,encoding='utf-8')
