const dotenv = require('dotenv');

dotenv.config({
  path: '.env',
});

// Declare variables so these values can be reused
const siteUrl = 'https://www.thatsferntastic.com.au';

// Check what node environment is running for Sanity plugin
const isProd = process.env.NODE_ENV === 'production';

const GET_ALL_PRODUCTS = `
  query GetAllProductsQuery {
    allShopifyProduct {
      nodes {
        objectID: shopifyId
        availableForSale
        createdAt
        description
        handle
        images {
          originalSrc
        }
        productType
        tags
        title
        vendor
      }
    }
  }
`;

const queries = [
  {
    query: GET_ALL_PRODUCTS,
    transformer: ({ data }) =>
      data.allShopifyProduct.nodes.map((node) => ({
        objectID: node.objectID,
        availableForSale: node.availableForSale,
        createdAt: node.createdAt,
        description: node.description,
        handle: node.handle,
        image: node.images?.[0],
        productType: node.productType,
        tags: node.tags,
        title: node.title,
        vendor: node.vendor,
      })),
    settings: {},
  },
];

module.exports = {
  siteMetadata: {
    siteUrl,
  },
  flags: {
    FAST_DEV: true,
    DEV_SSR: true,
    PARALLEL_SOURCING: true,
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl,
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'UA-186320316-1', // Google Analytics
          // 'G-2HDXX2NRGL', // GA-4
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Thats Ferntastic',
        short_name: '@ferntastic',
        start_url: '/',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            query: `
            {
              allShopifyProduct(sort: { fields: handle, order: ASC }) {
                nodes {
                  availableForSale
                  description
                  handle
                  updatedAt
                }
              }
            }
            `,
            serialize: ({ query: { allShopifyProduct } }) => {
              return allShopifyProduct.nodes
                .filter((node) => node.availableForSale)
                .map((node) => {
                  return {
                    description: node.description,
                    date: node.updatedAt,
                    url: `https://www.thatsferntastic.com.au/products/${node.handle}/`,
                    guid: node.handle,
                  };
                });
            },
            output: '/rss.xml',
            title: '@thatsferntastic products',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: 'src/images',
      },
    },
    {
      resolve: 'gatsby-source-shopify',
      options: {
        // The domain name of your Shopify shop. This is required.
        // Example: 'gatsby-source-shopify-test-shop' if your Shopify address is
        // 'gatsby-source-shopify-test-shop.myshopify.com'.
        // If you are running your shop on a custom domain, you need to use that
        // as the shop name, without a trailing slash, for example:
        // shopName: "gatsby-shop.com",
        shopName: process.env.GATSBY_SHOPIFY_SHOP_NAME,

        // An API access token to your Shopify shop. This is required.
        // You can generate an access token in the "Manage private apps" section
        // of your shop's Apps settings. In the Storefront API section, be sure
        // to select "Allow this app to access your storefront data using the
        // Storefront API".
        // See: https://help.shopify.com/api/custom-storefronts/storefront-api/getting-started#authentication
        accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,

        // Set the API version you want to use. For a list of available API versions,
        // see: https://help.shopify.com/en/api/storefront-api/reference/queryroot
        // Defaults to 2019-07
        apiVersion: '2020-10',

        // Set verbose to true to display a verbose output on `npm run develop`
        // or `npm run build`. This prints which nodes are being fetched and how
        // much time was required to fetch and process the data.
        // Defaults to true.
        verbose: true,

        // Number of records to fetch on each request when building the cache
        // at startup. If your application encounters timeout errors during
        // startup, try decreasing this number.
        paginationSize: 10, // List of collections you want to fetch.

        // Possible values are: 'shop' and 'content'.
        // Defaults to ['shop', 'content'].
        includeCollections: ['shop'],
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.GATSBY_SANITY_PROJECT_ID,
        dataset: process.env.GATSBY_SANITY_DATASET,

        // Set to `true` in order for drafts to replace their published version. By default, drafts will be skipped.
        overlayDrafts: !isProd,

        // Set to `true` to keep a listener open and update with the latest changes in realtime. If you add a `token` you will get all content updates down to each keypress.
        watchMode: !isProd,

        // Authentication token for fetching data from private datasets, or when using overlayDrafts
        token: process.env.SANITY_TOKEN,

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: 'default',
      },
    },
    {
      // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_API_KEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME, // for all queries
        queries,
        chunkSize: 10_000, // default: 1000
        settings: {},
        enablePartialUpdates: false,
      },
    },
  ],
};
