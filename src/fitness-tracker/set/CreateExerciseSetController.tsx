import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import CreateExerciseSetForm from "./CreateExerciseSetForm";

import {
  TempExerciseData,
  TempSetData,
  useCreateWorkoutFormContext,
} from "library/context/CreateWorkoutFormContext";

export default function CreateExerciseSetController() {
  const router = useRouter();
  const { data, setData } = useCreateWorkoutFormContext();

  const [localData, setLocalData] = useState(data);
  const [exerciseData, setExerciseData] = useState<
    TempExerciseData | undefined
  >(data.selectedExercise);
  const [exerciseSetData, setExerciseSetData] = useState<
    TempSetData | undefined
  >(data.selectedSet);

  useEffect(() => {
    setLocalData(data);
    setExerciseSetData(data.selectedSet);
    setExerciseData(data.selectedExercise);
  }, [data]);

  function deleteSet(set: TempSetData) {
    if (exerciseData) {
      const { selectedSet, exercises, ...otherData } = localData;
      const newExercises = [...exercises];
      // unmark as deleted
      goToSet && (newExercises[exerciseData.key].deleted = false);
      newExercises[exerciseData.key].sets[set.key].deleted = true;
      const newData = {
        ...otherData,
        selectedSet: undefined,
        exercises: newExercises,
      };
      setLocalData(newData);
      setData(newData);
      router.push("/workout/new/exercise/");
    }
  }

  // handle auto set redirect
  const { goToSet } = useLocalSearchParams();

  function onSubmit(weight: number, reps: number, notes: string, rpe: number) {
    return new Promise<void>((resolve, reject) => {
      if (!exerciseData || !exerciseSetData) {
        reject("Error saving set data: Exercise set data not found");
      } else {
        const { selectedSet, exercises, ...otherData } = localData;
        const newExercises = [...exercises];
        newExercises[exerciseData.key].sets[exerciseSetData.key] = {
          key: exerciseSetData.key,
          deleted: goToSet ? false : exerciseSetData.deleted,
          notes: notes,
          perceivedExertion: rpe,
          reps: reps,
          weightKg: weight,
        };
        // unmark as deleted
        goToSet && (newExercises[exerciseData.key].deleted = false);
        const newData = {
          ...otherData,
          selectedSet: undefined,
          exercises: newExercises,
        };
        setLocalData(newData);
        setData(newData);
        router.push("/workout/new/exercise/");
      }
    });
  }

  return exerciseSetData && exerciseData ? (
    <CreateExerciseSetForm
      exerciseData={exerciseData}
      exerciseSetData={exerciseSetData}
      onSubmit={onSubmit}
      onDelete={deleteSet}
      isNewSet={Boolean(goToSet)}
    />
  ) : (
    <Redirect href="/workout/new/exercise/" />
  );
}
