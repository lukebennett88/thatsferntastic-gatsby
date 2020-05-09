import React from 'react';
import { Layout, SEO, Tile } from '../components';

import { useGraphQL } from '../hooks';

const IndexPage = () => {
  const {
    allShopifyProduct: { nodes: products },
  } = useGraphQL();

  return (
    <Layout hasHero>
      <SEO title="Home" />
      <div className="relative grid max-w-lg gap-5 pt-16 pb-20 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none lg:pt-24 lg:pb-28">
        {products.map((product) => (
          <Tile
            key={product.handle}
            slug={product.handle}
            title={product.title}
            price={Number(product.priceRange.minVariantPrice.amount)}
            image={product.images[0].localFile.childImageSharp.fluid}
          />
        ))}
      </div>
    </Layout>
  );
};

export default IndexPage;
