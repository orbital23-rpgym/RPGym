import { createContext, Dispatch, SetStateAction, useContext } from "react";

import { ExerciseData } from "src/fitness-tracker/exercise/Exercise";
import ExerciseTemplate from "src/fitness-tracker/exercise/ExerciseTemplate";
import { WeightRepsExerciseSetData } from "src/fitness-tracker/set/WeightRepsExerciseSet";
import WorkoutPreset from "src/fitness-tracker/workout/presets/WorkoutPreset";
import Workout from "src/fitness-tracker/workout/Workout";

export type TempExerciseData = {
  key: number;
  deleted: boolean;
  template: ExerciseTemplate;
  sets: TempSetData[];
};

export type TempSetData = {
  key: number;
  deleted: boolean;
} & WeightRepsExerciseSetData;

export type CreateWorkoutFormData = {
  exercises: TempExerciseData[];
  selectedWorkoutPreset?: WorkoutPreset;
  selectedExerciseTemplate?: ExerciseTemplate;
  selectedExercise?: TempExerciseData;
  selectedSet?: TempSetData;
  restTimer?: never;
};

export const CreateWorkoutFormContext = createContext<{
  data: CreateWorkoutFormData | undefined;
  setData: Dispatch<SetStateAction<CreateWorkoutFormData>> | undefined;
}>({ data: undefined, setData: undefined });

/** Hook to use CreateWorkoutFormContext. Guarantees workout is not undefined. */
export const useCreateWorkoutFormContext = () => {
  const { data, setData } = useContext(CreateWorkoutFormContext);
  if (!data || !setData) {
    throw new Error(
      "No CreateWorkoutFormContext.Provider found when calling useCreateWorkoutFormContext.",
    );
  }
  return { data, setData };
};
