import * as React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';

import { useGraphQL } from '../hooks';

const SOCIAL_ICON = {
  Facebook: FiFacebook,
  Instagram: FiInstagram,
  LinkedIn: FiLinkedin,
  Twitter: FiTwitter,
};

function Footer() {
  const { sanitySiteSettings } = useGraphQL();
  return (
    <footer className="bg-white">
      <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {sanitySiteSettings.socialLinks.map((socialLink) => {
            const Icon = SOCIAL_ICON[socialLink.socialNetwork];
            return (
              <OutboundLink
                key={socialLink._key}
                href={socialLink.link}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{socialLink.socialNetwork}</span>
                <Icon className="w-6 h-6" />
              </OutboundLink>
            );
          })}
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-base leading-6 text-center text-gray-400">
            &copy; {new Date().getFullYear()} {sanitySiteSettings.title}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
