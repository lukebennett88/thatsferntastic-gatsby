/**
 * Source: https://github.com/hswolff/youtube/blob/master/videos/react-demos/src/demo/use-event-listener.js
 */

import { useEffect, useRef } from 'react';

export function useEventListener(
  eventType,
  handler,
  { enabled = true, target = document } = {}
) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (!enabled) {
      return;
    }
    function internalHandler(e) {
      return handlerRef.current(e);
    }

    target.addEventListener(eventType, internalHandler);

    return () => {
      target.removeEventListener(eventType, internalHandler);
    };
  }, [eventType, enabled, target]);
}
