import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import { fullWidthButton } from "constants/styles";
import { Button } from "library/components/Button";
import { ErrorDisplay } from "library/components/ErrorDisplay";
import { HeadingWithExplainerButton } from "library/components/HeadingWithExplainerButton";
import { Slider } from "library/components/Slider";
import { Stepper } from "library/components/Stepper";
import { ButtonText, HeadingText } from "library/components/StyledText";
import { TextInput } from "library/components/TextInput";
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
  isNewSet?: boolean;
} & Omit<ViewProps, "children">;

export default function CreateExerciseSetForm(
  props: CreateExerciseSetFormProps,
) {
  const router = useRouter();
  // const navigation = useNavigation();
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

  const [weight, setWeight] = useState(props.exerciseSetData.weightKg);
  const [reps, setReps] = useState(props.exerciseSetData.reps);
  const [rpe, setRpe] = useState(props.exerciseSetData.perceivedExertion);
  const [notes, setNotes] = useState(props.exerciseSetData.notes);
  const [error, setError] = useState<Error | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  function onSubmitWrapped() {
    // Disable submit button
    setIsSubmitting(true);
    // Prevent preventing leave
    // overrideAlert.current = true;
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

  useEffect(() => {
    props.isNewSet && setHasUnsavedChanges(props.isNewSet);
  }, [props.isNewSet]);

  // DISABLED because can't override it for save/delete
  // prevent back navigation if unsaved changes
  // UNSTABLE_usePreventRemove(
  //   hasUnsavedChanges && !overrideAlert.current,
  //   ({ data }) => {
  //     Alert.alert(
  //       "Discard changes?",
  //       "You have unsaved changes. Are you sure you want to discard them and leave the screen?",
  //       [
  //         {
  //           text: "Don't leave",
  //           style: "cancel",
  //           onPress: () => {
  //             return;
  //           },
  //         },
  //         {
  //           text: "Discard",
  //           style: "destructive",
  //           onPress: () => navigation.dispatch(data.action),
  //         },
  //       ],
  //       { cancelable: true, userInterfaceStyle: colorScheme },
  //     );
  //   },
  // );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: props.exerciseData.template.name + " Set",
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
            setHasUnsavedChanges(true);
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
            setHasUnsavedChanges(true);
          }}
          accessibilityLabelledBy="reps-label"
          initialValue={reps}
        />
      </View>
      <View style={styles.sliderContainer}>
        <HeadingWithExplainerButton
          text={"Perceived Exertion"}
          textId="rpe-label"
          onButtonPress={() => router.push("/workout/new/what-is-rpe")}
        />
        <Slider
          min={1}
          max={10}
          step={1}
          showLegend
          initialValue={rpe}
          onValueChange={(value) => {
            setRpe(value);
            setHasUnsavedChanges(true);
          }}
        />
      </View>

      <HeadingText id="notes-label">Notes</HeadingText>
      <TextInput
        accessibilityLabelledBy="notes-label"
        style={styles.notes}
        onChangeText={(text) => {
          setNotes(text);
          setHasUnsavedChanges(true);
        }}
        value={notes}
      />

      <View style={styles.endingActionContainer}>
        <Button
          variant="save"
          style={fullWidthButton.button}
          disabled={isSubmitting || reps === 0 || !hasUnsavedChanges}
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
          onPress={() => {
            // Prevent preventing leave
            // overrideAlert.current = true;
            props.onDelete(props.exerciseSetData);
          }}
        >
          <ButtonText style={fullWidthButton.text}>Delete Set</ButtonText>
        </Button>
        {error && <ErrorDisplay error={error} />}
      </View>
    </View>
  );
}
