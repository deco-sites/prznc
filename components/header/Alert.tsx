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
    <LimitedDiv class="flex py-4 text-[13px]" baseClass="bg-neutral text-white">
      <div class="flex flex-row gap-2 cursor-pointer">
        <span>icon</span>
        {zipcodeHelper}
      </div>

      <div class="w-14 mr-14 border-gray-400 border-r-[1px]" />

      <ul class="flex flex-row gap-14">
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
