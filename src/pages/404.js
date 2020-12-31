import * as React from 'react';

import { Layout, SEO } from '../components';

export default function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404: Not found" />

      <h1 className="heading-1">Page Not Found</h1>
      <div className="mt-5 prose">
        <p className="lead">We couldn't find the page you were looking for.</p>
      </div>
    </Layout>
  );
}
