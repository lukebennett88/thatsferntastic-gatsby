import * as React from 'react';
import PropTypes from 'prop-types';

import { Thumbnail } from './thumbnail';

function Gallery({ images, setActiveImage }) {
  if (images.length > 1)
    return (
      <div className="overflow-hidden">
        <div className="grid grid-flow-col p-1 overflow-x-auto gap-x-4 gallery">
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
