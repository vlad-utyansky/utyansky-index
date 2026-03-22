/**
 * Utyansky Index DevKit v5.2 Standard
 * Professional Edition (Universal Support)
 * Principle: Kalashnikov | Grid: 40x40
 */

export class UtyanskDevKit {
    constructor() {
        this.activeMode = null; 
        this.registry = {};
        this.initialized = false;
        console.log("🎯 [UTYANSKY DEVKIT] V5.2 Standard Initialized.");
    }

    async init() {
        if (this.initialized) return;
        console.log(">>> [M.4.DEV.KIT] v5.2 HYBRID STABLE++ READY");
        await this.loadRegistry();
        this.injectStyles();
        this.createUI();
        this.bindEvents();
        this.initialized = true;
    }

    async loadRegistry() {
        // Placeholder for registry loading logic
        this.registry = { "M.7.DEVKIT": "Utyansk DevKit Core" };
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #utyansk-devkit-host {
                position: fixed;
                right: 20px;
                bottom: 20px;
                z-index: 10000;
                display: flex;
                gap: 10px;
                background: rgba(15, 15, 15, 0.8);
                backdrop-filter: blur(10px);
                padding: 8px 15px;
                border-radius: 30px;
                border: 1px solid rgba(255,255,255,0.1);
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                transition: all 0.3s ease;
            }
            .uty-btn {
                padding: 5px 12px;
                border-radius: 20px;
                border: none;
                background: transparent;
                color: #888;
                font-size: 11px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.2s;
                text-transform: uppercase;
            }
            .uty-btn.active { color: #00ffa3; text-shadow: 0 0 10px #00ffa3; }
            .uty-btn:hover { color: #fff; }
        `;
        document.head.appendChild(style);
    }

    createUI() {
        const host = document.createElement('div');
        host.id = 'utyansk-devkit-host';
        host.innerHTML = `
            <button class="uty-btn" data-mode="dev">DEV</button>
            <button class="uty-btn" data-mode="idx">IDX</button>
            <button class="uty-btn" data-mode="mntr">MNTR</button>
        `;
        document.body.appendChild(host);
    }

    bindEvents() {
        document.querySelectorAll('.uty-btn').forEach(btn => {
            btn.addEventListener('click', () => this.toggleMode(btn.dataset.mode));
        });
    }

    toggleMode(mode) {
        console.log(`[UTYANSKY DEVKIT] Switching mode: ${mode}`);
        this.activeMode = (this.activeMode === mode) ? null : mode;
        this.updateUI();
        if (this.activeMode === 'dev') this.activatePixelGrid();
    }

    updateUI() {
        document.querySelectorAll('.uty-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === this.activeMode);
        });
    }

    activatePixelGrid() {
        console.log("🎯 [PIXEL MODE] 40x40 Grid Activated.");
        // Grid logic follows...
    }
}

// АВТО-ИНИЦИАЛИЗАЦИЯ (Для тех, кто не использует import)
if (typeof window !== 'undefined') {
    if (!window.utyanskDevKit) {
        window.utyanskDevKit = new UtyanskDevKit();
        // Авто-старт при загрузке страницы
        window.addEventListener('load', () => window.utyanskDevKit.init());
    }
}
