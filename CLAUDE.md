# García de Pou — Contexto para Claude Code

Sitio web corporativo de **García de Pou**, suministros para hostelería y restauración. Proyecto estático (HTML + CSS + JS vanilla) con un sistema de diseño ya establecido que **debe respetarse**.

## Stack

- HTML5 + CSS puro (sin preprocesadores, sin build)
- JS vanilla: `components.js` (funciones de render compartidas) + `<script>` inline al final de cada página
- Dependencias externas vía CDN:
  - **DM Sans** + **Caveat** (Google Fonts)
  - **Swiper 11** (slider hero + slider "Artículos destacados")
  - **GSAP 3 + ScrollTrigger** (marquees; parallax del hero desactivado)

## Estructura de archivos

```
index.html          # home completa — una sola página
category.html       # página de listado de productos (PLP)
product.html        # página de detalle de producto (PDP)
components.js       # funciones de render de cards (gdpOfferCard, gdpProductCard, gdpVariantCard)
styles.css          # todos los estilos, organizados por sección con comentarios ═══
img/
  ambient/          # fotos de ambiente (hostelería, packaging…)
  product/          # imágenes de producto
  logos/            # 33 logos de colecciones propias GDP (PNG 6133×1409px)
  thepack.svg       # logo de marca The Pack — usado en cards con campo brand
  catalog/          # portada catálogo antigua (no usar)
  catalogo/         # assets del catálogo activos
    hero-01.png     # imagen hero slide catálogo
    banner-portadas.png  # imagen background banner "Un artista en cada portada"
```

No hay framework, no hay router, no hay bundler. Mantenerlo así.

## Sistema de diseño — tokens (definidos en `:root` de styles.css)

### Colores
- `--black: #0A0A0A` — texto principal
- `--white: #FFFFFF`
- `--g50 / g100 / g300 / g500` — escala de grises
- `--blue: #002D72` — **azul corporativo GDP**, primario
- `--blue-80: #1A4490` — hover del azul
- `--blue-10: #EBF0F8` — tinte suave (pill del carrito, acentos)
- `--yellow: #FFD100` — **solo** para ofertas, badges y acentos puntuales. Nunca como color principal.

### Tipografía
- **DM Sans** (300–900) — toda la UI
- **Caveat** (400–600) — script handwritten, solo para acentos decorativos (ej. palabra "personalizados" en banner de diseños)
- Títulos de sección: `font-weight: 900`, `text-transform: uppercase`, `letter-spacing: -.04em`
- Labels / eyebrows: `font-size: 11px`, `font-weight: 600`, `letter-spacing: .14em`, uppercase, color `--g500`
- Body: DM Sans 400

### Layout
- `--container: 100%` — site full-width
- `--gap: clamp(24px, 4vw, 64px)` — padding horizontal del `.wrap`
- `--header-h: 172px`

### Sistema de espaciado — 8-point grid con tokens CSS

**Regla absoluta:** Para toda propiedad `padding`, `margin` o `gap` se usan **siempre las variables `--sp-*`**. Nunca valores px literales en propiedades de espaciado. Nunca clases utilitarias de componente ni `style=""` para spacing.

```css
/* Escala completa disponible en :root */
--sp-4:   4px;    /* solo detalles de iconografía */
--sp-8:   8px;
--sp-12:  12px;
--sp-16:  16px;
--sp-20:  20px;
--sp-24:  24px;
--sp-32:  32px;
--sp-40:  40px;
--sp-48:  48px;
--sp-64:  64px;
--sp-80:  80px;
--sp-96:  96px;
```

Excepciones aceptadas: valores de 1–6px para micro-separaciones en iconografía (líneas del hamburger, gaps de marca tipográfica). Deben estar comentados con el motivo.

**Gap estándar de grids: `var(--sp-16)`** — `.sectors-grid`, `.looks-grid`, `.promo-looks-grid`, Swiper `spaceBetween`. No mezclar con otros valores.

