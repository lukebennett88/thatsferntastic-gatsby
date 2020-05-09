import { useStoreContext } from './use-store-context';

export function useRemoveItemFromCart() {
  const {
    store: { client, checkout },
    setStore,
  } = useStoreContext();

  async function removeItemFromCart(itemId) {
    const newCheckout = await client.checkout.removeLineItems(checkout.id, [
      itemId,
    ]);

    setStore((prevState) => {
      return { ...prevState, checkout: newCheckout };
    });
  }

  return removeItemFromCart;
}
