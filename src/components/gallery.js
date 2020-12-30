import * as React from 'react';
import PropTypes from 'prop-types';

import { Thumbnail } from './thumbnail';

function Gallery({ images, setActiveImage }) {
  if (images.length > 1)
    return (
      <div className="-ml-4 overflow-hidden">
        <div className="flex overflow-x-auto">
          {images.map((src, index) => (
            <Thumbnail
              key={index}
              src={src}
              onClick={() => setActiveImage(index)}
            />
          ))}
        </div>
      </div>
    );
  return null;
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
  setActiveImage: PropTypes.func.isRequired,
};

export { Gallery };
