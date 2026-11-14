const assert = require('node:assert/strict');
const vm = require('node:vm'), fs = require('node:fs'), path = require('node:path');
const read = name => fs.readFileSync(path.join(__dirname,'..',name),'utf8');
async function main() {
  const store=new Map([['broken','{bad']]);
  const c=vm.createContext({console,Date,localStorage:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v)}});
  vm.runInContext(read('src/app/storage.js'),c);
  assert.equal(vm.runInContext('readStoredJSON("broken",[]).length',c),0);
  assert.equal(store.get('urfupobeda:recovery:broken'),'{bad');
  for(const text of ['1/0','1/2/3','4+2','2abc','Infinity','1e309','']) assert.equal(vm.runInContext(`Number.isNaN(parseFiniteNumber(${JSON.stringify(text)}))`,c),true);
  assert.equal(vm.runInContext('parseFiniteNumber("−2,5 / 5")',c),-0.5);
  const messages=vm.runInContext('[14,15,16].map(d=>examDateMessage(new Date(2026,10,d),new Date(2026,10,15)))',c);
  assert.ok(messages[0].includes('прошёл'));assert.ok(messages[1].includes('сегодня'));assert.ok(messages[2].includes('1 дн.'));
  const handlers={},cached=new Map([
    ['http://test.local/src/app/app.js',new Response('const app = true',{headers:{'Content-Type':'application/javascript'}})],
    ['./index.html',new Response('<html>offline</html>',{headers:{'Content-Type':'text/html'}})]
  ]);
  const sw=vm.createContext({URL,Response,console,fetch:async()=>{throw Error('offline')},self:{location:{origin:'http://test.local'},addEventListener:(name,fn)=>handlers[name]=fn},caches:{match:async(req,options)=>{let key=typeof req==='string'?req:req.url;if(options?.ignoreSearch)key=key.split('?')[0];return cached.get(key)?.clone()}}});
  vm.runInContext(read('sw.js'),sw);
  const request=async(url,mode='cors')=>{let promise;handlers.fetch({request:{method:'GET',url:'http://test.local/'+url,mode},respondWith:p=>promise=p});return promise};
  let response=await request('src/app/app.js?v=new');
  assert.equal(await response.text(),'const app = true');
  response=await request('missing.js?v=new');assert.equal(response.status,503);assert.ok(response.headers.get('Content-Type').includes('javascript'));assert.ok(!(await response.text()).includes('<html>'));
  response=await request('some-route','navigate');assert.equal(await response.text(),'<html>offline</html>');
  console.log('PASS: storage recovery, strict numeric parsing, exam dates and offline cache/fallback');
}
main().catch(error=>{console.error(error);process.exitCode=1});
