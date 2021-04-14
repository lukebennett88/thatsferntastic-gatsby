import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';

import { ShopifyImage } from '../../types/shopify-product';

type ThumbnailProps = {
  src: ShopifyImage;
  onClick: () => void;
};

function Thumbnail({ src, onClick }: ThumbnailProps): React.ReactElement {
  return (
    <div className="flex-shrink-0 w-2/5 p-1 pr-4">
      <div className="relative h-0 aspect-w-1 aspect-h-1">
        {src?.localFile?.childImageSharp?.gatsbyImageData ? (
          <button
            onClick={onClick}
            type="button"
            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-white rounded-lg"
          >
            <GatsbyImage
              image={src.localFile.childImageSharp.gatsbyImageData}
              alt=""
              className="flex-1"
            />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export { Thumbnail };
