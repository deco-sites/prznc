import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  logo?: {
    image: LiveImage;
    description?: string;
  };
}

export default function Logo({ logo }: Props) {
  return (
    <>
      {logo?.image && (
        <div class="flex flex-row gap-6 max-w-[380px]">
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
          </div>
        </div>
      )}
    </>
  );
}
