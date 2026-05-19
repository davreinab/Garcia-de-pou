// GDP Component render functions — shared across index, category, product pages

// ── SVG constants ──────────────────────────────────────────────────────────
const _SF = '<svg class="rating-star" width="13" height="13" viewBox="0 0 24 24" fill="#FFD100" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
const _SE = '<svg class="rating-star" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D4D4D4" stroke-width="1.5" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke-linejoin="round"/></svg>';
const _CI = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="1.8"/><path d="M16 10a4 4 0 01-8 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const _CHEVRON = '<svg class="cat-filter-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const _SAVE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';

function _gdpStars(n) {
  let s = '';
  for (let i = 1; i <= 5; i++) s += i <= n ? _SF : _SE;
  return s;
}
function _gdpBadge(b) {
  if (!b) return '';
  if (b.type === 'new') return `<span class="offer-badge offer-badge--new"><img src="img/new-tag.png" alt="Nuevo" loading="lazy"></span>`;
  return `<span class="offer-badge offer-badge--discount">${b.text}</span>`;
}
function _gdpActions() {
  return `<div class="qty-selector"><button class="qty-btn" onclick="adjustQty(this,-1)">−</button><input type="number" class="qty-input" value="1" min="1"><button class="qty-btn" onclick="adjustQty(this,1)">+</button></div><button class="btn-add-cart">${_CI} Añadir</button>`;
}
const _PENCIL = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function _gdpPersonalizable(show) {
  return `<span class="offer-personalizable${show ? '' : ' offer-personalizable--hidden'}"${show ? '' : ' aria-hidden="true"'}>${_PENCIL} Personalizable</span>`;
}
function _gdpFinishes(d, mod) {
  const finishes = Array.isArray(d.finishes) && d.finishes.length ? d.finishes : [];
  const total = Math.min(24, Math.max(0, Number(d.finishCount) || finishes.length));
  if (total < 1) return '';
  const visible = total > 2 ? finishes.slice(0, 1) : finishes.slice(0, total);
  const more = total > 2 ? `<span class="offer-finish-more">+${total}</span>` : '';
  const swatches = visible.map(c => `<span class="offer-finish-swatch" style="background:${c}"></span>`).join('');
  return `<span class="offer-finishes offer-finishes--${mod}" aria-label="${total} acabados disponibles">${swatches}${more}</span>`;
}

// ── Product cards ──────────────────────────────────────────────────────────

// 3-column layout — for .offers-grid
function gdpOfferCard(d) {
  return `<a href="${d.href}" class="offer-card">
  <div class="offer-card-img">${_gdpBadge(d.badge)}<img src="${d.img}" alt="${d.alt}" loading="lazy">${d.brand ? `<span class="offer-brand-wrap"><img src="${d.brand}" alt="" class="offer-brand-logo" aria-hidden="true"></span>` : ''}</div>
  <div class="offer-card-info">
    <span class="offer-code${d.dot ? ' offer-code--dot' : ''}">${d.code}</span>
    <p class="offer-name">${d.name}</p>
    <div class="offer-pack">
      <span class="offer-pack-label"><strong>Paquete:</strong></span>
      <span class="offer-pack-qty">${d.packQty}</span>
      <span class="offer-pack-unit"><b>${d.packUnit}</b>${d.packUnitLabel}</span>
    </div>
    <div class="offer-rating">
      <span class="offer-rating-stars">${_gdpStars(d.stars)}</span>
      <span class="offer-rating-count">(${d.ratingCount})</span>
    </div>
    <div class="offer-pricing">
      <span class="offer-price">${d.price}</span>
      ${d.priceOld ? `<span class="offer-price-old">${d.priceOld}</span>` : ''}
    </div>
  </div>
  <div class="offer-card-commerce">
    <div class="offer-actions">${_gdpActions()}${_gdpPersonalizable(d.personalizable)}</div>
  </div>
</a>`;
}

