const fs=require('node:fs'),path=require('node:path');
module.exports=async({evaluate:e,call,waitFor,delay,assert,errors})=>{
  await call('Emulation.setCPUThrottlingRate',{rate:4});
  await e(`(()=>{window.perfCounts={reads:0,writes:0,queries:0,math:0};const get=Storage.prototype.getItem,set=Storage.prototype.setItem,query=Element.prototype.querySelectorAll,math=window.renderMathInElement;Storage.prototype.getItem=function(...args){perfCounts.reads++;return get.apply(this,args)};Storage.prototype.setItem=function(...args){perfCounts.writes++;return set.apply(this,args)};Element.prototype.querySelectorAll=function(...args){perfCounts.queries++;return query.apply(this,args)};window.renderMathInElement=(...args)=>{perfCounts.math++;return math(...args)}})()`);
  const report={cpuThrottle:4};
  await e("ProbabilityCourse.open('practice',1)");
  await waitFor("document.getElementById('prob-task-1-1-reason')",'practice');
  await e("document.querySelector('[data-nav-key=probability]').open=true");
  await waitFor("document.querySelectorAll('[data-prob-ticket]').length===18",'sidebar');
  await delay(500);
  report.idle=await e(`(async()=>{perfCounts={reads:0,writes:0,queries:0,math:0};await new Promise(r=>setTimeout(r,700));return{...perfCounts}})()`);
  report.typing=await e(`(async()=>{perfCounts={reads:0,writes:0,queries:0,math:0};const input=document.getElementById('prob-task-1-1-reason'),times=[];for(let i=0;i<60;i++){const start=performance.now();input.value+='x';input.dispatchEvent(new Event('input',{bubbles:true}));times.push(performance.now()-start)}const syncCounts={...perfCounts};await new Promise(r=>setTimeout(r,300));times.sort((a,b)=>a-b);return{events:60,totalMs:times.reduce((n,x)=>n+x,0),p95Ms:times[56],syncCounts,settledCounts:{...perfCounts},saved:ProbabilityPractice.exportProgress().tasks['1:1'].reason.length}})()`);
  await e("document.querySelector('[data-tab=physics-ntk]').click()");
  await waitFor("typeof PHYSICS_NTK_DATA!=='undefined' && document.querySelector('#physics-ntk-pane .phys-card')",'physics');
  await delay(700);
  report.physics=await e(`(async()=>{perfCounts={reads:0,writes:0,queries:0,math:0};const active=document.querySelector('#physics-ntk-pane .sub-tab-btn.active').dataset.subtab,container=document.getElementById('physics-ntk-'+active+'-list'),card=container.firstElementChild,start=performance.now();await renderPhysicsNtk();const elapsed=performance.now()-start;await new Promise(r=>setTimeout(r,500));return{repeatRenderMs:elapsed,cardPreserved:container.firstElementChild===card,totalCards:document.querySelectorAll('#physics-ntk-pane .phys-card').length,activeCards:container.children.length,expectedActiveCards:PHYSICS_NTK_DATA.find(s=>s.id===active).problems.length,counts:{...perfCounts}}})()`);
  await e("DataLoader.load('semester1')");
  report.semester1=await e(`(async()=>{const original=window.renderSemester1AGiTDU;let renders=0;window.renderSemester1AGiTDU=(...args)=>{renders++;return original(...args)};localStorage.setItem('active_tab','semester1');const start=performance.now();await loadActiveTab();await new Promise(r=>setTimeout(r,250));window.renderSemester1AGiTDU=original;return{renders,readyMs:performance.now()-start-250}})()`);
  assert.deepEqual(errors,[]);
  if(process.env.PERF_VERIFY!=='0'){
    assert.equal(report.idle.queries,0,'Idle observers must settle');
    assert.equal(report.physics.cardPreserved,true,'Unchanged physics keeps existing DOM and formulas');
    assert.equal(report.physics.totalCards,report.physics.expectedActiveCards,'Only the selected physics section is rendered');
    assert.equal(report.semester1.renders,1,'A route switch renders semester1 only once');
    assert.ok(report.typing.syncCounts.queries<30,'Typing does not rebuild every statistic/option');
    assert.equal(report.typing.saved,60,'Every draft character is persisted');
  }
  const output=path.resolve(__dirname,'output',process.env.PERF_OUTPUT||'performance.json');
  fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
};
