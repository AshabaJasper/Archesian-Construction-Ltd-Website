/* ============================================================
   SHARED SHELL - Repeated static page chrome
   ============================================================ */

const SharedShell = {
  init() {
    this.ensureSkipLink();
    this.ensureCursor();
    this.ensureLoader();
    this.ensureCurtain();
    this.ensureNavigation();
    this.ensureMobileMenu();
    this.ensureFooter();
    this.ensureNewsletter();
  },

  ensureSkipLink() {
    if (document.querySelector('.skip-link')) return;
    document.body.insertAdjacentHTML('afterbegin', '<a href="#main-content" class="skip-link">Skip to content</a>');
  },

  ensureCursor() {
    if (document.querySelector('.custom-cursor')) return;
    document.body.insertAdjacentHTML('afterbegin', '<div class="custom-cursor" aria-hidden="true"></div>');
  },

  ensureLoader() {
    if (document.querySelector('.page-loader')) return;
    document.body.insertAdjacentHTML('afterbegin', '<div class="page-loader" aria-hidden="true"><div class="page-loader__bar"></div></div>');
  },

  ensureCurtain() {
    if (document.querySelector('.transition-curtain')) return;
    document.body.insertAdjacentHTML('afterbegin', '<div class="transition-curtain" aria-hidden="true"></div>');
  },

  ensureNavigation() {
    if (document.querySelector('.nav')) return;

    document.body.insertAdjacentHTML('afterbegin', `
      <nav class="nav" aria-label="Primary navigation">
        <div class="nav__inner">
          <a href="index.html" class="nav__logo" aria-label="Archesian Construction Ltd home">
            <img class="nav__logo-image" src="assets/logos/Archesian Construction Ltd Logo.jpg" alt="Archesian Construction Ltd" width="92" height="92">
            <span class="nav__logo-text">Archesian</span>
          </a>
          <div class="nav__links">
            <a href="index.html" class="nav__link">Home</a>
            <a href="about.html" class="nav__link">About</a>
            <a href="services.html" class="nav__link">Services</a>
            <a href="projects.html" class="nav__link">Projects</a>
            <a href="process.html" class="nav__link">Process</a>
            <a href="contact.html" class="nav__link">Contact</a>
          </div>
          <a href="contact.html" class="btn btn--primary btn--sm nav__cta">Start a Project</a>
          <button class="nav__hamburger" type="button" aria-label="Open navigation menu">
            <span class="nav__hamburger-line"></span>
            <span class="nav__hamburger-line"></span>
            <span class="nav__hamburger-line"></span>
          </button>
        </div>
      </nav>
    `);
  },

  ensureMobileMenu() {
    if (document.querySelector('.mobile-menu')) return;

    document.body.insertAdjacentHTML('afterbegin', `
      <div class="mobile-menu" aria-hidden="true">
        <div class="mobile-menu__links">
          <a href="index.html" class="mobile-menu__link">Home</a>
          <a href="about.html" class="mobile-menu__link">About</a>
          <a href="services.html" class="mobile-menu__link">Services</a>
          <a href="projects.html" class="mobile-menu__link">Projects</a>
          <a href="process.html" class="mobile-menu__link">Process</a>
          <a href="contact.html" class="mobile-menu__link">Contact</a>
        </div>
        <div class="mobile-menu__cta">
          <a href="contact.html" class="btn btn--primary">Start a Project</a>
        </div>
        <div class="mobile-menu__footer">
          <a href="tel:+256706746868" class="mobile-menu__social-link">+256 706 746 868</a>
          <a href="https://x.com/Archesian" class="mobile-menu__social-link">X</a>
        </div>
      </div>
    `);
  },

  ensureFooter() {
    if (document.querySelector('.footer')) return;

    document.body.insertAdjacentHTML('beforeend', `
      <footer class="footer">
        <div class="footer__inner">
          <div class="footer__main">
            <div class="footer__identity">
              <a href="index.html" class="nav__logo" aria-label="Archesian Construction Ltd home">
                <img class="nav__logo-image" src="assets/logos/Archesian Construction Ltd Logo.jpg" alt="Archesian Construction Ltd" width="92" height="92">
                <span class="nav__logo-text">Archesian</span>
              </a>
              <p class="footer__statement">Integrated design, cost, and construction delivery from one Kampala practice.</p>
              <a href="contact.html" class="btn btn--primary footer__cta">Start a Project</a>
            </div>
            <div class="footer__directory">
              <div class="footer__column">
                <h3 class="footer__column-title">Studio</h3>
                <div class="footer__column-links">
                  <a href="about.html" class="footer__column-link">About</a>
                  <a href="projects.html" class="footer__column-link">Projects</a>
                  <a href="process.html" class="footer__column-link">Process</a>
                </div>
              </div>
              <div class="footer__column">
                <h3 class="footer__column-title">Services</h3>
                <div class="footer__column-links">
                  <a href="service-architecture.html" class="footer__column-link">Architecture</a>
                  <a href="service-engineering.html" class="footer__column-link">Engineering</a>
                  <a href="service-quantity-surveying.html" class="footer__column-link">Quantity Surveying</a>
                  <a href="service-design-and-build.html" class="footer__column-link">Design and Build</a>
                  <a href="service-renovations.html" class="footer__column-link">Renovations</a>
                </div>
              </div>
              <div class="footer__column">
                <h3 class="footer__column-title">Contact</h3>
                <div class="footer__column-links">
                  <a href="tel:+256706746868" class="footer__column-link">+256 706 746 868</a>
                  <a href="tel:+256785170747" class="footer__column-link">+256 785 170 747</a>
                  <a href="contact.html" class="footer__column-link">Ndundu Complex, Kisaasi</a>
                </div>
              </div>
            </div>
            <div class="footer__social" aria-label="Social links">
              <a href="https://x.com/Archesian" class="footer__social-icon" aria-label="Archesian on X"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" stroke="currentColor" stroke-width="2"/></svg></a>
              <a href="#" class="footer__social-icon" aria-label="Archesian on LinkedIn"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9v10M6 5.5v.01M10 19v-6a4 4 0 0 1 8 0v6M10 9v10" stroke="currentColor" stroke-width="2"/></svg></a>
              <a href="#" class="footer__social-icon" aria-label="Archesian on Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="2"/><path d="M17 7h.01" stroke="currentColor" stroke-width="2"/></svg></a>
              <a href="mailto:info@archesian.com" class="footer__social-icon" aria-label="Email Archesian"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16v12H4zM4 7l8 6 8-6" stroke="currentColor" stroke-width="2"/></svg></a>
            </div>
          </div>
          <div class="footer__bottom">
            <div class="footer__legal">
              <span class="footer__copyright">&copy; 2026 Archesian Construction Ltd.</span>
              <a href="privacy.html" class="footer__legal-link">Privacy</a>
              <a href="terms.html" class="footer__legal-link">Terms</a>
              <a href="cookies.html" class="footer__legal-link">Cookies</a>
            </div>
            <p class="footer__credit">Prepared by Persmon Technologies</p>
          </div>
        </div>
      </footer>
    `);
  },

  ensureNewsletter() {
    if (document.querySelector('.newsletter-modal')) return;

    document.body.insertAdjacentHTML('beforeend', `
      <div class="newsletter-modal" role="dialog" aria-modal="true" aria-labelledby="newsletter-title">
        <div class="newsletter-modal__card">
          <button class="newsletter-modal__close" type="button" aria-label="Close newsletter modal">&times;</button>
          <span class="text-eyebrow text-eyebrow--accent">Monthly Briefing</span>
          <h2 id="newsletter-title" class="text-h2">Receive project notes.</h2>
          <p class="text-body text-muted">A concise monthly note on construction planning, procurement, materials, and delivery.</p>
          <div class="spacer--md"></div>
          <form class="stack" data-newsletter-form>
            <label class="sr-only" for="modal-email">Email address</label>
            <input id="modal-email" class="form-input" type="email" name="email" placeholder="Email address">
            <button class="btn btn--primary btn--block" type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    `);
  },
};

SharedShell.init();
window.SharedShell = SharedShell;
