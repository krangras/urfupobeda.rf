function normalizeTicketProgress(items, names) {
    return names.map((name, id) => {
        const entry = Array.isArray(items) ? items.find(t => t && t.id === id) : null;
        const date = value => (typeof value === 'number' || typeof value === 'string') && value !== '' && Number.isFinite(new Date(value).getTime());
        return { id, name, step: Number.isInteger(entry?.step) ? Math.max(0, Math.min(5, entry.step)) : 0,
            nextReview: date(entry?.nextReview) ? new Date(entry.nextReview).getTime() : null,
            history: Array.isArray(entry?.history) ? entry.history.filter(date).map(t => new Date(t).getTime()).slice(-1000) : [] };
    });
}

function buildFullBackup() {
    return {
        version: '4.0', date: new Date().toISOString(),
        tickets: readStoredJSON('exam_manager_v9', []),
        semester1: readStoredJSON('semester1_progress', []),
        integrals: readStoredJSON('integrals_progress', {}), kr: readStoredJSON('kr_progress', {}),
        examTasks: readStoredJSON('exam_tasks_progress', {}), examMatrixAnswers: readStoredJSON('exam_matrix_answers', {}),
        physics: readStoredJSON('physics_progress', {}), physicsAnswers: readStoredJSON('physics_answers', {}),
        probability: window.ProbabilityCourse?.exportProgress() || readStoredJSON('probability_progress_v1', {}),
        probabilityPractice: window.ProbabilityPractice.exportProgress(),
        probabilityView: localStorage.getItem('probability_view') || 'tickets',
        probabilityPracticeTicket: localStorage.getItem('probability_practice_ticket') || '1',
        integralsSectionsState: readStoredJSON('integrals_sections_state', {}),
        activeTab: localStorage.getItem('active_tab') || 'exam',
        semester1Subtab: localStorage.getItem('semester1_subtab') || 'agidu'
    };
}

async function prepareBackup(input) {
    const data = Array.isArray(input) ? { tickets: input } : input;
    const record = value => value && typeof value === 'object' && !Array.isArray(value);
    if (!record(data) || (!data.tickets && !data.probability && !data.probabilityPractice)) throw new Error('Неверный формат сохранения');
    for (const field of ['tickets', 'semester1']) {
        if (field in data && !Array.isArray(data[field])) throw new Error(`Некорректное поле ${field}`);
        for (const entry of data[field] || []) {
            if (!record(entry) || !Number.isInteger(entry.id) || !Number.isInteger(entry.step) || entry.step < 0 || entry.step > 5 || !Array.isArray(entry.history || [])) throw new Error(`Некорректный прогресс ${field}`);
            if (entry.nextReview != null && !Number.isFinite(new Date(entry.nextReview).getTime())) throw new Error('Некорректная дата повторения');
            if ((entry.history || []).some(t => !['number','string'].includes(typeof t) || !Number.isFinite(new Date(t).getTime()))) throw new Error('Некорректная история');
        }
        if (data[field] && new Set(data[field].map(t => t.id)).size !== data[field].length) throw new Error('Повторяющиеся номера билетов');
    }
    for (const field of ['integrals', 'kr', 'examTasks', 'physics', 'physicsAnswers', 'examMatrixAnswers', 'probability', 'integralsSectionsState']) {
        if (field in data && !record(data[field])) throw new Error(`Некорректное поле ${field}`);
    }
    for (const field of ['integrals', 'kr', 'examTasks', 'physics', 'integralsSectionsState']) {
        if (data[field] && Object.values(data[field]).some(v => ![true,false,0,1].includes(v))) throw new Error(`Некорректные отметки ${field}`);
    }
    const scalar = v => typeof v === 'string' || (typeof v === 'number' && Number.isFinite(v));
    if (data.physicsAnswers && Object.values(data.physicsAnswers).some(v => !scalar(v))) throw new Error('Некорректные ответы физики');
    if (data.examMatrixAnswers && Object.values(data.examMatrixAnswers).some(v => !record(v) || Object.values(v).some(x => !scalar(x)))) throw new Error('Некорректные ответы практики');
    if (data.probability?.tickets && (!record(data.probability.tickets) || Object.values(data.probability.tickets).some(t => !record(t) || !Number.isInteger(t.step) || t.step < 0 || t.step > 5))) throw new Error('Некорректный прогресс тервера');
    const probabilityPractice = 'probabilityPractice' in data ? window.ProbabilityPractice.validateProgress(data.probabilityPractice) : null;
    const needed = new Set();
    if (data.semester1) needed.add('semester1');
    if (data.integrals) needed.add('integrals');
    if (data.kr) needed.add('controlWork');
    if (data.examTasks || data.examMatrixAnswers) needed.add('examTasks');
    if (data.physics || data.physicsAnswers) needed.add('physics');
    await Promise.all([...needed].map(kind => window.DataLoader.load(kind)));
    const changes = {};
    const encode = (key, value) => { changes[key] = JSON.stringify(value); };
    if (data.tickets) {
        if (data.tickets.length !== ticketsData.length && !isOldTicketsData(data.tickets)) throw new Error('Неизвестный набор билетов АГиТДУ');
        const tickets = isOldTicketsData(data.tickets) ? migrateOldTickets(data.tickets) : isOldOrderState(data.tickets) ? migrateReorder(data.tickets) : data.tickets;
        encode('exam_manager_v9', normalizeTicketProgress(tickets, ticketsData.map(t => t.t)));
    }
    if (data.semester1?.length || (data.version === '4.0' && data.semester1)) {
        if (data.semester1.length && data.semester1.length !== SEMESTER1_DATA.length) throw new Error('Неизвестный набор билетов 1 семестра');
        encode('semester1_progress', normalizeTicketProgress(data.semester1, SEMESTER1_DATA.map(t => t.title)));
    }
    const filterMap = (source, valid) => Object.fromEntries(Object.entries(source).filter(([key]) => valid.has(key)));
    if (data.integrals) {
        const valid = new Set(); Object.entries(INTEGRALS_DATA).forEach(([section, tasks]) => tasks.forEach((_, i) => valid.add(`s${section.replace('section','')}_t${i}`)));
        encode('integrals_progress', filterMap(data.integrals, valid));
    }
    for (const [field, key, groups] of [['kr','kr_progress',data.kr ? typeConfig : []], ['examTasks','exam_tasks_progress',data.examTasks ? examTasksData : []]]) {
        if (!data[field]) continue;
        const count = groups.reduce((n,t) => n + t.tasks.length, 0);
        encode(key, filterMap(data[field], new Set(Array.from({length:count},(_,i) => String(i+1)))));
    }
    if (data.physics || data.physicsAnswers) {
        const valid = new Set(), answers = new Set();
        PHYSICS_NTK_DATA.forEach(section => section.problems.forEach((_,i) => {
            const key = `${section.id}_${i}`; valid.add(key);
            ['txt','opt','chk','sol'].forEach(suffix => answers.add(`${key}_${suffix}`));
        }));
        if (data.physics) encode('physics_progress', filterMap(data.physics, valid));
        if (data.physicsAnswers) encode('physics_answers', filterMap(data.physicsAnswers, answers));
    }
    if (data.examMatrixAnswers) {
        const count = examTasksData.reduce((n,t) => n + t.tasks.length,0);
        const valid = new Set(Array.from({length:count},(_,i) => String(i+1)));
        encode('exam_matrix_answers', filterMap(data.examMatrixAnswers, valid));
    }
    if (data.probability) encode('probability_progress_v1', window.ProbabilityCourse.normalizeProgress(data.probability));
    if (probabilityPractice) encode('probability_practice_v1', probabilityPractice);
    const activeTab = ['exam','semester1','exam-tasks','physics-ntk','probability'].includes(data.activeTab) ? data.activeTab : null;
    const subtab = ['agidu','math','discrete'].includes(data.semester1Subtab) ? data.semester1Subtab : 'agidu';
    const practicePreferences = {};
    if ('probabilityView' in data) practicePreferences.probability_view = data.probabilityView === 'practice' ? 'practice' : 'tickets';
    if (/^[1-9]\d{0,3}$/.test(String(data.probabilityPracticeTicket || ''))) practicePreferences.probability_practice_ticket = String(data.probabilityPracticeTicket);
    return { changes, activeTab, subtab, practicePreferences, sections: data.integralsSectionsState, date: typeof data.date === 'string' ? data.date : '' };
}

