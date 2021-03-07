/**
 * Custom hook that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby';

function useGraphQL() {
  return useStaticQuery(
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
        allSanityPage(sort: { order: ASC, fields: title }) {
          nodes {
            _id
            slug {
              current
            }
            title
          }
        }
        allShopifyCollection(sort: { fields: handle, order: ASC }) {
          nodes {
            handle
            id
            title
          }
        }
        ogImage: file(relativePath: { eq: "og-image.png" }) {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 600, layout: CONSTRAINED)
          }
        }
        allShopifyProduct {
          nodes {
            ...ProductCard
          }
        }
      }
    `
  );
}

export { useGraphQL };
