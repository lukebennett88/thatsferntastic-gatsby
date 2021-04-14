import * as React from 'react';
import { useInView } from 'react-intersection-observer';

import { useFetchInstagramPosts } from '../../hooks/use-instagram';
import { Spinner } from '../spinner';
import { InstagramPost } from './instagram-post';

const POSTS_TO_SHOW = 6;

type PostProps = { postsToShow?: number };

function InstagramWidget({
  postsToShow = POSTS_TO_SHOW,
}: PostProps): React.ReactElement {
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

function Posts({ postsToShow = POSTS_TO_SHOW }: PostProps): React.ReactElement {
  const posts = useFetchInstagramPosts(6, '873517535');
  return (
    <div className="grid mt-6 gap-y-10 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
      {posts.length > 0
        ? posts
            .slice(0, postsToShow)
            .map((post) => <InstagramPost key={post.id} post={post} />)
        : new Array(postsToShow).fill('').map((_, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
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

export { InstagramWidget };
