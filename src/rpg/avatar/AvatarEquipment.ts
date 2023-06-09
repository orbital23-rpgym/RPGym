import BootsItem from "../item/BootsItem";
import ChestplateItem from "../item/ChestplateItem";
import HelmetItem from "../item/HelmetItem";
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
  helmet: HelmetItem;
  chestplate: ChestplateItem;
  leggings: LeggingsItem;
  boots: BootsItem;
  mainHandItem: MainHandItem;
  offHandItem: OffHandItem;
};
