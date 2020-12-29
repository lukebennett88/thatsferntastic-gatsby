import * as React from 'react';
import PropTypes from 'prop-types';

import { useLazyLoad } from '../../hooks';

export function InstagramPost({ post }) {
  const { ref, imgRef, isImgLoaded, handleImgLoaded, Spinner } = useLazyLoad();
  return (
    <a
      ref={ref}
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full max-w-sm mx-auto transition duration-500 ease-in-out transform rounded-lg hover:-translate-y-1 focus:-translate-y-1 hover:shadow-lg group"
    >
      <div className="relative w-full h-0 aspect-w-2 aspect-h-3">
        <article className="absolute inset-0 flex flex-col pb-3 bg-white rounded-lg shadow">
          {/* Image */}
          <div className="relative h-0 rounded-t-md aspect-w-1 aspect-h-1">
            <img
              ref={imgRef}
              onLoad={handleImgLoaded}
              data-src={post.src}
              srcSet={post.srcSet.toString()}
              alt={post.caption}
              className="absolute inset-0 object-contain w-full h-full overflow-hidden rounded-t-lg"
            />
            <div className="absolute w-full h-0 overflow-hidden text-white transition duration-300 ease-in-out bg-black bg-opacity-75 rounded-t-lg opacity-0 aspect-w-1 aspect-h-1 group-hover:opacity-100">
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="absolute w-5 h-5 top-3 right-3"
              >
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-1">
                Click to open in a new tab
              </div>
            </div>
            {!isImgLoaded && <Spinner />}
          </div>
          {/* Copy */}
          <div className="flex items-center flex-1 px-6 py-3 overflow-hidden">
            <p title={post.caption} className="mt-2 clamp-3">
              {post.caption}
            </p>
          </div>
        </article>
      </div>
    </a>
  );
}

InstagramPost.propTypes = {
  post: PropTypes.shape({
    caption: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired,
  }),
};
