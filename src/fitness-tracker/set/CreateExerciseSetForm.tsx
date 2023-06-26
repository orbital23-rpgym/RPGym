import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, View, ViewProps } from "react-native";

import { themes } from "constants/colors";
import { fullWidthButton } from "constants/styles";
import { Button } from "library/components/Button";
import { ErrorDisplay } from "library/components/ErrorDisplay";
import { Slider } from "library/components/Slider";
import { Stepper } from "library/components/Stepper";
import { ButtonText, HeadingText } from "library/components/StyledText";
import { TextInput } from "library/components/TextInput";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import {
  TempExerciseData,
  TempSetData,
} from "library/context/CreateWorkoutFormContext";

export type CreateExerciseSetFormProps = {
  exerciseData: TempExerciseData;
  exerciseSetData: TempSetData;
  onSubmit: (
    weight: number,
    reps: number,
    notes: string,
    rpe: number,
  ) => Promise<void>;
  onDelete: (set: TempSetData) => void;
} & Omit<ViewProps, "children">;

export default function CreateExerciseSetForm(
  props: CreateExerciseSetFormProps,
) {
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flex: 1,
      gap: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    stepperContainer: {
      flexDirection: "row",
      columnGap: 10,
      width: "100%",
      alignContent: "center",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 10,
      paddingRight: 10,
    },
    notes: {
      width: "100%",
      height: "auto",
      minHeight: 100,
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
    sliderContainer: {
      width: "100%",
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const [weight, setWeight] = useState(props.exerciseSetData?.weightKg ?? 0);
  const [reps, setReps] = useState(props.exerciseSetData?.reps ?? 0);
  const [rpe, setRpe] = useState(props.exerciseSetData?.perceivedExertion ?? 1);
  const [notes, setNotes] = useState(props.exerciseSetData?.notes ?? "");
  const [error, setError] = useState<Error | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmitWrapped() {
    // Disable submit button
    setIsSubmitting(true);
    // Reset list of errors
    setError(undefined);
    props
      .onSubmit(weight, reps, notes, rpe)
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
          headerTitle: props.exerciseData.template.name,
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
      <View style={styles.stepperContainer}>
        <HeadingText id="weight-label">Weight (kg)</HeadingText>
        <Stepper
          min={0}
          max={1000}
          step={1}
          onValueChange={(value: number) => {
            setWeight(value);
          }}
          accessibilityLabelledBy="weight-label"
          initialValue={weight}
        />
      </View>
      <View style={styles.stepperContainer}>
        <HeadingText id="reps-label">Reps</HeadingText>
        <Stepper
          min={0}
          max={500}
          step={1}
          onValueChange={(value: number) => {
            setReps(value);
          }}
          accessibilityLabelledBy="reps-label"
          initialValue={reps}
        />
      </View>
      <View style={styles.sliderContainer}>
        <HeadingText id="rpe-label">Perceived Exertion</HeadingText>
        <Slider
          min={1}
          max={10}
          step={0.5}
          showLegend
          value={rpe}
          onValueChange={(value) => setRpe(value)}
        />
      </View>

      <HeadingText id="notes-label">Notes</HeadingText>
      <TextInput
        accessibilityLabelledBy="notes-label"
        style={styles.notes}
        onChangeText={(text) => setNotes(text)}
        value={notes}
      />

      <View style={styles.endingActionContainer}>
        <Button
          variant="save"
          style={fullWidthButton.button}
          disabled={isSubmitting || reps === 0}
          onPress={() => onSubmitWrapped()}
        >
          <ButtonText style={fullWidthButton.text}>Save</ButtonText>
        </Button>
        <Button
          variant="destructive"
          style={StyleSheet.compose(
            fullWidthButton.button,
            styles.endingAction,
          )}
          onPress={() => props.onDelete(props.exerciseSetData)}
        >
          <ButtonText style={fullWidthButton.text}>Delete Set</ButtonText>
        </Button>
        {error && <ErrorDisplay error={error} />}
      </View>
    </View>
  );
}
