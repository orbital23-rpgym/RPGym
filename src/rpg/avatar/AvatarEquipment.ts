import BootsItem from "../item/BootsItem";
import ChestplateItem from "../item/ChestplateItem";
import HelmetItem from "../item/HelmetItem";
import { ItemData } from "../item/Item";
import LeggingsItem from "../item/LeggingsItem";
import MainHandItem from "../item/MainHandItem";
import OffHandItem from "../item/OffHandItem";

/**
 * Equipped items for an avatar.
 */
export default class AvatarEquipment {
  helmet: HelmetItem;
  chestplate: ChestplateItem;
  leggings: LeggingsItem;
  boots: BootsItem;
  mainHandItem: MainHandItem;
  offHandItem: OffHandItem;

  constructor(
    helmet: HelmetItem,
    chestplate: ChestplateItem,
    leggings: LeggingsItem,
    boots: BootsItem,
    mainHandItem: MainHandItem,
    offHandItem: OffHandItem,
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
  // TODO
  static readonly DEFAULT = new AvatarEquipment(
    new HelmetItem("", ""),
    new ChestplateItem("", ""),
    new LeggingsItem("", ""),
    new BootsItem("", ""),
    new MainHandItem("", ""),
    new OffHandItem("", ""),
  );

  public toData(): AvatarEquipmentData {
    return {
      helmet: this.helmet.toData(),
      chestplate: this.chestplate.toData(),
      leggings: this.leggings.toData(),
      boots: this.boots.toData(),
      mainHandItem: this.mainHandItem.toData(),
      offHandItem: this.offHandItem.toData(),
    };
  }

  static fromData(data: AvatarEquipmentData): AvatarEquipment {
    return new AvatarEquipment(
      new HelmetItem(data.helmet.name, data.helmet.imagePath),
      new ChestplateItem(data.chestplate.name, data.chestplate.imagePath),
      new LeggingsItem(data.leggings.name, data.leggings.imagePath),
      new BootsItem(data.boots.name, data.boots.imagePath),
      new MainHandItem(data.mainHandItem.name, data.mainHandItem.imagePath),
      new OffHandItem(data.offHandItem.name, data.offHandItem.imagePath),
    );
  }
}

export type AvatarEquipmentData = {
  helmet: ItemData;
  chestplate: ItemData;
  leggings: ItemData;
  boots: ItemData;
  mainHandItem: ItemData;
  offHandItem: ItemData;
};
