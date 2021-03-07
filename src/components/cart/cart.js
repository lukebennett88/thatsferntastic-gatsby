import { DialogContent, DialogOverlay } from '@reach/dialog';
import * as React from 'react';
import { HiX } from 'react-icons/hi';

import { LineItem } from './line-item';

export function Cart() {
  // const lineItems = useCartItems();
  // const count = useCartCount();
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <div className="relative pb-20">
      <h1 className="text-center heading-1 sm:text-left">Cart</h1>
      <div className="flex flex-wrap py-12 lg:space-x-16">
        <div className="relative grid flex-1 pb-20 mx-auto gap-y-10 gap-x-12 lg:col-span-3">
          {/* {count
            ? lineItems.map(
                (item) => item.variant && <LineItem key={item.id} item={item} />
              )
            : 'Nothing to see here, your cart is empty!'} */}
        </div>
        <CartSummary open={open} />
        <Terms showDialog={showDialog} close={close} />
      </div>
    </div>
  );
}

function CartSummary({ open }) {
  // const cart = useCart();
  // const count = useCartCount();

  return (
    <aside className="w-full lg:max-w-sm">
      <nav className="sticky top-28">
        <div className="w-full max-w-sm px-4 py-6 mx-auto bg-white rounded-lg shadow sm:max-w-none">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Cart Summary
          </h2>
          <hr className="my-3" />
          <dl className="grid gap-y-3">
            <div className="flex justify-between">
              <dt>Items in cart:</dt>
              {/* <dd>{count}</dd> */}
            </div>
            <div className="flex justify-between">
              <dt>Subtotal:</dt>
              {/* <dd>${Number(cart?.totalPrice || 0).toFixed(2)}</dd> */}
            </div>
            <div className="flex justify-between">
              <dt>Shipping:</dt>
              <dd>Calculated at checkout</dd>
            </div>
          </dl>
          <div className="mt-6">
            <button
              type="button"
              onClick={open}
              // disabled={!count}
              // className={`inline-flex items-center justify-center w-full px-6 py-3 font-mono text-base font-medium text-center text-pink-700 bg-pink-100 border border-transparent rounded-full hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:shadow-lg ${
              //   !count ? 'cursor-not-allowed opacity-75' : ''
              // }`}
            >
              Checkout
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}

function Terms({ showDialog, close }) {
  const overlayRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const [isChecked, setIsChecked] = React.useState(false);
  // const checkout = useCheckoutUrl();

  return (
    <DialogOverlay
      ref={overlayRef}
      isOpen={showDialog}
      onDismiss={close}
      className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-25"
    >
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/*
            Background overlay, show/hide based on modal state.

            Entering: "ease-out duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100"
              To: "opacity-0"
                */}
        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden
        >
          ​
        </span>
        {/*
            Modal panel, show/hide based on modal state.

            Entering: "ease-out duration-300"
              From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100 translate-y-0 sm:scale-100"
              To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            */}
        <DialogContent
          aria-label="Terms and Conditions"
          ref={contentRef}
          className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          aria-modal
        >
          <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
            <button
              type="button"
              onClick={close}
              className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-opacity-50"
            >
              <span className="sr-only">Close</span>
              <HiX aria-hidden className="w-6 h-6" />
            </button>
          </div>
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 max-w-prose sm:text-left">
              <h3 className="text-3xl heading-1" id="modal-headline">
                Please note...
              </h3>
              <div className="mt-2 prose-sm prose text-left text-gray-500">
                <p>
                  Whilst we endeavour to get your order out as quickly as
                  possible, please be aware, we are a small business creating
                  handmade items, and as such the processing time for orders{' '}
                  <em>can</em> take up to 10 days.
                </p>
                <p>
                  By checking the box below, you indicate that you are aware of
                  this condition and agree to these terms.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 space-y-4 sm:mt-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-between">
            <label
              htmlFor="agree_to_terms"
              className="flex items-center text-sm text-gray-900"
            >
              <input
                id="agree_to_terms"
                name="agree_to_terms"
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
                className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
              />
              <span className="ml-2">Agree to terms</span>
            </label>

            <a
              // href={isChecked ? checkout : null}
              className={`inline-flex items-center justify-center px-12 py-3 font-mono text-base font-medium text-center border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
                isChecked
                  ? 'text-pink-700 bg-pink-100 hover:bg-pink-200'
                  : 'text-gray-700 bg-gray-100 cursor-not-allowed opacity-75'
              }`}
            >
              Checkout
            </a>
          </div>
        </DialogContent>
      </div>
    </DialogOverlay>
  );
}
