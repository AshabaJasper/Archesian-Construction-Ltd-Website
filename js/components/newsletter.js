/* ============================================================
   NEWSLETTER — Cookie-controlled modal
   ============================================================ */

const Newsletter = {
  cookieName: 'newsletter_dismissed',

  init(container = document) {
    const forms = container.querySelectorAll('[data-newsletter-form]');

    forms.forEach((form) => {
      if (form.dataset.newsletterBound === 'true') return;
      form.dataset.newsletterBound = 'true';

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = form.querySelector('input[type="email"]');
        if (email && !email.checkValidity()) {
          email.reportValidity();
          return;
        }

        form.reset();
        this.showToast('Thanks for subscribing.', 'success');

        const modal = form.closest('.newsletter-modal');
        if (modal) this.dismiss(modal);
      });
    });
  },

  checkAndShow() {
    if (Utils.getCookie(this.cookieName)) return;

    const modal = document.querySelector('.newsletter-modal');
    if (!modal) return;

    modal.classList.add('newsletter-modal--visible');

    // Close on X button
    const closeBtn = modal.querySelector('.newsletter-modal__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.dismiss(modal));
    }

    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.dismiss(modal);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.dismiss(modal);
    });
  },

  dismiss(modal) {
    modal.classList.remove('newsletter-modal--visible');
    Utils.setCookie(this.cookieName, 'true', 30);
  },

  showToast(message, type) {
    if (window.Forms) {
      Forms.showToast(message, type);
      return;
    }

    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = `toast toast--${type} toast--visible`;
    setTimeout(() => toast.classList.remove('toast--visible'), 5000);
  },
};

window.Newsletter = Newsletter;
