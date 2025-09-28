// DIRTEA Bundle Builder JavaScript
class BundleBuilder {
  constructor() {
    this.container = document.querySelector('.bundle-builder');
    this.products = [];
    this.selectedProducts = [];
    this.maxProducts = 5;
    this.minProducts = 2;
    this.bundleDiscount = 0.15; // 15% discount for bundles
    this.subscriptionDiscount = 0.20; // 20% discount for subscriptions
    
    this.init();
  }

  init() {
    if (!this.container) return;
    
    this.loadProducts();
    this.bindEvents();
  }

  async loadProducts() {
    try {
      // Load products from collection or API
      const response = await fetch('/collections/bundle-products/products.json');
      const data = await response.json();
      this.products = data.products;
      
      this.renderProducts();
    } catch (error) {
      console.error('Error loading products:', error);
      // Fallback to hardcoded products for demo
      this.products = this.getDemoProducts();
      this.renderProducts();
    }
  }

  getDemoProducts() {
    return [
      {
        id: 1,
        title: 'Lion\'s Mane Powder',
        price: 2999,
        image: '/placeholder/300x300',
        benefits: ['Focus', 'Memory'],
        mushrooms: ['Lion\'s Mane'],
        format: 'powder',
        caffeine: false
      },
      {
        id: 2,
        title: 'Cordyceps Powder',
        price: 2999,
        image: '/placeholder/300x300',
        benefits: ['Energy', 'Endurance'],
        mushrooms: ['Cordyceps'],
        format: 'powder',
        caffeine: false
      },
      {
        id: 3,
        title: 'Reishi Gummies',
        price: 2499,
        image: '/placeholder/300x300',
        benefits: ['Sleep', 'Stress'],
        mushrooms: ['Reishi'],
        format: 'gummies',
        caffeine: false
      },
      {
        id: 4,
        title: 'Chaga Super Blend',
        price: 3499,
        image: '/placeholder/300x300',
        benefits: ['Immunity', 'Antioxidants'],
        mushrooms: ['Chaga'],
        format: 'powder',
        caffeine: false
      }
    ];
  }

  renderProducts() {
    const productsContainer = this.container.querySelector('.bundle-builder__products');
    if (!productsContainer) return;
    
    productsContainer.innerHTML = this.products.map(product => `
      <div class="bundle-product" data-product-id="${product.id}">
        <div class="bundle-product__image">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
        </div>
        <div class="bundle-product__content">
          <h3 class="bundle-product__title">${product.title}</h3>
          <div class="bundle-product__price">£${(product.price / 100).toFixed(2)}</div>
          <div class="bundle-product__benefits">
            ${product.benefits.map(benefit => `<span class="bundle-product__benefit">${benefit}</span>`).join('')}
          </div>
          <p class="bundle-product__description">Premium ${product.mushrooms.join(', ')} extract in ${product.format} form.</p>
          <button class="button button--primary bundle-product__select" data-product-id="${product.id}">
            Add to Bundle
          </button>
        </div>
      </div>
    `).join('');
    
    this.bindProductEvents();
  }