// Vertical layout — for .products-grid and .cat-grid
function gdpProductCard(d) {
  return `<a href="${d.href}" class="offer-card">
  <div class="offer-card-img">${_gdpBadge(d.badge)}<img src="${d.img}" alt="${d.alt}" loading="lazy">${d.brand ? `<span class="offer-brand-wrap"><img src="${d.brand}" alt="" class="offer-brand-logo" aria-hidden="true"></span>` : ''}</div>
  <div class="offer-card-body">
    <div class="offer-card-copy">
      <span class="offer-save" aria-label="Guardar en favoritos">${_SAVE}</span>
      <div class="offer-code-row">
        <span class="offer-code${d.dot ? ' offer-code--dot' : ''}">${d.code}</span>
      </div>
      <p class="offer-name">${d.name}</p>
    </div>
    <div class="offer-card-buy-meta">
      <div class="offer-rating">
        <span class="offer-rating-stars">${_gdpStars(d.stars)}</span>
        <span class="offer-rating-count">(${d.ratingCount})</span>
      </div>
      <div class="offer-price-row">
        <div class="offer-pricing">
          <span class="offer-price">${d.price}</span>
          ${d.priceOld ? `<span class="offer-price-old">${d.priceOld}</span>` : ''}
        </div>
        ${_gdpFinishes(d, 'price')}
      </div>
      <div class="offer-pack">
        <span class="offer-pack-label"><strong>Paquete:</strong> ${d.packQty}</span>
        <span class="offer-pack-unit"><b>${d.packUnit}</b>${d.packUnitLabel}</span>
      </div>
    </div>
    <div class="offer-actions">${_gdpActions()}${_gdpPersonalizable(d.personalizable)}</div>
  </div>
</a>`;
}

// Variant card (swiper-slide) — for .pdp-variants
// Igual que gdpProductCard pero sin: badge, acabados, personalizable, acciones
function gdpVariantCard(d) {
  return `<div class="swiper-slide"><a href="${d.href}" class="offer-card offer-card--variant">
  <div class="offer-card-img"><img src="${d.img}" alt="${d.alt}" loading="lazy"></div>
  <div class="offer-card-body">
    <div class="offer-card-copy">
      <span class="offer-save" aria-label="Guardar en favoritos">${_SAVE}</span>
      <div class="offer-code-row">
        <span class="offer-code">${d.code}</span>
      </div>
      <p class="offer-name">${d.name}</p>
    </div>
    <div class="offer-card-buy-meta">
      <div class="offer-price-row">
        <div class="offer-pricing">
          <span class="offer-price">${d.price}</span>
        </div>
      </div>
      <span class="offer-price-unit">${d.priceUnit}</span>
    </div>
  </div>
</a></div>`;
}

// ── Section components ─────────────────────────────────────────────────────

// Sector card — for .sectors-grid
function gdpSectorCard(d) {
  return `<a href="${d.href||'category.html'}" class="sector-card">
  <div class="sector-card-img">
    <img src="${d.img}" alt="${d.name}" loading="lazy">
    <div class="sector-card-overlay"><span>Ver productos</span></div>
  </div>
  <p class="sector-card-name">${d.name}</p>
</a>`;
}

// Look item — for .promo-looks-grid
function gdpLookItem(d) {
  return `<a href="${d.href||'category.html'}" class="look-item">
  <img src="${d.img}" alt="" loading="lazy">
  <div class="look-overlay">
    <p class="look-title">${d.title}</p>
    <p class="look-count">${d.count} productos seleccionados</p>
  </div>
</a>`;
}

// Category pill — for .cat-pills-grid
function gdpCatPill(d) {
  return `<li><a href="${d.href||'#'}" class="cat-pill">
  <span class="cat-pill-thumb"><img src="${d.img}" alt="" loading="lazy"></span>
  <span class="cat-pill-name">${d.name}</span>
</a></li>`;
}

// Filter group — for .cat-sidebar  { type:'color'|'checkbox', name, open?, options[] }
// color options: { label, color }   checkbox options: plain strings
function gdpFilter(d) {
  let body;
  if (d.type === 'color') {
    body = `<div class="cat-colors">${d.options.map(o =>
      `<div class="cat-color"><div class="cat-color-l"><span class="cat-color-sw" style="background:${o.color}"></span><span class="cat-color-lbl">${o.label}</span></div><span class="cat-radio"></span></div>`
    ).join('')}</div>`;
  } else {
    body = d.options.map(o =>
      `<label class="cat-check"><span class="cat-check-box"></span><span class="cat-check-lbl">${o}</span></label>`
    ).join('');
  }
  return `<div class="cat-filter${d.open ? ' is-open' : ''}">
  <div class="cat-filter-hd">
    <div class="cat-filter-hd-l"><span class="cat-filter-name">${d.name}</span><span class="cat-filter-cnt" hidden></span></div>
    ${_CHEVRON}
  </div>
  <div class="cat-filter-body"><div class="cat-filter-bd">${body}</div></div>
</div>`;
}

