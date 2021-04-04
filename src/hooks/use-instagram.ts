import { useEffect, useState } from 'react';

type Post = {
  src: string;
  srcSet: Array<string>;
  url: string;
  caption: string;
  id: string;
};

type Posts = Array<Post>;

export function useInstagram(): Posts | [] {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    fetch('/.netlify/functions/instagram')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));
  }, []);
  return posts;
}
