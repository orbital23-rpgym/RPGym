import { useContext, useEffect, useState } from "react";
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
      color: themes[colorScheme].textBlue,
    },
    exerciseList: {
      width: "100%",
    },
  });

  const [exerciseNames, setExerciseNames] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    props.workoutPreset
      .getExerciseNames()
      .then((names) => setExerciseNames(names))
      .catch((reason) =>
        setExerciseNames(`Error retrieving exercises: ${reason}`),
      );
  }, [props.workoutPreset]);

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
        {exerciseNames ? exerciseNames : "Loading..."}
      </Text>
    </Card>
  );
}
