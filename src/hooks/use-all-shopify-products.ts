import { graphql, useStaticQuery } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

type ShopifyProduct = {
  id: string;
  availableForSale: boolean;
  description: string;
  handle: string;
  images: Array<{
    localFile: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  }>;
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
    maxVariantPrice: {
      amount: string;
    };
  };
  productType: string;
  tags: Array<string>;
  title: string;
  updatedAt: string;
  variants: Array<{
    shopifyId: string;
  }>;
};

type AllShopifyProducts = {
  nodes: Array<ShopifyProduct>;
};

type AllShopifyProductsQueryReturn = {
  allShopifyProduct: AllShopifyProducts;
};

function useAllShopifyProducts(): AllShopifyProducts {
  const {
    allShopifyProduct,
  } = useStaticQuery<AllShopifyProductsQueryReturn>(graphql`
    query AllShopifyProductQuery {
      allShopifyProduct(
        sort: { fields: updatedAt, order: DESC }
        filter: {
          availableForSale: { eq: true }
          variants: { elemMatch: { availableForSale: { eq: true } } }
        }
      ) {
        nodes {
          id
          availableForSale
          description
          handle
          images {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 600, layout: CONSTRAINED)
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
            }
            maxVariantPrice {
              amount
            }
          }
          productType
          tags
          title
          updatedAt
          variants {
            shopifyId
          }
        }
      }
    }
  `);
  return allShopifyProduct;
}

export { useAllShopifyProducts };
export type {
  ShopifyProduct,
  AllShopifyProducts,
  AllShopifyProductsQueryReturn,
};
