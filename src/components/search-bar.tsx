/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchIcon, XIcon } from '@heroicons/react/outline';
import type {
  ComboboxOptionProps as ReachComboboxOptionProps,
  ComboboxProps as ReachComboboxProps,
} from '@reach/combobox';
import {
  Combobox as ReachCombobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption as ReachComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';
import { navigate } from 'gatsby';
import * as React from 'react';
import {
  Configure,
  connectSearchBox,
  connectStateResults,
  Highlight,
  InstantSearch,
} from 'react-instantsearch-dom';

import { algoliaClient } from '../utils/algolia-client';
import { resizeShopifyImage } from '../utils/resize-shopify-image';

function SearchBar(): React.ReactElement {
  return (
    <InstantSearch
      indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME as string}
      searchClient={algoliaClient}
    >
      <Configure hitsPerPage={10} />
      <SearchBox />
    </InstantSearch>
  );
}

const SearchBox = connectSearchBox(({ currentRefinement, refine }) => {
  const inputRef = React.useRef(null);
  return (
    <Combobox
      openOnFocus
      onSelect={(_, data) => {
        navigate(`/products/${data.handle as string}`);
      }}
      aria-label="Search for products"
      className="relative flex flex-1"
    >
      <label
        htmlFor="search_input"
        className="flex flex-1 pl-6 pr-2 my-2 overflow-hidden rounded-full shadow-inner md:my-0 bg-gray-50 md:bg-white md:shadow focus-within:ring"
      >
        <div className="flex w-full md:ml-0">
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <ComboboxInput
              ref={inputRef}
              id="search_input"
              value={currentRefinement}
              onChange={(event) => {
                refine(event.currentTarget.value);
              }}
              type="text"
              placeholder="Search all products"
              className="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 bg-transparent border-none rounded-lg focus:ring-0 focus:placeholder-gray-400 sm:text-sm"
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
      <Results />
    </Combobox>
  );
});

const Query = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <p className="px-4 py-4 text-base text-left border-t">
      Searching for: &ldquo;{searchState.query}&rdquo;
    </p>
  ) : null
);

function ResultsWrapper({ children }): React.ReactElement {
  return (
    <ComboboxPopover
      portal={false}
      className="absolute inset-x-0 z-10 mt-16 overflow-hidden text-left bg-white border-t rounded-b-lg shadow-2xl md:border-none md:rounded-t-lg full-bleed md:reset-full-bleed"
    >
      {children}
    </ComboboxPopover>
  );
}

const ComboboxContext = React.createContext<ComboboxContextValue>({} as any);

function Combobox({
  onSelect: onSelectProp,
  ...props
}: ComboboxProps): React.ReactElement {
  const {
    addOptionData,
    getOptionData,
    removeOptionData,
  } = useOptionDataFactory();

  const onSelectRef = React.useRef(onSelectProp);
  React.useEffect(() => {
    onSelectRef.current = onSelectProp;
  });

  const onSelect = React.useCallback(
    (value: string) => {
      onSelectRef.current?.(value, getOptionData(value));
    },
    [getOptionData]
  );

  const context: ComboboxContextValue = React.useMemo(
    () => ({
      addOptionData,
      getOptionData,
      removeOptionData,
      onSelect,
    }),
    [onSelect, addOptionData, getOptionData, removeOptionData]
  );

  return (
    <ComboboxContext.Provider value={context}>
      <ReachCombobox {...props} as="div" onSelect={onSelect} />
    </ComboboxContext.Provider>
  );
}

function ComboboxOption({
  selectData,
  ...props
}: ComboboxOptionProps): React.ReactElement {
  const { addOptionData, removeOptionData } = React.useContext(ComboboxContext);
  React.useEffect(() => {
    addOptionData(props.value, selectData);
    return () => removeOptionData(props.value);
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.value, selectData, addOptionData, removeOptionData]);

  return <ReachComboboxOption {...props} as="li" />;
}

type ComboboxDOMProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  keyof ReachComboboxProps
>;

