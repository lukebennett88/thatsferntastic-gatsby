import { useContext } from 'react';

import { StoreContext } from '../context/store-context';

export function useStoreContext() {
  const context = useContext(StoreContext);
  return context;
}
