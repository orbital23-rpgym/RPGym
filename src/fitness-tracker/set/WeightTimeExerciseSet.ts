import ExerciseSet from "./ExerciseSet";

/**
 * Set of an exercise.
 */
export default class WeightRepsExerciseSet extends ExerciseSet {
  weightKg: number;
  durationSeconds: number;

  /**
   * Constructor for weight/reps exercise set.
   *
   * @param notes Plaintext notes for each set.
   * @param perceivedExertion Rating of perceived exertion.
   * @param weightKg Weight in kg for each set.
   * @param durationSeconds Duration in seconds.
   * @throws RangeError if either weight and reps are less than 0.
   */
  constructor(
    notes: string,
    perceivedExertion: number,
    weightKg: number,
    durationSeconds: number,
  ) {
    super(notes, perceivedExertion);
    if (weightKg < 0 || durationSeconds < 0)
      throw new RangeError("Weight and time must be greater than 0.");
    this.weightKg = weightKg;
    this.durationSeconds = durationSeconds;
  }
}
