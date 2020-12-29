import * as React from 'react';
import Image from 'gatsby-image';
import PropTypes from 'prop-types';

export const Thumbnail = ({ src, onClick }) => {
  return (
    <div className="relative h-0 aspect-w-1 aspect-h-1">
      <button
        onClick={onClick}
        type="button"
        className="absolute inset-0 flex p-1 overflow-hidden rounded-lg"
      >
        <Image fluid={src.localFile.childImageSharp.fluid} className="flex-1" />
      </button>
    </div>
  );
};

Thumbnail.propTypes = {
  onClick: PropTypes.func,
  src: PropTypes.object,
};
