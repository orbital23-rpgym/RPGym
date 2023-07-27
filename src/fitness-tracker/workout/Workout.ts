import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "firebase/firestore";

import Exercise, { ExerciseData } from "../exercise/Exercise";

import { collections as DB } from "constants/db";
import { db } from "src/firebase-init";

/**
 * Workout.
 */
export default class Workout {
  readonly ref: DocumentReference;
  startDateTime: Date;
  endDateTime: Date;
  #exerciseData: ExerciseData[] | undefined;
  #exercises: Exercise[] | undefined;

  constructor(
    ref: DocumentReference,
    startDateTime: Date,
    endDateTime: Date,
    exercises: Exercise[] | undefined,
    exerciseData: ExerciseData[] | undefined,
  ) {
    this.ref = ref;
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
    this.#exercises = exercises;
    this.#exerciseData = exerciseData;

    if (!exercises) {
      this.getExercises().catch((reason) => {
        throw new Error(`Error retrieving exercise data: ${reason}`);
      });
    }
  }

  /**
   * Gets exercise instances, or generates it from exercise data if unavailable.
   * @returns Exercises
   */
  public async getExercises(): Promise<Exercise[]> {
    if (!this.#exercises && this.#exerciseData) {
      const loadedExercises = await Promise.all(
        this.#exerciseData.map((value) => Exercise.fromData(value)),
      );
      this.#exercises = loadedExercises;
    }
    return this.#exercises as Exercise[];
  }

  /**
   * Gets exercise data, or generates it from exercises if unavailable.
   * @returns Exercises data
   */
  public getExerciseData(): ExerciseData[] {
    if (this.#exercises && !this.#exerciseData) {
      const data = this.#exercises.map((value) => value.toData());
      this.#exerciseData = data;
    }
    return this.#exerciseData as ExerciseData[];
  }

  /**
   * Create new workout and upload to Firestore.
   */
  static async create(
    startDateTime: Date,
    endDateTime: Date,
    exerciseData: ExerciseData[],
    userId: string,
  ): Promise<Workout> {
    const workoutData: WorkoutData = {
      startDateTime: Timestamp.fromDate(startDateTime),
      endDateTime: Timestamp.fromDate(endDateTime),
      exercises: exerciseData,
    };
    const ref = await addDoc(
      collection(db, DB.userFitness, userId, "workouts"),
      workoutData,
    );
    const exercises = await Promise.all(
      workoutData.exercises.map((data) => Exercise.fromData(data)),
    );
    const workout = new Workout(
      ref,
      startDateTime,
      endDateTime,
      exercises,
      exerciseData,
    );
    return workout;
  }

  /**
   * Returns list of exercise names as a comma-separated string.
   */
  public async getExerciseNames(): Promise<string> {
    const mapFn = (exercise: Exercise) => exercise.template.name;
    const exercises = await this.getExercises();
    return exercises.map(mapFn).join(", ");
  }

  public toData(): WorkoutData {
    const data: WorkoutData = {
      startDateTime: Timestamp.fromDate(this.startDateTime),
      endDateTime: Timestamp.fromDate(this.endDateTime),
      exercises: this.getExerciseData(),
    };
    return data;
  }

  static fromData(data: WorkoutData, ref: DocumentReference): Workout {
    return new Workout(
      ref,
      data.startDateTime.toDate(),
      data.endDateTime.toDate(),
      undefined,
      data.exercises,
    );
  }
}

/**
 * Firestore data converter for Workout.
 */
export const workoutConverter: FirestoreDataConverter<Workout> = {
  toFirestore(workout: Workout): DocumentData {
    return workout.toData();
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Workout {
    // Data from QueryDocumentSnapshot will never return undefined.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const data = snapshot.data(options)! as WorkoutData;
    return Workout.fromData(data, snapshot.ref);
  },
};

export type WorkoutData = {
  startDateTime: Timestamp;
  endDateTime: Timestamp;
  exercises: ExerciseData[];
};
