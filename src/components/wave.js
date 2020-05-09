import PropTypes from 'prop-types';
import React from 'react';

export function Wave({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      className={className}
    >
      <path
        fill="currentColor"
        d="M0 96l48 16c48 16 144 48 240 48s192-32 288-53.3C672 85 768 75 864 85.3 960 96 1056 128 1152 128s192-32 240-48l48-16V0H0z"
      />
    </svg>
  );
}

Wave.propTypes = {
  className: PropTypes.string,
};
