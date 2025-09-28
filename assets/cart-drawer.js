// DIRTEA Cart Drawer JavaScript
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
    return this.drawer.classList.contains('is-open');
  }

  async updateProgress() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      
      const subtotal = cart.total_price / 100;
      const progressBar = this.drawer.querySelector('.progress__bar');
      const progressText = this.drawer.querySelector('.progress__text');
      
      if (!progressBar || !progressText) return;
      
      // Calculate progress for free shipping
      const shippingProgress = Math.min(subtotal / this.freeShippingThreshold, 1);
      const giftProgress = Math.min(subtotal / this.freeGiftThreshold, 1);
      const maxProgress = Math.max(shippingProgress, giftProgress);
      
      // Update progress bar
      progressBar.style.width = `${maxProgress * 100}%`;
      
      // Update progress text
      if (subtotal < this.freeShippingThreshold) {
        const remaining = this.freeShippingThreshold - subtotal;
        progressText.textContent = `You're £${remaining.toFixed(2)} away from FREE SHIPPING`;
        progressText.className = 'progress__text progress__text--shipping';
      } else if (subtotal < this.freeGiftThreshold) {
        const remaining = this.freeGiftThreshold - subtotal;
        progressText.textContent = `Spend £${remaining.toFixed(2)} to get a Free Gift`;
        progressText.className = 'progress__text progress__text--gift';
      } else {
        progressText.textContent = `You've unlocked Free Gift!`;
        progressText.className = 'progress__text progress__text--unlocked';
      }
      
    } catch (error) {
      console.error('Error updating cart progress:', error);
    }
  }

  async refreshCart() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      
      // Update cart count in header
      const cartCount = document.querySelector('.header__cart-count');
      if (cartCount) {
        cartCount.textContent = cart.item_count;
        cartCount.style.display = cart.item_count > 0 ? 'flex' : 'none';
      }
      
      // Update cart drawer content
      await this.updateCartContent(cart);
      
    } catch (error) {
      console.error('Error refreshing cart:', error);
    }
  }

  async updateCartContent(cart) {
    const cartItems = this.drawer.querySelector('.cart-drawer__items');
    if (!cartItems) return;
    
    if (cart.items.length === 0) {
      cartItems.innerHTML = `
        <div class="cart-drawer__empty">
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
          <a href="/collections/all" class="button button--primary">Shop Now</a>
        </div>
      `;
      return;
    }
    
    // Render cart items
    cartItems.innerHTML = cart.items.map(item => `
      <div class="cart-item" data-key="${item.key}">
        <div class="cart-item__image">
          <img src="${item.featured_image.url}" alt="${item.title}" loading="lazy">
        </div>
        <div class="cart-item__details">
          <h4 class="cart-item__title">${item.product_title}</h4>
          ${item.variant_title ? `<p class="cart-item__variant">${item.variant_title}</p>` : ''}
          <div class="cart-item__quantity">
            <button class="cart-item__quantity-btn" data-action="decrease" data-key="${item.key}">-</button>
            <span class="cart-item__quantity-display">${item.quantity}</span>
            <button class="cart-item__quantity-btn" data-action="increase" data-key="${item.key}">+</button>
          </div>
        </div>
        <div class="cart-item__price">
          <span class="cart-item__price-current">£${(item.final_price / 100).toFixed(2)}</span>
          ${item.original_price > item.final_price ? `<span class="cart-item__price-original">£${(item.original_price / 100).toFixed(2)}</span>` : ''}
        </div>
        <button class="cart-item__remove" data-action="remove" data-key="${item.key}" aria-label="Remove item">
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    `).join('');
    
    // Bind item events
    this.bindItemEvents();
  }

  bindItemEvents() {
    // Quantity buttons
    this.drawer.querySelectorAll('[data-action="increase"], [data-action="decrease"]').forEach(button => {
      button.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        const key = e.target.dataset.key;
        const currentQuantity = parseInt(e.target.parentElement.querySelector('.cart-item__quantity-display').textContent);
        
        let newQuantity = currentQuantity;
        if (action === 'increase') {
          newQuantity = currentQuantity + 1;
        } else if (action === 'decrease') {
          newQuantity = Math.max(0, currentQuantity - 1);
        }
        
        this.updateItemQuantity(key, newQuantity);
      });
    });
    
    // Remove buttons
    this.drawer.querySelectorAll('[data-action="remove"]').forEach(button => {
      button.addEventListener('click', (e) => {
        const key = e.target.dataset.key;
        this.removeItem(key);
      });
    });
  }

  async updateItemQuantity(key, quantity) {
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: key,
          quantity: quantity
        })
      });
      
      if (response.ok) {
        document.dispatchEvent(new CustomEvent('cart:updated'));
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  }

  async removeItem(key) {
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: key,
          quantity: 0
        })
      });
      
      if (response.ok) {
        document.dispatchEvent(new CustomEvent('cart:updated'));
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  announce(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'visually-hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Initialize cart drawer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CartDrawer();
});

// Export for use in other modules
window.CartDrawer = CartDrawer;
