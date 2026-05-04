# Technical Architecture

## Overview

This is a **pure static website** — no build step, no bundler, no framework. All files are served as-is from Hostinger's file manager. Libraries are loaded via CDN `<script>` and `<link>` tags.

---

## Initialization Flow

When any page loads, the following happens in order:

```
1. Browser parses HTML
2. CSS files load (design-system → layout → components → animations → page-specific)
3. CDN libraries load (GSAP, Lenis, Barba, Swiper)
4. JS files load (utils → smooth-scroll → animations → cursor → nav → transitions → app → components)
5. App.init() fires on DOMContentLoaded:
   a. SmoothScroll.init()     → Lenis + GSAP ticker sync
   b. RevealAnimations.init() → Scans [data-reveal] elements, creates ScrollTriggers
   c. CustomCursor.init()     → Lerp cursor on desktop only
   d. Navigation.init()       → Sticky nav, mobile menu
   e. PageTransitions.init()  → Barba.js route handling
   f. App.initComponents()    → Counter, Slider, Accordion, etc.
   g. App.hideLoader()        → Fades out page loader
   h. App.scheduleNewsletter()→ 30s delay for newsletter modal
```

Most secondary pages load `js/core/shared-shell.js` before the core app modules. The shared shell injects repeated static chrome when a page does not hardcode it: skip link, custom cursor, page loader, transition curtain, navigation, mobile menu, footer, and newsletter modal.

`index.html` currently hardcodes the full shell and acts as the complete reference page. The other pages keep their HTML focused on the Barba container and use the shared shell to avoid duplicating navigation/footer markup across 20+ static files.

---

## CSS Architecture

### Load Order (MUST be maintained)

```html
<!-- 1. Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- 2. Vendor CSS (Swiper) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">

<!-- 3. Design System (MUST be first — defines all tokens) -->
<link rel="stylesheet" href="css/design-system.css">

<!-- 4. Layout (depends on design tokens) -->
<link rel="stylesheet" href="css/layout.css">

<!-- 5. Components (depends on design tokens) -->
<link rel="stylesheet" href="css/components.css">

<!-- 6. Animations (depends on design tokens) -->
<link rel="stylesheet" href="css/animations.css">

<!-- 7. Page-specific CSS (depends on everything above) -->
<link rel="stylesheet" href="css/pages/home.css">
```

### Token System

All visual values use CSS custom properties from `design-system.css`:
- Colors: `--bg-primary`, `--text-on-dark`, `--accent`, etc.
- Typography: `--font-display`, `--fs-h1`, `--lh-tight`, etc.
- Spacing: `--space-xs` through `--space-5xl` (8px base grid)
- Motion: `--ease-out-expo`, `--duration-normal`, etc.
- Layout: `--max-width`, `--gutter`, `--nav-height`, etc.

**Never hardcode values.** Always use CSS custom properties.

---

## JavaScript Architecture

### Load Order (MUST be maintained)

```html
<!-- 1. CDN Libraries (loaded first) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/lenis@1.3.3/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@barba/core@2.10.0/dist/barba.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<!-- 2. Core modules (dependency order) -->
<script src="js/core/shared-shell.js"></script>
<script src="js/core/utils.js"></script>
<script src="js/core/smooth-scroll.js"></script>
<script src="js/core/animations.js"></script>
<script src="js/core/cursor.js"></script>
<script src="js/core/nav.js"></script>
<script src="js/core/transitions.js"></script>

<!-- 3. Component modules (any order) -->
<script src="js/components/counter.js"></script>
<script src="js/components/slider.js"></script>
<script src="js/components/accordion.js"></script>
<!-- ... only include components used on this page -->

<!-- 4. App.js (MUST be last — orchestrates everything) -->
<script src="js/core/app.js"></script>
```

### Module Pattern

Every JS module follows this pattern:

```javascript
const ModuleName = {
  init(container = document) {
    // Find elements within container
    // Bind events
    // Setup state
  },

  destroy() {
    // Cleanup: remove listeners, kill animations
  },
};

window.ModuleName = ModuleName;
```

- Modules register on `window` so App.js can check `if (window.ModuleName)`
- The `container` parameter enables re-initialization after Barba.js page swaps
- `destroy()` is called before page transitions to prevent memory leaks

---

## HTML Page Structure

Every page follows this Barba.js-compatible structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Page Title] — [CLIENT NAME]</title>
  <meta name="description" content="...">
  <!-- CSS files -->
</head>
<body data-barba="wrapper">
  <!-- Skip link -->
  <a href="#main-content" class="skip-link">Skip to content</a>

  <!-- Custom cursor -->
  <div class="custom-cursor" aria-hidden="true"></div>

  <!-- Page loader -->
  <div class="page-loader"><div class="page-loader__bar"></div></div>

  <!-- Page transition curtain -->
  <div class="transition-curtain" aria-hidden="true"></div>

  <!-- Navigation (same on every page) -->
  <nav class="nav">...</nav>

  <!-- Mobile menu (same on every page) -->
  <div class="mobile-menu">...</div>

  <!-- Page content wrapper (Barba.js swaps this) -->
  <main id="main-content" data-barba="container" data-barba-namespace="home">
    <!-- Page sections go here -->
  </main>

  <!-- Footer (same on every page) -->
  <footer class="footer">...</footer>

  <!-- Newsletter modal -->
  <div class="newsletter-modal">...</div>

  <!-- Scripts -->
</body>
</html>
```

### Key Rules

1. `data-barba="wrapper"` goes on `<body>`
2. `data-barba="container"` goes on `<main>` — Barba.js swaps this on transitions
3. `data-barba-namespace="home"` identifies the page for transition-specific logic
4. Navigation, footer, cursor, loader, and transition curtain are **outside** the Barba container
5. Page-specific CSS and components vary per page

---

## Barba.js Page Transitions

When a user clicks an internal link:

1. **Leave phase** (600ms):
   - All ScrollTriggers killed
   - Lenis paused
   - Black curtain sweeps in from left
2. **Content swap** (instant):
   - Old `[data-barba="container"]` removed
   - New page content injected
3. **Enter phase** (600ms):
   - Curtain sweeps off to right
   - Lenis restarted
   - ScrollTriggers re-created
   - Components re-initialized
   - Active nav link updated

---

## Performance Guidelines

1. **Images:** Use WebP format, lazy load with `loading="lazy"`, always provide `width`/`height`
2. **Fonts:** Preconnect to Google Fonts, use `display=swap`
3. **CSS:** No unused styles — each page only loads its own page CSS
4. **JS:** Only include component scripts that the page actually uses
5. **Animations:** Use `will-change` sparingly, prefer `transform`/`opacity` for GPU acceleration
6. **Reduced motion:** All animations respect `prefers-reduced-motion: reduce`

---

*Last updated: 2026-05-04*
