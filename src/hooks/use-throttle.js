/* eslint-disable no-undef */
import { useEffect, useRef, useState } from 'react';

function useThrottle(value, limit) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handler = window.setTimeout(() => {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      }, limit - (Date.now() - lastRan.current));

      return () => window.clearTimeout(handler);
    }
  }, [value, limit]);

  return throttledValue;
}

export { useThrottle };
