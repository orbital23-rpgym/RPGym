import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import WorkoutPreset from "./WorkoutPreset";

import { themes } from "constants/colors";
import { Card } from "library/components/Card";
import { Text, ViewProps } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export type WorkoutPresetCardProps = {
  workoutPreset: WorkoutPreset;
} & ViewProps;

export function WorkoutPresetSummaryCard(props: WorkoutPresetCardProps) {
  const { workoutPreset, style, ...otherProps } = props;
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    lastUsed: {
      marginBottom: 3,
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
      headerColor={themes[colorScheme].blueLight}
      {...otherProps}
    >
      <Text style={styles.lastUsed}>
        Last used:{" "}
        {workoutPreset.lastUsed
          ? workoutPreset.lastUsed.toLocaleDateString()
          : "-"}
      </Text>

      <Text numberOfLines={3} style={styles.exerciseList}>
        {exerciseNames ? exerciseNames : "Loading..."}
      </Text>
    </Card>
  );
}

export function WorkoutPresetDetailCard(props: WorkoutPresetCardProps) {
  const { workoutPreset, style, ...otherProps } = props;
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    lastUsed: {
      marginBottom: 10,
      color: themes[colorScheme].textBlue,
    },
    exerciseList: {
      width: "100%",
    },
    exerciseRow: {
      flexDirection: "row",
    },
    exerciseName: {
      flex: 2,
      textAlign: "left",
      fontFamily: "Header",
    },
    exerciseSets: {
      flex: 1,
      textAlign: "right",
    },
    description: { marginBottom: 5 },
  });

  const [exerciseSummaries, setExerciseSummaries] = useState<
    { name: string; numSets: number }[]
  >([]);

  useEffect(() => {
    props.workoutPreset
      .getExercises()
      .then((exercises) => {
        setExerciseSummaries(
          exercises.map((value) => ({
            name: value.template.name,
            numSets: value.sets.length,
          })),
        );
      })
      .catch((reason) =>
        setExerciseSummaries([
          { name: `Error retrieving exercises: ${reason}`, numSets: 0 },
        ]),
      );
  }, [props.workoutPreset]);

  return (
    <Card
      style={StyleSheet.compose(styles.container, style)}
      title={workoutPreset.name}
      headerColor={themes[colorScheme].blueLight}
      {...otherProps}
    >
      {workoutPreset.description !== "" && (
        <Text style={styles.description}>{workoutPreset.description}</Text>
      )}
      <Text style={styles.lastUsed}>
        {"Last used: "}
        {workoutPreset.lastUsed
          ? workoutPreset.lastUsed.toLocaleDateString()
          : "-"}
      </Text>
      <View style={styles.exerciseList}>
        {exerciseSummaries.map((data, index) => (
          <View style={styles.exerciseRow} key={index}>
            <Text style={styles.exerciseName}>{data.name}</Text>
            <Text style={styles.exerciseSets}>{data.numSets + " sets"}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}
