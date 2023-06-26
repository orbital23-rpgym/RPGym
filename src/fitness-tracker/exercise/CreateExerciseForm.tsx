import { MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";

import { themes } from "constants/colors";
import { fullWidthButton } from "constants/styles";
import { Button } from "library/components/Button";
import { ErrorDisplay } from "library/components/ErrorDisplay";
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
  onCancel: () => void;
  onDelete: (exercise: TempExerciseData) => void;
  onAddSet: () => void;
  onRemoveSet: (set: TempSetData) => void;
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
  });
  const [exerciseData, setExerciseData] = useState<TempExerciseData>(
    props.exerciseData,
  );
  const [setsData, setSetsData] = useState<TempSetData[]>([]);

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
          headerRight: () => (
            <Link href="/workout/new/rest-timer" asChild>
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
        onPress={() => props.onAddSet()}
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
              <TouchableOpacity activeOpacity={0.6}>
                <Text>{item.reps}</Text>
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
