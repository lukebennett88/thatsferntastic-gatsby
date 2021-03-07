import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';

import { useGraphQL } from '../hooks';
import { formatPrice } from '../utils/format-price';

function ProductTile({ product }) {
  const { featuredImage, priceRangeV2, slug, title, variants } = product;

  const { ogImage } = useGraphQL();

  const imageSrc = featuredImage
    ? featuredImage.localFile.childImageSharp.gatsbyImageData
    : ogImage.childImageSharp.gatsbyImageData;

  const available = variants.some(({ availableForSale }) => availableForSale);

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    priceRangeV2.minVariantPrice.amount
  );

  return (
    <Link
      aria-label={`View ${title} product page`}
      to={slug}
      className="flex w-full max-w-sm mx-auto transition duration-500 ease-in-out rounded-lg transform-gpu hover:-translate-y-1 focus:-translate-y-1 hover:shadow-lg"
    >
      <div
        className={`relative flex flex-1 w-full ${
          available ? '' : 'opacity-50'
        }`}
      >
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
            <h3 title={title} className="mt-2 clamp-2">
              {title}
            </h3>
            <p className="pt-3 mt-auto font-mono text-3xl leading-none text-pink-500">
              {available ? price : 'Sold out!'}
            </p>
          </div>
        </article>
      </div>
    </Link>
  );
}

export { ProductTile };
