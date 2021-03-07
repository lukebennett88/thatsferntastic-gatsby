import { graphql } from 'gatsby';
import * as React from 'react';

import { Layout, ProductTile, SEO } from '../components';

function CollectionPageTemplate({ data }) {
  const { products, title, description } = data.shopifyCollection;
  return (
    <Layout>
      <SEO title={title} description={description} />
      <h1 className="heading-1">{title}</h1>
      <div className="relative grid pb-20 mx-auto mt-6 gap-y-10 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      id
      title
      description
      products {
        ...ProductCard
      }
    }
  }
`;

export default CollectionPageTemplate;
