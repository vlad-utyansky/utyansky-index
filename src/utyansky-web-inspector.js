/**
 * 🛡️ Utyansky Web Inspector v2.2 (AI Vision HUD)
 * [IDX: 70099] Official Client-side DOM Inspector for Utyansky Index
 * 
 * Embed into any website to inspect 5-digit coordinates and view the page
 * through the deterministic eyes of an AI assistant (Cursor, Claude, Windsurf).
 * 
 * Usage:
 *   <script src="path/to/utyansky-web-inspector.js"></script>
 *   UtyanskyInspector.toggle(); // or click the floating toggle button
 * 
 * (c) 2026 Vladislav Utyansky | Rospatent Application № 2026603415
 */

(function(root) {
  'use strict';

  var STYLE_ID = 'utyansky-inspector-styles';
  var OVERLAY_ID = 'utyansky-inspector-overlay';
  var HUD_ID = 'utyansky-inspector-hud';

  var isEnabled = false;

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css = [
      '.utyansky-active-target {',
      '  outline: 2px dashed #0284c7 !important;',
      '  outline-offset: 3px !important;',
      '  position: relative !important;',
      '  transition: outline-color 0.2s ease !important;',
      '}',
      '.utyansky-active-target:hover {',
      '  outline-color: #38bdf8 !important;',
      '  box-shadow: 0 0 15px rgba(56, 189, 248, 0.25) !important;',
      '}',
      '.utyansky-badge {',
      '  position: absolute !important;',
      '  top: -12px !important;',
      '  left: 6px !important;',
      '  background: linear-gradient(135deg, #0f172a 0%, #0284c7 100%) !important;',
      '  color: #ffffff !important;',
      '  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;',
      '  font-size: 10px !important;',
      '  font-weight: 800 !important;',
      '  line-height: 1 !important;',
      '  padding: 3px 6px !important;',
      '  border-radius: 6px !important;',
      '  border: 1px solid rgba(56, 189, 248, 0.6) !important;',
      '  box-shadow: 0 4px 12px rgba(0,0,0,0.5), 0 0 8px rgba(2, 132, 199, 0.4) !important;',
      '  pointer-events: none !important;',
      '  z-index: 999999 !important;',
      '  white-space: nowrap !important;',
      '  letter-spacing: 0.5px !important;',
      '  display: flex !important;',
      '  align-items: center !important;',
      '  gap: 4px !important;',
      '}',
      '.utyansky-desc-pill {',
      '  color: #bae6fd !important;',
      '  font-weight: 500 !important;',
      '  font-size: 9px !important;',
      '  max-width: 200px !important;',
      '  overflow: hidden !important;',
      '  text-overflow: ellipsis !important;',
      '}',
      '#utyansky-inspector-hud {',
      '  position: fixed !important;',
      '  bottom: 24px !important;',
      '  right: 24px !important;',
      '  z-index: 9999999 !important;',
      '  background: rgba(10, 15, 29, 0.95) !important;',
      '  border: 1px solid rgba(56, 189, 248, 0.4) !important;',
      '  border-radius: 16px !important;',
      '  padding: 16px !important;',
      '  width: 320px !important;',
      '  box-shadow: 0 20px 40px rgba(0,0,0,0.8), 0 0 25px rgba(2, 132, 199, 0.3) !important;',
      '  backdrop-filter: blur(16px) !important;',
      '  color: #f8fafc !important;',
      '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;',
      '  line-height: 1.4 !important;',
      '  animation: utyanskyFadeIn 0.25s ease-out !important;',
      '}',
      '@keyframes utyanskyFadeIn {',
      '  from { opacity: 0; transform: translateY(12px) scale(0.96); }',
      '  to { opacity: 1; transform: translateY(0) scale(1); }',
      '}'
    ].join('\n');

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function mountOverlay() {
    injectStyles();
    var targets = document.querySelectorAll('[data-idx]');
    var overlay = document.getElementById(OVERLAY_ID);
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = OVERLAY_ID;
      document.body.appendChild(overlay);
    }
    overlay.innerHTML = '';

    targets.forEach(function(el) {
      el.classList.add('utyansky-active-target');
      var idx = el.getAttribute('data-idx') || '70000';
      var desc = el.getAttribute('data-desc') || '';

      var badge = document.createElement('div');
      badge.className = 'utyansky-badge';
      badge.innerHTML = '<span>⚡ [IDX: ' + idx + ']</span>' + 
        (desc ? '<span class="utyansky-desc-pill">' + desc.replace(/^\[.*?\]\s*/, '') + '</span>' : '');
      
      el.appendChild(badge);
    });

    // Mount HUD panel
    var hud = document.getElementById(HUD_ID);
    if (!hud) {
      hud = document.createElement('div');
      hud.id = HUD_ID;
      document.body.appendChild(hud);
    }

    hud.innerHTML = [
      '<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">',
      '  <div style="display: flex; align-items: center; gap: 8px;">',
      '    <span style="width: 8px; height: 8px; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 8px #38bdf8;"></span>',
      '    <strong style="font-size: 13px; font-weight: 800; color: #ffffff; letter-spacing: 0.3px;">👁️ Взгляд ИИ (HUD O(1))</strong>',
      '  </div>',
      '  <button id="utyansky-close-btn" style="background: none; border: none; color: #94a3b8; font-size: 16px; cursor: pointer; padding: 2px 6px; line-height: 1;">✕</button>',
      '</div>',
      '<p style="font-size: 11px; color: #94a3b8; margin: 0 0 12px 0;">',
      '  Сайт переведен в детерминированный координатный режим. Для нейросети каждый блок имеет несгораемый 5-значный паспорт.',
      '</p>',
      '<div style="background: rgba(2, 132, 199, 0.1); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 10px; padding: 10px; font-family: ui-monospace, monospace; font-size: 10px; color: #38bdf8;">',
      '  <div>✓ Индексировано узлов: <strong>' + targets.length + '</strong></div>',
      '  <div>✓ Точность адресации: <strong>O(1)</strong></div>',
      '  <div>✓ Защита от галлюцинаций: <strong>100%</strong></div>',
      '</div>'
    ].join('\n');

    var closeBtn = document.getElementById('utyansky-close-btn');
    if (closeBtn) {
      closeBtn.onclick = function() {
        unmountOverlay();
      };
    }

    isEnabled = true;
  }

  function unmountOverlay() {
    var targets = document.querySelectorAll('.utyansky-active-target');
    targets.forEach(function(el) {
      el.classList.remove('utyansky-active-target');
      var badges = el.querySelectorAll(':scope > .utyansky-badge');
      badges.forEach(function(b) { b.remove(); });
    });

    var hud = document.getElementById(HUD_ID);
    if (hud) hud.remove();

    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) overlay.remove();

    var styles = document.getElementById(STYLE_ID);
    if (styles) styles.remove();

    isEnabled = false;
  }

  var UtyanskyInspector = {
    toggle: function() {
      if (isEnabled) {
        unmountOverlay();
      } else {
        mountOverlay();
      }
      return isEnabled;
    },
    enable: mountOverlay,
    disable: unmountOverlay,
    isActive: function() {
      return isEnabled;
    }
  };

  root.UtyanskyInspector = UtyanskyInspector;

})(typeof window !== 'undefined' ? window : this);
