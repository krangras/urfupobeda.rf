(() => {
    'use strict';

    const LISTS = '#list, #semester1-agidu-list, #probability-ticket-list';

    function plainText(html) {
        const template = document.createElement('template');
        template.innerHTML = html;
        template.content.querySelectorAll('script, style, button').forEach(el => el.remove());
        const blocks = new Set(['P', 'DIV', 'SECTION', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'TR', 'BLOCKQUOTE']);
        function read(node) {
            if (node.nodeType === Node.TEXT_NODE) return node.textContent;
            if (node.nodeName === 'BR') return '\n';
            if (node.nodeName === 'IMG') return node.getAttribute('alt') || '';
            const text = [...node.childNodes].map(read).join('');
            if (node.nodeName === 'LI') return `\n• ${text}\n`;
            if (node.nodeName === 'TD' || node.nodeName === 'TH') return `${text}\t`;
            return blocks.has(node.nodeName) ? `\n\n${text.trim()}\n\n` : text;
        }
        return read(template.content).replace(/[ \t]+\n/g, '\n').replace(/\n[ \t]+/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
    }

    async function sourceFor(card) {
        const index = Number(card.dataset.idx);
        if (card.closest('#list')) {
            await window.DataLoader.load('conspects');
            return CONSPECTS[index] || '';
        }
        if (card.closest('#semester1-agidu-list')) {
            await window.DataLoader.load('semester1');
            return SEMESTER1_DATA[index]?.content || '';
        }
        if (card.closest('#probability-ticket-list')) {
            await window.DataLoader.load('probability');
            return PROBABILITY_DATA.tickets.find(t => t.id === Number(card.dataset.itemId))?.content || '';
        }
        return '';
    }

    async function writeClipboard(text) {
        if (navigator.clipboard?.writeText) {
            try { await navigator.clipboard.writeText(text); return; } catch (_) {}
        }
        const focus = document.activeElement;
        const selection = window.getSelection();
        const ranges = Array.from({ length: selection?.rangeCount || 0 }, (_, i) => selection.getRangeAt(i).cloneRange());
        const input = document.createElement('textarea');
        input.value = text;
        input.setAttribute('readonly', '');
        input.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
        document.body.append(input);
        try {
            input.select();
            if (!document.execCommand('copy')) throw new Error('Copy failed');
        } finally {
            input.remove();
            focus?.focus({ preventScroll: true });
            if (selection) { selection.removeAllRanges(); ranges.forEach(range => selection.addRange(range)); }
        }
    }

    function attachButtons() {
        document.querySelectorAll(LISTS).forEach(list => {
            list.querySelectorAll(':scope > .ticket').forEach(card => {
                const actions = card.querySelector('.action-buttons');
                if (!actions || actions.querySelector('.copy-ticket-btn')) return;
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'action-btn copy-ticket-btn';
                button.textContent = '📋 Копировать';
                button.title = 'Скопировать текст билета вместе с формулами';
                button.setAttribute('aria-live', 'polite');
                if (list.id === 'probability-ticket-list' && typeof PROBABILITY_DATA !== 'undefined') {
                    button.disabled = !PROBABILITY_DATA.tickets.find(t => t.id === Number(card.dataset.itemId))?.content;
                    if (button.disabled) button.title = 'Текст билета пока не добавлен';
                }
                button.addEventListener('click', async event => {
                    event.stopPropagation();
                    button.disabled = true;
                    let available = true;
                    try {
                        const html = await sourceFor(card);
                        if (!html) {
                            available = false;
                            button.textContent = 'Нет текста';
                            button.title = 'Текст билета пока не добавлен';
                            return;
                        }
                        const body = plainText(html);
                        const title = card.querySelector('.ticket-title').textContent.trim();
                        const heading = /^Билет\s/.test(title) ? title : `Билет ${title}`;
                        await writeClipboard(/^Билет\s+\d+[.\s]/.test(body) ? body : `${heading}\n\n${body}`);
                        button.textContent = '✓ Скопировано';
                    } catch (error) {
                        console.error('Не удалось скопировать билет:', error);
                        button.textContent = 'Повторить копирование';
                    } finally {
                        if (available) {
                            button.disabled = false;
                            setTimeout(() => { button.textContent = '📋 Копировать'; }, 2200);
                        }
                    }
                });
                actions.append(button);
            });
        });
    }

    function init() {
        let queued = false;
        new MutationObserver(records => {
            if (queued) return;
            // Formula rendering and answer feedback do not create ticket action bars.
            const hasNewActions = records.some(record => [...record.addedNodes].some(node => node.nodeType === 1
                && (node.matches('.ticket, .action-buttons') || node.querySelector('.ticket, .action-buttons'))));
            if (!hasNewActions) return;
            queued = true;
            requestAnimationFrame(() => { queued = false; attachButtons(); });
        }).observe(document.querySelector('.main-content'), { childList: true, subtree: true });
        attachButtons();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();
