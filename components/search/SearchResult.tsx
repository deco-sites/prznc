import LimitedDiv from "$store/components/LimitedDiv.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import { Layout as cardLayout } from "$store/components/product/ProductCard.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns: Columns;
}

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  layout?: Layout;
  cardLayout?: cardLayout;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  layout,
  cardLayout,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;

  return (
    <LimitedDiv class="py-0 md:py-4 lg:py-10">
      <SearchControls
        sortOptions={sortOptions}
        filters={filters}
        breadcrumb={breadcrumb}
        displayFilter={layout?.variant === "drawer"}
      />

      <div class="flex flex-row gap-8 py-4 px-4 lg:px-0">
        <aside class="hidden lg:block w-min min-w-[250px]">
          <Filters filters={filters} />
        </aside>

        <ProductGallery products={products} layout={cardLayout} />
      </div>

      <div class="flex justify-center my-4">
        <a
          aria-label="previous page link"
          rel="prev"
          href={pageInfo.previousPage ?? "#"}
          class="btn btn-ghost join-item"
        >
          <Icon id="ChevronLeft" width={20} height={20} strokeWidth={2} />
        </a>
        <span class="btn btn-ghost join-item">
          Página {pageInfo.currentPage + 1}
        </span>
        <a
          aria-label="next page link"
          rel="next"
          href={pageInfo.nextPage ?? "#"}
          class="btn btn-ghost join-item"
        >
          <Icon
            id="ChevronRight"
            width={20}
            height={20}
            strokeWidth={2}
          />
        </a>
      </div>
    </LimitedDiv>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
