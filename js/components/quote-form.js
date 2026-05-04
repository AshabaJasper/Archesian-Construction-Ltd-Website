/* ============================================================
   QUOTE FORM — Multi-step form with localStorage persistence
   ============================================================ */

const QuoteForm = {
  form: null,
  steps: [],
  currentStep: 0,
  storageKey: 'quote_form_data',

  init() {
    this.form = document.getElementById('quote-form');
    if (!this.form) return;

    this.steps = this.form.querySelectorAll('[data-step]');
    this.loadProgress();
    this.showStep(this.currentStep);
    this.bindEvents();
  },

  bindEvents() {
    // Next/Prev buttons
    this.form.querySelectorAll('[data-action="next"]').forEach((btn) => {
      btn.addEventListener('click', () => this.next());
    });

    this.form.querySelectorAll('[data-action="prev"]').forEach((btn) => {
      btn.addEventListener('click', () => this.prev());
    });

    // Auto-save on input change
    this.form.addEventListener('input', Utils.debounce(() => this.saveProgress(), 500));

    // Radio card selection
    this.form.querySelectorAll('.radio-card').forEach((card) => {
      card.addEventListener('click', () => {
        const group = card.closest('[data-radio-group]');
        if (group) {
          group.querySelectorAll('.radio-card').forEach((c) => c.classList.remove('radio-card--selected'));
          card.classList.add('radio-card--selected');
          const input = card.querySelector('input');
          if (input) input.checked = true;
        }
      });
    });

    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submit();
    });
  },

  showStep(index) {
    this.steps.forEach((step, i) => {
      step.style.display = i === index ? 'block' : 'none';
    });

    // Update progress bar
    const progressSteps = document.querySelectorAll('.progress-bar__step');
    progressSteps.forEach((bar, i) => {
      bar.classList.toggle('progress-bar__step--completed', i < index);
      bar.classList.toggle('progress-bar__step--active', i === index);
    });

    // Update step labels
    const labels = document.querySelectorAll('.progress-bar__label-item');
    labels.forEach((label, i) => {
      label.classList.toggle('progress-bar__label-item--active', i === index);
    });

    // Animate step entrance
    if (!Utils.prefersReducedMotion()) {
      gsap.fromTo(this.steps[index],
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );
    }

    this.currentStep = index;
  },

  next() {
    if (!this.validateCurrentStep()) return;
    if (this.currentStep < this.steps.length - 1) {
      this.showStep(this.currentStep + 1);
      this.saveProgress();
    }
  },

  prev() {
    if (this.currentStep > 0) {
      this.showStep(this.currentStep - 1);
    }
  },

  validateCurrentStep() {
    const step = this.steps[this.currentStep];
    const requiredFields = step.querySelectorAll('[required]');
    let valid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        valid = false;
        field.classList.add('form-input--error');
        const err = field.parentElement.querySelector('.form-error');
        if (err) err.textContent = 'This field is required';
      } else {
        field.classList.remove('form-input--error');
        const err = field.parentElement.querySelector('.form-error');
        if (err) err.textContent = '';
      }
    });

    return valid;
  },

  saveProgress() {
    const formData = new FormData(this.form);
    const data = { step: this.currentStep, fields: Object.fromEntries(formData.entries()) };
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  },

  loadProgress() {
    const saved = localStorage.getItem(this.storageKey);
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      if (data.fields) {
        Object.entries(data.fields).forEach(([key, value]) => {
          const input = this.form.elements[key];
          if (input) input.value = value;
        });
      }
      if (typeof data.step === 'number') {
        this.currentStep = data.step;
      }
    } catch (e) {
      console.warn('[QuoteForm] Could not load saved progress');
    }
  },

  async submit() {
    if (!this.validateCurrentStep()) return;

    const submitBtn = this.form.querySelector('[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<span class="spinner"></span> Submitting...'; }

    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());
    const refNum = 'QR-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 99999)).padStart(5, '0');
    data.reference = refNum;

    try {
      const response = await fetch(Forms.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        localStorage.removeItem(this.storageKey);
        this.showConfirmation(refNum);
      } else {
        throw new Error('Failed');
      }
    } catch (err) {
      Forms.showToast('Submission failed. Please try again.', 'error');
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Quote Request'; }
    }
  },

  showConfirmation(refNum) {
    const confirmation = document.querySelector('.quote-confirmation');
    if (confirmation) {
      confirmation.querySelector('.quote-ref').textContent = refNum;
      this.form.style.display = 'none';
      confirmation.style.display = 'block';
      gsap.fromTo(confirmation, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    }
  },
};

window.QuoteForm = QuoteForm;
