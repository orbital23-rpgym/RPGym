import { useContext } from "react";
import { StyleSheet } from "react-native";

import WorkoutPresetCard from "./WorkoutPresetCard";

import { fullWidthButton } from "constants/styles";
import { Button } from "library/components/Button";
import PlaceholderText from "library/components/Placeholder";
import { ButtonText, HeadingText } from "library/components/StyledText";
import { Screen, View, ViewProps } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { UserContext, useUserContext } from "library/context/UserContext";

export type WorkoutPresetsViewProps = ViewProps;

export default function WorkoutPresetsView() {
  const colorScheme = useContext(ColorSchemeContext);
  const user = useUserContext();
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      gap: 20,
    },
  });
  const workoutPresets = user.fitnessTracker.workoutPresets;
  const workoutPresetCards = workoutPresets.map((wp, k) => (
    <WorkoutPresetCard workoutPreset={wp} key={k} />
  ));
  return <View style={styles.container}>{workoutPresetCards}</View>;
}