**Si se necesita un valor que no esté en la escala** (p.ej. 28px, 56px), primero verificar si puede redondearse al múltiplo de 8 más cercano. Si es un valor recurrente y justificado, añadir el token a `:root` antes de usarlo.

### Componentes establecidos (reutilizar, no reinventar)
- `.btn` — base de botón. Siempre combinar con variante de color + tamaño:
  - **Color**: `.btn-blue` (primario, fondo azul) · `.btn-outline-blue` (ghost)
  - **Tamaño**: `.btn-sm` (h 32px) · *(default)* (h 44px) · `.btn-lg` (h 56px)
  - Uso: `<a class="btn btn-blue btn-lg">`. En banners y hero: siempre `btn-lg`. En sección-headers "Ver todos": tamaño default.
- `.offer-card` — card de producto. Tres layouts según contexto:
  - **Vertical** (`.offer-card-body`) — usado en `.cat-grid`. Imagen cuadrada arriba + body con código, nombre, precio, pack, acciones + enlace personalizable.
  - **Lista** (`.cat-grid--list`) — modifier que convierte el grid en lista horizontal. Imagen 156px | contenido (grid 2 col: info + acciones). Usado en `#offersGrid` (2 col) y en `category.html` cuando el usuario activa la vista lista.
  - **Variante PDP** (`.offer-card--variant`) — simplificado para sliders de "Otros colores/tamaños". Sin acciones, solo imagen + código + nombre + precio + precio/unidad.
- `.cat-item` — item de lista de categorías con thumbnail que se revela en hover
- `.sector-card` — card de sector profesional
- `.look-item` — card editorial con overlay de gradiente
- `.cart-pill` — pill del carrito

### Patrones visuales recurrentes
- Bordes `1px solid var(--g100)` para separadores finos
- `border-radius` casi inexistente — diseño angular. Excepciones: botones de iconos circulares (flechas de slider, cart add), pill del carrito (999px)
- Hover en cards: `box-shadow: 0 4px 24px rgba(0,0,0,.07)` + `transform: scale(1.05)` en la imagen con `transition: transform .6s cubic-bezier(.16,1,.3,1)`
- Reveals on-scroll vía `data-reveal` + `data-delay` (IntersectionObserver)

---

## Secciones del home (orden actual)

1. **Announcement bar** — marquee azul con claims (envío gratis, +10.000 referencias…)
2. **Header** de 3 filas (utility / brand+search / categorías) — sticky con estado `.scrolled` que colapsa a una sola fila con escudo + cats + carrito
3. **Hero** ⭐ — Swiper 3 slides (ver detalle abajo)
4. **Strip** — marquee azul con categorías
5. **Taglines** — par de frases destacadas centradas
6. **Promo looks** — grid editorial de 5 piezas
7. **Offers** (`#offersGrid`) — `offers-grid cat-grid--list`, 2 columnas, vista lista, `gdpProductCard`
8. **Collections** — marquee infinito de logos de marcas
9. **Categories** — lista tipográfica con numeración 01–12 y thumbnails revelables
10. **Sectors** — grid 4×4 de sectores profesionales
11. **Bestsellers** (`#productsGrid`) — `cat-grid`, 4 columnas, vista vertical, `gdpProductCard`
12. **Custom** ⭐ — banner "Diseños personalizados" (ver detalle abajo)
13. **Portadas banner** ⭐ — banner "Un artista en cada portada" (ver detalle abajo)
14. **Looks** — grid editorial 2×2
15. **Trust** — "Generando confianza desde 1884" con 5 pilares

---

## Sistema de render de cards (`components.js`)

Las cards de producto se generan por JavaScript para que cualquier cambio de estructura HTML se aplique a todos los contextos desde un único fichero.

### Funciones exportadas

