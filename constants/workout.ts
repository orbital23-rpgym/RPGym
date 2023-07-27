/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Constants used in workout tracking.
 */

import { ExerciseTemplateData } from "src/fitness-tracker/exercise/ExerciseTemplate";

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
    perceivedExertion: 5,
    reps: 0,
    weightKg: 0,
  };
};

// include the same set of starter exercises for all (convenient)
// dont reorder
export const STARTER_EXERCISES: ExerciseTemplateData[] = [
  { name: "Barbell Back Squat", category: "Legs", notes: "" },
  { name: "Barbell Front Squat", category: "Legs", notes: "" },
  { name: "Goblet Squat", category: "Legs", notes: "" },
  { name: "Barbell Flat Bench Press", category: "Chest", notes: "" },
  { name: "Dumbbell Flat Bench Press", category: "Chest", notes: "" },
  { name: "Lat Pulldown", category: "Back", notes: "" },
  { name: "Romanian Deadlift", category: "Legs", notes: "" },
  { name: "Assisted Dip", category: "Triceps", notes: "" },
  { name: "Standing Calf Raise", category: "Legs", notes: "" },
  { name: "Dumbbell Supinated Curl", category: "Biceps", notes: "" },
  { name: "Preacher Curl", category: "Biceps", notes: "" },
  { name: "Bicep Curl", category: "Biceps", notes: "" },
  { name: "Hammer Curl", category: "Biceps", notes: "" },
  { name: "Deadlift", category: "Back", notes: "" },
  { name: "Military Press", category: "Shoulders", notes: "" },
  { name: "Chest-Supported T-Bar Row", category: "Back", notes: "" },
  { name: "Leg Extension", category: "Legs", notes: "" },
  { name: "Cable Flye", category: "Chest", notes: "" },
  { name: "Crunch", category: "Core", notes: "" },
  { name: "Dumbbell Skull Crusher", category: "Triceps", notes: "" },
  { name: "Dumbbell Walking Lunge", category: "Legs", notes: "" },
  { name: "Dumbbell Incline Press", category: "Chest", notes: "" },
  { name: "Reverse Grip Lat Pulldown", category: "Back", notes: "" },
  { name: "Barbell Hip Thrust", category: "Legs", notes: "" },
  { name: "Seated Face Pull", category: "Shoulders", notes: "" },
  { name: "Dumbbell Lateral Raise", category: "Shoulders", notes: "" },
  { name: "Lying Leg Curl", category: "Legs", notes: "" },
  { name: "Tricep Rope Extension", category: "Triceps", notes: "" },
  { name: "Tricep Overhead Extension", category: "Triceps", notes: "" },
  { name: "Barbell Bent Over Row", category: "Back", notes: "" },
  { name: "Dumbbell Bent Over Row", category: "Back", notes: "" },
  { name: "Hip Adduction", category: "Legs", notes: "" },
  { name: "Hip Abduction", category: "Legs", notes: "" },
  { name: "Cable Reverse Flye", category: "Back", notes: "" },
  { name: "Cable Lateral Raise", category: "Shoulders", notes: "" },
  { name: "Dumbbell Hip Thrust", category: "Legs", notes: "" },
  { name: "Push Up", category: "Chest", notes: "" },
  { name: "Pull Up", category: "Back", notes: "" },
  { name: "Cable Seated Row", category: "Back", notes: "" },
];

export type StarterRoutineExercise = {
  templateIndex: keyof typeof STARTER_EXERCISES;
  numSets: number;
  numReps: number;
  rpe: number;
};
export type StarterRoutineWorkout = {
  name: string;
  description: string;
  exercises: StarterRoutineExercise[];
};
/**
 * 1-3 days: full body for the corresponding number of days
 * 4 days: 2 lower, 2 upper
 * 5 days: chest/tri, legs/abs 1, back/bis, legs/abs 2, shoulders/arms
 * Dumbbell versions: replace "barbell" exercises with "dumbbell" ones lol
 */
