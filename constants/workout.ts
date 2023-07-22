/**
 * Constants used in workout tracking.
 */

export const RPE_EXPLANATION = `The Rate of Perceived Exertion (RPE) scale is a scale used to rate how difficult a lift feels,
using whole numbers from 1-10, where 1 is the least intense and 10 is the most intense.

1-4: Requires little to no effort.
5-6: Relatively easy; suitable for warm-ups or higher rep counts.
7-8: Challenging but doable for ~2-7 reps.
9: Nearing the limit; can just about do 1 more rep.
10: Absolute maximum; cannot do any more reps.

This rating system is inherently subjective, and it's best to experiment and adjust your ratings based on your experience.`;

export const NEW_SET_DATA = (key: number) => {
  return {
    key: key,
    deleted: false,
    notes: "",
    perceivedExertion: 1,
    reps: 0,
    weightKg: 0,
  };
};
