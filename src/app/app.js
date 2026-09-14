// ========== ДАННЫЕ БИЛЕТОВ (19 ШТУК) ==========
const CACHE_VERSION = 'v23';
if (localStorage.getItem('cache_version') !== CACHE_VERSION) {
    // Очищаем старые кеши с отрендеренным HTML (экономия памяти)
    localStorage.removeItem('kr_rendered_cache');
    localStorage.removeItem('integrals_rendered_cache');
    localStorage.removeItem('tickets_open_state');
    localStorage.setItem('cache_version', CACHE_VERSION);
}
const intervals = [1, 3, 7, 14, 30];
const semester1Intervals = [1, 3, 7, 14, 30];
const RANKS = [
    { minScore: 0, title: "Гаджетник", subtitle: "Позор радиофака", icon: "📱" },
    { minScore: 1, title: "Минимал", subtitle: "Сделал минимум", icon: "🪖" },
    { minScore: 7, title: "Пунктуальный", subtitle: "Начал готовиться", icon: "⏰" },
    { minScore: 15, title: "Дедлайн-боец", subtitle: "Успевает", icon: "⚡" },
    { minScore: 25, title: "Повторятор", subtitle: "Сечёт фишку", icon: "🔄" },
    { minScore: 40, title: "Методист", subtitle: "Подготовка идёт по плану", icon: "📋" },
    { minScore: 55, title: "Максимал", subtitle: "Высший пилотаж", icon: "💪" },
    { minScore: 70, title: "Батя Шреквин", subtitle: "Легенда", icon: "👑" },
    { minScore: 85, title: "Повелитель Экзамена", subtitle: "Абсолют", icon: "🏆" }
];
const ticketsData = [
    { t: "Следствия из аксиом евклидова пространства, неравенство Коши-Буняковского." },
    { t: "Линейная зависимость или независимость ортогональной системы векторов, процесс ортогонализации Грама-Шмидта." },
    { t: "Свойства ОНБ: существование; вычисление координат векторов; вычисление скалярного произведения через координаты сомножителей; матрица перехода из ОНБ в ОНБ." },
    { t: "Определитель Грама системы векторов евклидова пространства: возможные значения; связь с линейной независимостью." },
    { t: "Свойства ортогонального дополнения: разложение векторов на ортогональную проекцию и ортогональную составляющую; связь размерностей подпространства и его ортогонального дополнения." },
    { t: "Критерий линейности оператора. Теорема о линейности суммы операторов, произведения оператора и числа, а также произведения операторов." },
    { t: "Матрица оператора. Теорема о связи координат образа и прообраза. Теорема о связи матриц того же оператора в разных базисах." },
    { t: "Теорема о связи алгебры операторов с алгеброй их матриц." },
    { t: "Ядро и область значений как подпространства. Теорема о связи дефекта и ранга линейного оператора." },
    { t: "Свойства характеристического многочлена оператора: переход из базиса в базис, связь СЗ с корнями характеристического уравнения." },
    { t: "Свойства СЗ и СВ: диагонализуемость или недиагонализуемость матрицы оператора; количество линейно независимых СВ, соответствующих данному СЗ." },
    { t: "Свойства СЗ и СВ: СВ, соответствующие различным СЗ." },
    { t: "Свойства самосопряжённого оператора: матрица самосопряжённого оператора в ОНБ; корни характеристического уравнения самосопряжённого оператора." },
    { t: "Свойства самосопряжённого оператора: СВ, соответствующие различным СЗ; существование ОНБ из СВ." },
    { t: "ДУ с разделяющимися переменными и ДУ-I, сводящиеся к ним." },
    { t: "Методы понижения порядка ДУ-II." },
    { t: "Вронскиан системы функций. Связанное с вронскианом необходимое условие линейной зависимости системы функций. Пример, иллюстрирующий недостаточность указанного условия." },
    { t: "Принцип суперпозиции для ЛДУ. Структура общего решения НЛДУ." },
    { t: "Принцип суперпозиции для ОЛДУ. Связанное с вронскианом необходимое и достаточное условие линейной независимости n решений ОЛДУ n-го порядка." },
    { t: "Существование ФСР у ОЛДУ. Структура общего решения ОЛДУ." },
    { t: "ФСР ОЛДУ 2-го порядка с постоянными коэффициентами." },
    { t: "Метод вариации постоянных для НЛДУ." },
    { t: "Принцип суперпозиции для СЛДУ. Структура общего решения СНЛДУ." },
    { t: "Принцип суперпозиции для СОЛДУ. Связанное с вронскианом необходимое и достаточное условие линейной независимости решений СОЛДУ." },
    { t: "Существование ФСР у СОЛДУ. Структура общего решения СОЛДУ." },
    { t: "ФСР СОЛДУ 2x2 с постоянными вещественными коэффициентами: случай некратных СЗ матрицы СОЛДУ." },
    { t: "Метод вариации постоянных для СНЛДУ." }
];

const modules = [
    { title: 'Евклидовы пространства', tickets: [0, 1, 2, 3, 4] },
    { title: 'Линейные операторы', tickets: [5, 6, 7, 8, 9, 10, 11, 12, 13] },
    { title: 'Дифференциальные уравнения', tickets: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26] }
];

let state = null;
let semester1State = null;
let lastAction = null;
let semester1LastAction = null;
let renderScheduled = false;
let scrollPositionToRestore = 0;
let openTicketsToRestore = new Set();

// ========== СОХРАНЕНИЕ ==========
function saveToLocalStorage() {
    saveToStorage('exam_manager_v9', JSON.stringify(state));
}

function saveSemester1State() {
    saveToStorage('semester1_progress', JSON.stringify(semester1State));
}

const OLD_TICKET_NAMES = [
    "Аксиомы скалярного произведения и следствия из них. Неравенство Коши-Буняковского.",
    "Теорема о линейной независимости ортогональной системы векторов. Теорема о процессе ортогонализации Грама-Шмидта.",
    "Свойства ОНБ. Теорема об определителе Грама.",
    "Теорема об ортогональных дополнениях.",
    "Критерии линейности. Теорема о линейности Â+ B̂, αÂ и ÂB̂.",
    "Теорема о связи координат образа и прообраза. Теорема о связи координат в разных базисах. Связь ЛО с алгеброй их матриц.",
    "Теорема о ядре и области значений как подпространства. Теорема о ранге и дефекте.",
    "Теорема об инвариантности характеристического многочлена. Связь СЗ с корнями характеристического уравнения.",
    "Теорема об определителе полураспавшейся матрицы. ЛНС СВ",
    "Теорема о свойствах самосопряжённых ЛО.",
    "Теорема о существовании и единственности задачи Коши для ЛДУ. Принцип суперпозиции для ЛДУ. Теорема о структуре общего решения НЛДУ.",
    "Теорема о вронскиане линейно зависимых функций.",
    "Принцип суперпозиции для ОЛДУ. Критерий ЛНС n решений ОЛДУ n-го порядка. Следствие.",
    "Теорема о существовании ФСР у ОЛДУ. Структура общего решения ОЛДУ.",
    "ФСР ОЛДУ с постоянными вещественными коэффициентами. Метод вариации постоянных.",
    "Принцип суперпозиции для СЛДУ в нормальной форме. Структура общего решения СНЛДУ",
    "Принцип суперпозиции для СОЛДУ. Связанное с W достаточное и необходимое условие линейной независимости n решений СОЛДУ nxn",
    "Теорема о существовании ФСР СОЛДУ. Теорема о структуре общего решения СОЛДУ.",
    "Теорема о ФСР СОЛДУ 2x2 с постоянными вещественными коэффициентами: случай некратных СЗ. Метод вариации постоянных для СНЛДУ."
];

const OLD_TO_NEW_MAP = {
    0: [7], 1: [8], 2: [9, 10], 3: [11], 4: [0],
    5: [1, 2], 6: [3], 7: [4], 8: [5, 6], 9: [12, 13],
    10: [17], 11: [16], 12: [18], 13: [19],
    14: [20, 21], 15: [22], 16: [23], 17: [24], 18: [25, 26]
};

function migrateOldTickets(oldTickets) {
    const newState = ticketsData.map((item, idx) => ({ id: idx, name: item.t, step: 0, nextReview: null, history: [] }));
    for (const old of oldTickets) {
        const targetIds = OLD_TO_NEW_MAP[old.id];
        if (!targetIds) continue;
        for (const newId of targetIds) {
            const target = newState[newId];
            if (old.step > target.step) target.step = old.step;
            if (old.nextReview && (!target.nextReview || old.nextReview > target.nextReview)) target.nextReview = old.nextReview;
            if (old.history) target.history = [...new Set([...target.history, ...old.history])].sort();
        }
    }
    return newState;
}

function isOldTicketsData(data) {
    if (!Array.isArray(data) || data.length !== 19) return false;
    return data.some((t, i) => t.name && t.name.startsWith(OLD_TICKET_NAMES[i].slice(0, 20)));
}

const REORDER_MAP = [5,6,7,8,9,10,11,0,1,2,3,4,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];

function isOldOrderState(data) {
    if (!Array.isArray(data) || data.length !== 27) return false;
    return data[0] && data[0].name && data[0].name.startsWith("Критерий линейности оператора");
}

function migrateReorder(data) {
    const newState = ticketsData.map((item, idx) => ({ id: idx, name: item.t, step: 0, nextReview: null, history: [] }));
    for (let oldIdx = 0; oldIdx < data.length; oldIdx++) {
        const newIdx = REORDER_MAP[oldIdx];
        if (newIdx !== undefined && data[oldIdx]) {
            const old = data[oldIdx];
            const target = newState[newIdx];
            if (old.step > target.step) target.step = old.step;
            if (old.nextReview && (!target.nextReview || old.nextReview > target.nextReview)) target.nextReview = old.nextReview;
            if (old.history) target.history = [...new Set([...target.history, ...old.history])].sort();
        }
    }
    return newState;
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
function initState() {
    const saved = localStorage.getItem('exam_manager_v9');
    if (saved) {
        const parsed = JSON.parse(saved);
        if (isOldTicketsData(parsed)) {
            state = migrateOldTickets(parsed);
        } else if (isOldOrderState(parsed)) {
            state = migrateReorder(parsed);
        } else {
            state = ticketsData.map((item, idx) => {
                const existing = parsed?.find(p => p.id === idx);
                return existing ? { ...existing, name: item.t } : { id: idx, name: item.t, step: 0, nextReview: null, history: [] };
            });
        }
    } else {
        state = ticketsData.map((item, idx) => ({ id: idx, name: item.t, step: 0, nextReview: null, history: [] }));
    }
    saveToLocalStorage();
    renderSidebar();
    renderPracticeSidebar();
}

async function initSemester1State() {
    if (typeof SEMESTER1_DATA === 'undefined') {
        try { await window.DataLoader.load('semester1'); } catch (err) { console.error(err); return; }
    }
    const saved = localStorage.getItem('semester1_progress');
    if (saved) {
        const parsed = JSON.parse(saved);
        semester1State = SEMESTER1_DATA.map((item, idx) => {
            const existing = parsed?.find(p => p.id === idx);
            return existing ? { ...existing, name: item.title } : { id: idx, name: item.title, step: 0, nextReview: null, history: [] };
        });
    } else {
        semester1State = SEMESTER1_DATA.map((item, idx) => ({ id: idx, name: item.title, step: 0, nextReview: null, history: [] }));
    }
    saveSemester1State();
}

function calculateTotalScore() {
    return state.reduce((sum, item) => sum + (item.step || 0), 0);
}

function getCurrentRank(score) {
    return [...RANKS].reverse().find(r => score >= r.minScore) || RANKS[0];
}

function updateRankUI() {
    const score = calculateTotalScore();
    const cur = getCurrentRank(score);
    const maxScore = ticketsData.length * 5;
    
    const rankIcon = document.getElementById('rank-icon');
    const rankTitle = document.getElementById('rank-title');
    const rankSub = document.getElementById('rank-sub');
    const rankProgressFill = document.getElementById('rank-progress-fill');
    const rankStats = document.getElementById('rank-stats');
    
    if (rankIcon) rankIcon.innerHTML = cur.icon;
    if (rankTitle) rankTitle.innerHTML = cur.title;
    if (rankSub) rankSub.innerHTML = cur.subtitle;
    if (rankProgressFill) rankProgressFill.style.width = `${(score / maxScore) * 100}%`;
    if (rankStats) rankStats.innerHTML = `${score}/${maxScore} очков`;
}

// ========== САЙДБАР ==========
function renderSidebar() {
    const list = document.getElementById('sidebar-tickets');
    if (!list) return;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    let totalScore = 0;
    let maxScore = 0;
    state.forEach(item => {
        totalScore += Math.min(item.step, 5);
        maxScore += 5;
    });
    const pct = maxScore > 0 ? (totalScore / maxScore * 100) : 0;
    const fill = document.getElementById('sidebar-progress-fill');
    const text = document.getElementById('sidebar-progress-text');
    if (fill) fill.style.width = pct + '%';
    if (text) text.textContent = Math.round(pct) + '%';
    let html = '';
    const modulesState = JSON.parse(localStorage.getItem('sidebar_modules_state') || '{}');
    modules.forEach((mod, mi) => {
        const isOpen = modulesState[mi] !== false;
        const chevron = isOpen ? '▼' : '▶';
        const modDone = mod.tickets.filter(i => state[i].step >= 5).length;
        html += `<div class="sidebar-module">
            <div class="sidebar-module-header" onclick="toggleModule(${mi}, event)">
                <span class="sidebar-module-chevron">${chevron}</span>
                <span class="sidebar-module-title">Модуль ${mi + 1}. ${mod.title}</span>
                <span class="sidebar-module-meta">${modDone}/${mod.tickets.length}</span>
            </div>
            <div class="sidebar-module-body"${isOpen ? '' : ' style="display:none"'}>`;
        mod.tickets.forEach((idx) => {
            const item = state[idx];
            let cls = 'not-started';
            let icon = '○';
            if (item.step >= 5) { cls = 'mastered'; icon = '✓'; }
            else if (item.step > 0) { cls = 'learning'; icon = '◐'; }
            const nameShort = item.name.length > 50 ? item.name.slice(0, 47) + '…' : item.name;
            html += `<div class="sidebar-lesson ${cls}" onclick="goToTicket(${idx})">
                <span class="sidebar-lesson-icon">${icon}</span>
                <span class="sidebar-lesson-name" title="${item.name.replace(/"/g, '&quot;')}">${nameShort}</span>
                <span class="sidebar-lesson-step">${item.step}/5</span>
            </div>`;
        });
        html += `</div></div>`;
    });
    list.innerHTML = html;
    applySidebarSearch();
}
function normalizeSidebarSearch(value) {
    return String(value || '')
        .toLocaleLowerCase('ru-RU')
        .replace(/ё/g, 'е')
        .replace(/\s+/g, ' ')
        .trim();
}

function applySidebarSearch() {
    const input = document.getElementById('sidebar-search');
    const sidebar = document.getElementById('sidebar');
    if (!input || !sidebar) return;

    const query = normalizeSidebarSearch(input.value);
    const modules = sidebar.querySelectorAll('.sidebar-module');

    modules.forEach(module => {
        const header = module.querySelector('.sidebar-module-header');
        const lessons = Array.from(module.querySelectorAll('.sidebar-lesson'));
        const headerMatches = query && normalizeSidebarSearch(header?.textContent).includes(query);
        let visibleLessons = 0;

        lessons.forEach(lesson => {
            const matches = !query || headerMatches || normalizeSidebarSearch(lesson.textContent).includes(query);
            lesson.classList.toggle('sidebar-search-hidden', !matches);
            lesson.classList.toggle('sidebar-search-hit', Boolean(query && matches));
            if (matches) visibleLessons++;
        });

        module.classList.toggle('sidebar-search-hidden', Boolean(query && !headerMatches && visibleLessons === 0));

        const body = module.querySelector('.sidebar-module-body');
        if (body && query && (headerMatches || visibleLessons > 0)) {
            body.style.display = '';
        }
    });

    sidebar.querySelectorAll('.sidebar-item').forEach(item => {
        const matches = !query || normalizeSidebarSearch(item.textContent).includes(query);
        item.classList.toggle('sidebar-search-hidden', !matches);
        item.classList.toggle('sidebar-search-hit', Boolean(query && matches));
    });
}

function clearSidebarSearch() {
    const input = document.getElementById('sidebar-search');
    if (!input) return;
    input.value = '';
    applySidebarSearch();
    input.focus();
}

function closeMobileSidebarAfterNavigation() {
    if (window.matchMedia('(max-width: 1080px)').matches) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar?.classList.contains('mobile-open')) {
            sidebar.classList.remove('mobile-open');
            document.body.classList.remove('sidebar-open');
        }
    }
}

window.applySidebarSearch = applySidebarSearch;
window.clearSidebarSearch = clearSidebarSearch;

function toggleModule(mi, e) {
    if (e) e.stopPropagation();
    const modulesState = JSON.parse(localStorage.getItem('sidebar_modules_state') || '{}');
    modulesState[mi] = modulesState[mi] === false ? true : false;
    localStorage.setItem('sidebar_modules_state', JSON.stringify(modulesState));
    renderSidebar();
    renderPracticeSidebar();
}

function renderPracticeSidebar() {
    const list = document.getElementById('sidebar-practice');
    if (!list) return;
    if (typeof examTasksData === 'undefined') {
        list.innerHTML = '<div class="sidebar-lesson not-started"><span class="sidebar-lesson-icon">…</span><span class="sidebar-lesson-name">Практика загружается…</span></div>';
        return;
    }
    let html = '';
    const state = JSON.parse(localStorage.getItem('practice_modules_state') || '{}');
    let taskId = 1;
    for (let t = 0; t < examTasksData.length; t++) {
        const type = examTasksData[t];
        let solvedInType = 0;
        for (let i = 0; i < type.tasks.length; i++) {
            if (examTasksProgress[taskId + i]) solvedInType++;
        }
        const isOpen = state[t] !== false;
        html += `<div class="sidebar-module">
            <div class="sidebar-module-header" onclick="togglePracticeType(${t})">
                <span class="sidebar-module-chevron" id="practice-chevron-${t}">${isOpen ? '▼' : '▶'}</span>
                <span class="sidebar-module-title">${type.title}</span>
                <span class="sidebar-module-meta">${solvedInType}/${type.tasks.length}</span>
            </div>
            <div class="sidebar-module-body" id="practice-body-${t}"${isOpen ? '' : ' style="display:none"'}>`;
        for (let i = 0; i < type.tasks.length; i++) {
            const id = taskId + i;
            const task = type.tasks[i];
            const solved = examTasksProgress[id] === true;
            html += `<div class="sidebar-lesson ${solved ? 'mastered' : 'not-started'}" onclick="goToPracticeTask(${id}, ${t})">
                <span class="sidebar-lesson-icon">${solved ? '✓' : '○'}</span>
                <span class="sidebar-lesson-name">${task.label.replace(/"/g, '&quot;')}</span>
            </div>`;
        }
        html += `</div></div>`;
        taskId += type.tasks.length;
    }
    list.innerHTML = html;
    applySidebarSearch();
}

function togglePracticeType(typeIdx) {
    clearTimeout(sidebarCollapseTimer);
    const state = JSON.parse(localStorage.getItem('practice_modules_state') || '{}');
    state[typeIdx] = state[typeIdx] === false ? true : false;
    localStorage.setItem('practice_modules_state', JSON.stringify(state));
    renderPracticeSidebar();
}

function goToPracticeTask(taskId, typeIdx) {
    window._sidebarClickGuard = true;
    clearTimeout(window._sidebarClickGuardTimer);
    window._sidebarClickGuardTimer = setTimeout(() => { window._sidebarClickGuard = false; }, 800);
    clearTimeout(sidebarCollapseTimer);
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.tab-btn[data-tab="exam-tasks"]')?.classList.add('active');
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active-pane'));
    document.getElementById('exam-tasks-pane')?.classList.add('active-pane');
    saveActiveTab();
    closeMobileSidebarAfterNavigation();

    const groups = buildExamGroups();
    for (const [key, g] of Object.entries(groups)) {
        if (g.taskIds.includes(taskId)) {
            localStorage.setItem('exam_selected_group', key);
            renderExamTasks();
            return;
        }
    }
    localStorage.setItem('exam_selected_group', '0');
    renderExamTasks();
}
function goToTicket(idx) {
    if (typeof analytics !== 'undefined') {
        try { analytics.logEvent('ticket_view', { ticket_index: idx }); }
        catch (e) { /* analytics blocked */ }
    }
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.tab-btn[data-tab="exam"]')?.classList.add('active');
    document.getElementById('exam-pane')?.classList.add('active-pane');
    document.getElementById('archive-pane')?.classList.remove('active-pane');
    saveActiveTab();
    closeMobileSidebarAfterNavigation();
    const openCheat = async (ticketEl) => {
        const sheet = ticketEl.querySelector('.cheatsheet');
        if (sheet && sheet.style.display !== 'block') {
            sheet.style.display = 'block';
            if (!sheet.dataset.loaded) {
                try { await window.DataLoader.load('conspects'); } catch (e) {}
                if (CONSPECTS && CONSPECTS[idx]) {
                    sheet.innerHTML = fixNeq(CONSPECTS[idx]);
                    sheet.dataset.loaded = '1';
                }
            }
            addCollapseBtn(sheet, idx, 'exam');
            if (typeof renderMathInElement !== 'undefined') {
                setTimeout(() => {
                    try { renderMathInElement(sheet, {
                        delimiters: [
                            {left: '$$', right: '$$', display: true},
                            {left: '\\[', right: '\\]', display: true},
                            {left: '$', right: '$', display: false},
                            {left: '\\(', right: '\\)', display: false}
                        ],
                        macros: {
                            '\\tg': '\\operatorname{tg}',
                            '\\ctg': '\\operatorname{ctg}',
                            '\\arctg': '\\operatorname{arctg}'
                        }, throwOnError: false, trust: true, strict: false
                    }); } catch (e) {}
                }, 50);
            }
        }
        ticketEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const ticket = document.querySelector(`.ticket[data-idx="${idx}"]`);
    if (ticket) {
        openCheat(ticket);
    } else {
        render();
        requestAnimationFrame(() => {
            const t = document.querySelector(`.ticket[data-idx="${idx}"]`);
            if (t) openCheat(t);
        });
    }
}
function toggleSidebarPin() {
    const sidebar = document.getElementById('sidebar');
    const pinned = sidebar.classList.toggle('pinned');
    localStorage.setItem('sidebar_pinned', pinned ? '1' : '0');
}
let sidebarCollapseTimer = null;
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    clearTimeout(sidebarCollapseTimer);
    sidebar.classList.toggle('expanded');
}
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar || sidebar.classList.contains('pinned')) return;
    clearTimeout(sidebarCollapseTimer);
    sidebar.classList.remove('expanded');
}
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    const isOpen = sidebar.classList.contains('mobile-open');
    sidebar.classList.toggle('mobile-open');
    document.body.classList.toggle('sidebar-open');
    if (!isOpen) closeSidebar();
}
function loadSidebarPinState() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    const pinned = localStorage.getItem('sidebar_pinned') === '1';
    if (pinned) sidebar.classList.add('pinned');
    document.addEventListener('click', (e) => {
        const _path = e.composedPath();
        const _sb = document.getElementById('sidebar');
        const _hb = document.querySelector('.hamburger-btn');
        if (_path.includes(_sb) || (_hb && _path.includes(_hb))) return;
        closeSidebar();
        if (sidebar.classList.contains('mobile-open')) {
            sidebar.classList.remove('mobile-open');
            document.body.classList.remove('sidebar-open');
        }
    });
    sidebar.addEventListener('mouseenter', () => { clearTimeout(sidebarCollapseTimer); });
    sidebar.addEventListener('mouseleave', () => {
        if (!sidebar.classList.contains('expanded') || sidebar.classList.contains('pinned')) return;
        clearTimeout(sidebarCollapseTimer);
        sidebarCollapseTimer = setTimeout(() => closeSidebar(), 400);
    });
}
function switchToArchiveSubtab(subtab) {
    closeMobileSidebarAfterNavigation();
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active-pane'));
    document.getElementById('archive-pane')?.classList.add('active-pane');
    document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.sub-tab-pane').forEach(p => p.classList.remove('active-sub-pane'));
    const subBtn = document.querySelector(`.sub-tab-btn[data-subtab="${subtab}"]`);
    if (subBtn) subBtn.classList.add('active');
    if (subtab === 'control') {
        document.getElementById('archive-control')?.classList.add('active-sub-pane');
        renderControlTasks();
    }
}

