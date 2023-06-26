import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import CreateExerciseForm from "./CreateExerciseForm";

import {
  TempExerciseData,
  TempSetData,
  useCreateWorkoutFormContext,
} from "library/context/CreateWorkoutFormContext";

export default function CreateExerciseController() {
  const router = useRouter();
  const { data, setData } = useCreateWorkoutFormContext();

  const [localData, setLocalData] = useState(data);
  const [exerciseData, setExerciseData] = useState<TempExerciseData>();

  function addSet() {
    if (exerciseData) {
      const newData = { ...localData };
      newData.selectedExercise = exerciseData;
      newData.selectedSet = {
        key: exerciseData.sets.length,
        deleted: false,
        notes: "",
        perceivedExertion: 1,
        reps: 0,
        weightKg: 0,
      };
      newData.exercises[exerciseData.key].sets[newData.selectedSet.key] =
        newData.selectedSet;
      setExerciseData(newData.exercises[exerciseData.key]);
      setLocalData(newData);
      setData(newData);
      router.push("/workout/new/set");
    }
  }

  function removeSet(set: TempSetData) {
    const newData = { ...localData };
    if (newData.selectedExercise) {
      newData.selectedExercise.sets[set.key].deleted = true;
      newData.exercises[newData.selectedExercise.key] =
        newData.selectedExercise;
      setLocalData(newData);
      router.push("/workout/new/exercise");
    }
  }

  function editSet(set: TempSetData) {
    const newData = { ...localData };
    newData.selectedSet = set;
    setLocalData(newData);
    setData(newData);
    router.push("/workout/new/set");
  }

  function deleteExercise(exercise: TempExerciseData) {
    const newData = { ...localData };
    newData.selectedExercise = undefined;
    newData.exercises[exercise.key].deleted = true;
    setLocalData(newData);
    setData(newData);
    router.push("../");
  }

  useEffect(() => {
    setLocalData(data);
    setExerciseData(data.selectedExercise);
  }, [data.selectedExercise]);

  function onSubmit(setsData: TempSetData[]) {
    return new Promise<void>((resolve, reject) => {
      if (!exerciseData) {
        reject("Error saving sets data: Exercise not found");
      } else {
        const newData = { ...localData };
        newData.selectedExercise = undefined;
        newData.exercises[exerciseData.key].sets = setsData.filter(
          (set) => !set.deleted,
        );
        setLocalData(newData);
        setData(newData);
        resolve();
        router.push("../");
      }
    });
  }

  return (
    <>
      {exerciseData && (
        <CreateExerciseForm
          exerciseData={exerciseData}
          onSubmit={onSubmit}
          addSet={addSet}
          removeSet={removeSet}
          onDelete={deleteExercise}
          editSet={editSet}
        />
      )}
    </>
  );
}
