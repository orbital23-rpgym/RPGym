import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useContext } from "react";
import { Pressable } from "react-native";

import CreateWorkoutController from "./CreateWorkoutController";

import { Screen } from "library/components/Themed";

export default function CreateWorkoutScreen() {
  return (
    <Screen noScroll noTabBar>
      <CreateWorkoutController />
    </Screen>
  );
}
