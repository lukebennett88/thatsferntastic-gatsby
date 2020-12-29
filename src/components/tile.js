import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { useGraphQL, useLazyLoad } from '../hooks';
import { resizeShopifyImage } from '../utils';

export function Tile({ title, slug, price, image }) {
  const { placeholderImage } = useGraphQL();

  const imageSrc = image
    ? image.originalSrc &&
      resizeShopifyImage({ url: image.originalSrc, width: 384 })
    : placeholderImage.publicURL;

  const { ref, imgRef, isImgLoaded, handleImgLoaded, Spinner } = useLazyLoad();

  return (
    <Link
      to={`/products/${slug}`}
      ref={ref}
      className="w-full max-w-sm mx-auto transition duration-500 ease-in-out transform rounded-lg hover:-translate-y-1 focus:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative w-full h-0 aspect-w-2 aspect-h-3">
        <article className="absolute inset-0 flex flex-col pb-3 bg-white rounded-lg shadow">
          {/* Image */}
          <div className="relative h-0 rounded-t-md aspect-w-1 aspect-h-1">
            <img
              ref={imgRef}
              onLoad={handleImgLoaded}
              data-src={imageSrc}
              alt=""
              className="absolute inset-0 object-contain w-full h-full overflow-hidden rounded-t-lg"
            />
            {!isImgLoaded && <Spinner />}
          </div>
          {/* Copy */}
          <div className="flex flex-col justify-center flex-1 px-6 py-3 overflow-hidden">
            <h3 title={title} className="mt-2 clamp-1">
              {title}
            </h3>
            <p className="mt-3 text-base leading-6 text-gray-500">
              <span className="font-bold text-gray-800">
                ${price.toFixed(2)}
              </span>
            </p>
          </div>
        </article>
      </div>
    </Link>
  );
}

Tile.propTypes = {
  image: PropTypes.object,
  price: PropTypes.number,
  slug: PropTypes.string,
  title: PropTypes.string,
};

// 266 / 390
