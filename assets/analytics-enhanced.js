/**
 * Enhanced Analytics for Mushroom Matters
 * Tracks e-commerce events, custom interactions, and user behavior
 */

class MushroomAnalytics {
  constructor() {
    this.dataLayer = window.dataLayer || [];
    this.init();
  }

  init() {
    this.trackPageView();
    this.trackProductViews();
    this.trackAddToCart();
    this.trackSearch();
    this.trackNewsletterSignup();
    this.trackContactForm();
    this.trackReviews();
    this.trackFilterUsage();
  }

  // Track page views with enhanced data
  trackPageView() {
    const pageData = {
      event: 'page_view',
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_type: this.getPageType(),
      user_agent: navigator.userAgent,
      language: document.documentElement.lang || 'en',
      timestamp: new Date().toISOString()
    };

    this.dataLayer.push(pageData);
  }

  // Track product views with detailed product information
  trackProductViews() {
    if (typeof window.productJson !== 'undefined') {
      const product = JSON.parse(window.productJson);
      
      this.dataLayer.push({
        event: 'view_item',
        ecommerce: {
          currency: window.Shopify?.currency?.active || 'USD',
          value: product.price / 100,
          items: [{
            item_id: product.id,
            item_name: product.title,
            item_category: product.type,
            item_brand: product.vendor,
            item_variant: product.selected_or_first_available_variant?.title,
            price: product.price / 100,
            quantity: 1,
            // Custom dimensions for mushroom products
            custom_dimension_1: product.metafields?.custom?.extraction_method,
            custom_dimension_2: product.metafields?.custom?.beta_glucans_percent,
            custom_dimension_3: product.metafields?.custom?.origin
          }]
        }
      });
    }
  }

  // Track add to cart events
  trackAddToCart() {
    document.addEventListener('submit', (e) => {
      if (e.target.matches('form[action*="/cart/add"]')) {
        const formData = new FormData(e.target);
        const productId = formData.get('id');
        const quantity = parseInt(formData.get('quantity')) || 1;
        
        // Get product data from the form
        const productElement = e.target.closest('[data-product-id]');
        if (productElement) {
          const productData = JSON.parse(productElement.dataset.productJson || '{}');
          
          this.dataLayer.push({
            event: 'add_to_cart',
            ecommerce: {
              currency: window.Shopify?.currency?.active || 'USD',
              value: (productData.price / 100) * quantity,
              items: [{
                item_id: productData.id,
                item_name: productData.title,
                item_category: productData.type,
                item_brand: productData.vendor,
                item_variant: productData.selected_or_first_available_variant?.title,
                price: productData.price / 100,
                quantity: quantity
              }]
            }
          });
        }
      }
    });
  }

  // Track search queries and results
  trackSearch() {
    const searchInput = document.querySelector('input[name="q"]');
    if (searchInput) {
      searchInput.addEventListener('input', this.debounce((e) => {
        const query = e.target.value.trim();
        if (query.length > 2) {
          this.dataLayer.push({
            event: 'search',
            search_term: query,
            search_type: 'autocomplete'
          });
        }
      }, 500));
    }

    // Track search form submissions
    const searchForm = document.querySelector('form[action*="/search"]');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        const formData = new FormData(e.target);
        const query = formData.get('q');
        
        this.dataLayer.push({
          event: 'search',
          search_term: query,
          search_type: 'form_submission'
        });
      });
    }
  }

  // Track newsletter signup
  trackNewsletterSignup() {
    const newsletterForms = document.querySelectorAll('form[action*="/contact"]');
    newsletterForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        const formData = new FormData(e.target);
        const email = formData.get('email');
        
        if (email && email.includes('@')) {
          this.dataLayer.push({
            event: 'newsletter_signup',
            email: email,
            form_type: 'newsletter'
          });
        }
      });
    });
  }

  // Track contact form submissions
  trackContactForm() {
    const contactForms = document.querySelectorAll('form[action*="/contact"]');
    contactForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        const formData = new FormData(e.target);
        const formType = formData.get('form_type') || 'contact';
        
        this.dataLayer.push({
          event: 'form_submission',
          form_type: formType,
          page_location: window.location.href
        });
      });
    });
  }

  // Track review interactions
  trackReviews() {
    // Track review widget interactions
    const reviewWidgets = document.querySelectorAll('[data-review-widget]');
    reviewWidgets.forEach(widget => {
      widget.addEventListener('click', (e) => {
        this.dataLayer.push({
          event: 'review_interaction',
          interaction_type: 'widget_click',
          product_id: widget.dataset.productId
        });
      });
    });

    // Track review form submissions
    const reviewForms = document.querySelectorAll('form[data-review-form]');
    reviewForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        this.dataLayer.push({
          event: 'review_submission',
          product_id: form.dataset.productId,
          rating: form.querySelector('input[name="rating"]:checked')?.value
        });
      });
    });
  }

  // Track filter usage
  trackFilterUsage() {
    const filterInputs = document.querySelectorAll('input[type="checkbox"][name*="filter"]');
    filterInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        this.dataLayer.push({
          event: 'filter_usage',
          filter_type: e.target.name,
          filter_value: e.target.value,
          filter_action: e.target.checked ? 'applied' : 'removed'
        });
      });
    });
  }

  // Track custom events
  trackCustomEvent(eventName, eventData = {}) {
    this.dataLayer.push({
      event: eventName,
      ...eventData,
      timestamp: new Date().toISOString()
    });
  }

  // Track scroll depth
  trackScrollDepth() {
    let maxScroll = 0;
    const scrollThresholds = [25, 50, 75, 90, 100];
    
    window.addEventListener('scroll', this.throttle(() => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        scrollThresholds.forEach(threshold => {
          if (scrollPercent >= threshold && maxScroll < threshold) {
            this.dataLayer.push({
              event: 'scroll_depth',
              scroll_percent: threshold
            });
          }
        });
      }
    }, 100));
  }

  // Track time on page
  trackTimeOnPage() {
    const startTime = Date.now();
    
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      
      this.dataLayer.push({
        event: 'time_on_page',
        time_seconds: timeOnPage
      });
    });
  }

  // Utility functions
  getPageType() {
    if (window.location.pathname === '/') return 'home';
    if (window.location.pathname.includes('/products/')) return 'product';
    if (window.location.pathname.includes('/collections/')) return 'collection';
    if (window.location.pathname.includes('/search')) return 'search';
    if (window.location.pathname.includes('/cart')) return 'cart';
    if (window.location.pathname.includes('/checkout')) return 'checkout';
    return 'other';
  }

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
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize analytics when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MushroomAnalytics();
});

// Export for use in other scripts
window.MushroomAnalytics = MushroomAnalytics;
