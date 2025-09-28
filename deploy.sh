#!/bin/bash

# DIRTEA Theme Deployment Script
# Automatically pushes to mushroommatters/main theme

echo "🚀 Deploying DIRTEA theme to Shopify..."

# Pull latest changes first to avoid conflicts
echo "⬇️ Pulling latest changes from Git..."
git pull origin main --rebase

# Check if there are any changes to commit
if [[ -n $(git status --porcelain) ]]; then
    echo "📦 Committing and pushing changes to Git..."
    git add .
    git commit -m "🔄 Auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')"
    git push origin main
else
    echo "ℹ️ No local changes to commit"
fi

# Push to Shopify theme
echo "🛍️ Pushing to Shopify theme (mushroommatters/main)..."
shopify theme push --theme=154034471163

echo "✅ Deployment complete!"
echo "🔗 View theme: https://ma0wtx-d7.myshopify.com?preview_theme_id=154034471163"
echo "⚙️ Theme editor: https://ma0wtx-d7.myshopify.com/admin/themes/154034471163/editor"
