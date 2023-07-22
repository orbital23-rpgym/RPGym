import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { ExerciseData } from "../exercise/Exercise";
import { WeightRepsExerciseSetData } from "../set/WeightRepsExerciseSet";

import CreateWorkoutForm from "./CreateWorkoutForm";
import Workout from "./Workout";

import {
  TempExerciseData,
  useCreateWorkoutFormContext,
} from "library/context/CreateWorkoutFormContext";
import { PopUpContext } from "library/context/PopUpContext";
import { useAppUser } from "library/context/UserContext";

export default function CreateWorkoutController() {
  const router = useRouter();
  const user = useAppUser();
  const { data, setData } = useCreateWorkoutFormContext();
  const popUpData = useContext(PopUpContext);

  const [localData, setLocalData] = useState(data);
  const [exercisesData, setExercisesData] = useState<TempExerciseData[]>([]);

  function addExercise() {
    setData(localData);
    router.push("/workout/new/exercise-picker");
  }

  function removeExercise(exercise: TempExerciseData) {
    const newData = { ...localData };
    newData.exercises[exercise.key].deleted = true;
    setLocalData(newData);
  }

  function editExercise(exercise: TempExerciseData) {
    const newData = { ...localData };
    newData.selectedExercise = exercise;
    setLocalData(newData);
    setData(newData);
    router.push("/workout/new/exercise");
  }

  useEffect(() => {
    setLocalData(data);
    const tempExercises = data.exercises.filter((value) => !value.deleted);
    setExercisesData(tempExercises);
  }, [data]);

  // auto redirect to set
  const { goToSet } = useLocalSearchParams();
  useEffect(() => {
    if (goToSet) {
      router.setParams({ goToSet: "false" });
      router.push("/workout/new/exercise?goToSet=true");
    }
  }, [goToSet]);

  function onSubmit(
    data: TempExerciseData[],
    startDateTime: Date,
    endDateTime: Date,
  ) {
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
    const workout = await Workout.create(
      startDateTime,
      endDateTime,
      exerciseData,
      user.id,
    );
    const reward = await user.addWorkout(workout);
    if (popUpData.setData) {
      router.push("../");
      popUpData.setData({ href: "/workout/reward", data: reward });
    }
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