function switchToExamTasks() {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.tab-btn[data-tab="exam-tasks"]')?.classList.add('active');
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active-pane'));
    document.getElementById('exam-tasks-pane')?.classList.add('active-pane');
    saveActiveTab();
    requestAnimationFrame(() => renderExamTasks());
}

function switchToSemester1Subtab(subtab) {
    closeMobileSidebarAfterNavigation();
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active-pane'));
    document.getElementById('semester1-pane')?.classList.add('active-pane');
    document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.sub-tab-pane').forEach(p => p.classList.remove('active-sub-pane'));
    const subBtn = document.querySelector(`.sub-tab-btn[data-subtab="${subtab}"]`);
    if (subBtn) subBtn.classList.add('active');
    if (subtab === 'agidu') {
        document.getElementById('semester1-agidu')?.classList.add('active-sub-pane');
        requestAnimationFrame(() => renderSemester1AGiTDU());
    } else if (subtab === 'math') {
        document.getElementById('semester1-math')?.classList.add('active-sub-pane');
        requestAnimationFrame(() => renderSemester1Math());
    } else if (subtab === 'discrete') {
        document.getElementById('semester1-discrete')?.classList.add('active-sub-pane');
    }
}

// ========== ОСНОВНЫЕ ДЕЙСТВИЯ (с debounce) ==========
function saveCurrentState() {
    scrollPositionToRestore = window.scrollY;
    
    const sheets = document.querySelectorAll('.cheatsheet');
    openTicketsToRestore.clear();
    sheets.forEach((sheet, idx) => {
        if (sheet && sheet.style.display === 'block') {
            openTicketsToRestore.add(idx);
        }
    });
}

function saveCheatsheetState() {
    const sheets = document.querySelectorAll('.cheatsheet');
    const openIndices = [];
    sheets.forEach((sheet, idx) => {
        if (sheet && sheet.style.display === 'block') {
            openIndices.push(idx);
        }
    });
    localStorage.setItem('tickets_open_state', JSON.stringify(openIndices));
}

// ── Floating collapse button (one shared, per-ticket) ──────────────────
let _floatBtn = null;
let _floatScrollHandler = null;

function getFloatBtn() {
    if (_floatBtn) return _floatBtn;
    _floatBtn = document.createElement('button');
    _floatBtn.id = 'collapse-float-btn';
    _floatBtn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"/>
        </svg>
        Свернуть`;
    document.body.appendChild(_floatBtn);
    return _floatBtn;
}

function addCollapseBtn(cheatsheetDiv, idx, type) {
    const ticketEl = cheatsheetDiv.closest('.ticket');
    if (!ticketEl) return;
    ticketEl.classList.add('cheatsheet-open');

    const btn = getFloatBtn();

    // Remove previous scroll listener
    if (_floatScrollHandler) {
        window.removeEventListener('scroll', _floatScrollHandler, { passive: true });
        _floatScrollHandler = null;
    }

    // Replace click handler
    const newBtn = btn.cloneNode(true);
    newBtn.innerHTML = btn.innerHTML;
    btn.parentNode.replaceChild(newBtn, btn);
    _floatBtn = newBtn;

    function showHideBtn() {
        const rect = ticketEl.getBoundingClientRect();
        const headerH = 80; // approx ticket header height
        // Show when: ticket header has scrolled above viewport but ticket bottom is still below viewport
        const inRange = rect.top < headerH && rect.bottom > 80;
        if (inRange) {
            _floatBtn.classList.add('visible');
        } else {
            _floatBtn.classList.remove('visible');
        }
    }

    _floatScrollHandler = showHideBtn;
    window.addEventListener('scroll', _floatScrollHandler, { passive: true });
    showHideBtn();

    _floatBtn.onclick = (e) => {
        e.stopPropagation();

        // Scroll target: where the ticket header would sit after collapse
        const ticketTop = ticketEl.getBoundingClientRect().top + window.scrollY;

        cheatsheetDiv.style.display = 'none';
        ticketEl.classList.remove('cheatsheet-open');

        if (_floatScrollHandler) {
            window.removeEventListener('scroll', _floatScrollHandler, { passive: true });
            _floatScrollHandler = null;
        }
        _floatBtn.classList.remove('visible');

        // Jump so the ticket header is in view (same visual position as if it was always closed)
        window.scrollTo({ top: ticketTop - 16, behavior: 'instant' });

        if (type === 'exam') saveCheatsheetState();
    };
}

function scheduleRender() {
    if (renderScheduled) return;
    renderScheduled = true;
    setTimeout(() => {
        render();
        renderScheduled = false;
    }, 30);
}

function advanceTicket(id) {
    const item = state[id];
    const now = new Date(); now.setHours(0, 0, 0, 0);
    const today = now.getTime();

    if (!item.history) item.history = [];
    
    // Добавляем сегодня в историю ТОЛЬКО если сегодня ещё не повторяли этот билет
    const lastRepeat = item.history[item.history.length - 1];
    if (!lastRepeat || new Date(lastRepeat).toDateString() !== now.toDateString()) {
        item.history.push(today);
    }

    // Определяем следующий шаг и дату
    if (item.step >= intervals.length) {
        const next = new Date(now);
        next.setDate(now.getDate() + intervals[intervals.length - 1]);
        item.nextReview = next.getTime();
        saveToLocalStorage();
        scheduleRender();
        return;
    }

    const next = new Date(now);
    next.setDate(now.getDate() + intervals[item.step]);
    lastAction = { id, type: 'advance', oldStep: item.step };
    item.step++;
    item.nextReview = next.getTime();
    saveToLocalStorage();
    scheduleRender();
}

function advanceSemester1Ticket(id) {
    const item = semester1State[id];
    const now = new Date(); now.setHours(0, 0, 0, 0);
    const today = now.getTime();

    if (!item.history) item.history = [];

    const lastRepeat = item.history[item.history.length - 1];
    if (!lastRepeat || new Date(lastRepeat).toDateString() !== now.toDateString()) {
        item.history.push(today);
    }

    if (item.step >= semester1Intervals.length) {
        const next = new Date(now);
        next.setDate(now.getDate() + semester1Intervals[semester1Intervals.length - 1]);
        item.nextReview = next.getTime();
        saveSemester1State();
        scheduleSemester1Render();
        return;
    }

    const next = new Date(now);
    next.setDate(now.getDate() + semester1Intervals[item.step]);
    semester1LastAction = { id, type: 'advance', oldStep: item.step };
    item.step++;
    item.nextReview = next.getTime();
    saveSemester1State();
    scheduleSemester1Render();
}

function undoSemester1Ticket(id) {
    const item = semester1State[id];
    if (item.step <= 0) return;

    if (item.history && item.history.length > 0) {
        item.history.pop();
    }

    item.step--;

    if (item.step === 0) {
        item.nextReview = null;
    } else {
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        if (item.history && item.history.length > 0) {
            const lastDate = new Date(item.history[item.history.length - 1]);
            lastDate.setHours(0, 0, 0, 0);

            const next = new Date(lastDate);
            next.setDate(lastDate.getDate() + semester1Intervals[item.step - 1]);
            item.nextReview = next.getTime();
        } else {
            const next = new Date(now);
            next.setDate(now.getDate() + semester1Intervals[item.step - 1]);
            item.nextReview = next.getTime();
        }
    }

    saveSemester1State();
    scheduleSemester1Render();
}

function undoLastSemester1Action() {
    if (semester1LastAction) { undoSemester1Ticket(semester1LastAction.id); semester1LastAction = null; }
    else alert("Нет действий для отмены");
}

function resetAllSemester1() {
    if (confirm("Сбросить весь прогресс 1 семестра?")) {
        localStorage.removeItem('semester1_progress');
        semester1State = SEMESTER1_DATA.map((item, idx) => ({ id: idx, name: item.title, step: 0, nextReview: null, history: [] }));
        saveSemester1State();
        scheduleSemester1Render();
    }
}

function showSemester1History(id) {
    const item = semester1State[id];
    const history = item.history || [];

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const box = document.createElement('div');
    box.className = 'modal-box';

    const title = document.createElement('div');
    title.className = 'modal-title';
    title.innerHTML = `📜 История вопроса ${id+1}`;
    box.appendChild(title);

    const nameEl = document.createElement('div');
    nameEl.style.cssText = 'font-family: var(--font-print); font-size: 0.82rem; color: var(--pencil); margin-bottom: 12px;';
    nameEl.textContent = item.name;
    box.appendChild(nameEl);

    if (history.length === 0) {
        const emptyEl = document.createElement('p');
        emptyEl.style.cssText = 'font-family: var(--font-print); font-size: 0.9rem; color: var(--pencil); text-align: center; padding: 20px 0;';
        emptyEl.textContent = '📭 История повторений пуста';
        box.appendChild(emptyEl);
    } else {
        const list = document.createElement('ul');
        list.className = 'modal-list';
        history.forEach((entry) => {
            const li = document.createElement('li');
            li.textContent = new Date(entry).toLocaleDateString('ru-RU');
            list.appendChild(li);
        });
        box.appendChild(list);

        const total = document.createElement('div');
        total.className = 'modal-total';
        total.textContent = `Всего: ${history.length} повторений`;
        box.appendChild(total);
    }

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close-btn';
    closeBtn.textContent = 'Закрыть';
    closeBtn.onclick = () => overlay.remove();
    box.appendChild(closeBtn);

    overlay.appendChild(box);
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    document.body.appendChild(overlay);
}

function scheduleSemester1Render() {
    requestAnimationFrame(() => renderSemester1AGiTDU());
}

function undoForTicket(id) {
    const item = state[id];
    if (item.step <= 0) return;
    
    // Удаляем последнюю запись из истории
    if (item.history && item.history.length > 0) {
        item.history.pop();
    }
    
    // Уменьшаем шаг
    item.step--;
    
    // Восстанавливаем предыдущую дату повторения
    if (item.step === 0) {
        // Если шаг стал 0 — билет не изучен
        item.nextReview = null;
    } else {
        // Иначе считаем дату исходя из предыдущего шага
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        
        // Берём последнюю успешную дату из истории (которая осталась после pop)
        if (item.history && item.history.length > 0) {
            // Если есть история — возвращаемся на день последнего повторения
            const lastDate = new Date(item.history[item.history.length - 1]);
            lastDate.setHours(0, 0, 0, 0);
            
            // Следующее повторение = последнее успешное + интервал для текущего шага
            const next = new Date(lastDate);
            next.setDate(lastDate.getDate() + intervals[item.step - 1]);
            item.nextReview = next.getTime();
        } else {
            // Если истории нет — считаем от сегодня
            const next = new Date(now);
            next.setDate(now.getDate() + intervals[item.step - 1]);
            item.nextReview = next.getTime();
        }
    }
    
    saveToLocalStorage();
    scheduleRender();
}

function undoLastAction() {
    if (lastAction) { undoForTicket(lastAction.id); lastAction = null; }
    else alert("Нет действий для отмены");
}

function resetAll() {
    if (confirm("Сбросить весь прогресс?")) {
        localStorage.removeItem('exam_manager_v9');
        location.reload();
    }
}

function showHistory(id) {
    const item = state[id];
    const history = item.history || [];
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const box = document.createElement('div');
    box.className = 'modal-box';
    
    const title = document.createElement('div');
    title.className = 'modal-title';
    title.innerHTML = `📜 История билета ${id+1}`;
    box.appendChild(title);
    
    const nameEl = document.createElement('div');
    nameEl.style.cssText = 'font-family: var(--font-print); font-size: 0.82rem; color: var(--pencil); margin-bottom: 12px;';
    nameEl.textContent = item.name;
    box.appendChild(nameEl);
    
    if (history.length === 0) {
        const emptyEl = document.createElement('p');
        emptyEl.style.cssText = 'font-family: var(--font-print); font-size: 0.9rem; color: var(--pencil); text-align: center; padding: 20px 0;';
        emptyEl.textContent = '📭 История повторений пуста';
        box.appendChild(emptyEl);
    } else {
        const list = document.createElement('ul');
        list.className = 'modal-list';
        history.forEach((entry) => {
            const li = document.createElement('li');
            li.textContent = new Date(entry).toLocaleDateString('ru-RU');
            list.appendChild(li);
        });
        box.appendChild(list);
        
        const total = document.createElement('div');
        total.className = 'modal-total';
        total.textContent = `Всего: ${history.length} повторений`;
        box.appendChild(total);
    }
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close-btn';
    closeBtn.textContent = 'Закрыть';
    closeBtn.onclick = () => overlay.remove();
    box.appendChild(closeBtn);
    
    overlay.appendChild(box);
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    document.body.appendChild(overlay);
}

// ========== РЕНДЕР (оптимизированный) ==========
function render() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const container = document.getElementById('list');
    if (!container) return;
    
    // Сохраняем состояние открытых конспектов И ИХ СОДЕРЖИМОЕ
    const openTicketsData = new Map();
    const allOldSheets = document.querySelectorAll('.cheatsheet');
    allOldSheets.forEach((sheet, idx) => {
        if (sheet && sheet.style.display === 'block' && sheet.innerHTML.trim() !== '') {
            openTicketsData.set(idx, sheet.innerHTML);
        }
    });
    // Добавляем ранее сохранённые открытые билеты из localStorage
    const savedOpen = JSON.parse(localStorage.getItem('tickets_open_state')) || [];
    savedOpen.forEach(idx => {
        if (!openTicketsData.has(idx)) {
            openTicketsData.set(idx, '');
        }
    });
    
    // Также сохраняем позицию скролла
    scrollPositionToRestore = window.scrollY;
    
    container.innerHTML = '';
    // Теория PDF
    const theoryBanner = document.createElement('div');
    theoryBanner.className = 'resource-banner';
    theoryBanner.innerHTML = `
        <span class="resource-banner-icon" aria-hidden="true">📚</span>
        <span class="resource-banner-text">Полный конспект теории за 2 семестр</span>
        <button class="resource-banner-btn" onclick="window.open('https://drive.google.com/file/d/1XyYXy5P7e3ty1xPJMCz-wmKrd3QhIwc7/view?usp=drive_link','_blank')">
            Открыть конспект ↗
        </button>
    `;
    container.appendChild(theoryBanner);
    let readyCount = 0;
    
    state.forEach((item, idx) => {
        const nextDate = item.nextReview ? new Date(item.nextReview) : null;
        const isReady = !nextDate || nextDate <= now;
        if (isReady) readyCount++;
        
        const div = document.createElement('div');
        div.className = `ticket ${isReady ? 'ready' : 'waiting'}`;
        div.setAttribute('data-idx', idx);
        div.innerHTML = `
            <div class="ticket-header">
                <div class="ticket-title">${idx + 1}. ${item.name}</div>
                <div class="action-buttons">
                    <button class="undo-btn" ${item.step <= 0 ? 'disabled' : ''} onclick="event.stopPropagation(); undoForTicket(${idx})">↩️</button>
                    <button class="action-btn" ${!isReady ? 'disabled' : ''} onclick="event.stopPropagation(); advanceTicket(${idx})">${item.step === 0 ? '✅ Изучить' : '🔄 Повторил'}</button>
                    <button class="action-btn" onclick="event.stopPropagation(); showHistory(${idx})">📜</button>
                </div>
            </div>
            <div class="ticket-meta">шаг: ${item.step}/${intervals.length} | ${item.nextReview ? `повтор: ${new Date(item.nextReview).toLocaleDateString('ru-RU')}` : "📖 не изучен"} | повторов: ${item.history?.length || 0}</div>
            <div class="cheatsheet"></div>
        `;
        const cheatsheetDiv = div.querySelector('.cheatsheet');
        let loaded = false;
        
        // Восстанавливаем содержимое, только если оно не пустое
        if (openTicketsData.has(idx) && openTicketsData.get(idx).trim() !== '') {
            cheatsheetDiv.innerHTML = openTicketsData.get(idx);
            cheatsheetDiv.style.display = 'block';
            loaded = true;
            addCollapseBtn(cheatsheetDiv, idx, 'exam');
        }

        // Клик по названию билета открывает/закрывает
        div.onclick = (e) => {
            if (e.target.closest('.cheatsheet')) return;
            if (cheatsheetDiv.style.display === 'block') {
                // Фиксируем позицию скролла
                const scrollY = window.scrollY;
                cheatsheetDiv.style.display = 'none';
                div.classList.remove('cheatsheet-open');
                // Скрываем плавающую кнопку
                if (_floatBtn) _floatBtn.classList.remove('visible');
                if (_floatScrollHandler) { window.removeEventListener('scroll', _floatScrollHandler, { passive: true }); _floatScrollHandler = null; }
                // Жёстко возвращаем скролл на место
                window.scrollTo(0, scrollY);
            } else {
                cheatsheetDiv.style.display = 'block';
                if (!loaded) {
                    (typeof CONSPECTS === 'undefined' ? window.DataLoader.load('conspects') : Promise.resolve())
                        .then(() => {
                            if (CONSPECTS && CONSPECTS[idx]) {
                                cheatsheetDiv.innerHTML = fixNeq(CONSPECTS[idx]);
                                loaded = true;
                            }
                            if (typeof renderMathInElement !== 'undefined') {
                                setTimeout(() => {
                                    try {
                                        renderMathInElement(cheatsheetDiv, {
                                            delimiters: [
                                                {left: '$$', right: '$$', display: true},
                                                {left: '\\[', right: '\\]', display: true},
                                                {left: '$', right: '$', display: false},
                                                {left: '\\(', right: '\\)', display: false}
                                            ],
                                            macros: {
                                                '\\tg': '\\operatorname{tg}',
                                                '\\ctg': '\\operatorname{ctg}',
                                                '\\arctg': '\\operatorname{arctg}'
                                            },
                                            throwOnError: false,
                                            trust: true,
                                            strict: false
                                        });
                                    } catch (err) {
                                        console.error('KaTeX error in ticket', idx, err);
                                    }
                                }, 0);
                            }
                        })
                        .catch(() => {});
                } else {
                    addCollapseBtn(cheatsheetDiv, idx, 'exam');
                }
            }
            saveCheatsheetState();
        };
        container.appendChild(div);
    });
    
    // Восстанавливаем позицию скролла после пересоздания DOM
    if (scrollPositionToRestore) {
        requestAnimationFrame(() => window.scrollTo(0, scrollPositionToRestore));
    }
    
    // Статистика
    const masteredCount = state.filter(s => s.step >= intervals.length).length;
    const learningCount = state.filter(s => s.step > 0 && s.step < intervals.length).length;
    const notStartedCount = state.filter(s => s.step === 0).length;
    const totalRepeats = state.reduce((sum, s) => sum + (s.history?.length || 0), 0);
    
    const statMastered = document.getElementById('stat-mastered');
    const statLearning = document.getElementById('stat-learning');
    const statNotstarted = document.getElementById('stat-notstarted');
    const statTotalrepeats = document.getElementById('stat-totalrepeats');
    const countReady = document.getElementById('count-ready');
    const todayDate = document.getElementById('today-date');
    
    if (statMastered) statMastered.innerText = masteredCount;
    if (statLearning) statLearning.innerText = learningCount;
    if (statNotstarted) statNotstarted.innerText = notStartedCount;
    if (statTotalrepeats) statTotalrepeats.innerText = totalRepeats;
    if (countReady) countReady.innerText = readyCount;
    if (todayDate) todayDate.innerText = now.toLocaleDateString('ru-RU');
    
    updatePace();
    updateRankUI();
    updateTabTitle();
    renderSidebar();
    renderPracticeSidebar();
}

function updatePace() {
    const examDate = new Date(2026, 5, 11);
    const now = new Date();
    const diff = examDate - now;
    const daysLeft = diff / 86400000;
    
    const timerEl = document.getElementById('timer');
    if (timerEl) timerEl.innerHTML = daysLeft > 0 ? `⏳ До экзамена: ${daysLeft.toFixed(3)} дн.` : "🔥 Экзамен!";

    const notStarted = state.filter(s => s.step === 0).length;
    const learning = state.filter(s => s.step > 0 && s.step < intervals.length).length;
    const mastered = state.filter(s => s.step >= intervals.length).length;
    const total = state.length;
    
    const masteryPercent = ((mastered / total) * 100).toFixed(1);
    const masteryPercentEl = document.getElementById('mastery-percent');
    if (masteryPercentEl) masteryPercentEl.innerText = masteryPercent;
    
    const totalScore = calculateTotalScore();
    const maxScore = total * 5;
    const scorePercent = ((totalScore / maxScore) * 100).toFixed(1);
    
    let paceText = `✅${mastered} 🔄${learning} ⏳${notStarted} | 🎯${scorePercent}% очков`;
    
    if (notStarted > 0 && daysLeft > 0) {
        const daysPerTicket = daysLeft / notStarted;
        paceText += ` | 📌 ${daysPerTicket.toFixed(3)} дня на 1 билет`;
    } else if (notStarted === 0 && learning === 0) {
        paceText += ` | 🏆 ВСЁ ГОТОВО! Только повторяй.`;
    } else if (notStarted === 0) {
        paceText += ` | ⏰ До экзамена ${daysLeft.toFixed(1)} дн., только повторение`;
    }
    
    const paceEl = document.getElementById('pace-info');
    if (paceEl) paceEl.innerHTML = paceText;
}

// ========== ПОЛНОЕ СОХРАНЕНИЕ/ЗАГРУЗКА (ВСЁ В ОДНОМ ФАЙЛЕ) ==========
function exportAllToFile() {
    const fullData = {
        version: '3.0',
        date: new Date().toISOString(),
        tickets: state.map(({ id, name, step, nextReview, history }) => ({
            id, name, step, nextReview, history
        })),
        integrals: integralsProgress || {},
        kr: krProgress || {},
        examTasks: examTasksProgress || {},

        physics: physicsProgress || {},
        physicsAnswers: physicsAnswers || {},
        semester1: semester1State ? semester1State.map(({ id, name, step, nextReview, history }) => ({
            id, name, step, nextReview, history
        })) : [],
        integralsSectionsState: (() => {
            const state = {};
            for (let i = 1; i <= 9; i++) {
                const content = document.getElementById(`section-${i}-content`);
                if (content) state[i] = content.style.display !== 'none';
            }
            return state;
        })(),
        activeTab: document.querySelector('.tab-btn.active')?.getAttribute('data-tab') || 'exam'
    };
    
    const dataStr = JSON.stringify(fullData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `marvin_full_backup_${new Date().toISOString().slice(0,19)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    alert("✅ ВСЕ данные сохранены в файл!");
}

function importAllFromFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
        const reader = new FileReader();
        reader.onload = async (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                
                if (data.version !== '3.0' && (!data.tickets || !data.integrals || !data.kr)) {
                    alert("❌ Неверный формат файла");
                    return;
                }

                if (typeof DataLoader !== 'undefined') {
                    await Promise.all([
                        window.DataLoader.load('integrals'),
                        window.DataLoader.load('physics'),
                        window.DataLoader.load('semester1'),
                        window.DataLoader.load('examTasks'),
                        window.DataLoader.load('controlWork')
                    ]).catch((err) => console.error(err));
                }
                
                if (data.tickets && data.tickets.length === state.length) {
                    state = data.tickets.map((t, idx) => ({
                        ...t,
                        name: t.name || ticketsData[idx].t
                    }));
                    saveToLocalStorage();
                } else if (data.tickets && isOldTicketsData(data.tickets)) {
                    if (confirm("Обнаружен прогресс от старой версии (19 билетов). Перенести его на новую структуру (27 билетов)?")) {
                        state = migrateOldTickets(data.tickets);
                        saveToLocalStorage();
                    }
                }
                
                if (data.integrals) {
                    integralsProgress = {};
                    const validKeys = new Set();
                    for (let i = 1; i <= 9; i++) {
                        const section = INTEGRALS_DATA[`section${i}`];
                        if (section) {
                            for (let j = 0; j < section.length; j++) {
                                validKeys.add(`s${i}_t${j}`);
                            }
                        }
                    }
                    for (const key of Object.keys(data.integrals)) {
                        if (validKeys.has(key)) {
                            integralsProgress[key] = data.integrals[key];
                        }
                    }
                    saveIntegralsProgress();
                }
                
                if (data.kr) {
                    krProgress = {};
                    let maxKrId = 0;
                    for (const type of typeConfig) {
                        maxKrId += type.tasks.length;
                    }
                    for (const key of Object.keys(data.kr)) {
                        const id = parseInt(key, 10);
                        if (!isNaN(id) && id >= 1 && id <= maxKrId) {
                            krProgress[id] = data.kr[id];
                        }
                    }
                    saveKrProgress();
                }
                
                if (data.semester1 && data.semester1.length === semester1State.length) {
                    semester1State = data.semester1.map((t, idx) => ({
                        ...t,
                        name: t.name || SEMESTER1_DATA[idx].title
                    }));
                    saveSemester1State();
                }
                
                if (data.physics) {
                    physicsProgress = {};
                    for (const section of PHYSICS_NTK_DATA) {
                        for (let i = 0; i < section.problems.length; i++) {
                            const key = `${section.id}_${i}`;
                            if (data.physics[key]) physicsProgress[key] = data.physics[key];
                        }
                    }
                    savePhysicsProgress();
                }
                if (data.physicsAnswers) {
                    physicsAnswers = {};
                    for (const key of Object.keys(data.physicsAnswers)) {
                        physicsAnswers[key] = data.physicsAnswers[key];
                    }
                    savePhysicsAnswers();
                }

                if (data.examTasks) {
                    examTasksProgress = {};
                    let maxExamId = 0;
                    for (const type of examTasksData) {
                        maxExamId += type.tasks.length;
                    }
                    for (const key of Object.keys(data.examTasks)) {
                        const id = parseInt(key, 10);
                        if (!isNaN(id) && id >= 1 && id <= maxExamId) {
                            examTasksProgress[id] = data.examTasks[id];
                        }
                    }
                    saveExamProgress();
                }
                
                render();
                if (typeof invalidateIntegralsCache === 'function') invalidateIntegralsCache();
                else if (typeof renderIntegrals === 'function') renderIntegrals();
                if (typeof renderControlTasks === 'function') renderControlTasks();
                if (typeof renderSemester1AGiTDU === 'function') renderSemester1AGiTDU();
                if (typeof renderExamTasks === 'function') renderExamTasks();
                if (typeof renderPhysicsNtk === 'function') renderPhysicsNtk();
                
                setTimeout(() => {
                    if (data.integralsSectionsState) {
                        for (let i = 1; i <= 9; i++) {
                            const content = document.getElementById(`section-${i}-content`);
                            const toggleBtn = document.getElementById(`toggle-section-${i}`);
                            if (content && data.integralsSectionsState[i] !== undefined) {
                                if (data.integralsSectionsState[i]) {
                                    content.style.display = 'block';
                                    if (toggleBtn) toggleBtn.innerHTML = '▼';
                                } else {
                                    content.style.display = 'none';
                                    if (toggleBtn) toggleBtn.innerHTML = '▶';
                                }
                            }
                        }
                    }
                    
                    if (data.activeTab) {
                        const tabBtn = document.querySelector(`.tab-btn[data-tab="${data.activeTab}"]`);
                        if (tabBtn) tabBtn.click();
                    }
                }, 200);
                
                alert(`✅ Данные загружены!\n📅 от ${data.date || 'неизвестная дата'}`);
                
            } catch(err) {
                console.error(err);
                alert("❌ Ошибка при чтении файла");
            }
        };
        reader.readAsText(e.target.files[0]);
    };
    input.click();
}

