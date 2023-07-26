import EquipmentPurchaseConfirmView from "./EquipmentPurchaseConfirmView";
import { Item, itemShopPrice } from "./Item";

import { useAppUser } from "library/context/UserContext";

export default function EquipmentPurchaseConfirmController() {
  const user = useAppUser();

  async function buy(item: Item) {
    return;
  }

  async function buyAndEquip(item: Item) {
    return;
  }
  return (
    <EquipmentPurchaseConfirmView onBuy={buy} onBuyAndEquip={buyAndEquip} />
  );
}
