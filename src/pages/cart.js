import * as React from 'react';

import { Layout, SEO } from '../components';
import { Cart } from '../components/cart';

export default function CartPage() {
  return (
    <Layout hasSidebar={false}>
      <SEO title="Cart" />
      {/* <Cart /> */}
    </Layout>
  );
}
