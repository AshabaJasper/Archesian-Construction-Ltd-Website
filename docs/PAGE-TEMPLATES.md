# Page Template Conventions

## Current Static Page Pattern

The site is pure static HTML. Every page must include:

- `body data-barba="wrapper"`
- `main#main-content data-barba="container"`
- A unique `data-barba-namespace`
- The shared CSS stack in documented order
- CDN scripts before local JS modules
- `js/core/app.js` last

## Shared Shell Pages

All secondary pages load `js/core/shared-shell.js` before the CDN/core app scripts. The shell injects repeated global chrome:

- Skip link
- Custom cursor
- Page loader
- Transition curtain
- Navigation
- Mobile menu
- Footer
- Newsletter modal

This keeps each secondary HTML file focused on its page-specific Barba container while preserving direct-page-load behavior.

## Barba Page Asset Rule

Barba swaps only the page container during click navigation. It does not naturally replace the full document head. `js/core/transitions.js` now reads the incoming document and appends missing stylesheet links before revealing the new page.

Page-specific styles such as `css/pages/about.css` may be linked from their own page file. They should still be cache-busted when changed, because direct page loads and transition-injected styles both use the linked URL.

The transition layer also versions local `.html` links at runtime. This prevents stale cached HTML from making a clicked page show older content until a hard refresh.

## Home Page Exception

`index.html` hardcodes the full shell because it was created first and acts as the complete reference page. Future cleanup may migrate it to the shared shell, but that is not required for the current static deployment.

## Page-Specific Content Rules

- Use `.page-hero` for standard top sections.
- Use `.section`, `.container`, `.grid`, and component classes from `components.css`.
- Use `data-reveal` on section headers, grids, and important content.
- Use existing component hooks where behavior is needed:
  - FAQ: `data-accordion`
  - Projects: `data-project-grid`, `data-project-item`, `data-filter-category`, `data-sort`
  - Quote: `#quote-form`, `[data-step]`, `[data-action]`
  - Newsletter: `data-newsletter-form`

## Documentation Rule

When a page is added, renamed, or materially changed, update:

- `docs/README.md`
- `docs/PROGRESS.md`
- Any architecture or component docs affected by the change

When page navigation behavior changes, run `node tests/navigation-visibility.test.mjs`.

*Last updated: 2026-05-04*
