// [IDX: 75700] UtyanskyDevKit · Универсальная панель визуального манипулятора и инспектора
// Стандарт: Индекс Утянского (Заявка Роспатент РФ № 2026603415)
// Автор: Владислав Анатольевич Утянский (Февраль 2026 – Октябрь 2026)
// Языки: Двуязычный (RU / EN) с переключателем в доке
// Режимы:
//   1) IDX  — Захват индексов (Свечение #00ff88 + клик-копирование в буфер)
//   2) PXL  — Навигация по пикселям (Координаты X/Y + сетка 20x20)
//   3) MNTR — Ментор (Разъяснения архитектуры элементов)
//   4) ?    — F1 Интерактивная справка
//   5) RU/EN— Мгновенный тумблер языка
// Клавиши: 'U' (Утянский) / 'V' (Владислав) — скрыть/показать, чит-код 'VAU' / 'UVA', 'F1' — справка

(function() {
  'use strict';

  // Локализация (RU / EN)
  const I18N = {
    ru: {
      dockIdx: 'Захват индексов (Свечение #00ff88)',
      dockPxl: 'Пиксели и Сетка (Координаты X/Y)',
      dockMntr: 'Ментор (Архитектура блоков)',
      dockHelp: 'Справка по инструменту (F1)',
      dockClose: 'Свернуть (код VAU / ВАУ)',
      dockLang: 'Переключить язык (RU / EN)',
      noIdx: 'НЕТ ИНДЕКСА',
      uiElem: 'Элемент интерфейса',
      hoverMentor: 'Наведите на элемент с индексом Утянского...',
      copiedToast: '📋 Скопировано в буфер',
      vauUnlocked: '🏛️ Код Основателя VAU принят! UtyanskyDevKit активирован',
      helpTitle: 'UtyanskyDevKit · Инструкция',
      helpStandard: 'Архитектурный стандарт «Индекс Утянского v2.5» (Заявка Роспатент РФ № 2026603415)',
      helpIdxTitle: '1. Режим [IDX] — Захват индексов Утянского',
      helpIdxDesc: 'Подсвечивает элементы. Кликните левой кнопкой мыши по любому объекту — его точный индекс мгновенно скопируется в буфер обмена. Затем просто нажмите Ctrl+V или правую кнопку мыши в чате с ИИ для точечной правки.',
      helpPxlTitle: '2. Режим [PXL] — Пиксельная навигация и сетка',
      helpPxlDesc: 'Выводит сетку 20x20 и точные координаты курсора (X / Y). Без индексов — чистая ювелирная наводка на любую точку экрана. При клике копирует: 📍 [X: ... Y: ...] для точного пространственного перемещения.',
      helpMntrTitle: '3. Режим [MNTR] — Ментор архитектуры',
      helpMntrDesc: 'Показывает плавающее окно разъяснений функционала и роли компонента в системе.',
      helpKeysTitle: 'Фирменные горячие клавиши Основателя:',
      helpKey1: 'Активация: наберите <b>VAU</b> или <b>ВАУ</b> прямо на клавиатуре',
      helpKey2: '<b>F1</b> — Интерактивная справка и быстрый гид',
      helpKey3: 'Кнопка на пульте — временно свернуть панель',
      helpCloseBtn: 'Понятно, закрыть справку'
    },
    en: {
      dockIdx: 'Capture Indexes (Glow #00ff88)',
      dockPxl: 'Pixels & Grid (Coords X/Y)',
      dockMntr: 'Mentor (Component Insights)',
      dockHelp: 'Quick Reference Guide (F1)',
      dockClose: 'Collapse (type VAU code)',
      dockLang: 'Switch Language (RU / EN)',
      noIdx: 'NO INDEX',
      uiElem: 'UI Element',
      hoverMentor: 'Hover over an element with Utyansky Index...',
      copiedToast: '📋 Copied to clipboard',
      vauUnlocked: '🏛️ Founder Code VAU accepted! UtyanskyDevKit activated',
      helpTitle: 'UtyanskyDevKit · Guide',
      helpStandard: 'Utyansky Index Architecture Specification v2.5 (Rospatent App. No. 2026603415)',
      helpIdxTitle: '1. Mode [IDX] — Utyansky Index Capture',
      helpIdxDesc: 'Highlights elements. Left-click any object — its exact index is instantly copied to your clipboard. Then paste (Ctrl+V or right-click) into the AI chat for zero context loss.',
      helpPxlTitle: '2. Mode [PXL] — Pixel Navigation & Grid',
      helpPxlDesc: 'Displays a 20x20 grid and cursor coords (X / Y). Zero clutter, no distracting indexes — pure spatial laser targeting. On click, copies: 📍 [X: ... Y: ...] for pixel-perfect positioning.',
      helpMntrTitle: '3. Mode [MNTR] — Architecture Mentor',
      helpMntrDesc: 'Displays floating card detailing the component purpose and system wiring.',
      helpKeysTitle: 'Founder Signature Hotkeys:',
      helpKey1: 'Awaken: type <b>VAU</b> anywhere on keyboard',
      helpKey2: '<b>F1</b> — Interactive reference guide',
      helpKey3: 'Minimize button on dock — collapse the panel',
      helpCloseBtn: 'Got it, close guide'
    }
  };

  function getLang() {
    if (window._utyanskyDevLang) return window._utyanskyDevLang;
    if (typeof window.currentLang === 'string' && window.currentLang === 'en') return 'en';
    const stored = localStorage.getItem('vcodes_lang') || localStorage.getItem('vau_lang');
    if (stored === 'en') return 'en';
    return (document.documentElement.lang === 'en') ? 'en' : 'ru';
  }

  function isRu() {
    return getLang() === 'ru';
  }

  function t(key) {
    const lang = isRu() ? 'ru' : 'en';
    return (I18N[lang] && I18N[lang][key]) || (I18N['ru'][key] || key);
  }

  // Проверка прав доступа: локально, либо Основатель, либо ?dev=1, либо секретный код VAU
  function isDevAllowed() {
    if (window._utyanskyDevUnlocked) return true;
    try {
      const host = window.location.hostname;
      if (host === 'localhost' || host === '127.0.0.1' || host === '') return true;

      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('dev') === '1' || urlParams.get('devkit') === '1') return true;
    } catch(e) {}
    return false;
  }

  let activeMode = null; // 'idx', 'pixel', 'mntr'
  let rafId = null;

  // Создаем стили UtyanskyDevKit
  const styleEl = document.createElement('style');
  styleEl.id = 'utyansky-devkit-styles';
  document.head.appendChild(styleEl);

  function updateStyles() {
    let css = `
      .utyansky-devkit-host { font-family: system-ui, -apple-system, sans-serif; }
      .utyansky-devkit-host * { box-sizing: border-box; }
    `;

    if (activeMode === 'idx') {
      css += `
        [data-idx] {
          outline: 1px dashed rgba(0, 255, 136, 0.4) !important;
          outline-offset: 1px;
          transition: outline 0.15s ease;
          cursor: crosshair !important;
        }
      `;
    }

    css += `
      .utyansky-highlight-idx {
        outline: 2px solid #00ff88 !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 25px rgba(0,255,136,0.5) !important;
        background: rgba(0,255,136,0.08) !important;
        transition: background 0.15s ease, outline 0.15s ease;
        cursor: crosshair !important;
        z-index: 50;
      }
      .utyansky-highlight-mntr {
        outline: 2px solid #ffcc00 !important;
        outline-offset: 4px !important;
        box-shadow: 0 0 30px rgba(255,204,0,0.5) !important;
        background: rgba(255,204,0,0.08) !important;
        transition: all 0.2s ease;
        z-index: 50;
      }
    `;

    styleEl.innerHTML = css;
  }

  // Сетка Utyansky Grid (20x20)
  let gridEl = null;
  function renderGrid(show) {
    if (!show) {
      if (gridEl) { gridEl.remove(); gridEl = null; }
      return;
    }
    if (!gridEl) {
      gridEl = document.createElement('div');
      gridEl.className = 'fixed inset-0 pointer-events-none z-[99999] overflow-hidden opacity-30';
      const cols = Array.from({length: 20}, (_, i) => String.fromCharCode(65 + i));
      const rows = Array.from({length: 20}, (_, i) => i + 1);

      let inner = '<div class="absolute inset-0 flex">';
      cols.forEach(c => {
        inner += `<div class="flex-1 border-r border-emerald-500/30 relative"><span class="absolute top-1 left-1 text-[9px] font-mono text-emerald-400 font-bold">${c}</span></div>`;
      });
      inner += '</div><div class="absolute inset-0 flex flex-col">';
      rows.forEach(r => {
        inner += `<div class="flex-1 border-b border-emerald-500/30 relative"><span class="absolute top-0.5 right-1 text-[9px] font-mono text-emerald-400 font-bold">${r}</span></div>`;
      });
      inner += '</div>';
      gridEl.innerHTML = inner;
      document.body.appendChild(gridEl);
    }
  }

  // Плавающий тултип мыши
  let tooltipEl = null;
  function getTooltipEl() {
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.className = 'fixed z-[100001] pointer-events-none px-3 py-1.5 bg-black/95 border border-[#00ff88] rounded-xl text-white font-mono text-[11px] shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md transition-opacity duration-150';
      tooltipEl.style.left = '-999px';
      tooltipEl.style.top = '-999px';
      document.body.appendChild(tooltipEl);
    }
    return tooltipEl;
  }

  // Окно Ментора
  let mentorPanelEl = null;
  function updateMentorPanel(data) {
    if (activeMode !== 'mntr') {
      if (mentorPanelEl) { mentorPanelEl.remove(); mentorPanelEl = null; }
      return;
    }
    if (!mentorPanelEl) {
      mentorPanelEl = document.createElement('div');
      mentorPanelEl.className = 'fixed top-6 right-6 w-80 bg-black/95 border-2 border-[#ffcc00] rounded-2xl p-5 z-[99999] shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-white backdrop-blur-xl utyansky-devkit-host';
      document.body.appendChild(mentorPanelEl);
    }
    if (data && data.idx) {
      mentorPanelEl.innerHTML = `
        <div class="text-[11px] font-black text-[#ffcc00] mb-1 font-mono">🏛️ [IDX: ${data.idx}]</div>
        <div class="text-[13px] leading-relaxed text-slate-200">${data.desc || t('uiElem')}</div>
      `;
    } else {
      mentorPanelEl.innerHTML = `
        <div class="opacity-50 text-xs text-amber-200">${t('hoverMentor')}</div>
      `;
    }
  }

  // Окно Справки F1
  let helpModalEl = null;
  function toggleHelpModal(show) {
    if (helpModalEl) {
      helpModalEl.remove();
      helpModalEl = null;
      if (show === false) return;
    }
    if (show === false) return;

    helpModalEl = document.createElement('div');
    helpModalEl.className = 'utyansky-devkit-host fixed inset-0 z-[100005] bg-black/80 backdrop-blur-md flex items-center justify-center p-4';
    helpModalEl.innerHTML = `
      <div class="bg-slate-900 border-2 border-[#00ff88] max-w-lg w-full rounded-2xl p-6 text-white shadow-[0_25px_60px_rgba(0,255,136,0.3)] relative">
        <button id="closeHelpModalBtn" class="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold p-1">✕</button>
        <div class="flex items-center space-x-3 mb-4 border-b border-slate-800 pb-3">
          <div class="w-10 h-10 rounded-xl bg-[#00ff88] text-black font-black flex items-center justify-center text-lg font-mono">U</div>
          <div>
            <h3 class="font-bold text-base text-[#00ff88]">${t('helpTitle')}</h3>
            <p class="text-[11px] text-slate-400 font-mono">${t('helpStandard')}</p>
          </div>
        </div>

        <div class="space-y-3 text-xs leading-relaxed text-slate-300">
          <div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <b class="text-[#00ff88] font-mono">${t('helpIdxTitle')}</b>
            <p class="text-[11px] text-slate-400 mt-0.5">${t('helpIdxDesc')}</p>
          </div>

          <div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <b class="text-[#00ff88] font-mono">${t('helpPxlTitle')}</b>
            <p class="text-[11px] text-slate-400 mt-0.5">${t('helpPxlDesc')}</p>
          </div>

          <div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <b class="text-[#ffcc00] font-mono">${t('helpMntrTitle')}</b>
            <p class="text-[11px] text-slate-400 mt-0.5">${t('helpMntrDesc')}</p>
          </div>

          <div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <b class="text-indigo-400 font-mono">${t('helpKeysTitle')}</b>
            <ul class="list-disc list-inside text-[11px] text-slate-300 mt-1 space-y-1">
              <li>${t('helpKey1')}</li>
              <li>${t('helpKey2')}</li>
              <li>${t('helpKey3')}</li>
            </ul>
          </div>
        </div>

        <button id="okHelpModalBtn" class="w-full mt-5 py-2.5 rounded-xl bg-[#00ff88] text-black font-bold text-xs hover:bg-[#00e67a] transition shadow-md">
          ${t('helpCloseBtn')}
        </button>
      </div>
    `;

    document.body.appendChild(helpModalEl);
    helpModalEl.querySelector('#closeHelpModalBtn').onclick = () => toggleHelpModal(false);
    helpModalEl.querySelector('#okHelpModalBtn').onclick = () => toggleHelpModal(false);
  }

  // Нижний док кнопок UtyanskyDevKit
  let dockEl = null;
  function renderDock() {
    if (!isDevAllowed()) return;
    if (dockEl) return;

    dockEl = document.createElement('div');
    dockEl.className = 'utyansky-devkit-host fixed bottom-6 right-6 z-[100000] flex gap-2 p-2 rounded-2xl bg-black/90 backdrop-blur-xl border border-[#00ff88]/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)] items-center';
    dockEl.setAttribute('data-idx', '70011');
    dockEl.setAttribute('data-desc', 'Панель разработчика UtyanskyDevKit');

    updateDockMarkup();
    document.body.appendChild(dockEl);
  }

  function updateDockMarkup() {
    if (!dockEl) return;
    dockEl.innerHTML = `
      <button id="devBtn-idx" title="${t('dockIdx')}" class="w-10 h-10 flex items-center justify-center rounded-xl transition-all border text-xs font-mono font-bold bg-white/5 text-[#00ff88] border-transparent hover:bg-[#00ff88]/20">
        IDX
      </button>

      <button id="devBtn-pixel" title="${t('dockPxl')}" class="w-10 h-10 flex items-center justify-center rounded-xl transition-all border text-xs font-mono font-bold bg-white/5 text-[#00ff88] border-transparent hover:bg-[#00ff88]/20">
        PXL
      </button>

      <button id="devBtn-mntr" title="${t('dockMntr')}" class="w-10 h-10 flex items-center justify-center rounded-xl transition-all border text-xs font-mono font-bold bg-white/5 text-[#ffcc00] border-transparent hover:bg-[#ffcc00]/20">
        MNTR
      </button>

      <button id="devBtn-help" title="${t('dockHelp')}" class="w-10 h-10 flex items-center justify-center rounded-xl transition-all border text-xs font-mono font-bold bg-white/5 text-cyan-400 border-transparent hover:bg-cyan-500/20">
        ?
      </button>

      <!-- Переключатель языка RU / EN -->
      <button id="devBtn-lang" title="${t('dockLang')}" class="h-10 px-2.5 flex items-center justify-center rounded-xl transition-all border text-[11px] font-mono font-black bg-white/5 text-emerald-300 border-transparent hover:bg-emerald-500/20">
        ${isRu() ? 'RU' : 'EN'}
      </button>

      <button id="devBtn-close" title="${t('dockClose')}" class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 text-xs font-bold">
        ✕
      </button>
    `;

    dockEl.querySelector('#devBtn-idx').onclick = () => toggleMode('idx');
    dockEl.querySelector('#devBtn-pixel').onclick = () => toggleMode('pixel');
    dockEl.querySelector('#devBtn-mntr').onclick = () => toggleMode('mntr');
    dockEl.querySelector('#devBtn-help').onclick = () => toggleHelpModal(true);
    dockEl.querySelector('#devBtn-close').onclick = () => toggleDevPanel(false);
    dockEl.querySelector('#devBtn-lang').onclick = () => {
      window._utyanskyDevLang = isRu() ? 'en' : 'ru';
      updateDockMarkup();
      updateDockState();
      if (helpModalEl) toggleHelpModal(true);
      showDevKitToast(isRu() ? '🇷🇺 Язык: Русский' : '🇬🇧 Language: English');
      try {
        window.dispatchEvent(new CustomEvent('utyansky-lang-changed', { detail: { lang: window._utyanskyDevLang } }));
      } catch(e) {}
    };

    updateDockState();
  }

  function toggleMode(mode) {
    if (activeMode === mode) {
      activeMode = null;
    } else {
      activeMode = mode;
    }
    updateDockState();
    updateStyles();
    renderGrid(activeMode === 'pixel');
    updateMentorPanel(null);
    clearHighlights();

    const tt = getTooltipEl();
    if (!activeMode) {
      tt.style.left = '-999px';
      tt.style.top = '-999px';
    }
  }

  function updateDockState() {
    if (!dockEl) return;
    const btnIdx = dockEl.querySelector('#devBtn-idx');
    const btnPxl = dockEl.querySelector('#devBtn-pixel');
    const btnMntr = dockEl.querySelector('#devBtn-mntr');

    const setActive = (el, active, activeBg, activeText, activeShadow) => {
      if (!el) return;
      if (active) {
        el.className = `w-10 h-10 flex items-center justify-center rounded-xl transition-all border text-xs font-mono font-bold ${activeBg} ${activeText} border-white ${activeShadow}`;
      } else {
        el.className = `w-10 h-10 flex items-center justify-center rounded-xl transition-all border text-xs font-mono font-bold bg-white/5 text-slate-300 border-transparent hover:bg-white/10`;
      }
    };

    setActive(btnIdx, activeMode === 'idx', 'bg-[#00ff88]', 'text-black', 'shadow-[0_0_15px_#00ff88]');
    setActive(btnPxl, activeMode === 'pixel', 'bg-[#00ff88]', 'text-black', 'shadow-[0_0_15px_#00ff88]');
    setActive(btnMntr, activeMode === 'mntr', 'bg-[#ffcc00]', 'text-black', 'shadow-[0_0_15px_#ffcc00]');
  }

  function clearHighlights() {
    document.querySelectorAll('.utyansky-highlight-idx, .utyansky-highlight-mntr').forEach(el => {
      el.classList.remove('utyansky-highlight-idx', 'utyansky-highlight-mntr');
    });
  }

  // Обработчик движения мыши
  document.addEventListener('mousemove', (e) => {
    if (!activeMode) return;

    const tt = getTooltipEl();
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      tt.style.left = `${e.clientX + 15}px`;
      tt.style.top = `${e.clientY + 15}px`;

      // РЕЖИМ 1: ПИКСЕЛИ (PXL) — Чистая пространственная наводка без привязки к индексам
      if (activeMode === 'pixel') {
        clearHighlights();
        tt.innerHTML = `<span style="color:#00ff88;font-weight:900;font-size:12px;">📍 X: ${e.clientX} | Y: ${e.clientY}</span>`;
        return;
      }

      // РЕЖИМ 2 и 3: ИНДЕКСЫ (IDX) и МЕНТОР (MNTR)
      let el = e.target.closest('[data-idx]') || e.target;

      if (el && !el.closest('.utyansky-devkit-host')) {
        const idx = el.getAttribute('data-idx');
        const desc = el.getAttribute('data-desc') || '';

        if (activeMode === 'idx') {
          tt.innerHTML = `<span style="color:#00ff88;font-weight:900;">[IDX: ${idx || t('noIdx')}]</span><br><span style="font-size:10px;color:#94a3b8;">${desc}</span>`;
          clearHighlights();
          el.classList.add('utyansky-highlight-idx');
        } else if (activeMode === 'mntr') {
          tt.style.left = '-999px';
          clearHighlights();
          el.classList.add('utyansky-highlight-mntr');
          updateMentorPanel({ idx, desc, element: el });
        }
      } else {
        clearHighlights();
        if (activeMode === 'idx') {
          tt.style.left = '-999px';
        }
      }
    });
  }, { passive: true });

  // Предотвращение случайного клика или mousedown при инспекции
  document.addEventListener('mousedown', (e) => {
    if (!activeMode || activeMode === 'mntr') return;
    if (e.target.closest('.utyansky-devkit-host')) return;
    e.preventDefault();
    e.stopPropagation();
  }, true);

  // Клик для копирования индекса или координат (жесткий перехват capture)
  document.addEventListener('click', (e) => {
    if (!activeMode || activeMode === 'mntr') return;
    if (e.target.closest('.utyansky-devkit-host')) return;

    // ЖЕЛЕЗНЫЙ ПЕРЕХВАТ: предотвращаем переход по ссылкам и срабатывание onclick!
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    let textToCopy = '';
    if (activeMode === 'pixel') {
      textToCopy = `📍 [X: ${e.clientX} Y: ${e.clientY}]`;
    } else if (activeMode === 'idx') {
      let el = e.target.closest('[data-idx]') || e.target;
      const idx = el?.getAttribute('data-idx');
      textToCopy = idx ? `[IDX: ${idx}]` : `[DOM ELEMENT - NO IDX]`;
    }

    if (textToCopy) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).catch(() => {
          fallbackCopyText(textToCopy);
        });
      } else {
        fallbackCopyText(textToCopy);
      }

      showDevKitToast(`${t('copiedToast')}: ${textToCopy}`);
    }
  }, true);

  // Резервное копирование через textarea
  function fallbackCopyText(text) {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    } catch(err) {}
  }

  // Всплывающее неоновое уведомление DevKit
  let toastEl = null;
  function showDevKitToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-[100010] px-5 py-2.5 bg-emerald-500 text-black font-black text-xs rounded-xl shadow-[0_10px_35px_rgba(0,255,136,0.6)] transition-all duration-300 font-mono pointer-events-none border-2 border-white flex items-center gap-2';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.style.opacity = '1';
    toastEl.style.transform = 'translate(-50%, 0)';
    setTimeout(() => {
      if (toastEl) {
        toastEl.style.opacity = '0';
        toastEl.style.transform = 'translate(-50%, -10px)';
      }
    }, 2500);
  }

  // Публичные методы управления
  window.setUtyanskyDevLang = function(lang) {
    if (lang === 'ru' || lang === 'en') {
      window._utyanskyDevLang = lang;
      if (dockEl) {
        updateDockMarkup();
        updateDockState();
      }
      if (helpModalEl) toggleHelpModal(true);
    }
  };

  window.toggleUtyanskyDevKit = function(modeToSet) {
    if (!isDevAllowed()) return;
    renderDock();
    if (dockEl) dockEl.classList.toggle('hidden');
    if (modeToSet) toggleMode(modeToSet);
  };

  function toggleDevPanel(visible) {
    if (!isDevAllowed()) return;
    renderDock();
    if (dockEl) {
      if (visible === false) {
        dockEl.classList.add('hidden');
        toggleMode(null);
      } else if (visible === true) {
        dockEl.classList.remove('hidden');
        if (!activeMode) toggleMode('idx');
      } else {
        dockEl.classList.toggle('hidden');
        if (!dockEl.classList.contains('hidden') && !activeMode) {
          toggleMode('idx');
        } else if (dockEl.classList.contains('hidden')) {
          toggleMode(null);
        }
      }
    }
  }

  // Буфер последовательности для чит-кодов: 'VAU' / 'ВАУ' / 'UVA' / 'УВА'
  let keySequence = '';
  let sequenceTimer = null;

  // Горячие клавиши: 'U' / 'V' (Утянский / Владислав / VAU) — переключатель панели, 'F1' — справка
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F1') {
      e.preventDefault();
      toggleHelpModal(true);
      return;
    }
    const isInput = ['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable || (e.target.closest && e.target.closest('input, textarea, [contenteditable="true"]'));
    if (isInput) return;

    // Секретный ввод: VAU / ВАУ / UVA / УВА
    const ch = (e.key || '').toLowerCase();
    if (ch.length === 1) {
      keySequence += ch;
      if (keySequence.length > 8) keySequence = keySequence.slice(-8);
      clearTimeout(sequenceTimer);
      sequenceTimer = setTimeout(() => { keySequence = ''; }, 2000);

      if (keySequence.endsWith('vau') || keySequence.endsWith('вау') || keySequence.endsWith('мфг')) {
        e.preventDefault();
        keySequence = '';
        window._utyanskyDevUnlocked = true;
        toggleDevPanel(true);
        showDevKitToast(t('vauUnlocked'));
        return;
      }
    }

    // Пробуждение строго по набору секретного слова VAU / ВАУ
  });

  // Автоинициализация при загрузке
  window.addEventListener('DOMContentLoaded', () => {
    if (isDevAllowed()) {
      renderDock();
    }
  });
})();
