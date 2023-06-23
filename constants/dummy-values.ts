/**
 * Placeholder values for testing/development purposes
 */

import { doc } from "firebase/firestore";

import { collections as DB } from "constants/db";
import { db } from "src/firebase-init";
import Exercise from "src/fitness-tracker/exercise/Exercise";
import ExerciseTemplate from "src/fitness-tracker/exercise/ExerciseTemplate";
import WorkoutPreset from "src/fitness-tracker/workout/presets/WorkoutPreset";
import Workout from "src/fitness-tracker/workout/Workout";
import Avatar from "src/rpg/avatar/Avatar";
import AppSettings from "src/settings/AppSettings";
import { UserCharacter } from "src/user/character/UserCharacter";
import { UserFitnessTracker } from "src/user/fitness-tracker/UserFitnessTracker";
import { User } from "src/user/User";

/** Dummy exercise template. */
export const DUMMY_EXERCISE_TEMPLATE_1 = new ExerciseTemplate(
  "Bench Press",
  "Chest",
  "yeahhhh",
);
/** Dummy exercise template. */
export const DUMMY_EXERCISE_TEMPLATE_2 = new ExerciseTemplate(
  "Box Squat",
  "Legs",
  "ya",
);
/** Dummy exercise template. */
export const DUMMY_EXERCISE_TEMPLATE_3 = new ExerciseTemplate(
  "Deadlift",
  "Legs",
  "yup",
);

/** Dummy exercise instance. */
export const DUMMY_EXERCISE_1A = new Exercise(DUMMY_EXERCISE_TEMPLATE_1, []);
/** Dummy exercise instance. */
export const DUMMY_EXERCISE_1B = new Exercise(DUMMY_EXERCISE_TEMPLATE_1, []);
/** Dummy exercise instance. */
export const DUMMY_EXERCISE_2 = new Exercise(DUMMY_EXERCISE_TEMPLATE_2, []);
/** Dummy exercise instance. */
export const DUMMY_EXERCISE_3 = new Exercise(DUMMY_EXERCISE_TEMPLATE_3, []);

/** Dummy workout preset. */
export const DUMMY_WORKOUT_PRESET_A = new WorkoutPreset(
  "every day",
  "nope no legs",
  [
    DUMMY_EXERCISE_1A,
    DUMMY_EXERCISE_1B,
    DUMMY_EXERCISE_1B,
    DUMMY_EXERCISE_1B,
    DUMMY_EXERCISE_1B,
    DUMMY_EXERCISE_1B,
    DUMMY_EXERCISE_1B,
    DUMMY_EXERCISE_1B,
    DUMMY_EXERCISE_1B,
    DUMMY_EXERCISE_1B,
  ],
  new Date(1687276324742),
);
/** Dummy workout preset. */
export const DUMMY_WORKOUT_PRESET_B = new WorkoutPreset(
  "leg day :(",
  "sike",
  [DUMMY_EXERCISE_2, DUMMY_EXERCISE_3],
  new Date(1110000000000),
);

/** Dummy workout preset. */
export const DUMMY_WORKOUT_PRESET_C = new WorkoutPreset(
  "example",
  "placeholder",
  [DUMMY_EXERCISE_2],
  new Date(0),
);

export const DUMMY_WORKOUT_1 = new Workout(
  new Date(1676400780236),
  new Date(1676400780236),
  [DUMMY_EXERCISE_1A],
);

export const DUMMY_WORKOUT_2 = new Workout(
  new Date(1687000000000),
  new Date(1687000000000),
  [DUMMY_EXERCISE_2],
);

export const DUMMY_WORKOUT_3A = new Workout(
  new Date(1686400780236),
  new Date(1686400780236),
  [DUMMY_EXERCISE_2],
);

export const DUMMY_WORKOUT_3B = new Workout(
  new Date(1686400780236),
  new Date(1686400780236),
  [DUMMY_EXERCISE_2],
);

export const DUMMY_WORKOUT_TODAY = new Workout(new Date(), new Date(), [
  DUMMY_EXERCISE_3,
]);

/** Dummy user fitness. */
export const DUMMY_FITNESS = new UserFitnessTracker(
  doc(db, DB.userFitness, "jim-bro"),
  [DUMMY_WORKOUT_1, DUMMY_WORKOUT_2, DUMMY_WORKOUT_3A, DUMMY_WORKOUT_3B],
  [DUMMY_WORKOUT_PRESET_A, DUMMY_WORKOUT_PRESET_B, DUMMY_WORKOUT_PRESET_C],
  [],
  [],
);

/** Dummy user character. */
export const DUMMY_CHAR = new UserCharacter(
  doc(db, DB.userCharacter, "jim-bro"),
  "Jim Bro",
  "Married to the grind",
  4444,
  6666,
  123,
  Avatar.DEFAULT,
);

/** Dummy user. */
export const DUMMY_USER = new User(
  "jim-bro",
  "jimbro",
  "jimbro@example.com",
  DUMMY_FITNESS,
  DUMMY_CHAR,
  AppSettings.default(),
);
