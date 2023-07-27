import { Stack, useRouter } from "expo-router";

import ExerciseTemplatesList from "./ExerciseTemplatesList";

export default function ExerciseTemplatesOverviewScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Exercise List",
        }}
      />
      <ExerciseTemplatesList
      // onSelect={(template) => router.push("/workout/exercises/detail")}
      />
    </>
  );
}
