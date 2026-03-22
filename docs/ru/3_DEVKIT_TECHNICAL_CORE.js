(function() {
    class UtyanskDevKit {
        constructor() {
            this.activeMode = null; // 'dev', 'idx', 'mntr'
            this.registry = {};
            this.initialized = false;
            console.log("🎯 [UTYANSKY DEVKIT] V4.1.4 Initialized. Principle: Kalashnikov.");
        }

        async init() {
            await this.loadRegistry();
            this.createUI();
            this.injectStyles();
            this.bindEvents();
            console.log(">>> [M.4.DEV.KIT] v4.1.4 HYBRID STABLE++ READY");
        }

        async loadRegistry() {
            try {
                const [v1, v2, v3] = await Promise.all([
                    fetch('/api/registry/v1').then(r => r.json()).catch(() => ({})),
                    fetch('/api/registry/v2').then(r => r.json()).catch(() => ({})),
                    fetch('/api/registry/v3').then(r => r.json()).catch(() => ({}))
                ]);
                this.registry = { ...v1, ...v2, ...v3 };
            } catch (e) { console.error("Registry Load Failed", e); }
        }

        createUI() {
            this.host = document.createElement('div');
            this.host.className = 'alex-devkit-host';
            this.host.style.display = 'none'; // Hidden by default
            
            const btnTemplate = (id, icon, label) => `
                <div class="devkit-btn" id="btn-${id}" title="${label}">
                    <span class="devkit-icon">${icon}</span>
                </div>
            `;

            this.host.innerHTML = `
                ${btnTemplate('search', '🔍', 'Search Indices')}
                ${btnTemplate('mntr', '🦉', 'Mentor Mode')}
                ${btnTemplate('dev', '🎯', 'Developer Mode (Hybrid)')}
                ${btnTemplate('idx', '🍬', 'Index Mode')}
            `;

            document.body.appendChild(this.host);

            this.tooltip = document.createElement('div');
            this.tooltip.className = 'alex-idx-tooltip';
            this.tooltip.style.display = 'none';
            document.body.appendChild(this.tooltip);

            this.pixelIndicator = document.createElement('div');
            this.pixelIndicator.className = 'alex-pixel-indicator';
            this.pixelIndicator.style.display = 'none';
            document.body.appendChild(this.pixelIndicator);

            this.mentorPanel = document.createElement('div');
            this.mentorPanel.className = 'alex-mentor-panel';
            this.mentorPanel.innerHTML = '<div style="opacity:0.5; font-size:12px;">Наведите на объект для получения инструкций Ментора...</div>';
            document.body.appendChild(this.mentorPanel);
        }

        injectStyles() {
            const style = document.createElement('style');
            style.textContent = `
                .alex-devkit-host {
                    position: fixed; bottom: 20px; right: 20px;
                    display: flex; gap: 10px; z-index: 100000;
                    padding: 8px; background: rgba(0,0,0,0.8);
                    border: 1px solid rgba(0,255,136,0.2);
                    border-radius: 15px; backdrop-filter: blur(15px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
                .devkit-btn {
                    width: 44px; height: 44px; border-radius: 10px;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; transition: 0.3s; background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .devkit-btn:hover { background: rgba(0,255,136,0.1); border-color: #00ff88; transform: translateY(-3px); }
                .devkit-btn.active { background: #00ff88; color: #000; border-color: #fff; box-shadow: 0 0 15px #00ff88; }
                .devkit-icon { font-size: 20px; }

                .alex-idx-tooltip {
                    position: fixed; z-index: 100001; pointer-events: none;
                    padding: 8px 12px; background: #000; border: 1px solid #00ff88;
                    border-radius: 8px; color: #fff; font-family: 'JetBrains Mono', monospace; font-size: 11px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.8);
                }
                .alex-pixel-indicator {
                    position: fixed; z-index: 100001; pointer-events: none;
                    padding: 8px 12px; background: rgba(0,255,136,0.9); color: #000; font-weight: 900;
                    border-radius: 10px; font-family: 'JetBrains Mono', monospace; font-size: 12px;
                    box-shadow: 0 10px 30px rgba(0,255,136,0.3); border: 2px solid #fff;
                    white-space: nowrap; backdrop-filter: blur(5px);
                }
                
                .alex-mentor-panel {
                    position: fixed; top: 20px; right: 20px; width: 300px;
                    background: rgba(0,0,0,0.9); border: 2px solid #00ff88; border-radius: 15px;
                    padding: 20px; z-index: 9999; display: none;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                    font-family: 'Outfit', sans-serif;
                }
                .alex-mentor-panel.active { display: block; animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1); }

                @keyframes slideIn { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
                .highlight-idx { outline: 2px solid #00ff88 !important; outline-offset: 2px; box-shadow: 0 0 20px rgba(0,255,136,0.3) !important; }
                .highlight-mntr { outline: 2px solid #ffcc00 !important; outline-offset: 4px; box-shadow: 0 0 30px rgba(255,204,0,0.4) !important; }

                .alex-toast {
                    position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
                    background: #00ff88; color: #000; padding: 12px 24px; border-radius: 30px;
                    font-weight: 900; z-index: 20000; font-family: 'Outfit'; 
                    box-shadow: 0 10px 30px rgba(0,255,136,0.4);
                    animation: toastIn 0.3s forwards, toastOut 0.3s 1.5s forwards;
                }
                @keyframes toastIn { from { bottom: 50px; opacity: 0; } to { bottom: 80px; opacity: 1; } }
                @keyframes toastOut { from { bottom: 80px; opacity: 1; } to { bottom: 100px; opacity: 0; } }
            `;
            document.head.appendChild(style);
        }

        bindEvents() {
            this.host.querySelectorAll('.devkit-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = btn.id.replace('btn-', '');
                    this.toggleMode(id);
                });
            });
            document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            document.addEventListener('mousedown', (e) => this.handleAction(e));
        }

        toggleMode(mode) {
            this.activeMode = (this.activeMode === mode) ? null : mode;
            this.host.querySelectorAll('.devkit-btn').forEach(btn => {
                btn.classList.toggle('active', btn.id.replace('btn-', '') === this.activeMode);
            });
            this.tooltip.style.display = 'none';
            this.pixelIndicator.style.display = 'none';
            this.mentorPanel.classList.toggle('active', this.activeMode === 'mntr');
            if (!this.activeMode) this.clearHighlights();
            if (this.activeMode === 'search') { activateView('registry'); this.toggleMode(null); }
        }

        handleMouseMove(e) {
            if (!this.activeMode) return;
            const el = e.target.closest('[data-idx]');
            this.clearHighlights();

            if (this.activeMode === 'dev') {
                this.pixelIndicator.style.display = 'block';
                this.pixelIndicator.style.left = (e.clientX + 15) + 'px';
                this.pixelIndicator.style.top = (e.clientY + 15) + 'px';
                let label = `X: ${e.clientX} | Y: ${e.clientY}`;
                if (el && !el.closest('.alex-devkit-host')) {
                    const idx = (el.getAttribute('data-idx') || '').trim();
                    if (!idx) return;
                    const desc = this.registry[idx] || el.getAttribute('data-desc') || "Индекс: " + idx;
                    const name = desc.split(' | ')[0] || idx;
                    label += `<br><span style="padding:2px 4px; background:#000; color:#00ff88; border-radius:3px; font-size:10px; border:1px solid #00ff88;">[IDX: ${idx}]</span><br>${name}`;
                    el.classList.add('highlight-idx');
                }
                this.pixelIndicator.innerHTML = label;
                return;
            }

            if (this.activeMode === 'idx' || this.activeMode === 'mntr') {
                if (el && !el.closest('.alex-devkit-host')) {
                    const idx = (el.getAttribute('data-idx') || '').trim();
                    if (!idx) return;
                    const desc = this.registry[idx] || el.getAttribute('data-desc') || "Описание отсутствует";
                    const parts = desc.split(' | ');
                    const shortName = parts[0] || idx;
                    const detailedDesc = parts.slice(1).join(' | ') || shortName;

                    if (this.activeMode === 'idx') {
                        this.tooltip.style.display = 'block';
                        this.tooltip.style.left = (e.clientX + 15) + 'px';
                        this.tooltip.style.top = (e.clientY + 15) + 'px';
                        this.tooltip.innerHTML = `<b style="color:#00ff88">[IDX: ${idx}]</b><br><span style="opacity:0.8">${shortName}</span>`;
                        el.classList.add('highlight-idx');
                    } else if (this.activeMode === 'mntr') {
                        this.mentorPanel.innerHTML = `
                            <div style="font-size: 11px; font-weight: 900; color: #00ff88; margin-bottom: 5px;">[IDX: ${idx}]</div>
                            <div style="font-size: 16px; font-weight: 900; margin-bottom: 10px;">${shortName}</div>
                            <div style="font-size: 13px; line-height: 1.6; opacity: 0.9;">${detailedDesc}</div>
                        `;
                        el.classList.add('highlight-mntr');
                    }
                } else { this.tooltip.style.display = 'none'; }
            }
        }

        handleAction(e) {
            if (!this.activeMode || e.target.closest('.alex-devkit-host')) return;
            const el = e.target.closest('[data-idx]');
            
            if (e.type === 'mousedown') {
                if (this.activeMode === 'dev') {
                    const idxAttr = el ? el.getAttribute('data-idx') : null;
                    const text = idxAttr ? `📍 [X: ${e.clientX} Y: ${e.clientY}] [IDX: ${idxAttr.trim()}]` : `📍 [X: ${e.clientX} Y: ${e.clientY}]`;
                    this.harvest(text);
                } else if (el) {
                    this.harvest(`[IDX: ${el.getAttribute('data-idx').trim()}]`);
                }
                if (el) { e.preventDefault(); e.stopPropagation(); }
            }
        }

        harvest(text) {
            this.copyToClipboard(text);
            this.showToast(text);
            const blink = document.createElement('div');
            blink.style = 'position:fixed;width:100vw;height:100vh;background:rgba(0,255,136,0.1);z-index:30000;pointer-events:none;top:0;left:0;';
            document.body.appendChild(blink);
            setTimeout(() => blink.remove(), 100);
        }

        async copyToClipboard(text) {
            try {
                if (navigator.clipboard) await navigator.clipboard.writeText(text);
                else throw "fallback";
            } catch (err) {
                const ta = document.createElement('textarea'); ta.value = text;
                ta.style = 'position:fixed;left:-9999px;top:0;'; document.body.appendChild(ta);
                ta.select(); document.execCommand('copy'); ta.remove();
            }
        }

        showToast(text) {
            const t = document.createElement('div'); t.className = 'alex-toast';
            t.innerText = `HARVESTED: ${text}`; document.body.appendChild(t);
            setTimeout(() => t.remove(), 2000);
        }

        clearHighlights() {
            document.querySelectorAll('.highlight-idx, .highlight-mntr').forEach(el => {
                el.classList.remove('highlight-idx', 'highlight-mntr');
            });
        }
    }

    if (!window.alexDevKit) window.alexDevKit = new AlexDevKit();
})();
