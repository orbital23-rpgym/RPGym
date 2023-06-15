import Exercise from "../exercise/Exercise";

import Workout from "./Workout";

/**
 * Workout preset.
 */
export default class WorkoutPreset extends Workout {
  name: string;
  description: string;

  constructor(name: string, description: string, exercises: Exercise[]) {
    super(new Date(DATE_MAX), new Date(DATE_MAX), exercises);
    this.exercises = exercises;
    this.name = name;
    this.description = description;
  }
}

const DATE_MAX = 8.64e15;
