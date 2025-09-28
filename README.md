# 🍄 DIRTEA Skeleton Theme

A complete Shopify theme built on the Skeleton Theme architecture, specifically designed for DIRTEA's mushroom extract e-commerce platform.

## 🎯 Features

### 🛒 Commerce & Conversion
- **Cart Drawer** with 2-step progress (Free Shipping £50 / Free Gift £100)
- **Bundle Builder** for 2-5 product combinations with 15% discount
- **Subscription & Save** with 20% discount toggle on PDP
- **Product Filtering** by benefit, mushroom, format, caffeine, subscription-eligible
- **DIRTEA Standard Features**: 0g sugar, ≤20 kcal, 3000mg, vegan, UK made, eco-pack

### 🧭 Navigation & UX
- **Mega Menu** with 3 columns (Product/Benefit/Mushroom categories)
- **Sticky Header** with search and cart functionality
- **Announcement Bar** with message rotation
- **Mobile-first** responsive design

### 📝 Content & Reviews
- **Dual Blog System** (Journal/Recipes) with filtering
- **Reviews Integration** (Trustpilot/Okendo/Yotpo support)
- **Email Marketing** (Klaviyo/Mailchimp integration)
- **SEO Optimization** with JSON-LD structured data

## 🛠 Technical Implementation

### Performance
- **Critical CSS** separation for LCP < 2.5s
- **Lazy Loading** for images and non-critical resources
- **Vanilla JavaScript** modules (no dependencies)
- **Lighthouse Score** ≥ 90 (Performance/Best Practices/SEO/Accessibility)

### Architecture
- **Skeleton Theme** best practices
- **Schema-driven** settings with dynamic sources
- **WCAG AA** accessibility compliance
- **Event-driven** JavaScript architecture

## 📁 Project Structure

```
dirttea-theme/
├── assets/                    # Static resources
│   ├── critical.css          # Critical styles (header, footer, nav, cart)
│   ├── theme.css             # Additional styles (landing pages, PLP/PDP, blog)
│   ├── global.js             # Global JavaScript utilities
│   ├── cart-drawer.js        # Cart drawer with progress tracking
│   ├── bundle-builder.js     # Bundle creation functionality
│   └── pdp-subscription.js   # Subscription toggle on PDP
├── blocks/                   # Reusable components
│   ├── menu-column.liquid    # Mega menu column
│   ├── benefit-badge.liquid  # Benefit display component
│   └── product-tile.liquid   # Product card component
├── config/                   # Theme settings
│   ├── settings_schema.json  # Comprehensive settings schema
│   └── settings_data.json    # DIRTEA-style presets
├── layout/
│   └── theme.liquid          # Base HTML template
├── locales/
│   └── en.default.json       # Localization (including DIRTEA-specific strings)
├── sections/                 # Modular sections
│   ├── announcement-bar.liquid  # Message rotation
│   ├── header-mega.liquid      # Sticky header with mega menu
│   └── footer.liquid           # Footer with blocks
├── snippets/                 # Helper snippets
│   ├── meta-tags.liquid      # SEO meta tags
│   └── icon.liquid           # SVG icon system
└── templates/                # JSON page templates
    ├── index.json            # Homepage (hero → tiles → build stack → standard → reviews → blog)
    ├── collection.json       # PLP with filters
    ├── product.json          # PDP with subscription
    ├── cart.json             # Cart page
    └── page.build-a-stack.json  # Bundle builder page
```

## 🚀 Getting Started

### Prerequisites
- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) installed
- [Shopify Liquid VS Code Extension](https://shopify.dev/docs/storefronts/themes/tools/shopify-liquid-vscode) (recommended)

### Development
```bash
# Clone the repository
git clone https://github.com/armenbarseghyan/mushroommatters.git
cd mushroommatters

# Start development server
shopify theme dev
```

### Deployment
```bash
# Deploy to Shopify
shopify theme push
```

## ⚙️ Configuration

### Theme Settings
The theme includes comprehensive settings in `config/settings_schema.json`:

- **Global**: Announcement bar, logo, favicon
- **Commerce**: Free shipping/gift thresholds, subscription/bundle discounts
- **Markets**: Region/currency selector visibility
- **Visual**: DIRTEA Standard features (6 configurable icons)
- **Integrations**: Reviews, loyalty, email marketing providers

### DIRTEA Standard Features
Configure the 6 standard features in Theme Settings → Visual:
1. 🌱 0g Sugar
2. 🔥 ≤20 kcal
3. 💊 3000mg (high potency)
4. 🌿 Vegan
5. 🇬🇧 Made in UK
6. ♻️ Eco Pack

## 🎨 Customization

### CSS Architecture
- **Critical styles** in `assets/critical.css` (header, footer, nav, cart)
- **Additional styles** in `assets/theme.css` (landing pages, PLP/PDP, blog)
- **CSS Variables** for single-property settings
- **CSS Classes** for multi-property settings

### JavaScript Modules
- **Event-driven** architecture with custom events
- **Modular design** with separate files for different functionality
- **Vanilla JavaScript** with no external dependencies

### Schema Best Practices
- **Dynamic Sources** for settings tied to sections
- **Flexible Blocks** for reusable components
- **i18n Support** with full localization

## 🔧 Integrations

### Supported Services
- **Subscriptions**: Shopify Subscriptions ready
- **Bundles**: Shopify Bundles/Functions support
- **Reviews**: Trustpilot/Okendo/Yotpo
- **Email**: Klaviyo/Mailchimp
- **Loyalty**: Smile.io/LoyaltyLion

### Metafields
Product metafields (namespace: `custom`):
- `benefits[]`, `mushrooms[]`, `format`, `dosage_mg_per_serving`
- `servings_per_pack`, `extraction`, `beta_glucans_pct`, `caffeine_mg`
- `taste_notes`, `how_to_use_richtext`, `nutrition_table_json`
- `allergen_free`, `vegan`, `sugar_g_per_serving`, `calories_per_serving`
- `made_in`, `eco_packaging`, `lab_results_url`

## 📊 Performance

- **LCP**: < 2.5s (critical CSS separation)
- **CLS**: < 0.1 (stable layout)
- **FID**: < 100ms (optimized JavaScript)
- **Lighthouse**: ≥ 90 across all categories

## ♿ Accessibility

- **WCAG AA** compliance
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Focus management** for modals and drawers
- **ARIA labels** and semantic HTML

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in this repository
- Contact the development team

---

**Built with ❤️ for DIRTEA using Shopify Skeleton Theme architecture**
