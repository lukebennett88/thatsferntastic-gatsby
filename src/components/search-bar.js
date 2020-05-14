import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';

import { useGraphQL } from '../hooks';
import { resizeShopifyImage } from '../utils';

export function SearchBar() {
  const {
    allShopifyProduct: { nodes: products },
  } = useGraphQL();

  // Add state for query
  const [query, setQuery] = useState('');

  // Add state for search results
  const [searchResults, setSearchResults] = useState([]);

  // When query changes, update the state
  function handleChange(e) {
    setQuery(e.target.value);
  }

  useEffect(() => {
    // Whenever query is not an empty string, update the productResults
    if (query !== '') {
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
    // If the user starts typing, and then deletes their query, set it back to an empty array
    else setSearchResults([]);
  }, [products, query]);

  return (
    <div className="relative flex flex-1">
      <div className="flex flex-1 pl-6 pr-2 overflow-hidden bg-white md:rounded-full md:shadow">
        <div className="flex w-full md:ml-0">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="search_field" className="sr-only">
            Search
          </label>
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                />
              </svg>
            </div>
            <input
              id="search_field"
              className="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:placeholder-gray-400 sm:text-sm"
              placeholder="Search"
              type="search"
              onChange={handleChange}
              value={query}
            />
          </div>
        </div>
        {searchResults.length > 0 && (
          <div className="absolute inset-x-0 z-10 p-4 mt-16 overflow-hidden text-left bg-white border-t rounded-b-lg shadow-2xl md:border-none md:rounded-t-lg full-bleed md:reset-full-bleed">
            <div className="shadow-sm">
              <h3 className="px-4 pb-4 uppercase">Products</h3>
              <ul className="bg-white border-t">
                {searchResults.splice(0, 4).map((result) => (
                  <li
                    key={result.handle}
                    className="-mx-4 hover:bg-gray-200 odd:bg-gray-50"
                  >
                    <Link
                      to={`/products/${result.handle}`}
                      className="flex items-center px-8 py-2"
                    >
                      <img
                        src={
                          result.images[0]
                            ? resizeShopifyImage({
                                url: result.images[0].originalSrc,
                                width: 44,
                              })
                            : ''
                        }
                        alt=""
                        width={44}
                        height={44}
                        className="object-contain bg-white h-11 w-11"
                      />
                      <span className="ml-2">{result.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-4 pt-4 border-t">Searching for: "{query}"</div>
          </div>
        )}
      </div>
    </div>
  );
}
