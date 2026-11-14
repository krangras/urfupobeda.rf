const assert = require('node:assert/strict');
const fs = require('node:fs'), vm = require('node:vm'), path = require('node:path');
const read = name => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');
function fixture() {
    const store = new Map(), docs = new Map(), writes = [];
    const context = vm.createContext({ console: { ...console, warn() {}, error() {} }, Date, JSON, Promise, Map, authUser: null,
        localStorage: { getItem: k => store.get(k) ?? null, setItem: (k,v) => store.set(k,String(v)), removeItem: k => store.delete(k) },
        setTimeout: () => 1, clearTimeout() {}, confirm: () => true,
        firebase: { firestore: { FieldValue: { serverTimestamp: () => 0 } } },
        db: {
            collection: () => ({ doc: uid => ({ uid, get: async () => ({ exists: docs.has(uid), data: () => docs.get(uid) }),
                set: async data => { docs.set(uid,data); writes.push({ uid, data }); }, onSnapshot: () => () => {} }) }),
            runTransaction: async run => run({ get: ref => ref.get(), set: (ref,data) => ref.set(data) })
        }
    });
    vm.runInContext(read('src/app/storage.js'), context);
    vm.runInContext(read('src/auth/firebase-sync.js'), context);
    return { c: context, store, docs, writes, run: code => vm.runInContext(code, context) };
}
async function main() {
    let f = fixture();
    f.run("saveToStorage('physics_progress', '{\"x\":true}')");
    assert.ok(JSON.parse(f.store.get('_keyVersions')).physics_progress > 0, 'Guest edits need versions');
    const version = JSON.parse(f.store.get('_keyVersions')).physics_progress;
    f.run("mergeRemoteData({progress:{physics_progress:'{}'},_keyVersions:{physics_progress:1}})");
    assert.equal(f.store.get('physics_progress'), '{"x":true}', 'Older cloud data must not replace guest edits');
    f.run(`mergeRemoteData({progress:{physics_progress:'{"new":true}'},_keyVersions:{physics_progress:${version+200}}})`);
    f.run(`mergeRemoteData({progress:{physics_progress:'{"old":true}'},_keyVersions:{physics_progress:${version+100}}})`);
    assert.equal(f.store.get('physics_progress'), '{"new":true}');
    assert.equal(JSON.parse(f.store.get('_keyVersions')).physics_progress, version+200);
    f.run(`mergeRemoteData({progress:{physics_progress:null},_keyVersions:{physics_progress:${version+300}}})`);
    assert.equal(f.store.get('physics_progress'), undefined, 'Remote deletion should propagate');
    f.run('onReinit(async()=>{await Promise.resolve();this.suppressed=_skipSync})');
    await f.run('reinitApp()');
    assert.equal(f.c.suppressed,true,'Async reinit must remain suppressed');
    assert.equal(f.run('_skipSync'),false);

    f = fixture();
    f.run("saveToStorage('physics_progress','{\"guest\":true}')");
    f.c.authUser = {uid:'A'}; await f.run('handleAuth(authUser)');
    assert.ok(!String(f.store.get('physics_progress')).includes('guest'), 'Guest data must not be silently assigned to an account');
    f.run("saveToStorage('physics_progress','{\"A\":true}')"); await f.run('pushLocalToFirestore()');
    f.c.authUser = {uid:'B'}; await f.run('handleAuth(authUser)');
    assert.ok(!String(f.store.get('physics_progress')).includes('"A"'));
    assert.ok(!f.writes.filter(w=>w.uid==='B').some(w=>JSON.stringify(w).includes('"A"')), 'No cross-account upload');
    f.run("saveToStorage('physics_progress','{\"B\":true}')");
    f.c.authUser = {uid:'A'}; await f.run('handleAuth(authUser)');
    assert.equal(f.store.get('physics_progress'),'{"A":true}');
    f.c.authUser = null; await f.run('handleAuth(null)');
    assert.equal(f.store.get('physics_progress'),'{"guest":true}');
    f.run("saveToStorage('exam_matrix_answers','{\"1\":{\"0_0\":\"7\"}}')");
    assert.ok(JSON.parse(f.store.get('_keyVersions')).exam_matrix_answers > 0);
    const old = f.store.get('physics_progress');
    const original = f.c.localStorage.setItem;
    let failed = false;
    f.c.localStorage.setItem = (key,value) => { if (key === 'exam_tasks_progress' && !failed) { failed=true; throw Error('quota'); } original(key,value); };
    assert.throws(()=>f.run("commitProgressBatch({physics_progress:'{}',exam_tasks_progress:'{}'})"));
    assert.equal(f.store.get('physics_progress'),old,'Failed batch restores earlier values');
    failed=false;
    f.c.localStorage.setItem = (key,value) => { if (key === 'active_tab' && !failed) { failed=true; throw Error('quota'); } original(key,value); };
    assert.throws(()=>f.run("commitProgressBatch({physics_progress:'{}'},{active_tab:'semester1'})"));
    assert.equal(f.store.get('physics_progress'),old,'Preference failure also rolls back imported progress');
    f.c.localStorage.setItem=original;
    f.c.authUser={uid:'A'};await f.run('handleAuth(authUser)');
    f.docs.set('A',{progress:{physics_progress:'{"newer":true}'},_keyVersions:{physics_progress:Date.now()+100000}});
    await f.run('pushLocalToFirestore()');
    assert.equal(f.docs.get('A').progress.physics_progress,'{"newer":true}','A stale transaction must retain newer cloud data');
    f.run('onReinit(async()=>{throw Error("test failure")})');
    await assert.rejects(f.run('reinitApp()'));
    assert.equal(f.run('_skipSync'),false,'Suppression must reset even if rendering fails');
    f.run('onReinit(async()=>{this.recovered=true})');await f.run('reinitApp()');
    assert.equal(f.c.recovered,true,'Queue recovers after failed reinit');
    console.log('PASS: sync versions, deletion, awaited reinit, account/guest isolation, restoration and atomic rollback');
}
main().catch(error=>{console.error(error);process.exitCode=1});
