import { useShopifyContext } from '../context/shopify';

export function useCartItems() {
  const { cart } = useShopifyContext();
  if (cart == null || cart.lineItems == null) {
    return [];
  }

  return cart.lineItems;
}
