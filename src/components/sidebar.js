import PropTypes from 'prop-types';
import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { useLocation } from '@reach/router';

import { useGraphQL } from '../hooks';

function Sidebar() {
  const { allShopifyProduct } = useStaticQuery(graphql`
    {
      allShopifyProduct {
        nodes {
          productType
        }
      }
    }
  `);
  const { allShopifyCollection } = useGraphQL();

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

  const { search, pathname } = useLocation();

  return (
    <aside className="hidden pb-20 w-72 lg:block">
      <nav className="sticky px-2 py-3 bg-white rounded-lg shadow top-28">
        <h2 className="px-2 text-sm font-semibold tracking-wider text-pink-500 uppercase">
          Shop by product type
        </h2>
        <NavLink
          to="/"
          label="All Products"
          active={pathname === '/' && search === ''}
        />
        {types.map((type, index) => {
          const to = `?q=${type.split(' ').join('+')}`;
          return (
            <Link
              key={type}
              to={`/${to}`}
              className={`flex items-center px-2 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-md group first:mt-0 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-100 ${
                search === to
                  ? 'text-gray-900 bg-gray-100 hover:bg-gray-100 focus:bg-gray-200'
                  : ''
              }`}
            >
              <span
                aria-hidden
                className={`inline-block transition duration-150 ease-in-out rounded-full w-5 h-5 mr-3 group-focus:text-gray-600 ${
                  colours[
                    index + 1 > colours.length ? index - colours.length : index
                  ]
                }`}
              />
              {type}
            </Link>
          );
        })}
        <h2 className="px-2 mt-2 text-sm font-semibold tracking-wider text-pink-500 uppercase">
          Shop by theme
        </h2>
        <ul>
          {allShopifyCollection.nodes.map(({ id, handle, title }) => {
            const to = `/collections/${handle}/`;
            return (
              <li key={id}>
                <NavLink to={to} label={title} active={pathname === to} />
              </li>
            );
          })}
        </ul>
        <h2 className="px-2 mt-2 text-sm font-semibold tracking-wider text-pink-500 uppercase">
          Links
        </h2>
        <ul>
          <li>
            <NavLink
              to="/shipping-and-processing-times/"
              label="Shipping and Processing Times"
              active={pathname === '/shipping-and-processing-times/'}
            />
          </li>
          <li>
            <NavLink
              to="/stockists/"
              label="Stockists"
              active={pathname === '/stockists/'}
            />
          </li>
          <li>
            <NavLink
              to="/posts/"
              label="Blog"
              active={pathname === '/posts/'}
            />
          </li>
        </ul>
      </nav>
    </aside>
  );
}

function NavLink({ to, label, active, Icon }) {
  return (
    <Link
      to={to}
      className={`flex items-center px-2 py-2 mt-2 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-lg group first:mt-0 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-100 ${
        active
          ? 'text-gray-900 bg-gray-100 hover:bg-gray-100 focus:bg-gray-200'
          : ''
      }`}
    >
      {Icon ? (
        <Icon />
      ) : (
        <span
          aria-hidden
          className="flex-shrink-0 inline-block w-5 h-5 mr-3 transition duration-150 ease-in-out bg-indigo-200 rounded-full group-focus:text-indigo-600 group-hover:bg-indigo-300 group-focus:bg-indigo-400"
        />
      )}
      {label}
    </Link>
  );
}

NavLink.propTypes = {
  active: PropTypes.bool,
  Icon: PropTypes.func,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export { Sidebar };
