/**
 * DIRTEA Theme JavaScript
 * Following Shopify Skeleton Theme best practices
 * All JavaScript functionality in one file
 */

// Utils class for common functionality
class Utils {
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

  static getElement(selector, parent = document) {
    try {
      return parent.querySelector(selector);
    } catch (error) {
      console.warn(`Element not found: ${selector}`, error);
      return null;
    }
  }

  static getElements(selector, parent = document) {
    try {
      return parent.querySelectorAll(selector);
    } catch (error) {
      console.warn(`Elements not found: ${selector}`, error);
      return [];
    }
  }

  static formatCurrency(amount, currency = 'GBP') {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  static isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

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

  static generateId(prefix = 'id') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }

  static isMobile() {
    return window.innerWidth <= 768;
  }

  static isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  }

  static isDesktop() {
    return window.innerWidth > 1024;
  }
}

// Main Theme Class
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
    // Preload theme CSS
    const themeCSS = document.createElement('link');
    themeCSS.rel = 'preload';
    themeCSS.href = '{{ "theme.css" | asset_url }}';
    themeCSS.as = 'style';
    themeCSS.onload = () => themeCSS.rel = 'stylesheet';
    document.head.appendChild(themeCSS);
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
          target.scrollIntoView();
        }
      });
    }
  }

  setupLazyLoading() {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  setupSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}

// Cart Drawer Class
class CartDrawer {
  constructor() {
    this.drawer = document.getElementById('cart-drawer');
    this.overlay = document.getElementById('cart-drawer-overlay');
    this.closeButton = document.querySelector('.cart-drawer__close');
    this.freeShippingThreshold = parseFloat(this.drawer?.dataset.fs || 50);
    this.freeGiftThreshold = parseFloat(this.drawer?.dataset.fg || 100);
    
    this.init();
  }

  init() {
    if (!this.drawer) return;
    
    this.bindEvents();
    this.updateProgress();
  }

