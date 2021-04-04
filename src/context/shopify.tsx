import * as React from 'react';
import ShopifyBuy from 'shopify-buy';

import { LocalStorage, LocalStorageKeys } from '../utils/local-storage';

interface ContextShape {
  client: ShopifyBuy.Client | null;
  cart: ShopifyBuy.Cart | null;
  setCart: React.Dispatch<React.SetStateAction<ShopifyBuy.Cart | null>>;
}

const Context = React.createContext<ContextShape>({
  client: null,
  cart: null,
  setCart: () => {
    throw new Error('You forgot to wrap this in a Provider object');
  },
});

interface Props {
  shopName: string;
  accessToken: string;
  children: React.ReactNode;
}

function ShopifyProvider({ shopName, accessToken, children }: Props) {
  if (shopName == null || accessToken == null) {
    throw new Error(
      'Unable to build shopify-buy client object. Please make sure that your access token and domain are correct.'
    );
  }

  const initialCart = LocalStorage.getInitialCart();
  const [cart, setCart] = React.useState<ShopifyBuy.Cart | null>(initialCart);

  const isCustomDomain = shopName.includes('.');

  const client = ShopifyBuy.buildClient({
    storefrontAccessToken: accessToken,
    domain: isCustomDomain ? shopName : `${shopName}.myshopify.com`,
  });

  React.useEffect(() => {
    async function getNewCart() {
      const newCart = await client.checkout.create();
      setCart(newCart);
    }

    async function refreshExistingCart(cartId: string) {
      try {
        const refreshedCart = await client.checkout.fetch(cartId);

        if (refreshedCart == null) {
          return await getNewCart();
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const cartHasBeenPurchased = refreshedCart.completedAt != null;

        if (cartHasBeenPurchased) {
          getNewCart();
        } else {
          setCart(refreshedCart);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (cart == null) {
      getNewCart();
    } else {
      refreshExistingCart(String(cart.id));
    }
  }, []);

  React.useEffect(() => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(cart));
  }, [cart]);

  return (
    <Context.Provider
      value={{
        client,
        cart,
        setCart,
      }}
    >
      {children}
    </Context.Provider>
  );
}

// Create useShopifyContext to make using values from Context easier
function useShopifyContext() {
  return React.useContext(Context);
}

// Export everything
export { Context, ShopifyProvider, useShopifyContext };
