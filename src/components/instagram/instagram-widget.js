import PropTypes from 'prop-types';
import * as React from 'react';

import { useInstagram, useLazyLoad } from '../../hooks';
import { InstagramPost } from './instagram-post';

export function InstagramWidget({ postsToShow = 6 }) {
  const posts = useInstagram();
  const { Spinner } = useLazyLoad();
  return (
    <div className="max-w-lg pb-20 mx-auto lg:max-w-none">
      <h2 className="heading-1">Recent Instagram Posts</h2>
      <div className="grid mt-6 gap-y-10 gap-x-12 lg:grid-cols-3">
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
