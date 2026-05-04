/* ============================================================
   CUSTOM CURSOR — Luxury dot cursor with lerp following
   ============================================================ */

const CustomCursor = {
  el: null,
  pos: { x: 0, y: 0 },
  target: { x: 0, y: 0 },
  isVisible: false,
  rafId: null,

  init() {
    // Only on devices with hover capability
    if (!Utils.hasHover() || Utils.prefersReducedMotion()) return;

    this.el = document.querySelector('.custom-cursor');
    if (!this.el) return;

    document.body.classList.add('cursor-active');
    this.bindEvents();
    this.animate();
  },

  bindEvents() {
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      this.target.x = e.clientX;
      this.target.y = e.clientY;

      if (!this.isVisible) {
        this.isVisible = true;
        this.el.classList.add('custom-cursor--visible');
        // Jump to position immediately on first move
        this.pos.x = this.target.x;
        this.pos.y = this.target.y;
      }
    });

    // Hide when mouse leaves window
    document.addEventListener('mouseleave', () => {
      this.isVisible = false;
      this.el.classList.remove('custom-cursor--visible');
    });

    document.addEventListener('mouseenter', () => {
      this.isVisible = true;
      this.el.classList.add('custom-cursor--visible');
    });

    // Expand on interactive elements
    this.setupHoverTargets();
  },

  setupHoverTargets(container = document) {
    const interactiveElements = container.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, .clickable, .project-card, .service-card, .team-card, .blog-card, .filter-pill'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        const cursorText = el.getAttribute('data-cursor-text');
        if (cursorText) {
          this.el.classList.add('custom-cursor--text');
          this.el.textContent = cursorText;
        } else {
          this.el.classList.add('custom-cursor--hover');
        }
      });

      el.addEventListener('mouseleave', () => {
        this.el.classList.remove('custom-cursor--hover', 'custom-cursor--text');
        this.el.textContent = '';
      });
    });
  },

  /**
   * Lerp-based animation loop for smooth following
   */
  animate() {
    this.pos.x = Utils.lerp(this.pos.x, this.target.x, 0.15);
    this.pos.y = Utils.lerp(this.pos.y, this.target.y, 0.15);

    this.el.style.left = `${this.pos.x}px`;
    this.el.style.top = `${this.pos.y}px`;

    this.rafId = requestAnimationFrame(() => this.animate());
  },

  /**
   * Re-setup hover targets after DOM changes (e.g., page transition)
   */
  refresh(container = document) {
    this.setupHoverTargets(container);
  },

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    document.body.classList.remove('cursor-active');
  },
};

window.CustomCursor = CustomCursor;
