import * as React from 'react';
import { useInView } from 'react-intersection-observer';

import { Spinner } from '../components/spinner';

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-white">
      <Spinner />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useLazyLoad() {
  // Add a ref to image wrapper so that we can detect when it enters the viewport using IntersectionObserver
  const [containerRef, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  // Create a ref for the product image
  const srcRef = React.useRef(null);

  // Show a spinner while image is loading
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Function to set imageLoaded to true so that we can unmount the spinner
  const handleIsLoaded = (): void => setIsLoaded(true);

  // When image enters the screen swap out src for the data-src
  React.useEffect(() => {
    if (inView && srcRef?.current) {
      // @ts-ignore
      srcRef.current.src = srcRef.current.dataset.src;
    }
  }, [inView]);

  return {
    containerRef,
    srcRef,
    isLoaded,
    handleIsLoaded,
    Spinner: LoadingSpinner,
  };
}
