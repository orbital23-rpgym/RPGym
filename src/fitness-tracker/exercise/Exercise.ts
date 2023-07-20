import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

import ExerciseSet, { ExerciseSetData } from "../set/ExerciseSet";
import WeightRepsExerciseSet, {
  WeightRepsExerciseSetData,
} from "../set/WeightRepsExerciseSet";

import ExerciseTemplate, { ExerciseTemplateData } from "./ExerciseTemplate";

/**
 * Recorded exercise.
 */
export default class Exercise {
  #template: ExerciseTemplate | undefined;
  sets: WeightRepsExerciseSet[];

  constructor(
    template: ExerciseTemplate | DocumentReference,
    sets: WeightRepsExerciseSet[],
  ) {
    if (template instanceof ExerciseTemplate) {
      this.#template = template;
    } else {
      ExerciseTemplate.fromRef(template)
        .then((value) => (this.#template = value))
        .catch((reason) => {
          throw new Error(
            `Failed to retrieve exercise template data from Firestore: ${reason}`,
          );
        });
    }
    this.sets = sets;
  }

  get template() {
    if (!this.#template)
      throw new Error(`Failed to retrieve exercise template data.`);
    return this.#template;
  }

  public toData(): ExerciseData {
    return {
      template: this.template.ref,
      sets: this.sets.map((exerciseSet) => exerciseSet.toData()),
    };
  }

  static async fromData(data: ExerciseData): Promise<Exercise> {
    const template = await ExerciseTemplate.fromRef(data.template);
    return new Exercise(
      template,
      data.sets.map((exerciseSet) =>
        WeightRepsExerciseSet.fromData(exerciseSet),
      ),
    );
  }
}

// /**
//  * Firestore data converter for Exercise.
//  */
// export const exerciseConverter: FirestoreDataConverter<Exercise> = {
//   toFirestore(exercise: Exercise): DocumentData {
//     const data: ExerciseData = {
//       template: exercise.template.ref,
//       sets: exercise.sets.map((exerciseSet) => exerciseSet.toData()),
//     };
//     return data;
//   },
//   fromFirestore(
//     snapshot: QueryDocumentSnapshot,
//     options: SnapshotOptions,
//   ): Exercise {
//     // Data from QueryDocumentSnapshot will never return undefined.
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     const data = snapshot.data(options)! as ExerciseData;
//     return new Exercise(
//       snapshot.ref,
//       ExerciseTemplate.fromRef(data.template),
//       data.sets.map((data) => ExerciseSet.fromData(data)),
//     );
//   },
// };

export type ExerciseData = {
  template: DocumentReference;
  sets: WeightRepsExerciseSetData[];
};
