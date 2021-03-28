import PropTypes from 'prop-types';
import * as React from 'react';

import { Thumbnail } from './thumbnail';

function Gallery({ images, setActiveImage }) {
  if (images.length > 1)
    return (
      <div className="overflow-hidden">
        <div className="flex -mr-4 overflow-x-auto">
          {images.map((src, index) => (
            <Thumbnail
              // eslint-disable-next-line react/no-array-index-key
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
  // eslint-disable-next-line react/forbid-prop-types
  images: PropTypes.array.isRequired,
  setActiveImage: PropTypes.func.isRequired,
};

export { Gallery };