| Función | Layout | Usado en |
|---|---|---|
| `gdpOfferCard(d)` | 3 columnas (imagen \| info \| comercio) — **no se usa actualmente** | — |
| `gdpProductCard(d)` | Vertical (`.cat-grid`) o lista (`.cat-grid--list`) | `#offersGrid`, `#productsGrid` (index); `#catGrid1`, `#catGrid2` (category) |
| `gdpVariantCard(d)` | Simplificado, envuelto en `swiper-slide` | `#variantsSwiper`, `#sizesSwiper` en `product.html` |

### Cómo modificar datos de producto

Cada página tiene un IIFE al inicio de su `<script>` inline con los arrays de datos:
- `offersData` / `bestsellersData` → `index.html`
- `catGrid1Data` / `catGrid2Data` → `category.html`
- `variantsData` / `sizesData` → `product.html`

Para cambiar texto, precio o badge de una card: editar el objeto en el array correspondiente.
Para cambiar la estructura HTML de todas las cards de un tipo: editar la función en `components.js`.

### Estructura del objeto de datos

```js
// gdpProductCard — campos completos:
{
  href, img, alt,
  badge: { type: 'discount'|'new', text: '−25%'|'Nuevo' } | null,
  brand: 'img/thepack.svg' | undefined,   // logo de marca, se muestra sobre la imagen (bottom-left)
  personalizable: true | undefined,        // si true, muestra enlace "Personalizable" bajo el CTA
  code, name,
  stars,        // 1–5 (las estrellas están ocultas globalmente con CSS, pero el campo se mantiene)
  ratingCount,
  price, priceOld,   // priceOld: null si no hay precio tachado
  packQty, packUnit, packUnitLabel   // ej. '50 uds', '0,18 €', '/unidad'
}

// gdpVariantCard:
{ href, img, alt, code, name, price, priceUnit }
```

### Tokens de altura de controles

```css
--ctrl-h-sm: 32px;
--ctrl-h:    40px;   /* qty-selector + btn-add-cart — siempre iguales */
--ctrl-h-lg: 48px;
```

### `.offer-personalizable` — enlace "Personalizable"

Renderizado dentro de `.offer-actions` como **`<span>`** (nunca `<a>` — el card ya es un `<a>` y anidar anchors rompe el HTML). Siempre presente en el DOM; cuando `personalizable` no está en los datos se renderiza con clase `offer-personalizable--hidden` (`visibility: hidden`) para mantener la altura uniforme en todos los cards verticales de la misma fila.

```js
// En components.js — se añade al final de offer-actions en gdpProductCard y gdpOfferCard:
${_gdpPersonalizable(d.personalizable)}
```

```css
.offer-personalizable        { flex-basis: 100%; justify-content: center; padding: var(--sp-4) 0; … }
.offer-personalizable--hidden { visibility: hidden; }
/* En contextos flex-direction:column (lista, offers-grid): flex-wrap: nowrap en offer-actions */
```

### Logo de marca en cards (`.offer-brand-wrap`)

Posición: esquina inferior-izquierda de `.offer-card-img`, `position: absolute`.

```js
// En components.js — dentro de offer-card-img:
${d.brand ? `<span class="offer-brand-wrap"><img src="${d.brand}" alt="" class="offer-brand-logo" aria-hidden="true"></span>` : ''}
```

```css
.offer-brand-wrap  { position: absolute; bottom: var(--sp-8); left: var(--sp-8); background: var(--white); }
.offer-brand-logo  { display: block; height: 30px; width: unset; }
```

### Estrellas de valoración — ocultas globalmente

```css
.offer-rating { display: none; }
```

Los campos `stars` y `ratingCount` se mantienen en los datos para no perder la información; solo están ocultos visualmente.

---

## Vista lista / grid en categoría (`category.html`)

Toggle `.cat-view-toggle` a la derecha del selector "Ordenar por" — **solo desktop** (oculto en mobile).

```html
<div class="cat-view-toggle">
  <button class="cat-view-btn" data-view="grid" aria-label="Vista cuadrícula">…</button>
  <button class="cat-view-btn is-active" data-view="list" aria-label="Vista lista">…</button>
</div>
```