window.exportAllToFile = exportAllToFile;
window.importAllFromFile = importAllFromFile;
// ========== СОХРАНЕНИЕ/ЗАГРУЗКА ФАЙЛА ==========
function saveProgressToFile() {
    const ticketsProgress = state.map(({ id, step, nextReview, history }) => ({
        id, step, nextReview, history
    }));
    
    const integralsProgressData = integralsProgress || {};
    
    const fullProgress = {
        tickets: ticketsProgress,
        integrals: integralsProgressData,
        version: '2.0',
        date: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(fullProgress, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `marvin_progress_${new Date().toISOString().slice(0,19)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    alert("✅ Прогресс сохранён!");
}

function loadProgressFromFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const loaded = JSON.parse(ev.target.result);
                
                // Проверяем новую версию (с интегралами)
                if (loaded.tickets && loaded.integrals) {
                    // Загружаем прогресс билетов
                    if (loaded.tickets.length === state.length) {
                        state = loaded.tickets;
                        saveToLocalStorage();
                    }
                    
                    // Загружаем прогресс интегралов
                    if (loaded.integrals) {
                        integralsProgress = loaded.integrals;
                        saveIntegralsProgress();
                        // Обновляем отображение интегралов, если вкладка открыта
                        const archivePane = document.getElementById('archive-pane');
                        if (archivePane && archivePane.classList.contains('active-pane')) {
                            invalidateIntegralsCache();
                        } else {
                            // Сбрасываем кеш, чтобы при следующем открытии пересчиталось
                            integralsHTMLCache = null;
                            integralsRendered = false;
                        }
                    }
                    
                    render();
                    alert("✅ Прогресс загружен!");
                }
                // Старая версия (только билеты)
                else if (loaded && loaded.length === state.length) {
                    state = loaded;
                    saveToLocalStorage();
                    render();
                    alert("✅ Прогресс билетов загружен! (прогресс интегралов не изменился)");
                } 
                else {
                    alert("❌ Неверный формат файла");
                }
            } catch(err) { 
                console.error(err);
                alert("❌ Ошибка загрузки файла"); 
            }
        };
        reader.readAsText(e.target.files[0]);
    };
    input.click();
}
function resetAllIntegralsProgress() {
    if (confirm("Сбросить весь прогресс интегралов?")) {
        integralsProgress = {};
        saveIntegralsProgress();
        invalidateIntegralsCache();
        alert("✅ Прогресс интегралов сброшен!");
    }
}
// ========== KATEX (сериализованный typeset) ==========
let katexQueue = Promise.resolve();

function typesetKaTeX(elements, doneCallback) {
    if (typeof renderMathInElement === 'undefined') { if (doneCallback) doneCallback(); return; }
    katexQueue = katexQueue.then(() => {
        const valid = (elements || []).filter(el => el && el.nodeType === 1);
        if (valid.length === 0) { if (doneCallback) doneCallback(); return; }
        valid.forEach(el => {
            try {
                if (el.querySelector && el.querySelector('.katex')) return;
                renderMathInElement(el, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '\\[', right: '\\]', display: true},
                        {left: '$', right: '$', display: false},
                        {left: '\\(', right: '\\)', display: false}
                    ],
                    macros: {
                        '\\tg': '\\operatorname{tg}',
                        '\\ctg': '\\operatorname{ctg}',
                        '\\arctg': '\\operatorname{arctg}'
                    },
                    throwOnError: false,
                    trust: true,
                    strict: false
                });
            } catch (err) {
                console.log('KaTeX error on element:', err);
            }
        });
        if (doneCallback) doneCallback();
    });
}

function pluralTasks(n) {
    const i = Math.floor(Math.abs(n));
    if (i % 10 === 1 && i % 100 !== 11) return 'задача';
    if (i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20)) return 'задачи';
    return 'задач';
}

function fmtNum(n) {
    return n % 1 === 0 ? n.toString() : n.toFixed(3);
}

// ========== КОНТРОЛЬНАЯ РАБОТА ==========
// ========== КОНТРОЛЬНАЯ РАБОТА ==========
let krProgress = JSON.parse(localStorage.getItem('kr_progress')) || {};

function getKrSolvedCount() {
    let count = 0;
    let id = 1;
    for (const type of typeConfig) {
        for (let i = 0; i < type.tasks.length; i++) {
            if (krProgress[id]) count++;
            id++;
        }
    }
    return count;
}

function saveKrProgress() {
    saveToStorage('kr_progress', JSON.stringify(krProgress));
    updateKrStats();
}

function toggleKrTask(taskId) {
    if (krProgress[taskId]) {
        delete krProgress[taskId];
    } else {
        krProgress[taskId] = true;
    }
    saveKrProgress();
    
    const checkbox = document.getElementById(`kr_chk_${taskId}`);
    const taskTitle = document.getElementById(`kr_title_${taskId}`);
    const taskCard = document.querySelector(`.task-card[data-task-id="${taskId}"]`);
    if (checkbox) checkbox.checked = krProgress[taskId] === true;
    if (taskTitle) {
        taskTitle.style.textDecoration = krProgress[taskId] ? 'line-through' : 'none';
    }
    if (taskCard) {
        taskCard.classList.toggle('completed', krProgress[taskId]);
    }
}

function toggleKrType(typeIdx) {
    const content = document.getElementById(`kr-type-${typeIdx}-content`);
    const toggleBtn = document.getElementById(`kr-toggle-type-${typeIdx}`);
    if (content && toggleBtn) {
        const isOpening = content.style.display === 'none';
        if (isOpening) {
            content.style.display = 'block';
            toggleBtn.innerHTML = '▼';
            // Ленивый рендер KaTeX для этой секции
            if (!content.dataset.katexRendered && typeof renderMathInElement !== 'undefined') {
                typesetKaTeX([content]);
                content.dataset.katexRendered = '1';
            }
        } else {
            content.style.display = 'none';
            toggleBtn.innerHTML = '▶';
        }
        saveKrSectionsState();
        syncControlToggleBtn();
    }
}

function syncControlToggleBtn() {
    const pane = document.getElementById('control-tasks');
    if (!pane) return;
    let anyExpanded = false;
    for (let t = 0; t < 4; t++) {
        const content = document.getElementById(`kr-type-${t}-content`);
        if (content && content.style.display !== 'none') { anyExpanded = true; break; }
    }
    const btn = document.getElementById('toggle-all-control');
    if (btn) btn.textContent = anyExpanded ? '📁 Свернуть всё' : '📂 Развернуть всё';
}

function saveKrSectionsState() {
    const state = {};
    for (let t = 0; t < 4; t++) {
        const content = document.getElementById(`kr-type-${t}-content`);
        if (content) state[t] = content.style.display !== 'none';
    }
    localStorage.setItem('kr_sections_state', JSON.stringify(state));
}

function toggleAllControlTasks() {
    const pane = document.getElementById('control-tasks');
    if (!pane) return;
    let anyExpanded = false;
    for (let t = 0; t < 4; t++) {
        const content = document.getElementById(`kr-type-${t}-content`);
        if (content && content.style.display !== 'none') anyExpanded = true;
    }

    for (let t = 0; t < 4; t++) {
        const content = document.getElementById(`kr-type-${t}-content`);
        const toggleBtn = document.getElementById(`kr-toggle-type-${t}`);
        if (content && toggleBtn) {
            content.style.display = anyExpanded ? 'none' : 'block';
            toggleBtn.innerHTML = anyExpanded ? '▶' : '▼';
        }
    }
    saveKrSectionsState();
    if (anyExpanded) {
        pane.querySelectorAll('.solution').forEach(s => {
            s.style.display = 'none';
        });
    } else {
        for (let t = 0; t < 4; t++) {
            const content = document.getElementById(`kr-type-${t}-content`);
            if (content && !content.dataset.katexRendered && typeof renderMathInElement !== 'undefined') {
                typesetKaTeX([content]);
                content.dataset.katexRendered = '1';
            }
        }
    }
    syncControlToggleBtn();
}

function resetKrProgress() {
    if (confirm("Сбросить весь прогресс контрольной работы?")) {
        krProgress = {};
        saveKrProgress();
        renderControlTasks();
        alert("✅ Прогресс КР сброшен!");
    }
}

function updateKrStats() {
    const total = typeConfig ? typeConfig.reduce((sum, t) => sum + t.tasks.length, 0) : 4;
    const solved = getKrSolvedCount();
    const remaining = Math.max(0, total - solved);

    const solvedSpan = document.getElementById('kr-solved');
    const totalSpan = document.getElementById('kr-total');
    const percentSpan = document.getElementById('kr-percent');
    const progressFill = document.getElementById('kr-progress-fill');
    const paceSpan = document.getElementById('kr-pace');
    const remainingSpan = document.getElementById('kr-remaining');

    if (solvedSpan) solvedSpan.innerText = solved;
    if (remainingSpan) remainingSpan.innerText = remaining;
    if (totalSpan) totalSpan.innerText = total;
    if (percentSpan) percentSpan.innerText = total > 0 ? ((solved / total) * 100).toFixed(1) : 0;
    if (progressFill) progressFill.style.width = `${total > 0 ? (solved / total) * 100 : 0}%`;

    // Per-type counters
    let taskId = 1;
    for (let t = 0; t < typeConfig.length; t++) {
        const type = typeConfig[t];
        const solvedInType = type.tasks.filter((_, i) => {
            const id = taskId + i;
            return krProgress[id] === true;
        }).length;
        const counter = document.getElementById(`kr-type-${t}-counter`);
        if (counter) counter.innerText = `${solvedInType}/${type.tasks.length}`;
        taskId += type.tasks.length;
    }

    // Темп до 22 мая 2026
    const examDate = new Date(2026, 4, 22);
    const now = new Date();
    const daysLeft = (examDate - now) / 86400000;

    if (paceSpan) {
        if (remaining <= 0) {
            paceSpan.innerHTML = '🏆 ВСЕ ЗАДАЧИ РЕШЕНЫ!';
        } else if (daysLeft <= 0) {
            paceSpan.innerHTML = '⏰ Срок вышел! Решай оставшиеся задачи.';
        } else {
            const perDay = Math.min(remaining, remaining / daysLeft);
            paceSpan.innerHTML = `📅 До 22 мая: ${daysLeft.toFixed(3)} дн. | Осталось: ${remaining} ${pluralTasks(remaining)} | Нужно: ${fmtNum(perDay)} ${pluralTasks(perDay)} в день`;
        }
    }
}

function saveSolutionState(type, key, isOpen) {
    const storageKey = type === 'kr' ? 'ui_kr_solutions' : type === 'exam' ? 'ui_exam_solutions' : 'ui_integral_solutions';
    const state = JSON.parse(localStorage.getItem(storageKey)) || {};
    state[key] = isOpen;
    localStorage.setItem(storageKey, JSON.stringify(state));
}

function restoreSolutionStates(type) {
    const storageKey = type === 'kr' ? 'ui_kr_solutions' : type === 'exam' ? 'ui_exam_solutions' : 'ui_integral_solutions';
    const state = JSON.parse(localStorage.getItem(storageKey)) || {};
    const container = type === 'kr' ? document.getElementById('control-tasks') : type === 'exam' ? document.getElementById('exam-tasks-content') : document.getElementById('integrals-list');
    if (!container) return;
    Object.keys(state).forEach(key => {
        if (!state[key]) return;
        if (type === 'kr') {
            const chk = container.querySelector(`#kr_chk_${key.replace('kr_', '')}`);
            if (chk) {
                const card = chk.closest('.task-card');
                if (card) {
                    const sol = card.querySelector('.solution');
                    if (sol && sol.style.display !== 'block') sol.style.display = 'block';
                }
            }
        } else if (type === 'exam') {
            const chk = container.querySelector(`#exam_chk_${key.replace('exam_', '')}`);
            if (chk) {
                const card = chk.closest('.task-card');
                if (card) {
                    const sol = card.querySelector('.solution');
                    if (sol && sol.style.display !== 'block') sol.style.display = 'block';
                }
            }
        } else if (type === 'integral') {
            const chk = container.querySelector(`#chk_${key}`);
            if (chk) {
                const card = chk.closest('.integral-card');
                if (card) {
                    const sol = card.querySelector('.integral-solution');
                    if (sol && sol.style.display !== 'block') sol.style.display = 'block';
                }
            }
        }
    });
}

function toggleSolution(card) {
    const sol = card.querySelector('.solution');
    if (sol) {
        const isOpen = sol.style.display === 'block';
        sol.style.display = isOpen ? 'none' : 'block';
        const chk = card.querySelector('input[type="checkbox"]');
        if (chk) {
            if (chk.id.startsWith('exam_chk_')) {
                const key = chk.id.replace('exam_chk_', 'exam_');
                saveSolutionState('exam', key, !isOpen);
            } else {
                const key = chk.id.replace('kr_chk_', 'kr_');
                saveSolutionState('kr', key, !isOpen);
            }
        }
    }
}

async function renderControlTasks() {
    const pane = document.getElementById('control-tasks');
    if (!pane) return;
    if (typeof typeConfig === 'undefined') {
        pane.innerHTML = '<div class="glass-panel" style="margin:1rem;padding:1.2rem;text-align:center;color:var(--pencil);">Загрузка контрольной работы…</div>';
        try { await window.DataLoader.load('controlWork'); } catch (err) { console.error(err); return; }
    }

    const total = typeConfig.reduce((sum, t) => sum + t.tasks.length, 0);
    const solved = getKrSolvedCount();
    const remaining = Math.max(0, total - solved);
    
    const examDate = new Date(2026, 4, 22);
    const now = new Date();
    const daysLeft = (examDate - now) / 86400000;
    
    let paceText = '';
    if (remaining <= 0) {
        paceText = '🏆 ВСЕ ЗАДАЧИ РЕШЕНЫ!';
    } else if (daysLeft <= 0) {
        paceText = '⏰ Срок вышел! Решай оставшиеся задачи.';
    } else {
        const perDay = Math.min(remaining, remaining / daysLeft);
        paceText = `📅 До 22 мая: ${daysLeft.toFixed(3)} дн. | Осталось: ${remaining} ${pluralTasks(remaining)} | Нужно: ${fmtNum(perDay)} ${pluralTasks(perDay)} в день`;
    }
    

    // Состояние секций
    const krSectionsState = JSON.parse(localStorage.getItem('kr_sections_state')) || {};
    const anySectionExpanded = typeConfig.some((_, t) => krSectionsState[t] !== false);
    
    let html = `
    <div class="kr-stats-panel">
        <!-- ТУЛБАР ПО ЦЕНТРУ -->
        <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
            <button class="kr-action-btn" onclick="exportAllToFile()">💾 Сохранить прогресс</button>
            <button class="kr-action-btn" onclick="importAllFromFile()">📂 Загрузить прогресс</button>
            <button class="kr-action-btn" id="toggle-all-control" onclick="toggleAllControlTasks()">${anySectionExpanded ? '📁 Свернуть всё' : '📂 Развернуть всё'}</button>
            <button class="kr-action-btn kr-reset-btn" onclick="resetKrProgress()">🗑️ Сбросить</button>
        </div>
        
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; align-items: center;">
            <div class="stats-grid-inline" style="flex:1;">
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="kr-solved">${solved}</div>
                    <div class="stats-grid-label">✅ Решено</div>
                </div>
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="kr-total" style="color:var(--ink-blue);">${total}</div>
                    <div class="stats-grid-label">📋 Всего задач</div>
                </div>
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="kr-percent">${total > 0 ? ((solved/total)*100).toFixed(1) : 0}%</div>
                    <div class="stats-grid-label">📊 Прогресс</div>
                </div>
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="kr-remaining">${remaining}</div>
                    <div class="stats-grid-label">⏳ Осталось</div>
                </div>
            </div>
        </div>
        <div class="progress-bar" style="margin-top: 12px;">
            <div class="progress-fill" id="kr-progress-fill" style="width: ${total > 0 ? (solved/total)*100 : 0}%;"></div>
        </div>
        <div id="kr-pace" style="margin-top: 12px; font-size:0.85rem; color:var(--pencil); text-align:center;">${paceText}</div>
    </div>
`;
    
    let taskId = 1;
    for (let t = 0; t < typeConfig.length; t++) {
        const type = typeConfig[t];
        const solvedInType = type.tasks.filter((_, i) => {
            const id = taskId + i;
            return krProgress[id] === true;
        }).length;
        const isExpanded = krSectionsState[t] !== false;
        
        html += `
        <div class="theory-section" style="margin-bottom: 1.5rem;">
            <div class="integrals-section-header" style="padding: 0.8rem 1.2rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onclick="toggleKrType(${t})">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span class="section-toggle" id="kr-toggle-type-${t}" style="color:var(--ink-blue); font-size:1.2rem;">${isExpanded ? '▼' : '▶'}</span>
                    <span style="color:var(--ink-blue); font-weight:600;">Тип ${t+1}: ${type.title}</span>
                    <span style="color:var(--pencil); font-size:0.8rem;">(${type.tasks.length} ${pluralTasks(type.tasks.length)})</span>
                </div>
                <div style="font-size:0.8rem; color:var(--pencil);">
                    ✅ <span id="kr-type-${t}-counter">${solvedInType}/${type.tasks.length}</span>
                </div>
            </div>
            <div class="section-content" id="kr-type-${t}-content" style="display: ${isExpanded ? 'block' : 'none'}; padding: 0.5rem 1.5rem 1.5rem;">
                <p style="margin:8px 0; font-size:0.85rem; color:var(--pencil);">📌 <strong>Когда применяется:</strong> ${type.desc}</p>`;
        
        for (let i = 0; i < type.tasks.length; i++) {
            const task = type.tasks[i];
            const id = taskId++;
            const label = `${i === 0 ? '🎯 ' : ''}Задача ${t+1}.${i+1} (${['вариация','НК','Коши вариация','Коши НК'][t]})`;
            const isFirst = (i === 0);
            html += `
                <div class="task-card${krProgress[id] ? ' completed' : ''}" data-task-id="${id}">
                    <div class="task-header" onclick="toggleSolution(this.parentElement)">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <input type="checkbox" id="kr_chk_${id}" ${krProgress[id] ? 'checked' : ''} onclick="event.stopPropagation(); toggleKrTask(${id})" style="width: 18px; height: 18px; cursor: pointer;">
                            <span class="task-title" id="kr_title_${id}" style="${krProgress[id] ? 'text-decoration: line-through;' : ''}">📌 ${label}</span>
                        </div>
                        <span class="task-points">${type.points} баллов</span>
                    </div>
                    <div class="task-content">
                        <div class="task-demand"><strong>Условие:</strong><br>${task.cond}</div>
                        <div class="solution" style="display:none; font-size: 1.05em; line-height: 1.6; padding: 15px;">
                            ${task.solution || (isFirst ? existingSolutions[t] : krTaskSolutions[t]?.[i] || '<em>Решение будет добавлено позже.</em>')}
                        </div>
                    </div>
                </div>`;
        }
        html += `</div></div>`;
    }
    
    pane.innerHTML = html;
    updateKrStats();
    restoreSolutionStates('kr');
    // Рендерим KaTeX только для видимых секций
    const visibleKrSections = Array.from(pane.querySelectorAll('.section-content')).filter(el => el.style.display !== 'none');
    typesetKaTeX(visibleKrSections, () => {});
}

// ========== ЭКЗАМЕНАЦИОННЫЕ ЗАДАЧИ ==========

let examTasksProgress = JSON.parse(localStorage.getItem('exam_tasks_progress')) || {};

let physicsProgress = JSON.parse(localStorage.getItem('physics_progress')) || {};
let physicsAnswers = JSON.parse(localStorage.getItem('physics_answers')) || {};

function savePhysicsProgress() {
    saveToStorage('physics_progress', JSON.stringify(physicsProgress));
}

function savePhysicsAnswers() {
    saveToStorage('physics_answers', JSON.stringify(physicsAnswers));
}

function saveVisiblePhysicsInputs(sectionId) {
    const prefix = 'physics-ntk-' + sectionId;
    const container = document.getElementById(prefix + '-list');
    if (!container) return;
    const inputs = container.querySelectorAll('.phys-answer-input');
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const id = input && input.id;
        if (id) {
            const m = id.match(/^phys_input_(.+)$/);
            if (m) {
                physicsAnswers[m[1] + '_txt'] = input.value;
            }
        }
    }
    savePhysicsAnswers();
}

function getPhysicsProblem(sectionId, problemIdx) {
    const section = PHYSICS_NTK_DATA.find(s => s.id === sectionId);
    if (!section || !section.problems[problemIdx]) return null;
    return section.problems[problemIdx];
}

function getPhysicsSection(sectionId) {
    return PHYSICS_NTK_DATA.find(s => s.id === sectionId) || { problems: [] };
}

function normalizeFormula(s) {
    s = s.toLowerCase().trim();
    s = s.replace(/,/g, '.');
    s = s.replace(/\s+/g, '');
    s = s.replace(/·/g, '*');
    s = s.replace(/×/g, '*');
    s = s.replace(/∕/g, '/');
    s = s.replace(/l₁/g, 'l1').replace(/l₂/g, 'l2').replace(/l₃/g, 'l3');
    s = s.replace(/f₀/g, 'f0').replace(/f₁/g, 'f1').replace(/f₂/g, 'f2');
    s = s.replace(/₀/g, '0').replace(/₁/g, '1').replace(/₂/g, '2').replace(/₃/g, '3');
    s = s.replace(/л/g, 'l');
    s = s.replace(/\)\(/g, ')*(');
    s = s.replace(/(\d)([a-z(])/g, '$1*$2');
    s = s.replace(/([a-z)])(\d)/g, '$1*$2');
    s = s.replace(/\*+/g, '*');
    s = s.replace(/(\+)\*|(\-)\*/g, '$1$2');
    s = s.replace(/\*\+/g, '+');
    s = s.replace(/\*\-/g, '-');
    return s;
}

function normalizeText(s) {
    s = s.replace(/[\s,.]/g, '').toLowerCase();
    s = s.replace(/·|∕|×/g, '*');
    s = s.replace(/\\cdot/g, '*');
    s = s.replace(/10\^?\{?(-?\d+)\}?/g, 'e$1');
    s = s.replace(/\*e/g, 'e');
    return s;
}

