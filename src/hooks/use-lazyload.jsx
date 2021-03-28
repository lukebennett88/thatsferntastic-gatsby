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

export function useLazyLoad() {
  // Add a ref to image wrapper so that we can detect when it enters the viewport using IntersectionObserver
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  // Create a ref for the product image
  const imgRef = React.useRef(null);

  // Show a spinner while image is loading
  const [isImgLoaded, setImgLoaded] = React.useState(false);

  // Function to set imageLoaded to true so that we can unmount the spinner
  function handleImgLoaded() {
    setImgLoaded(true);
  }

  // When image enters the screen swap out src for the data-src
  React.useEffect(() => {
    if (inView) {
      // eslint-disable-next-line scanjs-rules/assign_to_src
      imgRef.current.src = imgRef.current.dataset.src;
    }
  }, [inView]);

  return { ref, imgRef, isImgLoaded, handleImgLoaded, Spinner: LoadingSpinner };
}
