/**
 * Placeholder values for testing/development purposes
 */

import { doc } from "firebase/firestore";

import { collections as DB } from "constants/db";
import { db } from "src/firebase-init";
import Avatar from "src/rpg/avatar/Avatar";
import AvatarBase from "src/rpg/avatar/AvatarBase";
import AvatarEquipment from "src/rpg/avatar/AvatarEquipment";
import AppSettings from "src/settings/AppSettings";
import { UserCharacter } from "src/user/character/UserCharacter";
import { UserFitnessTracker } from "src/user/fitness-tracker/UserFitnessTracker";
import { User } from "src/user/User";

/** Dummy avatar base. */
export const DUMMY_AVATAR_BASE = new AvatarBase(
  "slim",
  "a",
  "red",
  "a",
  "a",
  "b",
  "purple",
  "#444333",
);
/** Dummy avatar equipment. */
export const DUMMY_AVATAR_EQUIPMENT = AvatarEquipment.DEFAULT;
/** Dummy avatar. */
export const DUMMY_AVATAR = new Avatar(
  DUMMY_AVATAR_BASE,
  DUMMY_AVATAR_EQUIPMENT,
);
/** Dummy account. */
export const DUMMY_FITNESS = new UserFitnessTracker(
  doc(db, DB.userFitness, "jim-bro"),
);

export const DUMMY_CHAR = new UserCharacter(
  doc(db, DB.userCharacter, "jim-bro"),
  "Jim Bro",
  "Married to the grind",
  4444,
  3333,
  323,
  123,
  Avatar.DEFAULT,
  [],
  null,
  null,
);

export const DUMMY_USER = new User(
  "jim-bro",
  "jimbro",
  "jimbro@example.com",
  DUMMY_FITNESS,
  DUMMY_CHAR,
  AppSettings.default(),
);
