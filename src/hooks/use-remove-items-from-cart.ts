import { useShopifyContext } from '../context/shopify';
import { useGetLineItem } from './use-get-line-item';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export function useRemoveItemsFromCart() {
  const { client, cart, setCart } = useShopifyContext();
  const getLineItem = useGetLineItem();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function removeItemsFromCart(variantIds: string[]) {
    if (cart == null || client == null) {
      throw new Error('Called removeItemsFromCart too soon');
    }

    if (variantIds.length === 0) {
      throw new Error('Must include at least one item to remove');
    }

    const lineItemIds = variantIds.map((variantId) => {
      const lineItem = getLineItem(variantId);
      if (lineItem === null) {
        throw new Error(
          `Could not find line item in cart with variant id: ${variantId}`
        );
      }
      return String(lineItem.id);
    });

    const newCart = await client.checkout.removeLineItems(cart.id, lineItemIds);
    setCart(newCart);
  }

  return removeItemsFromCart;
}
