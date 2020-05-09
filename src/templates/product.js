import React, { useEffect, useMemo, useState } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { FiPlus, FiMinus } from 'react-icons/fi';

import { useAddItemToCart, useGraphQL, useLazyLoad } from '../hooks';
import {
  prepareVariantsWithOptions,
  prepareVariantsImages,
} from '../utilities';
import { Layout, SEO, Alert, OptionPicker, Thumbnail } from '../components';

export default function ProductPageTemplate({
  data: { shopifyProduct: product },
}) {
  console.log(product);
  // Get available colors
  const colors =
    product.options.find((option) => option.name.toLowerCase() === 'color')
      ?.values || [];

  // Get available sizes
  const sizes =
    product.options.find((option) => option.name.toLowerCase() === 'size')
      ?.values || [];

  // Format the data we get back from GraphQL for variants to be a little
  // easier to work with.
  // See comment in `prepare-variants-with-options.js`
  const variants = useMemo(() => prepareVariantsWithOptions(product.variants), [
    product.variants,
  ]);

  // Format the data we get back from GraphQL for images to be a little easier
  // to work with.
  // See comment in `prepare-variants-images.js`
  const images = useMemo(() => prepareVariantsImages(variants, 'color'), [
    variants,
  ]);

  // Keep variants in state, and set the default variant to be the first item
  const [variant, setVariant] = useState(variants[0]);

  // If product doesn't have an image, we can use a placeholder
  const { placeholderImage } = useGraphQL();
  const [imgSrc, setImgSrc] = useState(placeholderImage.publicURL);

  // Update the primary image whenever the variant changes
  useEffect(() => {
    if (variant.image) {
      setImgSrc(variant.image.originalSrc);
    }
  }, [variant]);

  // Keep different color options in state
  const [color, setColor] = useState(variant.color);

  // Keep different sizes in state
  const [size, setSize] = useState(variant.size);

  // Keep product quantity is state
  const [quantity, setQuantity] = useState(1);

  // Make sure we only add numbers, and values above 0
  function handleUpdateQuantity(e) {
    if (e.target.value > 0 || e.target.value === '')
      setQuantity(e.target.value);
  }

  // Manage add to cart alerts in state
  const [isAddedToCart, setAddedToCart] = useState(false);

  // Use a custom hook for adding items to cart
  const addItemToCart = useAddItemToCart(false);

  // Whenever we add an item to the cart, also create an alert to notify the customer of this
  // Note: we are hard coding the number of items to be added to cart as 1, we can add another useState instance to address this in the future if we need to
  function handleAddToCart() {
    if (quantity >= 1) {
      addItemToCart(variant.shopifyId, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    }
  }

  // This handles adding the correct variant to the cart
  useEffect(() => {
    const newVariant = variants.find((v) => {
      return v.size === size && v.color === color;
    });

    if (variant.shopifyId !== newVariant.shopifyId) {
      setVariant(newVariant);
    }
  }, [size, color, variants, variant.shopifyId]);

  // Lazy load images using custom hook
  const { ref, imgRef, isImgLoaded, handleImgLoaded, Spinner } = useLazyLoad();

  return (
    <Layout isShop>
      <SEO title={product.title} />
      <article className="relative px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {isAddedToCart && (
            <Alert
              title={product.title}
              image={imgSrc}
              quantity={quantity}
              dismiss={() => setAddedToCart(false)}
            />
          )}
          <div className="grid gap-6 mt-2">
            <div
              ref={ref}
              className="relative w-full h-0 overflow-hidden bg-white aspect-ratio-square"
            >
              <img
                ref={imgRef}
                data-src={imgSrc}
                onLoad={handleImgLoaded}
                alt=""
                width={592}
                height={592}
                className="absolute inset-0 object-contain h-full mx-auto duration-500 ease-in-out transform hover:scale-110"
              />
              {!isImgLoaded && <Spinner />}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-6">
                {images.map((img) => (
                  <Thumbnail
                    key={img.color}
                    src={img.src}
                    handleClick={() => setColor(img.color)}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="mt-12">
            <h1 className="h2">{product.title}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              className="mt-6 text-base leading-6 text-gray-700"
            />
            {product.availableForSale && (
              <div className="grid gap-4 mt-6 sm:grid-cols-2">
                <OptionPicker
                  key="Color"
                  name="Colour"
                  options={colors}
                  selected={color}
                  onChange={(event) => setColor(event.target.value)}
                />
                <OptionPicker
                  key="Size"
                  name="Size"
                  options={sizes}
                  selected={size}
                  onChange={(event) => setSize(event.target.value)}
                />
              </div>
            )}
            <div className="flex items-center mt-4">
              <button
                type="button"
                onClick={
                  quantity === '' || quantity <= 1
                    ? null
                    : () => setQuantity((prev) => prev - 1)
                }
                className="text-xl"
              >
                <FiMinus />
              </button>
              <label htmlFor="quantity">
                <div className="sr-only">Quantity:</div>
                <input
                  id="quantity"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={quantity}
                  onChange={handleUpdateQuantity}
                  className={`${
                    quantity === ''
                      ? ' border-red focus:border-red focus:shadow-outline-red'
                      : ''
                  } items-center justify-center w-12 rounded-none form-input`}
                />
              </label>
              <button
                type="button"
                onClick={
                  quantity === ''
                    ? () => setQuantity(1)
                    : () => setQuantity((prev) => prev + 1)
                }
                className="text-xl"
              >
                <FiPlus />
              </button>
            </div>
            <div>${variant.price}</div>
            <span className="relative inline-flex shadow-sm">
              <button
                onClick={handleAddToCart}
                type="button"
                disabled={quantity < 1 || quantity === ''}
                className="inline-flex items-center justify-center px-12 py-3 text-base font-medium leading-6 text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-none hover:bg-gray-700 focus:outline-none focus:border-gray-900 focus:shadow-outline-primary active:bg-gray-900 disabled:opacity-50"
              >
                Add to Cart
              </button>
            </span>
            {quantity === '' && (
              <small className="absolute bottom-0 transform translate-y-6">
                Please provide a quantity
              </small>
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
}

ProductPageTemplate.propTypes = {
  data: PropTypes.object,
};

export const ProductPageTemplateQuery = graphql`
  query productPage($productId: String!) {
    shopifyProduct(id: { eq: $productId }) {
      availableForSale
      id
      title
      descriptionHtml
      options {
        name
        values
      }
      variants {
        availableForSale
        id
        price
        shopifyId
        sku
        title
        selectedOptions {
          name
          value
        }
        image {
          originalSrc
        }
      }
    }
  }
`;
