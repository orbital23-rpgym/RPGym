import { useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet } from "react-native";

import CreateWorkoutView from "./CreateWorkoutView";

import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export default function CreateWorkoutController() {
  const colorScheme = useContext(ColorSchemeContext);
  const router = useRouter();
  const styles = StyleSheet.create({});
  return (
    <CreateWorkoutView
      exerciseData={[]}
      onSubmit={(data) => {
        return new Promise<void>((resolve, reject) => console.log("submitted"));
      }}
      onCancel={() => {
        router.back();
      }}
    />
  );
}
