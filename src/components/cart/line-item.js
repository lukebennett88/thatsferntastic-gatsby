import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import {
  useRemoveItemFromCart,
  useUpdateItemQuantity,
} from 'gatsby-theme-shopify-manager';

import { Spinner } from '../spinner';

function LineItem({ item }) {
  const {
    allShopifyProductVariant: { nodes: variants },
    allShopifyProduct: { nodes: products },
  } = useStaticQuery(graphql`
    query {
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
          handle
          variants {
            shopifyId
          }
        }
      }
    }
  `);

  const removeFromCart = useRemoveItemFromCart();
  const updateQuantity = useUpdateItemQuantity();

  const [quantity, setQuantity] = useState(item.quantity);

  const betterProductHandles = products.map((product) => {
    const newVariants = product.variants.map((variant) => variant.shopifyId);
    return {
      variants: newVariants,
      handle: product.handle,
    };
  });

  function getHandleForVariant(variantId) {
    const selectedProduct = betterProductHandles.find((product) => {
      return product.variants.includes(variantId);
    });

    return selectedProduct ? selectedProduct.handle : null;
  }

  function getImageFluidForVariant(variantId) {
    const selectedVariant = variants.find((variant) => {
      return variant.shopifyId === variantId;
    });

    if (selectedVariant) {
      return selectedVariant.image.localFile.childImageSharp.fluid;
    }
    return null;
  }

  function handleChange(event) {
    if (event.target.value >= 1) {
      setQuantity(event.target.value);
      updateQuantity(item.variant.id, parseInt(event.target.value, 10));
    } else if (event.target.value === '') {
      setQuantity('');
      updateQuantity(item.variant.id, 1);
    }
  }

  function handleBlur() {
    if (quantity === '') setQuantity(1);
  }

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="md:flex md:items-center">
        <div className="w-48 rounded-lg shadow">
          <div className="relative aspect-w-1 aspect-h-1">
            <GatsbyImage
              fluid={getImageFluidForVariant(item.variant.id)}
              onLoad={() => setIsLoaded(true)}
            />
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-gray-50">
                <Spinner />
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 md:ml-4">
          <Link
            to={`/products/${getHandleForVariant(item.variant.id)}`}
            className="text-lg font-medium leading-6 text-gray-900 underline transition duration-150 ease-in-out hover:text-gray-600"
          >
            {item.title}
          </Link>
          <dl className="mt-2 text-base leading-6 text-gray-500">
            {item.variant.selectedOptions.map(({ name, value }) => (
              <div key={name}>
                <dt className="inline font-medium text-gray-500">{name}: </dt>
                <dd className="inline mt-1 text-gray-900 sm:mt-0 sm:col-span-2">
                  {value}
                </dd>
              </div>
            ))}
            <div key="quantity">
              <dt className="inline font-medium text-gray-500">Quantity: </dt>
              <dd className="inline mt-1 text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  id="cart_qty"
                  className="form-input"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={quantity}
                  min={0}
                  pattern="[0-9]*"
                />
                {/* {item.quantity} */}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="flex items-baseline">
        <button
          onClick={() => removeFromCart(item.variant.id)}
          type="button"
          className="text-gray-800 underline transition duration-150 ease-in-out hover:text-gray-600"
        >
          Remove from cart
        </button>
        <div className="ml-4 font-mono text-3xl font-bold text-gray-900">
          ${Number(item.variant.priceV2.amount).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

LineItem.propTypes = {
  item: PropTypes.object,
};

export { LineItem };
