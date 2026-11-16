(() => {
    'use strict';

    const KEY = 'probability_progress_v1';
    const INTERVALS = [1, 3, 7, 14, 30];
    let data, progress = readProgress();
    let pane, generation = 0, lastAction = null, view = 'tickets';

    function cleanProgress(raw) {
        const result = { version: 2, tickets: {}, legacyTickets: {} };
        if (!raw || typeof raw !== 'object') return result;
        if (raw.version === 2 && raw.legacyTickets && typeof raw.legacyTickets === 'object') result.legacyTickets = raw.legacyTickets;
        else if (raw.tickets && typeof raw.tickets === 'object') {
            result.legacyTickets = { ...raw.tickets };
            delete result.legacyTickets['1'];
        }
        for (const [id, entry] of Object.entries(raw.tickets || {})) {
            if (!/^[1-9]\d{0,3}$/.test(id) || !entry || typeof entry !== 'object' || (raw.version !== 2 && id !== '1')) continue;
            const step = Number.isInteger(entry.step) ? Math.max(0, Math.min(5, entry.step)) : 0;
            let nextReview = typeof entry.nextReview === 'string' && Number.isFinite(Date.parse(entry.nextReview)) ? entry.nextReview : null;
            const history = Array.isArray(entry.history) ? entry.history.filter(x => typeof x === 'string' && Number.isFinite(Date.parse(x))).slice(-100) : [];
            // Older progress stopped scheduling after step 5. Resume monthly reviews.
            if (step === INTERVALS.length && !nextReview && history.length) nextReview = reviewAfter(history[history.length - 1], INTERVALS[INTERVALS.length - 1]);
            result.tickets[id] = { step, nextReview, history };
        }
        return result;
    }

    function readProgress() {
        try { return cleanProgress(JSON.parse(localStorage.getItem(KEY) || '{}')); }
        catch (_) { return cleanProgress(null); }
    }

    function save() {
        if (typeof saveToStorage === 'function') saveToStorage(KEY, JSON.stringify(progress));
        else localStorage.setItem(KEY, JSON.stringify(progress));
        if (data && pane) updateExamView();
        window.CourseNavigation?.refresh();
    }

    function node(tag, className, text) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (text !== undefined) el.textContent = text;
        return el;
    }

    function button(label, callback, className = 'action-btn') {
        const el = node('button', className, label);
        el.type = 'button';
        el.addEventListener('click', callback);
        return el;
    }

    function typeset(el) { window.typesetKaTeX?.([el]); }
    const entryFor = id => progress.tickets[id] || { step: 0, nextReview: null, history: [] };
    function reviewDay(value = new Date()) {
        const date = new Date(value);
        date.setHours(0, 0, 0, 0);
        return date;
    }

    function reviewAfter(value, days) {
        const date = reviewDay(value);
        date.setDate(date.getDate() + days);
        return date.toISOString();
    }

    const due = (entry, now = new Date()) => !entry.nextReview || reviewDay(entry.nextReview) <= reviewDay(now);

    function advanceReview(entry, now = new Date()) {
        if (!due(entry, now)) return entry;
        const today = reviewDay(now);
        const history = [...entry.history];
        if (!history.length || reviewDay(history[history.length - 1]).getTime() !== today.getTime()) history.push(today.toISOString());
        return {
            step: Math.min(entry.step + 1, INTERVALS.length),
            nextReview: reviewAfter(today, INTERVALS[Math.min(entry.step, INTERVALS.length - 1)]),
            history
        };
    }

    function undoReview(entry, now = new Date()) {
        if (!entry.step) return entry;
        const history = entry.history.slice(0, -1);
        const step = entry.step === INTERVALS.length && history.length >= INTERVALS.length ? INTERVALS.length : entry.step - 1;
        return {
            step,
            nextReview: step ? reviewAfter(history[history.length - 1] || now, INTERVALS[step - 1]) : null,
            history
        };
    }

    function updateExamView() {
        const list = pane.querySelector('#probability-ticket-list');
        if (!list) return;
        const entries = data.tickets.map(t => entryFor(t.id));
        const mastered = entries.filter(e => e.step >= 5).length;
        const learning = entries.filter(e => e.step > 0 && e.step < 5).length;
        const ready = entries.filter(e => due(e)).length;
        const score = entries.reduce((sum, e) => sum + e.step, 0);
        const set = (id, value) => { const el = pane.querySelector(`[data-exam-copy="${id}"]`); if (el) el.textContent = value; };
        set('stat-mastered', mastered); set('stat-learning', learning);
        set('stat-notstarted', entries.filter(e => !e.step).length);
        set('stat-totalrepeats', entries.reduce((sum, e) => sum + e.history.length, 0));
        set('count-ready', ready); set('mastery-percent', Math.round(mastered / entries.length * 100));
        set('today-date', new Date().toLocaleDateString('ru-RU'));
        const today = new Date();
        const days = Math.ceil((Date.UTC(2027, 0, 9) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000);
        const timer = pane.querySelector('.timer-card');
        if (timer) timer.textContent = days > 0 ? `До экзамена (9 января 2027): ${days} дн.` : days === 0 ? 'Экзамен сегодня · 9 января 2027' : 'Предварительная дата экзамена: 9 января 2027';
        const pace = pane.querySelector('.pace-card');
        if (pace) pace.textContent = days > 0 ? `Осталось освоить: ${entries.length - mastered} из ${entries.length} билетов` : 'Дата экзамена прошла';
        const rank = typeof getCurrentRank === 'function' ? getCurrentRank(score) : null;
        if (rank) { set('rank-icon', rank.icon); set('rank-title', rank.title); set('rank-sub', rank.subtitle); }
        set('rank-stats', `${score}/${entries.length * 5} очков`);
        const fill = pane.querySelector('[data-exam-copy="rank-progress-fill"]');
        if (fill) fill.style.width = `${score / (entries.length * 5) * 100}%`;
        const filter = list.dataset.filter || 'all';
        let shown = 0;
        list.querySelectorAll(':scope > .ticket').forEach(card => {
            const entry = entryFor(card.dataset.itemId);
            card.classList.toggle('ready', due(entry)); card.classList.toggle('waiting', !due(entry));
            const ticket = data.tickets.find(item => item.id === Number(card.dataset.itemId));
            card.querySelector('.ticket-meta').textContent = `шаг: ${entry.step}/5 | ${entry.nextReview ? `повтор: ${new Date(entry.nextReview).toLocaleDateString('ru-RU')}` : '📖 не изучен'} | повторов: ${entry.history.length} | ${ticket.status}`;
            const action = card.querySelector('.prob-advance');
            action.textContent = entry.step ? '🔄 Повторил' : '✅ Изучить'; action.disabled = !ticket.content || !due(entry);
            card.querySelector('.undo-btn').disabled = !entry.step;
            const visible = filter === 'all' || (filter === 'new' && !entry.step) || (filter === 'due' && entry.step > 0 && entry.step < 5 && due(entry)) || (filter === 'learning' && entry.step > 0 && entry.step < 5) || (filter === 'mastered' && entry.step >= 5);
            card.classList.toggle('ux-filter-hidden', !visible);
            if (visible) shown++;
        });
        list.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
        list.querySelector('.ux-filter-count').textContent = filter === 'all' ? `${entries.length} билетов` : `${shown} из ${entries.length}`;
    }

    function viewNavigation() {
        const nav = node('nav', 'sub-tabs prob-course-nav');
        nav.setAttribute('aria-label', 'Разделы теории вероятностей');
        [['tickets', 'Билеты'], ['practice', 'Практика']].forEach(([id, label]) => {
            const link = button(label, () => open(id), 'sub-tab-btn');
            link.dataset.probView = id;
            link.classList.toggle('active', view === id);
            if (view === id) link.setAttribute('aria-current', 'page');
            nav.append(link);
        });
        return nav;
    }

    function renderCurrentView(target) {
        pane.dataset.probabilityView = view;
        if (view === 'practice') {
            pane.replaceChildren(viewNavigation());
            window.ProbabilityPractice.render(pane, data.tickets, target);
        } else renderExamShell();
    }

    function renderExamShell() {
        pane.replaceChildren(viewNavigation());
        const original = document.getElementById('exam-pane');
        [...original.children].forEach(child => {
            if (child.id === 'list' || child.classList.contains('button-group')) return;
            const copy = child.cloneNode(true);
            [copy, ...copy.querySelectorAll('[id]')].forEach(el => {
                if (el.id) { el.dataset.examCopy = el.id; el.removeAttribute('id'); }
            });
            if (copy.classList.contains('timer-card')) copy.textContent = 'Предварительная дата экзамена: 9 января 2027';
            if (copy.classList.contains('pace-card')) copy.textContent = 'Подготовка к экзамену';
            if (copy.textContent.trim() === 'АГиТДУ — теория (2 семестр)') copy.textContent = 'Теория вероятностей — билеты';
            pane.append(copy);
        });
        const list = node('div', 'ticket-list');
        list.id = 'probability-ticket-list';
        const filters = node('div', 'ux-ticket-filters');
        const group = node('div', 'ux-filter-group');
        [['all','Все'],['due','К повторению'],['learning','В процессе'],['mastered','Освоено'],['new','Новые']].forEach(([id, label]) => {
            const filter = button(label, () => { list.dataset.filter = id; updateExamView(); }, '');
            filter.dataset.filter = id; group.append(filter);
        });
        filters.append(group, node('span', 'ux-filter-count'));
        list.append(filters);
        data.tickets.forEach(item => {
            const card = node('div', 'ticket'); card.dataset.itemId = item.id;
            const header = node('div', 'ticket-header');
            const title = node('div', 'ticket-title', `${item.id}. ${item.title}`);
            const actions = node('div', 'action-buttons');
            const action = (label, fn, cls) => button(label, event => { event.stopPropagation(); fn(); }, cls);
            const undo = action('↩️', () => undoTicket(item.id), 'undo-btn');
            undo.setAttribute('aria-label', `Отменить повторение билета ${item.id}`);
            const study = action('✅ Изучить', () => advance(item.id), 'action-btn prob-advance');
            const history = action('📜', () => showHistory(item.id), 'action-btn');
            history.setAttribute('aria-label', `История билета ${item.id}`);
            const practice = action(item.practice?.length ? `Практика (${item.practice.length})` : 'Практика', () => open('practice', item.id), 'action-btn prob-practice-open');
            practice.disabled = !item.practice?.length;
            practice.title = item.practice?.length ? `Открыть задачи к билету ${item.id}` : 'Задачи к этому билету пока не добавлены';
            actions.append(undo, study, history, practice); header.append(title, actions);
            const meta = node('div', 'ticket-meta');
            const sheet = node('div', 'cheatsheet');
            if (item.content) {
                const conspect = node('div', 'conspect-content');
                conspect.innerHTML = item.content;
                sheet.append(conspect);
            }
            else sheet.append(node('p', '', item.status === 'Черновик готов' ? 'Черновик готов. Теория пока не добавлена.' : 'Теория пока не добавлена.'));
            card.append(header, meta, sheet);
            card.addEventListener('click', event => {
                if (event.target.closest('.cheatsheet, button')) return;
                const open = sheet.style.display !== 'block';
                sheet.style.display = open ? 'block' : 'none';
                card.classList.toggle('cheatsheet-open', open);
                if (open) typeset(sheet);
            });
            list.append(card);
        });
        pane.append(list, node('div', 'ornament', '◈ ◈ ◈'));
        const bottom = node('div', 'button-group');
        bottom.append(button('Отменить последнее', () => {
            if (!lastAction) { alert('Нет действий для отмены'); return; }
            progress.tickets[lastAction.id] = lastAction.entry; lastAction = null; save();
        }, 'global-undo-btn'));
        bottom.append(button('Сбросить прогресс', () => {
            if (!confirm('Сбросить прогресс по билетам теории вероятностей?')) return;
            progress.tickets = {}; lastAction = null; save();
        }, 'reset-btn'));
        pane.append(bottom);
        updateExamView();
    }

    function advance(id) {
        const entry = entryFor(id);
        if (!due(entry)) return;
        lastAction = { id, entry: JSON.parse(JSON.stringify(entry)) };
        progress.tickets[id] = advanceReview(entry);
        save();
    }

    function undoTicket(id) {
        const entry = entryFor(id);
        if (!entry.step) return;
        if (lastAction?.id === id) {
            progress.tickets[id] = lastAction.entry;
        } else progress.tickets[id] = undoReview(entry);
        lastAction = null;
        save();
    }

    function showHistory(id) {
        const dialog = node('dialog', 'prob-history-dialog');
        const title = node('h2', '', `История билета ${id}`);
        title.id = 'prob-history-title';
        dialog.setAttribute('aria-labelledby', title.id);
        dialog.append(title, node('p', 'prob-note', data.tickets.find(item => item.id === id).title));
        const history = entryFor(id).history;
        if (history.length) {
            const list = node('ol', 'prob-history-list');
            history.forEach(date => list.append(node('li', '', new Date(date).toLocaleDateString('ru-RU'))));
            dialog.append(list);
        } else dialog.append(node('p', '', 'История повторений пуста.'));
        dialog.append(button('Закрыть', () => dialog.close()));
        dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
        dialog.addEventListener('close', () => dialog.remove(), { once: true });
        document.body.append(dialog);
        dialog.showModal();
    }

    async function open(nextView, target) {
        const run = ++generation;
        pane = document.getElementById('probability-pane');
        document.querySelectorAll('.tab-pane').forEach(el => el.classList.toggle('active-pane', el === pane));
        document.querySelectorAll('.tab-btn').forEach(el => el.classList.toggle('active', el.dataset.tab === 'probability'));
        try { localStorage.setItem('active_tab', 'probability'); } catch (_) {}
        if (!data) {
            pane.replaceChildren(node('p', 'prob-note', 'Загружаем теорию вероятностей…'));
            pane.setAttribute('aria-busy', 'true');
            try {
                await window.DataLoader.load('probability');
                data = PROBABILITY_DATA;
            } catch (error) {
                if (run === generation) {
                    pane.replaceChildren(node('p', 'prob-note', 'Материалы не загрузились. Проверь подключение и попробуй снова.'), button('Повторить загрузку', () => open(nextView, target)));
                    pane.removeAttribute('aria-busy');
                }
                console.error(error);
                return;
            }
        }
        if (run !== generation) return;
        pane.removeAttribute('aria-busy');
        view = (nextView || localStorage.getItem('probability_view')) === 'practice' ? 'practice' : 'tickets';
        localStorage.setItem('probability_view', view);
        progress = readProgress();
        renderCurrentView(target);
        if (target && view === 'tickets') {
            const card = pane.querySelector(`[data-item-id="${Number(target)}"]`);
            card?.querySelector('.ticket-title')?.click();
            requestAnimationFrame(() => card?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        }
        window.CourseNavigation?.refresh();
    }

    window.ProbabilityCourse = {
        normalizeProgress: cleanProgress,
        open,
        reload() {
            progress = readProgress(); lastAction = null;
            view = localStorage.getItem('probability_view') === 'practice' ? 'practice' : 'tickets';
            if (data && pane?.classList.contains('active-pane')) renderCurrentView();
            window.CourseNavigation?.refresh();
        },
        exportProgress: () => readProgress(),
        importProgress(raw) { progress = cleanProgress(raw); lastAction = null; save(); if (data && pane?.classList.contains('active-pane')) renderCurrentView(); },
        ticketStep: id => readProgress().tickets[id]?.step || 0
    };
    window.addEventListener('storage', event => { if (event.key === KEY || event.key === null) window.ProbabilityCourse.reload(); });
    setInterval(() => {
        if (!data || !pane?.classList.contains('active-pane')) return;
        if (data && pane) updateExamView();
    }, 60000);
})();
