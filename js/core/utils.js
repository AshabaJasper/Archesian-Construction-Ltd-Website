/* ============================================================
   UTILITIES — Shared helper functions
   ============================================================ */

const Utils = {
  /**
   * Debounce — delays execution until after wait period of inactivity
   */
  debounce(fn, wait = 200) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), wait);
    };
  },

  /**
   * Throttle — limits execution to once per wait period
   */
  throttle(fn, wait = 100) {
    let lastTime = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastTime >= wait) {
        lastTime = now;
        fn.apply(this, args);
      }
    };
  },

  /**
   * Linear interpolation — for smooth animations
   */
  lerp(start, end, factor) {
    return start + (end - start) * factor;
  },

  /**
   * Clamp a value between min and max
   */
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  },

  /**
   * Map a value from one range to another
   */
  mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  },

  /**
   * Check if device supports hover (not touch-only)
   */
  hasHover() {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  },

  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Check if element is in viewport
   */
  isInViewport(el, threshold = 0) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top < window.innerHeight - threshold &&
      rect.bottom > threshold &&
      rect.left < window.innerWidth - threshold &&
      rect.right > threshold
    );
  },

  /**
   * Get viewport dimensions
   */
  getViewport() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },

  /**
   * Check breakpoint
   */
  isMobile() {
    return window.innerWidth < 768;
  },

  isTablet() {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
  },

  isDesktop() {
    return window.innerWidth >= 1024;
  },

  /**
   * Select single element with error logging
   */
  qs(selector, context = document) {
    return context.querySelector(selector);
  },

  /**
   * Select multiple elements as array
   */
  qsa(selector, context = document) {
    return [...context.querySelectorAll(selector)];
  },

  /**
   * Format number with commas
   */
  formatNumber(num) {
    return num.toLocaleString();
  },

  /**
   * Generate a unique ID
   */
  uid(prefix = 'uid') {
    return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Set a cookie
   */
  setCookie(name, value, days = 30) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  },

  /**
   * Get a cookie
   */
  getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  },

  /**
   * Wait for specified milliseconds
   */
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * Run callback when DOM is ready
   */
  ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  },
};

// Make globally available
window.Utils = Utils;