  bindProductEvents() {
    this.container.querySelectorAll('.bundle-product__select').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.productId);
        this.toggleProduct(productId);
      });
    });
  }

  toggleProduct(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;
    
    const isSelected = this.selectedProducts.some(p => p.id === productId);
    
    if (isSelected) {
      this.removeProduct(productId);
    } else {
      if (this.selectedProducts.length >= this.maxProducts) {
        this.showMessage(`You can select up to ${this.maxProducts} products`, 'warning');
        return;
      }
      this.addProduct(product);
    }
    
    this.updateUI();
  }

  addProduct(product) {
    this.selectedProducts.push(product);
    this.updateProductUI(product.id, true);
  }

  removeProduct(productId) {
    this.selectedProducts = this.selectedProducts.filter(p => p.id !== productId);
    this.updateProductUI(productId, false);
  }

  updateProductUI(productId, isSelected) {
    const productElement = this.container.querySelector(`[data-product-id="${productId}"]`);
    const button = productElement.querySelector('.bundle-product__select');
    
    if (isSelected) {
      productElement.classList.add('selected');
      button.textContent = 'Remove from Bundle';
      button.classList.add('button--secondary');
    } else {
      productElement.classList.remove('selected');
      button.textContent = 'Add to Bundle';
      button.classList.remove('button--secondary');
    }
  }

  updateUI() {
    this.updateSelectedProducts();
    this.updatePricing();
    this.updateActions();
  }

  updateSelectedProducts() {
    const selectedContainer = this.container.querySelector('.bundle-builder__selected');
    if (!selectedContainer) return;
    
    if (this.selectedProducts.length === 0) {
      selectedContainer.innerHTML = `
        <div class="bundle-builder__empty">
          <p>Select 2-5 products to build your bundle</p>
        </div>
      `;
      return;
    }
    
    selectedContainer.innerHTML = this.selectedProducts.map(product => `
      <div class="bundle-selected-item" data-product-id="${product.id}">
        <div class="bundle-selected-item__image">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
        </div>
        <div class="bundle-selected-item__info">
          <h4 class="bundle-selected-item__title">${product.title}</h4>
          <p class="bundle-selected-item__price">£${(product.price / 100).toFixed(2)}</p>
        </div>
        <button class="bundle-selected-item__remove" data-product-id="${product.id}" aria-label="Remove ${product.title}">
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    `).join('');
    
    // Bind remove events
    selectedContainer.querySelectorAll('.bundle-selected-item__remove').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = parseInt(e.target.closest('[data-product-id]').dataset.productId);
        this.removeProduct(productId);
        this.updateUI();
      });
    });
  }

  updatePricing() {
    const pricingContainer = this.container.querySelector('.bundle-builder__pricing');
    if (!pricingContainer) return;
    
    const subtotal = this.selectedProducts.reduce((sum, product) => sum + product.price, 0);
    const bundleDiscountAmount = subtotal * this.bundleDiscount;
    const subscriptionDiscountAmount = subtotal * this.subscriptionDiscount;
    const total = subtotal - bundleDiscountAmount;
    
    pricingContainer.innerHTML = `
      <div class="bundle-builder__pricing-row">
        <span>Subtotal (${this.selectedProducts.length} items)</span>
        <span>£${(subtotal / 100).toFixed(2)}</span>
      </div>
      ${bundleDiscountAmount > 0 ? `
        <div class="bundle-builder__pricing-row bundle-builder__discount">
          <span>Bundle Discount (${Math.round(this.bundleDiscount * 100)}%)</span>
          <span>-£${(bundleDiscountAmount / 100).toFixed(2)}</span>
        </div>
      ` : ''}
      <div class="bundle-builder__pricing-row bundle-builder__pricing-row--total">
        <span>Total</span>
        <span>£${(total / 100).toFixed(2)}</span>
      </div>
      ${this.selectedProducts.length >= this.minProducts ? `
        <div class="bundle-builder__savings">
          <p>You save £${(bundleDiscountAmount / 100).toFixed(2)} with this bundle!</p>
        </div>
      ` : ''}
    `;
  }

  updateActions() {
    const actionsContainer = this.container.querySelector('.bundle-builder__actions');
    if (!actionsContainer) return;
    
    const canAddToCart = this.selectedProducts.length >= this.minProducts;
    
    actionsContainer.innerHTML = `
      <button class="button button--primary bundle-builder__add-to-cart" ${!canAddToCart ? 'disabled' : ''}>
        Add Bundle to Cart
      </button>
      <button class="button button--secondary bundle-builder__subscribe" ${!canAddToCart ? 'disabled' : ''}>
        Subscribe & Save 20%
      </button>
    `;
    
    // Bind action events
    const addToCartButton = actionsContainer.querySelector('.bundle-builder__add-to-cart');
    const subscribeButton = actionsContainer.querySelector('.bundle-builder__subscribe');
    
    addToCartButton?.addEventListener('click', () => this.addBundleToCart(false));
    subscribeButton?.addEventListener('click', () => this.addBundleToCart(true));
  }

  async addBundleToCart(isSubscription = false) {
    if (this.selectedProducts.length < this.minProducts) {
      this.showMessage(`Please select at least ${this.minProducts} products`, 'warning');
      return;
    }
    
    try {
      const items = this.selectedProducts.map(product => ({
        id: product.id,
        quantity: 1,
        properties: {
          'Bundle': 'true',
          'Subscription': isSubscription ? 'true' : 'false'
        }
      }));
      
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items
        })
      });
      
      if (response.ok) {
        this.showMessage('Bundle added to cart!', 'success');
        document.dispatchEvent(new CustomEvent('cart:updated'));
        
        // Track bundle creation
        if (typeof gtag !== 'undefined') {
          gtag('event', 'add_to_cart', {
            currency: 'GBP',
            value: this.calculateTotal(),
            items: this.selectedProducts.map(product => ({
              item_id: product.id,
              item_name: product.title,
              category: 'Bundle',
              quantity: 1,
              price: product.price / 100
            }))
          });
        }
      } else {
        throw new Error('Failed to add bundle to cart');
      }
    } catch (error) {
      console.error('Error adding bundle to cart:', error);
      this.showMessage('Failed to add bundle to cart. Please try again.', 'error');
    }
  }

  calculateTotal() {
    const subtotal = this.selectedProducts.reduce((sum, product) => sum + product.price, 0);
    const bundleDiscountAmount = subtotal * this.bundleDiscount;
    return (subtotal - bundleDiscountAmount) / 100;
  }

  showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = this.container.querySelectorAll('.bundle-builder__message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageElement = document.createElement('div');
    messageElement.className = `bundle-builder__message bundle-builder__message--${type}`;
    messageElement.textContent = message;
    
    this.container.insertBefore(messageElement, this.container.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }
}

// Initialize bundle builder when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new BundleBuilder();
});

// Export for use in other modules
window.BundleBuilder = BundleBuilder;