JS inline en `category.html`: al hacer clic, añade/quita `.cat-grid--list` en `#catGrid1` y `#catGrid2`, y marca `is-active` en el botón correspondiente. **La vista grid es la predeterminada.**

### `.cat-grid--list` — layout horizontal

Modifier que se aplica sobre `.cat-grid`. Convierte cada card en fila horizontal:

```
[imagen 156px] | [info: código, nombre, precio, pack] [acciones: qty + btn + personalizable]
```

- Imagen: `width: 156px; min-width: 156px; aspect-ratio: 1`
- Body: `display: grid; grid-template-columns: 1fr 160px`
- Acciones: `grid-column: 2; grid-row: 1 / -1; align-self: end; flex-direction: column; flex-wrap: nowrap`

**Especificidad:** `.cat-grid.cat-grid--list` (doble clase) para el override de columnas del grid; `.cat-grid--list .offer-card` para los estilos internos de la card.

---

## PDP — sticky add-to-cart bar (`.pdp-sticky-bar`)

Aparece anclada al pie de la pantalla cuando el CTA principal (`#pdpActions`) sale del viewport hacia arriba. **No se muestra al entrar en la página** — solo después de que el CTA haya sido visible al menos una vez (`hasBeenVisible` flag con `IntersectionObserver`).

- **Desktop**: thumbnail producto + nombre + qty selector + botón añadir (alineados a la derecha)
- **Mobile**: solo qty selector + botón añadir
- El qty selector de la sticky bar se sincroniza con el del formulario principal mediante un `input` event listener
- Clase `.is-visible` (añadida/quitada por JS) controla la aparición con `transform: translateY`

---

## PDP — galería de imágenes

### Flechas de navegación (`.pdp-img-nav`)

Las flechas están **fuera** de `.pdp-main-img` (que tiene `overflow: hidden`) como elemento hermano dentro de `.pdp-gallery`. Se posicionan con CSS grid overlay — misma celda que la imagen principal:

```css
.pdp-img-nav {
  grid-column: 2;
  grid-row: 1;          /* superpuesto sobre .pdp-main-img */
  align-self: end;
  justify-self: start;
  padding: 0 0 var(--sp-16) var(--sp-16);
  pointer-events: none;
}
.pdp-img-nav .pdp-img-btn {
  position: static;     /* override de position:absolute del base */
  pointer-events: all;
}
```

**No usar `position: absolute` con offset en píxels fijos** — al cambiar el ancho de la columna de miniaturas (88px desktop / 72px en 1100px) el offset quedaría desalineado. El enfoque de grid-overlay se adapta automáticamente.

---

## Header — nav centrado

El nav de categorías está centrado en ambos estados (normal y sticky):

```css
/* Normal */
.header-cats-inner { justify-content: center; }
/* El primer ítem lleva border-left para que todos tengan borde a ambos lados */
.nav-cats .nav-item:first-child .nav-item-link { padding-left: 14px; border-left: 1px solid var(--white-15); }

/* Sticky */
.header.scrolled .nav-cats { flex: 1; justify-content: center; }
.header.scrolled .logo-shield { border-right: none; } /* el escudo no tiene borde derecho en sticky */
```

---

## Hero — slider Swiper (sección `#hero`)

Convertido de split estático a **Swiper 3 slides** con loop y autoplay (6 s).

### Slides (orden actual)
1. **Catálogo 2026** — "Catálogo / *2026* / disponible" · imagen `img/catalogo/hero-01.png` · CTAs: "Solicitar catálogo" + "Ver online"
2. **Hostelería** — "Equipa / *la mejor* / hostelería" · imagen `img/ambient/GDP__DSC8223.jpg` · badge +10K
3. **Take Away** — "Packaging / *sostenible* / para llevar" · imagen `img/ambient/GDP__DSC1692_muntatge biodegradables.jpg` · badge ECO

