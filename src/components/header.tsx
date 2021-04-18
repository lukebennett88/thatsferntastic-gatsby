import {
  HomeIcon,
  MenuAlt2Icon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'gatsby';
import * as React from 'react';

import { useCartCount } from '../hooks/use-cart-count';
import {
  SanitySiteSettings,
  useSanitySiteSettings,
} from '../hooks/use-sanity-site-settings';
import { MobileMenu } from './mobile-menu';
import { SearchBar } from './search-bar';
import { Wave } from './wave';

function Header(): React.ReactElement {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const count = useCartCount();
  const sanitySiteSettings: SanitySiteSettings = useSanitySiteSettings();
  return (
    <>
      <nav className="sticky top-0 z-10 bg-teal-200">
        <MobileMenu
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex flex-shrink-0 w-full h-16 max-w-screen-xl mx-auto bg-white shadow md:h-auto md:bg-transparent md:shadow-none">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="px-4 text-gray-500 border-r border-gray-200 focus:bg-gray-100 focus:text-gray-600 md:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon aria-hidden className="w-6 h-6" />
          </button>
          <div className="flex justify-between flex-1 px-4 space-x-4 md:space-x-6 md:py-4">
            <div className="relative hidden md:flex md:items-center">
              <Link
                to="/"
                className="relative p-3 text-gray-500 bg-white rounded-full md:shadow hover:bg-gray-100 hover:text-gray-600 focus:text-gray-600"
              >
                <span className="sr-only">Home page</span>
                <HomeIcon aria-hidden className="w-6 h-6" />
              </Link>
            </div>
            <SearchBar />
            <div className="relative flex items-center">
              <Link
                to="/cart/"
                className="relative p-3 text-gray-500 bg-white rounded-full md:shadow hover:bg-gray-100 hover:text-gray-600 focus:text-gray-600"
              >
                <span className="sr-only">Shopping cart</span>
                <ShoppingCartIcon aria-hidden className="w-6 h-6" />
                <AnimatePresence>
                  {count > 0 ? (
                    <motion.div
                      key={count}
                      initial={{ opacity: 0, y: '1rem' }}
                      animate={{ opacity: 1, y: '0rem' }}
                      exit={{ opacity: 0, y: '-1rem' }}
                      className="absolute top-0 right-0 pointer-events-none"
                    >
                      <span
                        className={`${
                          count >= 10 ? 'px-2' : 'w-5'
                        } flex items-center justify-center h-5 max-w-xs pt-1 font-mono text-xs text-white transform translate-x-1/2 bg-pink-600 rounded-full shadow-lg pointer-events-auto `}
                      >
                        {count}
                      </span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <header className="relative">
        <div className="relative bg-teal-200">
          <div className="px-4 pt-8 pb-12 mx-auto max-w-7xl md:px-6 lg:px-8">
            <div className="text-center text-teal-900">
              <p className="font-mono text-2xl leading-none md:text-5xl">
                <Link to="/" className="focus:underline focus:ring-0">
                  {sanitySiteSettings.title}
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          <Wave className="w-full max-h-[3rem] -mx-1 -mt-px text-teal-200" />
        </div>
      </header>
    </>
  );
}

export { Header };
