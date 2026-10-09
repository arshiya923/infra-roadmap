// Serialize trusted, locally authored content bundles for catalog/validation tooling.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),context={window:{}};
vm.createContext(context);
for(const file of fs.readdirSync(path.join(root,'content')).filter(x=>/^batch-\d+\.js$/.test(x)).sort()){
  vm.runInContext(fs.readFileSync(path.join(root,'content',file),'utf8'),context,{timeout:3000,filename:file});
}
process.stdout.write(JSON.stringify(context.window.INFRA_BATCHES||{}));
