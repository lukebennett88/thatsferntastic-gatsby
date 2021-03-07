import { graphql } from 'gatsby';
import * as React from 'react';

import { Layout } from '../../components/layout';
import { ProductTile } from '../../components/product-tile';
import { SEO } from '../../components/seo';

const Products = ({ data }) => {
  return (
    <Layout>
      <SEO title="All Products" />
      <h1 className="sr-only">Products</h1>
      <div className="relative grid pb-20 mx-auto mt-6 gap-y-10 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {data.products.nodes.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default Products;

export const query = graphql`
  {
    products: allShopifyProduct(sort: { fields: publishedAt, order: ASC }) {
      nodes {
        ...ProductCard
      }
    }
  }
`;
