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

  /**
   * Comparison function to use in sorting.
   * When used in sort(), sorts in ascending order.
   */
  static compareByStartDateTimeAsc = (a: Workout, b: Workout) =>
    a.startDateTime.getTime() - b.startDateTime.getTime();

  /**
   * Comparison function to use in sorting.
   * When used in sort(), sorts in descending order.
   */
  static compareByStartDateTimeDesc = (a: Workout, b: Workout) =>
    b.startDateTime.getTime() - a.startDateTime.getTime();
}
