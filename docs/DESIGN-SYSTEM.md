# Design System Reference

## Color Palette

### Dark Theme (Default)

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0A0A0A` | Page background |
| `--bg-secondary` | `#111111` | Card backgrounds, footer |
| `--bg-tertiary` | `#161616` | Subtle elevation |
| `--bg-card` | `#111111` | Card backgrounds |
| `--bg-card-hover` | `#1A1A1A` | Card hover state |
| `--text-on-dark` | `#FAFAFA` | Primary text |
| `--text-on-dark-secondary` | `#D4D4D4` | Body text |
| `--text-muted` | `#737373` | Captions, metadata |
| `--text-muted-light` | `#A3A3A3` | Subtle labels |

### Light Sections

| Token | Value | Usage |
|---|---|---|
| `--bg-inverse` | `#FAFAFA` | Light section backgrounds |
| `--bg-inverse-secondary` | `#F0F0F0` | Light cards |
| `--text-on-light` | `#0A0A0A` | Text on light backgrounds |
| `--text-on-light-secondary` | `#404040` | Body text on light |

### Accent — Champagne

| Token | Value | Usage |
|---|---|---|
| `--accent` | `#B8956A` | CTAs, eyebrow labels, hover states |
| `--accent-hover` | `#CEAD87` | Button hover |
| `--accent-active` | `#A37E55` | Button active |
| `--accent-muted` | `rgba(184,149,106,0.15)` | Subtle accent backgrounds |

> ⚠️ **Rule:** Accent color should appear on ≤3% of any viewport. Use only for CTAs, eyebrow labels, and interactive hover states.

### Borders

| Token | Value | Usage |
|---|---|---|
| `--border-subtle-dark` | `#1F1F1F` | Subtle borders on dark |
| `--border-dark` | `#2A2A2A` | Stronger borders on dark |
| `--border-subtle-light` | `#E5E5E5` | Subtle borders on light |
| `--border-light` | `#D4D4D4` | Stronger borders on light |

---

## Typography

### Font Families

| Token | Font | Usage |
|---|---|---|
| `--font-display` | Instrument Serif | Headlines, display text, quotes |
| `--font-body` | Inter | Body text, labels, buttons, inputs |

### Type Scale (fluid with `clamp()`)

| Token | Size Range | Usage |
|---|---|---|
| `--fs-display` | 48px → 88px | Hero headlines only |
| `--fs-h1` | 36px → 60px | Page titles |
| `--fs-h2` | 28px → 44px | Section titles |
| `--fs-h3` | 22px → 30px | Sub-headings, card titles |
| `--fs-h4` | 18px → 22px | Small headings |
| `--fs-body-lg` | 18px | Lead paragraphs |
| `--fs-body` | 16px | Default body |
| `--fs-caption` | 14px | Captions, metadata |
| `--fs-eyebrow` | 12px | Eyebrow labels (uppercase) |
| `--fs-small` | 11px | Legal text, footnotes |

### Line Heights

| Token | Value | Usage |
|---|---|---|
| `--lh-display` | 1.05 | Display headlines |
| `--lh-tight` | 1.15 | Headings |
| `--lh-snug` | 1.3 | Sub-headings |
| `--lh-normal` | 1.6 | Body text |
| `--lh-loose` | 1.8 | Descriptions, intros |

### Letter Spacing

| Token | Value | Usage |
|---|---|---|
| `--ls-tight` | -0.02em | Display and H1 headings |
| `--ls-normal` | 0 | Body text |
| `--ls-wide` | 0.05em | Buttons, nav links |
| `--ls-eyebrow` | 0.2em | Eyebrow labels |
| `--ls-ultra-wide` | 0.3em | Special emphasis |

---

## Spacing (8px base grid)

| Token | Value | Pixels |
|---|---|---|
| `--space-2xs` | 0.25rem | 4px |
| `--space-xs` | 0.5rem | 8px |
| `--space-sm` | 1rem | 16px |
| `--space-md` | 1.5rem | 24px |
| `--space-lg` | 2rem | 32px |
| `--space-xl` | 3rem | 48px |
| `--space-2xl` | 4rem | 64px |
| `--space-3xl` | 6rem | 96px |
| `--space-4xl` | 8rem | 128px |
| `--space-5xl` | 10rem | 160px |
| `--space-section` | clamp(4rem, 10vw, 8rem) | Responsive section gap |

---

## Layout

| Token | Value | Usage |
|---|---|---|
| `--max-width` | 1440px | Maximum content width |
| `--content-width` | 800px | Narrow content (articles) |
| `--narrow-width` | 640px | Extra narrow (forms) |
| `--gutter` | clamp(1.5rem, 4vw, 3rem) | Page side padding |
| `--nav-height` | 80px (96px desktop) | Navigation bar height |
| `--nav-height-scrolled` | 64px | Nav height when scrolled |

### CSS Grid Classes

| Class | Columns |
|---|---|
| `.grid` | Base grid (apply with column modifier) |
| `.grid--2` | 2 columns |
| `.grid--3` | 3 columns |
| `.grid--4` | 4 columns |
| `.grid--auto` | Auto-fit (min 300px per column) |
| `.grid--auto-sm` | Auto-fit (min 250px per column) |
| `.grid--asymmetric` | 1fr / 1.5fr |
| `.grid--asymmetric-reverse` | 1.5fr / 1fr |

### Responsive Behavior

- **Mobile (<768px):** All grids collapse to 1 column
- **Tablet (768-1023px):** 3+ column grids become 2 columns
- **Desktop (1024px+):** Full grid layout

---

## Motion

### Easing Functions

| Token | Type | Usage |
|---|---|---|
| `--ease-out-expo` | Expo out | Primary easing — dramatic deceleration |
| `--ease-out-quart` | Quart out | Secondary easing |
| `--ease-in-out-quart` | Quart in-out | Symmetrical transitions |
| `--ease-in-out` | Cubic in-out | Subtle transitions |
| `--ease-spring` | Spring | Bouncy interactions |

### Durations

| Token | Value | Usage |
|---|---|---|
| `--duration-instant` | 100ms | Micro-interactions |
| `--duration-fast` | 200ms | Hover states |
| `--duration-normal` | 400ms | Standard transitions |
| `--duration-slow` | 600ms | Page transitions, major reveals |
| `--duration-reveal` | 900ms | Scroll reveal animations |
| `--duration-page` | 600ms | Page transition curtain |

---

*Last updated: 2026-05-04*
