import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Header } from './header';
import Footer from './footer';
import MobileMenu from './mobile-menu';
import Sidebar from './sidebar';

export function Layout({ children, hasSidebar = true }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <Header setMenuOpen={setMenuOpen} />
      <MobileMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      <div className="flex flex-1 w-full max-w-screen-xl mx-auto -mt-px font-sans font-light bg-white">
        {hasSidebar && <Sidebar />}
        <div className="flex flex-col flex-1 w-0">
          <main
            id="main"
            className="relative z-0 flex-1 py-10 focus:outline-none"
          >
            <div className="px-4 py-12 mx-auto sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool,
};
