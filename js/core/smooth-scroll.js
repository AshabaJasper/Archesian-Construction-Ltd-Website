/* ============================================================
   SMOOTH SCROLL — Lenis initialization + GSAP integration
   ============================================================ */

const SmoothScroll = {
  instance: null,

  init() {
    if (Utils.prefersReducedMotion()) return;

    this.instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      autoRaf: false, /* We manage RAF ourselves for GSAP sync */
    });

    // Sync Lenis with GSAP ScrollTrigger
    this.instance.on('scroll', ScrollTrigger.update);

    // Use GSAP ticker for the animation loop (syncs Lenis + GSAP perfectly)
    gsap.ticker.add((time) => {
      this.instance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle anchor links
    this.setupAnchorLinks();
  },

  setupAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          this.instance.scrollTo(target, {
            offset: -80,
            duration: 1.2,
          });
        }
      });
    });
  },

  /**
   * Scroll to a specific element or position
   */
  scrollTo(target, options = {}) {
    if (this.instance) {
      this.instance.scrollTo(target, options);
    }
  },

  /**
   * Stop Lenis (useful during page transitions)
   */
  stop() {
    if (this.instance) {
      this.instance.stop();
    }
  },

  /**
   * Start Lenis
   */
  start() {
    if (this.instance) {
      this.instance.start();
    }
  },

  /**
   * Destroy instance (for cleanup)
   */
  destroy() {
    if (this.instance) {
      this.instance.destroy();
      this.instance = null;
    }
  },
};

window.SmoothScroll = SmoothScroll;
