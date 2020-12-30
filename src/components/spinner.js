import * as React from 'react';
import { useId } from '@reach/auto-id';

function Spinner() {
  const id = useId();
  const title = `title-${id}`;
  const desc = `desc-${id}`;
  return (
    <svg
      height="1em"
      width="1em"
      className="w-7 h-7 text-cyan-600 animate-spin"
      role="img"
      aria-labelledby={`${title} ${desc}`}
      viewBox="0 0 32 32"
    >
      <title id={title}>Circle loading spinner</title>
      <desc id={desc}>Image of a partial circle indicating "loading."</desc>
      <circle
        role="presentation"
        cx={16}
        cy={16}
        r={12}
        stroke="currentColor"
        fill="none"
        strokeWidth={4}
        strokeDasharray="45"
        strokeLinecap="round"
      />
    </svg>
  );
}

export { Spinner };
