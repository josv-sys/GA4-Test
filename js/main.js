/* Layout compartido: navbar, footer, banner de cookies, panel GA4 y helpers */
window.OR = window.OR || {};

OR.esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

OR.coverHTML = function (album, extraClass) {
  return `<div class="cover ${extraClass || ''}" style="--c1:${album.colors[0]};--c2:${album.colors[1]}">
    <span class="cover-title">${OR.esc(album.title)}</span>
    <span class="cover-year">${album.year}</span>
    <img src="assets/img/covers/${album.id}.jpg" alt="Portada de ${OR.esc(album.title)}" loading="lazy" onerror="this.remove()">
  </div>`;
};

// Agregar al carrito + evento add_to_cart en un solo lugar
OR.addToCart = function (album, variant, qty, list) {
  OR.cart.add(album.id, variant, qty);
  const item = OR.toGA4Item(album, { variant, quantity: qty, listId: list && list.id, listName: list && list.name });
  OR.track('add_to_cart', { currency: OR.CURRENCY, value: +(item.price * qty).toFixed(2), items: [item] });
  OR.toast(`<i class="bi bi-bag-check me-2"></i><strong>${OR.esc(album.title)}</strong> (${variant}) agregado.
    <a href="carrito.html" class="ms-2 link-or">Ver carrito</a>`);
};

OR.toast = function (html) {
  let wrap = document.getElementById('toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'toast-wrap';
    wrap.className = 'toast-container position-fixed top-0 end-0 p-3';
    document.body.appendChild(wrap);
  }
  const el = document.createElement('div');
  el.className = 'toast align-items-center border-0 toast-or';
  el.setAttribute('role', 'status');
  el.innerHTML = `<div class="d-flex"><div class="toast-body">${html}</div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button></div>`;
  wrap.appendChild(el);
  const t = new bootstrap.Toast(el, { delay: 3500 });
  el.addEventListener('hidden.bs.toast', () => el.remove());
  t.show();
};

function renderNav() {
  const page = document.body.dataset.page;
  const links = [
    ['inicio', 'index.html', 'Inicio'],
    ['historia', 'historia.html', 'Historia'],
    ['tienda', 'tienda.html', 'Tienda'],
    ['videos', 'videos.html', 'Videos'],
    ['contacto', 'contacto.html', 'Contacto']
  ];
  const el = document.getElementById('site-nav');
  if (!el) return;
  el.innerHTML = `
  <nav class="navbar navbar-expand-lg sticky-top navbar-or">
    <div class="container">
      <a class="navbar-brand brand" href="index.html"><i class="bi bi-moon-stars me-2"></i>Opeth Rules</a>
      <div class="d-flex align-items-center order-lg-last gap-2">
        <a href="carrito.html" class="btn btn-sm btn-outline-or position-relative" aria-label="Carrito">
          <i class="bi bi-bag"></i>
          <span class="badge rounded-pill bg-or cart-badge" id="cart-badge">0</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-main" aria-controls="nav-main" aria-expanded="false" aria-label="Menú">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse" id="nav-main">
        <ul class="navbar-nav ms-auto me-lg-3">
          ${links.map(([key, href, label]) => `<li class="nav-item"><a class="nav-link ${key === page ? 'active' : ''}" ${key === page ? 'aria-current="page"' : ''} href="${href}">${label}</a></li>`).join('')}
        </ul>
      </div>
    </div>
  </nav>`;
  updateBadge();
}

function updateBadge() {
  const b = document.getElementById('cart-badge');
  if (!b) return;
  const n = OR.cart.count();
  b.textContent = n;
  b.classList.toggle('d-none', n === 0);
}

function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML = `
  <footer class="footer-or mt-5">
    <div class="container py-5">
      <div class="row g-4">
        <div class="col-md-5">
          <div class="brand fs-4 mb-2">Opeth Rules</div>
          <p class="text-muted-or small mb-0">Sitio de fans creado para practicar Google Analytics 4. No está afiliado a Opeth ni a sus sellos discográficos. La tienda es simulada y no cobra nada.</p>
        </div>
        <div class="col-6 col-md-3">
          <h6 class="footer-title">Oficial</h6>
          <ul class="list-unstyled small">
            <li><a href="https://www.opeth.com" target="_blank" rel="noopener">opeth.com</a></li>
            <li><a href="https://open.spotify.com/search/Opeth" target="_blank" rel="noopener">Spotify</a></li>
            <li><a href="https://www.youtube.com/@OpethOfficial" target="_blank" rel="noopener">YouTube</a></li>
            <li><a href="https://www.instagram.com/opeth" target="_blank" rel="noopener">Instagram</a></li>
          </ul>
        </div>
        <div class="col-6 col-md-4">
          <h6 class="footer-title">Extras</h6>
          <ul class="list-unstyled small">
            <li><a href="assets/descargas/discografia-opeth.txt" download>Descargar discografía (.txt)</a></li>
            <li><button type="button" class="btn btn-link p-0 small link-or" id="open-consent">Preferencias de cookies</button></li>
            <li><a href="?debug=1">Activar modo DebugView</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>`;
  document.getElementById('open-consent').addEventListener('click', () => renderConsent(true));
}

