import { endOfDay, Interval, isWithinInterval, startOfDay } from "date-fns";
import {
  and,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  setDoc,
  SnapshotOptions,
  updateDoc,
  where,
} from "firebase/firestore";

import { collections as DB } from "constants/db";
import { DATE_MAX, DATE_MIN } from "constants/misc";
import { STARTER_EXERCISES } from "constants/workout";
import { db } from "src/firebase-init";
import ExerciseTemplate, {
  exerciseTemplateConverter,
} from "src/fitness-tracker/exercise/ExerciseTemplate";
import WorkoutRoutine from "src/fitness-tracker/routine/WorkoutRoutine";
import WorkoutPreset, {
  workoutPresetConverter,
} from "src/fitness-tracker/workout/presets/WorkoutPreset";
import Workout, { workoutConverter } from "src/fitness-tracker/workout/Workout";

/**
 * User fitness (workouts, custom exercises) data.
 */
export class UserFitnessTracker {
  readonly ref: DocumentReference;
  workouts: Workout[];
  workoutRoutines: WorkoutRoutine[];
  exerciseTemplatesRef: CollectionReference;
  exerciseTemplates: ExerciseTemplate[];
  mostRecentWorkout: Workout | null;
  workoutsRef: CollectionReference;
  workoutPresetsRef: CollectionReference;

