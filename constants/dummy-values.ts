/**
 * Dummy values for testing/development purposes.
 * Dummy refs are mostly used.
 * Will probably break if requests are made using dummy refs.
 * TODO: move dummy data to firebase or make local things work without fb.
 */

import { doc } from "firebase/firestore";

import { collections as DB } from "constants/db";
import { db } from "src/firebase-init";
import Exercise from "src/fitness-tracker/exercise/Exercise";
import ExerciseTemplate from "src/fitness-tracker/exercise/ExerciseTemplate";
import WorkoutPreset from "src/fitness-tracker/workout/presets/WorkoutPreset";
import Workout from "src/fitness-tracker/workout/Workout";
import Avatar from "src/rpg/avatar/Avatar";
import AvatarBase from "src/rpg/avatar/AvatarBase";
import AvatarEquipment from "src/rpg/avatar/AvatarEquipment";
import AppSettings from "src/settings/AppSettings";
import { UserCharacter } from "src/user/character/UserCharacter";
import { UserFitnessTracker } from "src/user/fitness-tracker/UserFitnessTracker";
import { User } from "src/user/User";

/**
 * Dummy user ID.
 */
const DUMMY_USERID = "jim-bro";
const DUMMY_DOCUMENT_REF = doc(db, "rpgym/dummy");

/************************/
/*   Fitness tracking   */
/************************/

/**
 * Default exercise templates for users
 */
export const DUMMY_DEFAULT_EXERCISE_TEMPLATES: ExerciseTemplate[] = [
  new ExerciseTemplate(
    doc(
      db,
      DB.userFitness,
      "rpgym",
      "exerciseTemplates",
      "3K08HbRis62QJShkctvV",
    ),
    "Bench Press",
    "Chest",
    "",
  ),
  new ExerciseTemplate(
    doc(
      db,
      DB.userFitness,
      "rpgym",
      "exerciseTemplates",
      "6zb9vUTOrbzPhIV2r6Op",
    ),
    "Squat",
    "Legs",
    "",
  ),
  new ExerciseTemplate(
    doc(
      db,
      DB.userFitness,
      "rpgym",
      "exerciseTemplates",
      "RDHAACz6XiPgArjT2T2G",
    ),
    "Deadlift",
    "Legs",
    "",
  ),
  new ExerciseTemplate(
    doc(
      db,
      DB.userFitness,
      "rpgym",
      "exerciseTemplates",
      "POc6oE69x3aOi1E3DPlw",
    ),
    "Lat Pulldown",
    "Back",
    "",
  ),
  new ExerciseTemplate(
    doc(
      db,
      DB.userFitness,
      "rpgym",
      "exerciseTemplates",
      "zgnROZXL8oMzZLVv96ia",
    ),
    "Cable Row",
    "Back",
    "",
  ),
  new ExerciseTemplate(
    doc(
      db,
      DB.userFitness,
      "rpgym",
      "exerciseTemplates",
      "5SfREfphygEVIumz3v69",
    ),
    "Bicep Curl",
    "Bicep",
    "",
  ),
  new ExerciseTemplate(
    doc(
      db,
      DB.userFitness,
      "rpgym",
      "exerciseTemplates",
      "cysgSoKg3cEjPEUC0UXu",
    ),
    "Tricep Extension",
    "Tricep",
    "",
  ),
  new ExerciseTemplate(
    doc(
      db,
      DB.userFitness,
      "rpgym",
      "exerciseTemplates",
      "eUcJMQHCXUP6IvxLu5Uh",
    ),
    "Lateral Raise",
    "Shoulder",
    "",
  ),
];

