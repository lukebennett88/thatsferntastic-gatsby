import { graphql, useStaticQuery } from 'gatsby';

type ShopifyVariantType = {
  shopifyId: string;
  image: {
    originalSrc: string;
  };
};

type AllShopifyVariantTypeNodes = {
  nodes: Array<ShopifyVariantType>;
};

type AllShopifyVariantsQuery = {
  allShopifyProductVariant: AllShopifyVariantTypeNodes;
};

function useAllShopifyProductTypes(): AllShopifyVariantTypeNodes {
  const {
    allShopifyProductVariant,
  } = useStaticQuery<AllShopifyVariantsQuery>(graphql`
    query AllShopifyProductVariantQuery {
      allShopifyProductVariant {
        nodes {
          shopifyId
          image {
            originalSrc
          }
        }
      }
    }
  `);
  return allShopifyProductVariant;
}

export { useAllShopifyProductTypes };
export type {
  AllShopifyVariantsQuery,
  AllShopifyVariantTypeNodes,
  ShopifyVariantType,
};