function setPhysicsSolvedIfCorrect(sectionId, problemIdx) {
    const problem = getPhysicsProblem(sectionId, problemIdx);
    if (!problem) return;
    const key = `${sectionId}_${problemIdx}`;
    if (problem.correctIndex !== undefined) {
        const selected = physicsAnswers[`${key}_opt`];
        if (selected !== undefined && Number(selected) === problem.correctIndex) {
            physicsProgress[key] = true;
        }
    } else if (problem.correctIndices) {
        const selected = (physicsAnswers[`${key}_opt`] || '').split(',').map(Number).filter(n => !isNaN(n));
        const allCorrect = problem.correctIndices.length === selected.length && problem.correctIndices.every(c => selected.includes(c));
        if (allCorrect) physicsProgress[key] = true;
    } else if (problem.answer) {
        const userAnswer = (physicsAnswers[`${key}_txt`] || '').trim().toLowerCase().replace(/,/g, '.');
        const correctAnswer = problem.answer.trim().toLowerCase().replace(/,/g, '.');
        let isCorrect = false;
        if (problem.answerType === 'number') {
            const uNum = parseFloat(userAnswer);
            const cNum = parseFloat(correctAnswer);
            isCorrect = !isNaN(uNum) && !isNaN(cNum) && Math.abs(uNum - cNum) < 0.01;
        } else if (problem.answerType === 'formula') {
            isCorrect = normalizeFormula(userAnswer) === normalizeFormula(correctAnswer);
        } else if (problem.accept) {
            isCorrect = problem.accept.some(a => normalizeText(userAnswer) === normalizeText(a.trim().toLowerCase().replace(/,/g, '.')));
        } else {
            isCorrect = normalizeText(userAnswer) === normalizeText(correctAnswer);
        }
        if (isCorrect) physicsProgress[key] = true;
    }
}

function getPhysicsSolvedCount() {
    let count = 0;
    for (const section of PHYSICS_NTK_DATA) {
        for (let i = 0; i < section.problems.length; i++) {
            const key = `${section.id}_${i}`;
            if (physicsProgress[key]) count++;
        }
    }
    return count;
}

function togglePhysicsTask(sectionId, problemIdx) {
    const key = `${sectionId}_${problemIdx}`;
    if (physicsProgress[key]) {
        delete physicsProgress[key];
        delete physicsAnswers[`${key}_opt`];
        delete physicsAnswers[`${key}_chk`];
        delete physicsAnswers[`${key}_sol`];
        delete physicsAnswers[`${key}_txt`];
        savePhysicsAnswers();
    } else {
        physicsProgress[key] = true;
    }
    savePhysicsProgress();
    const checkbox = document.getElementById(`phys_chk_${key}`);
    const card = document.querySelector(`.phys-card[data-phys-key="${key}"]`);
    if (checkbox) checkbox.checked = physicsProgress[key] === true;
    if (card) card.classList.toggle('completed', physicsProgress[key]);
    updatePhysicsSectionStats(sectionId);
    renderPhysicsNtkStats();
}

function resetPhysicsProgress() {
    if (!confirm('Сбросить весь прогресс по физике НТК?')) return;
    for (const section of PHYSICS_NTK_DATA) {
        section.problems.forEach((_, idx) => {
            const key = `${section.id}_${idx}`;
            delete physicsProgress[key];
            delete physicsAnswers[`${key}_opt`];
            delete physicsAnswers[`${key}_chk`];
            delete physicsAnswers[`${key}_sol`];
            delete physicsAnswers[`${key}_txt`];
        });
        const container = document.getElementById(`physics-ntk-${section.id}-list`);
        if (container) container.innerHTML = '';
    }
    savePhysicsProgress();
    savePhysicsAnswers();
    renderPhysicsNtkStats();
    renderPhysicsNtk();
}

function toggleAllPhysicsSolutions() {
    let anyOpen = false;
    for (const section of PHYSICS_NTK_DATA) {
        anyOpen = section.problems.some((_, idx) => physicsAnswers[`${section.id}_${idx}_sol`] === '1');
        if (anyOpen) break;
    }
    for (const section of PHYSICS_NTK_DATA) {
        section.problems.forEach((_, idx) => {
            const solKey = `${section.id}_${idx}_sol`;
            if (anyOpen) {
                delete physicsAnswers[solKey];
            } else {
                physicsAnswers[solKey] = '1';
            }
        });
    }
    savePhysicsAnswers();
    renderPhysicsNtkStats();
    renderPhysicsNtk();
    syncPhysicsToggleBtn();
}

function syncPhysicsToggleBtn() {
    const btn = document.getElementById('toggle-all-physics');
    if (!btn) return;
    let anyOpen = false;
    for (const section of PHYSICS_NTK_DATA) {
        anyOpen = section.problems.some((_, idx) => physicsAnswers[`${section.id}_${idx}_sol`] === '1');
        if (anyOpen) break;
    }
    btn.textContent = anyOpen ? '📁 Свернуть всё' : '📂 Развернуть всё';
}

function selectPhysicsOption(sectionId, problemIdx, optIdx) {
    const key = `${sectionId}_${problemIdx}`;
    const optKey = `${key}_opt`;
    const solKey = `${key}_sol`;
    physicsAnswers[optKey] = optIdx;
    physicsAnswers[`${key}_chk`] = '1';
    physicsAnswers[solKey] = '1';
    const problem = getPhysicsProblem(sectionId, problemIdx);
    if (problem && problem.correctIndex !== undefined && optIdx === problem.correctIndex) {
        physicsProgress[`${sectionId}_${problemIdx}`] = true;
    } else {
        delete physicsProgress[`${sectionId}_${problemIdx}`];
    }
    savePhysicsAnswers();
    savePhysicsProgress();
    renderPhysicsNtk(sectionId);
}

function checkPhysicsAnswer(sectionId, problemIdx) {
    const key = `${sectionId}_${problemIdx}`;
    const input = document.getElementById(`phys_input_${key}`);
    if (!input) return;
    const chkKey = `${key}_chk`;
    const solKey = `${key}_sol`;
    const txtKey = `${key}_txt`;
    if (physicsAnswers[chkKey] === '1') {
        delete physicsAnswers[chkKey];
        delete physicsAnswers[solKey];
        delete physicsProgress[key];
        input.value = '';
        physicsAnswers[txtKey] = '';
    } else {
        physicsAnswers[txtKey] = input.value;
        physicsAnswers[chkKey] = '1';
        physicsAnswers[solKey] = '1';
        setPhysicsSolvedIfCorrect(sectionId, problemIdx);
    }
    savePhysicsAnswers();
    savePhysicsProgress();
    renderPhysicsNtk(sectionId);
}

function updatePhysicsSectionStats(sectionId) {
    const section = PHYSICS_NTK_DATA.find(s => s.id === sectionId);
    if (!section) return;
    const total = section.problems.length;
    const solved = section.problems.filter((_, idx) => physicsProgress[`${sectionId}_${idx}`]).length;
    const subtabBtn = document.querySelector(`#physics-ntk-pane .sub-tab-btn[data-subtab="${sectionId}"]`);
    if (subtabBtn) {
        let label = section.title;
        if (sectionId === 'elektrostatika') label += ' <span style="color:#e74c3c;font-size:0.7rem;">⚠ много ошибок</span>';
        if (total > 0) {
            const pct = Math.round(solved / total * 100);
            label += ` <span class="phys-subtab-stats">${solved}/${total} ${pct}%</span>`;
        }
        subtabBtn.innerHTML = label;
    }
}

function togglePhysicsOption(sectionId, problemIdx, optIdx) {
    const key = `${sectionId}_${problemIdx}_opt`;
    let selectedStr = physicsAnswers[key] || '';
    let selected = selectedStr ? selectedStr.split(',').map(Number) : [];
    const pos = selected.indexOf(optIdx);
    if (pos >= 0) {
        selected.splice(pos, 1);
    } else {
        selected.push(optIdx);
    }
    physicsAnswers[key] = selected.join(',');
    savePhysicsAnswers();
    renderPhysicsNtk(sectionId);
}

function checkPhysicsMultiSelect(sectionId, problemIdx) {
    const key = `${sectionId}_${problemIdx}`;
    const chkKey = `${key}_chk`;
    const solKey = `${key}_sol`;
    const optKey = `${key}_opt`;
    if (physicsAnswers[chkKey] === '1') {
        delete physicsAnswers[chkKey];
        delete physicsAnswers[optKey];
        delete physicsProgress[key];
    } else {
        physicsAnswers[chkKey] = '1';
        physicsAnswers[solKey] = '1';
        const problem = getPhysicsProblem(sectionId, problemIdx);
        if (problem && problem.correctIndices) {
            const selected = (physicsAnswers[optKey] || '').split(',').map(Number).filter(n => !isNaN(n));
            const allCorrect = problem.correctIndices.length === selected.length && problem.correctIndices.every(c => selected.includes(c));
            if (allCorrect) {
                physicsProgress[key] = true;
            } else {
                delete physicsProgress[key];
            }
        }
    }
    savePhysicsAnswers();
    savePhysicsProgress();
    renderPhysicsNtk(sectionId);
}

function togglePhysicsSolution(sectionId, problemIdx) {
    const solKey = `${sectionId}_${problemIdx}_sol`;
    if (physicsAnswers[solKey] === '1') {
        delete physicsAnswers[solKey];
    } else {
        physicsAnswers[solKey] = '1';
    }
    savePhysicsAnswers();
    renderPhysicsNtk(sectionId);
}

function savePhysicsTypedAnswer(sectionId, problemIdx, value) {
    const txtKey = `${sectionId}_${problemIdx}_txt`;
    physicsAnswers[txtKey] = value;
    savePhysicsAnswers();
}

function getExamSolvedCount() {
    let count = 0;
    let id = 1;
    for (const type of examTasksData) {
        for (let i = 0; i < type.tasks.length; i++) {
            if (examTasksProgress[id]) count++;
            id++;
        }
    }
    return count;
}

function saveExamProgress() {
    saveToStorage('exam_tasks_progress', JSON.stringify(examTasksProgress));
    updateExamStats();
}

function toggleExamTask(taskId) {
    if (examTasksProgress[taskId]) {
        delete examTasksProgress[taskId];
    } else {
        examTasksProgress[taskId] = true;
    }
    saveExamProgress();
    const currentGroup = localStorage.getItem('exam_selected_group') || '0';
    updateExamUI();
    renderPracticeSidebar();
}

function toggleExamType(typeIdx) {}
function saveExamSectionsState() {}
function toggleAllExamTasks() {}
function syncExamToggleBtn() {}

function resetExamProgress() {
    if (confirm("Сбросить весь прогресс экзаменационных задач?")) {
        examTasksProgress = {};
        examMatrixAnswers = {};
        examMatrixFeedback = {};
        localStorage.setItem('exam_matrix_answers', JSON.stringify(examMatrixAnswers));
        saveExamProgress();
        renderExamTasks();
        alert("✅ Прогресс экзаменационных задач сброшен!");
    }
}

function updateExamStats() {
    const total = examTasksData.reduce((sum, t) => sum + t.tasks.length, 0);
    const solved = getExamSolvedCount();
    const remaining = Math.max(0, total - solved);

    const solvedSpan = document.getElementById('exam-solved');
    const totalSpan = document.getElementById('exam-total');
    const percentSpan = document.getElementById('exam-percent');
    const progressFill = document.getElementById('exam-progress-fill');
    const remainingSpan = document.getElementById('exam-remaining');

    if (solvedSpan) solvedSpan.textContent = solved;
    if (totalSpan) totalSpan.textContent = total;
    if (percentSpan) percentSpan.textContent = total > 0 ? ((solved / total) * 100).toFixed(1) + '%' : '0%';
    if (progressFill) progressFill.style.width = total > 0 ? (solved / total) * 100 + '%' : '0%';
    if (remainingSpan) remainingSpan.textContent = remaining;
}

function fixNeq(html) {
    var NEQ = '\u2260';
    var result = '';
    var mathToken = /\\\(|\\\[|\$\$|\$/g;
    var lastIdx = 0;
    var match;
    while ((match = mathToken.exec(html)) !== null) {
        result += html.slice(lastIdx, match.index);
        var token = match[0];
        var endToken;
        if (token === '$$') endToken = '$$';
        else if (token === '$') endToken = '$';
        else if (token === '\\(') endToken = '\\)';
        else endToken = '\\]';
        var endIdx = html.indexOf(endToken, match.index + token.length);
        if (endIdx === -1) {
            result += html.slice(match.index);
            break;
        }
        var mathContent = html.slice(match.index, endIdx + endToken.length);
        result += mathContent.split(NEQ).join('\\neq');
        mathToken.lastIndex = endIdx + endToken.length;
        lastIdx = mathToken.lastIndex;
    }
    result += html.slice(lastIdx);
    return result;
}

function renderVectorInput(taskId, answer) {
    const n = answer.vectors.length;
    const dim = answer.vectors[0].length;
    const label = answer.inputLabel || 'Введите базис:';
    const task = findExamTask(taskId);
    let lambdaLabel = '1';
    if (task && task.cond) {
        const m = task.cond.match(/\\lambda\s*=\s*(\d+)/);
        if (m) lambdaLabel = m[1];
    }
    let html = `<div class="matrix-input-block" id="vector_block_${taskId}">`;
    html += `<div class="matrix-input-label"><strong>${label}</strong></div>`;
    html += `<div class="vector-formula">`;
    html += `<span class="vector-formula-prefix">$\\bar{x}_{\\lambda=${lambdaLabel}} =$</span>`;
    for (let i = 0; i < n; i++) {
        if (i > 0) html += `<span class="vector-formula-plus"> + </span>`;
        html += `<span class="vector-formula-alpha">$\\alpha_{${i + 1}}$</span>`;
        html += `<span class="vector-unit">`;
        html += `<span class="vector-formula-bracket">(</span>`;
        html += `<table class="vector-formula-table">`;
        for (let j = 0; j < dim; j++) {
            const val = (examMatrixAnswers && examMatrixAnswers[taskId] && examMatrixAnswers[taskId][`v${i}_${j}`]) || '';
            html += `<tr><td><input type="text" class="matrix-cell-input vector-cell-small" id="vcell_${taskId}_${i}_${j}" value="${val}" onchange="saveExamVectorCell(${taskId}, ${i}, ${j}, this.value)"></td></tr>`;
        }
        html += `</table>`;
        html += `<span class="vector-formula-bracket">)</span>`;
        html += `</span>`;
    }
    if (n === 1) {
        html += `<span class="vector-formula-cond">$\\quad \\alpha \\neq 0.$</span>`;
    } else {
        html += `<span class="vector-formula-cond">$\\quad \\alpha_1^2 + \\alpha_2^2 > 0.$</span>`;
    }
    html += `</div>`;
    html += `<div class="matrix-check-row">`;
    html += `<button class="matrix-check-btn" onclick="checkExamVectorAnswer(${taskId})">Проверить</button>`;
    const fb = (examMatrixFeedback && examMatrixFeedback[taskId]) || '';
    if (fb) {
        html += `<span class="matrix-feedback ${fb === 'correct' ? 'fb-correct' : 'fb-wrong'}">${fb === 'correct' ? '✅ Верно!' : '❌ Неверно. Попробуйте ещё раз.'}</span>`;
    }
    html += `</div></div>`;
    return html;
}

function saveExamVectorCell(taskId, i, j, val) {
    if (!examMatrixAnswers[taskId]) examMatrixAnswers[taskId] = {};
    examMatrixAnswers[taskId][`v${i}_${j}`] = val;
    localStorage.setItem('exam_matrix_answers', JSON.stringify(examMatrixAnswers));
}

function gaussRank(matrix) {
    const m = matrix.length;
    if (m === 0) return 0;
    const n = matrix[0].length;
    const eps = 1e-9;
    const mat = matrix.map(r => [...r]);
    let rank = 0;
    for (let col = 0; col < n && rank < m; col++) {
        let pivot = -1;
        for (let row = rank; row < m; row++) {
            if (Math.abs(mat[row][col]) > eps) { pivot = row; break; }
        }
        if (pivot === -1) continue;
        [mat[rank], mat[pivot]] = [mat[pivot], mat[rank]];
        const div = mat[rank][col];
        for (let j = col; j < n; j++) mat[rank][j] /= div;
        for (let row = 0; row < m; row++) {
            if (row === rank) continue;
            const f = mat[row][col];
            if (Math.abs(f) < eps) continue;
            for (let j = col; j < n; j++) mat[row][j] -= f * mat[rank][j];
        }
        rank++;
    }
    return rank;
}

function isInSpan(basis, vec) {
    if (basis.length === 0) return vec.every(v => Math.abs(v) < 1e-9);
    const dim = basis[0].length;
    const m = dim;
    const n = basis.length;
    const matrix = [];
    for (let i = 0; i < m; i++) {
        const row = [];
        for (let j = 0; j < n; j++) row.push(basis[j][i]);
        row.push(vec[i]);
        matrix.push(row);
    }
    const r1 = gaussRank(matrix);
    const matNoAug = [];
    for (let i = 0; i < m; i++) {
        const row = [];
        for (let j = 0; j < n; j++) row.push(basis[j][i]);
        matNoAug.push(row);
    }
    const r2 = gaussRank(matNoAug);
    return r1 === r2;
}

function checkExamVectorAnswer(taskId) {
    const task = findExamTask(taskId);
    if (!task || !task.answer || !task.answer.vectors) return;
    const ans = task.answer.vectors;
    const n = ans.length;
    const dim = ans[0].length;
    let allCorrect = true;

    const userVecs = [];
    for (let i = 0; i < n; i++) {
        const vec = [];
        for (let j = 0; j < dim; j++) {
            const input = document.getElementById(`vcell_${taskId}_${i}_${j}`);
            const val = parseUserNumber(input ? input.value : '');
            vec.push(val);
        }
        userVecs.push(vec);
    }

    if (task.answer.checkSubspace) {
        let userRank = 0;
        const userMat = [];
        for (let i = 0; i < n; i++) {
            const vec = userVecs[i];
            if (vec.some(v => isNaN(v))) { allCorrect = false; break; }
            userMat.push(vec);
        }
        if (allCorrect) {
            userRank = gaussRank(userMat);
            if (userRank !== n) { allCorrect = false; }
        }
        if (allCorrect) {
            for (let i = 0; i < n; i++) {
                if (!isInSpan(ans, userVecs[i])) { allCorrect = false; break; }
            }
        }
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < dim; j++) {
                const input = document.getElementById(`vcell_${taskId}_${i}_${j}`);
                if (!input) continue;
                const userVal = parseUserNumber(input.value);
                if (isNaN(userVal)) {
                    input.classList.add('matrix-cell-wrong');
                    input.classList.remove('matrix-cell-correct');
                } else if (allCorrect) {
                    input.classList.add('matrix-cell-correct');
                    input.classList.remove('matrix-cell-wrong');
                } else {
                    input.classList.add('matrix-cell-wrong');
                    input.classList.remove('matrix-cell-correct');
                }
            }
        }
    } else {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < dim; j++) {
                const input = document.getElementById(`vcell_${taskId}_${i}_${j}`);
                if (!input) continue;
                const userVal = parseUserNumber(input.value);
                const correctVal = ans[i][j];
                if (isNaN(userVal) || userVal !== correctVal) {
                    allCorrect = false;
                    input.classList.add('matrix-cell-wrong');
                    input.classList.remove('matrix-cell-correct');
                } else {
                    input.classList.add('matrix-cell-correct');
                    input.classList.remove('matrix-cell-wrong');
                }
            }
        }
    }

    examMatrixFeedback[taskId] = allCorrect ? 'correct' : 'wrong';
    if (allCorrect) {
        examTasksProgress[taskId] = true;
        saveExamProgress();
    }
    updateExamUI();
}

function renderRankDefectInput(taskId, answer) {
    const label = answer.inputLabel || 'Введите ранг и дефект:';
    const rVal = (examMatrixAnswers && examMatrixAnswers[taskId] && examMatrixAnswers[taskId]['rank']) || '';
    const dVal = (examMatrixAnswers && examMatrixAnswers[taskId] && examMatrixAnswers[taskId]['defect']) || '';
    let html = `<div class="matrix-input-block" id="rankdef_block_${taskId}">`;
    html += `<div class="matrix-input-label"><strong>${label}</strong></div>`;
    html += `<div class="rankdef-row">`;
    html += `<div class="rankdef-field"><span class="rankdef-var">$r$</span> = <input type="text" class="matrix-cell-input rankdef-input" id="rval_${taskId}" value="${rVal}" onchange="saveExamRankDefect(${taskId}, 'rank', this.value)"></div>`;
    html += `<div class="rankdef-field"><span class="rankdef-var">$d$</span> = <input type="text" class="matrix-cell-input rankdef-input" id="dval_${taskId}" value="${dVal}" onchange="saveExamRankDefect(${taskId}, 'defect', this.value)"></div>`;
    html += `</div>`;
    html += `<div class="matrix-check-row">`;
    html += `<button class="matrix-check-btn" onclick="checkExamRankDefectAnswer(${taskId})">Проверить</button>`;
    const fb = (examMatrixFeedback && examMatrixFeedback[taskId]) || '';
    if (fb) {
        html += `<span class="matrix-feedback ${fb === 'correct' ? 'fb-correct' : 'fb-wrong'}">${fb === 'correct' ? '✅ Верно!' : '❌ Неверно. Попробуйте ещё раз.'}</span>`;
    }
    html += `</div></div>`;
    return html;
}

function saveExamRankDefect(taskId, field, val) {
    if (!examMatrixAnswers[taskId]) examMatrixAnswers[taskId] = {};
    examMatrixAnswers[taskId][field] = val;
    localStorage.setItem('exam_matrix_answers', JSON.stringify(examMatrixAnswers));
}

function checkExamRankDefectAnswer(taskId) {
    const task = findExamTask(taskId);
    if (!task || !task.answer || task.answer.rank === undefined) return;
    const rInput = document.getElementById(`rval_${taskId}`);
    const dInput = document.getElementById(`dval_${taskId}`);
    if (!rInput || !dInput) return;
    const userR = parseUserNumber(rInput.value);
    const userD = parseUserNumber(dInput.value);
    const correctR = task.answer.rank;
    const correctD = task.answer.defect;
    const rOk = !isNaN(userR) && userR === correctR;
    const dOk = !isNaN(userD) && userD === correctD;
    rInput.classList.toggle('matrix-cell-correct', rOk);
    rInput.classList.toggle('matrix-cell-wrong', !rOk && rInput.value !== '');
    dInput.classList.toggle('matrix-cell-correct', dOk);
    dInput.classList.toggle('matrix-cell-wrong', !dOk && dInput.value !== '');
    const allCorrect = rOk && dOk;
    examMatrixFeedback[taskId] = allCorrect ? 'correct' : 'wrong';
    if (allCorrect) {
        examTasksProgress[taskId] = true;
        saveExamProgress();
    }
    updateExamUI();
}

function renderSignInput(taskId, answer) {
    const label = answer.inputLabel || 'Введите ответ:';
    const val = (examMatrixAnswers && examMatrixAnswers[taskId] && examMatrixAnswers[taskId]['sign']) || '';
    let html = `<div class="matrix-input-block" id="sign_block_${taskId}">`;
    html += `<div class="matrix-input-label"><strong>${label}</strong></div>`;
    html += `<input type="text" class="matrix-cell-input" id="signval_${taskId}" value="${val}" onchange="saveExamSignAnswer(${taskId}, this.value)" placeholder="например: знакопеременная" style="width:280px;">`;
    html += `<div class="matrix-check-row">`;
    html += `<button class="matrix-check-btn" onclick="checkExamSignAnswer(${taskId})">Проверить</button>`;
    const fb = (examMatrixFeedback && examMatrixFeedback[taskId]) || '';
    if (fb) {
        html += `<span class="matrix-feedback ${fb === 'correct' ? 'fb-correct' : 'fb-wrong'}">${fb === 'correct' ? '✅ Верно!' : '❌ Неверно. Попробуйте ещё раз.'}</span>`;
    }
    html += `</div></div>`;
    return html;
}

function saveExamSignAnswer(taskId, val) {
    if (!examMatrixAnswers[taskId]) examMatrixAnswers[taskId] = {};
    examMatrixAnswers[taskId]['sign'] = val;
    localStorage.setItem('exam_matrix_answers', JSON.stringify(examMatrixAnswers));
}

