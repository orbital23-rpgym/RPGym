import Exercise from "../../exercise/Exercise";
import Workout from "../Workout";

import { DATE_MAX } from "constants/misc";

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
    super(DATE_MAX, DATE_MAX, exercises);
    this.exercises = exercises;
    this.name = name;
    this.description = description;
    this.lastUsed = lastUsed;
  }
}
