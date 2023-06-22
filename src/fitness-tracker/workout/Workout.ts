import Exercise from "../exercise/Exercise";

/**
 * Workout.
 */
export default class Workout {
  startDateTime: Date;
  endDateTime: Date;
  exercises: Exercise[];

  constructor(startDateTime: Date, endDateTime: Date, exercises: Exercise[]) {
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
    this.exercises = exercises;
  }

  /**
   * Returns list of exercise names as a comma-separated string.
   */
  public exerciseNames(): string {
    const mapFn = (exercise: Exercise) => exercise.template.name;
    return this.exercises.map(mapFn).join(", ");
  }
}
