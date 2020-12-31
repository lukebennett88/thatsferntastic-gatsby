import * as React from 'react';

import { Layout, SEO, Tile } from '../components';
import { useGraphQL } from '../hooks';

export default function CollectionPageTemplate() {
  const {
    allShopifyProduct: { nodes: products },
  } = useGraphQL();

  return (
    <Layout hasHero>
      <SEO title="Collection" />
      <div className="relative grid max-w-lg pb-20 mx-auto gap-y-10 gap-x-12 lg:grid-cols-3 lg:max-w-none">
        {products.map((product) => (
          <Tile
            key={product.handle}
            slug={product.handle}
            title={product.title}
            price={Number(product.priceRange.minVariantPrice.amount)}
            image={product.images[0]}
          />
        ))}
      </div>
    </Layout>
  );
}
