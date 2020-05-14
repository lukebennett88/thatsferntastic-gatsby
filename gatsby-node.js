const path = require('path');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const products = await graphql(`
    query {
      allShopifyProduct(sort: { fields: handle, order: DESC }) {
        nodes {
          handle
          id
        }
      }
    }
  `);

  products.data.allShopifyProduct.nodes.forEach((node) => {
    createPage({
      path: `/products/${node.handle}`,
      component: path.resolve(`./src/templates/product.js`),
      context: {
        productId: node.id,
      },
    });
  });

  const collections = await graphql(`
    query {
      allShopifyCollection(sort: { fields: handle, order: DESC }) {
        nodes {
          handle
          id
        }
      }
    }
  `);

  collections.data.allShopifyCollection.nodes.forEach((node) => {
    createPage({
      path: `/collections/${node.handle}`,
      component: path.resolve(`./src/templates/collection.js`),
      context: {
        productId: node.id,
      },
    });
  });
};
