/* ============================================================
   SLIDER — Swiper carousel initialization
   ============================================================ */

const Slider = {
  instances: [],

  init(container = document) {
    // Featured projects carousel
    this.initFeaturedProjects(container);

    // Testimonials slider
    this.initTestimonials(container);

    // General sliders
    this.initGeneral(container);
  },

  initFeaturedProjects(container) {
    const el = container.querySelector('.swiper--projects');
    if (!el) return;

    const swiper = new Swiper(el, {
      slidesPerView: 1.15,
      spaceBetween: 24,
      speed: 800,
      grabCursor: true,
      loop: false,
      navigation: {
        nextEl: '.swiper-btn--next',
        prevEl: '.swiper-btn--prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 2.2,
          spaceBetween: 32,
        },
        1024: {
          slidesPerView: 2.5,
          spaceBetween: 40,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 48,
        },
      },
    });

    this.instances.push(swiper);
  },

  initTestimonials(container) {
    const el = container.querySelector('.swiper--testimonials');
    if (!el) return;

    const swiper = new Swiper(el, {
      slidesPerView: 1,
      spaceBetween: 32,
      speed: 600,
      loop: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: true,
      },
      pagination: {
        el: '.swiper-pagination--testimonials',
        clickable: true,
        bulletClass: 'swiper-bullet',
        bulletActiveClass: 'swiper-bullet--active',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });

    this.instances.push(swiper);
  },

  initGeneral(container) {
    const els = container.querySelectorAll('.swiper--general');
    els.forEach((el) => {
      const swiper = new Swiper(el, {
        slidesPerView: 1.15,
        spaceBetween: 20,
        speed: 600,
        grabCursor: true,
        breakpoints: {
          768: {
            slidesPerView: 2.2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      });
      this.instances.push(swiper);
    });
  },

  destroyAll() {
    this.instances.forEach((s) => s.destroy(true, true));
    this.instances = [];
  },
};

window.Slider = Slider;
