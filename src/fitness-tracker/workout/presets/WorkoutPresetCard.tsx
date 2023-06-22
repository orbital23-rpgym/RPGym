import { useContext } from "react";
import { StyleSheet } from "react-native";

import WorkoutPreset from "./WorkoutPreset";

import { themes } from "constants/colors";
import { Card } from "library/components/Card";
import { Text, ViewProps } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export type WorkoutPresetCardProps = {
  workoutPreset: WorkoutPreset;
} & ViewProps;

export default function WorkoutPresetCard(props: WorkoutPresetCardProps) {
  const { workoutPreset, style, ...otherProps } = props;
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    lastUsed: {
      color: themes[colorScheme].blueLight,
    },
    exerciseList: {
      width: "100%",
    },
  });
  return (
    <Card
      style={StyleSheet.compose(styles.container, style)}
      title={workoutPreset.name}
      {...otherProps}
    >
      <Text style={styles.lastUsed}>
        Last used: {workoutPreset.lastUsed.toLocaleDateString()}
      </Text>

      <Text numberOfLines={3} style={styles.exerciseList}>
        {workoutPreset.exerciseNames()}
      </Text>
    </Card>
  );
}
