import type { NavItem } from "./Header.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import Icon from "$store/components/ui/Icon.tsx";

export default function MegaMenu(props: { items: NavItem[] }) {
  const { displayMegaMenu } = useUI();
  const icon = displayMegaMenu.value ? "ChevronUp" : "Bars3";
  const toggleMegaMenu = () => displayMegaMenu.value = !displayMegaMenu.value;

  return (
    <div onClick={toggleMegaMenu} class="relative select-none">
      <div class="flex flex-col justify-center items-center w-[20px] cursor-pointer">
        <Icon id={icon} width={20} height={20} strokeWidth={0.01} />
        <span class="text-xs font-bold ">Categorias</span>
      </div>

      <Menu items={props.items} />
    </div>
  );
}

function Menu(props: { items: NavItem[] }) {
  const { items } = props;
  const { displayMegaMenu } = useUI();

  if (!displayMegaMenu.value) {
    return <span />;
  }

  return (
    <div class="absolute top-full bg-white mt-[18px] shadow-lg w-[1280px] h-[524px] left-0 -ml-[10px]">
      <div class="relative h-full">
        <span class="block w-2 h-2 bg-gray-200 rotate-45 absolute top-0 -mt-1 ml-[15px] shadow-lg z-0" />

        <div class="z-10 bg-white relative flex flex-row flex-1 h-full">
          <ul class="bg-gray-200 w-[272px] h-full flex flex-col">
            {items.map((item) => (
              <li class="group/base">
                <div class="text-sm font-bold group-hover/base:bg-primary group-hover/base:text-white">
                  <a href={item.href} class="px-4 py-2 flex items-center">
                    <img
                      loading="lazy"
                      src={item.image}
                      alt={item.label}
                      class="h-[24px] w-[24px] object-contain mr-2"
                    />

                    {item.label}
                    <Icon id="ChevronRight" size={20} class="ml-auto" />
                  </a>
                </div>

                {item.children && (
                  <div class="hidden group-hover/base:block absolute top-0 left-[272px] h-full border-r-gray-100 border-r-[1px]">
                    <a
                      href={item.href}
                      class="px-4 py-2 flex text-primary text-lg"
                    >
                      <img
                        loading="lazy"
                        src={item.image}
                        alt={item.label}
                        class="h-[24px] w-[24px] object-contain mr-2"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(31%) sepia(99%) saturate(597%) hue-rotate(160deg) brightness(92%) contrast(106%)",
                        }}
                      />

                      {item.label}
                    </a>

                    <ul class="flex flex-col w-[272px] max-h-[524px] overflow-y-auto">
                      {item.children.map((item) => (
                        <li class="group/children last:border-b-primary last:border-b-2">
                          <div class="text-sm group-hover/children:font-bold group-hover/children:text-primary group-hover/children:bg-gray-100">
                            <a
                              href={item.href}
                              class="px-4 py-2 flex items-center"
                            >
                              {item.label}

                              <Icon
                                size={20}
                                class="ml-auto"
                                id="ChevronRight"
                              />
                            </a>
                          </div>

                          {item.children && (
                            <div class="hidden group-hover/children:block absolute top-0 w-[736px] left-[272px] h-full">
                              <ul class="p-4 flex flex-col max-h-[524px] flex-wrap w-min">
                                {item.children.map((item) => (
                                  <li class="mr-8 text-sm hover:font-bold hover:text-primary my-4 whitespace-nowrap">
                                    <a href={item.href}>
                                      {item.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