### Anatomía HTML
```html
<section class="hero" id="hero">
  <div class="swiper hero-swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="hero-slide">          <!-- grid 1fr 1fr -->
          <div class="hero-content">…</div>
          <div class="hero-media">…</div>
        </div>
      </div>
      <!-- …más slides… -->
    </div>
    <div class="hero-controls">          <!-- paginación + flechas, lado izquierdo -->
      <div class="hero-pagination"></div>
      <div class="hero-nav">
        <button id="heroPrev">…</button>
        <button id="heroNext">…</button>
      </div>
    </div>
  </div>
</section>
```

### Decisiones técnicas
- `width: 100%` **NO** se aplica a `.swiper-wrapper` — Swiper lo gestiona por JS con inline style.
- `.hero-controls` vive dentro de `.swiper.hero-swiper` pero fuera de `.swiper-wrapper` (patrón correcto de Swiper).
- El parallax GSAP del hero original está **desactivado** (comentado).
- `html` tiene `overflow-x: clip` (no `hidden`). **`clip` no crea scroll container** → `position: sticky` del header funciona. **No cambiar esto.**

---

## Banner "Diseños personalizados" (sección `#custom`)

Ubicado **entre Bestsellers y Looks**. Banner horizontal que promociona el servicio de personalización de productos.

### Anatomía
```html
<section class="custom" id="custom" data-variant="blue">
  <div class="wrap">
    <a href="#" class="custom-banner">
      <div class="custom-pattern">…</div>         <!-- rejilla de iconos SVG de packaging -->
      <div class="custom-badge">…</div>            <!-- badge vertical girado 90° -->
      <div class="custom-copy" style="padding: 0px 0px 0px 3px">
        <h2 class="custom-title">
          <span class="custom-title-bold">Diseños</span>
          <span class="custom-title-script">personalizados</span>   <!-- Caveat -->
          <svg class="custom-underline">…</svg>                     <!-- subrayado amarillo -->
        </h2>
        <p class="custom-sub">…</p>
        <ul class="custom-features">…</ul>          <!-- 3 features con check -->
      </div>
      <div class="custom-cta-wrap">
        <span class="custom-cta">Productos personalizados →</span>
        <span class="custom-cta-hint">+400 referencias disponibles</span>
      </div>
      <span class="custom-corner tl/tr/bl/br"></span> <!-- marcos decorativos -->
    </a>
  </div>
</section>
```

### Decisiones de diseño tomadas
- **Descartado el gradiente multicolor** de la referencia original — no encaja con la sobriedad del resto del site. Se usa el azul corporativo como fondo principal.
- **Iconografía** en SVG line-art reproduce los iconos de packaging del original.
- **Mezcla tipográfica** intencional: "DISEÑOS" en DM Sans 900 uppercase + "personalizados" en Caveat.
- **CTA sin animación de desplazamiento** en hover — por feedback explícito ("quitar la animación del hover en el botón porque se mueve todo y molesta").
- **3 variantes** conmutables vía `data-variant` en `.custom`:
  - `blue` (por defecto) — fondo azul corporativo
  - `yellow` — fondo `--g50` con acentos amarillos, título en azul
  - `multicolor` — homenaje al gradiente original

### Tweaks panel
En `index.html` hay un panel flotante `#tweaks-panel` que permite alternar en vivo las 3 variantes del banner. El estado se persiste en el bloque JSON entre los marcadores `/*EDITMODE-BEGIN*/ … /*EDITMODE-END*/` al inicio del `<script>`.

---

## Banner "Un artista en cada portada" (sección `#portadas-banner`)

Ubicado **entre Custom y Looks**. Banner promocional de la colección de portadas de catálogo.

### Anatomía HTML
```html
<section class="portadas-banner" id="portadas-banner" data-reveal>
  <div class="wrap">
    <div class="portadas-banner-inner">         <!-- position: relative, min-height: 360px -->
      <div class="portadas-banner-copy">        <!-- z-index: 1, flex column, max-width: 520px -->
        <div class="portadas-banner-eyebrow">…</div>
        <h2 class="portadas-banner-title">
          Un artista<br><em>en cada</em> portada
        </h2>
        <a href="#" class="btn btn-blue btn-lg">Ver todas las portadas</a>
      </div>
      <div class="portadas-banner-media">       <!-- position: absolute, inset: 0 -->
        <img src="img/catalogo/banner-portadas.png" …>
      </div>
    </div>
  </div>
</section>
```

