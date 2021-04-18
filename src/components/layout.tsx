import * as React from 'react';

import { AnnouncementBanner } from './announcement-banner';
import { Footer } from './footer';
import { Header } from './header';
import { SEO } from './seo';
import { Sidebar } from './sidebar';

type LayoutProps = {
  children: React.ReactNode;
  hasSidebar?: boolean;
};

function Layout({
  children,
  hasSidebar = true,
}: LayoutProps): React.ReactElement {
  return (
    <>
      <SEO />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <AnnouncementBanner />
        <Header />
        <div className="flex-1 w-full max-w-2xl px-6 mx-auto lg:max-w-screen-xl">
          <div className="flex flex-wrap py-12 lg:space-x-16">
            {hasSidebar && <Sidebar />}
            <main className="flex-1">{children}</main>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export { Layout };
