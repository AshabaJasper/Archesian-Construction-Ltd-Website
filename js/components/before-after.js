/* ============================================================
   BEFORE/AFTER — Image comparison slider
   ============================================================ */

const BeforeAfter = {
  init(container = document) {
    const sliders = container.querySelectorAll('.before-after');
    sliders.forEach((slider) => this.setup(slider));
  },

  setup(slider) {
    const handle = slider.querySelector('.before-after__handle');
    const beforeWrap = slider.querySelector('.before-after__before');
    if (!handle || !beforeWrap) return;

    let isDragging = false;

    const updatePosition = (x) => {
      const rect = slider.getBoundingClientRect();
      let percentage = ((x - rect.left) / rect.width) * 100;
      percentage = Utils.clamp(percentage, 2, 98);

      handle.style.left = percentage + '%';
      beforeWrap.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    };

    // Mouse events
    handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events
    handle.addEventListener('touchstart', (e) => {
      isDragging = true;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      updatePosition(e.touches[0].clientX);
    }, { passive: true });

    document.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Click to set position
    slider.addEventListener('click', (e) => {
      updatePosition(e.clientX);
    });

    // Keyboard accessibility
    slider.setAttribute('tabindex', '0');
    slider.setAttribute('role', 'slider');
    slider.setAttribute('aria-label', 'Before and after image comparison');
    slider.setAttribute('aria-valuemin', '0');
    slider.setAttribute('aria-valuemax', '100');
    slider.setAttribute('aria-valuenow', '50');

    slider.addEventListener('keydown', (e) => {
      const rect = slider.getBoundingClientRect();
      const currentLeft = parseFloat(handle.style.left) || 50;
      let newLeft = currentLeft;

      if (e.key === 'ArrowLeft') {
        newLeft = Math.max(2, currentLeft - 2);
      } else if (e.key === 'ArrowRight') {
        newLeft = Math.min(98, currentLeft + 2);
      }

      if (newLeft !== currentLeft) {
        e.preventDefault();
        handle.style.left = newLeft + '%';
        beforeWrap.style.clipPath = `inset(0 ${100 - newLeft}% 0 0)`;
        slider.setAttribute('aria-valuenow', Math.round(newLeft));
      }
    });
  },
};

window.BeforeAfter = BeforeAfter;
