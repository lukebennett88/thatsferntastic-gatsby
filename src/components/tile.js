import React from 'react';
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
      className="max-w-sm mx-auto transition duration-500 ease-in-out transform rounded-lg hover:-translate-y-1 focus:-translate-y-1 focus:outline-none focus:shadow-outline-blue hover:shadow-lg"
    >
      <article className="flex flex-col pb-3 bg-white rounded-lg shadow">
        <div className="relative h-0 rounded-t-md aspect-ratio-square bg-teal-50">
          <img
            ref={imgRef}
            onLoad={handleImgLoaded}
            data-src={imageSrc}
            alt=""
            className="absolute inset-0 object-cover w-full h-full overflow-hidden rounded-t-lg"
          />
          {!isImgLoaded && <Spinner />}
        </div>
        <div className="p-6">
          <h3 title={title} className="mt-2 line-clamp-1">
            {title}
          </h3>
          <p className="mt-3 text-base leading-6 text-gray-500">
            <span className="font-bold text-gray-800">${price.toFixed(2)}</span>
          </p>
        </div>
      </article>
    </Link>
  );
}

Tile.propTypes = {
  image: PropTypes.object,
  price: PropTypes.number,
  slug: PropTypes.string,
  title: PropTypes.string,
};
