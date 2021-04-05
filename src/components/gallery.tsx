import * as React from 'react';

import { ShopifyImage } from '../types/shopify-product';
import { Thumbnail } from './thumbnail';

type GalleryProps = {
  images: Array<ShopifyImage>;
  setActiveImage: React.Dispatch<React.SetStateAction<number>>;
};

function Gallery({
  images,
  setActiveImage,
}: GalleryProps): React.ReactElement | null {
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

export { Gallery };
