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
    <article
      ref={ref}
      className="max-w-sm mx-auto transition duration-500 ease-in-out transform rounded-lg shadow-2xl hover:-translate-y-1"
    >
      <Link
        to={`/products/${slug}`}
        className="flex flex-col pb-3 bg-white rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue"
      >
        <div className="relative overflow-hidden rounded-t-md">
          <img
            ref={imgRef}
            onLoad={handleImgLoaded}
            data-src={imageSrc}
            alt=""
            className="object-contain w-full h-full"
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
      </Link>
    </article>
  );
}

Tile.propTypes = {
  image: PropTypes.object,
  price: PropTypes.number,
  slug: PropTypes.string,
  title: PropTypes.string,
};
