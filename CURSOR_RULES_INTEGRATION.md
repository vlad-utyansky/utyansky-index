# 🛡️ SYSTEM PROMPT: UTYANSKY INDEX ARCHITECTURAL STANDARD (v2.0)
# (Copy this entire file into your .cursorrules, AGENTS.md, or AI chat window)

## 📌 1. MANDATORY DIRECTIVES FOR AI CODING AGENTS:
1. Every visual React DOM / HTML interactive element MUST have `data-idx="7XXXX"` (strict 5-digit integer, no string characters) and bilingual `data-desc={isRu ? '[TYPE] Описание...' : '[TYPE] Description...'}`.
2. When diagnosing errors or refactoring code, reference strictly by 5-digit coordinates.
3. NEVER modify or rewrite components outside the specified coordinate boundary (zero-regression guarantee).

## 🗺️ 2. UNIVERSAL 9-DOMAIN ARCHITECTURAL MAP (10000–99999):
- 10000–19999: Core, system routing, event bus & orchestrator
- 20000–29999: Analytics, search trends, OSINT & market data harvesting
- 21000–21999: LLM micro-output tagging & chunked prompts
- 30000–39999: Media studio, image generation, video players & timeline NLE
- 40000–59999: Fault tolerance, error classification matrix & O(1) self-healing
- 70000–79999: Visual React DOM grid (all UI components, buttons, forms, admin dashboards)
- 80000–89999: Business metrics, billing, pricing & UVWI viral wow calculation [IDX: 85010]
- 90000–97999: External integrations, webhooks, CRM & API bridges
- 98000–99999: Scalable isolated vector memory (1B+ vectors, PostgreSQL pgvector HNSW)

## 💻 3. GOLDEN STANDARD REACT DOM COMPONENT:
```jsx
import React from 'react';

export const ActionButton = ({ isRu = false, onClick }) => {
  return (
    <button
      data-idx="71080"
      data-desc={isRu ? '[BTN] Запуск анализа рынка' : '[BTN] Trigger market scan'}
      onClick={onClick}
      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-mono text-sm shadow-md transition"
    >
      {isRu ? 'Начать анализ' : 'Start Analysis'}
    </button>
  );
};
```
