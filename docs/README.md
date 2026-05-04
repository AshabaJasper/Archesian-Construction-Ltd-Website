# [CLIENT NAME] — Construction Corporate Website

## 🧠 Project Brain — Master Documentation

> **This is the master project reference.** Every AI agent, developer, or contributor must read this before touching any code. Update this document whenever the project changes.

---

## Quick Start

1. Install [VS Code Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Open `index.html`
3. Right-click → **Open with Live Server**
4. Browse at `http://127.0.0.1:5500`

> ⚠️ **Barba.js page transitions require HTTP** — opening HTML files via `file://` will not work. Always use Live Server.

---

## Project Overview

| Field | Value |
|---|---|
| **Type** | Multi-page static corporate website |
| **Client** | [CLIENT NAME] (Construction company) |
| **Aesthetic** | Black & white luxury editorial, cinematic |
| **Stack** | HTML + CSS + Vanilla JS (CDN libraries) |
| **Deployment** | Hostinger (drag-and-drop file upload) |
| **Build Step** | ❌ None — pure static files |
| **CMS** | ❌ None — content lives in HTML |
| **Framework** | ❌ None — zero dependencies to install |

---

## Design Philosophy

- **Inspired by:** Bjarke Ingels Group, Foster + Partners, Zaha Hadid Architects
- **Palette:** Strict monochrome (#0A0A0A ↔ #FAFAFA) with champagne accent (#B8956A) used ≤3% per view
- **Typography:** Instrument Serif (headlines) + Inter (body) — Google Fonts
- **Motion:** Cinematic scroll reveals, page transitions, custom cursor
- **Layout:** Editorial asymmetric grids, full-bleed imagery, generous whitespace

---

## CDN Libraries

| Library | Version | Purpose |
|---|---|---|
| GSAP + ScrollTrigger | 3.12.x | Scroll-driven animations |
| Lenis | 1.3.x | Smooth scroll |
| Barba.js | 2.10.x | Page transitions |
| Swiper | 11.x | Carousels |
| PhotoSwipe | 5.4.x | Lightbox |
| Lucide Icons | latest | SVG icons |
| Google Fonts | — | Instrument Serif + Inter |

---

## File Structure

```
├── index.html                 ← HOME (you are here)
├── about.html                 ← About Us
├── projects.html              ← Projects Gallery
├── project-detail.html        ← Project Case Study (template)
├── services.html              ← Services Overview
├── service-detail.html        ← Service Detail (template)
├── team.html                  ← Team Listing
├── team-detail.html           ← Team Member Detail
├── process.html               ← Our Process
├── credentials.html           ← Awards & Certifications
├── insights.html              ← Blog Listing
├── insight-detail.html        ← Blog Post
├── faq.html                   ← FAQ
├── contact.html               ← Contact
├── quote.html                 ← Get a Quote (multi-step)
├── book-consultation.html     ← Book Consultation
├── tender.html                ← Tender Submission
├── careers.html               ← Careers
├── career-detail.html         ← Job Detail
├── privacy.html               ← Privacy Policy
├── terms.html                 ← Terms of Use
├── cookies.html               ← Cookie Policy
│
├── css/
│   ├── design-system.css      ← Reset, tokens, typography, grid, utilities
│   ├── layout.css             ← Nav, footer, page shell, hero, section headers
│   ├── components.css         ← Buttons, cards, forms, badges
│   ├── animations.css         ← Reveals, cursor, marquee, parallax, loader
│   └── pages/
│       ├── home.css           ← Home-specific styles
│       ├── about.css          ← (TODO)
│       ├── projects.css       ← (TODO)
│       └── ...
│
├── js/
│   ├── core/
│   │   ├── utils.js           ← Debounce, throttle, lerp, viewport helpers
│   │   ├── shared-shell.js    ← Shared nav, footer, loader, cursor, newsletter shell
│   │   ├── smooth-scroll.js   ← Lenis + GSAP ticker sync
│   │   ├── animations.js      ← ScrollTrigger reveal system
│   │   ├── cursor.js          ← Custom cursor with lerp
│   │   ├── nav.js             ← Sticky nav, mobile menu
│   │   ├── transitions.js     ← Barba.js page transitions
│   │   └── app.js             ← Main init orchestrator
│   └── components/
│       ├── counter.js         ← Animated number counters
│       ├── accordion.js       ← FAQ accordion
│       ├── slider.js          ← Swiper carousels
│       ├── before-after.js    ← Image comparison slider
│       ├── filter.js          ← Project filter/sort
│       ├── forms.js           ← Form validation & submission
│       ├── quote-form.js      ← Multi-step quote form
│       └── newsletter.js      ← Newsletter modal
│
├── assets/
│   ├── images/
│   │   ├── hero/              ← Hero background images
│   │   ├── projects/          ← Project photography
│   │   ├── team/              ← Team portraits
│   │   ├── services/          ← Service imagery
│   │   ├── about/             ← About page imagery
│   │   ├── testimonials/      ← Client avatars
│   │   ├── logos/             ← Client/press logos
│   │   └── icons/             ← Custom SVG icons
│   ├── videos/                ← Hero videos, project footage
│   └── documents/             ← Downloadable PDFs
│
└── docs/                      ← 🧠 THIS FOLDER — Project brain
    ├── README.md              ← Project overview (this file)
    ├── ARCHITECTURE.md        ← Technical deep-dive
    ├── DESIGN-SYSTEM.md       ← Complete design token reference
    ├── ANIMATION-GUIDE.md     ← Animation patterns & data attributes
    ├── COMPONENT-PATTERNS.md  ← Copy-paste HTML for every component
    ├── PAGE-TEMPLATES.md      ← Page structure rules
    └── PROGRESS.md            ← Build progress tracker
```

---

## Build Progress

| Page | Status | Notes |
|---|---|---|
| **index.html** (Home) | ✅ Complete | Hardcoded full shell + homepage sections |
| **about.html** | ✅ Craft pass complete | Story, operating method, proof, standards, CTA, dedicated `about.css` |
| **projects.html** | ✅ Complete | Filter/sort hooks wired |
| **project-detail.html** | ✅ Complete | Case study template |
| **services.html** | ✅ Complete | Service grid |
| **service-detail.html** | ✅ Complete | Service detail template |
| **team.html** | ✅ Complete | Team listing |
| **team-detail.html** | ✅ Complete | Team profile template |
| **process.html** | ✅ Complete | Process timeline |
| **credentials.html** | ✅ Complete | Awards/certifications |
| **contact.html** | ✅ Complete | Contact form |
| **quote.html** | ✅ Complete | Multi-step quote form |
| **insights.html** | ✅ Complete | Blog listing |
| **insight-detail.html** | ✅ Complete | Article template |
| **faq.html** | ✅ Complete | Accordion FAQ |
| **careers.html** | ✅ Complete | Role listing |
| **career-detail.html** | ✅ Complete | Role detail template |
| **book-consultation.html** | ✅ Complete | Consultation form |
| **tender.html** | ✅ Complete | Tender form |
| **privacy.html** | ✅ Complete | Legal page |
| **terms.html** | ✅ Complete | Legal page |
| **cookies.html** | ✅ Complete | Legal page |

---

## Open Questions for Client

1. **Client name & founding year** — replace `[CLIENT NAME]` and `[YEAR]`
2. **Accent color** — Champagne `#B8956A` or strict B&W?
3. **Contact details** — emails, phones, address(es)
4. **Social media** — which platforms and URLs
5. **Form endpoint** — Formspree, Web3Forms, or other?
6. **Map provider** — Mapbox token or static Google Maps embed?
7. **Live chat** — which provider (Crisp, Tidio, etc.)?

---

## Current Verification

- `node tests/navigation-visibility.test.mjs` checks normal Barba clicks, incoming page visibility, page-specific stylesheet loading, and mobile overflow/nav behavior.

---

*Last updated: 2026-05-04*
