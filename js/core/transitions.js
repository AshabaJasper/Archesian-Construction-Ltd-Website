/* ============================================================
   PAGE TRANSITIONS — Barba.js + GSAP curtain sweep
   ============================================================ */

const PageTransitions = {
  curtain: null,
  pageVersion: '20260504c',

  init() {
    this.curtain = document.querySelector('.transition-curtain');
    if (!this.curtain) return;

    this.versionPageLinks(document);

    // If Barba is not available, set up simple fallback transitions
    if (typeof barba === 'undefined') {
      this.setupFallback();
      return;
    }

    this.setupBarba();
  },

  versionPageLinks(container = document) {
    container.querySelectorAll('a[href]').forEach((link) => {
      const rawHref = link.getAttribute('href');
      if (
        !rawHref ||
        rawHref.startsWith('#') ||
        rawHref.startsWith('mailto:') ||
        rawHref.startsWith('tel:')
      ) {
        return;
      }

      const url = new URL(rawHref, window.location.href);
      if (url.origin !== window.location.origin || !url.pathname.endsWith('.html')) return;
      if (url.searchParams.has('v')) return;

      url.searchParams.set('v', this.pageVersion);
      link.setAttribute('href', `${url.pathname.split('/').pop()}${url.search}${url.hash}`);
    });
  },

  /**
   * Full Barba.js setup with GSAP transitions
   */
  setupBarba() {
    const self = this;

    barba.init({
      // Prevent same-page link transitions
      prevent: ({ el }) => {
        return (
          el.classList.contains('no-transition') ||
          el.getAttribute('target') === '_blank' ||
          el.href.includes('#') ||
          el.href.includes('mailto:') ||
          el.href.includes('tel:')
        );
      },

      transitions: [
        {
          name: 'curtain-sweep',

          // Before leaving current page
          async leave(data) {
            // Close persistent shell UI before Barba swaps page containers.
            if (window.Navigation) Navigation.closeMenu();

            // Stop smooth scroll
            if (window.SmoothScroll) SmoothScroll.stop();

            // Kill existing ScrollTrigger instances
            if (window.RevealAnimations) RevealAnimations.killAll();

            // Animate curtain in
            await self.curtainIn();

            // Scroll to top
            window.scrollTo(0, 0);
          },

          // After new content is loaded
          async enter(data) {
            await self.syncPageStyles(data.next.html);

            // Restart smooth scroll before ScrollTrigger measures the new page.
            if (window.SmoothScroll) {
              SmoothScroll.destroy();
              SmoothScroll.init();
            }

            // Re-initialize the incoming page while it is still covered.
            self.preparePage(data.next.container);

            // Animate curtain out after the new page is ready to paint.
            await self.curtainOut();
          },

          afterEnter(data) {
            self.preparePage(data.next.container);
          },

          // Once — initial page load (no transition needed)
          async once(data) {
            self.updateActiveNav();
          },
        },
      ],
    });
  },

  /**
   * Barba swaps only containers, so page-specific styles in the next
   * document head must be appended before the incoming page is revealed.
   */
  syncPageStyles(nextHtml) {
    if (!nextHtml) return Promise.resolve();

    const nextDocument = new DOMParser().parseFromString(nextHtml, 'text/html');
    const stylesheetLinks = [...nextDocument.querySelectorAll('link[rel="stylesheet"]')];
    const pending = [];

    stylesheetLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) return;

      const nextLink = document.createElement('link');
      nextLink.rel = 'stylesheet';
      nextLink.href = href;

      pending.push(new Promise((resolve) => {
        nextLink.addEventListener('load', resolve, { once: true });
        nextLink.addEventListener('error', resolve, { once: true });
      }));

      document.head.appendChild(nextLink);
    });

    return Promise.all(pending);
  },

  /**
   * Curtain sweep in — covers the screen
   */
  curtainIn() {
    return new Promise((resolve) => {
      gsap.to(this.curtain, {
        x: '0%',
        duration: 0.6,
        ease: 'power4.inOut',
        onStart: () => {
          this.curtain.style.transform = 'translateX(-100%)';
        },
        onComplete: resolve,
      });
    });
  },

  /**
   * Curtain sweep out — reveals new content
   */
  curtainOut() {
    return new Promise((resolve) => {
      gsap.to(this.curtain, {
        x: '100%',
        duration: 0.6,
        ease: 'power4.inOut',
        onComplete: () => {
          // Reset curtain position for next transition
          gsap.set(this.curtain, { x: '-100%' });
          resolve();
        },
      });
    });
  },

  /**
   * Called after every page enters — re-initializes components
   */
  preparePage(container) {
    if (!container) return;

    if (container.dataset.pageReady === 'true') {
      this.revealReadyViewport(container);
      return;
    }

    container.dataset.pageReady = 'true';
    this.onPageEnter(container);
    this.revealReadyViewport(container);
  },

  revealReadyViewport(container) {
    window.requestAnimationFrame(() => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
      }

      if (window.RevealAnimations) {
        RevealAnimations.revealVisible(container);
      }
    });
  },

  onPageEnter(container) {
    this.versionPageLinks(document);
    this.versionPageLinks(container);

    // Reset persistent shell state carried across static page transitions.
    if (window.Navigation) {
      Navigation.closeMenu();
      Navigation.checkScroll();
    }

    // Re-init scroll reveals
    if (window.RevealAnimations) {
      RevealAnimations.createReveals(container);
      RevealAnimations.createParallax(container);
    }

    // Re-init cursor hover targets
    if (window.CustomCursor) {
      CustomCursor.refresh(container);
    }

    // Re-init page-specific components
    this.initPageComponents(container);

    // Refresh ScrollTrigger calculations
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    }

    // Update active nav link
    this.updateActiveNav();
  },

  /**
   * Initialize page-specific components based on what exists in DOM
   */
  initPageComponents(container) {
    // Counters
    if (container.querySelector('[data-counter]') && window.Counter) {
      Counter.init(container);
    }

    // Sliders
    if (container.querySelector('.swiper') && window.Slider) {
      Slider.init(container);
    }

    // Accordion
    if (container.querySelector('[data-accordion]') && window.Accordion) {
      Accordion.init(container);
    }

    // Lightbox
    if (container.querySelector('.pswp-gallery') && window.LightboxGallery) {
      LightboxGallery.init(container);
    }

    // Before/After
    if (container.querySelector('.before-after') && window.BeforeAfter) {
      BeforeAfter.init(container);
    }

    // Quote form
    if (container.querySelector('#quote-form') && window.QuoteForm) {
      QuoteForm.init();
    }

    // General forms
    if (container.querySelector('form[data-form]') && window.Forms) {
      Forms.init(container);
    }

    // Project filter
    if (container.querySelector('[data-filter]') && window.ProjectFilter) {
      ProjectFilter.init();
    }

    // Timeline
    if (container.querySelector('.timeline') && window.Timeline) {
      Timeline.init(container);
    }
  },

  /**
   * Update active state on nav links
   */
  updateActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav__link').forEach((link) => {
      link.classList.remove('nav__link--active');
      const href = link.getAttribute('href');
      const hrefPath = new URL(href, window.location.href).pathname.split('/').pop() || 'index.html';
      if (hrefPath === currentPath || (currentPath === 'index.html' && hrefPath === 'index.html')) {
        link.classList.add('nav__link--active');
      }
    });
  },

  /**
   * Fallback for when Barba.js is not loaded
   * Simple curtain transition on link clicks
   */
  setupFallback() {
    const self = this;

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        link.target === '_blank' ||
        link.classList.contains('no-transition')
      ) {
        return;
      }

      // Only transition for local links
      if (link.hostname === window.location.hostname) {
        e.preventDefault();

        gsap.to(self.curtain, {
          x: '0%',
          duration: 0.5,
          ease: 'power4.inOut',
          onStart: () => {
            self.curtain.style.transform = 'translateX(-100%)';
          },
          onComplete: () => {
            window.location.href = href;
          },
        });
      }
    });

    // On page load, sweep curtain out
    window.addEventListener('load', () => {
      gsap.set(self.curtain, { x: '0%' });
      gsap.to(self.curtain, {
        x: '100%',
        duration: 0.6,
        delay: 0.1,
        ease: 'power4.inOut',
        onComplete: () => {
          gsap.set(self.curtain, { x: '-100%' });
        },
      });
    });
  },
};

window.PageTransitions = PageTransitions;
