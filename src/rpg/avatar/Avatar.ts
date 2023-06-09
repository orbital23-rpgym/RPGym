import AvatarBase, { AvatarBaseData } from "./AvatarBase";
import AvatarEquipment, { AvatarEquipmentData } from "./AvatarEquipment";

/**
 * In-game user character avatar.
 */
export default class Avatar {
  avatarBase: AvatarBase;
  avatarEquipment: AvatarEquipment;

  constructor(avatarBase: AvatarBase, avatarEquipment: AvatarEquipment) {
    this.avatarBase = avatarBase;
    this.avatarEquipment = avatarEquipment;
  }

  static readonly DEFAULT = new Avatar(
    AvatarBase.DEFAULT,
    AvatarEquipment.DEFAULT,
  );

  public toData(): AvatarData {
    return {
      base: this.avatarBase.toData(),
      equipment: this.avatarEquipment.toData(),
    };
  }

  static fromData(data: AvatarData): Avatar {
    return new Avatar(
      AvatarBase.fromData(data.base),
      AvatarEquipment.fromData(data.equipment),
    );
  }
}

export type AvatarData = {
  base: AvatarBaseData;
  equipment: AvatarEquipmentData;
};