function checkExamSignAnswer(taskId) {
    const task = findExamTask(taskId);
    if (!task || !task.answer || !task.answer.sign) return;
    const input = document.getElementById(`signval_${taskId}`);
    if (!input) return;
    const userVal = input.value.trim().toLowerCase();
    const correctVal = task.answer.sign.toLowerCase();

    function normalizeSign(s) {
        return s
            .replace(/,.*/g, '')
            .replace(/полу/g, '')
            .replace(/определённая/g, 'определена')
            .replace(/[,\s]+/g, ' ')
            .trim();
    }

    const ok = normalizeSign(userVal) === normalizeSign(correctVal) || userVal === correctVal;
    input.classList.toggle('matrix-cell-correct', ok);
    input.classList.toggle('matrix-cell-wrong', !ok && input.value !== '');
    examMatrixFeedback[taskId] = ok ? 'correct' : 'wrong';
    if (ok) {
        examTasksProgress[taskId] = true;
        saveExamProgress();
    }
    updateExamUI();
}

function renderMatrixInput(taskId, answer) {
    const n = answer.matrix.length;
    const label = answer.inputLabel || 'Введите матрицу:';
    const showDet = answer.showDet !== false;
    const bracketScale = 1.5 * n + 0.5;
    let html = `<div class="matrix-input-block" id="matrix_block_${taskId}">`;
    html += `<div class="matrix-input-label"><strong>${label}</strong></div>`;
    html += `<div class="matrix-input-bracket-wrap">`;
    html += `<span class="vector-formula-bracket" style="transform:scaleY(${bracketScale.toFixed(1)})">(</span>`;
    html += `<table class="matrix-input-table">`;
    for (let i = 0; i < n; i++) {
        html += `<tr>`;
        for (let j = 0; j < n; j++) {
            const val = (examMatrixAnswers && examMatrixAnswers[taskId] && examMatrixAnswers[taskId][`${i}_${j}`]) || '';
            html += `<td><input type="text" class="matrix-cell-input" id="mcell_${taskId}_${i}_${j}" value="${val}" onchange="saveExamMatrixCell(${taskId}, ${i}, ${j}, this.value)"></td>`;
        }
        html += `</tr>`;
    }
    html += `</table>`;
    html += `<span class="vector-formula-bracket" style="transform:scaleY(${bracketScale.toFixed(1)})">)</span>`;
    html += `</div>`;
    if (showDet) {
        html += `<div class="matrix-input-label" style="margin-top:10px;"><strong>|Г| =</strong></div>`;
        const detVal = (examMatrixAnswers && examMatrixAnswers[taskId] && examMatrixAnswers[taskId]['det']) || '';
        html += `<input type="text" class="matrix-det-input" id="mdet_${taskId}" value="${detVal}" onchange="saveExamMatrixDet(${taskId}, this.value)" placeholder="">`;
    }
    html += `<div class="matrix-check-row">`;
    html += `<button class="matrix-check-btn" onclick="checkExamMatrixAnswer(${taskId})">Проверить</button>`;
    const fb = (examMatrixFeedback && examMatrixFeedback[taskId]) || '';
    if (fb) {
        html += `<span class="matrix-feedback ${fb === 'correct' ? 'fb-correct' : 'fb-wrong'}">${fb === 'correct' ? '✅ Верно!' : '❌ Неверно. Попробуйте ещё раз.'}</span>`;
    }
    html += `</div></div>`;
    return html;
}

let examMatrixAnswers = JSON.parse(localStorage.getItem('exam_matrix_answers')) || {};
let examMatrixFeedback = {};

function saveExamMatrixCell(taskId, i, j, val) {
    if (!examMatrixAnswers[taskId]) examMatrixAnswers[taskId] = {};
    examMatrixAnswers[taskId][`${i}_${j}`] = val;
    localStorage.setItem('exam_matrix_answers', JSON.stringify(examMatrixAnswers));
}

function saveExamMatrixDet(taskId, val) {
    if (!examMatrixAnswers[taskId]) examMatrixAnswers[taskId] = {};
    examMatrixAnswers[taskId]['det'] = val;
    localStorage.setItem('exam_matrix_answers', JSON.stringify(examMatrixAnswers));
}

function parseUserNumber(str) {
    str = str.replace(',', '.').trim();
    if (str.includes('/')) {
        const parts = str.split('/');
        if (parts.length === 2) {
            const a = parseFloat(parts[0]);
            const b = parseFloat(parts[1]);
            if (!isNaN(a) && !isNaN(b) && b !== 0) return a / b;
        }
    }
    return parseFloat(str);
}

function checkExamMatrixAnswer(taskId) {
    const task = findExamTask(taskId);
    if (!task || !task.answer) return;
    const ans = task.answer;
    const n = ans.matrix.length;
    let allCorrect = true;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const input = document.getElementById(`mcell_${taskId}_${i}_${j}`);
            if (!input) continue;
            const userVal = parseUserNumber(input.value);
            const correctVal = ans.matrix[i][j];
            if (isNaN(userVal) || userVal !== correctVal) {
                allCorrect = false;
                input.classList.add('matrix-cell-wrong');
                input.classList.remove('matrix-cell-correct');
            } else {
                input.classList.add('matrix-cell-correct');
                input.classList.remove('matrix-cell-wrong');
            }
        }
    }

    const detInput = document.getElementById(`mdet_${taskId}`);
    if (detInput && ans.showDet !== false) {
        const userDet = parseUserNumber(detInput.value);
        if (isNaN(userDet) || userDet !== ans.det) {
            allCorrect = false;
            detInput.classList.add('matrix-cell-wrong');
            detInput.classList.remove('matrix-cell-correct');
        } else {
            detInput.classList.add('matrix-cell-correct');
            detInput.classList.remove('matrix-cell-wrong');
        }
    }

    examMatrixFeedback[taskId] = allCorrect ? 'correct' : 'wrong';
    if (allCorrect) {
        examTasksProgress[taskId] = true;
        saveExamProgress();
    }
    updateExamUI();
}

function findExamTask(taskId) {
    let id = 1;
    for (const type of examTasksData) {
        for (const task of type.tasks) {
            if (id === taskId) return task;
            id++;
        }
    }
    return null;
}

async function renderExamTasks() {
    const pane = document.getElementById('exam-tasks-content');
    if (!pane) return;
    if (typeof examTasksData === 'undefined') {
        pane.innerHTML = '<div class="glass-panel" style="margin:1rem;padding:1.2rem;text-align:center;color:var(--pencil);">Загрузка задач экзамена…</div>';
        try { await window.DataLoader.load('examTasks'); } catch (err) { console.error(err); return; }
    }

    const total = examTasksData.reduce((sum, t) => sum + t.tasks.length, 0);
    const solved = getExamSolvedCount();

    const groups = buildExamGroups();

    const savedGroup = localStorage.getItem('exam_selected_group') || '0';
    const selectedGroup = groups[savedGroup] ? savedGroup : '0';

    let html = `
    <div style="background:var(--card-bg); border:1.5px solid var(--ink-blue); border-radius:8px; padding:12px 16px; margin-bottom:16px; display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
        <span style="font-size:1.2rem;">📄</span>
        <span style="flex:1; font-size:0.9rem;">Полный список задач с решениями:</span>
        <button onclick="window.open('https://drive.google.com/file/d/1iYfp-uj25JXeAld4DUqNrEO4rVlMGdoQ/view?usp=drive_link','_blank')" style="display:inline-flex; align-items:center; gap:6px; padding:6px 14px; background:var(--card-bg); color:var(--ink-blue); border:1.5px solid var(--ink-blue); border-radius:6px; font-size:0.85rem; cursor:pointer; white-space:nowrap;">
            <svg width="18" height="18" viewBox="0 0 24 24" style="flex-shrink:0;"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> Открыть в Google Диске
        </button>
    </div>

    <div class="kr-stats-panel" style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; align-items: center;">
            <div class="stats-grid-inline" style="flex:1;">
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="exam-solved">${solved}</div>
                    <div class="stats-grid-label">✅ Решено</div>
                </div>
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="exam-total" style="color:var(--ink-blue);">${total}</div>
                    <div class="stats-grid-label">📋 Всего задач</div>
                </div>
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="exam-percent">${total > 0 ? ((solved / total) * 100).toFixed(1) : 0}%</div>
                    <div class="stats-grid-label">📊 Прогресс</div>
                </div>
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="exam-remaining">${Math.max(0, total - solved)}</div>
                    <div class="stats-grid-label">⏳ Осталось</div>
                </div>
            </div>
        </div>
        <div class="progress-bar" style="margin-top: 12px;">
            <div class="progress-fill" id="exam-progress-fill" style="width: ${total > 0 ? (solved / total) * 100 : 0}%;"></div>
        </div>
    </div>

    <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px; flex-wrap:wrap;">
        <label style="font-weight:600; color:var(--ink-blue); white-space:nowrap;">📝 Задача:</label>
        <select id="exam-task-select" onchange="selectExamGroup(this.value)" style="flex:1; min-width:200px; padding:8px 12px; border:1.5px solid var(--ink-blue); border-radius:6px; font-size:0.95rem; background:var(--card-bg); color:var(--ink); cursor:pointer;">
            ${Object.entries(groups).map(([key, g]) => {
                const solvedInGroup = g.taskIds.filter(id => examTasksProgress[id]).length;
                const mark = solvedInGroup === g.taskIds.length && g.taskIds.length > 0 ? '✅ ' : solvedInGroup > 0 ? '🔶 ' : '';
                return `<option value="${key}" ${key === selectedGroup ? 'selected' : ''}>${mark}${g.title} (${solvedInGroup}/${g.taskIds.length})</option>`;
            }).join('')}
        </select>
        <button class="reset-btn" onclick="resetExamProgress()" style="padding:5px 14px; border-radius:20px; font-size:0.8rem;">🗑️ Сбросить</button>
    </div>

    <div id="exam-task-container"></div>
    `;

    html = fixNeq(html);
    pane.innerHTML = html;
    renderExamGroup(selectedGroup);
}

function updateExamUI() {
    const total = examTasksData.reduce((sum, t) => sum + t.tasks.length, 0);
    const solved = getExamSolvedCount();
    const el = (id) => document.getElementById(id);
    if (el('exam-solved')) el('exam-solved').textContent = solved;
    if (el('exam-total')) el('exam-total').textContent = total;
    if (el('exam-percent')) el('exam-percent').textContent = total > 0 ? ((solved / total) * 100).toFixed(1) + '%' : '0%';
    if (el('exam-remaining')) el('exam-remaining').textContent = Math.max(0, total - solved);
    if (el('exam-progress-fill')) el('exam-progress-fill').style.width = (total > 0 ? (solved / total) * 100 : 0) + '%';

    const groups = buildExamGroups();
    const savedGroup = localStorage.getItem('exam_selected_group') || '0';
    const selectedGroup = groups[savedGroup] ? savedGroup : '0';
    renderExamGroup(selectedGroup);

    const select = el('exam-task-select');
    if (select && select.value !== selectedGroup) {
        select.value = selectedGroup;
    }

    const selectEl = el('exam-task-select');
    if (selectEl) {
        const opts = selectEl.options;
        for (let i = 0; i < opts.length; i++) {
            const key = opts[i].value;
            const g = groups[key];
            if (!g) continue;
            const solvedInGroup = g.taskIds.filter(id => examTasksProgress[id]).length;
            const mark = solvedInGroup === g.taskIds.length && g.taskIds.length > 0 ? '✅ ' : solvedInGroup > 0 ? '🔶 ' : '';
            opts[i].textContent = `${mark}${g.title} (${solvedInGroup}/${g.taskIds.length})`;
        }
    }
}

function buildExamGroups() {
    return {
        '0': { title: 'Тип 1. Матрица Грама', taskIds: [1, 2, 3, 21] },
        '1': { title: 'Тип 2. Смена базиса', taskIds: [4, 5, 6, 22, 23] },
        '2': { title: 'Тип 3. Собственные векторы', taskIds: [7, 8, 9, 24] },
        '3': { title: 'Тип 4. Ранг и дефект', taskIds: [10, 11, 12, 25] },
        '4': { title: 'Тип 5. Знакоопределённость', taskIds: [13, 14, 15, 16, 17, 18, 19, 20, 26] },
        '5': { title: 'Тип 6. ДУ: тип ДУ', taskIds: [27, 28, 41, 42, 43, 44, 51] },
        '6': { title: 'Тип 7. ДУ: понижение порядка', taskIds: [29, 30, 39, 40, 52, 53, 54] },
        '7': { title: 'Тип 8. ДУ: структура решения', taskIds: [31, 32, 55] },
        '8': { title: 'Тип 9. ДУ: системы ОЛДУ', taskIds: [33, 34, 35, 36, 45, 46, 56] },
        '9': { title: 'Тип 10. ДУ: сведение к одному ДУ', taskIds: [37, 47, 48, 57] },
        '10': { title: 'Тип 11. ДУ: частное решение СНЛДУ', taskIds: [38, 49, 50, 58] },
    };
}

function renderExamGroup(groupKey) {
    const container = document.getElementById('exam-task-container');
    if (!container) return;

    const groups = buildExamGroups();
    const group = groups[groupKey];
    if (!group) { container.innerHTML = ''; return; }

    let cardsHtml = '';
    for (let ti = 0; ti < group.taskIds.length; ti++) {
        const taskId = group.taskIds[ti];
        let currentId = 1;
        let foundTask = null;
        let foundType = null;
        for (const type of examTasksData) {
            for (const task of type.tasks) {
                if (currentId === taskId) { foundTask = task; foundType = type; break; }
                currentId++;
            }
            if (foundTask) break;
        }
        if (!foundTask) continue;

        const isAnalogy = !!foundTask.analogyOf;
        const typeNum = ti + 1;
        const shortLabel = foundTask.label.replace(/^Задача \d+[А-Яа-я]*\.\s*/, '');
        cardsHtml += `
            <div class="task-card${examTasksProgress[taskId] ? ' completed' : ''}" data-task-id="exam_${taskId}">
                <div class="task-header">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <input type="checkbox" id="exam_chk_${taskId}" ${examTasksProgress[taskId] ? 'checked' : ''} onclick="event.stopPropagation(); toggleExamTask(${taskId})" style="width: 18px; height: 18px; cursor: pointer;">
                        <span class="task-title" id="exam_title_${taskId}" style="${examTasksProgress[taskId] ? 'text-decoration: line-through;' : ''}">${shortLabel}</span>
                    </div>
                    <span class="task-points">${foundType.points} баллов</span>
                </div>
                <div class="task-content">
                    ${foundTask.source ? '<div style="font-size:0.78rem; color:var(--pencil); padding:4px 0; font-style:italic;">Источник: ' + foundTask.source + '</div>' : !foundTask.analogyOf ? '<div style="font-size:0.78rem; color:var(--pencil); padding:4px 0; font-style:italic;">Источник: демо экзамена</div>' : '<div style="font-size:0.78rem; color:var(--pencil); padding:4px 0; font-style:italic;">Источник: аналог</div>'}
                    <div class="task-demand"><strong>Условие:</strong><br>${foundTask.cond}</div>
                    ${foundTask.answer && foundTask.answer.matrix ? renderMatrixInput(taskId, foundTask.answer) : ''}
                    ${foundTask.answer && foundTask.answer.vectors ? renderVectorInput(taskId, foundTask.answer) : ''}
                    ${foundTask.answer && foundTask.answer.rank !== undefined ? renderRankDefectInput(taskId, foundTask.answer) : ''}
                    ${foundTask.answer && foundTask.answer.sign ? renderSignInput(taskId, foundTask.answer) : ''}
                    <div style="padding:8px 0;">
                        <button class="matrix-check-btn" onclick="toggleExamSolution(${taskId})" id="sol-btn-${taskId}" style="background:rgba(200,240,210,0.4); border-color:var(--ink-green); color:var(--ink-green);">📖 Показать решение</button>
                    </div>
                    <div class="solution" id="sol-${taskId}" style="display:none; font-size: 1.05em; line-height: 1.6; padding: 15px;">
                        ${foundTask.solution || '<em>Решение будет добавлено позже.</em>'}
                    </div>
                </div>
            </div>`;
    }

    container.innerHTML = cardsHtml;
    typesetKaTeX([container], () => {});
    const matrixLabels = container.querySelectorAll('.matrix-input-label');
    if (matrixLabels.length > 0) typesetKaTeX(Array.from(matrixLabels), () => {});
    const vectorFormulas = container.querySelectorAll('.vector-formula');
    if (vectorFormulas.length > 0) typesetKaTeX(Array.from(vectorFormulas), () => {});
    const rankDefBlocks = container.querySelectorAll('.rankdef-row');
    if (rankDefBlocks.length > 0) typesetKaTeX(Array.from(rankDefBlocks), () => {});
}

function selectExamGroup(key) {
    localStorage.setItem('exam_selected_group', key);
    renderExamGroup(key);
}

function toggleExamSolution(taskId) {
    const sol = document.getElementById(`sol-${taskId}`);
    const btn = document.getElementById(`sol-btn-${taskId}`);
    if (!sol || !btn) return;
    const isOpen = sol.style.display === 'block';
    sol.style.display = isOpen ? 'none' : 'block';
    btn.textContent = isOpen ? '📖 Показать решение' : '📖 Скрыть решение';
    if (!isOpen) typesetKaTeX([sol], () => {});
}

// ========== ТАБЫ ==========
async function initTabs() {
    initArchiveSubTabs();
    initSemester1SubTabs();
    initPhysicsNtkSubTabs();
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const fromTab = document.querySelector('.tab-btn.active')?.getAttribute('data-tab');
            if (fromTab === 'physics-ntk') {
                saveActiveSubTab();
                localStorage.setItem('physics_ntk_scroll', window.scrollY);
            }
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active-pane'));

            if (typeof analytics !== 'undefined') {
                try { analytics.logEvent('tab_switch', { from: fromTab, to: btn.dataset.tab }); }
                catch (e) { /* analytics blocked */ }
            }

            if (btn.dataset.tab === 'exam') {
                document.getElementById('exam-pane')?.classList.add('active-pane');
                render();
                saveActiveTab();
            } else if (btn.dataset.tab === 'exam-tasks') {
                document.getElementById('exam-tasks-pane')?.classList.add('active-pane');
                saveActiveTab();
                requestAnimationFrame(() => renderExamTasks());
            } else if (btn.dataset.tab === 'physics-ntk') {
                document.getElementById('physics-ntk-pane')?.classList.add('active-pane');
                saveActiveTab();
                requestAnimationFrame(() => {
                    renderPhysicsNtk();
                    const savedScroll = localStorage.getItem('physics_ntk_scroll');
                    if (savedScroll) window.scrollTo(0, parseInt(savedScroll, 10));
                });
            }
        });
    });
}

function initArchiveSubTabs() {
    document.querySelectorAll('#archive-pane .sub-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#archive-pane .sub-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('#archive-pane .sub-tab-pane').forEach(p => p.classList.remove('active-sub-pane'));

            if (btn.dataset.subtab === 'control') {
                document.getElementById('archive-control')?.classList.add('active-sub-pane');
                saveActiveSubTab();
                renderControlTasks();
            } else if (btn.dataset.subtab === 'integrals') {
                document.getElementById('archive-integrals')?.classList.add('active-sub-pane');
                saveActiveSubTab();
                requestAnimationFrame(() => renderIntegrals());
            }
        });
    });
}

function initSemester1SubTabs() {
    document.querySelectorAll('#semester1-pane .sub-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#semester1-pane .sub-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('#semester1-pane .sub-tab-pane').forEach(p => p.classList.remove('active-sub-pane'));

            if (btn.dataset.subtab === 'agidu') {
                document.getElementById('semester1-agidu')?.classList.add('active-sub-pane');
                saveActiveSubTab();
                requestAnimationFrame(() => renderSemester1AGiTDU());
            } else if (btn.dataset.subtab === 'math') {
                document.getElementById('semester1-math')?.classList.add('active-sub-pane');
                saveActiveSubTab();
                requestAnimationFrame(() => renderSemester1Math());
            } else if (btn.dataset.subtab === 'discrete') {
                document.getElementById('semester1-discrete')?.classList.add('active-sub-pane');
                saveActiveSubTab();
            }
        });
    });
}
function initPhysicsNtkSubTabs() {
    document.querySelectorAll('#physics-ntk-pane .sub-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            saveActiveSubTab();
            localStorage.setItem('physics_ntk_scroll', window.scrollY);

            document.querySelectorAll('#physics-ntk-pane .sub-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('#physics-ntk-pane .sub-tab-pane').forEach(p => p.classList.remove('active-sub-pane'));

            const subtab = btn.dataset.subtab;
            const pane = document.getElementById(`physics-ntk-${subtab}`);
            if (pane) {
                pane.classList.add('active-sub-pane');
                requestAnimationFrame(() => renderPhysicsNtk(subtab));
            }
        });
    });
    initPhysicsTheoryButtons();
}
// ========== ТЕМА (светлая/тёмная) ==========
const moonIcon = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const sunIcon  = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

function updateBrowserThemeColor() {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    meta.setAttribute('content', document.documentElement.getAttribute('data-theme') === 'dark' ? '#0d1117' : '#f5f7fb');
}

function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    if (isDark) {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        document.getElementById('theme-btn').innerHTML = moonIcon;
        updateBrowserThemeColor();
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        document.getElementById('theme-btn').innerHTML = sunIcon;
        updateBrowserThemeColor();
    }
}

function loadTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    const html = document.documentElement;
    const btn = document.getElementById('theme-btn');
    if (saved === 'dark') {
        html.setAttribute('data-theme', 'dark');
        if (btn) btn.innerHTML = sunIcon;
    } else {
        html.removeAttribute('data-theme');
        if (btn) btn.innerHTML = moonIcon;
    }
    updateBrowserThemeColor();
}

window.toggleTheme = toggleTheme;
// ========== ЗАПУСК ==========
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    initState();
    initTabs();
    loadActiveTab();
    render();

    if (typeof analytics !== 'undefined') {
        const initialTab = document.querySelector('.tab-btn.active')?.getAttribute('data-tab') || 'exam';
        try { analytics.logEvent('page_view', { page_title: initialTab }); }
        catch (e) { /* analytics blocked */ }
    }
    loadSidebarPinState();
    setInterval(updatePace, 60000);
    setInterval(() => {
        if (document.getElementById('physics-ntk-pane')?.classList.contains('active-pane')) {
    renderPhysicsNtkStats();
    if (savedScrollY) {
        requestAnimationFrame(() => window.scrollTo(0, savedScrollY));
    }
}
    }, 60000);

    // Тяжёлые модули подгружаем в фоне после первого рендера
    const bootPrefetch = () => {
        if (typeof DataLoader !== 'undefined') {
            DataLoader.prefetch();
        }
    };
    if ('requestIdleCallback' in window) {
        requestIdleCallback(bootPrefetch, { timeout: 3000 });
    } else {
        setTimeout(bootPrefetch, 600);
    }

    if (typeof onReinit === 'function') {
        onReinit(() => {
            initState();
            initSemester1State();
            renderControlTasks();
            renderExamTasks();
            initPhysicsNtkSubTabs();
            loadActiveTab();
            render();
            updatePace();
        });
    }
});

// ========== РЕНДЕР СЕМЕСТРА 1 — АГиТДУ ==========
let semester1RenderScheduled = false;

