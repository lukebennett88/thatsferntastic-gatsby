import { useShopifyContext } from '../context/shopify';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export function useCartCount() {
  const { cart } = useShopifyContext();
  if (cart == null || cart.lineItems.length === 0) {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return cart.lineItems.reduce(
    (totalCount: number, lineItem) =>
      totalCount + (lineItem.quantity as number),
    0
  );
}
