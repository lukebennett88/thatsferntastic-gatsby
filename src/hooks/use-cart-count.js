import { useStoreContext } from './use-store-context';

export function useCartCount() {
  const {
    store: { checkout },
  } = useStoreContext();

  const count = checkout.lineItems.reduce(
    (runningTotal, item) => item.quantity + runningTotal,
    0
  );

  return count;
}
