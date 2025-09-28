# DIRTEA Theme Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- Shopify CLI 3.0+
- Git

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Deploy to Shopify
npm run build
```

## 📁 Project Structure

```
dirttea-theme/
├── assets/
│   ├── css/                    # Stylesheets
│   │   ├── critical.css        # Critical above-the-fold styles
│   │   └── theme.css           # Additional theme styles
│   ├── js/                     # JavaScript modules
│   │   ├── global.js           # Main theme initialization
│   │   ├── utils.js            # Utility functions
│   │   ├── cart-drawer.js      # Cart drawer functionality
│   │   ├── bundle-builder.js   # Bundle creation
│   │   └── pdp-subscription.js # Product subscription toggle
│   └── images/                 # Static images and icons
├── blocks/                     # Reusable components
├── config/                     # Theme settings
├── layout/                     # Base templates
├── locales/                    # Translations
├── sections/                    # Page sections
├── snippets/                   # Helper snippets
└── templates/                  # JSON page templates
```

## 🎨 CSS Architecture

### Critical CSS (`assets/css/critical.css`)
- Header, navigation, and footer styles
- Above-the-fold content
- Essential typography and layout
- Cart drawer and modal styles

### Theme CSS (`assets/css/theme.css`)
- Product pages and collection layouts
- Blog and content pages
- Interactive components
- Responsive breakpoints

### CSS Variables
All theme settings are converted to CSS custom properties in `layout/theme.liquid`:
```css
:root {
  --color-base-text: {{ settings.colors_text.red }}, {{ settings.colors_text.green }}, {{ settings.colors_text.blue }};
  --font-body-family: {{ settings.type_body_font.family }};
  --page-width: {{ settings.page_width | divided_by: 10 }}rem;
}
```

## 🔧 JavaScript Architecture

### Module System
- ES6 modules with import/export
- Event-driven architecture
- Component-based structure
- Performance optimizations

### Key Components
- **DirteaTheme**: Main theme class
- **Utils**: Common utility functions
- **CartDrawer**: Cart functionality
- **BundleBuilder**: Product bundling
- **SubscriptionToggle**: Subscription management

### Performance Features
- Lazy loading with Intersection Observer
- WebP image optimization
- Critical resource preloading
- Debounced event handlers

## 📝 Liquid Templates

### Sections
Each section is self-contained with:
- Schema for customization
- Block support for flexibility
- Responsive design
- Accessibility features

### Key Sections
- `header-mega.liquid`: Sticky header with mega menu
- `main-product.liquid`: Product page layout
- `bundle-builder.liquid`: Bundle creation interface
- `footer.liquid`: Site footer with blocks

### Snippets
Reusable components:
- `icon.liquid`: SVG icon system
- `meta-tags.liquid`: SEO meta tags
- `product-tile.liquid`: Product card component

## ⚙️ Theme Settings

### Global Settings
- Logo and branding
- Announcement bar
- Color scheme
- Typography

### Commerce Settings
- Free shipping thresholds
- Subscription discounts
- Bundle pricing
- Cart behavior

### DIRTEA Standard Features
Six configurable standard features:
1. 🌱 0g Sugar
2. 🔥 ≤20 kcal  
3. 💊 3000mg (high potency)
4. 🌿 Vegan
5. 🇬🇧 Made in UK
6. ♻️ Eco Pack

## 🚀 Development Workflow

### Code Quality
```bash
# Lint CSS
npm run lint:css

# Lint JavaScript
npm run lint:js

# Format code
npm run format

# Validate theme
npm run validate
```

### Performance Testing
- Lighthouse score ≥ 90
- LCP < 2.5s
- CLS < 0.1
- FID < 100ms

### Accessibility
- WCAG AA compliance
- Keyboard navigation
- Screen reader support
- Focus management

## 🔌 Integrations

### Supported Services
- **Reviews**: Trustpilot, Okendo, Yotpo, Judge.me
- **Email**: Klaviyo, Mailchimp, Shopify Email
- **Loyalty**: Smile.io, LoyaltyLion, Swell
- **Subscriptions**: Shopify Subscriptions
- **Bundles**: Shopify Bundles/Functions

### Metafields
Product metafields (namespace: `custom`):
- `benefits[]`, `mushrooms[]`, `format`
- `dosage_mg_per_serving`, `servings_per_pack`
- `extraction`, `beta_glucans_pct`, `caffeine_mg`
- `taste_notes`, `how_to_use_richtext`
- `nutrition_table_json`, `allergen_free`
- `vegan`, `sugar_g_per_serving`, `calories_per_serving`
- `made_in`, `eco_packaging`, `lab_results_url`

## 📱 Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly interactions
- Optimized images and fonts

## 🎯 SEO Optimization

### Structured Data
- JSON-LD for products and organization
- Breadcrumb navigation
- Product schema markup
- Review and rating data

### Performance
- Critical CSS separation
- Lazy loading implementation
- Image optimization
- Font preloading

## 🧪 Testing

### Manual Testing
- Cross-browser compatibility
- Mobile responsiveness
- Accessibility compliance
- Performance metrics

### Automated Testing
- Theme validation with Shopify CLI
- Code linting and formatting
- Performance monitoring

## 📦 Deployment

### Development
```bash
# Start local development
npm run dev
```

### Staging
```bash
# Deploy to development theme
npm run build
```

### Production
```bash
# Deploy to live theme
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📞 Support

- Create an issue for bugs
- Use discussions for questions
- Check documentation first
- Contact the development team
