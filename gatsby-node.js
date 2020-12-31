const path = require('path');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  // Query our data sources
  const result = await graphql(`
    query {
      allShopifyProduct(sort: { fields: handle, order: DESC }) {
        nodes {
          handle
          id
        }
      }
      allShopifyCollection(sort: { fields: handle, order: DESC }) {
        nodes {
          handle
          id
        }
      }
      allSanityPage {
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
      component: path.resolve(`./src/templates/product.js`),
      context: {
        productId: node.id,
      },
    });
  });

  // Create pages for all Collections
  result.data.allShopifyCollection.nodes.forEach((node) => {
    createPage({
      path: `/collections/${node.handle}`,
      component: path.resolve(`./src/templates/collection.js`),
      context: {
        productId: node.id,
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
};
