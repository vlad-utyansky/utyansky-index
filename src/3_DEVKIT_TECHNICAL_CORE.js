/**
 * Utyansky Index DevKit v5.2 Standard
 * Professional Edition | VAU EFFECT 🛡️
 * Principle: Kalashnikov | Grid: 40x40 Deterministic Mapping
 */

export class UtyanskyDevKit {
    constructor() {
        this.activeMode = null; 
        this.registry = { "M.7.DEVKIT": "Utyansky DevKit Core Engine" };
        this.initialized = false;
        this.mousePos = { x: 0, y: 0 };
        this.gridPos = { col: '', row: 0 };
        console.log("🎯 [UTYANSKY DEVKIT] V5.2 Standard Initialized.");
    }

    async init() {
        if (this.initialized) return;
        this.injectStyles();
        this.createUI();
        this.bindEvents();
        this.initialized = true;
        console.log(">>> [M.4.DEV.KIT] v5.2 HYBRID STABLE++ READY");
    }

    // РЕАЛЬНЫЙ РАСЧЕТ СЕТКИ 40x40
    calculateCoordinates(e) {
        const colWidth = window.innerWidth / 40;
        const rowHeight = window.innerHeight / 40;
        
        const colNum = Math.floor(e.clientX / colWidth);
        const rowNum = Math.floor(e.clientY / rowHeight) + 1;
        
        // Превращаем число в буквы (0 -> A, 1 -> B, ...)
        const colLetter = String.fromCharCode(65 + (colNum % 26));
        const prefix = colNum >= 26 ? String.fromCharCode(65 + Math.floor(colNum / 26) - 1) : '';
        
        return { coord: `${prefix}${colLetter}${rowNum}`, x: e.clientX, y: e.clientY };
    }

    handleMouseMove(e) {
        if (!this.activeMode) return;
        const data = this.calculateCoordinates(e);
        const indicator = document.getElementById('uty-pixel-indicator');
        if (indicator) {
            indicator.style.left = `${e.clientX + 15}px`;
            indicator.style.top = `${e.clientY + 15}px`;
            indicator.innerHTML = `COORD: ${data.coord}<br>X: ${data.x} Y: ${data.y}`;
            indicator.style.display = 'block';
        }
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #uty-pixel-indicator {
                position: fixed; z-index: 100001; pointer-events: none;
                padding: 8px; background: rgba(0, 255, 163, 0.9); color: #000;
                font-family: monospace; font-size: 11px; border-radius: 4px; font-weight: bold;
            }
            #utyansk-devkit-host {
                position: fixed; right: 20px; bottom: 20px; z-index: 10000;
                display: flex; gap: 8px; background: #111; padding: 10px;
                border-radius: 20px; border: 1px solid #00ffa3;
            }
            .uty-btn {
                background: none; border: 1px solid #333; color: #888;
                padding: 5px 10px; border-radius: 12px; cursor: pointer; font-size: 10px;
            }
            .uty-btn.active { color: #00ffa3; border-color: #00ffa3; box-shadow: 0 0 10px #00ffa3; }
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

        const tooltip = document.createElement('div');
        tooltip.id = 'uty-pixel-indicator';
        tooltip.style.display = 'none';
        document.body.appendChild(tooltip);
    }

    bindEvents() {
        document.querySelectorAll('.uty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.activeMode = (this.activeMode === btn.dataset.mode) ? null : btn.dataset.mode;
                document.querySelectorAll('.uty-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === this.activeMode));
            });
        });
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
}

if (typeof window !== 'undefined') {
    window.utyanskyDevKit = new UtyanskyDevKit();
    window.addEventListener('load', () => window.utyanskyDevKit.init());
}
