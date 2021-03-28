const path = require('path');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  // Query our data sources
  const result = await graphql(`
    query {
      allShopifyProduct(sort: { fields: handle, order: ASC }) {
        nodes {
          handle
          id
        }
      }
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

  // Create pages for all Products
  result.data.allShopifyProduct.nodes.forEach((node) => {
    createPage({
      path: `/products/${node.handle}`,
      component: path.resolve(`./src/templates/product.jsx`),
      context: {
        productId: node.id,
      },
    });
  });

  // Create pages for all Collections
  result.data.allShopifyCollection.nodes.forEach((node) => {
    createPage({
      path: `/collections/${node.handle}`,
      component: path.resolve(`./src/templates/collection.jsx`),
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
      component: path.resolve('./src/templates/page.jsx'),
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
      component: path.resolve('./src/templates/post.jsx'),
      context: {
        slug,
      },
    });
  });
};
