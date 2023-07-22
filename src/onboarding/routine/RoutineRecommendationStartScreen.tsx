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

export default function RoutineRecommendationStartScreen() {
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

  return (
    <GradientBackgroundScreen>
      <Stack.Screen
        options={{
          headerTitle: "Experience",
          headerShown: true,
          headerBackButtonMenuEnabled: true,
        }}
      />
      <View style={styles.container}>
        <HeadingText style={styles.promptText}>
          {"How would you categorise yourself?"}
        </HeadingText>
        <Button
          onPress={() => {
            router.push("/onboarding/routine/equip");
          }}
          color={themes[colorScheme].orange}
          style={styles.optionButton}
        >
          <ButtonText style={styles.optionButtonText}>
            {"I'm new to gymming"}
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
            {"I'm an experienced gymmer"}
          </ButtonText>
        </Button>
        <Image
          style={styles.jimBroImage}
          source={ONBOARDING_IMAGES.jimbro.waveLeft}
          contentFit="contain"
          contentPosition="right center"
        />
      </View>
    </GradientBackgroundScreen>
  );
}
