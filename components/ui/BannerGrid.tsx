import LimitedDiv from "$store/components/LimitedDiv.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  preload?: boolean;
  srcMobile: LiveImage;
  srcDesktop?: LiveImage;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
  mobileWidth: number;
  mobileHeight: number;
  desktopWidth: number;
  desktopHeight: number;
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
  /**
   * @description Default is 2 for mobile and all for desktop
   */
  itemsPerLine: {
    /** @default 2 */
    mobile?: 1 | 2;
    /** @default 4 */
    desktop?: 1 | 2 | 3 | 4 | 5 | 6 | 8;
  };
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  banners: Banner[];
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
  8: "sm:grid-cols-8",
};

const RADIUS_MOBILE = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "none": "sm:rounded-none",
  "sm": "sm:rounded-sm",
  "md": "sm:rounded-md",
  "lg": "sm:rounded-lg",
  "xl": "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  "full": "sm:rounded-full",
};

export default function BannnerGrid({
  hideOnDesktop = false,
  hideOnMobile = false,
  itemsPerLine,
  borderRadius,
  banners = [],
}: Props) {
  const hideOnDesktopClass = hideOnDesktop ? "lg:hidden" : "lg:flex";
  const hideOnMobileClass = hideOnMobile ? "hidden" : "flex";
  const hideClasses = `${hideOnDesktopClass} ${hideOnMobileClass}`;
  const classes = "container w-full py-12 px-4 lg:px-0 mx-auto";

  return (
    <LimitedDiv baseClass={hideClasses} class={classes}>
      <div
        class={`grid gap-4 lg:gap-6 ${
          MOBILE_COLUMNS[itemsPerLine?.mobile ?? 2]
        } ${DESKTOP_COLUMNS[itemsPerLine?.desktop ?? 4]}`}
      >
        {banners.map((banner) => (
          <a
            href={banner.href}
            class={`overflow-hidden ${
              RADIUS_MOBILE[borderRadius.mobile ?? "none"]
            } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
          >
            <Picture>
              <Source
                media="(max-width: 767px)"
                src={banner.srcMobile}
                width={banner.mobileWidth}
                height={banner.mobileHeight}
              />
              <Source
                media="(min-width: 768px)"
                src={banner.srcDesktop ? banner.srcDesktop : banner.srcMobile}
                width={banner.desktopWidth}
                height={banner.desktopHeight}
              />

              <img
                class="w-full"
                decoding="async"
                alt={banner.alt}
                src={banner.srcMobile}
                sizes="(max-width: 640px) 100vw, 30vw"
                loading={banner.preload ? "eager" : "lazy"}
              />
            </Picture>
          </a>
        ))}
      </div>
    </LimitedDiv>
  );
}
