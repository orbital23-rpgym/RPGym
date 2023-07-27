import {
  AVATAR_EQUIP_ICONS,
  AVATAR_EQUIP_NAMES,
  AVATAR_EQUIP_ONBODY,
} from "constants/avatar-equip";
import { EQUIP_PRICES } from "constants/game";

export type BasicItemMaterial =
  | "silver"
  | "gold"
  | "emerald"
  | "obsidian"
  | "none";
export type ItemType =
  | "helmet"
  | "chestplate"
  | "leggings"
  | "boots"
  | "mainHand"
  | "offHand";
// | "dualHand";

/**
 * In-game item.
 */
export type Item = {
  name: string;
  material: BasicItemMaterial;
  itemType: ItemType;
};

export function getItemImageOnbody(item?: Item) {
  return AVATAR_EQUIP_ONBODY[item?.itemType ?? "mainHand"][
    item?.material ?? "none"
  ];
}

export function getItemImageIcon(item?: Item) {
  return AVATAR_EQUIP_ICONS[item?.itemType ?? "mainHand"][
    item?.material ?? "none"
  ];
}

export function isEqualItems(item1: Item, item2: Item): boolean {
  return (
    item1.itemType === item2.itemType &&
    item1.material === item2.material &&
    item1.name === item2.name
  );
}

export function deepCopyItem(item: Item): Item {
  return { name: item.name, material: item.material, itemType: item.itemType };
}

export function itemShopPrice(item: Item): number {
  return EQUIP_PRICES[item.material];
}

export const PURCHASEABLE_ITEMS: Item[] = [];
for (const type of Object.keys(AVATAR_EQUIP_NAMES) as ItemType[]) {
  for (const material of Object.keys(
    AVATAR_EQUIP_NAMES[type],
  ) as BasicItemMaterial[]) {
    material !== "none" &&
      PURCHASEABLE_ITEMS.push({
        name: AVATAR_EQUIP_NAMES[type][material],
        material: material,
        itemType: type,
      });
  }
}
