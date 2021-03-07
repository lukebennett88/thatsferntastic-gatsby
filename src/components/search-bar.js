import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { matchSorter } from 'match-sorter';
import * as React from 'react';

import { useGraphQL, useThrottle } from '../hooks';

function useProductMatch(products, term) {
  const throttledTerm = useThrottle(term, 100);
  return React.useMemo(
    () =>
      term.trim() === ''
        ? null
        : matchSorter(products, term, {
            keys: ['title', 'tags'],
          }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [throttledTerm]
  );
}

function SearchBar() {
  // const {
  //   allShopifyProduct: { nodes: products },
  // } = useGraphQL();

  // const [term, setTerm] = React.useState('');

  // const results = useProductMatch(products, term);

  const inputRef = React.useRef(null);

  // function handleChange(event) {
  //   setTerm(event.target.value);
  // }

  // function handleSelect(value) {
  //   setTerm(value);
  // }

  return (
    <Combobox
      openOnFocus
      // onSelect={handleSelect}
      aria-label="Product search"
      className="relative flex flex-1"
    >
      <div className="flex flex-1 pl-6 pr-2 overflow-hidden bg-white md:rounded-full md:shadow focus-within:ring">
        <div className="flex w-full md:ml-0">
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
            <ComboboxInput
              ref={inputRef}
              // value={term}
              // onChange={handleChange}
              placeholder="Search"
              className="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-none rounded-lg focus:ring-0 focus:placeholder-gray-400 sm:text-sm"
            />
          </div>
        </div>
        {/* {results && (
          <ComboboxPopover
            portal={false}
            className="absolute inset-x-0 z-10 mt-16 overflow-hidden text-left bg-white border-t rounded-b-lg shadow-2xl md:border-none md:rounded-t-lg full-bleed md:reset-full-bleed"
          >
            <div className="p-4 shadow-sm">
              <h3 className="px-4 pb-3 font-mono text-2xl text-gray-500">
                Products
              </h3>
              <ComboboxList className="bg-white">
                {results.slice(0, 10).map((result) => (
                  <ComboboxOption
                    key={result.handle}
                    value={result.title}
                    className="rounded-lg odd:bg-gray-50"
                  >
                    <Link
                      to={`/products/${result.handle}`}
                      className="relative flex items-center px-4 py-2 transition duration-150 ease-in-out rounded-lg hover:bg-pink-100 focus:bg-pink-100 focus:z-10"
                    >
                      <GatsbyImage
                        image={
                          result.images[0]?.localFile.childImageSharp
                            .gatsbyImageData
                        }
                        alt=""
                        width={44}
                        height={44}
                        className="object-contain bg-white rounded h-11 w-11"
                      />
                      <span className="ml-2">{result.title}</span>
                    </Link>
                  </ComboboxOption>
                ))}
              </ComboboxList>
              <hr className="mt-4 border-gray-100" />
              <div className="p-4 pb-0 text-sm">
                Searching for: “<em>{term}</em>”
              </div>
            </div>
          </ComboboxPopover>
        )} */}
      </div>
    </Combobox>
  );
}

export { SearchBar };
