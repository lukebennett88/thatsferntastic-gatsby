import PropTypes from 'prop-types';
import React from 'react';

function Icon({ className }) {
  return (
    <svg
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      stroke="currentColor"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

Icon.propTypes = {
  className: PropTypes.string,
};

export const navigation = [
  { title: 'Mini pouches', slug: '/mini-pouches/', icon: Icon },
  { title: 'Flatlay pouches', slug: '/flatlay-pouches/', icon: Icon },
  {
    title: 'Free Standing Pouches',
    slug: '/free-standing-pouches/',
    icon: Icon,
  },
  {
    title: 'Limited Edition Pouches',
    slug: '/limited-edition-pouches/',
    icon: Icon,
  },
  {
    title: 'Keyfobs',
    slug: '/Keyfobs/',
    icon: Icon,
  },
  {
    title: 'Custom Orders',
    slug: '/custom-orders/',
    icon: Icon,
  },
];
