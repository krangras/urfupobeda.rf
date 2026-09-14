(() => {
  'use strict';

  const SEARCH_ID = 'sidebar-search';
  const FILTER_PREFIX = 'urfupobeda:filter:v5:';
  const NOTES_PAGE = 'https://krangras.github.io/notes/linear-algebra-1.html';
  const NOTES_BASE = 'https://krangras.github.io/notes/assets/linear-algebra-sem1/';
  const NOTES_RAW = 'https://raw.githubusercontent.com/krangras/notes/main/assets/linear-algebra-sem1/';

  // data-idx in semester1_data.js -> images from the full notes site.
  const FIGURES = {
    2: [['01-complex-modulus-argument.svg', '\u0413\u0435\u043e\u043c\u0435\u0442\u0440\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0441\u043c\u044b\u0441\u043b \u043c\u043e\u0434\u0443\u043b\u044f \u0438 \u0430\u0440\u0433\u0443\u043c\u0435\u043d\u0442\u0430 \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0441\u043d\u043e\u0433\u043e \u0447\u0438\u0441\u043b\u0430']],
    4: [['02-determinant-order-2.svg', '\u041e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u0442\u0435\u043b\u044c \u0432\u0442\u043e\u0440\u043e\u0433\u043e \u043f\u043e\u0440\u044f\u0434\u043a\u0430'], ['03-sarrus-rule.svg', '\u041f\u0440\u0430\u0432\u0438\u043b\u043e \u0421\u0430\u0440\u0440\u044e\u0441\u0430']],
    9: [['04-vector-basis-decomposition.svg', '\u0420\u0430\u0437\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0432\u0435\u043a\u0442\u043e\u0440\u0430 \u043f\u043e \u0431\u0430\u0437\u0438\u0441\u0443']],
    10: [['06-right-left-triples.svg', '\u041f\u0440\u0430\u0432\u0430\u044f \u0438 \u043b\u0435\u0432\u0430\u044f \u0442\u0440\u043e\u0439\u043a\u0438 \u0432\u0435\u043a\u0442\u043e\u0440\u043e\u0432'], ['05-vector-product-area.svg', '\u0413\u0435\u043e\u043c\u0435\u0442\u0440\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0441\u043c\u044b\u0441\u043b \u0432\u0435\u043a\u0442\u043e\u0440\u043d\u043e\u0433\u043e \u043f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u0438\u044f']],
    12: [['07-mixed-product-geometry.svg', '\u041f\u0430\u0440\u0430\u043b\u043b\u0435\u043b\u0435\u043f\u0438\u043f\u0435\u0434 \u0438 \u043f\u0438\u0440\u0430\u043c\u0438\u0434\u0430, \u043f\u043e\u0441\u0442\u0440\u043e\u0435\u043d\u043d\u044b\u0435 \u043d\u0430 \u0442\u0440\u0451\u0445 \u0432\u0435\u043a\u0442\u043e\u0440\u0430\u0445']],
    14: [['08-line-normal-vector.svg', '\u041d\u043e\u0440\u043c\u0430\u043b\u044c\u043d\u044b\u0439 \u0432\u0435\u043a\u0442\u043e\u0440 \u043f\u0440\u044f\u043c\u043e\u0439']],
    15: [['09-point-to-line-distance.svg', '\u0420\u0430\u0441\u0441\u0442\u043e\u044f\u043d\u0438\u0435 \u043e\u0442 \u0442\u043e\u0447\u043a\u0438 \u0434\u043e \u043f\u0440\u044f\u043c\u043e\u0439'], ['10-parallel-lines-distance.svg', '\u0420\u0430\u0441\u0441\u0442\u043e\u044f\u043d\u0438\u0435 \u043c\u0435\u0436\u0434\u0443 \u043f\u0430\u0440\u0430\u043b\u043b\u0435\u043b\u044c\u043d\u044b\u043c\u0438 \u043f\u0440\u044f\u043c\u044b\u043c\u0438']],
    16: [['11-ellipse-foci.svg', '\u042d\u043b\u043b\u0438\u043f\u0441 \u0438 \u0435\u0433\u043e \u0444\u043e\u043a\u0443\u0441\u044b'], ['12-ellipse-canonical.svg', '\u041a\u0430\u043d\u043e\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0447\u0435\u0440\u0442\u0451\u0436 \u044d\u043b\u043b\u0438\u043f\u0441\u0430']],
    17: [['13-hyperbola-foci.svg', '\u0413\u0438\u043f\u0435\u0440\u0431\u043e\u043b\u0430 \u0438 \u0435\u0451 \u0444\u043e\u043a\u0443\u0441\u044b'], ['14-hyperbola-canonical.svg', '\u041a\u0430\u043d\u043e\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0447\u0435\u0440\u0442\u0451\u0436 \u0433\u0438\u043f\u0435\u0440\u0431\u043e\u043b\u044b']],
    18: [['15-parabola-focus-directrix.svg', '\u041f\u0430\u0440\u0430\u0431\u043e\u043b\u0430, \u0444\u043e\u043a\u0443\u0441 \u0438 \u0434\u0438\u0440\u0435\u043a\u0442\u0440\u0438\u0441\u0430'], ['16-parabola-canonical.svg', '\u041a\u0430\u043d\u043e\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0447\u0435\u0440\u0442\u0451\u0436 \u043f\u0430\u0440\u0430\u0431\u043e\u043b\u044b']]
  };

  const normalize = (s) => String(s || '').toLocaleLowerCase('ru-RU').replace(/\u0451/g, '\u0435').replace(/\s+/g, ' ').trim();
  const setText = (el, text) => { if (el && el.textContent !== text) el.textContent = text; };
  const setHtml = (el, html) => { if (el && el.innerHTML !== html) el.innerHTML = html; };

  // Repair classic UTF-8 -> Windows-1252 mojibake without touching already-correct Russian.
  const cp1252 = new Map([
    [0x20ac,0x80],[0x201a,0x82],[0x0192,0x83],[0x201e,0x84],[0x2026,0x85],[0x2020,0x86],[0x2021,0x87],[0x02c6,0x88],[0x2030,0x89],
    [0x0160,0x8a],[0x2039,0x8b],[0x0152,0x8c],[0x017d,0x8e],[0x2018,0x91],[0x2019,0x92],[0x201c,0x93],[0x201d,0x94],[0x2022,0x95],
    [0x2013,0x96],[0x2014,0x97],[0x02dc,0x98],[0x2122,0x99],[0x0161,0x9a],[0x203a,0x9b],[0x0153,0x9c],[0x017e,0x9e],[0x0178,0x9f]
  ]);
  const cpRun = /[\x00-\xFF\u0152\u0153\u0160\u0161\u0178\u017D\u017E\u0192\u02C6\u02DC\u2013\u2014\u2018\u2019\u201A\u201C\u201D\u201E\u2020\u2021\u2022\u2026\u2030\u2039\u203A\u20AC\u2122]+/g;
  const markerScore = (s) => (s.match(/[\xc3\xc2\xd0\xd1\xe2]/g) || []).length + (s.match(/(?:\xd0.|\xd1.)/g) || []).length;

  function decodeCp1252Utf8(run) {
    if (!/[\xc3\xc2\xd0\xd1\xe2]/.test(run)) return run;
    const bytes = [];
    for (const ch of run) {
      const cp = ch.codePointAt(0);
      if (cp <= 255) bytes.push(cp);
      else if (cp1252.has(cp)) bytes.push(cp1252.get(cp));
      else return run;
    }
    try {
      const decoded = new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(bytes));
      if (!decoded || decoded.includes('\uFFFD') || markerScore(decoded) >= markerScore(run)) return run;
      return decoded;
    } catch (_) {
      return run;
    }
  }

  function repairText(value) {
    let out = String(value || '');
    for (let i = 0; i < 3; i += 1) {
      const next = out.replace(cpRun, decodeCp1252Utf8);
      if (next === out) break;
      out = next;
    }
    return out;
  }

  function repairMojibake(root = document.body) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const p = node.parentElement;
        if (!p || ['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE', 'PRE'].includes(p.tagName)) return NodeFilter.FILTER_REJECT;
        return /[\xc3\xc2\xd0\xd1\xe2]/.test(node.nodeValue || '') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => { node.nodeValue = repairText(node.nodeValue); });
    root.querySelectorAll?.('[title],[placeholder],[aria-label]').forEach((el) => {
      ['title', 'placeholder', 'aria-label'].forEach((attr) => {
        const value = el.getAttribute(attr);
        if (value && /[\xc3\xc2\xd0\xd1\xe2]/.test(value)) el.setAttribute(attr, repairText(value));
      });
    });
  }

  function forceStaticLabels() {
    setText(document.querySelector('.hero-subtitle'), '\u041f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u0430 \u043a \u044d\u043a\u0437\u0430\u043c\u0435\u043d\u0430\u043c');
    setText(document.querySelector('.sidebar-pin-label'), '\u041d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044f');
    setText(document.querySelector('.sidebar-progress-label'), '\u041f\u0440\u043e\u0433\u0440\u0435\u0441\u0441');

    const paddedTitles = document.querySelectorAll('.sidebar-content-inner > div[style*="padding-left"] .sidebar-section-title');
    setText(paddedTitles[0], '\u0422\u0435\u043e\u0440\u0438\u044f \xb7 2 \u0441\u0435\u043c\u0435\u0441\u0442\u0440');
    setText(paddedTitles[1], '\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0430');

    const sections = Array.from(document.querySelectorAll('.sidebar-archive-section'));
    if (sections[0]) sections[0].classList.add('ux-remove-section');
    if (sections[1]) {
      sections[1].classList.add('ux-archive-section');
      setText(sections[1].querySelector('.sidebar-section-title'), '\u0410\u0440\u0445\u0438\u0432');
      const control = sections[1].querySelector('.sidebar-item:not(.ux-archive-practice)');
      setText(control, '\u041a\u043e\u043d\u0442\u0440\u043e\u043b\u044c\u043d\u0430\u044f \u0410\u0413\u0438\u0422\u0414\u0423 \xb7 2 \u0441\u0435\u043c\u0435\u0441\u0442\u0440');
    }
    if (sections[2]) {
      sections[2].classList.add('ux-sem1-section');
      setText(sections[2].querySelector('.sidebar-section-title'), '1 \u0441\u0435\u043c\u0435\u0441\u0442\u0440');
      const items = sections[2].querySelectorAll('.sidebar-item');
      setText(items[0], '\u0410\u043b\u0433\u0435\u0431\u0440\u0430, \u0433\u0435\u043e\u043c\u0435\u0442\u0440\u0438\u044f \u0438 \u0422\u0414\u0423');
      setText(items[1], '\u041c\u0430\u0442\u0435\u043c\u0430\u0442\u0438\u043a\u0430 \xb7 \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u043b\u044b');
      setText(items[2], '\u0414\u0438\u0441\u043a\u0440\u0435\u0442\u043d\u0430\u044f \u043c\u0430\u0442\u0435\u043c\u0430\u0442\u0438\u043a\u0430');
    }

    const toolbar = document.querySelector('#exam-pane > .toolbar');
    if (toolbar) {
      setText(toolbar.querySelector('.btn-save'), '\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441');
      setText(toolbar.querySelector('.btn-load'), '\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441');
    }

    const sem1Tabs = document.querySelectorAll('#semester1-pane > .sub-tabs .sub-tab-btn');
    setText(sem1Tabs[0], '\u0410\u043b\u0433\u0435\u0431\u0440\u0430, \u0433\u0435\u043e\u043c\u0435\u0442\u0440\u0438\u044f \u0438 \u0422\u0414\u0423');
    setText(sem1Tabs[1], '\u041c\u0430\u0442\u0435\u043c\u0430\u0442\u0438\u043a\u0430');
    setText(sem1Tabs[2], '\u0414\u0438\u0441\u043a\u0440\u0435\u0442\u043d\u0430\u044f \u043c\u0430\u0442\u0435\u043c\u0430\u0442\u0438\u043a\u0430');

    setHtml(document.querySelector('.disclaimer'), '<strong>\u0412\u0430\u0436\u043d\u043e:</strong> \u043f\u0435\u0440\u0435\u0434 \u044d\u043a\u0437\u0430\u043c\u0435\u043d\u043e\u043c \u043f\u0435\u0440\u0435\u043f\u0440\u043e\u0432\u0435\u0440\u044f\u0439 \u0444\u043e\u0440\u043c\u0443\u043b\u044b \u0438 \u043e\u0442\u0432\u0435\u0442\u044b \u043f\u043e \u043f\u0435\u0440\u0432\u043e\u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a\u0443.');
  }

  function removeNoise() {
    document.querySelectorAll('.changelog,#changelog,.changelog-btn,.version-badge,.version-label,[data-changelog],[data-version-badge],.ux-study-dashboard,.ux-page-head,.ux-status-row').forEach((el) => el.remove());
    document.querySelectorAll('.hero, .header-buttons').forEach((root) => {
      root.querySelectorAll('span,div,a,button').forEach((el) => {
        if (el.children.length) return;
        const text = normalize(repairText(el.textContent));
        if (/^v\d+(?:\.\d+){1,3}$/i.test(text) || text === 'changelog' || text === '\u0438\u0441\u0442\u043e\u0440\u0438\u044f \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u0439') el.remove();
      });
    });
  }

  function ensureSearch() {
    const inner = document.querySelector('.sidebar-content-inner');
    if (!inner || inner.querySelector('.ux-sidebar-tools')) return;
    const tools = document.createElement('div');
    tools.className = 'ux-sidebar-tools';
    tools.innerHTML = `<label class="ux-sidebar-search" for="${SEARCH_ID}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.6-3.6"></path></svg><input id="${SEARCH_ID}" type="search" autocomplete="off" spellcheck="false" placeholder="\u0411\u0438\u043b\u0435\u0442, \u0442\u0435\u043c\u0430, \u0440\u0430\u0437\u0434\u0435\u043b"><button class="ux-search-clear" type="button" aria-label="\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c">\xd7</button></label>`;
    const progress = inner.querySelector('.sidebar-progress');
    if (progress) progress.insertAdjacentElement('beforebegin', tools); else inner.prepend(tools);

    const input = tools.querySelector('input');
    const clear = tools.querySelector('button');
    const apply = () => {
      tools.classList.toggle('has-value', Boolean(input.value));
      const q = normalize(input.value);
      document.querySelectorAll('#sidebar-tickets .sidebar-module, #sidebar .sidebar-item').forEach((el) => {
        el.classList.toggle('ux-search-hidden', Boolean(q && !normalize(el.textContent).includes(q)));
      });
    };
    input.addEventListener('input', apply);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { input.value = ''; apply(); input.blur(); }
    });
    clear.addEventListener('click', (e) => { e.preventDefault(); input.value = ''; apply(); input.focus(); });
  }

  function openPractice() {
    document.querySelector('.tab-btn[data-tab="exam-tasks"]')?.click();
    if (typeof window.closeMobileSidebarAfterNavigation === 'function') window.closeMobileSidebarAfterNavigation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function makeNavItem(className, text, action) {
    const item = document.createElement('div');
    item.className = `sidebar-item ${className}`;
    item.tabIndex = 0;
    item.textContent = text;
    item.addEventListener('click', action);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); action(); }
    });
    return item;
  }

  function renderSimplePracticeSidebar() {
    const list = document.getElementById('sidebar-practice');
    if (!list) return;
    const existing = list.querySelector(':scope > .ux-practice-shortcut');
    if (existing && list.children.length === 1) {
      setText(existing, '\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 \u0410\u0413\u0438\u0422\u0414\u0423 \xb7 2 \u0441\u0435\u043c\u0435\u0441\u0442\u0440');
      return;
    }
    list.replaceChildren(makeNavItem('ux-practice-shortcut', '\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 \u0410\u0413\u0438\u0422\u0414\u0423 \xb7 2 \u0441\u0435\u043c\u0435\u0441\u0442\u0440', openPractice));
  }

  function cleanTheorySidebar() {
    document.querySelectorAll('#sidebar-tickets .sidebar-module-title').forEach((title) => {
      const clean = repairText(title.textContent).replace(/^\s*\u041c\u043e\u0434\u0443\u043b\u044c\s+\d+[.:]?\s*/i, '').trim();
      if (clean && title.textContent !== clean) title.textContent = clean;
    });
    document.querySelectorAll('#sidebar .sidebar-module-meta, #sidebar .sidebar-lesson-step').forEach((el) => el.remove());
  }

  function ensureArchivePractice() {
    const archive = document.querySelector('.ux-archive-section');
    if (!archive) return;
    let item = archive.querySelector('.ux-archive-practice');
    if (!item) {
      item = makeNavItem('ux-archive-practice', '\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 \u0410\u0413\u0438\u0422\u0414\u0423 \xb7 2 \u0441\u0435\u043c\u0435\u0441\u0442\u0440', openPractice);
      archive.appendChild(item);
    } else setText(item, '\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 \u0410\u0413\u0438\u0422\u0414\u0423 \xb7 2 \u0441\u0435\u043c\u0435\u0441\u0442\u0440');
  }

  function installSidebarHooks() {
    if (window.__uxSidebarHooksInstalled) return;
    window.__uxSidebarHooksInstalled = true;
    if (typeof window.renderSidebar === 'function') {
      const original = window.renderSidebar;
      window.renderSidebar = function (...args) {
        const result = original.apply(this, args);
        cleanTheorySidebar();
        return result;
      };
    }
    if (typeof window.renderPracticeSidebar === 'function') window.renderPracticeSidebar = renderSimplePracticeSidebar;
  }

  function switchSemester1() {
    if (typeof window.switchToSemester1Subtab === 'function') window.switchToSemester1Subtab('agidu');
    else {
      document.querySelectorAll('.tab-pane').forEach((pane) => pane.classList.remove('active-pane'));
      document.getElementById('semester1-pane')?.classList.add('active-pane');
    }
    requestAnimationFrame(syncTopTabActive);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function syncTopTabActive() {
    const tabs = document.querySelector('.tabs');
    if (!tabs) return;
    const sem1Active = document.getElementById('semester1-pane')?.classList.contains('active-pane');
    const practiceActive = document.getElementById('exam-tasks-pane')?.classList.contains('active-pane');
    const physicsActive = document.getElementById('physics-ntk-pane')?.classList.contains('active-pane');
    const examActive = document.getElementById('exam-pane')?.classList.contains('active-pane');
    tabs.querySelectorAll('.tab-btn').forEach((button) => {
      const shouldBe = button.dataset.uxTab === 'semester1' ? sem1Active
        : button.dataset.tab === 'exam-tasks' ? practiceActive
          : button.dataset.tab === 'physics-ntk' ? physicsActive
            : button.dataset.tab === 'exam' ? examActive
              : false;
      button.classList.toggle('active', Boolean(shouldBe));
    });
  }

  function ensureTopTabs() {
    const tabs = document.querySelector('.tabs');
    if (!tabs) return;
    const exam = tabs.querySelector('[data-tab="exam"]');
    const practice = tabs.querySelector('[data-tab="exam-tasks"]');
    const physics = tabs.querySelector('[data-tab="physics-ntk"]');
    setText(exam, '2 \u0441\u0435\u043c\u0435\u0441\u0442\u0440 \xb7 \u0431\u0438\u043b\u0435\u0442\u044b');
    setText(practice, '\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0430');
    setText(physics, '\u0424\u0438\u0437\u0438\u043a\u0430');

    let sem1 = tabs.querySelector('[data-ux-tab="semester1"]');
    if (!sem1) {
      sem1 = document.createElement('div');
      sem1.className = 'tab-btn';
      sem1.dataset.uxTab = 'semester1';
      sem1.tabIndex = 0;
      sem1.addEventListener('click', switchSemester1);
      sem1.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchSemester1(); }
      });
    }
    setText(sem1, '1 \u0441\u0435\u043c\u0435\u0441\u0442\u0440');

    const desired = [sem1, exam, practice, physics].filter(Boolean);
    const current = Array.from(tabs.children).filter((el) => el.classList?.contains('tab-btn'));
    const sameOrder = desired.length === current.length && desired.every((el, i) => current[i] === el);
    if (!sameOrder) desired.forEach((el) => tabs.appendChild(el));
    syncTopTabActive();
  }

  function installTabHooks() {
    const tabs = document.querySelector('.tabs');
    if (tabs && !tabs.dataset.uxHooked) {
      tabs.dataset.uxHooked = '1';
      tabs.addEventListener('click', () => requestAnimationFrame(syncTopTabActive));
    }
    if (typeof window.switchToSemester1Subtab === 'function' && !window.__uxSemesterHooked) {
      window.__uxSemesterHooked = true;
      const original = window.switchToSemester1Subtab;
      window.switchToSemester1Subtab = function (...args) {
        const result = original.apply(this, args);
        requestAnimationFrame(syncTopTabActive);
        return result;
      };
    }
  }

  function ticketStep(ticket) {
    const text = repairText(ticket.querySelector('.ticket-meta')?.textContent || '');
    const match = text.match(/\u0448\u0430\u0433\s*:?\s*(\d+)\s*\/\s*(\d+)/i);
    return { step: Number(match?.[1] || 0), total: Number(match?.[2] || 5) };
  }

  function ticketState(ticket) {
    const { step, total } = ticketStep(ticket);
    if (step >= total) return 'mastered';
    if (step === 0) return 'new';
    if (ticket.classList.contains('ready')) return 'due';
    return 'learning';
  }

  function getMetrics(list) {
    const metrics = { total: 0, mastered: 0, learning: 0, due: 0 };
    list?.querySelectorAll(':scope > .ticket').forEach((ticket) => {
      metrics.total += 1;
      const state = ticketState(ticket);
      if (state === 'mastered') metrics.mastered += 1;
      if (state === 'learning' || state === 'due') metrics.learning += 1;
      if (state === 'due') metrics.due += 1;
    });
    return metrics;
  }

  function ensureCourseIntro(mount, list, config) {
    if (!mount || !list) return;
    let intro = mount.querySelector(':scope > .ux-course-intro');
    if (!intro) {
      intro = document.createElement('section');
      intro.className = 'ux-course-intro';
      intro.innerHTML = '<div class="ux-course-copy"><div class="ux-course-kicker"></div><h1></h1><p></p></div><div class="ux-course-side"><div class="ux-course-compact-stat"></div><div class="ux-course-actions"></div></div><div class="ux-course-progress"><span></span></div>';
      mount.prepend(intro);
    }
    setText(intro.querySelector('.ux-course-kicker'), config.kicker);
    setText(intro.querySelector('h1'), config.title);
    setText(intro.querySelector('p'), config.subtitle);

    const metrics = getMetrics(list);
    const stat = metrics.due > 0
      ? `${metrics.due} \u043a \u043f\u043e\u0432\u0442\u043e\u0440\u0435\u043d\u0438\u044e \xb7 ${metrics.mastered}/${metrics.total} \u043e\u0441\u0432\u043e\u0435\u043d\u043e`
      : `${metrics.mastered}/${metrics.total} \u043e\u0441\u0432\u043e\u0435\u043d\u043e`;
    setText(intro.querySelector('.ux-course-compact-stat'), stat);
    const fill = intro.querySelector('.ux-course-progress > span');
    if (fill) fill.style.width = `${metrics.total ? Math.round(metrics.mastered / metrics.total * 100) : 0}%`;

    const actions = intro.querySelector('.ux-course-actions');
    if (config.withToolbar) {
      const toolbar = mount.querySelector(':scope > .toolbar');
      if (toolbar && toolbar.parentElement !== actions) actions.appendChild(toolbar);
    }
    if (config.source && !actions.querySelector('.ux-notes-link')) {
      const link = document.createElement('a');
      link.className = 'ux-notes-link';
      link.href = config.source;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = '\u041f\u043e\u043b\u043d\u044b\u0439 \u043a\u043e\u043d\u0441\u043f\u0435\u043a\u0442 \u2197';
      actions.appendChild(link);
    }
  }

  function applyFilter(list, filter, persist = true) {
    if (!list) return;
    let shown = 0;
    const tickets = Array.from(list.querySelectorAll(':scope > .ticket'));
    tickets.forEach((ticket) => {
      const state = ticketState(ticket);
      const visible = filter === 'all'
        || (filter === 'due' && state === 'due')
        || (filter === 'learning' && (state === 'learning' || state === 'due'))
        || (filter === 'mastered' && state === 'mastered')
        || (filter === 'new' && state === 'new');
      ticket.classList.toggle('ux-filter-hidden', !visible);
      if (visible) shown += 1;
    });
    const bar = list.querySelector(':scope > .ux-ticket-filters');
    bar?.querySelectorAll('[data-filter]').forEach((button) => button.classList.toggle('active', button.dataset.filter === filter));
    setText(bar?.querySelector('.ux-filter-count'), filter === 'all' ? `${tickets.length} \u0431\u0438\u043b\u0435\u0442\u043e\u0432` : `${shown} \u0438\u0437 ${tickets.length}`);
    list.dataset.uxFilter = filter;
    if (persist && list.id) localStorage.setItem(FILTER_PREFIX + list.id, filter);
  }

  function ensureFilterBar(list) {
    if (!list || !list.querySelector(':scope > .ticket')) return;
    let bar = list.querySelector(':scope > .ux-ticket-filters');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'ux-ticket-filters';
      bar.innerHTML = '<div class="ux-filter-group"><button type="button" data-filter="all">\u0412\u0441\u0435</button><button type="button" data-filter="due">\u041a \u043f\u043e\u0432\u0442\u043e\u0440\u0435\u043d\u0438\u044e</button><button type="button" data-filter="learning">\u0412 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0435</button><button type="button" data-filter="mastered">\u041e\u0441\u0432\u043e\u0435\u043d\u043e</button><button type="button" data-filter="new">\u041d\u043e\u0432\u044b\u0435</button></div><span class="ux-filter-count"></span>';
      list.prepend(bar);
      bar.addEventListener('click', (e) => {
        const button = e.target.closest('[data-filter]');
        if (button) applyFilter(list, button.dataset.filter);
      });
    }
    applyFilter(list, list.dataset.uxFilter || localStorage.getItem(FILTER_PREFIX + list.id) || 'all', false);
  }

  function hideOldExamDashboard() {
    const pane = document.getElementById('exam-pane');
    if (!pane) return;
    ['rank-card', 'timer', 'pace-info'].forEach((id) => document.getElementById(id)?.classList.add('ux-old-dashboard'));
    pane.querySelector(':scope > .stats')?.classList.add('ux-old-dashboard');
    pane.querySelector(':scope > .stats-grid')?.classList.add('ux-old-dashboard');
    Array.from(pane.children).forEach((el) => {
      if (el.classList?.contains('glass-panel') && /\u0442\u0435\u043e\u0440\u0438\u044f/i.test(repairText(el.textContent || ''))) el.classList.add('ux-old-dashboard');
      if (el.classList?.contains('ornament')) el.classList.add('ux-old-dashboard');
    });
  }

  function ensureSemester1Figures() {
    const list = document.getElementById('semester1-agidu-list');
    if (!list) return;
    list.querySelectorAll(':scope > .ticket').forEach((ticket) => {
      const idx = Number(ticket.dataset.idx);
      const defs = FIGURES[idx];
      const content = ticket.querySelector('.conspect-content');
      if (!defs?.length || !content || content.querySelector('.ux-notes-figures')) return;

      const gallery = document.createElement('section');
      gallery.className = 'ux-notes-figures';
      gallery.innerHTML = `<div class="ux-figures-title"><strong>\u0420\u0438\u0441\u0443\u043d\u043a\u0438 \u043a \u0431\u0438\u043b\u0435\u0442\u0443</strong><a href="${NOTES_PAGE}" target="_blank" rel="noopener">\u0418\u0441\u0442\u043e\u0447\u043d\u0438\u043a \u2197</a></div><div class="ux-figures-grid"></div>`;
      const grid = gallery.querySelector('.ux-figures-grid');
      let settled = 0;
      let loaded = 0;
      const finish = () => { if (settled === defs.length && loaded === 0) gallery.remove(); };

      defs.forEach(([file, alt]) => {
        const figure = document.createElement('figure');
        figure.innerHTML = `<img loading="lazy" decoding="async" src="${NOTES_BASE}${file}" alt="${alt}"><figcaption>${alt}</figcaption>`;
        const img = figure.querySelector('img');
        let fallbackUsed = false;
        img.addEventListener('load', () => { loaded += 1; settled += 1; finish(); }, { once: true });
        img.addEventListener('error', () => {
          if (!fallbackUsed) { fallbackUsed = true; img.src = NOTES_RAW + file; return; }
          settled += 1;
          figure.remove();
          finish();
        });
        grid.appendChild(figure);
      });

      const firstHeading = content.querySelector('h2,h3,h4');
      if (firstHeading) firstHeading.insertAdjacentElement('afterend', gallery); else content.prepend(gallery);
    });
  }

  function decorateLists() {
    const examList = document.getElementById('list');
    const sem1List = document.getElementById('semester1-agidu-list');
    ensureFilterBar(examList);
    ensureFilterBar(sem1List);
    ensureCourseIntro(document.getElementById('exam-pane'), examList, {
      kicker: '\u0410\u043b\u0433\u0435\u0431\u0440\u0430, \u0433\u0435\u043e\u043c\u0435\u0442\u0440\u0438\u044f \u0438 \u0422\u0414\u0423',
      title: '2 \u0441\u0435\u043c\u0435\u0441\u0442\u0440 \xb7 \u044d\u043a\u0437\u0430\u043c\u0435\u043d',
      subtitle: '\u0422\u0435\u043e\u0440\u0438\u044f \u0438 \u0438\u043d\u0442\u0435\u0440\u0432\u0430\u043b\u044c\u043d\u044b\u0435 \u043f\u043e\u0432\u0442\u043e\u0440\u0435\u043d\u0438\u044f.',
      withToolbar: true
    });
    ensureCourseIntro(document.getElementById('semester1-agidu'), sem1List, {
      kicker: '\u0410\u043b\u0433\u0435\u0431\u0440\u0430, \u0433\u0435\u043e\u043c\u0435\u0442\u0440\u0438\u044f \u0438 \u0422\u0414\u0423',
      title: '1 \u0441\u0435\u043c\u0435\u0441\u0442\u0440 \xb7 \u044d\u043a\u0437\u0430\u043c\u0435\u043d',
      subtitle: '24 \u0431\u0438\u043b\u0435\u0442\u0430 \u0441 \u043f\u043e\u043b\u043d\u044b\u043c\u0438 \u043a\u043e\u043d\u0441\u043f\u0435\u043a\u0442\u0430\u043c\u0438 \u0438 \u0440\u0438\u0441\u0443\u043d\u043a\u0430\u043c\u0438.',
      source: NOTES_PAGE
    });
    ensureSemester1Figures();
  }

  function decorateStatic() {
    repairMojibake();
    forceStaticLabels();
    removeNoise();
    ensureSearch();
    cleanTheorySidebar();
    renderSimplePracticeSidebar();
    ensureArchivePractice();
    ensureTopTabs();
    hideOldExamDashboard();
  }

  function installListObservers() {
    [document.getElementById('list'), document.getElementById('semester1-agidu-list')].filter(Boolean).forEach((list) => {
      if (list.dataset.uxObserved) return;
      list.dataset.uxObserved = '1';
      let queued = false;
      const observer = new MutationObserver(() => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          ensureFilterBar(list);
          if (list.id === 'semester1-agidu-list') ensureSemester1Figures();
          const mount = list.id === 'list' ? document.getElementById('exam-pane') : document.getElementById('semester1-agidu');
          const intro = mount?.querySelector(':scope > .ux-course-intro');
          if (intro) {
            const metrics = getMetrics(list);
            const stat = metrics.due > 0 ? `${metrics.due} \u043a \u043f\u043e\u0432\u0442\u043e\u0440\u0435\u043d\u0438\u044e \xb7 ${metrics.mastered}/${metrics.total} \u043e\u0441\u0432\u043e\u0435\u043d\u043e` : `${metrics.mastered}/${metrics.total} \u043e\u0441\u0432\u043e\u0435\u043d\u043e`;
            setText(intro.querySelector('.ux-course-compact-stat'), stat);
            const fill = intro.querySelector('.ux-course-progress > span');
            if (fill) fill.style.width = `${metrics.total ? Math.round(metrics.mastered / metrics.total * 100) : 0}%`;
          }
        });
      });
      observer.observe(list, { childList: true, subtree: true });
    });
  }

  function bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      const typing = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target?.isContentEditable;
      if (e.key === '/' && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        document.getElementById(SEARCH_ID)?.focus();
      }
    });
  }

  function init() {
    document.documentElement.classList.remove('ux-v2', 'ux-v3', 'ux-v4');
    document.documentElement.classList.add('ux-v5');
    installSidebarHooks();
    installTabHooks();
    bindKeyboard();
    decorateStatic();
    decorateLists();
    installListObservers();
    // One late pass is enough for auth/data code that renders shortly after DOMContentLoaded.
    setTimeout(() => {
      repairMojibake();
      forceStaticLabels();
      cleanTheorySidebar();
      renderSimplePracticeSidebar();
      ensureArchivePractice();
      ensureTopTabs();
      decorateLists();
    }, 350);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
