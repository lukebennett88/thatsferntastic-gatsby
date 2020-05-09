const dotenv = require('dotenv');
const postCssImport = require('postcss-import');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const resolveConfig = require('tailwindcss/resolveConfig');

const tailwindConfig = require('./tailwind.config.js');

const fullConfig = resolveConfig(tailwindConfig);

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Gatsby Shopify Starter',
    description:
      'Kick off your next, eCommerce experience with this Gatsby starter.',
    author: '@luke_bennett_',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: 'src/images',
      },
    },
    {
      // This plugin lets me access environment variables that
      // aren't prefixed with Gatsby. This allows me to use
      // Shopify-related variables in the context setup script.
      resolve: 'gatsby-plugin-env-variables',
      options: {
        whitelist: ['SHOP_NAME', 'SHOPIFY_ACCESS_TOKEN'],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Gatsby Shopify Starter',
        short_name: 'Shopify Starter',
        start_url: '/',
        background_color: fullConfig.theme.colors.indigo['600'],
        theme_color: fullConfig.theme.colors.indigo['600'],
        display: 'minimal-ui',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          postCssImport,
          tailwindcss('./tailwind.config.js'),
          autoprefixer,
          ...(process.env.NODE_ENV === 'production' ? [cssnano] : []),
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
        purgeOnly: ['src/css/tailwind.css'],
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
        shopName: process.env.SHOP_NAME,

        // An API access token to your Shopify shop. This is required.
        // You can generate an access token in the "Manage private apps" section
        // of your shop's Apps settings. In the Storefront API section, be sure
        // to select "Allow this app to access your storefront data using the
        // Storefront API".
        // See: https://help.shopify.com/api/custom-storefronts/storefront-api/getting-started#authentication
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,

        // Number of records to fetch on each request when building the cache
        // at startup. If your application encounters timeout errors during
        // startup, try decreasing this number.
        paginationSize: 250,

        // List of collections you want to fetch.
        // Possible values are: 'shop' and 'content'.
        // Defaults to ['shop', 'content'].
        includeCollections: ['shop'],
      },
    },
  ],
};