export const STARTER_WORKOUTS: {
  [equip: string]: { [id: string]: StarterRoutineWorkout };
} = {
  dumbbell: {
    fullBodyA: {
      name: "Dumbbell Full Body Day 1",
      description:
        "Rest 2-4min between sets and at least 1 day between workouts.",
      exercises: [
        { templateIndex: 2, numSets: 3, numReps: 6, rpe: 7 },
        { templateIndex: 4, numSets: 3, numReps: 8, rpe: 7 },
        { templateIndex: 5, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 6, numSets: 3, numReps: 10, rpe: 7 },
        { templateIndex: 7, numSets: 3, numReps: 8, rpe: 7 },
        { templateIndex: 8, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 9, numSets: 3, numReps: 10, rpe: 8 },
      ],
    },
    fullBodyB: {
      name: "Dumbbell Full Body Day 2",
      description:
        "Rest 2-4min between sets and at least 1 day between workouts.",
      exercises: [
        { templateIndex: 13, numSets: 3, numReps: 5, rpe: 7 },
        { templateIndex: 14, numSets: 3, numReps: 8, rpe: 8 },
        { templateIndex: 15, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 16, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 17, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 18, numSets: 3, numReps: 12, rpe: 7 },
        { templateIndex: 19, numSets: 3, numReps: 12, rpe: 8 },
      ],
    },
    fullBodyC: {
      name: "Dumbbell Full Body Day 3",
      description:
        "Rest 2-4min between sets and at least 1 day between workouts.",
      exercises: [
        { templateIndex: 20, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 21, numSets: 3, numReps: 8, rpe: 8 },
        { templateIndex: 22, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 35, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 24, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 25, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 26, numSets: 3, numReps: 10, rpe: 8 },
      ],
    },
    upperLowerA: {
      name: "Dumbbell Upper/Lower Day 1",
      description: "Rest 2-4min between sets.",
      exercises: [
        { templateIndex: 2, numSets: 3, numReps: 6, rpe: 7 },
        { templateIndex: 6, numSets: 3, numReps: 10, rpe: 7 },
        { templateIndex: 35, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 16, numSets: 3, numReps: 12, rpe: 9 },
        { templateIndex: 26, numSets: 3, numReps: 12, rpe: 9 },
        { templateIndex: 32, numSets: 3, numReps: 6, rpe: 7 },
        { templateIndex: 18, numSets: 3, numReps: 12, rpe: 7 },
      ],
    },
    upperLowerB: {
      name: "Dumbbell Upper/Lower Day 2",
      description: "Rest 2-4min between sets.",
      exercises: [
        { templateIndex: 4, numSets: 3, numReps: 5, rpe: 7 },
        { templateIndex: 5, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 14, numSets: 3, numReps: 10, rpe: 7 },
        { templateIndex: 15, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 17, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 9, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 27, numSets: 3, numReps: 12, rpe: 8 },
      ],
    },
    upperLowerC: {
      name: "Dumbbell Upper/Lower Day 3",
      description: "Rest 2-4min between sets.",
      exercises: [
        { templateIndex: 13, numSets: 3, numReps: 8, rpe: 7 },
        { templateIndex: 20, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 16, numSets: 3, numReps: 15, rpe: 8 },
        { templateIndex: 26, numSets: 3, numReps: 15, rpe: 8 },
        { templateIndex: 32, numSets: 3, numReps: 15, rpe: 9 },
        { templateIndex: 8, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 18, numSets: 3, numReps: 12, rpe: 8 },
      ],
    },
    upperLowerD: {
      name: "Dumbbell Upper/Lower Day 4",
      description: "Rest 2-4min between sets.",
      exercises: [
        { templateIndex: 21, numSets: 3, numReps: 8, rpe: 8 },
        { templateIndex: 22, numSets: 3, numReps: 8, rpe: 8 },
        { templateIndex: 7, numSets: 3, numReps: 10, rpe: 7 },
        { templateIndex: 30, numSets: 3, numReps: 12, rpe: 7 },
        { templateIndex: 25, numSets: 3, numReps: 15, rpe: 8 },
        { templateIndex: 24, numSets: 3, numReps: 15, rpe: 8 },
        { templateIndex: 12, numSets: 3, numReps: 8, rpe: 9 },
      ],
    },
    broSplitA: {
      name: "Dumbbell Body Part Split Day 1",
      description: "Rest 1-3min between sets.",
      exercises: [
        { templateIndex: 4, numSets: 3, numReps: 6, rpe: 7 },
        { templateIndex: 21, numSets: 3, numReps: 8, rpe: 8 },
        { templateIndex: 17, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 7, numSets: 3, numReps: 10, rpe: 7 },
        { templateIndex: 19, numSets: 3, numReps: 12, rpe: 8 },
      ],
    },
    broSplitB: {
      name: "Dumbbell Body Part Split Day 2",
      description: "Rest 1-3min between sets.",
      exercises: [
        { templateIndex: 2, numSets: 3, numReps: 6, rpe: 7 },
        { templateIndex: 6, numSets: 3, numReps: 8, rpe: 7 },
        { templateIndex: 35, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 16, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 26, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 8, numSets: 2, numReps: 8, rpe: 7 },
        { templateIndex: 18, numSets: 2, numReps: 12, rpe: 7 },
      ],
    },
    broSplitC: {
      name: "Dumbbell Body Part Split Day 3",
      description: "Rest 1-3min between sets.",
      exercises: [
        { templateIndex: 22, numSets: 3, numReps: 8, rpe: 8 },
        { templateIndex: 38, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 15, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 24, numSets: 3, numReps: 15, rpe: 8 },
        { templateIndex: 9, numSets: 3, numReps: 12, rpe: 8 },
      ],
    },
    broSplitD: {
      name: "Dumbbell Body Part Split Day 4",
      description: "Rest 1-3min between sets.",
      exercises: [
        { templateIndex: 13, numSets: 3, numReps: 5, rpe: 7 },
        { templateIndex: 20, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 16, numSets: 2, numReps: 15, rpe: 8 },
        { templateIndex: 26, numSets: 2, numReps: 15, rpe: 8 },
        { templateIndex: 32, numSets: 3, numReps: 15, rpe: 7 },
        { templateIndex: 8, numSets: 2, numReps: 12, rpe: 8 },
        { templateIndex: 18, numSets: 3, numReps: 12, rpe: 8 },
      ],
    },
    broSplitE: {
      name: "Dumbbell Body Part Split Day 5",
      description: "Rest 1-3min between sets.",
      exercises: [
        { templateIndex: 14, numSets: 3, numReps: 6, rpe: 7 },
        { templateIndex: 25, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 33, numSets: 3, numReps: 15, rpe: 8 },
        { templateIndex: 27, numSets: 2, numReps: 12, rpe: 8 },
        { templateIndex: 10, numSets: 2, numReps: 12, rpe: 8 },
      ],
    },
  },
  barbell: {
    fullBodyA: {
      name: "Full Body Day 1",
      description:
        "Rest 2-4min between sets and at least 1 day between workouts.",
      exercises: [
        { templateIndex: 0, numSets: 3, numReps: 6, rpe: 7 },
        { templateIndex: 3, numSets: 3, numReps: 8, rpe: 7 },
        { templateIndex: 5, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 6, numSets: 3, numReps: 10, rpe: 7 },
        { templateIndex: 7, numSets: 3, numReps: 8, rpe: 7 },
        { templateIndex: 8, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 9, numSets: 3, numReps: 10, rpe: 8 },
      ],
    },
    fullBodyB: {
      name: "Full Body Day 2",
      description:
        "Rest 2-4min between sets and at least 1 day between workouts.",
      exercises: [
        { templateIndex: 13, numSets: 3, numReps: 5, rpe: 7 },
        { templateIndex: 14, numSets: 3, numReps: 8, rpe: 8 },
        { templateIndex: 15, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 16, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 17, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 18, numSets: 3, numReps: 12, rpe: 7 },
        { templateIndex: 19, numSets: 3, numReps: 12, rpe: 8 },
      ],
    },
    fullBodyC: {
      name: "Full Body Day 3",
      description:
        "Rest 2-4min between sets and at least 1 day between workouts.",
      exercises: [
        { templateIndex: 20, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 21, numSets: 3, numReps: 8, rpe: 8 },
        { templateIndex: 22, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 23, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 24, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 25, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 26, numSets: 3, numReps: 10, rpe: 8 },
      ],
    },
    upperLowerA: {
      name: "Upper/Lower Day 1",
      description: "Rest 2-4min between sets.",
      exercises: [
        { templateIndex: 0, numSets: 3, numReps: 6, rpe: 7 },
        { templateIndex: 6, numSets: 3, numReps: 10, rpe: 7 },
        { templateIndex: 23, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 16, numSets: 3, numReps: 12, rpe: 9 },
        { templateIndex: 26, numSets: 3, numReps: 12, rpe: 9 },
        { templateIndex: 32, numSets: 3, numReps: 6, rpe: 7 },
        { templateIndex: 18, numSets: 3, numReps: 12, rpe: 7 },
      ],
    },
    upperLowerB: {
      name: "Upper/Lower Day 2",
      description: "Rest 2-4min between sets.",
      exercises: [
        { templateIndex: 3, numSets: 3, numReps: 5, rpe: 7 },
        { templateIndex: 5, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 14, numSets: 3, numReps: 10, rpe: 7 },
        { templateIndex: 15, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 17, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 9, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 27, numSets: 3, numReps: 12, rpe: 8 },
      ],
    },
    upperLowerC: {
      name: "Upper/Lower Day 3",
      description: "Rest 2-4min between sets.",
      exercises: [
        { templateIndex: 13, numSets: 3, numReps: 8, rpe: 7 },
        { templateIndex: 20, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 16, numSets: 3, numReps: 15, rpe: 8 },
        { templateIndex: 26, numSets: 3, numReps: 15, rpe: 8 },
        { templateIndex: 32, numSets: 3, numReps: 15, rpe: 9 },
        { templateIndex: 8, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 18, numSets: 3, numReps: 12, rpe: 8 },
      ],
    },
    upperLowerD: {
      name: "Upper/Lower Day 4",
      description: "Rest 2-4min between sets.",
      exercises: [
        { templateIndex: 21, numSets: 3, numReps: 8, rpe: 8 },
        { templateIndex: 22, numSets: 3, numReps: 8, rpe: 8 },
        { templateIndex: 7, numSets: 3, numReps: 10, rpe: 7 },
        { templateIndex: 29, numSets: 3, numReps: 12, rpe: 7 },
        { templateIndex: 25, numSets: 3, numReps: 15, rpe: 8 },
        { templateIndex: 24, numSets: 3, numReps: 15, rpe: 8 },
        { templateIndex: 12, numSets: 3, numReps: 8, rpe: 9 },
      ],
    },
    broSplitA: {
      name: "Body Part Split Day 1",
      description: "Rest 1-3min between sets.",
      exercises: [
        { templateIndex: 3, numSets: 3, numReps: 6, rpe: 7 },
        { templateIndex: 21, numSets: 3, numReps: 8, rpe: 8 },
        { templateIndex: 17, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 7, numSets: 3, numReps: 10, rpe: 7 },
        { templateIndex: 19, numSets: 3, numReps: 12, rpe: 8 },
      ],
    },
    broSplitB: {
      name: "Body Part Split Day 2",
      description: "Rest 1-3min between sets.",
      exercises: [
        { templateIndex: 0, numSets: 3, numReps: 6, rpe: 7 },
        { templateIndex: 6, numSets: 3, numReps: 8, rpe: 7 },
        { templateIndex: 23, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 16, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 26, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 8, numSets: 2, numReps: 8, rpe: 7 },
        { templateIndex: 18, numSets: 2, numReps: 12, rpe: 7 },
      ],
    },
    broSplitC: {
      name: "Body Part Split Day 3",
      description: "Rest 1-3min between sets.",
      exercises: [
        { templateIndex: 22, numSets: 3, numReps: 8, rpe: 8 },
        { templateIndex: 38, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 15, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 24, numSets: 3, numReps: 15, rpe: 8 },
        { templateIndex: 9, numSets: 3, numReps: 12, rpe: 8 },
      ],
    },
    broSplitD: {
      name: "Body Part Split Day 4",
      description: "Rest 1-3min between sets.",
      exercises: [
        { templateIndex: 13, numSets: 3, numReps: 5, rpe: 7 },
        { templateIndex: 20, numSets: 3, numReps: 10, rpe: 8 },
        { templateIndex: 16, numSets: 2, numReps: 15, rpe: 8 },
        { templateIndex: 26, numSets: 2, numReps: 15, rpe: 8 },
        { templateIndex: 32, numSets: 3, numReps: 15, rpe: 7 },
        { templateIndex: 8, numSets: 2, numReps: 12, rpe: 8 },
        { templateIndex: 18, numSets: 3, numReps: 12, rpe: 8 },
      ],
    },
    broSplitE: {
      name: "Body Part Split Day 5",
      description: "Rest 1-3min between sets.",
      exercises: [
        { templateIndex: 14, numSets: 3, numReps: 6, rpe: 7 },
        { templateIndex: 25, numSets: 3, numReps: 12, rpe: 8 },
        { templateIndex: 33, numSets: 3, numReps: 15, rpe: 8 },
        { templateIndex: 27, numSets: 2, numReps: 12, rpe: 8 },
        { templateIndex: 10, numSets: 2, numReps: 12, rpe: 8 },
      ],
    },
  },
};