async function applyBackup(data) {
    const prepared = await prepareBackup(data); // All validation and loading finish before any writes.
    const preferences = { semester1_subtab: prepared.subtab, ...prepared.practicePreferences };
    if (prepared.activeTab) preferences.active_tab = prepared.activeTab;
    if (prepared.sections) preferences.integrals_sections_state = JSON.stringify(prepared.sections);
    commitProgressBatch(prepared.changes, preferences);
    await reinitApp();
    return prepared;
}

async function refreshStoredModels() {
    restoringProgress = true;
    try {
        initState();
        semester1State = null;
        if (typeof SEMESTER1_DATA !== 'undefined') await initSemester1State();
        krProgress = readStoredJSON('kr_progress', {});
        examTasksProgress = readStoredJSON('exam_tasks_progress', {});
        integralsProgress = readStoredJSON('integrals_progress', {});
        physicsProgress = readStoredJSON('physics_progress', {});
        physicsAnswers = readStoredJSON('physics_answers', {});
        examMatrixAnswers = readStoredJSON('exam_matrix_answers', {});
        examMatrixFeedback = {};
        integralsHTMLCache = null; integralsRendered = false; integralsKaTeXDone = false;
        lastAction = null; semester1LastAction = null;
        // Old forms must not write values from the previous account back into the new model.
        document.querySelectorAll('[id^="physics-ntk-"][id$="-list"], #semester1-agidu-list, #semester1-math-content, #exam-tasks-content, #control-tasks').forEach(el => el.replaceChildren());
        window.ProbabilityCourse?.reload();
        await loadActiveTab();
        updatePace(); updateRankUI(); updateTabTitle();
        window.CourseNavigation?.refresh();
    } finally { restoringProgress = false; }
}

function refreshSemester1IntegralStats() {
    const content = document.getElementById('semester1-math-content');
    if (!content || typeof INTEGRALS_DATA === 'undefined') return;
    const counts = Object.entries(INTEGRALS_DATA).reduce((result,[section,tasks]) => {
        result.total += tasks.length;
        result.solved += tasks.filter((_,i) => integralsProgress[`s${section.replace('section','')}_t${i}`]).length;
        return result;
    }, { total:0, solved:0 });
    const values = content.querySelectorAll('.stats-grid-value');
    if (values.length >= 3) [counts.solved, counts.total, `${(counts.solved / (counts.total || 1)*100).toFixed(1)}%`].forEach((value,i) => { values[i].textContent = value; });
    const fill = content.querySelector('.progress-fill');
    if (fill) fill.style.width = `${counts.solved / (counts.total || 1)*100}%`;
}
