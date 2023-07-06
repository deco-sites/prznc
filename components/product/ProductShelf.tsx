import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import LimitedDiv from "$store/components/LimitedDiv.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { useId } from "preact/hooks";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
  products: LoaderReturnType<Product[] | null>;
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
}

function ProductShelf({
  products,
  title,
  description,
  layout,
  cardLayout,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <LimitedDiv class="w-full container py-8 flex flex-col gap-12 lg:gap-16 lg:py-10">
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "center"}
      />

      <div
        id={id}
        class="grid grid-cols-[60px_1fr_60px] md:px-4 lg:px-0"
      >
        <Slider class="carousel carousel-center col-span-full sm:carousel-end gap-6 row-start-2 row-end-5">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class={`${
                index === products.length ? "mr-[60px]" : ""
              } carousel-item w-[230px] sm:w-[230px] first:pl-6 last:pr-6 md:first:pl-16 md:last:pr-16 pb-6`}
            >
              <ProductCard
                product={product}
                layout={cardLayout}
                itemListName={title}
              />
            </Slider.Item>
          ))}
        </Slider>

        <>
          <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="btn btn-md btn-circle btn-outline absolute bg-base-100">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>
          <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="btn btn-md btn-circle btn-outline absolute right-0 bg-base-100">
              <Icon size={24} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </>

        <SliderJS rootId={id} />

        <SendEventOnLoad
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product) =>
                mapProductToAnalyticsItem({
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
    </LimitedDiv>
  );
}

export default ProductShelf;
