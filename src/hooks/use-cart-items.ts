import { useShopifyContext } from '../context/shopify';

export function useCartItems(): Array<LineItemsType> | [] {
  const { cart }: { cart: CartType } = useShopifyContext();
  if (cart == null || cart.lineItems == null) {
    return [];
  }

  return cart.lineItems;
}

type CartType = {
  id: string;
  ready: boolean;
  requiresShipping: boolean;
  note: null;
  paymentDue: string;
  paymentDueV2: {
    amount: string;
    currencyCode: string;
    type: {
      name: string;
      kind: string;
      fieldBaseTypes: {
        amount: string;
        currencyCode: string;
      };
      implementsNode: boolean;
    };
  };
  webUrl: string;
  orderStatusUrl: null;
  taxExempt: boolean;
  taxesIncluded: boolean;
  currencyCode: string;
  totalTax: string;
  totalTaxV2: {
    amount: string;
    currencyCode: string;
    type: {
      name: string;
      kind: string;
      fieldBaseTypes: {
        amount: string;
        currencyCode: string;
      };
      implementsNode: boolean;
    };
  };
  lineItemsSubtotalPrice: {
    amount: string;
    currencyCode: string;
    type: {
      name: string;
      kind: string;
      fieldBaseTypes: {
        amount: string;
        currencyCode: string;
      };
      implementsNode: boolean;
    };
  };
  subtotalPrice: string;
  subtotalPriceV2: {
    amount: string;
    currencyCode: string;
    type: {
      name: string;
      kind: string;
      fieldBaseTypes: {
        amount: string;
        currencyCode: string;
      };
      implementsNode: boolean;
    };
  };
  totalPrice: string;
  totalPriceV2: {
    amount: string;
    currencyCode: string;
    type: {
      name: string;
      kind: string;
      fieldBaseTypes: {
        amount: string;
        currencyCode: string;
      };
      implementsNode: boolean;
    };
  };
  completedAt: null;
  createdAt: string;
  updatedAt: string;
  email: null;
  discountApplications: [];
  appliedGiftCards: [];
  shippingAddress: null;
  shippingLine: null;
  customAttributes: [];
  order: null;
  lineItems: Array<LineItemsType>;
  userErrors: [];
};

type LineItemsType = {
  id: string;
  title: string;
  variant: {
    id: string;
    title: string;
    price: string;
    priceV2: {
      amount: string;
      currencyCode: string;
      type: {
        name: string;
        kind: string;
        fieldBaseTypes: {
          amount: string;
          currencyCode: string;
        };
        implementsNode: boolean;
      };
    };
    presentmentPrices: Array<{
      price: {
        amount: string;
        currencyCode: string;
        type: {
          name: string;
          kind: string;
          fieldBaseTypes: {
            amount: string;
            currencyCode: string;
          };
          implementsNode: boolean;
        };
      };
      compareAtPrice: null;
      type: {
        name: string;
        kind: string;
        fieldBaseTypes: {
          compareAtPrice: string;
          price: string;
        };
        implementsNode: boolean;
      };
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      variableValues: {
        checkoutId: string;
        lineItems: Array<{
          id: string;
          quantity: number;
        }>;
      };
    }>;
    weight: number;
    available: boolean;
    sku: string;
    compareAtPrice: null;
    compareAtPriceV2: null;
    image: {
      id: string;
      src: string;
      altText: null;
      type: {
        name: string;
        kind: string;
        fieldBaseTypes: {
          altText: string;
          id: string;
          originalSrc: string;
          src: string;
        };
        implementsNode: boolean;
      };
    };
    selectedOptions: Array<{
      name: string;
      value: string;
      type: {
        name: string;
        kind: string;
        fieldBaseTypes: {
          name: string;
          value: string;
        };
        implementsNode: boolean;
      };
    }>;
    unitPrice: null;
    unitPriceMeasurement: {
      measuredType: null;
      quantityUnit: null;
      quantityValue: number;
      referenceUnit: null;
      referenceValue: number;
      type: {
        name: string;
        kind: string;
        fieldBaseTypes: {
          measuredType: string;
          quantityUnit: string;
          quantityValue: string;
          referenceUnit: string;
          referenceValue: string;
        };
        implementsNode: boolean;
      };
    };
    product: {
      id: string;
      handle: string;
      type: {
        name: string;
        kind: string;
        fieldBaseTypes: {
          availableForSale: string;
          createdAt: string;
          description: string;
          descriptionHtml: string;
          handle: string;
          id: string;
          images: string;
          onlineStoreUrl: string;
          options: string;
          productType: string;
          publishedAt: string;
          title: string;
          updatedAt: string;
          variants: string;
          vendor: string;
        };
        implementsNode: boolean;
      };
    };
    type: {
      name: string;
      kind: string;
      fieldBaseTypes: {
        availableForSale: string;
        compareAtPrice: string;
        compareAtPriceV2: string;
        id: string;
        image: string;
        presentmentPrices: string;
        price: string;
        priceV2: string;
        product: string;
        selectedOptions: string;
        sku: string;
        title: string;
        unitPrice: string;
        unitPriceMeasurement: string;
        weight: string;
      };
      implementsNode: boolean;
    };
  };
  quantity: number;
  customAttributes: [];
  discountAllocations: [];
  type: {
    name: string;
    kind: string;
    fieldBaseTypes: {
      customAttributes: string;
      discountAllocations: string;
      id: string;
      quantity: string;
      title: string;
      variant: string;
    };
    implementsNode: boolean;
  };
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  variableValues: {
    checkoutId: string;
    lineItems: Array<{
      id: string;
      quantity: number;
    }>;
  };
};

export type { CartType, LineItemsType };
