import PropTypes from 'prop-types';
import React, { createContext, useState, useEffect } from 'react';
import Client from 'shopify-buy';

const isBrowser = typeof window !== 'undefined';

const SHOPIFY_CHECKOUT_STORAGE_KEY = 'shopify_checkout_id';

const client = Client.buildClient({
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  domain: `${process.env.SHOP_NAME}.myshopify.com`,
});

const initialStoreState = {
  client,
  isAdding: false,
  checkout: { lineItems: [] },
};

const StoreContext = createContext({
  store: initialStoreState,
  setStore: () => null,
});

function createNewCheckout(store) {
  return store.checkout.create();
}

function fetchCheckout(store, id) {
  return store.checkout.fetch(id);
}

function setCheckoutInState(checkout, setStore) {
  if (isBrowser) {
    localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, checkout.id);
  }

  setStore((prevState) => {
    return { ...prevState, checkout };
  });
}

const StoreContextProvider = ({ children }) => {
  const [store, setStore] = useState(initialStoreState);

  useEffect(() => {
    const initializeCheckout = async () => {
      // Check for an existing cart.
      const existingCheckoutId = isBrowser
        ? localStorage.getItem(SHOPIFY_CHECKOUT_STORAGE_KEY)
        : null;

      if (existingCheckoutId) {
        try {
          const checkout = await fetchCheckout(client, existingCheckoutId);
          // Make sure this cart hasn’t already been purchased.
          if (!checkout.completedAt) {
            setCheckoutInState(checkout, setStore);
            return;
          }
        } catch (e) {
          localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, null);
        }
      }

      const newCheckout = await createNewCheckout(client);
      setCheckoutInState(newCheckout, setStore);
    };

    initializeCheckout();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        store,
        setStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StoreContext, StoreContextProvider };
