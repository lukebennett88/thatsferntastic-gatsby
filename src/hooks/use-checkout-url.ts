import { useShopifyContext } from '../context/shopify';

export function useCheckoutUrl(): string | null {
  const { cart } = useShopifyContext();
  if (cart == null) {
    return null;
  }

  // @ts-ignore
  return cart.webUrl;
}
