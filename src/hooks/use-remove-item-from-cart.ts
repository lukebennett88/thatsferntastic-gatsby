import { useRemoveItemsFromCart } from './use-remove-items-from-cart';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export function useRemoveItemFromCart() {
  const removeItemsFromCart = useRemoveItemsFromCart();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function removeItemFromCart(variantId: number | string) {
    if (variantId === '' || variantId == null) {
      throw new Error('VariantId must not be blank or null');
    }

    return removeItemsFromCart([String(variantId)]);
  }

  return removeItemFromCart;
}
