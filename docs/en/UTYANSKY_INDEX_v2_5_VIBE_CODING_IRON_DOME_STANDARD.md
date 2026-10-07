# 🛡️ [IDX: 00000] PRACTICAL GUIDE: UTYANSKY INDEX v2.5
## SAFE VIBE-CODING STANDARD, «4 A4 PAGES» LIMIT, `00000` ZERO-TRUST SEALS & GUARDIAN LINTER

> **Author:** Vladislav Utyansky (AI Architect & Founder)  
> **Standard Version:** v2.5 (October 07, 2026)  
> **Repository:** [github.com/vlad-utyansky/utyansky-index](https://github.com/vlad-utyansky/utyansky-index)  
> **Validation Script:** `examples/guard_utyansky_slots.py`

---

## 📌 1. Why v2.5?

When developing software using LLM agents (Cursor, Claude Code, Windsurf, Gemini, GPT), developers face three critical bottlenecks:
1. **Context Attention Degradation (> 500 lines):** Models lose focus, forget earlier variables, and sever dependencies.
2. **Visual & Style Drift:** Fixing a single button causes adjacent CSS layouts to unintentionally shift pixels.
3. **Prompt Corruption:** Dialogue assistant system prompts get quietly overwritten during routine feature edits.

**Utyansky Index v2.5** resolves these issues at the physical architecture level.

---

## 📐 2. Four Core Developer Rules

### 📄 Rule 1. «4 A4 Pages» Limit (File & Prompt Ceiling)
* **Hard size limit:** Every code file and system prompt must stay strictly **under 4 A4 pages (~350–400 lines / ~3000 tokens)**.
* Files exceeding 400 lines must be split into standalone subcomponents under `components/`.

---

### 🛑 Rule 2. Zero-Trust Default Lock (`[IDX: 00000]`)
* All finalized blocks receive defensive container seals:
  ```html
  <!-- [IDX: 71390] [IDX: 00000] -->
  <div data-idx="71390" data-lock="00000" data-desc="Chart demonstration viewport">
      ...inner component markup...
  </div>
  ```
* Locks are placed strictly on **parent containers** (2–3 seals per file), eliminating visual noise.
* AI agents are forbidden from modifying `00000` blocks without explicit target instruction from the developer.

---

### 🔏 Rule 3. Fractal Coordinate File Naming Standard (`00000-XXXXX-XXXXX_slug.ext`)
* To prevent collisions across thousands of enterprise modules, files are addressed via deterministic **Fractal Coordinate Octets** with infinite scalability:
  $$\mathbf{00000} - \mathbf{XXXXX} - \mathbf{XXXXX} [- \mathbf{XXXXX}...] \mathbf{\_slug.ext}$$
  * `00000-70000-00001_analytics_agent.json` — Analytics AI system prompt capsule (`[IDX: 70000]`)
  * `00000-70200-00001_editor_copilot.json` — Editor Copilot system prompt capsule (`[IDX: 70200]`)
  * `00000-70400-00001_video_render_agent.json` — Render agent system prompt capsule (`[IDX: 70400]`)
  * `00000-71390-00002_analytics_charts.jsx` — Analytics chart viewport capsule (`[IDX: 71390]`)
  * `00000-30000-00010-00005-00001_payment_gateway.json` — Enterprise/Banking 5-level recursive coordinate
* **Dual Mechanism:**
  1. Coordinate Prefix (`00000-XXXXX-XXXXX`) gives LLMs an instantaneous $O(1)$ deterministic hash address and a zero-trust lock signal.
  2. Human Slug (`_slug.ext` after the underscore) provides clear visual semantics for human developers in IDE file explorers.
  3. Interface files import capsules in 1 line. During UI development, core files are never loaded into the model's active edit context.

---

### 🪆 Rule 4. Fractal Matryoshka for 5000+ Line Codebases
* Large modules split across thousandth-level coordinate subranges:
  * `[IDX: 90000] index.py` — Orchestrator (< 80 lines).
  * `[IDX: 91000] module_a.py` — Functional block (< 300 lines).
  * `[IDX: 92000] module_b.py` — Functional block (< 300 lines).

---

## 🤖 3. How to Run the Guardian Linter

```bash
python examples/guard_utyansky_slots.py
```

### Checks performed:
1. 🔢 **Clean Numeric Syntax:** Verifies strictly numeric coordinates `[IDX: XXXXX]`.
2. 📄 **4 A4 Pages Limit:** Audits line counts against the 450-line ceiling.
3. 🔒 **Collision Prevention $O(1)$:** Guarantees coordinate uniqueness.
4. 🛑 **Lock Integrity:** Validates `00000` seals across major containers.

---

## 📥 4. Files and Resources

* **Linter Script:** [examples/guard_utyansky_slots.py](https://github.com/vlad-utyansky/utyansky-index/blob/main/examples/guard_utyansky_slots.py)
* **Index Registry:** [examples/UTYANSKY_INDEX_REGISTRY.json](https://github.com/vlad-utyansky/utyansky-index/blob/main/examples/UTYANSKY_INDEX_REGISTRY.json)
* **AST Isolation Engine:** [src/utyansky_ast_engine.js](https://github.com/vlad-utyansky/utyansky-index/blob/main/src/utyansky_ast_engine.js)
