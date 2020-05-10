import React from 'react';
import { animated, useTransition } from 'react-spring';
import { FiX } from 'react-icons/fi';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { Link } from 'gatsby';

import { useStoreContext } from '../hooks';

export function AddToCartPreview() {
  const {
    isAddedToCart,
    setAddedToCart,
    cartContent: { title, image, quantity },
  } = useStoreContext();

  function dismiss() {
    setAddedToCart(false);
  }

  const AnimatedDialogContent = animated(DialogContent);

  const transitions = useTransition(isAddedToCart, null, {
    from: { transform: 'translate3d(0, 0%, 0)' },
    enter: { transform: 'translate3d(0, 50%, 0)' },
    leave: { transform: 'translate3d(0, 0%, 0)' },
  });

  return transitions.map(
    ({ item, key, props: { transform } }) =>
      item && (
        <DialogOverlay
          key={key}
          onDismiss={dismiss}
          className="fixed inset-0 z-50 w-full h-full"
        >
          <AnimatedDialogContent
            style={{ transform }}
            className="fixed inset-x-0 top-0 z-40 mx-4 bg-white rounded-lg shadow-2xl -mt-14 md:left-auto md:w-screen md:max-w-lg md:absolute"
          >
            <div className="px-4 shadow-sm">
              <div className="relative py-4">
                <h2 className="text-sm font-bold leading-none tracking-wide text-center md:text-lg">
                  Just added to your cart
                </h2>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <div className="-mx-1.5">
                    <button
                      type="button"
                      onClick={dismiss}
                      className="inline-flex text-gray-400 rounded-full focus:bg-gray-100 p-1.5 hover:bg-grey-100 focus:outline-none focus:text-gray-500 hover:text-gray-500 focus:bg-grey-100 transition ease-in-out duration-150"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="py-4 text-center border-t md:text-left md:grid md:gap-4 md:grid-cols-6">
                <div className="relative hidden h-0 aspect-ratio-square md:block">
                  <img
                    src={image}
                    alt=""
                    className="absolute inset-0 object-contain w-full h-full overflow-hidden transform bg-pink-100 rounded-lg"
                  />
                </div>
                <div className="max-w-sm col-span-4 mx-auto mt-4 md:mx-0 md:mt-0">
                  {title}
                </div>
                <div className="mt-4 md:text-right md:mt-0">
                  Qty: {quantity}
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="duration-150 ease-in-out transform rounded-full shadow-sm hover:-translate-y-px">
                  <Link
                    to="/cart/"
                    className="inline-flex items-center px-6 py-3 font-mono text-base font-bold leading-6 text-pink-700 lowercase transition duration-150 ease-in-out bg-pink-100 border border-transparent rounded-full shadow-sm hover:bg-pink-50 focus:outline-none focus:border-pink-300 focus:shadow-pink-indigo active:bg-pink-200 hover:shadow-lg"
                  >
                    View cart
                  </Link>
                </span>
                <button
                  type="button"
                  onClick={dismiss}
                  className="pb-4 mt-2 font-bold underline focus:outline-none focus:text-pink-700"
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </AnimatedDialogContent>
        </DialogOverlay>
      )
  );
}
