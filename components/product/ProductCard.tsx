import Image from "deco-sites/std/components/Image.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistIcon from "$store/islands/WishlistButton.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnClick } from "$store/sdk/analytics.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
  layout?: Layout;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 118;
const HEIGHT = 118;

function ProductCard({ product, preload, itemListName, layout }: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;

  const id = `product-card-${productID}`;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const _discountPercentage = (price || 0) * 100 / (listPrice || 0) - 100;
  const discountPercentage = Math.abs(Math.round(_discountPercentage));

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";

  const skuSelector = variants.map(([value, [link]]) => (
    <li>
      <a href={link}>
        <Avatar
          variant={link === url ? "active" : "default"}
          content={value}
        />
      </a>
    </li>
  ));

  const cta = (
    <a
      aria-label="view product"
      href={url && relative(url)}
      class="cursor-pointer bg-primary text-white text-sm font-bold flex w-full h-[32px] justify-center items-center hover:bg-[#6eae46] hover:text-white transition-all rounded-md"
    >
      {l?.basics?.ctaText || "Comprar"}
    </a>
  );

  return (
    <div
      id={id}
      data-deco="view-product"
      class="card card-compact group w-full bg-white rounded-2xl pb-3 shadow-lg"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
      <figure class="relative overflow-hidden w-full min-h-[118px] flex justify-center items-center py-4">
        {discountPercentage != 0 && (
          <span class="absolute top-0 left-0 mt-4 ml-4 text-xs rounded-full border-solid border-[1px] p-1 px-2 border-red-500 bg-white text-red-500 font-bold">
            {discountPercentage}% off
          </span>
        )}

        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="contents"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </a>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col p-2">
        {/* SKU Selector */}
        {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
          <>
            {l?.hide?.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-2 w-full ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )}

        {l?.hide?.productName && l?.hide?.productDescription
          ? ""
          : (
            <div class="flex flex-col h-[104px] gap-0">
              {l?.hide?.productName
                ? ""
                : (
                  <h2 class="text-sm text-base-content">
                    {name}
                  </h2>
                )}
            </div>
          )}
        {l?.hide?.allPrices ? "" : (
          <div class="flex flex-col gap-2">
            <div
              class={`flex flex-col gap-0 ${
                l?.basics?.oldPriceSize === "Normal"
                  ? "lg:flex-row lg:gap-2"
                  : ""
              } ${align === "center" ? "justify-center" : "justify-start"}`}
            >
              <div
                class={`line-through text-xs ${
                  l?.basics?.oldPriceSize === "Normal" ? "lg:text-xl" : ""
                }`}
              >
                {listPrice !== price
                  ? formatPrice(listPrice, offers!.priceCurrency!)
                  : "."}
              </div>
              <div class="text-primary text-lg font-bold">
                {formatPrice(price, offers!.priceCurrency!)} un
              </div>
            </div>
            {l?.hide?.installments
              ? ""
              : (
                <div class="text-base-300 text-sm lg:text-base">
                  ou {installments}
                </div>
              )}
          </div>
        )}

        {/* SKU Selector */}
        {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            {l?.hide?.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-2 w-full ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )}

        {!l?.hide?.cta
          ? (
            <div
              class={`mt-2 flex-auto flex items-end ${
                l?.onMouseOver?.showCta ? "lg:hidden" : ""
              }`}
            >
              {cta}
            </div>
          )
          : ""}
      </div>
    </div>
  );
}

export default ProductCard;
