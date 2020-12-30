import * as React from 'react';
import {
  useCartItems,
  useCart,
  useCheckoutUrl,
  useCartCount,
} from 'gatsby-theme-shopify-manager';

import { LineItem } from './line-item';

export function Cart() {
  const lineItems = useCartItems();
  const cart = useCart();
  const count = useCartCount();
  const checkout = useCheckoutUrl();
  return (
    <div className="relative pb-20">
      <h1 className="heading-1">Cart</h1>
      <div className="mt-3 sm:mt-4">
        {lineItems.map((item) => (
          <React.Fragment key={item.id}>
            <LineItem key={item.id} item={item} />
            <hr className="my-4" />
          </React.Fragment>
        ))}
        <div className="flex">
          <div className="w-full px-4 py-6 mx-auto bg-gray-100 rounded-lg shadow md:max-w-xs md:mr-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Cart Summary
            </h3>
            <hr className="my-3" />
            <dl className="grid gap-y-3">
              <div className="flex justify-between">
                <dt>Items in cart:</dt>
                <dd>{count}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Subtotal:</dt>
                <dd>${Number(cart?.totalPrice || 0).toFixed(2)}</dd>
              </div>
            </dl>
            <div className="mt-6">
              <a
                href={checkout}
                className="flex items-center justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-lg hover:bg-gray-800"
              >
                Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
