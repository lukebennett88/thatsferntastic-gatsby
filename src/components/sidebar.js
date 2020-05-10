import React from 'react';
import { Link } from 'gatsby';

import { navigation } from '../data';

export default function Sidebar() {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 pt-5 pb-4 bg-white">
        <div className="flex flex-col flex-1 h-0 mt-5">
          {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
          <nav className="flex-1 px-2 bg-white">
            {navigation.map((navItem) => (
              <Link
                key={navItem.slug}
                to={navItem.slug}
                activeClassName="text-gray-900 bg-gray-100 hover:bg-gray-100 focus:bg-gray-200"
                className="flex items-center px-2 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-lg group first:mt-0 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100"
              >
                <navItem.icon className="w-6 h-6 mr-3 text-gray-500 transition duration-150 ease-in-out group-hover:text-gray-500 group-focus:text-gray-600" />
                {navItem.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
