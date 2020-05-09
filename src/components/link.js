import PropTypes from 'prop-types';
import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

export const Link = ({ isButton, url, children }) => {
  return isButton ? (
    <span className="inline-flex rounded-md shadow-sm">
      <GatsbyLink
        to={url}
        activeClassName="active"
        className="inline-flex items-center px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:border-gray-800 focus:shadow-outline-gray active:bg-black"
      >
        {children}
      </GatsbyLink>
    </span>
  ) : (
    <GatsbyLink
      to={url}
      className="text-gray-900 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none focus:shadow-outline-gray active:text-black"
    >
      {children}
    </GatsbyLink>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  isButton: PropTypes.bool,
  url: PropTypes.string.isRequired,
};
