/**
 * 🔌 [IDX: 00000-75610-00001] Пример Бронированного Кабеля Данных (Armored Vital Data Cable)
 * Архитектурный Стандарт Индекса Утянского v2.6.4
 * 
 * Назначение:
 * 1. Физическая изоляция критического потока данных от шаблона UI.
 * 2. Аппаратный Кремниевый Базис (getFailSafeSnapshot) с неснижаемым порогом non-zero.
 * 3. Монополия кабеля: защита от ложного обнуления вторичными скриптами.
 */

(function(root) {
  'use strict';

  // 1. АППАРАТНЫЙ КРЕМНИЕВЫЙ БАЗИС (SILICON BASELINE)
  // Гарантирует непустые валидные структуры при первом открытии / чистом кэше / сбое сети
  function getFailSafeSnapshot() {
    return [
      { id: 101, title: 'Эталонный Модуль 1', status: 'online', load: 42, latencyMs: 14 },
      { id: 102, title: 'Эталонный Модуль 2', status: 'online', load: 18, latencyMs: 9 }
    ];
  }

  const STORAGE_KEY = 'utyansky_vital_cable_v264';
  let subscribers = [];

  const ArmoredCable = {
    // Получение текущего состояния с fallback на кремниевый базис
    getData: function() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return getFailSafeSnapshot();
        const parsed = JSON.parse(raw);
        return (Array.isArray(parsed) && parsed.length > 0) ? parsed : getFailSafeSnapshot();
      } catch (err) {
        console.warn('⚠️ Ошибка чтения кэша, откат на Кремниевый Базис:', err);
        return getFailSafeSnapshot();
      }
    },

    // Сохранение данных с гарантией целостности (Zero-Drop)
    setData: function(newData) {
      if (!Array.isArray(newData) || newData.length === 0) {
        console.warn('🛑 [CABLE MONOPOLY] Попытка записи пустого массива отклонена кабелем.');
        return;
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        this.notify(newData);
      } catch (err) {
        console.error('❌ Сбой записи в хранилище:', err);
      }
    },

    // Подписка UI компонентов на изменение данных
    subscribe: function(callback) {
      if (typeof callback === 'function') subscribers.push(callback);
    },

    // Оповещение подписчиков
    notify: function(data) {
      subscribers.forEach(cb => {
        try { cb(data); } catch (e) { console.error('Ошибка в подписчике кабеля:', e); }
      });
    }
  };

  root.UtyanskyArmoredCable = ArmoredCable;
})(typeof window !== 'undefined' ? window : this);
