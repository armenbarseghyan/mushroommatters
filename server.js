const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('.'));

// Serve the main theme files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Mock Shopify API endpoints
app.get('/api/products', (req, res) => {
    res.json([
        {
            id: 1,
            title: "Lion's Mane Extract",
            price: 2999,
            currency: "RUB",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            description: "Premium Lion's Mane extract with dual extraction method for maximum bioavailability.",
            metafields: {
                extraction_method: "Dual extraction",
                beta_glucans_percent: 25,
                alcohol_percent: 40,
                origin: "Organic farms in Russia"
            }
        },
        {
            id: 2,
            title: "Reishi Extract",
            price: 3499,
            currency: "RUB",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            description: "Immune-supporting Reishi extract with high beta-glucan content.",
            metafields: {
                extraction_method: "Dual extraction",
                beta_glucans_percent: 30,
                alcohol_percent: 35,
                origin: "Organic farms in Russia"
            }
        },
        {
            id: 3,
            title: "Cordyceps Extract",
            price: 3299,
            currency: "RUB",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            description: "Energy-boosting Cordyceps extract for endurance and vitality.",
            metafields: {
                extraction_method: "Dual extraction",
                beta_glucans_percent: 28,
                alcohol_percent: 38,
                origin: "Organic farms in Russia"
            }
        }
    ]);
});

app.get('/api/collections', (req, res) => {
    res.json([
        {
            id: 1,
            title: "All Products",
            handle: "all",
            products_count: 3
        },
        {
            id: 2,
            title: "Lion's Mane",
            handle: "lions-mane",
            products_count: 1
        },
        {
            id: 3,
            title: "Reishi",
            handle: "reishi",
            products_count: 1
        },
        {
            id: 4,
            title: "Cordyceps",
            handle: "cordyceps",
            products_count: 1
        }
    ]);
});

// Start server
app.listen(PORT, () => {
    console.log(`🍄 Mushroom Matters Store running at http://localhost:${PORT}`);
    console.log(`📱 Mobile view: http://localhost:${PORT}?mobile=1`);
    console.log(`🔍 Search: http://localhost:${PORT}/search`);
    console.log(`📦 Products: http://localhost:${PORT}/products`);
    console.log(`\n✨ Theme features:`);
    console.log(`   - Multi-language support (RU/EN)`);
    console.log(`   - Multi-currency (RUB/AMD/USD)`);
    console.log(`   - Product metafields`);
    console.log(`   - Advanced search & filters`);
    console.log(`   - Analytics integration`);
    console.log(`   - SEO optimization`);
    console.log(`   - GDPR compliance`);
    console.log(`   - Performance optimized`);
});
