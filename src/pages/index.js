import * as React from 'react';
import { useLocation } from '@reach/router';
import queryString from 'query-string';

import { Layout, SEO, Tile, InstagramWidget } from '../components';
import { useGraphQL } from '../hooks';

export default function IndexPage() {
  const { allShopifyProduct } = useGraphQL();

  const { search } = useLocation();

  const products = search
    ? allShopifyProduct.nodes.filter(
        (product) => product.productType === queryString.parse(search).q
      )
    : allShopifyProduct.nodes;

  return (
    <Layout hasHero>
      <SEO title="Home" />
      <h1 className="heading-1">
        {queryString.parse(search).q || 'All Products'}
      </h1>
      <div className="relative grid max-w-lg pb-20 mx-auto mt-6 gap-y-10 gap-x-12 lg:grid-cols-3 lg:max-w-none">
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
      <InstagramWidget />
    </Layout>
  );
}
