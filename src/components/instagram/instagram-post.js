import { OutboundLink } from 'gatsby-plugin-google-gtag';
import * as React from 'react';
import { HiExternalLink } from 'react-icons/hi';

import { useLazyLoad } from '../../hooks';

function InstagramPost({ post }) {
  const { ref, imgRef, isImgLoaded, handleImgLoaded, Spinner } = useLazyLoad();
  return (
    <OutboundLink
      ref={ref}
      aria-label="View post on Instagram"
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full max-w-sm mx-auto transition duration-500 ease-in-out transform rounded-lg hover:-translate-y-1 focus:-translate-y-1 hover:shadow-lg group"
    >
      <div className="relative w-full h-0 aspect-w-2 aspect-h-3">
        <article className="absolute inset-0 flex flex-col pb-3 bg-white rounded-lg shadow">
          <div className="relative h-0 rounded-t-md aspect-w-1 aspect-h-1">
            <img
              ref={imgRef}
              onLoad={handleImgLoaded}
              data-src={post.src}
              srcSet={post.srcSet}
              alt={post.caption}
              className="absolute inset-0 object-contain w-full h-full overflow-hidden rounded-t-lg"
            />
            <div className="absolute inset-0 text-white transition duration-300 ease-in-out bg-black bg-opacity-75 rounded-t-lg opacity-0 group-hover:opacity-100">
              <HiExternalLink
                aria-hidden
                className="absolute w-5 h-5 top-3 right-3"
              />

              <div className="absolute inset-0 flex items-center justify-center flex-1">
                Click to open in a new tab
              </div>
            </div>
            {!isImgLoaded && <Spinner />}
          </div>
          <div className="flex items-center flex-1 px-6 py-3 overflow-hidden">
            <p title={post.caption} className="mt-2 clamp-3">
              {post.caption}
            </p>
          </div>
        </article>
      </div>
    </OutboundLink>
  );
}

export { InstagramPost };
