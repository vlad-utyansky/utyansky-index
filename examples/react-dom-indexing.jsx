import React, { useState } from 'react';

/**
 * [IDX: 71000] Utyansky Index React DOM Coordinate Component
 * Provides deterministic UI boundaries for AI coding assistants (Cursor, Claude, Windsurf).
 * Prevents regressions: AI modifies strictly targeted 5-digit nodes without breaking surrounding tree.
 */
export const UtyanskySearchWidget = ({ isRu = false, onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <div 
      data-idx="71000" 
      data-desc={isRu ? '[CONTAINER] Виджет координатного поиска' : '[CONTAINER] Coordinate search widget'}
      className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto shadow-xl"
    >
      <div 
        data-idx="71010" 
        data-desc={isRu ? '[HEADER] Заголовок поискового блока' : '[HEADER] Search block header'}
        className="text-lg font-bold text-white mb-4"
      >
        {isRu ? '🔍 Координатный поиск' : '🔍 Coordinate Search'}
      </div>

      <div 
        data-idx="71020" 
        data-desc={isRu ? '[FORM] Форма ввода запроса' : '[FORM] Search input form'}
        className="flex gap-2"
      >
        <input 
          data-idx="71021"
          data-desc={isRu ? '[INPUT] Поле ввода 5-значного индекса' : '[INPUT] 5-digit index input field'}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isRu ? 'Введите индекс (напр. 71080)...' : 'Enter index (e.g. 71080)...'}
          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
        />
        <button
          data-idx="71022"
          data-desc={isRu ? '[BUTTON] Кнопка запуска поиска O(1)' : '[BUTTON] Execute O(1) direct search'}
          onClick={() => onSearch && onSearch(query)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-mono text-sm font-semibold transition shadow-md"
        >
          {isRu ? 'Найти' : 'Search'}
        </button>
      </div>
    </div>
  );
};
