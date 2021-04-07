import 'typeface-courier-prime';
import 'typeface-montserrat';
import './src/css/tailwind.css';

import * as React from 'react';

import { ShopifyProvider } from './src/context/shopify.tsx';

export function wrapRootElement({ element }) {
  return (
    <ShopifyProvider
      shopName={process.env.GATSBY_SHOPIFY_SHOP_NAME}
      accessToken={process.env.GATSBY_SHOPIFY_ACCESS_TOKEN}
    >
      {element}
    </ShopifyProvider>
  );
}
