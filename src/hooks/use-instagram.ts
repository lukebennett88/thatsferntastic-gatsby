import { useEffect, useState } from 'react';

type Post = {
  id: string;
  caption: string;
  src: string;
  width: number;
  height: number;
  url: string;
  comments: number | undefined;
  likes: number;
};

type Posts = Array<Post>;

function useFetchInstagramPosts(
  photoCount: number,
  instagramId: string
): Posts {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchInstagramPosts() {
      try {
        const res = await fetch('/.netlify/functions/instagram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ photoCount, instagramId }),
        });
        const data = await res.json();

        setPosts(await data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        setPosts([]);
      }
    }
    fetchInstagramPosts();
  }, [instagramId, photoCount]);
  return posts;
}

export { useFetchInstagramPosts };
export type { Post, Posts };
