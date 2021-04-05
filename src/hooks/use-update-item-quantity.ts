/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useShopifyContext } from '../context/shopify';
import { useGetLineItem } from './use-get-line-item';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useUpdateItemQuantity() {
  const { client, cart, setCart } = useShopifyContext();
  const getLineItem = useGetLineItem();

  async function updateItemQuantity(
    variantId: string | number,
    quantity: number
  ) {
    if (variantId == null) {
      throw new Error('Must provide a variant id');
    }

    if (quantity == null || Number(quantity) < 0) {
      throw new Error('Quantity must be greater than 0');
    }

    const lineItem = getLineItem(variantId);
    if (lineItem == null) {
      throw new Error(`Item with variantId ${variantId} not in cart`);
    }

    const newCart = await client.checkout.updateLineItems(cart.id, [
      { id: lineItem.id, quantity },
    ]);
    setCart(newCart);
  }

  return updateItemQuantity;
}

export { useUpdateItemQuantity };
