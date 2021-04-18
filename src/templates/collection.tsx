import { graphql } from 'gatsby';
import * as React from 'react';

import { Layout, ProductTile, SEO } from '../components';
import { ShopifyImage } from '../types/shopify-product';

type CollectionPageTemplateProps = {
  data: ShopifyCollection;
};

function CollectionPageTemplate({
  data,
}: CollectionPageTemplateProps): React.ReactElement {
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

type ShopifyProduct = {
  id: string;
  availableForSale: true;
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
    maxVariantPrice: {
      amount: string;
    };
  };
  images: Array<ShopifyImage>;
};

type ShopifyCollection = {
  shopifyCollection: {
    id: string;
    title: string;
    description: string;
    products: Array<ShopifyProduct>;
  };
};

export const query = graphql`
  query($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      id
      title
      description
      products {
        id
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
              gatsbyImageData(width: 600, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`;

export default CollectionPageTemplate;
