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
    setData(localData);
    router.push("/workout/new/set");
  }

  function removeSet(set: TempSetData) {
    if (localData.selectedExercise)
      localData.selectedExercise.sets[set.key].deleted = true;
    setLocalData(localData);
  }

  function deleteExercise(exercise: TempExerciseData) {
    const newData = { ...localData };
    newData.selectedExercise = undefined;
    newData.exercises[exercise.key].deleted = true;
    setLocalData(newData);
    setData(newData);
    router.back();
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
          onCancel={() => {
            router.back();
          }}
          onAddSet={addSet}
          onRemoveSet={removeSet}
          onDelete={deleteExercise}
        />
      )}
    </>
  );
}
