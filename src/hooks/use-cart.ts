import { useShopifyContext } from '../context/shopify';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export function useCart() {
  const { cart } = useShopifyContext();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return cart;
}
