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
          <a href="index.html" class="nav__logo" aria-label="[CLIENT NAME] home">
            <span class="nav__logo-mark" aria-hidden="true">C</span>
            <span class="nav__logo-text">[CLIENT NAME]</span>
          </a>
          <div class="nav__links">
            <a href="index.html" class="nav__link">Home</a>
            <a href="about.html" class="nav__link">About</a>
            <a href="projects.html" class="nav__link">Projects</a>
            <a href="services.html" class="nav__link">Services</a>
            <a href="process.html" class="nav__link">Process</a>
            <a href="insights.html" class="nav__link">Insights</a>
            <a href="contact.html" class="nav__link">Contact</a>
          </div>
          <a href="quote.html" class="btn btn--primary btn--sm nav__cta">Get a Quote</a>
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
          <a href="projects.html" class="mobile-menu__link">Projects</a>
          <a href="services.html" class="mobile-menu__link">Services</a>
          <a href="process.html" class="mobile-menu__link">Process</a>
          <a href="insights.html" class="mobile-menu__link">Insights</a>
          <a href="contact.html" class="mobile-menu__link">Contact</a>
        </div>
        <div class="mobile-menu__cta">
          <a href="quote.html" class="btn btn--primary">Get a Quote</a>
        </div>
        <div class="mobile-menu__footer">
          <a href="#" class="mobile-menu__social-link">Instagram</a>
          <a href="#" class="mobile-menu__social-link">LinkedIn</a>
          <a href="#" class="mobile-menu__social-link">X</a>
        </div>
      </div>
    `);
  },

  ensureFooter() {
    if (document.querySelector('.footer')) return;

    document.body.insertAdjacentHTML('beforeend', `
      <footer class="footer">
        <div class="footer__inner">
          <div class="footer__top">
            <div class="footer__brand">
              <a href="index.html" class="nav__logo" aria-label="[CLIENT NAME] home">
                <span class="nav__logo-mark" aria-hidden="true">C</span>
                <span class="nav__logo-text">[CLIENT NAME]</span>
              </a>
              <p class="footer__tagline">Construction with editorial clarity and site discipline.</p>
              <p class="footer__description">Residential, commercial, renovation, interiors, project management, and green building services for clients who value permanence.</p>
            </div>
            <div class="footer__newsletter">
              <h2 class="footer__newsletter-title">Project Notes</h2>
              <form class="footer__newsletter-form" data-newsletter-form>
                <label class="sr-only" for="footer-email">Email address</label>
                <input id="footer-email" class="footer__newsletter-input" type="email" name="email" placeholder="Email address">
                <button class="btn btn--primary btn--sm" type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          <div class="footer__columns">
            <div class="footer__column">
              <h3 class="footer__column-title">Company</h3>
              <div class="footer__column-links">
                <a href="about.html" class="footer__column-link">About</a>
                <a href="team.html" class="footer__column-link">Team</a>
                <a href="credentials.html" class="footer__column-link">Credentials</a>
                <a href="careers.html" class="footer__column-link">Careers</a>
              </div>
            </div>
            <div class="footer__column">
              <h3 class="footer__column-title">Work</h3>
              <div class="footer__column-links">
                <a href="projects.html" class="footer__column-link">Projects</a>
                <a href="services.html" class="footer__column-link">Services</a>
                <a href="process.html" class="footer__column-link">Process</a>
                <a href="quote.html" class="footer__column-link">Get a Quote</a>
              </div>
            </div>
            <div class="footer__column">
              <h3 class="footer__column-title">Resources</h3>
              <div class="footer__column-links">
                <a href="insights.html" class="footer__column-link">Insights</a>
                <a href="faq.html" class="footer__column-link">FAQ</a>
                <a href="book-consultation.html" class="footer__column-link">Book Consultation</a>
                <a href="tender.html" class="footer__column-link">Tender Submission</a>
              </div>
            </div>
            <div class="footer__column">
              <h3 class="footer__column-title">Contact</h3>
              <div class="footer__column-links">
                <a href="mailto:hello@example.com" class="footer__column-link">hello@example.com</a>
                <a href="tel:+256000000000" class="footer__column-link">+256 000 000 000</a>
                <a href="contact.html" class="footer__column-link">Kampala, Uganda</a>
                <a href="contact.html" class="footer__column-link">Contact Page</a>
              </div>
            </div>
          </div>
          <div class="footer__bottom">
            <div>
              <div class="footer__legal">
                <span class="footer__copyright">&copy; 2026 [CLIENT NAME]. All rights reserved.</span>
                <span class="footer__legal-separator">|</span>
                <a href="privacy.html" class="footer__legal-link">Privacy</a>
                <a href="terms.html" class="footer__legal-link">Terms</a>
                <a href="cookies.html" class="footer__legal-link">Cookies</a>
              </div>
              <p class="footer__credit">Built for refined construction companies.</p>
            </div>
            <div class="footer__social">
              <a href="#" class="footer__social-icon" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="2"/><path d="M17 7h.01" stroke="currentColor" stroke-width="2"/></svg></a>
              <a href="#" class="footer__social-icon" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9v10M6 5.5v.01M10 19v-6a4 4 0 0 1 8 0v6M10 9v10" stroke="currentColor" stroke-width="2"/></svg></a>
              <a href="#" class="footer__social-icon" aria-label="X"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" stroke="currentColor" stroke-width="2"/></svg></a>
            </div>
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
