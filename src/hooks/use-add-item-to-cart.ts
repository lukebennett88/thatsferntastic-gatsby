import { AttributeInput, useAddItemsToCart } from './use-add-items-to-cart';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
function useAddItemToCart() {
  const addItemsToCart = useAddItemsToCart();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function addItemToCart(
    variantId: number | string,
    quantity: number,
    customAttributes?: AttributeInput[]
  ) {
    const item = [{ variantId, quantity, customAttributes }];

    return addItemsToCart(item);
  }

  return addItemToCart;
}

export { useAddItemToCart };
