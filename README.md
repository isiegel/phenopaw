# PhenoPaw

Product landing page for the PhenoPaw custom gaming joystick.

## Project structure

```
├── index.html        # Main landing page
├── styles.css        # Custom styles (Tailwind CDN also used)
├── favicon.svg       # SVG favicon
└── icons/
    └── sprite.svg    # SVG icon sprite
```

## Local development

If using Visual Studio Code, install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension. Right-click `index.html` and select **Open with Live Server** to serve the page locally with auto-reload on save.

## Store launch

### Launch checklist

When the store is ready to go live:

1. In `index.html`, replace the pre-launch card inside the `#product-component` area with a live CTA.
2. If keeping it simple, use a plain link to the exact public Shopify product URL.
3. If you want embedded purchase UI on the landing page, re-add the Shopify Buy Button embed code in that same area. (TBD)
4. Remove any pre-launch copy in the order section once public ordering is open.
