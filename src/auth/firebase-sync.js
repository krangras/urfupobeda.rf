const SYNC_KEYS = [
  'exam_manager_v9', 'semester1_progress',
  'kr_progress', 'exam_tasks_progress', 'integrals_progress',
  'physics_progress', 'physics_answers',
  'exam_matrix_answers', 'probability_progress_v1'
];

let syncTimer = null;
const SYNC_DELAY = 1000;
let _reinitCallback = null;
let _pendingReinit = false;
let _skipSync = false;
let _snapshotUnsub = null;
let _isPushing = false;
let _isLoading = false;
let _firstSnapshotDone = false;
let _activeOwner = localStorage.getItem('urfupobeda:progress-owner') || 'guest';
let _authEpoch = 0;
let _authWork = Promise.resolve();
let _reinitWork = Promise.resolve();
const progressBucketKey = owner => 'urfupobeda:progress:' + encodeURIComponent(owner);
function persistProgressOwner() { safeSetItem(progressBucketKey(_activeOwner), JSON.stringify(collectLocalData())); }

// ── Safe localStorage ──────────────────────────────────────────────
function safeSetItem(key, value) {
  try { localStorage.setItem(key, value); }
  catch (e) { console.warn('localStorage write failed:', key, e.message); throw e; }
}

function safeRemoveItem(key) {
  try { localStorage.removeItem(key); }
  catch (e) { console.warn('localStorage remove failed:', key, e.message); throw e; }
}

// ── Per-key version tracking ───────────────────────────────────────
function getKeyVersions() {
  return Object.fromEntries(Object.entries(readStoredJSON('_keyVersions', {}))
    .filter(([key, value]) => SYNC_KEYS.includes(key) && Number.isFinite(value) && value >= 0));
}

function bumpKeyVersion(key) {
  var v = getKeyVersions();
  v[key] = Math.max(Date.now(), Number(v[key] || 0) + 1);
  safeSetItem('_keyVersions', JSON.stringify(v));
}

// ── Collect local data for push ────────────────────────────────────
function collectLocalData() {
  var data = {};
  var versions = getKeyVersions();
  for (var i = 0; i < SYNC_KEYS.length; i++) {
    var key = SYNC_KEYS[i];
    var val = localStorage.getItem(key);
    data[key] = val;
  }
  return { data: data, versions: versions };
}

