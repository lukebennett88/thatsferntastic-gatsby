import * as React from 'react';
import Image from 'gatsby-image';
import PropTypes from 'prop-types';

export const Thumbnail = ({ src, onClick }) => {
  return (
    <button onClick={onClick} type="button" className="block">
      <Image fluid={src.localFile.childImageSharp.fluid} />
    </button>
  );
};

Thumbnail.propTypes = {
  onClick: PropTypes.func,
  src: PropTypes.object,
};
