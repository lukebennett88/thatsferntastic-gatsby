import * as React from 'react';

import { MainMenu } from './main-menu';

function Sidebar(): React.ReactElement {
  return (
    <aside className="hidden pb-20 w-72 lg:block">
      <nav className="sticky px-2 py-4 bg-white rounded-lg shadow top-28">
        <MainMenu />
      </nav>
    </aside>
  );
}

export { Sidebar };
