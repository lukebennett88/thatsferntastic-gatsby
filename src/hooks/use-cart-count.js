import * as React from 'react'

import { StoreContext } from '../context/store-context';

function useCartCount() {
  const { checkout } = React.useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []

  return items.reduce((total, item) => {
    return total + item.quantity
  }, 0)
}

export { useCartCount }
