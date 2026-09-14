(() => {
    'use strict';

    const SEARCH_ID = 'sidebar-search';

    function iconSearch() {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.6-3.6"></path></svg>';
    }

    function ensureSidebarTools() {
        const inner = document.querySelector('.sidebar-content-inner');
        if (!inner || document.querySelector('.ux-sidebar-tools')) return;

        const tools = document.createElement('div');
        tools.className = 'ux-sidebar-tools';
        tools.innerHTML = `
            <div class="ux-sidebar-search">
                ${iconSearch()}
                <input id="${SEARCH_ID}" type="search" autocomplete="off" spellcheck="false"
                    placeholder="Найти билет или тему…" aria-label="Поиск по навигации">
                <button class="ux-search-clear" type="button" aria-label="Очистить поиск" title="Очистить">×</button>
            </div>
            <div class="ux-sidebar-hint">
                <span>Быстрый поиск по материалам</span>
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
            if (event.key === 'Escape') {
                event.preventDefault();
                input.value = '';
                apply();
                input.blur();
            }
        });

        clear.addEventListener('click', () => {
            input.value = '';
            apply();
            input.focus();
        });
    }

    function fallbackSidebarSearch(value) {
        const query = String(value || '').toLocaleLowerCase('ru-RU').replace(/ё/g, 'е').trim();
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        sidebar.querySelectorAll('.sidebar-item, .sidebar-lesson').forEach((item) => {
            const text = item.textContent.toLocaleLowerCase('ru-RU').replace(/ё/g, 'е');
            const visible = !query || text.includes(query);
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
        footer.innerHTML = 'Совет: нажми <span class="ux-kbd">/</span>, чтобы сразу искать тему. Прогресс сохраняется как и раньше.';
        inner.appendChild(footer);
    }

    function enhanceAccessibility() {
        document.querySelectorAll('.tab-btn').forEach((el) => {
            el.setAttribute('role', 'tab');
            el.setAttribute('tabindex', '0');
        });
        document.querySelectorAll('.sub-tab-btn, .sidebar-item, .sidebar-lesson, .sidebar-module-header').forEach((el) => {
            if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
            if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
        });

        document.addEventListener('keydown', (event) => {
            const target = event.target;
            if ((event.key === 'Enter' || event.key === ' ') && target instanceof HTMLElement && target.matches('.tab-btn, .sub-tab-btn, .sidebar-item, .sidebar-lesson, .sidebar-module-header')) {
                event.preventDefault();
                target.click();
            }
        });
    }

    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            const target = event.target;
            const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;

            if (event.key === '/' && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
                const input = document.getElementById(SEARCH_ID);
                if (!input) return;
                event.preventDefault();

                const sidebar = document.getElementById('sidebar');
                if (window.matchMedia('(max-width: 1080px)').matches && sidebar && !sidebar.classList.contains('mobile-open')) {
                    if (typeof window.toggleMobileSidebar === 'function') window.toggleMobileSidebar();
                }
                requestAnimationFrame(() => input.focus());
            }
        });
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
        document.documentElement.classList.add('ux-v2');
        ensureSidebarTools();
        ensureSidebarFooter();
        enhanceAccessibility();
        setupKeyboardShortcuts();
        setupScrollTop();
        watchDynamicSidebar();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();
