import { useLocation } from '@reach/router';
import { Link } from 'gatsby';
import * as React from 'react';

import { useAllShopifyCollections } from '../hooks/use-all-shopify-collections';
import { useAllShopifyProductTypes } from '../hooks/use-all-shopify-product-types';

const colours = [
  'bg-pink-200 group-hover:bg-pink-300 group-focus:bg-pink-400',
  'bg-teal-200 group-hover:bg-teal-300 group-focus:bg-teal-400',
  'bg-yellow-200 group-hover:bg-yellow-300 group-focus:bg-yellow-400',
  'bg-cyan-200 group-hover:bg-cyan-300 group-focus:bg-cyan-400',
  'bg-indigo-200 group-hover:bg-indigo-300 group-focus:bg-indigo-400',
];

const linksMenu = [
  {
    to: '/shipping-and-processing-times/',
    label: 'Shipping and Processing Times',
  },
  {
    to: '/about/',
    label: 'About',
  },
];

type MainMenuProps = {
  onClick?: () => void;
};

function MainMenu({ onClick }: MainMenuProps): React.ReactElement {
  const allShopifyProduct = useAllShopifyProductTypes();
  const allShopifyCollection = useAllShopifyCollections();
  const types = [
    ...new Set(
      allShopifyProduct.nodes
        .filter((node) => node.productType !== '')
        .map((node) => node.productType)
    ),
  ];
  const { search, pathname } = useLocation();
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="px-2 text-sm font-semibold tracking-wider text-pink-500 uppercase">
          Shop by product type
        </h2>
        <ul className="mt-1">
          <NavLink
            to="/products/"
            onClick={onClick}
            label="All Products"
            active={pathname === '/' && search === ''}
            index={0}
          />
          {types.map((type, index) => {
            const to = `?q=${type.split(' ').join('+')}`;
            return (
              <NavLink
                key={type}
                to={`/${to}`}
                onClick={onClick}
                label={type}
                active={search === to}
                index={index + 1}
              />
            );
          })}
        </ul>
      </div>
      <div className="space-y-2">
        <h2 className="px-2 text-sm font-semibold tracking-wider text-pink-500 uppercase">
          Shop by theme
        </h2>
        <ul className="mt-1">
          {allShopifyCollection.nodes.map(({ id, handle, title }, index) => {
            const to = `/collections/${handle}/`;
            return (
              <NavLink
                key={id}
                to={to}
                onClick={onClick}
                label={title}
                active={pathname === to}
                index={index}
              />
            );
          })}
        </ul>
      </div>
      <div className="space-y-2">
        <h2 className="px-2 text-sm font-semibold tracking-wider text-pink-500 uppercase">
          Links
        </h2>
        <ul className="mt-1">
          {linksMenu.map(({ to, label }, index) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClick}
              label={label}
              active={pathname === to}
              index={index}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

type NavLinkProps = {
  to: string;
  label: string;
  active: boolean;
  index: number;
  onClick?: () => void;
};

function NavLink({
  to,
  label,
  active,
  index,
  onClick,
}: NavLinkProps): React.ReactElement {
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className={`flex relative items-center px-2 py-2 mt-2 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-lg group first:mt-0 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-100 focus:z-10 ${
          active
            ? 'text-gray-900 bg-gray-100 hover:bg-gray-100 focus:bg-gray-200'
            : ''
        }`}
      >
        <span
          aria-hidden
          className={`flex-shrink-0 inline-block transition duration-150 ease-in-out rounded-full w-5 h-5 mr-3 group-focus:text-gray-600 ${
            colours[index + 1 > colours.length ? index - colours.length : index]
          }`}
        />
        {label}
      </Link>
    </li>
  );
}

export { MainMenu };
