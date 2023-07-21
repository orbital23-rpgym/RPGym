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
import Avatar from "src/rpg/avatar/Avatar";
import AvatarRenderer from "src/rpg/avatar/AvatarRenderer";
import { EditAvatarBaseCard } from "src/user/character/edit-profile/EditAvatarBaseCard";

export default function OnboardingAvatarScreen() {
  const colorScheme = useContext(ColorSchemeContext);
  const user = useAppUser();
  const setUser = useSetAppUser();
  const router = useRouter();
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
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

    avatarContainer: {
      aspectRatio: 1,
      minHeight: 200,
      maxHeight: 300,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
  });

  const { data, setData } = useOnboardingContext();
  const [avatar, setAvatar] = useState(data.avatar);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function saveAvatar(avatar: Avatar) {
    const newUserCharacter = await user.character.updateProfile(
      user.character.displayName,
      user.character.bio,
      avatar,
    );
    const newUser = await user.setUserCharacter(newUserCharacter);
    setUser(newUser);
    router.push("/onboarding/routine/");
  }

  useEffect(() => {
    const newData: OnboardingData = {
      displayName: data.displayName,
      avatar: avatar,
    };
    setData(newData);
  }, [avatar]);

  function submit() {
    // Disable submit button
    setIsSubmitting(true);
    // Reset list of errors
    setError(undefined);

    saveAvatar(avatar)
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <GradientBackgroundScreen>
      <Stack.Screen
        options={{
          headerTitle: "Appearance",
          headerShown: true,
          headerBackButtonMenuEnabled: true,
        }}
      />
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <AvatarRenderer avatar={avatar} baseOnly />
        </View>
        <EditAvatarBaseCard
          onChange={(avatarBase) => {
            setAvatar(new Avatar(avatarBase, avatar.avatarEquipment));
          }}
          oldAvatarBase={avatar.avatarBase}
        />
        <Button
          onPress={() => {
            submit();
          }}
          color={themes[colorScheme].orange}
          style={styles.submitButton}
          disabled={isSubmitting}
        >
          <ButtonText style={styles.submitButtonText}>Next</ButtonText>
        </Button>
        {error && <ErrorDisplay error={error} />}
      </View>
    </GradientBackgroundScreen>
  );
}
