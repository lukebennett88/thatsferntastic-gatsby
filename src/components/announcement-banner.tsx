import * as React from 'react';

function AnnouncementBanner(): React.ReactElement {
  return (
    <header className="px-4 py-1 font-semibold text-center text-teal-900 sm:px-6 lg:px-8 bg-teal-50">
      Flat Rate Shipping! $6 to Australia, $20 Worldwide
    </header>
  );
}

export { AnnouncementBanner };
