import * as React from 'react';
import { useInView } from 'react-intersection-observer';

import { Layout, ProductTile, SEO, Spinner } from '../components';
import { useAllShopifyProducts } from '../hooks/use-all-shopify-products';
import { useSanitySiteSettings } from '../hooks/use-sanity-site-settings';

function ProductsPage(): React.ReactElement {
  return (
    <Layout>
      <SEO title="Handmade Pencil Cases, Pouches, Stationery, Accessories and More" />
      <AllProducts />
    </Layout>
  );
}

function AllProducts(): React.ReactElement {
  const { nodes: products } = useAllShopifyProducts();
  const sanitySiteSettings = useSanitySiteSettings();

  // Set up infinite scroll
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const INCREMENTOR = 18;
  const [itemsToShow, setItemsToShow] = React.useState(INCREMENTOR);

  React.useEffect(() => {
    if (inView) {
      setItemsToShow((prev) => prev + INCREMENTOR);
    }
  }, [inView]);

  return (
    <article>
      <h1 className="sr-only">{sanitySiteSettings.title}</h1>
      <h2 className="text-center heading-1 sm:text-left">All Products</h2>
      <div className="relative grid pb-20 mx-auto mt-6 gap-y-10 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, itemsToShow).map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>
      {itemsToShow < products.length && (
        <div
          ref={ref}
          className="relative flex items-center justify-center h-24 px-4 mb-20 sm:px-6 lg:px-8"
        >
          <Spinner />
        </div>
      )}
    </article>
  );
}

export default ProductsPage;
