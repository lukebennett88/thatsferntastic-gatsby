/**
 * Custom hook that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby';

function useGraphQL() {
  const data = useStaticQuery(
    graphql`
      {
        sanitySiteSettings {
          title
          description
          siteUrl
          shareImage {
            asset {
              url
            }
          }
          socialLinks {
            _key
            socialNetwork
            link
          }
        }
        ogImage: file(relativePath: { eq: "og-image.png" }) {
          publicURL
          childImageSharp {
            gatsbyImageData(maxWidth: 600, layout: FLUID)
          }
        }
        allShopifyProductVariant {
          nodes {
            shopifyId
            image {
              originalSrc
            }
          }
        }
        allShopifyProduct(
          sort: { fields: updatedAt, order: DESC }
          filter: {
            availableForSale: { eq: true }
            variants: { elemMatch: { availableForSale: { eq: true } } }
          }
        ) {
          nodes {
            id
            description
            handle
            images {
              localFile {
                childImageSharp {
                  gatsbyImageData(maxWidth: 600, layout: FLUID)
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
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
    `
  );
  return data;
}

export { useGraphQL };
