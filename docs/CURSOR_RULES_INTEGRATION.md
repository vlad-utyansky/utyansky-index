# 🛡️ SYSTEM PROMPT: UTYANSKY INDEX ARCHITECTURAL STANDARD (v2.0)
# (Copy this entire file into your .cursorrules, AGENTS.md, or AI chat window)

## 📌 1. MANDATORY DIRECTIVES FOR AI CODING AGENTS:
1. **Component Naming & Identification:** When creating, explaining, or editing any UI element, AI MUST label it with its exact 5-digit index and type:
   - Example: `[IDX: 71080] [BTN] Launch Analysis Button`
   - Example: `[IDX: 72100] [FORM] Auth Form`
2. **React DOM Tagging:** Every interactive element MUST have `data-idx="7XXXX"` (strict 5-digit integer, no letters) and bilingual description `data-desc={isRu ? '[TYPE] Описание...' : '[TYPE] Description...'}`.
3. **Surgical Slot Isolation (Zero-Regression Guarantee):** When asked to modify a component with index X, AI modifies STRICTLY the lines within container X. Modifying surrounding components, routes, or global state is FORBIDDEN.
4. **Deterministic Error Code Matrix (40000–59999):** On any issue or failure, AI outputs standard $O(1)$ error codes:
   - `[ERR: 40101] INVALID_INDEX_FORMAT` — invalid coordinate format (requires strict 5 digits).
   - `[ERR: 40102] INDEX_COLLISION_DUPLICATE` — coordinate collision detected.
   - `[ERR: 40404] COORDINATE_NODE_NOT_FOUND` — coordinate node not found in registry.
   - `[ERR: 50010] LLM_STOCHASTIC_DEVIATION` — LLM drift from architectural constraints.

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
