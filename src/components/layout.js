import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Header } from './header';
import Footer from './footer';
import MobileMenu from './mobile-menu';
import Sidebar from './sidebar';

const Layout = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <Header setMenuOpen={setMenuOpen} />
      <div className="flex min-h-screen -mt-px font-sans font-light bg-white">
        <MobileMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
        <Sidebar />
        <div className="flex flex-col flex-1 w-0">
          <main
            id="main"
            className="relative z-0 flex-1 py-10 focus:outline-none"
          >
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Layout };
