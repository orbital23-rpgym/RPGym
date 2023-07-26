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

  static readonly EMPTY_EQUIPMENT: {
    helmet: Item;
    chestplate: Item;
    leggings: Item;
    boots: Item;
    mainHand: Item;
    offHand: Item;
  } = {
    helmet: {
      name: "None",
      itemType: "helmet",
      material: "none",
    },
    chestplate: {
      name: "None",
      itemType: "chestplate",
      material: "none",
    },
    leggings: {
      name: "None",
      itemType: "leggings",
      material: "none",
    },
    boots: {
      name: "None",
      itemType: "boots",
      material: "none",
    },
    mainHand: {
      name: "None",
      itemType: "mainHand",
      material: "none",
    },
    offHand: {
      name: "None",
      itemType: "offHand",
      material: "none",
    },
  } as const;

  static readonly DEFAULT = new AvatarEquipment(
    this.EMPTY_EQUIPMENT.helmet,
    this.EMPTY_EQUIPMENT.chestplate,
    this.EMPTY_EQUIPMENT.boots,
    this.EMPTY_EQUIPMENT.leggings,
    this.EMPTY_EQUIPMENT.mainHand,
    this.EMPTY_EQUIPMENT.offHand,
  );

  public toData(): AvatarEquipmentData {
    return {
      helmet: this.helmet ?? AvatarEquipment.DEFAULT.helmet,
      chestplate: this.chestplate ?? AvatarEquipment.DEFAULT.chestplate,
      leggings: this.leggings ?? AvatarEquipment.DEFAULT.leggings,
      boots: this.boots ?? AvatarEquipment.DEFAULT.boots,
      mainHandItem: this.mainHandItem ?? AvatarEquipment.DEFAULT.mainHandItem,
      offHandItem: this.offHandItem ?? AvatarEquipment.DEFAULT.offHandItem,
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
