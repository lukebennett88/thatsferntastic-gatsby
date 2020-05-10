import PropTypes from 'prop-types';
import React from 'react';
import { useTransition, animated } from 'react-spring';
import { Link } from 'gatsby';

import { useGraphQL, useCartCount, useStoreContext } from '../hooks';
import { Wave } from './wave';
import { SearchBar } from './search-bar';
import { AddToCartPreview } from './add-to-cart-preview';

const Header = ({ setMenuOpen }) => {
  const count = useCartCount();
  const {
    site: {
      siteMetadata: { title, description },
    },
  } = useGraphQL();

  function toggleMenu() {
    setMenuOpen((prevState) => !prevState);
  }

  const { isAddedToCart } = useStoreContext();

  const transitions = useTransition(count >= 1, null, {
    from: { opacity: 0, transform: 'translate3d(0, 1rem, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0rem, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -1rem, 0)' },
  });

  return (
    <header className="relative">
      <div className="relative bg-teal-300">
        <div className="relative z-10 flex flex-shrink-0 w-full h-16 mx-auto bg-white shadow max-w-7xl md:bg-transparent md:shadow-none">
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Open sidebar"
            className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:bg-gray-100 focus:text-gray-600 md:hidden"
          >
            <svg
              className="w-6 h-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <div className="flex justify-between flex-1 px-4 md:mt-4">
            <SearchBar />
            <div className="relative flex items-center ml-4 md:ml-6">
              <Link
                to="/cart/"
                aria-label="Shopping cart"
                className="relative p-3 text-gray-500 bg-white rounded-full md:shadow hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:shadow-outline focus:text-gray-600"
              >
                <svg
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {transitions.map(
                  ({ item, key, props: style }) =>
                    item && (
                      <animated.div
                        key={key}
                        style={style}
                        className="absolute top-0 right-0 pointer-events-none"
                      >
                        <span
                          className={`${
                            count >= 10 ? 'px-2' : 'w-5'
                          } flex items-center justify-center h-5 max-w-xs pt-1 font-mono text-xs font-bold text-white transform translate-x-1/2 bg-gray-900 rounded-full shadow-lg pointer-events-auto focus:outline-none focus:shadow-outline`}
                        >
                          {count}
                        </span>
                      </animated.div>
                    )
                )}
              </Link>
              {isAddedToCart && <AddToCartPreview />}
            </div>
          </div>
        </div>

        <div className="px-4 pt-12 pb-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center text-gray-900">
            <h1 className="font-mono text-2xl leading-none sm:text-6xl">
              <Link to="/" className=" focus:outline-none focus:underline">
                {title}
              </Link>
            </h1>
            <p className="mt-1 leading-tight lowercase sm:text-xl">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="overflow-hidden">
        <Wave className="-mx-1 -mt-px text-teal-300" />
      </div>
    </header>
  );
};

Header.propTypes = {
  setMenuOpen: PropTypes.func,
};

export { Header };
