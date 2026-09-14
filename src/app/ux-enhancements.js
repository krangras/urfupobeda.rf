(() => {
    'use strict';

    const SEARCH_ID = 'sidebar-search';
    const NOTES_BASE = 'https://krangras.github.io/notes/assets/linear-algebra-sem1/';
    const NOTES_PAGE = 'https://krangras.github.io/notes/linear-algebra-1.html';
    const FILTER_KEY_PREFIX = 'urfupobeda:ticket-filter:';

    const SEM1_FIGURES = {
        2: [
            ['01-complex-modulus-argument.svg', 'Геометрический смысл модуля и аргумента комплексного числа']
        ],
        4: [
            ['02-determinant-order-2.svg', 'Определитель второго порядка'],
            ['03-sarrus-rule.svg', 'Правило Саррюса для определителя третьего порядка']
        ],
        9: [
            ['04-vector-basis-decomposition.svg', 'Разложение вектора по базису']
        ],
        10: [
            ['06-right-left-triples.svg', 'Правая и левая тройки векторов'],
            ['05-vector-product-area.svg', 'Геометрический смысл векторного произведения']
        ],
        12: [
            ['07-mixed-product-geometry.svg', 'Параллелепипед и пирамида, построенные на трёх векторах']
        ],
        14: [
            ['08-line-normal-vector.svg', 'Нормальный вектор прямой на плоскости']
        ],
        15: [
            ['09-point-to-line-distance.svg', 'Расстояние от точки до прямой'],
            ['10-parallel-lines-distance.svg', 'Расстояние между параллельными прямыми']
        ],
        16: [
            ['11-ellipse-foci.svg', 'Эллипс и его фокусы'],
            ['12-ellipse-canonical.svg', 'Канонический чертёж эллипса']
        ],
        17: [
            ['13-hyperbola-foci.svg', 'Гипербола и её фокусы'],
            ['14-hyperbola-canonical.svg', 'Канонический чертёж гиперболы']
        ],
        18: [
            ['15-parabola-focus-directrix.svg', 'Парабола, фокус и директриса'],
            ['16-parabola-canonical.svg', 'Канонический чертёж параболы']
        ]
    };

    const iconSearch = () => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.6-3.6"></path></svg>';

    const normalize = (value) => String(value || '')
        .toLocaleLowerCase('ru-RU')
        .replace(/ё/g, 'е')
        .replace(/\s+/g, ' ')
        .trim();

    const isTypingTarget = (target) => target instanceof HTMLInputElement
        || target instanceof HTMLTextAreaElement
        || target instanceof HTMLSelectElement
        || Boolean(target?.isContentEditable);

    function ensureSidebarTools() {
        const inner = document.querySelector('.sidebar-content-inner');
        if (!inner || document.querySelector('.ux-sidebar-tools')) return;

        const tools = document.createElement('div');
        tools.className = 'ux-sidebar-tools';
        tools.innerHTML = `
            <div class="ux-sidebar-search">
                ${iconSearch()}
                <input id="${SEARCH_ID}" type="search" autocomplete="off" spellcheck="false"
                    placeholder="Билет, тема, раздел…" aria-label="Поиск по навигации">
                <button class="ux-search-clear" type="button" aria-label="Очистить поиск" title="Очистить">×</button>
            </div>
            <div class="ux-sidebar-hint">
                <span>Поиск по материалам</span>
                <span><span class="ux-kbd">/</span> <span class="ux-kbd">Esc</span></span>
            </div>`;

        const pinRow = inner.querySelector('.sidebar-pin-row');
        if (pinRow) pinRow.insertAdjacentElement('afterend', tools);
        else inner.prepend(tools);

        const input = tools.querySelector(`#${SEARCH_ID}`);
        const wrap = tools.querySelector('.ux-sidebar-search');
        const clear = tools.querySelector('.ux-search-clear');

        const apply = () => {
            wrap.classList.toggle('has-value', Boolean(input.value));
            if (typeof window.applySidebarSearch === 'function') window.applySidebarSearch();
            else fallbackSidebarSearch(input.value);
        };

        input.addEventListener('input', apply);
        input.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') return;
            event.preventDefault();
            input.value = '';
            apply();
            input.blur();
        });
        clear.addEventListener('click', () => {
            input.value = '';
            apply();
            input.focus();
        });
    }

    function fallbackSidebarSearch(value) {
        const query = normalize(value);
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        sidebar.querySelectorAll('.sidebar-item, .sidebar-lesson').forEach((item) => {
            const visible = !query || normalize(item.textContent).includes(query);
            item.classList.toggle('sidebar-search-hidden', !visible);
            item.classList.toggle('sidebar-search-hit', Boolean(query && visible));
        });

        sidebar.querySelectorAll('.sidebar-module').forEach((module) => {
            const visibleChildren = module.querySelectorAll('.sidebar-lesson:not(.sidebar-search-hidden)').length;
            module.classList.toggle('sidebar-search-hidden', Boolean(query && visibleChildren === 0));
            if (query && visibleChildren) {
                const body = module.querySelector('.sidebar-module-body');
                if (body) body.style.display = '';
            }
        });
    }

    function ensureSidebarFooter() {
        const inner = document.querySelector('.sidebar-content-inner');
        if (!inner || inner.querySelector('.ux-sidebar-footer')) return;
        const footer = document.createElement('div');
        footer.className = 'ux-sidebar-footer';
        footer.innerHTML = 'Быстрые клавиши: <span class="ux-kbd">/</span> поиск · <span class="ux-kbd">Ctrl K</span> навигация.';
        inner.appendChild(footer);
    }

    function enhanceAccessibility() {
        document.querySelectorAll('.tab-btn').forEach((el) => {
            el.setAttribute('role', 'tab');
            if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
        });
        document.querySelectorAll('.sub-tab-btn, .sidebar-item, .sidebar-lesson, .sidebar-module-header').forEach((el) => {
            if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
            if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
        });
    }

    function parseTicketStep(ticket) {
        const text = ticket.querySelector('.ticket-meta')?.textContent || '';
        const match = text.match(/шаг\s*:?\s*(\d+)\s*\/\s*(\d+)/i);
        if (!match) return { step: 0, total: 5 };
        return { step: Number(match[1]) || 0, total: Number(match[2]) || 5 };
    }

    function getTicketState(ticket) {
        const { step, total } = parseTicketStep(ticket);
        if (step >= total) return 'mastered';
        if (step === 0) return ticket.classList.contains('ready') ? 'new' : 'new';
        if (ticket.classList.contains('ready')) return 'due';
        return 'learning';
    }

    function enhanceTicketStates(container) {
        container.querySelectorAll('.ticket').forEach((ticket) => {
            const { step, total } = parseTicketStep(ticket);
            ticket.classList.toggle('ux-mastered', step >= total);
            ticket.dataset.uxState = getTicketState(ticket);
        });
    }

    function applyTicketFilter(container, filter, persist = true) {
        enhanceTicketStates(container);
        let shown = 0;
        let total = 0;
        container.querySelectorAll('.ticket').forEach((ticket) => {
            total += 1;
            const state = ticket.dataset.uxState || getTicketState(ticket);
            const show = filter === 'all'
                || (filter === 'due' && state === 'due')
                || (filter === 'learning' && (state === 'learning' || state === 'due'))
                || (filter === 'mastered' && state === 'mastered')
                || (filter === 'new' && state === 'new');
            ticket.classList.toggle('ux-filter-hidden', !show);
            if (show) shown += 1;
        });

        const tools = container.querySelector(':scope > .ux-ticket-tools');
        if (tools) {
            tools.querySelectorAll('.ux-filter-btn').forEach((btn) => btn.classList.toggle('active', btn.dataset.filter === filter));
            const count = tools.querySelector('.ux-ticket-count');
            if (count) {
                const nextCount = filter === 'all' ? `${total} билетов` : `${shown} из ${total}`;
                if (count.textContent !== nextCount) count.textContent = nextCount;
            }
        }
        container.dataset.uxFilter = filter;
        if (persist && container.id) localStorage.setItem(`${FILTER_KEY_PREFIX}${container.id}`, filter);
    }

    function ensureTicketTools(container) {
        if (!container || container.querySelector(':scope > .ux-ticket-tools') || !container.querySelector('.ticket')) return;
        const tools = document.createElement('div');
        tools.className = 'ux-ticket-tools';
        tools.innerHTML = `
            <span class="ux-filter-label">Показать</span>
            <button type="button" class="ux-filter-btn active" data-filter="all">Все</button>
            <button type="button" class="ux-filter-btn" data-filter="due">К повторению</button>
            <button type="button" class="ux-filter-btn" data-filter="learning">В процессе</button>
            <button type="button" class="ux-filter-btn" data-filter="mastered">Освоено</button>
            <button type="button" class="ux-filter-btn" data-filter="new">Новые</button>
            <span class="ux-ticket-count"></span>`;

        const firstTicket = container.querySelector('.ticket');
        firstTicket.insertAdjacentElement('beforebegin', tools);
        tools.addEventListener('click', (event) => {
            const button = event.target.closest('.ux-filter-btn');
            if (!button) return;
            applyTicketFilter(container, button.dataset.filter || 'all');
        });
        const saved = container.id ? localStorage.getItem(`${FILTER_KEY_PREFIX}${container.id}`) : null;
        applyTicketFilter(container, ['all', 'due', 'learning', 'mastered', 'new'].includes(saved) ? saved : 'all', false);
    }

    function metricsFromTickets(container) {
        const tickets = Array.from(container?.querySelectorAll('.ticket') || []);
        const metrics = { total: tickets.length, mastered: 0, learning: 0, due: 0, fresh: 0 };
        tickets.forEach((ticket) => {
            const state = getTicketState(ticket);
            if (state === 'mastered') metrics.mastered += 1;
            else if (state === 'new') metrics.fresh += 1;
            else metrics.learning += 1;
            if (state === 'due') metrics.due += 1;
        });
        return metrics;
    }

    function subjectDashboardConfig(pane) {
        if (pane?.id === 'semester1-pane') {
            return {
                kicker: '1 семестр · экзамен',
                title: 'Алгебра, геометрия и теория дифференциальных уравнений',
                subtitle: '24 билета, интервальные повторения и иллюстрации из полного конспекта.',
                list: document.getElementById('semester1-agidu-list'),
                source: NOTES_PAGE
            };
        }
        return {
            kicker: '2 семестр · экзамен',
            title: 'Билеты без хаоса',
            subtitle: 'Сначала то, что пора повторить. Остальное можно отфильтровать одним нажатием.',
            list: document.getElementById('list'),
            source: null
        };
    }

    function ensureStudyDashboard(pane) {
        if (!pane || !['exam-pane', 'semester1-pane'].includes(pane.id)) return;
        const mount = pane.id === 'semester1-pane' ? (document.getElementById('semester1-agidu') || pane) : pane;
        if (mount.querySelector(':scope > .ux-study-dashboard')) return;
        const config = subjectDashboardConfig(pane);
        if (!config.list?.querySelector('.ticket')) return;

        const dashboard = document.createElement('section');
        dashboard.className = 'ux-study-dashboard';
        dashboard.dataset.forPane = pane.id;
        dashboard.innerHTML = `
            <div class="ux-dashboard-main">
                <div class="ux-dashboard-kicker">${config.kicker}</div>
                <h2 class="ux-dashboard-title">${config.title}</h2>
                <div class="ux-dashboard-subtitle">${config.subtitle}</div>
                <div class="ux-dashboard-actions">
                    <button type="button" class="ux-primary-btn" data-ux-action="continue">Продолжить подготовку</button>
                    <button type="button" class="ux-secondary-btn" data-ux-action="command">Быстрый переход <span class="ux-kbd">Ctrl K</span></button>
                    ${config.source ? `<a class="ux-secondary-btn ux-dashboard-link" href="${config.source}" target="_blank" rel="noopener">Полный конспект ↗</a>` : ''}
                </div>
            </div>
            <div class="ux-dashboard-side" aria-label="Прогресс по билетам">
                <div class="ux-metric"><div class="ux-metric-value" data-metric="mastered">0</div><div class="ux-metric-label">освоено</div></div>
                <div class="ux-metric"><div class="ux-metric-value" data-metric="learning">0</div><div class="ux-metric-label">в процессе</div></div>
                <div class="ux-metric"><div class="ux-metric-value" data-metric="due">0</div><div class="ux-metric-label">пора повторить</div></div>
                <div class="ux-metric"><div class="ux-metric-value" data-metric="total">0</div><div class="ux-metric-label">всего билетов</div></div>
            </div>`;

        mount.prepend(dashboard);
        dashboard.addEventListener('click', (event) => {
            const action = event.target.closest('[data-ux-action]')?.dataset.uxAction;
            if (action === 'command') openCommandPalette();
            if (action === 'continue') scrollToNextTicket(config.list);
        });
        refreshDashboard(dashboard, config.list);
    }

    function refreshDashboard(dashboard, list) {
        if (!dashboard || !list) return;
        const metrics = metricsFromTickets(list);
        ['mastered', 'learning', 'due', 'total'].forEach((key) => {
            const node = dashboard.querySelector(`[data-metric="${key}"]`);
            if (node && node.textContent !== String(metrics[key])) node.textContent = String(metrics[key]);
        });
        const continueButton = dashboard.querySelector('[data-ux-action="continue"]');
        if (continueButton) {
            const nextLabel = metrics.due ? `Повторить сейчас · ${metrics.due}` : 'Продолжить подготовку';
            if (continueButton.textContent !== nextLabel) continueButton.textContent = nextLabel;
        }
    }

    function scrollToNextTicket(container) {
        if (!container) return;
        enhanceTicketStates(container);
        const filter = container.dataset.uxFilter || 'all';
        const candidates = Array.from(container.querySelectorAll('.ticket:not(.ux-filter-hidden)'));
        const target = candidates.find((ticket) => ticket.dataset.uxState === 'due')
            || candidates.find((ticket) => ticket.dataset.uxState === 'learning')
            || candidates.find((ticket) => ticket.dataset.uxState === 'new')
            || candidates[0];
        if (!target) return;
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add('ux-ticket-pulse');
        window.setTimeout(() => target.classList.remove('ux-ticket-pulse'), 1200);
        if (filter !== 'all' && target.classList.contains('ux-filter-hidden')) applyTicketFilter(container, 'all');
    }

    function ensureSemester1Figures() {
        const list = document.getElementById('semester1-agidu-list');
        if (!list) return;
        list.querySelectorAll('.ticket').forEach((ticket) => {
            const rawIdx = ticket.dataset.idx;
            const idx = rawIdx === undefined ? null : Number(rawIdx);
            const figures = SEM1_FIGURES[idx];
            if (!figures?.length) return;
            const content = ticket.querySelector('.conspect-content');
            if (!content || content.querySelector('.ux-notes-figures')) return;

            const gallery = document.createElement('section');
            gallery.className = `ux-notes-figures ${figures.length > 1 ? 'is-grid' : ''}`;
            gallery.innerHTML = `
                <div class="ux-notes-figures-head">
                    <div><strong>Иллюстрации к билету</strong><span>из полного конспекта 1 семестра</span></div>
                    <a href="${NOTES_PAGE}" target="_blank" rel="noopener">Открыть источник ↗</a>
                </div>
                <div class="ux-notes-figures-grid"></div>`;
            const grid = gallery.querySelector('.ux-notes-figures-grid');
            let loaded = 0;
            figures.forEach(([file, alt]) => {
                const figure = document.createElement('figure');
                figure.className = 'ux-notes-figure';
                figure.innerHTML = `<img loading="lazy" decoding="async" src="${NOTES_BASE}${file}" alt="${alt}"><figcaption>${alt}</figcaption>`;
                const img = figure.querySelector('img');
                img.addEventListener('load', () => {
                    loaded += 1;
                    if (loaded === figures.length) {
                        gallery.classList.add('has-loaded-image');
                        content.querySelectorAll(':scope > .s1-figure').forEach((legacy) => legacy.classList.add('ux-figure-replaced'));
                    }
                }, { once: true });
                img.addEventListener('error', () => figure.remove(), { once: true });
                grid.appendChild(figure);
            });

            const heading = content.querySelector('h3');
            if (heading) heading.insertAdjacentElement('afterend', gallery);
            else content.prepend(gallery);
        });
    }

    function ensureFigureSourceLinks() {
        document.querySelectorAll('.s1-figure:not([data-ux-source])').forEach((figure) => {
            figure.dataset.uxSource = '1';
            if (figure.querySelector('.ux-figure-source')) return;
            const source = document.createElement('div');
            source.className = 'ux-figure-source';
            source.innerHTML = `<a href="${NOTES_PAGE}" target="_blank" rel="noopener">Полный конспект ↗</a>`;
            figure.appendChild(source);
        });
    }

    function commandEntries() {
        const entries = [
            { icon: '②', title: 'Билеты · 2 семестр', meta: 'Экзамен', run: () => document.querySelector('.tab-btn[data-tab="exam"]')?.click() },
            { icon: '①', title: 'Алгебра, геометрия и ТДУ · 1 семестр', meta: '24 билета', run: () => {
                if (typeof window.switchToSemester1Subtab === 'function') window.switchToSemester1Subtab('agidu');
                else document.querySelector('[data-semester1-subtab="agidu"]')?.click();
            } },
            { icon: '✎', title: 'Задачи экзамена', meta: 'Практика', run: () => document.querySelector('.tab-btn[data-tab="exam-tasks"]')?.click() },
            { icon: 'φ', title: 'Физика НТК', meta: 'Теория и задачи', run: () => document.querySelector('.tab-btn[data-tab="physics-ntk"]')?.click() },
            { icon: '∫', title: 'Математический анализ · интегралы', meta: '1 семестр', run: () => document.querySelector('[data-semester1-subtab="math"]')?.click() },
            { icon: '⌘', title: 'Поиск в левом меню', meta: 'Горячая клавиша /', run: focusSidebarSearch }
        ];

        const seen = new Set(entries.map((e) => normalize(e.title)));
        document.querySelectorAll('.sidebar-lesson, .sidebar-item').forEach((node) => {
            const title = node.textContent.replace(/\s+/g, ' ').trim();
            if (!title || seen.has(normalize(title))) return;
            seen.add(normalize(title));
            entries.push({ icon: '•', title, meta: 'Навигация', run: () => node.click() });
        });
        return entries;
    }

    let paletteEntries = [];
    let paletteActiveIndex = 0;

    function ensureCommandPalette() {
        if (document.getElementById('ux-command-backdrop')) return;
        const backdrop = document.createElement('div');
        backdrop.id = 'ux-command-backdrop';
        backdrop.className = 'ux-command-backdrop';
        backdrop.setAttribute('aria-hidden', 'true');
        backdrop.innerHTML = `
            <div class="ux-command" role="dialog" aria-modal="true" aria-label="Быстрый переход">
                <div class="ux-command-search">${iconSearch()}<input id="ux-command-input" autocomplete="off" spellcheck="false" placeholder="Куда перейти?"></div>
                <div class="ux-command-results"></div>
                <div class="ux-command-footer"><span>↑ ↓ выбрать · Enter открыть</span><span>Esc закрыть</span></div>
            </div>`;
        document.body.appendChild(backdrop);
        const input = backdrop.querySelector('#ux-command-input');
        input.addEventListener('input', () => renderCommandResults(input.value));
        backdrop.addEventListener('click', (event) => {
            if (event.target === backdrop) closeCommandPalette();
            const item = event.target.closest('.ux-command-item');
            if (item) activateCommand(Number(item.dataset.index));
        });
        input.addEventListener('keydown', (event) => {
            const count = backdrop.querySelectorAll('.ux-command-item').length;
            if (event.key === 'ArrowDown' && count) {
                event.preventDefault();
                paletteActiveIndex = (paletteActiveIndex + 1) % count;
                updateCommandActive();
            } else if (event.key === 'ArrowUp' && count) {
                event.preventDefault();
                paletteActiveIndex = (paletteActiveIndex - 1 + count) % count;
                updateCommandActive();
            } else if (event.key === 'Enter' && count) {
                event.preventDefault();
                const item = backdrop.querySelectorAll('.ux-command-item')[paletteActiveIndex];
                if (item) activateCommand(Number(item.dataset.index));
            } else if (event.key === 'Escape') {
                event.preventDefault();
                closeCommandPalette();
            }
        });
    }

    function renderCommandResults(query = '') {
        const results = document.querySelector('.ux-command-results');
        if (!results) return;
        const q = normalize(query);
        paletteEntries = commandEntries().filter((entry) => !q || normalize(`${entry.title} ${entry.meta}`).includes(q));
        paletteActiveIndex = 0;
        if (!paletteEntries.length) {
            results.innerHTML = '<div class="ux-command-empty">Ничего не найдено. Попробуй короче сформулировать запрос.</div>';
            return;
        }
        results.innerHTML = paletteEntries.slice(0, 18).map((entry, index) => `
            <button type="button" class="ux-command-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                <span class="ux-command-item-icon">${entry.icon}</span>
                <span class="ux-command-item-copy"><span class="ux-command-item-title">${entry.title}</span><span class="ux-command-item-meta">${entry.meta}</span></span>
            </button>`).join('');
    }

    function updateCommandActive() {
        document.querySelectorAll('.ux-command-item').forEach((item, index) => {
            const active = index === paletteActiveIndex;
            item.classList.toggle('active', active);
            if (active) item.scrollIntoView({ block: 'nearest' });
        });
    }

    function activateCommand(index) {
        const entry = paletteEntries[index];
        if (!entry) return;
        closeCommandPalette();
        window.setTimeout(() => entry.run(), 20);
    }

    function openCommandPalette() {
        ensureCommandPalette();
        const backdrop = document.getElementById('ux-command-backdrop');
        const input = document.getElementById('ux-command-input');
        if (!backdrop || !input) return;
        backdrop.classList.add('open');
        backdrop.setAttribute('aria-hidden', 'false');
        input.value = '';
        renderCommandResults('');
        requestAnimationFrame(() => input.focus());
    }

    function closeCommandPalette() {
        const backdrop = document.getElementById('ux-command-backdrop');
        if (!backdrop) return;
        backdrop.classList.remove('open');
        backdrop.setAttribute('aria-hidden', 'true');
    }

    function focusSidebarSearch() {
        const input = document.getElementById(SEARCH_ID);
        if (!input) return;
        const sidebar = document.getElementById('sidebar');
        if (window.matchMedia('(max-width: 1080px)').matches && sidebar && !sidebar.classList.contains('mobile-open')) {
            if (typeof window.toggleMobileSidebar === 'function') window.toggleMobileSidebar();
        }
        requestAnimationFrame(() => input.focus());
    }

    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            const typing = isTypingTarget(event.target);
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                openCommandPalette();
                return;
            }
            if (event.key === '/' && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
                event.preventDefault();
                focusSidebarSearch();
                return;
            }
            if (event.key === 'Escape' && document.body.classList.contains('ux-reader-mode')) {
                setReaderMode(false);
            }
        });

        document.addEventListener('keydown', (event) => {
            const target = event.target;
            if ((event.key === 'Enter' || event.key === ' ') && target instanceof HTMLElement && target.matches('.tab-btn, .sub-tab-btn, .sidebar-item, .sidebar-lesson, .sidebar-module-header')) {
                event.preventDefault();
                target.click();
            }
        });
    }

    function openCheatsheet() {
        return Array.from(document.querySelectorAll('.cheatsheet')).find((sheet) => {
            const style = getComputedStyle(sheet);
            return style.display !== 'none' && style.visibility !== 'hidden' && sheet.offsetParent !== null;
        });
    }

    function ensureReaderButton() {
        if (document.querySelector('.ux-reader-btn')) return;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'ux-reader-btn';
        button.innerHTML = '<span>◫</span><span class="ux-reader-label">Режим чтения</span>';
        button.addEventListener('click', () => setReaderMode(!document.body.classList.contains('ux-reader-mode')));
        document.body.appendChild(button);
    }

    function setReaderMode(enabled) {
        document.querySelectorAll('.ticket.ux-reader-target').forEach((ticket) => ticket.classList.remove('ux-reader-target'));
        if (enabled) {
            const sheet = openCheatsheet();
            const ticket = sheet?.closest('.ticket');
            if (!ticket) enabled = false;
            else ticket.classList.add('ux-reader-target');
        }
        document.body.classList.toggle('ux-reader-mode', enabled);
        const button = document.querySelector('.ux-reader-btn');
        const label = button?.querySelector('.ux-reader-label');
        if (label) label.textContent = enabled ? 'Вернуться' : 'Режим чтения';
        if (enabled) window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function refreshReaderButton() {
        ensureReaderButton();
        const button = document.querySelector('.ux-reader-btn');
        const opened = openCheatsheet();
        if (!button) return;
        button.classList.toggle('visible', Boolean(opened) || document.body.classList.contains('ux-reader-mode'));
        if (!opened && document.body.classList.contains('ux-reader-mode')) setReaderMode(false);
    }

    function setupScrollTop() {
        if (document.getElementById('ux-scroll-top')) return;
        const button = document.createElement('button');
        button.id = 'ux-scroll-top';
        button.type = 'button';
        button.title = 'Наверх';
        button.setAttribute('aria-label', 'Вернуться наверх');
        button.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6"></path></svg>';
        document.body.appendChild(button);
        const update = () => button.classList.toggle('visible', window.scrollY > 520);
        window.addEventListener('scroll', update, { passive: true });
        update();
        button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    function ensureMobileNav() {
        if (document.querySelector('.ux-mobile-nav')) return;
        const nav = document.createElement('nav');
        nav.className = 'ux-mobile-nav';
        nav.setAttribute('aria-label', 'Быстрая навигация');
        nav.innerHTML = `
            <button type="button" data-go="exam"><span>②</span>2 сем</button>
            <button type="button" data-go="semester1"><span>①</span>1 сем</button>
            <button type="button" data-go="tasks"><span>✎</span>Задачи</button>
            <button type="button" data-go="physics"><span>φ</span>Физика</button>
            <button type="button" data-go="menu"><span>☰</span>Меню</button>`;
        nav.addEventListener('click', (event) => {
            const button = event.target.closest('button[data-go]');
            if (!button) return;
            const go = button.dataset.go;
            if (go === 'exam') document.querySelector('.tab-btn[data-tab="exam"]')?.click();
            else if (go === 'tasks') document.querySelector('.tab-btn[data-tab="exam-tasks"]')?.click();
            else if (go === 'physics') document.querySelector('.tab-btn[data-tab="physics-ntk"]')?.click();
            else if (go === 'semester1') {
                if (typeof window.switchToSemester1Subtab === 'function') window.switchToSemester1Subtab('agidu');
                else document.querySelector('[data-semester1-subtab="agidu"]')?.click();
            } else if (go === 'menu' && typeof window.toggleMobileSidebar === 'function') window.toggleMobileSidebar();
            window.setTimeout(refreshMobileNav, 60);
        });
        document.body.appendChild(nav);
        refreshMobileNav();
    }

    function refreshMobileNav() {
        const nav = document.querySelector('.ux-mobile-nav');
        if (!nav) return;
        const activePane = document.querySelector('.tab-pane.active-pane')?.id || '';
        nav.querySelectorAll('button[data-go]').forEach((button) => button.classList.remove('active'));
        let key = '';
        if (activePane === 'exam-pane') key = 'exam';
        else if (activePane === 'exam-tasks-pane') key = 'tasks';
        else if (activePane === 'physics-ntk-pane') key = 'physics';
        else if (activePane === 'semester1-pane') key = 'semester1';
        nav.querySelector(`[data-go="${key}"]`)?.classList.add('active');
    }

    function ensureTopLevelTabs() {
        const tabs = document.querySelector('.tabs');
        if (!tabs) return;
        const exam = tabs.querySelector('.tab-btn[data-tab="exam"]');
        const tasks = tabs.querySelector('.tab-btn[data-tab="exam-tasks"]');
        const physics = tabs.querySelector('.tab-btn[data-tab="physics-ntk"]');
        if (exam && exam.textContent.trim() !== 'Билеты · 2 сем') exam.textContent = 'Билеты · 2 сем';
        if (tasks && tasks.textContent.trim() !== 'Задачи') tasks.textContent = 'Задачи';
        if (physics && physics.textContent.trim() !== 'Физика') physics.textContent = 'Физика';

        let semester = tabs.querySelector('[data-ux-tab="semester1"]');
        if (!semester) {
            semester = document.createElement('div');
            semester.className = 'tab-btn ux-semester1-tab';
            semester.dataset.uxTab = 'semester1';
            semester.textContent = '1 семестр';
            semester.setAttribute('role', 'tab');
            semester.setAttribute('tabindex', '0');
            if (exam?.nextSibling) tabs.insertBefore(semester, exam.nextSibling);
            else tabs.appendChild(semester);
            semester.addEventListener('click', () => {
                if (typeof window.switchToSemester1Subtab === 'function') window.switchToSemester1Subtab('agidu');
                else {
                    document.querySelectorAll('.tab-pane').forEach((pane) => pane.classList.remove('active-pane'));
                    document.getElementById('semester1-pane')?.classList.add('active-pane');
                }
                document.querySelectorAll('.tab-btn').forEach((btn) => btn.classList.remove('active'));
                semester.classList.add('active');
                refreshMobileNav();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        const semPaneActive = document.getElementById('semester1-pane')?.classList.contains('active-pane');
        if (semPaneActive) {
            document.querySelectorAll('.tab-btn').forEach((btn) => btn.classList.remove('active'));
            semester.classList.add('active');
        }
    }

    function polishStaticLabels() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle && subtitle.textContent.trim() !== 'Билеты, повторения, задачи и физика — всё в одном месте') subtitle.textContent = 'Билеты, повторения, задачи и физика — всё в одном месте';
        document.querySelectorAll('.sidebar-item').forEach((item) => {
            if (/АГиТДУ\s*[—-]\s*экз\s*1\s*сем/i.test(item.textContent)) item.textContent = '📐 Алгебра, геометрия и ТДУ · 1 сем';
        });
        const semTab = document.querySelector('#semester1-pane .sub-tab-btn[data-subtab="agidu"]');
        if (semTab && semTab.textContent.trim() !== '📐 Алгебра, геометрия и ТДУ') semTab.textContent = '📐 Алгебра, геометрия и ТДУ';
        const disclaimer = document.querySelector('.disclaimer');
        if (disclaimer && !disclaimer.dataset.uxDone) {
            disclaimer.dataset.uxDone = '1';
            disclaimer.innerHTML = '<strong>Проверяй формулы перед экзаменом.</strong> Конспекты помогают готовиться, но в материалах могут встречаться опечатки.';
        }
    }

    function organizeExamStatus() {
        const pane = document.getElementById('exam-pane');
        if (!pane) return;
        let strip = pane.querySelector(':scope > .ux-exam-status-strip');
        if (!strip) {
            const rank = document.getElementById('rank-card');
            const timer = document.getElementById('timer');
            const pace = document.getElementById('pace-info');
            if (!rank && !timer && !pace) return;
            strip = document.createElement('div');
            strip.className = 'ux-exam-status-strip';
            const anchor = rank || timer || pace;
            anchor.insertAdjacentElement('beforebegin', strip);
            [rank, timer, pace].filter(Boolean).forEach((node) => strip.appendChild(node));
        }
        const timer = document.getElementById('timer');
        const stale = /экзамен!?/i.test(timer?.textContent || '') && !/до экзамена/i.test(timer?.textContent || '');
        strip.classList.toggle('is-stale', stale);
    }

    function decorateResourceBanners() {
        const examBanner = document.querySelector('#list .resource-banner');
        if (examBanner && !examBanner.dataset.uxDone) {
            examBanner.dataset.uxDone = '1';
            const text = examBanner.querySelector('.resource-banner-text');
            if (text && /АГиТДУ/i.test(text.textContent)) text.textContent = 'Алгебра, геометрия и ТДУ · теория 2 семестра';
        }
    }

    function decorate() {
        ensureTopLevelTabs();
        polishStaticLabels();
        ensureSidebarTools();
        ensureSidebarFooter();
        enhanceAccessibility();
        ensureMobileNav();
        ensureCommandPalette();
        organizeExamStatus();
        decorateResourceBanners();

        const examList = document.getElementById('list');
        const sem1List = document.getElementById('semester1-agidu-list');
        if (examList?.querySelector('.ticket')) {
            ensureTicketTools(examList);
            enhanceTicketStates(examList);
            const filter = examList.dataset.uxFilter || 'all';
            applyTicketFilter(examList, filter, false);
        }
        if (sem1List?.querySelector('.ticket')) {
            ensureTicketTools(sem1List);
            enhanceTicketStates(sem1List);
            const filter = sem1List.dataset.uxFilter || 'all';
            applyTicketFilter(sem1List, filter, false);
        }

        ensureStudyDashboard(document.getElementById('exam-pane'));
        ensureStudyDashboard(document.getElementById('semester1-pane'));
        document.querySelectorAll('.ux-study-dashboard').forEach((dashboard) => {
            const pane = dashboard.closest('.tab-pane');
            refreshDashboard(dashboard, subjectDashboardConfig(pane).list);
        });

        ensureSemester1Figures();
        ensureFigureSourceLinks();
        refreshReaderButton();
        refreshMobileNav();
    }

    function watchDynamicContent() {
        const root = document.querySelector('.main-content') || document.body;
        if (typeof MutationObserver === 'undefined' || !root) return;
        let scheduled = false;
        const observer = new MutationObserver(() => {
            if (scheduled) return;
            scheduled = true;
            requestAnimationFrame(() => {
                scheduled = false;
                decorate();
            });
        });
        observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
    }

    function watchDynamicSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar || typeof MutationObserver === 'undefined') return;
        let scheduled = false;
        const observer = new MutationObserver(() => {
            if (scheduled) return;
            scheduled = true;
            requestAnimationFrame(() => {
                scheduled = false;
                const input = document.getElementById(SEARCH_ID);
                if (input?.value) {
                    if (typeof window.applySidebarSearch === 'function') window.applySidebarSearch();
                    else fallbackSidebarSearch(input.value);
                }
                enhanceAccessibility();
            });
        });
        observer.observe(sidebar, { childList: true, subtree: true });
    }

    function init() {
        document.documentElement.classList.remove('ux-v2');
        document.documentElement.classList.add('ux-v3');
        setupKeyboardShortcuts();
        setupScrollTop();
        ensureReaderButton();
        decorate();
        watchDynamicSidebar();
        watchDynamicContent();
        window.setTimeout(decorate, 250);
        window.setTimeout(decorate, 900);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();
