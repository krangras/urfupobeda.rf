(() => {
    'use strict';
    const KEY = 'probability_practice_v1';
    const record = value => value && typeof value === 'object' && !Array.isArray(value);
    const taskKey = (ticketId, taskId) => `${ticketId}:${taskId}`;
    let progress = readProgress(), host, tickets = [], selected;

    function normalizeProgress(raw) {
        const result = { version: 1, tasks: {} };
        if (!record(raw) || !record(raw.tasks)) return result;
        Object.entries(raw.tasks).forEach(([key, entry]) => {
            if (!/^[1-9]\d{0,3}:[1-9]\d{0,3}$/.test(key) || !record(entry)) return;
            result.tasks[key] = {
                answer: typeof entry.answer === 'string' ? entry.answer.slice(0, 200) : '',
                reason: typeof entry.reason === 'string' ? entry.reason.slice(0, 10000) : '',
                checked: entry.checked === true,
                completed: entry.completed === true
            };
        });
        return result;
    }

    function validateProgress(raw) {
        if (!record(raw) || !record(raw.tasks)) throw new Error('Некорректный прогресс практики тервера');
        for (const [key, entry] of Object.entries(raw.tasks)) {
            if (!/^[1-9]\d{0,3}:[1-9]\d{0,3}$/.test(key) || !record(entry)
                || typeof entry.answer !== 'string' || entry.answer.length > 200
                || (entry.reason !== undefined && (typeof entry.reason !== 'string' || entry.reason.length > 10000))
                || typeof entry.completed !== 'boolean' || typeof entry.checked !== 'boolean') {
                throw new Error('Некорректный ответ в практике тервера');
            }
        }
        return normalizeProgress(raw);
    }

    function readProgress() { return normalizeProgress(readStoredJSON(KEY, {})); }
    const entryFor = key => progress.tasks[key] || { answer: '', reason: '', checked: false, completed: false };
    const node = (tag, className, text) => {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (text !== undefined) el.textContent = text;
        return el;
    };
    const button = (label, callback, className = 'matrix-check-btn') => {
        const el = node('button', className, label); el.type = 'button'; el.addEventListener('click', callback); return el;
    };

    function checkAnswer(task, entry) {
        if (!entry.answer.trim()) return 'empty';
        if (task.type === 'boolean') {
            if (!['yes', 'no'].includes(entry.answer)) return 'invalid';
            if (task.requireReason && !entry.reason.trim()) return 'reason';
            return (entry.answer === 'yes') === task.answer ? 'correct' : 'wrong';
        }
        let value = entry.answer.trim();
        if (/^\d{1,3}(?:[ \u00a0\u202f]\d{3})+$/.test(value)) value = value.replace(/[ \u00a0\u202f]/g, '');
        const number = parseFiniteNumber(value);
        if (!Number.isSafeInteger(number) || number < 0) return 'invalid';
        return number === task.answer ? 'correct' : 'wrong';
    }

    function stats(courseTickets = tickets, saved = readProgress()) {
        let total = 0, solved = 0;
        courseTickets.forEach(ticket => (ticket.practice || []).forEach(task => {
            total++;
            if (saved.tasks[taskKey(ticket.id, task.id)]?.completed) solved++;
        }));
        return { total, solved };
    }

    function save(updateCounters = true) {
        saveToStorage(KEY, JSON.stringify(progress));
        if (updateCounters) updateStats();
    }

    function updateStats() {
        if (!host?.isConnected) return;
        const counts = stats(tickets, progress), percent = counts.total ? counts.solved / counts.total * 100 : 0;
        const values = { solved: counts.solved, total: counts.total, percent: `${percent.toFixed(1)}%`, remaining: counts.total - counts.solved };
        Object.entries(values).forEach(([key, value]) => { const el = host.querySelector(`[data-prob-stat="${key}"]`); if (el) el.textContent = value; });
        const fill = host.querySelector('.progress-fill'); if (fill) fill.style.width = `${percent}%`;
        host.querySelectorAll('#probability-practice-ticket option').forEach(option => {
            const ticket = tickets.find(t => String(t.id) === option.value);
            const counts = stats([ticket], progress);
            option.textContent = `Билет ${ticket.id}. ${ticket.title} (${counts.solved}/${counts.total})`;
        });
    }

    function renderTask(ticket, task) {
        const key = taskKey(ticket.id, task.id), prefix = `prob-task-${ticket.id}-${task.id}`;
        const card = node('div', 'task-card'); card.dataset.probTask = key;
        const header = node('div', 'task-header'), label = node('label', 'prob-task-label');
        const checkbox = node('input'); checkbox.type = 'checkbox'; checkbox.id = `${prefix}-done`;
        checkbox.setAttribute('aria-label', `Отметить задачу ${task.id} решённой`);
        const title = node('span', 'task-title', `${task.id}. ${task.title}`);
        label.append(checkbox, title); header.append(label);
        const content = node('div', 'task-content');
        content.append(node('div', 'prob-note', `По заданию презентации Солодушкина · слайд ${task.slide}`));
        const condition = node('div', 'task-demand'); condition.innerHTML = task.condition;
        content.append(condition);
        const form = node('form', 'prob-answer-form'); form.noValidate = true;
        const answerLabel = node('label', 'matrix-input-label', 'Ответ'); answerLabel.htmlFor = `${prefix}-answer`;
        let input;
        if (task.type === 'boolean') {
            input = node('select', 'matrix-cell-input prob-answer-input');
            [['', 'Выберите ответ'], ['yes', 'Да'], ['no', 'Нет']].forEach(([value, text]) => { const option = node('option', '', text); option.value = value; input.append(option); });
        } else {
            input = node('input', 'matrix-cell-input prob-answer-input'); input.type = 'text'; input.inputMode = 'numeric'; input.maxLength = 200; input.autocomplete = 'off';
        }
        input.id = `${prefix}-answer`; input.name = 'answer'; input.value = entryFor(key).answer;
        form.append(answerLabel, input);
        let reason;
        if (task.requireReason) {
            const reasonLabel = node('label', 'matrix-input-label', 'Обоснование'); reasonLabel.htmlFor = `${prefix}-reason`;
            reason = node('textarea', 'prob-reason-input'); reason.id = reasonLabel.htmlFor; reason.rows = 4; reason.maxLength = 10000; reason.value = entryFor(key).reason;
            const note = node('p', 'prob-note', 'Автоматически проверяется ответ «да/нет». Обоснование сохраняется для самопроверки.'); note.id = `${prefix}-note`;
            reason.setAttribute('aria-describedby', note.id); form.append(reasonLabel, reason, note);
        }
        const row = node('div', 'matrix-check-row');
        const check = node('button', 'matrix-check-btn', 'Проверить'); check.type = 'submit';
        const feedback = node('span', 'matrix-feedback'); feedback.id = `${prefix}-feedback`; feedback.setAttribute('role', 'status'); feedback.setAttribute('aria-live', 'polite');
        input.setAttribute('aria-describedby', feedback.id);
        row.append(check, feedback); form.append(row); content.append(form); card.append(header, content);
        const updateCard = () => {
            const entry = entryFor(key), result = entry.checked ? checkAnswer(task, entry) : '';
            checkbox.checked = entry.completed; card.classList.toggle('completed', entry.completed);
            title.style.textDecoration = entry.completed ? 'line-through' : '';
            input.classList.toggle('matrix-cell-correct', result === 'correct');
            input.classList.toggle('matrix-cell-wrong', !!result && result !== 'correct');
            if (result && result !== 'correct') input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
            feedback.className = `matrix-feedback ${result === 'correct' ? 'fb-correct' : result ? 'fb-wrong' : ''}`;
            feedback.textContent = { correct: '✅ Верно!', wrong: '❌ Неверно. Попробуйте ещё раз.', empty: 'Введите ответ.', invalid: task.type === 'boolean' ? 'Выберите «да» или «нет».' : 'Введите целое неотрицательное число.', reason: 'Добавьте обоснование в поле выше.' }[result] || '';
        };
        const edit = () => {
            const previous = entryFor(key);
            if (previous.answer === input.value && previous.reason === (reason?.value || '')) return;
            progress.tasks[key] = { answer: input.value, reason: reason?.value || '', checked: false, completed: false };
            save(previous.completed); updateCard();
        };
        input.addEventListener(task.type === 'boolean' ? 'change' : 'input', edit);
        reason?.addEventListener('input', edit);
        checkbox.addEventListener('change', () => { progress.tasks[key] = { ...entryFor(key), completed: checkbox.checked }; save(); updateCard(); });
        form.addEventListener('submit', event => {
            event.preventDefault();
            const entry = { answer: input.value, reason: reason?.value || '', checked: true, completed: false };
            entry.completed = checkAnswer(task, entry) === 'correct';
            progress.tasks[key] = entry; save(); updateCard();
        });
        updateCard(); return card;
    }

    function renderGroup() {
        const container = host.querySelector('#probability-practice-tasks');
        const ticket = tickets.find(t => t.id === selected), tasks = ticket.practice || [];
        container.replaceChildren(node('h2', 'prob-practice-heading', `Практика к билету № ${ticket.id}`));
        if (tasks.length) tasks.forEach(task => container.append(renderTask(ticket, task)));
        else container.append(node('p', 'prob-note', 'Задачи к этому билету пока не добавлены.'));
        window.typesetKaTeX?.([container]); updateStats();
    }

    function render(root, courseTickets, ticketId) {
        host = root; tickets = courseTickets; progress = readProgress();
        const requested = Number(ticketId || localStorage.getItem('probability_practice_ticket'));
        selected = tickets.some(t => t.id === requested) ? requested : tickets.find(t => t.practice?.length)?.id || tickets[0].id;
        localStorage.setItem('probability_practice_ticket', String(selected));
        const toolbar = node('div', 'toolbar');
        toolbar.append(button('Сохранить прогресс', () => exportAllToFile(), 'btn-save'), button('Загрузить прогресс', () => importAllFromFile(), 'btn-load'));
        const panel = node('div', 'kr-stats-panel prob-practice-stats'), grid = node('div', 'stats-grid-inline');
        [['solved','✅ Решено'], ['total','📋 Всего задач'], ['percent','📊 Прогресс'], ['remaining','⏳ Осталось']].forEach(([key, label]) => {
            const item = node('div', 'stats-grid-item'), value = node('div', 'stats-grid-value'); value.dataset.probStat = key;
            item.append(value, node('div', 'stats-grid-label', label)); grid.append(item);
        });
        const bar = node('div', 'progress-bar'); bar.append(node('div', 'progress-fill')); panel.append(grid, bar);
        const filters = node('div', 'prob-practice-controls'), label = node('label', '', 'Билет:'); label.htmlFor = 'probability-practice-ticket';
        const select = node('select'); select.id = label.htmlFor;
        tickets.forEach(ticket => { const option = node('option'); option.value = ticket.id; select.append(option); }); select.value = selected;
        select.addEventListener('change', () => { selected = Number(select.value); localStorage.setItem('probability_practice_ticket', String(selected)); renderGroup(); });
        const reset = button('🗑️ Сбросить задачи билета', () => {
            if (!confirm(`Сбросить ответы и отметки задач билета ${selected}?`)) return;
            Object.keys(progress.tasks).filter(key => key.startsWith(`${selected}:`)).forEach(key => delete progress.tasks[key]);
            save(); renderGroup();
        }, 'reset-btn');
        filters.append(label, select, reset);
        const container = node('div'); container.id = 'probability-practice-tasks';
        host.append(toolbar, panel, filters, container); renderGroup();
    }

    window.ProbabilityPractice = { normalizeProgress, validateProgress, exportProgress: readProgress, stats, render };
    window.addEventListener('storage', event => {
        if ((event.key === KEY || event.key === null) && host?.isConnected && host.classList.contains('active-pane') && host.dataset.probabilityView === 'practice') {
            progress = readProgress(); renderGroup();
        }
    });
})();
