import React from 'react';
import PropTypes from 'prop-types';

import { Header } from './header';
import { Hero } from './hero';
import Footer from './footer';

const Layout = ({ children, hasHero }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-gray-700 bg-gray-50">
      <Header />
      {hasHero ? <Hero /> : null}
      <main className="flex-1 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hasHero: PropTypes.bool,
};

export { Layout };
