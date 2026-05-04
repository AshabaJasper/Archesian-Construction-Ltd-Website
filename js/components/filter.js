/* ============================================================
   PROJECT FILTER — Filter & sort for projects gallery
   ============================================================ */

const ProjectFilter = {
  container: null,
  items: [],
  activeFilters: { category: 'all' },

  init() {
    this.container = document.querySelector('[data-project-grid]');
    if (!this.container) return;

    this.items = [...this.container.querySelectorAll('[data-project-item]')];
    this.bindFilterPills();
    this.bindViewToggle();
    this.bindSort();
  },

  bindFilterPills() {
    document.querySelectorAll('[data-filter-category]').forEach((pill) => {
      pill.addEventListener('click', () => {
        const category = pill.getAttribute('data-filter-category');

        // Update active pill
        document.querySelectorAll('[data-filter-category]').forEach((p) => p.classList.remove('filter-pill--active'));
        pill.classList.add('filter-pill--active');

        this.activeFilters.category = category;
        this.applyFilters();
      });
    });
  },

  applyFilters() {
    const { category } = this.activeFilters;

    this.items.forEach((item) => {
      const itemCat = item.getAttribute('data-category');
      const show = category === 'all' || itemCat === category;

      if (show) {
        item.style.display = '';
        gsap.fromTo(item, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
      } else {
        gsap.to(item, {
          opacity: 0, y: -10, duration: 0.2, ease: 'power2.in',
          onComplete: () => { item.style.display = 'none'; },
        });
      }
    });
  },

  bindSort() {
    const sortSelect = document.querySelector('[data-sort]');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', () => {
      const value = sortSelect.value;
      const sorted = [...this.items].sort((a, b) => {
        const aVal = a.getAttribute('data-year');
        const bVal = b.getAttribute('data-year');
        return value === 'newest' ? bVal - aVal : aVal - bVal;
      });

      sorted.forEach((item) => this.container.appendChild(item));
    });
  },

  bindViewToggle() {
    document.querySelectorAll('[data-view]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        document.querySelectorAll('[data-view]').forEach((b) => b.classList.remove('filter-pill--active'));
        btn.classList.add('filter-pill--active');

        this.container.className = this.container.className.replace(/view--(grid|list|map)/g, '');
        this.container.classList.add(`view--${view}`);
      });
    });
  },
};

window.ProjectFilter = ProjectFilter;
