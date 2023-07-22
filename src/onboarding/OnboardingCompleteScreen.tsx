import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import { ONBOARDING_IMAGES } from "constants/onboarding";
import { Button } from "library/components/Button";
import { GradientBackgroundScreen } from "library/components/GradientBackground";
import { ButtonText, HeadingText } from "library/components/StyledText";
import { useAppUser, useSetAppUser } from "library/context/UserContext";
import AvatarRenderer from "src/rpg/avatar/AvatarRenderer";

export default function OnboardingCompleteScreen() {
  const user = useAppUser();
  const setUser = useSetAppUser();
  const router = useRouter();
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    spritesContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      marginTop: 30,
    },
    userAvatar: {
      flex: 1,
      margin: 0,
    },
    jimBroImage: {
      flex: 1,
      margin: 15,
    },
    promptText: {
      textAlign: "center",
      marginBottom: 20,
    },
    submitButton: {
      width: "80%",
      minWidth: 150,
      alignContent: "center",
      justifyContent: "center",
    },
    submitButtonText: {
      textAlign: "center",
    },
  });
  async function completeOnboarding() {
    const newUser = await user.setOnboarded();
    setUser(newUser);
    router.replace("/(tabs)/profile");
  }
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
        <HeadingText
          style={styles.promptText}
        >{`You're all set, ${user.character.displayName}!`}</HeadingText>
        <Button
          onPress={() => {
            completeOnboarding();
          }}
          variant="primary"
          style={styles.submitButton}
        >
          <ButtonText style={styles.submitButtonText}>{"Let's go!"}</ButtonText>
        </Button>
        <View style={styles.spritesContainer}>
          <Image
            style={styles.jimBroImage}
            source={ONBOARDING_IMAGES.jimbro.swordRight}
            contentFit="contain"
            contentPosition="right center"
          />
          <AvatarRenderer
            style={styles.userAvatar}
            avatar={user.character.avatar}
            transparentBg
          />
        </View>
      </View>
    </GradientBackgroundScreen>
  );
}
