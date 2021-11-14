import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { useShopifyContext } from '../../context/shopify';
import { useCartCount } from '../../hooks/use-cart-count';
import { LineItemsType, useCartItems } from '../../hooks/use-cart-items';
import { useCheckoutUrl } from '../../hooks/use-checkout-url';
import { classNames } from '../../utils/classnames';
import { formatMoney } from '../../utils/format-money';
import { Spinner } from '../spinner';
import { LineItem } from './line-item';

export function Cart(): React.ReactElement {
  const lineItems = useCartItems();
  const count = useCartCount();
  const [showDialog, setShowDialog] = React.useState(false);
  const [note, setNote] = React.useState('');
  return (
    <div className="relative pb-20">
      <h1 className="text-center heading-1 sm:text-left">Cart</h1>
      <div className="flex flex-wrap py-12 lg:space-x-16">
        <div className="relative grid flex-1 pb-20 mx-auto gap-y-10 gap-x-12 lg:col-span-3">
          {count
            ? lineItems.map((item: LineItemsType) =>
                item.variant ? <LineItem key={item.id} item={item} /> : null
              )
            : 'Nothing to see here, your cart is empty!'}
        </div>
        <CartSummary setNote={setNote} setShowDialog={setShowDialog} />
        <Terms
          note={note}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />
      </div>
    </div>
  );
}

type CartSummaryProps = {
  setNote: React.Dispatch<React.SetStateAction<string>>;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function CartSummary({
  setNote,
  setShowDialog,
}: CartSummaryProps): React.ReactElement {
  const count = useCartCount();
  const { cart } = useShopifyContext();
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
              <dd>{count}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Subtotal:</dt>
              <dd>{formatMoney(cart?.totalPrice || 0)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping:</dt>
              <dd>Calculated at checkout</dd>
            </div>
          </dl>
          <div className="mt-3">
            <label htmlFor="notes">
              <span className="block">Notes:</span>
              <div className="mt-1">
                <textarea
                  rows={4}
                  name="notes"
                  id="notes"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  onChange={(event) => {
                    setNote(event.target.value);
                  }}
                />
              </div>
            </label>
          </div>

          <div className="mt-6">
            <span
              className={classNames(
                'button-wrapper',
                !count && 'hover:transform-none'
              )}
            >
              <button
                type="button"
                onClick={() => setShowDialog(true)}
                disabled={!count}
                className={classNames(
                  'button w-full',
                  !count &&
                    '!text-gray-700 !bg-gray-100 cursor-not-allowed opacity-75 hover:shadow-none'
                )}
              >
                Checkout
              </button>
            </span>
          </div>
        </div>
      </nav>
    </aside>
  );
}

type TermsProps = {
  note: string;
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function Terms({
  note,
  showDialog,
  setShowDialog,
}: TermsProps): React.ReactElement {
  const [isLoading, setIsLoading] = React.useState(false);
  const checkout = useCheckoutUrl();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({ mode: 'all' });
  const { cart, client } = useShopifyContext();
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onSubmit = async () => {
    setIsLoading(true);
    if (note) {
      await client.checkout.updateAttributes(cart.id, {
        note,
      });
    }
    if (checkout) {
      // eslint-disable-next-line scanjs-rules/assign_to_href
      window.location.href = checkout;
    }
    setIsLoading(false);
  };
  return (
    <>
      <Transition.Root show={showDialog} as={React.Fragment}>
        <Dialog
          as="div"
          aria-label="Terms and Conditions"
          static
          className="fixed inset-0 z-10 overflow-y-auto"
          open={showDialog}
          onClose={setShowDialog}
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-25" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden
            >
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="inline-flex text-gray-400 rounded-full focus:bg-gray-100 p-1.5 hover:bg-grey-100 focus:text-gray-500 hover:text-gray-500 focus:bg-grey-100 transition ease-in-out duration-150"
                    onClick={() => setShowDialog(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="w-6 h-6" aria-hidden />
                  </button>
                </div>
                <div>
                  <h3 className="font-mono text-2xl leading-none text-pink-500">
                    Please note...
                  </h3>
                  <div className="mt-2 prose-sm prose text-gray-500">
                    <p>
                      Whilst we endeavour to get your order out as quickly as
                      possible, please be aware, we are a small business
                      creating handmade items, and as such the processing time
                      for orders <em>can</em> take up to 10 days.
                    </p>
                    <p>
                      By checking the box below, you indicate that you are aware
                      of this condition and agree to these terms.
                    </p>
                  </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-5 space-y-4 sm:mt-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-between">
                    <div>
                      <label
                        htmlFor="agree_to_terms"
                        className="flex items-center text-sm text-gray-900"
                      >
                        <input
                          id="agree_to_terms"
                          type="checkbox"
                          {...register('agree_to_terms', { required: true })}
                          className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                        />
                        <span className="ml-2">Agree to terms</span>
                      </label>
                      {errors.agree_to_terms ? (
                        <p
                          aria-live="polite"
                          className="text-sm font-medium text-pink-600 sm:absolute sm:bottom-4"
                        >
                          You must agree to the terms to continue
                        </p>
                      ) : null}
                    </div>

                    <button type="submit" className="button">
                      {isLoading ? (
                        <span className="px-8">
                          <Spinner className="w-4 h-4 text-pink-600 animate-spin" />
                        </span>
                      ) : (
                        'Checkout'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
