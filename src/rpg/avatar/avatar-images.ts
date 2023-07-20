import {
  BackgroundColor,
  BackHair,
  FacialHair,
  FrontHair,
  GlassesColor,
  HairColor,
  SkinColor,
} from "./AvatarBase";

import ICON_EMPTY from "assets/avatar/icon_empty.png";
import ONBODY_EMPTY from "assets/avatar/onbody_empty.png";

export const AVATAR_BASE_ICONS = {
  skinColor: {
    peach: "#F6C9A0",
    lightBrown: "#B27B62",
    mediumBrown: "#713E29",
    darkBrown: "#502612",
  },
  hairColor: {
    red: "#7B2135",
    darkBlond: "#917531",
    black: "#3C3A3A",
    yellow: "#FFDD63",
  },
  frontHair: {
    red: {
      a: require("assets/avatar/front-hair/icon_fronthair_red_a.png"),
      b: require("assets/avatar/front-hair/icon_fronthair_red_b.png"),
      none: ICON_EMPTY,
    },
    darkBlond: {
      a: require("assets/avatar/front-hair/icon_fronthair_brown_a.png"),
      b: require("assets/avatar/front-hair/icon_fronthair_brown_b.png"),
      none: ICON_EMPTY,
    },
    black: {
      a: require("assets/avatar/front-hair/icon_fronthair_black_a.png"),
      b: require("assets/avatar/front-hair/icon_fronthair_black_b.png"),
      none: ICON_EMPTY,
    },
    yellow: {
      a: require("assets/avatar/front-hair/icon_fronthair_yellow_a.png"),
      b: require("assets/avatar/front-hair/icon_fronthair_yellow_b.png"),
      none: ICON_EMPTY,
    },
  },
  backHair: {
    red: {
      long: require("assets/avatar/back-hair/icon_backhair_red_a.png"),
      short: require("assets/avatar/back-hair/icon_backhair_red_b.png"),
      none: ICON_EMPTY,
    },
    darkBlond: {
      long: require("assets/avatar/back-hair/icon_backhair_brown_a.png"),
      short: require("assets/avatar/back-hair/icon_backhair_brown_b.png"),
      none: ICON_EMPTY,
    },
    black: {
      long: require("assets/avatar/back-hair/icon_backhair_black_a.png"),
      short: require("assets/avatar/back-hair/icon_backhair_black_b.png"),
      none: ICON_EMPTY,
    },
    yellow: {
      long: require("assets/avatar/back-hair/icon_backhair_yellow_a.png"),
      short: require("assets/avatar/back-hair/icon_backhair_yellow_b.png"),
      none: ICON_EMPTY,
    },
  },
  faceHair: {
    red: {
      moustache: require("assets/avatar/facial-hair/icon_facialhair_red_moustache.png"),
      // beard: require("assets/avatar/facial-hair/icon_facialhair_red_beard.png"),
      beard: 0,
      both: require("assets/avatar/facial-hair/icon_facialhair_red_both.png"),
      none: ICON_EMPTY,
    },
    darkBlond: {
      moustache: require("assets/avatar/facial-hair/icon_facialhair_brown_moustache.png"),
      // beard: require("assets/avatar/facial-hair/icon_facialhair_brown_beard.png"),
      beard: 0,
      both: require("assets/avatar/facial-hair/icon_facialhair_brown_both.png"),
      none: ICON_EMPTY,
    },
    black: {
      moustache: require("assets/avatar/facial-hair/icon_facialhair_black_moustache.png"),
      // beard: require("assets/avatar/facial-hair/icon_facialhair_black_beard.png"),
      beard: 0,
      both: require("assets/avatar/facial-hair/icon_facialhair_black_both.png"),
      none: ICON_EMPTY,
    },
    yellow: {
      moustache: require("assets/avatar/facial-hair/icon_facialhair_yellow_moustache.png"),
      // beard: require("assets/avatar/facial-hair/icon_facialhair_yellow_beard.png"),
      beard: 0,
      both: require("assets/avatar/facial-hair/icon_facialhair_yellow_both.png"),
      none: ICON_EMPTY,
    },
  },
  glasses: {
    red: require("assets/avatar/glasses/icon_glasses_red.png"),
    purple: require("assets/avatar/glasses/icon_glasses_purple.png"),
    blue: require("assets/avatar/glasses/icon_glasses_blue.png"),
    green: require("assets/avatar/glasses/icon_glasses_green.png"),
    none: ICON_EMPTY,
  },
  background: {
    pink: "#F0ADB9",
    blue: "#9ECED9",
    green: "#A3C7AD",
    purple: "#D2B7F6",
    yellow: "#E8DEC4",
  },
};

