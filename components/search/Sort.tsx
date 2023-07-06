import { useMemo } from "preact/hooks";
import { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

const portugueseMappings = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  // "release:desc": "Relevância - Decrescente",
  "discount:desc": "Maior desconto",
};
function Sort({ sortOptions }: Props) {
  const sort = useSort();

  return (
    <>
      <div class="flex lg:hidden flex-1 justify-center items-center h-[40px] px-4">
        <select
          name="sort"
          onInput={applySort}
          class="w-full px-1 text-sm text-base-content cursor-pointer outline-none bg-transparent"
        >
          {sortOptions.map(({ value, label }) => ({
            value,
            label: portugueseMappings[label as keyof typeof portugueseMappings],
          })).filter(({ label }) => label).map(({ value, label }) => (
            <option key={value} value={value} selected={value === sort}>
              <span class="text-sm">{label}</span>
            </option>
          ))}
        </select>
      </div>

      <div class="text-sm hidden lg:block">
        Ordenar por
        <select
          name="sort"
          onInput={applySort}
          class="w-min h-[36px] px-1 rounded text-sm m-2 text-base-content cursor-pointer outline-none bg-gray-300"
        >
          {sortOptions.map(({ value, label }) => ({
            value,
            label: portugueseMappings[label as keyof typeof portugueseMappings],
          })).filter(({ label }) => label).map(({ value, label }) => (
            <option key={value} value={value} selected={value === sort}>
              <span class="text-sm">{label}</span>
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Sort;
