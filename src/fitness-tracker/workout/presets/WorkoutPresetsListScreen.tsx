import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import WorkoutPreset from "./WorkoutPreset";
import { WorkoutPresetDetailCard } from "./WorkoutPresetCard";

import { fullWidthButton } from "constants/styles";
import { Button } from "library/components/Button";
import { ButtonText } from "library/components/StyledText";
import { Screen, Text, View, ViewProps } from "library/components/Themed";
import { useAppUser } from "library/context/UserContext";

export type WorkoutPresetsViewProps = ViewProps;

export default function WorkoutPresetsListScreen() {
  const user = useAppUser();
  const router = useRouter();
  const styles = StyleSheet.create({
    templateContainer: {
      width: "100%",
      gap: 20,
    },
    templateWrapper: {
      width: "100%",
    },
    noTemplateText: {
      textAlign: "center",
    },
  });

  const [presets, setPresets] = useState<WorkoutPreset[]>([]);

  useEffect(() => {
    user.fitnessTracker
      .getWorkoutPresets()
      .then((presets) => setPresets(presets));
  }, [user.fitnessTracker]);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerTitle: "Templates",
        }}
      />
      <Button
        variant="secondary"
        onPress={() => {
          router.push("workout/templates/new");
        }}
        style={fullWidthButton.button}
      >
        <ButtonText style={fullWidthButton.text}>
          {"Create new template"}
        </ButtonText>
      </Button>

      <View style={styles.templateContainer}>
        {presets.length > 0 ? (
          presets.map((wp, k) => (
            <TouchableOpacity
              key={k}
              activeOpacity={0.5}
              onPress={() =>
                router.push(`workout/templates/detail?path=${wp.ref.path}`)
              }
              style={styles.templateWrapper}
            >
              <WorkoutPresetDetailCard workoutPreset={wp} key={k} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noTemplateText}>
            {
              "You have not saved any workout templates. Create one by pressing the button above!"
            }
          </Text>
        )}
      </View>
    </Screen>
  );
}
