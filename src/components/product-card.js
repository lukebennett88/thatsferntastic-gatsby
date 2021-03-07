import { graphql } from 'gatsby';

export const query = graphql`
  fragment ProductCard on ShopifyProduct {
    id
    featuredImage {
      localFile {
        childImageSharp {
          gatsbyImageData(
            formats: [AUTO, WEBP, AVIF]
            quality: 90
            layout: CONSTRAINED
            width: 640
          )
        }
      }
    }
    hasOnlyDefaultVariant
    hasOutOfStockVariants
    priceRangeV2 {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    productType
    title
    totalInventory
    slug: gatsbyPath(
      filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
    )
    variants {
      availableForSale
    }
  }
`;
