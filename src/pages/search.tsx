/* eslint-disable sonarjs/no-identical-functions */
import { SearchIcon, XIcon } from '@heroicons/react/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useLocation } from '@reach/router';
import { Link } from 'gatsby';
import queryString from 'query-string';
import * as React from 'react';
import {
  Configure,
  connectHits,
  connectPagination,
  connectSearchBox,
  Highlight,
  InstantSearch,
} from 'react-instantsearch-dom';

import { Layout, SEO } from '../components';
import { algoliaClient } from '../utils/algolia-client';
import { resizeShopifyImage } from '../utils/resize-shopify-image';

function SearchPage(): React.ReactElement {
  return (
    <>
      <Layout>
        <SEO title="Handmade Pencil Cases, Pouches, Stationery, Accessories and More" />
        <LatestProducts />
      </Layout>
    </>
  );
}

function LatestProducts(): React.ReactElement {
  const { search } = useLocation();
  const query = String(queryString.parse(search).q || '');

  return (
    <article className="relative flex flex-col flex-1 w-full max-w-sm mx-auto sm:max-w-none">
      <h1 className="text-center heading-1 sm:text-left">Search Results</h1>
      <InstantSearch
        indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME as string}
        searchClient={algoliaClient}
      >
        <Configure hitsPerPage={8} />
        <SearchBox defaultRefinement={query} />
        <Hits />
        <Pagination />
      </InstantSearch>
    </article>
  );
}

const SearchBox = connectSearchBox(({ currentRefinement, refine }) => {
  return (
    <div className="pt-3">
      <label
        htmlFor="search"
        className="flex pl-6 pr-2 my-2 overflow-hidden rounded-full shadow-inner md:my-0 bg-gray-50 md:bg-white md:shadow focus-within:ring"
      >
        <div className="flex w-full md:ml-0">
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <input
              id="search"
              value={currentRefinement}
              onChange={(event) => {
                refine(event.currentTarget.value);
              }}
              type="text"
              placeholder="Search all products"
              className="block w-full h-full py-3.5 pl-8 pr-3 text-gray-900 placeholder-gray-500 bg-transparent border-none rounded-lg focus:ring-0 focus:placeholder-gray-400 sm:text-sm"
            />
            <div className="absolute inset-y-0 left-0 flex items-center">
              {currentRefinement ? (
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                <button type="button" onClick={() => refine('')}>
                  <span className="sr-only">Clear</span>
                  <XIcon aria-hidden className="w-5 h-5" />
                </button>
              ) : (
                <SearchIcon
                  aria-hidden
                  className="w-5 h-5 pointer-events-none"
                />
              )}
            </div>
          </div>
        </div>
      </label>
    </div>
  );
});

const Hits = connectHits(
  ({ hits }): React.ReactElement => {
    return (
      <div className="flex-1">
        <ol className="relative grid items-start pb-20 mx-auto mt-6 gap-y-10">
          {hits.map((hit) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <Hit key={hit.objectID} hit={hit} />
          ))}
        </ol>
      </div>
    );
  }
);

interface HitProps {
  hit: {
    availableForSale: boolean;
    createdAt: Date;
    description: string;
    handle: string;
    image: {
      originalSrc: string;
    };
    productType: string;
    tags: Array<string>;
    title: string;
    vendor: string;
    objectID: string;
  };
}

function Hit({ hit }: HitProps): React.ReactElement {
  const imageSrc = hit.image
    ? resizeShopifyImage({ url: hit.image.originalSrc, width: 600 })
    : undefined;
  return (
    <li>
      <Link
        aria-label={hit.title}
        to={`/products/${hit.handle}/`}
        className="sm:py-8"
      >
        <div className="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0 md:grid-cols-4">
          <div className="aspect-w-1 aspect-h-1">
            <img
              className="object-cover rounded-lg shadow-lg"
              src={imageSrc}
              alt=""
            />
          </div>
          <div className="sm:col-span-2 md:col-span-3">
            <div className="space-y-4">
              <div className="space-y-1 text-lg font-medium leading-6">
                <h3 className="text-sm font-semibold tracking-wider text-pink-500 uppercase">
                  {hit.title}
                </h3>
              </div>
              <div className="mt-2 prose sm:line-clamp-4 md:line-clamp-5 lg:line-clamp-6">
                <Highlight attribute="description" tagName="mark" hit={hit} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

const Pagination = connectPagination(
  ({ currentRefinement, nbPages, refine }) => {
    function Pager({ index }): React.ReactElement {
      return (
        <button
          type="button"
          onClick={() => {
            refine(index);
          }}
          className="relative items-center hidden px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 md:inline-flex hover:bg-gray-50"
        >
          {index}
        </button>
      );
    }
    return (
      <>
        <div className="sticky bottom-0 flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50 sm:px-6">
          <div className="flex justify-between flex-1 sm:hidden">
            <button
              type="button"
              onClick={() => {
                if (currentRefinement > 1) {
                  refine((currentRefinement as number) - 1);
                }
              }}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => {
                if (currentRefinement < nbPages) {
                  refine((currentRefinement as number) + 1);
                }
              }}
              className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{currentRefinement}</span>{' '}
                to{' '}
                <span className="font-medium">
                  {currentRefinement as number}
                </span>{' '}
                of <span className="font-medium">{nbPages}</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (currentRefinement > 1) {
                      refine((currentRefinement as number) - 1);
                    }
                  }}
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <Pager index={1} />
                <Pager index={2} />
                <Pager index={3} />
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
                  ...
                </span>
                <Pager index={nbPages - 2} />
                <Pager index={nbPages - 1} />
                <Pager index={nbPages} />
                <button
                  type="button"
                  onClick={() => {
                    if (currentRefinement < nbPages) {
                      refine((currentRefinement as number) + 1);
                    }
                  }}
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
        {/* <ul>
        {new Array(nbPages).fill(null).map((_, index) => {
          const page = index + 1;
          const style = {
            fontWeight: currentRefinement === page ? 'bold' : '',
          };

          return (
            <li key={index}>
              <button
                type="button"
                onClick={() => {
                  refine(page);
                }}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul> */}
      </>
    );
  }
);

export default SearchPage;
