/**
 * DIRTEA Global JavaScript
 * Main theme initialization and global functionality
 */

import { Utils } from './utils.js';

class DirteaTheme {
  constructor() {
    this.utils = Utils;
    this.components = new Map();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeComponents();
    this.setupPerformanceOptimizations();
  }

  setupEventListeners() {
    // Global cart events
    document.addEventListener('cart:updated', this.handleCartUpdate.bind(this));
    
    // Form submissions
    document.addEventListener('submit', this.handleFormSubmit.bind(this));
    
    // Accessibility improvements
    this.setupAccessibility();
  }

  initializeComponents() {
    // Initialize any global components here
    this.setupLazyLoading();
    this.setupSmoothScrolling();
  }

  setupPerformanceOptimizations() {
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Setup intersection observer for lazy loading
    this.setupIntersectionObserver();
    
    // Optimize images
    this.optimizeImages();
  }

  preloadCriticalResources() {
    // Preload critical CSS
    const criticalCSS = document.createElement('link');
    criticalCSS.rel = 'preload';
    criticalCSS.href = '{{ "css/theme.css" | asset_url }}';
    criticalCSS.as = 'style';
    criticalCSS.onload = () => criticalCSS.rel = 'stylesheet';
    document.head.appendChild(criticalCSS);
  }

  setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            element.classList.add('in-view');
            observer.unobserve(element);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.1
      });

      // Observe all lazy elements
      document.querySelectorAll('[data-lazy]').forEach(el => {
        observer.observe(el);
      });
    }
  }

  optimizeImages() {
    // Convert images to WebP if supported
    if (this.supportsWebP()) {
      document.querySelectorAll('img[data-src]').forEach(img => {
        const src = img.getAttribute('data-src');
        if (src && !src.includes('.webp')) {
          img.setAttribute('data-src', src.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
        }
      });
    }
  }

  supportsWebP() {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  handleCartUpdate(event) {
    // Update cart count in header
    const cartCount = document.querySelector('[data-cart-count]');
    if (cartCount && event.detail?.itemCount !== undefined) {
      cartCount.textContent = event.detail.itemCount;
      cartCount.style.display = event.detail.itemCount > 0 ? 'flex' : 'none';
    }
  }

  handleFormSubmit(event) {
    const form = event.target;
    
    // Add loading state to submit buttons
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.classList.add('loading');
      submitButton.disabled = true;
    }
  }

  setupAccessibility() {
    // Skip to content link
    const skipLink = document.querySelector('.skip-to-content-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Keyboard navigation for dropdowns
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close any open dropdowns/modals
        const openDropdowns = document.querySelectorAll('[data-dropdown].is-open');
        openDropdowns.forEach(dropdown => {
          dropdown.classList.remove('is-open');
        });
      }
    });
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  setupSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}

// Utility functions
window.DirteaUtils = {
  // Format price
  formatPrice(cents, currency = 'GBP') {
    const formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency
    });
    return formatter.format(cents / 100);
  },

  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Show notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('notification--show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('notification--show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  },

  // Fetch with error handling
  async fetchJSON(url, options = {}) {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
};

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DirteaTheme();
});

// Export for use in other modules
window.DirteaTheme = DirteaTheme;
