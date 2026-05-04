/* ============================================================
   NAVIGATION — Sticky nav, scroll shrink, mobile menu
   ============================================================ */

const Navigation = {
  nav: null,
  hamburger: null,
  mobileMenu: null,
  isMenuOpen: false,
  scrollThreshold: 50,

  init() {
    this.nav = document.querySelector('.nav');
    this.hamburger = document.querySelector('.nav__hamburger');
    this.mobileMenu = document.querySelector('.mobile-menu');

    if (!this.nav) return;

    this.bindEvents();
    this.checkScroll();
  },

  bindEvents() {
    // Scroll behavior — shrink nav
    window.addEventListener(
      'scroll',
      Utils.throttle(() => this.checkScroll(), 50),
      { passive: true }
    );

    // Hamburger toggle
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMenu());
    }

    // Close menu on link click
    if (this.mobileMenu) {
      this.mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => this.closeMenu());
      });
    }

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    });

    // Close menu on resize to desktop
    window.addEventListener(
      'resize',
      Utils.debounce(() => {
        if (Utils.isDesktop() && this.isMenuOpen) {
          this.closeMenu();
        }
      }, 200)
    );
  },

  checkScroll() {
    if (!this.nav) return;

    if (window.scrollY > this.scrollThreshold) {
      this.nav.classList.add('nav--scrolled');
    } else {
      this.nav.classList.remove('nav--scrolled');
    }
  },

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  },

  openMenu() {
    this.isMenuOpen = true;
    this.hamburger.classList.add('nav__hamburger--open');
    this.mobileMenu.classList.add('mobile-menu--open');
    document.body.style.overflow = 'hidden';

    // Stop smooth scroll during menu
    if (window.SmoothScroll) {
      SmoothScroll.stop();
    }
  },

  closeMenu() {
    this.isMenuOpen = false;
    this.hamburger.classList.remove('nav__hamburger--open');
    this.mobileMenu.classList.remove('mobile-menu--open');
    document.body.style.overflow = '';

    // Resume smooth scroll
    if (window.SmoothScroll) {
      SmoothScroll.start();
    }
  },
};

window.Navigation = Navigation;
