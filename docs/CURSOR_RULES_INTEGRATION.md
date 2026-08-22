# 🤖 Интеграция Индекса Утянского с Cursor AI, Windsurf и Claude Code

Скопируйте данный блок в ваш файл `.cursorrules` или `AGENTS.md` в корне любого вашего проекта:

```markdown
# UTYANSKY INDEX ENFORCEMENT RULES (v2.0)

1. **Strict 5-Digit Tagging:**
   - Every visual React component MUST have `data-idx="7XXXX"` (e.g. `data-idx="71080"`).
   - Every element MUST have bilingual `data-desc={isRu ? '[TYPE] Описание...' : '[TYPE] Description...'}`.
   - Never use letters or text inside `data-idx`.

2. **Isolation & Boundary Protection:**
   - When asked to modify a component with index X, edit ONLY the lines inside that component.
   - NEVER rewrite unrelated components or surrounding DOM trees.

3. **Multi-Agent Channels:**
   - Analytics workers: `20000–29999`
   - Media workers: `30000–39999`
   - Core & Orchestration: `10000–19999`
   - UI Layout: `70000–79999`
   - Business & UVWI: `80000–89999`
```
