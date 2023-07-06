import { useSignal } from "@preact/signals";

const TABS = [
  "Descrição",
  "Características",
  "Avaliação dos Clientes",
];

export default function ProductDetailsTabs() {
  const activeIndex = useSignal(0);

  return (
    <div class="flex flex-col">
      <ul class="flex flex-col lg:flex-row">
        {TABS.map((tab, index) => {
          const changeActiveIndex = () => (activeIndex.value = index);

          const classes =
            "cursor-pointer flex font-semibold flex-1 border-b-2 justify-center items-center py-3";

          const activeClass = index === activeIndex.value
            ? "border-primary text-[#525252]"
            : "border-gray-300 text-gray-400";

          return (
            <li onClick={changeActiveIndex} class={`${classes} ${activeClass}`}>
              {tab}
            </li>
          );
        })}
      </ul>

      <p class="text-sm text-[#525252] mt-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </div>
  );
}
