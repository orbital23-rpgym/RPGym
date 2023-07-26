import Avatar from "../avatar/Avatar";

import EquipmentPurchaseConfirmView from "./EquipmentPurchaseConfirmView";
import { Item, itemShopPrice } from "./Item";

import { useAppUser, useSetAppUser } from "library/context/UserContext";

export default function EquipmentPurchaseConfirmController() {
  const user = useAppUser();
  const setUser = useSetAppUser();

  async function buy(item: Item) {
    if (item.material === "none") throw new Error("Invalid item.");
    const itemPrice = itemShopPrice(item);
    if (user.character.money < itemPrice)
      throw new Error("Not enough money to buy " + item.name + ".");
    // subtract money
    const newUserCharacter1 = await user.character.setMoney(
      user.character.money - itemPrice,
    );
    // add item
    const newUserCharacter2 = await newUserCharacter1.setItems(
      user.character.items.concat([item]),
    );
    const newUser = await user.setUserCharacter(newUserCharacter2);
    setUser(newUser);
  }

  async function buyAndEquip(item: Item) {
    if (item.material === "none") throw new Error("Invalid item.");
    const itemPrice = itemShopPrice(item);
    if (user.character.money < itemPrice)
      throw new Error("Not enough money to buy " + item.name + ".");
    // subtract money
    const newUserCharacter1 = await user.character.setMoney(
      user.character.money - itemPrice,
    );
    // add item
    const newUserCharacter2 = await newUserCharacter1.setItems(
      user.character.items.concat([item]),
    );
    // equip
    const newEquipment = newUserCharacter2.avatar.avatarEquipment.toData();
    newEquipment[item.itemType] = item;
    const newUserCharacter3 = await newUserCharacter2.updateProfile(
      newUserCharacter2.displayName,
      newUserCharacter2.bio,
      Avatar.fromData({
        base: newUserCharacter2.avatar.avatarBase.toData(),
        equipment: newEquipment,
      }),
    );
    const newUser = await user.setUserCharacter(newUserCharacter3);
    setUser(newUser);
  }
  return (
    <EquipmentPurchaseConfirmView onBuy={buy} onBuyAndEquip={buyAndEquip} />
  );
}
