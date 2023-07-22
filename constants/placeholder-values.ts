/**
 * Placeholder user to show when real user data is not loaded yet.
 */

import { doc } from "firebase/firestore";

import { collections as DB } from "constants/db";
import { db } from "src/firebase-init";
import Avatar from "src/rpg/avatar/Avatar";
import AppSettings from "src/settings/AppSettings";
import { UserCharacter } from "src/user/character/UserCharacter";
import { UserFitnessTracker } from "src/user/fitness-tracker/UserFitnessTracker";
import { User } from "src/user/User";

/**
 * Placeholder user ID.
 */
const PLACEHOLDER_DOCUMENT_REF = doc(db, "rpgym/placeholder");

/************************/
/*   Fitness tracking   */
/************************/

/** Dummy user fitness. */
export const PLACEHOLDER_FITNESS = new UserFitnessTracker(
  PLACEHOLDER_DOCUMENT_REF,
  [],
  [],
  [],
  [],
  [],
  null,
);

/************************/
/*   Profile/game data  */
/************************/

/** Dummy user character. */
export const PLACEHOLDER_CHAR = new UserCharacter(
  doc(db, DB.userCharacter, "jim-bro"),
  "Loading...",
  "",
  0,
  0,
  0,
  0,
  Avatar.DEFAULT,
  [],
  null,
  null,
);

/************************/
/* Overall user account */
/************************/

/** Dummy user. */
export const PLACEHOLDER_USER = new User(
  "loading",
  "loading",
  "loading@example.com",
  PLACEHOLDER_FITNESS,
  PLACEHOLDER_CHAR,
  AppSettings.default(),
  false,
);
