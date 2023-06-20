import Exercise from "../../exercise/Exercise";
import Workout from "../Workout";

/**
 * Workout preset.
 */
export default class WorkoutPreset extends Workout {
  name: string;
  description: string;
  lastUsed: Date;

  constructor(
    name: string,
    description: string,
    exercises: Exercise[],
    lastUsed: Date,
  ) {
    super(new Date(DATE_MAX), new Date(DATE_MAX), exercises);
    this.exercises = exercises;
    this.name = name;
    this.description = description;
    this.lastUsed = lastUsed;
  }

  /**
   * Returns list of exercise names as a comma-separated string.
   */
  public exerciseNames(): string {
    const mapFn = (exercise: Exercise) => exercise.template.name;
    return this.exercises.map(mapFn).join(", ");
  }
}

const DATE_MAX = 8.64e15;