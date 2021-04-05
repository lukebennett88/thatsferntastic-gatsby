import { IGatsbyImageData } from 'gatsby-plugin-image';

type ShopifyImage = {
  localFile: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
};
// image, priceV2, selectedOptions, shopifyId, title
type ShopifyVariant = {
  image: ShopifyImage;
  priceV2: {
    amount: string;
    currencyCode: string;
  };
  shopifyId: string;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
};

type ShopifyProduct = {
  availableForSale: boolean;
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  options: Array<{
    name: string;
    values: Array<string>;
  }>;
  variants: Array<ShopifyVariant>;
  images: Array<ShopifyImage>;
};

export type { ShopifyImage, ShopifyProduct, ShopifyVariant };
