import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { intlFormat } from "date-fns";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";

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
      gap: 2,
    },
    dateTimeContainer: {
      flexDirection: "row",
      rowGap: 2,
      columnGap: 10,
      flexWrap: "wrap",
      alignContent: "center",
    },
    dateTimeText: {
      color: themes[colorScheme].textBlue,
    },
    dateTimeColumn: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    exerciseList: {
      width: "100%",
    },
  });
  return (
    <Card style={style} title={title} {...otherProps}>
      <View style={styles.container}>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTimeColumn}>
            <FontAwesome5
              name="calendar-day"
              size={15}
              color={themes[colorScheme].textBlue}
            />
            <Text style={styles.dateTimeText}>
              {intlFormat(workout.startDateTime, {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
          </View>
          <View style={styles.dateTimeColumn}>
            <FontAwesome
              name="clock-o"
              size={15}
              color={themes[colorScheme].textBlue}
            />
            <Text style={styles.dateTimeText}>
              {intlFormat(workout.startDateTime, {
                hour: "numeric",
                minute: "numeric",
              })}
              {" - "}
              {intlFormat(workout.endDateTime, {
                hour: "numeric",
                minute: "numeric",
              })}
            </Text>
          </View>
        </View>

        <Text numberOfLines={5} style={styles.exerciseList}>
          {workout.exerciseNames()}
        </Text>
      </View>
    </Card>
  );
}
