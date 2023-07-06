import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, justify = false }: { sections: Section[]; justify: boolean },
) {
  return (
    <div class="flex flex-1">
      {sections.length > 0 && (
        <div class="flex flex-1">
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden md:flex flex-row gap-6 lg:gap-10 flex-1 ${
              justify && "lg:justify-between"
            }`}
          >
            {sections.map((section) => (
              <li class="flex flex-1">
                <div class="flex flex-col gap-2">
                  <span class="text-sm font-bold">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col gap-2 flex-wrap text-xs`}>
                    {section.items?.map((item) => (
                      <li>
                        <a href={item.href} class="block py-1 link link-hover">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden gap-4">
            {sections.map((section) => (
              <li>
                <details>
                  <summary>
                    <span class="pl-1 py-2 text-sm">{section.label}</span>
                  </summary>

                  <ul class="flex flex-col gap-1 pl-5 pt-2 text-xs">
                    {section.items?.map((item) => (
                      <li>
                        <a href={item.href} class="block py-1 link link-hover">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
