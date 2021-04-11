import { graphql, useStaticQuery } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

type ShopifyImage = {
  gatsbyImageData: IGatsbyImageData;
};

type ShopifyVariant = {
  availableForSale: true;
  shopifyId: string;
};

type ShopifyProduct = {
  id: string;
  description: string;
  handle: string;
  featuredImage: ShopifyImage;
  priceRangeV2: {
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
  variants: Array<ShopifyVariant>;
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
        filter: { variants: { elemMatch: { availableForSale: { eq: true } } } }
      ) {
        nodes {
          id
          description
          handle
          featuredImage {
            gatsbyImageData(width: 400, height: 400)
          }
          priceRangeV2 {
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
            availableForSale
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
  AllShopifyProducts,
  AllShopifyProductsQueryReturn,
  ShopifyImage,
  ShopifyProduct,
  ShopifyVariant,
};
