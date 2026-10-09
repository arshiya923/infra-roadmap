// Run the existing shared audit with route context added to failures.
const fs=require('fs'),Module=require('module'),path=require('path');
const file=path.resolve('tests/quality-audit.cjs');let source=fs.readFileSync(file,'utf8');
source=source.replace('for(const l of lessons){await page.goto',"for(const l of lessons){console.log('AUDIT '+l.id);await page.goto");
source=source.replace("'docs/quality-audit-latest.json'","'docs/quality-audit-devices.json'");
const m=new Module(file,module);m.filename=file;m.paths=Module._nodeModulePaths(path.dirname(file));m._compile(source,file);
