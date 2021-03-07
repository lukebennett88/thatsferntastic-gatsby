import * as React from 'react';

function Wave({ className }) {
  return (
    <svg
      viewBox="0 0 1440 96"
      fill="currentColor"
      preserveAspectRatio="none"
      className={className}
    >
      <path d="M0 32l48 16c48 16 144 48 240 48s192-32 288-53.3C672 21 768 11 864 21.3 960 32 1056 64 1152 64s192-32 240-48l48-16H0v32z" />
    </svg>
  );
}

export { Wave };
