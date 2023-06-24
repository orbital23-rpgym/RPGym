import { MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useContext, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, ViewProps } from "react-native";

import Exercise from "../exercise/Exercise";

import { themes } from "constants/colors";
import { fullWidthButton } from "constants/styles";
import { Button } from "library/components/Button";
import { ErrorDisplay } from "library/components/ErrorDisplay";
import { ButtonText, HeadingText } from "library/components/StyledText";
import { Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export type TempExerciseData = {
  key: number;
  exercise: Exercise;
};

export type CreateWorkoutViewProps = {
  exerciseData: TempExerciseData[];
  onSubmit: (exerciseData: TempExerciseData[]) => Promise<void>;
  onCancel: () => void;
} & Omit<ViewProps, "children">;

export default function CreateWorkoutView(props: CreateWorkoutViewProps) {
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flex: 1,
      gap: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    endingAction: {
      marginTop: 0,
      marginBottom: 0,
    },
    endingActionContainer: {
      width: "100%",
      gap: 20,
      marginTop: 20,
      alignItems: "center",
    },
  });
  const [exercisesData, setExercisesData] = useState<TempExerciseData[]>([]);
  const [maxExerciseId, setMaxExerciseId] = useState(0);
  const [error, setError] = useState<Error | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmitWrapped() {
    // Disable submit button
    setIsSubmitting(true);
    // Reset list of errors
    setError(undefined);
    props
      .onSubmit(exercisesData)
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <View style={styles.container}>
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
      <Button variant="primary" style={fullWidthButton.button}>
        <ButtonText style={fullWidthButton.text}>Add Exercise</ButtonText>
      </Button>
      <HeadingText>Exercises</HeadingText>
      {exercisesData.length === 0 ? (
        <Text>
          No exercises added yet. Add an exercise by clicking the button above!
        </Text>
      ) : (
        <FlatList
          data={exercisesData}
          renderItem={({ item }: { item: TempExerciseData }) => {
            return <Text>item.exercise.name</Text>;
          }}
        />
      )}
      <View style={styles.endingActionContainer}>
        <Button
          variant="save"
          style={StyleSheet.compose(
            fullWidthButton.button,
            styles.endingAction,
          )}
          disabled={isSubmitting || exercisesData.length === 0}
          onPress={onSubmitWrapped}
        >
          <ButtonText style={fullWidthButton.text}>Finish Workout</ButtonText>
        </Button>
        <Button
          variant="destructive"
          style={StyleSheet.compose(
            fullWidthButton.button,
            styles.endingAction,
          )}
          onPress={props.onCancel}
        >
          <ButtonText style={fullWidthButton.text}>Cancel Workout</ButtonText>
        </Button>
        {error && <ErrorDisplay error={error} />}
      </View>
    </View>
  );
}
