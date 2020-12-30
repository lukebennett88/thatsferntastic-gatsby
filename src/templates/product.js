import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import { useAddItemToCart } from 'gatsby-theme-shopify-manager';
import PropTypes from 'prop-types';

import {
  Layout,
  SEO,
  Gallery,
  AddToCartAlert,
  OptionPicker,
} from '../components';
import { prepareVariantsWithOptions } from '../utils';

function ProductPage({ data: { shopifyProduct: product } }) {
  const addItemToCart = useAddItemToCart();
  const [isAlertShown, setIsAlertShown] = React.useState(false);
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const variants = React.useMemo(
    () => prepareVariantsWithOptions(product.variants),
    [product.variants]
  );
  const [variant, setVariant] = React.useState(() => variants[0]);

  async function handleAddToCart() {
    try {
      await addItemToCart(variant.shopifyId, 1);
      setIsAlertShown(true);
    } catch (e) {
      setIsAlertShown(false);
    }
  }

  return (
    <Layout hasSidebar={false}>
      <SEO title={product.title} />
      <div className="relative">
        <article className="rounded-lg md:grid md:grid-cols-2 md:gap-8">
          <h1 className="mt-6 text-lg font-bold leading-tight md:hidden">
            {product.title}
          </h1>
          <div className="flex flex-col w-full max-w-md mx-auto space-y-4">
            <div className="overflow-hidden rounded-lg">
              <div className="relative bg-gray-300 aspect-w-1 aspect-h-1">
                <div className="absolute inset-0 flex">
                  <GatsbyImage
                    image={
                      product.images[activeImageIndex].localFile.childImageSharp
                        .gatsbyImageData
                    }
                    className="flex-1 duration-500 ease-in-out transform hover:scale-110"
                  />
                </div>
              </div>
            </div>
            <Gallery
              images={product.images}
              setActiveImage={setActiveImageIndex}
            />
          </div>
          <div className="flex flex-col space-y-4">
            <h1 className="hidden text-lg font-bold leading-tight md:block">
              {product.title}
            </h1>

            {Number(variant?.priceV2?.amount) > 0 && (
              <dl className="mt-4">
                <dt className="sr-only">Price:</dt>
                <dd className="font-bold">
                  ${Number(variant.priceV2.amount).toFixed(2)}{' '}
                </dd>
              </dl>
            )}

            <div className="space-y-4">
              {product.options.map((option, index) => (
                <OptionPicker
                  key={index}
                  name={option.name}
                  options={option.values}
                  onChange={(e) =>
                    setVariant(
                      variants.filter(
                        (v) =>
                          v.selectedOptions[0].name === option.name &&
                          v.selectedOptions[0].value === e.target.value
                      )[0]
                    )
                  }
                />
              ))}
            </div>

            <span className="relative transition duration-300 ease-in-out transform rounded-full hover:-translate-y-0.5">
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex items-center px-6 py-3 font-mono text-base font-medium text-pink-700 bg-pink-100 border border-transparent rounded-full hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:shadow-lg"
              >
                <span className="leading-none">Add to Cart</span>
              </button>
            </span>

            <div
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

ProductPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export const ProductPageQuery = graphql`
  query productPage($productId: String!) {
    shopifyProduct(id: { eq: $productId }) {
      id
      title
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
              gatsbyImageData(maxWidth: 600, quality: 100, layout: FLUID)
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
            gatsbyImageData(maxWidth: 600, quality: 100, layout: FLUID)
          }
        }
      }
    }
  }
`;

export default ProductPage;
