import { endOfDay, Interval, isWithinInterval, startOfDay } from "date-fns";
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
  setDoc,
  SnapshotOptions,
  updateDoc,
} from "firebase/firestore";

import { collections as DB } from "constants/db";
import { DATE_MAX, DATE_MIN } from "constants/misc";
import { db } from "src/firebase-init";
import ExerciseTemplate, {
  ExerciseTemplateData,
} from "src/fitness-tracker/exercise/ExerciseTemplate";
import WorkoutRoutine from "src/fitness-tracker/routine/WorkoutRoutine";
import WorkoutPreset from "src/fitness-tracker/workout/presets/WorkoutPreset";
import Workout, { workoutConverter } from "src/fitness-tracker/workout/Workout";

/**
 * User fitness (workouts, custom exercises) data.
 */
export class UserFitnessTracker {
  readonly ref: DocumentReference;
  workouts: Workout[];
  workoutPresets: WorkoutPreset[];
  workoutRoutines: WorkoutRoutine[];
  #exerciseTemplates: ExerciseTemplate[] | undefined;
  #exerciseTemplatesRefs: DocumentReference[];
  mostRecentWorkout: Workout | null;
  workoutsRef: CollectionReference;

  constructor(
    ref: DocumentReference,
    workouts: Workout[],
    workoutPresets: WorkoutPreset[],
    workoutRoutines: WorkoutRoutine[],
    exerciseTemplates: ExerciseTemplate[] | undefined,
    exerciseTemplatesRefs: DocumentReference[],
    mostRecentWorkout: Workout | null,
  ) {
    this.ref = ref;
    this.workouts = workouts;
    this.workoutPresets = workoutPresets;
    this.workoutRoutines = workoutRoutines;
    this.#exerciseTemplates = exerciseTemplates;
    this.#exerciseTemplatesRefs = exerciseTemplatesRefs;
    this.mostRecentWorkout = mostRecentWorkout;
    this.workoutsRef = collection(db, this.ref.path, "workouts").withConverter(
      workoutConverter,
    );
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
    const defaultTemplates = await ExerciseTemplate.getDefaultTemplates();
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
   * Gets exercise instances, or generates it from exercise data if unavailable.
   * @returns Exercise templates
   */
  public async getExerciseTemplates(): Promise<ExerciseTemplate[]> {
    if (!this.#exerciseTemplates) {
      const loadedExerciseTemplates = await Promise.all(
        this.#exerciseTemplatesRefs.map((templateRef) =>
          ExerciseTemplate.fromRef(templateRef),
        ),
      );
      this.#exerciseTemplates = loadedExerciseTemplates;
    }
    return this.#exerciseTemplates as ExerciseTemplate[];
  }

  /**
   * Adds new workout to user data. Also triggers quest progression, if any.
   */
  public async addWorkout(workout: Workout) {
    this.workouts.push(workout);
    this.mostRecentWorkout = workout;
    updateDoc(this.ref, { mostRecentWorkout: this.mostRecentWorkout.ref });

    // TODO: trigger quest/campaign progression.
  }

  /**
   * Updates workouts from Firestore.
   */
  public async pullWorkouts() {
    const snapshot = await getDocs(this.workoutsRef);
    this.workouts = snapshot.docs.map((snap) => snap.data() as Workout);
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
   * Checks the number of workouts on the specified day of the date.
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
    if (pastWorkouts.length === 1) return undefined;
    const hasWorkoutsOnDate = (await this.numWorkoutsOnDate(date)) > 0;
    pastWorkouts.sort(Workout.compareByStartDateTimeDesc);
    return pastWorkouts.at(hasWorkoutsOnDate ? 1 : 0);
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
    if (futureWorkouts.length === 1) return undefined;
    const hasWorkoutsOnDate = (await this.numWorkoutsOnDate(date)) > 0;
    futureWorkouts.sort(Workout.compareByStartDateTimeAsc);
    return futureWorkouts.at(hasWorkoutsOnDate ? 1 : 0);
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
      // TODO
      return new UserFitnessTracker(snapshot.ref, [], [], [], [], [], null);
    },
  };

export type UserFitnessTrackerData = {
  workouts: CollectionReference;
  exerciseTemplates: CollectionReference;
  mostRecentWorkout: DocumentReference;
};
