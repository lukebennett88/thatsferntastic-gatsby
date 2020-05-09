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
            title
            description
            author
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
        allShopifyProduct {
          nodes {
            title
            handle
            images {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 512) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
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
