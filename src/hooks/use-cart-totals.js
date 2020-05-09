import { useStoreContext } from './use-store-context';

export function useCartTotals() {
  const {
    store: { checkout },
  } = useStoreContext();

  const tax = checkout.totalTaxV2
    ? `$${Number(checkout.totalTaxV2.amount).toFixed(2)}`
    : '-';
  const total = checkout.totalPriceV2
    ? `$${Number(checkout.totalPriceV2.amount).toFixed(2)}`
    : '-';

  return {
    tax,
    total,
  };
}
