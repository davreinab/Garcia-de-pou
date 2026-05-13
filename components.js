// GDP Product Card render functions — shared across index, category, product pages

const _SF = '<svg class="rating-star" width="13" height="13" viewBox="0 0 24 24" fill="#FFD100" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
const _SE = '<svg class="rating-star" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D4D4D4" stroke-width="1.5" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke-linejoin="round"/></svg>';
const _CI = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="1.8"/><path d="M16 10a4 4 0 01-8 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

function _gdpStars(n) {
  let s = '';
  for (let i = 1; i <= 5; i++) s += i <= n ? _SF : _SE;
  return s;
}

function _gdpBadge(b) {
  if (!b) return '';
  const c = b.type === 'discount' ? 'offer-badge offer-badge--discount' : 'offer-badge offer-badge--new';
  return `<span class="${c}">${b.text}</span>`;
}

function _gdpActions() {
  return `<div class="qty-selector"><button class="qty-btn" onclick="adjustQty(this,-1)">−</button><input type="number" class="qty-input" value="1" min="1"><button class="qty-btn" onclick="adjustQty(this,1)">+</button></div><button class="btn-add-cart">${_CI} Añadir</button>`;
}

// 3-column layout — for .offers-grid
function gdpOfferCard(d) {
  return `<a href="${d.href}" class="offer-card">
  <div class="offer-card-img">${_gdpBadge(d.badge)}<img src="${d.img}" alt="${d.alt}" loading="lazy"></div>
  <div class="offer-card-info">
    <span class="offer-code">${d.code}</span>
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
  </div>
  <div class="offer-card-commerce">
    <div class="offer-pricing">
      <span class="offer-price">${d.price}</span>
      ${d.priceOld ? `<span class="offer-price-old">${d.priceOld}</span>` : ''}
    </div>
    <div class="offer-actions">${_gdpActions()}</div>
  </div>
</a>`;
}

// Vertical layout — for .products-grid and .cat-grid
function gdpProductCard(d) {
  return `<a href="${d.href}" class="offer-card">
  <div class="offer-card-img">${_gdpBadge(d.badge)}<img src="${d.img}" alt="${d.alt}" loading="lazy"></div>
  <div class="offer-card-body">
    <span class="offer-code">${d.code}</span>
    <p class="offer-name">${d.name}</p>
    <div class="offer-rating">
      <span class="offer-rating-stars">${_gdpStars(d.stars)}</span>
      <span class="offer-rating-count">(${d.ratingCount})</span>
    </div>
    <div class="offer-pricing">
      <span class="offer-price">${d.price}</span>
      ${d.priceOld ? `<span class="offer-price-old">${d.priceOld}</span>` : ''}
    </div>
    <div class="offer-pack">
      <span class="offer-pack-label"><strong>Paquete:</strong> ${d.packQty}</span>
      <span class="offer-pack-unit"><b>${d.packUnit}</b>${d.packUnitLabel}</span>
    </div>
    <div class="offer-actions">${_gdpActions()}</div>
  </div>
</a>`;
}

// Variant card (swiper-slide) — for .pdp-variants
function gdpVariantCard(d) {
  return `<div class="swiper-slide"><a href="${d.href}" class="offer-card offer-card--variant">
  <div class="offer-card-img"><img src="${d.img}" alt="${d.alt}" loading="lazy"></div>
  <div class="offer-card-body">
    <span class="offer-code">${d.code}</span>
    <p class="offer-name">${d.name}</p>
    <div class="offer-pricing"><span class="offer-price">${d.price}</span></div>
    <span class="offer-price-unit">${d.priceUnit}</span>
  </div>
</a></div>`;
}
