import {
  AVATAR_EQUIP_ICONS,
  AVATAR_EQUIP_ONBODY,
} from "constants/avatar-equip";

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
