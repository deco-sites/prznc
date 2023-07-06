import { asset } from "$fresh/runtime.ts";
import { navbarHeight } from "./constants.ts";
import Icon from "$store/components/ui/Icon.tsx";
import MegaMenu from "$store/islands/MegaMenu.tsx";
import type { NavItem, NavLink } from "./Header.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import LimitedDiv from "$store/components/LimitedDiv.tsx";
import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

function Navbar({ items, highlightedItems, searchbar }: {
  items: NavItem[];
  searchbar: SearchbarProps;
  highlightedItems: NavLink[];
}) {
  return (
    <div class="flex flex-col">
      {/* MOBILE BAR */}
      <div
        style={{ height: navbarHeight }}
        class="lg:hidden flex flex-row justify-between items-center w-full px-2 gap-2 bg-secondary"
      >
        <div class="-ml-2">
          <Buttons variant="menu" />
        </div>

        <a
          href="/"
          aria-label="Prezunic"
          class="flex-grow inline-flex items-center"
        >
          <img
            width={42}
            height={42}
            alt="Prezunic"
            src={asset("/logo.webp")}
          />
        </a>

        <div class="flex -mr-2">
          <a href="#" aria-label="Meus pedidos" class="btn btn-sm btn-ghost">
            <Icon id="Bag" size={20} />
          </a>

          <a
            href="/login"
            aria-label="Minha conta"
            class="btn btn-sm btn-ghost"
          >
            <Icon id="User" size={20} />
          </a>

          <Buttons variant="cart" />
        </div>
      </div>

      {/* DESKTOP BAR */}
      <LimitedDiv
        baseClass="hidden lg:flex bg-secondary"
        class="flex flex-row h-[72px] items-center"
      >
        <MegaMenu items={items} />

        <div class="block mx-16 w-[62px] h-[62px]">
          <a href="/">
            <img
              width={62}
              height={62}
              alt="Prezunic"
              src={asset("/logo.webp")}
            />
          </a>
        </div>

        <div class="flex items-center ml-auto -mr-3 flex-1">
          <Searchbar {...searchbar} />

          <a href="#" class="btn btn-sm btn-ghost">
            <Icon id="Order" size={24} />
            <span>Produtos comprados</span>
          </a>

          <a href="#" class="btn btn-sm btn-ghost">
            <Icon id="Bag" size={20} />
            <span>Pedidos</span>
          </a>

          <a href="/login" class="btn btn-sm btn-ghost">
            <Icon id="User" size={18} />
            <span>Minha conta</span>
          </a>

          <Buttons variant="cart" />
        </div>
      </LimitedDiv>

      {/* MOBILE SEARCH INPUT */}
      <div class="flex lg:hidden">
        <Searchbar {...searchbar} />
      </div>

      {/* HIGHLIGHTED ITEMS */}
      <LimitedDiv baseClass="hidden lg:flex border-b border-base-200">
        <ul class="flex flex-row justify-between items-center h-[40px]">
          {highlightedItems.map((item) => (
            <li class="text-sm">
              <a href={item.href} class="text-black hover:text-primary">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </LimitedDiv>
    </div>
  );
}

export default Navbar;
