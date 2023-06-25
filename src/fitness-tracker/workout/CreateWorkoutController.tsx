import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import CreateWorkoutForm, { TempExerciseData } from "./CreateWorkoutForm";
import Workout from "./Workout";

import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import {
  CreateWorkoutFormContext,
  useCreateWorkoutFormContext,
} from "library/context/CreateWorkoutFormContext";
import { useUserContext } from "library/context/UserContext";

export default function CreateWorkoutController() {
  const colorScheme = useContext(ColorSchemeContext);
  const router = useRouter();
  const user = useUserContext();
  const { data, setData } = useCreateWorkoutFormContext();

  const [tempData, setTempData] = useState(data);
  const [exercisesData, setExercisesData] = useState<TempExerciseData[]>([]);

  function createExercise() {
    setData(tempData);
    router.push("/workout/new/exercise-picker");
  }

  function onSubmit(
    data: TempExerciseData[],
    startDateTime: Date,
    endDateTime: Date,
  ) {
    return new Promise<void>((resolve, reject) => {
      const exerciseData = data.map((value) => value.exercise);
      return Workout.create(startDateTime, endDateTime, exerciseData, user.id);
    });
  }

  return (
    <CreateWorkoutForm
      exerciseData={exercisesData}
      onSubmit={onSubmit}
      onCancel={() => {
        router.back();
      }}
      onAddExercise={() => {
        createExercise();
      }}
    />
  );
}
