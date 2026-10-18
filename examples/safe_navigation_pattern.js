/**
 * 🛡️ [IDX: 00000-75330-00001] Пример Безопасной Навигации (Unbreakable Navigation Pattern)
 * Архитектурный Стандарт Индекса Утянского v2.6.5
 * 
 * Назначение:
 * 1. Принцип «DOM-First Switch» (Шаг 0): физическое переключение экрана ДО тяжелых вычислений.
 * 2. Изолированный защитный экран (Protective try/catch): изоляция рендеринга чартов от обработчиков клика.
 * 3. Сквозная эмиссия события 'screenChanged' для синхронизации кабелей.
 */

(function(root) {
  'use strict';

  function switchScreen(targetScreenId) {
    console.log(`🧭 [DOM-FIRST] Переключение на экран: ${targetScreenId}`);

    // ШАГ 0: Физическое переключение видимости в DOM
    try {
      const allScreens = document.querySelectorAll('.app-screen');
      allScreens.forEach(el => el.classList.add('hidden'));

      const targetEl = document.getElementById(targetScreenId);
      if (targetEl) {
        targetEl.classList.remove('hidden');
      }
    } catch (domErr) {
      console.error('❌ Критическая ошибка переключения DOM:', domErr);
      return;
    }

    // ШАГ 1: Эмиссия системного события смены экрана
    try {
      window.dispatchEvent(new CustomEvent('screenChanged', {
        detail: { screenId: targetScreenId, timestamp: Date.now() }
      }));
    } catch (eventErr) {
      console.warn('⚠️ Ошибка эмиссии события screenChanged:', eventErr);
    }

    // ШАГ 2: Тяжелые аналитические расчеты в изолированном защитном экране
    try {
      renderHeavyAnalytics(targetScreenId);
    } catch (calcErr) {
      // Исключение изолировано! Экран переключен, кнопки не зависли
      console.error('🛡️ [PROTECTIVE SHIELD] Ошибка аналитики перехвачена, интерфейс работает стабильно:', calcErr);
    }
  }

  function renderHeavyAnalytics(screenId) {
    // Симуляция отрисовки графиков / обработки телеметрии
    console.log(`📊 Отрисовка аналитики для ${screenId}...`);
  }

  root.UtyanskyNavigation = { switchScreen: switchScreen };
})(typeof window !== 'undefined' ? window : this);
