import { Stack } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";

import { themes } from "constants/colors";
import { fullWidthButton } from "constants/styles";
import { Button } from "library/components/Button";
import { Card } from "library/components/Card";
import { ErrorDisplay } from "library/components/ErrorDisplay";
import { ProgressBarWithLabels } from "library/components/ProgressBar";
import { ButtonText, HeadingText } from "library/components/StyledText";
import { Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import {
  TempExerciseData,
  TempSetData,
} from "library/context/CreateWorkoutFormContext";

export type CreateExerciseFormProps = {
  exerciseData: TempExerciseData;
  onSubmit: (setsData: TempSetData[]) => Promise<void>;
  onDelete: (exercise: TempExerciseData) => void;
  addSet: () => void;
  removeSet: (set: TempSetData) => void;
  editSet: (set: TempSetData) => void;
} & Omit<ViewProps, "children">;

export default function CreateExerciseForm(props: CreateExerciseFormProps) {
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
    cardContainer: {
      maxWidth: "100%",
      marginBottom: 15,
    },
    card: {
      padding: 5,
    },
    infoText: {
      fontFamily: "Header",
      fontSize: 16,
    },
  });
  const [exerciseData, setExerciseData] = useState<TempExerciseData>(
    props.exerciseData,
  );
  const [setsData, setSetsData] = useState<TempSetData[]>(
    props.exerciseData.sets,
  );

  const [error, setError] = useState<Error | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmitWrapped() {
    // Disable submit button
    setIsSubmitting(true);
    // Reset list of errors
    setError(undefined);
    props
      .onSubmit(setsData)
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  useEffect(() => {
    setExerciseData(props.exerciseData);
    setSetsData(props.exerciseData.sets.filter((value) => !value.deleted));
  }, [props.exerciseData]);

  const noExercisesText = <Text>No sets added yet.</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: props.exerciseData.template.name,
        }}
      />
      <Button
        variant="primary"
        style={fullWidthButton.button}
        onPress={() => props.addSet()}
      >
        <ButtonText style={fullWidthButton.text}>Add Set</ButtonText>
      </Button>
      <HeadingText>Sets</HeadingText>
      {setsData.length === 0 ? (
        <FlatList data={[noExercisesText]} renderItem={({ item }) => item} />
      ) : (
        <FlatList
          data={setsData}
          renderItem={({ item }: { item: TempSetData }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => props.editSet(item)}
                style={styles.cardContainer}
              >
                <Card style={styles.card}>
                  <Text style={styles.infoText}>
                    {"Weight (kg): " + item.weightKg + "\n"}
                  </Text>
                  <Text style={styles.infoText}>
                    {"Reps: " + item.reps + "\n"}
                  </Text>
                  <ProgressBarWithLabels
                    title={"Perceived Exertion:"}
                    labelPosition={"stack"}
                    max={10}
                    curr={item.perceivedExertion}
                    colorFg={themes[colorScheme].orange}
                    colorBg={themes[colorScheme].gray}
                  />
                  <Text style={styles.infoText}>{"\nNotes:\n"}</Text>
                  <Text>{item.notes === "" ? "(no notes)" : item.notes}</Text>
                </Card>
              </TouchableOpacity>
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
          disabled={isSubmitting || setsData.length === 0}
          onPress={onSubmitWrapped}
        >
          <ButtonText style={fullWidthButton.text}>Save Exercise</ButtonText>
        </Button>
        <Button
          variant="destructive"
          style={StyleSheet.compose(
            fullWidthButton.button,
            styles.endingAction,
          )}
          onPress={() => props.onDelete(exerciseData)}
        >
          <ButtonText style={fullWidthButton.text}>Delete Exercise</ButtonText>
        </Button>
        {error && <ErrorDisplay error={error} />}
      </View>
    </View>
  );
}
