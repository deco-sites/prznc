import Modals from "$store/islands/HeaderModals.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Image } from "deco-sites/std/components/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";

import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import Alert, { Props as AlertProps } from "./Alert.tsx";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavItemWithChildren extends NavLink {
  children?: NavLink[];
}

export interface NavItem extends NavLink {
  image: Image;
  children?: NavItemWithChildren[];
}

export interface Props {
  /** @title Search Bar */
  searchbar?: SearchbarProps;

  /**
   * @title Navigation items to be shown in highlight section
   * @description Navigation items used both on mobile and desktop menus
   */
  highlightedNavItems?: NavLink[];

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;

  /**
   * @title Data to be used in the alert area
   */
  alert: AlertProps;
}

function Header({
  alert,
  searchbar: _searchbar,
  products,
  highlightedNavItems = [],
  navItems = [],
  suggestions,
}: Props) {
  const searchbar = { ..._searchbar, products, suggestions };

  return (
    <header style={{ height: headerHeight }}>
      <div class="bg-base-100 fixed w-full z-50 flex flex-col-reverse lg:flex-col">
        <Alert {...alert} />

        <Navbar
          items={navItems}
          searchbar={searchbar}
          highlightedItems={highlightedNavItems}
        />
      </div>

      <Modals
        menu={{ items: navItems }}
        searchbar={searchbar}
      />
    </header>
  );
}

export default Header;