async function renderSemester1AGiTDU() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const container = document.getElementById('semester1-agidu-list');
    if (!container) return;
    if (typeof SEMESTER1_DATA === 'undefined') {
        try { await window.DataLoader.load('semester1'); } catch (err) { console.error(err); return; }
    }
    if (semester1State === null) initSemester1State();

    container.innerHTML = '';
    let readyCount = 0;

    semester1State.forEach((item, idx) => {
        const nextDate = item.nextReview ? new Date(item.nextReview) : null;
        const isReady = !nextDate || nextDate <= now;
        if (isReady) readyCount++;

        const div = document.createElement('div');
        div.className = `ticket ${isReady ? 'ready' : 'waiting'}`;
        div.setAttribute('data-idx', idx);
        div.innerHTML = `
            <div class="ticket-header">
                <div class="ticket-title">${idx + 1}. ${item.name}</div>
                <div class="action-buttons">
                    <button class="undo-btn" ${item.step <= 0 ? 'disabled' : ''} onclick="event.stopPropagation(); undoSemester1Ticket(${idx})">↩️</button>
                    <button class="action-btn" ${!isReady ? 'disabled' : ''} onclick="event.stopPropagation(); advanceSemester1Ticket(${idx})">${item.step === 0 ? '✅ Изучить' : '🔄 Повторил'}</button>
                    <button class="action-btn" onclick="event.stopPropagation(); showSemester1History(${idx})">📜</button>
                </div>
            </div>
            <div class="ticket-meta">шаг: ${item.step}/${semester1Intervals.length} | ${item.nextReview ? `повтор: ${new Date(item.nextReview).toLocaleDateString('ru-RU')}` : "📖 не изучен"} | повторов: ${item.history?.length || 0}</div>
            <div class="cheatsheet"></div>
        `;
        const cheatsheetDiv = div.querySelector('.cheatsheet');
        let loaded = false;

        div.onclick = (e) => {
            if (e.target.closest('.cheatsheet')) return;
            if (cheatsheetDiv.style.display === 'block') {
                const scrollY = window.scrollY;
                cheatsheetDiv.style.display = 'none';
                div.classList.remove('cheatsheet-open');
                if (_floatBtn) _floatBtn.classList.remove('visible');
                if (_floatScrollHandler) { window.removeEventListener('scroll', _floatScrollHandler, { passive: true }); _floatScrollHandler = null; }
                window.scrollTo(0, scrollY);
            } else {
                cheatsheetDiv.style.display = 'block';
                if (!loaded && SEMESTER1_DATA && SEMESTER1_DATA[idx] && SEMESTER1_DATA[idx].content) {
                    cheatsheetDiv.innerHTML = SEMESTER1_DATA[idx].content;
                    loaded = true;
                }
                addCollapseBtn(cheatsheetDiv, idx, 'semester1');
                if (typeof renderMathInElement !== 'undefined') {
                    setTimeout(() => {
                        try {
                            renderMathInElement(cheatsheetDiv, {
                                delimiters: [
                                    {left: '$$', right: '$$', display: true},
                                    {left: '\\[', right: '\\]', display: true},
                                    {left: '$', right: '$', display: false},
                                    {left: '\\(', right: '\\)', display: false}
                                ],
                                macros: {
                                    '\\tg': '\\operatorname{tg}',
                                    '\\ctg': '\\operatorname{ctg}',
                                    '\\arctg': '\\operatorname{arctg}'
                                },
                                throwOnError: false,
                                trust: true,
                                strict: false
                            });
                        } catch (err) {
                            console.error('KaTeX error in semester1', idx, err);
                        }
                    }, 0);
                }
            }
        };

        container.appendChild(div);
    });

    const total = semester1State.length;
    const mastered = semester1State.filter(s => s.step >= semester1Intervals.length).length;
    const learning = semester1State.filter(s => s.step > 0 && s.step < semester1Intervals.length).length;
    const notStarted = semester1State.filter(s => s.step === 0).length;

    const statsDiv = document.createElement('div');
    statsDiv.className = 'glass-panel';
    statsDiv.style.cssText = 'margin: 1rem; padding: 0.8rem 1.2rem; display: flex; gap: 2rem; flex-wrap: wrap;';
    statsDiv.innerHTML = `
        <div><strong>📊 Прогресс 1 семестра</strong></div>
        <div>✅ Освоено: ${mastered}</div>
        <div>🔄 В процессе: ${learning}</div>
        <div>⏳ Не начато: ${notStarted}</div>
        <div>📚 Всего: ${total}</div>
    `;
    container.insertBefore(statsDiv, container.firstChild);

    const resetDiv = document.createElement('div');
    resetDiv.style.cssText = 'margin: 0.5rem 1rem;';
    resetDiv.innerHTML = `<button class="reset-btn" onclick="resetAllSemester1()">🗑️ Сбросить прогресс</button>`;
    container.appendChild(resetDiv);

    if (typeof renderMathInElement !== 'undefined') {
        setTimeout(() => {
            try {
                renderMathInElement(container, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '\\[', right: '\\]', display: true},
                        {left: '$', right: '$', display: false},
                        {left: '\\(', right: '\\)', display: false}
                    ],
                    macros: {
                        '\\tg': '\\operatorname{tg}',
                        '\\ctg': '\\operatorname{ctg}',
                        '\\arctg': '\\operatorname{arctg}'
                    },
                    throwOnError: false,
                    trust: true,
                    strict: false
                });
            } catch (err) {
                console.error('KaTeX error in renderSemester1AGiTDU', err);
            }
        }, 0);
    }
}

// ========== РЕНДЕР СЕМЕСТРА 1 — МАТЕМАТИКА (Интегралы) ==========

async function renderSemester1Math() {
    const container = document.getElementById('semester1-math-content');
    if (!container) return;
    if (typeof INTEGRALS_DATA === 'undefined') {
        try { await Promise.all([window.DataLoader.load('semester1'), window.DataLoader.load('integrals')]); } catch (err) { console.error(err); return; }
    }
    if (semester1State === null) initSemester1State();

    let totalTasks = 0;
    let solvedTasks = 0;
    for (let i = 1; i <= 9; i++) {
        const sectionData = INTEGRALS_DATA[`section${i}`];
        if (sectionData) {
            totalTasks += sectionData.length;
            for (let j = 0; j < sectionData.length; j++) {
                if (integralsProgress[`s${i}_t${j}`]) solvedTasks++;
            }
        }
    }

    let html = `
    <div class="integrals-stats-panel">
        <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
            <button class="kr-action-btn" onclick="resetAllIntegralsProgress()">🗑️ Сбросить</button>
        </div>
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; align-items: center;">
            <div class="stats-grid-inline" style="flex:1;">
                <div class="stats-grid-item">
                    <div class="stats-grid-value">${solvedTasks}</div>
                    <div class="stats-grid-label">✅ Решено</div>
                </div>
                <div class="stats-grid-item">
                    <div class="stats-grid-value" style="color:var(--ink-blue);">${totalTasks}</div>
                    <div class="stats-grid-label">📋 Всего задач</div>
                </div>
                <div class="stats-grid-item">
                    <div class="stats-grid-value">${totalTasks > 0 ? ((solvedTasks / totalTasks) * 100).toFixed(1) : 0}%</div>
                    <div class="stats-grid-label">📊 Прогресс</div>
                </div>
            </div>
        </div>
        <div class="progress-bar" style="margin-top: 12px;">
            <div class="progress-fill" style="width: ${totalTasks > 0 ? (solvedTasks / totalTasks) * 100 : 0}%;"></div>
        </div>
    </div>`;

    const sectionTheory = [
        `<div class="theory-block">
            <div class="theory-header">
                <span class="theory-header-icon">📚</span>
                <span class="theory-header-title">Табличное интегрирование</span>
            </div>
            <div class="theory-content">
                <p><strong>Основные табличные интегралы:</strong></p>
                <div class="theory-formula">$$\\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \neq -1)$$</div>
                <div class="theory-formula">$$\\int \\frac{dx}{x} = \\ln|x| + C$$</div>
                <div class="theory-formula">$$\\int e^x dx = e^x + C$$</div>
                <div class="theory-formula">$$\\int a^x dx = \\frac{a^x}{\\ln a} + C$$</div>
                <div class="theory-formula">$$\\int \\sin x dx = -\\cos x + C$$</div>
                <div class="theory-formula">$$\\int \\cos x dx = \\sin x + C$$</div>
                <div class="theory-formula">$$\\int \\frac{dx}{\\cos^2 x} = \\tan x + C$$</div>
                <div class="theory-formula">$$\\int \\frac{dx}{\\sin^2 x} = -\\cot x + C$$</div>
                <div class="theory-formula">$$\\int \\frac{dx}{x^2 + a^2} = \\frac{1}{a}\\arctan\\frac{x}{a} + C$$</div>
                <div class="theory-formula">$$\\int \\frac{dx}{\\sqrt{a^2 - x^2}} = \\arcsin\\frac{x}{a} + C$$</div>
                <div class="theory-divider"></div>
                <p><strong>Типовые преобразования (подведение под дифференциал):</strong> $$\\cos x dx = d(\\sin x),\\quad \\frac{dx}{x} = d(\\ln x),\\quad \\frac{dx}{1+x^2} = d(\\arctan x)$$</p>
                <div class="theory-example">
                    <div class="theory-example-title">📌 Пример</div>
                    <div class="theory-example-content">$$\\int x^2 e^{-3x^3} dx = -\\frac{1}{9}\\int e^{-3x^3} d(-3x^3) = -\\frac{1}{9}e^{-3x^3} + C$$</div>
                </div>
            </div>
        </div>`,
        `<div class="theory-block">
            <div class="theory-header">
                <span class="theory-header-icon">🔄</span>
                <span class="theory-header-title">Замена переменной (подстановка)</span>
            </div>
            <div class="theory-content">
                <p><strong>Основная формула:</strong> $$\\int f(g(x)) g'(x) dx = \\int f(u) du, \\quad u = g(x)$$</p>
                <div class="theory-divider"></div>
                <p><strong>Стандартные подстановки:</strong></p>
                <ul>
                    <li>Линейная: $$t = ax + b$$</li>
                    <li>Степенная: $$t = x^n$$</li>
                    <li>Иррациональная: $$t = \\sqrt{ax + b}$$</li>
                    <li>Логарифмическая: $$t = \\ln x$$</li>
                    <li>Экспоненциальная: $$t = e^x$$</li>
                </ul>
                <div class="theory-example">
                    <div class="theory-example-title">📌 Пример</div>
                    <div class="theory-example-content">$$\\int \\frac{dx}{1+\\sqrt{x+2}},\\quad t = \\sqrt{x+2} \\Rightarrow x = t^2-2,\\ dx = 2t dt$$</div>
                    <div class="theory-example-content">$$\\int \\frac{2t}{1+t} dt = 2\\int\\left(1 - \\frac{1}{1+t}\\right)dt = 2(t - \\ln|1+t|) + C = 2\\sqrt{x+2} - 2\\ln(\\sqrt{x+2}+1) + C$$</div>
                </div>
            </div>
        </div>`,
        `<div class="theory-block">
            <div class="theory-header">
                <span class="theory-header-icon">✖️</span>
                <span class="theory-header-title">Интегрирование по частям</span>
            </div>
            <div class="theory-content">
                <div class="theory-formula">$$\\int u dv = uv - \\int v du$$</div>
                <div class="theory-divider"></div>
                <p><strong>Правило выбора u (ЛИАТЭ):</strong> Логарифмические → Обратные тригонометрические → Алгебраические → Тригонометрические → Экспоненциальные</p>
                <div class="theory-example">
                    <div class="theory-example-title">📌 Пример</div>
                    <div class="theory-example-content">$$\\int x^2 \\ln x dx,\\quad u = \\ln x,\\ dv = x^2 dx$$</div>
                    <div class="theory-example-content">$$du = \\frac{dx}{x},\\ v = \\frac{x^3}{3} \\Rightarrow \\int x^2 \\ln x dx = \\frac{x^3}{3}\\ln x - \\frac{1}{3}\\int x^2 dx = \\frac{x^3}{3}\\ln x - \\frac{x^3}{9} + C$$</div>
                </div>
            </div>
        </div>`,
        `<div class="theory-block">
            <div class="theory-header">
                <span class="theory-header-icon">📐</span>
                <span class="theory-header-title">Квадратный трёхчлен</span>
            </div>
            <div class="theory-content">
                <p><strong>Выделение полного квадрата:</strong></p>
                <div class="theory-formula">$$ax^2 + bx + c = a\\left[\\left(x + \\frac{b}{2a}\\right)^2 + \\left(\\frac{c}{a} - \\frac{b^2}{4a^2}\\right)\\right]$$</div>
                <div class="theory-divider"></div>
                <p><strong>Возможные случаи:</strong></p>
                <ul>
                    <li>$$\\int \\frac{dx}{t^2 + k^2} = \\frac{1}{k}\\arctan\\frac{t}{k} + C$$</li>
                    <li>$$\\int \\frac{dx}{t^2 - k^2} = \\frac{1}{2k}\\ln\\left|\\frac{t-k}{t+k}\\right| + C$$</li>
                    <li>$$\\int \\frac{dx}{\\sqrt{t^2 + k^2}} = \\ln\\left|t + \\sqrt{t^2 + k^2}\\right| + C$$</li>
                    <li>$$\\int \\frac{dx}{\\sqrt{k^2 - t^2}} = \\arcsin\\frac{t}{k} + C$$</li>
                </ul>
                <div class="theory-example">
                    <div class="theory-example-title">📌 Пример</div>
                    <div class="theory-example-content">$$\\int \\frac{dx}{x^2+2x+5} = \\int \\frac{dx}{(x+1)^2+4} = \\frac{1}{2}\\arctan\\frac{x+1}{2} + C$$</div>
                </div>
            </div>
        </div>`,
        `<div class="theory-block">
            <div class="theory-header">
                <span class="theory-header-icon">➕</span>
                <span class="theory-header-title">Линейная часть и квадратный трёхчлен</span>
            </div>
            <div class="theory-content">
                <p>Для интегралов вида $$\\int \\frac{Mx+N}{ax^2+bx+c} dx$$ представляем числитель как комбинацию производной знаменателя.</p>
                <div class="theory-formula">$$Mx+N = \\frac{M}{2a}(2ax+b) + \\left(N - \\frac{Mb}{2a}\\right)$$</div>
                <div class="theory-example">
                    <div class="theory-example-title">📌 Пример</div>
                    <div class="theory-example-content">$$\\int \\frac{x+2}{x^2+2x+2} dx = \\frac{1}{2}\\int \\frac{2x+2}{x^2+2x+2}dx + \\int \\frac{dx}{(x+1)^2+1}$$</div>
                    <div class="theory-example-content">$$= \\frac{1}{2}\\ln(x^2+2x+2) + \\arctan(x+1) + C$$</div>
                </div>
            </div>
        </div>`,
        `<div class="theory-block">
            <div class="theory-header">
                <span class="theory-header-icon">🔀</span>
                <span class="theory-header-title">Интегралы вида ∫ dx/(x√(ax²+bx+c))</span>
            </div>
            <div class="theory-content">
                <p><strong>Подстановка:</strong> $$x = \\frac{1}{t},\\quad dx = -\\frac{dt}{t^2}$$</p>
                <div class="theory-formula">$$\\int \\frac{dx}{x\\sqrt{ax^2+bx+c}} = -\\int \\frac{dt}{\\sqrt{c t^2 + b t + a}}$$</div>
                <div class="theory-divider"></div>
                <p><strong>Частные табличные случаи:</strong></p>
                <ul>
                    <li>$$\\int \\frac{dx}{x\\sqrt{x^2 + a^2}} = -\\frac{1}{a}\\ln\\left|\\frac{a+\\sqrt{x^2+a^2}}{x}\\right| + C$$</li>
                    <li>$$\\int \\frac{dx}{x\\sqrt{x^2 - a^2}} = \\frac{1}{a}\\operatorname{arcsec}\\frac{x}{a} + C$$</li>
                </ul>
            </div>
        </div>`,
        `<div class="theory-block">
            <div class="theory-header">
                <span class="theory-header-icon">🧮</span>
                <span class="theory-header-title">Дробно-рациональные функции</span>
            </div>
            <div class="theory-content">
                <p><strong>Разложение на простейшие дроби:</strong></p>
                <div class="theory-formula">$$\\frac{P(x)}{(x-a)^k(x^2+px+q)^m} = \\frac{A_1}{x-a} + ... + \\frac{A_k}{(x-a)^k} + \\frac{M_1x+N_1}{x^2+px+q} + ...$$</div>
                <div class="theory-example">
                    <div class="theory-example-title">📌 Пример</div>
                    <div class="theory-example-content">$$\\int \\frac{dx}{x(x+2)} = \\frac{1}{2}\\int\\left(\\frac{1}{x} - \\frac{1}{x+2}\\right)dx = \\frac{1}{2}\\ln\\left|\\frac{x}{x+2}\\right| + C$$</div>
                </div>
            </div>
        </div>`,
        `<div class="theory-block">
            <div class="theory-header">
                <span class="theory-header-icon">📐</span>
                <span class="theory-header-title">Тригонометрические интегралы</span>
            </div>
            <div class="theory-content">
                <p><strong>Формулы понижения степени:</strong></p>
                <div class="theory-formula">$$\\sin^2 x = \\frac{1-\\cos 2x}{2},\\quad \\cos^2 x = \\frac{1+\\cos 2x}{2}$$</div>
                <p><strong>Универсальная подстановка:</strong> $$t = \\tan\\frac{x}{2}$$</p>
                <div class="theory-formula">$$\\sin x = \\frac{2t}{1+t^2},\\quad \\cos x = \\frac{1-t^2}{1+t^2},\\quad dx = \\frac{2dt}{1+t^2}$$</div>
                <div class="theory-example">
                    <div class="theory-example-title">📌 Пример</div>
                    <div class="theory-example-content">$$\\int \\sin^3 x dx = \\int (1-\\cos^2 x)\\sin x dx = -\\int (1-u^2)du = -\\cos x + \\frac{1}{3}\\cos^3 x + C$$</div>
                </div>
            </div>
        </div>`,
        `<div class="theory-block">
            <div class="theory-header">
                <span class="theory-header-icon">🔄</span>
                <span class="theory-header-title">Тригонометрическая замена</span>
            </div>
            <div class="theory-content">
                <p><strong>Таблица замен:</strong></p>
                <ul>
                    <li>$$\\sqrt{a^2 - x^2} \\Rightarrow x = a\\sin t,\\quad dx = a\\cos t dt$$</li>
                    <li>$$\\sqrt{a^2 + x^2} \\Rightarrow x = a\\tan t,\\quad dx = \\frac{a}{\\cos^2 t} dt$$</li>
                    <li>$$\\sqrt{x^2 - a^2} \\Rightarrow x = \\frac{a}{\\cos t},\\quad dx = \\frac{a\\sin t}{\\cos^2 t} dt$$</li>
                </ul>
                <div class="theory-example">
                    <div class="theory-example-title">📌 Пример</div>
                    <div class="theory-example-content">$$\\int \\sqrt{a^2-x^2} dx = a^2\\int \\cos^2 t dt = \\frac{a^2}{2}(t + \\sin t\\cos t) + C$$</div>
                    <div class="theory-example-content">$$= \\frac{x}{2}\\sqrt{a^2-x^2} + \\frac{a^2}{2}\\arcsin\\frac{x}{a} + C$$</div>
                </div>
            </div>
        </div>`
    ];

    for (let i = 1; i <= 9; i++) {
        const sectionData = INTEGRALS_DATA[`section${i}`];
        if (!sectionData) continue;

        const sectionKey = `section-${i}`;
        const sectionsState = JSON.parse(localStorage.getItem('integrals_sections_state')) || {};
        const isExpanded = sectionsState[i] !== false;

        html += `<div class="section-card" style="margin: 1rem;">
            <div class="section-header" id="toggle-section-${i}" onclick="toggleSemester1Section(${i})" style="cursor:pointer; display:flex; align-items:center; gap:8px; padding:0.6rem 1rem; background:var(--surface); border-radius:8px; border:1px solid var(--border);">
                <span id="section-chevron-${i}">${isExpanded ? '▼' : '▶'}</span>
                <strong>Раздел ${i}.</strong>
                <span style="margin-left:auto; font-size:0.8rem; color:var(--pencil);">
                    ${sectionData.filter((_, j) => integralsProgress[`s${i}_t${j}`]).length}/${sectionData.length}
                </span>
            </div>
            <div id="section-${i}-content" style="display:${isExpanded ? 'block' : 'none'};">
                ${sectionTheory[i-1]}`;

        sectionData.forEach((item, j) => {
            const key = `s${i}_t${j}`;
            const checked = integralsProgress[key] === true;
            html += `
            <div class="integral-card" style="margin: 0.3rem 0 0 1.5rem; border-left: 2px solid var(--border); padding-left: 0.8rem;">
                <div class="integral-header" style="display: flex; align-items: center; gap: 12px; padding: 0.5rem 0.5rem;">
                    <input type="checkbox" class="integral-checkbox" id="chk_sem1_${key}" ${checked ? 'checked' : ''} onchange="toggleSemester1Integral('${key}', this.checked)">
                    <span style="font-size:0.8rem; color:var(--pencil); min-width:2.5rem;">${item.name.split(' ')[0]}</span>
                    <div style="flex:1; text-align:center; font-size:1.2rem;">$$\\int ${item.integral}$$</div>
                    <button class="check-btn" style="font-size:0.75rem; padding:2px 8px;" onclick="event.stopPropagation(); this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">📋 Ответ</button>
                    <span class="practice-answer" style="display:none; font-size:0.85rem; color:var(--ink-green);">$$\\int ${item.integral} = ${item.answer}$$</span>
                </div>
            </div>`;
        });

        html += `</div></div>`;
    }

    container.innerHTML = fixNeq(html);

    if (typeof renderMathInElement !== 'undefined') {
        setTimeout(() => {
            try {
                renderMathInElement(container, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '\\[', right: '\\]', display: true},
                        {left: '$', right: '$', display: false},
                        {left: '\\(', right: '\\)', display: false}
                    ],
                    macros: {
                        '\\tg': '\\operatorname{tg}',
                        '\\ctg': '\\operatorname{ctg}',
                        '\\arctg': '\\operatorname{arctg}'
                    },
                    throwOnError: false,
                    trust: true,
                    strict: false
                });
            } catch (err) {
                console.error('KaTeX error in renderSemester1Math', err);
            }
        }, 0);
    }
}

function toggleSemester1Section(num) {
    const content = document.getElementById(`section-${num}-content`);
    const chevron = document.getElementById(`section-chevron-${num}`);
    const isOpen = content.style.display !== 'none';
    content.style.display = isOpen ? 'none' : 'block';
    if (chevron) chevron.textContent = isOpen ? '▶' : '▼';
    const sectionsState = JSON.parse(localStorage.getItem('integrals_sections_state')) || {};
    sectionsState[num] = !isOpen;
    localStorage.setItem('integrals_sections_state', JSON.stringify(sectionsState));
}

function toggleSemester1Integral(key, checked) {
    integralsProgress[key] = checked;
    saveToStorage('integrals_progress', JSON.stringify(integralsProgress));
    // update visual state
    const card = document.getElementById(`chk_sem1_${key}`)?.closest('.integral-card');
    if (card) card.classList.toggle('completed', checked);
    // update section stat
    const sectionNum = parseInt(key.split('_')[0].slice(1), 10);
    const sectionData = INTEGRALS_DATA[`section${sectionNum}`];
    if (sectionData) {
        const sectionSpan = document.querySelector(`#semester1-math-content #toggle-section-${sectionNum} span:last-child`);
        if (sectionSpan) {
            const solved = sectionData.filter((_, j) => integralsProgress[`s${sectionNum}_t${j}`]).length;
            sectionSpan.textContent = `${solved}/${sectionData.length}`;
        }
    }
}

// ========== ТАБЛИЦА ИНТЕГРАЛОВ ==========

// ========== ТАБЛИЦА ИНТЕГРАЛОВ С ЧЕКБОКСАМИ, СВОРАЧИВАНИЕМ И ПРОГРЕССОМ ==========// ========== ПРОГРЕСС ИНТЕГРАЛОВ ==========
let integralsProgress = JSON.parse(localStorage.getItem('integrals_progress')) || {};

// ========== КЕШИРОВАНИЕ ИНТЕГРАЛОВ ==========
let integralsHTMLCache = null;
let integralsRendered = false;
let integralsKaTeXDone = false;

function saveIntegralsProgress() {
    saveToStorage('integrals_progress', JSON.stringify(integralsProgress));
    updateIntegralsStats();
}

function getSolvedCount() {
    let count = 0;
    for (let i = 1; i <= 9; i++) {
        const sectionData = INTEGRALS_DATA[`section${i}`];
        if (sectionData) {
            for (let j = 0; j < sectionData.length; j++) {
                if (integralsProgress[`s${i}_t${j}`]) count++;
            }
        }
    }
    return count;
}

function getTotalTasksCount() {
    let total = 0;
    for (let i = 1; i <= 9; i++) {
        if (INTEGRALS_DATA[`section${i}`]) {
            total += INTEGRALS_DATA[`section${i}`].length;
        }
    }
    return total;
}

function saveActiveTab() {
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        localStorage.setItem('active_tab', activeTab.getAttribute('data-tab'));
    }
}

function loadActiveTab() {
    const savedTab = localStorage.getItem('active_tab');
    const tabToShow = (savedTab === 'exam' || savedTab === 'exam-tasks' || savedTab === 'physics-ntk') ? savedTab : 'exam';
    const tabBtn = document.querySelector(`.tab-btn[data-tab="${tabToShow}"]`);
    if (tabBtn) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        tabBtn.classList.add('active');

        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active-pane'));

        if (tabToShow === 'exam') {
            document.getElementById('exam-pane')?.classList.add('active-pane');
            render();
        } else if (tabToShow === 'exam-tasks') {
            document.getElementById('exam-tasks-pane')?.classList.add('active-pane');
            requestAnimationFrame(() => renderExamTasks());
        } else if (tabToShow === 'physics-ntk') {
            document.getElementById('physics-ntk-pane')?.classList.add('active-pane');
            const savedSubTab = localStorage.getItem('active_subtab');
            if (savedSubTab) {
                const subBtn = document.querySelector(`#physics-ntk-pane .sub-tab-btn[data-subtab="${savedSubTab}"]`);
                if (subBtn) {
                    document.querySelectorAll('#physics-ntk-pane .sub-tab-btn').forEach(b => b.classList.remove('active'));
                    subBtn.classList.add('active');
                    document.querySelectorAll('#physics-ntk-pane .sub-tab-pane').forEach(p => p.classList.remove('active-sub-pane'));
                    const pane = document.getElementById(`physics-ntk-${savedSubTab}`);
                    if (pane) pane.classList.add('active-sub-pane');
                }
            }
            requestAnimationFrame(() => {
                renderPhysicsNtkStats();
                renderPhysicsNtk();
                const savedScroll = localStorage.getItem('physics_ntk_scroll');
                if (savedScroll) {
                    window.scrollTo(0, parseInt(savedScroll, 10));
                }
            });
        }
    }
}

