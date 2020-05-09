import { useStoreContext } from './use-store-context';

export function useCartItems() {
  const {
    store: { checkout },
  } = useStoreContext();

  return checkout.lineItems;
}
