import { useSignal } from "@preact/signals";
import Button from "$store/components/ui/Button.tsx";
import type { SKU } from "deco-sites/std/packs/vtex/types.ts";

export interface Props {
  items: Array<SKU>;
}

function ShippingSimulation() {
  const postalCode = useSignal("");
  const loading = useSignal(false);

  return (
    <form
      class="flex flex-1 max-w-[250px] border-2 border-gray-400 rounded-md overflow-hidden"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        as="input"
        type="text"
        maxLength={8}
        class="flex w-full px-4"
        placeholder="Calcular frete"
        value={postalCode.value}
        onChange={(e: { currentTarget: { value: string } }) => {
          postalCode.value = e.currentTarget.value;
        }}
      />
      <Button type="submit" loading={loading.value} class="btn-primary btn-md">
        Buscar
      </Button>
    </form>
  );
}

export default ShippingSimulation;
