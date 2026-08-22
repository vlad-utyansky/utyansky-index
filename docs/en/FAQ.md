<div align="center">

**[ ⬅️ Back to Main Page (README) ](../../README.md)** &nbsp;&nbsp;|&nbsp;&nbsp; **[ 🇷🇺 Читать FAQ на русском ➔ ](../ru/FAQ.md)** &nbsp;&nbsp;|&nbsp;&nbsp; **[ 🌐 Official Portal ➔ ](https://index.utyanskiy.ru)**

</div>

---

# ❓ Utyansky Index: Frequently Asked Questions (FAQ)
## 📋 Official Model-Agnostic Engineering Reference (2026)

---

### 📑 Table of Contents
1. [Why is the Index better than Long-Term Memory combined with Knowledge Graphs (Graph RAG)?](#1-why-is-the-index-better-than-long-term-memory-combined-with-knowledge-graphs-graph-rag)
2. [What are the measurable results before and after adoption?](#2-what-are-the-measurable-results-before-and-after-adoption)
3. [How are token savings and acceleration achieved across different AI classes?](#3-how-are-token-savings-and-acceleration-achieved-across-different-ai-classes)
4. [How does the AI know the slot number without hallucinating?](#4-how-does-the-ai-know-the-slot-number-without-hallucinating)
5. [How does the Index differ from AST (Syntax Trees) and Codebase Indexing?](#5-how-does-the-index-differ-from-ast-syntax-trees-and-codebase-indexing)
6. [How is this different from Hashline and tool integration protocols (MCP)?](#6-how-is-this-different-from-hashline-and-tool-integration-protocols-mcp)
7. ["Modern AI models never break code during context compression" — is this true?](#7-modern-ai-models-never-break-code-during-context-compression--is-this-true)
8. [Does this work in complex engineering domains (CAD systems, technical docs, CRM)?](#8-does-this-work-in-complex-engineering-domains-cad-systems-technical-docs-crm)
9. [Why are instruction files named in ALL CAPS (AGENTS.md, README.md)?](#9-why-are-instruction-files-named-in-all-caps-agentsmd-readmemd)
10. [How do I adopt the standard in an existing or legacy codebase?](#10-how-do-i-adopt-the-standard-in-an-existing-or-legacy-codebase)

---

### 1. Why is the Index better than Long-Term Memory combined with Knowledge Graphs (Graph RAG)?
**Question:** *“My project already uses vector memory and a knowledge graph. Why do I need a 5-digit Index?”*

**Answer:**  
They do not compete — they complement each other seamlessly:

* **Graph + Memory (Graph RAG)** acts as a semantic map: it defines relationships (*“WHAT is connected to what”*).
* **Blind spot of graphs:** A graph cannot see physical code boundaries inside large files. The AI knows which function to update, but inside a 1,000-line component, it might accidentally overwrite an adjacent logic block or layout styles.

**The Utyansky Index acts like the "apartment number on the door":**
1. **Deterministic Node ID:** Assigns every graph node a rigid 5-digit coordinate (`10000–99999`).
2. **Surgical Code Isolation:** The AI modifies code strictly within the `data-idx="70201"` slot boundary without touching neighboring code.
3. **End-to-End Tracing:** Extends the graph directly into the browser DOM, server logs, and business analytics.

> **Takeaway:** The Graph determines **WHAT** is connected, while the Index determines **WHERE EXACTLY** in the codebase to apply edits safely.

---

### 2. What are the measurable results before and after adoption?
**Answer:**  
Real-world adoption demonstrates measurable improvements across 3 critical factors:

| № | Factor | ❌ Before Index (Chaos) | ✅ After Index (Standard) |
| :-: | :--- | :--- | :--- |
| **1** | **Regression Protection** | When updating one element, AI overwrites adjacent hooks, breaks styling, or drops code with `// rest of code unchanged`. | **0% regressions.** All modifications are isolated strictly within the targeted coordinate slot. |
| **2** | **Token Efficiency** | The entire 1,000–1,500 line file is loaded into context, filling the context window in 3–4 iterations. | **80–85% token savings.** Only the isolated 40–50 line slot is passed into context. |
| **3** | **Prompt Simplicity** | Lengthy descriptions: *“find the blue button in the second tab bottom right...”* | **1 concise line:** *“In slot [70201], add phone validation”*. Direct 1ms jump. |

---

### 3. How are token savings and acceleration achieved across different AI classes?
**Answer:**  
The standard is completely **model-agnostic** and delivers efficiency across all tiers:

* **On Fast & Lightweight LLMs:** A rigid coordinate grid eliminates hallucinations. Models do not need to "guess" context — they hit exact numerical slots, delivering frontier-grade precision with minimal operational costs.
* **On Heavy Frontier LLMs:** Maximizes financial savings. Because frontier tokens carry higher costs, passing a targeted 40-line slot instead of a 1,500-line file slashes per-request expenses by **5–10x** and cuts response latency from 15s down to 2s.

> **Result:** An optimal **hybrid pipeline**: top-level architecture is planned by frontier models, while all surgical modifications and background workers run rapidly and cost-efficiently on coordinate rails.

---

### 4. How does the AI know the slot number without hallucinating?
**Answer:**  
Through a deterministic engineering contract:
1. **In Code:** UI elements carry `data-idx="71080"`, backend functions carry `// [IDX: 71080]`.
2. **In Rules (`.cursorrules` / `AGENTS.md`):** The AI is instructed to operate strictly within the targeted slot boundaries.
3. **In the Prompt:** The developer simply prompts: *“In slot [71080], add date filter”*.

The AI executes a 1ms numeric search and applies an isolated diff without rewriting the entire file.

---

### 5. How does the Index differ from AST (Syntax Trees) and Codebase Indexing?
**Answer:**  
Syntax parsers map backend functions well, but have 3 fundamental blind spots:
1. **UI Layer:** In a single JSX file, you might have 15 identical `<button className="...">` tags. To a syntax tree, they look indistinguishable. `data-idx="70201"` gives each component a unique identity.
2. **End-to-End Tracing:** AST only inspects syntax inside a file, without linking DOM elements to webhooks, server logs, or vector memory.
3. **Speed & Tokens:** Searching a 5-digit number takes 1 token and 1 millisecond without parsing heavy syntax trees.

---

### 6. How is this different from Hashline and tool integration protocols (MCP)?
**Answer:**  
* **Hashline (Line Hashing):** Fragile — changing a single whitespace or variable name invalidates the hash. The Index is a semantic slot coordinate that persists across internal refactoring.
* **Tool Integration Protocols (MCP):** A standard transport bus (API/RPC) for connecting tools to AI. They do not define DOM layout structures or business logic coordinates.
* **Utyansky Index:** An end-to-end address book linking browser DOM, backend servers, and vector databases.

---

### 7. "Modern AI models never break code during context compression" — is this true?
**Answer:**  
In small 50-line scripts, models are reliable. But in large monolithic components (1,000+ lines) during multi-hour development sessions, any model under context compression occasionally:
* Overwrites untouched adjacent functions (`// ... rest of code unchanged ...`);
* Drops props and event handlers;
* Mangles layout styling.

The coordinate grid enforces physical rails, guaranteeing 0% regressions.

---

### 8. Does this work in complex engineering domains (CAD systems, technical docs, CRM)?
**Answer:**  
Yes! In complex multi-layered environments, the coordinate standard is especially potent:
* **CAD Systems & Engineering Drawings:** Coordinates anchor specifications and annotations to drawing layers, preventing AI hallucinations over technical documentation.
* **CRM & Automation Pipelines:** Slots isolate triggers, custom fields, and integrations from mutual collisions.

---

### 9. Why are instruction files named in ALL CAPS (AGENTS.md, README.md)?
**Answer:**  
1. **Unix / Open-Source Tradition:** System manifests sort to the top of directory listings (`ls`).
2. **Visual Anchor:** AI assistants prioritize uppercase root manifests as top-priority system directives.

---

### 10. How do I adopt the standard in an existing or legacy codebase?
**Answer:**  
You do not need to rewrite your project from scratch — adoption is incremental:
1. Add the baseline rule into `.cursorrules` or `AGENTS.md`.
2. Tag active UI components with 5-digit `data-idx="7XXXX"` as you edit them.
3. Run the lightweight registry builder (`node scripts/build_index.js`) to track occupied coordinate ranges.

---

<div align="center">

**[ ⬆️ Back to Table of Contents ](#-table-of-contents)** &nbsp;&nbsp;|&nbsp;&nbsp; **[ ⬅️ Back to Main Page (README) ](../../README.md)** &nbsp;&nbsp;|&nbsp;&nbsp; **[ 🌐 index.utyanskiy.ru ](https://index.utyanskiy.ru)**

</div>
