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

  function deepCopyTempExercises(
    exercises: TempExerciseData[],
  ): TempExerciseData[] {
    // deep copy exercises
    const newExercises = exercises.map((value) => {
      const { sets, ...otherData } = value;
      const copiedSets = sets.map((value) => {
        return { ...value } as TempSetData;
      });
      return { ...otherData, sets: copiedSets } as TempExerciseData;
    });
    return newExercises;
  }

  function deleteSet(set: TempSetData) {
    if (exerciseData) {
      const { selectedSet, exercises, selectedExercise, ...otherData } =
        localData;
      const newExercises = deepCopyTempExercises(exercises);
      // unmark exercise as deleted
      newExercises[exerciseData.key].deleted = false;
      newExercises[exerciseData.key].sets[set.key].deleted = true;
      const newData = {
        ...otherData,
        selectedSet: undefined,
        selectedExercise: newExercises[exerciseData.key],
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
        const { selectedSet, exercises, selectedExercise, ...otherData } =
          localData;
        const newExercises = deepCopyTempExercises(exercises);
        newExercises[exerciseData.key].sets[exerciseSetData.key] = {
          key: exerciseSetData.key,
          // unmark as deleted
          deleted: false,
          notes: notes,
          perceivedExertion: rpe,
          reps: reps,
          weightKg: weight,
        };
        // unmark as deleted
        newExercises[exerciseData.key].deleted = false;
        const newData = {
          ...otherData,
          selectedSet: undefined,
          selectedExercise: newExercises[exerciseData.key],
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
