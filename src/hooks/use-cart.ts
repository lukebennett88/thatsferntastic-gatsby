import { useShopifyContext } from '../context/shopify';

export function useCart() {
  const { cart } = useShopifyContext();
  return cart;
}