  bindEvents() {
    // Close drawer events
    this.closeButton?.addEventListener('click', () => this.close());
    this.overlay?.addEventListener('click', () => this.close());
    
    // Cart update events
    document.addEventListener('cart:updated', () => this.updateProgress());
    document.addEventListener('cart:refresh', () => this.refreshCart());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  open() {
    this.drawer.classList.add('is-open');
    document.body.classList.add('cart-drawer-open');
    this.overlay?.classList.add('is-open');
    
    // Focus management
    this.drawer.focus();
    
    // Announce to screen readers
    this.announce('Cart drawer opened');
  }

  close() {
    this.drawer.classList.remove('is-open');
    document.body.classList.remove('cart-drawer-open');
    this.overlay?.classList.remove('is-open');
    
    // Announce to screen readers
    this.announce('Cart drawer closed');
  }

  isOpen() {
    return this.drawer?.classList.contains('is-open');
  }

  updateProgress() {
    if (!this.drawer) return;
    
    const progressBar = this.drawer.querySelector('.cart-progress__bar');
    const progressText = this.drawer.querySelector('.cart-progress__text');
    
    if (!progressBar || !progressText) return;
    
    // Get cart total from Shopify
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        const total = cart.total_price / 100;
        const percentage = Math.min((total / this.freeShippingThreshold) * 100, 100);
        
        progressBar.style.width = `${percentage}%`;
        
        if (total >= this.freeShippingThreshold) {
          progressText.textContent = 'You qualify for free shipping!';
          progressBar.classList.add('complete');
        } else {
          const remaining = this.freeShippingThreshold - total;
          progressText.textContent = `Add ${Utils.formatCurrency(remaining)} more for free shipping`;
          progressBar.classList.remove('complete');
        }
      })
      .catch(error => console.error('Error updating cart progress:', error));
  }

  refreshCart() {
    // Refresh cart contents
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        this.updateCartContents(cart);
        this.updateProgress();
      })
      .catch(error => console.error('Error refreshing cart:', error));
  }

  updateCartContents(cart) {
    // Update cart items display
    const cartItems = this.drawer.querySelector('.cart-items');
    if (cartItems) {
      // Update cart items HTML
      cartItems.innerHTML = this.renderCartItems(cart.items);
    }
  }

  renderCartItems(items) {
    return items.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" class="cart-item__image">
        <div class="cart-item__details">
          <h4 class="cart-item__title">${item.title}</h4>
          <p class="cart-item__price">${Utils.formatCurrency(item.price / 100)}</p>
          <div class="cart-item__quantity">
            <button class="quantity-btn" data-action="decrease" data-variant-id="${item.variant_id}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn" data-action="increase" data-variant-id="${item.variant_id}">+</button>
          </div>
        </div>
        <button class="cart-item__remove" data-action="remove" data-variant-id="${item.variant_id}">×</button>
      </div>
    `).join('');
  }

  announce(message) {
    // Create or update announcement for screen readers
    let announcer = document.getElementById('cart-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'cart-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.style.position = 'absolute';
      announcer.style.left = '-10000px';
      announcer.style.width = '1px';
      announcer.style.height = '1px';
      announcer.style.overflow = 'hidden';
      document.body.appendChild(announcer);
    }
    announcer.textContent = message;
  }
}

// Button Handlers Class
class ButtonHandlers {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Handle all CTA buttons
    document.addEventListener('click', (e) => {
      // Hero CTA buttons
      if (e.target.matches('[data-hero-cta]')) {
        this.handleHeroCTA(e.target);
      }
      
      // Tile buttons
      if (e.target.matches('[data-tile-button]')) {
        this.handleTileButton(e.target);
      }
      
      // Bundle builder buttons
      if (e.target.matches('[data-bundle-cta]')) {
        this.handleBundleCTA(e.target);
      }
      
      // Cart buttons
      if (e.target.matches('[data-cart-button]')) {
        this.handleCartButton(e.target);
      }
      
      // Search button
      if (e.target.matches('[data-search-button]')) {
        this.handleSearchButton(e.target);
      }
    });
  }

  handleHeroCTA(button) {
    const action = button.dataset.action;
    const url = button.dataset.url;
    
    console.log('Hero CTA clicked:', action, url);
    
    switch (action) {
      case 'shop':
        if (url) {
          window.location.href = url;
        } else {
          window.location.href = '/collections/all';
        }
        break;
      case 'learn':
        if (url) {
          window.location.href = url;
        } else {
          // Scroll to next section or show modal
          this.scrollToNextSection();
        }
        break;
      default:
        if (url) {
          window.location.href = url;
        }
    }
  }

  handleTileButton(button) {
    const category = button.dataset.category;
    const url = button.dataset.url;
    
    console.log('Tile button clicked:', category, url);
    
    if (url) {
      window.location.href = url;
    } else {
      // Default category URLs
      const categoryUrls = {
        'products': '/collections/all',
        'benefits': '/collections/benefits',
        'mushrooms': '/collections/mushrooms'
      };
      
      const targetUrl = categoryUrls[category] || '/collections/all';
      window.location.href = targetUrl;
    }
  }

  handleBundleCTA(button) {
    const action = button.dataset.action;
    
    console.log('Bundle CTA clicked:', action);
    
    switch (action) {
      case 'build':
        window.location.href = '/pages/build-a-stack';
        break;
      case 'learn':
        this.scrollToNextSection();
        break;
      default:
        window.location.href = '/pages/build-a-stack';
    }
  }

  handleCartButton(button) {
    const action = button.dataset.action;
    
    console.log('Cart button clicked:', action);
    
    switch (action) {
      case 'open':
        this.openCartDrawer();
        break;
      case 'close':
        this.closeCartDrawer();
        break;
      default:
        window.location.href = '/cart';
    }
  }

  handleSearchButton(button) {
    console.log('Search button clicked');
    
    // Toggle search form or redirect to search page
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
      searchForm.classList.toggle('is-open');
      const searchInput = searchForm.querySelector('input[type="search"]');
      if (searchInput) {
        searchInput.focus();
      }
    } else {
      window.location.href = '/search';
    }
  }

  openCartDrawer() {
    // Trigger cart drawer open
    const cartDrawer = document.getElementById('cart-drawer');
    if (cartDrawer && window.CartDrawer) {
      // If CartDrawer is available, use it
      const drawer = new window.CartDrawer();
      drawer.open();
    } else {
      // Fallback: redirect to cart page
      window.location.href = '/cart';
    }
  }

  closeCartDrawer() {
    // Trigger cart drawer close
    const cartDrawer = document.getElementById('cart-drawer');
    if (cartDrawer) {
      cartDrawer.classList.remove('is-open');
      document.body.classList.remove('cart-drawer-open');
    }
  }

  scrollToNextSection() {
    // Find next section and scroll to it
    const currentSection = document.querySelector('.home-hero');
    if (currentSection) {
      const nextSection = currentSection.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
}

// Header Mega Menu Class
class HeaderMega {
  constructor() {
    this.header = document.querySelector('[data-header]');
    this.mobileMenuToggle = document.querySelector('[data-mobile-menu-toggle]');
    this.navItems = document.querySelectorAll('[data-nav-item]');
    this.megamenus = document.querySelectorAll('[data-megamenu]');
    this.cartLink = document.querySelector('[data-cart-link]');
    this.cartCount = document.querySelector('[data-cart-count]');
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.updateCartCount();
  }
  
  bindEvents() {
    // Mobile menu toggle
    this.mobileMenuToggle?.addEventListener('click', () => {
      this.toggleMobileMenu();
    });
    
    // Close megamenu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('[data-nav-item]')) {
        this.closeAllMegamenus();
      }
    });
    
    // Cart updates
    document.addEventListener('cart:updated', () => {
      this.updateCartCount();
    });
  }
  
  toggleMobileMenu() {
    // Mobile menu implementation
    console.log('Mobile menu toggle');
  }
  
  closeAllMegamenus() {
    this.megamenus.forEach(menu => {
      menu.style.display = 'none';
    });
  }
  
  async updateCartCount() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      
      if (this.cartCount) {
        this.cartCount.textContent = cart.item_count;
        this.cartCount.style.display = cart.item_count > 0 ? 'flex' : 'none';
      }
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  }
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize main theme
  new DirteaTheme();
  
  // Initialize components
  new ButtonHandlers();
  
  // Initialize search functionality
  new SearchHandler();
  
  // Initialize announcement bar
  new AnnouncementBar();
  
  // Initialize cart drawer if it exists
  if (document.getElementById('cart-drawer')) {
    new CartDrawer();
  }
  
  // Initialize header mega menu
  if (document.querySelector('[data-header]')) {
    new HeaderMega();
  }
});

// Export classes to global scope
// Search functionality
class SearchHandler {
  constructor() {
    this.searchToggle = Utils.getElement('[data-search-toggle]');
    this.searchOverlay = null;
    this.init();
  }

  init() {
    if (this.searchToggle) {
      this.searchToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleSearch();
      });
    }
    this.addSearchStyles();
  }

  addSearchStyles() {
    if (document.getElementById('search-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'search-styles';
    styles.textContent = `
      .search-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
      
      .search-overlay.active {
        opacity: 1;
        visibility: visible;
      }
      
      .search-overlay__content {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        width: 90%;
        max-width: 500px;
        transform: translateY(-20px);
        transition: transform 0.3s ease;
      }
      
      .search-overlay.active .search-overlay__content {
        transform: translateY(0);
      }
      
      .search-overlay__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }
      
      .search-overlay__header h2 {
        margin: 0;
        font-size: 1.5rem;
      }
      
      .search-overlay__close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: background 0.2s ease;
      }
      
      .search-overlay__close:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      
      .search-overlay__form {
        display: flex;
        gap: 1rem;
      }
      
      .search-overlay__input {
        flex: 1;
        padding: 1rem;
        border: 2px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
      }
      
      .search-overlay__input:focus {
        outline: none;
        border-color: rgb(var(--color-base-accent-1));
      }
      
      .search-overlay__submit {
        padding: 1rem 2rem;
        background: rgb(var(--color-base-accent-1));
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        transition: background 0.2s ease;
      }
      
      .search-overlay__submit:hover {
        background: rgba(var(--color-base-accent-1), 0.8);
      }
    `;
    document.head.appendChild(styles);
  }

  toggleSearch() {
    if (!this.searchOverlay) {
      this.createSearchOverlay();
    }
    
    if (this.searchOverlay.classList.contains('active')) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }

  createSearchOverlay() {
    this.searchOverlay = document.createElement('div');
    this.searchOverlay.className = 'search-overlay';
    this.searchOverlay.innerHTML = `
      <div class="search-overlay__content">
        <div class="search-overlay__header">
          <h2>Search</h2>
          <button class="search-overlay__close" data-search-close>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <form action="/search" method="get" class="search-overlay__form">
          <input type="search" name="q" placeholder="Search products..." class="search-overlay__input" autocomplete="off">
          <button type="submit" class="search-overlay__submit">Search</button>
        </form>
      </div>
    `;
    
    document.body.appendChild(this.searchOverlay);
    
    // Add close functionality
    const closeBtn = this.searchOverlay.querySelector('[data-search-close]');
    closeBtn.addEventListener('click', () => this.closeSearch());
    
    // Close on overlay click
    this.searchOverlay.addEventListener('click', (e) => {
      if (e.target === this.searchOverlay) {
        this.closeSearch();
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.searchOverlay.classList.contains('active')) {
        this.closeSearch();
      }
    });
  }

  openSearch() {
    this.searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus on input
    setTimeout(() => {
      const input = this.searchOverlay.querySelector('.search-overlay__input');
      if (input) input.focus();
    }, 100);
  }

  closeSearch() {
    this.searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Announcement Bar functionality
class AnnouncementBar {
  constructor() {
    this.announcementBar = Utils.getElement('[data-announcement-bar]');
    this.messages = Utils.getElements('[data-announcement-message]');
    this.closeButton = Utils.getElement('[data-announcement-close]');
    this.currentIndex = 0;
    this.rotationSpeed = 5000; // 5 seconds default
    this.rotationTimer = null;
    
    this.init();
  }

  init() {
    if (!this.announcementBar) return;
    
    // Check if user previously closed the announcement bar
    if (localStorage.getItem('announcement-bar-closed') === 'true') {
      this.announcementBar.style.display = 'none';
      return;
    }
    
    // Setup close button
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.close());
    }
    
    // Start rotation if multiple messages
    if (this.messages.length > 1) {
      this.startRotation();
    }
  }

  startRotation() {
    this.rotationTimer = setInterval(() => {
      this.nextMessage();
    }, this.rotationSpeed);
  }

  nextMessage() {
    if (this.messages.length <= 1) return;
    
    // Hide current message
    this.messages[this.currentIndex].classList.remove('active');
    this.messages[this.currentIndex].removeAttribute('data-active');
    
    // Move to next message
    this.currentIndex = (this.currentIndex + 1) % this.messages.length;
    
    // Show next message
    this.messages[this.currentIndex].classList.add('active');
    this.messages[this.currentIndex].setAttribute('data-active', '');
  }

  close() {
    if (this.announcementBar) {
      this.announcementBar.style.display = 'none';
      
      // Store in localStorage to remember user preference
      localStorage.setItem('announcement-bar-closed', 'true');
      
      // Clear rotation timer
      if (this.rotationTimer) {
        clearInterval(this.rotationTimer);
      }
    }
  }
}

window.DirteaTheme = DirteaTheme;
window.CartDrawer = CartDrawer;
window.ButtonHandlers = ButtonHandlers;
window.HeaderMega = HeaderMega;
window.SearchHandler = SearchHandler;
window.AnnouncementBar = AnnouncementBar;
window.Utils = Utils;
