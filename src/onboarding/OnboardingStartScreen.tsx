import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { palette, themes } from "constants/colors";
import { ONBOARDING_IMAGES } from "constants/onboarding";
import { Button } from "library/components/Button";
import { ErrorDisplay } from "library/components/ErrorDisplay";
import { GradientBackgroundScreen } from "library/components/GradientBackground";
import { ButtonText } from "library/components/StyledText";
import { TextInput } from "library/components/TextInput";
import { Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import {
  OnboardingData,
  useOnboardingContext,
} from "library/context/OnboardingContext";
import { useAppUser, useSetAppUser } from "library/context/UserContext";

export default function OnboardingStartScreen() {
  const colorScheme = useContext(ColorSchemeContext);
  const user = useAppUser();
  const setUser = useSetAppUser();
  const router = useRouter();
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    speechBubbleContainer: {
      position: "relative",
      width: "100%",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    speechBubbleImage: {
      height: 200,
      width: "100%",
    },
    speechBubbleTextContainer: {
      textAlign: "center",
      textAlignVertical: "center",
      width: "100%",
      paddingHorizontal: 50,
      bottom: 45,
      top: 0,
      position: "absolute",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    speechBubbleText: {
      color: palette.black,
      fontFamily: "Header",
      fontSize: 20,
      textAlign: "center",
      textAlignVertical: "center",
    },
    jimBroImage: {
      minHeight: 200,
      width: "100%",
    },
    textField: {
      backgroundColor: themes[colorScheme].background,
      color: themes[colorScheme].text,
      fontFamily: "Header",
      width: "100%",
      fontSize: 20,
      paddingVertical: 10,
      marginTop: 20,
    },
    submitButton: {
      width: "50%",
      alignContent: "center",
      justifyContent: "center",
      minWidth: "auto",
    },
    submitButtonText: {
      textAlign: "center",
    },
  });

  const [displayName, setDisplayName] = useState(user.username);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, setData } = useOnboardingContext();

  useEffect(() => {
    setDisplayName(data.displayName);
  }, [data]);

  async function saveDisplayName(name: string) {
    // Local input validation
    if (name === "") {
      throw new Error("Display name must not be empty");
    }
    const newUserCharacter = await user.character.updateProfile(
      name,
      user.character.bio,
      user.character.avatar,
    );
    const newUser = await user.setUserCharacter(newUserCharacter);
    setUser(newUser);
    const { displayName: oldDisplayName, ...otherData } = data;
    const newData: OnboardingData = {
      displayName: displayName,
      ...otherData,
    };
    setData(newData);
    router.push("/onboarding/avatar");
  }

  function submit() {
    // Disable submit button
    setIsSubmitting(true);
    // Reset list of errors
    setError(undefined);

    saveDisplayName(displayName)
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }
  return (
    <GradientBackgroundScreen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.speechBubbleContainer}>
          <Image
            style={styles.speechBubbleImage}
            source={ONBOARDING_IMAGES.speechBubble.bottomRight}
            contentFit="contain"
          />
          <View style={styles.speechBubbleTextContainer}>
            <Text style={styles.speechBubbleText}>
              {"Welcome to RPGym, adventurer! I'm Jim Bro. What's your name?"}
            </Text>
          </View>
        </View>

        <Image
          style={styles.jimBroImage}
          source={ONBOARDING_IMAGES.jimbro.leftFacing}
          contentFit="contain"
          contentPosition="right center"
        />
        <TextInput
          style={styles.textField}
          placeholderTextColor={themes[colorScheme].gray}
          placeholder={"Enter your name here"}
          defaultValue={user.username}
          onChangeText={setDisplayName}
        />
        <Button
          onPress={() => {
            submit();
          }}
          color={themes[colorScheme].orange}
          style={styles.submitButton}
          disabled={isSubmitting}
        >
          <ButtonText style={styles.submitButtonText}>{"Next"}</ButtonText>
        </Button>
        {error && <ErrorDisplay error={error} />}
      </View>
    </GradientBackgroundScreen>
  );
}
