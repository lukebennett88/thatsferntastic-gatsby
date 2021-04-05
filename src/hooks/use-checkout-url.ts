import { useShopifyContext } from '../context/shopify';

export function useCheckoutUrl(): string | null {
  const { cart } = useShopifyContext();
  if (cart == null) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return cart.webUrl;
}
