# 🛠 UTYANSKY INDEX: INTEGRATION GUIDE
> **Standard:** v5.2 GOLD  
> **Mission:** Connect UI, Code, and AI in 5 minutes.

---

## 1. SEMANTIC TAGGING (HTML) 🏷️
Add the `data-idx` attribute to your HTML elements. This allows the AI and the DevKit to "see" the exact coordinate of the object.

**Example:**
```html
<button data-idx="1.A.5.SECURITY">Security Shield</button>
```

## 2. LOADING THE DEVKIT (JS) 🍬
Choose the method that fits your project:

### Method A: For Beginners (Script Tag)
Just drop the script into your HTML. The HUD will initialize automatically.
```html
<script src="./src/3_DEVKIT_TECHNICAL_CORE.js"></script>
```

### Method B: For Professionals (ES Modules)
Use `import` for React, Vue, or modern JS environments.
```javascript
import { UtyanskDevKit } from './src/3_DEVKIT_TECHNICAL_CORE.js';

const devKit = new UtyanskDevKit();
devKit.init();
```

## 3. PROMPTING THE AI AGENT 🤖
To make your AI agent (Claude, GPT, Gemini) understand the Index, add this to its System Instructions:
"You are operating on the Utyansky Index Standard. Every UI element has a unique IDX coordinate.
Use these IDXs to navigate the codebase.
If a bug is reported at IDX '1.A.5', locate the exact logic in the Registry and fix it.
Do not guess locations. Rely on the Deterministic Coordinate Map."

Standardized by: Vladislav Utyansky
