/* ============================================================
   ACCORDION — Accessible FAQ accordion
   ============================================================ */

const Accordion = {
  init(container = document) {
    const accordions = container.querySelectorAll('[data-accordion]');
    if (!accordions.length) return;

    accordions.forEach((accordion) => {
      const items = accordion.querySelectorAll('[data-accordion-item]');

      items.forEach((item) => {
        const trigger = item.querySelector('[data-accordion-trigger]');
        const content = item.querySelector('[data-accordion-content]');

        if (!trigger || !content) return;

        // Set ARIA attributes
        const id = Utils.uid('accordion');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-controls', id);
        content.setAttribute('id', id);
        content.setAttribute('role', 'region');
        content.setAttribute('aria-labelledby', trigger.id || Utils.uid('trigger'));

        // Set initial state
        content.style.maxHeight = '0';
        content.style.overflow = 'hidden';
        content.style.transition = 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

        const toggleItem = () => {
          const isOpen = trigger.getAttribute('aria-expanded') === 'true';

          // If single-open mode, close all others
          if (accordion.getAttribute('data-accordion') === 'single') {
            items.forEach((otherItem) => {
              const otherTrigger = otherItem.querySelector('[data-accordion-trigger]');
              const otherContent = otherItem.querySelector('[data-accordion-content]');
              if (otherItem !== item && otherTrigger && otherContent) {
                otherTrigger.setAttribute('aria-expanded', 'false');
                otherContent.style.maxHeight = '0';
                otherItem.classList.remove('accordion-item--open');
              }
            });
          }

          if (isOpen) {
            trigger.setAttribute('aria-expanded', 'false');
            content.style.maxHeight = '0';
            item.classList.remove('accordion-item--open');
          } else {
            trigger.setAttribute('aria-expanded', 'true');
            content.style.maxHeight = content.scrollHeight + 'px';
            item.classList.add('accordion-item--open');
          }
        };

        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleItem();
        });

        item.addEventListener('click', (e) => {
          if (e.target.closest('[data-accordion-content]')) return;
          toggleItem();
        });

        // Keyboard support
        trigger.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            trigger.click();
          }
        });
      });
    });

    // FAQ Search functionality
    this.initSearch(container);
  },

  /**
   * Live search filter for FAQ items
   */
  initSearch(container) {
    const searchInput = container.querySelector('[data-accordion-search]');
    if (!searchInput) return;

    const items = container.querySelectorAll('[data-accordion-item]');

    searchInput.addEventListener(
      'input',
      Utils.debounce((e) => {
        const query = e.target.value.toLowerCase().trim();

        items.forEach((item) => {
          const text = item.textContent.toLowerCase();
          if (query === '' || text.includes(query)) {
            item.style.display = '';
            item.style.opacity = '1';
          } else {
            item.style.display = 'none';
            item.style.opacity = '0';
          }
        });
      }, 200)
    );
  },
};

window.Accordion = Accordion;
