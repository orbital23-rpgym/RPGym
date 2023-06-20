/**
 * Placeholder values for testing/development purposes
 */

import { doc } from "firebase/firestore";

import { collections as DB } from "constants/db";
import { db } from "src/firebase-init";
import Avatar from "src/rpg/avatar/Avatar";
import AppSettings from "src/settings/AppSettings";
import { UserCharacter } from "src/user/character/UserCharacter";
import { UserFitnessTracker } from "src/user/fitness-tracker/UserFitnessTracker";
import { User } from "src/user/User";

/** Dummy account. */
export const DUMMY_FITNESS = new UserFitnessTracker(
  doc(db, DB.userFitness, "jim-bro"),
);

export const DUMMY_CHAR = new UserCharacter(
  doc(db, DB.userCharacter, "jim-bro"),
  "Jim Bro",
  "Married to the grind",
  4444,
  6666,
  123,
  Avatar.DEFAULT,
);

export const DUMMY_USER = new User(
  "jim-bro",
  "jimbro",
  "jimbro@example.com",
  DUMMY_FITNESS,
  DUMMY_CHAR,
  AppSettings.default(),
);
