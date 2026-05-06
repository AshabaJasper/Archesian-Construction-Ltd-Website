/* ============================================================
   ARCHESIAN INTERACTIONS
   Lightweight, PRD-specific behavior without extra dependencies.
   ============================================================ */

const Archesian = {
  init() {
    this.setupProcessTimeline();
    this.setupInquiryForm();
    this.setupProjectCursor();
  },

  setupProcessTimeline(container = document) {
    container.querySelectorAll('[data-process-stage]').forEach((stage) => {
      const trigger = stage.querySelector('[data-process-trigger]');
      const details = stage.querySelector('[data-process-details]');
      if (!trigger || !details) return;

      trigger.addEventListener('click', () => {
        const isOpen = stage.classList.toggle('process-timeline__stage--open');
        trigger.setAttribute('aria-expanded', String(isOpen));
        details.style.maxHeight = isOpen ? `${details.scrollHeight}px` : '0';
      });
    });
  },

  setupInquiryForm(container = document) {
    const form = container.querySelector('[data-project-inquiry]');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const button = form.querySelector('[type="submit"]');
      const status = form.querySelector('[data-form-status]');
      if (button) {
        button.textContent = 'Inquiry Received';
        button.disabled = true;
      }
      if (status) {
        status.hidden = false;
        status.textContent = 'Thank you. Archesian will review the project details and follow up with the next practical step.';
      }

      window.setTimeout(() => {
        form.reset();
        if (button) {
          button.textContent = 'Submit Inquiry';
          button.disabled = false;
        }
      }, 2400);
    });
  },

  setupProjectCursor(container = document) {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    container.querySelectorAll('[data-cursor-text]').forEach((card) => {
      card.addEventListener('mouseenter', () => card.setAttribute('data-cursor-active', 'true'));
      card.addEventListener('mouseleave', () => card.removeAttribute('data-cursor-active'));
    });
  },
};

Utils.ready(() => Archesian.init());
window.Archesian = Archesian;
