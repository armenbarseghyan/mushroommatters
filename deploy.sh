#!/bin/bash

# DIRTEA Theme Deployment Script
# Automatically pushes to mushroommatters/main theme

echo "🚀 Deploying DIRTEA theme to Shopify..."

# Check if there are any changes to commit first
if [[ -n $(git status --porcelain) ]]; then
    echo "📦 Committing local changes..."
    git add .
    git commit -m "🔄 Auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Pull latest changes and handle conflicts
echo "⬇️ Pulling latest changes from Git..."
if git pull origin main --rebase; then
    echo "✅ Successfully pulled latest changes"
else
    echo "⚠️ Rebase failed, trying regular merge..."
    git pull origin main --no-rebase
fi

# Push changes
echo "📤 Pushing to Git repository..."
if git push origin main; then
    echo "✅ Successfully pushed to Git"
else
    echo "❌ Failed to push to Git, but continuing with Shopify deployment..."
fi

# Push to Shopify theme
echo "🛍️ Pushing to Shopify theme (mushroommatters/main)..."
shopify theme push --theme=154034471163

echo "✅ Deployment complete!"
echo "🔗 View theme: https://ma0wtx-d7.myshopify.com?preview_theme_id=154034471163"
echo "⚙️ Theme editor: https://ma0wtx-d7.myshopify.com/admin/themes/154034471163/editor"
