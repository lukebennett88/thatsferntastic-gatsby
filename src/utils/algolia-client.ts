import algoliasearch from 'algoliasearch/lite';

const algoliaClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID || '',
  process.env.GATSBY_ALGOLIA_SEARCH_API_KEY || ''
);

export { algoliaClient };
