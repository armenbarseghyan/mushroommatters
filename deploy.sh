#!/bin/bash

# DIRTEA Theme Deployment Script
# Automatically pushes to mushroommatters/main theme

echo "🚀 Deploying DIRTEA theme to Shopify..."

# Push to Git first
echo "📦 Pushing to Git repository..."
git add .
git commit -m "🔄 Auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main

# Push to Shopify theme
echo "🛍️ Pushing to Shopify theme (mushroommatters/main)..."
shopify theme push --theme=154034471163

echo "✅ Deployment complete!"
echo "🔗 View theme: https://ma0wtx-d7.myshopify.com?preview_theme_id=154034471163"
echo "⚙️ Theme editor: https://ma0wtx-d7.myshopify.com/admin/themes/154034471163/editor"