/** Dummy exercise template. */
export const DUMMY_EXERCISE_TEMPLATE_1 = new ExerciseTemplate(
  DUMMY_DOCUMENT_REF,
  "Bench Press",
  "Chest",
  "yeahhhh",
);
/** Dummy exercise template. */
export const DUMMY_EXERCISE_TEMPLATE_2 = new ExerciseTemplate(
  DUMMY_DOCUMENT_REF,
  "Box Squat",
  "Legs",
  "ya",
);
/** Dummy exercise template. */
export const DUMMY_EXERCISE_TEMPLATE_3 = new ExerciseTemplate(
  DUMMY_DOCUMENT_REF,
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
  DUMMY_DOCUMENT_REF,
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
  undefined,
  "every day",
  "nope no legs",
  new Date(1687276324742),
);
/** Dummy workout preset. */
export const DUMMY_WORKOUT_PRESET_B = new WorkoutPreset(
  DUMMY_DOCUMENT_REF,
  [DUMMY_EXERCISE_2, DUMMY_EXERCISE_3],
  undefined,
  "leg day :(",
  "sike",
  new Date(1110000000000),
);

/** Dummy workout preset. */
export const DUMMY_WORKOUT_PRESET_C = new WorkoutPreset(
  DUMMY_DOCUMENT_REF,
  [DUMMY_EXERCISE_2],
  undefined,
  "example",
  "placeholder",
  new Date(0),
);

export const DUMMY_WORKOUT_1 = new Workout(
  DUMMY_DOCUMENT_REF,
  new Date(1676400780236),
  new Date(1676400780236),
  [DUMMY_EXERCISE_1A],
  undefined,
);

export const DUMMY_WORKOUT_2 = new Workout(
  DUMMY_DOCUMENT_REF,
  new Date(1687000000000),
  new Date(1687000000000),
  [DUMMY_EXERCISE_2],
  undefined,
);

export const DUMMY_WORKOUT_3A = new Workout(
  DUMMY_DOCUMENT_REF,
  new Date(1686400780235),
  new Date(1686400780235),
  [DUMMY_EXERCISE_2],
  undefined,
);

export const DUMMY_WORKOUT_3B = new Workout(
  DUMMY_DOCUMENT_REF,
  new Date(1686400780236),
  new Date(1686400780236),
  [DUMMY_EXERCISE_3],
  undefined,
);

export const DUMMY_WORKOUT_TODAY = new Workout(
  DUMMY_DOCUMENT_REF,
  new Date(),
  new Date(),
  [DUMMY_EXERCISE_3],
  undefined,
);

/** Dummy user fitness. */
export const DUMMY_FITNESS = new UserFitnessTracker(
  doc(db, DB.userFitness, "jim-bro"),
  [DUMMY_WORKOUT_1, DUMMY_WORKOUT_2, DUMMY_WORKOUT_3A, DUMMY_WORKOUT_3B],
  [DUMMY_WORKOUT_PRESET_A, DUMMY_WORKOUT_PRESET_B, DUMMY_WORKOUT_PRESET_C],
  [],
  [...DUMMY_DEFAULT_EXERCISE_TEMPLATES],
  [],
  DUMMY_WORKOUT_3B,
);

/************************/
/*   Profile/game data  */
/************************/

/** Dummy avatar base. */
export const DUMMY_AVATAR_BASE = new AvatarBase(
  "slim",
  "peach",
  "red",
  "a",
  "long",
  "both",
  "purple",
  "yellow",
);
/** Dummy avatar equipment. */
export const DUMMY_AVATAR_EQUIPMENT = AvatarEquipment.DEFAULT;
/** Dummy avatar. */
export const DUMMY_AVATAR = new Avatar(
  DUMMY_AVATAR_BASE,
  DUMMY_AVATAR_EQUIPMENT,
);

/** Dummy user character. */
export const DUMMY_CHAR = new UserCharacter(
  doc(db, DB.userCharacter, "jim-bro"),
  "Jim Bro",
  "Married to the grind",
  4444,
  3333,
  323,
  123,
  DUMMY_AVATAR,
  [],
  null,
  null,
);

/************************/
/* Overall user account */
/************************/

/** Dummy user. */
export const DUMMY_USER = new User(
  DUMMY_USERID,
  "jimbro",
  "jimbro@example.com",
  DUMMY_FITNESS,
  DUMMY_CHAR,
  AppSettings.default(),
  false,
);
