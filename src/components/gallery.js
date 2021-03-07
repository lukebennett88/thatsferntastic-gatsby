import * as React from 'react';

import { Thumbnail } from './thumbnail';

function Gallery({ images, setActiveImage }) {
  return (
    <div className="overflow-hidden">
      <div className="flex -mr-4 overflow-x-auto">
        {images.map((src, index) => (
          <Thumbnail
            key={src}
            src={src}
            onClick={() => setActiveImage(index)}
          />
        ))}
      </div>
    </div>
  );
}

export { Gallery };