function buildPhysicsPaceText(total, solved) {
    const remaining = Math.max(0, total - solved);
    if (remaining <= 0) return '🏆 ВСЕ ЗАДАЧИ РЕШЕНЫ!';

    const deadline = new Date(2026, 5, 5);
    const now = new Date();
    const daysLeft = (deadline - now) / 86400000;

    if (daysLeft <= 0) return '⏰ Срок вышел! Решай оставшиеся задачи.';

    const perDay = Math.ceil(Math.min(remaining, remaining / daysLeft));
    return `📅 До 5 июня: ${daysLeft.toFixed(3)} дн. | Осталось: ${remaining} ${pluralTasks(remaining)} | Нужно: ${perDay} ${pluralTasks(perDay)} в день`;
}

async function renderPhysicsNtkStats() {
    const container = document.getElementById('physics-ntk-stats');
    if (!container) return;
    if (typeof PHYSICS_NTK_DATA === 'undefined') {
        try { await window.DataLoader.load('physics'); } catch (err) { console.error(err); return; }
    }
    let total = 0, solved = 0;
    for (const section of PHYSICS_NTK_DATA) {
        total += section.problems.length;
        solved += section.problems.filter((_, idx) => physicsProgress[`${section.id}_${idx}`]).length;
    }
    const remaining = Math.max(0, total - solved);
    let anyOpen = false;
    for (const section of PHYSICS_NTK_DATA) {
        anyOpen = section.problems.some((_, idx) => physicsAnswers[`${section.id}_${idx}_sol`] === '1');
        if (anyOpen) break;
    }
    container.innerHTML = `
        <div class="toolbar" style="margin-bottom: 16px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
            <button class="btn-save" onclick="exportAllToFile()">💾 Сохранить прогресс</button>
            <button class="btn-load" onclick="importAllFromFile()">📂 Загрузить прогресс</button>
            <button class="btn-save" id="toggle-all-physics" onclick="toggleAllPhysicsSolutions()">${anyOpen ? '📁 Свернуть всё' : '📂 Развернуть всё'}</button>
            <button class="reset-btn" onclick="resetPhysicsProgress()" style="padding: 5px 18px; border-radius: 20px; font-size: 0.8rem;">🗑️ Сбросить</button>
        </div>
        <div class="kr-stats-panel">
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; align-items: center;">
                <div class="stats-grid-inline" style="flex:1;">
                    <div class="stats-grid-item">
                        <div class="stats-grid-value" id="physics-solved">${solved}</div>
                        <div class="stats-grid-label">✅ Решено</div>
                    </div>
                    <div class="stats-grid-item">
                        <div class="stats-grid-value" id="physics-total" style="color:var(--ink-blue);">${total}</div>
                        <div class="stats-grid-label">📋 Всего задач</div>
                    </div>
                    <div class="stats-grid-item">
                        <div class="stats-grid-value" id="physics-percent">${total > 0 ? ((solved/total)*100).toFixed(1) : 0}%</div>
                        <div class="stats-grid-label">📊 Прогресс</div>
                    </div>
                    <div class="stats-grid-item">
                        <div class="stats-grid-value" id="physics-remaining">${remaining}</div>
                        <div class="stats-grid-label">⏳ Осталось</div>
                    </div>
                </div>
            </div>
            <div class="progress-bar" style="margin-top: 12px;">
                <div class="progress-fill" id="physics-progress-fill" style="width: ${total > 0 ? (solved/total)*100 : 0}%;"></div>
            </div>
            <div id="physics-pace" style="margin-top: 12px; font-size:0.85rem; color:var(--pencil); text-align:center;">${buildPhysicsPaceText(total, solved)}</div>
        </div>
    `;
}

async function renderPhysicsNtk(subtabId) {
    const savedScrollY = window.scrollY;
    if (typeof PHYSICS_NTK_DATA === 'undefined') {
        try { await window.DataLoader.load('physics'); } catch (err) { console.error(err); return; }
    }
    let sectionsToRender;
    if (subtabId) {
        sectionsToRender = PHYSICS_NTK_DATA.filter(s => s.id === subtabId);
    } else {
        sectionsToRender = PHYSICS_NTK_DATA;
    }
    for (const section of sectionsToRender) {
        const container = document.getElementById(`physics-ntk-${section.id}-list`);
        if (!container) continue;
        saveVisiblePhysicsInputs(section.id);
        container.innerHTML = '';
        if (section.problems.length === 0) {
            container.innerHTML = '<div class="glass-panel" style="margin: 1rem; padding: 1.2rem; text-align: center; color: var(--pencil);">📖 Задачи будут добавлены позже.</div>';
            continue;
        }
        section.problems.forEach((problem, idx) => {
            const key = `${section.id}_${idx}`;
            const solvedFlag = !!physicsProgress[key];
            const card = document.createElement('div');
            card.className = `phys-card task-card ${solvedFlag ? 'completed' : ''}`;
            card.setAttribute('data-phys-key', key);
            let html = `
                <div class="task-header">
                    <input type="checkbox" id="phys_chk_${key}" ${solvedFlag ? 'checked' : ''} style="width:18px;height:18px;cursor:pointer;" onchange="togglePhysicsTask('${section.id}', ${idx})">
                    <span class="task-title" id="phys_title_${key}">
                        <strong>${problem.num}.</strong> ${problem.text}
                    </span>
                </div>
            `;
            if (problem.images) {
                for (const src of problem.images) {
                    html += `<div class="phys-image"><img src="${src}" alt="Рис. ${problem.num}" onclick="this.classList.toggle('phys-img-expanded')" loading="lazy"></div>`;
                }
            } else if (problem.image) {
                html += `<div class="phys-image"><img src="${problem.image}" alt="Рис. ${problem.num}" onclick="this.classList.toggle('phys-img-expanded')" loading="lazy"></div>`;
            }
            const isMulti = problem.correctIndices !== undefined;
            const optKey = `${key}_opt`;
            const chkKey = `${key}_chk`;
            const solKey = `${key}_sol`;
            const wasChecked = physicsAnswers[chkKey] === '1';
            const showSol = physicsAnswers[solKey] === '1';
            if (problem.options && problem.options.length > 0) {
                if (isMulti) {
                    const selectedStr = physicsAnswers[optKey] || '';
                    const selectedSet = selectedStr ? selectedStr.split(',').map(Number) : [];
                    html += '<div class="phys-options">';
                    problem.options.forEach((opt, oi) => {
                        let cls = 'phys-opt-btn';
                        const isSel = selectedSet.includes(oi);
                        if (wasChecked) {
                            const isCorrectOpt = problem.correctIndices.includes(oi);
                            if (isSel) {
                                cls += isCorrectOpt ? ' phys-opt-correct' : ' phys-opt-wrong';
                            } else if (isCorrectOpt) {
                                cls += ' phys-opt-missed';
                            }
                        } else if (isSel) {
                            cls += ' phys-opt-selected';
                        }
                        html += `<button class="${cls}" onclick="togglePhysicsOption('${section.id}', ${idx}, ${oi})">${opt}</button>`;
                    });
                    html += '</div>';
                    html += `<div class="phys-check-row"><button class="phys-check-btn" onclick="checkPhysicsMultiSelect('${section.id}', ${idx})">${wasChecked ? '🔄' : 'Проверить'}</button>`;
                    if (wasChecked) {
                        const total = problem.correctIndices.length;
                        let correctCount = 0;
                        const selectedStr2 = physicsAnswers[optKey] || '';
                        const selectedSet2 = selectedStr2 ? selectedStr2.split(',').map(Number) : [];
                        for (const s of selectedSet2) {
                            if (problem.correctIndices.includes(s)) correctCount++;
                        }
                        const allFound = correctCount === total && selectedSet2.length === total;
                        html += `<span class="phys-feedback ${allFound ? 'phys-fb-correct' : 'phys-fb-wrong'}">${allFound ? '✅ Верно!' : '❌ Неверно'}</span>`;
                    }
                    html += `</div>`;
                } else {
                    const selectedIdx = physicsAnswers[optKey] !== undefined ? physicsAnswers[optKey] : -1;
                    const hasCorrect = problem.correctIndex !== undefined && problem.correctIndex !== null;
                    html += '<div class="phys-options">';
                    problem.options.forEach((opt, oi) => {
                        let cls = 'phys-opt-btn';
                        let icon = '';
                        if (selectedIdx === oi) {
                            cls += ' phys-opt-selected';
                            if (hasCorrect) {
                                if (oi === problem.correctIndex) {
                                    cls += ' phys-opt-correct';
                                    icon = ' ✅';
                                } else {
                                    cls += ' phys-opt-wrong';
                                    icon = ' ❌';
                                }
                            }
                        }
                        html += `<button class="${cls}" onclick="selectPhysicsOption('${section.id}', ${idx}, ${oi})">${opt}${icon}</button>`;
                    });
                    html += '</div>';
                }
            } else {
                html += `<div class="phys-answer-row">`;
                html += `<input type="text" class="phys-answer-input" id="phys_input_${key}" placeholder="Введи ответ..." value="${physicsAnswers[`${key}_txt`] || ''}" onchange="savePhysicsTypedAnswer('${section.id}', ${idx}, this.value)">`;
                if (problem.answer) {
                    html += `<button class="phys-check-btn" onclick="checkPhysicsAnswer('${section.id}', ${idx})">${wasChecked ? '🔄' : 'Проверить'}</button>`;
                    if (wasChecked) {
                        const userAnswer = (physicsAnswers[`${key}_txt`] || '').trim().toLowerCase().replace(/,/g, '.');
                        const correctAnswer = problem.answer.trim().toLowerCase().replace(/,/g, '.');
                        let isCorrect = false;
                        if (problem.answerType === 'number') {
                            const uNum = parseFloat(userAnswer);
                            const cNum = parseFloat(correctAnswer);
                            isCorrect = !isNaN(uNum) && !isNaN(cNum) && Math.abs(uNum - cNum) < 0.01;
                        } else if (problem.answerType === 'formula') {
                            isCorrect = normalizeFormula(userAnswer) === normalizeFormula(correctAnswer);
                        } else if (problem.accept) {
                            isCorrect = problem.accept.some(a => normalizeText(userAnswer) === normalizeText(a.trim().toLowerCase().replace(/,/g, '.')));
                        } else {
                            isCorrect = normalizeText(userAnswer) === normalizeText(correctAnswer);
                        }
                        html += `<span class="phys-feedback ${isCorrect ? 'phys-fb-correct' : 'phys-fb-wrong'}">${isCorrect ? '✅ Верно!' : '❌ Неверно. Правильно: ' + problem.answer.replace(/\./g, ',')}</span>`;
                    }
                }
                html += `</div>`;
            }
            if (problem.solution) {
                html += `<div class="phys-solution">`;
                html += `<div class="phys-solution-header" onclick="togglePhysicsSolution('${section.id}', ${idx})">📖 Решение <span class="phys-sol-arrow">${showSol ? '▲' : '▼'}</span></div>`;
                if (showSol) {
                    html += `<div class="phys-solution-body">${problem.solution.replace(/\n/g, '<br>')}</div>`;
                }
                html += `</div>`;
            }
            card.innerHTML = html;
            container.appendChild(card);
        });
        updatePhysicsSectionStats(section.id);
        const elements = Array.from(container.querySelectorAll('.phys-card'));
        typesetKaTeX(elements, () => {});
    }
    renderPhysicsNtkStats();
}

// ========== ТЕОРИЯ ДЛЯ РАЗДЕЛОВ ФИЗИКИ ==========
function showPhysicsTheory(sectionId) {
    const theory = PHYSICS_THEORY[sectionId];
    if (!theory) {
        const section = PHYSICS_NTK_DATA.find(s => s.id === sectionId);
        const name = section ? section.title : sectionId;
        alert(`Теория для раздела «${name}» пока не добавлена.`);
        return;
    }
    const overlay = document.getElementById('physics-theory-overlay');
    if (overlay) overlay.remove();
    const newOverlay = document.createElement('div');
    newOverlay.id = 'physics-theory-overlay';
    newOverlay.className = 'physics-theory-overlay';
    const section = PHYSICS_NTK_DATA.find(s => s.id === sectionId);
    const title = section ? section.title : sectionId;
    newOverlay.innerHTML = `
        <div class="physics-theory-modal">
            <div class="physics-theory-header">
                <h2>${title}</h2>
                <button class="physics-theory-close" onclick="closePhysicsTheory()" aria-label="Закрыть">✕</button>
            </div>
            <div class="physics-theory-body">
                ${theory}
            </div>
            <button class="physics-theory-ok" onclick="closePhysicsTheory()">Понятно</button>
        </div>
    `;
    document.body.appendChild(newOverlay);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => newOverlay.classList.add('open'));
    newOverlay.addEventListener('click', function (e) {
        if (e.target === newOverlay) closePhysicsTheory();
    });
    const escHandler = function (e) {
        if (e.key === 'Escape') closePhysicsTheory();
    };
    document.addEventListener('keydown', escHandler);
    newOverlay._escHandler = escHandler;
    setTimeout(() => {
        const body = newOverlay.querySelector('.physics-theory-body');
        if (body && typeof renderMathInElement !== 'undefined') {
            try {
                renderMathInElement(body, {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '\\[', right: '\\]', display: true },
                        { left: '$', right: '$', display: false },
                        { left: '\\(', right: '\\)', display: false }
                    ],
                    macros: {
                        '\\tg': '\\operatorname{tg}',
                        '\\ctg': '\\operatorname{ctg}',
                        '\\arctg': '\\operatorname{arctg}'
                    },
                    throwOnError: false,
                    trust: true,
                    strict: false
                });
            } catch (e) {}
        }
    }, 100);
}

function closePhysicsTheory() {
    const overlay = document.getElementById('physics-theory-overlay');
    if (!overlay) return;
    if (overlay._escHandler) {
        document.removeEventListener('keydown', overlay._escHandler);
    }
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => overlay.remove(), 200);
}

async function initPhysicsTheoryButtons() {
    if (typeof PHYSICS_NTK_DATA === 'undefined') {
        try { await window.DataLoader.load('physics'); } catch (err) { console.error(err); return; }
    }
    for (const section of PHYSICS_NTK_DATA) {
        const pane = document.getElementById(`physics-ntk-${section.id}`);
        if (!pane) continue;
        if (pane.querySelector('.physics-theory-btn')) continue;
        const btn = document.createElement('button');
        btn.className = 'physics-theory-btn';
        btn.innerHTML = '?';
        btn.title = `Теория: ${section.title}`;
        btn.setAttribute('aria-label', `Теория: ${section.title}`);
        btn.onclick = function () { showPhysicsTheory(section.id); };
        pane.appendChild(btn);
    }
}

function saveActiveSubTab() {
    const active = document.querySelector('.sub-tab-btn.active');
    if (active) {
        localStorage.setItem('active_subtab', active.getAttribute('data-subtab'));
    }
}

function saveIntegralsSectionState() {
    const sectionsState = {};
    for (let i = 1; i <= 9; i++) {
        const content = document.getElementById(`section-${i}-content`);
        if (content) {
            sectionsState[i] = content.style.display !== 'none';
        }
    }
    localStorage.setItem('integrals_sections_state', JSON.stringify(sectionsState));
}

function loadIntegralsSectionState() {
    const saved = localStorage.getItem('integrals_sections_state');
    const sectionsState = saved ? JSON.parse(saved) : {};
    
    if (saved) {
        for (let i = 1; i <= 9; i++) {
            const content = document.getElementById(`section-${i}-content`);
            const toggleBtn = document.getElementById(`toggle-section-${i}`);
            if (content && sectionsState[i] !== undefined) {
                if (sectionsState[i]) {
                    content.style.display = 'block';
                    if (toggleBtn) toggleBtn.innerHTML = '▼';
                } else {
                    content.style.display = 'none';
                    if (toggleBtn) toggleBtn.innerHTML = '▶';
                }
            }
        }
    }
    // Sync toggle-all button text with actual state
    const integralsPane = document.getElementById('integrals-list');
    const anyExpanded = integralsPane ? Array.from(integralsPane.querySelectorAll('.section-content')).some(c => c.style.display === 'block') : false;
    const btnText = document.getElementById('integrals-toggle-all-btn');
    if (btnText) {
        btnText.innerHTML = anyExpanded ? '📁 Свернуть всё' : '📂 Развернуть всё';
    }
    // Ленивый рендер KaTeX для секций, восстановленных из сохранённого состояния
    for (let i = 1; i <= 9; i++) {
        const content = document.getElementById(`section-${i}-content`);
        if (content && sectionsState[i] && !content.dataset.katexRendered && typeof renderMathInElement !== 'undefined') {
            typesetKaTeX([content]);
            content.dataset.katexRendered = '1';
        }
    }
}

function updateIntegralsStats() {
    if (typeof INTEGRALS_DATA === 'undefined') return;
    const solved = getSolvedCount();
    const total = getTotalTasksCount();
    
    const progressFill = document.getElementById('integrals-progress-fill');
    const solvedSpan = document.getElementById('integrals-solved');
    const totalSpan = document.getElementById('integrals-total');
    const percentSpan = document.getElementById('integrals-percent');
    const paceSpan = document.getElementById('integrals-pace');
    const remainingSpan = document.getElementById('integrals-remaining');
    
    if (progressFill) progressFill.style.width = `${total > 0 ? (solved / total) * 100 : 0}%`;
    if (solvedSpan) solvedSpan.innerText = solved;
    if (totalSpan) totalSpan.innerText = total;
    if (percentSpan) percentSpan.innerText = total > 0 ? ((solved / total) * 100).toFixed(1) : 0;
    if (remainingSpan) remainingSpan.innerText = Math.max(0, total - solved);
    
    // Темп до 22 мая 2026
    const examDate = new Date(2026, 4, 22);
    const now = new Date();
    const daysLeft = (examDate - now) / 86400000;
    const remaining = Math.max(0, total - solved);
    
    if (paceSpan) {
        if (remaining <= 0) {
            paceSpan.innerHTML = '🏆 ВСЕ ЗАДАЧИ РЕШЕНЫ!';
        } else if (daysLeft <= 0) {
            paceSpan.innerHTML = '⏰ Срок вышел! Решай оставшиеся задачи.';
        } else {
            const perDay = Math.min(remaining, remaining / daysLeft);
            paceSpan.innerHTML = `📅 До 22 мая: ${daysLeft.toFixed(3)} дн. | Осталось: ${remaining} ${pluralTasks(remaining)} | Нужно: ${fmtNum(perDay)} ${pluralTasks(perDay)} в день`;
        }
    }
    
    // Обновляем счётчики в заголовках разделов
    for (let i = 1; i <= 9; i++) {
        const sectionData = INTEGRALS_DATA[`section${i}`];
        if (sectionData) {
            const solvedInSection = sectionData.filter((_, idx) => integralsProgress[`s${i}_t${idx}`]).length;
            const sectionCounter = document.getElementById(`section-${i}-counter`);
            if (sectionCounter) {
                sectionCounter.innerText = `${solvedInSection}/${sectionData.length}`;
            }
        }
    }
}

function toggleIntegralTask(sectionNum, taskIdx) {
    const key = `s${sectionNum}_t${taskIdx}`;
    if (integralsProgress[key]) {
        delete integralsProgress[key];
    } else {
        integralsProgress[key] = true;
    }
    saveIntegralsProgress();
    
    // Обновляем только чекбокс без перерисовки
    const checkbox = document.getElementById(`chk_${key}`);
    if (checkbox) checkbox.checked = integralsProgress[key] === true;
    
    // Затемняем карточку
    const card = checkbox?.closest('.integral-card');
    if (card) {
        card.classList.toggle('completed', integralsProgress[key]);
    }
    
    // Обновляем счётчик решённых задач в разделе
    const sectionData = INTEGRALS_DATA[`section${sectionNum}`];
    if (sectionData) {
        const solvedInSection = sectionData.filter((_, idx) => integralsProgress[`s${sectionNum}_t${idx}`]).length;
        const sectionCounter = document.getElementById(`section-${sectionNum}-counter`);
        if (sectionCounter) {
            sectionCounter.innerText = `${solvedInSection}/${sectionData.length}`;
        }
    }
    
    // Обновляем общую статистику
    updateIntegralsStats();
}

// ========== ФУНКЦИИ ДЛЯ ИНТЕГРАЛОВ ==========
function toggleIntegralSolution(card) {
    const solution = card.querySelector('.integral-solution');
    if (solution) {
        const isOpen = solution.style.display === 'block';
        solution.style.display = isOpen ? 'none' : 'block';
        if (!isOpen) {
            if (!solution.dataset.rendered && typeof renderMathInElement !== 'undefined' && !solution.querySelector('.katex')) {
                try {
                    renderMathInElement(solution, {
                        delimiters: [
                            {left: '$$', right: '$$', display: true},
                            {left: '\\[', right: '\\]', display: true},
                            {left: '$', right: '$', display: false},
                            {left: '\\(', right: '\\)', display: false}
                        ],
                    macros: {
                        '\\tg': '\\operatorname{tg}',
                        '\\ctg': '\\operatorname{ctg}',
                        '\\arctg': '\\operatorname{arctg}'
                    },
                        throwOnError: false,
                        trust: true,
                        strict: false
                    });
                    solution.dataset.rendered = 'true';
                } catch (err) {
                    console.error('KaTeX error in integral solution:', err);
                }
            }
        }
        const chk = card.querySelector('.integral-checkbox');
        if (chk) {
            const key = chk.id.replace('chk_', '');
            saveSolutionState('integral', key, !isOpen);
        }
    }
}

function showIntegralAnswer(btn, answer) {
    const answerSpan = btn.nextElementSibling;
    if (answerSpan) {
        answerSpan.style.display = 'inline';
        if (!answerSpan.dataset.rendered && typeof renderMathInElement !== 'undefined' && !answerSpan.querySelector('.katex')) {
            try {
                renderMathInElement(answerSpan, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '\\[', right: '\\]', display: true},
                        {left: '$', right: '$', display: false},
                        {left: '\\(', right: '\\)', display: false}
                    ],
                    macros: {
                        '\\tg': '\\operatorname{tg}',
                        '\\ctg': '\\operatorname{ctg}',
                        '\\arctg': '\\operatorname{arctg}'
                    },
                    throwOnError: false,
                    trust: true,
                    strict: false
                });
                answerSpan.dataset.rendered = 'true';
            } catch (err) {
                console.error('KaTeX error in integral answer:', err);
            }
        }
        setTimeout(() => {
            answerSpan.style.display = 'none';
        }, 4000);
    }
}

