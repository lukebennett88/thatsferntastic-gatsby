import React from 'react';
import { Link } from 'gatsby';

import { useGraphQL, useCartCount } from '../hooks';

const Header = () => {
  const {
    site: {
      siteMetadata: { title },
    },
  } = useGraphQL();
  const count = useCartCount();

  return (
    <header className="sticky top-0 z-10 bg-white shadow">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              {title}
            </h1>
          </Link>
          <Link
            to="/cart"
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray active:bg-gray-900"
          >
            <span className="leading-none">Cart</span>

            <span className="relative inline-flex items-center justify-center w-5 h-5 ml-2 text-sm leading-none text-black bg-white rounded-full">
              {count}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export { Header };
