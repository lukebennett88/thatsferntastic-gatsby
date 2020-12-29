import * as React from 'react';
import { Link } from 'gatsby';
import { Transition } from '@headlessui/react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import PropTypes from 'prop-types';

import { useEventListener, useGraphQL } from '../hooks';
import { navigation } from '../data';

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

  const {
    site: {
      siteMetadata: { title },
    },
  } = useGraphQL();

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
            className="flex items-center justify-center h-16 px-4 font-mono text-2xl text-center bg-teal-200 focus:underline"
          >
            {title}
          </Link>
          <div className="flex-1 h-0 mt-5 overflow-y-auto">
            <nav className="px-2">
              {navigation.map((navItem) => (
                <Link
                  key={navItem.slug}
                  to={navItem.slug}
                  activeClassName="text-gray-900 bg-gray-100 focus:bg-gray-200"
                  className="flex items-center px-2 py-2 mt-1 text-base font-medium leading-6 text-gray-600 transition duration-150 ease-in-out rounded-lg first:mt-0 group hover:text-gray-900 hover:bg-gray-50 focus:text-gray-900 focus:bg-gray-100"
                >
                  <navItem.icon className="w-6 h-6 mr-4 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-500 group-focus:text-gray-500" />
                  {navItem.title}
                </Link>
              ))}
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
