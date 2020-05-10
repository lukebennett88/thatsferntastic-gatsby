/**
 * Custom hook that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby';

export function useGraphQL() {
  const data = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            author
            description
            facebook
            instagram
            title
            twitter
          }
        }
        placeholderImage: file(relativePath: { eq: "placeholder/shoe.png" }) {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        allShopifyProductVariant {
          nodes {
            shopifyId
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 120) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
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
            title
            handle
            productType
            tags
            images {
              originalSrc
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
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
