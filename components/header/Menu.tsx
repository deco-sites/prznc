import Icon from "$store/components/ui/Icon.tsx";
import type { NavItem, NavLink } from "./Header.tsx";

export interface Props {
  items: NavItem[];
}

function MenuItem({ item }: { item: NavLink }) {
  return (
    <a href={item.href} class="flex px-4 py-2">
      {item.label}
      <Icon id="ChevronRight" size={20} class="ml-auto" />
    </a>
  );
}

function Menu({ items }: Props) {
  return (
    <div>
      <span class="block px-4 pt-4 text-primary font-bold text-sm">
        Categorias
      </span>

      <ul class="flex-grow flex flex-col mt-4">
        {items.map((item) => (
          <li class="text-sm font-bold text-[#525252]">
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
