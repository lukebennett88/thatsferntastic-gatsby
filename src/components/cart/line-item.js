import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

import { useGraphQL, useRemoveItemFromCart } from '../../hooks';

export const LineItem = ({ item }) => {
  const {
    allShopifyProductVariant: { nodes: variants },
    allShopifyProduct: { nodes: products },
  } = useGraphQL();

  const removeFromCart = useRemoveItemFromCart();

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

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-48 overflow-hidden rounded-md shadow">
          <Image fluid={getImageFluidForVariant(item.variant.id)} />
        </div>
        <div className="ml-4">
          <Link
            to={`/product/${getHandleForVariant(item.variant.id)}`}
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
                {item.quantity}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="flex items-baseline">
        <button
          onClick={() => removeFromCart(item.id)}
          type="button"
          className="text-gray-800 underline transition duration-150 ease-in-out hover:text-gray-600"
        >
          Delete
        </button>
        <div className="ml-4 text-3xl font-bold text-gray-900">
          ${Number(item.variant.priceV2.amount).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

LineItem.propTypes = {
  item: PropTypes.object,
};
