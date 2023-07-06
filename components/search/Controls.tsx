import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions }: Props,
) {
  const open = useSignal(false);
  const url = window?.location?.href ? new URL(window?.location?.href) : null;
  const isSearching = url?.searchParams?.has("q");
  const searchTerm = url?.searchParams?.get("q");

  return (
    <div>
      <div class="flex flex-row items-center p-4 pb-0 lg:p-0">
        <Breadcrumb
          searchTerm={searchTerm}
          itemListElement={breadcrumb?.itemListElement}
        />
      </div>

      <div class="flex flex-col lg:ml-[282px] lg:items-center justify-between mb-4 p-4 lg:mb-0 lg:p-0 lg:gap-4 lg:flex-row lg:h-[53px]">
        {isSearching && (
          <span class="mr-auto mb-4 lg:mb-0 text-sm font-bold">
            Você buscou por: {searchTerm}
          </span>
        )}

        <div class="flex flex-row items-center justify-between bg-white lg:border-none h-[40px] divide-x border-[1px] border-gray-200 shadow-md rounded-md lg:shadow-none lg:border-0 lg:bg-transparent lg:divide-x-0 lg:ml-auto">
          <Button
            class={`${
              displayFilter ? "btn-ghost" : "btn-ghost lg:hidden"
            } flex flex-1`}
            onClick={() => {
              open.value = true;
            }}
          >
            Filtrar
            <Icon id="FilterList" width={16} height={16} />
          </Button>
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </div>

        <Modal
          loading="lazy"
          title="Filtrar"
          style="primary"
          mode="sidebar-right"
          open={open.value}
          onClose={() => {
            open.value = false;
          }}
        >
          <Filters filters={filters} />
        </Modal>
      </div>
    </div>
  );
}

export default SearchControls;
