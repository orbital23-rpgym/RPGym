export type GlassesColor = "none" | "red" | "purple" | "blue" | "green";
export type HairColor = "red" | "darkBlond" | "black" | "yellow";
export type BodySize = "slim" | "broad";
export type SkinColor = "peach" | "lightBrown" | "mediumBrown" | "darkBrown";
export type FrontHair =
  | "none"
  | "a" /* swept fringe */
  | "b" /* straight bangs */;
export type BackHair = "none" | "short" /* b */ | "long" /* a */;
export type FacialHair = "none" | "moustache" | "beard" | "both";
export type BackgroundColor = "pink" | "blue" | "green" | "purple" | "yellow";

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
  background: BackgroundColor;

  constructor(
    bodySize: BodySize,
    skinColor: SkinColor,
    hairColor: HairColor,
    frontHair: FrontHair,
    backHair: BackHair,
    facialHair: FacialHair,
    glasses: GlassesColor,
    background: BackgroundColor,
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
    "lightBrown",
    "red",
    "a",
    "short",
    "none",
    "red",
    "blue",
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
      data.background,
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
  background: BackgroundColor;
};
