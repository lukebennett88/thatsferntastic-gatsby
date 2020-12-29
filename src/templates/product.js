import React, { useState, useMemo } from 'react';
import GatsbyImage from 'gatsby-image';
import { graphql } from 'gatsby';
import { useAddItemToCart } from 'gatsby-theme-shopify-manager';
import { useForm } from 'react-hook-form';
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
  const variants = useMemo(() => prepareVariantsWithOptions(product.variants), [
    product.variants,
  ]);

  const addItemToCart = useAddItemToCart();
  const [variant, setVariant] = useState(variants[0]);
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { register, handleSubmit } = useForm();

  async function handleAddToCart(options) {
    try {
      await addItemToCart(variant.shopifyId, 1, options);
      setIsAlertShown(true);
    } catch (e) {
      setIsAlertShown(false);
    }
  }

  const onSubmit = (data) => {
    const options = Object.keys(data).map((key) => {
      const opt = { key, value: data[key] };
      setVariant(opt);
      return opt;
    });
    handleAddToCart(options);
  };

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
                    fluid={
                      product.images[activeImageIndex].localFile.childImageSharp
                        .fluid
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
            {Number(variant.priceV2.amount) > 0 && (
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
                  register={register}
                />
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <span className="relative inline-flex transition duration-300 ease-in-out transform rounded-full shadow-sm hover:-translate-y-1 hover:shadow-lg">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 font-mono text-base font-medium text-pink-700 bg-pink-100 border border-transparent rounded-full hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <span className="leading-none">Add to Cart</span>
                </button>
              </span>
            </form>

            <div
              dangerouslySetInnerHTML={{
                __html: product.descriptionHtml,
              }}
              className="grid mt-6 text-base leading-6 prose text-gray-700 gap-y-4"
            />
          </div>
        </article>
      </div>
      <AddToCartAlert
        product={product}
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
              fluid(maxWidth: 600, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
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
            fluid(maxWidth: 600, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;

export default ProductPage;
