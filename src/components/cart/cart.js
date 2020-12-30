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
  const count = useCartCount();

  return (
    <div className="relative pb-20">
      <h1 className="heading-1">Cart</h1>
      <div className="flex flex-wrap py-12 lg:space-x-16">
        <div className="relative grid flex-1 pb-20 mx-auto gap-y-10 gap-x-12 sm:grid-cols-2 lg:grid-cols-1 lg:col-span-3">
          {count
            ? lineItems.map((item) => <LineItem key={item.id} item={item} />)
            : 'Nothing to see here, your cart is empty!'}
        </div>
        <CartSummary />
      </div>
    </div>
  );
}

function CartSummary() {
  const count = useCartCount();
  const cart = useCart();
  const checkout = useCheckoutUrl();
  return (
    <>
      <aside className="w-full lg:max-w-xs">
        <nav className="sticky top-28">
          <div className="w-full px-4 py-6 bg-white rounded-lg shadow">
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
                aria-hidden={!count}
                href={count ? checkout : null}
                className={`inline-flex items-center justify-center w-full px-6 py-3 font-mono text-base font-medium text-center text-pink-700 bg-pink-100 border border-transparent rounded-full hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:shadow-lg ${
                  !count ? 'cursor-not-allowed opacity-75' : ''
                }`}
              >
                Checkout
              </a>
            </div>
          </div>
        </nav>
      </aside>
      {/* <div className="w-full px-4 py-6 mx-auto bg-white rounded-lg shadow md:max-w-xs md:mr-0">
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
          aria-hidden={!count}
          href={count ? checkout : null}
          className={`inline-flex items-center justify-center w-full px-6 py-3 font-mono text-base font-medium text-center text-pink-700 bg-pink-100 border border-transparent rounded-full hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:shadow-lg ${
            !count ? 'cursor-not-allowed opacity-75' : ''
          }`}
        >
          Checkout
        </a>
      </div>
    </div> */}
    </>
  );
}
