import PropTypes from 'prop-types';
import * as React from 'react';

import { useInstagram, useLazyLoad } from '../../hooks';
import { InstagramPost } from './instagram-post';

export function InstagramWidget({ postsToShow = 6 }) {
  const posts = useInstagram();
  const { Spinner } = useLazyLoad();
  return (
    <div className="pb-20 mx-auto">
      <h2 className="text-center heading-1 sm:text-left">
        Recent Instagram Posts
      </h2>
      <div className="grid mt-6 gap-y-10 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.length
          ? posts
              .slice(0, postsToShow)
              .map((post) => <InstagramPost key={post.id} post={post} />)
          : Array(postsToShow)
              .fill('')
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full max-w-sm mx-auto rounded-lg shadow"
                >
                  <div className="relative w-full h-0 aspect-w-1 aspect-h-1">
                    <div className="absolute inset-0 overflow-hidden rounded">
                      <Spinner />
                    </div>
                  </div>
                </div>
              ))}
      </div>
    </div>
  );
}

InstagramWidget.propTypes = {
  postsToShow: PropTypes.number,
};
