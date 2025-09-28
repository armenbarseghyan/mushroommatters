# DIRTEA Theme Components

## 🧩 Reusable Components

### Blocks

#### `menu-column.liquid`
**Purpose**: Mega menu column component
**Usage**: Used in header mega menu
**Schema**:
```json
{
  "type": "menu_column",
  "name": "Menu Column",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Column Title"
    },
    {
      "type": "link_list",
      "id": "menu",
      "label": "Menu"
    }
  ]
}
```

#### `benefit-badge.liquid`
**Purpose**: Display product benefits
**Usage**: Product cards, product pages
**Features**:
- Configurable icons
- Responsive design
- Accessibility support

#### `product-tile.liquid`
**Purpose**: Product card component
**Usage**: Product grids, recommendations
**Features**:
- Lazy loading images
- Quick add to cart
- Subscription toggle
- Benefit badges

### Snippets

#### `icon.liquid`
**Purpose**: SVG icon system
**Usage**: Throughout the theme
**Parameters**:
- `name`: Icon name
- `size`: Icon size (default: 24)
- `class`: Additional CSS classes

**Example**:
```liquid
{% render 'icon', name: 'cart', size: 20, class: 'icon-cart' %}
```

#### `meta-tags.liquid`
**Purpose**: SEO meta tags
**Usage**: In layout/theme.liquid
**Features**:
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data
- Canonical URLs

## 🎨 Section Components

### Header

#### `header-mega.liquid`
**Purpose**: Sticky header with mega menu
**Features**:
- Responsive navigation
- Search functionality
- Cart drawer trigger
- Region/currency selectors

**Schema**:
```json
{
  "name": "Header",
  "settings": [
    {
      "type": "header",
      "content": "Logo"
    },
    {
      "type": "image_picker",
      "id": "logo",
      "label": "Logo"
    }
  ],
  "blocks": [
    {
      "type": "menu_column",
      "name": "Menu Column"
    }
  ]
}
```

### Product Pages

#### `main-product.liquid`
**Purpose**: Product page layout
**Features**:
- Image gallery with zoom
- Variant selection
- Subscription toggle
- Related products
- Reviews integration

#### `product-reviews.liquid`
**Purpose**: Product reviews section
**Features**:
- Multiple review providers
- Star ratings
- Review filtering
- Pagination

### Collection Pages

#### `collection-hero.liquid`
**Purpose**: Collection page header
**Features**:
- Collection description
- Filter buttons
- Sort options
- Collection image

#### `plp-filters.liquid`
**Purpose**: Product listing page filters
**Features**:
- Benefit filtering
- Mushroom type filtering
- Format filtering
- Caffeine filtering
- Subscription filtering

### Cart & Checkout

#### `main-cart.liquid`
**Purpose**: Cart page layout
**Features**:
- Cart items display
- Quantity updates
- Remove items
- Cart recommendations
- Progress indicators

#### `cart-recommendations.liquid`
**Purpose**: Cart recommendations
**Features**:
- Related products
- Bundle suggestions
- Subscription offers
- Upsell products

### Homepage Sections

#### `home-hero.liquid`
**Purpose**: Homepage hero section
**Features**:
- Full-width background
- Call-to-action buttons
- Animated elements
- Mobile optimization

#### `home-tiles.liquid`
**Purpose**: Feature tiles section
**Features**:
- Grid layout
- Hover effects
- Icon support
- Responsive design

#### `home-build-stack.liquid`
**Purpose**: Bundle builder section
**Features**:
- Interactive bundle creation
- Product selection
- Discount calculation
- Progress tracking

#### `home-standard.liquid`
**Purpose**: DIRTEA Standard features
**Features**:
- Six standard features
- Icon display
- Responsive grid
- Animation effects

#### `home-reviews.liquid`
**Purpose**: Customer reviews section
**Features**:
- Review carousel
- Star ratings
- Customer photos
- Trust indicators

#### `home-blog-feed.liquid`
**Purpose**: Blog content section
**Features**:
- Latest articles
- Category filtering
- Read more links
- Social sharing

### Footer

#### `footer.liquid`
**Purpose**: Site footer
**Features**:
- Multi-column layout
- Newsletter signup
- Social links
- Legal links
- Contact information

**Schema**:
```json
{
  "name": "Footer",
  "settings": [
    {
      "type": "header",
      "content": "Newsletter"
    },
    {
      "type": "text",
      "id": "newsletter_heading",
      "label": "Newsletter Heading"
    }
  ],
  "blocks": [
    {
      "type": "link_list",
      "name": "Link List"
    },
    {
      "type": "text",
      "name": "Text"
    }
  ]
}
```

## 🔧 JavaScript Components

### Cart Drawer (`cart-drawer.js`)
**Purpose**: Cart drawer functionality
**Features**:
- Slide-in animation
- Progress tracking
- Quick add/remove
- Mobile optimization

### Bundle Builder (`bundle-builder.js`)
**Purpose**: Bundle creation interface
**Features**:
- Product selection
- Discount calculation
- Progress tracking
- Validation

### Subscription Toggle (`pdp-subscription.js`)
**Purpose**: Product subscription toggle
**Features**:
- Toggle functionality
- Price updates
- Discount display
- Form integration

## 📱 Responsive Components

### Mobile Navigation
- Hamburger menu
- Slide-out navigation
- Touch-friendly interactions
- Gesture support

### Product Cards
- Responsive grid
- Touch interactions
- Quick actions
- Image optimization

### Forms
- Touch-friendly inputs
- Validation feedback
- Loading states
- Error handling

## ♿ Accessibility Features

### Keyboard Navigation
- Tab order management
- Focus indicators
- Skip links
- ARIA labels

### Screen Reader Support
- Semantic HTML
- ARIA attributes
- Live regions
- Alt text

### Focus Management
- Modal focus trapping
- Focus restoration
- Focus indicators
- Keyboard shortcuts

## 🎨 Styling Guidelines

### CSS Classes
- BEM methodology
- Component-based naming
- Responsive prefixes
- State modifiers

### CSS Variables
- Theme colors
- Typography scales
- Spacing system
- Breakpoints

### Animation
- Smooth transitions
- Performance optimized
- Reduced motion support
- Loading states

## 🧪 Testing Components

### Unit Testing
- Component isolation
- Mock data
- Event simulation
- Error handling

### Integration Testing
- Component interaction
- Data flow
- User workflows
- Cross-browser compatibility

### Accessibility Testing
- Screen reader testing
- Keyboard navigation
- Color contrast
- Focus management
