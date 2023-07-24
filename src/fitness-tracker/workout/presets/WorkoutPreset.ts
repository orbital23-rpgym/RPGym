import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  setDoc,
  SnapshotOptions,
  Timestamp,
} from "firebase/firestore";

import Exercise, { ExerciseData } from "../../exercise/Exercise";

import { collections as DB } from "constants/db";
import { db } from "src/firebase-init";

/**
 * Workout preset.
 */
export default class WorkoutPreset {
  readonly ref: DocumentReference;
  name: string;
  description: string;
  lastUsed: Date | null;
  #exerciseData: ExerciseData[] | undefined;
  #exercises: Exercise[] | undefined;

  constructor(
    ref: DocumentReference,
    exercises: Exercise[] | undefined,
    exerciseData: ExerciseData[] | undefined,
    name: string,
    description: string,
    lastUsed: Date | null,
  ) {
    this.ref = ref;
    this.name = name;
    this.description = description;
    this.lastUsed = lastUsed;

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
   * Create new workout preset and upload to Firestore.
   */
  static async create(
    name: string,
    description: string,
    lastUsed: Date | null,
    exerciseData: ExerciseData[],
    userId: string,
  ): Promise<WorkoutPreset> {
    const workoutPresetData: WorkoutPresetData = {
      name: name,
      description: description,
      lastUsed: lastUsed ? Timestamp.fromDate(lastUsed) : lastUsed,
      exercises: exerciseData,
    };
    const ref = await addDoc(
      collection(db, DB.userFitness, userId, "workoutPresets"),
      workoutPresetData,
    );
    const exercises = await Promise.all(
      workoutPresetData.exercises.map((data) => Exercise.fromData(data)),
    );
    const workout = new WorkoutPreset(
      ref,
      exercises,
      exerciseData,
      workoutPresetData.name,
      workoutPresetData.description,
      lastUsed,
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

  public async setLastUsed(lastUsed: Date) {
    this.lastUsed = lastUsed;
    await setDoc(this.ref.withConverter(workoutPresetConverter), this);
  }

  public toData(): WorkoutPresetData {
    const data: WorkoutPresetData = {
      name: this.name,
      description: this.description,
      lastUsed: Timestamp.fromDate(this.lastUsed),
      exercises: this.getExerciseData(),
    };
    return data;
  }

  static fromData(
    data: WorkoutPresetData,
    ref: DocumentReference,
  ): WorkoutPreset {
    return new WorkoutPreset(
      ref,
      undefined,
      data.exercises,
      data.name,
      data.description,
      data.lastUsed?.toDate(),
    );
  }
}

/**
 * Firestore data converter for WorkoutPreset.
 */
export const workoutPresetConverter: FirestoreDataConverter<WorkoutPreset> = {
  toFirestore(workoutPreset: WorkoutPreset): DocumentData {
    return workoutPreset.toData();
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): WorkoutPreset {
    // Data from QueryDocumentSnapshot will never return undefined.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const data = snapshot.data(options)! as WorkoutPresetData;
    return WorkoutPreset.fromData(data, snapshot.ref);
  },
};

export type WorkoutPresetData = {
  name: string;
  description: string;
  lastUsed: Timestamp | null;
  exercises: ExerciseData[];
};
