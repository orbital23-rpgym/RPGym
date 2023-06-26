import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useContext } from "react";
import { Pressable } from "react-native";

import CreateExerciseController from "./CreateExerciseController";

import { themes } from "constants/colors";
import { Screen } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export default function CreateExerciseScreen() {
  const colorScheme = useContext(ColorSchemeContext);

  return (
    <Screen noScroll noTabBar>
      <Stack.Screen
        options={{
          headerTitle: "New Workout",
          headerLeft: () => (
            <Link href="../" asChild>
              <Pressable>
                {({ pressed }) => {
                  const style = {
                    marginLeft: 10,
                    marginRight: 15,
                    opacity: pressed ? 0.5 : 1,
                  };
                  return (
                    <FontAwesome5
                      name="chevron-left"
                      size={25}
                      color={themes[colorScheme].text}
                      style={style}
                    />
                  );
                }}
              </Pressable>
            </Link>
          ),
          headerRight: () => (
            <Link href="workout/new/rest-timer" asChild>
              <Pressable>
                {({ pressed }) => {
                  const style = { marginRight: 15, opacity: pressed ? 0.5 : 1 };
                  return (
                    <MaterialIcons
                      name="timer"
                      size={25}
                      color={themes[colorScheme].text}
                      style={style}
                    />
                  );
                }}
              </Pressable>
            </Link>
          ),
        }}
      />
      <CreateExerciseController />
    </Screen>
  );
}
