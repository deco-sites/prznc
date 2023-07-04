import type { JSX } from "preact";
import { ComponentChildren } from "preact";

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
  baseClass?: string;
  children: ComponentChildren;
}

export default function LimitedDiv(props: Props) {
  const rootClasses = "flex w-full justify-center";
  const innerClasses = "max-w-[1270px] w-full";
  const allRootClasses = [props.baseClass, rootClasses];
  const allInnerClasses = [innerClasses, props.class, props.className];

  return (
    <div class={allRootClasses.join(" ")}>
      <div class={allInnerClasses.join(" ")}>
        {props.children}
      </div>
    </div>
  );
}
