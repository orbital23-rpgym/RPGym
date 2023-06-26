import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";

import { ExerciseData } from "../exercise/Exercise";
import { WeightRepsExerciseSetData } from "../set/WeightRepsExerciseSet";

import CreateWorkoutForm from "./CreateWorkoutForm";
import Workout from "./Workout";

import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import {
  TempExerciseData,
  useCreateWorkoutFormContext,
} from "library/context/CreateWorkoutFormContext";
import { useUserContext } from "library/context/UserContext";

export default function CreateWorkoutController() {
  const router = useRouter();
  const user = useUserContext();
  const { data, setData } = useCreateWorkoutFormContext();

  const [localData, setLocalData] = useState(data);
  const [exercisesData, setExercisesData] = useState<TempExerciseData[]>([]);

  function addExercise() {
    setData(localData);
    router.push("/workout/new/exercise-picker");
  }

  function removeExercise(exercise: TempExerciseData) {
    localData.exercises[exercise.key].deleted = true;
    setLocalData(localData);
  }

  function editExercise(exercise: TempExerciseData) {
    localData.selectedExercise = exercise;
    setLocalData(localData);
    setData(localData);
    router.push("/workout/new/exercise");
  }

  useEffect(() => {
    setLocalData(data);
    setExercisesData(data.exercises.filter((value) => !value.deleted));
  }, [data]);

  function onSubmit(
    data: TempExerciseData[],
    startDateTime: Date,
    endDateTime: Date,
  ) {
    return new Promise<void>((resolve, reject) => {
      const exerciseData: ExerciseData[] = data.map((value) => {
        return {
          template: value.template.ref,
          sets: value.sets
            .filter((value) => !value.deleted)
            .map((value): WeightRepsExerciseSetData => {
              return {
                notes: value.notes,
                perceivedExertion: value.perceivedExertion,
                weightKg: value.weightKg,
                reps: value.reps,
              };
            }),
        };
      });
      Workout.create(startDateTime, endDateTime, exerciseData, user.id)
        .then((workout) => {
          user.addWorkout(workout);
          resolve();
          router.push("../");
        })
        .catch((reason) => reject(reason));
    });
  }

  return (
    <CreateWorkoutForm
      exerciseData={exercisesData}
      onSubmit={onSubmit}
      onCancel={() => {
        router.back();
      }}
      addExercise={addExercise}
      removeExercise={removeExercise}
      editExercise={editExercise}
    />
  );
}
