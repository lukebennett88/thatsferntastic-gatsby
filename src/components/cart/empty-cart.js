import React from 'react';

import { useAddItemToCart, useGraphQL } from '../../hooks';

export const EmptyCart = () => {
  const {
    allShopifyProductVariant: { nodes: variants },
  } = useGraphQL();

  const addItemToCart = useAddItemToCart();

  return (
    <div className="relative pt-16 pb-20">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          Cart
        </h1>
        <p className="max-w-2xl mx-auto mt-3 text-xl leading-7 text-gray-500 sm:mt-4">
          Your shopping cart is empty.
        </p>
        <button
          onClick={() =>
            addItemToCart(
              variants[Math.floor(Math.random() * (variants.length - 1))]
                .shopifyId,
              1
            )
          }
          type="button"
          className="relative inline-flex items-center px-4 py-2 mt-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md shadow-sm sm:mt-4 hover:bg-gray-700 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray active:bg-gray-900"
        >
          <span role="img" aria-label="Dice Emoji">
            🎲
          </span>{' '}
          Random item plz
        </button>
      </div>
    </div>
  );
};
