import WorkoutPreset from "../workout/presets/WorkoutPreset";

/**
 * Group of related workout presets.
 */
export default class WorkoutRoutine {
  name: string;
  description: string;
  workouts: WorkoutPreset[];

  constructor(name: string, description: string, workouts: WorkoutPreset[]) {
    this.name = name;
    this.description = description;
    this.workouts = workouts;
  }
}
