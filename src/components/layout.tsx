import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps): React.ReactElement {
  return (
    <>
      <main className="flex-1">{children}</main>
    </>
  );
}

export { Layout };
