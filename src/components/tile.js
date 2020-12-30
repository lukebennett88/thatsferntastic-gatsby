import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { useGraphQL } from '../hooks';
import { Spinner } from './spinner';

export function Tile({ title, slug, price, image }) {
  const { placeholderImage } = useGraphQL();

  const imageSrc = image
    ? image.localFile.childImageSharp.gatsbyImageData
    : placeholderImage.localFile.childImageSharp.gatsbyImageData;

  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <Link
      aria-label={title}
      to={`/products/${slug}/`}
      className="flex w-full max-w-sm mx-auto transition duration-500 ease-in-out transform rounded-lg hover:-translate-y-1 focus:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative flex flex-1 w-full">
        <article className="flex flex-col w-full pb-3 bg-white rounded-lg shadow">
          <div className="relative h-0 rounded-t-md aspect-w-1 aspect-h-1">
            <div className="absolute inset-0 flex">
              <GatsbyImage
                onLoad={() => setIsLoading(false)}
                image={imageSrc}
                alt=""
                className="flex-1 rounded-t-lg"
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur">
                  <Spinner />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center flex-1 px-6 py-3 overflow-hidden">
            <h3 title={title} className="mt-2 clamp-2">
              {title}
            </h3>
            <p className="pt-3 mt-auto font-mono text-3xl leading-none text-pink-500">
              ${price.toFixed(2)}
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
