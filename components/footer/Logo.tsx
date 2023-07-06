import Icon from "$store/components/ui/Icon.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter";
  link: string;
}

export interface Props {
  logo?: {
    image: LiveImage;
    description?: string;
  };
  social?: {
    title?: string;
    items: SocialItem[];
  };
}

export default function Logo({ logo, social }: Props) {
  return (
    <>
      {logo?.image && (
        <div class="flex flex-col lg:flex-row gap-6 max-w-[380px]">
          <div class="block w-[62px] h-[62px]">
            <img
              width={62}
              height={62}
              src={logo?.image}
              alt={logo?.description}
              class="block w-[62px] h-[62px]"
            />
          </div>
          <div class="flex flex-1 flex-col gap-3 text-sm text-[#525252]">
            {logo?.description}
            <a href="#" class="underline">Clique e saiba mais</a>

            <div class="mt-4 text-black flex flex-col">
              <span class="font-bold">{social?.title}</span>

              <div class="flex gap-2 mt-2 cursor-pointer">
                {social?.items.map((item) => (
                  <a href={item.link} aria-label={item.label}>
                    <Icon id={item.label} size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
