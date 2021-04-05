import { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
function useThrottle(value: string, limit: number) {
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return throttledValue;
}

export { useThrottle };