export const STARTER_ROUTINES = {
  dumbbell: {
    1: [STARTER_WORKOUTS.dumbbell.fullBodyA],
    2: [
      STARTER_WORKOUTS.dumbbell.fullBodyA,
      STARTER_WORKOUTS.dumbbell.fullBodyB,
    ],
    3: [
      STARTER_WORKOUTS.dumbbell.fullBodyA,
      STARTER_WORKOUTS.dumbbell.fullBodyB,
      STARTER_WORKOUTS.dumbbell.fullBodyC,
    ],
    4: [
      STARTER_WORKOUTS.dumbbell.upperLowerA,
      STARTER_WORKOUTS.dumbbell.upperLowerB,
      STARTER_WORKOUTS.dumbbell.upperLowerC,
      STARTER_WORKOUTS.dumbbell.upperLowerD,
    ],
    5: [
      STARTER_WORKOUTS.dumbbell.broSplitA,
      STARTER_WORKOUTS.dumbbell.broSplitB,
      STARTER_WORKOUTS.dumbbell.broSplitC,
      STARTER_WORKOUTS.dumbbell.broSplitD,
      STARTER_WORKOUTS.dumbbell.broSplitE,
    ],
  },
  barbell: {
    1: [STARTER_WORKOUTS.barbell.fullBodyA],
    2: [STARTER_WORKOUTS.barbell.fullBodyA, STARTER_WORKOUTS.barbell.fullBodyB],
    3: [
      STARTER_WORKOUTS.barbell.fullBodyA,
      STARTER_WORKOUTS.barbell.fullBodyB,
      STARTER_WORKOUTS.barbell.fullBodyC,
    ],
    4: [
      STARTER_WORKOUTS.barbell.upperLowerA,
      STARTER_WORKOUTS.barbell.upperLowerB,
      STARTER_WORKOUTS.barbell.upperLowerC,
      STARTER_WORKOUTS.barbell.upperLowerD,
    ],
    5: [
      STARTER_WORKOUTS.barbell.broSplitA,
      STARTER_WORKOUTS.barbell.broSplitB,
      STARTER_WORKOUTS.barbell.broSplitC,
      STARTER_WORKOUTS.barbell.broSplitD,
      STARTER_WORKOUTS.barbell.broSplitE,
    ],
  },
};
