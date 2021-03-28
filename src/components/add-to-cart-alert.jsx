import { DialogContent,DialogOverlay } from '@reach/dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FiX } from 'react-icons/fi';

function AddToCartAlert({ product, variant, isAlertShown, setIsAlertShown }) {
  const close = () => setIsAlertShown(false);
  return (
    <AnimatePresence>
      {isAlertShown ? (
        <DialogOverlay
          onDismiss={close}
          className="fixed inset-x-0 top-0 z-50 flex items-start justify-center w-full h-full mx-auto"
        >
          <div className="fixed flex justify-center w-full max-w-screen-xl px-4 mx-auto md:justify-end sm:px-6 lg:px-8">
            <DialogContent
              as={motion.div}
              aria-label="Product added to cart."
              initial={{ x: '50%', opacity: 0 }}
              animate={{ x: '0%',opacity: 1 }}
              exit={{ x: '50%', opacity: 0 }}
              transition={{ type: 'spring', damping: 18, stiffness: 200 }}
              className="w-full mt-20 bg-white rounded-lg shadow-2xl md:max-w-lg"
            >
              <div className="px-4 shadow-sm">
                <div className="relative py-4">
                  <h2 className="font-mono text-sm leading-none text-center text-pink-500 md:text-lg">
                    Just added to your cart
                  </h2>
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <div className="-mx-1.5">
                      <button
                        type="button"
                        onClick={close}
                        className="inline-flex text-gray-400 rounded-full focus:bg-gray-100 p-1.5 hover:bg-grey-100 focus:text-gray-500 hover:text-gray-500 focus:bg-grey-100 transition ease-in-out duration-150"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="py-4 text-center border-t md:text-left md:grid md:gap-4 md:grid-cols-6">
                  <div className="relative hidden h-0 aspect-w-1 aspect-h-1 md:block">
                    <div className="absolute inset-0 flex">
                      <GatsbyImage
                        image={
                          product.variants[0].image.localFile.childImageSharp
                            .gatsbyImageData
                        }
                        alt=""
                        className="flex-1 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="max-w-sm col-span-4 mx-auto mt-4 font-medium md:mx-0 md:mt-0">
                    <div>{product.title}</div>
                    {variant.selectedOptions[0].name !== 'Title' && (
                    <dl className="font-normal text-gray-500">
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
                <div className="flex items-center justify-between pb-4 text-center">
                  <button
                    type="button"
                    onClick={close}
                    className="mt-2 underline focus:text-pink-700"
                  >
                    Continue shopping
                  </button>
                  <span className="duration-150 ease-in-out transform rounded-full shadow-sm hover:-translate-y-px">
                    <Link
                      to="/cart/"
                      onClick={close}
                      className="inline-flex items-center px-6 py-3 font-mono text-base font-medium text-pink-700 bg-pink-100 border border-transparent rounded-full hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:shadow-lg"
                    >
                      View cart
                    </Link>
                  </span>
                </div>
              </div>
            </DialogContent>
          </div>
        </DialogOverlay>
          ) : null}
    </AnimatePresence>
  );
}

AddToCartAlert.propTypes = {
  isAlertShown: PropTypes.bool.isRequired,
  product: PropTypes.shape({
    title: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    variants: PropTypes.array.isRequired,
  }),
  setIsAlertShown: PropTypes.func.isRequired,
  variant: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    selectedOptions: PropTypes.array.isRequired,
  }),
};

export { AddToCartAlert };
