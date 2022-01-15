import { graphql, useStaticQuery } from 'gatsby';

type ShopifyCollectionType = {
  handle: string;
  id: string;
  title: string;
};

type AllShopifyCollectionTypeNodes = {
  nodes: Array<ShopifyCollectionType>;
};

type AllShopifyCollectionsQuery = {
  allShopifyCollection: AllShopifyCollectionTypeNodes;
};

function useAllShopifyCollections(): AllShopifyCollectionTypeNodes {
  const { allShopifyCollection } =
    useStaticQuery<AllShopifyCollectionsQuery>(graphql`
      query AllShopifyCollectionsQuery {
        allShopifyCollection(sort: { fields: handle, order: ASC }) {
          nodes {
            handle
            id
            title
          }
        }
      }
    `);
  return allShopifyCollection;
}

export { useAllShopifyCollections };
export type {
  AllShopifyCollectionsQuery,
  AllShopifyCollectionTypeNodes,
  ShopifyCollectionType,
};
