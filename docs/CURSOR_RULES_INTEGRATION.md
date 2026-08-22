# 🤖 AI Agent Integration Guide (Cursor, Windsurf, Claude Code, Antigravity)

> Standardized prompt rules to enforce the **Utyansky Index Architecture (v2.0)** across any AI-driven codebase.

---

## 📋 English Setup (Recommended)
Copy the following block into your `.cursorrules` or `AGENTS.md` file located at the root of your project:

```markdown
# UTYANSKY INDEX ARCHITECTURAL ENFORCEMENT (v2.0)

1. **Strict 5-Digit Tagging Rule:**
   - Every visual React/HTML interactive element MUST have `data-idx="7XXXX"` (e.g. `data-idx="71080"`).
   - Every indexed element MUST have a bilingual `data-desc={isRu ? '[TYPE] Описание...' : '[TYPE] Description...'}`.
   - `data-idx` MUST be a strict 5-digit integer (no string characters).

2. **DOM Isolation & Boundary Protection:**
   - When requested to modify a component with index X, modify ONLY lines within that specific container.
   - NEVER rewrite unrelated components, state bindings, or surrounding DOM trees.

3. **Multi-Agent Channel Segmentation:**
   - Core & Orchestration: `10000–19999`
   - Analytics, Scraping & OSINT: `20000–29999`
   - LLM Micro-Output Tagging: `21000–21999`
   - Media Production & Video NLE: `30000–39999`
   - Error Classification & Self-Healing: `40000–59999`
   - UI Layout & Visual DOM: `70000–79999`
   - Business Metrics & UVWI Scoring: `80000–89999`
   - Scalable Vector Memory: `98000–99999` (1B+ vectors)
```

---

## 🇷🇺 Русскоязычная версия для AGENTS.md

```markdown
# ПРАВИЛО СТАНДАРТА «ИНДЕКС УТЯНСКОГО» (v2.0)

1. Каждый визуальный элемент React DOM ОБЯЗАН содержать строгий 5-значный атрибут `data-idx="7XXXX"` и понятное описание `data-desc="..."`.
2. При правках кода ИИ меняет только строки внутри целевого индекса, не затрагивая соседние компоненты.
3. Запрещено смешивать диапазоны: Аналитика работает в `20000–29999`, Медиа — в `30000–39999`, UI — в `70000–79999`.
```
