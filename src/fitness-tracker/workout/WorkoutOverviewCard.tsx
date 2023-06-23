import { useContext } from "react";
import { StyleSheet } from "react-native";

import Workout from "./Workout";

import { themes } from "constants/colors";
import { Card } from "library/components/Card";
import { Text, ViewProps } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export type WorkoutOverviewCardProps = {
  workout: Workout;
  title?: string;
} & Omit<ViewProps, "children">;

export default function WorkoutOverviewCard(props: WorkoutOverviewCardProps) {
  const { workout, style, title = "Workout", ...otherProps } = props;
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    date: {
      color: themes[colorScheme].textBlue,
    },
    exerciseList: {
      width: "100%",
    },
  });
  return (
    <Card
      style={StyleSheet.compose(styles.container, style)}
      title={title}
      {...otherProps}
    >
      <Text style={styles.date}>
        Completed: {workout.endDateTime.toLocaleString()}
      </Text>

      <Text numberOfLines={5} style={styles.exerciseList}>
        {workout.exerciseNames()}
      </Text>
    </Card>
  );
}
