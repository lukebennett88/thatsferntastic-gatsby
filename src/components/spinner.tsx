import { useId } from '@reach/auto-id';
import * as React from 'react';

function Spinner(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
): React.ReactElement {
  const id = useId();
  const title = `title-${id as string}`;
  const desc = `desc-${id as string}`;
  return (
    <svg
      height="1em"
      width="1em"
      className="w-7 h-7 text-cyan-600 animate-spin"
      role="img"
      aria-labelledby={`${title} ${desc}`}
      viewBox="0 0 32 32"
      {...props}
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
