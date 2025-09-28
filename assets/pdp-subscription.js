// DIRTEA Product Page Subscription JavaScript
class PDPSubscription {
  constructor() {
    this.container = document.querySelector('.product');
    this.subscriptionToggle = null;
    this.priceDisplay = null;
    this.addToCartButton = null;
    this.subscriptionDiscount = 0.20; // 20% discount for subscriptions
    
    this.init();
  }

  init() {
    if (!this.container) return;
    
    this.findElements();
    this.bindEvents();
    this.updatePricing();
  }

  findElements() {
    this.subscriptionToggle = this.container.querySelector('.product__subscription-toggle');
    this.priceDisplay = this.container.querySelector('.product__price');
    this.addToCartButton = this.container.querySelector('.product__add-to-cart');
    this.originalPrice = this.getOriginalPrice();
  }

  getOriginalPrice() {
    const priceElement = this.priceDisplay?.querySelector('.product__price-current');
    if (!priceElement) return 0;
    
    const priceText = priceElement.textContent.replace(/[£,]/g, '');
    return parseFloat(priceText) * 100; // Convert to pence
  }

  bindEvents() {
    if (this.subscriptionToggle) {
      this.subscriptionToggle.addEventListener('change', () => {
        this.updatePricing();
        this.updateAddToCartButton();
      });
    }
  }

  updatePricing() {
    if (!this.priceDisplay || !this.originalPrice) return;
    
    const isSubscription = this.subscriptionToggle?.checked || false;
    const currentPrice = isSubscription 
      ? this.originalPrice * (1 - this.subscriptionDiscount)
      : this.originalPrice;
    
    const priceCurrent = this.priceDisplay.querySelector('.product__price-current');
    const priceCompare = this.priceDisplay.querySelector('.product__price--compare');
    
    if (priceCurrent) {
      priceCurrent.textContent = `£${(currentPrice / 100).toFixed(2)}`;
    }
    
    if (isSubscription && priceCompare) {
      priceCompare.textContent = `£${(this.originalPrice / 100).toFixed(2)}`;
      priceCompare.style.display = 'inline';
    } else if (priceCompare) {
      priceCompare.style.display = 'none';
    }
    
    // Update savings display
    this.updateSavingsDisplay(isSubscription);
  }

  updateSavingsDisplay(isSubscription) {
    let savingsElement = this.container.querySelector('.product__savings');
    
    if (isSubscription) {
      const savings = this.originalPrice * this.subscriptionDiscount;
      
      if (!savingsElement) {
        savingsElement = document.createElement('div');
        savingsElement.className = 'product__savings';
        this.priceDisplay?.appendChild(savingsElement);
      }
      
      savingsElement.innerHTML = `
        <span class="product__savings-text">Save £${(savings / 100).toFixed(2)} with subscription</span>
      `;
    } else if (savingsElement) {
      savingsElement.remove();
    }
  }

  updateAddToCartButton() {
    if (!this.addToCartButton) return;
    
    const isSubscription = this.subscriptionToggle?.checked || false;
    const buttonText = isSubscription ? 'Subscribe & Save 20%' : 'Add to Cart';
    
    this.addToCartButton.textContent = buttonText;
    this.addToCartButton.dataset.subscription = isSubscription;
  }

  getSubscriptionData() {
    const isSubscription = this.subscriptionToggle?.checked || false;
    
    if (!isSubscription) return null;
    
    return {
      subscription: true,
      discount_percentage: this.subscriptionDiscount * 100,
      frequency: 'monthly', // Default frequency
      properties: {
        'Subscription': 'true',
        'Discount': `${this.subscriptionDiscount * 100}%`
      }
    };
  }
}

// Subscription Toggle Component
class SubscriptionToggle {
  constructor(container) {
    this.container = container;
    this.toggle = null;
    this.labels = {
      oneTime: 'One-time purchase',
      subscription: 'Subscribe & Save 20%'
    };
    
    this.init();
  }

  init() {
    this.createToggle();
    this.bindEvents();
  }

  createToggle() {
    this.toggle = document.createElement('div');
    this.toggle.className = 'subscription-toggle';
    this.toggle.innerHTML = `
      <div class="subscription-toggle__options">
        <label class="subscription-toggle__option">
          <input type="radio" name="purchase-type" value="one-time" checked>
          <span class="subscription-toggle__label">${this.labels.oneTime}</span>
        </label>
        <label class="subscription-toggle__option subscription-toggle__option--highlighted">
          <input type="radio" name="purchase-type" value="subscription">
          <span class="subscription-toggle__label">${this.labels.subscription}</span>
          <span class="subscription-toggle__badge">Save 20%</span>
        </label>
      </div>
    `;
    
    this.container.appendChild(this.toggle);
  }

  bindEvents() {
    const radioButtons = this.toggle.querySelectorAll('input[name="purchase-type"]');
    
    radioButtons.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.onChange(e.target.value);
      });
    });
  }

  onChange(value) {
    const isSubscription = value === 'subscription';
    
    // Update visual state
    this.toggle.classList.toggle('subscription-toggle--subscription', isSubscription);
    
    // Dispatch custom event
    this.container.dispatchEvent(new CustomEvent('subscription:change', {
      detail: { isSubscription, value }
    }));
  }

  getValue() {
    const checkedRadio = this.toggle.querySelector('input[name="purchase-type"]:checked');
    return checkedRadio?.value || 'one-time';
  }

  setValue(value) {
    const radio = this.toggle.querySelector(`input[value="${value}"]`);
    if (radio) {
      radio.checked = true;
      this.onChange(value);
    }
  }
}

// Subscription Benefits Component
class SubscriptionBenefits {
  constructor(container) {
    this.container = container;
    this.benefits = [
      {
        icon: '💰',
        title: 'Save 20%',
        description: 'Get 20% off every order'
      },
      {
        icon: '🚚',
        title: 'Free Shipping',
        description: 'Free delivery on all subscription orders'
      },
      {
        icon: '🔄',
        title: 'Flexible',
        description: 'Skip, pause, or cancel anytime'
      },
      {
        icon: '🎁',
        title: 'Exclusive Access',
        description: 'Early access to new products and flavors'
      }
    ];
    
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="subscription-benefits">
        <h4 class="subscription-benefits__title">Subscription Benefits</h4>
        <div class="subscription-benefits__grid">
          ${this.benefits.map(benefit => `
            <div class="subscription-benefit">
              <div class="subscription-benefit__icon">${benefit.icon}</div>
              <div class="subscription-benefit__content">
                <h5 class="subscription-benefit__title">${benefit.title}</h5>
                <p class="subscription-benefit__description">${benefit.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

// Initialize subscription components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize main subscription handler
  new PDPSubscription();
  
  // Initialize subscription toggle if present
  const toggleContainer = document.querySelector('.product__subscription-container');
  if (toggleContainer) {
    new SubscriptionToggle(toggleContainer);
  }
  
  // Initialize subscription benefits if present
  const benefitsContainer = document.querySelector('.product__subscription-benefits');
  if (benefitsContainer) {
    new SubscriptionBenefits(benefitsContainer);
  }
});

// Export for use in other modules
window.PDPSubscription = PDPSubscription;
window.SubscriptionToggle = SubscriptionToggle;
window.SubscriptionBenefits = SubscriptionBenefits;
