import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';

import { Spinner } from '../spinner';

export const Thumbnail = ({ src, onClick }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  return (
    <div className="flex-shrink-0 w-2/5 p-1 pl-4">
      <div className="relative h-0 aspect-w-1 aspect-h-1">
        <button
          onClick={onClick}
          type="button"
          className="absolute inset-0 flex overflow-hidden rounded-lg"
        >
          <GatsbyImage
            onLoad={() => setIsLoading(false)}
            image={src.localFile.childImageSharp.gatsbyImageData}
            alt=""
            className="flex-1"
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur">
              <Spinner />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

Thumbnail.propTypes = {
  onClick: PropTypes.func,
  src: PropTypes.object,
};
