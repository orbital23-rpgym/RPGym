import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import { ONBOARDING_IMAGES } from "constants/onboarding";
import { Button } from "library/components/Button";
import { GradientBackgroundScreen } from "library/components/GradientBackground";
import { ButtonText, HeadingText } from "library/components/StyledText";

export default function AppTutorialStartScreen() {
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
    submitButtonText: {
      textAlign: "center",
    },
  });
  return (
    <GradientBackgroundScreen>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShown: true,
          headerBackButtonMenuEnabled: true,
        }}
      />
      <View style={styles.container}>
        <HeadingText style={styles.promptText}>
          {"Would you like a short walkthrough of RPGym's features?"}
        </HeadingText>

        <Button
          onPress={() => {
            router.push("/onboarding/tutorial/guide");
          }}
          variant="primary"
          style={styles.optionButton}
        >
          <ButtonText style={styles.submitButtonText}>{"Yes"}</ButtonText>
        </Button>
        <Button
          onPress={() => {
            router.push("/onboarding/complete");
          }}
          variant="secondary"
          style={styles.optionButton}
        >
          <ButtonText style={styles.submitButtonText}>{"No"}</ButtonText>
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
