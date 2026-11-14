let authUser = null;
let _profileData = { avatar: '', group: '' };

(function injectAuthStyles() {
  var style = document.createElement('style');
  style.textContent = `
    .auth-container {
      position: relative;
      display: flex;
      align-items: center;
    }
    .auth-toggle {
      width: 40px; height: 40px; border-radius: 50%;
      background: var(--paper-alt); border: 2px solid var(--ring);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; font-size: 1.1rem; color: var(--ink, #333);
      transition: all .2s ease;
      box-shadow: 0 2px 8px var(--shadow);
      overflow: hidden;
    }
    .auth-toggle:hover { transform: scale(1.1); box-shadow: 0 4px 16px var(--shadow); }
    .auth-toggle.logged-in {
      width: auto; border-radius: 20px; padding: 4px 12px 4px 4px; gap: 8px;
      font-size: 0.75rem; font-family: var(--font-print);
    }
    .auth-toggle.logged-in:hover { transform: none; }
    .auth-toggle-avatar {
      width: 32px; height: 32px; border-radius: 50%;
      object-fit: cover; flex-shrink: 0;
    }
    .auth-toggle-initial {
      width: 32px; height: 32px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px; font-weight: bold; color: #fff; flex-shrink: 0;
    }
    .auth-dropdown {
      display: none;
      position: absolute; top: 48px; right: 0; z-index: 500;
      background: var(--paper); border: 1px solid var(--ring);
      border-radius: 12px; padding: 16px;
      box-shadow: 0 8px 32px var(--shadow);
      min-width: 260px;
      font-family: var(--font-print);
    }
    .auth-dropdown.open { display: block; }
    .auth-dropdown-title {
      font-size: 0.85rem; font-weight: bold; margin-bottom: 12px;
      color: var(--ink); font-family: var(--font-heading);
    }
    .auth-field {
      margin-bottom: 10px;
    }
    .auth-field label {
      display: block; font-size: 0.7rem; color: var(--pencil);
      margin-bottom: 3px; font-weight: 600;
    }
    .auth-field input {
      width: 100%; padding: 8px 10px; border: 1px solid var(--ring);
      border-radius: 8px; font-size: 0.8rem; font-family: var(--font-print);
      background: var(--paper-alt); color: var(--ink);
      outline: none; box-sizing: border-box;
      transition: border-color .2s;
    }
    .auth-field input:focus { border-color: var(--ink-blue); }
    .auth-actions {
      display: flex; gap: 8px; margin-top: 12px;
    }
    .auth-actions button {
      flex: 1; padding: 8px 0; border: none; border-radius: 8px;
      font-size: 0.75rem; font-weight: 600; cursor: pointer;
      font-family: var(--font-print); transition: all .2s;
    }
    .auth-btn-login {
      background: var(--ink-blue, #0033A0); color: #fff;
    }
    .auth-btn-login:hover { opacity: 0.85; }
    .auth-btn-register {
      background: transparent; color: var(--ink-blue, #0033A0);
      border: 1px solid var(--ink-blue, #0033A0) !important;
    }
    .auth-btn-register:hover { background: var(--ink-blue, #0033A0); color: #fff; }
    .auth-forgot {
      display: block; text-align: center; margin-top: 10px;
      font-size: 0.7rem; color: var(--ink-blue, #0033A0);
      cursor: pointer; text-decoration: none;
    }
    .auth-forgot:hover { text-decoration: underline; }
    .auth-error {
      font-size: 0.7rem; color: var(--ink-red, #c0392b);
      margin-top: 8px; min-height: 1em;
      word-break: break-word;
    }
    .auth-success {
      font-size: 0.7rem; color: #1a6e3a;
      margin-top: 8px; min-height: 1em;
    }
    .auth-user-info {
      display: flex; flex-direction: column; gap: 8px;
    }
    .auth-user-email {
      font-size: 0.75rem; color: var(--ink);
      max-width: 180px; overflow: hidden;
      text-overflow: ellipsis; white-space: nowrap;
    }
    .auth-user-actions {
      display: flex; gap: 6px; flex-wrap: wrap;
    }
    .auth-btn-profile {
      background: none; border: 1px solid var(--ink-blue, #0033A0);
      color: var(--ink-blue, #0033A0); border-radius: 6px;
      padding: 5px 10px; font-size: 0.7rem; cursor: pointer;
      font-family: var(--font-print); font-weight: 600;
      transition: all .2s;
    }
    .auth-btn-profile:hover {
      background: var(--ink-blue, #0033A0); color: #fff;
    }
    .auth-btn-logout {
      background: none; border: 1px solid var(--ink-red, #c0392b);
      color: var(--ink-red, #c0392b); border-radius: 6px;
      padding: 5px 10px; font-size: 0.7rem; cursor: pointer;
      font-family: var(--font-print); font-weight: 600;
      transition: all .2s;
    }
    .auth-btn-logout:hover {
      background: var(--ink-red, #c0392b); color: #fff;
    }

    /* ── Profile overlay ─────────────────────────────── */
    .profile-overlay {
      position: fixed; inset: 0; z-index: 1000;
      background: rgba(0,0,0,0.4);
      display: none; align-items: center; justify-content: center;
    }
    .profile-overlay.open { display: flex; }
    .profile-modal {
      background: var(--paper); color: var(--ink);
      border-radius: 16px; padding: 32px 36px;
      max-width: 440px; width: 90%;
      max-height: min(80vh, 560px); overflow-y: auto;
      box-shadow: 0 12px 48px var(--shadow);
      font-family: var(--font-print); position: relative;
    }
    .profile-modal::-webkit-scrollbar { width: 4px; }
    .profile-modal::-webkit-scrollbar-thumb { background: var(--ring); border-radius: 2px; }
    .profile-close {
      font-size: 1.1rem; cursor: pointer; opacity: 0.4;
      position: absolute; top: 14px; right: 18px;
      background: none; border: none; color: var(--ink);
      transition: opacity .2s; line-height: 1;
    }
    .profile-close:hover { opacity: 0.8; }
    .profile-modal h2 {
      font-size: 1rem; margin: 0 0 20px 0;
      font-family: var(--font-heading); letter-spacing: 0.5px;
    }
    .profile-avatar-section {
      display: flex; align-items: center; gap: 16px; margin-bottom: 20px;
    }
    .profile-avatar-wrap {
      position: relative; width: 72px; height: 72px; flex-shrink: 0;
    }
    .profile-avatar-img {
      width: 72px; height: 72px; border-radius: 50%;
      object-fit: cover; border: 2px solid var(--ring);
    }
    .profile-avatar-placeholder {
      width: 72px; height: 72px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 28px; font-weight: bold; color: #fff;
      border: 2px solid var(--ring);
    }
    .profile-avatar-edit {
      position: absolute; bottom: 0; right: 0;
      width: 24px; height: 24px; border-radius: 50%;
      background: var(--ink-blue, #0033A0); color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; cursor: pointer; border: 2px solid var(--paper);
    }
    .profile-avatar-edit:hover { opacity: 0.8; }
    .profile-avatar-remove {
      position: absolute; top: 0; right: 0;
      width: 20px; height: 20px; border-radius: 50%;
      background: var(--ink-red, #c0392b); color: #fff;
      display: none; align-items: center; justify-content: center;
      font-size: 10px; cursor: pointer; border: 2px solid var(--paper);
    }
    .profile-avatar-wrap:hover .profile-avatar-remove { display: flex; }
    .profile-email {
      font-size: 0.8rem; color: var(--pencil);
    }
    .profile-field {
      margin-bottom: 14px;
    }
    .profile-field label {
      display: block; font-size: 0.7rem; color: var(--pencil);
      margin-bottom: 4px; font-weight: 600;
    }
    .profile-field input {
      width: 100%; padding: 8px 10px; border: 1px solid var(--ring);
      border-radius: 8px; font-size: 0.8rem; font-family: var(--font-print);
      background: var(--paper-alt); color: var(--ink);
      outline: none; box-sizing: border-box;
    }
    .profile-field input:focus { border-color: var(--ink-blue); }
    .profile-section-title {
      font-size: 0.75rem; font-weight: bold; color: var(--ink);
      margin: 16px 0 10px; padding-top: 12px;
      border-top: 1px solid var(--ring);
      font-family: var(--font-heading);
    }
    .profile-stats {
      display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
    }
    .profile-stat-card {
      background: var(--paper-alt); border-radius: 10px;
      padding: 12px; text-align: center;
      border: 1px solid var(--ring);
    }
    .profile-stat-value {
      font-size: 1.4rem; font-weight: bold; color: var(--ink-blue, #0033A0);
    }
    .profile-stat-label {
      font-size: 0.65rem; color: var(--pencil); margin-top: 2px;
    }
    .profile-save-row {
      display: flex; gap: 8px; margin-top: 18px;
    }
    .profile-save-row button {
      flex: 1; padding: 9px 0; border: none; border-radius: 8px;
      font-size: 0.75rem; font-weight: 600; cursor: pointer;
      font-family: var(--font-print); transition: all .2s;
    }
    .profile-btn-save {
      background: var(--ink-blue, #0033A0); color: #fff;
    }
    .profile-btn-save:hover { opacity: 0.85; }
    .profile-btn-cancel {
      background: transparent; color: var(--pencil);
      border: 1px solid var(--ring) !important;
    }
    .profile-btn-cancel:hover { background: var(--paper-alt); }
    .profile-msg {
      font-size: 0.7rem; margin-top: 10px; min-height: 1em;
    }
    .profile-msg.ok { color: #1a6e3a; }
    .profile-msg.err { color: var(--ink-red, #c0392b); }

    @media (max-width: 420px) {
      .auth-dropdown { min-width: 220px; right: -10px; }
      .profile-modal { padding: 20px 18px; }
      .profile-stats { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);
})();

/* ── Helper: color from string ────────────────────── */
function _stringToColor(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var h = Math.abs(hash) % 360;
  return 'hsl(' + h + ', 55%, 45%)';
}

/* ── Auth container / toggle / dropdown ───────────── */
function getAuthContainer() {
  var c = document.getElementById('auth-container');
  if (!c) {
    c = document.createElement('div');
    c.id = 'auth-container';
    c.className = 'auth-container';
    var h = document.querySelector('.header-buttons');
    if (h) h.insertBefore(c, h.firstChild);
  }
  return c;
}

function getAuthToggle() {
  var btn = document.getElementById('auth-toggle');
  if (!btn) {
    btn = document.createElement('div');
    btn.id = 'auth-toggle';
    btn.className = 'auth-toggle';
    btn.innerHTML = '&#128100;';
    btn.title = 'Войти';
    btn.onclick = function (e) { e.stopPropagation(); toggleAuthDropdown(); };
    getAuthContainer().appendChild(btn);
  }
  return btn;
}

function getAuthDropdown() {
  var dd = document.getElementById('auth-dropdown');
  if (!dd) {
    dd = document.createElement('div');
    dd.id = 'auth-dropdown';
    dd.className = 'auth-dropdown';
    getAuthContainer().appendChild(dd);
  }
  return dd;
}

function toggleAuthDropdown() {
  var dd = getAuthDropdown();
  if (dd.classList.contains('open')) {
    dd.classList.remove('open');
  } else {
    dd.classList.add('open');
    var ei = dd.querySelector('#auth-email');
    if (ei) ei.focus();
  }
}

function closeAuthDropdown() {
  var dd = document.getElementById('auth-dropdown');
  if (dd) dd.classList.remove('open');
}

/* ── Auth form HTML ───────────────────────────────── */
function buildAuthFormHTML() {
  return '' +
    '<div class="auth-dropdown-title">Вход / Регистрация</div>' +
    '<div class="auth-field">' +
      '<label for="auth-email">Email</label>' +
      '<input type="email" id="auth-email" placeholder="you@example.com" autocomplete="email">' +
    '</div>' +
    '<div class="auth-field">' +
      '<label for="auth-pass">Пароль</label>' +
      '<input type="password" id="auth-pass" placeholder="Минимум 6 символов" autocomplete="current-password">' +
    '</div>' +
    '<div class="auth-actions">' +
      '<button class="auth-btn-login" onclick="signInWithEmail()">Войти</button>' +
      '<button class="auth-btn-register" onclick="registerWithEmail()">Регистрация</button>' +
    '</div>' +
    '<a class="auth-forgot" onclick="resetPassword()">Забыли пароль?</a>' +
    '<div class="auth-error" id="auth-error"></div>';
}

function buildUserInfoHTML(user) {
  var email = user.email || 'Пользователь';
  return '' +
    '<div class="auth-dropdown-title">Вы вошли</div>' +
    '<div class="auth-user-info">' +
      '<div class="auth-user-email" title="' + escapeHTML(email) + '">' + escapeHTML(email) + '</div>' +
      '<div class="auth-user-actions">' +
        '<button class="auth-btn-profile" onclick="openProfile()">Профиль</button>' +
        '<button class="auth-btn-logout" onclick="signOutUser()">Выйти</button>' +
      '</div>' +
    '</div>';
}

/* ── Update toggle button (avatar or initial) ────── */
function _updateToggleAvatar(user) {
  var toggle = getAuthToggle();
  if (!user) return;
  var p = _profileData;
  if (p.avatar) {
    toggle.innerHTML = '<img class="auth-toggle-avatar" src="' + escapeHTML(p.avatar) + '" alt="">';
  } else {
    var initial = (user.email || 'U').charAt(0).toUpperCase();
    var color = _stringToColor(user.email || 'user');
    toggle.innerHTML = '<div class="auth-toggle-initial" style="background:' + color + '">' + escapeHTML(initial) + '</div>';
  }
}

function updateAuthUI(user) {
  var toggle = getAuthToggle();
  var dd = getAuthDropdown();

  if (user) {
    toggle.classList.add('logged-in');
    toggle.title = '';
    _updateToggleAvatar(user);
    toggle.insertAdjacentHTML('beforeend', ' <span>' + escapeHTML((user.email || '').split('@')[0]) + '</span>');
    dd.innerHTML = buildUserInfoHTML(user);
  } else {
    toggle.classList.remove('logged-in');
    toggle.innerHTML = '&#128100;';
    toggle.title = 'Войти';
    dd.innerHTML = buildAuthFormHTML();
  }
}

/* ── Auth messages ────────────────────────────────── */
function showAuthError(msg) {
  var el = document.getElementById('auth-error');
  if (el) { el.className = 'auth-error'; el.textContent = msg; }
}
function showAuthSuccess(msg) {
  var el = document.getElementById('auth-error');
  if (el) { el.className = 'auth-success'; el.textContent = msg; }
}
function clearAuthMessages() {
  var el = document.getElementById('auth-error');
  if (el) { el.className = 'auth-error'; el.textContent = ''; }
}

/* ── Sign in ──────────────────────────────────────── */
function signInWithEmail() {
  var email = (document.getElementById('auth-email') || {}).value || '';
  var pass = (document.getElementById('auth-pass') || {}).value || '';
  clearAuthMessages();
  if (!email || !pass) { showAuthError('Введите email и пароль'); return; }

  auth.signInWithEmailAndPassword(email, pass).catch(function (error) {
    console.error('[auth] signIn error:', error.code);
    var msg = 'Ошибка входа';
    if (error.code === 'auth/user-not-found') msg = 'Пользователь не найден';
    else if (error.code === 'auth/wrong-password') msg = 'Неверный пароль';
    else if (error.code === 'auth/invalid-email') msg = 'Некорректный email';
    else if (error.code === 'auth/too-many-requests') msg = 'Слишком много попыток. Подождите';
    else if (error.code === 'auth/invalid-credential') msg = 'Неверный email или пароль';
    else msg = error.message;
    showAuthError(msg);
  });
}

/* ── Register ─────────────────────────────────────── */
function registerWithEmail() {
  var email = (document.getElementById('auth-email') || {}).value || '';
  var pass = (document.getElementById('auth-pass') || {}).value || '';
  clearAuthMessages();
  if (!email || !pass) { showAuthError('Введите email и пароль'); return; }
  if (pass.length < 6) { showAuthError('Пароль должен быть минимум 6 символов'); return; }

  auth.createUserWithEmailAndPassword(email, pass).catch(function (error) {
    console.error('[auth] register error:', error.code);
    var msg = 'Ошибка регистрации';
    if (error.code === 'auth/email-already-in-use') msg = 'Этот email уже зарегистрирован';
    else if (error.code === 'auth/invalid-email') msg = 'Некорректный email';
    else if (error.code === 'auth/weak-password') msg = 'Слишком слабый пароль';
    else msg = error.message;
    showAuthError(msg);
  });
}

/* ── Password reset ───────────────────────────────── */
function resetPassword() {
  var email = (document.getElementById('auth-email') || {}).value || '';
  clearAuthMessages();
  if (!email) {
    showAuthError('Введите email выше и нажмите «Забыли пароль?» ещё раз');
    return;
  }
  auth.sendPasswordResetEmail(email).then(function () {
    showAuthSuccess('Письмо для сброса пароля отправлено на ' + email);
  }).catch(function (error) {
    console.error('[auth] reset error:', error.code);
    var msg = 'Не удалось отправить письмо';
    if (error.code === 'auth/user-not-found') msg = 'Пользователь с таким email не найден';
    else if (error.code === 'auth/invalid-email') msg = 'Некорректный email';
    else msg = error.message;
    showAuthError(msg);
  });
}

/* ── Sign out ─────────────────────────────────────── */
function signOutUser() {
  closeAuthDropdown();
  closeProfile();
  auth.signOut();
}

/* ══════════════════════════════════════════════════════
   PROFILE
   ══════════════════════════════════════════════════════ */

/* ── Profile data load/save (localStorage + Firestore) ── */
function _profileKey() {
  return authUser ? ('_profile_' + authUser.uid) : null;
}

function loadProfileData() {
  var key = _profileKey();
  if (!key) return;
  try {
    var raw = localStorage.getItem(key);
    _profileData = { avatar: '', group: '' };
    if (raw) { const value = readStoredJSON(key, {}); _profileData = { avatar: typeof value.avatar === 'string' ? value.avatar : '', group: typeof value.group === 'string' ? value.group : '' }; }
  } catch (e) {}
}

function saveProfileData() {
  var key = _profileKey();
  if (!key || !authUser) return;
  localStorage.setItem(key, JSON.stringify(_profileData));
  if (typeof db !== 'undefined') {
    db.collection('users').doc(authUser.uid).set({
      profile: _profileData
    }, { merge: true }).catch(function (e) {
      console.error('[profile] Firestore save error:', e);
    });
  }
}

function loadProfileFromFirestore(user) {
  if (!user || typeof db === 'undefined') return;
  db.collection('users').doc(user.uid).get().then(function (doc) {
    if (authUser?.uid !== user.uid) return;
    if (doc.exists && doc.data().profile) {
      var remote = doc.data().profile;
      var local = _profileData;
      var merged = false;
      if (typeof remote.avatar === 'string' && remote.avatar && (!local.avatar || remote.avatar.length > local.avatar.length)) {
        _profileData.avatar = remote.avatar;
        merged = true;
      }
      if (typeof remote.group === 'string' && (!local.group || remote.group.length > local.group.length)) {
        _profileData.group = remote.group;
        merged = true;
      }
      if (merged) {
        var key = _profileKey();
        if (key) localStorage.setItem(key, JSON.stringify(_profileData));
        if (authUser) _updateToggleAvatar(authUser);
      }
    }
  }).catch(function (e) {
    console.warn('[profile] Firestore load error:', e.message);
  });
}

/* ── Progress stats ───────────────────────────────── */
function _getProgressStats() {
  const count = (key, valid) => { const values = readStoredJSON(key, {}); return [...valid].filter(k => values[k] === true || values[k] === 1).length; };
  const taskKeys = groups => new Set(Array.from({length:groups.reduce((n,g)=>n+g.tasks.length,0)},(_,i)=>String(i+1)));
  const practice = typeof examTasksData === 'undefined' ? new Set() : taskKeys(examTasksData);
  const control = typeof typeConfig === 'undefined' ? new Set() : taskKeys(typeConfig);
  const physics = new Set();
  if (typeof PHYSICS_NTK_DATA !== 'undefined') PHYSICS_NTK_DATA.forEach(s=>s.problems.forEach((_,i)=>physics.add(`${s.id}_${i}`)));
  const integrals = new Set();
  if (typeof INTEGRALS_DATA !== 'undefined') Object.entries(INTEGRALS_DATA).forEach(([s,tasks])=>tasks.forEach((_,i)=>integrals.add(`s${s.replace('section','')}_t${i}`)));
  const done = key => readStoredJSON(key, []).filter(t=>t && t.step>=5).length;
  const probability = readStoredJSON('probability_progress_v1', {});
  return {
    tickets_total: (typeof ticketsData === 'undefined' ? 0 : ticketsData.length) + (typeof SEMESTER1_DATA === 'undefined' ? 0 : SEMESTER1_DATA.length),
    tickets_done: done('exam_manager_v9') + done('semester1_progress'),
    probability_total: typeof PROBABILITY_DATA === 'undefined' ? 0 : PROBABILITY_DATA.tickets.length,
    probability_done: Object.values(probability.tickets || {}).filter(t=>t?.step>=5).length,
    tasks_total:practice.size,tasks_done:count('exam_tasks_progress',practice),
    kr_total:control.size,kr_done:count('kr_progress',control),
    physics_total:physics.size,physics_done:count('physics_progress',physics),
    integrals_total:integrals.size,integrals_done:count('integrals_progress',integrals)
  };
}

async function openProfile() {
  if (!authUser) return;
  const uid = authUser.uid;
  try { await Promise.all(['semester1','probability','examTasks','controlWork','physics','integrals'].map(k=>window.DataLoader.load(k))); } catch (error) { console.error(error); alert('Не удалось загрузить статистику. Попробуйте позже.'); return; }
  if (authUser?.uid !== uid) return;
  closeAuthDropdown();
  if (!authUser) return;

  loadProfileData();
  var p = _profileData;
  var s = _getProgressStats();
  var email = authUser.email || '';
  var color = _stringToColor(email);
  var initial = email.charAt(0).toUpperCase();

  var avatarSection = '';
  if (p.avatar) {
    avatarSection =
      '<div class="profile-avatar-wrap">' +
        '<img class="profile-avatar-img" src="' + escapeHTML(p.avatar) + '" alt="Аватар">' +
        '<label class="profile-avatar-edit" title="Изменить аватар">&#128247;' +
          '<input type="file" accept="image/*" style="display:none" onchange="handleAvatarUpload(event)">' +
        '</label>' +
        '<div class="profile-avatar-remove" onclick="removeAvatar()" title="Удалить аватар">&#10005;</div>' +
      '</div>';
  } else {
    avatarSection =
      '<div class="profile-avatar-wrap">' +
        '<div class="profile-avatar-placeholder" style="background:' + color + '">' + escapeHTML(initial) + '</div>' +
        '<label class="profile-avatar-edit" title="Загрузить аватар">&#128247;' +
          '<input type="file" accept="image/*" style="display:none" onchange="handleAvatarUpload(event)">' +
        '</label>' +
      '</div>';
  }

  var html =
    '<div class="profile-modal">' +
      '<button class="profile-close" onclick="closeProfile()">&#10005;</button>' +
      '<h2>Профиль</h2>' +
      '<div class="profile-avatar-section">' +
        avatarSection +
        '<div class="profile-email">' + escapeHTML(email) + '</div>' +
      '</div>' +
      '<div class="profile-field">' +
        '<label for="profile-group">Группа</label>' +
        '<input type="text" id="profile-group" placeholder="Например: БИ-2401" value="' + escapeHTML(p.group || '') + '">' +
      '</div>' +
      '<div class="profile-section-title">Прогресс</div>' +
      '<div class="profile-stats">' +
        _statCard(s.probability_done, s.probability_total, '\u0422\u0435\u043e\u0440\u0438\u044f \u0432\u0435\u0440\u043e\u044f\u0442\u043d\u043e\u0441\u0442\u0435\u0439') +
        _statCard(s.tickets_done, s.tickets_total, 'Билеты АГиТДУ') +
        _statCard(s.tasks_done, s.tasks_total, 'Задачи экзамена') +
        _statCard(s.kr_done, s.kr_total, 'Контрольная работа') +
        _statCard(s.physics_done, s.physics_total, 'Физика НТК') +
        _statCard(s.integrals_done, s.integrals_total, 'Интегралы') +
      '</div>' +
      '<div class="profile-section-title">Вклад</div>' +
      '<div style="font-size:0.75rem; color:var(--pencil); padding:8px 0;">' +
        'Раздел «Вклад» будет доступен после добавления загрузки конспектов.' +
      '</div>' +
      '<button class="profile-btn-cancel" onclick="importGuestProgress()">\u041f\u0435\u0440\u0435\u043d\u0435\u0441\u0442\u0438 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441 \u0433\u043e\u0441\u0442\u044f</button>' +
      '<div class="profile-save-row">' +
        '<button class="profile-btn-cancel" onclick="closeProfile()">Закрыть</button>' +
        '<button class="profile-btn-save" onclick="saveProfile()">Сохранить</button>' +
      '</div>' +
      '<div class="profile-msg" id="profile-msg"></div>' +
    '</div>';

  var overlay = document.getElementById('profile-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'profile-overlay';
    overlay.className = 'profile-overlay';
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeProfile();
    });
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = html;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function _statCard(done, total, label) {
  var pct = total > 0 ? Math.round(done / total * 100) : 0;
  return '' +
    '<div class="profile-stat-card">' +
      '<div class="profile-stat-value">' + done + ' / ' + total + '</div>' +
      '<div class="profile-stat-label">' + label + ' (' + pct + '%)</div>' +
    '</div>';
}

function closeProfile() {
  var overlay = document.getElementById('profile-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function saveProfile() {
  var groupInput = document.getElementById('profile-group');
  if (groupInput) _profileData.group = groupInput.value.trim();
  saveProfileData();
  if (authUser) _updateToggleAvatar(authUser);

  var msg = document.getElementById('profile-msg');
  if (msg) {
    msg.className = 'profile-msg ok';
    msg.textContent = 'Профиль сохранён';
    setTimeout(function () { msg.textContent = ''; }, 3000);
  }
}

/* ── Avatar upload ────────────────────────────────── */
function handleAvatarUpload(event) {
  var file = event.target.files[0];
  if (!file) return;
  if (file.size > 512 * 1024) {
    var msg = document.getElementById('profile-msg');
    if (msg) { msg.className = 'profile-msg err'; msg.textContent = 'Файл слишком большой (макс. 500 КБ)'; }
    return;
  }
  var reader = new FileReader();
  reader.onload = function (e) {
    var img = new Image();
    img.onload = function () {
      var canvas = document.createElement('canvas');
      var SIZE = 200;
      canvas.width = SIZE;
      canvas.height = SIZE;
      var ctx = canvas.getContext('2d');
      var side = Math.min(img.width, img.height);
      var sx = (img.width - side) / 2;
      var sy = (img.height - side) / 2;
      ctx.drawImage(img, sx, sy, side, side, 0, 0, SIZE, SIZE);
      _profileData.avatar = canvas.toDataURL('image/jpeg', 0.7);
      openProfile();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function removeAvatar() {
  _profileData.avatar = '';
  saveProfileData();
  if (authUser) _updateToggleAvatar(authUser);
  openProfile();
}

/* ══════════════════════════════════════════════════════
   CHANGELOG
   ══════════════════════════════════════════════════════ */

var CHANGELOG = [
  'v1.3 — 20.08.2026',
  'Восстановление пароля по email',
  'Профиль: аватарка, группа, прогресс',
  '',
  'v1.2 — 20.08.2026',
  'Авторизация по логину и паролю (вместо Google)',
  '',
  'v1.1 — 31.05.2026',
  'Добавлены задачи для подготовки к НТК по физике',
  '',
  'v1.0 — 26.05.2026',
  'Автоматическая синхронизация между устройствами',
  'Бесшовный мерж — данные подтягиваются без перезагрузки',
  '',
  'v0.9 — 12.04.2026',
  '29 билетов с подробными конспектами',
  'Система интервальных повторений',
  'Отслеживание прогресса по билетам',
  'Контрольная работа с задачами',
  'Режим экзаменационных задач',
  'Интегралы для тренировки',
  'Тёмная тема',
  'Ручное сохранение и загрузка прогресса',
  'Боковое меню с содержанием',
  'Адаптивная вёрстка (мобильные)'
];

function buildChangelogHTML() {
  var items = '';
  for (var i = 0; i < CHANGELOG.length; i++) {
    var line = CHANGELOG[i];
    if (line === '') {
      items += '<hr class="changelog-divider">';
    } else if (/^v\d/.test(line)) {
      items += '<li class="changelog-version">' + line + '</li>';
    } else {
      items += '<li>' + line + '</li>';
    }
  }
  return '<div class="changelog-modal">' +
    '<button class="changelog-close" onclick="closeChangelog()">&#10005;</button>' +
    '<div class="changelog-header"><h2>Что нового</h2></div>' +
    '<ul>' + items + '</ul>' +
    '</div>';
}

function showChangelog() {
  var overlay = document.getElementById('changelog-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'changelog-overlay';
    overlay.className = 'changelog-overlay';
    overlay.innerHTML = buildChangelogHTML();
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeChangelog();
    });
  }
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeChangelog() {
  var overlay = document.getElementById('changelog-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function getChangelogBtn() {
  var btn = document.getElementById('changelog-btn');
  if (!btn) {
    btn = document.createElement('div');
    btn.id = 'changelog-btn';
    btn.className = 'changelog-btn';
    btn.textContent = 'v1.3';
    btn.title = 'Что нового';
    btn.onclick = function (e) { e.stopPropagation(); showChangelog(); };
    var h = document.querySelector('.header-buttons');
    if (h) h.insertBefore(btn, h.firstChild);
  }
  return btn;
}

/* ══════════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════════ */

function initAuth() {
  console.log('[auth] initAuth started');
  try {
    getAuthContainer();
    getAuthToggle();
    getAuthDropdown();
    getChangelogBtn();

    document.addEventListener('click', function (e) {
      var c = document.getElementById('auth-container');
      if (c && !c.contains(e.target)) closeAuthDropdown();
    });

    auth.languageCode = 'ru';

    if (auth.currentUser) {
      console.log('[auth] currentUser (sync):', auth.currentUser.email);
      authUser = auth.currentUser;
      loadProfileData();
      updateAuthUI(auth.currentUser);
      loadProfileFromFirestore(auth.currentUser);
      if (typeof handleAuth === 'function') handleAuth(auth.currentUser);
    }

    auth.onAuthStateChanged(function (user) {
      console.log('[auth] onAuthStateChanged:', user ? user.email : 'null');
      authUser = user;
      if (user) {
        loadProfileData();
        loadProfileFromFirestore(user);
      } else {
        _profileData = { avatar: '', group: '' };
      }
      updateAuthUI(user);
      if (typeof handleAuth === 'function') handleAuth(user);
    });
  } catch (e) {
    console.error('[auth] initAuth error:', e);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuth);
} else {
  initAuth();
}
