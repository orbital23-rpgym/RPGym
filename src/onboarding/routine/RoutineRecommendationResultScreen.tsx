import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { themes } from "constants/colors";
import { ONBOARDING_IMAGES } from "constants/onboarding";
import { Button } from "library/components/Button";
import { ErrorDisplay } from "library/components/ErrorDisplay";
import { GradientBackgroundScreen } from "library/components/GradientBackground";
import { ButtonText, HeadingText } from "library/components/StyledText";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import {
  OnboardingEquipment,
  OnboardingFrequency,
  useOnboardingContext,
} from "library/context/OnboardingContext";
import WorkoutPreset from "src/fitness-tracker/workout/presets/WorkoutPreset";

export default function RoutineRecommendationResultScreen() {
  const colorScheme = useContext(ColorSchemeContext);
  const router = useRouter();
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    promptText: {
      textAlign: "center",
      marginBottom: 20,
    },
    optionButton: {
      width: "80%",
      minWidth: 150,
      alignContent: "center",
      justifyContent: "center",
    },
    optionButtonText: {
      textAlign: "center",
    },
  });

  const { data, setData } = useOnboardingContext();
  const [error, setError] = useState<Error | undefined>(undefined);

  async function chooseStarterRoutine(
    equipment?: OnboardingEquipment,
    frequency?: OnboardingFrequency,
  ): Promise<WorkoutPreset[]> {
    if (!equipment || !frequency) {
      throw new Error("Preferred equipment type or workout frequency not set.");
    }
    // TODO: implement sample routine selection
    return [];
  }

  async function saveRoutine() {
    // TODO: save routine to user
    return;
  }

  useEffect(() => {
    chooseStarterRoutine(data.equipment, data.gymFrequency).catch((reason) => {
      setError(reason);
    });
  }, [data]);

  return (
    <GradientBackgroundScreen>
      <Stack.Screen
        options={{
          headerTitle: "Routine",
          headerShown: true,
          headerBackButtonMenuEnabled: true,
        }}
      />
      {error ? (
        <ErrorDisplay error={error} />
      ) : (
        <View style={styles.container}>
          <HeadingText style={styles.promptText}>
            {"Here's a starter gym routine for you to try!"}
          </HeadingText>
          <HeadingText>{`[PLACEHOLDER]\nfrequency: ${data.gymFrequency}x /week\nequipment: ${data.equipment}`}</HeadingText>
          <Button
            onPress={() => {
              saveRoutine();
              router.push("/onboarding/tutorial");
            }}
            color={themes[colorScheme].orange}
            style={styles.optionButton}
          >
            <ButtonText style={styles.optionButtonText}>
              {"Save routine"}
            </ButtonText>
          </Button>
          <Button
            onPress={() => {
              router.push("/onboarding/tutorial");
            }}
            color={themes[colorScheme].blueLight}
            style={styles.optionButton}
          >
            <ButtonText style={styles.optionButtonText}>
              {"No thanks, I'll make my own"}
            </ButtonText>
          </Button>
        </View>
      )}
    </GradientBackgroundScreen>
  );
}
