import Modal from "$store/components/ui/Modal.tsx";
import { lazy, Suspense } from "preact/compat";
import { useUI } from "$store/sdk/useUI.ts";

import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Cart = lazy(() => import("$store/components/minicart/Cart.tsx"));

interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
}

function Modals({ menu }: Props) {
  const { displayCart, displayMenu } = useUI();

  const fallback = (
    <div class="flex justify-center items-center w-full h-full">
      <span class="loading loading-ring" />
    </div>
  );

  return (
    <>
      <Modal
        title="Menu"
        style="primary"
        mode="sidebar-left"
        loading="lazy"
        open={displayMenu.value}
        onClose={() => {
          displayMenu.value = false;
        }}
      >
        <Suspense fallback={fallback}>
          <Menu {...menu} />
        </Suspense>
      </Modal>

      <Modal
        title="Meu carrinho"
        style="secondary"
        mode="sidebar-right"
        loading="lazy"
        open={displayCart.value}
        onClose={() => {
          displayCart.value = false;
        }}
      >
        <Suspense fallback={fallback}>
          <Cart />
        </Suspense>
      </Modal>
    </>
  );
}

export default Modals;
