(() => {
  'use strict';

  const SEARCH_ID = 'sidebar-search';
  const NOTES_PAGE = 'https://krangras.github.io/notes/linear-algebra-1.html';
  const NOTES_PAGES_BASE = 'https://krangras.github.io/notes/assets/linear-algebra-sem1/';
  const NOTES_RAW_BASE = 'https://raw.githubusercontent.com/krangras/notes/main/assets/linear-algebra-sem1/';
  const FILTER_KEY_PREFIX = 'urfupobeda:ticket-filter:v4:';

  const FIGURES = {
    2: [['01-complex-modulus-argument.svg', 'Геометрический смысл модуля и аргумента комплексного числа']],
    4: [['02-determinant-order-2.svg', 'Определитель второго порядка'], ['03-sarrus-rule.svg', 'Правило Саррюса']],
    9: [['04-vector-basis-decomposition.svg', 'Разложение вектора по базису']],
    10: [['06-right-left-triples.svg', 'Правая и левая тройки векторов'], ['05-vector-product-area.svg', 'Геометрический смысл векторного произведения']],
    12: [['07-mixed-product-geometry.svg', 'Параллелепипед и пирамида, построенные на трёх векторах']],
    14: [['08-line-normal-vector.svg', 'Нормальный вектор прямой']],
    15: [['09-point-to-line-distance.svg', 'Расстояние от точки до прямой'], ['10-parallel-lines-distance.svg', 'Расстояние между параллельными прямыми']],
    16: [['11-ellipse-foci.svg', 'Эллипс и его фокусы'], ['12-ellipse-canonical.svg', 'Канонический чертёж эллипса']],
    17: [['13-hyperbola-foci.svg', 'Гипербола и её фокусы'], ['14-hyperbola-canonical.svg', 'Канонический чертёж гиперболы']],
    18: [['15-parabola-focus-directrix.svg', 'Парабола, фокус и директриса'], ['16-parabola-canonical.svg', 'Канонический чертёж параболы']]
  };

  const normalize = (value) => String(value || '')
    .toLocaleLowerCase('ru-RU')
    .replace(/ё/g, 'е')
    .replace(/\s+/g, ' ')
    .trim();

  const iconSearch = () => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.4-3.4"></path></svg>';

  function isTypingTarget(target) {
    return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement || Boolean(target?.isContentEditable);
  }

  // Runtime safety net for already-corrupted HTML cached by an older patch.
  function decodeLatin1Utf8(text) {
    if (!/[ÃÂÐÑ]/.test(text)) return text;
    const chars = Array.from(text);
    if (chars.some((ch) => ch.charCodeAt(0) > 255)) return text;
    try {
      const bytes = Uint8Array.from(chars, (ch) => ch.charCodeAt(0));
      const decoded = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
      return decoded.includes('\uFFFD') ? text : decoded;
    } catch (_) {
      return text;
    }
  }

  function repairMojibake(root = document.body) {
    if (!root || typeof document.createTreeWalker !== 'function') return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE', 'PRE'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return /[ÃÂÐÑ]/.test(node.nodeValue || '') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const source = node.nodeValue || '';
      // Repair only latin-1-sized runs so normal Cyrillic around them stays untouched.
      const repaired = source.replace(/[\x00-\xFF]+/g, (run) => decodeLatin1Utf8(run));
      if (repaired !== source) node.nodeValue = repaired;
    });
    root.querySelectorAll?.('[title],[placeholder],[aria-label]').forEach((el) => {
      ['title', 'placeholder', 'aria-label'].forEach((attr) => {
        const value = el.getAttribute(attr);
        if (!value || !/[ÃÂÐÑ]/.test(value)) return;
        const repaired = value.replace(/[\x00-\xFF]+/g, (run) => decodeLatin1Utf8(run));
        if (repaired !== value) el.setAttribute(attr, repaired);
      });
    });
  }

  function removeChangelogNoise() {
    const selectors = [
      '.changelog', '#changelog', '.changelog-btn', '.version-badge', '.version-label',
      '[data-changelog]', '[data-version-badge]', '[aria-label*="changelog" i]', '[title*="changelog" i]'
    ];
    document.querySelectorAll(selectors.join(',')).forEach((el) => el.remove());
    const header = document.querySelector('.hero')?.parentElement || document.body;
    header.querySelectorAll('button,a,span,div').forEach((el) => {
      if (el.children.length) return;
      const t = el.textContent.trim();
      if (/^v\d+(?:\.\d+){1,3}$/i.test(t) || /^changelog$/i.test(t) || /^история изменений$/i.test(t)) el.remove();
    });
  }

  function ensureSidebarTools() {
    const inner = document.querySelector('.sidebar-content-inner');
    if (!inner || inner.querySelector('.ux-sidebar-tools')) return;
    const tools = document.createElement('div');
    tools.className = 'ux-sidebar-tools';
    tools.innerHTML = `
      <label class="ux-sidebar-search" for="${SEARCH_ID}">
        ${iconSearch()}
        <input id="${SEARCH_ID}" type="search" autocomplete="off" spellcheck="false" placeholder="Билет, тема, раздел…">
        <button class="ux-search-clear" type="button" aria-label="Очистить поиск">×</button>
      </label>`;
    const progress = inner.querySelector('.sidebar-progress');
    if (progress) progress.insertAdjacentElement('beforebegin', tools);
    else inner.prepend(tools);

    const input = tools.querySelector('input');
    const clear = tools.querySelector('.ux-search-clear');
    const apply = () => {
      tools.classList.toggle('has-value', Boolean(input.value));
      const q = normalize(input.value);
      document.querySelectorAll('#sidebar .sidebar-item, #sidebar .sidebar-lesson').forEach((item) => {
        item.classList.toggle('ux-search-hidden', Boolean(q && !normalize(item.textContent).includes(q)));
      });
      document.querySelectorAll('#sidebar .sidebar-module').forEach((module) => {
        const hits = module.querySelectorAll('.sidebar-lesson:not(.ux-search-hidden)').length;
        const own = normalize(module.querySelector('.sidebar-module-title')?.textContent).includes(q);
        module.classList.toggle('ux-search-hidden', Boolean(q && !hits && !own));
        if (q && (hits || own)) module.querySelector('.sidebar-module-body')?.style.removeProperty('display');
      });
    };
    input.addEventListener('input', apply);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        input.value = '';
        apply();
        input.blur();
      }
    });
    clear.addEventListener('click', (event) => {
      event.preventDefault();
      input.value = '';
      apply();
      input.focus();
    });
  }

  function openExamPractice() {
    document.querySelector('.tab-btn[data-tab="exam-tasks"]')?.click();
    if (typeof window.closeMobileSidebarAfterNavigation === 'function') window.closeMobileSidebarAfterNavigation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.uxOpenExamPractice = openExamPractice;

  function simplifySidebar() {
    document.querySelectorAll('#sidebar-tickets .sidebar-module-title').forEach((title) => {
      title.textContent = title.textContent.replace(/^\s*Модуль\s+\d+[.:]?\s*/i, '').trim();
    });
    document.querySelectorAll('#sidebar .sidebar-module-meta, #sidebar .sidebar-lesson-step').forEach((el) => el.remove());

    const practice = document.getElementById('sidebar-practice');
    if (practice) {
      practice.innerHTML = '';
      const item = document.createElement('div');
      item.className = 'sidebar-item ux-practice-shortcut';
      item.tabIndex = 0;
      item.innerHTML = '<span class="ux-nav-icon">✎</span><span>Практика АГиТДУ · 2 семестр · экзамен</span>';
      item.addEventListener('click', openExamPractice);
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openExamPractice(); }
      });
      practice.appendChild(item);
    }

    const archiveTitle = Array.from(document.querySelectorAll('.sidebar-archive-section .sidebar-section-title'))
      .find((node) => normalize(node.textContent) === 'архив');
    const archive = archiveTitle?.closest('.sidebar-archive-section');
    if (archive) {
      const control = Array.from(archive.querySelectorAll('.sidebar-item')).find((item) => /контрольн/i.test(item.textContent));
      if (control) control.innerHTML = '<span class="ux-nav-icon">✍</span><span>Контрольная АГиТДУ · 2 семестр</span>';
      if (!archive.querySelector('.ux-archive-practice')) {
        const item = document.createElement('div');
        item.className = 'sidebar-item ux-archive-practice';
        item.tabIndex = 0;
        item.innerHTML = '<span class="ux-nav-icon">✎</span><span>Практика АГиТДУ · 2 семестр</span>';
        item.addEventListener('click', openExamPractice);
        archive.appendChild(item);
      }
    }
  }

  function switchSemester1() {
    if (typeof window.switchToSemester1Subtab === 'function') window.switchToSemester1Subtab('agidu');
    else {
      document.querySelectorAll('.tab-pane').forEach((pane) => pane.classList.remove('active-pane'));
      document.getElementById('semester1-pane')?.classList.add('active-pane');
    }
    document.querySelectorAll('.tabs .tab-btn').forEach((btn) => btn.classList.remove('active'));
    document.querySelector('.tabs [data-ux-tab="semester1"]')?.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function ensureTopTabs() {
    const tabs = document.querySelector('.tabs');
    if (!tabs) return;
    const exam = tabs.querySelector('.tab-btn[data-tab="exam"]');
    const tasks = tabs.querySelector('.tab-btn[data-tab="exam-tasks"]');
    const physics = tabs.querySelector('.tab-btn[data-tab="physics-ntk"]');
    if (exam) exam.textContent = '2 семестр · билеты';
    if (tasks) tasks.textContent = 'Задачи';
    if (physics) physics.textContent = 'Физика';

    let sem1 = tabs.querySelector('[data-ux-tab="semester1"]');
    if (!sem1) {
      sem1 = document.createElement('div');
      sem1.className = 'tab-btn';
      sem1.dataset.uxTab = 'semester1';
      sem1.tabIndex = 0;
      sem1.textContent = '1 семестр';
      sem1.addEventListener('click', switchSemester1);
      sem1.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); switchSemester1(); }
      });
    }
    // Chronological order: semester 1 -> semester 2 -> tasks -> physics.
    tabs.prepend(sem1);
    [exam, tasks, physics].filter(Boolean).forEach((node) => tabs.appendChild(node));

    if (document.getElementById('semester1-pane')?.classList.contains('active-pane')) {
      tabs.querySelectorAll('.tab-btn').forEach((btn) => btn.classList.remove('active'));
      sem1.classList.add('active');
    }
  }

  function ticketStep(ticket) {
    const text = ticket.querySelector('.ticket-meta')?.textContent || '';
    const m = text.match(/шаг\s*:?\s*(\d+)\s*\/\s*(\d+)/i);
    return { step: Number(m?.[1] || 0), total: Number(m?.[2] || 5) };
  }

  function ticketState(ticket) {
    const { step, total } = ticketStep(ticket);
    if (step >= total) return 'mastered';
    if (step === 0) return 'new';
    if (ticket.classList.contains('ready')) return 'due';
    return 'learning';
  }

  function applyFilter(container, filter, persist = true) {
    let shown = 0;
    const tickets = Array.from(container.querySelectorAll('.ticket'));
    tickets.forEach((ticket) => {
      const state = ticketState(ticket);
      const visible = filter === 'all'
        || (filter === 'due' && state === 'due')
        || (filter === 'learning' && ['learning', 'due'].includes(state))
        || (filter === 'mastered' && state === 'mastered')
        || (filter === 'new' && state === 'new');
      ticket.classList.toggle('ux-filter-hidden', !visible);
      if (visible) shown += 1;
    });
    const bar = container.querySelector(':scope > .ux-ticket-filters');
    bar?.querySelectorAll('button[data-filter]').forEach((btn) => btn.classList.toggle('active', btn.dataset.filter === filter));
    const count = bar?.querySelector('.ux-filter-count');
    if (count) count.textContent = filter === 'all' ? `${tickets.length}` : `${shown}/${tickets.length}`;
    container.dataset.uxFilter = filter;
    if (persist && container.id) localStorage.setItem(`${FILTER_KEY_PREFIX}${container.id}`, filter);
  }

  function ensureFilters(container) {
    if (!container || !container.querySelector('.ticket') || container.querySelector(':scope > .ux-ticket-filters')) return;
    const bar = document.createElement('div');
    bar.className = 'ux-ticket-filters';
    bar.innerHTML = `
      <div class="ux-filter-group" role="group" aria-label="Фильтр билетов">
        <button type="button" data-filter="all">Все</button>
        <button type="button" data-filter="due">К повторению</button>
        <button type="button" data-filter="learning">В процессе</button>
        <button type="button" data-filter="mastered">Освоено</button>
        <button type="button" data-filter="new">Новые</button>
      </div>
      <span class="ux-filter-count"></span>`;
    container.prepend(bar);
    bar.addEventListener('click', (event) => {
      const btn = event.target.closest('button[data-filter]');
      if (btn) applyFilter(container, btn.dataset.filter);
    });
    applyFilter(container, localStorage.getItem(`${FILTER_KEY_PREFIX}${container.id}`) || 'all', false);
  }

  function metrics(container) {
    const out = { total: 0, mastered: 0, learning: 0, due: 0 };
    container?.querySelectorAll('.ticket').forEach((ticket) => {
      out.total += 1;
      const state = ticketState(ticket);
      if (state === 'mastered') out.mastered += 1;
      if (state === 'learning' || state === 'due') out.learning += 1;
      if (state === 'due') out.due += 1;
    });
    return out;
  }

  function ensurePageHeader(pane, list, config) {
    if (!pane || !list?.querySelector('.ticket')) return;
    let head = pane.querySelector(':scope > .ux-page-head');
    if (!head) {
      head = document.createElement('section');
      head.className = 'ux-page-head';
      head.innerHTML = `
        <div class="ux-page-head-main">
          <div class="ux-page-eyebrow">${config.eyebrow}</div>
          <h1>${config.title}</h1>
          <p>${config.subtitle}</p>
          ${config.source ? `<a class="ux-source-link" href="${config.source}" target="_blank" rel="noopener">Полный конспект ↗</a>` : ''}
        </div>
        <div class="ux-page-progress" aria-label="Прогресс">
          <div><strong data-metric="mastered">0</strong><span>освоено</span></div>
          <div><strong data-metric="learning">0</strong><span>в работе</span></div>
          <div><strong data-metric="due">0</strong><span>повторить</span></div>
          <div><strong data-metric="total">0</strong><span>всего</span></div>
        </div>`;
      pane.prepend(head);
      const toolbar = pane.querySelector(':scope > .toolbar');
      if (toolbar) head.insertAdjacentElement('afterend', toolbar);
    }
    const m = metrics(list);
    Object.entries(m).forEach(([key, value]) => {
      const node = head.querySelector(`[data-metric="${key}"]`);
      if (node) node.textContent = String(value);
    });
  }

  function organizeExamStatus() {
    const pane = document.getElementById('exam-pane');
    if (!pane) return;
    pane.querySelectorAll(':scope > .ux-study-dashboard').forEach((el) => el.remove());
    pane.querySelector(':scope > .stats')?.classList.add('ux-base-stats-hidden');
    pane.querySelector(':scope > .stats-grid')?.classList.add('ux-base-stats-hidden');
    const rank = document.getElementById('rank-card');
    const timer = document.getElementById('timer');
    const pace = document.getElementById('pace-info');
    if (rank && !rank.closest('.ux-status-row')) {
      const row = document.createElement('div');
      row.className = 'ux-status-row';
      rank.insertAdjacentElement('beforebegin', row);
      [rank, timer, pace].filter(Boolean).forEach((node) => row.appendChild(node));
    }
    if (timer && /экзамен!?/i.test(timer.textContent || '') && !/до экзамена/i.test(timer.textContent || '')) timer.hidden = true;
    if (pace && timer?.hidden) pace.hidden = true;
  }

  function ensureSemester1Figures() {
    const list = document.getElementById('semester1-agidu-list');
    if (!list) return;
    list.querySelectorAll('.ticket').forEach((ticket) => {
      const idx = Number(ticket.dataset.idx);
      const defs = FIGURES[idx];
      const content = ticket.querySelector('.conspect-content');
      if (!defs?.length || !content || content.querySelector('.ux-notes-figures')) return;

      const gallery = document.createElement('section');
      gallery.className = 'ux-notes-figures';
      gallery.innerHTML = '<div class="ux-figures-title"><strong>Иллюстрации</strong><a href="' + NOTES_PAGE + '" target="_blank" rel="noopener">Источник ↗</a></div><div class="ux-figures-grid"></div>';
      const grid = gallery.querySelector('.ux-figures-grid');
      let success = 0;
      let done = 0;
      defs.forEach(([file, alt]) => {
        const figure = document.createElement('figure');
        figure.innerHTML = `<img loading="lazy" decoding="async" src="${NOTES_PAGES_BASE}${file}" alt="${alt}"><figcaption>${alt}</figcaption>`;
        const img = figure.querySelector('img');
        let triedRaw = false;
        img.addEventListener('load', () => { success += 1; done += 1; finish(); }, { once: true });
        img.addEventListener('error', () => {
          if (!triedRaw) {
            triedRaw = true;
            img.src = NOTES_RAW_BASE + file;
            return;
          }
          done += 1;
          figure.remove();
          finish();
        });
        grid.appendChild(figure);
      });
      function finish() {
        if (done < defs.length) return;
        if (!success) gallery.remove();
      }
      const h = content.querySelector('h3');
      if (h) h.insertAdjacentElement('afterend', gallery);
      else content.prepend(gallery);
    });
  }

  function polishLabels() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) subtitle.textContent = 'Подготовка к экзаменам без лишнего шума';
    const pin = document.querySelector('.sidebar-pin-label');
    if (pin) pin.textContent = 'Навигация';
    const progress = document.querySelector('.sidebar-progress-label');
    if (progress) progress.textContent = 'Прогресс';
    const sem1tab = document.querySelector('#semester1-pane .sub-tab-btn[data-subtab="agidu"]');
    if (sem1tab) sem1tab.textContent = 'Алгебра, геометрия и ТДУ';
    const disclaimer = document.querySelector('.disclaimer');
    if (disclaimer) disclaimer.innerHTML = '<strong>Важно:</strong> перед экзаменом перепроверяй формулы и ответы по первоисточнику.';
  }

  function focusSearch() {
    const input = document.getElementById(SEARCH_ID);
    if (!input) return;
    if (matchMedia('(max-width: 980px)').matches && !document.getElementById('sidebar')?.classList.contains('mobile-open')) window.toggleMobileSidebar?.();
    requestAnimationFrame(() => input.focus());
  }

  function bindKeyboard() {
    document.addEventListener('keydown', (event) => {
      if (event.key === '/' && !isTypingTarget(event.target) && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        focusSearch();
      }
    });
  }

  function decorate() {
    repairMojibake();
    removeChangelogNoise();
    polishLabels();
    ensureTopTabs();
    ensureSidebarTools();
    simplifySidebar();
    organizeExamStatus();

    const examList = document.getElementById('list');
    const sem1List = document.getElementById('semester1-agidu-list');
    ensureFilters(examList);
    ensureFilters(sem1List);
    if (examList) applyFilter(examList, examList.dataset.uxFilter || 'all', false);
    if (sem1List) applyFilter(sem1List, sem1List.dataset.uxFilter || 'all', false);

    ensurePageHeader(document.getElementById('exam-pane'), examList, {
      eyebrow: 'Алгебра, геометрия и ТДУ · 2 семестр',
      title: 'Экзаменационные билеты',
      subtitle: 'Теория, интервальные повторения и быстрый доступ к практике.',
      source: null
    });
    const sem1Mount = document.getElementById('semester1-agidu');
    ensurePageHeader(sem1Mount, sem1List, {
      eyebrow: 'Алгебра, геометрия и ТДУ · 1 семестр',
      title: 'Экзаменационные билеты',
      subtitle: '24 билета с конспектами и иллюстрациями из полного материала.',
      source: NOTES_PAGE
    });
    ensureSemester1Figures();
  }

  function observe() {
    const root = document.querySelector('.main-content') || document.body;
    if (!root || typeof MutationObserver === 'undefined') return;
    let pending = false;
    const observer = new MutationObserver(() => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        decorate();
      });
    });
    observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  }

  function init() {
    document.documentElement.classList.remove('ux-v2', 'ux-v3');
    document.documentElement.classList.add('ux-v4');
    bindKeyboard();
    decorate();
    observe();
    setTimeout(decorate, 250);
    setTimeout(decorate, 1000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
