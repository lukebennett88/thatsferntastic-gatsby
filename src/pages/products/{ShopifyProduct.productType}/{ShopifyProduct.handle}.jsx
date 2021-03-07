/* eslint-disable prettier/prettier */
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import isEqual from 'lodash.isequal';
import * as React from 'react';

import {
  AddToCartAlert,
  Gallery,
  Layout,
  OptionPicker,
  SEO,
} from '../../../components';
import { StoreContext } from '../../../context/store-context';
import { formatPrice } from '../../../utils/format-price';

function ProductPage({ data: { product, suggestions } }) {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRangeV2,
    title,
    description,
    descriptionHtml,
    images,
    images: [firstImage],
    storefrontId,
  } = product;
  const { client } = React.useContext(StoreContext);

  const [variant, setVariant] = React.useState({ ...initialVariant });

  const QUANTITY = 1;

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant;

  const [available, setAvailable] = React.useState(
    productVariant.availableForSale
  );

  const checkAvailablity = React.useCallback(
    (productId) => {
      client.product
        .fetch(productId)
        .then((fetchedProduct) => {
          const result = fetchedProduct.variants.filter(
            (v) => v.id === productVariant.storefrontId
          );

          // eslint-disable-next-line promise/always-return
          if (result.length > 0) {
            setAvailable(result[0].available);
          }
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.error(error));
    },
    [productVariant.storefrontId, client.product]
  );

  const handleOptionChange = (index, event) => {
    const { value } = event.target;

    if (value === '') {
      return;
    }

    const currentOptions = [...variant.selectedOptions];

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    };

    const selectedVariant = variants.find((v) =>
      isEqual(currentOptions, v.selectedOptions)
    );

    setVariant({ ...selectedVariant });
  };

  React.useEffect(() => {
    checkAvailablity(storefrontId);
  }, [productVariant.storefrontId, checkAvailablity, storefrontId]);

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price
  );

  const hasVariants = variants.length > 1;

  const [isAlertShown, setIsAlertShown] = React.useState(false);

  const { addVariantToCart, loading } = React.useContext(StoreContext);

  async function handleAddToCart() {
    try {
      await addVariantToCart(productVariant.storefrontId, QUANTITY);
      setIsAlertShown(true);
    } catch (error) {
      setIsAlertShown(false);
    }
  }

  return (
    <Layout hasSidebar={false}>
      <SEO
        title={title}
        description={description}
        type="product"
        image={firstImage.localFile.publicURL}
      />
      <div className="relative">
        <article className="rounded-lg lg:grid lg:grid-cols-2 lg:gap-8">
          <h1 className="text-xl font-medium text-center lg:hidden">{title}</h1>

          {available && (
            <dl className="mt-4 text-center lg:hidden">
              <dt className="sr-only">Price:</dt>
              <dd className="heading-1">{price}</dd>
            </dl>
          )}

          <ImageSection images={images} title={title} />

          <div className="flex flex-col space-y-4">
            <h1 className="hidden text-xl font-medium lg:block">{title}</h1>

            {available && (
              <dl className="hidden mt-4 lg:block">
                <dt className="sr-only">Price:</dt>
                <dd className="heading-1">{price}</dd>
              </dl>
            )}

            {hasVariants && (
              <div className="space-y-4">
                {options.map(({ id, name, values }, index) => (
                  <OptionPicker
                    key={id}
                    name={name}
                    options={values}
                    onChange={(event) => handleOptionChange(index, event)}
                  />
                ))}
              </div>
            )}

            <span className="relative transition duration-300 ease-in-out transform rounded-full hover:-translate-y-0.5">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!available || loading}
                className="inline-flex items-center px-6 py-3 font-mono text-base font-medium text-pink-700 bg-pink-100 border border-transparent rounded-full transform-gpu hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:shadow-lg"
              >
                <span className="leading-none">
                  {available ? 'Add to Cart' : 'Out of Stock'}
                </span>
              </button>
            </span>

            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: descriptionHtml,
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

function ImageSection({ images, title }) {
  const hasImages = images.length > 0;

  const hasMultipleImages = images.length > 1;

  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  return (
    <div className="flex flex-col w-full mx-auto mt-6 space-y-4 lg:mt-0 max-w-prose">
      <div className="overflow-hidden rounded-lg">
        <div className="relative bg-white aspect-w-1 aspect-h-1">
          <div className="absolute inset-0 flex">
            {hasImages && (
              <GatsbyImage
                objectFit="contain"
                alt={`Product Image of ${title}`}
                loading="eager"
                image={
                  images[activeImageIndex].localFile.childImageSharp
                    .gatsbyImageData
                }
                className="flex-1 duration-500 ease-in-out transform hover:scale-110"
              />
            )}
          </div>
        </div>
      </div>
      {hasMultipleImages && (
        <Gallery images={images} setActiveImage={setActiveImageIndex} />
      )}
    </div>
  );
}

export const query = graphql`
  query($id: String!, $productType: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      title
      description
      descriptionHtml
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      images {
        altText
        localFile {
          publicURL
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
      variants {
        availableForSale
        storefrontId
        title
        price
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        id
      }
    }
    suggestions: allShopifyProduct(
      limit: 3
      filter: { productType: { eq: $productType }, id: { ne: $id } }
    ) {
      nodes {
        title
        slug: gatsbyPath(
          filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
        )
        images {
          localFile {
            childImageSharp {
              gatsbyImageData(
                aspectRatio: 1
                formats: [AUTO, WEBP, AVIF]
                quality: 90
                width: 640
              )
            }
          }
        }
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export default ProductPage;
