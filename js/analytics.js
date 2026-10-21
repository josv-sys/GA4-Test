/* =========================================================
   Opeth Rules · Capa de medición GA4
   ---------------------------------------------------------
   1. Reemplaza GA_MEASUREMENT_ID con tu ID (G-XXXXXXXXXX).
   2. Mientras el ID sea el marcador, los eventos NO se envían:
      solo aparecen en el panel "GA4" de la esquina inferior.
   3. Agrega ?debug=1 a cualquier URL para ver los eventos en
      GA4 > Admin > DebugView (se mantiene durante la sesión).
   ========================================================= */
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

const GA_ENABLED = /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID) && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX';

window.OR = window.OR || {};

OR.storage = {
  get(store, key) { try { return window[store].getItem(key); } catch (e) { return null; } },
  set(store, key, val) { try { window[store].setItem(key, val); } catch (e) { /* sin storage */ } },
  remove(store, key) { try { window[store].removeItem(key); } catch (e) { /* sin storage */ } }
};

// Modo debug: localhost o ?debug=1 (persistente en la sesión)
(function () {
  const params = new URLSearchParams(location.search);
  if (params.get('debug') === '1') OR.storage.set('sessionStorage', 'or_debug', '1');
  if (params.get('debug') === '0') OR.storage.remove('sessionStorage', 'or_debug');
})();
OR.DEBUG = ['localhost', '127.0.0.1'].includes(location.hostname) ||
  OR.storage.get('sessionStorage', 'or_debug') === '1';

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// ---------- Consent Mode v2 ----------
OR.CONSENT_KEY = 'or_consent';
OR.consent = OR.storage.get('localStorage', OR.CONSENT_KEY); // 'granted' | 'denied' | null

gtag('consent', 'default', {
  analytics_storage: OR.consent === 'granted' ? 'granted' : 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});

OR.setConsent = function (granted) {
  OR.consent = granted ? 'granted' : 'denied';
  OR.storage.set('localStorage', OR.CONSENT_KEY, OR.consent);
  gtag('consent', 'update', { analytics_storage: OR.consent });
  OR.log('consent_update', { analytics_storage: OR.consent }, 'consent');
};

// ---------- Carga de gtag.js ----------
if (GA_ENABLED) {
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(s);
}
gtag('js', new Date());
// debug_mode se omite por completo cuando no aplica (false también lo activaría)
gtag('config', GA_MEASUREMENT_ID, OR.DEBUG ? { debug_mode: true } : {});

// ---------- Registro visible de eventos (panel GA4) ----------
OR.LOG_KEY = 'or_event_log';
OR.eventLog = (function () {
  try { return JSON.parse(OR.storage.get('sessionStorage', OR.LOG_KEY)) || []; } catch (e) { return []; }
})();

OR.log = function (name, params, kind) {
  const entry = { name, params, kind: kind || 'event', page: location.pathname.split('/').pop() || 'index.html', time: new Date().toLocaleTimeString() };
  OR.eventLog.unshift(entry);
  OR.eventLog = OR.eventLog.slice(0, 60);
  OR.storage.set('sessionStorage', OR.LOG_KEY, JSON.stringify(OR.eventLog));
  document.dispatchEvent(new CustomEvent('or:event', { detail: entry }));
  if (OR.DEBUG) console.log('%c[GA4] ' + name, 'color:#c9a46a;font-weight:bold', params);
};

// Punto único para enviar eventos: así toda la medición pasa por aquí
OR.track = function (name, params) {
  params = params || {};
  gtag('event', name, params);
  OR.log(name, params);
};

OR.log('page_view', { page_title: document.title, page_location: location.href, nota: 'automático (gtag config)' }, 'auto');
