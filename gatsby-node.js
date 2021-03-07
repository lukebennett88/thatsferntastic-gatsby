const path = require('path');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  // Query our data sources
  const result = await graphql(`
    query {
      allShopifyCollection(sort: { fields: handle, order: ASC }) {
        nodes {
          handle
        }
      }
      allSanityPage {
        nodes {
          slug {
            current
          }
        }
      }
      allSanityBlogPost(sort: { fields: _updatedAt, order: ASC }) {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  // Create pages for all Collections
  result.data.allShopifyCollection.nodes.forEach((node) => {
    createPage({
      path: `/collections/${node.handle}`,
      component: path.resolve(`./src/templates/collection.js`),
      context: {
        handle: node.handle,
      },
    });
  });

  // Create pages from Sanity
  result.data.allSanityPage.nodes.forEach((page) => {
    const {
      slug: { current: slug },
    } = page;
    createPage({
      path: slug,
      component: path.resolve('./src/templates/page.js'),
      context: {
        slug,
      },
    });
  });

  // Create blog posts from Sanity
  result.data.allSanityBlogPost.nodes.forEach((page) => {
    const {
      slug: { current: slug },
    } = page;
    createPage({
      path: slug,
      component: path.resolve('./src/templates/post.js'),
      context: {
        slug,
      },
    });
  });
};
