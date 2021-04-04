import ShopifyBuy from 'shopify-buy';

export function isCart(potentialCart: any): potentialCart is ShopifyBuy.Cart {
  return (
    potentialCart != null &&
    potentialCart.id != null &&
    potentialCart.webUrl != null &&
    potentialCart.lineItems != null &&
    potentialCart.type != null &&
    potentialCart.type.name === 'Checkout' &&
    potentialCart.type.kind === 'OBJECT'
  );
}

const CART = 'shopify_local_store__cart';
const CHECKOUT_ID = 'shopify_local_store__checkout_id';

export const LocalStorageKeys = {
  CART,
  CHECKOUT_ID,
};

function set(key: string, value: string) {
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser) {
    window.localStorage.setItem(key, value);
  }
}

function get(key: string) {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser) {
    return null;
  }

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function getInitialCart(): ShopifyBuy.Cart | null {
  const existingCartString = get(LocalStorageKeys.CART);
  if (existingCartString == null) {
    return null;
  }

  try {
    const existingCart = JSON.parse(existingCartString);
    if (!isCart(existingCart)) {
      return null;
    }

    return existingCart ;
  } catch {
    return null;
  }
}

export const LocalStorage = {
  get,
  set,
  getInitialCart,
};
