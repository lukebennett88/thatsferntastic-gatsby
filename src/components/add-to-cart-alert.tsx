import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';

import { ShopifyProduct, ShopifyVariant } from '../types/shopify-product';

const transition = { type: 'spring', damping: 18, stiffness: 200 };

type AddToCartAlertProps = {
  product: ShopifyProduct;
  variant: ShopifyVariant;
  isAlertShown: boolean;
  setIsAlertShown: (value: React.SetStateAction<boolean>) => void;
};

function AddToCartAlert({
  product,
  variant,
  isAlertShown,
  setIsAlertShown,
}: AddToCartAlertProps): React.ReactElement {
  return (
    <AnimatePresence>
      {isAlertShown ? (
        <Transition.Root show={isAlertShown} as={React.Fragment}>
          <Dialog
            as="div"
            static
            className="fixed inset-0 z-10 overflow-y-auto"
            open={isAlertShown}
            onClose={setIsAlertShown}
          >
            <div className="flex items-start justify-end min-h-screen pt-4 pb-20 text-center sm:block">
              <Dialog.Overlay
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
                className="fixed inset-0 bg-gray-500 bg-opacity-25"
              />
              <div className="flex justify-end w-full max-w-screen-xl px-6 mx-auto pointer-events-none">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <motion.div
                    aria-label="Product added to cart."
                    initial={{ x: '50%', opacity: 0 }}
                    animate={{ x: '0%', opacity: 1 }}
                    exit={{ x: '50%', opacity: 0 }}
                    transition={transition}
                    className="inline-block w-full px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl pointer-events-auto sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                  >
                    <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                      <button
                        type="button"
                        className="inline-flex text-gray-400 rounded-full focus:bg-gray-100 p-1.5 hover:bg-grey-100 focus:text-gray-500 hover:text-gray-500 focus:bg-grey-100 transition ease-in-out duration-150"
                        onClick={() => setIsAlertShown(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XIcon className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 sm:mt-0">
                        <Dialog.Title className="font-mono text-lg leading-none text-pink-500">
                          Just added to your cart
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="py-4 border-t md:grid md:grid-cols-6 md:gap-4">
                        {product?.variants?.[0]?.image?.localFile
                          ?.childImageSharp?.gatsbyImageData ? (
                          <div className="relative hidden h-0 md:block aspect-w-1 aspect-h-1">
                            <div className="absolute inset-0 flex">
                              <GatsbyImage
                                image={
                                  product.variants[0].image.localFile
                                    .childImageSharp.gatsbyImageData
                                }
                                alt=""
                                className="flex-1 rounded-lg"
                              />
                            </div>
                          </div>
                        ) : null}
                        <div className="col-span-4 mt-4 prose md:mt-0">
                          <h3 className="!text-base !text-gray-900 !font-medium !mb-0">
                            {product.title}
                          </h3>
                          {variant.selectedOptions[0].name !== 'Title' && (
                            <dl className="font-normal !mt-0 text-gray-500">
                              <dt className="inline">
                                {variant.selectedOptions[0].name}:{' '}
                              </dt>
                              <dd className="inline">
                                {variant.selectedOptions[0].value}
                              </dd>
                            </dl>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-center">
                      <button
                        type="button"
                        onClick={() => setIsAlertShown(false)}
                        className="mt-2 underline focus:text-pink-700"
                      >
                        Continue shopping
                      </button>
                      <span className="duration-150 ease-in-out rounded-full shadow-sm transform-gpu hover:-translate-y-px">
                        <Link
                          to="/cart/"
                          onClick={() => setIsAlertShown(false)}
                          className="button"
                        >
                          View cart
                        </Link>
                      </span>
                    </div>
                  </motion.div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      ) : null}
    </AnimatePresence>
  );
}

export { AddToCartAlert };
