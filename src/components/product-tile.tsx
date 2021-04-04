import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { useOGImage } from '../hooks/use-og-image';

import {} from '../utils/';
import { formatMoney } from '../utils/format-money';

function ProductTile({ product }): React.ReactElement {
  const ogImage = useOGImage();

  const imageSrc = product.images
    ? product.images[0].localFile.childImageSharp?.gatsbyImageData
    : ogImage.childImageSharp.gatsbyImageData;

  const soldOut = !product.availableForSale;

  const maxPrice = Number(product.priceRange.maxVariantPrice.amount);
  const minPrice = Number(product.priceRange.minVariantPrice?.amount);

  const price =
    maxPrice - minPrice === 0
      ? `${formatMoney(minPrice)}`
      : `from $${formatMoney(minPrice)}`;

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

export { ProductTile };
