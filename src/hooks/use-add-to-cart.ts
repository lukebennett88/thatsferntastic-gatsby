import * as React from 'react';

import { useAddItemToCart } from './use-add-item-to-cart';

/**
 * @param {string} variantId variant ID to be passed to handleAddToCart function
 * @param {number} quantity number of the variant that should be added to the cart
 * @param {function} setShowDialog function to update state used to display add to cart (Toast) alert
 */

interface IUseHandleAddToCart {
  variantId: string;
  quantity?: number;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export function useAddToCart({
  variantId,
  quantity = 1,
  setShowDialog,
}: IUseHandleAddToCart) {
  const addItemToCart = useAddItemToCart();
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function addToCart() {
    try {
      await addItemToCart(variantId, quantity);
      setShowDialog(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setShowDialog(false);
    }
  }
  return { addToCart };
}
