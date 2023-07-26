import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

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

// /**
//  * In-game item.
//  */
// export default class Item {
//   name: string;
//   material: BasicItemMaterial;
//   itemType: ItemType;
//   constructor(name: string, material:BasicItemMaterial, itemType:ItemType) {
//     this.name = name;
//     this.material=material;
//     this.itemType=itemType
//   }

//   public toData(): ItemData {
//     return { name: this.name, material:this.material, itemType: this.itemType};
//   }

//   public fromData(data: ItemData): Item {

//   }
// }

// export type ItemData = {
//   name: string;
//   material: BasicItemMaterial;
//   itemType: ItemType;
// };

/**
 * In-game item.
 */
export type Item = {
  name: string;
  material: BasicItemMaterial;
  itemType: ItemType;
};
