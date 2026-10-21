# 📜 [IDX: 00000] VERSION CHANGELOG: UTYANSKY INDEX
## EVOLUTION CHRONOLOGY OF THE ARCHITECTURAL STANDARD (v1.0 – v2.6.8 / State Registration)

This document tracks all changes, releases, architectural specifications, and patent registration milestones for the **Utyansky Index** coordinate standard.

---

## 🏛️ [State Registration] — October 16, 2026 — 🇷🇺 Official Rospatent Certificate № 2026691737

### 🏆 Historic Milestone & National Recognition:
* **Federal Software Registration:** Official State Certificate **№ 2026691737** issued by the Federal Service for Intellectual Property (Rospatent RF) on October 14, 2026 (Application № 2026691407 filed August 22, 2026).
* **Author & Rightsholder:** Vladislav Anatolyevich Utyansky.
* **National Registry of Computer Programs:** Official entry under state protection.
* **Protected Scope:** Five-digit coordinate system (`10000–99999`), DOM coordinate maps, Zero-Trust locks, and session integrity hardware guards.
* **Official Certificate:** [docs/utyansky_index_certificate_2026691737.pdf](docs/utyansky_index_certificate_2026691737.pdf)
* **Registration Act Specification:** [docs/en/ROSPATENT_RF_REGISTRATION_CERTIFICATE_2026691737.md](docs/en/ROSPATENT_RF_REGISTRATION_CERTIFICATE_2026691737.md)

---

## 🏛️ [v2.6.8] — October 21, 2026 — 🚀 Release: UtyanskyDevKit Visual Manipulator & DOM Inspector

### 💡 Background & Purpose:
* Elimination of the 30-minute CSS ping-pong bottleneck where developers waste time describing minor layout visual edits to LLMs.

