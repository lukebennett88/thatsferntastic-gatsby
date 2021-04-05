import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import * as React from 'react';
import { HiChevronLeft, HiChevronRight, HiTrash } from 'react-icons/hi';

import { LineItemsType } from '../../hooks/use-cart-items';
import { useRemoveItemFromCart } from '../../hooks/use-remove-item-from-cart';
import { useUpdateItemQuantity } from '../../hooks/use-update-item-quantity';
import { ShopifyImage } from '../../types/shopify-product';
import { formatMoney } from '../../utils/format-money';

type LineItemProps = {
  item: LineItemsType;
};

type ShopifyProductVariant = {
  shopifyId: string;
  image: ShopifyImage;
};

type AllShopifyProductVariant = {
  nodes: Array<ShopifyProductVariant>;
};

type AllShopifyProduct = {
  nodes: Array<{
    handle: string;
    variants: Array<{
      shopifyId: string;
    }>;
  }>;
};

type QueryReturnType = {
  allShopifyProductVariant: AllShopifyProductVariant;
  allShopifyProduct: AllShopifyProduct;
};

function LineItem({ item }: LineItemProps): React.ReactElement {
  const {
    allShopifyProductVariant: { nodes: variants },
    allShopifyProduct: { nodes: products },
  } = useStaticQuery<QueryReturnType>(graphql`
    {
      allShopifyProductVariant {
        nodes {
          shopifyId
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 630, layout: CONSTRAINED)
              }
            }
          }
        }
      }
      allShopifyProduct {
        nodes {
          handle
          variants {
            shopifyId
          }
        }
      }
    }
  `);

  const removeFromCart = useRemoveItemFromCart();
  const updateQuantity = useUpdateItemQuantity();

  const betterProductHandles = products.map((product) => {
    const newVariants = product.variants.map((variant) => variant.shopifyId);
    return {
      variants: newVariants,
      handle: product.handle,
    };
  });

  const getHandleForVariant = (variantId: string): string => {
    const selectedProduct = betterProductHandles.find((product) =>
      product.variants.includes(variantId)
    );

    return selectedProduct?.handle ? `/products/${selectedProduct.handle}` : '';
  };

  const getImageFluidForVariant = (
    variantId: string
  ): IGatsbyImageData | null => {
    const selectedVariant = variants.find(
      (variant) => variant.shopifyId === variantId
    );

    if (selectedVariant) {
      return selectedVariant.image.localFile.childImageSharp.gatsbyImageData;
    }
    return null;
  };

  const variantImage = getImageFluidForVariant(item.variant.id);

  const [quantity, setQuantity] = React.useState(item.quantity);

  const handleDecreaseQuantity = (): void => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncreaseQuantity = (): void => {
    setQuantity((prev) => prev + 1);
  };

  React.useEffect(() => {
    if (quantity <= 0) {
      removeFromCart(item.variant.id);
      return;
    }
    updateQuantity(item.variant.id, quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.variant.id, quantity]);

  return (
    <div className="flex w-full max-w-sm px-4 py-6 pt-4 mx-auto bg-white rounded-lg shadow lg:max-w-none lg:items-center lg:justify-between sm:max-w-none">
      <div className="flex flex-wrap w-full space-y-4 sm:space-y-0 sm:space-x-4 lg:items-center">
        <div className="w-full sm:w-36 lg:w-48">
          <div className="relative h-0 aspect-w-1 aspect-h-1">
            <div className="absolute inset-0 flex bg-white">
              {variantImage ? (
                <GatsbyImage
                  image={variantImage}
                  alt=""
                  className="flex-1 rounded-lg"
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <Link
            to={getHandleForVariant(item.variant.id)}
            className="text-lg font-medium transition duration-150 ease-in-out hover:text-gray-600"
          >
            {item.title}
          </Link>
          <dl className="mt-2 text-base text-gray-500">
            {item.variant.selectedOptions.map(
              ({ name, value }) =>
                name !== 'Title' && (
                  <div key={name}>
                    <dt className="inline font-medium text-gray-500">
                      {name}:{' '}
                    </dt>
                    <dd className="inline mt-1 text-gray-900 sm:mt-0 sm:col-span-2">
                      {value}
                    </dd>
                  </div>
                )
            )}
          </dl>
          <div className="flex items-end justify-between w-full pt-2 mt-auto">
            <div>
              <div className="font-medium text-gray-500">Quantity:</div>
              <div className="relative z-0 inline-flex mt-1 -space-x-px shadow-sm">
                <button
                  type="button"
                  onClick={handleDecreaseQuantity}
                  disabled={item.quantity < 1}
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10"
                >
                  <span className="sr-only">
                    {quantity <= 1 ? 'Remove from cart' : 'Decrease quantity'}
                  </span>
                  {quantity <= 1 ? (
                    <HiTrash className="w-5 h-5" aria-hidden />
                  ) : (
                    <HiChevronLeft className="w-5 h-5" aria-hidden />
                  )}
                </button>
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncreaseQuantity}
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10"
                >
                  <span className="sr-only">Increase quantity</span>
                  <HiChevronRight className="w-5 h-5" aria-hidden />
                </button>
              </div>
            </div>
            <div className="hidden lg:items-baseline lg:flex">
              <button
                onClick={() => removeFromCart(item.variant.id)}
                type="button"
                className="text-gray-800 underline transition duration-150 ease-in-out hover:text-gray-600"
              >
                Remove from cart
              </button>
              <div className="font-mono text-3xl text-pink-500 lg:ml-4">
                {formatMoney(Number(item.variant.priceV2.amount) * quantity)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

LineItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object,
};

export { LineItem };
