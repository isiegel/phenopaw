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

## Shopify Buy Button integration

### Setup

1. Log into your Shopify admin panel
2. Go to **Settings → Apps and sales channels → Develop apps**
3. Create a new app or use an existing Storefront API app
4. Get your API credentials
5. Go to your product page in Shopify
6. Click **Create Buy Button**
7. Customize the button appearance
8. Copy the generated embed code
9. In `index.html`, replace the `<div id="product-component">` placeholder with the generated code

### Generated code template

The embed code Shopify generates will look like this. Replace the three placeholder values before pasting it in.

```html
<script type="text/javascript">
  (function () {
    var scriptURL =
      'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }
    function loadScript() {
      var script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      (
        document.getElementsByTagName('head')[0] ||
        document.getElementsByTagName('body')[0]
      ).appendChild(script);
      script.onload = ShopifyBuyInit;
    }
    function ShopifyBuyInit() {
      var client = ShopifyBuy.buildClient({
        domain: 'YOUR-STORE.myshopify.com', // ← replace
        storefrontAccessToken: 'YOUR-TOKEN-HERE', // ← replace
      });
      ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent('product', {
          id: 'YOUR-PRODUCT-ID', // ← replace
          node: document.getElementById('product-component'),
          options: {
            product: {
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0',
                    'margin-bottom': '0',
                  },
                },
                button: {
                  'font-family': 'Inter, sans-serif',
                  'font-weight': '600',
                  ':hover': {
                    'background-color': '#5b47a3',
                  },
                  'background-color': '#667eea',
                  ':focus': {
                    'background-color': '#5b47a3',
                  },
                },
              },
            },
          },
        });
      });
    }
  })();
</script>
```
