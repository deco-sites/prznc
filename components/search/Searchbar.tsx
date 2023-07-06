/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import Spinner from "$store/components/ui/Spinner.tsx";
import { useEffect, useRef, useState } from "preact/compat";
import { useAutocomplete } from "deco-sites/std/packs/vtex/hooks/useAutocomplete.ts";

// Editable props
export interface EditableProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

export type Props = EditableProps;

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  query,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearch, suggestions, loading } = useAutocomplete();
  const hasTerms = Boolean(suggestions.value?.searches?.length);

  useEffect(() => {
    setSearch("");
  }, []);

  return (
    <div class="flex flex-col w-full relative">
      <div class="flex items-center gap-4 h-[50px] lg:h-[40px] bg-white rounded-md min-w-[320px] w-full">
        <form
          action={action}
          class="flex-grow flex gap-2 px-2 lg:px-4"
        >
          <input
            name={name}
            autocomplete="off"
            ref={searchInputRef}
            defaultValue={query}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onInput={(e) => setSearch(e.currentTarget.value)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            class="flex-grow outline-none placeholder-shown:sibling:hidden text-sm bg-transparent"
          />
          <Button
            type="submit"
            tabIndex={-1}
            htmlFor="searchbar"
            aria-label="Search"
            class="btn btn-sm btn-ghost pr-0"
          >
            <Icon
              size={20}
              id="MagnifyingGlass"
              strokeWidth={0.01}
              class="text-primary"
            />
          </Button>
        </form>
      </div>

      {hasTerms && isFocused && (
        <div class="bg-white w-full absolute top-full -mt-1 flex flex-col">
          <div class="flex gap-2 items-center p-4 pb-0">
            <span class="font-bold text-sm" role="heading">
              Termos mais buscados
            </span>
            {loading.value && <Spinner />}
          </div>

          <ul class="flex flex-col mt-2">
            {suggestions.value!.searches?.map(({ term }, index) => (
              <li class="text-xs">
                <a
                  href={`/s?q=${term}`}
                  target="_blank"
                  class="flex px-4 py-2 items-center hover:bg-gray-100"
                >
                  <span class="w-6">{index + 1}º</span> {term}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Searchbar;
