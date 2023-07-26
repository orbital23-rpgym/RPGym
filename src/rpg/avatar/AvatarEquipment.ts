import BootsItem from "../item/BootsItem";
import ChestplateItem from "../item/ChestplateItem";
import HelmetItem from "../item/HelmetItem";
import { Item } from "../item/Item";
import LeggingsItem from "../item/LeggingsItem";
import MainHandItem from "../item/MainHandItem";
import OffHandItem from "../item/OffHandItem";

/**
 * Equipped items for an avatar.
 */
export default class AvatarEquipment {
  helmet: Item;
  chestplate: Item;
  leggings: Item;
  boots: Item;
  mainHandItem: Item;
  offHandItem: Item;

  constructor(
    helmet: Item,
    chestplate: Item,
    leggings: Item,
    boots: Item,
    mainHandItem: Item,
    offHandItem: Item,
  ) {
    this.helmet = helmet;
    this.chestplate = chestplate;
    this.leggings = leggings;
    this.boots = boots;
    this.mainHandItem = mainHandItem;
    this.offHandItem = offHandItem;
  }

  /** Number of layers for display */
  static readonly NUM_LAYERS = 6;

  static readonly DEFAULT = new AvatarEquipment(
    {
      name: "none",
      itemType: "helmet",
      material: "none",
    },
    {
      name: "none",
      itemType: "chestplate",
      material: "none",
    },
    {
      name: "none",
      itemType: "leggings",
      material: "none",
    },
    {
      name: "none",
      itemType: "boots",
      material: "none",
    },
    {
      name: "none",
      itemType: "mainHand",
      material: "none",
    },
    {
      name: "none",
      itemType: "offHand",
      material: "none",
    },
  );

  public toData(): AvatarEquipmentData {
    return {
      helmet: this.helmet,
      chestplate: this.chestplate,
      leggings: this.leggings,
      boots: this.boots,
      mainHandItem: this.mainHandItem,
      offHandItem: this.offHandItem,
    };
  }

  static fromData(data: AvatarEquipmentData): AvatarEquipment {
    return new AvatarEquipment(
      data.helmet,
      data.chestplate,
      data.leggings,
      data.boots,
      data.mainHandItem,
      data.offHandItem,
    );
  }
}

export type AvatarEquipmentData = {
  helmet: Item;
  chestplate: Item;
  leggings: Item;
  boots: Item;
  mainHandItem: Item;
  offHandItem: Item;
};
