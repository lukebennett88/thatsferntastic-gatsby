/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import 'typeface-courier-prime';
import 'typeface-montserrat';
import './src/css/tailwind.css';

import * as React from 'react';

import { StoreProvider } from './src/context/store-context';

export function wrapRootElement({ element }) {
  return <StoreProvider>{element}</StoreProvider>;
}
