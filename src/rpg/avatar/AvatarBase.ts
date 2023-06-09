/**
 * Avatar base traits.
 */
export default class AvatarBase {
  bodySize: string;
  skinColor: string;
  hairColor: string;
  frontHair: string;
  backHair: string;
  facialHair: string;
  glasses: string;
  background: string;

  constructor(
    bodySize: string,
    skinColor: string,
    hairColor: string,
    frontHair: string,
    backHair: string,
    facialHair: string,
    glasses: string,
    background: string,
  ) {
    this.bodySize = bodySize;
    this.skinColor = skinColor;
    this.hairColor = hairColor;
    this.frontHair = frontHair;
    this.backHair = backHair;
    this.facialHair = facialHair;
    this.glasses = glasses;
    this.background = background;
  }

  // TODO
  static readonly DEFAULT = new AvatarBase("", "", "", "", "", "", "", "");

  public toData(): AvatarBaseData {
    return {
      bodySize: this.bodySize,
      skinColor: this.skinColor,
      hairColor: this.hairColor,
      frontHair: this.frontHair,
      backHair: this.backHair,
      facialHair: this.facialHair,
      glasses: this.glasses,
      background: this.background,
    };
  }

  static fromData(data: AvatarBaseData): AvatarBase {
    return new AvatarBase(
      data.bodySize,
      data.skinColor,
      data.hairColor,
      data.frontHair,
      data.backHair,
      data.facialHair,
      data.glasses,
      data.backHair,
    );
  }
}

export type AvatarBaseData = {
  bodySize: string;
  skinColor: string;
  hairColor: string;
  frontHair: string;
  backHair: string;
  facialHair: string;
  glasses: string;
  background: string;
};
