import type { BreadcrumbList } from "deco-sites/std/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  searchTerm?: string | null | undefined;
}

function Breadcrumb({ itemListElement = [], searchTerm }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];
  const filteredItems = items.filter(({ name, item }) => name && item);

  if (searchTerm) {
    filteredItems.push({ name: searchTerm, item: "#" });
  }

  const lastIndex = filteredItems.length - 1;

  return (
    <div class="breadcrumbs">
      <ul>
        {filteredItems.map(({ name, item }, index) => (
          <li
            class={`text-xs font-bold ${
              index === lastIndex ? "text-primary" : "text-base"
            }`}
          >
            <a href={item} class="py-1 px-3 rounded-full bg-gray-200">
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
