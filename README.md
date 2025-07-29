# Dynamic Shopify Product Page

A functional product page for Shopify with subscription-based product variations, flavor selection, and dynamic pricing.

## Features

**Product Media Gallery**
- Image carousel with thumbnail navigation
- Variant-based image switching

**Purchase Options**
- Single Drink vs Double Drink Subscription selection
- Dynamic pricing updates

**Flavor Selection**
- Chocolate, Vanilla, and Orange flavor options
- Single mode: 1 flavor, Double mode: 2 flavors

**Dynamic Pricing**
- 25% subscription discount
- 20% sales discount on all items
- Real-time price updates

**Add to Cart**
- Correct variant selection based on choices
- Single/double subscription handling

## Tech Stack

- TypeScript, Tailwind CSS, Vite
- Bun package manager
- Shopify Liquid templates, Ajax API

## Setup

### Installation

```bash
bun install
bun run dev    # development
bun run build  # production
```

### Shopify Integration

1. **Upload files:**
   - Copy `shopify/templates/` to theme templates
   - Copy `shopify/snippets/` to theme snippets
   - Copy compiled assets to theme assets

2. **Configure products:**
   - Create variants for each flavor
   - Set compare-at-prices for discounts
   - Upload variant images

3. **Metafields (optional):**
   ```
   product.metafields.custom.single_subscription_description
   product.metafields.custom.single_subscription_benefits
   product.metafields.custom.double_subscription_description
   product.metafields.custom.double_subscription_benefits
   ```

## Pricing Logic

- Base Price from Shopify variants
- Subscription: 25% off base price
- Sales: Additional 20% off both prices
- Final: Regular Price × 0.8, Subscription Price × 0.75 × 0.8

## Project Structure

```
├── src/
│   ├── main.ts
│   └── styles.css
├── shopify/
│   ├── templates/product.liquid
│   ├── snippets/
│   └── assets/
├── vite.config.ts
└── package.json
```

## Development

- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Mobile responsive
- TypeScript with modular design
- Event-driven interactions
