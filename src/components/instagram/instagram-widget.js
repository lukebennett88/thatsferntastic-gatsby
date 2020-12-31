import * as React from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';

import { useInstagram } from '../../hooks';
import { Spinner } from '../spinner';
import { InstagramPost } from './instagram-post';

function InstagramWidget({ postsToShow = 6 }) {
  const [ref, inView] = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });
  return (
    <article ref={ref} className="pb-20">
      <h2 className="text-center heading-1 sm:text-left">
        Recent Instagram Posts
      </h2>
      {inView && <Posts postsToShow={postsToShow} />}
    </article>
  );
}

InstagramWidget.propTypes = {
  postsToShow: PropTypes.number,
};

function Posts({ postsToShow }) {
  const posts = useInstagram();
  return (
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
                className="w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow"
              >
                <div className="relative w-full h-0 bg-white aspect-w-1 aspect-h-1">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner />
                  </div>
                </div>
              </div>
            ))}
    </div>
  );
}

Posts.propTypes = {
  postsToShow: PropTypes.number.isRequired,
};

export { InstagramWidget };
