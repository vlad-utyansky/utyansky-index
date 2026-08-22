/**
 * [IDX: 85010] Калькулятор Индекса Вирусного Восторга (UVWI)
 * Автор формулы: Утянский Владислав Анатольевич
 */

function calculateUVWI(wowResponses, totalReach) {
  if (!totalReach || totalReach <= 0) return 0;
  // [IDX: 85010] = (Позитивные_отклики [21303] / Охват [92020]) * 100%
  const uvwi = (wowResponses / totalReach) * 100;
  return Number(uvwi.toFixed(2));
}

// Тестовый пример: 3 500 ВАУ-откликов при 10 000 просмотров
const testReach = 10000;
const testWow = 3500;
const result = calculateUVWI(testWow, testReach);

console.log(`UVWI Score: ${result}% (Viral Resonance)`);
module.exports = { calculateUVWI };
