import React from 'react';
import { useGraphQL } from '../hooks';

export default function Footer() {
  const {
    site: {
      siteMetadata: { title },
    },
  } = useGraphQL();
  return (
    <footer className="bg-white">
      <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-base leading-6 text-center text-gray-400">
            &copy; {new Date().getFullYear()}{' '}
            <a
              href="https://github.com/lukebennett88/gatsby-starter-shopify-tailwindcss"
              className="font-medium text-gray-600 underline transition duration-150 ease-in-out hover:text-gray-500 active:text-gray-800"
            >
              {title}
            </a>
            . Built with{' '}
            <a
              href="https://www.gatsbyjs.org"
              className="font-medium text-gray-600 underline transition duration-150 ease-in-out hover:text-gray-500 active:text-gray-800"
            >
              Gatsby
            </a>
            ,{' '}
            <a
              href="https://tailwindcss.com"
              className="font-medium text-gray-600 underline transition duration-150 ease-in-out hover:text-gray-500 active:text-gray-800"
            >
              Tailwind
            </a>{' '}
            and{' '}
            <a
              href="https://www.shopify.ca"
              className="font-medium text-gray-600 underline transition duration-150 ease-in-out hover:text-gray-500 active:text-gray-800"
            >
              Shopify
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
