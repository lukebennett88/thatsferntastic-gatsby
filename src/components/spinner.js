import PropTypes from 'prop-types';
import * as React from 'react';
import ReactSVGSpinner from 'react-svg-spinner';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);

export function Spinner({ color = fullConfig.theme.colors.cyan['600'] }) {
  return (
    <ReactSVGSpinner size="2em" color={color} thickness={3} speed="slow" />
  );
}

Spinner.propTypes = {
  color: PropTypes.string,
};
