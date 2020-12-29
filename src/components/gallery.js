import * as React from 'react';
import PropTypes from 'prop-types';

import { Thumbnail } from './thumbnail';

function Gallery({ images, setActiveImage }) {
  if (images.length > 1)
    return (
      <div className="flex flex-wrap justify-center space-x-8">
        {images.map((src, index) => (
          <Thumbnail
            key={index}
            src={src}
            onClick={() => setActiveImage(index)}
          />
        ))}
      </div>
    );
  return null;
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
  setActiveImage: PropTypes.func.isRequired,
};

export { Gallery };
