import { useEffect, useState } from 'react';

type InstagramPostType = {
  src: string;
  srcSet: Array<string>;
  url: string;
  caption: string;
  id: string;
};

type InstagramPostsType = Array<InstagramPostType>;

function useInstagram(): InstagramPostsType | [] {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('/.netlify/functions/instagram')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));
  }, []);
  return posts;
}

export { useInstagram };
export type { InstagramPostsType, InstagramPostType };
