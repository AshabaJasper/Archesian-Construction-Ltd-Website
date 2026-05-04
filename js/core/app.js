/* ============================================================
   APP.JS — Main initialization
   ============================================================
   This is the entry point. It initializes all core modules
   in the correct order and handles page-level orchestration.
   ============================================================ */

const App = {
  init() {
    // 1. Utilities are already loaded (no init needed)

    // 2. Initialize smooth scroll (Lenis + GSAP sync)
    if (window.SmoothScroll) SmoothScroll.init();

    // 3. Initialize scroll-driven reveal animations
    if (window.RevealAnimations) RevealAnimations.init();

    // 4. Initialize custom cursor
    if (window.CustomCursor) CustomCursor.init();

    // 5. Initialize navigation
    if (window.Navigation) Navigation.init();

    // 6. Initialize page transitions (Barba.js)
    if (window.PageTransitions) PageTransitions.init();

    // 7. Initialize parallax effects
    if (window.RevealAnimations) RevealAnimations.createParallax();

    // 8. Initialize page-specific components
    this.initComponents();

    // 9. Hide page loader
    this.hideLoader();

    // 10. Newsletter modal (delayed)
    this.scheduleNewsletter();

    console.log('[App] Initialized successfully');
  },

  /**
   * Initialize any component modules that are loaded
   */
  initComponents() {
    // Animated counters
    if (window.Counter) Counter.init();

    // Swiper sliders
    if (window.Slider) Slider.init();

    // FAQ Accordion
    if (window.Accordion) Accordion.init();

    // PhotoSwipe lightbox
    if (window.LightboxGallery) LightboxGallery.init();

    // Before/After slider
    if (window.BeforeAfter) BeforeAfter.init();

    // Multi-step quote form
    if (window.QuoteForm) QuoteForm.init();

    // General forms
    if (window.Forms) Forms.init();

    // Project filter
    if (window.ProjectFilter) ProjectFilter.init();

    // Timeline
    if (window.Timeline) Timeline.init();

    // Newsletter forms
    if (window.Newsletter) Newsletter.init();

    // Marquee
    if (window.Marquee) Marquee.init();
  },

  /**
   * Hide the initial page loader
   */
  hideLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
      const hide = () => {
        setTimeout(() => {
          loader.classList.add('page-loader--hidden');
          // Remove from DOM after animation
          setTimeout(() => loader.remove(), 600);
        }, 300);
      };

      // If App initializes after load, hide immediately instead of waiting
      // for an event that already fired.
      if (document.readyState === 'complete') {
        hide();
      } else {
        window.addEventListener('load', hide, { once: true });
      }
    }
  },

  /**
   * Schedule newsletter modal after 30s (first visit only)
   */
  scheduleNewsletter() {
    if (window.Newsletter) {
      setTimeout(() => Newsletter.checkAndShow(), 30000);
    }
  },
};

// ── Boot the application ──
Utils.ready(() => App.init());

window.App = App;