// ── Push local → Firestore ─────────────────────────────────────────
async function pushLocalToFirestore() {
  if (!authUser || _skipSync || authUser.uid !== _activeOwner) return;
  _isPushing = true;
  const uid = authUser.uid;
  var collected = collectLocalData();
  try {
    await db.runTransaction(async transaction => {
      const ref = db.collection('users').doc(uid);
      const doc = await transaction.get(ref);
      const remote = doc.exists ? doc.data() : {};
      const progress = { ...(remote.progress || {}) }, versions = { ...(remote._keyVersions || {}) };
      SYNC_KEYS.forEach(key => {
        const version = Number(collected.versions[key] || 0);
        if (version > Number(versions[key] || 0) || (!(key in progress) && collected.data[key] !== null)) {
          progress[key] = collected.data[key]; versions[key] = version;
        }
      });
      transaction.set(ref, { progress, _keyVersions: versions, _updated: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
    });
  } catch (err) {
    console.error('Firestore sync error:', err);
  } finally { _isPushing = false; }
}

// ── Schedule debounced push ────────────────────────────────────────
function scheduleFirestoreSync() {
  if (_skipSync || syncTimer || !authUser || authUser.uid !== _activeOwner) return;
  syncTimer = setTimeout(function () {
    syncTimer = null;
    pushLocalToFirestore();
  }, SYNC_DELAY);
}

// ── localStorage write helpers ─────────────────────────────────────
function commitProgressBatch(changes, preferences = {}) {
  const keys = Object.keys(changes).filter(key => SYNC_KEYS.includes(key));
  const preferenceKeys = Object.keys(preferences).filter(key => ['active_tab', 'semester1_subtab', 'integrals_sections_state'].includes(key));
  const rollback = new Map([...keys, ...preferenceKeys, '_keyVersions', progressBucketKey(_activeOwner)].map(key => [key, localStorage.getItem(key)]));
  const versions = getKeyVersions();
  let changed = false;
  try {
    keys.forEach(key => {
      const value = changes[key];
      if (value !== null && typeof value !== 'string') throw new Error('Invalid serialized progress');
      if (localStorage.getItem(key) === value) return;
      value === null ? safeRemoveItem(key) : safeSetItem(key, value);
      if (!_skipSync) versions[key] = Math.max(Date.now(), Number(versions[key] || 0) + 1);
      changed = true;
    });
    preferenceKeys.forEach(key => safeSetItem(key, preferences[key]));
    if (!changed) return;
    safeSetItem('_keyVersions', JSON.stringify(versions));
    persistProgressOwner();
  } catch (error) {
    rollback.forEach((value, key) => { try { value === null ? localStorage.removeItem(key) : localStorage.setItem(key, value); } catch (_) {} });
    throw error;
  }
  if (!_skipSync) scheduleFirestoreSync();
}
function saveToStorage(key, value) {
  if (SYNC_KEYS.includes(key)) commitProgressBatch({ [key]: value }); else safeSetItem(key, value);
}
function removeFromStorage(key) {
  if (SYNC_KEYS.includes(key)) commitProgressBatch({ [key]: null }); else safeRemoveItem(key);
}

// ── Merge remote → local (per-key version comparison) ──────────────
function mergeRemoteData(remote) {
  var rp = remote.progress || {};
  var rv = remote._keyVersions || {};
  var lv = getKeyVersions();
  var merged = false;

  for (var j = 0; j < SYNC_KEYS.length; j++) {
    var k = SYNC_KEYS[j];
    if (rp[k] === undefined) continue;
    if (rp[k] !== null) {
      if (typeof rp[k] !== 'string') continue;
      try { JSON.parse(rp[k]); } catch (_) { continue; }
    }

    var remoteVer = rv[k] || 0;
    var localVer = lv[k] || 0;

    if (Number.isFinite(remoteVer) && remoteVer >= 0 && (remoteVer > localVer || (localVer === 0 && remoteVer === 0 && localStorage.getItem(k) !== rp[k]))) {
      if (rp[k] === null) safeRemoveItem(k); else safeSetItem(k, rp[k]);
      lv[k] = remoteVer;
      merged = true;
    }
  }

  if (merged) { safeSetItem('_keyVersions', JSON.stringify(lv)); persistProgressOwner(); }
  return merged;
}

// ── Reinit (with try/finally to prevent _skipSync leak) ───────────
function reinitApp() {
  const run = async () => {
  if (typeof _reinitCallback === 'function') {
    try {
      _skipSync = true;
      await _reinitCallback();
    } catch (e) {
      console.error('reinitApp callback error:', e);
      throw e;
    } finally {
      _skipSync = false;
    }
  } else {
    _pendingReinit = true;
  }
  };
  _reinitWork = _reinitWork.catch(error => console.error(error)).then(run);
  return _reinitWork;
}

function onReinit(cb) {
  _reinitCallback = cb;
  if (_pendingReinit) {
    _pendingReinit = false;
    reinitApp().catch(error => console.error('Deferred reinit failed:', error));
  }
}

// ── Firestore snapshot subscription ────────────────────────────────
function subscribeToFirestore(user) {
  if (_snapshotUnsub) { _snapshotUnsub(); _snapshotUnsub = null; }
  _firstSnapshotDone = false;
  _snapshotUnsub = db.collection('users').doc(user.uid).onSnapshot(async function (doc) {
    if (user.uid !== _activeOwner || authUser?.uid !== user.uid || !doc.exists || !doc.data().progress) return;

    var remote = doc.data();
    var remoteUpdated = remote._updated
      ? new Date(remote._updated.seconds * 1000).getTime()
      : 0;
    var localUpdated = parseInt(localStorage.getItem('sync_updated') || '0', 10);

    var merged = mergeRemoteData(remote);
    if (merged) {
      safeSetItem('sync_updated', remoteUpdated.toString());
      await reinitApp();
    }
  });
}

function unsubscribeFirestore() {
  if (_snapshotUnsub) { _snapshotUnsub(); _snapshotUnsub = null; }
}

// ── Auth handler ───────────────────────────────────────────────────
function handleAuth(user) {
  const epoch = ++_authEpoch, owner = user ? user.uid : 'guest';
  clearTimeout(syncTimer); syncTimer = null; unsubscribeFirestore();
  _authWork = _authWork.catch(error => console.error(error)).then(async () => {
    if (epoch !== _authEpoch) return;
    if (owner !== _activeOwner) {
      persistProgressOwner();
      const saved = readStoredJSON(progressBucketKey(owner), {});
      const rollback = new Map([...SYNC_KEYS, '_keyVersions', 'urfupobeda:progress-owner'].map(key => [key, localStorage.getItem(key)]));
      const previousOwner = _activeOwner;
      try {
        SYNC_KEYS.forEach(key => { const value = saved.data?.[key]; typeof value === 'string' ? safeSetItem(key, value) : safeRemoveItem(key); });
        safeSetItem('_keyVersions', JSON.stringify(saved.versions || {}));
        _activeOwner = owner; safeSetItem('urfupobeda:progress-owner', owner);
      } catch (error) {
        _activeOwner = previousOwner;
        rollback.forEach((value,key) => { try { value === null ? localStorage.removeItem(key) : localStorage.setItem(key,value); } catch (_) {} });
        throw error;
      }
      await reinitApp();
    } else { persistProgressOwner(); safeSetItem('urfupobeda:progress-owner', owner); }
    if (user && epoch === _authEpoch) await loadFromFirestore(user, epoch);
  });
  return _authWork;
}

// ── Load + merge on login ──────────────────────────────────────────
function loadFromFirestore(user, epoch = _authEpoch) {
  _isLoading = true;
  return db.collection('users').doc(user.uid).get().then(async function (doc) {
    _isLoading = false;
    if (epoch !== _authEpoch || user.uid !== _activeOwner || authUser?.uid !== user.uid) return;
    if (!doc.exists || !doc.data().progress) {
      await pushLocalToFirestore();
      if (epoch === _authEpoch) subscribeToFirestore(user);
      return;
    }
    var remote = doc.data();
    var remoteUpdated = remote._updated
      ? new Date(remote._updated.seconds * 1000).getTime()
      : 0;
    var localUpdated = parseInt(localStorage.getItem('sync_updated') || '0', 10);

    if (mergeRemoteData(remote)) {
      safeSetItem('sync_updated', remoteUpdated.toString());
      await reinitApp();
    }
    if (epoch !== _authEpoch) return;
    await pushLocalToFirestore();
    if (epoch === _authEpoch) subscribeToFirestore(user);
  }).catch(function (err) {
    _isLoading = false;
    console.error('Firestore load error:', err);
  });
}

async function importGuestProgress() {
  if (!authUser || authUser.uid !== _activeOwner) return;
  const guest = readStoredJSON(progressBucketKey('guest'), {});
  const changes = {};
  SYNC_KEYS.forEach(key => { if (typeof guest.data?.[key] === 'string') changes[key] = guest.data[key]; });
  if (!Object.keys(changes).length) { alert('Сохранение гостя пусто'); return; }
  if (!confirm('Заменить прогресс аккаунта сохранением гостя? Сохранение гостя останется доступно после выхода.')) return;
  commitProgressBatch(changes); await reinitApp();
}
