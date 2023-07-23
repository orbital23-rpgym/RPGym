import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { ExerciseData } from "../exercise/Exercise";
import { WeightRepsExerciseSetData } from "../set/WeightRepsExerciseSet";

import CreateWorkoutForm from "./CreateWorkoutForm";
import { workoutPresetConverter } from "./presets/WorkoutPreset";
import Workout from "./Workout";

import {
  TempExerciseData,
  TempSetData,
  useCreateWorkoutFormContext,
} from "library/context/CreateWorkoutFormContext";
import { useAppUser } from "library/context/UserContext";
import { db } from "src/firebase-init";

export default function CreateWorkoutController() {
  const router = useRouter();
  const user = useAppUser();
  const { data, setData } = useCreateWorkoutFormContext();

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

  const { goToSet, from: presetPath } = useLocalSearchParams();

  // auto redirect to set
  useEffect(() => {
    if (goToSet) {
      router.setParams({ goToSet: "false" });
      router.push("/workout/new/exercise?goToSet=true");
    }
  }, [goToSet]);

  // get workout preset, if applicable
  useEffect(() => {
    if (presetPath) {
      router.setParams(undefined);
      const presetRef = doc(db, presetPath as string).withConverter(
        workoutPresetConverter,
      );
      getDoc(presetRef).then((snapshot) => {
        const preset = snapshot.data();
        if (preset) {
          const { selectedWorkoutPreset, exercises, ...otherData } = data;
          // replace exercises with preset ones
          preset.getExercises().then((exercises) => {
            const exerciseData = exercises.map(
              (value, index): TempExerciseData => ({
                key: index,
                deleted: false,
                template: value.template,
                sets: value.sets.map(
                  (value, index): TempSetData => ({
                    key: index,
                    deleted: false,
                    ...value.toData(),
                  }),
                ),
              }),
            );
            const newData = {
              selectedWorkoutPreset: preset,
              exercises: exerciseData,
              ...otherData,
            };
            setData(newData);
          });
        }
      });
    }
  }, [presetPath]);

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
          user.addWorkout(workout).then(() => {
            // Successfully saved workout
            // If used template, edit last used
            if (localData.selectedWorkoutPreset) {
              localData.selectedWorkoutPreset.setLastUsed(workout.endDateTime);
            }
            router.replace("/(tabs)/tracking");
          });
        })
        .catch((reason) => reject(reason));
    });
  }

  return (
    <CreateWorkoutForm
      exerciseData={exercisesData}
      onSubmit={onSubmit}
      onCancel={() => {
        router.push("/(tabs)/workout");
      }}
      addExercise={addExercise}
      removeExercise={removeExercise}
      editExercise={editExercise}
    />
  );
}
