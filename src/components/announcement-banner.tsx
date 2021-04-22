import * as React from 'react';

import { useSanitySiteSettings } from '../hooks/use-sanity-site-settings';

function AnnouncementBanner(): React.ReactElement {
  const { bannerText } = useSanitySiteSettings();
  return (
    <header className="px-4 py-1 font-semibold text-center text-teal-900 sm:px-6 lg:px-8 bg-teal-50">
      {bannerText.map((line, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>
          <span className="block lg:inline-block">{line}</span>
          {index !== bannerText.length - 1 ? (
            <span className="hidden mx-4 lg:inline-block">|</span>
          ) : null}
        </React.Fragment>
      ))}
    </header>
  );
}

export { AnnouncementBanner };
