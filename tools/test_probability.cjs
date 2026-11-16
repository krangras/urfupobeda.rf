// Run with: node tools/test_probability.cjs
// Uses only Node.js built-ins; no app build or dependency installation needed.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const storage = new Map();
const context = vm.createContext({
    localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
    window: { addEventListener() {} },
    document: {},
    console,
    setInterval() {}
});
vm.runInContext(read('src/data/probability_data.js') + '\nthis.course = PROBABILITY_DATA;', context);
const data = context.course;
assert.deepEqual(Object.keys(data), ['tickets']);
assert.equal(data.tickets.length, 18);

const first = data.tickets[0];
const normalizeText = text => text.replace(/\s+/g, ' ').trim();
assert.equal(
    normalizeText(`Билет ${first.id}. ${first.title} ${first.content.replace(/<\/?strong>/g, '').replace(/<[^>]+>/g, ' ')}`),
    normalizeText(read('tools/fixtures/probability_ticket1.txt')),
    'Ticket 1 must preserve the complete supplied text, including formulas and original wording'
);
assert.equal(new Set(data.tickets.map(t => t.id)).size, 18);
assert.equal(data.tickets.filter(t => t.content).length, 3);
assert.ok(data.tickets.every(t => t.title && t.status));
// The public persistence API must reject malformed imported state and preserve valid state.
// Instrument pure review functions in this VM only; no test API is added to the app.
vm.runInContext(read('src/app/probability.js').replace('window.ProbabilityCourse = {', 'window.reviewTest = { advanceReview, undoReview, due }; window.ProbabilityCourse = {'), context);
const api = context.window.ProbabilityCourse;
const review = context.window.reviewTest;
const localDay = (month, day, hour = 0) => new Date(2030, month - 1, day, hour);
const calendar = value => { const date = new Date(value); return [date.getFullYear(), date.getMonth() + 1, date.getDate()]; };
let entry = { step: 0, nextReview: null, history: [] };
const previous = [];
for (const [onMonth, onDay, nextMonth, nextDay, step] of [
    [1, 1, 1, 2, 1], [1, 2, 1, 5, 2], [1, 5, 1, 12, 3],
    [1, 12, 1, 26, 4], [1, 26, 2, 25, 5], [2, 25, 3, 27, 5]
]) {
    previous.push(entry);
    assert.equal(review.due(entry, localDay(onMonth, onDay)), true);
    entry = review.advanceReview(entry, localDay(onMonth, onDay, 23));
    assert.equal(entry.step, step);
    assert.deepEqual(calendar(entry.nextReview), [2030, nextMonth, nextDay]);
    assert.equal(new Date(entry.nextReview).getHours(), 0, 'Reviews start at local midnight');
    assert.equal(review.due(entry, localDay(onMonth, onDay, 23)), false, 'No early repeat');
    assert.equal(review.advanceReview(entry, localDay(onMonth, onDay, 23)), entry, 'No second step on the same day');
}
assert.equal(entry.history.length, 6, 'Monthly reviews must continue after mastery');
assert.deepEqual(JSON.parse(JSON.stringify(review.undoReview(entry))), JSON.parse(JSON.stringify(previous.at(-1))), 'Undo monthly review preserves mastery');
assert.deepEqual(JSON.parse(JSON.stringify(review.undoReview(previous[1]))), { step: 0, nextReview: null, history: [] });
assert.equal(review.undoReview({ step: 3, nextReview: null, history: [] }).step, 2, 'Incomplete old history must not erase all steps');
api.importProgress({
    tickets: { 1: { step: 99, nextReview: 'bad date', history: ['bad date', '2026-11-11T08:00:00Z'] }, 17: { step: 1 }, 2: null },
    tasks: { 1: true, 2: '<script>', 33: true }
});
let saved = JSON.parse(JSON.stringify(api.exportProgress()));
assert.equal(saved.tickets['1'].step, 5);
assert.deepEqual(saved.tickets['1'].history, ['2026-11-11T08:00:00Z']);
assert.deepEqual(calendar(saved.tickets['1'].nextReview), [2026, 12, 11], 'Resume monthly reviews for previously mastered tickets');
assert.equal('tasks' in saved, false);
assert.equal(Object.keys(saved.tickets).length, 1);
assert.ok(saved.legacyTickets['17']);
api.importProgress({ version: 2, tickets: { 18: { step: 1, nextReview: null, history: [] } }, tasks: {}, legacyTickets: { 2: { step: 3 } } });
saved = JSON.parse(JSON.stringify(api.exportProgress()));
assert.equal(saved.tickets['18'].step, 1);
assert.equal(saved.legacyTickets['2'].step, 3);
api.importProgress(null);
assert.deepEqual(JSON.parse(JSON.stringify(api.exportProgress())), { version: 2, tickets: {}, legacyTickets: {} });
storage.set('probability_progress_v1', '{invalid');
assert.deepEqual(JSON.parse(JSON.stringify(api.exportProgress())), { version: 2, tickets: {}, legacyTickets: {} });
const index = read('index.html');
for (const asset of ['src/app/probability.js', 'assets/css/probability.css']) {
    assert.ok(index.includes(asset), `Missing entry point: ${asset}`);
    assert.ok(read('sw.js').includes(asset), `Missing offline shell entry: ${asset}`);
}
assert.ok(read('src/auth/firebase-sync.js').includes('probability_progress_v1'));
assert.ok(read('src/app/backups.js').includes('ProbabilityCourse.normalizeProgress(data.probability)'));
console.log('PASS: verbatim ticket 1, 1/3/7/14/30-day review cycle, monthly maintenance, undo, progress migration, ticket-only data and integration.');
