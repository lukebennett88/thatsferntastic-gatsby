import { useLocation } from '@reach/router';
import queryString from 'query-string';
import * as React from 'react';

import { Layout, ProductTile, SEO } from '../components';
import { useAllShopifyProducts } from '../hooks/use-all-shopify-products';
import { useSanitySiteSettings } from '../hooks/use-sanity-site-settings';

function IndexPage(): React.ReactElement {
  return (
    <Layout>
      <SEO title="Handmade Pencil Cases, Pouches, Stationery, Accessories and More" />
      <LatestProducts />
    </Layout>
  );
}

function LatestProducts(): React.ReactElement {
  const allShopifyProduct = useAllShopifyProducts();
  const sanitySiteSettings = useSanitySiteSettings();

  const { search } = useLocation();
  const filteredProducts = allShopifyProduct.nodes.filter(
    (product) => product.productType === queryString.parse(search).q
  );

  let products = allShopifyProduct.nodes;
  if (filteredProducts.length > 0) {
    products = filteredProducts;
  }

  return (
    <article>
      <h1 className="sr-only">{sanitySiteSettings.title}</h1>
      <h2 className="text-center heading-1 sm:text-left">
        {queryString.parse(search).q || 'Latest Products'}
      </h2>
      <div className="relative grid pb-20 mx-auto mt-6 gap-y-10 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {products
          .slice(0, filteredProducts.length > 0 ? products.length : 18)
          .map((product) => (
            <ProductTile key={product.id} product={product} />
          ))}
      </div>
    </article>
  );
}

export default IndexPage;
