import * as React from 'react';

import { Layout, SEO } from '../components';
import { Cart } from '../components/cart';

function CartPage(): React.ReactElement {
  return (
    <Layout hasSidebar={false}>
      <SEO title="Cart" />
      <Cart />
    </Layout>
  );
}

export default CartPage;
