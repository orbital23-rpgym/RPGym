import { palette } from "constants/colors";

export type GlassesColor = "none" | "red" | "purple" | "blue" | "green";
export type HairColor = "red";
export type BodySize = "slim" | "broad";
export type SkinColor = "a";
export type FrontHair = "none" | "a";
export type BackHair = "none" | "a";
export type FacialHair = "none" | "a" | "b" | "c";

/**
 * Avatar base traits.
 */
export default class AvatarBase {
  bodySize: BodySize;
  skinColor: SkinColor;
  hairColor: HairColor;
  frontHair: FrontHair;
  backHair: BackHair;
  facialHair: FacialHair;
  glasses: GlassesColor;
  /** Background color (hex code) */
  background: string;

  constructor(
    bodySize: BodySize,
    skinColor: SkinColor,
    hairColor: HairColor,
    frontHair: FrontHair,
    backHair: BackHair,
    facialHair: FacialHair,
    glasses: GlassesColor,
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

  /** Number of layers for display */
  static readonly NUM_LAYERS = 6;
  static readonly DEFAULT = new AvatarBase(
    "slim",
    "a",
    "red",
    "a",
    "a",
    "a",
    "red",
    palette.blueDark,
  );

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
  bodySize: BodySize;
  skinColor: SkinColor;
  hairColor: HairColor;
  frontHair: FrontHair;
  backHair: BackHair;
  facialHair: FacialHair;
  glasses: GlassesColor;
  background: string;
};
