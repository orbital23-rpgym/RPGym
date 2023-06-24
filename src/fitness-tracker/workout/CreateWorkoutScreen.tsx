import { MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useContext } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

import CreateWorkoutController from "./CreateWorkoutController";

import { themes } from "constants/colors";
import { Screen } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export default function CreateWorkoutScreen() {
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({});
  return (
    <Screen gap={20}>
      <Stack.Screen
        options={{
          headerTitle: "New Workout",
          headerRight: () => (
            <Link href="/workout/rest-timer" asChild>
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
      <CreateWorkoutController />
    </Screen>
  );
}
