import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import * as React from 'react';

import { useGraphQL } from '../hooks';

function ProductTile({ product }) {
  const { ogImage } = useGraphQL();

  const imageSrc = product.images
    ? product.images[0].localFile.childImageSharp?.gatsbyImageData
    : ogImage.childImageSharp.gatsbyImageData;

  const soldOut = !product.availableForSale;

  const maxPrice = Number(product.priceRange.maxVariantPrice.amount).toFixed(2);
  const minPrice = Number(product.priceRange.minVariantPrice?.amount).toFixed(
    2
  );

  const price =
    maxPrice - minPrice === 0 ? `$${minPrice}` : `from $${minPrice}`;

  return (
    <Link
      aria-label={product.title}
      to={`/products/${product.handle}/`}
      className={`flex w-full max-w-sm mx-auto transition duration-500 ease-in-out transform rounded-lg hover:-translate-y-1 focus:-translate-y-1 hover:shadow-lg ${
        soldOut ? 'opacity-50' : ''
      }`}
    >
      <div className="relative flex flex-1 w-full">
        <article className="flex flex-col w-full pb-3 bg-white rounded-lg shadow">
          <div className="relative h-0 rounded-t-md aspect-w-1 aspect-h-1">
            <div className="absolute inset-0 flex">
              <GatsbyImage
                image={imageSrc}
                alt=""
                className="flex-1 rounded-t-lg"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center flex-1 px-6 py-3 overflow-hidden">
            <h3 title={product.title} className="mt-2 clamp-2">
              {product.title}
            </h3>
            <p className="pt-3 mt-auto font-mono text-3xl leading-none text-pink-500">
              {soldOut ? 'Sold out!' : price}
            </p>
          </div>
        </article>
      </div>
    </Link>
  );
}

ProductTile.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.object,
};

export { ProductTile };