// ── Header & Footer ────────────────────────────────────────────────────────
// gdpHeader(opts) — returns <header> + mobile drawer HTML
// opts.activeCat: text of the active nav category, or null

function gdpHeader(opts) {
  const ac = (opts && opts.activeCat) || null;
  function navLink(text, href) {
    const active = ac === text ? ' class="is-active"' : '';
    return `<a href="${href||'#'}"${active}>${text}</a>`;
  }
  return `<header class="header" id="header">

    <!-- ── Fila 1: barra de utilidades ── -->
    <div class="header-utility">
      <div class="wrap header-utility-inner">
        <div class="util-left">
          <a href="#" class="util-partner" aria-label="WeForest — Comprometidos con el medio ambiente">
            <img src="https://www.garciadepou.com/media/cms/cms/WF_Logo-whiteandcolord-.png" alt="WeForest" class="util-partner-logo">
          </a>
          <span class="util-sep" aria-hidden="true"></span>
          <nav class="util-nav" aria-label="Accesos rápidos">
            <a href="#"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Looks</a>
            <a href="#"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg> Blog</a>
            <a href="#"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg> Catálogos</a>
            <a href="#"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Compra rápida</a>
            <a href="#"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg> Mis productos</a>
          </nav>
        </div>
        <div class="util-right">
          <div class="util-lang" id="utilLang">
            <button class="util-lang-btn" aria-haspopup="listbox" aria-expanded="false">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 3c-2.2 2.8-3.5 5.6-3.5 9s1.3 6.2 3.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 3c2.2 2.8 3.5 5.6 3.5 9s-1.3 6.2-3.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3 12h18M3.5 7.5h17M3.5 16.5h17" stroke="currentColor" stroke-width="1.5"/></svg>
              <span class="util-lang-current">ES</span>
              <svg class="util-lang-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <ul class="util-lang-dropdown" role="listbox" hidden>
              <li role="option"><button class="util-lang-opt is-active" data-lang="ES">ES <span>Español</span></button></li>
              <li role="option"><button class="util-lang-opt" data-lang="EN">EN <span>English</span></button></li>
              <li role="option"><button class="util-lang-opt" data-lang="FR">FR <span>Français</span></button></li>
              <li role="option"><button class="util-lang-opt" data-lang="PT">PT <span>Português</span></button></li>
              <li role="option"><button class="util-lang-opt" data-lang="DE">DE <span>Deutsch</span></button></li>
            </ul>
          </div>
          <a href="#" class="util-account">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            Mi cuenta
          </a>
          <div class="cart-pill" role="button" aria-label="Carrito de compra, 0 artículos">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="1.5"/><path d="M16 10a4 4 0 01-8 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            Cesta
            <span class="cart-count">0</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Fila 2: barra de marca ── -->
    <div class="header-brand">
      <div class="wrap header-brand-inner">
        <button class="burger-btn" id="burgerBtn" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobileDrawer">
          <span></span><span></span><span></span>
        </button>
        <a href="index.html" class="logo-link" aria-label="García de Pou — Inicio">
          <img class="logo-img" src="https://www.garciadepou.com/static/version1776292596/frontend/Etailers/gpou/es_ES/images/logo.svg" alt="García de Pou">
        </a>
        <div class="header-search">
          <button class="search-btn" aria-label="Buscar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7.5" stroke="currentColor" stroke-width="1.8"/><path d="M17 17l4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          </button>
          <input type="search" class="search-input" placeholder="¿Qué es lo que buscas?" aria-label="Buscar productos">
        </div>
        <div class="cart-pill cart-pill-mobile" role="button" aria-label="Carrito de compra, 0 artículos">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="1.5"/><path d="M16 10a4 4 0 01-8 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <span class="cart-count">0</span>
        </div>
        <nav class="nav-secondary" aria-label="Secciones especiales">
          <a href="#" class="nav-new">NEW</a>
          <a href="#">Cotillón</a>
          <a href="#">Outlet</a>
          <a href="#" class="nav-external">Personalizados
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><polyline points="15 3 21 3 21 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </a>
        </nav>
      </div>
    </div>

    <!-- ── Fila 3: nav de categorías ── -->
    <div class="header-cats">
      <div class="wrap header-cats-inner">
        <a href="index.html" class="logo-shield" aria-label="García de Pou — Inicio">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.3 38" aria-hidden="true">
            <path fill="currentColor" d="M0 0v18.328c0 9.064 5.722 16.604 14.144 19.525l.355-.123c8.024-2.785 13.787-10.418 13.787-19.402V0H0zm14.148 29.115c-1.99 0-6.72-.693-6.86-3.496L7.278 8.025h1.196v7.468a5.65 5.65 0 0 1 1.09-.642 8.975 8.975 0 0 1 1.681-.556l.383 1.813c-.49.115-.928.262-1.298.43-1.014.461-1.196.908-1.196 1.065 0 .158.182.604 1.196 1.064.929.423 2.277.708 3.817.708s2.889-.285 3.818-.708c1.014-.46 1.196-.906 1.196-1.064 0-.157-.183-.604-1.196-1.065a7.27 7.27 0 0 0-1.409-.455l.417-1.78c1.017.225 2.048.588 2.814 1.14l.023-7.418h1.197l.005 17.464c0 2.91-4.843 3.626-6.865 3.626zm-2.136-16.582h4.262l-.67 5.204h-2.922l-.67-5.204zm9.732-5.54h-7.105v4.547h-.993V6.993H6.543V5.795h15.2v1.198z"/>
          </svg>
        </a>
        <nav class="nav-cats" aria-label="Categorías principales">
          <div class="nav-item">
            <a href="#" class="nav-item-link${ac==='Un Solo Uso'?' is-active':''}">Un Solo Uso</a>
            <div class="mega-menu" id="megaUnSoloUso" aria-hidden="true">
              <div class="mega-inner">
                <div class="wrap mega-wrap">
                  <div class="mega-desc">
                    <p class="mega-desc-label label">Un solo uso</p>
                    <p class="mega-desc-title">Envases desechables para comida y artículos de un solo uso para profesionales de la hostelería</p>
                    <p class="mega-desc-sub">Restaurantes, hoteles y catering. Más de 6.000 referencias disponibles.</p>
                    <a href="category.html" class="btn-blue mega-desc-cta">Ver todo Un Solo Uso</a>
                  </div>
                  <div class="mega-cols">
                    <ul class="mega-col">
                      <li><a href="category.html">Adornas</a></li><li><a href="category.html">Aluminio / Film estirable</a></li><li><a href="category.html">Baberos</a></li><li><a href="category.html">Bandeja comida para llevar</a></li><li><a href="category.html">Bandejas de plástico desechables</a></li><li><a href="category.html">Bandejas para catering y cajas</a></li><li><a href="category.html">BIONIC</a></li><li><a href="category.html">Blondas</a></li><li><a href="category.html">Bolsas de plástico</a></li><li><a href="category.html">Caminos de mesa</a></li><li><a href="category.html">Conjuntos decorados</a></li><li><a href="category.html">Conos para helados</a></li><li><a href="category.html">Cubiertos desechables</a></li><li><a href="category.html">Cucuruchos de papel</a></li>
                    </ul>
                    <ul class="mega-col">
                      <li><a href="category.html">DRY COTTON</a></li><li><a href="category.html">Embalajes</a></li><li><a href="category.html">Entretenimientos para niños</a></li><li><a href="category.html">ENVASES DE CARTÓN</a></li><li><a href="category.html">Envases compostables</a></li><li><a href="category.html">Envases Microondas</a></li><li><a href="category.html">Envases de plástico</a></li><li><a href="category.html">Envases termoestables</a></li><li><a href="category.html">Etiquetas adhesivas</a></li><li><a href="category.html">FEEL GREEN</a></li><li><a href="category.html">Madera y Bambú</a></li><li><a href="category.html">Manteles de papel</a></li><li><a href="category.html">Manteles individuales</a></li><li><a href="category.html">PAROLE</a></li>
                    </ul>
                    <ul class="mega-col">
                      <li><a href="category.html">PAPAS FREE</a></li><li><a href="category.html">Pajitas</a></li><li><a href="category.html">Palomitas</a></li><li><a href="category.html">Papel Antigrasa</a></li><li><a href="category.html">Pastelería</a></li><li><a href="category.html">Posavasas</a></li><li><a href="category.html">Servilletas de papel</a></li><li><a href="category.html">Tarrinas de papel plisado</a></li><li><a href="category.html">Tarrinas para helados</a></li><li><a href="category.html">THEPACK</a></li><li><a href="category.html">TIMES</a></li><li><a href="category.html">Toallitas impregnadas</a></li><li><a href="category.html">Vajilla desechable</a></li><li><a href="category.html">Vasos desechables</a></li><li><a href="category.html">WOOD</a></li>
                    </ul>
                  </div>
                </div>
                <button class="mega-close" aria-label="Cerrar menú">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                </button>
              </div>
              <div class="mega-footer">
                <div class="wrap mega-footer-inner">
                  <strong>Más de 6.000 productos para la hostelería y restauración</strong>
                  <span>Gran stock en menaje y material de un solo uso</span>
                </div>
              </div>
            </div>
          </div>
          ${navLink('Rotulación')}
          ${navLink('Bar y Buffet')}
          ${navLink('Mesa y Accesorios')}
          ${navLink('Utensilios de Cocina')}
          ${navLink('Limpieza e Higiene')}
          ${navLink('Habitaciones y Acogida')}
          ${navLink('Take Away')}
        </nav>
        <div class="cart-pill sticky-only" role="button" aria-label="Carrito de compra">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="1.5"/><path d="M16 10a4 4 0 01-8 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <span class="cart-count">0</span>
        </div>
      </div>
    </div>

  </header>

  <div class="drawer-overlay" id="drawerOverlay" hidden></div>
  <aside class="mobile-drawer" id="mobileDrawer" aria-hidden="true">
    <div class="drawer-head">
      <a href="index.html" class="drawer-logo" aria-label="García de Pou — Inicio">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.3 38" width="24" height="32" aria-hidden="true">
          <path fill="#002D72" d="M0 0v18.328c0 9.064 5.722 16.604 14.144 19.525l.355-.123c8.024-2.785 13.787-10.418 13.787-19.402V0H0zm14.148 29.115c-1.99 0-6.72-.693-6.86-3.496L7.278 8.025h1.196v7.468a5.65 5.65 0 0 1 1.09-.642 8.975 8.975 0 0 1 1.681-.556l.383 1.813c-.49.115-.928.262-1.298.43-1.014.461-1.196.908-1.196 1.065 0 .158.182.604 1.196 1.064.929.423 2.277.708 3.817.708s2.889-.285 3.818-.708c1.014-.46 1.196-.906 1.196-1.064 0-.157-.183-.604-1.196-1.065a7.27 7.27 0 0 0-1.409-.455l.417-1.78c1.017.225 2.048.588 2.814 1.14l.023-7.418h1.197l.005 17.464c0 2.91-4.843 3.626-6.865 3.626zm-2.136-16.582h4.262l-.67 5.204h-2.922l-.67-5.204zm9.732-5.54h-7.105v4.547h-.993V6.993H6.543V5.795h15.2v1.198z"/>
        </svg>
        <span>García de Pou</span>
      </a>
      <button class="drawer-close" id="drawerClose" aria-label="Cerrar menú">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
    </div>
    <div class="drawer-body">
      <p class="drawer-label">Categorías</p>
      <nav class="drawer-nav" aria-label="Categorías principales">
        <a href="#">Un Solo Uso</a><a href="#">Rotulación</a><a href="#">Bar y Buffet</a>
        <a href="#">Mesa y Accesorios</a><a href="#">Utensilios de Cocina</a>
        <a href="#">Limpieza e Higiene</a><a href="#">Habitaciones y Acogida</a><a href="#">Take Away</a>
      </nav>
      <p class="drawer-label">Destacados</p>
      <nav class="drawer-nav drawer-nav-sm" aria-label="Secciones especiales">
        <a href="#"><img src="img/new-tag.png" alt="Nuevo" class="drawer-badge-new"> Novedades</a>
        <a href="#">Cotillón</a><a href="#">Outlet</a><a href="#">Personalizados</a>
        <a href="#">Looks</a><a href="#">Blog</a><a href="#">Catálogos</a><a href="#">Compra rápida</a>
      </nav>
      <div class="drawer-footer">
        <nav class="drawer-nav drawer-nav-sm" aria-label="Cuenta">
          <a href="#">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
            Mi cuenta
          </a>
        </nav>
        <div class="util-lang drawer-lang" id="drawerLang">
          <button class="util-lang-btn" aria-haspopup="listbox" aria-expanded="false">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 3c-2.2 2.8-3.5 5.6-3.5 9s1.3 6.2 3.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 3c2.2 2.8 3.5 5.6 3.5 9s-1.3 6.2-3.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3 12h18M3.5 7.5h17M3.5 16.5h17" stroke="currentColor" stroke-width="1.5"/></svg>
            <span class="util-lang-current">Español</span>
            <svg class="util-lang-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <ul class="util-lang-dropdown" role="listbox" hidden>
            <li role="option"><button class="util-lang-opt is-active" data-lang="ES">ES <span>Español</span></button></li>
            <li role="option"><button class="util-lang-opt" data-lang="EN">EN <span>English</span></button></li>
            <li role="option"><button class="util-lang-opt" data-lang="FR">FR <span>Français</span></button></li>
            <li role="option"><button class="util-lang-opt" data-lang="PT">PT <span>Português</span></button></li>
            <li role="option"><button class="util-lang-opt" data-lang="DE">DE <span>Deutsch</span></button></li>
          </ul>
        </div>
      </div>
    </div>
  </aside>`;
}

