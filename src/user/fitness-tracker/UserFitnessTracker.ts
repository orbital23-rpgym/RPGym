import {
  doc,
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  getDoc,
  QueryDocumentSnapshot,
  setDoc,
  SnapshotOptions,
} from "firebase/firestore";

import { collections as DB } from "constants/db";
import { db } from "src/firebase-init";
import ExerciseTemplate from "src/fitness-tracker/exercise/ExerciseTemplate";
import WorkoutRoutine from "src/fitness-tracker/routine/WorkoutRoutine";
import WorkoutPreset from "src/fitness-tracker/workout/presets/WorkoutPreset";
import Workout from "src/fitness-tracker/workout/Workout";

/**
 * User fitness (workouts, custom exercises) data.
 */
export class UserFitnessTracker {
  readonly ref: DocumentReference;
  workouts: Workout[];
  workoutPresets: WorkoutPreset[];
  workoutRoutines: WorkoutRoutine[];
  customExercises: ExerciseTemplate[];

  constructor(
    ref: DocumentReference,
    workouts: Workout[],
    workoutPresets: WorkoutPreset[],
    workoutRoutines: WorkoutRoutine[],
    customExercises: ExerciseTemplate[],
  ) {
    this.ref = ref;
    this.workouts = workouts;
    this.workoutPresets = workoutPresets;
    this.workoutRoutines = workoutRoutines;
    this.customExercises = customExercises;
  }

  /**
   * Gets fitness data from Firestore of user with specified ID.
   * @param id User UID.
   * @returns User fitness data
   * @throws Error if user with specified ID not found.
   */
  static async fromId(id: string): Promise<UserFitnessTracker> {
    const d = await getDoc(
      doc(db, DB.userFitness, id).withConverter(fitnessTrackerConverter),
    );
    if (d.exists()) {
      return d.data() as UserFitnessTracker;
    } else {
      throw Error("User not found");
    }
  }

  /**
   * Creates new blank fitness tracker and uploads to Firestore.
   * @param id UID returned by Firebase Authentication.
   * @returns Created fitness tracker.
   */
  static async create(id: string): Promise<UserFitnessTracker> {
    const ref = doc(db, DB.userFitness, id).withConverter(
      fitnessTrackerConverter,
    );
    const userFitnessTracker = new UserFitnessTracker(ref, [], [], [], []);
    await setDoc(ref, userFitnessTracker);
    return userFitnessTracker;
  }
}

export const fitnessTrackerConverter: FirestoreDataConverter<UserFitnessTracker> =
  {
    toFirestore(fitnessTracker: UserFitnessTracker): DocumentData {
      return {};
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions,
    ): UserFitnessTracker {
      // Data from QueryDocumentSnapshot will never return undefined.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const data = snapshot.data(options)!;
      return new UserFitnessTracker(snapshot.ref, [], [], [], []);
    },
  };
