const dotenv = require('dotenv');

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

// Declare variables so these values can be reused
const siteUrl = 'https://www.thatsferntastic.com.au';

// Check what node environment is running for Sanity plugin
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  siteMetadata: {
    siteUrl,
  },
  flags: {
    DEV_SSR: true,
    FAST_DEV: true,
    FAST_REFRESH: true,
    LAZY_IMAGES: true,
    PARALLEL_SOURCING: false,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PRESERVE_WEBPACK_CACHE: true,
    QUERY_ON_DEMAND: true,
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-netlify',
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-0VBDVLMS88', // Google Analytics / GA
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
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: 'production',

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
      resolve: 'gatsby-theme-shopify-manager',
      options: {
        shopName: process.env.GATSBY_SHOPIFY_SHOP_NAME,
        accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
      },
    },
  ],
};
