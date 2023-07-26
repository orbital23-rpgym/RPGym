import { Item } from "../item/Item";

/**
 * Equipped items for an avatar.
 */
export default class AvatarEquipment {
  helmet: Item;
  chestplate: Item;
  leggings: Item;
  boots: Item;
  mainHand: Item;
  offHand: Item;

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
    this.mainHand = mainHandItem;
    this.offHand = offHandItem;
  }

  /** Number of layers for display */
  static readonly NUM_LAYERS = 6;

  static readonly EMPTY_EQUIPMENT: AvatarEquipmentData = {
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
      mainHand: this.mainHand ?? AvatarEquipment.DEFAULT.mainHand,
      offHand: this.offHand ?? AvatarEquipment.DEFAULT.offHand,
    };
  }

  static fromData(data: AvatarEquipmentData): AvatarEquipment {
    return new AvatarEquipment(
      data.helmet,
      data.chestplate,
      data.leggings,
      data.boots,
      data.mainHand,
      data.offHand,
    );
  }
}

export type AvatarEquipmentData = {
  helmet: Item;
  chestplate: Item;
  leggings: Item;
  boots: Item;
  mainHand: Item;
  offHand: Item;
};
