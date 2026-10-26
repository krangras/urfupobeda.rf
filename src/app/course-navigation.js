(() => {
  'use strict';

  const OPEN_KEY = 'urfupobeda:courses:open:v1';
  const normalize = value => String(value).toLocaleLowerCase('ru-RU').replace(/ё/g, 'е').replace(/\s+/g, ' ').trim();
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const frames = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const courses = [
    { id: 'semester1', title: 'АГиТДУ · 1 семестр · билеты к экзамену', subtitle: 'Алгебра, геометрия и ТДУ', count: '24', source: 'semester1' },
    { id: 'semester2', title: 'АГиТДУ · 2 семестр · билеты к экзамену', subtitle: 'Алгебра, геометрия и ТДУ', count: String(ticketsData.length) },
    { id: 'practice', title: 'АГиТДУ · 2 семестр · практические задания', subtitle: 'Подготовка к экзамену', count: String(Object.keys(buildExamGroups()).length), source: 'examTasks' },
    { id: 'control', title: 'АГиТДУ · 2 семестр · контрольная работа', subtitle: 'Линейные дифференциальные уравнения', count: 'Архив', source: 'controlWork' },
    { id: 'physics', title: 'Физика · НТК', subtitle: 'Механика, МКТ и электричество', count: '9', source: 'physics' },
    { id: 'integrals', title: 'Математика · 1 семестр · интегралы', subtitle: 'Интегральное исчисление', count: '9', source: 'integrals' },
    { id: 'discrete', title: 'Дискретная математика · 1 семестр', subtitle: 'Материалы курса', count: 'Скоро' }
  ];
  let nav, input, empty, yearDetails;
  let query = '';
  let searching = false;
  let savedBeforeSearch;
  let selected;
  let navigationId = 0;
  let refreshQueued = false;
  let searchTimer = 0;
  let searchRun = 0;
  let openState = {};
  try { openState = JSON.parse(localStorage.getItem(OPEN_KEY) || '{}') || {}; } catch (_) {}

  function disclosure(title, key, className) {
    const details = el('details', className);
    details.dataset.navKey = key;
    details.open = openState[key] === true;
    const summary = el('summary');
    summary.append(el('span', 'course-topic-title', title));
    const body = el('div', 'course-children');
    details.append(summary, body);
    details.addEventListener('toggle', () => {
      if (query || searching) return;
      openState[key] = details.open;
      try { localStorage.setItem(OPEN_KEY, JSON.stringify(openState)); } catch (_) {}
    });
    return { details, summary, body };
  }

  function link(course, title, target = '', className = '') {
    const button = el('button', `course-link ${className}`.trim(), title);
    button.type = 'button';
    button.dataset.course = course.id;
    button.dataset.target = String(target);
    button.title = title;
    button.addEventListener('click', async () => {
      const currentNavigation = ++navigationId;
      button.disabled = true;
      try {
        await navigate(course, target);
        if (currentNavigation !== navigationId) return;
        selected = button;
        refresh();
        window.closeMobileSidebarAfterNavigation?.();
      } catch (error) {
        console.error('Не удалось открыть курс:', error);
        showError(course, 'Не удалось открыть материал. Попробуйте ещё раз.');
      } finally {
        button.disabled = false;
      }
    });
    return button;
  }

  function ticketGroup(course, title, indices, data) {
    const group = disclosure(title, `${course.id}:${indices[0]}`, 'course-topic');
    indices.forEach(index => {
      const title = data[index].t || data[index].title;
      const button = link(course, `${index + 1}. ${title}`, index, 'course-ticket');
      button.dataset.ticket = String(index);
      group.body.append(button);
      if (/[?$]|\\\(|\\\[/.test(title)) window.typesetKaTeX?.([button]);
    });
    return group.details;
  }

  function showError(course, message) {
    course.body.querySelector('.course-error')?.remove();
    const error = el('div', 'course-error');
    error.setAttribute('role', 'status');
    error.append(el('p', '', message));
    const retry = el('button', 'course-link', 'Попробовать снова');
    retry.type = 'button';
    retry.addEventListener('click', () => { error.remove(); loadCourse(course); });
    error.append(retry);
    course.body.append(error);
  }

  async function loadCourse(course) {
    if (course.loaded) return;
    if (course.loading) return course.loading;
    course.body.setAttribute('aria-busy', 'true');
    const loading = el('p', 'course-nav-note', 'Загрузка тем…');
    course.body.append(loading);
    course.loading = (async () => {
      try {
        if (course.source) await window.DataLoader.load(course.source);
        const content = document.createDocumentFragment();
        if (course.id === 'semester1') {
          const groups = [
            ['Комплексные числа', 0, 3], ['Матрицы и определители', 3, 9],
            ['Векторы и произведения', 9, 14], ['Аналитическая геометрия', 14, 19],
            ['Линейные пространства', 19, SEMESTER1_DATA.length]
          ];
          groups.forEach(([title, from, to]) => content.append(ticketGroup(course, title, Array.from({ length: to - from }, (_, i) => from + i), SEMESTER1_DATA)));
        } else if (course.id === 'semester2') {
          modules.forEach(group => content.append(ticketGroup(course, group.title, group.tickets, ticketsData)));
        } else if (course.id === 'practice') {
          Object.entries(buildExamGroups()).forEach(([key, group]) => content.append(link(course, group.title.replace(/^Тип \d+\.\s*/, ''), key)));
        } else if (course.id === 'physics') {
          document.querySelectorAll('#physics-ntk-sub-tabs > .sub-tab-btn').forEach(tab => {
            const title = tab.firstChild.textContent.trim();
            content.append(link(course, title, tab.dataset.subtab));
          });
        } else if (course.id === 'integrals') {
          const titles = ['Табличное интегрирование', 'Замена переменной', 'Интегрирование по частям', 'Квадратный трёхчлен', 'Линейная часть и квадратный трёхчлен', 'Интегралы с квадратным корнем', 'Дробно-рациональные функции', 'Тригонометрические интегралы', 'Тригонометрическая замена'];
          titles.forEach((title, index) => {
            if (INTEGRALS_DATA[`section${index + 1}`]) content.append(link(course, title, index + 1));
          });
        } else if (course.id === 'control') {
          typeConfig.forEach((type, index) => content.append(link(course, type.title, index)));
        } else {
          content.append(el('p', 'course-nav-note', 'Материалы готовятся. Здесь появятся темы и задания.'));
        }
        course.body.append(content);
        course.loaded = true;
        refresh();
      } catch (error) {
        console.error('Не удалось загрузить темы:', error);
        showError(course, 'Темы не загрузились. Проверьте подключение.');
      } finally {
        loading.remove();
        course.body.removeAttribute('aria-busy');
        course.loading = null;
      }
    })();
    return course.loading;
  }

  async function navigate(course, target) {
    if (course.source) await window.DataLoader.load(course.source);
    if (course.id === 'semester2') {
      document.querySelector('[data-tab="exam"]').click();
      await frames();
      document.querySelector('#list [data-filter="all"]')?.click();
      if (target !== '') {
        goToTicket(Number(target));
        return;
      }
    } else if (['semester1', 'integrals', 'discrete'].includes(course.id)) {
      if (course.id === 'integrals') await window.DataLoader.load('semester1');
      switchToSemester1Subtab({ semester1: 'agidu', integrals: 'math', discrete: 'discrete' }[course.id]);
      await frames();
      if (course.id === 'semester1' && target !== '') {
        document.querySelector('#semester1-agidu-list [data-filter="all"]')?.click();
        const ticket = document.querySelector(`#semester1-agidu-list > .ticket[data-idx="${target}"]`);
        if (ticket && ticket.querySelector('.cheatsheet').style.display !== 'block') ticket.click();
        ticket?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (course.id === 'integrals' && target !== '') {
        const content = document.getElementById(`section-${target}-content`);
        if (content?.style.display === 'none') toggleSemester1Section(Number(target));
        document.getElementById(`toggle-section-${target}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    } else if (course.id === 'practice') {
      if (target !== '') localStorage.setItem('exam_selected_group', target);
      document.querySelector('[data-tab="exam-tasks"]').click();
      await frames();
    } else if (course.id === 'physics') {
      document.querySelector('[data-tab="physics-ntk"]').click();
      await frames();
      if (target !== '') document.querySelector(`#physics-ntk-sub-tabs [data-subtab="${target}"]`)?.click();
      await frames();
    } else if (course.id === 'control') {
      switchToArchiveSubtab('control');
      await frames();
      if (target !== '') {
        const content = document.getElementById(`kr-type-${target}-content`);
        if (content?.style.display === 'none') toggleKrType(Number(target));
        content?.closest('.section-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    document.querySelector('.main-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function activeCourse() {
    if (document.getElementById('exam-pane').classList.contains('active-pane')) return 'semester2';
    if (document.getElementById('exam-tasks-pane').classList.contains('active-pane')) return 'practice';
    if (document.getElementById('physics-ntk-pane').classList.contains('active-pane')) return 'physics';
    if (document.getElementById('archive-pane').classList.contains('active-pane')) return 'control';
    if (document.getElementById('semester1-pane').classList.contains('active-pane')) {
      if (document.getElementById('semester1-math').classList.contains('active-sub-pane')) return 'integrals';
      if (document.getElementById('semester1-discrete').classList.contains('active-sub-pane')) return 'discrete';
      return 'semester1';
    }
  }

  function refresh() {
    if (refreshQueued) return;
    refreshQueued = true;
    requestAnimationFrame(() => {
      refreshQueued = false;
      const active = activeCourse();
      courses.forEach(course => {
        course.details.classList.toggle('course-active', course.id === active);
        const progress = course.id === 'semester2' ? state : course.id === 'semester1' ? semester1State : null;
        course.body.querySelectorAll('[data-ticket]').forEach(button => {
          const step = progress?.[Number(button.dataset.ticket)]?.step || 0;
          button.classList.toggle('course-mastered', step >= 5);
          button.classList.toggle('course-learning', step > 0 && step < 5);
        });
      });
      nav.querySelectorAll('[aria-current]').forEach(node => node.removeAttribute('aria-current'));
      if (selected?.dataset.course === active) selected.setAttribute('aria-current', 'page');
    });
  }

  function applySearch() {
    const filterTree = (body, inheritedMatch) => {
      let matches = 0;
      for (const child of body.children) {
        if (child.matches('.course-link')) {
          child.hidden = Boolean(query && !inheritedMatch && !normalize(child.textContent).includes(query));
          if (!child.hidden) matches++;
        } else if (child.matches('details')) {
          const titleMatch = inheritedMatch || normalize(child.firstElementChild.textContent).includes(query);
          const found = filterTree(child.querySelector('.course-children'), titleMatch);
          child.hidden = Boolean(query && !titleMatch && !found);
          child.open = query ? !child.hidden : Boolean(savedBeforeSearch?.get(child));
          if (!child.hidden) matches++;
        } else if (child.matches('.course-nav-note')) child.hidden = Boolean(query && !inheritedMatch);
      }
      return matches;
    };
    let found = 0;
    courses.forEach(course => {
      const titleMatch = !query || normalize(`${course.title} ${course.subtitle}`).includes(query);
      const matches = filterTree(course.body, titleMatch);
      course.details.hidden = Boolean(query && !titleMatch && !matches);
      if (query) course.details.open = !course.details.hidden;
      else if (savedBeforeSearch) course.details.open = Boolean(savedBeforeSearch.get(course.details));
      if (!course.details.hidden) found++;
    });
    if (yearDetails) yearDetails.open = query ? true : (savedBeforeSearch?.get(yearDetails) ?? true);
    empty.hidden = found > 0;
    if (!query) savedBeforeSearch = null;
  }

  async function search() {
    query = normalize(input.value);
    const run = ++searchRun;
    if (query && !savedBeforeSearch) savedBeforeSearch = new Map([...nav.querySelectorAll('details')].map(node => [node, node.open]));
    searching = true;
    nav.classList.toggle('course-searching', Boolean(query));
    applySearch();
    if (query) {
      for (const course of courses) {
        await loadCourse(course);
        if (run !== searchRun) return;
        await new Promise(requestAnimationFrame);
      }
      applySearch();
    }
    searching = false;
  }

  function init() {
    nav = document.getElementById('course-navigation');
    if (!nav) return;
    nav.replaceChildren();
    const year = disclosure('1 курс', 'year-1', 'course-year');
    yearDetails = year.details;
    yearDetails.open = openState['year-1'] !== false;
    nav.append(yearDetails);
    const tools = el('div', 'ux-sidebar-tools');
    const label = el('label', 'ux-sidebar-search');
    label.htmlFor = 'sidebar-search';
    input = el('input');
    input.id = 'sidebar-search';
    input.type = 'search';
    input.placeholder = 'Курс, тема или билет';
    input.setAttribute('aria-label', 'Поиск по всем курсам');
    input.autocomplete = 'off';
    const clear = el('button', 'ux-search-clear', '×');
    clear.type = 'button';
    clear.setAttribute('aria-label', 'Очистить поиск');
    label.append(input, clear);
    tools.append(label);
    nav.before(tools);
    input.addEventListener('input', () => {
      tools.classList.toggle('has-value', Boolean(input.value));
      clearTimeout(searchTimer);
      searchTimer = setTimeout(search, 140);
    });
    clear.addEventListener('click', () => { clearTimeout(searchTimer); input.value = ''; tools.classList.remove('has-value'); search(); input.focus(); });
    input.addEventListener('keydown', event => { if (event.key === 'Escape') clear.click(); });

    courses.forEach(course => {
      const { details, summary, body } = disclosure('', course.id, 'course');
      Object.assign(course, { details, body });
      summary.replaceChildren();
      const heading = el('span', 'course-heading');
      heading.append(el('span', 'course-title', course.title), el('span', 'course-subtitle', course.subtitle));
      const count = el('span', 'course-count', course.count);
      count.setAttribute('aria-hidden', 'true');
      summary.append(heading, count);
      body.append(link(course, course.id === 'discrete' ? 'О разделе' : 'Открыть курс', '', 'course-overview'));
      year.body.append(details);
      details.addEventListener('toggle', () => { if (details.open) loadCourse(course); });
      if (details.open) loadCourse(course);
    });
    empty = el('p', 'course-nav-note', 'Ничего не найдено. Попробуйте другую тему.');
    empty.setAttribute('role', 'status');
    empty.hidden = true;
    nav.append(empty);
    const observer = new MutationObserver(refresh);
    document.querySelectorAll('.tab-pane, #semester1-pane > .sub-tab-pane').forEach(pane => observer.observe(pane, { attributes: true, attributeFilter: ['class'] }));
    window.CourseNavigation = { refresh };
    refresh();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