function renderConsent(force) {
  if (OR.consent && !force) return;
  if (document.getElementById('consent-banner')) return;
  const el = document.createElement('div');
  el.id = 'consent-banner';
  el.className = 'consent-or';
  el.innerHTML = `
    <div class="container d-flex flex-column flex-md-row align-items-md-center gap-3">
      <p class="mb-0 small flex-grow-1"><i class="bi bi-shield-check me-2 text-or"></i>
      Usamos cookies de analítica (GA4) para entender cómo se usa este sitio de práctica.
      <span class="text-muted-or">Si las rechazas, Consent Mode solo envía pings sin cookies y no verás datos en Tiempo real.</span></p>
      <div class="d-flex gap-2 flex-shrink-0">
        <button class="btn btn-sm btn-outline-or" data-consent="denied">Rechazar</button>
        <button class="btn btn-sm btn-or" data-consent="granted">Aceptar</button>
      </div>
    </div>`;
  document.body.appendChild(el);
  el.querySelectorAll('[data-consent]').forEach(b => b.addEventListener('click', () => {
    OR.setConsent(b.dataset.consent === 'granted');
    el.remove();
  }));
}

function renderDebugPanel() {
  const btn = document.createElement('button');
  btn.className = 'ga-debug-btn';
  btn.type = 'button';
  btn.setAttribute('data-bs-toggle', 'offcanvas');
  btn.setAttribute('data-bs-target', '#ga-debug');
  btn.innerHTML = `<i class="bi bi-activity"></i> GA4 <span class="badge bg-or" id="ga-count">${OR.eventLog.length}</span>`;
  document.body.appendChild(btn);

  const panel = document.createElement('div');
  panel.className = 'offcanvas offcanvas-start ga-debug-panel';
  panel.id = 'ga-debug';
  panel.tabIndex = -1;
  panel.innerHTML = `
    <div class="offcanvas-header border-bottom border-or">
      <div>
        <h5 class="offcanvas-title brand mb-1">Eventos GA4</h5>
        <div class="small ${GA_ENABLED ? 'text-success' : 'text-warning'}">
          ${GA_ENABLED ? `Enviando a ${GA_MEASUREMENT_ID}` : 'ID no configurado: modo simulación (no se envía nada)'}
          ${OR.DEBUG ? ' · debug_mode activo' : ''}
        </div>
      </div>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
    </div>
    <div class="offcanvas-body p-0">
      <div class="d-flex justify-content-between align-items-center px-3 py-2 small text-muted-or">
        <span>Últimos eventos de esta sesión</span>
        <button class="btn btn-sm btn-link link-or p-0" id="ga-clear">Limpiar</button>
      </div>
      <ul class="list-unstyled mb-0" id="ga-list"></ul>
    </div>`;
  document.body.appendChild(panel);

  const list = panel.querySelector('#ga-list');
  const draw = () => {
    document.getElementById('ga-count').textContent = OR.eventLog.length;
    list.innerHTML = OR.eventLog.map(e => `
      <li class="ga-entry ga-${e.kind}">
        <div class="d-flex justify-content-between"><code>${OR.esc(e.name)}</code><span class="small text-muted-or">${e.time} · ${OR.esc(e.page)}</span></div>
        <pre>${OR.esc(JSON.stringify(e.params, null, 2))}</pre>
      </li>`).join('') || '<li class="px-3 py-4 text-muted-or small">Aún no hay eventos.</li>';
  };
  draw();
  document.addEventListener('or:event', draw);
  panel.querySelector('#ga-clear').addEventListener('click', () => {
    OR.eventLog = [];
    OR.storage.remove('sessionStorage', OR.LOG_KEY);
    draw();
  });
}

// Eventos declarativos: <a data-event="cta_click" data-param-cta-name="hero_tienda">
function bindDeclarativeEvents() {
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-event]');
    if (!el) return;
    const params = {};
    Object.keys(el.dataset).forEach(k => {
      if (k.startsWith('param') && k.length > 5) {
        const name = k.slice(5).replace(/[A-Z]/g, m => '_' + m.toLowerCase()).replace(/^_/, '');
        params[name] = el.dataset[k];
      }
    });
    OR.track(el.dataset.event, params);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
  renderConsent(false);
  renderDebugPanel();
  bindDeclarativeEvents();
});
document.addEventListener('or:cart', updateBadge);
window.addEventListener('storage', updateBadge);
