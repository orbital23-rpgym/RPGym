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
  OnboardingEquipment,
  useOnboardingContext,
} from "library/context/OnboardingContext";

export default function RoutineRecommendationEquipmentSelectScreen() {
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
  function chooseEquipment(value: OnboardingEquipment) {
    const { equipment: oldEquipment, ...otherData } = data;
    const newData: OnboardingData = {
      equipment: value,
      ...otherData,
    };
    setData(newData);
    router.push("/onboarding/routine/freq");
  }
  return (
    <GradientBackgroundScreen>
      <Stack.Screen
        options={{
          headerTitle: "Equipment",
          headerShown: true,
          headerBackButtonMenuEnabled: true,
        }}
      />
      <View style={styles.container}>
        <HeadingText style={styles.promptText}>
          {"What kind of weights would you like to use?"}
        </HeadingText>
        <Button
          onPress={() => {
            chooseEquipment("dumbbell");
          }}
          color={themes[colorScheme].blueLight}
          style={styles.optionButton}
        >
          <ButtonText style={styles.optionButtonText}>
            {"Only Dumbbells"}
          </ButtonText>
        </Button>
        <Button
          onPress={() => {
            chooseEquipment("barbell");
          }}
          color={themes[colorScheme].blueLight}
          style={styles.optionButton}
        >
          <ButtonText style={styles.optionButtonText}>
            {"Barbells & Dumbbells"}
          </ButtonText>
        </Button>
        <Image
          style={styles.jimBroImage}
          source={ONBOARDING_IMAGES.jimbro.weightsLeft}
          contentFit="contain"
          contentPosition="center"
        />
      </View>
    </GradientBackgroundScreen>
  );
}
