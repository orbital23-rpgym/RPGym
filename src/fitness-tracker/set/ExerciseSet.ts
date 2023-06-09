/**
 * Set of an exercise.
 */
export default abstract class ExerciseSet {
  notes: string;
  perceivedExertion: number;

  /**
   * Constructor for exercise set.
   *
   * @param notes Plaintext notes for each set.
   * @param perceivedExertion Rating of perceived exertion.
   * @throws RangeError if perceivedExertion is not in the range [1, 10].
   */
  constructor(notes: string, perceivedExertion: number) {
    if (perceivedExertion < 1 || perceivedExertion > 10)
      throw new RangeError(
        "Perceived exertion must be between 1 and 10 inclusive.",
      );
    this.notes = notes;
    this.perceivedExertion = perceivedExertion;
  }
}