### Decisiones de diseño
- Imagen como **fondo completo** (`position: absolute; inset: 0; object-fit: cover`).
- Texto HTML superpuesto — misma tipografía que el hero (peso 900 uppercase + `<em>` italic 300).
- Botón **siempre `btn-lg`** en este contexto.
- **Mobile**: columna única, `min-height: 280px`.

---

## Convenciones a respetar cuando Claude Code edite este proyecto

1. **No introducir frameworks** (React, Vue, Tailwind, etc.) — es HTML/CSS/JS puro a propósito.
2. **Usar tokens de `:root`** — no hardcodear colores ni spacing. Si hace falta un valor nuevo, añadirlo como token.
3. **No usar el amarillo `--yellow` como color principal** — solo acentos.
4. **Mantener el patrón de secciones** — cada sección con su comentario `═══` en CSS y HTML, `id` descriptivo, `.wrap` interior para limitar ancho, `section-title` + `label` eyebrow para los headers.
5. **Reutilizar componentes existentes** antes de crear nuevos. Antes de escribir CSS nuevo, buscar si ya existe una clase que resuelva el mismo problema. Si el componente existe pero necesita un contexto diferente, añadir solo el override mínimo necesario. Nunca duplicar estilos visuales con otro nombre.
6. **Responsive** con media queries estándar: breakpoints ~1100 / 900 / 720 / 600 / 480.
7. **DM Sans primero**. Caveat solo para acentos decorativos muy puntuales.
8. **Reveals on-scroll** — si se añade contenido nuevo, incluir `data-reveal` + `data-delay` opcional (1–6).
9. **Botones en banners y hero siempre `btn-lg`**. En cabeceras de sección ("Ver todos") tamaño default. `btn-sm` solo para acciones secundarias en contextos compactos.
10. **`html { overflow-x: clip }` — no tocar nunca.** Es la única regla que elimina el desbordamiento horizontal sin crear un scroll container. Si se cambia a `hidden`, el header sticky puede romperse.
11. **Imágenes en `img/`** — todas las imágenes usadas en el proyecto deben estar en `img/` o sus subcarpetas. No usar rutas a `unused-img/`.
12. **Spacing solo con variables `--sp-*`** — Nunca `padding: 24px` literal. Nunca `style=""` para márgenes o paddings.
13. **Norma de botones "Ver todos" en mobile** — Se ocultan del header y aparecen debajo del contenido en un `.wrap.section-footer-mobile`.
14. **Badges de "Nuevo"** — `.drawer-badge` y `.offer-badge--new` deben tener siempre el mismo color verde (`#C5E63D` / `#2F4A05`).
15. **Nunca anidar `<a>` dentro de `<a>`** — las cards son `<a>`, por lo que cualquier elemento interactivo interno (como `.offer-personalizable`) debe ser `<span>`, `<button>` u otro elemento no-anchor.

---

## Decisiones mobile — sesión 2025-05 (resumen)

- **Header mobile** → fondo `var(--blue)`, hamburger blanco, buscador con fondo `var(--blue-10)`
- **`--gap` en `@media (max-width: 720px)`** → `16px` (override del token global)
- **`.section-title` en mobile** → `text-align: center`
- **`.trust-title br`** → `display: none` en mobile (texto en una línea)
- **Promo-looks** → grid irregular de desktop se convierte en 2 columnas auto-flow en `@media 720px`
- **Stats grid** → `repeat(2,1fr)` en mobile
- **Brands section (`#brands .sectors-grid`)** → `repeat(2,1fr)` en mobile
- **Offer-card en mobile (offers-grid)** → imagen `aspect-ratio: 1; align-self: start`
- **Marquee colecciones** → `15s`
- **Footer** → semántica `<nav aria-label>`, `<address>`, Schema.org, responsive single-column

