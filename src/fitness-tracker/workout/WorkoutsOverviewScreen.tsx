import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import WorkoutPreset from "./presets/WorkoutPreset";
import { WorkoutPresetSummaryCard } from "./presets/WorkoutPresetCard";

import { fullWidthButton } from "constants/styles";
import { Button } from "library/components/Button";
import { ButtonText, HeadingText } from "library/components/StyledText";
import { Screen, Text } from "library/components/Themed";
import { useAppUser } from "library/context/UserContext";

export default function WorkoutsOverviewScreen() {
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
  const router = useRouter();
  const user = useAppUser();
  const [presets, setPresets] = useState<WorkoutPreset[]>([]);

  useEffect(() => {
    user.fitnessTracker
      .getWorkoutPresets()
      .then((presets) => setPresets(presets));
  }, [user.fitnessTracker]);

  return (
    <Screen>
      <Stack.Screen options={{ title: "Work Out" }} />
      <Button
        variant="primary"
        style={fullWidthButton.button}
        onPress={() => router.push("workout/new")}
      >
        <ButtonText style={fullWidthButton.text}>
          {"Start an empty workout"}
        </ButtonText>
      </Button>
      <HeadingText>Templates</HeadingText>
      <Button
        variant="secondary"
        style={fullWidthButton.button}
        onPress={() => router.push("workout/templates/manage")}
      >
        <ButtonText style={fullWidthButton.text}>
          {"Manage Templates"}
        </ButtonText>
      </Button>
      <View style={styles.templateContainer}>
        {presets.length > 0 ? (
          presets.map((wp, k) => (
            <TouchableOpacity
              key={k}
              activeOpacity={0.5}
              onPress={() => {
                router.push({
                  pathname: "workout/new",
                  params: { from: wp.ref.path },
                });
              }}
              style={styles.templateWrapper}
            >
              <WorkoutPresetSummaryCard workoutPreset={wp} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noTemplateText}>
            {"You have not saved any workout templates."}
          </Text>
        )}
      </View>
    </Screen>
  );
}
