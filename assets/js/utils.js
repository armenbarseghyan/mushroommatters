/**
 * DIRTEA Theme Utilities
 * Common utility functions used across the theme
 */

export class Utils {
  /**
   * Debounce function to limit function calls
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @param {boolean} immediate - Execute immediately
   * @returns {Function} Debounced function
   */
  static debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }

  /**
   * Throttle function to limit function calls
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} Throttled function
   */
  static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Get element by selector with error handling
   * @param {string} selector - CSS selector
   * @param {Element} parent - Parent element to search within
   * @returns {Element|null} Found element or null
   */
  static getElement(selector, parent = document) {
    try {
      return parent.querySelector(selector);
    } catch (error) {
      console.warn(`Element not found: ${selector}`, error);
      return null;
    }
  }

  /**
   * Get all elements by selector with error handling
   * @param {string} selector - CSS selector
   * @param {Element} parent - Parent element to search within
   * @returns {NodeList} Found elements
   */
  static getElements(selector, parent = document) {
    try {
      return parent.querySelectorAll(selector);
    } catch (error) {
      console.warn(`Elements not found: ${selector}`, error);
      return [];
    }
  }

  /**
   * Format currency value
   * @param {number} amount - Amount to format
   * @param {string} currency - Currency code
   * @returns {string} Formatted currency string
   */
  static formatCurrency(amount, currency = 'GBP') {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  /**
   * Check if element is in viewport
   * @param {Element} element - Element to check
   * @returns {boolean} True if element is in viewport
   */
  static isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Smooth scroll to element
   * @param {Element|string} target - Element or selector to scroll to
   * @param {number} offset - Offset from top
   */
  static smoothScrollTo(target, offset = 0) {
    const element = typeof target === 'string' ? this.getElement(target) : target;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Generate unique ID
   * @param {string} prefix - Prefix for the ID
   * @returns {string} Unique ID
   */
  static generateId(prefix = 'id') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Check if device is mobile
   * @returns {boolean} True if mobile device
   */
  static isMobile() {
    return window.innerWidth <= 768;
  }

  /**
   * Check if device is tablet
   * @returns {boolean} True if tablet device
   */
  static isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  }

  /**
   * Check if device is desktop
   * @returns {boolean} True if desktop device
   */
  static isDesktop() {
    return window.innerWidth > 1024;
  }
}
