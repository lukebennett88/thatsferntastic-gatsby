import { graphql, useStaticQuery } from 'gatsby';

type ShopifyProductType = {
  productType: string;
};

type AllShopifyProductTypeNodes = {
  nodes: Array<ShopifyProductType>;
};

type AllShopifyProductsQuery = {
  allShopifyProduct: AllShopifyProductTypeNodes;
};

function useAllShopifyProductTypes(): AllShopifyProductTypeNodes {
  const { allShopifyProduct } = useStaticQuery<AllShopifyProductsQuery>(graphql`
    query AllShopifyProductTypesQuery {
      allShopifyProduct {
        nodes {
          productType
        }
      }
    }
  `);
  return allShopifyProduct;
}

export { useAllShopifyProductTypes };
export type {
  AllShopifyProductsQuery,
  AllShopifyProductTypeNodes,
  ShopifyProductType,
};
