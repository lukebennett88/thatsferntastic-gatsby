/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import PropTypes from 'prop-types';
import React from 'react';

import { StoreContextProvider } from './src/context/store-context';
import 'typeface-inter';
import './src/css/tailwind.css';

export const wrapRootElement = ({ element }) => (
  <StoreContextProvider>{element}</StoreContextProvider>
);

wrapRootElement.propTypes = {
  element: PropTypes.node.isRequired,
};
