const fetch = require('node-fetch');

const url = `https://www.instagram.com/graphql/query/?query_hash=44efc15d3c13342d02df0b5a9fa3d33f&variables={"id":"873517535","first":12}`;

const cache = {
  lastFetch: 0,
  posts: [],
};

function formatData(response) {
  return response.data.user.edge_owner_to_timeline_media.edges.map((edge) => ({
    src: edge.node.thumbnail_src,
    srcSet: edge.node.thumbnail_resources.map((img) => ({
      src: img.src,
      width: img.config_width,
    })),
    url: `https://instagram.com/p/${edge.node.shortcode}`,
    caption: edge.node.edge_media_to_caption.edges[0]
      ? edge.node.edge_media_to_caption.edges[0].node.text
      : '',
    id: edge.node.id,
  }));
}

async function getPosts() {
  // first see if we have a cache in 30 mins
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 1800000) {
    return cache.posts;
  }
  const data = await fetch(url).then((res) => res.json());
  const posts = formatData(data);
  cache.lastFetch = Date.now();
  cache.posts = posts;
  return posts;
}

exports.handler = async function (_event, _context, callback) {
  const posts = await getPosts();
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(posts),
  });
};
