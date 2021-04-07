import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';

import { Layout, SEO } from '../components';

function IndexPage(): React.ReactElement {
  return (
    <Layout>
      <SEO title="Handmade Pencil Cases, Pouches, Stationery, Accessories and More" />
      <div className="fixed inset-0">
        <div className="flex h-full">
          <StaticImage
            src="../images/thats-ferntastic-launch-teaser.jpg"
            alt="April 8th – 8pm, Website Launch"
            objectFit="contain"
            className="flex-1"
          />
        </div>
      </div>
    </Layout>
  );
}

export default IndexPage;
