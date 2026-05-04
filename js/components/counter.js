/* ============================================================
   COUNTER — Animated number counters (GSAP ScrollTrigger)
   ============================================================ */

const Counter = {
  init(container = document) {
    const counters = container.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    if (Utils.prefersReducedMotion()) {
      // Show final values immediately
      counters.forEach((el) => {
        const target = parseInt(el.getAttribute('data-counter'), 10);
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const prefix = el.getAttribute('data-counter-prefix') || '';
        el.textContent = prefix + Utils.formatNumber(target) + suffix;
      });
      return;
    }

    counters.forEach((el) => {
      const target = parseInt(el.getAttribute('data-counter'), 10);
      const suffix = el.getAttribute('data-counter-suffix') || '';
      const prefix = el.getAttribute('data-counter-prefix') || '';
      const duration = parseFloat(el.getAttribute('data-counter-duration') || 2);

      const obj = { value: 0 };

      gsap.to(obj, {
        value: target,
        duration,
        ease: 'power2.out',
        snap: { value: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          el.textContent = prefix + Utils.formatNumber(Math.floor(obj.value)) + suffix;
        },
      });
    });
  },
};

window.Counter = Counter;
