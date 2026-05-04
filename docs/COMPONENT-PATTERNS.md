# Component HTML Patterns

> Copy-paste these HTML patterns when building new pages. All classes reference `components.css`.

---

## Buttons

```html
<!-- Primary (champagne fill) -->
<a href="quote.html" class="btn btn--primary">
  Get a Quote
  <svg class="btn__icon"><use href="#icon-arrow-right"></use></svg>
</a>

<!-- Secondary (white outline on dark) -->
<a href="projects.html" class="btn btn--secondary">View Projects</a>

<!-- Ghost (underline on hover) -->
<a href="#" class="btn btn--ghost">Learn More</a>

<!-- White solid (for dark bg) -->
<a href="#" class="btn btn--white">Contact Us</a>

<!-- Dark solid (for light bg sections) -->
<a href="#" class="btn btn--dark">Explore</a>

<!-- Small / Large -->
<a href="#" class="btn btn--primary btn--sm">Small</a>
<a href="#" class="btn btn--primary btn--lg">Large</a>

<!-- Full width -->
<a href="#" class="btn btn--primary btn--block">Full Width</a>
```

---

## Section Header

```html
<!-- Left-aligned (default) -->
<div class="section-header" data-reveal="fade-up">
  <span class="text-eyebrow text-eyebrow--accent section-header__eyebrow">Eyebrow Label</span>
  <h2 class="section-header__title">Section Title</h2>
  <p class="section-header__description">Brief description of this section.</p>
</div>

<!-- Center-aligned -->
<div class="section-header section-header--center" data-reveal="fade-up">
  <span class="text-eyebrow text-eyebrow--accent section-header__eyebrow">Eyebrow</span>
  <h2 class="section-header__title">Centered Title</h2>
  <p class="section-header__description">Center-aligned description text.</p>
</div>
```

---

## Project Card

```html
<a href="project-detail.html" class="project-card" data-cursor-text="View">
  <div class="project-card__image-wrapper">
    <img src="assets/images/projects/project-1.png" alt="Project name" class="project-card__image" loading="lazy" width="600" height="450">
    <div class="project-card__overlay"></div>
  </div>
  <div class="project-card__content">
    <span class="project-card__category">Residential</span>
    <h3 class="project-card__title">Project Name</h3>
    <div class="project-card__meta">
      <span>Location</span>
      <span class="project-card__meta-divider">|</span>
      <span>2024</span>
    </div>
  </div>
</a>
```

---

## Service Card

```html
<a href="service-detail.html" class="service-card">
  <svg class="service-card__icon"><!-- Icon SVG --></svg>
  <h3 class="service-card__title">Service Name</h3>
  <p class="service-card__description">Brief description of this service offering.</p>
  <svg class="service-card__arrow"><!-- Arrow icon --></svg>
</a>
```

---

## Team Card

```html
<a href="team-detail.html" class="team-card">
  <div class="team-card__image-wrapper">
    <img src="assets/images/team/member-1.png" alt="Name" class="team-card__image" loading="lazy" width="400" height="533">
  </div>
  <div class="team-card__content">
    <h3 class="team-card__name">Full Name</h3>
    <p class="team-card__role">Title / Position</p>
  </div>
</a>
```

---

## Testimonial Card

```html
<div class="testimonial-card">
  <div class="testimonial-card__quote-mark">"</div>
  <p class="testimonial-card__text">
    Quote text from the client goes here.
  </p>
  <div class="testimonial-card__author">
    <img src="assets/images/testimonials/client-1.jpg" alt="Client name" class="testimonial-card__avatar">
    <div>
      <div class="testimonial-card__author-name">Client Name</div>
      <div class="testimonial-card__author-role">CEO, Company Name</div>
    </div>
  </div>
</div>
```

---

## Stat Card (with counter)

```html
<div class="stat-card">
  <div class="stat-card__number">
    <span data-counter="250" data-counter-suffix="+">0</span>
  </div>
  <div class="stat-card__label">Projects Completed</div>
</div>
```

---

## Page Hero

```html
<!-- Full-height hero with background image -->
<section class="page-hero page-hero--full">
  <div class="page-hero__bg">
    <img src="assets/images/hero/page-bg.jpg" alt="" loading="eager" width="1920" height="1080">
    <div class="page-hero__overlay"></div>
  </div>
  <div class="page-hero__content">
    <span class="text-eyebrow text-eyebrow--accent" data-reveal="fade-up">Eyebrow</span>
    <h1 class="text-display" data-reveal="fade-up" data-reveal-delay="0.1">Page Title</h1>
    <p class="text-lead" data-reveal="fade-up" data-reveal-delay="0.2">
      Brief description of the page.
    </p>
  </div>
</section>
```

---

## CTA Section

```html
<section class="cta-section">
  <div class="cta-section__content" data-reveal="fade-up">
    <h2 class="cta-section__title">Ready to Build?</h2>
    <p class="cta-section__description">Let's discuss your next project.</p>
    <div class="cta-section__actions">
      <a href="quote.html" class="btn btn--primary btn--lg">Get a Quote</a>
      <a href="contact.html" class="btn btn--secondary btn--lg">Contact Us</a>
    </div>
  </div>
</section>
```

---

## Badges

```html
<span class="badge">Default</span>
<span class="badge badge--accent">Accent</span>
<span class="badge badge--light">Light</span>
```

---

*Last updated: 2026-05-04*
