import { endOfDay, Interval, isWithinInterval, startOfDay } from "date-fns";
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
import { DATE_MAX, DATE_MIN } from "constants/misc";
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

  /**
   * Gets most recent completed workout, or null if nonexistent.
   */
  public async mostRecentWorkout(): Promise<Workout | undefined> {
    return this.workouts[this.workouts.length - 1];
  }

  /**
   * Gets number of completed workouts total.
   */
  public async numberOfWorkouts(): Promise<number> {
    return this.workouts.length;
  }

  public async allWorkoutDates(): Promise<Date[]> {
    return this.workouts.map((workout) => workout.endDateTime);
  }

  public async allWorkoutsInDateInterval(
    interval: Interval,
  ): Promise<Workout[]> {
    /*
    //firebase:
    ref.orderByChild("date").startAt(startDate).endAt(endDate)
      .on("child_added", function(snapshot){
      console.log("got the data!", snapshot);
    });
    */
    return this.workouts.filter((curr, index, arr) =>
      isWithinInterval(curr.startDateTime, interval),
    );
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
    return this.allWorkoutsInDateInterval(interval);
  }

  /**
   * Checks the number of workouts on the specified date.
   * @param date Date to check
   * @returns Number of workouts on given date
   */
  public async numWorkoutsOnDate(date: Date): Promise<number> {
    const interval: Interval = {
      start: startOfDay(date),
      end: endOfDay(date),
    };
    return this.workouts.filter((curr, index, arr) =>
      isWithinInterval(curr.startDateTime, interval),
    ).length;
  }

  /**
   * Gets previous workout ordered by date.
   * @param date Date to check
   * @returns Most recent workout before the given start datetime, or undefined if nonexistent.
   */
  public async getPreviousWorkout(date: Date): Promise<Workout | undefined> {
    const interval: Interval = {
      start: DATE_MIN,
      end: date,
    };
    const pastWorkouts = await this.allWorkoutsInDateInterval(interval);
    if (pastWorkouts.length === 0) return undefined;
    pastWorkouts.sort(Workout.compareByStartDateTimeAsc);
    return pastWorkouts.at(0);
  }

  /**
   * Gets next workout ordered by date.
   * @param date Date to check
   * @returns Next closest workout after the given start datetime, or undefined if nonexistent.
   */
  public async getNextWorkout(date: Date): Promise<Workout | undefined> {
    const interval: Interval = {
      start: date,
      end: DATE_MAX,
    };
    const futureWorkouts = await this.allWorkoutsInDateInterval(interval);
    if (futureWorkouts.length === 0) return undefined;
    futureWorkouts.sort(Workout.compareByStartDateTimeDesc);
    return futureWorkouts.at(0);
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
