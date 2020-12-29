import * as React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import {
  useRemoveItemFromCart,
  useUpdateItemQuantity,
} from 'gatsby-theme-shopify-manager';
import { HiChevronLeft, HiChevronRight, HiTrash } from 'react-icons/hi';
import PropTypes from 'prop-types';

import { Spinner } from '../spinner';

function LineItem({ item }) {
  const {
    allShopifyProductVariant: { nodes: variants },
    allShopifyProduct: { nodes: products },
  } = useStaticQuery(graphql`
    query {
      allShopifyProductVariant {
        nodes {
          shopifyId
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 120) {
                  ...GatsbyImageSharpFluid_withWebp
                }
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

  function getHandleForVariant(variantId) {
    const selectedProduct = betterProductHandles.find((product) => {
      return product.variants.includes(variantId);
    });

    return selectedProduct ? selectedProduct.handle : null;
  }

  function getImageFluidForVariant(variantId) {
    const selectedVariant = variants.find((variant) => {
      return variant.shopifyId === variantId;
    });

    if (selectedVariant) {
      return selectedVariant.image.localFile.childImageSharp.fluid;
    }
    return null;
  }

  const [quantity, setQuantity] = React.useState(item.quantity);

  function handleDecreaseQuantity() {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  }

  function handleIncreaseQuantity() {
    setQuantity((prev) => prev + 1);
  }

  React.useEffect(() => {
    if (quantity <= 0) {
      removeFromCart(item.variant.id);
      return;
    }
    updateQuantity(item.variant.id, quantity);
  }, [item.variant.id, quantity, removeFromCart, updateQuantity]);

  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="md:flex md:items-center">
        <div className="flex-shrink-0 rounded-lg shadow md:w-48">
          <div className="relative aspect-w-1 aspect-h-1">
            <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-gray-50">
              <GatsbyImage
                fluid={getImageFluidForVariant(item.variant.id)}
                onLoad={() => setIsLoaded(true)}
              />
              {!isLoaded && <Spinner />}
            </div>
          </div>
        </div>
        <div className="mt-4 md:ml-4">
          <Link
            to={`/products/${getHandleForVariant(item.variant.id)}`}
            className="text-lg font-medium leading-6 text-gray-900 underline transition duration-150 ease-in-out hover:text-gray-600"
          >
            {item.title}
          </Link>
          <dl className="mt-2 text-base leading-6 text-gray-500">
            {item.variant.selectedOptions.map(({ name, value }) => (
              <div key={name}>
                <dt className="inline font-medium text-gray-500">{name}: </dt>
                <dd className="inline mt-1 text-gray-900 sm:mt-0 sm:col-span-2">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-2">
            <div>Quantity</div>
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
        </div>
      </div>
      <div className="hidden md:items-baseline md:flex">
        <button
          onClick={() => removeFromCart(item.variant.id)}
          type="button"
          className="text-gray-800 underline transition duration-150 ease-in-out hover:text-gray-600"
        >
          Remove from cart
        </button>
        <div className="font-mono text-3xl font-bold text-gray-900 md:ml-4">
          ${Number(item.variant.priceV2.amount * quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

LineItem.propTypes = {
  item: PropTypes.object,
};

export { LineItem };
