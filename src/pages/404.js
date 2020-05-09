import React from 'react';
import { Layout, SEO } from '../components';

export default function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <div className="relative pt-16 pb-20">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            Page Not Found
          </h1>
          <p className="max-w-2xl mx-auto mt-3 text-xl leading-7 text-gray-500 sm:mt-4">
            We couldn't find the page you were looking for.
          </p>
        </div>
      </div>
    </Layout>
  );
}
