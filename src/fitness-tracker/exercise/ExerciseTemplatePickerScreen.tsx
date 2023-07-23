import { Link, Stack, useNavigation, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import ExerciseTemplate from "./ExerciseTemplate";
import ExerciseTemplatesList from "./ExerciseTemplatesList";

import { NEW_SET_DATA } from "constants/workout";
import {
  TempExerciseData,
  useCreateWorkoutFormContext,
} from "library/context/CreateWorkoutFormContext";

export default function ExerciseTemplatePickerScreen() {
  const router = useRouter();

  const navigation = useNavigation();
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = navigation.canGoBack();

  const { data, setData } = useCreateWorkoutFormContext();

  function pickExercise(exerciseTemplate: ExerciseTemplate) {
    const { exercises, selectedExercise, selectedSet, ...otherData } = data;
    // create new set
    const newSetData = NEW_SET_DATA(0);
    // mark as deleted temporarily. Will undelete on first save in sets screen
    newSetData.deleted = true;
    const newExerciseData: TempExerciseData = {
      key: exercises.length,
      template: exerciseTemplate,
      // mark as deleted temporarily. Will undelete on first save in sets screen
      deleted: true,
      sets: [newSetData],
    };

    // auto redirect to sets screen
    const newData = {
      ...otherData,
      exercises: exercises.concat(newExerciseData),
      selectedExercise: newExerciseData,
      selectedSet: newSetData,
    };
    setData(newData);
    router.push("/workout/new?goToSet=true");
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Choose Exercise",
        }}
      />
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}

      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />
      <ExerciseTemplatesList onSelect={(template) => pickExercise(template)} />
    </>
  );
}