async function renderIntegrals() {
    const container = document.getElementById('integrals-list');
    if (!container) return;
    if (typeof INTEGRALS_DATA === 'undefined') {
        container.innerHTML = '<div class="glass-panel" style="margin:1rem;padding:1.2rem;text-align:center;color:var(--pencil);">Загрузка интегралов…</div>';
        try { await window.DataLoader.load('integrals'); } catch (err) { console.error(err); return; }
    }

    // ── БЫСТРЫЙ ПУТЬ: кеш уже есть ──
    if (integralsHTMLCache && integralsRendered) {
        container.innerHTML = integralsHTMLCache;
        updateIntegralsStats();
        document.querySelectorAll('.integral-checkbox').forEach(checkbox => {
            const key = checkbox.id.replace('chk_', '');
            const checked = integralsProgress[key] === true;
            checkbox.checked = checked;
            const card = checkbox.closest('.integral-card');
            if (card) card.classList.toggle('completed', checked);
        });
        restoreSolutionStates('integral');
        setTimeout(() => { loadIntegralsSectionState(); }, 50);
        // Рендерим KaTeX только для видимых секций (скрытые — при раскрытии)
        const visibleIntSections = Array.from(container.querySelectorAll('.section-content')).filter(el => el.style.display !== 'none');
        typesetKaTeX(visibleIntSections, () => { integralsKaTeXDone = true; });
        return;
    }

    // ── МЕДЛЕННЫЙ ПУТЬ: генерируем с нуля ──
    let totalTasks = getTotalTasksCount();
    let solved = getSolvedCount();
    
    const integralsSectionsState = JSON.parse(localStorage.getItem('integrals_sections_state')) || {};
    const integralsAnyExpanded = Object.values(integralsSectionsState).some(v => v === true);
    
    let html = `
    <div class="integrals-stats-panel">
        <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
            <button class="kr-action-btn" onclick="exportAllToFile()">💾 Сохранить прогресс</button>
            <button class="kr-action-btn" onclick="importAllFromFile()">📂 Загрузить прогресс</button>
            <button class="kr-action-btn" id="integrals-toggle-all-btn" onclick="toggleIntegralsAllSections()">${integralsAnyExpanded ? '📁 Свернуть всё' : '📂 Развернуть всё'}</button>
            <button class="kr-action-btn kr-reset-btn" onclick="resetAllIntegralsProgress()">🗑️ Сбросить</button>
        </div>
        
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; align-items: center;">
            <div class="stats-grid-inline" style="flex:1;">
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="integrals-solved">${solved}</div>
                    <div class="stats-grid-label">✅ Решено</div>
                </div>
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="integrals-total" style="color:var(--ink-blue);">${totalTasks}</div>
                    <div class="stats-grid-label">📋 Всего задач</div>
                </div>
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="integrals-percent">${totalTasks > 0 ? ((solved / totalTasks) * 100).toFixed(1) : 0}%</div>
                    <div class="stats-grid-label">📊 Прогресс</div>
                </div>
                <div class="stats-grid-item">
                    <div class="stats-grid-value" id="integrals-remaining">${Math.max(0, totalTasks - solved)}</div>
                    <div class="stats-grid-label">⏳ Осталось</div>
                </div>
            </div>
        </div>
        <div class="progress-bar" style="margin-top: 12px;">
            <div class="progress-fill" id="integrals-progress-fill" style="width: ${totalTasks > 0 ? (solved / totalTasks) * 100 : 0}%;"></div>
        </div>
        <div id="integrals-pace" style="margin-top: 12px; font-size:0.85rem; color:var(--pencil); text-align:center;">загрузка...</div>
    </div>
    `;
    
    const sections = [
        { 
            num: 1, 
            title: "Интегрирование по таблице", 
            data: INTEGRALS_DATA.section1,
            theory: `<div class="theory-block">
                <div class="theory-header">
                    <span class="theory-header-icon">📚</span>
                    <span class="theory-header-title">Табличное интегрирование</span>
                </div>
                <div class="theory-content">
                    <p><strong>Основные табличные интегралы:</strong></p>
                    <div class="theory-formula">$$\\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \neq -1)$$</div>
                    <div class="theory-formula">$$\\int \\frac{dx}{x} = \\ln|x| + C$$</div>
                    <div class="theory-formula">$$\\int e^x dx = e^x + C$$</div>
                    <div class="theory-formula">$$\\int a^x dx = \\frac{a^x}{\\ln a} + C$$</div>
                    <div class="theory-formula">$$\\int \\sin x dx = -\\cos x + C$$</div>
                    <div class="theory-formula">$$\\int \\cos x dx = \\sin x + C$$</div>
                    <div class="theory-formula">$$\\int \\frac{dx}{\\cos^2 x} = \\tan x + C$$</div>
                    <div class="theory-formula">$$\\int \\frac{dx}{\\sin^2 x} = -\\cot x + C$$</div>
                    <div class="theory-formula">$$\\int \\frac{dx}{x^2 + a^2} = \\frac{1}{a}\\arctan\\frac{x}{a} + C$$</div>
                    <div class="theory-formula">$$\\int \\frac{dx}{\\sqrt{a^2 - x^2}} = \\arcsin\\frac{x}{a} + C$$</div>
                    <div class="theory-divider"></div>
                    <p><strong>Типовые преобразования (подведение под дифференциал):</strong> $$\\cos x dx = d(\\sin x),\\quad \\frac{dx}{x} = d(\\ln x),\\quad \\frac{dx}{1+x^2} = d(\\arctan x)$$</p>
                    <div class="theory-example">
                        <div class="theory-example-title">📌 Пример</div>
                        <div class="theory-example-content">$$\\int x^2 e^{-3x^3} dx = -\\frac{1}{9}\\int e^{-3x^3} d(-3x^3) = -\\frac{1}{9}e^{-3x^3} + C$$</div>
                    </div>
                </div>
            </div>`
        },
        { 
            num: 2, 
            title: "Замена переменной", 
            data: INTEGRALS_DATA.section2,
            theory: `<div class="theory-block">
                <div class="theory-header">
                    <span class="theory-header-icon">🔄</span>
                    <span class="theory-header-title">Замена переменной (подстановка)</span>
                </div>
                <div class="theory-content">
                    <p><strong>Основная формула:</strong> $$\\int f(g(x)) g'(x) dx = \\int f(u) du, \\quad u = g(x)$$</p>
                    <div class="theory-divider"></div>
                    <p><strong>Стандартные подстановки:</strong></p>
                    <ul>
                        <li>Линейная: $$t = ax + b$$</li>
                        <li>Степенная: $$t = x^n$$</li>
                        <li>Иррациональная: $$t = \\sqrt{ax + b}$$</li>
                        <li>Логарифмическая: $$t = \\ln x$$</li>
                        <li>Экспоненциальная: $$t = e^x$$</li>
                    </ul>
                    <div class="theory-example">
                        <div class="theory-example-title">📌 Пример</div>
                        <div class="theory-example-content">$$\\int \\frac{dx}{1+\\sqrt{x+2}},\\quad t = \\sqrt{x+2} \\Rightarrow x = t^2-2,\\ dx = 2t dt$$</div>
                        <div class="theory-example-content">$$\\int \\frac{2t}{1+t} dt = 2\\int\\left(1 - \\frac{1}{1+t}\\right)dt = 2(t - \\ln|1+t|) + C = 2\\sqrt{x+2} - 2\\ln(\\sqrt{x+2}+1) + C$$</div>
                    </div>
                </div>
            </div>`
        },
        { 
            num: 3, 
            title: "Интегрирование по частям", 
            data: INTEGRALS_DATA.section3,
            theory: `<div class="theory-block">
                <div class="theory-header">
                    <span class="theory-header-icon">✖️</span>
                    <span class="theory-header-title">Интегрирование по частям</span>
                </div>
                <div class="theory-content">
                    <div class="theory-formula">$$\\int u dv = uv - \\int v du$$</div>
                    <div class="theory-divider"></div>
                    <p><strong>Правило выбора u (ЛИАТЭ):</strong> Логарифмические → Обратные тригонометрические → Алгебраические → Тригонометрические → Экспоненциальные</p>
                    <div class="theory-example">
                        <div class="theory-example-title">📌 Пример</div>
                        <div class="theory-example-content">$$\\int x^2 \\ln x dx,\\quad u = \\ln x,\\ dv = x^2 dx$$</div>
                        <div class="theory-example-content">$$du = \\frac{dx}{x},\\ v = \\frac{x^3}{3} \\Rightarrow \\int x^2 \\ln x dx = \\frac{x^3}{3}\\ln x - \\frac{1}{3}\\int x^2 dx = \\frac{x^3}{3}\\ln x - \\frac{x^3}{9} + C$$</div>
                    </div>
                </div>
            </div>`
        },
        { 
            num: 4, 
            title: "Квадратный трёхчлен", 
            data: INTEGRALS_DATA.section4,
            theory: `<div class="theory-block">
                <div class="theory-header">
                    <span class="theory-header-icon">📐</span>
                    <span class="theory-header-title">Квадратный трёхчлен</span>
                </div>
                <div class="theory-content">
                    <p><strong>Выделение полного квадрата:</strong></p>
                    <div class="theory-formula">$$ax^2 + bx + c = a\\left[\\left(x + \\frac{b}{2a}\\right)^2 + \\left(\\frac{c}{a} - \\frac{b^2}{4a^2}\\right)\\right]$$</div>
                    <div class="theory-divider"></div>
                    <p><strong>Возможные случаи:</strong></p>
                    <ul>
                        <li>$$\\int \\frac{dx}{t^2 + k^2} = \\frac{1}{k}\\arctan\\frac{t}{k} + C$$</li>
                        <li>$$\\int \\frac{dx}{t^2 - k^2} = \\frac{1}{2k}\\ln\\left|\\frac{t-k}{t+k}\\right| + C$$</li>
                        <li>$$\\int \\frac{dx}{\\sqrt{t^2 + k^2}} = \\ln\\left|t + \\sqrt{t^2 + k^2}\\right| + C$$</li>
                        <li>$$\\int \\frac{dx}{\\sqrt{k^2 - t^2}} = \\arcsin\\frac{t}{k} + C$$</li>
                    </ul>
                    <div class="theory-example">
                        <div class="theory-example-title">📌 Пример</div>
                        <div class="theory-example-content">$$\\int \\frac{dx}{x^2+2x+5} = \\int \\frac{dx}{(x+1)^2+4} = \\frac{1}{2}\\arctan\\frac{x+1}{2} + C$$</div>
                    </div>
                </div>
            </div>`
        },
        { 
            num: 5, 
            title: "Линейный член + трёхчлен", 
            data: INTEGRALS_DATA.section5,
            theory: `<div class="theory-block">
                <div class="theory-header">
                    <span class="theory-header-icon">➕</span>
                    <span class="theory-header-title">Линейная часть и квадратный трёхчлен</span>
                </div>
                <div class="theory-content">
                    <p>Для интегралов вида $$\\int \\frac{Mx+N}{ax^2+bx+c} dx$$ представляем числитель как комбинацию производной знаменателя.</p>
                    <div class="theory-formula">$$Mx+N = \\frac{M}{2a}(2ax+b) + \\left(N - \\frac{Mb}{2a}\\right)$$</div>
                    <div class="theory-example">
                        <div class="theory-example-title">📌 Пример</div>
                        <div class="theory-example-content">$$\\int \\frac{x+2}{x^2+2x+2} dx = \\frac{1}{2}\\int \\frac{2x+2}{x^2+2x+2}dx + \\int \\frac{dx}{(x+1)^2+1}$$</div>
                        <div class="theory-example-content">$$= \\frac{1}{2}\\ln(x^2+2x+2) + \\arctan(x+1) + C$$</div>
                    </div>
                </div>
            </div>`
        },
        { 
            num: 6, 
            title: "Тип dx/(x√(...))", 
            data: INTEGRALS_DATA.section6,
            theory: `<div class="theory-block">
                <div class="theory-header">
                    <span class="theory-header-icon">🔀</span>
                    <span class="theory-header-title">Интегралы вида ∫ dx/(x√(ax²+bx+c))</span>
                </div>
                <div class="theory-content">
                    <p><strong>Подстановка:</strong> $$x = \\frac{1}{t},\\quad dx = -\\frac{dt}{t^2}$$</p>
                    <div class="theory-formula">$$\\int \\frac{dx}{x\\sqrt{ax^2+bx+c}} = -\\int \\frac{dt}{\\sqrt{c t^2 + b t + a}}$$</div>
                    <div class="theory-divider"></div>
                    <p><strong>Частные табличные случаи:</strong></p>
                    <ul>
                        <li>$$\\int \\frac{dx}{x\\sqrt{x^2 + a^2}} = -\\frac{1}{a}\\ln\\left|\\frac{a+\\sqrt{x^2+a^2}}{x}\\right| + C$$</li>
                        <li>$$\\int \\frac{dx}{x\\sqrt{x^2 - a^2}} = \\frac{1}{a}\\operatorname{arcsec}\\frac{x}{a} + C$$</li>
                    </ul>
                </div>
            </div>`
        },
        { 
            num: 7, 
            title: "Дробно-рациональные", 
            data: INTEGRALS_DATA.section7,
            theory: `<div class="theory-block">
                <div class="theory-header">
                    <span class="theory-header-icon">🧮</span>
                    <span class="theory-header-title">Дробно-рациональные функции</span>
                </div>
                <div class="theory-content">
                    <p><strong>Разложение на простейшие дроби:</strong></p>
                    <div class="theory-formula">$$\\frac{P(x)}{(x-a)^k(x^2+px+q)^m} = \\frac{A_1}{x-a} + ... + \\frac{A_k}{(x-a)^k} + \\frac{M_1x+N_1}{x^2+px+q} + ...$$</div>
                    <div class="theory-example">
                        <div class="theory-example-title">📌 Пример</div>
                        <div class="theory-example-content">$$\\int \\frac{dx}{x(x+2)} = \\frac{1}{2}\\int\\left(\\frac{1}{x} - \\frac{1}{x+2}\\right)dx = \\frac{1}{2}\\ln\\left|\\frac{x}{x+2}\\right| + C$$</div>
                    </div>
                </div>
            </div>`
        },
        { 
            num: 8, 
            title: "Тригонометрические", 
            data: INTEGRALS_DATA.section8,
            theory: `<div class="theory-block">
                <div class="theory-header">
                    <span class="theory-header-icon">📐</span>
                    <span class="theory-header-title">Тригонометрические интегралы</span>
                </div>
                <div class="theory-content">
                    <p><strong>Формулы понижения степени:</strong></p>
                    <div class="theory-formula">$$\\sin^2 x = \\frac{1-\\cos 2x}{2},\\quad \\cos^2 x = \\frac{1+\\cos 2x}{2}$$</div>
                    <p><strong>Универсальная подстановка:</strong> $$t = \\tan\\frac{x}{2}$$</p>
                    <div class="theory-formula">$$\\sin x = \\frac{2t}{1+t^2},\\quad \\cos x = \\frac{1-t^2}{1+t^2},\\quad dx = \\frac{2dt}{1+t^2}$$</div>
                    <div class="theory-example">
                        <div class="theory-example-title">📌 Пример</div>
                        <div class="theory-example-content">$$\\int \\sin^3 x dx = \\int (1-\\cos^2 x)\\sin x dx = -\\int (1-u^2)du = -\\cos x + \\frac{1}{3}\\cos^3 x + C$$</div>
                    </div>
                </div>
            </div>`
        },
        { 
            num: 9, 
            title: "Тригонометрическая замена", 
            data: INTEGRALS_DATA.section9,
            theory: `<div class="theory-block">
                <div class="theory-header">
                    <span class="theory-header-icon">🔄</span>
                    <span class="theory-header-title">Тригонометрическая замена</span>
                </div>
                <div class="theory-content">
                    <p><strong>Таблица замен:</strong></p>
                    <ul>
                        <li>$$\\sqrt{a^2 - x^2} \\Rightarrow x = a\\sin t,\\quad dx = a\\cos t dt$$</li>
                        <li>$$\\sqrt{a^2 + x^2} \\Rightarrow x = a\\tan t,\\quad dx = \\frac{a}{\\cos^2 t} dt$$</li>
                        <li>$$\\sqrt{x^2 - a^2} \\Rightarrow x = \\frac{a}{\\cos t},\\quad dx = \\frac{a\\sin t}{\\cos^2 t} dt$$</li>
                    </ul>
                    <div class="theory-example">
                        <div class="theory-example-title">📌 Пример</div>
                        <div class="theory-example-content">$$\\int \\sqrt{a^2-x^2} dx = a^2\\int \\cos^2 t dt = \\frac{a^2}{2}(t + \\sin t\\cos t) + C$$</div>
                        <div class="theory-example-content">$$= \\frac{x}{2}\\sqrt{a^2-x^2} + \\frac{a^2}{2}\\arcsin\\frac{x}{a} + C$$</div>
                    </div>
                </div>
            </div>`
        }
    ];

    for (const section of sections) {
        if (!section.data || section.data.length === 0) continue;
        
        const solvedInSection = section.data.filter((_, idx) => integralsProgress[`s${section.num}_t${idx}`]).length;
        const sectionIsExpanded = integralsSectionsState[section.num] === true;
        
        // КАРТОЧКА РАЗДЕЛА (СВОРАЧИВАЕМАЯ)
        html += `<div class="theory-section" style="margin-bottom: 1.5rem;">
            <div class="integrals-section-header" style="padding: 0.8rem 1.2rem; display: flex; justify-content: space-between; align-items: center;" onclick="toggleIntegralsSection(${section.num})">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span class="section-toggle" id="toggle-section-${section.num}" style="color:var(--ink-blue); font-size:1.2rem;">${sectionIsExpanded ? '▼' : '▶'}</span>
                    <span style="color:var(--ink-blue); font-weight:600;">${section.num}. ${section.title}</span>
                    <span style="color:var(--pencil); font-size:0.8rem;">(${section.data.length} ${pluralTasks(section.data.length)})</span>
                </div>
                <div style="font-size:0.8rem; color:var(--pencil);">
                    ✅ <span id="section-${section.num}-counter">${solvedInSection}/${section.data.length}</span>
                </div>
            </div>
            <div class="section-content" id="section-${section.num}-content" style="display: ${sectionIsExpanded ? 'block' : 'none'};">
                <div style="margin: 0.5rem 1rem;">
                    ${section.theory}
                </div>
                <div class="section-tasks">`;
        
        for (let i = 0; i < section.data.length; i++) {
            const item = section.data[i];
            const key = `s${section.num}_t${i}`;
            const isChecked = integralsProgress[key] === true;
            
            html += `<div class="integral-card${isChecked ? ' completed' : ''}" style="margin: 0.5rem 1rem 0.5rem 1rem;">
                <div class="integral-header" style="display: flex; align-items: center; gap: 12px; padding: 0.8rem 1rem;">
                    <input type="checkbox" class="integral-checkbox" id="chk_${key}" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); toggleIntegralTask(${section.num}, ${i})" style="width: 18px; height: 18px; cursor: pointer; flex-shrink: 0;">
                    <span style="color: var(--pencil); font-size: 0.85rem; font-weight: 600; flex-shrink: 0;">${item.name.split(' ')[0]}</span>
                    <div style="flex: 1; text-align: center;" onclick="toggleIntegralSolution(this.parentElement.parentElement)">
                        <div class="integral-formula" style="font-size: 1.5rem;">$$ \\int ${item.integral} $$</div>
                    </div>
                </div>
                    <div class="integral-solution" style="display:none; padding: 0.8rem 1rem 1rem 3rem;">
                        <div class="integral-solution-text" style="margin-bottom:12px;">
                            <strong>📖 Решение:</strong><br>
                            ${item.solution}
                        </div>
                    <div class="integral-answer" style="margin-bottom:12px;">
                        <strong>Ответ:</strong> $$ \\int ${item.integral} = ${item.answer} $$
                    </div>
                    <div class="integral-practice">
                        <strong>✏️ Проверь себя:</strong> $$ \\int ${item.practice} = ? $$
                        <button class="check-btn" onclick="event.stopPropagation(); showIntegralAnswer(this, '${item.practiceAns}')">📋 Показать ответ</button>
                        <span class="practice-answer" style="display:none; margin-left:10px; color:var(--ink-green);">✅ Ответ: $${item.practiceAns}$</span>
                    </div>
                </div>
            </div>`;
        }
        
        html += `</div></div></div>`;
    }
    
    html = fixNeq(html);
    integralsHTMLCache = html;
    integralsRendered = true;

    container.innerHTML = html;
    updateIntegralsStats();
    restoreSolutionStates('integral');
    setTimeout(() => { loadIntegralsSectionState(); }, 100);
    // Рендерим KaTeX только для видимых секций
    const visibleIntSections = Array.from(container.querySelectorAll('.section-content')).filter(el => el.style.display !== 'none');
    typesetKaTeX(visibleIntSections, () => {
        integralsKaTeXDone = true;
    });
}

// ── Сброс кеша (вызывать при загрузке/сбросе прогресса) ──
function invalidateIntegralsCache() {
    integralsHTMLCache = null;
    integralsRendered = false;
    renderIntegrals();
}
window.invalidateIntegralsCache = invalidateIntegralsCache;

// ========== ТЕОРИЯ И МЕТОДЫ ВЫЧИСЛЕНИЯ ==========

// ========== СВОРАЧИВАНИЕ РАЗДЕЛОВ ИНТЕГРАЛОВ ==========
function toggleIntegralsSection(sectionNum) {
    const content = document.getElementById(`section-${sectionNum}-content`);
    const toggleBtn = document.getElementById(`toggle-section-${sectionNum}`);
    if (content && toggleBtn) {
        const isOpening = content.style.display === 'none';
        if (isOpening) {
            content.style.display = 'block';
            toggleBtn.innerHTML = '▼';
            // Ленивый рендер KaTeX для этой секции
            if (!content.dataset.katexRendered && typeof renderMathInElement !== 'undefined') {
                typesetKaTeX([content]);
                content.dataset.katexRendered = '1';
            }
        } else {
            content.style.display = 'none';
            toggleBtn.innerHTML = '▶';
        }
        saveIntegralsSectionState();
        syncIntegralsToggleBtn();
    }
}

function syncIntegralsToggleBtn() {
    const integralsPane = document.getElementById('integrals-list');
    if (!integralsPane) return;
    const anyExpanded = Array.from(integralsPane.querySelectorAll('.section-content')).some(c => c.style.display === 'block');
    const btnText = document.getElementById('integrals-toggle-all-btn');
    if (btnText) {
        btnText.innerHTML = anyExpanded ? '📁 Свернуть всё' : '📂 Развернуть всё';
    }
}

function toggleIntegralsAllSections() {
    const integralsPane = document.getElementById('integrals-list');
    if (!integralsPane) return;
    const allContents = integralsPane.querySelectorAll('.section-content');
    const allBtns = integralsPane.querySelectorAll('.section-toggle');
    const anyExpanded = Array.from(allContents).some(c => c.style.display === 'block');
    
    allContents.forEach(content => {
        content.style.display = anyExpanded ? 'none' : 'block';
    });
    allBtns.forEach(btn => {
        btn.innerHTML = anyExpanded ? '▶' : '▼';
    });
    
    if (anyExpanded) {
        integralsPane.querySelectorAll('.integral-solution').forEach(s => {
            s.style.display = 'none';
        });
    } else {
        // При разворачивании всех — ленивый рендер неотрендеренных секций
        allContents.forEach(content => {
            if (!content.dataset.katexRendered && typeof renderMathInElement !== 'undefined') {
                typesetKaTeX([content]);
                content.dataset.katexRendered = '1';
            }
        });
    }
    
    saveIntegralsSectionState();
    syncIntegralsToggleBtn();
}

// Глобальные функции для onclick
window.toggleIntegralSolution = toggleIntegralSolution;
window.showIntegralAnswer = showIntegralAnswer;

// Добавляем стили для интегралов в CSS (только специфические, остальное от notebook темы)
const integralStyles = ``;
// Функция для динамического обновления заголовка вкладки
function updateTabTitle() {
    // ЗАЩИТА: Если массив прогресса ещё не загрузился, прерываем функцию, чтобы избежать краша (null.filter)
    if (!state) return;

    // 1. УСТАНОВКА ИКОНКИ ШРЕКВИНА НА ВКЛАДКУ
    let favicon = document.querySelector("link[rel~='icon']");
    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
    }
        favicon.href = "assets/img/icon.png";

    // 2. ЛОГИКА ПОДСЧЕТА БИЛЕТОВ К ПОВТОРЕНИЮ
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    const toReview = state.filter(item => {
        const nextDate = item.nextReview ? new Date(item.nextReview) : null;
        return item.step > 0 && nextDate && nextDate <= now;
    });
    
    const reviewCount = toReview.length;
    
    // 3. ОБНОВЛЕНИЕ ЗАГОЛОВКА ВКЛАДКИ
    if (reviewCount === 0) {
        // Когда нечего повторять — строго marvin.io
        document.title = "marvin.io";
    } else {
        // Когда есть задачи к повтору — выводим номера билетов
        const nums = toReview.map(item => item.id + 1).join(', ');
        const label = reviewCount === 1 ? 'Билет к повтору' : 'Билеты к повтору';
        document.title = `${label}: ${nums} | marvin.io`;
    }
}
// Добавляем стили
const styleSheet = document.createElement("style");
styleSheet.textContent = integralStyles;
document.head.appendChild(styleSheet);
// Глобальные функции
window.advanceTicket = advanceTicket;
window.undoForTicket = undoForTicket;
window.undoLastAction = undoLastAction;
window.resetAll = resetAll;
window.saveProgressToFile = saveProgressToFile;
window.loadProgressFromFile = loadProgressFromFile;
window.showHistory = showHistory;
window.toggleSolution = toggleSolution;
window.toggleIntegralSolution = toggleIntegralSolution;
window.showIntegralAnswer = showIntegralAnswer;
window.toggleIntegralsSection = toggleIntegralsSection;
window.toggleIntegralsAllSections = toggleIntegralsAllSections;
window.resetAllIntegralsProgress = resetAllIntegralsProgress;
window.resetKrProgress = resetKrProgress