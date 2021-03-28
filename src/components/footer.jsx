import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import * as React from 'react';

import { useGraphQL } from '../hooks';
import { FacebookIcon, InstagramIcon, TwitterIcon } from './icons';

const SOCIAL_ICON = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Twitter: TwitterIcon,
};

function Footer() {
  const {
    sanitySiteSettings,
    allSanityPage,
    allShopifyCollection,
  } = useGraphQL();
  return (
    <footer className="bg-white" aria-labelledby="footerHeading">
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <h2 className="font-mono text-xl text-gray-500">
              {sanitySiteSettings.title}
            </h2>
            <p className="text-base text-gray-500">
              {sanitySiteSettings.description}
            </p>
            <div className="flex space-x-6">
              {sanitySiteSettings.socialLinks.map(
                ({ _key, link, socialNetwork }) => {
                  const Icon = SOCIAL_ICON[socialNetwork];
                  return (
                    <OutboundLink
                      key={_key}
                      href={link}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">{socialNetwork}</span>
                      <Icon className="w-6 h-6" />
                    </OutboundLink>
                  );
                }
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-12 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  Links
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      to="/posts/"
                      className="text-base text-gray-500 hover:text-gray-900"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <OutboundLink
                      href="https://www.etsy.com/au/shop/ThatsFerntastic"
                      className="text-base text-gray-500 hover:text-gray-900"
                    >
                      Etsy
                    </OutboundLink>
                  </li>
                  <li>
                    <OutboundLink
                      href="https://www.redbubble.com/people/FerntasticArt/shop"
                      className="text-base text-gray-500 hover:text-gray-900"
                    >
                      Redbubble
                    </OutboundLink>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  Collections
                </h3>
                <ul className="mt-4 space-y-4">
                  {allShopifyCollection.nodes.map(({ id, handle, title }) => (
                    <li key={id}>
                      <Link
                        to={`/collections/${handle}/`}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  {allSanityPage.nodes.map(({ _id, slug, title }) => (
                    <li key={_id}>
                      <Link
                        to={`/${slug.current}/`}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 mt-12 border-t border-gray-200">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} {sanitySiteSettings.title}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
