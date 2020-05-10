import React from 'react';
import { Layout, SEO, Tile } from '../components';

import { useGraphQL } from '../hooks';

export default function IndexPage() {
  const {
    allShopifyProduct: { nodes: products },
  } = useGraphQL();

  return (
    <Layout hasHero>
      <SEO title="Home" />
      <div className="relative grid max-w-lg row-gap-10 col-gap-12 pb-20 mx-auto lg:grid-cols-3 lg:max-w-none">
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
