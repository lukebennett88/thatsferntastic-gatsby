import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import { Link } from 'gatsby';

import { useGraphQL, useOnClickOutside } from '../hooks';
import { navigation } from '../data';

export default function MobileMenu({ isMenuOpen, setMenuOpen }) {
  // Metadata
  const {
    site: {
      siteMetadata: { title },
    },
  } = useGraphQL();

  // Close menu
  function close() {
    setMenuOpen(false);
  }

  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();

  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setMenuOpen(false));

  // Animate transitions
  const transitions = useTransition(isMenuOpen, null, {
    from: { opacity: 0, transform: 'translateX(-100%)' },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 0, transform: 'translateX(-100%)' },
  });

  return transitions.map(
    ({ item, key, props: { opacity, transform } }) =>
      item && (
        <div key={key} className="md:hidden">
          <div className="fixed inset-0 z-40 flex">
            <animated.div style={{ opacity }} className="fixed inset-0">
              <div className="absolute inset-0 bg-black opacity-50" />
            </animated.div>
            <animated.div
              ref={ref}
              style={{ transform }}
              className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white"
            >
              <div className="absolute top-0 right-0 p-1 -mr-14">
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close sidebar"
                  className="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-gray-600"
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
              <div className="px-4 font-mono text-2xl text-center">{title}</div>
              <div className="flex-1 h-0 mt-5 overflow-y-auto">
                <nav className="px-2">
                  {navigation.map((navItem) => (
                    <Link
                      key={navItem.slug}
                      to={navItem.slug}
                      activeClassName="text-gray-900 bg-gray-100 focus:bg-gray-200"
                      className="flex items-center px-2 py-2 mt-1 text-base font-medium leading-6 text-gray-600 transition duration-150 ease-in-out rounded-lg first:mt-0 group hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100"
                    >
                      <navItem.icon className="w-6 h-6 mr-4 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-500 group-focus:text-gray-500" />
                      {navItem.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </animated.div>
            {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
            <div className="flex-shrink-0 w-14" />
          </div>
        </div>
      )
  );
}

MobileMenu.propTypes = {
  isMenuOpen: PropTypes.bool,
  setMenuOpen: PropTypes.func,
};
