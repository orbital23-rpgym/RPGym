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
}