### 🚀 Key Additions:
1. **🚀 Floating Browser HUD Toolbar:** Lightweight, zero-dependency browser toolbar injected with a single `<script>`.
2. **🎯 1-Click `[IDX]` Element Capture:** Instantly copies ready-to-prompt coordinate coordinates to clipboard.
3. **📐 Laser Grid & Measurements `[PXL]`:** Real-time on-screen spacing and margin inspection.
4. **⌨️ VAU Cheat Code Activation:** Instant toggle by typing `vau` anywhere on the page.
* **Specification & Origin Story:** [RELEASE_v2_6_8_UTYANSKY_DEVKIT_VISUAL_MANIPULATOR.md](docs/en/RELEASE_v2_6_8_UTYANSKY_DEVKIT_VISUAL_MANIPULATOR.md)
* **Standalone Distribution:** [Download UtyanskyDevKit v2.6.8 (ZIP)](https://github.com/vlad-utyansky/utyansky-index/raw/main/utyansky_devkit_v2_6_8.zip)

---

## 🏛️ [v2.6.7] — October 15, 2026 — 🧹 Release: Zombie Purge & Strict Port Lock

### 💡 Engineering Background:
* Elimination of ghost development processes holding TCP ports 5173/3001 and preventing Vite from silently jumping to arbitrary ports.

### 🚀 Key Additions:
1. **🔒 Strict Port Lock (`strictPort: true`):** Vite and Next.js dev servers are locked to designated ports, preventing silent port jumps.
2. **🧹 Hardware Zombie Killer (`utyansky_zombie_killer.js`):** Automated utility forcefully killing orphan node/python processes and freeing network sockets.
3. **🔓 Windows NTFS Read-Only Reset:** Automated unfreezing of stuck file handles and spurious permissions locks.
* **Specification:** [RELEASE_v2_6_7_ZOMBIE_PURGE_AND_PORT_LOCK.md](docs/en/RELEASE_v2_6_7_ZOMBIE_PURGE_AND_PORT_LOCK.md)
* **Tooling:** [scripts/utyansky_zombie_killer.js](scripts/utyansky_zombie_killer.js)
* **Resilience Suite Distribution:** [Download Starter Kit v2.6.7 (ZIP)](https://github.com/vlad-utyansky/utyansky-index/raw/main/utyansky_starter_kit_v2_6_7.zip)

---

## 🏛️ [v2.6.6] — October 14, 2026 — ⚡ Release: Structural Integrity & Syntax Sentinel Law

### 💡 Engineering Background:
* Preventing LLM-generated code from breaking production builds due to subtle syntax errors (unclosed brackets, broken strings).

### 🚀 Key Additions:
1. **⚖️ Zero-Imbalance Law ($\Delta = 0$):** Hardware-level commit blocker aborting git commits if bracket parity (`{}`, `()`, `[]`) is disrupted.
2. **⚡ V8 AST Compilation Guard:** Staged JavaScript files are compiled via Node V8 engine before commit acceptance.
* **Specification:** [RELEASE_v2_6_6_SYNTAX_SENTINEL_STRUCTURAL_INTEGRITY.md](docs/en/RELEASE_v2_6_6_SYNTAX_SENTINEL_STRUCTURAL_INTEGRITY.md)
* **Tooling:** [scripts/utyansky_syntax_guard.js](scripts/utyansky_syntax_guard.js)

---

## 🏛️ [v2.6.5] — October 13, 2026 — 🧭 Release: Unbreakable Navigation & DOM-First Pulse

### 💡 Engineering Background:
* Eliminating UI freezes caused by heavy calculations executing synchronously inside navigation handlers.

### 🚀 Key Additions:
1. **🧭 DOM-First Transition:** Instant screen switching rendered in DOM at Step 0 prior to heavy data loading.
2. **🛡️ Isolated Try/Catch Shields:** Complex calculations and telemetry graphs wrapped in isolated sandboxes preventing button freezes.
3. **📡 Cross-Conduit Event Emission:** Synchronizing dependent components via clean custom DOM events.
* **Specification:** [RELEASE_v2_6_5_UNBREAKABLE_NAVIGATION_AND_DOM_PULSE.md](docs/en/RELEASE_v2_6_5_UNBREAKABLE_NAVIGATION_AND_DOM_PULSE.md)
* **Template:** [examples/safe_navigation_pattern.js](examples/safe_navigation_pattern.js)

---

## 🏛️ [v2.6.4] — October 12, 2026 — 🔌 Release: Armored Vital Data Cables & Silicon Baseline

### 💡 Engineering Background:
* Replacing ad-hoc global state with standardized, armored data conduits between decoupled architectural slots.

### 🚀 Key Additions:
1. **🔌 Armored Cable Standard:** Strict `*cable*.js` naming for all inter-slot communication pipelines.
2. **⏱️ Silicon Baseline:** Prohibition against synthetic timers; direct synchronization to hardware timestamps (`Date.now()`).
* **Specification:** [RELEASE_v2_6_4_ARMORED_CABLES_AND_SILICON_BASELINE.md](docs/en/RELEASE_v2_6_4_ARMORED_CABLES_AND_SILICON_BASELINE.md)
* **Template:** [examples/armored_cable_template.js](examples/armored_cable_template.js)

---

## 🏛️ [v2.6.3] — October 11, 2026 — 🛡️ Release: Collective Mirror Guard & Self-Protection Lock

### 💡 Engineering Background:
* Protecting guard scripts themselves against AI attempts to modify, weaken, or remove validation rules.

### 🚀 Key Additions:
1. **🛡️ Kernel Self-Protection:** Sentinel scripts verify their own SHA-256 hashes against `guard_manifest.json` before any commit.
2. **🪞 Collective Mirror Guard:** Automated synchronization checks across distributed repository replicas.
* **Specification:** [RELEASE_v2_6_3_COLLECTIVE_MIRROR_GUARD.md](docs/en/RELEASE_v2_6_3_COLLECTIVE_MIRROR_GUARD.md)
* **Distribution:** [Download Starter Kit v2.6.3 (ZIP)](https://github.com/vlad-utyansky/utyansky-index/raw/main/utyansky_starter_kit_v2_6_3.zip)

---

## 🏛️ [v2.6.2] — October 10, 2026 (19:30 MSK) — 🛡️ Release: Hardware Git Pre-Commit Guard & Session Integrity

### 💡 Engineering Background:
* Transitioning from prompt-based recommendations to OS-level hardware enforcement against code carpet-bombing.

### 🚀 Key Additions:
1. **🛡️ Hardware Pre-Commit Guard (`git_pre_commit_guard.py`):**
   * Physically aborts commits deleting >150 lines from a file at once.
   * Enforces total immunity for `data-lock="00000"` nodes and `00000_capsules/`.
2. **⚡ JavaScript Syntax Verification:** Automated compile checks on staged `.js` files via `node --check`.
3. **⏳ Session Quantization Law (80-Step Limit):** Context archiving recommendation every 60–80 turns to prevent attention drift.
* **Specification:** [RELEASE_v2_6_2_HARDWARE_PRE_COMMIT_AND_SESSION_INTEGRITY.md](docs/en/RELEASE_v2_6_2_HARDWARE_PRE_COMMIT_AND_SESSION_INTEGRITY.md)
* **Tooling:** [examples/git_pre_commit_guard.py](examples/git_pre_commit_guard.py)

---

## 🏛️ [v2.6.1] — October 08, 2026 (19:30 MSK) — 🔒 Release: Sensitive Information Protocol & Air-Gap Vault

### 💡 Engineering Philosophy:
* Protecting trade secrets, API keys, customer PII, and financial formulas from leaking into cloud LLM contexts.

### 🚀 Key Additions:
1. **🔒 4 Data Sensitivity Levels (L1–L4):** Categorizing codebase assets from public DOM nodes to air-gapped secrets.
2. **🔏 Air-Gapped Vault (`00_SENSITIVE_VAULT/`):** Physical directory isolated via `.gitignore`.
3. **📄 Public Templating:** Sanitized `.env.example` and `.vault.example.json` templates for open distribution.
* **Specification:** [RELEASE_v2_6_1_SENSITIVE_INFO_PROTOCOL.md](docs/en/RELEASE_v2_6_1_SENSITIVE_INFO_PROTOCOL.md)

---

## 🏛️ [v2.6.0] — October 08, 2026 (11:00 MSK) — 🚀 Release: Multi-Agent Starter Kit & Quality Telemetry

### 💡 Release Philosophy:
* Turnkey distribution of ready-to-use directory templates and automated reliability telemetry.

### 🚀 Key Additions & Rules:
1. **📦 Official Starter Kit (`utyansky-starter-kit-v2.6`):**
   * Complete architectural bundle [`utyansky_starter_kit_v2_6.zip`](https://github.com/vlad-utyansky/utyansky-index/raw/main/utyansky_starter_kit_v2_6.zip).
2. **🤖 4-Tier Multi-Agent Pipeline:**
   * Strict $O(1)$ routing: Router `[90100]` ➔ Planner `[70100]` ➔ Executor `[70200]` ➔ Validator `[90200]`.
3. **📊 Standardized Telemetry (`telemetry_benchmark.js`):**
   * Objective metrics: CRS $\ge 0.90$, RFR $\le 10\%$, CHI $\ge 90\%$.
* **Specification:** [RELEASE_v2_6_STARTER_KIT_AND_TELEMETRY.md](docs/en/RELEASE_v2_6_STARTER_KIT_AND_TELEMETRY.md)

---

## 🏛️ [v2.5.0] — October 07, 2026 (11:00 MSK) — 🔥 Release: Vibe Coding Iron Dome

### 💡 Engineering Background:
* Solving LLM attention degradation during extended vibe-coding sessions and eliminating unintended layout shifts.

### 🚀 Key Additions:
1. **📄 Utyansky's Law (Clean Context Limit — 4 A4 Pages):**
   * Physical cap on files and system prompts to ~350–400 lines (~3,000 tokens) ensuring peak speed and zero hallucinations.
2. **🛑 Zero-Trust Default Lock (`[IDX: 00000]` / `data-lock="00000"`):**
   * Presumption of complete immunity for finished code blocks.
3. **🚦 Traffic Light Principle & Encapsulation:**
   * Clear boundary between editable widgets (`10100_widget.jsx`) and immutable capsules (`00000_capsules/`).
4. **🤖 Architecture Sentinel (`guard_utyansky_slots.py`):**
   * Automated verification of line limits, lock integrity, and diff sanity.
* **Specification:** [UTYANSKY_INDEX_v2_5_VIBE_CODING_IRON_DOME_STANDARD.md](docs/en/UTYANSKY_INDEX_v2_5_VIBE_CODING_IRON_DOME_STANDARD.md)
* **Distribution:** [Download Starter Kit v2.5 (ZIP)](https://github.com/vlad-utyansky/utyansky-index/raw/main/utyansky_starter_kit_v2_5.zip)

---

## 🏛️ [v2.4.0] — October 05, 2026 (13:00 MSK) — 🛡️ Release: Strict Numeric Syntax & Tokenization Error Prevention

### 💡 Engineering Background:
* Fixing LLM tokenizer splitting bugs caused by arbitrary text suffixes placed inside index brackets.

### 🚀 Key Additions:
1. **🛑 Strict Numeric Standard in `[IDX]`:**
   * Only 5-digit numbers and hyphens permitted inside `[IDX: XXXXX]` or `data-idx="XXXXX"`. All arbitrary text forbidden.
2. **💬 Semantic Annotation in `data-desc`:**
   * Human-readable descriptions separated cleanly into `data-desc="..."` with bilingual toggles `isRu ? '...' : '...'`.
3. **🎯 100% Parser & Diff Stability:**
   * Deterministic AST parsing with zero tokenizer hallucination.
* **Specification:** [RELEASE_v2_4_ZERO_TEXT_SYNTAX.md](docs/en/RELEASE_v2_4_ZERO_TEXT_SYNTAX.md)

---

## 🏛️ [v2.3.0] — September 20, 2026 (11:00 MSK) — 🚀 Release: Telegram Bot Architecture & Zero-Ring Standard

### 💡 Engineering Background:
* Overcoming Telegram Bot API's 64-byte `callback_data` limit and enabling reliable multi-screen bots.

### 🚀 Key Additions:
1. **⚡ Telegram 64-Byte Bypass:**
   * Ultra-compact slot addresses (12–22 bytes) permanently eliminating `BUTTON_DATA_INVALID` crashes.
2. **🔬 "Microscope" Module (360° Client Dossier):**
   * Instant lookup of customer history, LTV, and integrated 1-click ticket center.
3. **🛡️ Zero-Ring Protection Class (`-00000` … `-00099`):**
   * Master Invariants, TTL quarantines, and Periodic Table expansion to 10 classes (`00`–`09`).
* **Specification:** [UTYANSKY_INDEX_TELEGRAM_VIBECODING_STANDARD.md](docs/en/UTYANSKY_INDEX_TELEGRAM_VIBECODING_STANDARD.md)

---

## 🏛️ [v2.2.0] — September 12, 2026 (21:55 MSK) — 🌐 Release: Web Site Coordinate Indexing & AI Vision

### 💡 Engineering Background:
* Eliminating AI search engine blindness (Perplexity, ChatGPT Search, Yandex Neuro) and preventing layout corruption during vibe-coding.

### 🚀 Key Additions:
1. **🌐 Continuous Web Coordinate Grid `70000–79999`:**
   * Every semantic DOM element tagged with a deterministic coordinate `data-idx="7XXXX"`.
2. **🔬 Interactive DOM HUD Inspector (`utyansky-web-inspector.js`):**
   * Real-time visual overlay revealing coordinate slots directly in the browser.
3. **🎯 0% Layout Regressions:**
   * AI agents target exact nodes without disrupting neighboring elements.
* **Specification:** [WEB_SITE_COORDINATE_INDEXING.md](docs/en/WEB_SITE_COORDINATE_INDEXING.md)
* **Live HTML Example:** [website-coordinate-markup.html](examples/website-coordinate-markup.html)

---

## 🏛️ [v2.1.0] — September 11, 2026 (11:20 MSK) — ⚙️ Release: Industrial AST Parsing & Architectural Framework

### 💡 Engineering Background:
* Automated codebase parsing via Abstract Syntax Trees (AST) replacing manual tagging.

### 🚀 Key Additions:
1. **🌲 Industrial AST Engine (`utyansky_ast_engine.js`):**
   * Babel-powered AST parser mapping JavaScript/JSX functions to 5-digit coordinates `10000–99999`.
2. **🗄️ Machine-Readable Registry `UTYANSKY_INDEX_REGISTRY.json`:**
   * Architectural map capturing dependency graphs and module boundaries.
3. **🛡️ Architectural Degradation Guards:**
   * Circular dependency detection and line cap enforcement at compile time.
* **Specification:** [RELEASE_v2_1_INDUSTRIAL_AST_EDITION.md](docs/en/RELEASE_v2_1_INDUSTRIAL_AST_EDITION.md)
* **AST Engine Source:** [src/utyansky_ast_engine.js](src/utyansky_ast_engine.js)

---

## 🏛️ [v2.0.0] — August 22, 2026 — 🏛️ Release: Foundation Master Standard & Rospatent Priority

### 💡 Historical State Registration:
* Official filing of Application № 2026603415 with the Federal Service for Intellectual Property (Rospatent RF).

### 🚀 Key Additions:
1. **🧱 10 Classes of the Periodic Table (`00000–99999`):**
   * Universal coordinate system from security kernel to UI DOM.
2. **⚖️ Reliability Triad:**
   * TypeScript typing + ESLint linting + Utyansky Index coordinate addressing.
3. **📑 Change Contracts & WAL Architecture:**
   * Declarative mutation permissions (`allowed_idx`, `protected_idx`).
* **Specification:** [SPECIFICATION_v2.md](docs/en/SPECIFICATION_v2.md)

---

## 🏛️ [v1.0.0] — March 22, 2026 (19:17 MSK) — 📦 Release: Initial Public Disclosure on GitHub

### 💡 Historical Inception:
* Initial public release establishing five-digit coordinate DOM addressing (`data-idx="7XXXX"`).
* Proving the thesis of zero-regression AI frontend development via coordinate passports.
* **Historical Archive:** [VERSION_1.0_MARCH_2026_ARCHIVE.md](docs/en/VERSION_1.0_MARCH_2026_ARCHIVE.md)
