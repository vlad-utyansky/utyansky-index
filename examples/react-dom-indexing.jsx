import React, { useState } from 'react';

/**
 * [IDX: 71000] Пример защищенного UI-компонента по стандарту Индекса Утянского
 * ИИ меняет строго изолированные 5-значные узлы без поломки соседнего дерева.
 */
export const UtyanskySearchWidget = ({ isRu = true, onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <div 
      data-idx="71000" 
      data-desc={isRu ? '[CONTAINER] Виджет умного поиска' : '[CONTAINER] Smart search widget'}
      className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto"
    >
      <div 
        data-idx="71010" 
        data-desc={isRu ? '[HEADER] Заголовок поискового блока' : '[HEADER] Search header'}
        className="text-lg font-bold text-white mb-4"
      >
        {isRu ? '🔍 Поиск по координатам' : '🔍 Coordinate Search'}
      </div>

      <div 
        data-idx="71020" 
        data-desc={isRu ? '[FORM] Поле ввода поискового запроса' : '[FORM] Search input field'}
        className="flex gap-2"
      >
        <input 
          data-idx="71021"
          data-desc={isRu ? '[INPUT] Текстовое поле ввода индекса' : '[INPUT] Index input'}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isRu ? 'Введите 71080...' : 'Enter 71080...'}
          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm"
        />
        <button
          data-idx="71022"
          data-desc={isRu ? '[BUTTON] Кнопка запуска детерминированного поиска' : '[BUTTON] Trigger search'}
          onClick={() => onSearch && onSearch(query)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-mono text-sm font-semibold transition"
        >
          {isRu ? 'Найти' : 'Search'}
        </button>
      </div>
    </div>
  );
};
