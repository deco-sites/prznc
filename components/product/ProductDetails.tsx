import Icon from "$store/components/ui/Icon.tsx";
import LimitedDiv from "$store/components/LimitedDiv.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import ShippingSimulation from "$store/components/ui/ShippingSimulation.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
import ProductDetailsTabs from "$store/islands/ProductDetailsTabs.tsx";

export type Variant = "front-back" | "slider" | "auto";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
}

const WIDTH = 662;
const HEIGHT = 450;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

/**
 * Here be dragons
 *
 * bravtexfashionstore (VTEX default fashion account) has the same images for different skus. However,
 * VTEX api does not return the same link for the same image. This causes the image to blink when
 * the user changes the selected SKU. To prevent this blink from happening, I created this function
 * bellow to use the same link for all skus. Example:
 *
 * {
    skus: [
      {
        id: 1
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/123/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/124/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/125/c.jpg"
        ]
      },
      {
        id: 2
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
        ]
      }
    ]
  }

  for both skus 1 and 2, we have the same images a.jpg, b.jpg and c.jpg, but
  they have different urls. This function returns, for both skus:

  [
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
  ]

  This is a very catalog dependent function. Feel free to change this as you wish
 */
const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};

  return images.map((img) => {
    const name = imageNameFromURL(img.url);

    return { ...img, url: allImages[name] ?? img.url };
  });
};

function Details({ page }: { page: ProductDetailsPage; variant: Variant }) {
  const { product } = page;
  const [img] = useStableImages(product);
  const { productID, offers, name, gtin } = product;
  const { price, listPrice, seller, availability } = useOffer(offers);

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <LimitedDiv class="flex flex-col gap-4 p-4 lg:p-0">
      {/* Breadcrumb */}
      <Breadcrumb
        itemListElement={page?.breadcrumbList?.itemListElement.slice(0, -1)}
      />

      <div class="flex flex-col lg:flex-row gap-8">
        <Image
          sizes="(max-width: 640px) 100vw, 24vw"
          style={{ aspectRatio: ASPECT_RATIO }}
          src={img.url!}
          alt={img.alternateName}
          width={WIDTH}
          height={HEIGHT}
          class="object-contain bg-white rounded-sm"
          // Preload LCP image for better web vitals
          preload={true}
          loading="eager"
        />

        {/* Product Info */}
        <div class="flex flex-1 flex-col">
          {/* Code and name */}
          <span class="text-xs font-bold">{gtin}</span>
          <h1 class="font-medium text-2xl">{name}</h1>

          <div class="my-6 flex gap-2 text-sm text-primary cursor-pointer items-center">
            <Icon id="Discount" size={24} class="text-gray-800" />
            Condições de pagamento
          </div>

          {/* Prices */}
          <div class="flex flex-col gap-2">
            <span class="line-through text-base-300 text-sm">
              {formatPrice(listPrice, offers!.priceCurrency!)}
            </span>
            <span class="font-bold text-2xl">
              {formatPrice(price, offers!.priceCurrency!)}
            </span>
          </div>

          {/* Add to Cart and Favorites button */}
          <div class="mt-4 sm:mt-10 flex flex-col gap-2">
            {availability === "https://schema.org/InStock" && seller
              ? (
                <AddToCartButton
                  skuId={productID}
                  sellerId={seller}
                  price={price ?? 0}
                  discount={price && listPrice ? listPrice - price : 0}
                  name={product.name ?? ""}
                  productGroupId={product.isVariantOf?.productGroupID ?? ""}
                />
              )
              : <OutOfStock productID={productID} />}
          </div>

          {/* Shipping Simulation */}
          <div class="mt-8 flex flex-col lg:flex-row justify-between border-y-2 border-gray-200 py-8 gap-4">
            <div class="flex gap-2 text-sm justify-center items-center mr-auto">
              <Icon id="Truck" size={32} class="text-primary" />
              Valor e prazo de entrega
            </div>

            <ShippingSimulation />
          </div>
        </div>
      </div>

      <ProductDetailsTabs />
    </LimitedDiv>
  );
}

function ProductDetails({ page, variant: maybeVar = "auto" }: Props) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;

  return (
    <div class="container py-0 sm:py-10">
      {page ? <Details page={page} variant={variant} /> : <NotFound />}
    </div>
  );
}

export default ProductDetails;
