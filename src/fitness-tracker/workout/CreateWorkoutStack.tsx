import { MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useContext, useState } from "react";
import { Pressable } from "react-native";

import { themes } from "constants/colors";
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
          // headerRight: () => (
          //   <Link href="/workout/new/rest-timer" asChild>
          //     <Pressable>
          //       {({ pressed }) => {
          //         const style = { marginRight: 15, opacity: pressed ? 0.5 : 1 };
          //         return (
          //           <MaterialIcons
          //             name="timer"
          //             size={25}
          //             color={themes[colorScheme].text}
          //             style={style}
          //           />
          //         );
          //       }}
          //     </Pressable>
          //   </Link>
          // ),
          headerBackButtonMenuEnabled: false,
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ presentation: "card" }} />
        <Stack.Screen
          name="rest-timer"
          options={{
            presentation: "modal",
            headerRight: undefined,
          }}
        />
        <Stack.Screen
          name="what-is-rpe"
          options={{
            presentation: "modal",
            headerRight: undefined,
          }}
        />
        <Stack.Screen
          name="exercise-picker"
          options={{
            presentation: "modal",
            headerRight: undefined,
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