type ComboboxOptionDOMProps = Omit<
  React.ComponentPropsWithoutRef<'li'>,
  keyof ReachComboboxOptionProps
>;

interface ComboboxProps extends ReachComboboxProps, ComboboxDOMProps {
  onSelect?(value: string, data?: any): void;
}

interface ComboboxOptionProps
  extends ReachComboboxOptionProps,
    ComboboxOptionDOMProps {
  /**
   * Custom data that will be passed to the `onSelect` of the `Combobox` as a
   * second argument.
   */
  selectData?: any;
}

/**
 * Uses a ref object which stores the index as a key and custom data as value
 * for each ComboboxOption. Hides the ref so that we can only mutate it through
 * the returned functions. 🙈
 */
function useOptionDataFactory(): {
  addOptionData: AddOptionData;
  getOptionData: GetOptionData;
  removeOptionData: RemoveOptionData;
} {
  const optionData = React.useRef<OptionData>({});

  const addOptionData = React.useCallback<AddOptionData>(
    // eslint-disable-next-line no-return-assign, @typescript-eslint/no-unsafe-return
    (value: string, data: any) => (optionData.current[value] = data),
    []
  );

  const getOptionData = React.useCallback<GetOptionData>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    (value: string) => optionData.current[value],
    []
  );

  const removeOptionData = React.useCallback<RemoveOptionData>(
    (value: string) => delete optionData.current[value],
    []
  );

  return {
    addOptionData,
    getOptionData,
    removeOptionData,
  };
}

type OptionData = Record<string, any>;

type AddOptionData = (value: string, data: any) => void;

type GetOptionData = (value: string) => any | undefined;

type RemoveOptionData = (value: string) => void;

interface ComboboxContextValue {
  onSelect(value: string, data?: any): any;
  getOptionData: GetOptionData;
  addOptionData: AddOptionData;
  removeOptionData: RemoveOptionData;
}

const Results = connectStateResults(
  // @ts-ignore
  ({ searchState, searchResults, refine }) => {
    if (!searchResults) {
      return null;
    }

    if (!searchState || !searchState.query) {
      return null;
    }

    if (searchResults && searchResults.nbHits === 0)
      return (
        <ResultsWrapper>
          <p className="px-8 py-2 -mx-4">
            No results have been found for &ldquo;{searchState.query}&rdquo;
          </p>
        </ResultsWrapper>
      );

    if (searchResults && searchResults.nbHits !== 0) {
      return (
        <ResultsWrapper>
          <h3 className="px-4 py-4 text-base text-left uppercase border-b">
            Products
          </h3>
          <ComboboxList>
            {searchResults.hits.map((hit) => (
              // @ts-ignore
              <Options key={hit.id} hit={hit} refine={refine} />
            ))}
          </ComboboxList>
          <Query />
        </ResultsWrapper>
      );
    }
    return null;
  }
);

type OptionsProps = {
  hit: {
    id: string;
    handle: string;
    title: string;
    image?: {
      originalSrc: string;
    };
  };
  refine: (...args: any[]) => any;
};

function Options({ hit, refine }: OptionsProps): React.ReactElement {
  return (
    <ComboboxOption
      key={hit.id}
      value={hit.title}
      selectData={{
        handle: hit.handle,
      }}
    >
      <a
        href={`/products/${hit.handle}`}
        onClick={(e) => {
          e.preventDefault();
          navigate(`/products/${hit.handle}`);
          refine('');
        }}
        className="flex items-center px-8 py-2 -mx-4 focus:outline-none focus:bg-gray-200 hover:bg-gray-100"
      >
        <div className="bg-white h-11 w-11">
          {hit.image && (
            <img
              width={44}
              height={44}
              src={
                hit.image
                  ? resizeShopifyImage({
                      url: hit.image.originalSrc,
                      width: 44,
                    })
                  : undefined
              }
              alt=""
              className="object-contain"
            />
          )}
        </div>
        <div className="ml-2">
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </div>
      </a>
    </ComboboxOption>
  );
}

export { SearchBar };
