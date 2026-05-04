# Animation Guide

## Scroll Reveal System

All scroll-driven animations use GSAP ScrollTrigger. Elements are targeted via `data-reveal` attributes in HTML.

### How It Works

1. CSS (`animations.css`) sets initial states (invisible, translated)
2. JS (`animations.js`) scans for `[data-reveal]` elements
3. GSAP ScrollTrigger animates them when they enter the viewport (at 85% from top)
4. After animation, the `.revealed` class is added

### Available Reveal Types

```html
<!-- Fade up (most common) — 40px Y translation -->
<div data-reveal="fade-up">...</div>

<!-- Fade down — -40px Y translation -->
<div data-reveal="fade-down">...</div>

<!-- Fade from left — -60px X translation -->
<div data-reveal="fade-left">...</div>

<!-- Fade from right — 60px X translation -->
<div data-reveal="fade-right">...</div>

<!-- Simple fade — opacity only -->
<div data-reveal="fade">...</div>

<!-- Scale in — 0.92 → 1 scale -->
<div data-reveal="scale-in">...</div>

<!-- Clip reveal — bottom-to-top clip-path -->
<div data-reveal="clip-up">...</div>

<!-- Split text — word-by-word reveal (for manifesto/quote text) -->
<p data-reveal="split-text">Words appear one by one</p>

<!-- Stagger — children animate in sequence -->
<div data-reveal="stagger">
  <div>Child 1</div>
  <div>Child 2</div>
  <div>Child 3</div>
</div>
```

### Modifiers

```html
<!-- Delay (seconds) -->
<div data-reveal="fade-up" data-reveal-delay="0.2">...</div>

<!-- Custom duration (seconds, default 0.9) -->
<div data-reveal="fade-up" data-reveal-duration="1.2">...</div>
```

### Recommended Usage

| Element | Recommended Reveal |
|---|---|
| Section headings | `fade-up` |
| Body paragraphs | `fade-up` with 0.1–0.2s delay |
| Images | `clip-up` or `scale-in` |
| Card grids | `stagger` on container |
| Stats/numbers | `fade-up` (counters animate separately) |
| Manifesto text | `split-text` |
| Side content | `fade-left` or `fade-right` |

---

## Parallax Effects

```html
<!-- Speed value: 0.1 (subtle) to 0.5 (dramatic) -->
<div class="parallax-container">
  <img src="image.jpg" data-parallax="0.2" class="parallax-image" alt="">
</div>
```

---

## Marquee Text Strips

```html
<div class="marquee">
  <div class="marquee__track">
    <div class="marquee__content">
      <span class="marquee__text">Text One</span>
      <span class="marquee__separator"></span>
      <span class="marquee__text marquee__text--outline">Text Two</span>
      <span class="marquee__separator"></span>
    </div>
    <!-- Duplicate for seamless loop -->
    <div class="marquee__content" aria-hidden="true">
      <span class="marquee__text">Text One</span>
      <span class="marquee__separator"></span>
      <span class="marquee__text marquee__text--outline">Text Two</span>
      <span class="marquee__separator"></span>
    </div>
  </div>
</div>
```

Modifiers: `.marquee--reverse`, `.marquee--slow`, `.marquee--fast`

---

## Animated Number Counters

```html
<span data-counter="250" data-counter-suffix="+">0</span>
```

| Attribute | Purpose |
|---|---|
| `data-counter` | Target number |
| `data-counter-suffix` | Text after number (e.g., "+", "%") |
| `data-counter-prefix` | Text before number (e.g., "$") |
| `data-counter-duration` | Animation duration in seconds (default 2) |

---

## Custom Cursor

The cursor is a 12px white dot with `mix-blend-mode: difference`. It:
- Follows the mouse with lerp smoothing
- Expands to 48px on interactive elements (links, buttons)
- Shows text via `data-cursor-text` attribute
- Only appears on hover-capable devices
- Respects `prefers-reduced-motion`

```html
<!-- Show "View" text on cursor hover -->
<a href="#" data-cursor-text="View">...</a>
```

---

## Page Transitions

Barba.js handles SPA-like transitions:

1. Black curtain sweeps from left to right (600ms)
2. Content is swapped
3. Curtain sweeps off to right (600ms)
4. All scroll reveals re-initialize

**Important:** All internal links should use standard `<a href="page.html">` tags. Barba.js intercepts them automatically.

To exclude a link from Barba.js (e.g., external links, downloads):

```html
<a href="https://external.com" data-barba-prevent>External Link</a>
```

---

## Reduced Motion

All animations automatically disable when `prefers-reduced-motion: reduce` is set:
- Scroll reveals show immediately (no animation)
- Marquee stops
- Custom cursor hides
- Parallax disables
- Page loader bar stops animating

---

*Last updated: 2026-05-04*
