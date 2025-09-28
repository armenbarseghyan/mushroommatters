# 🚀 DIRTEA Theme Deployment Guide

## Quick Deploy Commands

### Automatic Deployment (Recommended)
```bash
# Deploy to both Git and Shopify
npm run deploy
# or
./deploy.sh
```

### Manual Commands
```bash
# Push only to Shopify (mushroommatters/main theme)
npm run push

# Push only to Git
npm run push-git

# Push to specific theme ID
shopify theme push --theme=154034471163
```

## Theme Configuration

### 🔧 Enable Missing Features

After deployment, go to **Theme Editor** and configure:

#### 1. **Announcement Bar**
- Go to **Theme Settings** → **Announcement Bar**
- ✅ Enable announcement bar
- Add messages in the blocks section
- Configure rotation speed

#### 2. **Header Search**
- Go to **Sections** → **Header**
- ✅ Enable "Show search"
- ✅ Enable "Show cart"

#### 3. **Homepage Content**
- Go to **Templates** → **Homepage**
- Add sections:
  - Hero Banner
  - Product Tiles
  - Build Stack CTA
  - Reviews
  - Blog Feed

### 📱 Links
- **Preview**: https://ma0wtx-d7.myshopify.com?preview_theme_id=154034471163
- **Editor**: https://ma0wtx-d7.myshopify.com/admin/themes/154034471163/editor

### 🛠️ Development Commands
```bash
# Start development server
npm run dev

# Lint and format code
npm run validate

# Pull theme from Shopify
npm run pull
```

## ✅ Checklist After Deployment

- [ ] Enable announcement bar in theme settings
- [ ] Enable search and cart in header settings
- [ ] Add homepage sections (hero, tiles, etc.)
- [ ] Configure SEO settings (Google Analytics, etc.)
- [ ] Test all buttons and interactions
- [ ] Check mobile responsiveness
- [ ] Verify search functionality
- [ ] Test cart functionality

## 🔍 Troubleshooting

### Search Button Not Working
1. Check if search is enabled in header settings
2. Verify JavaScript is loading (check browser console)
3. Clear browser cache

### Announcement Bar Not Showing
1. Enable in theme settings
2. Add at least one message block
3. Check if user previously closed it (clear localStorage)

### Buttons Not Working
1. Check browser console for JavaScript errors
2. Verify theme.js is loading
3. Check data attributes on buttons
