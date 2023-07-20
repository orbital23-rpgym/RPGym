import { Stack } from "expo-router";
import { useContext, useState } from "react";

import Workout from "./Workout";

import { themes } from "constants/colors";
import { DATE_MAX } from "constants/misc";
import { headingTextStyle } from "constants/styles";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import {
  CreateWorkoutFormContext,
  CreateWorkoutFormData,
} from "library/context/CreateWorkoutFormContext";

export default function CreateWorkoutStack() {
  const colorScheme = useContext(ColorSchemeContext);

  // initialise new empty shared data context for this stack
  const [data, setData] = useState<CreateWorkoutFormData>({ exercises: [] });
  return (
    <CreateWorkoutFormContext.Provider value={{ data, setData }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: themes[colorScheme].background,
          },
          headerTitleStyle: {
            ...headingTextStyle,
          },
          headerTintColor: themes[colorScheme].text,
        }}
      >
        <Stack.Screen name="index" options={{ presentation: "card" }} />
        <Stack.Screen
          name="rest-timer"
          options={{
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="exercise-picker"
          options={{
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="exercise"
          options={{
            presentation: "card",
          }}
        />
        <Stack.Screen
          name="set"
          options={{
            presentation: "card",
          }}
        />
      </Stack>
    </CreateWorkoutFormContext.Provider>
  );
}