## Cómo previsualizar

Abrir `index.html` directamente en el navegador. No hace falta servidor local (las dependencias son todas CDN).

---

## Figma — Generación del sistema de diseño

El objetivo es crear un archivo Figma que refleje fielmente el sistema de diseño del proyecto: variables, componentes y páginas. Usar las herramientas MCP de Figma (`mcp__figma__*`) disponibles en Claude Code.

### Variables de color → Figma

| Token CSS | Hex | Nombre en Figma |
|---|---|---|
| `--black` | #0A0A0A | Color/Black |
| `--white` | #FFFFFF | Color/White |
| `--g50` | #F7F7F7 | Color/Gray/50 |
| `--g100` | #E8E8E8 | Color/Gray/100 |
| `--g300` | #ADADAD | Color/Gray/300 |
| `--g500` | #737373 | Color/Gray/500 |
| `--blue` | #002D72 | Color/Blue/Primary |
| `--blue-80` | #1A4490 | Color/Blue/Hover |
| `--blue-10` | #EBF0F8 | Color/Blue/Tint |
| `--yellow` | #FFD100 | Color/Yellow |

### Variables de tipografía → Figma

| Uso | Font | Weight | Size | Transform |
|---|---|---|---|---|
| Título sección | DM Sans | 900 | 32–48px | UPPERCASE |
| Eyebrow / label | DM Sans | 600 | 11px | UPPERCASE, ls +0.14em |
| Body | DM Sans | 400 | 13–14px | — |
| Acento decorativo | Caveat | 400–600 | variable | — |

### Componentes a crear en Figma

#### Botones — `.btn`
- **Variantes**: Color (`Blue` / `Outline Blue`) × Tamaño (`SM 32px` / `Default 44px` / `LG 56px`)
- Radio: 0 (angular). Icon opcional izquierda/derecha.

#### Product Card — `.offer-card`
- Vista vertical: imagen cuadrada + body (código, nombre, precio, pack, qty+añadir, personalizable)
- Vista lista: imagen 156px + info (2 col: contenido | acciones)
- Variantes: con/sin badge · con/sin logo marca · con/sin enlace personalizable

#### Category Pill — `.cat-pill` / `.cat-pill--sm`
- Thumb circular + label.

#### Sector Card, Look Item, Cart Pill — sin cambios respecto a la implementación CSS.

#### Header — desktop y mobile
- Desktop: 3 filas (utility / brand+search / nav centrado)
- Mobile: hamburger + logo + carrito. Estado `.scrolled` colapsado.

#### PDP — sticky bar
- Desktop: thumb + nombre a la izquierda · qty + botón a la derecha
- Mobile: solo qty + botón

#### Filter Sidebar / Filter Drawer — sin cambios.

#### Banners
- **Custom banner** (`#custom`): fondo azul, rejilla SVG, título DM Sans + Caveat, CTA
- **Portadas banner** (`#portadas-banner`): imagen full-cover + copy superpuesto + botón

### Páginas a generar en Figma

#### 1. Home (`index.html`)
Announcement bar → Header → Hero (3 slides) → Strip → Taglines → Promo looks → Offers (lista 2 col) → Collections → Categories → Sectors → Bestsellers (grid 4 col) → Custom → Portadas banner → Looks → Trust → Footer

#### 2. Category PLP (`category.html`)
Header → Cat banner → Subcat bar → [Mobile: filter pill-bar] → Cat section (sidebar + toggle vista + grid/lista + paginación) → SEO text → Footer

### Convenciones de naming en Figma
- Componentes: `NombreComponente/Variante` — ej. `Button/Blue/LG`, `ProductCard/Lista/ConBadge`
- Páginas: `🏠 Home`, `📋 Category PLP`
- Frames de página: `Desktop 1440` / `Mobile 390`
