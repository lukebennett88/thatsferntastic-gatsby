import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';

import { AddToCartAlert } from '../components/add-to-cart-alert';
import { Gallery } from '../components/gallery';
import { Layout } from '../components/layout';
import { OptionPicker } from '../components/option-picker';
import { SEO } from '../components/seo';
import { useAddItemToCart } from '../hooks/use-add-item-to-cart';
import { ShopifyProduct, ShopifyVariant } from '../types/shopify-product';
import { prepareVariantsWithOptions } from '../utils';

type ProductPageProps = {
  data: {
    shopifyProduct: ShopifyProduct;
  };
};

function ProductPage({
  data: { shopifyProduct: product },
}: ProductPageProps): React.ReactElement {
  const addItemToCart = useAddItemToCart();
  const [isAlertShown, setIsAlertShown] = React.useState(false);
  const [activeImage, setActiveImage] = React.useState(
    product.images?.[0].localFile.childImageSharp.gatsbyImageData
  );
  const variants = React.useMemo(
    () => prepareVariantsWithOptions(product.variants),
    [product.variants]
  );
  const [variant, setVariant] = React.useState(
    () => variants[0] as ShopifyVariant
  );

  React.useEffect(() => {
    setActiveImage(variant.image.localFile.childImageSharp.gatsbyImageData);
  }, [variant]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleAddToCart = async () => {
    try {
      await addItemToCart(variant.shopifyId, 1);
      setIsAlertShown(true);
    } catch (error) {
      setIsAlertShown(false);
    }
  };

  return (
    <Layout hasSidebar={false}>
      <SEO
        title={product.title}
        description={product.description}
        type="product"
        image={
          product?.images[0]?.localFile.childImageSharp.gatsbyImageData.images
            ?.fallback?.src
        }
      />
      <div className="relative">
        <article className="rounded-lg lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col w-full mx-auto mt-6 space-y-4 lg:mt-0 max-w-prose">
            <div className="overflow-hidden rounded-lg">
              <div className="relative bg-white aspect-w-1 aspect-h-1">
                <div className="absolute inset-0 flex">
                  {product.images?.[0].localFile?.childImageSharp ? (
                    <GatsbyImage
                      image={activeImage}
                      alt=""
                      imgStyle={{ objectFit: 'contain' }}
                      className="flex-1 duration-500 ease-in-out transform hover:scale-110"
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <Gallery images={product.images} setActiveImage={setActiveImage} />
          </div>
          <div className="flex flex-col space-y-4">
            <h1 className="mt-12 text-xl font-medium lg:mt-0">
              {product.title}
            </h1>
            {product.availableForSale && Number(variant?.priceV2?.amount) > 0 && (
              <dl className="mt-4">
                <dt className="sr-only">Price:</dt>
                <dd className="heading-1">
                  ${Number(variant.priceV2.amount).toFixed(2)}{' '}
                </dd>
              </dl>
            )}
            <div className="space-y-4">
              {product.options.map((option, index) => (
                <OptionPicker
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  name={option.name}
                  options={option.values}
                  onChange={(e) => {
                    setVariant(
                      // @ts-ignore
                      variants.find(
                        (v) =>
                          v.selectedOptions[0].name === option.name &&
                          v.selectedOptions[0].value === e.target.value
                      )
                    );
                  }}
                />
              ))}
            </div>
            <span
              className={`${!product.availableForSale ? 'button-wrapper' : ''}`}
            >
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.availableForSale}
                className={`button ${
                  product.availableForSale
                    ? ''
                    : '!text-gray-700 !bg-gray-100 cursor-not-allowed opacity-75 !shadow-none'
                }`}
              >
                {product.availableForSale ? 'Add to Cart' : 'Sold out'}
              </button>
            </span>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: product.descriptionHtml,
              }}
              className="mt-6 prose"
            />
          </div>
        </article>
      </div>
      <AddToCartAlert
        product={product}
        variant={variant}
        isAlertShown={isAlertShown}
        setIsAlertShown={setIsAlertShown}
      />
    </Layout>
  );
}

export const ProductPageQuery = graphql`
  query productPage($productId: String!) {
    shopifyProduct(id: { eq: $productId }) {
      availableForSale
      id
      title
      description
      descriptionHtml
      productType
      options {
        name
        values
      }
      variants {
        shopifyId
        selectedOptions {
          name
          value
        }
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
            }
          }
        }
        priceV2 {
          amount
          currencyCode
        }
      }
      images {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;

export default ProductPage;
