import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';

export const Thumbnail = ({ src, onClick }) => {
  return (
    <div className="relative h-0 aspect-w-1 aspect-h-1">
      <button
        onClick={onClick}
        type="button"
        className="absolute inset-0 flex p-1 overflow-hidden rounded-lg"
      >
        <GatsbyImage
          image={src.localFile.childImageSharp.gatsbyImageData}
          alt=""
          className="flex-1"
        />
      </button>
    </div>
  );
};

Thumbnail.propTypes = {
  onClick: PropTypes.func,
  src: PropTypes.object,
};
