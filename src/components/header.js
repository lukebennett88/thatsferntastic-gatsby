import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';

import { useGraphQL, useCartCount } from '../hooks';
import { Wave } from './wave';

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

  return (
    <header className="overflow-hidden">
      <div className="bg-pastel-teal">
        <div className="relative z-10 flex flex-shrink-0 h-16 bg-white shadow">
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
          <div className="flex justify-between flex-1 px-4">
            <div className="flex flex-1">
              <div className="flex w-full md:ml-0">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="search_field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="search_field"
                    className="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 rounded-md focus:outline-none focus:placeholder-gray-400 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center ml-4 md:ml-6">
              <button
                type="button"
                aria-label="Notifications"
                className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:shadow-outline focus:text-gray-500"
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
              </button>

              <div className="relative ml-3">
                <div>
                  <Link
                    to="/cart/"
                    aria-label="User menu"
                    aria-haspopup="true"
                    className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:shadow-outline"
                    id="user-menu"
                  >
                    {count}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pt-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center text-gray-900">
            <h1 className="font-mono text-2xl leading-none sm:text-6xl">
              <Link to="/">{title}</Link>
            </h1>
            <p className="mt-1 leading-tight lowercase sm:text-xl">
              {description}
            </p>
          </div>
        </div>
      </div>
      <Wave className="w-full -mb-1 text-pastel-teal" />
    </header>
  );
};

Header.propTypes = {
  setMenuOpen: PropTypes.func,
};

export { Header };
