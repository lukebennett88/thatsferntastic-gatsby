import * as React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import { Layout, SEO, ProductTile } from '../components';

function CollectionPageTemplate({ data }) {
  const { products } = data.shopifyCollection;

  return (
    <Layout>
      <SEO
        title={data.shopifyCollection.title}
        description={data.shopifyCollection.description}
      />
      <h1 className="heading-1">{data.shopifyCollection.title}</h1>
      <div className="relative grid pb-20 mx-auto mt-6 gap-y-10 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
}

CollectionPageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

const query = graphql`
  query($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      id
      title
      description
      products {
        availableForSale
        title
        handle
        priceRange {
          minVariantPrice {
            amount
          }
          maxVariantPrice {
            amount
          }
        }
        images {
          localFile {
            childImageSharp {
              gatsbyImageData(maxWidth: 600, layout: FLUID)
            }
          }
        }
      }
    }
  }
`;

export { CollectionPageTemplate as default, query };
