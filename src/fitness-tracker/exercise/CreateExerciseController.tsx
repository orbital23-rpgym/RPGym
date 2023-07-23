import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import CreateExerciseForm from "./CreateExerciseForm";

import { NEW_SET_DATA } from "constants/dist/workout";
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
      newData.selectedSet = NEW_SET_DATA(exerciseData.sets.length);
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
    router.push("/workout/new");
  }

  useEffect(() => {
    setLocalData(data);
    setExerciseData(data.selectedExercise);
  }, [data]);

  // auto redirect to set
  const { goToSet } = useLocalSearchParams();
  useEffect(() => {
    if (goToSet) {
      router.setParams(undefined);
      router.push("/workout/new/set?goToSet=true");
    }
  }, [goToSet]);

  return exerciseData && (!exerciseData.deleted || goToSet) ? (
    <CreateExerciseForm
      exerciseData={exerciseData}
      addSet={addSet}
      removeSet={removeSet}
      onDelete={deleteExercise}
      editSet={editSet}
    />
  ) : (
    <Redirect href="/workout/new" />
  );
}