  constructor(
    ref: DocumentReference,
    workouts: Workout[],
    workoutPresets: WorkoutPreset[],
    workoutRoutines: WorkoutRoutine[],
    exerciseTemplates: ExerciseTemplate[],
    exerciseTemplatesRefs: DocumentReference[],
    mostRecentWorkout: Workout | null,
  ) {
    this.ref = ref;
    this.workouts = workouts;
    this.workoutRoutines = workoutRoutines;
    this.exerciseTemplates = exerciseTemplates;
    this.mostRecentWorkout = mostRecentWorkout;
    this.workoutsRef = collection(db, this.ref.path, "workouts").withConverter(
      workoutConverter,
    );
    this.workoutPresetsRef = collection(
      db,
      this.ref.path,
      "workoutPresets",
    ).withConverter(workoutPresetConverter);
    this.exerciseTemplatesRef = collection(
      db,
      this.ref.path,
      "exerciseTemplates",
    ).withConverter(exerciseTemplateConverter);
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
   * Creates new base fitness tracker and uploads to Firestore.
   * @param id UID returned by Firebase Authentication.
   * @returns Created fitness tracker.
   */
  static async create(id: string): Promise<UserFitnessTracker> {
    const ref = doc(db, DB.userFitness, id).withConverter(
      fitnessTrackerConverter,
    );
    const defaultTemplates = await Promise.all(
      STARTER_EXERCISES.map(
        async ({ name, category, notes }) =>
          await ExerciseTemplate.create(name, category, notes, id),
      ),
    );
    const userFitnessTracker = new UserFitnessTracker(
      ref,
      [],
      [],
      [],
      defaultTemplates,
      defaultTemplates.map((template) => template.ref),
      null,
    );
    await setDoc(ref, userFitnessTracker);
    return userFitnessTracker;
  }

  /**
   * Gets exercise instances from Firestore.
   * @returns Exercise templates
   */
  public async getExerciseTemplates(): Promise<ExerciseTemplate[]> {
    const snapshot = await getDocs(this.exerciseTemplatesRef);
    const templates: ExerciseTemplate[] = [];
    snapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      templates.push(doc.data() as ExerciseTemplate);
    });
    return templates;
  }

  /**
   * Adds new workout to user data.
   */
  public async addWorkout(workout: Workout) {
    this.workouts.push(workout);
    this.mostRecentWorkout = workout;
    // ! no longer use the field to track most recent. use sorted query instead
    // updateDoc(this.ref, { mostRecentWorkout: this.mostRecentWorkout.ref });
  }

  /**
   * Gets most recent workout.
   */
  public async getMostRecentWorkout(): Promise<Workout | null> {
    const snapshot = await getDocs(
      query(this.workoutsRef, orderBy("endDateTime", "desc"), limit(1)),
    );
    const workouts: Workout[] = [];
    snapshot.forEach((snap) => {
      workouts.push(snap.data() as Workout);
    });
    return workouts.at(0) ?? null;
  }

  /**
   * Updates workouts from Firestore.
   */
  public async getAllWorkouts(): Promise<Workout[]> {
    const snapshot = await getDocs(this.workoutsRef);
    this.workouts = snapshot.docs.map((snap) => snap.data() as Workout);
    return this.workouts;
  }

  /**
   * Gets number of completed workouts total.
   */
  public async numberOfWorkouts(): Promise<number> {
    const snapshot = await getCountFromServer(this.workoutsRef);
    return snapshot.data().count;
  }

  public async allWorkoutsInDateInterval(
    interval: Interval,
  ): Promise<Workout[]> {
    const snapshot = await getDocs(
      query(
        this.workoutsRef,
        and(
          where("startDateTime", ">=", interval.start),
          where("startDateTime", "<=", interval.end),
        ),
        orderBy("startDateTime"),
      ),
    );
    const workouts: Workout[] = [];
    snapshot.forEach((snap) => {
      workouts.push(snap.data() as Workout);
    });
    return workouts;
  }

  /**
   * Gets workouts starting on specified date.
   * @param date Date to check
   * @returns Array of workouts on specified date.
   */
  public async getWorkoutsWithDate(date: Date): Promise<Workout[]> {
    const interval: Interval = {
      start: startOfDay(date),
      end: endOfDay(date),
    };
    return await this.allWorkoutsInDateInterval(interval);
  }

  /**
   * Checks the number of workouts on the specified day of the date.
   * @param date Date to check
   * @returns Number of workouts on given date
   */
  public async numWorkoutsOnDate(date: Date): Promise<number> {
    const snapshot = await getCountFromServer(
      query(
        this.workoutsRef,
        and(
          where("startDateTime", ">=", startOfDay(date)),
          where("startDateTime", "<=", endOfDay(date)),
        ),
        orderBy("startDateTime", "asc"),
      ),
    );
    return snapshot.data().count;
  }

  /**
   * Gets previous workout ordered by date.
   * @param date Date to check
   * @returns Most recent workout before the given start datetime, or undefined if nonexistent.
   */
  public async getPreviousWorkout(date: Date): Promise<Workout | undefined> {
    const snapshot = await getDocs(
      query(
        this.workoutsRef,
        where("startDateTime", "<=", date),
        orderBy("startDateTime", "desc"),
        limit(1),
      ),
    );
    const workouts: Workout[] = [];
    snapshot.forEach((snap) => {
      workouts.push(snap.data() as Workout);
    });
    return workouts.at(0);
  }

  /**
   * Gets next workout ordered by date.
   * @param date Date to check
   * @returns Next closest workout after the given start datetime, or undefined if nonexistent.
   */
  public async getNextWorkout(date: Date): Promise<Workout | undefined> {
    const snapshot = await getDocs(
      query(
        this.workoutsRef,
        where("startDateTime", ">=", date),
        orderBy("startDateTime"),
        limit(1),
      ),
    );
    const workouts: Workout[] = [];
    snapshot.forEach((snap) => {
      workouts.push(snap.data() as Workout);
    });
    return workouts.at(0);
  }

  /** Gets workout presets from firebase. */
  public async getWorkoutPresets(): Promise<WorkoutPreset[]> {
    const snapshot = await getDocs(
      this.workoutPresetsRef.withConverter(workoutPresetConverter),
    );
    const presets: WorkoutPreset[] = [];
    snapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      presets.push(doc.data() as WorkoutPreset);
    });
    return presets;
  }
}

export const fitnessTrackerConverter: FirestoreDataConverter<UserFitnessTracker> =
  {
    toFirestore(fitnessTracker: UserFitnessTracker): DocumentData {
      const data: UserFitnessTrackerData = {
        mostRecentWorkout: fitnessTracker.mostRecentWorkout?.ref || null,
      };
      return data;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions,
    ): UserFitnessTracker {
      // Data from QueryDocumentSnapshot will never return undefined.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const data = snapshot.data(options)! as UserFitnessTrackerData;
      // dont use as cant recursively get data :(
      return new UserFitnessTracker(snapshot.ref, [], [], [], [], [], null);
    },
  };

export type UserFitnessTrackerData = {
  mostRecentWorkout: DocumentReference | null;
};
