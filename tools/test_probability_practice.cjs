const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const read = file => fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const store = new Map();
const context = vm.createContext({console,Date,window:{addEventListener(){}},localStorage:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v)}});
vm.runInContext(read('src/app/storage.js'),context);
vm.runInContext(read('src/data/probability_data.js')+'\nthis.course=PROBABILITY_DATA;',context);
vm.runInContext(read('src/app/probability-practice.js').replace('window.ProbabilityPractice = {','window.practiceTest = {checkAnswer}; window.ProbabilityPractice = {'),context);
const api = context.window.ProbabilityPractice, check = context.window.practiceTest.checkAnswer;
const tasks = context.course.tickets[0].practice;
assert.equal(tasks.length,10);assert.ok(context.course.tickets.slice(1).every(t=>!t.practice?.length));
assert.deepEqual(Array.from(tasks,t=>t.id),[1,2,3,4,5,6,7,8,9,10]);
assert.ok(tasks.every(t=>!t.solution&&!t.hint));
// Derive the answer key independently, including exhaustive small cases.
const bits=n=>n.toString(2).split('').filter(x=>x==='1').length;
const factorial=n=>n<2?1:n*factorial(n-1);
const permutations = word => {
  if(!word.length)return [''];
  return [...new Set([...word].flatMap((letter,i)=>permutations(word.slice(0,i)+word.slice(i+1)).map(rest=>letter+rest)))];
};
const strings=(alphabet,n)=>n===0?['']:strings(alphabet,n-1).flatMap(s=>[...alphabet].map(c=>s+c));
const expected=[false,7*4,
  Array.from({length:1<<12},(_,n)=>n).filter(n=>bits(n)===5).length,
  factorial(9)/(factorial(2)*factorial(3)),
  Array.from({length:3600},(_,n)=>n+1).filter(n=>3600%n===0).length,
  Array.from({length:1<<10},(_,n)=>n).filter(n=>bits(n)===4).length,
  6*10*factorial(5),
  permutations('КАССА').filter(s=>![...s].some((c,i)=>i&&c===s[i-1])).length,
  strings('01',12).filter(s=>!s.includes('00')).length,
  strings('abc',7).filter(s=>!s.includes('ab')&&!s.includes('ba')).length];
assert.deepEqual(Array.from(tasks,t=>t.answer),expected);
for(const [i,task] of tasks.entries()) {
  const answer=task.type==='boolean'?'no':String(expected[i]);
  assert.equal(check(task,{answer,reason:'Моё обоснование'}),'correct');
  assert.equal(check(task,{answer:task.type==='boolean'?'yes':String(expected[i]+1),reason:'Моё обоснование'}),'wrong');
  assert.equal(check(task,{answer:'',reason:''}),'empty');
}
assert.equal(check(tasks[0],{answer:'no',reason:' '}),'reason');
for(const answer of ['28abc','1/0','2+26','28.5','-28','0x1c','1e999']) assert.equal(check(tasks[1],{answer,reason:''}),'invalid');
assert.equal(check(tasks[3],{answer:'30 240',reason:''}),'correct');
const payload={version:1,tasks:{'1:2':{answer:'28',reason:'',checked:true,completed:true}}};
store.set('probability_practice_v1',JSON.stringify(payload));
assert.equal(api.exportProgress().tasks['1:2'].answer,'28');
assert.deepEqual(JSON.parse(JSON.stringify(api.stats(context.course.tickets))),{total:10,solved:1});
assert.throws(()=>api.validateProgress({...payload,tasks:{'1:2':{answer:{},checked:true,completed:true}}}));
assert.equal(Object.keys(api.normalizeProgress({tasks:{'__proto__':{},bad:{},'1:2':null}}).tasks).length,0);
console.log('PASS: ten supplied problems, independently verified answers, strict checking, proof boundary, saved progress and validation');
