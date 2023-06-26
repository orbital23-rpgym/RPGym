import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, ViewProps } from "react-native";

import ExerciseCard from "../exercise/ExerciseCard";

import { themes } from "constants/colors";
import { fullWidthButton } from "constants/styles";
import { Button } from "library/components/Button";
import { ErrorDisplay } from "library/components/ErrorDisplay";
import { ButtonText, HeadingText } from "library/components/StyledText";
import { Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { TempExerciseData } from "library/context/CreateWorkoutFormContext";

export type CreateWorkoutFormProps = {
  exerciseData: TempExerciseData[];
  onSubmit: (
    exerciseData: TempExerciseData[],
    startDateTime: Date,
    endDateTime: Date,
  ) => Promise<void>;
  onCancel: () => void;
  addExercise: () => void;
  removeExercise: (exercise: TempExerciseData) => void;
  editExercise: (exercise: TempExerciseData) => void;
} & Omit<ViewProps, "children">;

export default function CreateWorkoutForm(props: CreateWorkoutFormProps) {
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
    listItem: {
      marginBottom: 20,
    },
  });
  const [exercisesData, setExercisesData] = useState<TempExerciseData[]>([]);

  const [error, setError] = useState<Error | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startDateTime = new Date();

  function onSubmitWrapped() {
    // Disable submit button
    setIsSubmitting(true);
    // Reset list of errors
    setError(undefined);
    props
      .onSubmit(exercisesData, startDateTime, new Date())
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  useEffect(() => {
    setExercisesData(props.exerciseData);
  }, [props.exerciseData]);

  const noExercisesText = <Text>No exercises added yet.</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "New Workout",
          headerLeft: () => (
            <Link href="../" asChild>
              <Pressable>
                {({ pressed }) => {
                  const style = {
                    marginLeft: 10,
                    marginRight: 15,
                    opacity: pressed ? 0.5 : 1,
                  };
                  return (
                    <FontAwesome5
                      name="chevron-left"
                      size={25}
                      color={themes[colorScheme].text}
                      style={style}
                    />
                  );
                }}
              </Pressable>
            </Link>
          ),
          headerRight: () => (
            <Link href="workout/new/rest-timer" asChild>
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
      <Button
        variant="primary"
        style={fullWidthButton.button}
        onPress={props.addExercise}
      >
        <ButtonText style={fullWidthButton.text}>Add Exercise</ButtonText>
      </Button>
      <HeadingText>Exercises</HeadingText>
      {exercisesData.length === 0 ? (
        // one-element flatlist for visual layout consistency
        <FlatList data={[noExercisesText]} renderItem={({ item }) => item} />
      ) : (
        <FlatList
          data={exercisesData}
          renderItem={({ item }: { item: TempExerciseData }) => {
            return (
              <ExerciseCard
                style={styles.listItem}
                name={item.template.name}
                onPress={() => props.editExercise(item)}
                sets={item.sets
                  .filter((value) => !value.deleted)
                  .map((value) => {
                    return {
                      weightKg: value.weightKg,
                      notes: value.notes,
                      perceivedExertion: value.perceivedExertion,
                      reps: value.reps,
                    };
                  })}
              />
            );
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
