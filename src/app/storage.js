// Shared storage and text boundaries. Loaded before authentication and app code.
function readStoredJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (raw === null) return fallback;
        const value = JSON.parse(raw);
        const valid = Array.isArray(fallback) ? Array.isArray(value)
            : fallback && typeof fallback === 'object' ? value && typeof value === 'object' && !Array.isArray(value)
            : true;
        if (!valid) throw new Error('Unexpected stored data type');
        return value;
    } catch (error) {
        try {
            const raw = localStorage.getItem(key);
            if (raw !== null && !localStorage.getItem('urfupobeda:recovery:' + key)) localStorage.setItem('urfupobeda:recovery:' + key, raw);
        } catch (_) {}
        console.warn('Не удалось прочитать сохранение:', key);
        return fallback;
    }
}

function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function parseFiniteNumber(value) {
    const text = String(value).trim().replace(/,/g, '.').replace(/−/g, '-');
    const number = '[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?';
    if (!new RegExp(`^${number}(?:\\s*/\\s*${number})?$`).test(text)) return NaN;
    const parts = text.split('/').map(part => Number(part.trim()));
    if (parts.some(part => !Number.isFinite(part)) || parts[1] === 0) return NaN;
    const result = parts.length === 2 ? parts[0] / parts[1] : parts[0];
    return Number.isFinite(result) ? result : NaN;
}

function examDateMessage(date, now = new Date()) {
    const day = value => Date.UTC(value.getFullYear(), value.getMonth(), value.getDate());
    const remaining = Math.round((day(date) - day(now)) / 86400000);
    const label = date.toLocaleDateString('ru-RU');
    return remaining > 0 ? `⏳ До экзамена (${label}): ${remaining} дн.`
        : remaining === 0 ? '🔥 Экзамен сегодня!' : `Экзамен прошёл ${label}`;
}

function advanceSpacedReview(entry, intervals, now = new Date()) {
    const today = new Date(now); today.setHours(0,0,0,0);
    if (entry.nextReview && new Date(entry.nextReview).getTime() > today.getTime()) return entry;
    const history = [...(entry.history || [])];
    if (!history.length || new Date(history.at(-1)).toDateString() !== today.toDateString()) history.push(today.getTime());
    const next = new Date(today); next.setDate(next.getDate() + intervals[Math.min(entry.step, intervals.length-1)]);
    return { ...entry, step: Math.min(entry.step+1, intervals.length), history, nextReview: next.getTime() };
}
function undoSpacedReview(entry, intervals, now = new Date()) {
    if (!entry.step) return entry;
    const history = (entry.history || []).slice(0,-1);
    const step = entry.step === intervals.length && history.length >= intervals.length ? intervals.length : entry.step-1;
    const next = new Date(history.at(-1) ?? now); next.setHours(0,0,0,0);
    if (step) next.setDate(next.getDate() + intervals[step-1]);
    return { ...entry, step, history, nextReview: step ? next.getTime() : null };
}
