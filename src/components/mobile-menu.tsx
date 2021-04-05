import { Transition } from '@headlessui/react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { Link } from 'gatsby';
import * as React from 'react';

import {
  SanitySiteSettings,
  useSanitySiteSettings,
} from '../hooks/use-sanity-site-settings';
import { MainMenu } from './main-menu';

type MobileMenuProps = {
  isMenuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MobileMenu({
  isMenuOpen,
  setMenuOpen,
}: MobileMenuProps): React.ReactElement {
  const close = React.useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);

  const handleEscape = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    },
    [close]
  );

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          close();
        }
      });
    }
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [close, handleEscape]);

  const sanitySiteSettings: SanitySiteSettings = useSanitySiteSettings();

  return (
    <Transition show={isMenuOpen} className="md:hidden">
      <DialogOverlay onDismiss={close} className="fixed inset-0 z-40 flex">
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-black opacity-50" />
        </Transition.Child>
        <Transition.Child
          as={DialogContent}
          aria-label="Sidebar menu"
          enter="transition ease-in-out duration-500 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-500 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          className="relative flex flex-col flex-1 w-full max-w-xs pb-4 bg-white outline-none"
        >
          <div className="absolute top-0 right-0 p-1 -mr-14">
            <button
              type="button"
              onClick={close}
              aria-label="Close sidebar"
              className="flex items-center justify-center w-12 h-12 transition duration-150 ease-in-out bg-black bg-opacity-25 rounded-full focus:bg-black focus:bg-opacity-50"
            >
              <svg
                className="w-6 h-6 text-white"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 h-0 overflow-y-auto">
            <nav className="px-2 mt-5 space-y-5">
              <Link
                to="/"
                className="flex items-center px-2 py-2 mt-2 font-mono text-xl font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-lg group first:mt-0 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-100"
                // className="flex items-center px-4 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-md group first:mt-0 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-100"
              >
                {sanitySiteSettings.title}
              </Link>
              <MainMenu onClick={close} />
            </nav>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" />
      </DialogOverlay>
    </Transition>
  );
}

export { MobileMenu };