// gdpFooter() — returns <footer> HTML
function gdpFooter() {
  return `<footer class="footer" itemscope itemtype="https://schema.org/Organization">
    <div class="wrap">
      <div class="footer-top">
        <div class="footer-brand">
          <img class="footer-logo" src="https://www.garciadepou.com/static/version1776292596/frontend/Etailers/gpou/es_ES/images/logo.svg" alt="García de Pou" width="150" height="21" itemprop="logo">
          <p itemprop="description">Suministros profesionales para hostelería y restauración. Más de 50 años equipando los mejores negocios de España y Europa.</p>
          <address class="footer-contact" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
            <a href="tel:+34972575500" class="footer-contact-link" itemprop="telephone">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              +34 972 575 500
            </a>
            <a href="mailto:info@garciadepou.com" class="footer-contact-link" itemprop="email">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              info@garciadepou.com
            </a>
          </address>
        </div>
        <nav class="footer-col" aria-label="Productos">
          <h4>Productos</h4>
          <ul>
            <li><a href="#">Un Solo Uso</a></li><li><a href="#">Bar y Buffet</a></li>
            <li><a href="#">Mesa y Accesorios</a></li><li><a href="#">Utensilios de Cocina</a></li>
            <li><a href="#">Rotulación</a></li><li><a href="#">Limpieza e Higiene</a></li>
          </ul>
        </nav>
        <nav class="footer-col" aria-label="Empresa">
          <h4>Empresa</h4>
          <ul>
            <li><a href="#">Sobre nosotros</a></li><li><a href="#">Blog</a></li>
            <li><a href="#">Catálogos</a></li><li><a href="#">Looks</a></li>
            <li><a href="#">Sostenibilidad</a></li>
          </ul>
        </nav>
        <nav class="footer-col" aria-label="Ayuda">
          <h4>Ayuda</h4>
          <ul>
            <li><a href="#">Cómo comprar</a></li><li><a href="#">Envíos y devoluciones</a></li>
            <li><a href="#">Mi cuenta</a></li><li><a href="#">Contacto</a></li>
            <li><a href="#">Privacidad</a></li>
          </ul>
        </nav>
      </div>
      <div class="footer-bottom">
        <span>© 2025 García de Pou. Todos los derechos reservados.</span>
        <nav class="footer-legal" aria-label="Legal">
          <a href="#">Aviso legal</a>
          <a href="#">Privacidad</a>
          <a href="#">Cookies</a>
        </nav>
      </div>
    </div>
  </footer>`;
}

