/* ============================================================
   FORMS — General form validation & submission
   ============================================================ */

const Forms = {
  endpoint: 'https://formspree.io/f/YOUR_FORM_ID',

  init(container = document) {
    const forms = container.querySelectorAll('form[data-form]');
    forms.forEach((form) => this.setup(form));
  },

  setup(form) {
    const submitBtn = form.querySelector('[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!this.validate(form)) return;
      this.setLoading(submitBtn, true);

      try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const response = await fetch(this.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          this.showToast('Message sent successfully!', 'success');
          form.reset();
        } else {
          throw new Error('Failed');
        }
      } catch (err) {
        this.showToast('Something went wrong. Please try again.', 'error');
      } finally {
        this.setLoading(submitBtn, false);
      }
    });

    form.querySelectorAll('[required]').forEach((input) => {
      input.addEventListener('blur', () => this.validateField(input));
    });
  },

  validate(form) {
    let isValid = true;
    form.querySelectorAll('[required]').forEach((f) => {
      if (!this.validateField(f)) isValid = false;
    });
    if (!isValid) {
      const first = form.querySelector('.form-input--error');
      if (first) first.focus();
    }
    return isValid;
  },

  validateField(field) {
    const val = field.value.trim();
    let ok = true, msg = '';
    if (field.required && !val) { ok = false; msg = 'Required'; }
    if (ok && field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      ok = false; msg = 'Invalid email';
    }
    const err = field.parentElement.querySelector('.form-error');
    field.classList.toggle('form-input--error', !ok);
    if (err) err.textContent = ok ? '' : msg;
    return ok;
  },

  setLoading(btn, loading) {
    if (!btn) return;
    if (loading) { btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> Sending...'; }
    else { btn.disabled = false; btn.textContent = 'Submit'; }
  },

  showToast(message, type) {
    let toast = document.querySelector('.toast');
    if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; document.body.appendChild(toast); }
    toast.textContent = message;
    toast.className = `toast toast--${type} toast--visible`;
    setTimeout(() => toast.classList.remove('toast--visible'), 5000);
  },
};

window.Forms = Forms;
