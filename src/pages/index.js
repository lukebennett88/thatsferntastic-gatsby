import * as React from 'react';
import { useLocation } from '@reach/router';
import queryString from 'query-string';

import { Layout, SEO, Tile, InstagramWidget } from '../components';
import { useGraphQL } from '../hooks';

function IndexPage() {
  return (
    <Layout hasHero>
      <SEO title="Home" />
      <AllProducts />
      <InstagramWidget />
    </Layout>
  );
}

function AllProducts() {
  const { allShopifyProduct, sanitySiteSettings } = useGraphQL();

  const { search } = useLocation();

  const products = search
    ? allShopifyProduct.nodes.filter(
        (product) => product.productType === queryString.parse(search).q
      )
    : allShopifyProduct.nodes;

  return (
    <article>
      <h1 className="sr-only">{sanitySiteSettings.title}</h1>
      <h2 className="text-center heading-1 sm:text-left">
        {queryString.parse(search).q || 'All Products'}
      </h2>
      <div className="relative grid pb-20 mx-auto mt-6 gap-y-10 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Tile
            key={product.id}
            slug={product.handle}
            title={product.title}
            price={Number(product.priceRange.minVariantPrice.amount)}
            image={product.images[0]}
          />
        ))}
      </div>
    </article>
  );
}

export default IndexPage;
