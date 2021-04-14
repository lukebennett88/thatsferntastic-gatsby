/* eslint-disable camelcase */
const fetch = require('node-fetch');

const cache = {
  lastFetch: 0,
  posts: [],
};

function formatData(response) {
  return response.data.user.edge_owner_to_timeline_media.edges.map(
    ({ node }) => {
      const { id, edge_media_to_comment, edge_media_preview_like, edge_media_to_caption, thumbnail_resources, shortcode } = node;
      const { count: comments } = edge_media_to_comment;
      const { count: likes } = edge_media_preview_like;
      const { text: caption } = edge_media_to_caption.edges[0].node;
      const thumbnail = thumbnail_resources.find(
        (t) => t.config_width === 640
      );
      const { src, config_width: width, config_height: height } = thumbnail;
      const url = `https://www.instagram.com/p/${shortcode}`;
      return {
        id,
        caption,
        src,
        width,
        height,
        url,
        comments,
        likes,
      };
    }
  );
}

async function fetchInstagramPosts(photoCount, instagramId) {
  const endpoint = `https://www.instagram.com/graphql/query/?query_hash=42d2750e44dbac713ff30130659cd891&variables={"id":${instagramId || '873517535'},"first":${photoCount || 6}}`;

  // first see if we have a cache in 30 mins
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 1800000) {
    return cache.posts;
  }
  try {
    const data = await fetch(endpoint).then((res) => res.json());
    const posts = formatData(data);
    cache.lastFetch = Date.now();
    cache.posts = posts;
    return posts;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return [];
  }
}

exports.handler = async (event) => {
  const {photoCount, instagramId} = JSON.parse(event.body);
  const posts = await fetchInstagramPosts(photoCount, instagramId);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(posts),
  };
};
