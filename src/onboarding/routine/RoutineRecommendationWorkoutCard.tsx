import { useContext } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { themes } from "constants/colors";
import { STARTER_EXERCISES, StarterRoutineWorkout } from "constants/workout";
import { Card } from "library/components/Card";
import { Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { ExerciseTemplateData } from "src/fitness-tracker/exercise/ExerciseTemplate";

export function RoutineRecommendationWorkoutCard(props: {
  workout: StarterRoutineWorkout;
  style?: StyleProp<ViewStyle>;
}) {
  const { workout, style, ...otherProps } = props;
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({
    exerciseList: {
      width: "100%",
      padding: 5,
      gap: 5,
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
    description: {
      marginBottom: 5,
    },
  });

  return (
    <Card
      style={style}
      title={workout.name}
      headerColor={themes[colorScheme].blueLight}
      {...otherProps}
    >
      {workout.description !== "" && (
        <Text style={styles.description}>{workout.description}</Text>
      )}
      <View style={styles.exerciseList}>
        {workout.exercises.map((data, index) => (
          <View style={styles.exerciseRow} key={index}>
            <Text style={styles.exerciseName}>
              {
                (STARTER_EXERCISES[data.templateIndex] as ExerciseTemplateData)
                  .name
              }
            </Text>
            <Text style={styles.exerciseSets}>{data.numSets + " sets"}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}