export const AVATAR_BASE_ONBODY = {
  base: {
    slim: {
      peach: require("assets/avatar/base/slim/base_slim_peach.png"),
      lightBrown: require("assets/avatar/base/slim/base_slim_lightbrown.png"),
      mediumBrown: require("assets/avatar/base/slim/base_slim_mediumbrown.png"),
      darkBrown: require("assets/avatar/base/slim/base_slim_darkbrown.png"),
      clothes: require("assets/avatar/base/slim/onbody_slim_clothes.png"),
    },
    broad: {
      // temporarily use the slim sprites as we don't have the broad ones rn
      peach: require("assets/avatar/base/slim/base_slim_peach.png"),
      lightBrown: require("assets/avatar/base/slim/base_slim_lightbrown.png"),
      mediumBrown: require("assets/avatar/base/slim/base_slim_mediumbrown.png"),
      darkBrown: require("assets/avatar/base/slim/base_slim_darkbrown.png"),
      clothes: require("assets/avatar/base/slim/onbody_slim_clothes.png"),
    },
  },
  frontHair: {
    red: {
      a: require("assets/avatar/front-hair/onbody_fronthair_red_a.png"),
      b: require("assets/avatar/front-hair/onbody_fronthair_red_b.png"),
      none: ONBODY_EMPTY,
    },
    darkBlond: {
      a: require("assets/avatar/front-hair/onbody_fronthair_brown_a.png"),
      b: require("assets/avatar/front-hair/onbody_fronthair_brown_b.png"),
      none: ONBODY_EMPTY,
    },
    black: {
      a: require("assets/avatar/front-hair/onbody_fronthair_black_a.png"),
      b: require("assets/avatar/front-hair/onbody_fronthair_black_b.png"),
      none: ONBODY_EMPTY,
    },
    yellow: {
      a: require("assets/avatar/front-hair/onbody_fronthair_yellow_a.png"),
      b: require("assets/avatar/front-hair/onbody_fronthair_yellow_b.png"),
      none: ONBODY_EMPTY,
    },
  },
  backHair: {
    red: {
      long: require("assets/avatar/back-hair/onbody_backhair_red_a.png"),
      short: require("assets/avatar/back-hair/onbody_backhair_red_b.png"),
      none: ONBODY_EMPTY,
    },
    darkBlond: {
      long: require("assets/avatar/back-hair/onbody_backhair_brown_a.png"),
      short: require("assets/avatar/back-hair/onbody_backhair_brown_b.png"),
      none: ONBODY_EMPTY,
    },
    black: {
      long: require("assets/avatar/back-hair/onbody_backhair_black_a.png"),
      short: require("assets/avatar/back-hair/onbody_backhair_black_b.png"),
      none: ONBODY_EMPTY,
    },
    yellow: {
      long: require("assets/avatar/back-hair/onbody_backhair_yellow_a.png"),
      short: require("assets/avatar/back-hair/onbody_backhair_yellow_b.png"),
      none: ONBODY_EMPTY,
    },
  },
  faceHair: {
    red: {
      moustache: require("assets/avatar/facial-hair/onbody_facialhair_red_moustache.png"),
      beard: require("assets/avatar/facial-hair/onbody_facialhair_red_beard.png"),
      both: require("assets/avatar/facial-hair/onbody_facialhair_red_both.png"),
      none: ONBODY_EMPTY,
    },
    darkBlond: {
      moustache: require("assets/avatar/facial-hair/onbody_facialhair_brown_moustache.png"),
      beard: require("assets/avatar/facial-hair/onbody_facialhair_brown_beard.png"),
      both: require("assets/avatar/facial-hair/onbody_facialhair_brown_both.png"),
      none: ONBODY_EMPTY,
    },
    black: {
      moustache: require("assets/avatar/facial-hair/onbody_facialhair_black_moustache.png"),
      beard: require("assets/avatar/facial-hair/onbody_facialhair_black_beard.png"),
      both: require("assets/avatar/facial-hair/onbody_facialhair_black_both.png"),
      none: ONBODY_EMPTY,
    },
    yellow: {
      moustache: require("assets/avatar/facial-hair/onbody_facialhair_yellow_moustache.png"),
      beard: require("assets/avatar/facial-hair/onbody_facialhair_yellow_beard.png"),
      both: require("assets/avatar/facial-hair/onbody_facialhair_yellow_both.png"),
      none: ONBODY_EMPTY,
    },
  },
  glasses: {
    red: require("assets/avatar/glasses/onbody_glasses_red.png"),
    purple: require("assets/avatar/glasses/onbody_glasses_purple.png"),
    blue: require("assets/avatar/glasses/onbody_glasses_blue.png"),
    green: require("assets/avatar/glasses/onbody_glasses_green.png"),
    none: ONBODY_EMPTY,
  },
  background: {
    pink: "#F0ADB9",
    blue: "#9ECED9",
    green: "#A3C7AD",
    purple: "#D2B7F6",
    yellow: "#E8DEC4",
  },
};

export const AVATAR_BASE_OPTIONS = {
  skinColor: Object.keys(AVATAR_BASE_ICONS.skinColor) as SkinColor[],
  hairColor: Object.keys(AVATAR_BASE_ICONS.hairColor) as HairColor[],
  frontHair: Object.keys(AVATAR_BASE_ICONS.frontHair.red) as FrontHair[],
  backHair: Object.keys(AVATAR_BASE_ICONS.backHair.red) as BackHair[],
  facialHair: Object.keys(AVATAR_BASE_ICONS.faceHair.red) as FacialHair[],
  glasses: Object.keys(AVATAR_BASE_ICONS.glasses) as GlassesColor[],
  background: Object.keys(AVATAR_BASE_ICONS.background) as BackgroundColor[],
};
