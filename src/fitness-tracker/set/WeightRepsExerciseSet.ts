import ExerciseSet from "./ExerciseSet";

/**
 * Set of an exercise.
 */
export default class WeightRepsExerciseSet extends ExerciseSet {
  weightKg: number;
  reps: number;

  /**
   * Constructor for weight/reps exercise set.
   *
   * @param notes Plaintext notes for each set.
   * @param perceivedExertion Rating of perceived exertion.
   * @param weightKg Weight in kg for each set.
   * @param reps Number of reps.
   * @throws RangeError if either weight and reps are less than 0.
   */
  constructor(
    notes: string,
    perceivedExertion: number,
    weightKg: number,
    reps: number,
  ) {
    super(notes, perceivedExertion);
    if (weightKg < 0 || reps < 0)
      throw new RangeError("Weight and reps must be greater than 0.");
    this.weightKg = weightKg;
    this.reps = reps;
  }
}
