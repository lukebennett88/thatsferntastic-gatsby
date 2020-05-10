import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

import { useGraphQL } from '../hooks';

export default function Footer() {
  const {
    site: {
      siteMetadata: { title, facebook, instagram, twitter },
    },
  } = useGraphQL();
  return (
    <footer className="bg-white">
      <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center md:order-2">
          <a href={facebook} className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Facebook</span>
            <FiFacebook className="w-6 h-6" />
          </a>
          <a
            href={instagram}
            className="ml-6 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Instagram</span>
            <FiInstagram className="w-6 h-6" />
          </a>
          <a href={twitter} className="ml-6 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <FiTwitter className="w-6 h-6" />
          </a>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-base leading-6 text-center text-gray-400">
            &copy; {new Date().getFullYear()} {title}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
