# 🛡️ [IDX: 00000] PRACTICAL GUIDE: UTYANSKY INDEX v2.5
## SAFE VIBE-CODING STANDARD, «4 A4 PAGES» LIMIT, `00000` ZERO-TRUST SEALS & GUARDIAN LINTER

> **Author:** Vladislav Utyansky (AI Architect & Founder)  
> **Standard Version:** v2.5 (October 07, 2026)  
> **Repository:** [github.com/vlad-utyansky/utyansky-index](https://github.com/vlad-utyansky/utyansky-index)  
> **Validation Script:** `examples/guard_utyansky_slots.py`

---

## 📌 1. Evolution History & Engineering Philosophy of v2.5

> **«Transformer physics and attention entropy cannot be bypassed by wishful thinking»**
>
> From its initial inception, the Utyansky Index coordinate system delivered an immediate practical boost: coordinate addressing eradicated context chaos and random model drift.
>
> However, across **thousands of continuous test runs, production coding sessions, and autonomous agent executions** on real-world codebases, subtle edge cases emerged from the physical mathematical constraints of LLM attention mechanisms:
>
> 1. **Attention Dilution in Monolithic Files:** When a file exceeds 400–500 lines, transformer attention inevitably disperses, causing accidental mutations in neighboring functions.
> 2. **Collisions in Textual File Names:** In large-scale systems with hundreds of modules, plain text filenames caused LLM hallucinations and routing confusion — models require deterministic machine coordinates right inside filenames.
> 3. **Stable Code Drift:** Without explicit physical locks, models routinely attempt to "improve" already verified production logic during adjacent feature requests.
>
> **Version 2.5 is specifically engineered to resolve these empirically identified failure modes.**
>
> It establishes strict physical constraints: hard file ceilings (the 4 A4 Pages Rule), fractal coordinate naming `00000-XXXXX-XXXXX_slug.ext`, and automated Zero-Trust default locks `00000`.
>
> Architectural evolution is an active, ongoing effort. As systems scale further, additional nuances will be systematically analyzed and fortified.
>
> **We welcome and deeply appreciate developer community feedback and contributions in identifying further edge cases or hidden architectural friction points.**

---

## 📐 2. Four Core Developer Rules

### 📄 Rule 1. «4 A4 Pages» Limit (File & Prompt Ceiling)
* **Hard size limit:** Every code file and system prompt must stay strictly **under 4 A4 pages (~350–400 lines / ~3000 tokens)**.
* Files exceeding 400 lines must be split into standalone subcomponents under `components/`.

---

### 🛑 Rule 2. Dual-Lock System: Zero-Trust & Top Secret Anti-Leak Vault

1. **Level 1: Zero-Trust Lock `[IDX: 00000]` (`data-lock="00000"`):**
   * All finalized blocks receive defensive container seals `[IDX: 00000]`.
   * Locks are placed strictly on **parent containers** (2–3 seals per file), eliminating visual noise.
   * AI agents are forbidden from modifying `00000` blocks without explicit target instruction from the developer.

2. **Level 2: Top Secret Anti-Leak Vault `[IDX: 00000-00000]` («Black Box Vault»):**
   * **Proprietary intellectual property & anti-leak protection:** core business assets, AI coordination topologies, and trade secrets receive the permanent index `[IDX: 00000-00000]`.
   * **AI Behavior:** Models and autonomous agents are strictly forbidden from exporting, publishing to GitHub, moving into public folders, or quoting entities tagged with `[IDX: 00000-00000]`.

---

### 🔏 Rule 3. Traffic Light Principle & Fractal Coordinate Addressing

Under the Utyansky Index standard, files are strictly divided into **two distinct access tiers**:

#### 🟢 Tier 1. Routine Working Files (Open for Active Feature Work & UI)
* Prefixed with their **functional domain number (Classes 01–09)**.
* Format: `XXXXX_slug.ext` or `XXXXX-XXXXX_slug.ext`
* *Examples:*
  * `10100_header.jsx` — Header UI component (Class 01)
  * `20100_editor_canvas.jsx` — Editor canvas view (Class 02)
  * `30200_payment_form.py` — Payment processing handler (Class 03)
  * `90000_main_orchestrator.py` — System dispatcher (Class 09)
* **AI Agent Behavior:** The model recognizes a standard operational module and freely applies requested modifications.

#### 🛑 Tier 2. Critical Infrastructure Capsules (Zero-Trust Lock `00000-`)
* The `00000-` lock prefix is applied **EXCLUSIVELY** to critical architectural assets (AI system prompts, financial math cores, cryptographic algorithms, constitutional rulebooks).
* Format: `00000-XXXXX-XXXXX[-XXXXX...]_slug.ext`
* *Examples:*
  * `00000-70000-00001_analytics_prompt.json` — Analytics agent system prompt capsule (`[IDX: 70000]`)
  * `00000-20100-00001_editor_prompt.json` — Editor copilot system prompt capsule (`[IDX: 20100]`)
  * `00000-30000-00001_crypto_math_core.py` — Untouchable financial calculation engine (`[IDX: 30000]`)
  * `00000-30000-00010-00005-00001_payment_gateway.json` — 5-tier recursive enterprise coordinate
* **AI Agent Behavior:** The `00000-` prefix serves as an $O(1)$ physical stop signal. The model knows: "This is critical infrastructure. Direct modification is FORBIDDEN without explicit targeted developer command."

* **Architecture Outcome:** Interface files import capsules in 1 line. During routine UI coding, critical core capsules are never loaded into the model's active mutation context.

---

### 🪆 Rule 4. Fractal Matryoshka for 5000+ Line Codebases
* Large modules split across thousandth-level coordinate subranges:
  * `[IDX: 90000]` `00000-90000-00001_main.py` — Orchestrator (< 80 lines).
  * `[IDX: 91000]` `00000-91000-00001_module_a.py` — Functional block (< 300 lines).
  * `[IDX: 92000]` `00000-92000-00001_module_b.py` — Functional block (< 300 lines).
  * `[IDX: 91000]` `00000-91000-00000_rules.json` — Closed subsection rule capsule (never opened when editing neighbor modules).

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
