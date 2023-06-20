import EMPTY_LAYER from "assets/avatar/onbody_empty.png";

export const AVATAR_BASE = {
  base: {
    slim: {
      a: require("assets/avatar/base/slim/base_slim_a.png"),
      clothes: require("assets/avatar/base/slim/onbody_slim_clothes.png"),
    },
    broad: { a: 0, clothes: 0 },
  },
  frontHair: {
    red: {
      a: require("assets/avatar/front-hair/onbody_fronthair_red_a.png"),
      none: EMPTY_LAYER,
    },
  },
  backHair: {
    red: {
      a: require("assets/avatar/back-hair/onbody_backhair_red_a.png"),
      none: EMPTY_LAYER,
    },
  },
  faceHair: {
    red: {
      a: require("assets/avatar/facial-hair/onbody_facialhair_red_a.png"),
      b: require("assets/avatar/facial-hair/onbody_facialhair_red_b.png"),
      c: require("assets/avatar/facial-hair/onbody_facialhair_red_c.png"),
      none: EMPTY_LAYER,
    },
  },
  glasses: {
    red: require("assets/avatar/glasses/onbody_glasses_red.png"),
    purple: require("assets/avatar/glasses/onbody_glasses_purple.png"),
    blue: require("assets/avatar/glasses/onbody_glasses_blue.png"),
    green: require("assets/avatar/glasses/onbody_glasses_green.png"),
    none: EMPTY_LAYER,
  },
};

// export type AvatarBaseLayer = keyof typeof AVATAR_BASE;
// export type GlassesColor = keyof typeof AVATAR_BASE.glasses;
// export type HairColor = keyof typeof AVATAR_BASE.backHair;
// export type BodySize = keyof typeof AVATAR_BASE.base;
// export type SkinColor = keyof typeof AVATAR_BASE.base.slim;
// export type FrontHair = keyof typeof AVATAR_BASE.frontHair.red;
// export type BackHair = keyof typeof AVATAR_BASE.backHair.red;
// export type FacialHair = keyof typeof AVATAR_BASE.faceHair.red;
