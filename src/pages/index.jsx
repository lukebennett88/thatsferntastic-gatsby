import { useLocation } from '@reach/router';
import queryString from 'query-string';
import * as React from 'react';

import { InstagramWidget,Layout, ProductTile, SEO } from '../components';
import { useGraphQL } from '../hooks';

function IndexPage() {
  return (
    <Layout>
      <SEO title="Handmade Pencil Cases, Pouches, Stationery, Accessories and More" />
      <LatestProducts />
      <InstagramWidget />
    </Layout>
  );
}

function LatestProducts() {
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
        {queryString.parse(search).q || 'Latest Products'}
      </h2>
      <div className="relative grid pb-20 mx-auto mt-6 gap-y-10 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 18).map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>
    </article>
  );
}

export default IndexPage;
