/* ============================================================
   ANIMATIONS — GSAP ScrollTrigger reveal system
   ============================================================
   Scans for [data-reveal] attributes and creates
   scroll-driven entrance animations.
   ============================================================ */

const RevealAnimations = {
  init() {
    if (Utils.prefersReducedMotion()) {
      // Show everything immediately
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    this.createReveals();
  },

  /**
   * Create scroll-triggered reveal animations for all [data-reveal] elements
   */
  createReveals(container = document) {
    const elements = container.querySelectorAll('[data-reveal]');

    elements.forEach((el) => {
      const type = el.getAttribute('data-reveal');
      const delay = parseFloat(el.getAttribute('data-reveal-delay') || 0);
      const duration = parseFloat(el.getAttribute('data-reveal-duration') || 0.9);

      switch (type) {
        case 'fade-up':
          this.fadeUp(el, delay, duration);
          break;
        case 'fade-down':
          this.fadeDown(el, delay, duration);
          break;
        case 'fade-left':
          this.fadeLeft(el, delay, duration);
          break;
        case 'fade-right':
          this.fadeRight(el, delay, duration);
          break;
        case 'fade':
          this.fade(el, delay, duration);
          break;
        case 'scale-in':
          this.scaleIn(el, delay, duration);
          break;
        case 'clip-up':
          this.clipUp(el, delay, duration);
          break;
        case 'split-text':
          this.splitText(el, delay);
          break;
        case 'stagger':
          this.stagger(el, delay);
          break;
        default:
          this.fadeUp(el, delay, duration);
      }
    });
  },

  /**
   * Barba swaps can leave above-the-fold reveal elements waiting for a
   * ScrollTrigger tick that never fires. Reveal only elements already in view.
   */
  revealVisible(container = document) {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const elements = container.querySelectorAll('[data-reveal]');

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isInView = rect.top < viewportHeight * 0.92 && rect.bottom > 0;

      if (!isInView) return;

      const type = el.getAttribute('data-reveal');

      if (type === 'stagger') {
        gsap.set(el.children, { opacity: 1, y: 0 });
      } else if (type === 'split-text') {
        gsap.set(el.querySelectorAll('.split-word'), { opacity: 1, y: 0 });
      }

      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: 'clipPath' });
      el.classList.add('revealed');
    });
  },

  /**
   * Fade up — most common entrance
   */
  fadeUp(el, delay = 0, duration = 0.9) {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onComplete: () => el.classList.add('revealed'),
      }
    );
  },

  fadeDown(el, delay = 0, duration = 0.9) {
    gsap.fromTo(
      el,
      { opacity: 0, y: -40 },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onComplete: () => el.classList.add('revealed'),
      }
    );
  },

  fadeLeft(el, delay = 0, duration = 0.9) {
    gsap.fromTo(
      el,
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onComplete: () => el.classList.add('revealed'),
      }
    );
  },

  fadeRight(el, delay = 0, duration = 0.9) {
    gsap.fromTo(
      el,
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onComplete: () => el.classList.add('revealed'),
      }
    );
  },

  fade(el, delay = 0, duration = 0.9) {
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onComplete: () => el.classList.add('revealed'),
      }
    );
  },

  scaleIn(el, delay = 0, duration = 0.9) {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onComplete: () => el.classList.add('revealed'),
      }
    );
  },

  clipUp(el, delay = 0, duration = 1.1) {
    gsap.fromTo(
      el,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onComplete: () => el.classList.add('revealed'),
      }
    );
  },

  /**
   * Split text — word-by-word reveal for manifesto text
   */
  splitText(el, delay = 0) {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);

    // Wrap each word in a span
    el.innerHTML = words
      .map(
        (word) =>
          `<span class="split-word" style="display:inline-block;opacity:0;transform:translateY(20px)">${word}</span>`
      )
      .join(' ');

    const wordSpans = el.querySelectorAll('.split-word');

    gsap.to(wordSpans, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.04,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onComplete: () => el.classList.add('revealed'),
    });
  },

  /**
   * Stagger — children animate in sequence
   */
  stagger(el, delay = 0) {
    const children = el.children;

    gsap.fromTo(
      children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onComplete: () => el.classList.add('revealed'),
      }
    );
  },

  /**
   * Create parallax effects on elements with [data-parallax]
   */
  createParallax(container = document) {
    if (Utils.prefersReducedMotion()) return;

    const elements = container.querySelectorAll('[data-parallax]');

    elements.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax') || 0.2);

      gsap.to(el, {
        y: () => speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  },

  /**
   * Refresh ScrollTrigger — call after dynamic content changes
   */
  refresh() {
    ScrollTrigger.refresh();
  },

  /**
   * Kill all ScrollTrigger instances — call before page transitions
   */
  killAll() {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  },
};

window.RevealAnimations = RevealAnimations;
