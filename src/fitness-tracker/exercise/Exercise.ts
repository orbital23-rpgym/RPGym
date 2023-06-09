import ExerciseSet from "../set/ExerciseSet";
import ExerciseTemplate from "./ExerciseTemplate";

/**
 * Recorded exercise.
 */
export default class Exercise {
  template: ExerciseTemplate;
  sets: ExerciseSet[];

  constructor(template: ExerciseTemplate, sets: ExerciseSet[]) {
    this.template = template;
    this.sets = sets;
  }
}
