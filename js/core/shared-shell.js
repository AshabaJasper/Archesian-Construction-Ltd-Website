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

          <div class="footer__signature">
            <p class="footer__index">N&deg; 07 &mdash; Colophon</p>
            <h2 class="footer__statement">
              Integrated design, cost, and construction delivery from one Kampala practice.
            </h2>
            <a href="contact.html" class="btn btn--primary footer__cta">Start a Project</a>
          </div>

          <div class="footer__newsletter" aria-labelledby="footer-newsletter-title">
            <div class="footer__newsletter-copy">
              <p class="footer__column-title">Monthly Briefing</p>
              <p id="footer-newsletter-title" class="footer__newsletter-headline">Project notes from the studio &mdash; once a month, no noise.</p>
            </div>
            <form class="footer__newsletter-form" data-newsletter-form>
              <label class="sr-only" for="footer-newsletter-email">Email address</label>
              <input id="footer-newsletter-email" class="footer__newsletter-input" type="email" name="email" placeholder="you@studio.com" required>
              <button class="btn btn--primary" type="submit">Subscribe</button>
            </form>
          </div>

          <div class="footer__main">
            <div class="footer__identity">
              <a href="index.html" class="footer__logo" aria-label="Archesian Construction Ltd home">
                <img class="footer__logo-image" src="assets/logos/Archesian Construction Ltd Logo.jpg" alt="Archesian Construction Ltd" width="92" height="92">
                <span class="footer__logo-text">Archesian<br><small>Construction Ltd</small></span>
              </a>
              <address class="footer__address">
                <span>Ndundu Complex, Kisaasi</span>
                <span>P.&nbsp;O. Box 803108, Ntinda</span>
                <span>Kampala, Uganda</span>
              </address>
              <div class="footer__social" aria-label="Social links">
                <a href="https://x.com/Archesian" class="footer__social-icon" aria-label="Archesian on X" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/archesian-construction" class="footer__social-icon" aria-label="Archesian on LinkedIn" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/></svg>
                </a>
                <a href="https://www.instagram.com/archesian" class="footer__social-icon" aria-label="Archesian on Instagram" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4.5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/></svg>
                </a>
                <a href="https://www.facebook.com/archesian" class="footer__social-icon" aria-label="Archesian on Facebook" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.75 8.43-4.91 8.43-9.93z"/></svg>
                </a>
                <a href="mailto:info@archesian.com" class="footer__social-icon" aria-label="Email Archesian">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 6.5h17v11h-17z" stroke="currentColor" stroke-width="1.6"/><path d="m4 7 8 6 8-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </a>
              </div>
            </div>

            <div class="footer__directory">
              <div class="footer__column">
                <h3 class="footer__column-title">Studio</h3>
                <div class="footer__column-links">
                  <a href="about.html" class="footer__column-link">About</a>
                  <a href="team.html" class="footer__column-link">Team</a>
                  <a href="projects.html" class="footer__column-link">Projects</a>
                  <a href="process.html" class="footer__column-link">Process</a>
                  <a href="careers.html" class="footer__column-link">Careers</a>
                  <a href="insights.html" class="footer__column-link">Insights</a>
                </div>
              </div>
              <div class="footer__column">
                <h3 class="footer__column-title">Services</h3>
                <div class="footer__column-links">
                  <a href="service-architecture.html" class="footer__column-link">Architecture</a>
                  <a href="service-engineering.html" class="footer__column-link">Engineering</a>
                  <a href="service-quantity-surveying.html" class="footer__column-link">Quantity Surveying</a>
                  <a href="service-project-management.html" class="footer__column-link">Project Management</a>
                  <a href="service-design-and-build.html" class="footer__column-link">Design and Build</a>
                  <a href="service-renovations.html" class="footer__column-link">Renovations</a>
                </div>
              </div>
              <div class="footer__column">
                <h3 class="footer__column-title">Contact</h3>
                <div class="footer__column-links">
                  <a href="tel:+256706746868" class="footer__column-link">+256 706 746 868</a>
                  <a href="tel:+256785170747" class="footer__column-link">+256 785 170 747</a>
                  <a href="mailto:info@archesian.com" class="footer__column-link">info@archesian.com</a>
                  <a href="contact.html" class="footer__column-link">Visit the studio</a>
                  <a href="quote.html" class="footer__column-link">Request a quote</a>
                  <a href="tender.html" class="footer__column-link">Tender enquiries</a>
                </div>
              </div>
            </div>
          </div>

          <div class="footer__bottom">
            <div class="footer__legal">
              <span class="footer__copyright">&copy; 2026 Archesian Construction Ltd.</span>
              <a href="privacy.html" class="footer__legal-link">Privacy</a>
              <a href="terms.html" class="footer__legal-link">Terms</a>
              <a href="cookies.html" class="footer__legal-link">Cookies</a>
            </div>
            <p class="footer__credit">Site by Persmon Technologies</p>
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
