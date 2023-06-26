import { useRouter } from "expo-router";
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
  const [exerciseData, setExerciseData] = useState<TempExerciseData>();
  const [exerciseSetData, setExerciseSetData] = useState<TempSetData>();

  useEffect(() => {
    setLocalData(data);
    setExerciseSetData(data.selectedSet);
    setExerciseData(data.selectedExercise);
  }, [data]);

  function deleteSet(set: TempSetData) {
    if (exerciseData) {
      const newData = { ...localData };
      newData.selectedSet = undefined;
      newData.exercises[exerciseData.key].sets[set.key].deleted = true;
      setLocalData(newData);
      setData(newData);
      router.back();
    }
  }

  function onSubmit(weight: number, reps: number, notes: string, rpe: number) {
    return new Promise<void>((resolve, reject) => {
      if (!exerciseData || !exerciseSetData) {
        reject("Error saving set data: Exercise set data not found");
      } else {
        const newData = { ...localData };
        newData.selectedSet = undefined;
        newData.exercises[exerciseData.key].sets[exerciseSetData.key] = {
          key: exerciseSetData.key,
          deleted: exerciseSetData.deleted,
          notes: notes,
          perceivedExertion: rpe,
          reps: reps,
          weightKg: weight,
        };
        setLocalData(newData);
        setData(newData);
        router.push("../");
        resolve();
      }
    });
  }

  return (
    <>
      {exerciseSetData && exerciseData && (
        <CreateExerciseSetForm
          exerciseData={exerciseData}
          exerciseSetData={exerciseSetData}
          onSubmit={onSubmit}
          onDelete={deleteSet}
        />
      )}
    </>
  );
}