// ── Mount helpers ──────────────────────────────────────────────────────────
// Replaces <div id="gdpHeader"> and <div id="gdpFooter"> with rendered HTML
function gdpMountHeader(opts) {
  const m = document.getElementById('gdpHeader');
  if (!m) return;
  m.outerHTML = gdpHeader(opts);
}
function gdpMountFooter() {
  const m = document.getElementById('gdpFooter');
  if (!m) return;
  m.outerHTML = gdpFooter();
}

// ── Breadcrumb strip (mobile only) ─────────────────────────────────────────
// items: [{ href, label }, ...] — last item without href = current page
// House icon is always rendered as the sticky-left first element.
const _BC_HOUSE = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>';
function gdpBreadcrumb(items) {
  const scrollItems = items.map(item => {
    const el = item.href
      ? `<a href="${item.href}" class="cat-bc-item">${item.label}</a>`
      : `<span class="cat-bc-item cat-bc-current">${item.label}</span>`;
    return `<span class="cat-bc-sep" aria-hidden="true">/</span>${el}`;
  }).join('');
  return `<nav class="cat-bc-strip" aria-label="Ruta de navegación">
  <a href="index.html" class="cat-bc-home" aria-label="Inicio">${_BC_HOUSE}</a>
  <div class="cat-bc-scroll">${scrollItems}</div>
</nav>`;
}
function gdpMountBreadcrumb(items) {
  const m = document.getElementById('gdpBreadcrumb');
  if (!m) return;
  m.outerHTML = gdpBreadcrumb(items);
}
