import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { themes } from "constants/colors";
import { ONBOARDING_IMAGES } from "constants/onboarding";
import { Button } from "library/components/Button";
import { GradientBackgroundScreen } from "library/components/GradientBackground";
import { ButtonText, HeadingText } from "library/components/StyledText";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import {
  OnboardingData,
  OnboardingFrequency,
  useOnboardingContext,
} from "library/context/OnboardingContext";

export default function RoutineRecommendationFrequencySelectScreen() {
  const colorScheme = useContext(ColorSchemeContext);
  const router = useRouter();
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    jimBroImage: {
      minHeight: 200,
      width: "100%",
      marginTop: 30,
    },
    promptText: {
      textAlign: "center",
      marginBottom: 20,
    },
    optionsContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-evenly",
      flexWrap: "wrap",
      gap: 10,
      paddingVertical: 10,
    },
    optionButton: {
      width: 55,
      height: 55,
      alignContent: "center",
      justifyContent: "center",
      borderRadius: 1000,
      margin: 0,
    },
    optionButtonText: {
      fontSize: 24,
      textAlign: "center",
    },
  });

  const { data, setData } = useOnboardingContext();
  const frequencies: OnboardingFrequency[] = [1, 2, 3, 4, 5];
  function chooseFrequency(value: OnboardingFrequency) {
    const { gymFrequency: oldGymFrequency, ...otherData } = data;
    const newData: OnboardingData = {
      gymFrequency: value,
      ...otherData,
    };
    setData(newData);
    router.push("/onboarding/routine/result");
  }
  return (
    <GradientBackgroundScreen>
      <Stack.Screen
        options={{
          headerTitle: "Frequency",
          headerShown: true,
          headerBackButtonMenuEnabled: true,
        }}
      />
      <View style={styles.container}>
        <HeadingText style={styles.promptText}>
          {"How many times per week would you like to work out?"}
        </HeadingText>
        <View style={styles.optionsContainer}>
          {frequencies.map((value) => {
            return (
              <Button
                key={value}
                onPress={() => {
                  chooseFrequency(value);
                }}
                color={themes[colorScheme].blueLight}
                style={styles.optionButton}
              >
                <ButtonText style={styles.optionButtonText}>{value}</ButtonText>
              </Button>
            );
          })}
        </View>
        <Image
          style={styles.jimBroImage}
          source={ONBOARDING_IMAGES.jimbro.calendarRight}
          contentFit="contain"
          contentPosition="center"
        />
      </View>
    </GradientBackgroundScreen>
  );
}
