import { useEffect, useState } from 'react';

export function useInstagram() {
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
