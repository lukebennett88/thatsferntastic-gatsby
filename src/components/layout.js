import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Header } from './header';
import { MobileMenu } from './mobile-menu';
import { Sidebar } from './sidebar';
import { Footer } from './footer';

export function Layout({ children, hasSidebar = true }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header setMenuOpen={setMenuOpen} />
      <MobileMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      <main className="flex-1 w-full max-w-2xl px-6 mx-auto lg:max-w-screen-xl">
        <article className="grid py-12 lg:grid-cols-4 lg:gap-16">
          {hasSidebar && <Sidebar />}
          <div className={hasSidebar ? 'col-span-3' : 'col-span-4'}>
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool,
};
