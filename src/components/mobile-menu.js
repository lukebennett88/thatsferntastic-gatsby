import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Transition } from '@headlessui/react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { useLocation } from '@reach/router';
import PropTypes from 'prop-types';

import { useEventListener, useGraphQL } from '../hooks';

function MobileMenu({ isMenuOpen, setMenuOpen }) {
  const close = () => setMenuOpen(false);

  function handleEscape(e) {
    if (e.key === 'Escape') {
      return close();
    }
  }
  const isBrowser = typeof window !== 'undefined';

  useEventListener('keydown', handleEscape, {
    target: isBrowser ? document : null,
  });

  const { sanitySiteSettings } = useGraphQL();

  const { allShopifyProduct } = useStaticQuery(graphql`
    {
      allShopifyProduct {
        nodes {
          productType
        }
      }
    }
  `);

  const types = [
    ...new Set(
      allShopifyProduct.nodes
        .filter((node) => node.productType !== '')
        .map((node) => node.productType)
    ),
  ];

  const colours = [
    'bg-pink-200 group-hover:bg-pink-300 group-focus:bg-pink-400',
    'bg-teal-200 group-hover:bg-teal-300 group-focus:bg-teal-400',
    'bg-yellow-200 group-hover:bg-yellow-300 group-focus:bg-yellow-400',
    'bg-cyan-200 group-hover:bg-cyan-300 group-focus:bg-cyan-400',
  ];

  const { pathname, search } = useLocation();

  return (
    <Transition show={isMenuOpen} className="md:hidden">
      <DialogOverlay onDismiss={close} className="fixed inset-0 z-40 flex">
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-black opacity-50" />
        </Transition.Child>
        <Transition.Child
          as={DialogContent}
          aria-label="Sidebar menu"
          enter="transition ease-in-out duration-500 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-500 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          className="relative flex flex-col flex-1 w-full max-w-xs pb-4 bg-white outline-none"
        >
          <div className="absolute top-0 right-0 p-1 -mr-14">
            <button
              type="button"
              onClick={close}
              aria-label="Close sidebar"
              className="flex items-center justify-center w-12 h-12 transition duration-150 ease-in-out bg-black bg-opacity-25 rounded-full focus:bg-black focus:bg-opacity-50"
            >
              <svg
                className="w-6 h-6 text-white"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <Link
            to="/"
            className="flex items-center px-2 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-md group first:mt-0 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-100"
          >
            {sanitySiteSettings.title}
          </Link>
          <div className="flex-1 h-0 overflow-y-auto">
            <nav className="px-2 mt-5">
              <Link
                to="/"
                onClick={close}
                className={`relative flex items-center px-2 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-md focus:z-10 group first:mt-0 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-100 ${
                  pathname === '/' && search === ''
                    ? 'text-gray-900 bg-gray-100 hover:bg-gray-100 focus:bg-gray-200'
                    : ''
                }`}
              >
                <span
                  aria-hidden
                  className="inline-block w-5 h-5 mr-3 transition duration-150 ease-in-out bg-indigo-200 rounded-full group-focus:text-indigo-600 group-hover:bg-indigo-300 group-focus:bg-indigo-400"
                />
                All Products
              </Link>
              {types.map((type, index) => {
                const to = `?q=${type.split(' ').join('+')}`;
                return (
                  <Link
                    key={type}
                    to={`/${to}`}
                    onClick={close}
                    className={`flex items-center px-2 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-lg group first:mt-0 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-100 ${
                      search === to
                        ? 'text-gray-900 bg-gray-100 hover:bg-gray-100 focus:bg-gray-200'
                        : ''
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`inline-block transition duration-150 ease-in-out rounded-full w-5 h-5 mr-3 group-focus:text-gray-600 ${
                        colours[
                          index + 1 > colours.length
                            ? index - colours.length
                            : index
                        ]
                      }`}
                    />
                    {type}
                  </Link>
                );
              })}
            </nav>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" />
      </DialogOverlay>
    </Transition>
  );
}

MobileMenu.propTypes = {
  isMenuOpen: PropTypes.bool,
  setMenuOpen: PropTypes.func,
};

export { MobileMenu };
