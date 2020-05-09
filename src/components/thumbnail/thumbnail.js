import PropTypes from 'prop-types';
import React from 'react';
import Image from 'gatsby-image';

export const Thumbnail = ({ src, onClick }) => {
  return (
    <button onClick={onClick} type="button">
      <Image fluid={src.localFile.childImageSharp.fluid} />
    </button>
  );
};

Thumbnail.propTypes = {
  onClick: PropTypes.func,
  src: PropTypes.object,
};
