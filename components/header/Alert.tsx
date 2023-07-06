import { asset } from "$fresh/runtime.ts";
import LimitedDiv from "$store/components/LimitedDiv.tsx";

export interface Props {
  /**
   * @description the string to be shown in zipcode modal action
   */
  zipcodeHelper: string;

  /**
   * @description links to be shown in the alert bar
   */
  links: { label: string; href: string }[];
}

function Alert({ links = [], zipcodeHelper = "Your zipcode" }: Props) {
  return (
    <LimitedDiv
      baseClass="bg-neutral text-white"
      class="flex py-2 px-2 lg:py-3 lg:px-0 text-[13px]"
    >
      <div class="flex flex-row gap-2 cursor-pointer font-bold lg:font-normal w-full lg:w-auto">
        <img src={asset("/pin-map.png")} alt="map" width={16} height={20} />
        {zipcodeHelper}
      </div>

      <div class="hidden lg:block w-14 mr-14 border-gray-400 border-r-[1px]" />

      <ul class="hidden lg:flex flex-row gap-14">
        {links.map((link) => (
          <li>
            <a href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </LimitedDiv>
  );
}

export default Alert;
