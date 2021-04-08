import * as React from 'react';

type ErrorProps = { children: React.ReactNode };

function Error({ children }: ErrorProps): React.ReactElement {
  return (
    <div
      role="alert"
      className="mt-1 text-xs font-semibold tracking-widest text-pink-500 uppercase"
    >
      {children}
    </div>
  );
}

export { Error };
